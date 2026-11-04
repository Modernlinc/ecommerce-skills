# 测量、归因与事件

需要形成UTM方案或检查链接时，先读[追踪参数设计与URL检查（FB-1）](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__tracking-parameters-and-url-checks.md)。静态标签与URL检查不证明分析工具收数、平台归因或业务收益。

## 四层分开

1. **测量完整性**：事件是否真实发生，名称、值、币种、时区、订单键和浏览器／服务器来源是否一致。
2. **Meta 平台归因**：用于平台内诊断和比较；窗口、建模和字段是高波动事实，执行时逐页刷新。
3. **业务总账**：订单、付款、退款、商品与履约成本、贡献利润和现金回款。计算口径见 [业务指标与单位经济](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__business-math-and-unit-economics.md)。
4. **增量因果**：回答广告是否带来额外结果；平台归因本身不是反事实。实验资格不可见时为 `UNKNOWN`。

对应 `META-METHOD-MEASUREMENT-01`：本 Skill 保留 Pixel、Conversions API、Events Manager、归因设置和 lift 路由的 Meta 差异；平台归因、业务总账和增量因果继续分层。跨平台公共合同只作流程背景，不替代本地经营公式、真实订单或反事实证据。

## 离线测量审计

按顺序检查：

1. 业务问题与主要转化事件是否一致；互动、页面浏览不能替代销售或合格线索。
2. Pixel 与 CAPI 的事件名、发生时点、值、币种、订单／线索键是否可对账。
3. 同一业务事件的浏览器与服务器回传是否有稳定关联键和去重设计。
4. Events Manager 的诊断、事件匹配质量、测试事件或覆盖证据是否由用户授权提供；没有则 `UNKNOWN`。
5. 平台归因窗口、业务订单窗口、退款成熟期和转化延迟是否可比较；定义变更按下节 M1 核版本与适用期。
6. 平台报表与业务总账差异是否分层解释，而不是自动以一方覆盖另一方。
7. 当前 L0 的 `causal_claim_allowed` 始终为 `false`。lift／实验资格、对照、成熟或实际交付已知不自动证明因果；未来个案审查的分配/比较单位、反事实与实施证据见 [测试、诊断与停止](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__testing-diagnosis-and-stop.md)。缺证可输出 `NEEDS_RESEARCH`，不自行签发因果结论。

## 归因定义变化与跨期比较（M1）

**带日期官方事实**：Meta 在2026-03-03公告中说明，优化网站或实体店转化的 Campaign 将分批调整归因：click-through 收窄为链接点击，非链接互动转化移入原 engaged-view 类别并更名 engage-through。公告称当月稍晚开始、不同广告主生效时间可能不同。2026-09-05仅核验指定选段；这不证明目标账户已采用、目标市场资格、历史重算或 API 字段。定位及限制见 [M1来源增量](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__provenance__SOURCE_NOTES.md#m1)。本便携候选字节尚未独立验收，不继承历史准入。

**视频观看定义补充（M3，2026-09-10核验）**：[Meta《Simplificando la medición de anuncios para un mundo “social-first”》](https://about.fb.com/ltam/news/2026/03/simplificando-la-medicion-de-anuncios-para-un-mundo-social-first/)（发布于2026-03-03）在“engaged-view”小节的视频/Reels段末句说明，互动观看定义中的观看时长由10秒调整为5秒。这是观看资格定义变化，不是转化归因窗口天数、推荐素材时长或目标账户采用证明；完整资格条件及短视频例外不能仅由该公告确定。本次文字正文及脚注的观察范围和限制见[M3来源补充](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__provenance__SOURCE_NOTES.md#m3-video-definition)。

**公司离线比较分支**（不是官方操作指令）：

- 明确旧定义及覆盖期：保留原始列，只在同定义、可比窗口/币种/成熟度内比较；不按公告日改名或倒算旧报表。
- 明确新定义及覆盖期：按材料分别保留链接点击归因与互动归因；只比较同定义的可比分段，不假设不同归因列互斥或可相加。采用边界只有获准离线材料明确时才可用于分段。
- 定义、生效范围或历史重算未知，或期间混用：保留原标签，相关字段为 `UNKNOWN`，依赖它们的跨期结论为 `NEEDS_RESEARCH`。只补该报表的定义版本、覆盖期与重算说明，不以公告发布日期统一切版，也不自行访问账户补证。

**视频跨期比较的限定核对**（公司离线判断）：涉及视频观看归因时，现有 `definition_version` / `definition_evidence` 还需说明观看资格定义及其报表适用证据，不能仅核列名或点击分类。转化窗口、观看资格、账户采用边界与历史重算分别判断；未知只阻断相应比较，不按公告日统一切版，也不按观看时长比例换算历史数值。缺少所需证据时，受影响定义为 `UNKNOWN`、比较结论为 `NEEDS_RESEARCH`；已有同定义证据时沿用原三分支。不涉及该类比较的任务不强制补此项，`causal_claim_allowed: false` 保持不变。

**本地审计字段**：`definition_version`、`definition_evidence`、`account_adoption_time`、`segment_window`、`market`、`optimization_destination`、`reprocessing_state`；它们不是 Meta API 参数。分类变化不等于销售变化或广告增量，当前 L0 的 `causal_claim_allowed: false` 保持不变。

## 去重边界

`event_id` 等具体参数与当前实现要求属于高波动开发者事实。2026-09-03 与 2026-09-04 对 Meta 开发者文档的刷新均遇到 HTTP 429，因此：

- 可以教学“同一业务事件的浏览器／服务器回传需要稳定关联并避免重复计数”的诊断合同；
- 不宣称当前参数、字段或集成已经由官方逐页核验；
- 不验证真实 Pixel／CAPI，不发送测试事件，不读取客户事件；
- 输出 `UNKNOWN`，并要求当前官方文档或已授权实现证据后再给字段级结论。

## 状态判定

- 审阅材料未提供值、币种、单位、转换或去重证据：相应事实值为 UNKNOWN，具体补证为 NEEDS_RESEARCH。不能由摘录缺字段推定真实发送载荷漏字段，不能自动除100或选某一路为真值。
- 有可定位且可比较的证据证明实现缺值、错值/币种、重复计数，或事件定义与已确定业务目标不一致：NEEDS_FIX，指出已证错误及受影响范围。已知单位不同但归一化规则与独立业务金额一致时，只说明该项限定一致，不诊断故障，也不顺带确认去重成功。
- Events Manager、去重实现、归因窗口或实验资格不可见：值 UNKNOWN；需要核它时列 NEEDS_RESEARCH 和具体目的。
- 平台归因与业务总账不一致但原因未闭合：NEEDS_RESEARCH。
- 请求接入真实 Pixel、CAPI、事件数据或 API：HUMAN_GATE_REQUIRED。

测量未通过时，不给依赖它的扩量、赢家或 ROAS 因果结论；给一个优先的最小补证动作和停止方式，并继续独立可成立的素材整理、文字与离线结构设计。当前 L0 的 causal_claim_allowed 仍始终 false。
