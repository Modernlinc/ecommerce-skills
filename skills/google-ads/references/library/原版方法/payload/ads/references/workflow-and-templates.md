# Google Ads 工作流与模板

本候选复用既有Google五方法单元；历史平台条款受日期与当前资格门禁约束，不依赖旧课程目录。公共口径只保留边界，不隐式调用其他Skill。

## 1. 业务真值与权限

先填写：

`市场｜语言｜币种｜时区｜Offer｜落地页｜业务主结果｜结果链｜单次结果价值｜完整变动成本｜最大 CPA/最低边际回报｜最大测试损失｜停止线｜批准人`

服务业务可用 `咨询 → 有效 → 合格 → 报价 → 成交 → 毛利`；电商业务可用 `点击 → 购买 → 退款/拒付 → 履约 → 复购 → 贡献利润`。平台 ROAS、CPA 或预测不能替代业务上限。

权限卡：

`资产｜所有者｜操作者｜允许动作｜期限｜审批范围｜变更日志｜回读｜回滚｜紧急停止`

## 2. 转化测量审计

转化合同：

`事件｜业务含义｜触发｜Count｜去重键｜价值来源｜币种｜Primary/Secondary｜数据源｜归因/延迟｜测试证据｜负责人`

按以下顺序检查：

1. 列出全部转化操作及业务定义、来源、Count、价值、币种；同时记录Campaign采用账号默认还是单独目标、普通目标biddable与动作Primary/Secondary、自定义目标是否生效及成员。缺配置时只标未知，不从Secondary标签推断必不优化。
2. 检查重复 Google tag、重复 GA4 导入、浅层行为被当作主要销售结果、购买价值缺失、币种/时区冲突和 transaction ID 去重。
3. 分开解释 Google Ads、GA4、网站、CRM、电话与财务的事件时间和归因口径；数值不要求机械相等，也不能直接相加。
4. 对线索业务，先定义“合格线索、成交、退款或高价值客户”的业务状态，再映射 Conversion Action、Goal 和 Primary/Secondary 角色。
5. 增强型线索转化中的一方数据用于补充可用的广告标识，不是跨场景强制替代。`tag`、GCLID、GBRAID/WBRAID、user-provided data 与 session attributes 必须按当前采集方式和官方条件选择，不能写成全部必填。
6. 未确认同意、客户数据条款、数据控制者、规范化/散列责任、账户资格或导入来源时停止；“已散列”不证明这些前提成立。

输出：`conversion_action_audit`、`duplicate_signal_diagnostic`、`enhanced_offline_route`、`ga4_ads_boundary_note`。

### 测量切换与导入缺口的条件式诊断

仅在输入显示追踪切换、转化列重叠、导入拒收或长成交周期时补此检查，不给普通改稿任务增加必填表。先按提供的业务事件、Conversion Action、数据源与生效区间解释各列；切换期两个动作可能记录同一结果，不能只因列名不同或平台各自去重就相加。没有合法提供的去重或集合证据时，保留各列事实并将相关跨期效果比较标为不可比，不猜重复量。

按同一动作、事件日期口径、时区和已成熟窗口，对照获准的业务聚合数、提交数、导入结果中的接受/拒绝/待处理数及 Ads 相应报告；区分一次提交、重试行与唯一业务事件，不能把报错行占比直接称为全部成交损失比例，接受也不等于已经归因。输入只到汇总且不足以对齐时，明确缺哪些脱敏字段，不索取真实客户明细。

导入时限、配置转化窗口、业务成交周期与报表回补是不同约束；按当前路线核官方时限和错误证据，不把超限拒收当成多等几天即可恢复，也不改造事件时间规避限制。缺失的迟到成交不能填零、按个案比例补齐或直接生成新的 CPA/ROAS 目标。可交测量修复草稿、条件式目标讨论和后台聚合对账请求；依赖未校准结果的效果排名、出价及扩量判断停止，独立的事实安全文案仍可交。真实采集、连接、配置、上传和预算变更另守人工门禁。

### enhanced_offline_route

这是公司验收合同，不是平台字段的永久清单。平台高漂移字段在使用当天按 [当前平台事实门禁](current-platform-gates.md) 复查。

`业务状态｜Conversion Action/Goal｜Primary/Secondary｜网页采集前提｜已观察标识符｜条件式路线｜导入表面/资格｜conversion time/timezone｜order_id/唯一事件键｜价值/币种｜同意/客户数据条款｜规范化/散列责任方｜最小数据｜partial failure/失败行｜job_id｜诊断窗口与计数｜Ads 报告日期口径｜RESTATEMENT/RETRACTION｜负责人｜停止点`

条件式路线：

1. 先把 CRM 业务状态映射到一个明确的 Conversion Action/Goal；未确认优化角色时不进入竞价建议。
2. 记录tag/采集方式、可用广告标识、用户数据与具体导入表面；GCLID可用时保留，但缺tag或GCLID不能单独推断所有路线失败。先核目标路线资格及适用条件；未明确路线时NEEDS_RESEARCH，不承诺直接上传。
3. GCLID、GBRAID/WBRAID、user-provided data 和 session attributes 只填实际合法取得且适用于当前路线的字段。没有某字段不自动等于失败；是否需要它由采集方式、导入表面和官方条件决定。
4. `order_id`/transaction ID 用于减少重复并支持后续调整；没有它时要明确替代识别组合与限制，不得自造 ID 证明去重。
5. 转化时间写事件发生时间与时区；报告核对按官方事件/点击日期口径和延迟解释，不用上传日期机械对账。
6. Google Ads API候选先核历史上传资格及当前导入表面，不假定新账号可用旧路径；session attributes资格单列。该路线需partial_failure、失败行和job_id诊断；成功响应不等于全部事件成功或已经归因。不得照抄本次观察有差异的规范化示例；真实数据处理另行授权。
7. 退款、取消或价值变化单独设计调整：正式枚举 `RESTATEMENT` 用于改写既有转化价值，`RETRACTION` 用于撤回既有转化。中文“改写/撤回”只是释义，不是 API 枚举。保留原 Conversion Action、order_id 或适用识别组合、转化时间与调整时间；不得把新导入和调整混为一批。
8. 真实客户数据读取、规范化、散列、上传、API/Data Manager、账户设置、条款接受或调整执行均为 `HUMAN_GATE_REQUIRED`。

四类最小自检：

| 合成输入 | 路线判断 | 预期主状态 |
| --- | --- | --- |
| 仅有 GCLID，业务状态、Action、时间和去重已定义 | 普通离线候选；仍需确认导入表面及资格，不冒充增强型路线 | `NEEDS_RESEARCH`（路线/资格未知时）；证据完整后才为 `DRAFT` |
| GCLID + 合法取得的 user-provided data，采集与条款前提完整 | 增强型候选并保留GCLID；另核具体导入资格及实现责任 | `NEEDS_RESEARCH`（路线/资格未知时）；证据完整后才为 `DRAFT` |
| 没有收集 user-provided data 的 tag，也没有 GCLID，只有用户数据 | 先查具体采集/导入路线与资格；不能仅凭这些缺项判定所有路线失败，也不承诺直接上传 | `NEEDS_RESEARCH` |
| order_id 重复并发生退款 | 先阻止重复，再分别形成去重与 `RESTATEMENT`/`RETRACTION` 草稿 | `NEEDS_FIX`；实际调整另行门禁 |

Video 输入准备或依据已给数据复盘时，另读 [Video局部合同](video-measurement-and-review.md)。仅复用本节已成立的测量与证据边界；研究附录不提供默认平台定义。

## 3. Search 结构与意图

Search 规划卡：

`业务目标｜市场/语言｜Campaign 边界｜品牌/非品牌责任｜意图主题｜关键词与匹配假设｜广告承诺｜页面｜转化目标｜预算边界｜回读字段｜停止条件`

规则：

- Campaign 按业务目标、市场/语言、预算责任和落地页边界组织，不按每个关键词拆分。
- Ad Group 聚合同一搜索意图、可以共用广告承诺和页面的主题；不能共用时再拆分。
- 品牌承接与非品牌拉新分开看，避免品牌需求掩盖新增获客成本。
- Search 如需只承接指定品牌查询，可把 `brand inclusions` 作为 Search 专属条件字段；它不是 PMax 字段。当前新建/迁移路径可能与 AI Max for Search 相关，必须使用日核验账户能力，真实应用仍需人工批准。
- 不把 SKAG、固定 Ad Group 数量或 Broad Match 设成跨账户默认。
- 输出是拟设为 `PAUSED` 的声明式 Campaign—Ad Group—Ad 结构，不表示对象已经存在。

失败或停止：业务目标混杂、搜索意图没有证据、页面不能承接、转化目标未验证、预算被结构切得无法学习。

## 4. 搜索词与否定词闭环

先记录证据粒度：`来源表面/文件与行列｜Search系列/广告组代号｜报告窗口与导出时点｜网络/筛选范围｜可见脱敏查询或仅主题/聚合｜可用指标及定义｜未覆盖范围`。主题级输入可以支持方向诊断，但不自动满足查询级否词候选证据。

洞察标签与当期查询分开。只有主题、子主题或“其他查询”聚合时，不反推隐藏原词、不补造该词的流量/成本/转化，不因标签出现就判定否词失效。需要查询级判断时，请获授权负责人提供同范围、已去除个人信息且保留必要匹配语义的可见查询证据；不可取得时，该判断保持NEEDS_RESEARCH，但继续可完成的局部诊断与草稿。不得承诺找回隐私隐藏查询。

将“可见查询判断”和“未覆盖部分未知”并列。若需描述可见指标占比或差额，先按[包内通用比较与回算规则](video-measurement-and-review.md#描述性复盘数据与比较条件齐备才计算)证明分子分母同范围且可加；只复用该节的可比性、筛选留痕和回算规则，不采用后续Video来源附录中未准入的平台定义。未知或零分母不计算，不把差额自动命名为隐藏查询数、无关花费或否词节省额。不存在统一覆盖率通过线，也不按可见样本比例外推全量。

否词候选注明依据是已观察查询还是独立业务/合规排除需求；后者不是查询发生证明。沿用下方层级/匹配、应挡/不得挡、误伤、批准和回滚合同。平台表面差异及日期化依据见current-platform-gates.md的Search段；聚合信息不得绕过候选门槛。

冻结日期、时区、币种、转化定义、关键词和匹配类型后，将搜索词分为：

- 明显无关；
- 不符合交付、资格或合规；
- 研究/信息意图；
- 可扩展的商业意图；
- 信息不足。

输出：`搜索词分类｜否定词候选｜建议层级/匹配｜支持证据｜可能误伤词｜批准人｜复查触发条件`。

否定词只形成候选，不能自动应用。业务目标、商品或页面改变时复查旧否定词；上下文不足、误伤风险高或转化定义冲突时停止。

### Search 否定匹配预演

否定匹配不同于正向关键词。按2026-09-13具名正文，大小写/拼写错误与同义词/单复数分开：前者由匹配处理，后者需候选检查；不笼统推断所有close variants自动覆盖或完全不覆盖。广泛/词组/完全匹配按下表预演，具体风险仍需使用日证据与批准。

| 类型 | 最小语义 | 合成“应阻止” | 合成“不得阻止” |
| --- | --- | --- | --- |
| 否定广泛 `free air quality app` | 查询包含全部词即可阻止，词序可不同；缺少任一词时不应按这条否词阻止 | `download free air quality app` | `free air monitor` |
| 否定词组 `"free air quality"` | 查询包含同序完整短语时阻止，可在前后加词 | `best free air quality app` | `air quality free app` |
| 否定完全 `[free air quality app]` | 查询与完整词组一致时阻止；增加其他词时不应按这条否词阻止 | `free air quality app` | `best free air quality app` |

每个候选必须补齐：

`匹配类型｜账户/Campaign/Ad Group 层级｜应阻止查询｜不得阻止查询｜close-variant/单复数/同义词风险｜正向关键词冲突｜误伤恢复方案｜批准人`

只要无法写出一条“应阻止”和一条“不得阻止”的脱敏查询，候选保持 `NEEDS_RESEARCH`；真实添加、移除或应用列表为 `HUMAN_GATE_REQUIRED`。

## 5. Merchant Center、Shopping 与 Performance Max

先建立目标组合明确的商品数据基线：

`Merchant account/账户状态｜网站与业务设置｜数据源/处理状态｜商品 ID/变体组｜目标国家｜语言/币种｜marketing method｜账户级问题｜设置级问题｜商品级状态｜Visibility｜受影响国家/方法｜标题/描述｜品牌/GTIN/MPN｜图片｜价格｜库存｜页面一致性｜Campaign 关联｜产品过滤/Listing Group｜最近处理/回读时间`

这些是公司索证与诊断层次，不是15130232独立证明的全部平台资格矩阵。该页本次仅支持marketing method、数据源继承及Shopping还需Campaign等区别；国家、状态、Visibility的细则保留各自旧核验日，当前资格仍需对应证据。

以下证据层不能互换：

1. `received_or_processing`：数据已接收、Under review 或 Processing，只证明进入流程。
2. `product_status`：Approved、Limited 或 Not approved；Limited 可能只影响部分国家或 marketing method。
3. `target_combination_eligible`：明确目标国家 × marketing method × 商品/账户/设置均满足当前资格。
4. `serving_evidence`：目标组合已经获得展示或点击。Approved 不自动证明已经投放或获得流量。

处理顺序：

1. 先确认商品事实、数据源、目标国家、marketing method、资格、错误和关键属性完整性。
2. 按账户/设置阻断、目标组合资格、价格/库存/页面不一致、标识和内容质量排序修复，不先调竞价。
3. 修复后重新读取同一目标国家 × marketing method 的商品状态、Visibility、Campaign/Listing Group、展示和点击；复查频率按目录变化和业务周期设定，不用固定天数。
4. 搜索需求可表达且页面能承接时评估 Search；只有目标市场的 Shopping ads 组合合格并与 Campaign/Listing Group 对齐时才评估 Shopping。
5. 公司在目标市场商品组合、Feed、素材权利与承诺、主要转化和多渠道承接证据齐全后才建议带商品数据的PMax。此为公司风险门，不等于平台统一最低启动要求；10724492说明有Merchant feed的启动素材条件与质量推荐有别。另一市场/方式的获准不能作为本目标资格证据。
6. PMax 渠道、资产组和资产级报告只提供诊断线索；归因结果不是增量或利润证明。

输出：`feed_health_baseline`、`attribute_repair_queue`、`no_impression_diagnostic`、`search_shopping_pmax_route_card`、`pmax_channel_diagnostic`。

停止：商品事实未知、价格或库存冲突、商品不合格、测量未就绪、页面或政策阻断、需要真实账户回读。

### 商品字段映射的证据链（条件式）

仅在获准材料涉及商品描述、标签或同步结果不一致时，复用 attribute_repair_queue，按同一商品/变体、市场、数据源与版本回接：源字段名及值、连接器实际配置、转换规则、提交值、处理值、页面值及各自证据时点。不要从“改过页面/SEO摘要/Shopify tag”直接推断 Feed 或广告分组已改变，也不要把未提供映射证据写成不存在映射。

页面正文、SEO摘要和Feed字段是不同观察对象，但不意味着它们必然互不相通。2026-10-12官方同步说明允许 Google & YouTube app 按设置选择商品标题/描述或搜索引擎列表的标题/摘要；这不证明当前店铺选择了哪条来源。其他连接器不套用该设置。custom label 是可选的商品分组字段，不预设店铺tag已被映射，也不强制添加标签。用实际配置和输出确定负责字段；规则、来源或提交/处理证据缺失时，只停止该同步归因与分组变更判断，仍交有据文案和精确索证。

证据闭合后才给单行 old→new、负责源/规则、预期影响和同范围回读；不因看到平台旧值就反复修改无关摘要。沿用资格、展示、业务结果分层，真实上传、连接器/商品/标签/预算修改仍须另行授权。此为离线诊断细化，不新增自动Shopping执行能力。来源及当前核验范围见[本轮来源说明](round-three-sources.md)。

### 变体错配的最小改稿

需要诊断变体/路由错配时，在 attribute_repair_queue 中记录 variant_identity_and_route_check：
target_context（国家/语言/币种/方式/时点）、item_id/规格、source_owner/version、经营真值、源值/提交值/平台处理值、link/mobile_link/ads_redirect 的适用与证据、初始可见与结构化商品身份、expected_old/proposed_new、unchanged_siblings、回读及停止条件。

先判是否同一变体，再判价差。同变体且有证据证明源价过旧，复用单行价格草稿；入口选中另一变体，优先给被证实错误的路由/行映射改稿，不把正确价格改成兄弟款价格；可见内容与结构化绑定错配则交对应页面负责人。证据不足仅索取缺项，不能猜 URL 或经营真值。

用唯一商品行和版本约束修改，不用变体组作批改选择器；逐字段交 old→new 及其他商品不变范围。适用广告入口和普通 link 分别核实。自动更新后平台值一致不表示生成源已修复；源/提交/处理值及同一目标组合后续状态分别回读。此为公司离线证据门，不把预选 URL 最佳实践说成平台统一参数要求。

身份/负责源不明、前置版本失效或候选路由缺证时，停止受影响草稿。实际上传、网站修改、自动更新设置、库存/价格业务决定及账户操作另须授权；不因有分析权限而执行。实际改动仅交 DRAFT；诊断仍可标 NEEDS_FIX/NEEDS_RESEARCH，不声明已执行或效果。

### no_impression_diagnostic

按以下顺序记录观察，不把先后顺序写成因果：

`账户状态/网站与业务设置 → 目标国家与 marketing method → 政策/账户/设置/商品问题 → 页面/价格/库存 → Campaign 关联 → Listing Group/产品过滤 → 预算与竞价状态 → 最近处理或变更 → 合理回读延迟 → 展示/点击`

- Processing 时原因仍为 `UNKNOWN`，等待同一目标组合回读。
- Approved 但 Listing Group 被排除时为已确认配置缺陷 `NEEDS_FIX`；修复草稿不等于真实改动或已经恢复展示。
- Approved、关联和过滤均无已知问题但没有展示时为 `NEEDS_RESEARCH`；不得虚构“预算、竞价或系统分配”原因。

### pmax_channel_diagnostic

`日期范围｜Channel｜Format(All/Ads using product data/Ads using video)｜Conversion category/action｜Ad event type｜Status/diagnostics｜impressions/clicks/interactions/cost/conversions/value｜实际与平均目标｜Feed/Merchant｜资产/视频｜政策｜Listing Group｜预算受限｜最近变更｜时间序列｜转化延迟｜业务结果｜第一断点｜下一回读`

判断规则：

- Channel 表示广告出现的表面；Format 是商品数据或视频等切片，二者不能混写。
- 渠道零花费且没有诊断时，只能把原因标为 `UNKNOWN`，报告为 `NEEDS_RESEARCH`。
- `Missing required assets`、明确 Feed/Merchant 问题或被排除的 Listing Group 为 `NEEDS_FIX`；先生成资产或配置修复草稿，不先改预算。
- 渠道贡献是 Google Ads 内部归因。不能由此推出可直接按渠道分配 PMax 预算，也不能证明增量、因果或贡献利润。

### pmax_plan_and_paused_draft

这是完整的离线 `plan/draft` 合同，不是渠道路由卡。每个字段必须先标：`required_for_this_plan`、`conditional`、`not_applicable` 或 `unknown_needs_evidence`，再写值、证据、负责人和停止条件。Google 推荐、默认值或课程偏好不能自动成为经营决定。

`draft_status(PAUSED only)｜business objective｜market/language/currency/timezone｜Campaign boundary/name｜Merchant account/data source｜target country × marketing method｜primary conversion/value/quality｜bid strategy/target status｜budget/max loss/approver｜start/end window｜Asset Group ID/name/promise｜Final URL｜URL expansion decision｜URL inclusions/exclusions｜text/image/logo/video assets and rights｜auto-created assets decision｜Search themes｜Audience signals and first-party eligibility｜brand exclusions｜official_inventory_scope_as_of｜youtube_search_not_all_youtube_acknowledged｜excluded-brand Shopping allowance=allow/do_not_allow/unknown｜allowance_scope=shopping_ads_only｜page_scope_conflict_checked｜brand inclusions=not_applicable_for_pmax｜negative keyword/control route｜Listing Group/product filter/everything-else decision｜new-customer setting｜policy/issue blockers｜measurement/readback｜keep-constant｜stop/rollback｜unknowns`

对象规则：

1. `Campaign`：目标、市场、币种/时区、转化、竞价与损失边界可解释；预算值没有批准时标 `unknown_needs_evidence`，不能补猜。
2. `Asset Group`：每组服务一个可解释的商品/服务承诺，Final URL、素材、Search themes、signals 与 Listing Group 互相一致；不要求所有字段跨场景都启用。
3. `assets`：分别列文字、图片、logo、视频的来源、权利、事实依据与缺口；自动资产属于条件式决策，不默认开或关。
4. `Listing Group`：电商按真实商品属性、状态、利润/库存和页面匹配选择；非商品型计划可 `not_applicable`。`Everything else` 必须明确包含、排除或未知。
5. `URL expansion`：记录启用/停用理由、可进入范围、排除规则与抽样验证。若可能进入招聘、博客、错误语言、缺货或敏感页，先标 `NEEDS_FIX/NEEDS_RESEARCH`，不靠投放后观察补救。
6. `Search themes`、`Audience signals`、品牌排除和否词分别记录证据及限制；总览目录不能证明算法或完整inventory。PMax使用brand exclusions，brand inclusions标not_applicable并路由Search。2026-09-13概述/主题页支持Search/Shopping及Shopping-only allowance；14505308当前访问失败，2026-09-04的YouTube search枚举只作历史证据，当前细则UNKNOWN，不扩成全部YouTube或其他渠道。若本次计划依赖YouTube search或完整inventory判定，相关字段NEEDS_RESEARCH；不依赖时保留其他离线规划。账号能力和真实设置另核。
7. `PAUSED`：只表示草稿期望的初始状态。真实 Campaign、Asset Group、Listing Group、素材、否词或预算是否存在均为 `UNKNOWN`，除非有获授权回读证据。

草稿退出到真实执行前必须同时满足：目标市场商品/页面资格、转化质量、素材权利、控制项、预算与最大损失批准、当前账户能力、回读负责人和停止/回滚均有证据；否则保持离线草稿或人工门禁。

## 6. 竞价与预算判断

复用业务真值、转化合同、实验与停止线：

- 目标偏数量且转化价值近似时，评估转化量导向策略；价值差异显著且可信时，评估价值或利润导向策略。
- 先确认优化信号代表有价值结果，不把受污染表单或浅层事件当成交。
- 观察窗口按完整转化周期与报告延迟设置，不使用跨账户固定等待天数。
- 一次只改变一个主要变量，预先写最大损失、停止、回滚和回读字段。
- 不把平台预测、推荐预算、固定转化数或固定预算涨幅当成经营事实。

输出：`bid_strategy_decision_card`、`conversion_cycle_observation_plan`、`target_change_proposal`、`rollback_and_stop_conditions`。

`bid_strategy_decision_card` 必填：

`核验日期｜当前策略/状态｜Campaign 类型｜业务目标｜采用的 Conversion Goal/Primary actions｜数量/价值质量｜完整转化周期｜预算是否受限｜实际与平均目标｜利润或可接受边际｜候选策略｜不选理由｜迁移前提与步骤｜保持不变｜观察窗｜最大损失｜停止/回滚｜回读字段`

2026-08 的 target-based bidding 变化只在 Campaign 同时满足官方适用条件时作为待核背景。若 Limited by budget Campaign 在该时段波动：

1. 先核对策略、target、实际表现、预算状态、主要转化、完整周期和其他同期变更；
2. 把“时间重合”写为原因假设，不写成平台变化已导致结果；
3. 不因官方系统变化自动提高预算或修改 target；Google 不会替广告主自动调整这些经营边界；
4. 任何真实预算、target 或策略写入均为 `HUMAN_GATE_REQUIRED`。

### Search 展示份额的扩量解释

仅在以 Search 展示份额判断扩量时使用。先确认它的分母是估计的合格展示机会，不是全市场搜索量；在相同 Campaign、网络与时间范围核对因预算和因排名损失的份额及可见性限制，不把缺失值当零，也不把不同渠道或账户份额直接相加。

低份额与当前 CPA 达标只形成核查候选，不能单独证明加预算有利。仍需可信业务结果、转化成熟度、预算是否构成限制、利润或可接受边际、承接能力及变更证据；不能用个案 CPC 或固定广告组数量强制拆分系列。证据不足时交所缺字段和保持不变项，可继续事实安全的广告草稿，不给支出指令或效果承诺。

## 7. 广告、页面和销售连续性

资产卡：

`用户问题｜价值｜证据｜差异｜资格｜行动｜广告文案｜页面证明｜销售承接｜政策/商标｜版本｜结果`

广告、商品、页面、电话/表单和销售口径必须一致。平台 Ad Strength、资产标签或点击率只能提示候选问题，不能独立证明因果或业务胜负。

### Search 证据到可编辑改稿（条件式）

仅在任务包含 Search 广告改稿或用广告/资产统计解释问题时使用。先分清输入是实际查询、聚合主题、业务需求假设，还是资产/广告/Ad Group/Campaign 报表；记录提供的对象标识、时间与口径，不补造平台 ID、隐藏查询或表现数据。

使用 RSA 资产行时，不将共同展示的多条资产行求和成整广告结果；单资产指标可提出核查方向，不能隔离出该标题/描述的因果效果。需要总体结果时回到相应层级的合格汇总，并保留查询/计数/周期与同期变更的限制。官方事实与核验日期见 current-platform-gates 的对应小节。

按依赖给优先动作：事实/资格/页面承诺不一致且证据足够时先交纠错草稿；测量未知时停止业绩胜负及依赖它的预算/策略判断，但仍可交有事实支撑的文案候选；只有测量与可比范围充分时才给受控效果假设及观察/停止条件。不把这三种情况统一写成“等待数据所以无法改稿”。

每个实际改动给提供的对象/本地稿号、旧文字→新文字、来源或页面证明、为什么优先、假设/修复性质及保持不变项；字段缺失保留 UNKNOWN，不强制无关任务填表。可组合资产应独立成立，关键资格或承诺不能靠未必一起展示的另一句补救。不上浮为保证、无证评价/紧迫性或固定 pinning 规则。稿件状态 DRAFT 与诊断状态分开；真实写入另守授权门。

## 8. 诊断、实验与报告

诊断顺序：

1. 业务目标和主结果；
2. 转化、价值、去重、时区、币种、延迟和对账；
3. 搜索词或商品资格、地域、语言、网络、设备和时段；
4. 广告、资产、页面、表单、电话和销售；
5. 毛利、退款、履约、复购和现金流；
6. 最后才考虑出价、预算、结构或素材实验。

### 否定性诊断与实际错例回灌（条件式）

只在准备输出“没有、缺失、未设置”等否定性结论，或已有诊断被反例推翻时使用。先复用已给材料注明对象、版本/时点、已检查范围和未覆盖范围；核对支持证据及可见反证。局部截图未见、导出不含该字段、读取失败或检查未执行，都不能证明对象不存在；相应判断保持 UNKNOWN，明确“当前证据未见”及最小补证，不写成 NEEDS_FIX，也不让对方重复提供已给证据。任务要求但未执行的检查须显式列出原因，不能静默当作不需要；已证实的其他问题仍可独立交付。

若发现实际错例，先撤回或更正受影响结论，并记录“原判断与引用证据 → 同范围反证/缺失检查 → 已知原因或原因未知 → 条件式候选修订 → 原例及相邻反例的核对结果”。不能只写“以后别犯”，也不能凭一次错误扩大为全局规则、猜测模型根因或自动改正式 Skill。候选先在授权的本地材料中检查，正式方法与知识写回仍经既有评审；实际客户更正发送、账户变更和任何真实写入均另守授权门。此为文字错例启发的内部候选机制，不代表已验证降低误报率。

普通分析实验卡：

`假设｜基线｜唯一核心变量｜保持不变｜平台指标｜业务指标｜完整观察窗｜最大损失｜停止｜回滚｜结论边界`

### google_ads_experiment_plan

以下沿用2026-09-04原生对象合同作为离线索证框架，10682377于2026-09-13访问失败未重证当前细则。只有已提供的证据确认本次原生对象与生命周期时，才使用这个名称；否则交实验研究草稿并标NEEDS_RESEARCH，不用周期页代证原生类型或split：

`official_check_date｜original Campaign/eligible object｜original status/evidence｜experiment object/name/type｜single change｜traffic split｜start/end or complete-cycle window｜conversion lag｜keep-constant｜sync behavior/freeze｜concurrent-change contamination log｜platform primary/secondary metrics｜business qualified/sale/value/profit metrics｜sample/decision rule｜maximum loss｜early-stop｜end disposition｜apply gate｜rollback route｜owner/approver｜unknown eligibility/UI/options`

判断与停止：

- original Campaign、实验对象、split 或唯一变量任一未知时，输出 `NEEDS_RESEARCH`；不能把前后对比包装成原生 Experiment。
- 实验期间原 Campaign 同步变化、落地页/转化/预算等同时变化时，记录污染；无法隔离则结论降级，不强判胜负。
- 完成实验不授权“应用”。应用到原系列、结束/移除实验、预算或目标写入均为 `HUMAN_GATE_REQUIRED`。
- 不补猜当前 UI、所有实验类型、账户资格或 split 选项；使用日官方/账户证据缺失时保持 `unknown_needs_evidence`。

客户报告：

`目标事实｜平台结果｜业务结果｜差异｜原因假设｜证据不足｜下一动作｜风险｜负责人｜复盘日期`

报告不得把原因假设写成事实，也不得把本地草稿、检查通过或拟设为 `PAUSED` 写成真实发布。

默认将本轮需要的信息分为同次交付的短正文与证据细节：正文先说明首要判断、交付实际稿件，并列最优先动作及必要停止点；目标范围、平台与业务结果的关键分母、决定性差异和未知须就近说明。随后按对象或输入标识列证据日期、必要算式、原因假设与替代解释、其余证据缺口、负责人、保持不变项、观察窗口、复盘/回读字段及停止/回滚条件。

不得把细节改成仅应追问提供，或为变短删掉决定性风险、实际文案、PMax/实验必要字段。相同风险可引用本次交付内的明确位置，不反复抄写；没有证据的字段保持未知，不为凑短文或填满表格补猜。

## 9. 新手完整示例与委托证据包

Video 测量准备/描述性复盘另按 [专项输入合同](video-measurement-and-review.md#输入准备把已给材料转为下一步能用的内容) 请求当前问题所需的脱敏字段，不扩大为账户访问或完整业务样例。

### 一屏最短脱敏证据路线

先判断任务类型，再只请求最小字段：

| 任务 | 最小脱敏输入 | 先检查 | 专属模板 | 停止点 |
| --- | --- | --- | --- | --- |
| Search 诊断 | 时间窗/时区、Campaign/Ad Group 代号、关键词/匹配、搜索词主题、成本、Primary/Secondary 与合格结果 | 转化定义和搜索词是否同口径 | Search 结构卡或否词预演 | 不索取自由文本 PII；否词不自动应用 |
| PMax plan/draft | 市场、目标、Merchant/商品状态、页面、转化质量、素材权利、最大损失及各控制项已知/未知 | 商品/页面/测量资格是否先闭合 | `pmax_plan_and_paused_draft` | `PAUSED` 不等于已创建；字段未知不补猜 |
| 原生 Experiment | original Campaign 代号、当前状态、唯一变量、split、窗口、指标、最大损失和同期变更 | 是否真有原生对象而非前后对比 | `google_ads_experiment_plan` | 创建、分流、应用和回滚均需授权 |
| 否词候选 | 脱敏查询、意图、层级、匹配、应挡/不得挡各一例 | 误伤、正词冲突和业务变化 | Search 否定匹配预演 | 无法写反例则 `NEEDS_RESEARCH` |

共同输出：`OBSERVED｜UNKNOWN｜第一断点｜最小下一证据｜保持不变｜成功/失败｜人工批准项`。详细参考用于查字段，不要求新手自行登录或提供客户标识、完整 GCLID/BRAID、邮箱、电话或地址。

### 合成示例：72、49、31 不能直接判错

输入：同一份脱敏摘要中，Google Ads 报告 72 次转化，CRM 有 49 个线索，其中 31 个被确认有效；时区、窗口、Count、去重和导入路径未知。

成品应写成：

- 观察：三个数字来自不同系统或业务状态。
- 推断：差异可能来自定义、事件时间、归因、重复导入或状态链，但没有证据指出具体原因。
- 未知：业务主结果、Conversion Action、Primary/Secondary、Count、时区、窗口、去重键、导入路径和延迟。
- 第一断点：业务主结果与转化测量；先冻结扩量，不把 72、49、31 相加、强制相等或直接判定平台错误。
- 最小动作：由获授权负责人提供同一时间口径的脱敏 Ads/CRM 对账包；关键词、Feed、竞价和预算保持不变。
- 成功：每个数字的定义、时间、去重和状态链可复现；差异被标成已解释或有明确下一证据。
- 失败/停止：证据不足，或获取证据需要登录、真实个人数据、上传或设置变更。
- 报告状态：本例差异诊断为 `NEEDS_RESEARCH`；现有证据不足以判断三个数字是否可比，尚未证实测量缺陷，具体差异原因保持 `UNKNOWN`。

测量不可信与 Merchant 拒登并存时，先冻结扩量并闭合主结果与测量；Merchant 作为独立修复队列登记。两条线都可做只读取证，但不要用修 Feed 掩盖错误优化目标。

### delegated_evidence_request

无账户权限时，把下面的最小证据包交给获授权负责人，不要求新手自行登录：

`请求目标｜授权提供人｜资产/账户代号｜时间窗/时区｜需要的脱敏字段｜明确排除的 PII｜定义/Count/去重/窗口｜导出格式｜安全交付渠道｜文件哈希/生成时间｜回读负责人｜无法授权时停止条件`

要求：

- 只请求完成当前判断所需的最小字段；姓名、邮箱、电话、地址、完整 GCLID/BRAID、客户 ID 和自由文本均应删除、遮罩或用不可逆示意值替代。
- 提供人声明其权限和脱敏责任；接收方只做离线审计，不把文件转交第三方或上传平台。
- 如果脱敏会破坏去重验证，可由授权负责人在受控环境计算聚合计数或重复标记，再只交付结果和方法说明。
- 无法在授权范围内提供证据时，对应判断保持 `UNKNOWN` 或 `HUMAN_GATE_REQUIRED`，不得要求绕过权限。

## 10. 其他付费渠道

目标为渠道比较或Demand Gen草稿时读取 [专项研究边界](channel-choice-and-demand-gen.md)。产品类型、输入、损失及源证据必须分别回接；软件不能因为例子中有另一实物商品就继承Merchant资格。全部命题/旧单元ID见 [登记](source-register.json)。
