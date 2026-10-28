# 公开资料版本与核对范围

版本：`0.1.1-public-demo` · 日期：2026-10-28 · 维护：ModernLinc

## 资料清单

[机器可读目录](catalog.json)列明十八项名称、输入要求、应交成果、读者核对及实际文件。每项有功能卡、单文件试阅、独立输入、编辑参考输出和媒体类型说明；数据例另有五份CSV及字段说明。根目录提供双语首页、帮助、授权、版本和维护说明。

本版是文字试阅资料；不包含完整付费实现、平台截图、媒体成片、客户数据、凭证或个人网站。完整商业产品的安装与支持范围单独确认。

## 可复核的检查

- 十八项slug/name、版本、目录及元信息一致。
- 目录所列文件实际存在；单文件试阅内的题设与独立输入一致，交付清单与目录一致。
- Markdown相对文件与锚点链接可解析。
- 五份CSV字段、行与金额格式及其和题设的逐字对应；数字算例可按输出算式复核。
- 原创合成标签、允许清单和常见敏感内容扫描。
- 合成案例逐项审阅输入→所需成果→参考输出，检查缺失题设、未给事实、交接及执行声明。

维护命令（Python3.10+，标准库）：

```bash
python3 scripts/validate_structure.py
python3 scripts/scan_public_leaks.py
python3 -m unittest discover -s tests -v
```

GitHub当前提交的checks展示实际自动检查结果。自动检查不代替语义审阅；本次没有运行完整商业Skill、十八项新手/专业独立终验或每种客户端安装测试，也没有声称每项AI试阅已实际跑通。标准Skill工具未运行（本机缺其PyYAML依赖），本仓库检查只覆盖这里声明的元信息约束。

## 外部链接与授权

演示商品链接使用保留的example.invalid，不通往真实商品。其它外链仅指向公司GitHub资源和官方资料；公开页不嵌入个人网站或真实联系邮箱。

[LICENSE](LICENSE)提供有限内部评估许可，完整产品独立授权，详见[授权说明](docs/licensing.md)。GitHub Actions使用固定提交的[官方checkout](https://github.com/actions/checkout)和[官方setup-python](https://github.com/actions/setup-python)，权限contents: read，无部署动作。合并和Release另行决定。
