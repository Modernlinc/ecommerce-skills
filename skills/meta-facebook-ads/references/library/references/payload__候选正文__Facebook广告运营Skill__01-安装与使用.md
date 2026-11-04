# 历史安装记录

本文件保留原交付结构说明。当前开源版本使用仓库安装指南；以下旧字节校验命令不适用于已整理的目录，不能作为当前校验步骤。当前文件身份见所安装 Skill 根目录 CONTENT_MANIFEST.json。

# 安装与使用：本地读取，不接账户

## 文件怎么放

解压后保留整个“Facebook广告运营Skill”文件夹及内部相对目录。用允许读取本地文件的Agent宿主，选择或提供这个文件夹，再明确指定入口：

`payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__METHOD.md`

文件放进目录不等于自动安装、发现或激活。本包没有自动安装器、后台值守或平台连接器。本轮没有替你安装到任何全局Skill目录，也不要求接入Facebook账户。

调用仅要求宿主可读取本地UTF-8文件并跟随相对引用；用户手动明确指定本目录meta-facebook-ads-operations/METHOD.md，不声称自动发现、安装或跨宿主兼容。实际宿主版本、模型与推理档位不可见时记录UNKNOWN；读取轨迹仅自述时标executor_reported，独立加载NOT_OBSERVABLE。读不到文件先报告具体缺失或权限，不自动安装插件或寻找公司私有目录。

## 怎么开始与检查

1. 从[先读我](payload__候选正文__Facebook广告运营Skill__00-先读我.md)先完成[资料读前准入](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__permissions-and-live-gates.md#打开资料前的准入)，再按获准任务开始；包内F1仅为无材料时的可选练习，不替换已给任务。
2. 让Agent按SKILL里的任务路由读取所需文件，不提前读取历史答案。
3. 查看中文结论与证据定位、未知、受限草稿和下一步；结尾应保留SKILL的完整输出摘要，而不是只返回PASS或空表。
4. 请求涉及真实账户、客户/敏感材料、预算写入、权限、上传、发布、付款或删除时，停止对应动作；非敏感材料与条件预算建议按准入合同继续；离线草稿不产生执行授权。

输入示例、旧输出和CHANGELOG保留为历史材料，不是每次任务的正确答案或现实效果证明。不需要原课程、私有Vault、账号、API或其他Skill才能阅读本包已有方法。

## 可选：新输入静态URL检查

已有Node 18+时按[工具合同](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__tracking-parameters-and-url-checks.md#新输入静态工具)显式输入/新输出运行；只处理已准入字符串，不联网、不安装。没有Node仍可做方法/文案，注明未运行工具校验。

## 可选：检查文件是否完整

完整性检查只核文件字节，不验证业务效果、来源真实性或质量准入。无需为了使用规则而安装新依赖。

如果本机已有Python 3.9及以上，在本交付文件夹中可用随包原有的只读工具检查外层清单：

```text
python3 payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__tools__verify_integrity.py --root . --manifest payload__候选正文__Facebook广告运营Skill__DELIVERY_MANIFEST.json
```

同一工具也能检查内层源清单：

```text
python3 payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__tools__verify_integrity.py --root meta-facebook-ads-operations --manifest payload__候选正文__Facebook广告运营Skill__DELIVERY_MANIFEST.json
```

若系统已有shasum，可在本文件夹执行：

```text
shasum -a 256 -c payload__候选正文__Facebook广告运营Skill__SHA256SUMS.txt
```

缺少命令时只记录无法验证，不自动安装。清单覆盖数量以当前清单为准，外层DELIVERY_MANIFEST.json排除自身与SHA256SUMS.txt，SHA256SUMS.txt排除自身。本候选本阶段只有目录，不提供新ZIP；任何旧ZIP名/解包记录均属原版本。哈希只能核完整性，不能证明来源可信或质量通过。

当前裁决和环境例外见[验收范围](payload__候选正文__Facebook广告运营Skill__02-验收范围与已知限制.md)。旧R1的本机解包记录属于历史。本候选的检查和裁决仅按实际回执记载；历史本机解包、执行者自述路径/chunk_id均不构成独立宿主加载或跨宿主安装验证。
