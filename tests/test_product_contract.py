"""Regressions for public handoff gaps: case isolation, CSVs and navigation."""
from pathlib import Path
import importlib.util
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('product_structure', ROOT / 'scripts/validate_structure.py')
structure = importlib.util.module_from_spec(spec)
spec.loader.exec_module(structure)


class ProductContractTests(unittest.TestCase):
    def test_all_single_file_exercises_match_their_own_input_and_contract(self):
        self.assertEqual(structure.catalog_errors(ROOT), [])

    def test_five_downloads_match_embedded_data_and_reference_arithmetic(self):
        self.assertEqual(structure.analytics_errors(ROOT), [])

    def test_reference_cannot_borrow_a_product_from_another_case(self):
        self.assertTrue(structure.entity_errors('LoopNest Rail, 30 cm.', 'Meet LoopNest Pocket.'))

    def test_same_case_product_is_allowed(self):
        self.assertEqual(structure.entity_errors('LoopNest Rail, 30 cm.', 'Meet LoopNest Rail.'), [])

    def test_overlong_description_is_detected_even_with_correct_count(self):
        self.assertIn('RSA example exceeds documented field length',
                      structure.rsa_errors('|Description 1|' + 'a' * 91 + '|91|'))

    def test_incorrect_asset_count_label_is_detected(self):
        self.assertIn('RSA example character count is incorrect or outside ASCII scope',
                      structure.rsa_errors('|Headline 1|Desk tray|4|'))

    def test_input_embedding_changes_headings_only_not_task_facts(self):
        source = structure.INPUT_LABEL + '\n\n# Example\nPrice: USD 44.\n## Row\nUnknown.\n\n## 导航\nLinks'
        self.assertEqual(structure.embedded_input(source), '### Example\nPrice: USD 44.\n#### Row\nUnknown.')

    def test_empty_fee_is_not_silently_zero(self):
        with self.assertRaises(ValueError):
            structure.csv_record('fees.csv', 'order_id,payment_fee_usd\nDEMO-01,\n')

    def test_nonfinite_or_negative_fee_is_rejected(self):
        for value in ('NaN', 'Infinity', '-1'):
            with self.subTest(value=value), self.assertRaises(ValueError):
                structure.csv_record('fees.csv', 'order_id,payment_fee_usd\nDEMO-01,' + value + '\n')

    def test_extra_unlabelled_csv_field_is_rejected(self):
        with self.assertRaises(ValueError):
            structure.csv_record('fees.csv', 'order_id,payment_fee_usd\nDEMO-01,3,4\n')

    def test_wrong_currency_is_not_treated_as_usd(self):
        with self.assertRaises(ValueError):
            structure.csv_record('orders.csv', 'order_id,currency,gross_usd\nDEMO-01,EUR,100\n')

    def test_invalid_ads_date_is_rejected(self):
        with self.assertRaises(ValueError):
            structure.csv_record('ads.csv', 'day,spend_usd,platform_attributed_revenue_usd\n2026-02-30,20,120\n')

    def test_missing_heading_is_not_reported_as_working_navigation(self):
        self.assertEqual(structure.local_link_error(ROOT, ROOT / 'README.md', '#missing-product-section'),
                         'missing Markdown heading anchor')

    def test_existing_same_page_heading_works(self):
        self.assertIsNone(structure.local_link_error(ROOT, ROOT / 'README.md', '#先试一项'))


if __name__ == '__main__':
    unittest.main()
