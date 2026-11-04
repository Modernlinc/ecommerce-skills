# Search完整示例｜既有成品适配，非本轮新调用

全部为原创合成，无真实平台动作。历史内部样例的输入与结果保留，过程台账不分发；历史源ID可在[命题登记](../references/source-register.json)解析。原页未本轮重核。

## A. 自足合成输入

任务：为虚构服务商 RoomReady Assembly 审阅一份 Search 准备资料，完成可供负责人审查的计划和两组广告草稿；不要登录、联网、创建广告或安排花费。

### A1. 业务与权限事实（SYN-A01，案例版本1）

- 市场：美国 Seattle 市内；语言 English；币种 USD；报告时区 America/Los_Angeles。
- 服务：客户已购买、放在现场的平板包装书桌和办公椅组装。只做这两类普通家具；不销售家具、不修椅子、不做搬家、墙面安装、电气或结构工程。
- 报价：客户可以免费询问估价；实际组装为收费服务。预约时间须确认，无当天服务、最低价、固定价格或结果保证。
- 目标：收到服务区域和家具类型均符合的组装询价，之后由销售核对、报价和确认预约；询价不等于已付款订单。
- 案例业务负责人提出的最大测试损失上限为 USD 300。这只是合成经营护栏，不是实际支出授权，不决定日预算或可接受 CPA。
- 服务变动成本、成交率、订单金额、历史花费、转化周期、每日预算、竞价策略/target、真实账户资格均 UNKNOWN。
- 本次允许动作：读本输入、做本地报告与草稿。案例角色 BO-1 为业务审核人，MO-1 为测量负责人，CO-1 为广告执行负责人；这些只是职责代号，不是已收到授权或已发送消息的真人。

### A2. 页面事实（SYN-A02，案例时间2026-09-05 09:00，America/Los_Angeles）

|页面|输入中已有标题、正文与CTA|支持及限制|
|---|---|---|
|LP-D `https://roomready.example/services/desk-assembly`|H1: Desk Assembly in Seattle。正文：We assemble customer-owned flat-pack desks in Seattle. Tell us your desk model and preferred appointment time. Estimates are free; assembly is a paid service. Appointments require confirmation. CTA: Request an Estimate.|支持书桌、Seattle、客户自备、免费询价、预约需确认；不支持维修/免费组装/当天必到|
|LP-C `https://roomready.example/services/office-chair-assembly`|H1: Office Chair Assembly in Seattle。正文：We assemble customer-owned office chairs in Seattle. Share the chair model to request an estimate. We do not repair chairs or sell replacement parts. Appointments require confirmation. CTA: Request an Estimate.|支持办公椅组装、不维修、询价；免费询价由同页补充说明与 SYN-A01 一致（案例给定），不承诺免费服务|

两页表单均询问家具型号、服务地区、期望时间；是否实际正常提交、隐私告知、客户资料处理和移动端体验没有证据。文案权利：本文原创合成文字；没有商标/图片/真实客户评价授权，不用它们制作广告素材。

### A3. 查询主题卡（SYN-A03）

下列是业务团队提供的合成需求词，不是已导出的 Search terms、搜索量或真实表现。

|ID|查询示意|输入主题|
|---|---|---|
|Q-D1|desk assembly service seattle|书桌组装询价|
|Q-D2|flat pack desk assembler seattle|书桌组装询价|
|Q-D3|free desk assembly instructions|自助教程|
|Q-D4|desk assembly jobs seattle|求职|
|Q-C1|office chair assembly seattle|办公椅组装询价|
|Q-C2|office chair assembler near me|办公椅组装，地区需核|
|Q-C3|office chair repair seattle|椅子维修|
|Q-C4|free estimate for office chair assembly|免费询价，仍可能付费组装|

### A4. Action/Goal 准备摘要（SYN-A04）

以下是题面给定的合成摘要，不是现场账户导出。拟建 Campaign 尚无平台 ID。

|Action代号|事件/来源|摘要标签|所属Goal信息|本拟建Campaign采用|Count/去重/价值|
|---|---|---|---|---|---|
|AC-PAGE|page_view / GA4 导入|Primary|G-PAGE|UNKNOWN|全部 UNKNOWN|
|AC-FORM|estimate_form_submit / Web tag|Primary|G-LEAD|UNKNOWN|全部 UNKNOWN|
|AC-CALL|call_button_click / Web tag|Secondary|普通Goal归属、是否在custom goal中均UNKNOWN|UNKNOWN|全部 UNKNOWN|
|业务状态 QUALIFIED_REQUEST|人工核对地区与家具类型后，确认可服务的询价|尚未映射为已知平台Action|UNKNOWN|UNKNOWN|资格计数规则和记录方法 UNKNOWN|

未提供真实 Campaign goal 采用、同一事件是否重复导入、表单成功测试、归因窗口/延迟、合规同意或业务对账。没有证据证明当前账户设置错误，也没有证据证明它已就绪。

## C. 实际业务答复

### C1. 结论与业务结果审阅

**报告状态：NEEDS_RESEARCH。** 两组普通 Search 文案与离线结构已完成，但没有证据证明优化目标和计数可用于投放决策；最先补的是 Action—Goal—拟用 Campaign 的采用与测量合同，不是调预算。此状态不表示平台已有错误；未来可选发布不参与当前纯离线报告的状态汇总。

最少需要保住的结果链为：询价提交→地区/家具匹配→可服务询价→报价→确认预约→完成服务→实际贡献。当前只有前端事件摘要，没有完整业务或价值证据，不能把 page_view、点击电话或表单提交称成交。

|对象|主状态|观察与判断|下一证据|
|---|---|---|---|
|AC-PAGE 的竞价用途|UNKNOWN|Primary 已给定，但未观察Goal被采用，不能断言正在优化浏览量|G-PAGE 对拟用Campaign的采用计划与审核依据|
|AC-FORM 的优化与计数|NEEDS_RESEARCH|事件意图更接近询价；Count/去重/实际成功触发与Goal采用缺失，不能称有效询价或直接选为最终优化目标|MO-1提供Action/Goal矩阵、受控测试摘要与重复计数说明|
|AC-CALL 的用途|UNKNOWN|点击不证明接通或合格；Secondary标签不足以排除custom goal条件|普通/custom goal归属、采用关系、电话业务判定摘要|
|QUALIFIED_REQUEST映射|NEEDS_RESEARCH|业务想优化的结果已有定义雏形，但没有已观察平台映射|BO-1确认合格定义，MO-1列合法可行映射路线；不得上传真实线索|
|两组离线广告对象|DRAFT|按给定合法事实完成可审文案、页面与结构；账户创建/格式资格未知|本地审核文案证据；实施前再核账户/政策/格式|

不立即删除 AC-PAGE、不合并 AC-FORM 与 GA4、不把两个 Primary 相加；没有重复记录就不声称重复转化。真实日预算、CPA、ROAS、竞价策略、目标值和开始时间均留 UNKNOWN。USD 300 不拆成任意日预算，也不构成花费批准。

### C2. 查询意图、结构与页面配对

拟用一个非品牌 Search Campaign：同一市场、语言、业务目标和预算责任；按两种无法共用全部具体文案/页面的服务分两组。这是本例取舍，不是“一律两组”或关键词逐个拆分规则。

|Ad Group|候选需求与匹配草案|广告承诺/页面|保留的未知|
|---|---|---|---|
|DRAFT-AG-DESK|[desk assembly service seattle]；"flat pack desk assembly"|客户自备书桌组装→LP-D；免费的是估价，不是组装|没有搜索量/查询报告；匹配只是待审核候选，不是最佳策略|
|DRAFT-AG-CHAIR|[office chair assembly seattle]；"office chair assembly"|客户自备办公椅组装→LP-C；不维修|near me仅意图线索，实际地域设置/选项未核，不能放宽至全美|

Q-D3 不适合付费组装主链，Q-D4 是求职；Q-C3 是明确不提供的维修；Q-C4 是可能合格的商业询价，不能因为 free 一词误挡。品牌需求未提供，当前不另建品牌 Campaign，也不声称非品牌一定是增量。

### C3. 完整广告文案与页面检查

下列每组6个标题、4个描述为一份可审 Search 响应式文案候选。格式与字符长度仅做本地检查，不能称当日平台规格/审核通过；不固定任何 pinning，不使用动态替换、评价、价格或许可声明。每个描述可独立阅读，不依赖展示全部文案才成立。

|稿件|标题候选|
|---|---|
|AD-DESK|Desk Assembly in Seattle / Flat-Pack Desk Assembly / Bring Your Own Desk / Request a Free Estimate / Book After Confirmation / RoomReady Assembly|
|AD-CHAIR|Office Chair Assembly / Chair Assembly in Seattle / You Supply the Chair / Request a Free Estimate / Appointments Confirmed / RoomReady Assembly|

|稿件|描述候选（实际可用文字）|
|---|---|
|AD-DESK D1|Need a flat-pack desk assembled? Share the model and your Seattle location.|
|AD-DESK D2|You supply the desk. We provide assembly. Request a free estimate before booking.|
|AD-DESK D3|Paid assembly for customer-owned desks. Appointment times require confirmation.|
|AD-DESK D4|Tell us your preferred time. Review your estimate before confirming an appointment.|
|AD-CHAIR D1|Office chair assembly in Seattle. Share your chair model to request an estimate.|
|AD-CHAIR D2|You supply the office chair. We assemble it. No chair repair or replacement parts.|
|AD-CHAIR D3|Request a free estimate for paid chair assembly. Appointments need confirmation.|
|AD-CHAIR D4|Tell us your Seattle location and preferred time. We will confirm availability.|

承诺核对：Seattle/具体服务/客户自备分别回接 SYN-A01、LP-D/LP-C；免费估价回接 A1和A2，不能独立写 Free Assembly；预约确认回接两页。AD-CHAIR D4 的“确认可用时间”是预约确认流程，不是保证可预约。未加入当天到达、价格、最便宜、星级/评论、资质或效果承诺。

页面检查的实际结果：题面两页文字可承接对应广告和CTA；未观察表单动作、移动端与隐私告知，不称页面技术/合规已通过。所有文案只能保持离线草稿，真实上线前由 BO-1/CO-1核实商家事实和市场要求。

### C4. 否词预演与不误挡条件

以下建议是本地候选，非已经添加的账户否词。只提在本服务 Campaign 范围内，不用账户级全局列表。

|候选/拟层级|应挡查询|不得挡查询|依据、风险、恢复|
|---|---|---|---|
|否定词组 "assembly jobs"；Campaign|desk assembly jobs seattle|desk assembly service seattle|求职非客户；不推单复数/同义词自动覆盖；业务若招工需另审范围。发现误挡先撤销该条，不删全列表|
|否定词组 "assembly instructions"；Campaign|free desk assembly instructions|free estimate for desk assembly|教程≠本服务；组合意图可能含商业需求，先核有限证据，不无限扩到 assembly/free。误挡回滚该条|
|否定词组 "chair repair"；Chair Ad Group|office chair repair seattle|office chair assembly seattle|业务不维修；不得扩成单词 chair。服务边界改变时复审并定向撤回|

反例明确拒绝：单词 free 的泛化否定会威胁 Q-C4 这类免费询价商业需求，因此本例不采用；单词 chair 会误伤整个椅子组装组。每条都须由 BO-1确认业务边界、CO-1在另获实际授权及当日核验后应用；本轮没有这些动作。真实搜索词缺失，以上仅支持合成预演，不支持查询覆盖率、节费或成交改善。

### C5. 未创建的声明式 PAUSED 草稿

这不是 Google Ads API 请求，不能上传运行。local_id 只是文档内代号；platform_id=null 表示未提供任何平台对象存在证据。引用的文案全部在 C3 内已写出，不是待生成空位。

```json
{
  "artifact_type": "offline_search_plan_and_declarative_draft",
  "object_status": "DRAFT",
  "synthetic": true,
  "created_in_google_ads": false,
  "campaign": {
    "local_id": "DRAFT-CAMPAIGN-SEATTLE-ASSEMBLY",
    "platform_id": null,
    "name": "Seattle | Furniture Assembly | Nonbrand | Draft",
    "type": "SEARCH",
    "desired_initial_status": "PAUSED",
    "market_intent": "Seattle city only",
    "language_intent": "English",
    "currency": "USD",
    "report_timezone": "America/Los_Angeles",
    "location_option_and_network_settings": "UNKNOWN",
    "business_result": "service-qualified assembly estimate request",
    "selected_goal_id": null,
    "selected_goal_status": "UNKNOWN",
    "bid_strategy": null,
    "bid_target": null,
    "daily_budget": null,
    "start_at": null,
    "synthetic_maximum_test_loss_usd": 300,
    "actual_spend_authorized": false,
    "ad_groups": [
      {
        "local_id": "DRAFT-AG-DESK",
        "platform_id": null,
        "desired_initial_status": "PAUSED",
        "intent": "paid desk assembly",
        "keyword_candidates": [
          {"text": "desk assembly service seattle", "match_candidate": "EXACT"},
          {"text": "flat pack desk assembly", "match_candidate": "PHRASE"}
        ],
        "ad": {"local_id": "AD-DESK", "platform_id": null, "desired_initial_status": "PAUSED", "copy_reference": "C3: AD-DESK titles and D1-D4", "final_url": "https://roomready.example/services/desk-assembly"}
      },
      {
        "local_id": "DRAFT-AG-CHAIR",
        "platform_id": null,
        "desired_initial_status": "PAUSED",
        "intent": "paid office chair assembly",
        "keyword_candidates": [
          {"text": "office chair assembly seattle", "match_candidate": "EXACT"},
          {"text": "office chair assembly", "match_candidate": "PHRASE"}
        ],
        "ad": {"local_id": "AD-CHAIR", "platform_id": null, "desired_initial_status": "PAUSED", "copy_reference": "C3: AD-CHAIR titles and D1-D4", "final_url": "https://roomready.example/services/office-chair-assembly"}
      }
    ],
    "negative_keyword_candidates_reference": "C4: three scoped candidates; none applied"
  },
  "implementation_gate": "No upload/create/enable until separate exact authorization, current eligibility and business/measurement evidence are resolved."
}
```

### C6. 一个优先动作、最小委托与检查点

**优先动作 A-P1：在离线文档中闭合优化目标与计数证据，不做账户变更。** 负责人 MO-1，业务定义由 BO-1确认，CO-1只在后续获授权时负责平台回读。

委托草稿（未发给任何外部人员）：请提供 AC-PAGE/AC-FORM/AC-CALL 的 Action代号、业务定义、来源、Primary/Secondary、普通/custom Goal归属、拟采用关系、Count、价值/币种、事件时间口径与延迟，以及一份不含客户标识的表单测试/重复计数摘要。仅需当前配置快照和最近一个已知完整业务周期的聚合对账；周期长度未知时先给配置和周期定义，不擅定7/30天。

排除姓名、邮箱、电话、完整点击标识、客户/CRM明细与自由文本；需要私有测试时由原授权负责人在其受控环境做，本任务只收聚合计数/重复标记/方法说明。没有授权就不取；本合成案例不实际索取。

成功证据：每个业务事件能回接到明确的Action/Goal采用计划；Count/去重/值/时间有定义，表单成功与资格核对分层；不能解释的差异逐项保留 UNKNOWN。观察窗口以经确认的完整周期和回读延迟为准，未确认前不判转化表现。

保持不变：无账户登录、无广告/关键词/否词/Goal变更、无花费和预算调整，页面与素材不发布，不扩Merchant/PMax。停止线：为闭合证据需要真实账号/客户数据/上传、或发现无法合法处理时停止该动作；能继续的离线文案不被连带作废。

回滚：本轮只可退回本文前一草稿版本、撤回未采用的文案/否词提案，无平台回滚可声称。未来真实动作需先另定精确对象、原状态备份、损失上限批准、回读和撤销责任，不能沿用本轮合成授权。

下一次审核：先由 MO-1/BO-1读回证据缺口是否闭合，再由 CO-1审查本两组草稿；未取到数据时保持 NEEDS_RESEARCH，不宣布最佳策略、真实创建、投放或收入结果。

## 同一输入上的文案表达候选（非效果结论）

复用 A1/A2 的 Seattle、客户自有书桌、收费组装与免费估价事实，以及 A3 的业务需求主题；这些主题不是实际搜索词导出。对本地 AD-DESK 的标题 3，可审候选为 `Bring Your Own Desk` → `We Assemble Your Desk`（19→21 个 ASCII 字符）。它旨在更清楚表达组装服务，尚无数据证明更好，也没有判旧文案违规或失败。旧 C3 仍是原稿，本段只是另一个未采用的编辑建议。

原优先动作仍是补 Action—Goal—Campaign 与业务计数证据；这不妨碍交有事实支持的草稿。不改其他标题/描述、chair 稿、URL、匹配/否词、Goal、竞价或预算；不加价格、评价或保证。若要判断效果，需另有可信结果与可比周期证据。当前输入没有资产数值，本段不验证资产聚合或单标题效果判断；见[Search 改稿条件](../references/workflow-and-templates.md)与[日期化事实](../references/current-platform-gates.md)。
