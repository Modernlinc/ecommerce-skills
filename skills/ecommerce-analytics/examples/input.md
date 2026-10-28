Synthetic demo data. No real customer, account, order, or advertising data is used.

# 五表合成核算（USD，2026-10-01，同一订单）

全部五表如下；复制本页即可取得题设，也可下载本目录的同名CSV。每表仅一条数据行，不需要真实账号或付费核算器。

## orders.csv

```csv
order_id,currency,gross_usd
DEMO-01,USD,100
```

## items.csv

```csv
order_id,cost_usd
DEMO-01,35
```

## refunds.csv

```csv
order_id,refund_usd
DEMO-01,10
```

## fees.csv

```csv
order_id,payment_fee_usd
DEMO-01,3
```

## ads.csv

```csv
day,spend_usd,platform_attributed_revenue_usd
2026-10-01,20,120
```

口径：orders为本例唯一订单的退款前金额；items的cost_usd是该订单已确认总商品成本，不是单价，退款后仍发生且无库存回收抵减；fees是退款后仍发生的支付费。五表均为本例USD范围，广告只给当日汇总，不提供订单级归因。

未给物流、税费、工资；不能按零补齐。平台归因收入与订单金额属于不同口径。

**任务**: 计算订单净销售额、已列成本后的订单贡献、扣本例广告支出后的范围贡献、平台ROAS；列出逐步算式。再假设支付费用证据撤回，说明哪些结果保留、哪些变为unknown。

[CSV字段说明与下载](data/README.md)

## 导航

版本：`0.1.1-public-demo` · [单文件试阅](demo.md) · [功能卡片](../SKILL.md) · [完成后看参考输出](output.md)
