# ModernLinc Ecommerce AI Skills

**Turn scattered product facts into complete, reviewable work drafts.**

This is the public catalog and synthetic demonstration repository for eighteen ModernLinc ecommerce AI Skills. Inspect the required inputs, a worked output and the limits before deciding whether a task fits your workflow.

Version: `0.1.0-public-demo` · Date: 2026-10-28 · [中文](README.md)

The repository contains public descriptions and newly authored synthetic demonstrations. Full paid Skill implementations, private references, runtime modules and internal evaluations are maintained and delivered separately. This is a public-viewable showcase, not a release of the complete commercial product.

## Explore the catalog

| Skill | Demonstration |
|---|---|
| [Meta / Facebook Ads](skills/meta-facebook-ads/SKILL.md) | [Synthetic input](skills/meta-facebook-ads/examples/input.md) / [worked output](skills/meta-facebook-ads/examples/output.md) |
| [Google Ads](skills/google-ads/SKILL.md) | [Synthetic input](skills/google-ads/examples/input.md) / [worked output](skills/google-ads/examples/output.md) |
| [Codex Ecommerce Execution](skills/codex-ecommerce/SKILL.md) | [Synthetic input](skills/codex-ecommerce/examples/input.md) / [worked output](skills/codex-ecommerce/examples/output.md) |
| [Shopify Store Operations](skills/shopify-store/SKILL.md) | [Synthetic input](skills/shopify-store/examples/input.md) / [worked output](skills/shopify-store/examples/output.md) |
| [Google SEO](skills/google-seo/SKILL.md) | [Synthetic input](skills/google-seo/examples/input.md) / [worked output](skills/google-seo/examples/output.md) |
| [TikTok Content and Creator Briefs](skills/tiktok-content/SKILL.md) | [Synthetic input](skills/tiktok-content/examples/input.md) / [worked output](skills/tiktok-content/examples/output.md) |
| [Social Cross-Platform Content](skills/social-content/SKILL.md) | [Synthetic input](skills/social-content/examples/input.md) / [worked output](skills/social-content/examples/output.md) |
| [Reddit Community Research](skills/reddit-research/SKILL.md) | [Synthetic input](skills/reddit-research/examples/input.md) / [worked output](skills/reddit-research/examples/output.md) |
| [Pinterest Content and Catalog Mapping](skills/pinterest-commerce/SKILL.md) | [Synthetic input](skills/pinterest-commerce/examples/input.md) / [worked output](skills/pinterest-commerce/examples/output.md) |
| [Amazon US Offline Review](skills/amazon-us/SKILL.md) | [Synthetic input](skills/amazon-us/examples/input.md) / [worked output](skills/amazon-us/examples/output.md) |
| [Ad Creative Planning](skills/ad-creative/SKILL.md) | [Synthetic input](skills/ad-creative/examples/input.md) / [worked output](skills/ad-creative/examples/output.md) |
| [Ecommerce and Advertising Analytics](skills/ecommerce-analytics/SKILL.md) | [Synthetic input](skills/ecommerce-analytics/examples/input.md) / [worked output](skills/ecommerce-analytics/examples/output.md) |
| [Customer Support Drafting](skills/customer-support/SKILL.md) | [Synthetic input](skills/customer-support/examples/input.md) / [worked output](skills/customer-support/examples/output.md) |
| [Brand Brief Research](skills/brand-brief/SKILL.md) | [Synthetic input](skills/brand-brief/examples/input.md) / [worked output](skills/brand-brief/examples/output.md) |
| [Product Selection Research](skills/product-selection/SKILL.md) | [Synthetic input](skills/product-selection/examples/input.md) / [worked output](skills/product-selection/examples/output.md) |
| [Influencer Collaboration Research](skills/influencer-collaboration/SKILL.md) | [Synthetic input](skills/influencer-collaboration/examples/input.md) / [worked output](skills/influencer-collaboration/examples/output.md) |
| [Ecommerce Backoffice Review](skills/ecommerce-backoffice/SKILL.md) | [Synthetic input](skills/ecommerce-backoffice/examples/input.md) / [worked output](skills/ecommerce-backoffice/examples/output.md) |
| [B2B Quotation and Sample Communication](skills/b2b-quotation/SKILL.md) | [Synthetic input](skills/b2b-quotation/examples/input.md) / [worked output](skills/b2b-quotation/examples/output.md) |

The individual demonstration cards and most worked examples are in Chinese, with English customer-facing copy where useful. This English README is an overview, not a claim that the entire repository is translated.

## Try one task

1. Read the chosen public `SKILL.md`, including its limitations.
2. Give that card and `examples/input.md` to your AI tool. Request a complete response using only the supplied synthetic facts.
3. Save the first answer before consulting `examples/output.md`. Compare factual accuracy, completeness and treatment of unknowns; wording can differ.
4. Decide whether the result supports your next work step. Obtain separate permissions and implementation checks for live systems.

Reading requires no installation. A client that supports Skill folders may be used for a single public-demo trial; there is no universal installer or cross-client compatibility guarantee. Uploading these documents into a chat does not install the complete paid product.

## What the examples establish

Examples illustrate advertising preparation, product-page writing, document changes, scoped calculations, content briefs and business handoffs. They are not real customer results or proof of API execution, advertising spend, store updates, media production, marketplace compliance, revenue or ROI.

All inputs are synthetic. Prices and quantities are demonstration assumptions, not commercial offers. No public screenshots are included. No unsupported learning-duration, token-consumption or business-performance claims are published.

## Commercial delivery

The full paid product is outside this repository. A purchase should identify the selected Skills, exact version and files, permitted use, supported environment, third-party costs, update term, support and refund terms. A payment or contact channel has not been opened here. No perpetual-update or unlimited-seat promise is implied.

## Repository checks

Python 3.10+ with the standard library is sufficient for the repository checks:

```bash
python3 scripts/validate_structure.py
python3 scripts/scan_public_leaks.py
python3 -m unittest discover -s tests -v
```

These checks cover structure, local links and detectable publication hazards. They do not certify professional advice, live execution or commercial outcomes. GitHub Actions runs the same checks after a push; local success does not imply a hosted CI run has occurred.

## License and policies

Copyright © 2026 ModernLinc. All rights reserved. See [LICENSE](LICENSE), [licensing](docs/licensing.md), [public/private boundary](docs/public-private-boundary.md), [evidence policy](docs/demo-evidence-policy.md), [security](SECURITY.md) and [publication audit](PUBLICATION_AUDIT.md).

The notice preserves rights granted by applicable law and GitHub's Terms of Service, including GitHub's public viewing and forking mechanisms. Public visibility does not make the complete paid implementation open source.
