# 商品价差完整示例｜既有成品适配，非本轮新调用

全部为原创合成。题面商品不等于真实账户证据。Approved的通用说明、本次指定组合资格与实际表现分开；未知展示不是零。价格草稿不代表上传/改价完成。

## 3. 完整合成输入

题目：为一个普通单件桌面收纳托盘判断当前 US × Shopping ads 路径为何不能直接进入投放准备，并交付一个可检查、可停止的优先动作。允许本地分析和草稿；不登录、不上传、不改价、不下单。

```json
{
  "fixture_id": "ADS-B2-DESKTRAY-01",
  "provenance": "synthetic_not_account_export",
  "business": {
    "merchant_alias": "DeskTray Example",
    "target_country": "US",
    "language": "en",
    "currency": "USD",
    "business_result": "paid_non_cancelled_order_after_reconciliation",
    "profit_limit": "UNKNOWN",
    "max_test_loss": "UNKNOWN",
    "conversion_reconciliation": "UNKNOWN",
    "account_permission": "none",
    "requested_work": "offline_single_product_diagnosis_and_repair_draft"
  },
  "product": {
    "id": "DT-01",
    "title": "DeskTray blue desk organizer",
    "type": "one_non_regulated_single_unit_no_variants_no_subscription",
    "link": "https://desktray.example/products/blue-tray",
    "owner_truth": {
      "version": "catalog-v2",
      "as_of": "2026-09-06T01:30:00+08:00",
      "unit_price": "24.00 USD",
      "availability": "in_stock",
      "minimum_quantity": 1,
      "promotion_or_membership_price": "none"
    },
    "submitted_data_snapshot": {
      "as_of": "2026-09-06T01:00:00+08:00",
      "version": "feed-v1",
      "id": "DT-01",
      "link": "https://desktray.example/products/blue-tray",
      "price": "19.00 USD",
      "availability": "in_stock"
    },
    "landing_snapshot": {
      "as_of": "2026-09-06T01:32:00+08:00",
      "http": 200,
      "sku": "DT-01",
      "visible_price": "24.00 USD",
      "visible_availability": "In stock",
      "structured_offer_price": "24.00 USD",
      "structured_offer_availability": "InStock"
    },
    "checkout_snapshot": {
      "as_of": "2026-09-06T01:33:00+08:00",
      "sku": "DT-01",
      "quantity": 1,
      "item_unit_price": "24.00 USD",
      "availability": "in_stock",
      "shipping_tax_and_final_total": "UNKNOWN",
      "purchase_performed": false
    }
  },
  "merchant_snapshot": {
    "as_of": "2026-09-06T01:40:00+08:00",
    "account_status": "no_account_block_in_fixture",
    "website_settings": "no_settings_block_in_fixture",
    "aggregate_product_status": "Limited",
    "data_source_methods": ["free_listings", "shopping_ads"],
    "combinations": [
      {"country":"US","method":"shopping_ads","status":"Not approved","issue":"price_mismatch_in_fixture","visibility":"not_showing","campaign_association":"UNKNOWN","listing_group":"UNKNOWN","impressions":"UNKNOWN","clicks":"UNKNOWN"},
      {"country":"US","method":"free_listings","status":"Processing","issue":"UNKNOWN","visibility":"UNKNOWN","campaign_association":"not_applicable","listing_group":"not_applicable","impressions":"UNKNOWN","clicks":"UNKNOWN"},
      {"country":"CA","method":"free_listings","status":"Approved","issue":"not_supplied","visibility":"UNKNOWN","campaign_association":"not_applicable","listing_group":"not_applicable","impressions":"UNKNOWN","clicks":"UNKNOWN"}
    ]
  },
  "other_unknowns": ["GTIN_or_MPN_applicability", "image_eligibility", "full_policy_eligibility", "actual_shipping_tax_configuration", "pmax_assets", "primary_conversion_readiness", "multichannel_landing_readiness", "actual_campaign_and_budget"],
  "actual_platform_objects_created": 0
}
```

这些时刻只表达合成证据先后。`.example` 地址未访问，未抓取商品站点；产品 ID 是题面标签，不是平台 ID。CA 行仅为题面给定的另一组合状态，未提供 CA 价格/页面/配送，不能据此评估 CA 经营可行性。

## 4. 实际诊断输出

### 4.1 商品事实差异

| 对象 | 提交快照 | 经营真值 / 页面 / 结账快照 | 结论 |
| --- | --- | --- | --- |
| id / 页面指向 | DT-01 / blue-tray | 同商品；题面 URL、SKU 相符 | 这组已给字段未见错配；不等于通过所有 ID/link 规范 |
| 单件价格 / 币种 | 19.00 USD | 三处均为 24.00 USD，经营真值版本更新 | 已确认旧 Feed 价格不一致；不能为迎合旧 Feed 把经营真值降为 19 |
| availability | in_stock | 经营真值、页面、结账相符 | 本次不改库存；不代表真实库存盘点完成 |
| 完整资格 | 只给上述字段 | 图片、标识条件、完整政策/税费/配送未知 | 不发全量合格结论；不补造这些字段 |

首要已证实异常是 **DT-01 的旧 Feed 价格与更新后的同商品经营真值不一致**。账户/设置在题面没有阻断，US × Shopping ads 另明确给出 price mismatch；不能据此反推任意真实商品的全部不展示原因。

### 4.2 国家 × 方法分路

| 组合 / 路线对象 | 单一主状态 | 已知与下一条件 |
| --- | --- | --- |
| US × Shopping ads 商品组合 | NEEDS_FIX | 题面为 Not approved 且存在已证实价差。先价格草稿；未回读新资格前不进入竞价决策 |
| US × free listings 商品组合 | UNKNOWN | Processing 只代表处理阶段；本例缺后续状态，不套固定处理时限，不改为 Approved |
| CA × free listings 商品组合 | UNKNOWN | 给定 Approved 标签，但本次经营/展示证据不足，且不是 US × Shopping 的资格证明；依总控裁决保留来源通用说明与本案表现的范围差别，UNKNOWN 不等于零展示 |
| Standard Shopping 路由卡 | NEEDS_RESEARCH | 只在 US Shopping 资格、Campaign 关联与商品包含关系均有证据，并完成本次经营/测量合同后，成为候选；不是现在应创建 |
| 带商品数据的 PMax 路由卡 | NEEDS_RESEARCH | 除上述组合，还需 Feed、素材、主要转化和多渠道承接就绪；本题未给这些事实，不比较收益、不选预算 |

不把 free listings 当广告系列，也不把 PMax 当 Merchant marketing method 的一个同级资格标签。此处只交路线条件；没有请求或交付完整 PMax 对象计划。报告主状态 `NEEDS_FIX` 来自实际价差，未来账户写入不是本次离线目标，故不把整份报告自动升为人工门禁。

## 5. 唯一优先动作：价格字段修复草稿

```json
{
  "draft_id": "ADS-B2-PRICE-DRAFT-01",
  "status": "DRAFT",
  "object": "DT-01 submitted product data",
  "operation": "proposed_replace_one_price_field",
  "preconditions": {
    "same_item_and_url": true,
    "expected_input_version": "feed-v1",
    "expected_old_price": "19.00 USD",
    "truth_version": "catalog-v2",
    "owner_truth_landing_checkout_price_agree": "24.00 USD"
  },
  "proposed_change": {"field":"price","from":"19.00 USD","to":"24.00 USD"},
  "unchanged": ["id", "link", "availability", "website_price", "inventory", "target_countries", "marketing_methods", "campaign", "listing_group", "budget", "bidding"],
  "upload_performed": false,
  "actual_write_performed": false,
  "approval_required_before_any_real_upload": true
}
```

交接给未来获授权商品资料负责人：只核这一个商品版本和价格。若价格已再次变动、出现优惠/会员条件、页面/结账不一致或商品 ID 不同，停止草稿，不用批量替换扩大影响。当前完成的是上述本地草稿，不是发给实际商家的消息，也不要求 使用者 此刻登录。

本地成功证据：拟改后价格与题面经营真值、页面和单件结账价格三方一致，其他字段无拟改动。实际成功证据须另授权后回读：商品 ID、数据源版本/更新时间、price、availability、US × Shopping 状态与问题、Visibility、Campaign/Listing Group、同一时间窗展示/点击。未获得实际回读前，资格和展示不得补写成功；改价也不证明有利润。

观察窗口：本地版本对照使用题面 01:00–01:40 +08；未来回读从实际处理完成的证据时间开始，由负责人按数据源更新节奏确定，未给时间就保持未知，不承诺 15 分钟或固定天数恢复。保持 Campaign、预算、竞价和页面不变。草稿回滚是撤回此提案；实际上传后的回滚必须根据届时经营真值另行批准，不能为了恢复旧版本重新提交明知错误的 19.00 USD。


来源为[商品价格规范](https://support.google.com/merchants/answer/7052112?hl=en)、[方法](https://support.google.com/merchants/answer/15130232?hl=en)、[目标国家](https://support.google.com/merchants/answer/12652277?hl=en)、[状态](https://support.google.com/merchants/answer/12488713?hl=en-GB)的既有2026-09-06选段；本轮仅15130232有2026-09-13限定刷新，不能用它代证完整国家/状态组合。官方首发unknown不再单独阻塞；未观察和账号资格仍未知。例子不是本轮新业务运行。

## 变体入口错配：先确认比较的是同一个商品

上面的DT-01是同商品旧Feed价；不能直接套到页面默认选中便宜兄弟款的情况。见[唯一变体合成输入与改稿](merchant-variant-repair.json)：input是合成输入，producer_output是制作方示范答案，不是账号导出或独立盲测。

题面A4的经营真值与Feed都是18 USD，两个通用入口却显示12 USD的A5。输出只为目标行的link/ads_redirect给old→new，保持A4价格、兄弟款及其他字段不变。候选路由的正确行为由题面给定，不是猜参数或真实访问。

检查改稿时核对目标行/源版本、两条旧值、候选路由依据、不改项和停止线。身份或路由缺证时只停止对应改稿；诊断可为NEEDS_FIX/NEEDS_RESEARCH，实际改动草稿为DRAFT。实际上传、页面/库存/价格业务决定、自动更新设置都另行授权。方法见[商品工作流](../references/workflow-and-templates.md)，事实与来源见[平台事实](../references/current-platform-gates.md)和[来源登记](../references/source-register.json)。
