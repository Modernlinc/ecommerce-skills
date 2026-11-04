"""Fresh installation and failure modes; no user installation is touched."""
from pathlib import Path
import importlib.util
import json
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('install', ROOT / 'scripts/install.py')
installer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(installer)


class InstallTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.base = Path(self.temp.name).resolve()
        self.dest = self.base / 'skills'

    def tearDown(self):
        self.temp.cleanup()

    def test_fresh_all_eighteen_copies_every_manifest_file(self):
        result = installer.install(ROOT, self.dest)
        self.assertEqual(len(result['skills']), 18)
        manifest = json.loads((ROOT / 'CONTENT_MANIFEST.json').read_text())
        for entry in manifest['files']:
            p = self.dest / Path(entry['path']).relative_to('skills')
            self.assertEqual(installer.sha(p), entry['sha256'], str(p))
        self.assertEqual(len(list(self.dest.rglob('SKILL.md'))), 18)

    def test_existing_one_blocks_entire_batch_before_writing(self):
        existing = self.dest / 'amazon-us'
        existing.mkdir(parents=True)
        (existing / 'personal.txt').write_text('keep')
        with self.assertRaisesRegex(ValueError, 'Already exists'):
            installer.install(ROOT, self.dest)
        self.assertEqual([p.name for p in self.dest.iterdir()], ['amazon-us'])
        self.assertEqual((existing / 'personal.txt').read_text(), 'keep')

    def test_dry_run_and_unknown_slug_do_not_create_destination(self):
        self.assertEqual(installer.install(ROOT, self.dest, dry_run=True)['status'], 'DRY_RUN')
        self.assertFalse(self.dest.exists())
        with self.assertRaises(ValueError):
            installer.install(ROOT, self.dest, ['../outside'])
        self.assertFalse(self.dest.exists())

    def test_single_skill_is_complete(self):
        r = installer.install(ROOT, self.dest, ['meta-facebook-ads'])
        self.assertEqual(r['skills'], ['meta-facebook-ads'])
        self.assertGreater(len(list((self.dest / 'meta-facebook-ads').rglob('*'))), 50)
        self.assertFalse((self.dest / 'google-ads').exists())

    def test_symlink_destination_is_rejected(self):
        (self.base / 'real').mkdir()
        self.dest.symlink_to(self.base / 'real', target_is_directory=True)
        with self.assertRaisesRegex(ValueError, 'Symbolic'):
            installer.install(ROOT, self.dest)
        self.assertEqual(list((self.base / 'real').iterdir()), [])

    def test_source_overlap_is_rejected(self):
        with self.assertRaises(ValueError):
            installer.install(ROOT, ROOT / 'test-output')

    def test_corrupt_or_extra_source_cannot_install(self):
        tiny = self.base / 'repo'; skill = tiny / 'skills' / 'demo'; skill.mkdir(parents=True)
        (skill / 'SKILL.md').write_text('original')
        (skill / 'LICENSE').write_text('license')
        files = [{'path': str(p.relative_to(tiny)), 'bytes': p.stat().st_size, 'sha256': installer.sha(p)} for p in skill.iterdir()]
        (tiny / 'CONTENT_MANIFEST.json').write_text(json.dumps({'skills': ['demo'], 'files': files}))
        (skill / 'unexpected.txt').write_text('extra')
        with self.assertRaisesRegex(ValueError, 'unexpected'):
            installer.install(tiny, self.dest)
        self.assertFalse(self.dest.exists())
        (skill / 'SKILL.md').write_text('corrupt')
        with self.assertRaisesRegex(ValueError, 'identity mismatch'):
            installer.install(tiny, self.dest)


if __name__ == '__main__':
    unittest.main()
