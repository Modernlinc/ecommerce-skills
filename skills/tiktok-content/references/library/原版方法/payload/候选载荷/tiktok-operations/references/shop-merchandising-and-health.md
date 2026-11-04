# Shop merchandising and health

## Separate the two Shop systems

Do not combine merchandise discovery with shop health:

1. **Merchandising system:** eligibility → discovery/search impression → product detail visit → checkout/order → retained order → contribution.
2. **Health system:** policy status plus product satisfaction, fulfillment/logistics, and customer-service evidence → eligibility/benefit or enforcement consequences.

Shop Performance Score, Account Health Rating, recommendation eligibility, appeal paths, thresholds, and Seller Center labels are high-drift and market-specific. Verify the target market's current official page and authorized account state before giving an operational conclusion.

## Shop and product object card

```text
market/entity/shop type:
shop/account status and observed_at:
product ID/variant set/category:
brand/category/qualification evidence:
listing state and recommendation eligibility:
title/attributes/images/video/price/promotion/inventory consistency:
search terms and discovery surfaces:
fulfillment/return/service owners:
refund-maturity date:
contribution definition and currency:
current health/violation objects:
change history:
authorization: offline_only | read_only_authorized | live_change_authorized
```

Missing account evidence remains `unknown`. It does not authorize Seller Center access, a Listing edit, stock change, promotion, or appeal.

## Merchandising loop

1. Verify product, category, brand, market, and content eligibility.
2. Reconcile Listing promise with the physical product, variants, images, price, inventory, delivery, returns, and every active content/creator/ad destination.
3. Map discovery by surface and query where available; keep Shop Tab/search, profile/showcase, shoppable content, creator, LIVE, and paid paths separate.
4. Diagnose the first break in the merchandising funnel.
5. Propose one bounded change with owner, previous state, expected signal, window, contamination risks, and rollback/stop condition.
6. Wait for order, cancellation, refund, fulfillment, and contribution maturity before promoting a winner.

### Merchandising diagnosis

- **No eligible impressions:** check product/listing/shop state and recommendation eligibility before changing content or ads.
- **Impressions without detail visits:** inspect query/product match, first product representation, price visibility, and competitive context.
- **Detail visits without checkout:** inspect attributes, variant clarity, proof, delivery promise, price/promotion math, trust, and destination continuity.
- **Checkout/orders without retained value:** inspect stock, cancellation, late dispatch, return/refund reason, product satisfaction, commission, discount, ad cost, and service load.
- **Abrupt change:** first audit availability, promotion, price, inventory, attribution window, traffic mix, and health events; do not infer an algorithm cause.

Do not copy competitor Listing text, images, marks, or false low-price variants. Competitors provide variables and questions, not reusable assets or demand proof.

## Listing change card

```text
decision:
observed evidence and window:
field to change:
fields frozen:
claim/rights review:
price-promotion-inventory calculation:
expected leading signal:
primary business outcome:
conversion/refund maturity:
maximum downside:
rollback/stop condition:
human approver:
```

Never freeze a title length, image count, ranking threshold, price band, fee, or promotion-stacking rule as universal. Use current market evidence.

## Shop health and appeal loop

1. Record the exact health object: shop score, account rating, product status, policy violation, service/logistics metric, or program eligibility.
2. Preserve notice, reason, affected object, market, timestamp, current rule link, evidence window, and consequence; redact personal/order data.
3. Separate operational performance from policy enforcement. A weak service metric is not automatically a violation, and a violation is not automatically a creative problem.
4. Assign a named owner and identify a factual correction, operational remedy, evidence package, and customer-impact containment.
5. Check appeal eligibility and deadline from the current official source. Draft only; submission requires explicit authorization.
6. After any authorized action, read back object status and adjacent impacts. No response or restored status is not inferred.

Stop or hold when the rule, object, reason, evidence, deadline, rights, customer remedy, or approver is missing. Never fabricate documents, identity, shipment, reviews, or product evidence.

## Cross-channel controls

- A Listing edit may invalidate shoppable posts, creator briefs, LIVE scripts, catalog feeds, and ads; enumerate affected objects before approval.
- Inventory and fulfillment capacity must cover the combined organic, affiliate, LIVE, and paid demand scenario.
- Platform GMV is not contribution profit. Reconcile discounts, fees, commissions, ads, product cost, logistics, cancellations, refunds, and taxes under one window/currency.
- A health or eligibility failure blocks downstream scaling even when traffic metrics look strong.

For collaboration objects read [creator-collaboration-objects.md](creator-collaboration-objects.md); for LIVE read [live-operations-and-analysis.md](live-operations-and-analysis.md); for experiment sufficiency read [evidence-and-practitioner-method-admission.md](evidence-and-practitioner-method-admission.md).

## Product-to-listing draft handoff

这是 T02→T06 的离线产物交接细化，不是新的商品真值表、平台必填规范或发布授权。沿用[Product decision card](shop-creator-and-live.md#product-decision-card)及上文 Shop/product object card、Listing change card；不复制另一套卡。

### 从给定事实到可检查的文字

商品/Offer 负责人交给 Listing 草案负责人：已有商品/真实变体、事实定位或已有版本标记、适用市场、支持与禁止主张、给定价格/叠促、库存及服务条件。未提供的内容保留 unknown，并指出谁应补哪项证据；不发明平台 ID、价税、库存、资格或证明。每一拟写主张都回接给定商品/变体及相应事实定位，事实不足的主张列为待补而非可发布承诺。

- 新 Listing：交付实际拟写文字，逐项标注它使用的事实或证明依据；不是只交标题提纲、检查项或“claim review 已完成”。
- 修改 Listing：只列拟改字段、给定原值（未提供则 unknown）、实际拟写新值、修改理由及事实依据，同时列明冻结字段；原值 unknown 时不能声称已核对差异或不影响原承诺。
- 图片或证明素材：引用实际提供的资产定位及有关权利证据；缺素材就写需证明什么、由谁补什么，不生成虚构资产、授权或已制作状态。不得添加通用标题字数、图片数量、价格阈值或未核验的平台必填要求。

Listing 草案负责人 → 商品/Offer 负责人或明确指定的内容审核接收者：交付上述实际文字及依据。接收者核对商品/变体、承诺与证明、给定 Offer、目的地和库存/服务条件的一致性，按具体段落或字段写接受/退回、理由、责任角色及下一证据；未实际回应仍待接收。缺证只允许无关字段整理与明确标注缺项的离线草稿，不把待补承诺交为可发布文字。草案接收不代表市场/品类资格成立，也不授权上传、发布、改价、改库存或其他真实操作。

### 首断点只消费已有观察

沿用 Merchandising diagnosis 和 Listing change card。接收给定观察窗口、对应漏斗层的证据及变更记录，才能选择有依据的首断点；缺某层数据时写出待核的具体层、窗口、证据及提供角色，不猜算法或把假设写成诊断。把实际拟改文字/字段接到原 change card 的一个有界动作，并说明预期信号、观察窗口、污染风险和停止条件；没有足够证据时仅保留条件性草案，不宣布断点、赢家或可执行变更。其他字段按冻结范围保留，不借此重写全渠道流程或利润算法。

### 健康对象单独判，停止范围写具体

继续使用 Shop health and appeal loop 的通知、对象与证据记录，不把 Listing 草案当申诉证据包或健康判定。

- 已知健康/资格失败：按已知限制保留受影响发布与下游扩量的停止；不能用缺某项附件、文字纠正或流量良好解除它。只继续不违反该限制的事实整理、补证请求和离线纠正草稿。
- 只是证据未提供：缺通知/理由/对象证据，不判定是否违规或违规原因；缺适用规则，不确认规则解释、资格或补救路径；缺可核期限依据，不推定申诉截止时间或仍可申诉。写明阻断的具体结论、缺项及提供角色，不把“未知”当“正常”或“已失败”。可整理已给事实、最少必要的脱敏证据请求及明确标缺的离线草稿；无关商品整理可继续。
- 缺权利、客户补救或审批等原有停止条件仍有效。草稿写完不等于申诉可提交；Listing 纠正不证明健康恢复或申诉成功，通知处置也不证明转化改善。实际提交或操作仍需另行明确授权，之后按原流程读取对象状态及相邻影响；无读回不报告已恢复。本段不读取真实账户。
