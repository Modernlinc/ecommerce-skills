# Evidence and practitioner-method admission

## Two permissions that must never be merged

- **Hypothesis/test-plan authorization:** approval to register a claim and design an offline or bounded test.
- **Live-action authorization:** approval for the exact account, publication, message, setting, budget, inventory, payment, data, or customer-facing action.

The first never grants the second. A safe test plan can still remain `offline_only` or `hold`.

## Evidence sufficiency card

Every material “winner,” “scale,” “stop for performance,” or company-method decision must declare:

```text
decision and business context:
unit of analysis and assignment:
primary metric and business meaning:
guardrail metrics:
baseline/comparator and window:
minimum meaningful effect or acceptable range:
estimated effect size:
uncertainty measure or interval:
business importance:
maximum approved loss:
conversion delay and observation maturity:
refund/return maturity:
allocation, exposure and spend balance:
multiple metrics/variants and selection rule:
missingness, interference and contamination:
predeclared looks/stopping rule:
replication evidence:
authorization state:
```

Do not prescribe one p-value, sample size, number of conversions, spend amount, or observation duration for every case. The detectable effect, baseline, variability, allocation, decision cost, error tolerance, delay, and maximum loss determine what is informative.

For a two-sample mean comparison, use a reference that directly matches that design: NIST's [two-sample t-test page](https://www.itl.nist.gov/div898/handbook/eda/section3/eda353.htm) separates paired/unpaired and equal/unequal-variance cases and names group sizes `N1` and `N2`. NIST's [sample planning for a process mean](https://www.itl.nist.gov/div898/handbook/prc/section2/prc222.htm) is narrower: it shows that alpha, beta, standard deviation and the target shift/precision delta matter for one-process mean planning. Neither page supplies a universal TikTok sample, duration, significance, or incrementality rule.

## Fixed-window and sequential decisions

### Fixed-window experiment

Before starting, define the unit, variants, assignment, primary metric, minimum meaningful effect, target uncertainty/error and power assumptions, sample/time window, delayed-outcome maturity, exclusion/missingness rules, and final analysis. Repeatedly peeking and stopping when a conventional p-value looks favorable invalidates the planned fixed-window interpretation.

### Optional-stopping-valid sequential method

Continuous or repeated looks are allowed only when the predeclared method supports optional stopping—such as a properly designed sequential test, always-valid p-value/e-process, or confidence sequence—and when the business stop/decision boundary is specified. Record every look and any operational change. A sequential label does not repair changing metrics, populations, variants, or allocation after observing results.

### Operational monitoring

Safety, policy, inventory, service, payment, rights, or maximum-loss monitoring is always allowed. A guardrail stop may occur before statistical sufficiency; label it `stopped_for_guardrail` and do not infer the treatment effect.

## Evidence levels

| Level | Allowed statement |
|---|---|
| `insufficient` | data cannot distinguish the decision; request evidence or continue only within safety/loss limits |
| `directional` | a pattern is visible but uncertainty, balance, delay, or contamination prevents a firm decision |
| `decision_ready_for_defined_context` | the declared decision rule is met for this market/object/window and business boundary |
| `replicated_in_context` | comparable repetitions support the same bounded decision |
| `contradicted` | qualified evidence conflicts with the hypothesis in the stated context |

Statistical evidence and business importance are separate. A precise tiny change may be commercially irrelevant; a commercially important estimate may remain too uncertain.

## Failure modes that force downgrade

- exposure or spend imbalance that makes variants non-comparable;
- conversion delay, cancellation, refund or return window not mature;
- changed price, promotion, Listing, stock, audience, placement, objective, event, attribution, or creative mix;
- selecting the best of many metrics/variants after seeing results without correction or a declared hierarchy;
- unit interference, repeat exposure, overlapping audiences, creator/organic/LIVE/GMV Max contamination;
- missing events, changed value/currency, browser/server duplication, timezone/window mismatch;
- stopping because a snapshot looks favorable under a fixed-window design.

Preserve platform-reported winner, refund-mature contribution winner, and incremental winner as three different outcomes.

### Required reversal example

If Variant A initially leads on attributed orders but later has materially higher refunds and lower contribution than Variant B, record:

```text
early_platform_result: A leads, directional only
refund_maturity: incomplete
final_business_result: B may lead after mature contribution
decision: do not scale A; repeat or choose B only if the predeclared business rule is met
```

## Practitioner-method admission

Creator, course, consultant, vendor, agency, case study, or historical operational advice is never a platform fact. For third-party sources entering formal method evidence, keep the publication cutoff `2024-08-01` unless the user explicitly changes it. Older/undated material may be recorded as history or a hypothesis, but cannot independently support a formal method.

### Practitioner card

```text
source person/channel and commercial ties:
content URL, publication date, review date:
market, account, product and platform object:
claim summary and observed workflow/evidence:
assumptions and possible mechanism:
official compatibility/conflict:
rights and prohibited elements:
reversibility, test cost and maximum loss:
primary/guardrail metrics, delay and maturity:
success/failure evidence and replications:
applicability boundary:
state and retirement trigger:
```

### State machine

```text
registered_untrusted
→ practitioner_hypothesis
→ conflict_and_safety_checked
→ test_plan_authorized
→ tested_contextually
→ replicated_in_context
→ cross_source_method
```

At any point, route to `case_only`, `retired`, or `rejected`. No practitioner method becomes `official_fact`.

A source can reach `practitioner_hypothesis` only when the claim is clear, safe, legal, reversible, measurable, compatible with current official rules, and bounded by cost/loss. `test_plan_authorized` requires an evidence card and named approver; executing any live action still requires separate authorization.

## Direct rejection and retirement

Reject rather than test: bought/stolen accounts; identity, location, payment or enforcement evasion; fake engagement/orders/reviews; scraping or bulk harassment; deceptive scarcity or claims; copied/lightly altered content without rights; guaranteed income/GMV/approval; hidden sponsorship; unauthorized customer data; or advice that conflicts with current official rules.

Retire or re-review when the platform object changes, the target market differs, the official rule conflicts, rights expire, the mechanism no longer applies, repeated qualified tests contradict it, the economic boundary changes, or the source's commercial interest makes its evidence unusable without independent corroboration.

## Current creator-source boundary

The current full-stack revision has two named YouTube teaching-creator candidates, but only at `creator_preflight` level:

- **Fernando Campos:** public metadata, descriptions or topic structure suggest Shop, affiliate/creator, fulfillment and profit-system coverage; commercial ties include HiveHQ and agency/services.
- **Chase Chappell:** public metadata, descriptions or chapters suggest TikTok Ads creative and Search Ads coverage; commercial ties include training/mentorship, agency services and promoted offers.

Each candidate has three registered public samples, but the evidence does not reproduce a complete input–decision–action–evidence–failure workflow. Status is therefore `creator_preflight_2_of_2 + DEFER_WITH_REASON`, not formal practitioner admission. Volume, revenue, budget, timeline, benchmark, automation and “winning” claims remain unadmitted. The portable [source limits](../provenance/limits.md) retain the samples' unadmitted status and date-field boundaries; internal source-level evidence is not included in this package; current TikTok facts still come from first-party TikTok pages, and statistical claims from primary statistical/research sources.
