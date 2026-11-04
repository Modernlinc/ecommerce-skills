# Business Center and asset governance

## Governance boundary

Use this reference to design an offline asset, permission, partner, finance, and incident-control plan. It never authorizes creating a Business Center, connecting or transferring an asset, inviting/removing a member or partner, changing Finance permissions, logging in, or storing credentials.

Business Center roles, asset types, permission labels, account relationships, and available controls change. Verify the current official documentation and the exact authorized account view before an action plan becomes executable.

## Asset map

Build one row per governed object:

```text
asset_id/type/name:
legal/business owner:
market/business center:
operational purpose:
data sensitivity:
dependencies:
current admins/operators/partners: unknown until authorized readback
minimum required access:
finance/payment capability:
credential or token owner: named role only, never the secret itself
last review and evidence:
incident/recovery owner:
offboarding condition:
```

Include relevant Business Centers, ad accounts, TikTok accounts, Pixels/datasets, catalogs, Shops, creator/project assets, apps/integrations, payment/finance objects, and agencies/partners. Do not assume that a Shop, ad account, TikTok account, and dataset belong to the same Business Center.

## Least-privilege decision

For each person or partner, define:

- business role and named work outcome;
- exact asset and minimum task permission;
- duration and review/expiry date;
- who can approve assignment, finance, transfer, or deletion;
- prohibited capabilities and data;
- onboarding and offboarding evidence.

Separate where feasible:

1. business administration from day-to-day operation;
2. finance/payment control from media buying and analysis;
3. data-source administration from reporting use;
4. creative/creator access from catalog, Shop, and customer/order access;
5. approval from execution and independent review.

A role name is not evidence of least privilege. Inspect the current asset-level permission and inherited access.

## Join and leave workflow

### Onboarding

1. Confirm legal counterparty, business purpose, owner, asset list, minimum permission, and expiry/review date.
2. Check contract, privacy/data use, creator/content rights, incident contact, and separation of duties.
3. Prepare the requested permission diff and rollback plan.
4. Obtain explicit authorization for the live invitation/assignment.
5. After execution, read back membership and asset-level permissions; record only non-secret evidence.

### Offboarding

1. Freeze the exact person/partner and every inherited/direct asset relation.
2. Preserve required work products and audit evidence without copying customer data or credentials.
3. Reassign business ownership and operational continuity before removal.
4. Obtain explicit authorization and remove/revoke only the approved relationships.
5. Read back residual access, tokens/integrations, finance authority, pending campaigns, creator rights, and incident state.

Partner removal does not automatically prove every user, token, app, pixel, catalog, Shop, or direct account access was removed.

## Permission review matrix

| Scenario | Safe offline output | Required stop |
|---|---|---|
| analyst needs reporting | asset and read-only permission proposal, data-minimization note | live invite or account read without approval |
| agency launches approved ads | object/asset map, term-limited access proposal, spend/approval separation | broad admin/finance access without need |
| creator supplies Spark post | content and ad-authorization map | treating creator authorization as BC access or ownership |
| finance reconciles invoices | finance task/approver separation | storing card/bank data or giving operations unnecessary finance power |
| partner exits | complete revocation checklist and continuity owner | destructive removal before scope and ownership are resolved |

## Incident response

When unauthorized access, wrong asset connection, unexplained spend, data exposure, or ownership ambiguity appears:

1. stop further changes and identify the exact affected objects;
2. preserve timestamps and non-secret evidence;
3. notify the named security/business/finance owner;
4. propose containment and recovery actions with blast radius and rollback;
5. obtain required authorization for any removal, pause, rotation, transfer, payment, or live configuration;
6. verify post-action access and adjacent objects independently.

Never put passwords, verification codes, access tokens, API keys, card/bank details, customer data, or raw employee records into a reusable Skill artifact.

For campaign objects read [ads-delivery-and-diagnostics.md](ads-delivery-and-diagnostics.md); for creator project and Spark rights read [creator-collaboration-objects.md](creator-collaboration-objects.md); for universal authorization gates read [compliance-and-approval-gates.md](compliance-and-approval-gates.md).
