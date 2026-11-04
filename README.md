# ModernLinc Ecommerce Skills

**18 个开源电商 AI Skills：把商品资料和业务问题，变成有依据、可继续使用的工作成果。**

用于广告准备、商品页、内容策划、选品、客服、数据核算与业务交接。每项包含完整方法、必要参考与模板、合成练习和参考输出。**MIT 许可，免费下载、使用、修改和贡献，无需购买或联系作者解锁。**

[English](README_EN.md) · [18 项详细目录](docs/skill-catalog.md) · [安装与使用](docs/getting-started.md) · [兼容说明](docs/compatibility.md) · [参与改进](CONTRIBUTING.md)

## 把这个链接交给你的 AI

将下面一段复制到具有文件读写与安装能力的 Codex 等 AI 工具：

```text
请从 https://github.com/Modernlinc/ecommerce-skills 安装 ModernLinc 电商 Skills。
先阅读 README.md 和 docs/getting-started.md，确认本工具支持的 Skill 目录，
安装 skills/ 下的 18 项完整 Skill（也可以先让我选择所需项）。
保留已有同名安装，不覆盖我的修改。安装后列出实际安装项，
用 meta-facebook-ads 的合成输入做一次调用，并区分安装成功与任务结果。
不要连接真实账户、花钱或发布内容。
```

仓库公开可浏览，也可以把仓库地址直接发给朋友。普通 ChatGPT 对话不会因为收到链接就自动获得本地安装权限；这种情况下先下载材料，按[阅读使用方式](docs/getting-started.md#不安装也能阅读使用)操作。

## 安装到 Codex

需要 Git、Python 3.10+。以下安装仅复制文件，不下载依赖、不运行广告或店铺操作。

```bash
git clone https://github.com/Modernlinc/ecommerce-skills.git
cd ecommerce-skills
python3 scripts/install.py --dest "$HOME/.agents/skills" --dry-run
python3 scripts/install.py --dest "$HOME/.agents/skills"
```

只安装一项，在最后一条命令加 `--skill meta-facebook-ads`；可重复指定。Codex 通常自动发现新 Skill，未出现时重启。也可让 Codex 的 `$skill-installer` 按仓库地址与 `skills/<名称>` 安装单项。[Codex 官方 Skills 说明](https://developers.openai.com/codex/skills)

## 先试一项

安装后发给 AI：

```text
使用 $meta-facebook-ads，根据该 Skill 的 examples/input.md 完成广告准备任务。
先读随包方法，不看 examples/output.md；交付完整广告文案和素材 brief，
说明哪些商品事实已知、哪些条件仍需确认。不要执行真实投放。
```

生成结果后再对照 [参考输出](skills/meta-facebook-ads/examples/output.md)。参考是合成教学材料，不是固定标准答案。你也可以提供自己的获准商品资料，说明目标、希望的成果和限制。

## 18 项 Skills

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

## 包里有什么

每个 `skills/<名称>/` 都是可单独安装的完整目录：`SKILL.md` 是调用入口，`references/library/` 保存完整方法与依赖，`examples/` 提供快速练习，`agents/openai.yaml` 提供 Codex 展示信息，`LICENSE` 与 `NOTICE.md` 说明许可与来源。只有外层 `SKILL.md` 用于发现，历史方法入口命名为 `METHOD.md`。

## 使用范围

这些 Skills 让 AI 按方法完成研究、文字工作、离线核对和交接；不会自动获得账号权限或保证经营效果。输入事实、素材权利与当前平台规则仍需核对。生成内容由使用者审阅后决定下一步。

数据 Skill 的 Excel 自动核算另需 Codex 工作簿运行环境；其他工具可阅读其方法和模板。少量附带脚本需本地 Python 或 Node.js，安装不会执行它们。具体见[兼容说明](docs/compatibility.md)。

## 更新与共创

欢迎 Star、Fork、提交 Issue 或 Pull Request。提交一个可复现的问题、一份原创合成案例，或对方法的具体改进都很有帮助。请附当前版本、输入、实际输出与预期差异，勿提交客户隐私或凭证。[贡献指南](CONTRIBUTING.md) · [更新办法](docs/updates-and-feedback.md) · [更新记录](CHANGELOG.md)

## 许可

ModernLinc 原创部分采用 [MIT License](LICENSE)。第三方归属与许可保留于各 Skill 的资料库；平台名称不表示官方背书。详见 [NOTICE](NOTICE.md)。
