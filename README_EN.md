# ModernLinc Ecommerce Skills

18 open-source AI Skills for ecommerce: advertising preparation, product pages, content planning, research, customer support, reconciliation and business handoffs.

**Free to download, use, modify and contribute under the MIT License.** Complete methods, required references, templates and synthetic examples are included. No purchase or author contact is required.

[中文](README.md) · [Catalog](docs/skill-catalog.md) · [Installation](docs/getting-started.md) · [Compatibility](docs/compatibility.md) · [Contributing](CONTRIBUTING.md)

## Install in Codex

Requires Git and Python 3.10+. This installer copies files only; it never overwrites an existing Skill or runs its scripts.

```bash
git clone https://github.com/Modernlinc/ecommerce-skills.git
cd ecommerce-skills
python3 scripts/install.py --dest "$HOME/.agents/skills" --dry-run
python3 scripts/install.py --dest "$HOME/.agents/skills"
```

Add `--skill meta-facebook-ads` to install only one item. Repeat `--skill` for several. Codex normally discovers new Skills automatically; restart if they do not appear. You may also ask its built-in `$skill-installer` to install a particular `skills/<slug>` directory from this repository.

## Use

Ask: `Use $meta-facebook-ads with its examples/input.md. Read the included methods, produce complete ad copy and creative briefs, and list unknowns. Do not look at the reference output or launch ads.`

Then compare your result with `examples/output.md`. Examples are authored synthetic references, not recorded model runs or promises of business performance. You can supply your own authorized inputs instead. Detailed methods are primarily Chinese, with English business copy where appropriate.

| Skill | 可以完成什么 |
|---|---|
| [Facebook / Meta 广告](skills/meta-facebook-ads/SKILL.md) | 把商品事实、素材资源和页面承诺组织成投放前工作稿 |
| [Google Ads](skills/google-ads/SKILL.md) | 根据已给查询形成 Search-first 广告及承接草稿 |
| [Codex 电商执行](skills/codex-ecommerce/SKILL.md) | 在条件改变时同步多份电商文档的完整稿 |
| [Shopify 独立站](skills/shopify-store/SKILL.md) | 将商品事实整理为可交编辑的完整商品页 |
| [Google SEO](skills/google-seo/SKILL.md) | 按页面任务组织商品内容和待核信息 |
| [TikTok 内容与达人](skills/tiktok-content/SKILL.md) | 从商品事实形成短视频文字 brief |
| [Social 跨平台内容](skills/social-content/SKILL.md) | 让同一商品在给定渠道拥有不同表达 |
| [Reddit 社区研究](skills/reddit-research/SKILL.md) | 从给定讨论材料提取需求并判断参与边界 |
| [Pinterest 内容与目录](skills/pinterest-commerce/SKILL.md) | 把 Pin 表达与商品身份逐项对应 |
| [Amazon 美国站](skills/amazon-us/SKILL.md) | 核对给定美国站商品材料并准备有限文字草案 |
| [广告素材文字策划](skills/ad-creative/SKILL.md) | 把可证明卖点写成完整脚本和逐镜brief |
| [广告与电商数据核算](skills/ecommerce-analytics/SKILL.md) | 在明确五表口径下展示贡献核算与缺证影响 |
| [客服与私信](skills/customer-support/SKILL.md) | 依据给定状态准备回复与内部交接 |
| [品牌简报研究](skills/brand-brief/SKILL.md) | 比较表达方向并形成有取舍的简报 |
| [选品研究](skills/product-selection/SKILL.md) | 在给定候选、MOQ和预算下做条件比较 |
| [海外达人合作](skills/influencer-collaboration/SKILL.md) | 对齐候选、报价、交付及内容使用权 |
| [跨境经营后台](skills/ecommerce-backoffice/SKILL.md) | 把同笔交易的订单、结算和费用证据核对清楚 |
| [外贸 B2B 报价与样品沟通](skills/b2b-quotation/SKILL.md) | 分开商业报价、样品费用和未确认条件 |

## Requirements and limits

Each Skill folder is self-contained. AI tools need local file reading and support for SKILL.md discovery, or manual loading of the files. Downloading does not automatically install a Skill in every AI application. Ordinary chat tools can read the files but may not run local scripts.

The analytics workbook generator requires a compatible Codex spreadsheet runtime supplied by `load_workspace_dependencies`; installation does not provide that runtime. Other scripts require their documented Python or Node.js environment. Skills do not authorize live account actions, advertising spend, payments or publishing.

## Contribute and update

Fork, report reproducible issues or submit a focused PR. Include a synthetic input, actual output and the expected correction; preserve source attribution. See [CONTRIBUTING](CONTRIBUTING.md) and [updates](docs/updates-and-feedback.md). No customer data or credentials.

[MIT License](LICENSE) · [Third-party notices](NOTICE.md) · [Security](SECURITY.md)
