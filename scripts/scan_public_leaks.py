#!/usr/bin/env python3
"""Read-only publication preflight; never print suspected credential values."""
from pathlib import Path
import os
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
FORBIDDEN_DIRS = {'private', 'paid', 'premium', 'internal', 'internal-qa', 'controller', 'release-candidates', 'customer-data', 'credentials'}
FORBIDDEN_SUFFIXES = {'.pem', '.key', '.p12', '.pfx', '.crt', '.token', '.secret', '.sqlite', '.db', '.zip', '.7z', '.tar', '.gz', '.skill'}
IGNORED_RUNTIME = {'.git', '__pycache__', '.pytest_cache'}
PATTERNS = (
    ('credential-shaped assignment', re.compile(r'''(?i)["']?(?:api[_-]?key|apikey|secret|access_token|refresh_token|password|cookie)["']?\s*[:=]\s*["']?[^\s"'`,;]{12,}''')),
    ('OpenAI-shaped credential', re.compile(r'\bsk-(?:(?:proj|svcacct)-)?[A-Za-z0-9_-]{20,}')),
    ('GitHub-shaped credential', re.compile(r'\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})')),
    ('private key block', re.compile(r'-{5}BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-{5}')),
    ('internal absolute path', re.compile(r'''/(?:Users|Volumes|home)/[^\s"'<>]+|[A-Za-z]:[\\/](?:Users|Documents and Settings)[\\/][^\s"'<>]+''')),
    ('authorization credential', re.compile(r'(?i)\bBearer\s+[A-Za-z0-9._-]{20,}')),
)


def path_problems(rel):
    p = Path(rel)
    result = []
    if p.is_absolute() or '..' in p.parts:
        result.append('unsafe repository path')
    if any(part.lower() in FORBIDDEN_DIRS for part in p.parts):
        result.append('private directory')
    if p.name.lower() == '.env' or p.name.lower().startswith('.env.'):
        result.append('environment file')
    if p.suffix.lower() in FORBIDDEN_SUFFIXES:
        result.append('private distribution or sensitive file type')
    return result


def scan_text(text):
    findings = []
    for n, line in enumerate(text.splitlines(), 1):
        for label, pattern in PATTERNS:
            if pattern.search(line):
                findings.append((n, label))
    return findings


def scan(root):
    findings = []
    count = 0
    for directory, dirs, names in os.walk(root, followlinks=False):
        base = Path(directory)
        for name in list(dirs):
            p = base / name
            rel = p.relative_to(root)
            if p.is_symlink():
                findings.append((str(rel), 0, 'symlink directory not allowed'))
                dirs.remove(name)
            elif name in IGNORED_RUNTIME:
                dirs.remove(name)
            else:
                findings.extend((str(rel), 0, label) for label in path_problems(rel))
        for name in sorted(names):
            p = base / name
            rel = p.relative_to(root)
            count += 1
            if p.is_symlink():
                findings.append((str(rel), 0, 'symlink file not allowed'))
                continue
            findings.extend((str(rel), 0, label) for label in path_problems(rel))
            try:
                content = p.read_bytes()
                text = content.decode('utf-8')
                if b'\0' in content:
                    raise UnicodeError('binary data')
            except (UnicodeError, OSError):
                findings.append((str(rel), 0, 'binary or unreadable file requires explicit public review'))
                continue
            findings.extend((str(rel), line, label) for line, label in scan_text(text))
    return count, findings


if __name__ == '__main__':
    if len(sys.argv) != 1:
        raise SystemExit('No arguments accepted; scans are limited to this repository.')
    count, findings = scan(ROOT)
    for rel, line, label in findings:
        print(f'BLOCK: {rel}:{line}: {label}')
    print(f'PUBLIC SCAN: {"BLOCK" if findings else "PASS"} ({count} files)')
    raise SystemExit(bool(findings))
