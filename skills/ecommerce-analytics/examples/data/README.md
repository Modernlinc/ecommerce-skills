# 五表CSV与字段说明

版本：`0.1.1-public-demo`。原创合成数据，金额均为USD；场景为2026-10-01唯一订单DEMO-01。UTF-8、逗号分隔、每表一个数据行，金额为非负数字；不能把空值当零。

|文件|行粒度与字段含义|关联与边界|
|---|---|---|
|[orders.csv](orders.csv)|order_id：订单标识；currency：币种；gross_usd：退款前订单金额|本例仅DEMO-01，USD|
|[items.csv](items.csv)|order_id；cost_usd：该订单已确认总商品成本|非单价；退款后仍发生，无库存回收抵减|
|[refunds.csv](refunds.csv)|order_id；refund_usd：已列退款金额|与同订单关联|
|[fees.csv](fees.csv)|order_id；payment_fee_usd：退款后仍发生的支付费|证据撤回时整个费用结论未知|
|[ads.csv](ads.csv)|day：日期；spend_usd：当日支出；platform_attributed_revenue_usd：平台报告归因收入|当日汇总，不可按订单标识强行连接，也不等于订单净销售|

任务与口径以[合成输入](../input.md)为准；CSV只将相同题设提供为可复制格式，不是任意ERP导入规范。无汇率转换、生产连接或自动核算程序。

[单文件试阅](../demo.md) · [参考输出](../output.md)
