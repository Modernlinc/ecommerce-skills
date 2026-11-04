# Google Ads 当前平台事实门禁

首次核验日期：2026-09-03；修订核验日期：2026-09-04。核验方式：只读访问 Google Ads Help、Google Merchant Center Help 与 Google Ads API 官方文档；未登录账户。本页是日期化核验记录，不代替使用当天的官方复查。

## 既有2026-09-03—04核验快照（本包未逐页重抓）

### Search 结构、搜索词与否定词

- Search 账户结构官方建议强调按业务目标组织 Campaign，并使用聚合、主题明确的 Ad Group。官方同时偏好自动化与 Broad Match；本 Skill 只采用“业务目标与主题聚合”，不把 Broad Match 作为通用默认。
- 搜索词报告可提供实际查询证据，关键词与查询不是同一对象，可用于正负关键词审查。2026-09-13的2684537正文L21与L22对可见范围存在概括张力，本页不据此证明“所有查询可见”，也不以本次14页证明具体隐私阈值。
- 2026-09-22读取2472708的“Differences between the search terms report and search terms insights”：低活动查询可能不在报告中逐词披露，洞察可聚合但不还原原词；主题标签使用最近56天数据，可能含已不投放或已排除词。两个表面的转化处理及延迟可造成差异。此证据只支持粒度/时间与比较边界，不证明某次差额原因、账号资格或否词失效；首发/更新unknown，使用日复核。
- 否定词存在账户、Campaign、Ad Group 和渠道差异；与正向关键词重叠可能阻止展示。实际添加或移除否定词属于真实账户写入。
- Search否定关键词有广泛、词组、完全匹配，不能套用正向匹配。2026-09-13的2453972 L40、46、60、74、97：大小写/拼写错误由匹配处理，同义词和单复数需分别检查；不把close variants概括理解成全部变体自动覆盖或所有拼写变体都不覆盖。真实应用仍需授权。

官方入口：

- https://support.google.com/google-ads/answer/14752782?hl=en
- https://support.google.com/google-ads/answer/2684537?hl=en
- https://support.google.com/google-ads/answer/2472708?hl=en
- https://support.google.com/google-ads/answer/7102995?hl=en
- https://support.google.com/google-ads/answer/2453972?hl=en

### Search RSA 统计与改稿边界｜2026-10-08

本小节只读核验 2026-10-08；以下官方页首发/更新日 UNKNOWN，当前适用事实按 9/13 官方准入规则登记，不证明账号界面或资格。9564897 与 16259414 支持：资产指标受组合影响，可能共享一次展示，故不是孤立标题效果，也不能把多资产行简单相加为广告总计。7684791 支持：RSA 文本可组合且未必全部展示；英语标题上限 30、描述上限 90 字符，本地检查不等于平台接受。6167122 支持具体用户价值/行动表达与更完整层级的表现审阅；其数量推荐不转为本 Skill 硬要求。9347141 支持转化回补会影响近期 CPA/ROAS 的解释；预测不充实际，观察窗由业务周期决定。

以上仅细化 Search 的证据解释与离线文案审核；不新开自动生成资产、AI Max、其他渠道或投放/预算权限。五页官方入口见本节具名来源映射。

- https://support.google.com/google-ads/answer/9564897?hl=en
- https://support.google.com/google-ads/answer/16259414
- https://support.google.com/google-ads/answer/7684791
- https://support.google.com/google-ads/answer/6167122
- https://support.google.com/google-ads/answer/9347141?hl=en

### 转化目标、增强型与离线转化

- 普通目标下Primary仍需结合Campaign实际采用的目标及biddable条件解释Conversions和竞价；Secondary通常为观察/All conversions，但加入Campaign使用的custom goal存在优化例外。账号默认仅作用于使用默认目标的Campaign，不能凭Primary/Secondary标签证明实际映射相同。依据10993988（2026-09-13）及已读目标API证据（2026-09-12）；不证明业务真值或账号配置。
- 增强型线索转化使用散列的一方数据补充离线转化标识；现有 GCLID 应继续导入。散列、上传或 API 支持不证明同意状态、数据质量或真实账户实施正确。
- 本次upload-offline L223（2026-09-13观察，页面更新2026-09-10）说明：2026-06-15起，没有此前离线/ECL上传历史的developer token调用UploadClickConversion会失败，并指向Data Manager API；页内另注developer tokens已由Cloud projects替代，但该历史准入限制继续。此处只记录观察到的条件，不推定任一账号资格、不宣称所有旧路径全面停用，不展开认证迁移研究。session attributes另有allowlist限制。其他增强型设置旧事实仍按各自历史来源核验，不由此页代证。
- 离线转化诊断应按转化发生/报告口径检查，不用上传日期与 Ads 报告机械对账。
- `tag`、GCLID、GBRAID/WBRAID、user-provided data、session attributes 与导入表面是条件式关系，不是跨场景都必填。Google Ads API 官方文档要求实际 API 上传处理 partial failure，并用响应中的 `job_id` 关联诊断；请求返回不等于所有事件成功。
- 诊断可按账户、Conversion Action、日期或 job 汇总成功、失败和待处理事件；真实可见字段与延迟受账户、导入表面和资格影响。
- RESTATEMENT改写既有转化价值，RETRACTION撤回既有转化；不能用调整直接更换ConversionAction。upload-adjustments（2026-09-13读，更新2026-09-10）要求已记录转化及受支持动作类型；WEBPAGE或原转化带order_id时须用order_id。gclid/gbraid与wbraid条件不同，后者不支持调整；调整时间与转化时间分开并带时区，partial_failure=true。记录示例不证明真实调整成功或数据处理获授权。

官方入口：

- https://support.google.com/google-ads/answer/10993988?hl=en
- https://support.google.com/google-ads/answer/15713840?hl=en
- https://support.google.com/google-ads/answer/16884284?hl=en
- https://support.google.com/google-ads/answer/13321563?hl=en
- https://support.google.com/google-ads/answer/7686280?hl=en
- https://developers.google.com/google-ads/api/docs/conversions/upload-offline?hl=en
- https://developers.google.com/google-ads/api/docs/conversions/upload-summaries
- https://developers.google.com/google-ads/api/docs/conversions/upload-adjustments?hl=en

`https://support.google.com/google-ads/answer/2998031?hl=en_USanswer` 在本轮未形成可复核页面证据，状态为 `needs_official_verification`；不使用它支持当前结论。

2026-09-04 较早访问 `https://support.google.com/google-ads/answer/15713840?hl=en` 出现 429，随后同日重新只读访问成功；两次 attempt 均保留。`https://support.google.com/google-ads/answer/11021502?hl=en` 的 anti-bot/500 失败仍未关闭，只能标 `needs_official_verification`。具体字段继续使用本轮可复核的官方页面/API 文档与转化调整页，不用旧课程截图补写。

### Merchant Center 商品数据

- Merchant Center 支持从网站、电子商务平台、文件、Google Sheets、逐个商品和 Merchant API 等路径建立商品数据源。
- API 接受商品数据只表示进入处理，不表示商品已获准展示。
- 商品 `id` 应对单个商品/变体保持唯一；同组变体共享 `item_group_id`，且页面上的变体事实应与商品数据一致。
- marketing method 决定商品可在哪类 Google 展示方式使用；free listings 与 Shopping ads 不是同一资格。商品可从数据源继承 marketing method，Shopping ads 还需要对应 Campaign。
- 目标国家资格按国家判断；Shopping Campaign 的地域设置应与 Merchant Center 的目标国家对齐或为其子集。一个国家获准不能外推另一个国家。
- 商品状态至少区分 Under review、Processing、Approved、Limited 与 Not approved；Visibility 与状态也是不同字段。Limited 可能只影响部分国家或 marketing method，Approved 不自动证明目标 Campaign 已关联或已有展示。

官方入口：

- https://support.google.com/merchants/answer/11586438?hl=en
- https://support.google.com/merchants/answer/15624855?hl=en
- https://support.google.com/merchants/answer/7052112?hl=en
- https://support.google.com/merchants/answer/6324507?hl=en
- https://support.google.com/merchants/answer/15130232?hl=en
- https://support.google.com/merchants/answer/12652277?hl=en
- https://support.google.com/merchants/answer/12488713?hl=en-GB

#### 2026-09-29 变体与路由补核

三页官方主文文本已读，首次发布/更新日期未明示；当前事实核验日为2026-09-29，不表示真实账户/界面已核验。

- 商品资料与页面应对应同一商品/变体及价格；URL预选匹配变体是官方最佳实践，不是统一参数语法。来源：https://support.google.com/merchants/answer/4752265?hl=en
- 提供ads_redirect时Shopping点击使用它，而free listings仍使用link/mobile_link；不能用单一入口证据证明所有路径。来源：https://support.google.com/merchants/answer/6324416?hl=en
- 自动更新不能替代定期维护商品数据源；价格/库存识别检查link对应页面。多条划线价格时不应启用价格自动更新。未核实任何实际账户开关或处理结果。来源：https://support.google.com/merchants/answer/12157888?hl=en

### Performance Max 与 Smart Bidding

- PMax 离线规划至少要把 Campaign、Asset Group、assets、Final URL、URL expansion/URL controls、Search themes、Audience signals、brand exclusions、negative keywords 和电商 Listing Group 作为独立对象逐项判定。它们并非全部跨场景必填，也不能因为 Google 推荐就自动启用；按本次计划标为 `required_for_this_plan`、`conditional`、`not_applicable` 或 `unknown_needs_evidence`。
- 2026-09-13可读13721847与16669487：brand inclusions限Search，brand exclusions适用Search/PMax，PMax概述Search/Shopping。14505308当日Internal Error后停止；2026-09-04曾记录其Search/Shopping/YouTube search细化范围，保留为历史核验而不是本日完整枚举。不能由概述遗漏YouTube推断不支持，也不能据历史枚举确定当前全部范围；YouTube search不等于全部YouTube。
- 16669487（2026-09-13）支持允许Shopping ads继续针对排除品牌词展示，例外仅限Shopping，不扩到Search或其他流量；当前YouTube search细则因14505308访问失败保持待证。此事实不代表应启用、已经启用、账号资格或效果改善。
- Asset Group 应把同一需求、素材、Final URL 与商品集合放在可审查边界内。Search themes 和 Audience signals 是探索提示，不是严格关键词/受众限制。URL expansion、自动生成资产、品牌排除与否词控制要基于页面、品牌、合规和经营证据逐项选择；默认值与账户资格在使用日复核。
- PMax 渠道表现报告可提供 Campaign 级渠道/格式、转化、成本与诊断线索；报告中的归因贡献不能自动解释为增量或利润。
- 渠道报告当前可按 Channel、`Ads using product data`、`Ads using video`、Conversion category/action 与 Ad event type 等维度查看，并包含 Status/diagnostics 与时间序列。Channel 与 Format 不可混写；这些字段会变化，使用日复查。
- Smart Bidding 应围绕有价值的转化或转化价值；评估要考虑完整转化周期与报告延迟。
- 目标变化会快速影响出价，不等同于清空历史学习；重大变化后可出现一个或两个转化周期的波动。这里使用“转化周期”，不用固定天数。
- 2026-06 起部分 Smart Bidding 名称处于调整期，功能标签在真实界面中可能不同，执行前复核。
- Google 官方记录：针对处于 `Limited by budget` 且使用 target-based bid strategy 的受影响 Campaign，相关系统变化于 2026-08-17 开始全球 rollout，并于 2026-08-27 完成。涉及范围和实际影响必须按账户复查；Google 不会自动替广告主改 daily budget 或 bid target。时间重合只作为待核原因，不证明因果。

官方入口：

- https://support.google.com/google-ads/answer/10724492?hl=en
- https://support.google.com/google-ads/answer/16672776?hl=en
- https://support.google.com/google-ads/answer/16672777?hl=en
- https://support.google.com/google-ads/answer/13721847?hl=en
- https://support.google.com/google-ads/answer/16669487?hl=en
- https://support.google.com/google-ads/answer/14505308?hl=en
- https://support.google.com/google-ads/answer/14453047?hl=en
- https://support.google.com/google-ads/answer/16260130?hl=en
- https://support.google.com/google-ads/answer/10970825?hl=en
- https://support.google.com/google-ads/answer/14571185?hl=en
- https://support.google.com/google-ads/answer/17061251?hl=en
- https://support.google.com/google-ads/answer/17125145?hl=en

### Google Ads Experiments

- 2026-09-04既有10682377证据记录原Campaign/实验对象/split/生命周期；2026-09-13该页Internal Error后停止。公司仍要求原生实验名称有可识别对象与证据，普通前后比较不能冒充原生实验；这不是已重核所有当前类型、split或界面。当前配置依赖项无证据时NEEDS_RESEARCH。
- 实验计划要冻结原 Campaign 的关键条件，记录同步或其他同期改动带来的污染，并把平台指标与合格线索、成交、价值/利润等业务结果分开。最大损失、停止、结束处置和“是否应用”是不同决策。
- Experiment 创建、分流、结束、应用或回滚都是真实账户写入。离线方案只能声明对象与门禁；账户资格、当前界面、可用实验类型和 split 选项在使用日保持逐项核验，不能补猜。

官方入口：

- https://support.google.com/google-ads/answer/10682377?hl=en


## 本候选增量

原2026-09-06三页选段观察保持历史记录，不改首发/更新unknown。本候选沿用六个具名帮助页2026-09-11使用日例外及限定命题，详见[渠道专项](channel-choice-and-demand-gen.md#display-research-19)与[命题登记](source-register.json)的 current_alignment_433；不扩至其他来源或未证子句。未回查的旧记录不升为当日事实，高漂移规则使用日另核。此次只组装已有证据，网络额度0，不恢复停止URL。


## 官方限定刷新｜2026-09-13

官方当前适用正文可支持具名平台事实；首发unknown不再单独阻断，不再逐页申请日期例外。非官方来源仍须证明2024-08-01及之后发布。未读、冲突、访问停止、历史/版本/地区/资格限制及修改授权保持独立，不把页面存在等同所有命题获证。

本次仅14个具名目标，12个限定正文可读、14505308与10682377失败后停止，不是全页完整学习。已读官方命题与旧证据不互相代证。Search业务目标/主题结构、转化周期判断保持；不采用固定数量、等待天数、预算涨幅或效果保证。15130232只支持营销方式与处理/展示区别、数据源继承及Shopping需Campaign，不单独证明国家×语言×商品/账户资格组合。商品更细状态仍为旧日期证据/公司索证维度。10724492只支持素材组组合事实；同承诺/页面/商品一致是公司检查方法，有Merchant feed可启动与素材质量推荐须区分。16672776是控制主题总览，不证明具体算法、完整流量枚举或账号可用。

离线上传须区分成功响应、逐行结果、诊断与最终归因；示例规范化代码存在语言差异，本轮不采用、不运行，不扩展成生产代码审查。停止URL不重试或换入口；不依赖失败来源的离线判断可以继续，依赖其当前细则的结论保持待证。

2026-09-13 Owner新规：官方首发unknown不再单独阻断；非官方日期门不变。旧日期待批文字仅作历史，不自动放行未读/冲突命题。本轮只采用foundation14已证范围，不自动吸收其他研究，原访问停止和执行授权门继续。

## 2026-10-09｜视频融合的具名事实补核

本节仅核公开官方文字的下列命题；首发/更新日 UNKNOWN，核验日不冒充发布日期、账号资格或界面观察。未展开页面中的设置迁移、SFTP 或新上传实现。

- 10029210 的核对方法要求把按转化时间、按动作分段的报告与上传结果对应，而非把提交文件都视作成功；此处不采用页面排错措辞来允许人为挪动真实事件日期。
- 15081888 的时间段区分通常离线导入在关联最后点击后超过 90 天、增强型线索转化超过 63 天的拒收限制；这是该导入语境的上限，不是所有转化通用窗口或当前账户成功保证。业务周期、配置窗口、导入资格和报告延迟仍分别核验。
- 2497703 的展示份额分母为估计的合格展示机会。7103314 区分 Search 因预算与因排名损失的份额，其中预算损失为 Campaign 层指标；缺失值不证明没有损失。本节不新开 Hotel、Travel、Shopping 或 PMax 的份额方法。
- 9564897 与 16259414 的 RSA 相关文字于本日复核，继续支持 10/08 的共享展示、资产指标不可简单相加及单资产比率仅作方向线索。旧核验记录不改写。

官方定位：
- https://support.google.com/google-ads/answer/10029210?hl=en
- https://support.google.com/google-ads/answer/15081888?hl=en
- https://support.google.com/google-ads/answer/2497703?hl=en
- https://support.google.com/google-ads/answer/7103314
- https://support.google.com/google-ads/answer/9564897?hl=en
- https://support.google.com/google-ads/answer/16259414?hl=en
