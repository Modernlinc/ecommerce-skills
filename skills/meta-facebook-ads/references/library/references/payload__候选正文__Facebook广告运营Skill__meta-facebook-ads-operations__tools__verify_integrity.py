#!/usr/bin/env python3
"""Read-only listed-file integrity check. Not authenticity, admission or business QA."""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import stat

MANIFESTS = ("PAYLOAD_MANIFEST.json", "DELIVERY_MANIFEST.json")

def unique_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError("duplicate JSON key")
        result[key] = value
    return result

def safe_relative(value):
    if not isinstance(value, str) or not value or "\\" in value or ":" in value or "\x00" in value:
        raise ValueError("unsafe relative path")
    path = PurePosixPath(value)
    if path.is_absolute() or any(x in ("", ".", "..") for x in value.split("/")):
        raise ValueError("unsafe relative path")
    return path

def checked_file(root, value):
    rel = safe_relative(value)
    target = root
    for component in rel.parts:
        target = target / component
        if target.is_symlink():
            raise ValueError("symlink rejected: " + value)
    if not target.resolve().is_relative_to(root):
        raise ValueError("path escapes root: " + value)
    if not target.is_file() or not stat.S_ISREG(target.stat().st_mode):
        raise ValueError("missing or nonregular file: " + value)
    return target

def validate_rows(document, manifest_name):
    if not isinstance(document, dict) or document.get("schema_version") != 1:
        raise ValueError("unsupported manifest schema")
    rows = document.get("files")
    if not isinstance(rows, list) or not rows:
        raise ValueError("files must be a nonempty list")
    seen = set()
    for row in rows:
        if not isinstance(row, dict):
            raise ValueError("invalid file row")
        name = row.get("path")
        safe_relative(name)
        if name == manifest_name or name in seen:
            raise ValueError("self reference or duplicate file path")
        seen.add(name)
        if type(row.get("bytes")) is not int or row["bytes"] < 0:
            raise ValueError("invalid byte count")
        if not isinstance(row.get("sha256"), str) or not re.fullmatch(r"[0-9a-f]{64}", row["sha256"]):
            raise ValueError("invalid SHA-256")
    return rows

def verify(root_arg, manifest_name):
    if isinstance(root_arg, str) and not root_arg.strip():
        raise ValueError("root cannot be empty")
    if manifest_name not in MANIFESTS:
        raise ValueError("unsupported manifest name")
    supplied = Path(root_arg)
    if supplied.is_symlink() or not supplied.is_dir():
        raise ValueError("root must be an explicit ordinary directory")
    root = supplied.resolve()
    manifest_path = checked_file(root, manifest_name)
    if manifest_path.stat().st_size > 2_000_000:
        raise ValueError("manifest exceeds safety size limit")
    raw = manifest_path.read_bytes()
    doc = json.loads(raw.decode("utf-8"), object_pairs_hook=unique_object)
    rows = validate_rows(doc, manifest_name)
    # Validate every path before reading any payload content.
    targets = [(row, checked_file(root, row["path"])) for row in rows]
    failures = []
    for row, target in targets:
        # Reject links again before open. Run only in a trusted, non-mutating local folder.
        target = checked_file(root, row["path"])
        digest = hashlib.sha256()
        count = 0
        with target.open("rb") as stream:
            while chunk := stream.read(1024 * 1024):
                digest.update(chunk)
                count += len(chunk)
        if count != row["bytes"] or digest.hexdigest() != row["sha256"]:
            failures.append(row["path"])
    return {
        "integrity_match": not failures,
        "manifest": manifest_name,
        "manifest_sha256": hashlib.sha256(raw).hexdigest(),
        "listed_count": len(rows),
        "mismatches": failures,
        "scope": "listed files only; unlisted files are not scanned",
        "quality_verdict": "NOT_EVALUATED",
        "authenticity_verified": False,
        "external_action_authorized": False,
    }

def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", required=True, help="Explicit path to the payload folder")
    parser.add_argument("--manifest", choices=MANIFESTS, default=MANIFESTS[0])
    args = parser.parse_args(argv)
    try:
        result = verify(args.root, args.manifest)
    except (OSError, ValueError, RuntimeError) as error:
        print(json.dumps({"integrity_match": False, "error": str(error),
                          "quality_verdict": "NOT_EVALUATED"}, ensure_ascii=False))
        return 1
    print(json.dumps(result, ensure_ascii=False))
    return 0 if result["integrity_match"] else 1

if __name__ == "__main__":
    raise SystemExit(main())
