# 业务指标与单位经济

本文件是最终 Skill 的经营数值合同。只对同一事件、同一 cohort、同一窗口、同一币种且分母可核的离线材料计算；缺少关键输入或分母为 0 时输出 `UNKNOWN`，不得补默认值。

## 1. 指标合同

每个输入保存：

```text
metric / numerator / denominator / event
source / cohort / date_range / timezone / currency
attribution_context / dedup_key / maturity / version
cost_pool / included_costs / excluded_costs / net_settlement_bridge
new_customer_cohort_allocation / allocation_evidence
```

- `impressions`：同窗实际展示数。
- `link_clicks`：同窗、同定义的链接点击；不得与全部点击混用。
- `deduped_paid_orders`：已付款且稳定订单键去重的订单；不得用平台 Purchase 直接代替。
- `deduped_new_paid_customers`：同一 acquisition cohort 内去重的新付款顾客；不得与订单数混用。
- `ad_spend`：同窗、同币种的实际广告花费。

报表汇总防错（MC-P01公司规则补充，待独立复检）：汇总前用现有证据说明目标对象、层级与范围、纳入/排除行及不重叠依据；父汇总与其已含子行择一，同层切片也须核重叠。只对同口径且具有可加性的分子/分母计数或金额，在覆盖明确且互不重叠的集合内求和；子集不完整只标该子集，不冒充父级或全账户总量，不能靠数值碰巧相等证明完整。比例由合格汇总分子/分母重算，不直接相加或无权重平均；去重人数等非可加指标须有相应去重依据。覆盖/重叠未知仅停止受影响汇总，保留有据单行指标和文案；证据可从已有材料提取，不新增用户必填表或14字段。

## 2. CPM、CTR、完成率与订单 CPA

当分母大于 0 时：

```text
CPM = ad_spend / impressions × 1000
link_CTR = link_clicks / impressions
click_to_paid_order_rate = deduped_paid_orders / link_clicks
paid_order_CPA = ad_spend / deduped_paid_orders
paid_order_CPA = CPM / (1000 × link_CTR × click_to_paid_order_rate)
```

后两条 CPA 必须在同一事件、cohort、窗口、币种和成熟条件下交叉验算。百分数按除100转为比例：1%=0.01、2%=0.02、120%=1.2，不作统一0–1截断。这里的 `click_to_paid_order_rate` 是订单次数/链接点击次数比，不是去重人群成交概率；允许一点击对应多订单的同口径数据中，10点击/12订单的次数比为1.2，不得硬夹为1。CTR须按其实际计数定义与可比分母核对，不能据此泛称所有CTR可任意超过1。偏大比例先复核计数、去重、归属及成熟，不能自动视为效果好。来源中省略1000或不说明单位的表达只标 `source_experience / formula_correction_required`。

虚构复算：

- impressions = 100,000
- CPM = 10 USD
- link_CTR = 1% = 0.01
- click_to_paid_order_rate = 2% = 0.02
- ad_spend = 1,000 USD
- link_clicks = 1,000
- deduped_paid_orders = 20
- 两种算法都得到 paid_order_CPA = 50 USD

任何一条不一致，先检查事件定义、窗口、去重、币种、数据成熟和单位；不得用结果倒推“素材疲劳”或“受众问题”。

## 3. 订单 CPA 与新客 CAC

```text
paid_order_CPA = ad_spend / deduped_paid_orders
new_customer_CAC = acquisition_spend / deduped_new_paid_customers
```

一个顾客可能有多个订单，所以订单 CPA 不自动等于新客 CAC。`new_customer_CAC` 仅是带显式 `cost_pool` 的别名：广告池的 `acquisition_spend=A`，声明池的 `acquisition_spend=A+O`；禁止无标签比较。只有成本池、来源、归属边界和新客识别可信时才计算相关 CAC；缺失字段对应结果为 `UNKNOWN`。输入是假设且完整时另标 `scenario_not_prediction`，该标签不能替代缺失输入。

新客成本合同（各金额同币种、同观察窗且可归属同一新付款顾客 cohort）：

- `R`：该新客 cohort 已实现且成熟的净收入，费用桥接后位于 V/O/A 扣除之前。
- `V`：不含获客成本池的可归属变动成本。
- `A`：可归属广告获客成本，不自动等于整个账户的广告费。
- `O`：明确声明、可归属的其他获客成本池；列用途、期间、包含/排除项、分摊依据和覆盖是否完整。制作、服务或销售费用按实际合同分类，不能一律加入或漏掉。
- `N`：该 cohort 的去重新付款顾客数。订单数、平台 Purchase 数不能替代 N。

`V` 与 `O` 不重叠；每笔费用只归入一个池。在同一分类合同下 `variable_non_ad_cost=V+O`，不能让 O 留在 V 又扣一次。不凭空分摊固定成本；未证明覆盖约定全部费用时，仅称“声明池 CAC”，不称全成本 CAC 或公司净利润。

混合新老客的收入、成本或广告获客费未拆清，相关新客指标为 `UNKNOWN`，不可按人数或订单占比自动硬摊。期前老客利润、未来 LTV、未成熟复购不能撑高新客阈值；同一新客 cohort 在声明观察窗内确已实现且成熟的后续订单，可以按明确合同纳入。普通合并订单贡献可继续单列，但不能转换为新客盈亏线。

## 4. 收入、退款与贡献

先声明总账是否已经净额化，确保每项只计一次：

```text
net_collected_revenue
= gross_collected_revenue
- refunds_not_already_net_settled
- chargebacks_not_already_net_settled
- taxes_collected_for_remittance_not_already_excluded

variable_non_ad_cost
= COGS_for_recognized_orders
+ variable_fulfillment
+ shipping_subsidy
+ payment_processing
+ taxes_borne_by_business
+ variable_support
+ returns_and_refund_handling
+ other_declared_variable_costs

pre_ad_contribution = net_collected_revenue - variable_non_ad_cost
after_ad_contribution = pre_ad_contribution - ad_spend
```

若结算收入已经扣除退款、拒付、税或支付费，对应项目不得再次扣减。退回商品是否恢复库存、COGS 是否可回收必须单列；未知就保持 `UNKNOWN`。

净额桥接：上面的合并贡献可从净结算余额扣尚未扣除的成本；每笔已扣费用仍须登记金额和所属成本池。要比较新客 CAC/阈值时，先把已在结算中扣除的 V/O/A 费用加回到同一收入基准 R，再分别归入 V/O/A 扣一次；退款、拒付和代收代缴税保持净收入扣减项，不因此加回。无法区分已扣项目时，依赖桥接的新客阈值为 `UNKNOWN`。不得以“已扣过”为由漏掉 O/A 的成本池含义。

桥接例（虚构且均归属同一新客 cohort）：经营净收入 10,000，结算先扣其他获客费 O=600，到账 9,400；非获客变动成本 V=4,000、广告 A=5,100 尚未扣。净额路径 9,400−4,000−5,100=300；分池路径先还原 R=9,400+600=10,000，再算 10,000−4,000−600−5,100=300。不能把600既留在V又减O，也不能漏报声明池中的600。

虚构 cohort 复算：

- gross_collected_revenue = 1,000
- refunds_not_already_net_settled = 100
- chargebacks_not_already_net_settled = 0
- taxes_collected_for_remittance_not_already_excluded = 0
- variable_non_ad_cost = 500
- ad_spend = 250
- net_collected_revenue = 900
- pre_ad_contribution = 400
- after_ad_contribution = 150

这是公式测试，不是对任何真实项目的预测或业绩证明。

## 5. Break-even CAC、最大花费与最大损失

对符合第3节归属和第4节桥接合同的 R/V/O/A/N，且 N>0：

```text
pre_acquisition_contribution = R - V
pre_ad_contribution = R - V - O
after_acquisition_contribution = R - V - O - A
ad_only_new_customer_CAC = A / N
ad_only_break_even_CAC = (R - V - O) / N
declared_pool_new_customer_CAC = (A + O) / N
declared_pool_break_even_CAC = (R - V) / N
```

广告 CAC 只与广告盈亏线比较；声明池 CAC 只与同一声明池盈亏线比较。禁止输出无成本池标签的 `break_even_CAC_scenario`。本新客合同下，`after_ad_contribution` 与 `after_acquisition_contribution` 同为 R−V−O−A，但合并新老客贡献不能冒用此新客归属。

虚构反例复算：R=10,000、V=4,000、O=600、A=5,100、N=60，广告 CAC=85 对广告线90，声明池 CAC=95 对声明池线100，两路剩余贡献均为300。把95与90混比会误判。另有合并新老客贡献500、8名新客时，500/8=62.5仅是混合比值；新客贡献未拆清，不能称新客盈亏线。

缺证按字段处理：O未知不能当0，O=0需输入明确确认；此时已确认 A/N 仍可算，但 (A+O)/N、(R−V−O)/N 和 R−V−O−A 为 `UNKNOWN`。只有R/V/N归属完整且已证明V不夹含O时，独立的 (R−V)/N 可算，仍不能据此补造未知声明池CAC或进行比较。N为0阻断CAC/每客阈值，不阻断有完整输入的总贡献。正贡献或低于阈值不证明因果、未来结果或预算权限。

- `authorized_spend_cap`：有权业务审批人对精确账户、对象、金额和期限批准的外部花费上限；审批权须有真实可定位依据，未知则为UNKNOWN，角色与上级门禁见[权限](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__permissions-and-live-gates.md)。任何公式都不能生成授权。
- `modeled_spend_cap`：基于显式情景输入得出的离线候选；必须标 `scenario_not_prediction`。
- `maximum_test_loss`：公司愿意承担的 after-ad contribution 最差负值幅度，并非花费金额。
- `actual_spend`：平台实际花费；不能直接当损失，因为仍需订单、退款和成本对账。

四者必须分栏。modeled_spend_cap为正或离线复算完成都不产生花费授权。纯离线复算/情景按自身证据给出结果与状态，live_action_authorized保持false；只有请求进入具体真实支出、预算变更或其他外部动作时，该动作才标`HUMAN_GATE_REQUIRED`并停止。未授权不抹掉已经有据的离线结果，任何个人批准也不能让本L0包自行执行真实动作。

## 6. 结果状态

- 公式输入完整、同窗、同币种、已去重且成熟：可以输出计算结果，并标 `scenario_not_prediction` 或 `reconciled_offline`。
- 分母为 0、事件冲突、窗口不可比、币种不一或成本缺失：依赖缺项的结果为 `UNKNOWN`；完整且独立的其他指标可单列计算，不能用默认0补齐。
- 平台与订单总账不一致：`NEEDS_RESEARCH`。
- 已证明值/币种/重复事件错误：`NEEDS_FIX`。
- 需要真实账户回读、预算写入或客户数据：`HUMAN_GATE_REQUIRED`。

每次同时输出输入、公式、单位、结果、缺失项、敏感性、不可下的结论、最大损失、停止和回滚。
