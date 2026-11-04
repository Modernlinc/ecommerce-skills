# 收纳袋广告准备审阅报告：首答

2026-09-05；输入 `META-F1-SYN-01/v1`，证据E0–E6。实际生产者从当前Meta Skill入口按audit主模式、必要的draft输出本答复；未运行旧函数/探针，无独立新手或真实商家参与。全部结论仅针对合成材料；这是当次完整产物，不是评分答案或正式准入。

## 结论

可以交给团队一份**受限的内部审阅稿和创意方向**，不能把当前广告当作可发布成稿。两处已有确定差异：商品/页面与广告的数量、运费不一致；同一合成业务事件的browser/server金额不一致。另有主张证据、最终商品真值、真实去重、归因可比性和预算权限缺口。

当前不能判断销量改善，也不能认定某素材更有效。请先让商品负责人确认此次有效的数量与运费版本；报告没有替你修改任何商品、页面或广告。

## 1. 商品、承诺与交付核对

| 项目 | 已观察证据 | 结论与影响 |
|---|---|---|
| 商品身份 | E0/E1/E2/E3同为BAG-BEIGE、米色帆布收纳袋 | 在这套合成材料中可对齐商品身份，可用于内部brief；不是实物/规格认证 |
| 数量 | E1/E2为1只；E3为2只，对应同市场/期间 | `NEEDS_FIX`：数量承诺冲突。不能因为两份对一份就认定E1正确，也不能用广告反改商品 |
| 价格与运费 | 各处报价写24 USD，但数量不同；E1/E2运费5，E3包邮 | `NEEDS_FIX`：同为24不等于同一Offer；运费承诺冲突。不要将“24美元”直接拼入新稿 |
| 容量主张 | E3说容量翻倍，无对比对象、尺寸或测量证据 | `NEEDS_FIX`：该主张目前无支持，不能进入可用成稿；这不证明产品实际没有该能力 |
| 配送、税项、退换和容量 | E1/E2没有可用的完整说明 | `UNKNOWN`：不能承诺某日到货、全包价、退换条件或扩量能力 |
| 素材与权利 | E3只有合成文字，没有成片/图、人物/音乐许可 | `UNKNOWN`：没有观看成片或取得广告用途权利；内部构思不等于可制作/可发布 |

E1/E2只支持“两个准备材料目前一致”，不支持“它们已获批且可售”。最终Offer版本、条件与确认人仍缺；任何修正都要留新版本及依据，不能覆盖原始证据。

## 2. 给设计师的受限brief

**内部概念名：看清收纳袋本身。** 任务假设是帮助正在找桌面收纳方式的人了解袋子外观和使用方式；这不是对某人心理、身份或购买意图的推断。

- 可用的暂定信息：米色、帆布、收纳袋，来自E1/E2/E3共同文字；依然需要后续实物/规格核对。
- 原创标题候选：“看看这款米色帆布收纳袋。” CTA候选：“查看商品信息。” 只作为内部表达方向，不宣称已通过政策或可直接发布。
- 画面设想：先展示袋子，再展示放入小物的过程，最后回到商品信息入口。现在只有文字分镜，不生成媒体；实际装载物、尺寸、承重、容量或效果必须由实物证据支持，不能编演成产品证明。
- 暂不写：只数、价格、包邮、容量翻倍、配送/退换保证。前两类等待Offer确认，其余待对应证据；不是把这些词换一种说法规避证据。
- 版位/比例/时长/安全区：待当前适用规格核验。人物、音乐和第三方素材默认不纳入；后续加入需各自权利与批准，不能由这份brief推定获得授权。
- 页面承接：未来CTA应指向同Offer版本的页面/结账。E2的example.invalid只是未访问占位地址，不是可投放落地页。

设计师此时可阅读和讨论概念；**不得按它制作带具体Offer承诺的发布成稿**。这份受限brief不会证明素材能提高CTR、销售或ROAS。

## 3. 未创建的Campaign—Ad Set—Ad草稿

以下是本地声明式计划，不是API参数或平台当前可选配置。单组嵌套路径表达归属，不额外索取真实ID；在E0的明确单组意图范围内可解析。业务字段未补齐的部分保持UNKNOWN，不把关系完整称为完整投放方案。

```yaml
runtime_status: DRAFT
platform: meta_facebook
authorization_level: L0_OFFLINE
campaign:
  name: "BAG-BEIGE 网站购买准备稿"
  object_state: PAUSED
  exists_in_meta: false
  published: false
  business_goal: "获得可与付款凭据核对的网站购买"
  objective: UNKNOWN
  budget_owner_level: Ad_Set
  maximum_test_loss: "60 USD，仅E0合成意愿，不是实际批准或计算出的阈值"
  ad_set:
    name: "单组网站购买假设"
    object_state: PAUSED
    exists_in_meta: false
    published: false
    optimization_destination: website
    optimization_event: "Purchase候选；E4值冲突和实际适用未闭合"
    market: "US，合成目标标签"
    audience_hypothesis: "有桌面收纳任务的人；不是已配置受众"
    planned_placements: UNKNOWN
    planned_delivery: "拟2026-09-10至09-16，尚未配置；非推荐固定观察期"
    proposed_total_spend_ceiling: "200 USD，仅E0讨论值；不拆成默认日预算"
    actual_delivery: UNKNOWN
    ad:
      name: "看清收纳袋本身"
      object_state: PAUSED
      exists_in_meta: false
      published: false
      identity_reference: UNKNOWN
      creative_version: "本报告受限文字brief；不是AD-v1获准修正版"
      rights_status: UNKNOWN
      offer_version: UNKNOWN
      destination_url: UNKNOWN
      tracking_parameters: UNKNOWN
approval:
  owner: "E0合成商品负责人；尚无真实执行审批人"
  authorized_spend_cap: "实际广告花费许可0；无真实投放批准"
  live_action_authorized: false
stop_conditions:
  - "商品承诺/主张/素材权利、事件值或归因口径未闭合"
  - "要求登录、读取真实数据、创建、改预算或发布"
```

预算只归属Ad Set，Campaign不另填第二笔钱。200 USD不是modeled_spend_cap（没有经济模型输入），60 USD是合成最大损失意愿而非花费；R/V/O/A/N、成熟退款和新客归属缺失，CPA/CAC、贡献、可承受盈亏线均不能计算。正的计划金额不会产生外部预算权限。

## 4. 测量、报表与实验判断

**已证冲突 F-EVENT：** E4用本地约定关联同一业务键，事件名、时间和币种一致，但值分别29与2900，输入值相差100倍。`NEEDS_FIX`指记录之间的差异，不证明哪一路正确或发生了何种技术故障。不能自动把server除100；也不能因E2的24+5恰好29就认定browser正确——E4是9月1日事件，E1/E2是另一拟售期间，且税/运费是否计入事件未说明。

**独立未知 F-DEDUP：** 相同键、时间或修成相同金额，都不能证明Meta成功去重。去重设计、实际Events Manager诊断、接收结果/覆盖、发送用途与同意证据各自UNKNOWN；不能把字段一致性升级为CAPI实现或合规通过。当前官方参数/资格未在本轮核验，不发送测试事件或读取账户补证。

**不可比 F-REPORT：** E5的两期标签并不证明同定义/窗口/总体。90+45可以做纯算术，但不能当作135个去重Purchase，更不能与120比较后宣称销量增长；120到90也不能直接宣称销售下降。保留各原列，最小缺口是这些报表自身的定义版本/适用期、采用范围、重算与互斥说明。公告日期不能补这些缺口，8月日期不自动证明两期已采用同一新口径。

**实验限制 F-CHANGE：** E6只记录了同时改文案、价格说明、受众假设，没有实际交付和分配/对照证据。即使以后补齐两期可比数据，也不能把结果归因给文案。未来只能先冻结Offer/事件/窗口/分配条件，再围绕一个主要未知提出离线试验设计；当前不启动测试、不凭空给样本数、时长或赢家。L0的`causal_claim_allowed`始终false。

效果诊断最早可信断点在测量层E4值冲突，E5另有可比性缺证；广告准备层则同时存在Offer冲突。两条结论都成立，不互相覆盖。没有业务账本，不输出销量、利润或扩量建议。

## 5. 现在只做的一个最小动作

**动作：由E0中的商品负责人给BAG-BEIGE本期数量/运费提供一份明确的版本裁定说明。** 附上E1/E2/E3原始版本，说明哪份对应2026-09-10至09-16的US报价、数量和运费、依据是什么、是否还有条件；不能只回复“按新的”。这是报告中的离线建议，本任务没有联系该角色或改原材料。

- 下一证据：带适用期、市场、variant、数量、价格/币种、运费条件、依据和签认角色的Offer说明。
- 检查：这份说明是否能解释三处差异并支持后续统一版本；不能以多数票或文件时间自动判真。
- 最大等待：下一次内部审稿前；未取得说明就保持受限brief，不因临近计划日期自动放行。
- 最大损失：本次实际广告支出0；未来60 USD仅合成意愿，当前未核算且无真实授权。
- 提前停止：说明仍冲突、缺签认、改成真实账户/预算/发布任务，或要求无证主张继续使用。
- 回滚：本报告未更改E1–E6；保留原材料与本次候选。后续修订失败只撤回依赖新证据的候选，不自动恢复/改动任何真实广告。

这一步解决广告准备的首要决策，但**不自动关闭事件、去重、归因、权利或配送缺口**。那些仍列在报告中，不同时扩成一串外部执行任务。

```yaml
mode: audit
runtime_status: NEEDS_FIX
decision: "交受限内部审阅/brief/草稿，不交可发布方案；Offer和事件存在已证冲突，经营结论缺证。"
evidence_observed: [E0, E1, E2, E3, E4, E5, E6]
evidence_labels:
  - "project_hypothesis: 所有E项是本次原创合成材料，非真实项目事实"
  - "redline: L0只读/草稿、五状态、因果false、真实动作单独确认"
unknowns: [Offer最终真值, 主张证明, 素材权利, 配送退换税项, 去重实现与诊断, 同意适用, 报表定义与成熟总体, 实际交付, 业务成本与真实预算]
earliest_credible_breakpoint: "效果诊断：E4测量值冲突；准备交付：E1/E2与E3的Offer冲突。"
causal_claim_allowed: false
one_minimum_validation_action: "商品负责人提供一份带依据和适用范围的数量/运费版本裁定说明。"
check_result_fields: [variant, quantity, price, currency, shipping, applicable_period, market, evidence_locator, confirming_role]
maximum_loss: "本次实际花费许可0；60 USD只是未批准/未核算的合成意愿"
stop_conditions: [真值未闭合, 无证主张或权利缺失, 测量不可用, 真实操作未授权]
rollback: "原材料不变，候选独立保留，不改真实系统。"
live_action_authorized: false
safe_stop: "不登录、不取真实数据、不创建或发布广告，不改变预算；自然运营不在本报告范围。"
```
