"""Public-tree contract and regression cases; all adversarial data stays in memory."""
from pathlib import Path
import importlib.util
import unittest

ROOT = Path(__file__).resolve().parents[1]


def module(name):
    spec = importlib.util.spec_from_file_location(name, ROOT / 'scripts' / (name + '.py'))
    obj = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(obj)
    return obj


structure = module('validate_structure')
leaks = module('scan_public_leaks')


class CatalogTests(unittest.TestCase):
    def test_public_tree_contract(self):
        self.assertEqual(structure.validate(ROOT), [])

    def test_current_tree_has_no_detected_publication_hazard(self):
        count, problems = leaks.scan(ROOT)
        self.assertGreater(count, 90)
        self.assertEqual(problems, [])

    def test_missing_description_cannot_masquerade_as_valid_skill(self):
        with self.assertRaises(ValueError):
            structure.frontmatter('---\nname: demo\nmetadata:\n  version: 0.1.0-public-demo\n---\n')

    def test_duplicate_discovery_field_rejected(self):
        with self.assertRaises(ValueError):
            structure.frontmatter('---\nname: demo\nname: other\ndescription: "Example"\nmetadata:\n  version: 0.1.0-public-demo\n---\n')

    def test_nested_or_executable_yaml_is_rejected(self):
        with self.assertRaises(ValueError):
            structure.frontmatter('---\nname: demo\ndescription: !!python/object:example\nmetadata:\n  version: 0.1.0-public-demo\n---\n')

    def test_valid_card_can_be_discovered(self):
        fm = structure.frontmatter((ROOT / 'skills/meta-facebook-ads/SKILL.md').read_text())
        self.assertEqual(fm['name'], 'meta-facebook-ads')
        self.assertTrue(fm['description'])
        self.assertEqual(fm['metadata']['distribution'], 'public-demo-only')

    def test_existing_relative_link_passes(self):
        self.assertIsNone(structure.local_link_error(ROOT, ROOT / 'docs/getting-started.md', '../README.md'))

    def test_missing_link_rejected(self):
        self.assertEqual(structure.local_link_error(ROOT, ROOT / 'README.md', 'no-such-demo.md'), 'missing local link')

    def test_encoded_escape_rejected(self):
        self.assertEqual(structure.local_link_error(ROOT, ROOT / 'README.md', '%2E%2E/outside.md'), 'link escapes repository')

    def test_safety_prose_is_not_a_secret(self):
        self.assertEqual(leaks.scan_text('不要提交 API Key、Token、Cookie 或 password。'), [])

    def test_long_sensitive_assignment_blocked_without_echoing_value(self):
        sample = 'api' + '_key = "' + 'a' * 40 + '"'
        result = leaks.scan_text(sample)
        self.assertIn((1, 'credential-shaped assignment'), result)
        self.assertNotIn('a' * 40, str(result))

    def test_openai_and_github_shapes_blocked(self):
        for prefix in ('s' + 'k-proj-', 'g' + 'hp_'):
            self.assertTrue(leaks.scan_text(prefix + 'a' * 48))

    def test_private_key_block_rejected(self):
        sample = '-' * 5 + 'BEGIN ' + 'PRIVATE KEY' + '-' * 5
        self.assertIn((1, 'private key block'), leaks.scan_text(sample))

    def test_unix_and_windows_internal_paths_rejected(self):
        unix = '/' + 'Volumes/' + 'private-volume/project/file.md'
        windows = 'C:' + chr(92) + 'Users' + chr(92) + 'private-user' + chr(92) + 'file.md'
        self.assertTrue(leaks.scan_text(unix))
        self.assertTrue(leaks.scan_text(windows))

    def test_private_packages_and_nested_directories_rejected(self):
        for name in ('paid/material.md', 'docs/controller/history.md', 'release-candidates/item.md', 'bundle.zip', '.env.local', 'signing.pem'):
            self.assertTrue(leaks.path_problems(name), name)

    def test_normal_public_paths_are_allowed(self):
        self.assertEqual(leaks.path_problems('skills/google-ads/examples/output.md'), [])


if __name__ == '__main__':
    unittest.main()
