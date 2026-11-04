# LIVE operations and analysis

## Keep three objects separate

- **Organic/Shoppable LIVE:** the event, audience, product set, host operation, service, fulfillment, and organic commerce result.
- **LIVE GMV Max:** a paid Shop Ads object whose current attribution and lifecycle rules require official verification and account readback.
- **Other adjacent paid objects:** Product GMV Max or legacy/current account objects that may overlap or be paused.

Do not combine their dashboards or infer incrementality from reported GMV. Going LIVE, changing products/promotions/inventory, running a giveaway, moderating an account, or changing ads requires explicit authorization.

## LIVE event card

```text
event_id, market, account/shop, timezone:
business question and audience promise:
event window and comparison class:
eligible product pool and merchandise roles:
inventory, fulfillment, returns and service capacity:
host, producer, moderator, service and escalation owners:
run-of-show units and proof/claim sources:
disclosure/music/person/brand/product rights:
technical rehearsal and backup:
organic/paid objects and dedup plan:
primary result, guardrails, refund maturity, max loss:
real-time and post-event stop conditions:
authorization state:
```

Merchandise roles may include a traffic/entry product, hero product, objection-handling product, bundle, and controlled test item. These are planning roles, not guarantees or fixed assortment ratios.

## Before LIVE

1. Verify event/account/shop/product eligibility and current market rules.
2. Freeze the product/variant list, accurate prices/promotions, available stock, delivery/return promises, and maximum demand scenario.
3. Create a run-of-show made of modular units: promise, demo, proof, limitation, objection, offer, CTA, service cue, and reset/recap.
4. Assign host, producer, moderator, service, inventory, compliance, and incident decision rights.
5. Rehearse product pins, demos, audio/video, backups, disclosures, prohibited claims, escalation and hard stops.
6. Declare the learning question, event comparison, allowed changes, measurement sources, conversion delay, refund maturity, and paid overlap.

## During LIVE: timestamped operating log

Record observations and actions separately:

| Field | Examples |
|---|---|
| timestamp/window | minute or segment range in one timezone |
| traffic | source, impressions/entry, paid/organic state if observable |
| audience | concurrent viewers, new/returning, retention, engagement, questions |
| commerce | product impression/pin, click, checkout/order, product/variant |
| operations | stock, service queue, fulfillment warning, technical issue |
| compliance | claim, disclosure, moderation, policy warning, rights issue |
| operator action | pin/demo/segment/offer change or no change |
| authorization | approver and approved scope, or `not_authorized` |
| hypothesis | directional explanation, never recorded as observed fact |

A short-term metric change after an action is correlated evidence, not causal proof. Avoid rapid unplanned changes that destroy interpretability.

### Real-time response hierarchy

1. Safety, policy, rights, customer harm, incorrect price/product, stock, payment, and fulfillment risk.
2. Technical integrity and ability to communicate accurately.
3. Service/moderation capacity and audience understanding.
4. Traffic, retention, product action, checkout, and order signals.
5. Only then optimization ideas.

Safety stop overrides statistical sufficiency. Record `stopped_for_guardrail`; do not call the business hypothesis proven or disproven.

## After LIVE

1. Freeze the event window, timezone, product list, organic/paid object states, incident log, and data freshness.
2. Overlay traffic, retention, engagement, product actions, orders, operator actions, promotion/stock events, and policy/service events by segment.
3. Diagnose the first break: no traffic → weak entry → early exit → no product interest → checkout/order break → cancellation/refund/fulfillment/profit break.
4. Reconcile LIVE-attributed results with Product GMV Max and other ads without double counting.
5. Wait for refund/return and cost maturity before declaring a commercial winner.
6. Select one learning for the next comparable event; document fields held stable and expected evidence.

## Multi-event learning

Compare only events with declared similarity in market, audience promise, event length, day/time context, host, product/offer, stock, paid support, and operational capacity. If several fields change, label the result `directional` or `contaminated`.

Use a repeated-event table with event ID, hypothesis, material differences, primary/guardrail results, refund maturity, incidents, confidence level, and next decision. A single high-GMV event remains `case_only` without defensible comparison and contribution evidence.

## Stop and handoff

Stop or hold for policy/rights risk, misleading claim, product mismatch, dangerous demo, stockout, incorrect promotion, service overload, technical failure, approved loss ceiling, or unknown paid-object side effect. Provide the named operator with the evidence, object, timestamp, safest containment, and required approval. Do not restart a campaign or LIVE automatically.

For detailed Product/LIVE GMV Max reconciliation read [ads-measurement-and-experiments.md](ads-measurement-and-experiments.md). For Shop health read [shop-merchandising-and-health.md](shop-merchandising-and-health.md). For evidence sufficiency read [evidence-and-practitioner-method-admission.md](evidence-and-practitioner-method-admission.md).
