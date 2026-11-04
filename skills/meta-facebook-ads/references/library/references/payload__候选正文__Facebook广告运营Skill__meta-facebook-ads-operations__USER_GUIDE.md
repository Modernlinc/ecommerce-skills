> 实用版当前范围：当前FB-PRACTICAL-V1-20261020-01，直接父版FB-PRELAUNCH-20261019-W1-F01-R1；L0_OFFLINE，NOT_REVIEWED / NOT_FINAL_QA / NOT_PUBLISHED，不继承旧通过。允许一般解释、安全合成，以及通过读前准入的公开/自有非敏感商品、Offer、素材、目标资源和获准汇总数字；客户/敏感材料及脱敏件须在读取前暂停，并取得使用方有权数据责任人对具体材料与用途的确认；还须满足当前宿主上级规定的具名确认和本包能力边界。该确认不自动允许本L0包处理已排除的数据或接入账户。完整成果见[方法](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__METHOD.md)与[人工搭建交接](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__commerce-completion-workflows.md#人工搭建交接)。以下明确标为历史的记录不恢复旧准入/执行令。

# 使用说明：Meta/Facebook付费广告离线工作

## 先知道你拿到什么

这是由Agent读取方法执行的中文离线Skill，不是自治程序、连接器或完整课程。当前FB-PRACTICAL-V1-20261020-01，直接父版FB-PRELAUNCH-20261019-W1-F01-R1；L0_OFFLINE，NOT_REVIEWED / NOT_FINAL_QA / NOT_PUBLISHED，不继承旧通过。允许一般解释、安全合成，以及通过读前准入的公开/自有非敏感商品、Offer、素材、目标资源和获准汇总数字；客户/敏感材料及脱敏件须在读取前暂停，并取得使用方有权数据责任人对具体材料与用途的确认；还须满足当前宿主上级规定的具名确认和本包能力边界。该确认不自动允许本L0包处理已排除的数据或接入账户。本版独立验证尚未完成；状态看[机器记录](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__admission__STATUS.json)，旧S3及具名历史证据不覆盖本版。

核心宿主需要读取UTF-8 Markdown/JSON与相对文件，并能进行中文推理和算术。业务审阅不依赖Python、Node、私有Vault、其他Skill、API或登录；本版可选新输入静态URL工具需现有Node 18+，无运行时注明未执行，不安装。可选Python标准库工具只检查文件完整性。模型/宿主最低兼容版本未证，不保证任意模型有效；当前生产请求与实际可见版本在[PACKAGE](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__PACKAGE.json)分列。

先按[权限门](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__permissions-and-live-gates.md#打开资料前的准入)核范围后才能打开材料；下表描述所需信息类型，不是让用户先上传敏感原件。经营/事件类只可用已准入汇总或安全合成输入，明细/客户及脱敏件先单独确认。

## 按你的问题找材料

| 目的 | 先给什么 | 结果/入口 |
|---|---|---|
| 从一批素材准备初始方案 | 商品/Offer、市场/语言、目标、资源与素材编号/说明；不用预给分组 | [结构从零路径](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__meta-ad-structure-and-draft.md)，阶段说明、概念/变体、取舍、具名草案与文案、首批和后续 |
| 广告准备是否能交同事 | 目标/市场/商品Offer/页面/广告文案和版本 | [结构](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__meta-ad-structure-and-draft.md)+[剧本§2/4](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__course-distilled-operating-playbooks.md)，完整审阅/brief/未创建草稿；[F1例](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__examples__f1__INPUT.md) |
| 素材该怎么做、账上是否有贡献 | 自有研究摘记/反例、平台观察、订单退款、成本结算/变更 | [衔接](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__commerce-completion-workflows.md)+[math](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__business-math-and-unit-economics.md)，完整经营创意报告；[F3例](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__examples__f3__INPUT.md) |
| 目录/受众/跨市场迁移怎么交接 | 独立关系意图、待核表、渠道用途/许可、旧基线和目标 | [衔接](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__commerce-completion-workflows.md)+[权限](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__permissions-and-live-gates.md)，关系/抑制/迁移/责任包；[F4例](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__examples__f4__INPUT.md) |
| Pixel/CAPI或报表解释 | 获准本地事件/报表定义及业务口径说明 | [测量](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__measurement-attribution-and-events.md)，一致性/归因/缺证解释；不是字段安装与去重成功认证 |
| 零数据测试或表现变化 | 目标/主要未知、基线/日志/交付/成熟/容量 | [诊断](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__testing-diagnosis-and-stop.md)，一个主要变量/替代解释/停止，因果false |
| 主页、群组、私信自然运营 | 先拆广告与非广告请求 | 自然运营范围外；仅说明路由，不自动调用他人服务 |

不必先填全部内部英文键。材料少时先完成可证的部分；没有经济输入不猜行业均值/0，没有最新平台规则不猜按钮参数。输入版本变动或撤去证据时只撤回依赖结论，别把缺证当修复。

## 怎么看结果

先看主文中的决定与必要依据、完整可用稿、资源条件和关键待办；任务不涉及的部分不硬凑。完整对象映射、UTM及 [SKILL 输出合同](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__METHOD.md#输出合同)的精简完整 YAML/JSON 在明确标识的附录或配套文件中查阅，不要求首次使用者先读技术明细；机器摘要仍须随本次完整交付提供，不能省字段、换字段名、只给空模板或承诺以后补交。具体分层及无附件时的处理统一按该输出合同。关键结论的“具体证据定位 + 证据类别（含supplied_fact）”可集中在配套依据表并准确回接主文，影响当前选择和安全停止的限制仍在主文显眼保留；合成材料不冒充官方事实、真实经验或真实许可；supplied_fact只表示可定位来源陈述，附日期/版本/观察深度及未核范围。

运行状态只用 DRAFT、NEEDS_FIX、NEEDS_RESEARCH、UNKNOWN、HUMAN_GATE_REQUIRED。UNKNOWN 是未能判定的值；具体当前设置/证据补查另标 NEEDS_RESEARCH 并指出影响，敏感读取确认或真实动作另标 HUMAN_GATE_REQUIRED；不让无关离线内容全部停摆。PAUSED 只是不存在且未发布对象的草稿字段。平台指标≠付款订单≠利润≠因果，数学情景不产生预算许可。

四项核对：结论是否回到提供证据；报价/归属是否由独立依据支持；算术是否同池同窗、净额只扣一次；动作是否有owner/范围/检查/停止。发现不符留原输入/输出/版本，不拿报告直接执行。F3/F4输出标制作方合成应用，F1输出标历史，不是正确答案缓存。

按[人工搭建交接](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__commerce-completion-workflows.md#人工搭建交接)交完整可用稿件与具体待核清单；创建/变更交接仍是一份待人工审阅的本地计划，入口见[人工审阅交接](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__commerce-completion-workflows.md#人工审阅交接)。预算归属字段保持 `budget_owner_level`，建议值及依据另列，不改名为 budget_owner_proposal，也不冒充当前配置。金额、类型、期间、币种、最大损失与实际花费许可分开。接收方必须保留[结构中的映射/继承/排除与本地控制元数据](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__meta-ad-structure-and-draft.md#离线交接语义核对)；无法表达时停止机器直接交接，保留中文计划和具体不兼容项。不会因此自动调用连接器或平台。

## 文件、失败与更新

只在当前包内相对引用。缺件时列相对路径并停受影响项，不回读隐藏公司路径；来源外链仅出处，无Web仍可做离线任务，当前字段未知保持。Web受限不换工具/身份/代理重试，F2历史限制不会因包版本重置。对外保存的Markdown交付以包内相对路径链接方法依据，同时显示文件名与章节；聊天中的本机绝对路径仅作当前宿主导航，不能代替可搬运交付索引。原始运行回执保留原定位，不重写历史证据。

[static_utm.mjs](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__tools__static_utm.mjs)按[新输入合同](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__tracking-parameters-and-url-checks.md#新输入静态工具)读获准单文件并写新结果后重读；只证字符串，不证收数/页面/授权。完整性工具 payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__tools__verify_integrity.py 是原字节继承的可选工具。历史融合曾在已有Python环境以显式 --root 和 --manifest 核查当时包；当前开源副本请核本 Skill 根目录 CONTENT_MANIFEST.json，不运行旧完整性工具；不安装依赖、不执行业务。工具只读指定清单文件，不验证未列文件。完整性不验证来源可信、质量、法律或业务效果。[来源](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__provenance__SOURCE_NOTES.md)、[内部方法](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__provenance__INTERNAL_METHODS.md)、[权利](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__provenance__RIGHTS.md)、[限制](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__provenance__LIMITATIONS.md)必须可读。

第一次使用读[SKILL](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__METHOD.md)和任务相关reference即可；当前范围见[范围页](payload__候选正文__Facebook广告运营Skill__02-验收范围与已知限制.md)，不必先读历史JSON或旧答案。当前生产身份以PACKAGE和admission/STATUS为准；旧来源、CHANGELOG、实例和历史摘要仅作审后追溯，不自动继承通过或恢复旧指令。S1来源与新推导见[来源说明](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__provenance__SOURCE_NOTES.md)。正式Skill/Vault同步、独立复审、公开发布和真实效果各自需实际证据。支持边界见[SUPPORT](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__SUPPORT.md)。
