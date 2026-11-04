#!/usr/bin/env node
// Local static URL preparation only. No network, account access or dependency install.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const args = process.argv.slice(2);
const help = 'Usage: node tools/static_utm.mjs --input <admitted-input.json> --output <new-output.json>\nRead-before-open admission is the caller responsibility. Existing Node >=18, no network. Max 1 MiB / 500 ads. No overwrite/symlink. Exit 0 all rows valid, 1 row failures, 2 argument/schema/path/I/O failure. Invalid rows never contain a usable URL.';
function fail(code) {
  console.error(JSON.stringify({runtime_status:'NEEDS_FIX',error:code,live_action_authorized:false,causal_claim_allowed:false}));
  process.exit(2);
}
if (args.length === 1 && args[0] === '--help') {console.log(help); process.exit(0);}
if (args.length !== 4 || args[0] !== '--input' || args[2] !== '--output' || !args[1] || !args[3]) fail('EXPLICIT_INPUT_OUTPUT_REQUIRED');
const input = path.resolve(args[1]), output = path.resolve(args[3]);
if (input === output) fail('INPUT_OUTPUT_MUST_DIFFER');
function checkPath(file, missingLeaf = false) {
  const root = path.parse(file).root, parts = file.slice(root.length).split(path.sep).filter(Boolean);
  let current = root;
  for (let i=0;i<parts.length;i++) {
    current = path.join(current,parts[i]);
    try {
      const st=fs.lstatSync(current);
      if(st.isSymbolicLink()) throw Error('SYMLINK_REJECTED');
      if(i<parts.length-1 && !st.isDirectory()) throw Error('PATH_NOT_DIRECTORY');
      if(i===parts.length-1 && missingLeaf) throw Error('OUTPUT_EXISTS');
      if(i===parts.length-1 && !missingLeaf && !st.isFile()) throw Error('INPUT_SIZE_OR_TYPE');
    } catch(e) {
      if(e.code==='ENOENT' && missingLeaf && i===parts.length-1) return;
      if(['SYMLINK_REJECTED','PATH_NOT_DIRECTORY','OUTPUT_EXISTS','INPUT_SIZE_OR_TYPE'].includes(e.message)) throw e;
      throw Error('PATH_UNAVAILABLE');
    }
  }
}
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
function plain(x) {return x !== null && typeof x === 'object' && !Array.isArray(x);}
function exactKeys(obj, required, optional=[]) {
  return plain(obj) && required.every(k=>Object.hasOwn(obj,k)) && Object.keys(obj).every(k=>required.includes(k)||optional.includes(k));
}
function text(x,max=2048) {return typeof x==='string' && x.length>0 && x.length<=max && !/[\u0000-\u001f\u007f]/u.test(x);}
function parseJSON(raw) {
  const data=JSON.parse(raw); // Validate syntax first; then reject duplicate object keys, including escaped aliases.
  const stack=[]; const tokens=raw.matchAll(/"(?:\\.|[^"\\])*"|[{}\[\],:]/g);
  for(const m of tokens) {
    const t=m[0],top=stack.at(-1);
    if(t==='{') stack.push({kind:'object',key:true,seen:new Set()});
    else if(t==='[') stack.push({kind:'array'});
    else if(t==='}'||t===']') stack.pop();
    else if(t===',' && top?.kind==='object') top.key=true;
    else if(t===':' && top?.kind==='object') top.key=false;
    else if(t.startsWith('"') && top?.kind==='object' && top.key) {
      const key=JSON.parse(t); if(top.seen.has(key)) throw Error('DUPLICATE_JSON_KEY'); top.seen.add(key);
    }
  }
  return data;
}
let raw, data;
try {
  checkPath(input); checkPath(output,true);
  const fd=fs.openSync(input,fs.constants.O_RDONLY|fs.constants.O_NOFOLLOW);
  try {
    const st=fs.fstatSync(fd);
    if(!st.isFile() || st.size>1024*1024) throw Error('INPUT_SIZE_OR_TYPE');
    raw=fs.readFileSync(fd);
    if(raw.length>1024*1024) throw Error('INPUT_SIZE_OR_TYPE');
  } finally {fs.closeSync(fd);}
  const str=new TextDecoder('utf-8',{fatal:true}).decode(raw);
  data=parseJSON(str);
} catch(e) {
  fail(['SYMLINK_REJECTED','OUTPUT_EXISTS','PATH_UNAVAILABLE','PATH_NOT_DIRECTORY','INPUT_SIZE_OR_TYPE','DUPLICATE_JSON_KEY'].includes(e.message)?e.message:'INPUT_READ_OR_JSON_INVALID');
}
if(!exactKeys(data,['schema_version','admission','ads']) || data.schema_version!==1 ||
   !exactKeys(data.admission,['classification','read_scope_confirmed','confirmation_ref']) ||
   !['synthetic','public_non_sensitive','owner_non_sensitive'].includes(data.admission.classification) ||
   data.admission.read_scope_confirmed!==true || !text(data.admission.confirmation_ref,500) ||
   !Array.isArray(data.ads) || data.ads.length<1 || data.ads.length>500) fail('INPUT_CONTRACT_INVALID');
const allowedTags = new Set(['utm_source','utm_medium','utm_campaign','utm_content','utm_term','utm_id','utm_source_platform']);
const unsafeKey = /(?:token|secret|password|passwd|signature|credential|session|auth|email|e-mail|phone|customer|client[_-]?id|user[_-]?id|order|address|account|api[_-]?key|access[_-]?key|contact|person|name|sig$|^key$)/i;
const unsafeValue = /[^\s@]+@[^\s@]+\.[^\s@]+|(?:bearer\s|sk_live_|access_token|api_key)/i;
function malformed(s) {try {decodeURIComponent(s); return false;}catch{return true;}}
function macro(s) {return /[{}]/u.test(s);}
function layers(s) {
  const a=[s]; let t=s;
  for(let i=0;i<3;i++) {try {const n=decodeURIComponent(t.replaceAll('+',' ')); if(n===t)break; a.push(n);t=n;}catch{break;}}
  return a;
}
function unsafeValueIn(s) {return layers(s).some(x=>unsafeValue.test(x)||macro(x)||/[\u0000-\u001f\u007f]/u.test(x));}
function checkedURL(rawUrl) {
  if(!text(rawUrl,8192)||rawUrl.trim()!==rawUrl||/[\s\\]/u.test(rawUrl)||malformed(rawUrl)||!/^https:\/\//u.test(rawUrl)) throw Error('URL_SYNTAX_OR_ENCODING');
  const u=new URL(rawUrl);
  if(u.protocol!=='https:'||u.username||u.password) throw Error('HTTPS_WITHOUT_USERINFO_REQUIRED');
  if(unsafeValueIn(rawUrl)) throw Error('UNSAFE_VALUE_OR_TEMPLATE');
  const fragments=layers(u.hash.slice(1));
  if(fragments.some(s=>/(?:^|[?&])utm_/iu.test(s))) throw Error('UTM_IN_FRAGMENT');
  // A fragment can contain identity/router data too; the caller must admit it before reading.
  if(fragments.some(s=>s.split(/[?&]/u).some(pair=>pair.includes('=')&&unsafeKey.test(pair.split('=')[0])))) throw Error('SENSITIVE_OR_SIGNED_URL');
  for(const [key,val] of u.searchParams) {
    if(layers(key).some(x=>unsafeKey.test(x))) throw Error('SENSITIVE_OR_SIGNED_URL');
    if(unsafeValueIn(val)) throw Error('UNSAFE_VALUE_OR_TEMPLATE');
    if(layers(key).some(x=>/^utm_/i.test(x))) throw Error('EXISTING_UTM_REQUIRES_RESOLUTION');
  }
  return u;
}
const idCounts=new Map();
for(const row of data.ads) if(plain(row)&&typeof row.ad_id==='string')idCounts.set(row.ad_id,(idCounts.get(row.ad_id)||0)+1);
const results=data.ads.map((row,index)=>{
  try {
    if(!exactKeys(row,['ad_id','destination_confirmation','destination_url','tags'])) throw Error('AD_SCHEMA');
    if(!/^[A-Za-z][A-Za-z0-9_.-]{0,63}$/u.test(row.ad_id)||idCounts.get(row.ad_id)!==1) throw Error('AD_ID_INVALID_OR_DUPLICATE');
    const conf=row.destination_confirmation;
    if(!exactKeys(conf,['origin','path','evidence_ref']) || !text(conf.origin,2048)||!text(conf.path,4096)||!text(conf.evidence_ref,500)) throw Error('DESTINATION_CONFIRMATION_REQUIRED');
    const expected=new URL(conf.origin);
    if(expected.protocol!=='https:'||expected.username||expected.password||expected.origin!==conf.origin||expected.pathname!=='/'||expected.search||expected.hash) throw Error('EXPECTED_ORIGIN_INVALID');
    if(!conf.path.startsWith('/')||conf.path.startsWith('//')||/[?#\\\s]/u.test(conf.path)||malformed(conf.path)) throw Error('EXPECTED_PATH_INVALID');
    const expectedPathURL=new URL(conf.path,conf.origin);
    if(expectedPathURL.origin!==conf.origin||expectedPathURL.pathname!==conf.path) throw Error('EXPECTED_PATH_NOT_CANONICAL');
    const u=checkedURL(row.destination_url);
    if(u.origin!==conf.origin||u.pathname!==conf.path) throw Error('DESTINATION_MISMATCH');
    if(!plain(row.tags)||Object.keys(row.tags).length>allowedTags.size ||
       !['utm_source','utm_medium','utm_campaign'].every(k=>Object.hasOwn(row.tags,k))) throw Error('TAG_CONTRACT');
    for(const [key,value] of Object.entries(row.tags)) {
      if(!allowedTags.has(key)||!text(value,500)||value.trim()!==value||unsafeValueIn(value)) throw Error('TAG_INVALID_OR_UNSAFE');
      // Input is raw semantic text, not pre-encoded query data. Ask for raw values instead of guessing.
      if(/%[0-9a-f]{2}/iu.test(value)) throw Error('TAG_MUST_BE_RAW_VALUE');
    }
    const encoded=new URLSearchParams(Object.entries(row.tags)).toString();
    const h=row.destination_url.indexOf('#');
    const head=h<0?row.destination_url:row.destination_url.slice(0,h),tail=h<0?'':row.destination_url.slice(h);
    const q=head.indexOf('?'),join=q<0?'?':head.endsWith('?')||head.endsWith('&')?'':'&';
    const finalUrl=head+join+encoded+tail, parsed=new URL(finalUrl);
    if(parsed.origin!==u.origin||parsed.pathname!==u.pathname||parsed.hash!==u.hash) throw Error('ROUNDTRIP_DESTINATION');
    for(const [key,val] of Object.entries(row.tags)) if(parsed.searchParams.getAll(key).length!==1||parsed.searchParams.get(key)!==val) throw Error('ROUNDTRIP_TAG');
    const oldPairs=[...u.searchParams],newPairs=[...parsed.searchParams].filter(([k])=>!allowedTags.has(k));
    if(JSON.stringify(oldPairs)!==JSON.stringify(newPairs)) throw Error('ROUNDTRIP_EXISTING_QUERY');
    return {index,ad_id:row.ad_id,runtime_status:'DRAFT',url:finalUrl,checks:{destination_matches_declared_confirmation:true,confirmation_independently_verified_by_tool:false,query_and_fragment_preserved:true,tag_values_roundtrip:true},live_final_url:'UNKNOWN',analytics_receipt:'UNKNOWN'};
  } catch(e) {
    const known=['AD_SCHEMA','AD_ID_INVALID_OR_DUPLICATE','DESTINATION_CONFIRMATION_REQUIRED','EXPECTED_ORIGIN_INVALID','EXPECTED_PATH_INVALID','EXPECTED_PATH_NOT_CANONICAL','URL_SYNTAX_OR_ENCODING','UNSAFE_VALUE_OR_TEMPLATE','HTTPS_WITHOUT_USERINFO_REQUIRED','UTM_IN_FRAGMENT','SENSITIVE_OR_SIGNED_URL','EXISTING_UTM_REQUIRES_RESOLUTION','DESTINATION_MISMATCH','TAG_CONTRACT','TAG_INVALID_OR_UNSAFE','TAG_MUST_BE_RAW_VALUE','ROUNDTRIP_DESTINATION','ROUNDTRIP_TAG','ROUNDTRIP_EXISTING_QUERY'];
    return {index,runtime_status:'NEEDS_FIX',errors:[known.includes(e.message)?e.message:'URL_OR_SCHEMA_INVALID']};
  }
});
const passed=results.filter(x=>x.runtime_status==='DRAFT').length,failed=results.length-passed;
const report={schema_version:1,runtime_status:failed?'NEEDS_FIX':'DRAFT',input_sha256:hash(raw),passed,failed,results,scope:'Local strings only; caller admission and destination evidence not independently certified',network_requests:0,live_action_authorized:false,causal_claim_allowed:false};
const serialized=JSON.stringify(report,null,2)+'\n';
try {
  checkPath(output,true); // Recheck immediately before exclusive creation.
  const fd=fs.openSync(output,fs.constants.O_WRONLY|fs.constants.O_CREAT|fs.constants.O_EXCL|fs.constants.O_NOFOLLOW,0o600);
  try {fs.writeFileSync(fd,serialized,'utf8');fs.fsyncSync(fd);} finally {fs.closeSync(fd);}
  checkPath(output);
  const fdRead=fs.openSync(output,fs.constants.O_RDONLY|fs.constants.O_NOFOLLOW);
  let reread;try{reread=fs.readFileSync(fdRead);}finally{fs.closeSync(fdRead);}
  if(reread.toString('utf8')!==serialized)throw Error('OUTPUT_READBACK_MISMATCH');
  console.log(JSON.stringify({runtime_status:report.runtime_status,passed,failed,output_sha256:hash(reread),readback_equal:true,network_requests:0,live_action_authorized:false,causal_claim_allowed:false}));
} catch(e) {fail(e.message==='OUTPUT_READBACK_MISMATCH'?e.message:'OUTPUT_PATH_WRITE_OR_READBACK_FAILED');}
process.exit(failed?1:0);
