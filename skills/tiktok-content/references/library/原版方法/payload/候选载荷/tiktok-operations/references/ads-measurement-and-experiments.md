# Ads, measurement, and experiments

This reference owns advertising-object selection, Website measurement, Smart+/Spark/Search, Product/LIVE GMV Max, profitability, attribution, and experiment boundaries. For ordinary Campaign → Ad Group → Ad delivery, audience/placement/catalog controls, fatigue, and the delivery diagnostic tree, read [ads-delivery-and-diagnostics.md](ads-delivery-and-diagnostics.md). For evidence sufficiency, fixed-window versus optional-stopping-valid sequential methods, and practitioner hypotheses, read [evidence-and-practitioner-method-admission.md](evidence-and-practitioner-method-admission.md).

## Choose the advertising object first

Do not use “Shop Ads” as a catch-all. Route the request to one named object before choosing settings or interpreting results:

| Object | Required inputs | Measurement and result boundary |
|---|---|---|
| ordinary TikTok Ads Manager campaign | objective, market, destination, target event, Pixel/Events API state, creative rights, audience/placement controls, loss ceiling | Campaign → Ad Group → Ad delivery and the selected event; downstream order quality and contribution still require business data |
| upgraded Ads Manager Smart+ | the same business and measurement inputs plus signal quality, asset supply, required exclusions, placement/brand-safety controls, and need for a clean test | automation may change delivery, combinations, audiences, placements, and budget allocation; read back what actually ran before comparing results |
| Spark Ads creative route | own or creator post, post owner, authorization evidence/scope/expiry, content rights, disclosure, objective eligibility | engagement remains attached to the original post; authorization is not ownership or permission to publish/spend |
| Search Ads campaign | expressible search intent, keyword/query plan, keyword–creative–destination continuity, route availability | search terms, negatives, delivery, target event, and business outcome; current product guidance must not become a universal threshold |
| Product GMV Max or LIVE GMV Max for TikTok Shop | eligible Shop/product or LIVE, authorized content, inventory/fulfillment, contribution boundary, baseline and organic/affiliate context | TikTok Shop total-channel attribution; it is not the same object or attribution contract as ordinary Ads Manager Smart+ |

If the market, account, objective, feature availability, or current controls have not been observed from an authorized source, mark them `unknown`. An offline draft may specify an intended `PAUSED` state, but it is not a campaign object created in Ads Manager.

## Website measurement admission

Before diagnosing or drafting a website-conversion route, record:

- one target event and its business role;
- Pixel, Events API, or both, including the implementation evidence actually available;
- event value and currency definitions;
- browser/server event identity and deduplication status when both paths are used;
- destination continuity, consent/privacy boundary, attribution window, timezone, and data freshness.

Presence of a Pixel or Events API is not proof that measurement is usable. If event value, currency, triggering, or deduplication is unresolved, block performance and scale conclusions, name the exact missing evidence, and continue only with a measurement-fix proposal.

## Attribution Analytics interpretation

The public TikTok help page reviewed on 2026-09-04 (page label: updated May 2025) describes Attribution Analytics as a place to compare attribution windows and inspect click-through versus view-through after-actions, time to conversion, touchpoints, and assisted conversions. Use those only as attribution-path diagnostics.

Keep three conclusions separate:

1. **platform attribution** — what the selected window and report assign to a campaign or touchpoint;
2. **finance contribution** — refund-mature net revenue minus all relevant variable costs;
3. **incrementality** — what likely changed because of the advertising, established through a defensible comparison.

The report does not prove account availability, causality, retained revenue, contribution profit, or creative effectiveness. If the feature is not visible in an authorized account, the event identity/window is unclear, refunds or fees are immature, or no comparable baseline exists, return `unknown/hold` and do not use the report to change budget. Recheck the current official page and actual account surface before execution.

## Manual, partial, or full Smart+ decision

First refresh the current official flow and verify what the target account and objective actually expose. Then select the least-automated route that can answer the business question:

- prefer **manual control** when the purpose is clean learning, a specific exclusion, one creative/text pair, separate events or bids, selected placements, or strict brand-safety control;
- consider **partial automation** when some delivery assistance is useful but named audience, placement, creative-combination, budget, or test controls must remain fixed;
- consider **full automation** only when the target event and measurement are reliable, asset supply is sufficient, required exclusions are limited, automated placement is acceptable, and the operator can read back delivery and conversion quality.

Budget follows the approved loss ceiling, contribution economics, conversion delay, and number of simultaneous hypotheses. Do not generalize a platform or practitioner budget multiple. Record automation as a testable choice, including the actual audience, placement, asset combination, spend, event, order-quality, and contribution readback needed to keep or reverse it.

Stop or hold when the feature is unavailable, current controls are unknown, measurement is not ready, a required exclusion or brand-safety constraint cannot be preserved, delivery prevents a comparable test, or the approved loss ceiling is reached.

## Creative experiment contract

Use two distinct contracts:

1. **Concept test** — compare materially different customer situations, problems/desires, proof paths, or creative concepts. Keep the objective, offer, destination, target event, and economic boundary comparable where possible. The result chooses a direction; it does not identify one isolated causal element.
2. **Variable test** — hold the concept and all declared frozen fields stable, then change one primary element such as Hook, first proof, format, CTA, audience, placement, or bid treatment.

For either contract, record the hypothesis, variants, frozen fields, primary business outcome, diagnostic metrics, observation window, maximum loss, rights, and stop condition. Early attention, view, click, and comment metrics locate a possible break; they do not independently select a business winner.

When automatic delivery produces materially different exposure, spend, audiences, placements, or creative combinations, label the comparison `delivery_contaminated` and downgrade it to directional. If a current TikTok Split Test can isolate the intended variable and is available to the account, it may be proposed. A platform-declared winner still must pass retained-order, contribution-profit, fulfillment, and claim-quality review.

## Spark and Search admission

- For Spark Ads, verify the post owner, creator identity, authorization scope and expiry, content/music/person/trademark rights, commercial disclosure, objective eligibility, and brand safety. A public post or authorization code alone does not clear all rights.
- For Search Ads, verify current availability, search intent, keywords/match approach, search terms/negatives, and keyword–creative–destination continuity. Platform-recommended learning periods, event/click counts, and budget ratios are dated product guidance for the stated objective, not durable company defaults.
- Missing eligibility or authorization returns `hold` or `unknown`; it does not trigger a login, account read, draft write, budget change, or publication.

## Current TikTok Shop GMV Max interpretation

As of the 2026-09-04 official review:

- the current comparison page states that GMV Max became the default and only supported TikTok Shop Ads campaign type from July 2025; this does not prove migration or availability for every market/account;
- Product GMV Max can use authorized organic and affiliate assets and optimize organic plus paid delivery;
- while active, relevant orders for selected products can be attributed to GMV Max even without an ad click/view;
- dashboard ROI is gross revenue divided by ad cost under TikTok's reporting definition, not retained profit or necessarily incremental ad return.

The 2025 course batch independently reinforced this boundary: course screenshots and verbal ROI examples may illustrate a workflow, but do not establish incrementality, contribution profit, or a transferable target. Treat any natural, affiliate, or LIVE overlap as a measurement input rather than crediting all reported GMV to paid media.

The stable canonical URL is the evidence identity; requested URLs with language or tracking parameters are access records only. Reverify before use:

- [About Product GMV Max](https://ads.tiktok.com/help/article/about-product-gmv-max?lang=en-GB)
- [About attribution for GMV Max](https://ads.tiktok.com/help/article/about-attribution-for-gmv-max?lang=en)
- [GMV Max account authorization](https://ads.tiktok.com/help/article/how-to-request-gmv-max-authorization-for-tiktok-accounts?lang=en)
- [Product GMV Max reporting](https://ads.tiktok.com/resources/help/article/how-to-see-reporting-for-your-product-gmv-max-campaign)
- [About LIVE GMV Max](https://ads.tiktok.com/help/article/about-live-gmv-max?lang=en)
- [Differences between LIVE Shopping Ads and LIVE GMV Max](https://ads.tiktok.com/resources/help/article/differences-between-live-shopping-ads-and-live-gmv-max-campaigns?lang=en)

### Product GMV Max object card

Keep this object visible and separate from LIVE:

| Field | Required meaning |
|---|---|
| selected products | the exact eligible products included in this Product campaign |
| platform revenue denominator | total **non-LIVE** GMV for the selected products under the current TikTok reporting definition |
| campaign state and window | observed status, reporting/attribution window, timezone, and data freshness |
| organic/affiliate overlap | same-window organic and affiliate activity that may appear in platform attribution |
| account availability | `account_observed` only after an authorized, timestamped readback; otherwise `unknown` |
| business interpretation | platform attribution is reported separately from retained contribution and from incrementality |

`non-LIVE baseline` is not an assumed in-run “outside GMV Max” traffic bucket. Build it before Product GMV Max starts, or through a separately designed comparable time window, product group, or market group. Platform attribution is report assignment, not a causal counterfactual. If comparability, interference, or sample sufficiency is weak, keep incrementality `unknown` and do not claim lift or scale readiness.

### LIVE GMV Max object card

Keep this object visible and separate from Product:

| Field | Required meaning |
|---|---|
| selected liveroom/event | the exact eligible LIVE event, host/account, and event window |
| platform conversion denominator | conversions occurring **in the selected LIVE event**, across the shops included by TikTok's current all-shops reporting definition |
| post-exit exclusion | a purchase made after the viewer leaves the LIVE room is not attributed to LIVE GMV Max under the 2026-09-04 official review |
| campaign state and window | observed status, event/reporting window, timezone, and data freshness |
| account availability | `account_observed` only after an authorized, timestamped readback; otherwise `unknown` |
| business interpretation | in-room platform attribution is reported separately from retained contribution and from incrementality |

### Same-window attribution and lifecycle reconciliation

Use one row per order or reportable event when Product and LIVE are adjacent. Do not add Product and LIVE dashboard totals and call the result incremental revenue.

| Field | Record |
|---|---|
| order/event key | a privacy-safe join key or `unknown`; do not expose customer data in a reusable Skill artifact |
| selected product and liveroom | whether the product was selected for Product, and whether the conversion occurred in the selected LIVE room |
| platform attribution owner | Product, LIVE, another platform object, unresolved, or excluded; preserve the platform definition and window |
| dedup status | confirmed unique, duplicate/conflicted, or `unknown`, with evidence |
| finance contribution | refund-mature net revenue and all variable costs under one currency/window |
| incrementality | holdout or another defensible comparison; otherwise `unknown` rather than inferred from platform attribution |
| concurrent object | any adjacent Product, LIVE GMV Max, or legacy LIVE Shopping Ads object observed in the same account/window |
| lifecycle side effect | object auto-paused, manual restart required, unchanged, or `unknown` |
| readback | market, account, object ID/status, source, timezone, and timestamp obtained under explicit authorization |

The 2026-09-04 official review says an active LIVE GMV Max campaign may automatically pause existing LIVE Shopping Ads for the same official account, and those legacy campaigns do not automatically restart when LIVE GMV Max ends. Treat `manual restart required` as an operator handoff and approval requirement, not permission for the agent to restart anything. Official pages also contain migration-period tension between “GMV Max only supported” wording and instructions that still describe LIVE Shopping Ads creation. Therefore the current market/account object inventory remains `unknown` without authorized readback.

### Required adjacent cases

1. **Purchase inside the selected LIVE room:** assign the platform report to LIVE under the current in-room/all-shops definition; do not also count it as Product. Calculate finance contribution separately and leave incrementality `unknown` without a valid comparison.
2. **Purchase after leaving the LIVE room:** exclude it from LIVE. Assigning it to Product additionally requires a selected product, matching active window, and actual platform readback; otherwise the Product owner is `unknown`.
3. **LIVE GMV Max beside legacy LIVE Shopping Ads:** record the observed concurrent object and any automatic pause. At the end, flag `manual restart required`; without separate account-action authorization, stop at notifying the responsible operator.

## Pre-spend gate

Before recommending a live campaign, require:

- an eligible account/objective and, for a Shop route, eligible product or LIVE plus healthy fulfillment/support;
- accurate listing and compliant, authorized creative;
- baseline period and current organic/affiliate activity;
- break-even contribution boundary;
- campaign objective, products, market, observation window;
- budget ceiling, stop condition, and named human approver;
- metric definitions and known attribution limitations.

No plan, draft, or course example authorizes spend.

## Economic planning boundary

Use a reconciled, refund-mature net-revenue base, all non-ad variable costs, and the same currency, window, and product/order scope. For the fixed-input planning identity below, require N > 0 and C > 0; the revenue/spend ratio additionally requires A > 0.

```text
N = net revenue after discounts/refunds (refund-mature)
C = pre-ad contribution = N - all non-ad variable costs
m = pre-ad contribution margin = C / N
A = ad spend
R_N = company-net revenue/spend ratio = N / A
post-ad contribution = C - A
break-even company-net ratio = N / C = 1 / m
C - A >= 0 iff A <= C iff R_N >= N / C   (N > 0, C > 0, A > 0)
```

N / C is a break-even floor for the company-net ratio, not a ROAS ceiling. C is the corresponding break-even ceiling on ad spend only for these fixed inputs; it is not an approved budget or a forecast that revenue/contribution will stay fixed when spend changes. Equality means zero post-ad contribution, not full-business profit or evidence of advertising lift.

When N <= 0 or C <= 0, do not turn the reciprocal into a usable positive-spend target: return hold for that target and inspect the revenue/cost basis. With C <= 0, any A > 0 makes C - A negative. With A = 0, N / A is undefined; report contribution separately, not an infinite or successful advertising return. Invalid/missing spend or an unreconciled basis also blocks the ratio comparison.

Keep R_N separate from platform metrics. TikTok Shop Ads reporting defines ROAS (Shop) using attributed gross revenue and ad spend, not this company's refund-mature net-revenue numerator. Do not compare that dashboard number directly with N / C. First reconcile the revenue basis, attributed order/object scope, currency, reporting window and ad-cost definition; otherwise hold the comparison. [Shop Ads reporting](https://ads.tiktok.com/resources/help/article/view-shop-ads-reporting?lang=en) (page label: updated August 2025; selected reporting definitions observed by the controller on 2026-10-19, not a producer account readback). This limited definition is not evidence for every dashboard or GMV Max object; reverify the applicable definition when used.

This planning identity does not prove that a reported campaign is profitable or incremental. Immature refunds or missing costs prevent a usable break-even target. Revenue not demonstrated to be incremental, or a dashboard mixing organic/affiliate orders with paid attribution, cannot support an ad-effect or scale conclusion merely because a ratio clears the floor. Audit spreadsheet formulas before using them; several source templates labeled profit divided by cost as "margin" or referenced the wrong fee cells.

## Measurement layers

| Layer | Examples | Question |
|---|---|---|
| delivery | cost, impressions, asset/product delivery | did the system spend and where? |
| response | clicks, product views, video engagement | did the audience understand and act? |
| commerce | orders, gross revenue, AOV | did attributed buying occur? |
| quality | cancellation, refund, rating, fulfillment | were orders retained and served? |
| economics | ad + affiliate + discounts + product + logistics + returns | did value remain after controllable costs? |
| incrementality | baseline, holdout, geography/time/product comparison | what likely happened because of paid delivery? |

Use the current account's definitions. Do not silently combine GMV, net revenue, gross profit, and contribution profit.

## Diagnostic sequence

1. Verify date range, timezone, currency, attribution window, selected products, and campaign state.
2. Check authorization and whether creatives/products are actually eligible and delivering.
3. Separate campaign, product, creator, and creative evidence.
4. Check organic, affiliate, promotion, inventory, and price changes during the same window.
5. Compare dashboard ROI with contribution economics.
6. State what cannot be attributed incrementally.
7. Choose one bounded change; do not change target ROI, budget, products, and creative together.

## Exploration, validation, and scale

Separate campaigns by decision purpose, not by a copied course naming convention:

- **exploration**: use a pre-approved loss ceiling to test whether product, creative, and audience signals exist;
- **validation**: require enough observations to compare contribution economics, refunds, and fulfillment—not only gross orders;
- **scale**: expand only after the result remains inside the approved economic and operational boundary.

For every change, record the previous value, the evidence that triggered the change, the expected signal, the observation window, and the stop condition. A course claim such as “wait 72 hours,” “never pause,” or “use one fixed local-currency budget” is a source opinion, not a reusable rule.

## Decision card

```text
Observed fact:
Source and window:
Business/economic boundary:
Attribution caveat:
Hypothesis:
One change:
Expected leading signal:
Budget/capacity ceiling:
Stop condition:
Approval required:
```

Reject universal rules such as “raise bid after 3 hours,” “stop after $3 without an order,” “set ROI to 5,” or “budget equals a fixed multiple” unless a current official recommendation and the user's economics both support that exact case.
