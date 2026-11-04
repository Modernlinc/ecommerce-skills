# 课程蒸馏运营剧本

本文件将内容工厂现有 54 张 Meta 方法卡压缩成按任务调用的九组运营剧本。方法编号只用于追溯；执行时以本文件的条件、动作、核验、停止和权限门为准。

## 0. 通用决定卡

所有场景先填写：

```text
decision / owner / approver / market / date / expiry
business_goal / primary_outcome / guardrail
product_variant / offer_version / page_version / fulfillment_version
evidence / unknown / competing_explanation / falsifier
planned_change / actual_delivery / maturity / maximum_loss
stop / rollback / live_action_authorized
```

缺少对象、证据、负责人、损失边界或停止条件时保持 `DRAFT` 或 `UNKNOWN`。

## 1. 主体、资产、权限与恢复

适用于 Business Portfolio/Manager、Page、Ad Account、Pixel/Dataset、支付方、服务商接入、账户限制和客户交接。对应方法族：001–005、008–009、011、018–019、025、029、035、043。

1. 画出真实主体、每项资产 owner、付款责任、恢复 owner、最小角色、期限、撤权和交接证据。
2. 把查看、分析、配置、上传、发布、启停、预算、付款和删除分成独立授权。
3. 账户异常按通知、资产、时间、最近变更、官方工单和实际交付建事故链；效果下降但无平台明示限制时走正常诊断。
4. 外包和客户协作使用独立身份与最小权限；共享密码/2FA/Cookie/Token、借用/购买主体、内部人士解封和换账户规避直接停止。
5. 输出 `asset_owner_map / permission_matrix / recovery_owner / approval_receipt / revoke_and_handoff / safe_stop`。

## 2. 商品、Offer、页面、结账与履约真相

适用于商品验证、价格/促销、销售页、Advertorial、购物车、Order Bump/Upsell、订阅、库存和多国扩展。对应方法族：005、010–013、018、020–021、027–031、035–036、043、045–047、052–053。

1. 冻结商品/变体、价格与历史价格、库存、承诺、证据、限制、页面、结账、付款、交付、退款和支持版本。
2. 广告、页面、结账、邮件、客服和仓库必须引用同一 Offer 版本；结账不得新增主张或隐藏费用。
3. 平台事件、页面到达和重复 Purchase 不等于付款；用稳定订单键对账 paid/fulfilled/refunded/disputed。
4. 完整经济至少包含商品、物流、税费、支付、退款/拒付、客服、赠品、工具和现金回收；`收入-广告费` 不得称利润。具体公式与去重口径读取 [业务指标与单位经济](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__business-math-and-unit-economics.md)。
5. 库存、支付、客服、配送、退换或伤害触发容量红线时停止扩量或回滚。
6. 输出 `product_truth_pack / offer_version_contract / page_checkout_delivery_continuity / order_reconciliation / contribution_scenario / capacity_stop`。

## 3. 研究、任务型分群、认知与主张证据

适用于评论/论坛/广告库/竞品研究、顾客语言、Persona、Awareness、Sophistication、欲望、钩子、机制和比较。对应方法族：007、014、017、020–024、026–034、038–042、044–045、050、054。

1. 一次研究只回答一个决定；原始摘记与分析层分开，保存 source/date/context/rights/representativeness/counterexample/allowed_use。
2. 搜索排序、广告活跃、点赞、评论和工具估值只生成候选；频次先去同源，不投票推出市场、病因、动机、销量或利润。
3. 分群优先使用自愿陈述、当前任务、可观察事件和下一步需要；年龄、性别、疾病、收入、婚姻、人格和心理状态不得从点击、浏览或模板推断。
4. 将主张写成 `claim → evidence → population/context → qualification → counterexample → expiry`；无证据的健康、收益、身份或典型结果停止。
5. 竞品比较限定同任务、规格、周期与证据等级，保留不可比项；第三方只抽象任务、阻碍、机制、证明和 CTA，另写原创表达。
6. 输出 `research_decision_contract / immutable_source_ledger / task_segment_hypotheses / claim_ledger / fair_comparison / falsifier / rights_safe_idea_backlog`。

### 从广告表达与反馈任务形成一项创意候选

仅在已取得有权研究的广告材料与反馈材料时，分别记录广告实际表达的任务/承诺/证明，以及反馈明说的任务/阻碍/问题；两侧各保留来源、日期、样本范围、去重与反例，不把广告表达当实际触达人群，不把评论当全部买家或默认验证购买。AI归纳必须回到原句和语境；情绪强烈、出现频繁或广告在投较久均不直接证明需求规模、转化或利润。

逐任务标记“已回应、可能未回应、无法比较”。可能缺口只生成假设，先排除商品事实、权利、敏感推断或主张证据不成立的项，再结合与本次决定的相关性、证据贴近度及制作/验证成本选择一项；不设固定画像、情绪分数或产量配额。资料不足则写出未知，不为了填表补人设。

将所选任务写成原创brief：一项主变量、支持证据与反例、拟改内容、保持不变项、最小核对及停止条件。先核信息是否准确清楚，经营效果仍须另有实际交付、成熟结果、损失边界及具体授权；研究与离线改稿不授权上线。来源与成熟度为2026-10-08 Dara/Motion长教程和既有研究门融合的条件化方法候选，非效果验证，详见[融合记录](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__provenance__SOURCE_NOTES.md#long-video-20261008)。

中文教学：[从反馈问题到一条有边界的素材改稿](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__knowledge__2026-10-08-research-to-bounded-brief.md)（原创合成教学候选，非独立验收样例）。

## 4. 创意概念、模块化实验与 AI 资产

适用于广告文案、UGC/VSL、Hook、Intro/Bridge/Core、创意包、版位改编、AI 人物/声音/图片和批量生产。对应方法族：004、007、014、016、022–024、027–030、032–034、037–041、049–050、054。

方法054的 Intro→Bridge→Core 及单一主要信念变化模板目前仅保留为研究线索：其来源日期准入尚未闭合，历史 project_trial 或旧质检不替代准入。本包不据此主动生成该模板方案、推荐其策略或将其作为默认及必需验收标准；不能仅因用户点名就将未准入方法作为已获准方案执行。若用户提供已有该结构的素材，只按可独立成立的事实、权利、主张、版本、主要测试变量及 CTA—页面连续性进行离线审阅，不据该模板判断说服效果、强制信念变化或判定缺少 Bridge 不合格。其他结构同样以实际简报、材料和明确验收依据为准，不自动替换成另一套未经支持的配方。只有来源日期准入及适用证据另经审定后，才可另行申请恢复方法调用；本轮不作该准入。

1. 记录实际简报中的顾客任务、主张、证据、CTA、待验证问题与未知；局部变体保存 parent-child。不补造信念、机制或典型结果，不以方法054的固定组件数量验收。
2. 对用户已提供的内容分段，按其实际意图核对前后语义及 CTA 与页面/结账是否一致；组件名称只作输入标签，不套用未准入模板分配职责，也不由组件齐全推定有效。
3. 先审单条广告真实性与伤害，再审实验能学到什么；只换 Hook 不能声称验证完整说服路径。
4. AI/批量生产使用批准清单：输入权利、商品真值、模型/日期、Prompt、父版本、人物/声音/音乐/商标许可、披露和人工批准。只渲染能回答明确问题的有限组合。
5. QA 检查成片哈希、预期/实际数量、重复/失败、首尾帧、黑帧/截断、音画、字幕、安全区、产品保真、身份误认、披露、CTA 和页面连续性。
6. 伪造评论/专家/媒体/截图、冒充真人 UGC、无权模仿公众人物或弱化披露直接停止。
7. 输出 `concept_registry / component_manifest / rights_claim_gate / approved_assembly_manifest / preflight_QA / actual_delivery_and_business_writeback`。

从未整理素材设计初始方案时，直接调用[结构参考的从零路径](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__meta-ad-structure-and-draft.md)：先按任务/主张/证明区分概念与变体，再决定内容归属和交付层级；概念组不等于广告组。这里既有单条主张、父版本和CTA连续性检查仍适用，但不以只有检查表代替具体方案。

## 5. 账户结构、Catalog、受众与生命周期

新方案中的受众、暖/老客内容与是否拆分，按[阶段、受众与学习资源](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__stage-audience-resource-playbook.md)给具体首批和改判条件；其正向规划不放宽下方的存量迁移及真实许可边界。

适用于新账户冷启动、存量迁移、Prospecting/Scale/Retargeting/Retention、Catalog、Lookalike、Carousel 和许可名单。对应方法族：002、006、009、015、025、029、035、044–051。

1. 新账户先证明身份、测量、Offer、素材和最大损失；已有花费账户先保存 last-known-good、结构、预算、竞价、归因、actual delivery 和经营基线。
2. 仅审阅用户提供的拟议迁移方案：记录原基线、拟改变的对象与关系、方案依据、期限、损失上限、授权、停止条件和回退责任；没有方案或证据时保持 UNKNOWN，不默认建议并行迁移，也不由本包选择切换策略。若输入已提出并行方案，只审其边界与缺证，不把它当成已推荐、已批准或可执行的方案；不得因讲师案例、短期 ROAS 或“更简洁”直接关闭旧 Campaign。
3. Catalog 审阅使用公司离线业务关联合同：把材料中的商品项、商品变体、事件所指商品与订单行对应起来。可用 `feed_item_id → variant_id → event_content_id → order_line_id` 表示这些角色，但它们不是 Meta 统一必填 API 字段，也不要求输入中存在这些同名字键。只按实际输入及其独立关系依据建立映射，记录原字段名、键值、关联基数和证据；缺失、冲突或无法确认的关系标 UNKNOWN，不补造 ID、不强行一对一、不据同名推断同一对象。核对所提供的价格、币种、库存、图片、URL、付款、退款和履约证据；映射一致不证明当前上传格式、同步正确或真实事件实现已验证。
4. Carousel 逐卡核承诺、证据、权利、URL 和商品状态；整组通过不能掩盖单卡错误。
5. 受众保存 source/purpose/permission/event/as_of/window_reason/exclusions/expiry/withdrawal/deletion；可创建、规模估算和互动不证明购买意图或无限许可。
6. Lookalike 的种子、地区、比例和排除只是带日期实验变量；Retargeting/Retention 按下一任务和业务状态抑制已购、退款、投诉、退订和删除请求。
7. 输出 `frozen_account_baseline / bounded_structure_candidate / catalog_identity_reconciliation / audience_permission_ledger / migration_trial / rollback`。

## 6. 诊断、测试、预算、竞价与扩量

适用于表现下降、Breakdown、自动交付、Learning、CBO/ABO、Cost/Bid/ROAS 约束、规则、预算变化和扩量。对应方法族：003、006、015、023、025–029、032–037、040、042、044、048–051。

1. 使用业务、测量、报告、变更和经营容量的分离时钟；先核 actual delivery 和数据成熟，再解释结果。
2. 指标必须写名称、分子、分母、事件、来源、币种、时区、窗口、归因、层级和版本；跨载体冲突标 `metric_contract_conflict` 并停止自动评分。CPM、CTR、订单 CPA 与新客 CAC 使用 [业务指标与单位经济](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__business-math-and-unit-economics.md)，历史方法卡中的来源公式不能绕过最终口径。
3. Breakdown 是平台选择后的观察，不是随机实验；小样本、多切片和相关性必须披露。单变量、成熟和 actual delivery 已知仍不消除选择偏差；当前 L0 的 `causal_claim_allowed` 始终为 `false`，未来证据合同见 [测试、诊断与停止](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__testing-diagnosis-and-stop.md)。
4. 赢家资格门与扩量门分开。扩量只看新增花费 cohort、去重已付订单、退款/拒付、边际贡献、重叠/蚕食、现金、库存、客服和履约容量。
5. 预算/竞价变更写精确对象、来源/去向、金额上限、单次/单日/累计限制、冷却、批准、执行回执、最大损失和回滚；约束输入不是结果保证。
6. 自动规则必须有数据延迟、动作等级、失效、失败告警、人工接管和 last-known-good；不得为等待“学习期”忽略超支、隐私、支付、交付或伤害事故。
7. 输出 `metric_contract / earliest_breakpoint / one_variable_test / actual_delivery / maturity / marginal_scale_gate / exact_change_envelope / stop_and_rollback`。

素材表现下降或疲劳候选，按[素材表现与疲劳候选分路](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__testing-diagnosis-and-stop.md#素材表现与疲劳候选分路)核可比性、替代解释及brief影响。

## 7. 节日促销、CRM、邮件/SMS 与跨渠道压力

适用于 BFCM/Q4、VIP/Lead Form、欢迎/弃购/浏览/召回/补货/购后 Flow、Campaign 和邮件素材。对应方法族：020、035、043–047、052–053。

本节仅提供用户已有跨渠道方案的离线协调记录与审阅合同，不据历史课程自动推荐发送频次、渠道组合、触达顺序、冷却时长或促销策略，也不声称记录台账能够改善转化或避免疲劳。涉及这些策略而缺少已准入依据时，保留原提案、标明 UNKNOWN 并列最小补证；不填默认值或把台账完整当成策略通过。许可撤回、主张真实性、Offer/履约一致性、授权与损失停止门继续独立适用。

1. 从当前年份、市场、时区、到货承诺、承运商截止、库存、客服、退换和履约容量倒排；旧节日日历和固定发送频率只作历史候选。
2. 许可按渠道分开且自由、知情、明确、未预勾选；保存价值交换、主体、用途、时间、期限、退出、抑制和删除。
3. 所有 Flow 使用 event/permission/entry/exclude/priority/dedupe/message_version/actual_send/stop_reason；购买、退款、投诉、退订和支持阻塞优先于营销触发。
4. 广告、页面、结账、邮件、短信、客服和仓库共用同一 Offer/截止版本；假原价、假倒计时、假低库存和无法保证的到货直接停止。
5. 用 `pressure_ledger` 汇总材料中各渠道的计划与实际发送、已有优先级、互斥及冷却约定，并为每项保存来源、版本与有权确认依据；缺失记 UNKNOWN，计划不冒充实际。跨渠道记录用于发现重复、冲突及未落实的停止要求，不自动制定频控参数或证明全局压力已受控；缺证时只提出离线核对，不执行发送或调整。
6. 原型、排期、发送、送达、订单和贡献分状态；Figma/图片稿不等于 HTML、响应式、可访问、可送达或获准发送。
7. 输出 `seasonal_calendar / permission_contract / lifecycle_state_matrix / pressure_ledger / actual_send / order_contribution_reconciliation / close_and_restore`。

## 8. 客户服务、团队协作与报告

适用于客户入驻、岗位、创意团队、审批、日常巡检、报告和退出交接。对应方法族：001–003、015–016、018–019、032、035–037、043。

1. 冻结服务主体、范围与不包含项、输入 owner、数据/素材权利、行业合规 owner、客户审批人、发布权、SLA、暂停/撤回和退出交接。
2. 签约、付款、提供素材、加入项目板、审稿和发布是不同回执；任何一项都不自动授权登录或改账户。
3. 创意交接包含 concept_id、任务、主张/证据、权利、版位、页面、版本、deadline、QA、批准和拒绝理由；移动任务列不等于实际交付。
4. 报告分开 planned/configured/delivered、平台信号、业务订单/退款/贡献、解释、替代解释、不能下的结论和下一单变量。
5. 客户模糊的“你看着处理”不得扩张为预算、发布、权限或删除授权。
6. 输出 `scope_contract / asset_and_permission_intake / creative_handoff / approval_receipts / decision_report / revoke_and_exit`。

## 9. 教学与公司知识输出

适用于课程、讲师稿、工作簿、检查单、视频选题和客户培训。对应全部方法卡，但不复制第三方课程正文。

1. 每个核心知识点按“是什么、为什么有用、易错点、正确流程、照着做、模板、常见错误、练习、检查单”组织。方法卡是可追溯证据，不是未经复核即可照抄的运行规则；与最终 Skill 冲突时以最终 Skill 的单位、边界和停止条件为准，并在方法卡保留纠正记录。
2. 平台当前事实在录制/交付前单独官方核验；讲师配方与个案保留为带条件的来源经验。
3. 本版示例只使用本次获准的安全合成数据，并标 scenario_not_prediction；脱敏不自动放行真实数据。第三方人物、账户、课件、客户结果和付费正文不得进入公开课程。
4. 便携运行与教学结论回链到包内具体 reference 章节，并按需用 provenance/INTERNAL_METHODS.md、provenance/SOURCE_NOTES.md 解释来源和观察限制。公司内部在已有合法访问权时可额外回接 source_map/方法卡，但它们不是本包运行依赖。包内已具依据的解释不因缺私有路径而停止；包内本就没有支持的主张保持 UNKNOWN，不伪造卡片、出处或已回源声明。
5. 对新来源先去重和查知识增量；若不改变判断、执行、核验、停止或授权门，记录 `no_update_needed`，不增加同义规则。

## 追溯入口

公司方法族和原语料例外见[内部方法说明](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__provenance__INTERNAL_METHODS.md)，公开来源及观察范围见[来源说明](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__provenance__SOURCE_NOTES.md)。底层付费课/逐字稿/方法卡不随包分发；不能虚构回源或把内部证据说成商业分发许可。完整课程制作不随本包交付，本节教学规则只支持所声明的离线解释与使用帮助。
