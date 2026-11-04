import fs from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { execFile } from 'node:child_process';
function runPython(python, code, args, payload) {
  const input=Buffer.from(JSON.stringify(payload));
  if(input.length>64*1024*1024)throw Error('CHILD_INPUT_LIMIT');
  return new Promise((resolve,reject)=>{
    const child=execFile(python,['-B','-c',code,...args],{timeout:120000,maxBuffer:64*1024*1024},(error,stdout,stderr)=>{
      if(error)reject(Error('BOUNDED_PYTHON_FAILED: '+String(stderr||error.message).split('\n').filter(Boolean).at(-1)?.slice(0,300)));
      else {try{resolve(JSON.parse(stdout));}catch(e){reject(Error('CHILD_JSON_INVALID: '+e.message));}}
    });
    child.stdin.on('error',()=>{});
    child.stdin.end(input);
  });
}
const P = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VERSION = 'data-practical-v1.0.1';
const BOOK = '核算结果.xlsx';
const REPORT = '核算诊断.md';
const SNAPSHOT = '结果快照.json';
const NA = 'n.a.';
const adSemanticFields=['conversion_set_id','value_definition','attribution_window','value_date_basis'];
const objectRecord=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const textID=v=>typeof v==='string'&&/^[A-Za-z0-9_-]{1,64}$/.test(v);
const schemas = {
  order_lines: 'store_id:T order_id:T line_id:T sku:T ordered_at:D order_status:T currency:T quantity:Q line_gross:M line_discount:M order_gross:M order_discount:M shipping_charged:M tax_charged:M refund_history_complete:B note:S',
  refund_events: 'store_id:T refund_id:T refund_line_id:T order_id:T line_id:T? refunded_at:D refund_status:T currency:T item_refund:M shipping_refund:M tax_refund:M note:S',
  ad_daily: 'platform:T account_id:T campaign_id:T report_date:DAY currency:T spend:M reported_conversion_value:M note:S',
  order_costs: 'store_id:T order_id:T currency:T net_cogs:M fulfillment_cost:M payment_fee:M note:S',
  web_events: 'event_id:T store_id:T source_platform:T source_scope:T action:T transaction_id:T? event_at:D currency:T value:M note:S',
};
const schema = Object.fromEntries(Object.entries(schemas).map(([k,v]) => [k,v.split(' ').map(x=>x.split(':'))]));
const names = {order_lines:'商品行',refund_events:'退款',ad_daily:'广告',order_costs:'成本',web_events:'跟踪'};
const tableNames = Object.keys(schema);
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const inside = (child, parent) => child === parent || child.startsWith(parent + path.sep);
const key = (...parts) => parts.join('::');
const literal = v => typeof v === 'string' && v.startsWith('=') ? "'" + v : v;
// The preview engine numerically formats short numeric-looking text even with
// "@". A standard display format preserves its observed lexical zero/decimal
// widths without converting the stored string. Long IDs stay text-authoritative.
const literalFormat = v => {
  if(typeof v!=='string')return 'General';
  if(/^\d{1,15}(?:\.\d{1,6})?$/.test(v)&&v.replace('.','').length<=15){const [n,d]=v.split('.');return '0'.repeat(n.length)+(d?'.'+'0'.repeat(d.length):'');}
  return '@';
};
const quote = v => '"' + String(v).replaceAll('"','""') + '"';
const col = n => { let s=''; for(n++;n;n=Math.floor((n-1)/26)) s=String.fromCharCode(65+(n-1)%26)+s; return s; };
const ref = (s, c, r) => `'${s}'!${col(c)}${r}`;
const range = (s,c,start,n) => `${ref(s,c,start)}:${col(c)}${start+Math.max(n,1)-1}`;
const sum = (refs) => refs.length ? `SUM(${refs.join(',')})` : '0';
const all = refs => refs.length ? `AND(${refs.join(',')})` : 'TRUE';
const num = r => `ISNUMBER(${r})`;
const iff = (test,value) => `IF(${test},${value},"n.a.")`;
const eq = (a,b) => `${a}=${b}`;
const jsonWrite = (p,x,flag='w') => fs.writeFile(p,JSON.stringify(x,null,2)+'\n',{flag});

// Match errors only in the complete, exact production formula map, never raw text.
export function assertFormulaResults(workbook, expectedFormulas) {
  if(!objectRecord(expectedFormulas)||!Object.keys(expectedFormulas).length)throw Error('FORMULA_MAP_REQUIRED');
  const result={status:'PASS',scope:'all_expected_formula_cells',checked:0,result_types:{number:0,string:0,boolean:0}};
  for(const [address,expected]of Object.entries(expectedFormulas)){
    const split=address.lastIndexOf('!'),sheet=address.slice(0,split),cell=address.slice(split+1);
    if(split<1||!/^[A-Z]+[1-9]\d*$/.test(cell)||typeof expected!=='string'||!expected.replace(/^=/,''))throw Error('FORMULA_MAP_INVALID:'+address);
    const range=workbook.worksheets.getItem(sheet).getRange(cell),formulas=range.formulas,values=range.values;
    if(!Array.isArray(formulas)||formulas.length!==1||!Array.isArray(formulas[0])||formulas[0].length!==1||typeof formulas[0][0]!=='string'||formulas[0][0].replace(/^=/,'')!==expected.replace(/^=/,''))throw Error('FORMULA_IDENTITY_CHANGED:'+address);
    if(!Array.isArray(values)||values.length!==1||!Array.isArray(values[0])||values[0].length!==1)throw Error('FORMULA_RESULT_MISSING:'+address);
    const value=values[0][0],type=typeof value;
    if(type==='string'&&/^#(REF!|DIV\/0!|VALUE!|NAME\?|N\/A|NUM!|NULL!|SPILL!|CALC!|GETTING_DATA|BLOCKED!|FIELD!|UNKNOWN!|CONNECT!|BUSY!)$/.test(value))throw Error('UNEXPECTED_FORMULA_ERROR:'+address+':'+value);
    if(!['number','string','boolean'].includes(type)||(type==='number'&&!Number.isFinite(value)))throw Error('UNSUPPORTED_FORMULA_RESULT:'+address);
    result.checked++;result.result_types[type]++;
  }
  return result;
}

export function assertSamePackage(previousPackage, currentIdentity) {
  const valid=p=>objectRecord(p)&&typeof p.version==='string'&&/^data-practical-v\d+\.\d+\.\d+$/.test(p.version)&&typeof p.sha256==='string'&&/^[a-f0-9]{64}$/.test(p.sha256);
  if(!valid(previousPackage)||!valid(currentIdentity)||previousPackage.version!==currentIdentity.version||previousPackage.sha256!==currentIdentity.sha256)throw Error('PREVIOUS_PACKAGE_MISMATCH');
  return {same_frozen_package:true,previous:{version:previousPackage.version,sha256:previousPackage.sha256},current:{version:currentIdentity.version,sha256:currentIdentity.sha256}};
}

function argsFor(argv) {
  const usage = 'Usage: node reconcile_v1.mjs --workspace ABS_W --job-id ID --authorization ABS_JSON --input-contract ABS_JSON --run-id ID --runtime-python ABS_PYTHON --runtime-packages ABS_NODE_MODULES [--previous-run-id ID]';
  if (argv.length===1 && argv[0]==='--help') return {help:usage};
  const required=['workspace','job-id','authorization','input-contract','run-id','runtime-python','runtime-packages'];
  const allowed=[...required,'previous-run-id'];
  const a={};
  for(let i=0;i<argv.length;i+=2) {
    const k=argv[i]?.replace(/^--/,'');
    if(!argv[i]?.startsWith('--')||!allowed.includes(k)||a[k]!==undefined||!argv[i+1]||argv[i+1].startsWith('--')) throw Error(usage);
    a[k]=argv[i+1];
  }
  if(required.some(k=>!a[k])) throw Error(usage);
  for(const k of ['workspace','authorization','input-contract','runtime-python','runtime-packages'])if(!path.isAbsolute(a[k])||path.normalize(a[k])!==a[k])throw Error('ABSOLUTE_NORMAL_PATH_REQUIRED');
  for(const k of ['job-id','run-id','previous-run-id'])if(a[k]!==undefined&&!textID(a[k]))throw Error('SINGLE_SEGMENT_ID_REQUIRED');
  if(a['run-id']===a['previous-run-id'])throw Error('RUN_IDS_MUST_DIFFER');
  return a;
}
async function noLinks(p, allowMissing=false) {
  const resolved=path.resolve(p); const parts=resolved.split(path.sep); let at=path.parse(resolved).root;
  for(const part of parts.filter(Boolean)) {
    at=path.join(at,part);
    try { const st=await fs.lstat(at); if(st.isSymbolicLink()) throw Error(`SYMLINK_REJECTED: ${at}`); }
    catch(err) { if(err.code==='ENOENT'&&allowMissing) return; throw err; }
  }
}
async function absent(p) { try { await fs.lstat(p); throw Error(`TARGET_EXISTS: ${p}`); } catch(e) {if(e.code!=='ENOENT')throw e;} }
async function inputBytes(p,limit) {
  await noLinks(p); const st=await fs.lstat(p);
  if(!st.isFile()||st.size>limit) throw Error(`INPUT_SIZE_OR_TYPE: ${path.basename(p)}`);
  const handle=await fs.open(p,fsConstants.O_RDONLY|fsConstants.O_NOFOLLOW|fsConstants.O_NONBLOCK);
  try {
    const opened=await handle.stat();
    if(!opened.isFile()||opened.dev!==st.dev||opened.ino!==st.ino||opened.size>limit)throw Error('INPUT_IDENTITY_CHANGED');
    const b=Buffer.alloc(opened.size+1);let n=0;
    while(n<b.length){const r=await handle.read(b,n,b.length-n,null);if(!r.bytesRead)break;n+=r.bytesRead;}
    const after=await handle.stat();
    if(n!==opened.size||after.size!==opened.size||after.mtimeMs!==opened.mtimeMs)throw Error('INPUT_SIZE_CHANGED');
    await noLinks(p);if(await fs.realpath(p)!==p)throw Error('INPUT_CANONICAL_PATH_REQUIRED');
    return b.subarray(0,n);
  } finally {await handle.close();}
}
function textUTF8(b) { return new TextDecoder('utf-8',{fatal:true}).decode(b).replace(/^\uFEFF/,''); }
function dateOK(v,day=false) {
  if(typeof v!=='string'||!(day?/^\d{4}-\d{2}-\d{2}$/:/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+08:00$/).test(v))return false;
  const d=new Date(day?v+'T00:00:00+08:00':v); if(!Number.isFinite(+d))return false;
  const shifted=new Date(+d+8*3600000).toISOString().slice(0,19);
  return shifted===(day?v+'T00:00:00':v.slice(0,19));
}
function money(v) {
  if(v===null||v===undefined||v==='') return {v:null,state:'unknown_missing'};
  if(!['number','string'].includes(typeof v))return {v:null,state:'invalid'};
  const s=String(v);
  if(!/^(0|[1-9]\d{0,6})(\.\d{1,2})?$/.test(s)) return {v:null,state:'invalid'};
  const [whole,frac='']=s.split('.'); const cents=Number(BigInt(whole)*100n+BigInt((frac+'00').slice(0,2)));
  return cents<=100000000 ? {v:cents,state:'known'} : {v:null,state:'invalid'};
}
function configCheck(c) {
  if(!objectRecord(c))throw Error('CONTRACT_OBJECT_REQUIRED');
  const required=['contract_version','dataset_id','currency','minor_unit_digits','timezone','order_window_start','order_window_end_exclusive','data_as_of','order_export_complete','refund_export_complete','order_cost_export_complete','input_mode','advertising_scope','ad_report_definitions','event_definitions','web_events_supplied','cost_definition'];
  if(required.some(k=>!(k in c)))throw Error('CONTRACT_MISSING_FIELDS');
  if(c.contract_version!=='data-practical-v1'||c.currency!=='USD'||c.minor_unit_digits!==2||c.timezone!=='Asia/Shanghai')throw Error('CONTRACT_SCOPE_NOT_SUPPORTED');
  if(!textID(c.dataset_id))throw Error('DATASET_ID_REQUIRED');
  for(const k of ['order_export_complete','refund_export_complete','order_cost_export_complete','web_events_supplied'])if(typeof c[k]!=='boolean')throw Error(`BOOLEAN_REQUIRED: ${k}`);
  if(!dateOK(c.order_window_start)||!dateOK(c.order_window_end_exclusive)||!dateOK(c.data_as_of)||!c.order_window_start.includes('T00:00:00+')||!c.order_window_end_exclusive.includes('T00:00:00+')||!(c.order_window_start<c.order_window_end_exclusive&&c.order_window_end_exclusive<=c.data_as_of))throw Error('MIDNIGHT_WINDOW_REQUIRED');
  if(c.cost_definition!=='net_cogs_after_explicit_recovery_plus_fulfillment_and_payment_fee')throw Error('COST_DEFINITION_NOT_SUPPORTED');
  if(c.input_mode==='csv') {if(!c.files||JSON.stringify(Object.keys(c.files).sort())!==JSON.stringify([...tableNames].sort())||'xlsx_file' in c)throw Error('EXACT_CSV_LIST_REQUIRED');}
  else throw Error('INPUT_MODE_NOT_SUPPORTED');
  if(!Array.isArray(c.advertising_scope)||!c.advertising_scope.length||!Array.isArray(c.ad_report_definitions)||!Array.isArray(c.event_definitions))throw Error('SOURCE_DEFINITIONS_REQUIRED');
  const scopes=new Set(),defs=new Map(),definitionProblems=[];
  for(const [i,s] of c.advertising_scope.entries()){if(!objectRecord(s)||!['google_ads','meta_ads'].includes(s.platform)||!textID(s.account_id)||!textID(s.campaign_id))throw Error('AD_SCOPE_INVALID:'+i);const k=key(s.platform,s.account_id,s.campaign_id);if(scopes.has(k))throw Error('AD_SCOPE_DUPLICATE');scopes.add(k);}
  for(const [i,d] of c.ad_report_definitions.entries()){
    if(!objectRecord(d))throw Error('AD_DEFINITION_OBJECT_REQUIRED:'+i);
    for(const field of ['platform','account_id','spend_date_basis','report_timezone','extracted_at','export_complete'])if(!(field in d))throw Error(`AD_DEFINITION_MISSING:${i}:${field}`);
    if(!['google_ads','meta_ads'].includes(d.platform))throw Error(`AD_DEFINITION_IDENTITY_INVALID:${i}:platform`);
    if(!textID(d.account_id))throw Error(`AD_DEFINITION_IDENTITY_INVALID:${i}:account_id`);
    if(typeof d.export_complete!=='boolean')throw Error(`AD_REPORT_TIME_OR_COST_BASIS_INVALID:${i}:export_complete`);
    if(!dateOK(d.extracted_at)||d.extracted_at>c.data_as_of)throw Error(`AD_REPORT_TIME_OR_COST_BASIS_INVALID:${i}:extracted_at`);
    if(d.spend_date_basis!=='service_day')throw Error(`AD_REPORT_TIME_OR_COST_BASIS_INVALID:${i}:spend_date_basis`);
    if(d.report_timezone!=='Asia/Shanghai')throw Error(`AD_REPORT_TIME_OR_COST_BASIS_INVALID:${i}:report_timezone`);
    const k=key(d.platform,d.account_id);if(defs.has(k))throw Error('AD_DEFINITION_DUPLICATE');defs.set(k,d);
    for(const field of adSemanticFields){const value=d[field],reason=!(field in d)?'missing':typeof value!=='string'?'invalid_type':!value.trim()?'blank':value.length>500?'too_long':null;if(reason)definitionProblems.push({index:i,platform:d.platform,account_id:d.account_id,field,reason});}
  }
  if(c.advertising_scope.some(s=>!defs.has(key(s.platform,s.account_id))))throw Error('AD_DEFINITION_NOT_FOUND');
  const eventKeys=new Set();
  for(const d of c.event_definitions){if(!['google_ads','ga4_web'].includes(d.source_platform)||!d.source_scope||!d.action||d.transaction_id_mapping!=='store_id_and_order_id'||d.value_definition!=='order_item_net_before_refunds_ex_tax_shipping')throw Error('EVENT_DEFINITION_NOT_SUPPORTED');const k=key(d.source_platform,d.source_scope,d.action);if(eventKeys.has(k))throw Error('EVENT_DEFINITION_DUPLICATE');eventKeys.add(k);}
  return definitionProblems;
}

// Narrow container check only. It never extracts files or evaluates spreadsheet contents.
const ZIP_CHECK=String.raw`
import sys,zipfile,json,re,posixpath,io,base64,xml.etree.ElementTree as ET
payload=json.load(sys.stdin); mode=payload['mode']; expected=payload.get('expected',{})
raw=base64.b64decode(payload['xlsx'],validate=True)
if len(raw)>50*1024*1024: raise ValueError('XLSX_BYTE_LIMIT')
def fail(s): raise ValueError(s)
def local(tag): return tag.rsplit('}',1)[-1]
def address(a):
 m=re.fullmatch(r'([A-Z]{1,3})([1-9][0-9]*)',a or '')
 if not m: fail('CELL_ADDRESS_INVALID')
 c=0
 for ch in m.group(1): c=c*26+ord(ch)-64
 return int(m.group(2)),c
with zipfile.ZipFile(io.BytesIO(raw),'r') as z:
 infos=z.infolist()
 if len(infos)>128: fail('ZIP_MEMBER_LIMIT')
 seen=set(); total=0; roots={}
 for i in infos:
  n=i.filename
  if n in seen or n.startswith('/') or '\\' in n or '..' in n.split('/') or '\x00' in n: fail('ZIP_PATH_OR_DUPLICATE')
  seen.add(n)
  if i.flag_bits&1 or i.file_size>10*1024*1024 or i.file_size/max(i.compress_size,1)>100: fail('ZIP_ENCRYPTION_OR_SIZE')
  total+=i.file_size
  if total>40*1024*1024: fail('ZIP_TOTAL_LIMIT')
  if i.is_dir(): continue
  if not re.fullmatch(r'(\[Content_Types\]\.xml|_rels/\.rels|docProps/(core|app)\.xml|xl/(workbook|styles|sharedStrings)\.xml|xl/_rels/workbook\.xml\.rels|xl/worksheets/sheet\d+\.xml|xl/theme/theme\d+\.xml)',n): fail('UNSUPPORTED_PART:'+n)
  with z.open(i) as f: b=f.read(10*1024*1024+1)
  if len(b)>10*1024*1024 or len(b)!=i.file_size: fail('ZIP_ACTUAL_SIZE')
  s=b.decode('utf-8-sig')
  if re.search(r'<!\s*(DOCTYPE|ENTITY)',s,re.I) or '\x00' in s: fail('XML_DTD_ENCODING')
  enc=re.search(r'<\?xml[^>]*encoding=["\x27]([^"\x27]+)',s,re.I)
  if enc and enc.group(1).lower().replace('-','')!='utf8': fail('XML_ENCODING')
  root=ET.fromstring(s); roots[n]=root
  for e in root.iter():
   t=local(e.tag)
   if t=='definedNames' and (len(e) or (e.text or '').strip()): fail('UNSUPPORTED_XML_FEATURE:definedNames')
   if t in ['definedName','externalReferences','externalLink','connection','queryTable','oleObject','control','mergeCell','mergeCells']: fail('UNSUPPORTED_XML_FEATURE:'+t)
   if t=='f' and mode=='input': fail('INPUT_FORMULA_REJECTED')
   if e.get('hidden') in ['1','true'] or (t=='sheet' and e.get('state','visible')!='visible'): fail('HIDDEN_CONTENT')
   if t=='c' and e.get('t')=='e': fail('ERROR_INPUT_CELL')
   if t=='Relationship':
    target=e.get('Target',''); typ=e.get('Type','')
    if e.get('TargetMode','').lower()=='external' or not target or ':' in target or '\\' in target: fail('EXTERNAL_OR_INVALID_RELATION')
    if not any(typ.endswith('/'+x) for x in ['officeDocument','metadata/core-properties','extended-properties','worksheet','styles','sharedStrings','theme']): fail('RELATION_TYPE')
    parent='' if n=='_rels/.rels' else 'xl'
    resolved=posixpath.normpath(target.lstrip('/') if target.startswith('/') else posixpath.join(parent,target))
    if resolved.startswith('../') or resolved not in z.namelist(): fail('RELATION_TARGET')
   if t in ['Override','Default']:
    ct=e.get('ContentType','')
    allowed=['application/xml','application/vnd.openxmlformats-package.relationships+xml','application/vnd.openxmlformats-package.core-properties+xml','application/vnd.openxmlformats-officedocument.extended-properties+xml','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml','application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml','application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml','application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml','application/vnd.openxmlformats-officedocument.theme+xml']
    if ct not in allowed: fail('CONTENT_TYPE')
 ns={'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
 wr=roots.get('xl/workbook.xml'); rel=roots.get('xl/_rels/workbook.xml.rels')
 if wr is None or rel is None: fail('WORKBOOK_PART_MISSING')
 rr={e.get('Id'):e.get('Target') for e in rel}
 sheetnames=[]; actual={}; dimensions={}
 for sh in wr.findall('m:sheets/m:sheet',ns):
  name=sh.get('name'); sheetnames.append(name)
  rid=sh.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
  target=rr[rid]; pn=posixpath.normpath(target.lstrip('/') if target.startswith('/') else 'xl/'+target)
  root=roots[pn]
  for cell in root.findall('.//m:c',ns):
   f=cell.find('m:f',ns)
   if f is not None: actual[name+'!'+cell.get('r')]=f.text or ''
  rows=root.findall('.//m:sheetData/m:row',ns)
  if mode=='input':
   lastrow=0; maxcol=0; maxrow=0; addresses=set()
   for row in rows:
    rownum=row.get('r','')
    if not re.fullmatch(r'[1-9][0-9]*',rownum): fail('ROW_ADDRESS_INVALID')
    ri=int(rownum)
    if ri<=lastrow or ri>10001: fail('ROW_ORDER_OR_LIMIT')
    lastrow=ri; lastcol=0; maxrow=max(maxrow,ri)
    for cell in row:
     if local(cell.tag)!='c': fail('ROW_CHILD_UNSUPPORTED')
     cr,cc=address(cell.get('r'))
     if cr!=ri or cc<=lastcol or cc>20 or cell.get('r') in addresses: fail('CELL_ORDER_DUPLICATE_OR_LIMIT')
     lastcol=cc; maxcol=max(maxcol,cc); addresses.add(cell.get('r'))
   dim=root.find('m:dimension',ns)
   if dim is not None:
    parts=dim.get('ref','').split(':')
    if len(parts) not in [1,2]: fail('DIMENSION_INVALID')
    start=address(parts[0]); end=address(parts[-1])
    if start!=(1,1) or end[0]>10001 or end[1]>20 or end[0]<maxrow or end[1]<maxcol or end!=(maxrow,maxcol): fail('DIMENSION_CONFLICT')
   dimensions[name]={'rows':maxrow,'cols':maxcol}
 if mode=='input' and sorted(sheetnames)!=sorted(['order_lines','refund_events','ad_daily','order_costs','web_events']): fail('EXACT_FIVE_SHEETS_REQUIRED')
 if mode=='output' and actual!=expected: fail('OUTPUT_FORMULA_SET_CHANGED')
 print(json.dumps({'status':'PASS','mode':mode,'sheets':sheetnames,'formula_count':len(actual),'dimensions':dimensions}))
`;

// Literal ingestion only: no monetary arithmetic and no formula evaluation.
const VALUE_READ=String.raw`
import sys,json,base64,io,csv,datetime,math
p=json.load(sys.stdin); out={}
names=['order_lines','refund_events','ad_daily','order_costs','web_events']
def check(v):
 if v is None: return ''
 if isinstance(v,(datetime.datetime,datetime.date,datetime.time,datetime.timedelta)): raise ValueError('DATE_INPUT_NOT_TEXT')
 if type(v) not in [str,int,float,bool]: raise ValueError('UNSUPPORTED_VALUE_TYPE')
 if isinstance(v,float) and not math.isfinite(v): raise ValueError('NONFINITE_VALUE')
 if isinstance(v,str):
  if len(v)>500 or any((ord(c)<32 and c not in '\t\r\n') or ord(c) in [65534,65535] for c in v): raise ValueError('FIELD_LENGTH_OR_XML_CHARACTER')
 return v
if p['mode']=='csv':
 csv.field_size_limit(500)
 for name in names:
  text=base64.b64decode(p['tables'][name],validate=True).decode('utf-8-sig')
  reader=csv.reader(io.StringIO(text,newline=''),delimiter=',',quotechar='"',doublequote=True,skipinitialspace=False,strict=True)
  matrix=[]
  for row in reader:
   if len(matrix)>=1001 or len(row)>20: raise ValueError('TABLE_SIZE_LIMIT')
   matrix.append([check(v) for v in row])
  out[name]=matrix
else:
 import openpyxl
 if sys.version_info[:2]!=(3,12) or openpyxl.__version__!='3.1.5': raise ValueError('RUNTIME_VERSION_DRIFT')
 w=openpyxl.load_workbook(io.BytesIO(base64.b64decode(p['xlsx'],validate=True)),read_only=True,data_only=False,keep_links=False,keep_vba=False)
 try:
  if sorted(w.sheetnames)!=sorted(names): raise ValueError('FIVE_SHEETS_REQUIRED')
  for name in names:
   s=w[name]; d=p['dimensions'][name]; matrix=[]
   for row in s.iter_rows(min_row=1,max_row=d['rows'],min_col=1,max_col=d['cols']):
    if any(c.data_type in ['f','e','d'] for c in row): raise ValueError('FORMULA_ERROR_DATE_INPUT')
    matrix.append([check(c.value) for c in row])
   out[name]=matrix
 finally: w.close()
print(json.dumps(out,ensure_ascii=False,separators=(',',':'),allow_nan=False))
`;

// Replace only value/type fragments of fixed original-data cells in a new file.
// All other XML bytes, ZIP members, formulas and caches must remain identical.
const RAW_PATCH=String.raw`
import sys,json,zipfile,re,io,base64,hashlib,xml.etree.ElementTree as ET
from xml.sax.saxutils import escape
p=json.load(sys.stdin); before=base64.b64decode(p['xlsx'],validate=True)
mapping={'order_lines':('商品行',16),'refund_events':('退款',12),'ad_daily':('广告',8),'order_costs':('成本',7),'web_events':('跟踪',10)}
ns={'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
def h(b): return hashlib.sha256(b).hexdigest()
def column(i):
 s=''
 while i: i,r=divmod(i-1,26); s=chr(65+r)+s
 return s
def local(t): return t.rsplit('}',1)[-1]
cell_re=re.compile(r'<(?:x:)?c\b[^>]*?(?:/>|>.*?</(?:x:)?c>)',re.S)
type_re=re.compile(r'\s+t="[^"]*"')
address_re=re.compile(r'\br="([A-Z]+[1-9][0-9]*)"')
def fragments(xml,allowed,replace=None):
 hits=set()
 def visit(m):
  cell=m.group(0); am=address_re.search(cell.split('>',1)[0])
  if not am: raise ValueError('OUTPUT_CELL_ADDRESS')
  a=am.group(1)
  if a not in allowed: return cell
  if a in hits: raise ValueError('OUTPUT_DUPLICATE_RAW_CELL')
  hits.add(a)
  opening=cell[:cell.index('>')+1]
  if opening.endswith('/>'): opening=opening[:-2]+'>'
  # Preserve all attributes except the one explicitly authorized type attribute.
  stem=type_re.sub('',opening[:-1])
  node=ET.fromstring('<root xmlns:x="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'+cell+'</root>')[0]
  if any(local(ch.tag) not in ['v','is'] for ch in node): raise ValueError('RAW_CELL_HAS_FORMULA_OR_OTHER_CHILD')
  prefix='x:' if cell.startswith('<x:c') else ''
  close='</'+prefix+'c>'
  if replace is None: return stem+'><AUTHORIZED_VALUE_TYPE/>'+close
  v=replace[a]
  if isinstance(v,str):
   text=escape(v).replace('\r','&#13;')
   return stem+' t="inlineStr"><'+prefix+'is><'+prefix+'t xml:space="preserve">'+text+'</'+prefix+'t></'+prefix+'is>'+close
  if type(v) is bool: return stem+' t="b"><'+prefix+'v>'+('1' if v else '0')+'</'+prefix+'v>'+close
  if type(v) in [int,float]: return stem+' t="n"><'+prefix+'v>'+repr(v)+'</'+prefix+'v>'+close
  raise ValueError('PATCH_VALUE_TYPE')
 result=cell_re.sub(visit,xml)
 if hits!=set(allowed): raise ValueError('RAW_CELL_COVERAGE')
 return result
with zipfile.ZipFile(io.BytesIO(before),'r') as z:
 infos=z.infolist(); original={i.filename:z.read(i) for i in infos}
 root=ET.fromstring(original['xl/workbook.xml'])
 rels=ET.fromstring(original['xl/_rels/workbook.xml.rels'])
 rr={e.get('Id'):e.get('Target') for e in rels}
 paths={}
 for sh in root.findall('m:sheets/m:sheet',ns):
  target=rr[sh.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')]
  paths[sh.get('name')]=target.lstrip('/') if target.startswith('/') else 'xl/'+target
 patched=dict(original); proofs={}
 for table,(sheet,width) in mapping.items():
  values=p['raw'][table]; allowed={}
  if len(values)>1000 or any(len(row)!=width for row in values): raise ValueError('PATCH_SCHEMA_LIMIT')
  for i,row in enumerate(values,7):
   for j,v in enumerate(row,1): allowed[column(j)+str(i)]=v
  member=paths[sheet]; old=original[member].decode('utf8')
  new=fragments(old,allowed,allowed) if allowed else old
  old_mask=fragments(old,allowed); new_mask=fragments(new,allowed)
  if old_mask!=new_mask: raise ValueError('NON_WHITELIST_XML_CHANGED')
  patched[member]=new.encode('utf8')
  proofs[sheet]={'raw_cells':len(allowed),'non_whitelist_xml_sha256':h(old_mask.encode()),'precise_diff':'PASS'}
 for name,data in original.items():
  if name not in [paths[s] for s,_ in mapping.values()] and patched[name]!=data: raise ValueError('OTHER_PART_CHANGED')
 # Create, never overwrite. Original and patched are distinct new staging files.
 with open(p['destination'],'xb') as output:
  with zipfile.ZipFile(output,'w') as dest:
   for i in infos: dest.writestr(i,patched[i.filename])
with zipfile.ZipFile(p['destination']) as z:
 if z.namelist()!=list(original): raise ValueError('MEMBER_SET_CHANGED')
 for name,b in patched.items():
  if z.read(name)!=b: raise ValueError('PATCH_DISK_BYTES_CHANGED')
import openpyxl
w=openpyxl.load_workbook(p['destination'],read_only=True,data_only=False,keep_links=False,keep_vba=False)
try:
 for table,(sheet,width) in mapping.items():
  for i,row in enumerate(p['raw'][table],7):
   for j,want in enumerate(row,1):
    cell=w[sheet].cell(i,j); got=cell.value
    if want=='' and got is None: continue
    if cell.data_type in ['f','e','d'] or got!=want or (type(want) is str and type(got) is not str) or (type(want) is bool and type(got) is not bool): raise ValueError('RAW_VALUE_OR_TYPE_MISMATCH:'+sheet+'!'+column(j)+str(i))
finally: w.close()
print(json.dumps({'status':'PASS','source_sha256':h(before),'patched_sha256':h(open(p['destination'],'rb').read()),'sheets':proofs,'all_other_members_identical':True,'raw_formulas':0,'raw_values_and_types':'PASS'}))
`;

async function canonicalDirectory(p) {
  await noLinks(p);if(!(await fs.stat(p)).isDirectory()||await fs.realpath(p)!==p)throw Error('CANONICAL_DIRECTORY_REQUIRED');
}
async function packageIdentity() {
  await canonicalDirectory(P);
  const raw=await inputBytes(path.join(P,'PACKAGE_MANIFEST.json'),1048576),m=JSON.parse(textUTF8(raw));
  if(m.version!==VERSION||!Array.isArray(m.files)||m.files.length>100||m.files.length<10)throw Error('PACKAGE_MANIFEST_INVALID');
  const seen=new Set();
  for(const f of m.files){
    if(!objectRecord(f)||typeof f.path!=='string'||path.isAbsolute(f.path)||f.path.split('/').some(x=>['..','.',''].includes(x))||f.path.includes('\\')||seen.has(f.path)||!/^[a-f0-9]{64}$/.test(f.sha256))throw Error('PACKAGE_MEMBER_INVALID');
    seen.add(f.path);const p=path.resolve(P,f.path);
    if(!inside(p,P)||sha(await inputBytes(p,64*1024*1024))!==f.sha256)throw Error('PACKAGE_IDENTITY_MISMATCH');
  }
  if(!seen.has('scripts/reconcile_v1.mjs')||!seen.has('METHOD.md')||!seen.has('references/input-contract-v1.md'))throw Error('PACKAGE_ENTRY_MISSING');
  return {version:VERSION,sha256:sha(raw)};
}
async function preflight(a) {
  const w=a.workspace,job=a['job-id'],cfgPath=a['input-contract'];
  if(inside(w,P)||inside(P,w))throw Error('PACKAGE_WORKSPACE_OVERLAP');
  await canonicalDirectory(w);
  const authorizationPath=path.join(w,'authorizations',job+'.json');
  if(a.authorization!==authorizationPath)throw Error('AUTHORIZATION_PATH_MISMATCH');
  // No contract or CSV content is opened until this metadata binding is checked.
  const authorizationBytes=await inputBytes(authorizationPath,65536),auth=JSON.parse(textUTF8(authorizationBytes));
  if(!objectRecord(auth)||auth.schema!=='data-job-authorization-v1'||auth.workspace!==w||auth.job_id!==job||auth.operation!=='offline_csv_reconciliation'||!textID(auth.authorization_id)||!objectRecord(auth.human_review)||typeof auth.human_review.source_ref!=='string'||!auth.human_review.source_ref.trim()||typeof auth.human_review.reviewed_by!=='string'||!auth.human_review.reviewed_by.trim())throw Error('AUTHORIZATION_BINDING_INVALID');
  if(!['original_safe','public_non_sensitive','authorized_business_non_sensitive'].includes(auth.material_class))throw Error('OBJECT_SPECIFIC_APPROVAL_REQUIRED');
  if(!Array.isArray(auth.allowed_run_ids)||!auth.allowed_run_ids.every(textID)||!auth.allowed_run_ids.includes(a['run-id']))throw Error('RUN_NOT_AUTHORIZED');
  const identity=await packageIdentity();
  if(auth.package_version!==identity.version||auth.package_manifest_sha256!==identity.sha256)throw Error('AUTHORIZATION_PACKAGE_MISMATCH');
  if(!Array.isArray(auth.inputs)||!auth.inputs.length||auth.inputs.length>50)throw Error('AUTHORIZED_INPUT_LIST_REQUIRED');
  const jobRoot=path.join(w,'jobs',job),inputRoot=path.join(jobRoot,'inputs'),runs=path.join(jobRoot,'runs'),runRoot=path.join(runs,a['run-id']);
  const authorized=auth.inputs.filter(x=>objectRecord(x)&&x.contract===cfgPath);
  if(authorized.length!==1||!inside(cfgPath,inputRoot)||path.basename(cfgPath)!=='INPUT_CONTRACT.json'||!textID(path.basename(path.dirname(cfgPath)))||path.dirname(path.dirname(cfgPath))!==inputRoot)throw Error('CONTRACT_NOT_AUTHORIZED');
  const entry=authorized[0];
  if(!objectRecord(entry.files)||JSON.stringify(Object.keys(entry.files).sort())!==JSON.stringify([...tableNames].sort()))throw Error('AUTHORIZED_FIVE_FILES_REQUIRED');
  if(inside(runRoot,path.dirname(cfgPath))||inside(path.dirname(cfgPath),runRoot))throw Error('INPUT_OUTPUT_PATH_OVERLAP');
  await noLinks(runRoot,true);await absent(runRoot);await canonicalDirectory(jobRoot);
  const bindingPath=path.join(w,'runtime','LOADER_BINDING.json');
  const bindingBytes=await inputBytes(bindingPath,65536),binding=JSON.parse(textUTF8(bindingBytes));
  if(binding.discovered_by!=='load_workspace_dependencies'||binding.bundle_version!=='26.1017.11052'||typeof binding.node!=='string'||await fs.realpath(binding.node)!==await fs.realpath(process.execPath)||binding.python!==a['runtime-python']||binding.packages!==a['runtime-packages'])throw Error('LOADER_BINDING_MISMATCH');
  if(process.platform!=='darwin'||process.arch!=='arm64'||process.versions.node!=='24.19.0')throw Error('HOST_RUNTIME_NOT_SUPPORTED');
  const runtimeVersion=await runPython(a['runtime-python'],'import sys,json,importlib.metadata; print(json.dumps({"python":sys.version.split()[0],"openpyxl":importlib.metadata.version("openpyxl")}))',[],{});
  const artifactMeta=JSON.parse(await fs.readFile(path.join(a['runtime-packages'],'@oai/artifact-tool/package.json'),'utf8'));
  if(runtimeVersion.python!=='3.12.14'||runtimeVersion.openpyxl!=='3.1.5'||artifactMeta.version!=='2.8.99')throw Error('DEPENDENCY_VERSION_NOT_SUPPORTED');
  const previousId=a['previous-run-id'];let previous=null;
  if(previousId){
    const prior=path.join(runs,previousId),previousReceipt=JSON.parse(textUTF8(await inputBytes(path.join(prior,'evidence','RUN_RECEIPT.json'),1048576)));
    if(previousReceipt.status!=='completed_local'||previousReceipt.job_id!==job||previousReceipt.workspace!==w)throw Error('PREVIOUS_RUN_NOT_COMPLETED');
    const packageComparison=assertSamePackage(previousReceipt.package,identity);
    const snapshotBytes=await inputBytes(path.join(prior,'outputs',SNAPSHOT),5*1024*1024);
    if(sha(snapshotBytes)!==previousReceipt.output_hashes?.[SNAPSHOT])throw Error('PREVIOUS_SNAPSHOT_CHANGED');
    previous={id:previousId,snapshot:JSON.parse(textUTF8(snapshotBytes)),sha256:sha(snapshotBytes),package_comparison:packageComparison};
  }
  // Both caller permission review and exact runtime identity precede business-data reads.
  const configBytes=await inputBytes(cfgPath,65536),c=JSON.parse(textUTF8(configBytes)),definitionProblems=configCheck(c);
  const base=path.dirname(cfgPath),paths={},buffers={},inputHashes={[authorizationPath]:sha(authorizationBytes),[bindingPath]:sha(bindingBytes),[cfgPath]:sha(configBytes)},fileIdentities=new Set();
  for(const t of tableNames){
    const relative=c.files[t];
    if(typeof relative!=='string'||relative!==t+'.csv')throw Error('EXACT_CSV_FILENAME_REQUIRED');
    const p=path.join(base,relative);
    if(entry.files[t]!==p)throw Error('CSV_NOT_AUTHORIZED');
    paths[t]=p;buffers[t]=await inputBytes(p,5*1024*1024);inputHashes[p]=sha(buffers[t]);
    const st=await fs.stat(p),id=st.dev+':'+st.ino;if(fileIdentities.has(id))throw Error('SAME_INPUT_REUSED');fileIdentities.add(id);
  }
  return {w,job,jobRoot,runs,runRoot,cfgPath,c,definitionProblems,auth,identity,paths,buffers,inputHashes,previous,runtimeVersion};
}
async function main(a) {
  const ctx=await preflight(a),{w,job,runs,runRoot,cfgPath,c,definitionProblems,auth,identity,paths,buffers,previous}=ctx;
  const out=path.join(runRoot,'outputs'),evidence=path.join(runRoot,'evidence');
  await noLinks(runs,true);try{await fs.mkdir(runs);}catch(e){if(e.code!=='EEXIST')throw e;await canonicalDirectory(runs);}
  await fs.mkdir(runRoot);await fs.mkdir(evidence);
  const receipt={status:'started',started_at:new Date().toISOString(),input_contract:cfgPath,output_dir:out,workspace:w,job_id:job,run_id:a['run-id'],authorization_id:auth.authorization_id,material_class:auth.material_class,package:identity,runtime:{node:process.execPath,python:a['runtime-python'],packages:a['runtime-packages'],versions:{node:process.versions.node,...ctx.runtimeVersion,artifact:'2.8.99'}},input_hashes:ctx.inputHashes,business_formula_source:'Artifact workbook only',native_host_validation:'NOT_RUN'};
  const rp=path.join(evidence,'RUN_RECEIPT.json');await jsonWrite(rp,receipt,'wx');
  try {
    receipt.value_read_started=true;
    const matrices=await runPython(a['runtime-python'],VALUE_READ,[],{mode:'csv',tables:Object.fromEntries(tableNames.map(t=>[t,buffers[t].toString('base64')]))});
    const runtime=path.join(w,'runtime');await canonicalDirectory(runtime);
    const link=path.join(runtime,'node_modules');
    try{await fs.symlink(a['runtime-packages'],link);}catch(e){if(e.code!=='EEXIST')throw e;if(!(await fs.lstat(link)).isSymbolicLink()||await fs.realpath(link)!==await fs.realpath(a['runtime-packages']))throw Error('RUNTIME_LINK_CONFLICT');}
    const req=createRequire(path.join(runtime,'runtime-anchor.cjs'));
    const {Workbook,SpreadsheetFile}=await import(pathToFileURL(req.resolve('@oai/artifact-tool')).href);
    receipt.artifact_import_started=true;
    const rows={}, issues=[];
    const addIssue=(table,record,code,detail,extra={})=>issues.push({table,record,code,detail,...extra});
    for(const t of tableNames) {
      let matrix=matrices[t];
      while(matrix.length&&matrix.at(-1).every(x=>x===null||x===''))matrix.pop();
      if(matrix.length>1001||!matrix.length)throw Error(`TABLE_ROWS_INVALID:${t}`);
      if(JSON.stringify(matrix[0])!==JSON.stringify(schema[t].map(x=>x[0])))throw Error(`TABLE_HEADER_INVALID:${t}`);
      rows[t]=matrix.slice(1).map((vals,i)=>{
        if(vals.length!==schema[t].length||vals.every(x=>x===null||x===''))throw Error(`TABLE_ROW_INVALID:${t}:${i+1}`);
        const r={table:t,record:i+1,raw:{},v:{},bad:{}};
        for(const [j,[field,type]] of schema[t].entries()) {
          const v=vals[j]??'';r.raw[field]=v;
          let okay=true;
          if(type==='M'){const m=money(v);r.v[field]=m.v;if(m.state!=='known')r.bad[field]=m.state;}
          else {r.v[field]=v;
            if(type==='T'||type==='T?')okay=(type==='T?'&&v==='')||(typeof v==='string'&&/^[A-Za-z0-9_-]{1,64}$/.test(v));
            else if(type==='D'||type==='DAY')okay=dateOK(v,type==='DAY');
            else if(type==='Q')okay=/^[1-9]\d*$/.test(String(v))&&Number(v)<=100000;
            else if(type==='B'){okay=v===true||v===false||v==='true'||v==='false';r.v[field]=v===true||v==='true';}
            else if(type==='S')okay=typeof v==='string'&&v.length<=500;
            if(!okay)r.bad[field]='invalid';
          }
        }
        if(r.raw.currency!=='USD')r.bad.currency='invalid';
        r.orderKey=key(r.raw.store_id,r.raw.order_id);r.lineKey=key(r.raw.store_id,r.raw.order_id,r.raw.line_id);
        for(const [field,state] of Object.entries(r.bad))addIssue(t,r.record,state,field);
        return r;
      });
      if(!rows[t].length&&!['refund_events','web_events'].includes(t))throw Error(`EMPTY_REQUIRED_TABLE:${t}`);
    }
    if(!c.web_events_supplied&&rows.web_events.length)throw Error('EVENTS_PRESENT_BUT_NOT_DECLARED');
    const grouped=(rs,f)=>{const m=new Map();for(const r of rs){const k=f(r);if(!m.has(k))m.set(k,[]);m.get(k).push(r);}return m;};
    const markDuplicates=(rs,f)=>{for(const list of grouped(rs,f).values())if(list.length>1)for(const r of list){r.duplicate=true;addIssue(r.table,r.record,'conflict','duplicate_key');}};
    markDuplicates(rows.order_lines,r=>r.lineKey);markDuplicates(rows.refund_events,r=>key(r.raw.store_id,r.raw.refund_id,r.raw.refund_line_id));markDuplicates(rows.order_costs,r=>r.orderKey);markDuplicates(rows.ad_daily,r=>key(r.raw.platform,r.raw.account_id,r.raw.campaign_id,r.raw.report_date));markDuplicates(rows.web_events,r=>r.raw.event_id);
    const orderGroups=grouped(rows.order_lines,r=>r.orderKey), orders=[];
    const parentFields=['ordered_at','order_status','currency','order_gross','order_discount','shipping_charged','tax_charged','refund_history_complete'];
    for(const [k,lines] of orderGroups) {
      const first=lines[0], parentConflict=parentFields.some(f=>lines.some(r=>JSON.stringify(r.raw[f])!==JSON.stringify(first.raw[f])));
      const identityBad=lines.some(r=>['store_id','order_id','ordered_at','order_status'].some(f=>r.bad[f]));
      let classification='eligible';const state=first.raw.order_status;
      if(parentConflict||identityBad||!['paid','partially_refunded','refunded','pending','cancelled'].includes(state))classification='unresolved';
      else if(['pending','cancelled'].includes(state)||first.raw.ordered_at<c.order_window_start||first.raw.ordered_at>=c.order_window_end_exclusive)classification='excluded';
      const o={key:k,lines,first,classification,parentConflict,refunds:[],costs:[],row:26+orders.length};orders.push(o);
      for(const r of lines)r.order=o;
      if(parentConflict)addIssue('order_lines',first.record,'conflict','parent_fields');
      if(classification==='excluded')addIssue('order_lines',first.record,'excluded','order_window_or_status');
      if(classification==='unresolved')addIssue('order_lines',first.record,'conflict','order_eligibility_unknown');
    }
    const orderMap=new Map(orders.map(o=>[o.key,o]));
    for(const list of grouped(rows.refund_events,r=>key(r.raw.store_id,r.raw.refund_id)).values())if(['order_id','refunded_at','refund_status','currency'].some(f=>list.some(r=>r.raw[f]!==list[0].raw[f])))for(const r of list)r.parentConflict=true;
    for(const r of rows.refund_events) {
      const o=orderMap.get(r.orderKey);r.order=o; r.classification='unresolved';
      if(['pending','void'].includes(r.raw.refund_status))r.classification='excluded';
      else if(!r.bad.refunded_at&&r.raw.refunded_at>c.data_as_of)r.classification='excluded';
      else if(r.raw.refund_status==='settled'&&!r.bad.refunded_at) {
        if(!o)r.classification='unmatched';
        else if(o.classification==='excluded')r.classification='matched_ineligible';
        else if(o.classification==='eligible')r.classification='matched_eligible';
      }
      r.linkConflict=!!(o&&r.raw.line_id&&!o.lines.some(l=>l.raw.line_id===r.raw.line_id));
      r.timeConflict=!!(o&&!r.bad.refunded_at&&!o.first.bad.ordered_at&&r.raw.refunded_at<o.first.raw.ordered_at);
      r.valid=Object.keys(r.bad).length===0&&!r.duplicate&&!r.parentConflict&&!r.linkConflict&&!r.timeConflict&&(!r.raw.line_id||(r.v.shipping_refund===0&&r.v.tax_refund===0));
      if(o&&!['excluded','matched_ineligible'].includes(r.classification))o.refunds.push(r);
      if(r.classification!=='matched_eligible')addIssue('refund_events',r.record,r.classification,'refund_classification');
      if(!r.valid)addIssue('refund_events',r.record,'conflict',r.linkConflict?'item_link_conflict':'refund_components_key_or_time');
    }
    for(const r of rows.order_costs){r.order=orderMap.get(r.orderKey);r.classification=r.order?.classification??'unmatched';if(r.order)r.order.costs.push(r);if(r.classification!=='eligible')addIssue('order_costs',r.record,r.classification,'cost_association');}
    const wb=Workbook.create(),mainSheet=wb.worksheets.add('核算与诊断'),build=wb.worksheets.add('订单核算');
    for(const t of tableNames)wb.worksheets.add(names[t]);
    const formulas={},writeFormula=(s,c,r,f)=>{const text=f.startsWith('=')?f:'='+f;wb.worksheets.getItem(s).getCell(r-1,c).formulas=[[text]];formulas[s+'!'+col(c)+r]=text.slice(1);};
    const prep={};
    const prepCols={order_lines:['order_key','line_key','gross_cents','discount_cents','line_net_cents','valid_line','eligible','item_refund_cents','item_cap_ok','sku_net_cents','sku_status','parent_gross_cents','parent_discount_cents','shipping_charged_cents','tax_charged_cents'],refund_events:['order_key','line_key','item_cents','shipping_cents','tax_cents','valid_refund','active_refund','classification','unallocated'],ad_daily:['platform','scope_key','date','spend_cents','reported_value_cents','spend_valid','value_valid','active'],order_costs:['order_key','cogs_cents','fulfillment_cents','fee_cents','cogs_valid','fulfillment_valid','fee_valid','classification'],web_events:['event_id','source_key','transaction_id','expected_cents','sent_cents','difference_cents','comparison_state','tracking_flags']};
    for(const t of tableNames) {
      const s=wb.worksheets.getItem(names[t]),rs=rows[t];
      s.getRange('A2').values=[[names[t]+'：原始输入与准备数据']];s.getRange('A3').values=[[`${c.input_mode==='csv'?path.basename(paths[t]):path.basename(paths.xlsx)+' / '+t}；逻辑记录数 ${rs.length}；原始值不覆盖`]];
      s.getRange('A4').values=[[`来源类别：${auth.material_class}；数据集 ${c.dataset_id}；截至 ${c.data_as_of}；USD；准备金额单位为美分`]];
      s.getRangeByIndexes(5,0,1,schema[t].length).values=[schema[t].map(x=>x[0])];
      if(rs.length){const original=s.getRangeByIndexes(6,0,rs.length,schema[t].length);original.values=rs.map(()=>schema[t].map(()=>'RAW_LITERAL_PENDING'));original.format.numberFormat=rs.map(r=>schema[t].map(([f])=>literalFormat(r.raw[f])));}
      const header=rs.length+10,start=header+1;prep[t]={sheet:names[t],start,n:rs.length,cols:prepCols[t]};
      s.getCell(header-2,0).values=[['准备与计算（逻辑记录顺序与原表相同）']];s.getRangeByIndexes(header-1,0,1,prepCols[t].length).values=[prepCols[t]];
      rs.forEach((r,i)=>{r.prepRow=start+i;r.rawRow=7+i;});
    }
    const pc=(t,f,r)=>ref(names[t],prepCols[t].indexOf(f),typeof r==='number'?r:r.prepRow);
    const pr=(t,f)=>range(names[t],prepCols[t].indexOf(f),prep[t].start,prep[t].n);
    const setPrep=(t,r,vals)=>{const target=wb.worksheets.getItem(names[t]).getRangeByIndexes(r.prepRow-1,0,1,vals.length);target.values=[vals.map(x=>literal(x??NA))];target.format.numberFormat=[vals.map(literalFormat)];};
    for(const r of rows.refund_events)setPrep('refund_events',r,[r.orderKey,r.raw.line_id?r.lineKey:'',r.v.item_refund,r.v.shipping_refund,r.v.tax_refund,r.valid?1:0,['matched_eligible','unmatched','unresolved'].includes(r.classification)?1:0,r.classification,r.raw.line_id?0:1]);
    for(const r of rows.order_lines){const valid=!r.duplicate&&!r.bad.currency&&!r.bad.line_id&&!r.bad.sku&&!r.bad.quantity&&!r.bad.store_id&&!r.bad.order_id;setPrep('order_lines',r,[r.orderKey,r.lineKey,r.v.line_gross,r.v.line_discount,NA,valid?1:0,r.order.classification==='eligible'?1:0,NA,0,NA,'pending_formula',r.v.order_gross,r.v.order_discount,r.v.shipping_charged,r.v.tax_charged]);
      const g=pc('order_lines','gross_cents',r),d=pc('order_lines','discount_cents',r);
      writeFormula(names.order_lines,4,r.prepRow,iff(all([valid?'TRUE':'FALSE',num(g),num(d),`${g}>=${d}`]),`${g}-${d}`));
      writeFormula(names.order_lines,7,r.prepRow,`SUMIFS(${pr('refund_events','item_cents')},${pr('refund_events','line_key')},${pc('order_lines','line_key',r)},${pr('refund_events','active_refund')},1)`);
      writeFormula(names.order_lines,8,r.prepRow,`IF(${all([num(pc('order_lines','line_net_cents',r)),`${pc('order_lines','item_refund_cents',r)}<=${pc('order_lines','line_net_cents',r)}`])},1,0)`);
    }
    for(const r of rows.order_costs){const good=f=>!r.bad[f]&&!r.bad.currency&&!r.bad.store_id&&!r.bad.order_id&&!r.duplicate;setPrep('order_costs',r,[r.orderKey,r.v.net_cogs,r.v.fulfillment_cost,r.v.payment_fee,good('net_cogs')?1:0,good('fulfillment_cost')?1:0,good('payment_fee')?1:0,r.classification]);}
    const dates=[];for(let d=+new Date(c.order_window_start);d<+new Date(c.order_window_end_exclusive);d+=86400000){if(dates.length>=10000)throw Error('WINDOW_TOO_LARGE');dates.push(new Date(d+8*3600000).toISOString().slice(0,10));}
    const scopeSet=new Set(c.advertising_scope.map(s=>key(s.platform,s.account_id,s.campaign_id)));
    const accountDefs=new Map(c.ad_report_definitions.map(d=>[key(d.platform,d.account_id),d]));
    for(const r of rows.ad_daily){r.scopeKey=key(r.raw.platform,r.raw.account_id,r.raw.campaign_id);r.inScope=scopeSet.has(r.scopeKey);r.active=r.inScope&&!r.bad.report_date&&dates.includes(r.raw.report_date);const common=!r.duplicate&&!r.bad.currency&&!r.bad.platform&&!r.bad.account_id&&!r.bad.campaign_id&&!r.bad.report_date;setPrep('ad_daily',r,[r.raw.platform,r.scopeKey,r.raw.report_date,r.v.spend,r.v.reported_conversion_value,common&&!r.bad.spend?1:0,common&&!r.bad.reported_conversion_value?1:0,r.active?1:0]);if(!r.active)addIssue('ad_daily',r.record,r.bad.report_date?'invalid':'excluded','advertising_scope_or_date');}
    const adSummaryRow=prep.ad_daily.start+Math.max(rows.ad_daily.length,1)+4;
    wb.worksheets.getItem(names.ad_daily).getRangeByIndexes(adSummaryRow-2,0,1,5).values=[['platform','spend_cents','reported_value_cents','roas','definition_state']];
    const adRefs={};
    for(const [i,p] of ['google_ads','meta_ads'].entries()){
      const ss=c.advertising_scope.filter(x=>x.platform===p),rr=rows.ad_daily.filter(r=>r.raw.platform===p&&r.active),dd=[...new Set(ss.map(s=>s.account_id))].map(id=>accountDefs.get(key(p,id)));
      const coverage=ss.length>0&&ss.every(s=>dates.every(d=>rows.ad_daily.filter(r=>r.scopeKey===key(s.platform,s.account_id,s.campaign_id)&&r.raw.report_date===d).length===1))&&!rows.ad_daily.some(r=>r.inScope&&r.raw.platform===p&&r.bad.report_date)&&dd.every(d=>d.export_complete);
      const defects=definitionProblems.filter(d=>d.platform===p&&ss.some(s=>s.account_id===d.account_id));
      const signature=d=>JSON.stringify([...adSemanticFields,'report_timezone'].map(k=>d[k]));
      const compatible=ss.length>0&&!defects.length&&new Set(dd.map(signature)).size===1;
      const definitionState=!ss.length?'no_scope':defects.length?'unknown_definition':compatible?'consistent':'conflict';
      const ar=adSummaryRow+i,sp=ref(names.ad_daily,1,ar),val=ref(names.ad_daily,2,ar),ro=ref(names.ad_daily,3,ar);
      wb.worksheets.getItem(names.ad_daily).getCell(ar-1,0).values=[[p]];wb.worksheets.getItem(names.ad_daily).getCell(ar-1,4).values=[[definitionState]];
      writeFormula(names.ad_daily,1,ar,iff(all([coverage?'TRUE':'FALSE',...rr.map(r=>`${pc('ad_daily','spend_valid',r)}=1`)]),sum(rr.map(r=>pc('ad_daily','spend_cents',r)))));
      writeFormula(names.ad_daily,2,ar,iff(all([coverage&&compatible?'TRUE':'FALSE',...rr.map(r=>`${pc('ad_daily','value_valid',r)}=1`)]),sum(rr.map(r=>pc('ad_daily','reported_value_cents',r)))));
      writeFormula(names.ad_daily,3,ar,iff(all([num(sp),num(val),`${sp}>0`]),`${val}/${sp}`));adRefs[p]={sp,val,ro,inScope:ss.length>0,definitionState};
      if(ss.length&&!coverage)addIssue('ad_daily',null,'unknown_missing',p+':daily_coverage',{record_key:p,affected_metrics:['ad_spend','scope_contribution',p==='google_ads'?'google_roas':'meta_roas'],source_cells:[sp],next_evidence:`核对${p}具名账户/活动在本窗口逐日记录、唯一键与export_complete；零投放须明确0。`});
      for(const d of defects)addIssue('ad_report_definitions',d.index+1,'unknown_definition',`${d.field}:${d.reason}`,{record_key:key(d.platform,d.account_id),affected_metrics:[p==='google_ads'?'google_roas':'meta_roas'],source_cells:[`INPUT_CONTRACT.json:ad_report_definitions[${d.index}].${d.field}`],next_evidence:`补齐${d.platform}/${d.account_id}的${d.field}明确文本声明（${d.reason}）；不猜真实平台设置，已证费用保留。`});
      if(definitionState==='conflict'){const fields=[...adSemanticFields,'report_timezone'].filter(f=>new Set(dd.map(d=>d[f])).size>1);addIssue('ad_daily',null,'conflict',p+':report_definitions',{record_key:p,affected_metrics:[p==='google_ads'?'google_roas':'meta_roas'],source_cells:[...dd.map(d=>`INPUT_CONTRACT.json:ad_report_definitions[${c.ad_report_definitions.indexOf(d)}]`)],next_evidence:`核对${p}账户${dd.map(d=>d.account_id).join('、')}的${fields.join('、')}差异，取得同平台可兼容口径后重跑；不更改已证费用。`});}
    }
    build.getRange('A2').values=[['订单核算：美分公式与可证子范围']];
    const orderHeaders=['order_key','store_id','order_id','classification','gross_cents','discount_cents','before_refund_cents','item_refund_cents','refund_valid','known_item_net_cents','net_shipping_cents','net_tax_cents','net_cogs_cents','fulfillment_cents','payment_fee_cents','unallocated_cents','source_record'];
    build.getRangeByIndexes(24,0,1,orderHeaders.length).values=[orderHeaders];
    const oc=(o,f)=>ref('订单核算',orderHeaders.indexOf(f),o.row);
    for(const o of orders){build.getRangeByIndexes(o.row-1,0,1,orderHeaders.length).values=[[o.key,o.first.raw.store_id,o.first.raw.order_id,o.classification,NA,NA,NA,NA,0,NA,NA,NA,NA,NA,NA,NA,o.first.record].map(literal)];
      const p=o.first,validParent=!o.parentConflict&&!p.bad.currency&&!p.bad.order_gross&&!p.bad.order_discount&&o.classification!=='unresolved';
      const grossRefs=o.lines.map(r=>pc('order_lines','gross_cents',r)),discRefs=o.lines.map(r=>pc('order_lines','discount_cents',r)),netRefs=o.lines.map(r=>pc('order_lines','line_net_cents',r));
      const pg=pc('order_lines','parent_gross_cents',p),pd=pc('order_lines','parent_discount_cents',p);
      const inputGuard=all([validParent?'TRUE':'FALSE',...netRefs.map(num),`${sum(grossRefs)}=${pg}`,`${sum(discRefs)}=${pd}`]);
      writeFormula('订单核算',4,o.row,iff(inputGuard,sum(grossRefs)));writeFormula('订单核算',5,o.row,iff(inputGuard,sum(discRefs)));writeFormula('订单核算',6,o.row,iff(inputGuard,`${oc(o,'gross_cents')}-${oc(o,'discount_cents')}`));
      const refunds=o.refunds.filter(r=>r.classification==='matched_eligible');
      writeFormula('订单核算',7,o.row,sum(refunds.map(r=>pc('refund_events','item_cents',r))));
      const rg=all([c.refund_export_complete&&p.v.refund_history_complete&&!p.bad.refund_history_complete&&o.refunds.every(r=>r.valid&&r.classification==='matched_eligible')?'TRUE':'FALSE',...o.lines.map(r=>`${pc('order_lines','item_cap_ok',r)}=1`),num(oc(o,'before_refund_cents')),`${oc(o,'item_refund_cents')}<=${oc(o,'before_refund_cents')}`]);
      writeFormula('订单核算',8,o.row,`IF(${rg},1,0)`);
      writeFormula('订单核算',9,o.row,iff(`${oc(o,'refund_valid')}=1`,`${oc(o,'before_refund_cents')}-${oc(o,'item_refund_cents')}`));
      for(const [j,parentF,refundF] of [[10,'shipping_charged','shipping_cents'],[11,'tax_charged','tax_cents']]){const amount=pc('order_lines',parentF+'_cents',p),rt=sum(refunds.map(r=>pc('refund_events',refundF,r)));writeFormula('订单核算',j,o.row,iff(all([!o.parentConflict&&!p.bad[parentF]&&!p.bad.currency&&o.refunds.every(r=>r.valid)?'TRUE':'FALSE',c.refund_export_complete&&p.v.refund_history_complete?'TRUE':'FALSE',`${rt}<=${amount}`]),`${amount}-${rt}`));}
      for(const [j,vf,flag] of [[12,'cogs_cents','cogs_valid'],[13,'fulfillment_cents','fulfillment_valid'],[14,'fee_cents','fee_valid']]){const cr=o.costs[0];writeFormula('订单核算',j,o.row,iff(all([c.order_cost_export_complete&&o.costs.length===1?'TRUE':'FALSE',cr?`${pc('order_costs',flag,cr)}=1`:'FALSE']),cr?pc('order_costs',vf,cr):'0'));}
      writeFormula('订单核算',15,o.row,sum(refunds.filter(r=>!r.raw.line_id).map(r=>pc('refund_events','item_cents',r))));
    }
    for(const r of rows.order_lines){const o=r.order,ln=pc('order_lines','line_net_cents',r),rf=pc('order_lines','item_refund_cents',r);writeFormula(names.order_lines,9,r.prepRow,iff(all([o.classification==='eligible'?'TRUE':'FALSE',`${oc(o,'refund_valid')}=1`,`${oc(o,'unallocated_cents')}=0`,num(ln)]),`${ln}-${rf}`));writeFormula(names.order_lines,10,r.prepRow,o.classification==='excluded'?'"excluded"':`IF(${oc(o,'unallocated_cents')}>0,"allocation_unknown",IF(ISNUMBER(${pc('order_lines','sku_net_cents',r)}),"known","unknown_missing"))`);}
    const eligible=orders.filter(o=>o.classification==='eligible'),groupComplete=c.order_export_complete&&!orders.some(o=>o.classification==='unresolved');
    const unresolvedRefunds=rows.refund_events.filter(r=>['unmatched','unresolved'].includes(r.classification));
    const orphanCosts=rows.order_costs.some(r=>!r.order);
    const whole=(field,extra=true)=>iff(all([groupComplete&&extra?'TRUE':'FALSE',...eligible.map(o=>num(oc(o,field)))]),sum(eligible.map(o=>oc(o,field))));
    const coverageFields=['known_eligible','calculable','eligible_uncalculable','eligibility_unresolved','excluded','order_export_complete','eligibility_complete'];
    const coverageLabels=['已知合格订单','小计可计算订单','合格但净额不可算','资格未决订单','已知排除订单','订单导出完整','总体资格完整'];
    const coverageFormulas=[String(eligible.length),eligible.length?`COUNT(${eligible.map(o=>oc(o,'known_item_net_cents')).join(',')})`:'0','F5-F6',String(orders.filter(o=>o.classification==='unresolved').length),String(orders.filter(o=>o.classification==='excluded').length),c.order_export_complete?'1':'0',groupComplete?'1':'0'];
    build.getRange('E4:F4').values=[['小计覆盖（订单数）','数值/标志']];
    for(const [i,label] of coverageLabels.entries()){build.getCell(i+4,4).values=[[label]];writeFormula('订单核算',5,i+5,coverageFormulas[i]);}
    const metrics=[
      ['eligible_order_count','合格订单数',groupComplete?String(eligible.length):'"n.a."',false],
      ['pre_refund_item','退款前商品额',whole('before_refund_cents'),true],
      ['matched_item_refund','已关联商品退款',whole('item_refund_cents',eligible.every(o=>o.refunds.every(r=>r.valid))),true],
      ['known_item_subtotal','已确认商品净额小计',iff('F6>0',sum(eligible.map(o=>oc(o,'known_item_net_cents')))),true],
      ['complete_item_net','完整商品净额',whole('known_item_net_cents',!unresolvedRefunds.length),true],
      ['net_shipping','净运费收入',whole('net_shipping_cents',unresolvedRefunds.every(r=>r.v.shipping_refund===0)),true],
      ['net_tax','净税额',whole('net_tax_cents',unresolvedRefunds.every(r=>r.v.tax_refund===0)),true],
      ['net_receipts','净收取额',iff(all(['B9','B10','B11'].map(num)),'SUM(B9:B11)'),true],
      ['net_cogs','净商品成本',whole('net_cogs_cents',!orphanCosts),true],
      ['fulfillment','履约成本',whole('fulfillment_cents',!orphanCosts),true],
      ['payment_fee','支付费用',whole('payment_fee_cents',!orphanCosts),true],
      ['ad_spend','广告消耗',iff(all(Object.values(adRefs).filter(a=>a.inScope).map(a=>num(a.sp))),sum(Object.values(adRefs).filter(a=>a.inScope).map(a=>a.sp))),true],
      ['scope_contribution','范围贡献额',iff(all(['B9','B10','B13','B14','B15','B16'].map(num)),'B9+B10-B13-B14-B15-B16'),true],
      ['google_roas','Google自报ROAS',adRefs.google_ads.ro,false],
      ['meta_roas','Meta自报ROAS',adRefs.meta_ads.ro,false],
      ['unmatched_refund_count','未归属退款条数',String(unresolvedRefunds.length),false],
      ['unallocated_item_refund','订单未分摊商品退款',whole('unallocated_cents',eligible.every(o=>o.refunds.every(r=>r.valid))),true],
    ];
    build.getRange('A4:C4').values=[['指标','计算值（金额单位：美分）','metric_id']];
    mainSheet.getRange('A2').values=[['广告与电商核算']];mainSheet.getRange('A3').values=[[`${c.order_window_start.slice(0,10)} 至 ${c.order_window_end_exclusive.slice(0,10)}（不含）；截至 ${c.data_as_of}；USD`]];
    mainSheet.getRange('A5:D5').values=[['指标','数值','状态','说明与回查']];
    const explanations={known_item_subtotal:'可证小计，不代表全部订单净额',scope_contribution:'商品净额+净运费−三项成本−同期广告费；非净利润',net_tax:'税单列，不计范围贡献',google_roas:'本平台自报价值/费用；不跨平台作去重收入',meta_roas:'本平台自报价值/费用；口径不同不横比',unallocated_item_refund:'计入订单退款；相关SKU仍未知'};
    for(const [i,m] of metrics.entries()){
      const [id,label,f,monetary]=m,br=5+i,mr=6+i;build.getCell(br-1,0).values=[[label]];build.getCell(br-1,2).values=[[id]];writeFormula('订单核算',1,br,f);mainSheet.getCell(mr-1,0).values=[[label]];
      const b=ref('订单核算',1,br);writeFormula('核算与诊断',1,mr,monetary?iff(num(b),`${b}/100`):b);
      let missing=id==='known_item_subtotal'?'no_calculable_orders':'unknown_missing';if(['complete_item_net','net_receipts','scope_contribution'].includes(id)&&unresolvedRefunds.length)missing='unmatched';
      if(id==='google_roas'||id==='meta_roas'){
        const ar=adRefs[id==='google_roas'?'google_ads':'meta_ads'];
        const state=ar.definitionState==='unknown_definition'?'"unknown_definition"':ar.definitionState==='no_scope'?'"no_scope"':ar.definitionState==='conflict'?'"conflict"':`IF(ISNUMBER(B${mr}),"known",IF(AND(ISNUMBER(${ar.sp}),${ar.sp}=0),"zero_denominator","unknown_missing_or_conflict"))`;
        writeFormula('核算与诊断',2,mr,state);
      }else writeFormula('核算与诊断',2,mr,`IF(ISNUMBER(B${mr}),"known",${quote(missing)})`);
      mainSheet.getCell(mr-1,3).values=[[(explanations[id]??'仅声明范围，缺项见下方')+`；订单核算!B${br}`]];mainSheet.getCell(mr-1,1).setNumberFormat(monetary?'#,##0.00':id.includes('roas')?'0.00':'0');
    }
    mainSheet.getRange('A24:D24').values=[['小计可计算订单','已知合格订单','资格未决订单','合格但净额不可算']];
    for(const [j,r] of [6,5,8,7].entries())writeFormula('核算与诊断',j,25,ref('订单核算',5,r));
    mainSheet.getRange('A26:D26').values=[['已知排除订单','订单导出','总体资格','小计范围说明']];
    writeFormula('核算与诊断',0,27,ref('订单核算',5,9));writeFormula('核算与诊断',1,27,`IF(${ref('订单核算',5,10)}=1,"完整","不完整")`);writeFormula('核算与诊断',2,27,`IF(${ref('订单核算',5,11)}=1,"完整","存在未决或导出不完整")`);
    mainSheet.getRange('D27').values=[['仅已观察且可计算的合格订单；没有可计算订单不是金额0，也不等于总体净额已确认。']];
    const eventGroups=grouped(rows.web_events.filter(r=>r.raw.transaction_id),r=>key(r.raw.source_platform,r.raw.source_scope,r.raw.action,r.raw.transaction_id));
    const eventDefs=new Set(c.event_definitions.map(d=>key(d.source_platform,d.source_scope,d.action)));
    for(const r of rows.web_events){
      const ek=key(r.raw.source_platform,r.raw.source_scope,r.raw.action),o=orderMap.get(key(r.raw.store_id,r.raw.transaction_id));const flags=[];
      if(!c.web_events_supplied)flags.push('not_verified');if(!eventDefs.has(ek))flags.push('unsupported_action');if(!r.raw.transaction_id)flags.push('empty_transaction_id');if(eventGroups.get(key(ek,r.raw.transaction_id))?.length>1)flags.push('duplicate_send');if(r.duplicate||Object.keys(r.bad).length)flags.push('invalid_record');if(!o)flags.push('source_order_unmatched');
      r.trackingFlags=flags;setPrep('web_events',r,[r.raw.event_id,ek,r.raw.transaction_id,NA,r.v.value,NA,'pending_formula',flags.join(',')]);
      if(o&&eventDefs.has(ek)&&!r.duplicate&&!Object.keys(r.bad).length){writeFormula(names.web_events,3,r.prepRow,oc(o,'before_refund_cents'));writeFormula(names.web_events,5,r.prepRow,iff(all([num(pc('web_events','expected_cents',r)),num(pc('web_events','sent_cents',r))]),`${pc('web_events','sent_cents',r)}-${pc('web_events','expected_cents',r)}`));}
      const delta=pc('web_events','difference_cents',r);writeFormula(names.web_events,6,r.prepRow,`IF(ISNUMBER(${delta}),IF(${delta}=0,"source_match","source_value_mismatch"),"comparison_unavailable")`);
      for(const flag of flags)addIssue('web_events',r.record,flag,'tracking_only');
    }
    if(!c.web_events_supplied)addIssue('web_events',null,'not_verified','未提供采集证据');
    // Diagnostic presentation reads the same owning formulas, never redoes money arithmetic.
    wb.recalculate();
    const beforeEvents=rows.web_events.length?wb.worksheets.getItem(names.web_events).getRangeByIndexes(prep.web_events.start-1,0,rows.web_events.length,8).values:[];
    for(const [i,r] of rows.web_events.entries()){
      const v=beforeEvents[i];if(v[6]==='source_value_mismatch')addIssue('web_events',r.record,'source_value_mismatch','tracking_value_comparison',{record_key:r.raw.event_id,affected_metrics:['tracking_comparison_only'],source_cells:[`跟踪!D${r.prepRow}`,`跟踪!E${r.prepRow}`,`跟踪!F${r.prepRow}`],expected_cents:v[3],sent_cents:v[4],difference_cents:v[5],next_evidence:`事件${r.raw.event_id}，订单${key(r.raw.store_id,r.raw.transaction_id)}：源值${v[3]}、传出${v[4]}、差值${v[5]}美分。核对本事件value定义和实际传输记录；平台接收仍未证，不改收入。`});
      else if(v[6]==='comparison_unavailable')addIssue('web_events',r.record,'comparison_unavailable','tracking_value_comparison',{record_key:r.raw.event_id,affected_metrics:['tracking_comparison_only'],source_cells:[`跟踪!D${r.prepRow}`,`跟踪!E${r.prepRow}`,`跟踪!F${r.prepRow}`],next_evidence:`事件${r.raw.event_id}无法比较：${r.trackingFlags.join('、')||'源订单金额不可证'}。补可关联订单、支持的值定义及有效传出值；不把无法比较当相等。`});
    }
    for(const o of eligible){
      if(typeof build.getCell(o.row-1,9).values[0][0]!=='number'){
        const reasons=[];if(o.lines.some(r=>r.duplicate))reasons.push('商品行重复');if(o.lines.some(r=>Object.keys(r.bad).length))reasons.push('商品字段缺失或无效');if(!c.refund_export_complete||!o.first.v.refund_history_complete)reasons.push('退款覆盖未完整声明');if(o.refunds.some(r=>!r.valid||r.classification!=='matched_eligible'))reasons.push('退款关系或组成冲突');
        addIssue('order_lines',o.first.record,'order_net_unavailable','known_item_net_cents',{record_key:o.key,affected_metrics:['known_item_subtotal','complete_item_net','net_receipts','scope_contribution'],source_cells:[`订单核算!G${o.row}:J${o.row}`],next_evidence:`订单${o.key}未计入可证小计：${reasons.join('、')||'检查父子金额一致性、退款上限及退款完整性守卫'}。核对列出的原始记录并补证，不把该订单填0。`});
      }
      if(!o.costs.length)addIssue('order_costs',null,'unknown_missing','missing_cost_row',{record_key:o.key,affected_metrics:['net_cogs','fulfillment','payment_fee','scope_contribution'],source_cells:[`订单核算!M${o.row}:O${o.row}`],next_evidence:`补订单${o.key}的唯一成本记录：净商品成本、履约成本、支付费用；真实0须明确记录。`});
    }
    for(const r of rows.refund_events)if(r.classification==='matched_eligible'&&r.valid&&!r.raw.line_id&&r.v.item_refund>0)addIssue('refund_events',r.record,'allocation_unknown','order_item_refund_unallocated',{record_key:key(r.raw.refund_id,r.raw.refund_line_id),affected_metrics:['sku_net'],source_cells:[`退款!E${r.rawRow}`,`退款!I${r.rawRow}`],next_evidence:`退款${r.raw.refund_id}/${r.raw.refund_line_id}已计入订单${r.orderKey}，但缺商品分配证据；补SKU分配依据，不按售价猜。`});
    for(const x of issues){
      const r=x.record===null?null:rows[x.table]?.[x.record-1];
      x.record_key??=r?(x.table==='web_events'?r.raw.event_id:x.table==='refund_events'?key(r.raw.refund_id,r.raw.refund_line_id):x.table==='ad_daily'?key(r.raw.platform,r.raw.account_id,r.raw.campaign_id,r.raw.report_date):r.orderKey):'本次范围';
      x.source_cells??=r?[`${names[x.table]}!A${r.rawRow}:${col(schema[x.table].length-1)}${r.rawRow}`]:[];
      x.explanatory_only=['excluded','matched_ineligible'].includes(x.code);
      x.affected_metrics??=x.table==='web_events'?['tracking_comparison_only']:x.table==='order_costs'?[{net_cogs:'net_cogs',fulfillment_cost:'fulfillment',payment_fee:'payment_fee'}[x.detail]??'order_costs','scope_contribution']:x.table==='refund_events'?['complete_item_net','net_receipts','scope_contribution']:x.table==='ad_daily'?['ad_spend','platform_roas','scope_contribution']:['order_amounts','complete_item_net','scope_contribution'];
      if(!x.next_evidence){
        if(x.explanatory_only)x.next_evidence=`${x.record_key}按已知日期/状态排除；保留归类证据，无需把排除项补入本期。`;
        else if(x.table==='order_costs')x.next_evidence=`订单${x.record_key}：核对${x.detail}及唯一成本行，补实际值/证据；真0须明确。影响${x.affected_metrics.join('、')}。`;
        else if(x.table==='refund_events')x.next_evidence=`退款${x.record_key}，订单${r?.orderKey??'待定位'}：核实订单/商品归属、是否本期及${x.detail}；不能猜配或直接丢弃。影响${x.affected_metrics.join('、')}。`;
        else if(x.table==='web_events')x.next_evidence=`事件${x.record_key}：核查${x.code}的transaction_id、来源范围/动作、传输记录与源订单；平台收录未证，不改收入。`;
        else x.next_evidence=`${x.record_key}：核对${x.detail}对应原值、唯一键与本期范围，提供缺失/冲突证据后重跑；不猜补。影响${x.affected_metrics.join('、')}。`;
      }
    }
    mainSheet.getRange('A30:D30').values=[['表 / 记录键','逻辑记录','问题 / 影响指标','下一证据与回查']];
    if(issues.length)mainSheet.getRangeByIndexes(30,0,issues.length,4).values=issues.map(x=>[x.table+' / '+x.record_key,x.record??'',x.code+' / '+x.affected_metrics.join('、'),x.next_evidence+' 回查：'+x.source_cells.join('、')].map(literal));
    const snapshots={};
    for(const sn of ['核算与诊断','订单核算',...Object.values(names)]){const s=wb.worksheets.getItem(sn),used=s.getUsedRange();used.format.font={name:'Arial',size:10,color:'#202B3A'};used.format.verticalAlignment='center';used.format.rowHeight=22;used.format.columnWidth=24;s.showGridLines=false;s.getRange('A2').format.font={name:'Arial',size:14,bold:true};s.getRange('A3').format.font={name:'Arial',size:10,color:'#596577'};s.getRange('A4').format.font={name:'Arial',size:10,color:'#596577'};const heads=sn==='核算与诊断'?[[5,4]]:sn==='订单核算'?[[4,3],[25,17]]:[[6,schema[Object.keys(names).find(t=>names[t]===sn)].length],[prep[Object.keys(names).find(t=>names[t]===sn)].start-1,prepCols[Object.keys(names).find(t=>names[t]===sn)].length]];for(const [rr,cc] of heads){const h=s.getRangeByIndexes(rr-1,0,1,cc);h.format.fill='#26394A';h.format.font={name:'Arial',size:10,bold:true,color:'#FFFFFF'};h.format.horizontalAlignment='center';h.format.wrapText=true;h.format.rowHeight=42;}used.conditionalFormats.add('containsText',{text:'n.a.',format:{fill:'#FFF2D6',font:{color:'#9B5100'}}});s.getRangeByIndexes(0,0,used.values.length,1).format.columnWidth=24;if(sn==='核算与诊断'){s.getRangeByIndexes(0,0,used.values.length,1).format.columnWidth=28;s.getRangeByIndexes(0,1,used.values.length,1).format.columnWidth=17;s.getRangeByIndexes(0,2,used.values.length,1).format.columnWidth=29;s.getRangeByIndexes(0,3,used.values.length,1).format.columnWidth=76;}else s.freezePanes.freezeRows(6);snapshots[sn]=s.getUsedRange().values;}
    for(const t of tableNames){const s=wb.worksheets.getItem(names[t]);for(const [j,[field,type]] of schema[t].entries()){if(type==='D')s.getRangeByIndexes(0,j,s.getUsedRange().values.length,1).format.columnWidth=35;if(field==='note'){const notes=s.getRangeByIndexes(6,j,Math.max(rows[t].length,1),1);notes.format.columnWidth=50;notes.format.wrapText=true;notes.format.rowHeight=44;}}}
    mainSheet.getRange('B6:B22').format.horizontalAlignment='right';
    for(const rr of [24,26,30]){const h=mainSheet.getRangeByIndexes(rr-1,0,1,4);h.format.fill='#26394A';h.format.font={name:'Arial',size:10,bold:true,color:'#FFFFFF'};h.format.wrapText=true;h.format.rowHeight=42;}
    // Coverage is a separate small section; preserve the 17 main metric addresses.
    mainSheet.getRange('A25:D25').format.fill='#FFFFFF';mainSheet.getRange('A25:D25').format.font={name:'Arial',size:10,color:'#202B3A'};mainSheet.getRange('A25:D25').format.rowHeight=24;
    mainSheet.getRange('A27:D27').format.wrapText=true;mainSheet.getRange('A27:D27').format.rowHeight=64;
    if(issues.length){const detail=mainSheet.getRangeByIndexes(30,0,issues.length,4);detail.format.wrapText=true;detail.format.verticalAlignment='top';for(let i=0;i<issues.length;i++){const values=mainSheet.getRangeByIndexes(30+i,0,1,4).values[0];const units=s=>[...String(s)].reduce((n,ch)=>n+(ch.codePointAt(0)>255?2:1),0);const lines=Math.max(...values.map((v,j)=>Math.ceil(units(v)/[28,17,29,76][j])));mainSheet.getRangeByIndexes(30+i,0,1,4).format.rowHeight=Math.max(80,(lines+1)*16);}}
    build.getRange('E4:F4').format.fill='#26394A';build.getRange('E4:F4').format.font={name:'Arial',size:10,bold:true,color:'#FFFFFF'};build.getRange('E4:F11').format.wrapText=true;
    wb.worksheets.getItem('跟踪').getRangeByIndexes(0,1,prep.web_events.start+rows.web_events.length,1).format.columnWidth=52;
    wb.worksheets.getItem('跟踪').getRangeByIndexes(0,6,prep.web_events.start+rows.web_events.length,1).format.columnWidth=60;
    wb.worksheets.getItem('跟踪').getRangeByIndexes(prep.web_events.start-2,7,rows.web_events.length+1,1).format.columnWidth=60;
    for(const o of orders)build.getRangeByIndexes(o.row-1,1,1,2).format.numberFormat=[[literalFormat(o.first.raw.store_id),literalFormat(o.first.raw.order_id)]];
    wb.recalculate();
    const savedBefore=mainSheet.getRange('B6:C22').values;
    const coverageBefore=build.getRange('F5:F11').values;
    for(const s of Object.values(names))snapshots[s]=wb.worksheets.getItem(s).getUsedRange().values;
    const staging=path.join(runRoot,'staging');await noLinks(runRoot);await absent(staging);await fs.mkdir(staging);
    const unpatched=path.join(staging,'unpatched.xlsx'),bookPath=path.join(staging,BOOK);
    await (await SpreadsheetFile.exportXlsx(wb)).save(unpatched);
    const expectedFormulaText=JSON.stringify(formulas);if(Buffer.byteLength(expectedFormulaText)>1500000)throw Error('OUTPUT_FORMULA_LIMIT');
    const generatedBytes=await fs.readFile(unpatched);
    receipt.unpatched_preflight=await runPython(a['runtime-python'],ZIP_CHECK,[],{mode:'output',xlsx:generatedBytes.toString('base64'),expected:formulas});
    receipt.raw_patch=await runPython(a['runtime-python'],RAW_PATCH,[],{xlsx:generatedBytes.toString('base64'),destination:bookPath,raw:Object.fromEntries(tableNames.map(t=>[t,rows[t].map(r=>schema[t].map(([f])=>r.raw[f]))])),input_hashes:receipt.input_hashes});
    const patchedBytes=await fs.readFile(bookPath);
    receipt.output_preflight=await runPython(a['runtime-python'],ZIP_CHECK,[],{mode:'output',xlsx:patchedBytes.toString('base64'),expected:formulas});
    const reopened=await SpreadsheetFile.importXlsx(patchedBytes.buffer.slice(patchedBytes.byteOffset,patchedBytes.byteOffset+patchedBytes.byteLength));reopened.recalculate();
    const m=reopened.worksheets.getItem('核算与诊断').getRange('B6:C22').values;
    if(JSON.stringify(savedBefore)!==JSON.stringify(m))throw Error('SAVE_REOPEN_VALUES_CHANGED');
    const summary={};for(const [i,x] of metrics.entries())summary[x[0]]={value:m[i][0],state:m[i][1],cell:`核算与诊断!B${i+6}`,status_cell:`核算与诊断!C${i+6}`};
    const eventValues=reopened.worksheets.getItem(names.web_events).getRangeByIndexes(prep.web_events.start-1,0,Math.max(rows.web_events.length,1),8).values;
    const normalizedMatrix=matrix=>matrix.map(rr=>rr.map(v=>v??''));
    if(JSON.stringify(normalizedMatrix(beforeEvents))!==JSON.stringify(normalizedMatrix(eventValues.slice(0,rows.web_events.length))))throw Error('EVENT_DIAGNOSTIC_REOPEN_CHANGED');
    const eventOutput=rows.web_events.map((r,i)=>({record:r.record,event_id:r.raw.event_id,expected_cents:eventValues[i][3],sent_cents:eventValues[i][4],difference_cents:eventValues[i][5],state:eventValues[i][6],tracking_flags:eventValues[i][7]??'',cell:`跟踪!F${r.prepRow}`}));
    const coverageValues=reopened.worksheets.getItem('订单核算').getRange('F5:F11').values;
    if(JSON.stringify(coverageBefore)!==JSON.stringify(coverageValues))throw Error('COVERAGE_REOPEN_CHANGED');
    const coverage=Object.fromEntries(coverageFields.map((f,i)=>[f,{value:coverageValues[i][0],cell:`订单核算!F${i+5}`} ]));
    const lineValues=reopened.worksheets.getItem(names.order_lines).getRangeByIndexes(prep.order_lines.start-1,0,rows.order_lines.length,11).values;
    const skuOutput=rows.order_lines.map((r,i)=>({record:r.record,order_id:r.raw.order_id,sku:r.raw.sku,net_cents:lineValues[i][9],state:lineValues[i][10]}));
    const formulaErrorScan=assertFormulaResults(reopened,formulas);
    receipt.formula_result_gate=formulaErrorScan;
    const tableReadback={};for(const t of tableNames){const s=reopened.worksheets.getItem(names[t]);const rawRange=s.getRangeByIndexes(6,0,Math.max(rows[t].length,1),schema[t].length);const got=rawRange.values.map(row=>row.map(v=>v??''));if(rows[t].length){const want=rows[t].map(r=>schema[t].map(([f])=>r.raw[f]));if(JSON.stringify(got)!==JSON.stringify(want))throw Error(`RAW_VALUES_CHANGED:${t}`);if(rawRange.formulas.some(row=>row.some(v=>v)))throw Error('RAW_FORMULA_AFTER_REOPEN:'+t);}tableReadback[t]={records:rows[t].length,columns:schema[t].length,logical_records_start_at:1,physical_csv_lines:'not_claimed',source_sheet:names[t],source_start_cell:'A7'};}
    const actions=issues.filter(x=>!x.explanatory_only);
    const md=v=>String(v).replaceAll('|','\\|').replaceAll('\n',' ');
    const basis=Object.fromEntries(['contract_version','currency','minor_unit_digits','timezone','order_window_start','order_window_end_exclusive','data_as_of','advertising_scope','ad_report_definitions','event_definitions','cost_definition'].map(k=>[k,c[k]]));
    const comparable=previous?previous.package_comparison.same_frozen_package&&JSON.stringify(previous.snapshot.basis)===JSON.stringify(basis):null;
    const changes=previous?Object.entries(summary).filter(([id,v])=>JSON.stringify([v.value,v.state])!==JSON.stringify([previous.snapshot.summary[id]?.value,previous.snapshot.summary[id]?.state])).map(([id,v])=>({metric_id:id,before:previous.snapshot.summary[id],after:v})):[];
    const snapshot={version:VERSION,package:identity,job_id:job,run_id:a['run-id'],dataset_id:c.dataset_id,material_class:auth.material_class,basis,summary,coverage,issues,event_rows:eventOutput,sku_rows:skuOutput,input_hashes:receipt.input_hashes,previous_run:previous?{id:previous.id,sha256:previous.sha256,package_comparison:previous.package_comparison,comparable,changes}:null,generated_from:'saved_reopened_recalculated_workbook'};
    const body=['# 广告与电商核算诊断','',`来源类别：${auth.material_class}；数据集 ${c.dataset_id}。订单窗口：${c.order_window_start} 至 ${c.order_window_end_exclusive}（不含）；截至 ${c.data_as_of}。币种USD。`,'','## 已核算指标','','|metric_id|数值|状态|实际来源格|','|---|---:|---|---|',
      ...Object.entries(summary).map(([id,v])=>`|${id}|${v.value}|${v.state}|${v.cell}|`),
      '','## 小计覆盖','','|覆盖项|数值或0/1标志|实际来源格|','|---|---:|---|',
      ...Object.entries(coverage).map(([id,v])=>`|${id}|${v.value}|${v.cell}|`),
      '','可计算数包括真实零；零可计算集合不等于金额0。计数只描述已观察订单，完整性标志为0时不能把它当总体分母。孤儿退款仍单独保留。','',
      '## 可证明的差异与局部停止','',
      ...issues.map(x=>`- ${md(x.table)} / ${md(x.record_key)}，逻辑记录${x.record??'范围'}：${md(x.code)}（${md(x.detail)}）；影响${md(x.affected_metrics.join('、'))}。回查：${md(x.source_cells.join('、'))}。${x.explanatory_only?'此为已知排除说明，不是修复待办。':''}`),
      '','## 跟踪值对证','','|事件|源值（美分）|传出值（美分）|差值（美分）|比较状态|其他线索|来源格|','|---|---:|---:|---:|---|---|---|',
      ...eventOutput.map(v=>`|${md(v.event_id)}|${v.expected_cents}|${v.sent_cents}|${v.difference_cents}|${v.state}|${md(v.tracking_flags)}|${v.cell}|`),
      '','## 本次下一证据','',
      ...(actions.length?actions.map(x=>`- ${md(x.record_key)}：${md(x.next_evidence)}`):['本次声明范围内未发现所检类型的待处理问题；这不证明真实平台或未提供的数据正确。']),
      '','## 不可执行动作与限制','',
      '不自动调预算、改标签、操作账号、付款、库存或发布。平台自报转化价值不相加当去重收入。范围贡献额排除了税和合同外其他成本，不是净利润。跟踪异常只是离线线索，实际传输及平台收录需另证。',
      '本实用版尚待独立检查；原生Excel/WPS、真实账号采集及真实客户效果未验证。来源类别为original_safe时仅为原创安全工程验证，不是实际经营表现。','',
      '## 与上次运行比较','',
      ...(previous?[`上次运行 ${previous.id}；${comparable?'同一冻结包，窗口与口径一致，可比较实际值和状态。':'同一冻结包，但窗口、截至日或口径已变化，不作直接经营变化比较；以下仅记录结果差异。'}`,`前次包 ${previous.package_comparison.previous.version} / ${previous.package_comparison.previous.sha256}；本次包 ${identity.version} / ${identity.sha256}。`,'','|metric_id|上次值 / 状态|本次值 / 状态|','|---|---|---|',...changes.map(x=>`|${x.metric_id}|${x.before?.value} / ${x.before?.state}|${x.after.value} / ${x.after.state}|`),`其余 ${Object.keys(summary).length-changes.length} 项主指标的值与状态未变。`]:['首次运行，无历史比较。']), '',
      '结果生成自本次保存重开的工作簿。更改源数据、键或状态须重跑；Excel改格不自动更新本文件。',''].join('\n');
    await fs.writeFile(path.join(staging,REPORT),body,{flag:'wx'});
    await jsonWrite(path.join(staging,SNAPSHOT),snapshot,'wx');
    for(const [p,h] of Object.entries(receipt.input_hashes))if(sha(await inputBytes(p,5*1024*1024))!==h)throw Error('INPUT_CHANGED_DURING_RUN');
    if((await packageIdentity()).sha256!==identity.sha256)throw Error('PACKAGE_CHANGED_DURING_RUN');
    const checks={status:'completed_local',scope:'engine_save_reopen_and_report_checks_not_independent_QA',summary,coverage,table_readback:tableReadback,sku_rows:skuOutput,event_rows:eventOutput,issues,formula_count:Object.keys(formulas).length,formula_fingerprint:sha(expectedFormulaText),save_reopen_equal:true,inputs_unchanged:true,formula_error_scan:formulaErrorScan,visual_review:'PENDING_HUMAN_AGENT_IMAGE_INSPECTION',native_host:'NOT_RUN',independent_qa:'NOT_RUN'};
    await jsonWrite(path.join(evidence,'VERIFICATION_RESULT.json'),checks,'wx');
    for(const sn of Object.values(names))snapshots[sn]=reopened.worksheets.getItem(sn).getUsedRange().values;
    await jsonWrite(path.join(evidence,'FORMULA_VALUE_CHECK.json'),{formulas,main_values:m,source_values:snapshots},'wx');
    receipt.rendered_sheets=[];
    for(const sn of ['核算与诊断','订单核算',...Object.values(names)]){const preview=await reopened.render({sheetName:sn,autoCrop:'all',scale:1,format:'png'});await fs.writeFile(path.join(evidence,sn+'.png'),new Uint8Array(await preview.arrayBuffer()),{flag:'wx'});receipt.rendered_sheets.push(sn);}
    await noLinks(runRoot);await absent(out);await fs.mkdir(out);
    receipt.output_hashes={};for(const f of [BOOK,REPORT,SNAPSHOT]){await noLinks(out);await fs.copyFile(path.join(staging,f),path.join(out,f),fsConstants.COPYFILE_EXCL);const original=sha(await fs.readFile(path.join(staging,f))),copied=sha(await fs.readFile(path.join(out,f)));if(original!==copied)throw Error('FINAL_COPY_HASH_MISMATCH');receipt.output_hashes[f]=copied;}
    if(JSON.stringify((await fs.readdir(out)).sort())!==JSON.stringify([BOOK,REPORT,SNAPSHOT].sort()))throw Error('OUTPUT_MEMBER_SET');
    receipt.status='completed_local';receipt.completed_at=new Date().toISOString();receipt.formula_count=Object.keys(formulas).length;receipt.visual_review='PENDING_HUMAN_AGENT_IMAGE_INSPECTION';receipt.output_exact_three_files=true;receipt.copy_hashes_equal=true;await jsonWrite(rp,receipt);
    console.log(JSON.stringify({status:receipt.status,output_dir:out,evidence_dir:evidence,summary,visual_review:receipt.visual_review}));
  }catch(err){receipt.status='failed';receipt.failed_at=new Date().toISOString();receipt.error=String(err.stack??err);try{receipt.remaining_output_files=await fs.readdir(out);}catch{receipt.remaining_output_files=[];}await jsonWrite(rp,receipt);throw err;}
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try { const a=argsFor(process.argv.slice(2));if(a.help)console.log(a.help);else await main(a); }
  catch(e) { console.error('RUN_REJECTED: '+String(e.message).split('\n')[0].slice(0,350));process.exitCode=2; }
}
