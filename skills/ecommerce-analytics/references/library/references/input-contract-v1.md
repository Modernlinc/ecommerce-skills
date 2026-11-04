# 新输入合同 data-practical-v1

## 范围和权限

仅 UTF-8 CSV 五表，严格表头顺序见 `../templates/`。USD、两位金额、Asia/Shanghai 的 +08:00 自然日窗口 `[order_window_start, order_window_end_exclusive)`，两端为午夜且 start < end <= data_as_of；退款按 refunded_at <= data_as_of，不以退款发生日替代订单群组。每表最多1,000条、5MiB；合同与授权各64KiB。这是容量限制，不是已测性能承诺。

不支持任意ERP自动映射、XLSX输入、额外列、混币种、部分日费用推算、缺表、未知合同版本、URL/通配符、输入软链接/逃逸/交叠。空退款表可只有表头；未提供跟踪时 web_events_supplied=false 且第五表只有表头。订单、成本、广告至少有一行；缺证值与关联冲突按受影响指标保持未知，不为凑五表伪造业务行。

使用前由人和 Agent 核对来源及对象授权；程序回执只绑定执行对象。当前材料类别为 `original_safe`、`public_non_sensitive`、`authorized_business_non_sensitive`。真实客户/订单/银行/隐私及脱敏材料须读取前另取得 使用者 对象级许可及处理方案，不能用上述类别改标签放行；当前许可和验证不含这些对象。

## 路径和授权接口

P 为脚本上一级的包根，W 为显式 `--workspace`；互不包含。job/run/revision 为 `[A-Za-z0-9_-]{1,64}` 单段标识。合同必须位于 `W/jobs/<job>/inputs/<revision>/INPUT_CONTRACT.json`，五个 CSV 必须在同目录且同模板名。授权仅从 `W/authorizations/<job>.json` 读取，先核授权/包/宿主，再开合同和五表。授权字段：

```json
{
  "schema": "data-job-authorization-v1",
  "authorization_id": "具名授权ID",
  "workspace": "明确且规范的绝对W路径",
  "job_id": "本次job",
  "operation": "offline_csv_reconciliation",
  "material_class": "original_safe",
  "human_review": {"source_ref": "真实人类授权的可追溯引用", "reviewed_by": "实际核对者"},
  "package_version": "data-practical-v1.0.1",
  "package_manifest_sha256": "当前PACKAGE_MANIFEST.json的SHA256",
  "allowed_run_ids": ["本次允许的新run"],
  "inputs": [{"contract": "具名合同绝对路径", "files": {"order_lines": "绝对路径", "refund_events": "绝对路径", "ad_daily": "绝对路径", "order_costs": "绝对路径", "web_events": "绝对路径"}}]
}
```

这是字段说明，不是可直接提交的授权。用途由 operation 限定，除此之外无权；新对象须重新核对并绑定，不自动继承。完整文件哈希在获准读取后记录，不能把计算哈希当作读取许可。包清单列精确文件和版本；迁移 W 后需要新路径绑定。目标 run 必须不存在，输出独占创建。缺参、未知参、help 不扫描、不写入；路径或授权拒绝没有业务输出。

## 合同字段和类型

空模板保留所需字段，必须填写 dataset_id、窗口、截至日、三个导出完整性布尔、广告范围及定义；false 可保留局部结果，但不称完整总额。cost_definition 固定 `net_cogs_after_explicit_recovery_plus_fulfillment_and_payment_fee`。files 恰好包含五个模板文件名；不接 xlsx_file。

- T：文本 ID `[A-Za-z0-9_-]{1,64}`；前导零和大小写保留，不trim或数值化。T?可空。
- D：存在的 `YYYY-MM-DDTHH:mm:ss+08:00`；DAY：存在的 `YYYY-MM-DD`，原字面值保留。
- M?：金额列保留；空值未知，不是0。非空为0至1,000,000.00的无符号十进制，最多两位；无指数、千分位或空格。非法金额按相关 invalid/unknown 处理，不猜修复。
- Q：1至100,000整数。B：true/false。S?：最多500字符，可有逗号、引号、换行；遵循标准 CSV 转义，原始内容不执行公式。

note 为普通文本，`#N/A`、`#REF!` 等字面内容仍按原文保存；文本内容不等于公式错误。输入中的真实错误类型和未经授权的公式仍按原规则拒绝，计算结果中的真实错误仍阻断完成。

|表|完整有序字段|粒度与关系|
|---|---|---|
|order_lines|store_id T, order_id T, line_id T, sku T, ordered_at D, order_status T, currency T, quantity Q, line_gross M?, line_discount M?, order_gross M?, order_discount M?, shipping_charged M?, tax_charged M?, refund_history_complete B, note S?|store+order+line唯一；同订单父字段全行一致；行金额已含数量，不再乘quantity。|
|refund_events|store_id T, refund_id T, refund_line_id T, order_id T, line_id T?, refunded_at D, refund_status T, currency T, item_refund M?, shipping_refund M?, tax_refund M?, note S?|store+refund+refund_line唯一；同退款父字段一致；金额为互不重叠明细。非空line须属于该订单，且税/运费退款为0。|
|ad_daily|platform T, account_id T, campaign_id T, report_date DAY, currency T, spend M?, reported_conversion_value M?, note S?|平台+账户+活动+日期唯一；日消耗不与订单扩行连接，不按转化动作复制。|
|order_costs|store_id T, order_id T, currency T, net_cogs M?, fulfillment_cost M?, payment_fee M?, note S?|每订单唯一成本行；缺行/缺值分别报告；不含广告费。|
|web_events|event_id T, store_id T, source_platform T, source_scope T, action T, transaction_id T?, event_at D, currency T, value M?, note S?|event_id全表唯一；transaction可重复作诊断线索，不据此直接修改收入。|

广告至少一组具名 google_ads/meta_ads 的 platform/account_id/campaign_id；窗口内每个组合每天恰一行，零消耗明确0。每账户定义包括 platform、account_id、spend_date_basis=service_day、report_timezone=Asia/Shanghai、extracted_at（<=data_as_of）、export_complete（布尔），及 conversion_set_id/value_definition/attribution_window/value_date_basis 四项非空、最多500字符的语义。缺价值语义仅停对应 ROAS，已证消耗仍可用；跨账户语义冲突不强行合并。声明不等真实平台核验。

事件定义含 source_platform（google_ads/ga4_web）、source_scope、action、transaction_id_mapping=store_id_and_order_id、value_definition=order_item_net_before_refunds_ex_tax_shipping。事件比较范围与值含义必须明确，标签触发、传出、来源一致及平台收录分别证明。

## 唯一计算链与局部停止

原值→合同/关系守卫与整数美分准备→Artifact工作簿公式→保存→重开重算→原值/公式核对→诊断与快照。准备层不计算业务金额结果；只读库核值，修补仅五表原始区的值/类型，不改公式、缓存或其他XML。不使用第二金额引擎。

父订单金额核全行一致后取一次；退款前商品额为行 gross-discount 之和；多个真实退款按明细保留，净额再减有效商品退款。税/运费分列，净收取额=净商品额+净运费+净税。范围贡献=净商品额+净运费−净COGS−履约费−支付费−同期广告费；不是净利润、银行结算或财税结论。平台 ROAS=相同范围自报价值总额/费用总额，不平均行比率。

合格状态 paid/partially_refunded/refunded；pending/cancelled及明确窗口外可排除，资格未决不能当排除。settled且截至日前退款参与；pending/void或晚于截至日单列。孤儿退款保留并阻断相关完整净额/贡献；已知范围外退款不污染本期。退款不能超商品/税/运费对应金额，不能早于订单；重复明细、错误商品关联及组成缺失不自动合并或猜配。订单级未分配商品退款可影响订单净额，但SKU净额停止。

缺支付费只停该费用与贡献；缺/重复广告日报只停有关广告费、ROAS和贡献；事件差值不改收入。已知小计列可算、合格不可算、资格未决、排除和完整性；零可算集合不是金额0。数值和状态分列，未知 n.a.，真0保留。

主表 B6:B22 的17指标依次为：合格订单数、退款前商品额、已关联商品退款、已确认商品净额小计、完整商品净额、净运费、净税、净收取额、净商品成本、履约成本、支付费、广告费、范围贡献、Google ROAS、Meta ROAS、未归属退款数、订单未分摊商品退款；C列为状态。原五表数据从第7行开始，后方准备区与订单核算页保存公式链。

新修订须真实再运行。`--previous-run-id` 只读同job已完成、同一冻结包版本及 SHA-256 且快照哈希匹配的运行；窗口/截至日/定义不同标不可直接比较。异包或身份缺失以 `PREVIOUS_PACKAGE_MISMATCH` 安全拒绝，不凭版本名相同放行。包改变时作为独立运行，跨包差异解释须另行验证，本版不自动迁移或混合比较。脚本与数学边界变更须重新验证。方法来源、历史观察深度与适用限制见[方法来源与限制](method-sources-and-limits.md)；历史验证、生产自检、独立验收及真实项目结果不可互相替代。
