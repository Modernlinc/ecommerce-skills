# Ads delivery and diagnostics

## Scope and authorization

Use this for ordinary TikTok Ads Manager planning and diagnosis: Campaign → Ad Group → Ad, audience/exclusions, placements, bid/budget strategy, catalog/product set, prospecting/retargeting, delivery, creative supply, fatigue, and change control.

It does not replace the separate Smart+, Spark, Search, Product GMV Max, LIVE GMV Max, website-measurement, and experiment contracts in [ads-measurement-and-experiments.md](ads-measurement-and-experiments.md). No plan authorizes login, account read, object creation/edit, audience/customer-file upload, spend, or publication.

## Delivery object card

```text
market/business/ad account and authorized evidence date:
campaign objective and destination:
optimization event and measurement state:
campaign/ad group/ad IDs or N/A for offline plan:
audience hypothesis, inclusions and exclusions:
placement and brand-safety controls:
catalog/product set/feed state:
bid strategy, budget, schedule and loss ceiling:
creative/post owner, rights, disclosure and supply:
prospecting/retargeting role and overlap control:
primary outcome, guardrails, conversion/refund maturity:
frozen fields, planned change and rollback:
approver and authorization state:
```

Record current account labels and availability only after an authorized readback. Platform recommendations are dated inputs, not universal operating rules.

## Audience and placement design

- Start with the customer/business hypothesis, not a copied targeting stack.
- State each inclusion, exclusion, seed/source, recency window, consent/legal basis, and overlap risk.
- Treat broad, interest/behavior, lookalike, custom, search-intent, and retargeting approaches as hypotheses tied to the objective and signal quality.
- Customer File or another personally identifying source remains `hold` until lawful basis, consent/notice, data owner, minimum fields, secure handling, platform terms, and explicit upload authorization are established.
- Choose automatic or select placements based on the business question, eligible destination, brand safety, comparability, and creative readiness. If delivery mixes placements, read back the actual mix before attributing a result.

Prospecting and retargeting require an explicit exclusion/overlap plan. If the audience pools, windows, exclusions, or cross-campaign competition are unknown, incremental acquisition claims remain `unknown`.

## Catalog and product controls

Before using a catalog or product set, reconcile item/variant ID, title, image, landing destination, price, currency, availability, inventory, category, and event/product ID matching. Record feed update time and error state. A campaign cannot repair an ineligible, inaccurate, unavailable, or mismatched product.

Do not upload or change a catalog without authorization. A stale price, missing variant, broken destination, or wrong event ID is an operational defect—not evidence that the audience or creative failed.

## Bid, budget, and delivery control

- Select bid/budget treatment from the objective, contribution boundary, conversion delay, expected event volume, inventory/service capacity, and approved maximum loss.
- Record the platform's current recommendation and account-specific delivery state separately from the company decision.
- A low-spend state does not automatically mean “raise budget/bid”; first check hard blockers, eligibility, schedule, balance/payment owner, event configuration, audience, placement, catalog, creative, and auction state.
- A high-spend state does not authorize scale. Inspect order quality, refund maturity, contribution, and operational load.
- Never turn a fixed currency amount, percentage change, learning duration, event count, or number of creatives into a universal threshold.

## Diagnostic tree

Use the first unresolved branch:

1. **Object/authorization:** correct account, objective, destination, status, approval and budget/spend boundary?
2. **Policy/eligibility:** ad, post, product, account, audience, placement, or catalog rejected/ineligible?
3. **Measurement:** target event firing with correct value/currency, browser/server identity, dedup, consent, window and freshness?
4. **Delivery:** schedule, balance/payment handoff, bid/budget, audience size/overlap, placement, product availability, and actual spend/exposure?
5. **Attention/traffic:** eligible impressions, first-message comprehension, click quality, search/query or placement continuity?
6. **Destination/commerce:** load, product/listing match, price/stock, checkout, order?
7. **Quality/economics:** cancellation, refund, fulfillment, customer outcome, total variable cost, contribution?
8. **Incrementality:** holdout or defensible comparison; otherwise do not claim causal lift.

Return observed evidence, competing explanations, missing evidence, next discriminating check, and stop condition. Do not diagnose from one aggregate ROI number.

## Creative supply and fatigue

Track concept/asset/post, audience/placement exposure, spend share, frequency or repeat-exposure evidence if available, attention/action metrics, conversion quality, rights expiry, product/offer state, and external/seasonal changes.

Possible fatigue requires a pattern under comparable delivery and business conditions. A decline may instead reflect audience saturation, placement mix, price/promotion, inventory, competition, tracking, seasonality, or random variation. Refresh by testing a new customer situation, proof path, objection, format, or offer representation—not by copying a competitor or merely changing pixels.

## One-change log

```text
change_id and object:
observed problem and evidence window:
candidate causes:
one primary change:
frozen fields:
previous/new value or concept:
expected effect and minimum business-relevant change:
conversion/refund delay:
contamination and adjacent objects:
max loss and safety stops:
human approval:
readback time/result/confidence:
```

If multiple material fields move or automated delivery reallocates exposure/spend, label the result `delivery_contaminated` or `directional`.

## Decision outputs

- `hold`: object, data, rights, policy, inventory, economics, or authorization is missing.
- `continue_observation`: no safety/economic stop and the predeclared evidence window is incomplete.
- `revise_one_variable`: a discriminating change is justified within the loss/capacity boundary.
- `stop`: policy, rights, customer harm, inventory/service risk, maximum loss, or repeated refund-mature negative evidence.
- `scale_candidate_requires_approval`: evidence is decision-ready for the defined context; live budget change still requires separate authorization.

For statistical sufficiency and optional stopping read [evidence-and-practitioner-method-admission.md](evidence-and-practitioner-method-admission.md). For asset access read [business-center-and-asset-governance.md](business-center-and-asset-governance.md).
