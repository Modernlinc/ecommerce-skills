#!/usr/bin/env python3
"""Install complete Skill directories; no network, execution hooks or overwrites."""
from pathlib import Path, PurePosixPath
import argparse
import hashlib
import json
import os
import re
import shutil
import sys

ROOT = Path(__file__).resolve().parents[1]


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def no_symlinks(path):
    for part in (path, *path.parents):
        if part.is_symlink():
            raise ValueError('Symbolic links are not accepted: ' + str(part))


def verified_files(root, selected=None):
    manifest = json.loads((root / 'CONTENT_MANIFEST.json').read_text())
    all_slugs = manifest['skills']
    if not all_slugs or len(set(all_slugs)) != len(all_slugs) or any(not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', s) for s in all_slugs):
        raise ValueError('Invalid Skill list')
    selected = list(dict.fromkeys(selected or all_slugs))
    if not set(selected).issubset(all_slugs):
        raise ValueError('Unknown Skill name')
    files = {}
    for entry in manifest['files']:
        rel = PurePosixPath(entry['path'])
        if rel.is_absolute() or '..' in rel.parts or len(rel.parts) < 3 or rel.parts[0] != 'skills' or rel.parts[1] not in all_slugs:
            raise ValueError('Unsafe manifest path')
        if rel.as_posix() in files:
            raise ValueError('Duplicate manifest path')
        p = root.joinpath(*rel.parts)
        no_symlinks(p)
        if not p.is_file() or sha(p) != entry['sha256'] or p.stat().st_size != entry['bytes']:
            raise ValueError('File identity mismatch: ' + str(rel))
        files[rel.as_posix()] = entry
    # Reject extra source files so a valid manifest cannot conceal another payload.
    for slug in all_slugs:
        base = root / 'skills' / slug
        actual = set()
        for p in base.rglob('*'):
            no_symlinks(p)
            if p.is_file():
                actual.add(p.relative_to(root).as_posix())
            elif not p.is_dir():
                raise ValueError('Unsupported source object')
        expected = {p for p in files if p.startswith('skills/' + slug + '/')}
        if actual != expected or not {'skills/' + slug + '/SKILL.md', 'skills/' + slug + '/LICENSE'}.issubset(expected):
            raise ValueError('Incomplete or unexpected Skill files: ' + slug)
    return selected, files


def install(root, dest, selected=None, dry_run=False):
    root = root.resolve()
    dest = Path(os.path.abspath(dest.expanduser()))
    no_symlinks(dest)
    if dest.is_relative_to(root) or root.is_relative_to(dest):
        raise ValueError('Destination must be separate from the source repository')
    slugs, files = verified_files(root, selected)
    # Validate ALL targets before any write; no silent partial install on collisions.
    for slug in slugs:
        if os.path.lexists(dest / slug):
            raise ValueError('Already exists; preserve or move it before updating: ' + str(dest / slug))
    if dry_run:
        return {'status': 'DRY_RUN', 'skills': slugs, 'destination': str(dest)}
    dest.mkdir(parents=True, exist_ok=True)
    for slug in slugs:
        no_symlinks(dest)
        target = dest / slug
        target.mkdir()  # exclusive creation: do not merge with existing contents
        for rel, entry in files.items():
            if not rel.startswith('skills/' + slug + '/'):
                continue
            output = target / Path(rel).relative_to('skills/' + slug)
            output.parent.mkdir(parents=True, exist_ok=True)
            no_symlinks(output.parent)
            with (root / rel).open('rb') as src, output.open('xb') as dst:
                shutil.copyfileobj(src, dst)
            if sha(output) != entry['sha256']:
                raise ValueError('Installed file verification failed: ' + rel)
    return {'status': 'INSTALLED', 'skills': slugs, 'destination': str(dest), 'version': '1.0.0'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dest', required=True, type=Path, help='The Skill directory supported by your AI tool')
    parser.add_argument('--skill', action='append', help='Install one slug; repeat for several. Default: all 18')
    parser.add_argument('--dry-run', action='store_true', help='Validate and show paths without writing')
    args = parser.parse_args()
    try:
        print(json.dumps(install(ROOT, args.dest, args.skill, args.dry_run), ensure_ascii=False, indent=2))
    except (ValueError, OSError, KeyError, TypeError) as exc:
        print('Installation stopped: ' + str(exc), file=sys.stderr)
        print('Existing files are never overwritten. If an I/O failure occurred, inspect newly created folders before retrying.', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
