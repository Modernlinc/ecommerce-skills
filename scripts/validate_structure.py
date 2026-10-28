#!/usr/bin/env python3
"""Validate this public catalog using the Python standard library only."""
from pathlib import Path
import csv
from datetime import date
from decimal import Decimal, InvalidOperation
import io
import json
import re
import subprocess
import sys
import unicodedata
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = (
    'meta-facebook-ads', 'google-ads', 'codex-ecommerce', 'shopify-store',
    'google-seo', 'tiktok-content', 'social-content', 'reddit-research',
    'pinterest-commerce', 'amazon-us', 'ad-creative', 'ecommerce-analytics',
    'customer-support', 'brand-brief', 'product-selection',
    'influencer-collaboration', 'ecommerce-backoffice', 'b2b-quotation',
)
VERSION = '0.1.1-public-demo'
HEADINGS = ('功能摘要', '输入', '输出', '演示步骤', '示例输入', '示例输出', '演示材料', '限制说明', '版本')
INPUT_LABEL = 'Synthetic demo data. No real customer, account, order, or advertising data is used.'
OUTPUT_LABEL = 'Public synthetic demonstration. This is not a real customer result and does not prove live external execution or business performance.'
REQUIRED = (
    'README.md', 'README_EN.md', 'LICENSE', 'NOTICE.md', 'CHANGELOG.md',
    'CONTRIBUTING.md', 'SECURITY.md', 'PUBLICATION_AUDIT.md', '.gitignore',
    'docs/getting-started.md', 'docs/skill-catalog.md',
    'docs/public-private-boundary.md', 'docs/licensing.md',
    'docs/demo-evidence-policy.md', 'docs/faq.md', 'examples/README.md',
    'examples/synthetic-product-brief.md', 'examples/synthetic-ecommerce-task.md',
    'scripts/validate_structure.py', 'scripts/scan_public_leaks.py',
    'tests/test_structure.py', 'tests/expected-skills.txt', 'skills/README.md',
    '.github/PULL_REQUEST_TEMPLATE.md', '.github/workflows/validate-public-repo.yml',
    'SUPPORT.md', 'catalog.json', 'docs/compatibility.md',
    'docs/evaluation-and-delivery.md', 'tests/test_product_contract.py',
    'docs/updates-and-feedback.md',
    '.github/ISSUE_TEMPLATE/01-product-question.md',
    '.github/ISSUE_TEMPLATE/02-documentation.md',
)
CSV_FIELDS = {
    'orders.csv': ('order_id', 'currency', 'gross_usd'),
    'items.csv': ('order_id', 'cost_usd'),
    'refunds.csv': ('order_id', 'refund_usd'),
    'fees.csv': ('order_id', 'payment_fee_usd'),
    'ads.csv': ('day', 'spend_usd', 'platform_attributed_revenue_usd'),
}


def heading_ids(text):
    counts = {}
    result = set()
    for heading in re.findall(r'^#{1,6} (.+)$', text, re.M):
        slug = ''.join(c for c in heading.lower() if c in ' -_' or unicodedata.category(c)[0] in 'LN').replace(' ', '-')
        count = counts.get(slug, 0)
        result.add(slug if count == 0 else f'{slug}-{count}')
        counts[slug] = count + 1
    return result


def embedded_input(input_text):
    """Normalize heading levels only; preserve every task fact and CSV value."""
    payload = input_text.split('\n## 导航\n', 1)[0].split('\n', 1)[1].lstrip().rstrip()
    return re.sub(r'^(#{1,4}) ', lambda m: '##' + m[1] + ' ', payload, flags=re.M)


def entity_errors(input_text, output_text):
    # The deliberately shared synthetic brand must not leak facts across cases.
    entities = set(re.findall(r'\bLoopNest(?: [A-Z][A-Za-z0-9-]*)?', output_text))
    return ['reference introduces a product absent from its own input' for entity in entities if entity not in input_text]


def rsa_errors(text):
    """Check this ASCII-only example, not a general Google Ads policy engine."""
    rows = re.findall(r'^\|(Headline|Description) (\d+)\|([^|]+)\|(\d+)\|$', text, re.M)
    errors = []
    if [(kind, int(n)) for kind, n, _, _ in rows] != [('Headline', n) for n in range(1, 9)] + [('Description', n) for n in range(1, 3)]:
        errors.append('RSA example asset set is incomplete or reordered')
    for kind, _, value, count in rows:
        if not value.isascii() or len(value) != int(count):
            errors.append('RSA example character count is incorrect or outside ASCII scope')
        if len(value) > (30 if kind == 'Headline' else 90):
            errors.append('RSA example exceeds documented field length')
    return errors


def csv_record(name, text):
    reader = csv.DictReader(io.StringIO(text))
    if tuple(reader.fieldnames or ()) != CSV_FIELDS[name]:
        raise ValueError('incorrect CSV header')
    rows = list(reader)
    if len(rows) != 1 or None in rows[0] or any(v is None or not v.strip() for v in rows[0].values()):
        raise ValueError('example requires exactly one complete data row')
    row = rows[0]
    if 'currency' in row and row['currency'] != 'USD':
        raise ValueError('example currency must be USD')
    if 'day' in row:
        try:
            date.fromisoformat(row['day'])
        except ValueError as exc:
            raise ValueError('invalid date') from exc
    for key, raw in row.items():
        if key.endswith('_usd'):
            try:
                value = Decimal(raw)
            except InvalidOperation as exc:
                raise ValueError('invalid amount') from exc
            if not value.is_finite() or value < 0:
                raise ValueError('amount must be finite and nonnegative')
    return row


def catalog_errors(root):
    errors = []
    try:
        catalog = json.loads((root / 'catalog.json').read_text())
        if catalog['version'] != VERSION or catalog['schema_version'] != 1 or catalog['distribution'] != 'public-demo-only':
            errors.append('catalog: incorrect schema/version/distribution')
        if catalog['evidence_type'] != 'authored-synthetic-reference':
            errors.append('catalog: incorrect evidence type')
        entries = catalog['skills']
        if [s['slug'] for s in entries] != list(EXPECTED):
            return errors + ['catalog: declared Skill order/set changed']
        for n, item in enumerate(entries, 1):
            slug = item['slug']
            if item['id'] != f'{n:02d}':
                errors.append(slug + ': incorrect catalog id')
            paths = {'card': f'skills/{slug}/SKILL.md', 'exercise': f'skills/{slug}/examples/demo.md',
                     'input': f'skills/{slug}/examples/input.md', 'reference_output': f'skills/{slug}/examples/output.md',
                     'media_note': f'skills/{slug}/assets/screenshots/README.md'}
            if item['files'] != paths:
                errors.append(slug + ': catalog paths differ from the public layout')
                continue
            for key in ('input_requirements', 'deliverables', 'reader_checks'):
                if not isinstance(item[key], list) or not item[key] or not all(isinstance(x, str) and x.strip() for x in item[key]):
                    errors.append(slug + ': empty public contract field ' + key)
            fm = frontmatter((root / paths['card']).read_text())
            if item['name_zh'] != fm['metadata']['display_name_zh'] or item['name_en'] != fm['metadata']['display_name_en']:
                errors.append(slug + ': catalog display name mismatch')
            inp = (root / paths['input']).read_text()
            demo = (root / paths['exercise']).read_text()
            actual = demo.split('## 合成输入\n\n', 1)[1].split('\n## 读者核对\n', 1)[0].rstrip()
            if actual != embedded_input(inp):
                errors.append(slug + ': single-file exercise input drifted')
            if VERSION not in demo:
                errors.append(slug + ': exercise version missing')
            for x in item['deliverables']:
                if '- ' + x + '。\n' not in demo:
                    errors.append(slug + ': exercise omits a declared deliverable')
            for x in item['reader_checks']:
                if '- [ ] ' + x + '\n' not in demo:
                    errors.append(slug + ': exercise omits a reader check')
            out = (root / paths['reference_output']).read_text()
            errors.extend(slug + ': ' + e for e in entity_errors(inp, out))
            if slug == 'google-ads':
                errors.extend(slug + ': ' + e for e in rsa_errors(out))
    except (OSError, ValueError, KeyError, TypeError, IndexError) as exc:
        errors.append('catalog: invalid or incomplete product contract (' + type(exc).__name__ + ')')
    return errors


def analytics_errors(root):
    errors = []
    base = root / 'skills/ecommerce-analytics/examples'
    try:
        inp = (base / 'input.md').read_text()
        rows = {}
        for name in CSV_FIELDS:
            raw = (base / 'data' / name).read_text()
            rows[name] = csv_record(name, raw)
            blocks = re.findall(r'^## ' + re.escape(name) + r'\n\n```csv\n(.*?)```', inp, re.M | re.S)
            if len(blocks) != 1 or blocks[0] != raw:
                errors.append(name + ': downloadable CSV and embedded input differ')
        if len({rows[name]['order_id'] for name in ('orders.csv', 'items.csv', 'refunds.csv', 'fees.csv')}) != 1:
            errors.append('CSV order identity mismatch')
        gross = Decimal(rows['orders.csv']['gross_usd'])
        refund = Decimal(rows['refunds.csv']['refund_usd'])
        cost = Decimal(rows['items.csv']['cost_usd'])
        fee = Decimal(rows['fees.csv']['payment_fee_usd'])
        spend = Decimal(rows['ads.csv']['spend_usd'])
        revenue = Decimal(rows['ads.csv']['platform_attributed_revenue_usd'])
        if spend <= 0:
            return errors + ['example ROAS requires positive spend']
        expected = {'订单净销售额': gross-refund, '已列成本后的订单贡献': gross-refund-cost-fee,
                    '扣本例广告支出后的范围贡献': gross-refund-cost-fee-spend, '平台报告ROAS': revenue/spend}
        output = (base / 'output.md').read_text()
        for label, value in expected.items():
            match = re.search(r'^\|' + label + r'\|[^|]+\|([^|]+)\|$', output, re.M)
            if not match or Decimal(match[1].split()[0]) != value:
                errors.append('analytics reference result differs from CSV: ' + label)
    except (OSError, ValueError, InvalidOperation, KeyError, TypeError) as exc:
        errors.append('analytics: malformed example (' + type(exc).__name__ + ')')
    return errors


def frontmatter(text):
    """Parse the deliberately small YAML subset authored for these cards.

    This is not a general YAML parser. Reject unsupported nesting or scalar forms.
    """
    match = re.match(r'\A---\n(.*?)\n---\n', text, re.S)
    if not match:
        raise ValueError('missing or malformed frontmatter')
    result = {}
    metadata = False
    for line in match[1].splitlines():
        m = re.fullmatch(r'(  )?([a-z_]+):(?: (.+))?', line)
        if not m:
            raise ValueError('unsupported frontmatter form')
        indent, key, raw = m.groups()
        if indent:
            if not metadata or raw is None:
                raise ValueError('invalid metadata field')
            target = result['metadata']
        else:
            metadata = key == 'metadata'
            target = result
            if metadata:
                if raw is not None or key in result:
                    raise ValueError('invalid metadata mapping')
                result[key] = {}
                continue
        if key in target or raw is None:
            raise ValueError('duplicate or empty frontmatter field')
        if raw.startswith('"'):
            try:
                value = json.loads(raw)
            except json.JSONDecodeError as exc:
                raise ValueError('invalid quoted scalar') from exc
        elif re.fullmatch(r'[a-z0-9][a-z0-9.-]*', raw):
            value = raw
        else:
            raise ValueError('unsupported scalar')
        if not isinstance(value, str) or not value.strip():
            raise ValueError('field must be a nonempty string')
        target[key] = value
    if set(result) != {'name', 'description', 'metadata'}:
        raise ValueError('unsupported or missing discovery fields')
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', result['name']) or len(result['name']) > 64:
        raise ValueError('invalid Skill name')
    if not result['description'].strip() or len(result['description']) > 1024:
        raise ValueError('invalid description')
    return result


def local_link_error(root, source, href):
    parsed = urlsplit(href)
    if parsed.scheme or parsed.netloc:
        return None
    if parsed.path.startswith('/'):
        return 'absolute local link'
    target = (source.parent / unquote(parsed.path)).resolve() if parsed.path else source.resolve()
    if not target.is_relative_to(root.resolve()):
        return 'link escapes repository'
    if not target.exists():
        return 'missing local link'
    if parsed.fragment and target.suffix == '.md' and unquote(parsed.fragment) not in heading_ids(target.read_text()):
        return 'missing Markdown heading anchor'
    return None


def validate(root):
    errors = []
    allowed = set(REQUIRED)
    for slug in EXPECTED:
        allowed.update('skills/' + slug + '/' + rel for rel in ('SKILL.md', 'examples/demo.md', 'examples/input.md', 'examples/output.md', 'assets/screenshots/README.md'))
    allowed.update('skills/ecommerce-analytics/examples/data/' + name for name in (*CSV_FIELDS, 'README.md'))
    if (root / '.git').exists():
        tracked = subprocess.run(['git', 'ls-files', '-z'], cwd=root, capture_output=True, check=True)
        for rel in filter(None, tracked.stdout.decode('utf-8').split('\0')):
            if rel not in allowed:
                errors.append(rel + ': tracked file is outside the reviewed allowlist')
    for p in sorted(root.rglob('*')):
        rel = p.relative_to(root)
        if any(part in {'.git', '__pycache__', '.pytest_cache'} for part in rel.parts):
            continue
        if p.is_symlink():
            errors.append(str(rel) + ': symlink not allowed')
        elif p.is_file() and rel.as_posix() not in allowed:
            errors.append(str(rel) + ': not in the reviewed public-file allowlist')
    for rel in REQUIRED:
        p = root / rel
        if not p.is_file() or p.is_symlink() or not p.stat().st_size:
            errors.append(rel + ': required nonempty regular file missing')
    expected_file = root / 'tests/expected-skills.txt'
    if expected_file.is_file() and tuple(expected_file.read_text().splitlines()) != EXPECTED:
        errors.append('expected-skills manifest changed')
    skills = root / 'skills'
    observed = {p.name for p in skills.iterdir() if p.is_dir()} if skills.exists() else set()
    if observed != set(EXPECTED):
        errors.append('Skill directory set must match the 18 declared slugs')
    for slug in EXPECTED:
        base = skills / slug
        required = ('SKILL.md', 'examples/demo.md', 'examples/input.md', 'examples/output.md', 'assets/screenshots/README.md')
        for rel in required:
            p = base / rel
            if not p.is_file() or p.is_symlink() or not p.stat().st_size:
                errors.append(slug + '/' + rel + ': missing or unsafe file')
        card = base / 'SKILL.md'
        if not card.is_file() or card.is_symlink():
            continue
        text = card.read_text()
        try:
            fm = frontmatter(text)
            if fm['name'] != slug:
                errors.append(slug + ': frontmatter name mismatch')
            meta = fm['metadata']
            if (meta.get('version'), meta.get('status'), meta.get('distribution')) != (VERSION, 'public-demo', 'public-demo-only'):
                errors.append(slug + ': incorrect version/status/distribution')
            if not meta.get('display_name_zh') or not meta.get('display_name_en'):
                errors.append(slug + ': missing display name')
        except ValueError as exc:
            errors.append(slug + ': ' + str(exc))
        sections = re.findall(r'^## ([^\n]+)\n(.*?)(?=^## |\Z)', text, re.M | re.S)
        if tuple(s[0] for s in sections) != HEADINGS or any(not s[1].strip() for s in sections):
            errors.append(slug + ': missing, empty or reordered required section')
        for rel, label in (('examples/input.md', INPUT_LABEL), ('examples/output.md', OUTPUT_LABEL)):
            p = base / rel
            if p.is_file() and not p.is_symlink() and not p.read_text().startswith(label + '\n'):
                errors.append(slug + '/' + rel + ': missing synthetic evidence label')
    for p in sorted(root.rglob('*.md')):
        if '.git' in p.relative_to(root).parts or p.is_symlink():
            continue
        for href in re.findall(r'!?\[[^\]]*\]\(([^\s)]+)\)', p.read_text()):
            err = local_link_error(root, p, href)
            if err:
                errors.append(str(p.relative_to(root)) + ': ' + err)
    errors.extend(catalog_errors(root))
    errors.extend(analytics_errors(root))
    return errors


if __name__ == '__main__':
    if len(sys.argv) != 1:
        raise SystemExit('No arguments accepted; checks are limited to this repository.')
    problems = validate(ROOT)
    for problem in problems:
        print('BLOCK: ' + problem)
    print('STRUCTURE: ' + ('BLOCK' if problems else 'PASS (18 cards/exercises/input-output sets, catalog, five CSVs and local links)'))
    raise SystemExit(bool(problems))
