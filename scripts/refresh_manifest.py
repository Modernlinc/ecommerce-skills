#!/usr/bin/env python3
"""Refresh identities after reviewed edits; never run as an installer precheck."""
from pathlib import Path
import hashlib
import json
import sys

ROOT = Path(__file__).resolve().parents[1]

if __name__ == '__main__':
    if len(sys.argv) != 1:
        raise SystemExit('No arguments accepted; limited to this repository.')
    slugs = json.loads((ROOT / 'catalog.json').read_text())['skills']
    files = []
    for item in slugs:
        base = ROOT / 'skills' / item['slug']
        local_files = []
        for p in sorted(base.rglob('*')):
            if p.is_symlink():
                raise SystemExit('Refusing symlink: ' + str(p.relative_to(ROOT)))
            if p.is_file() and p != base / 'CONTENT_MANIFEST.json':
                data = p.read_bytes()
                local_files.append({'path': p.relative_to(base).as_posix(), 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
        (base / 'CONTENT_MANIFEST.json').write_text(json.dumps({'version': '1.0.0', 'files': local_files}, ensure_ascii=False, indent=2) + '\n')
    for item in slugs:
        for p in sorted((ROOT / 'skills' / item['slug']).rglob('*')):
            if p.is_symlink():
                raise SystemExit('Refusing symlink: ' + str(p.relative_to(ROOT)))
            if p.is_file():
                data = p.read_bytes()
                files.append({'path': p.relative_to(ROOT).as_posix(), 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
    manifest = {'version': '1.0.0', 'skills': [s['slug'] for s in slugs], 'files': files}
    (ROOT / 'CONTENT_MANIFEST.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    print('Recorded', len(files), 'files across', len(slugs), 'Skills')
