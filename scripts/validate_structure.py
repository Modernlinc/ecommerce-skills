#!/usr/bin/env python3
"""Validate this public catalog using the Python standard library only."""
from pathlib import Path
import json
import re
import subprocess
import sys
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = (
    'meta-facebook-ads', 'google-ads', 'codex-ecommerce', 'shopify-store',
    'google-seo', 'tiktok-content', 'social-content', 'reddit-research',
    'pinterest-commerce', 'amazon-us', 'ad-creative', 'ecommerce-analytics',
    'customer-support', 'brand-brief', 'product-selection',
    'influencer-collaboration', 'ecommerce-backoffice', 'b2b-quotation',
)
VERSION = '0.1.0-public-demo'
HEADINGS = ('功能摘要', '输入', '输出', '演示步骤', '示例输入', '示例输出', '可公开截图路径', '限制说明', '版本')
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
)


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
    if parsed.scheme or parsed.netloc or not parsed.path:
        return None
    if parsed.path.startswith('/'):
        return 'absolute local link'
    target = (source.parent / unquote(parsed.path)).resolve()
    if not target.is_relative_to(root.resolve()):
        return 'link escapes repository'
    if not target.exists():
        return 'missing local link'
    return None


def validate(root):
    errors = []
    allowed = set(REQUIRED)
    for slug in EXPECTED:
        allowed.update('skills/' + slug + '/' + rel for rel in ('SKILL.md', 'examples/input.md', 'examples/output.md', 'assets/screenshots/README.md'))
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
        required = ('SKILL.md', 'examples/input.md', 'examples/output.md', 'assets/screenshots/README.md')
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
    return errors


if __name__ == '__main__':
    if len(sys.argv) != 1:
        raise SystemExit('No arguments accepted; checks are limited to this repository.')
    problems = validate(ROOT)
    for problem in problems:
        print('BLOCK: ' + problem)
    print('STRUCTURE: ' + ('BLOCK' if problems else 'PASS (18 cards, 36 examples and local links)'))
    raise SystemExit(bool(problems))
