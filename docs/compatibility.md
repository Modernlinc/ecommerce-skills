# 兼容与运行条件

| 使用方式 | 提供的支持 | 仍需具备的条件 |
|---|---|---|
| Codex 本地 Skill | 标准 SKILL.md、展示信息、完整相对路径依赖；可用内置安装器或本仓库安装器 | 支持 Skills 的 Codex、文件读取权限；未出现时重启 |
| 其他支持 Agent Skills 的工具 | 每项标准目录可按该工具方式导入 | 确认该工具的安装位置、发现规则和文件访问能力；本仓库没有逐一认证所有客户端 |
| 普通聊天/ChatGPT 项目 | 阅读方法、模板和合成练习，按委托完成文字任务 | 实际上传所需文件；URL 或本地路径本身不等于读取成功 |
| Facebook 静态 UTM 脚本 | 本地 URL 参数处理，不访问广告账户 | Node.js；先读脚本用法 |
| Social 核算辅助脚本 | 本地辅助计算 | Python 3；按随包说明提供输入 |
| 数据 Skill 的 Excel 核算 | 五表合同、完整脚本、工作簿/诊断/快照流程 | 支持 load_workspace_dependencies 的 Codex 及匹配的工作簿运行时；未满足则停止脚本 |

安装器本身只依赖 Python 3.10+ 标准库。它不替用户安装运行环境，不连接业务平台，不执行 Skill 脚本。文字方法与生成工作簿、媒体或平台操作是不同能力：广告素材 Skill 输出文字策划，不直接制作视频。

本轮检查范围见 [发布检查](../PUBLICATION_AUDIT.md)。源方法的具名用途与限制保留；安装成功不证明十八项在所有模型、所有业务和所有机器上都能取得同样结果。

结构参考 [Agent Skills 规范](https://agentskills.io/specification) 与 [Codex 官方说明](https://developers.openai.com/codex/skills)。
