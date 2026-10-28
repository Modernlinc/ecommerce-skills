Synthetic demo data. No real customer, account, order, or advertising data is used.

# 五表合成核算（USD，单日，同一订单）
orders: order_id,currency,gross_usd → DEMO-01,USD,100
items: order_id,cost_usd → DEMO-01,35（本例确认退款后仍发生这笔成本，无库存回收抵减）
refunds: order_id,refund_usd → DEMO-01,10
fees: order_id,payment_fee_usd → DEMO-01,3（退款后仍实际发生）
ads: day,spend_usd,platform_attributed_revenue_usd → 2026-10-01,20,120
假设：订单与广告仅属于本演示范围；未给物流、税费、工资。请算订单净销售额、已列费用范围贡献、平台ROAS；再说明支付费用证据撤回后的影响。
