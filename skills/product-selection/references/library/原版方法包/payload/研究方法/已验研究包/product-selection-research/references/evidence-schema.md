# 候选证据包字段

每个候选至少建立一行证据摘要和一张决策卡。

## 身份与范围

- `candidate_id`
- `candidate_name`
- `product_direction_not_final_sku`
- `target_market`
- `platform`
- `business_model`
- `portfolio_role`: 核心/流量、利润、复购、创新、矩阵补位或其他明确角色
- `decision_owner`
- `observed_at`
- `decision_due_at`

## 证据记录

每条证据包含：

- `evidence_id`
- `claim_supported`
- `evidence_type`: `official_fact` / `first_party_observation` / `observed_market_evidence` / `tool_estimate` / `ai_extraction` / `analyst_inference` / `source_opinion` / `case_evidence` / `method_hypothesis` / `unknown`
- `source_name`
- `source_url_or_internal_path`
- `published_at` / `observed_at`：发布日期和观察日分列，不互相替代
- `publication_admission`：`admitted_with_proof` / `not_admitted_unknown_publication_date` / `out_of_window` / `N/A`
- `observation_depth`：实际观察范围及历史指针，不等于日期准入
- `claim_adoption` / `claim_maturity` / `independent_basis`：当前用途、成熟度及独立依据，按 `claim-admission-and-maturity.md`
- `verified_at`
- `market_and_scope`
- `metric_definition`
- `time_window`
- `sample_size_or_coverage`
- `value_or_observation`
- `limitations`
- `conflict_status`
- `confidence`: `high` / `medium` / `low`
- `original_record_id_or_quote`: 关键 AI 抽取、评论/VOC 和工具估算用于回接原始记录
- `human_verification_status`: `not_checked` / `sample_checked` / `fully_checked_for_critical_claim`
- `journey_stage`: `pre_purchase` / `purchase` / `unboxing` / `usage` / `maintenance` / `return` / `service` / `unknown`
- `codebook_version`: 可选研究标签本；无通用效度，未使用时 `N/A`
- `interpretation_and_alternatives` / `interpreter` / `next_minimum_evidence`：有限原文解释、争议、解释者及下一证据
- `deduplication_and_exclusion_rule`
- `severity`: `safety_critical` / `high` / `medium` / `low` / `unknown`
- `privacy_and_access_basis`: 数据访问权、用途、最小化与保留边界

## 候选汇总字段

Google Trends 证据额外保存 `query_expression`、`term_or_topic`、`quoted_phrase`、`topic_label_and_id_if_available`、`geo`、`start/end`、`category`、`search_type`、`comparison_group`、`retrieved_at` 与 `published_at`（无发布日期为 unknown）。未实际查询的参数为 unknown，不从帮助页推定实际结果。

现金证据额外保存 `currency`、`scenario`、`event_date_and_order`、`event_id`、`B_open`、`I_net_bank_received`、`actual_or_forecast_and_basis`、`F_committed_authorized`、`O_not_netted_in_I`、`B_close`、`H_minimum_balance`、`gap`、`fee_refund_reserve_treatment`、`reconciliation_status`。另存 F=0 基线、首次缺口日及最差缺口；毛净未核对不填可用净款，成本覆盖不足不填完整利润。

- 需求：强度、趋势、季节性、地域、场景、信号一致性
- 竞争：有效供给、集中度、进入速度、价格带、替代品、价格战风险
- 容量与入口：估计可行性、可比/校准依据，不足则容量 unknown；首个入口/why_win 为待验证假设
- 竞争时钟：总提前期、新品进入/复制速度、价格/CPC 变化、季节剩余窗口
- VOC：用户、任务、场景、期望、痛点、退货根因、样本限制
- VOC 质量：来源阶段、有限原文/上下文、解释者、争议、排除/去重、高严重度复核、隐私；标签本/校准可选，不默认 AI 批量
- 产品：待验证的任务/属性问题、性能/接受度/规格证据；功能分层可选，缺证不定稿
- 替代方案：同任务证据、当前方案根因、替代接受度、性能等价、兼容/安全/IP
- 合规/IP：平台准入、法规、认证、安全、运输、商标/专利/版权
- 经济：价格、全部成本、贡献利润、盈亏平衡、三情景、现金占用
- 供应链：MOQ、报价、交期与波动、不同月份产能、上游材料、物流时效分布、备选、质检、包装、售后
- 验证：假设、方法、样本、预算、周期、成功/失败判据、停止线
- 现金时点：采购/生产付款、头程、入仓、平台结算与预留、供应商账期、现金缓冲、最差缺口日期

## 数据质量等级

- `A`：当前官方事实或可复核第一方业务数据，字段/口径完整。
- `B`：可回接的原始市场/用户证据，限制明确，可支持条件性判断。
- `C`：第三方估算或案例，有方法说明但样本/口径有限，只支持假设。
- `D`：无日期、无口径、收益截图、单一爆款、推广话术或 AI 无引用结论，不支持推进。

等级只描述该条证据，不是成熟度或准入自动评分。日期未知课程为登记层，不因历史 full、原文可回接或人工复核升为 A/B；课程采纳资格与观察状态始终分列。官方定义不证明经营效果，第一方记录也可能有偏差。

硬门禁不得由 C/D 级证据通过；A/B 也只在其实际覆盖范围内支持判断，不能因评级直接给容量、胜因、根因或规格。人工解释、置信度和模型一致率均不触发自动晋级。

多个 AI 对同一输入的相似答案仍是同一层级的 `ai_extraction` 或 `method_hypothesis`，不能互相升级为 A/B 级证据。
