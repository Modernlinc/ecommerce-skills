# 公开资料版本核对

版本：`0.1.0-public-demo` · 日期：2026-10-28 · 维护：ModernLinc

## 发布范围

97个公开文件：18项产品卡片、18组合成输入/输出、18份截图索引，以及中英文首页、目录、使用与授权说明和维护工具。当前未收录公开截图；截图索引保留对应状态。

本仓库不包含完整商业实现、私有参考、客户资料、账户凭证、个人网站或个人联系方式。案例为原创合成资料，使用边界见[证据说明](docs/demo-evidence-policy.md)。

## 18张卡片

1. [Meta / Facebook](skills/meta-facebook-ads/SKILL.md)
2. [Google Ads](skills/google-ads/SKILL.md)
3. [Codex电商执行](skills/codex-ecommerce/SKILL.md)
4. [Shopify](skills/shopify-store/SKILL.md)
5. [Google SEO](skills/google-seo/SKILL.md)
6. [TikTok](skills/tiktok-content/SKILL.md)
7. [Social](skills/social-content/SKILL.md)
8. [Reddit](skills/reddit-research/SKILL.md)
9. [Pinterest](skills/pinterest-commerce/SKILL.md)
10. [Amazon US](skills/amazon-us/SKILL.md)
11. [广告素材](skills/ad-creative/SKILL.md)
12. [数据核算](skills/ecommerce-analytics/SKILL.md)
13. [客服](skills/customer-support/SKILL.md)
14. [品牌简报](skills/brand-brief/SKILL.md)
15. [选品](skills/product-selection/SKILL.md)
16. [达人](skills/influencer-collaboration/SKILL.md)
17. [经营后台](skills/ecommerce-backoffice/SKILL.md)
18. [B2B](skills/b2b-quotation/SKILL.md)

## 维护检查

- 十八项目录、必备文件和本地链接检查。
- 公开文件允许清单及常见敏感内容扫描。
- 17项结构与发布安全回归用例。
- Git差异格式检查与只读GitHub Actions。

当前提交的实际检查结果以GitHub checks为准。检查范围是公开文档结构、链接和可检测的发布风险，不构成所有客户端安装兼容、专业业务或经营效果认证。标准Skill工具校验未执行（缺少其PyYAML依赖），该限制保留于本版核对范围。

维护命令：

```bash
python3 scripts/validate_structure.py
python3 scripts/scan_public_leaks.py
python3 -m unittest discover -s tests -v
```

## 隐私与外部链接

产品资料不嵌入个人网站、个人社交链接或真实联系邮箱。演示链接使用保留的example.invalid域名，不连接真实业务。公开文档中的外部说明链接仅用于引用GitHub官方授权资料或官方维护组件。

## 授权与发布

本版采用[LICENSE](LICENSE)的All Rights Reserved告知，包含有限内部评估许可。完整产品按独立许可交付。公开仓库的查看与fork机制依GitHub服务条款及适用法律处理，见[授权说明](docs/licensing.md)。

GitHub Actions使用固定提交的[官方checkout](https://github.com/actions/checkout)和[官方setup-python](https://github.com/actions/setup-python)，权限为contents: read，没有部署或生产Secrets配置。分支合并与Release由维护方另行决定。
