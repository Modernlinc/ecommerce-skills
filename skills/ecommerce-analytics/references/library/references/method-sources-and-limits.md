# 方法来源与适用限制

本产品按[输入合同](input-contract-v1.md)处理获准的五表CSV。指标定义、订单与商品粒度、退款组成、费用归属、局部未知和公式关系以该合同为准；经营公式是明确的公司核算设计，不是平台官方会计、财税或收益标准。

## 来源贡献与观察边界

下列信息承接历史来源映射记录，历史核验日为2026-10-11。本次封装没有重新访问来源；日期、观察深度和适用限制均为历史登记，不表示当前平台规则已重新核验。

|来源|对方法的贡献|历史观察与限制|
|---|---|---|
|[GA4 transaction ID](https://support.google.com/analytics/answer/12313109?hl=en)、[Google Ads transaction IDs](https://support.google.com/google-ads/answer/6386790?hl=en)|区分交易关联、去重对象及平台诊断范围|历史记录为全文正文观察；首次发布日期未知。不能把不同平台、数据流或转化动作的范围合并为一个通用去重保证。|
|[GA4 ecommerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)|提供购买/退款事件字段及交易关联的来源线索|历史为节选观察，不称整页学习完成；事件说明不能证明本产品的成本或利润定义。|
|[Google Ads discrepancies](https://support.google.com/google-ads/answer/7457111?hl=en)、[Different conversion values](https://support.google.com/google-ads/answer/13064208?hl=en)|提醒检查报告日期、归因、动作与价值口径|历史记录为全文正文观察；首次发布日期未知。没有执行真实账户设置，不将历史表述当所有导出或行为的默认规则。|
|[Microsoft merge](https://learn.microsoft.com/en-us/power-query/merge-queries-overview)|合并键、数据类型和连接基数的参考|历史记录为全文正文观察；未运行Power Query，不能将文档阅读视为软件实操验证。|
|[Analytics Mania conversion tracking视频](https://www.youtube.com/watch?v=YNvOZVP3xcE)|检查实际传值的工作流线索|历史登记发布于2026-01-27，仅阅读provider代表段报告，未直接观察原始声画；不是完整视频学习，有课程推广利益，不作退款/成本证明。|
|[Luke Barousse data analytics视频](https://www.youtube.com/watch?v=8qWtU51lxpM)|规划、类型/时间粒度、扩行和报告对证的工作流线索|历史登记发布于2024-11-20，阅读返回字幕但未直接观察原始声画；不是电商实证，有affiliate披露。不采用旧价格/UI、省时或效果承诺。|
|[Analytics Mania重复事件文章](https://www.analyticsmania.com/post/duplicate-events-in-google-analytics-4-and-how-to-fix-them/)、[Luke Excel课程仓库](https://github.com/lukebarousse/Excel_Data_Analytics_Course)|只保留曾检查过的补充线索|历史仅处置抽样，日期或材料许可未充分证明；不以其详细方法、代码、练习或课件作为本产品当前依据。|

来源线索不直接等于公司规则或实际效果。公司合同把它们限定为可核对的输入、公式、结果来源和停止条件；没有证据支持的策略效果、收入保证和推广话术不进入本产品。使用当天若需要判断平台规则或真实账户行为，应另核当时适用的官方原文。

两条视频及GA4 ecommerce的整源仍属未完整例外；provider报告、返回字幕与节选不计原始声画完整学习。

## 实际执行与验证范围

本产品提供当前程序、空模板和使用说明，不提供历史样例答案或制作方检查脚本。新数据须按[开始使用](../00_开始使用.md)完成具名授权，真实生成工作簿、诊断和快照；不能把模板存在或文件能打开当运行成功。

当前算法已有原创安全资料的本地执行记录；本次封装不自动产生新的独立验收结论。具体包的运行情况以其包身份对应的实际新运行回执为准。新包哈希变化后，旧包运行不能作为直接比较的previous-run；两次直接比较须使用同一冻结包，并继续满足窗口及口径条件。

原生Excel/WPS、第二台Mac、真实账户采集、真实客户效果和公开发布没有由本次封装得到验证。当前首版需要具备约定运行时的macOS Apple Silicon本地Codex；普通文件可移动不等于免依赖、免授权或任意设备可运行。依赖不兼容时停止，不自动安装或随包搬运依赖。

## 材料与权利边界

本说明只用自写摘要说明来源贡献，不包含付费正文、完整字幕、原画面、历史业务文件或第三方练习代码。公开链接不代表取得其材料或代码的商业再分发许可；本次封装不新增任何第三方授权，也不作可商用保证。未经授权的材料、客户隐私、账号和密钥不进入产品。

离线核算不执行广告预算、支付、退款、库存、账号连接、生产配置或发布。需要这些动作、真实客户数据或超出合同的新功能时，先取得对应授权，不以本包存在或本地验证代替。
