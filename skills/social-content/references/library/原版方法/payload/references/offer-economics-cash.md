# 商品 Offer、声明范围余量与现金

本路径是明确输入的候选判断和原创算式合同，不是课程方法准入或财务意见。

先写“谁在什么场景解决什么问题”，将提供的访谈/评论限制在实际样本内。列商品能证实的事实、现有替代和用户选择条件。没有竞品数据时只列用户已给的替代，不编市场份额/优势。Offer 至少交商品、购买条件、证据、限制、页面应解释的内容及进入下一准备阶段的条件。未知价格/履约/退货承诺不能补成普遍规则。决定可准备哪些内容和哪些还不能给顾客保证。

经济：先锁币种、单位、期间和收入基数，逐一列收入已扣项、尚未扣项、未知项。同一项不得双扣，口径冲突时停对应计算。只对明确声明范围求收入基数减追加成本；完整范围之外的固定费用/税务等未提供时，不称净利润。成本记录为净已含还是未来预测由输入方明确，不自行决定会计确认。情景用输入给定独立值，说明改变什么、没变什么；不能把“改善情景”写成实际转化改善。

现金：单独期初、带时点与收支方向的事件、已到账/预计状态、最低保留线。逐笔计算含期初的最低值与缺口；预计收入后到，不修复此前缺口。缺事件金额后余额未知，保留之前能算的部分。给具体需要核对的时点和数据，不决定支出/融资。

## 明确计算接口

从包根运行 `python3 scripts/calculate.py --stdin`，通过标准输入提供一个JSON；无文件写入。空参数/未知参数/--help安全退出。金额用十进制字符串或null，币种用同一三字母代码。不支持汇兑、税法、估计成本或自动补数据。实际完整输入见 [经营综合任务](../examples/operating-review/INPUT.md) 的唯一 JSON 块。

顶层 currency 必填，至少选 scenarios/cash/ratios 一项。scenarios 每项字段：id、scope（单位/期间）、basis（收入净额口径/预测依据）、currency、revenue、included（已扣component列表）、required_components（本次声明口径全部component）、costs（component/amount列表）。included 与 costs 身份不可重复，costs不得含未声明项；null或遗漏成员导致partial。known_cost_remainder只减已知追加成本，declared_scope_remainder在缺项时null。缺成本金额可计算已知余量，不能推完整贡献。脚本不识别同义项，Agent应先核名称/包含关系，不能通过改名绕过重复扣。

cash：scope、basis、currency、coverage（complete/partial指声明事件覆盖）、opening、reserve、events。每事件 id、at（严格递增UTC秒时间）、direction（in/out）、amount、state（observed/forecast）；相同时点要先取得可解释顺序，不能擅改秒数制造顺序。null向后传播。现金输入完整不代表覆盖真实账户所有现金流。

ratios 每项 label、basis、numerator、denominator；只做非负数描述性除法。分母0或缺失返回unknown，保留分子分母，不能验证归因或因果。28位有效数字；金额计算精度100，单数字至多30位。非法数、缺口径、混币种、重复、逆序拒绝整次调用；修正真实输入后重跑，不删异常凑结果。

交付：Offer进入条件；基础/压力/改善的明示变化与算式；充分/不足各自范围；现金逐时点表；一个优先下一证据。金额不充分时仍可执行 [创意](creative-brief.md)。
