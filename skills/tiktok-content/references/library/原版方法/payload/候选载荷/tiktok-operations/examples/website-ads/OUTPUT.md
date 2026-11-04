# WEB-01：TidyWay 网站普通 Ads 离线经营工作包

2026-09-06；制作方顺序生产示例，非独立新手盲测、非平台执行。
输入：[WEB-01-v1](INPUT.md)。所有商品、角色、事件、金额及权限均为原创合成数据。
状态：`OFFLINE_DRAFT_COMPLETE_WITH_EXECUTION_BLOCKERS`；这是 TK-PACK-02 未融合增量，旧 manifest 不覆盖本文。

## 1. 给委托人的结论

先交付一套以 **Manual 普通网站广告**为主的可审文字方案，卖点限于“把日常小物集中收纳”，落点为沙色单只拉链包，29 USD，运费结账核定。不能沿用“防水、25美元、免运、适配所有设备”的旧稿，也不能把它作为实验对照。

下一项经营工作是让测量丙核清支付触发、金额单位、币种和事件身份，再由财务己核清同群成本。当前既不能判断创意胜负，也不能启动或扩大支出：成熟退款口径下，12单在已知成本范围的差额为 **−40 USD**，且客服人工仍缺失。未来400 USD只是未批准意向，不是预算。

以下交付是完整离线内容，不是“已创建但暂停”的平台对象。Manual、Smart+、Spark、Search各自具备的草稿和阻断见第4节；主路径写完不代表其他路径准入。

## 2. 商品—Offer—落点合同

| 字段 | 本案采用 | 核对责任及阻断 |
|---|---|---|
| 商品 | TidyWay / PCH-SAND，沙色；每销售单元1只拉链包 | 商品甲核真实商品与变体；无实物，本报告不证明真实性 |
| 标称外尺寸 | 25 × 17 × 7 cm；不是内部容量或设备适配保证 | 上线前核实尺寸；不得拍成无比例的容量证明 |
| 包含/不包含 | 1只包；无独立背带；线材及示意小物不随附 | 画面与页面同样说明 |
| 售价/运费 | 29 USD；运费在结账核定 | 税项、运费明细、履约期限未知；不得写免运或预计到货日 |
| 安全卖点 | 集中放置日常小物，打开查看 | 无防水、防摔、安检、通用适配、耐用性或节时数字承诺 |
| 落点 | 本题保留域名 https://example.test/products/pouch-sand | 不访问；实际页面存在性、价格、库存、结账和服务须另验 |
| 主要购买行为 | 单包商品页 → 结账 → 支付成功 | 浏览/结账不是购买；现有原始事件标签不是当前平台枚举 |

这是内容真实性修正，不是用降价或补贴提高转化的提案。修正旧稿不应归因为“新创意带来销量”。

## 3. 可检查的 Campaign → Ad Group → Ad 文字草稿

下列名称仅供内部协作，没有平台ID；目标/状态为业务语言，**不提供上传配置或当前界面字段承诺**。

| 层级 | 草稿值 | 固定项、未知与执行门禁 |
|---|---|---|
| Campaign | 工作名 WEB-TidyWay-Sand-PaidOrder-Manual；目的：网站获客，观察成功支付及退款后的经营质量 | 假设US/English/USD；账户/目标可用性未知；仅“拟保持不启用”，未创建对象 |
| Ad Group | 工作名 WEB-Sand-DailySmallItems；一个收纳需求假设：希望集中放置随身线材/小物的英语用户 | 不是已验证兴趣人群；年龄资格、定向字段、排除可用性须当前核验。不上传名单，不先做相似受众或再营销 |
| Ad Group 测量 | 内部目标：确实成功支付；目的地为同一沙色商品页 | Pixel/Events API映射、同意、value/currency、双通道身份、接收去重均未过门；不得用未支付结账替代优化目标 |
| Ad Group 交付 | 优先准备可保持单创意/页面/报价可比的手动控制；具体版位、出价方式、排期、金额留空待证待批 | 不假设账户提供所有控制。自动版位若改变实际组合，需要读回并降级比较，不能称干净实验 |
| Ad Group 人群关系 | 首期只做新需求探索方案；再营销池、排除窗口、自然/其他活动重叠未知 | 未完成可用规模、合规基础与排除读回前，不声称增量获客 |
| Ad | 工作名 WEB-Sand-OpenAndGather-V1；品牌自创桌面概念；第5节完整稿；CTA“View details” | 真实资产/音乐/商标/商业披露未核；不使用SYN-POST-P；一包29USD落点与事件商品身份一致 |
| 商品数据 | 本例不依赖目录投放，单SKU页面草稿即可 | 若未来采用catalog，须另核feed/item/variant/price/stock/event匹配，不凭本报告视为已建目录 |
| 预算/审批 | 未设置；丁拟方案、己核成本、庚审批、戊核资产边界 | 周400未批；最大损失、余额/付款责任、履约与客服容量未知。历史支出不续期授权 |
| 结果与回滚 | 主要经营结果：同群退款成熟、完整适用成本后的贡献；诊断：事件质量、交付、页面连续性 | 无合格读回/成熟群/完整成本，不判赢家；真实暂停或回滚也须作用于明确对象并单独授权 |

## 4. 四种分路：已交什么、还差什么

### 4.1 Manual：本次主路径

已交第3节三层结构、第5节广告及镜头、第6节页面、第7节测量排错和第10节实验草稿。选择理由是本题首先需要一条能解释“商品—消息—页面—支付”的可检查链，并保留一次一个主要变量的准备条件，不是证明Manual普遍更优。

具体阻断：账户与目标资格、当前控制字段、信号质量、实际素材权利、真实价格/库存、预算损失批准。事件异常未闭合前不以它作投放就绪方案。

### 4.2 Smart+：保留同一商品假设的自动化候选

可交付给丁的输入简报：同一沙色单包、29USD及同一页面；使用第5节真实可核的桌面概念；优化仍指向确认成功支付；必须保持商品/报价/权益边界，不允许自动组合形成防水或适配承诺。若将来可用，先核哪些人群、版位、素材组合、预算分配能够固定，哪些由系统决定；需读回实际曝光/花费/组合/订单质量。

本输入没有可靠信号或已验资产供应，也没有账户自动化控制读回，所以**不能选择“全自动已准入”**。若只能自动组合而无法保持本次要测试的变量，结果只能方向参考，不能同Manual视作隔离变量比较。这里交的是自动化需求与验收简报，未交可运行Smart+配置；不擅设部分自动化按钮或资格。

### 4.3 Spark：自然帖子不等于付费权

SYN-POST-P只能进入“待核自然展示来源”栏，不进入本次广告资产集合。请求包应列：帖子与所有者对应关系、付费用途/账户/市场/期限、是否允许编辑和续期、商业披露、音乐/人物/商标权、平台授权方式及有效期、目标资格、停止/撤回联系人。**当前全部缺少足以支持付费的证据**；即使以后收到code，也不能替代全部内容权利或花费批准。

可用离线交付是上述精确权益差异表及第5节自创概念备选。没有对原帖正文做观察，故不编Spark原帖成稿、帖子互动效果或达人同意。不得联系达人、取code或把自然许可扩写为付费许可。

### 4.4 Search：不同意图的完整搜索文字备选

搜索意图尚未验证，下表是待检假设，不是账户关键词上传清单或当前match规则。

| 意图组 | 例示查询假设 | 信息连续性与排除判断 |
|---|---|---|
| 明确收纳需求 | “zipper organizer pouch”; “small items pouch” | 展示单只拉链包、外尺寸、29USD及结账运费 |
| 线材收纳场景 | “pouch for everyday cables” | 只能作为场景；线材不附送，实物容量未验，不保证任意适配 |
| 不相符需求 | “waterproof electronics case”; “laptop sleeve”; “free pouch” | 与当前证据不符；作为待核排除意图，不宣称已添加negative或具体匹配方式 |

完整英文备选：
> **TidyWay Zipper Pouch — Sand**  
> Keep everyday small items together in one pouch. Nominal outer size: 25 × 17 × 7 cm. One pouch, $29 USD. Shipping calculated at checkout. Check dimensions and what’s included before you order.  
> **View details**

落点仍为同一商品页；不跳向通用首页。上线前须取得目标市场/账户/目标的Search可用性、当前关键词/匹配/否词控制、真实查询与投放回读，以及与主路径相同的测量/权益/经济批准。没有搜索词、点击或订单关联，不能承诺意图一定高转化，也不复制平台推荐时长、事件量或预算比作通用门槛。

## 5. 完整英文广告与镜头交接

### 5.1 成片文字稿（尚未制作媒体）

**Working title:** Open, gather, go — TidyWay Sand  
**Voiceover:**
> Small things, one place.  
> Meet the TidyWay zipper pouch in sand. Open it up and gather your everyday small items.  
> Its nominal outer size is 25 by 17 by 7 centimetres. Check the dimensions for what you want to carry.  
> Your order includes one pouch. The items shown are illustrative and are not included.  
> $29 US dollars. Shipping is calculated at checkout.  
> See the details before you choose.

**Post/ad caption:**
> A place to gather your everyday small items. TidyWay zipper pouch in sand: one pouch, $29 USD. Nominal outer dimensions 25 × 17 × 7 cm. Illustrative items not included. Shipping calculated at checkout. View product details.

**CTA:** View details.  
**Audio:** Original spoken narration only in this plan; no chosen music or licence claim.  
上述文字只能在实物与价格核对后用于真实内容，不能因“原创”免去事实与权利审核。

### 5.2 镜头清单

| 顺序 | 拟画面 | 屏幕文字/核验点 |
|---|---|---|
| 1 | 中性桌面，小物与沙色包分开放置，不放可识别第三方商标 | “Small things, one place.”；不暗示设备随附 |
| 2 | 打开真实沙色包，俯拍开口；实际物件能否放入须拍前核实 | “TidyWay · Sand”；不得用合成扩容画面作实证 |
| 3 | 同场放置尺寸示意卡，标明外尺寸，拍摄须能与真实商品对应 | “Nominal outer size: 25 × 17 × 7 cm”；不是内部尺寸或精确实测证明 |
| 4 | 单只包与示意物分区，明确购买单元 | “Includes 1 pouch. Illustrative items not included. No separate strap.” |
| 5 | 同一SKU真实页面待核后展示价格信息，未核前仅留文字版 | “$29 USD · Shipping calculated at checkout” |
| 6 | 包本体结束，邀请查看详情 | “Check dimensions. View details.”；不加库存倒计时、折扣或到货承诺 |

时长由真实内容清晰度决定，不把此分镜数量或长度当平台标准。乙交拍摄前事实核对，甲签商品/Offer，实际制作与发布均不在本次授权内。

## 6. 完整英文商品页文字草稿

以下是商品信息页正文，不是已完成税务、退换、隐私或结账法律文本；相关真实条款缺失会阻断上线，不用虚构默认条款填空。

> # TidyWay Zipper Pouch — Sand
>
> **Everyday small items, together.**
>
> Open one pouch to see the small items you choose to carry. The TidyWay zipper pouch offers a simple place to gather them.
>
> **$29 USD · One pouch**  
> Shipping is calculated at checkout.
>
> **View purchase details**
>
> ## Check the size
>
> Nominal outer dimensions: **25 × 17 × 7 cm**. These are external dimensions, not a guarantee of internal capacity or compatibility with a particular device. Please compare them with what you plan to carry.
>
> ## What’s included
>
> - One TidyWay zipper pouch in sand.
> - No separate strap.
> - Cables, devices and other illustrative items are not included.
>
> ## A simple way to gather small items
>
> Open the pouch, choose the items you want to organise, and check the fit before use. Only the pouch is sold with this product.
>
> ## Before you order
>
> **Is it waterproof or protective equipment?**  
> This page does not claim waterproofing, drop protection or device protection.
>
> **Will every device fit?**  
> No universal fit is promised. Check the nominal outer dimensions and the product details for your intended use.
>
> **Is shipping free?**  
> Free shipping is not included in this offer. Shipping is calculated at checkout.
>
> **Are the items in the pictures included?**  
> No. Your order contains one sand-coloured pouch only.
>
> **Ready to check the details?**  
> Review the product, shipping charges and applicable purchase terms before placing an order.

页面交接：甲补经核验的真实库存、税运费显示、退换/配送条款及支持入口；丙核实际路径和同意后事件；乙核图片中一包/无配件提示。未提供具体支持渠道和政策，本文不编邮箱、退款天数或到货日期。

## 7. 六条日志逐条处置与目标事件衔接

内部业务目标是“成功支付”，不是把字符串Purchase直接认作当前TikTok事件。丙先取得授权安全样本、实现定义和平台映射再提出修复；本文不发事件、不改日志、不宣布修复完成。

| 日志 | 本案判断 | 需要的证据与离线修复提案 |
|---|---|---|
| W-E01 | ORD-W01题设明确已付29USD的browser表示 | 保留作同业务身份候选，核触发与金额定义；不能孤立宣称平台已接受 |
| W-E02 | 同ORD-W01、同ev-W01，但2900USD单位缺失 | 核server源金额单位与转换记录，再统一口径；**不能擅自除100**或删除一行称去重成功 |
| W-E03 | ORD-W02已付29USD，却报29CAD | 核源币种、订单币种及转换；不能把CAD默改USD且声称线上已修好 |
| W-E04 | ORD-W03是另一笔已付记录，却复用ev-W02 | 与E03属于不同商业事件；须建立分别唯一且browser/server对应的身份。不能只按字符串合并两个订单 |
| W-E05 | SESSION-W04两包58USD，进入结账但未付 | 可用于结账阶段诊断；不是收入/付费目标，当前平台映射仍未知 |
| W-E06 | 同一未付SESSION-W04误标Purchase，缺event_id | 核成功支付条件和身份生成逻辑；不纳入已付目标。不能凭58USD或标签补出订单 |

样本包含三个明确已付业务对象，以及一个未付结账；六条技术表示不是六单。E01/E02是否在平台去重、E03/E04是否被错误压合，以及报表是否受影响均为unknown。样本不是12单财务群的完整逐单表，不得宣称“少了九单”。

建议待批验证顺序：

1. 定义成功支付与结账两个业务条件；将内部定义映射到当前适用平台事件，记录核验依据。
2. 固定value的货币单位、折扣/税运费范围和currency；定位2900的源头，而不是看起来像美分就换算。
3. 同一业务事件跨通道共享可核对身份，不同业务事件不得碰撞；保留原始与修复前后版本。
4. 在获得测试执行授权后，用脱敏安全样本检查发送、接收、去重及目标事件；不把本地日志正确当平台正确。
5. 补浏览器/服务器同意与隐私边界，核dataset—广告账户—网站绑定；获得回读后才讨论性能。

本报告没有修复代码、API字段、网络请求或平台接受回执。

## 8. 两份广告报表：不能跨窗制造提升

| 报告 | 描述性结果 | 不能推出 |
|---|---|---|
| W-M01 | 8月25—31；输入标7日点击/1日浏览；120支出、10归因单、290金额；金额/支出约2.4167，支出/归因单12 | 非退款后利润、真实获客成本或增量。10单与财务12单没有逐单联结 |
| W-M02 | 8月25—9月7；输入标28日点击/7日浏览；180支出、16归因单、464金额；金额/支出约2.5778，支出/归因单11.25 | 不是同窗创意进步；日期和归因设置同时不同，也不证明技术错误已经消失 |

M02截至9月7晚于本文日期：它是题设的合成报表，不是今天已观测到未来真实结果。输入设置不是默认平台规则。
比较前须固定订单/曝光或点击归属范围、时区、金额定义、报告截点、归因设置和退款成熟标记；从合格同窗材料重读，不用两个现成总数硬裁胜负。没有曝光/点击/会话分母，不计算CTR/CVR。没有分配和对照，不做因果结论。

## 9. 同一12单退款成熟与经济差额

本节仅SYN-WEB-COHORT、USD、12已付单。收入348；财务已明确归集广告120，不能再加M02的180。退款与逆向处理费不同，退回商品回收价值未证，不扣减商品成本。

| 计算 | A：9月2日未成熟 | B：9月5日题设退款结清 |
|---|---:|---:|
| 退款后收入 | 348−29 = 319 | 348−87 = 261 |
| 已知适用成本 | 84+48+12+3+30+120 = 297 | 84+48+10+9+30+120 = 301 |
| 收入减上述成本 | **22：未成熟代理差额** | **−40：成熟退款下已知成本差额** |
| 退款订单比例 | 1/12 ≈ 8.33% | 3/12 = 25% |
| 客服人工 | unknown | unknown |

两快照是同一订单群，不是A/B实验。由A到B净收入−58、已知成本+4、差额−62；不能归因给广告版本。B的退款成熟是题设财务确认，不是“经过几天自动成熟”。

−40不是完整贡献利润：客服人工缺失，不能填0。已知口径已经为负，不支持扩大花费；也不能从这组归集结果断言广告带来的每单都亏损或广告导致退款。广告前已知成本差额为80（261−181），但缺失成本及增量关系未闭合，**不据此输出可执行盈亏平衡ROAS或最高出价**。未来税运费、库存、容量和费用需另定；本题零项不外推现实。

## 10. 实验、变更和停止：先修真实性与测量，再谈测试

旧错误广告不是合法对照。先同步更正价格/运费/包含项，记为基础纠错；随后如果各门禁获得批准，才拟定单变量测试：

- 假设：同样的收纳概念下，“Small things, one place.”与“Looking for your small essentials?”两个开头表达，在其余内容固定时会产生不同的理解和购买质量。
- 主变量：首句文字及对应口播；首镜画面、后续镜头/稿、单包29USD、页面、CTA、目标事件、受众/版位控制及观察口径不变。不同自动组合会污染比较，须回读并降级。
- 主要经营结果：按预先确定的分配/分母汇报退款成熟且成本完整的经营结果，不只看购买者群。诊断关注理解/点击/支付链，但当前均无曝光等分母。
- 观察窗口、转化延迟、退款成熟判断、所需证据量、最大损失和最低业务变化目前均未获确定；不擅填样本数、日数或统计结论。不为补统计细则扩读第四业务参考，正式实验合同另需具体审定。
- 正式开始需要庚批准范围和损失、己完成经济与容量、丙测量回执、甲乙事实与权益、戊权限核对。达上限、数据故障、权利/商品错误或履约风险时停止建议并交授权操作者，不自动操作账户。

| 变更号 | 前→拟后 | 触发与固定范围 | 当前状态/回读 |
|---|---|---|---|
| WEB-C01 | 旧防水/25USD/免运/万能适配 → 第5、6节准确稿 | W-C01与W-P01/W-O01冲突；商品SKU不变 | 仅本报告草稿；非发布，不作为效果测试 |
| WEB-M01 | 错误/冲突事件定义 → 第7节待核修复合同 | 保留六行原始记录与财务群；不改归因窗口掩盖错误 | 待证待批；无实现/接收回执 |
| WEB-T01 | 准确稿首句V1 → 上述问句V2候选 | 测量/经济/权限通过后，固定除首句以外字段 | 未排期、未花费、未测；不选赢家 |

眼下一个主要推进动作是丙提交“业务身份—金额单位—币种—触发—平台回读”的差异证据表。内容真实性纠错、财务补项和权益检查是上线前并行准备，不混称同一次营销实验。

## 11. 同输入的资产与Finance准备附表

所有标识均虚构，法律owner和实际绑定未知。拟权限是任务语言，不是当前平台角色名称；任何真实读取或写入另行授权。

| 对象/角色 | 必要工作与拟最小范围 | 不应默认给的能力 |
|---|---|---|
| SYN-BC-W / 资产戊 | 维护该业务对象的owner、成员、partner及直接/继承关系清单；提交待批差异 | 不凭角色称谓认定管理员/资产所有者；不自动邀请/移除 |
| SYN-ADACC-W / 广告丁 | 先只读交付/状态；若未来批准创建草稿，再申请对应限定操作与期限 | 不默认BC管理、Finance付款或跨账户编辑；预算审批不等于付款权 |
| SYN-DATASET-W / 测量丙 | 先读脱敏实现/质量报告；写配置另申请，列测试环境与回退 | 不请求原始客户数据、令牌/密码；有dataset访问不等于有广告/Finance访问 |
| SYN-WEBSITE-W / 商品甲、测量丙 | 甲核商品/条款；丙提出绑定与同意/事件变更需求 | 不把商品编辑授权扩为部署、数据源管理或生产环境写入 |
| 素材 / 创意乙 | 本案文字与拟原创资产审核 | 不授订单/客户/Finance；达人内容许可不等于BC账号访问 |
| 费用 / 财务己 | 经授权的脱敏发票/支出/退款归集读核；确认成本成熟与完整度 | 报表查看与付款/支付方式修改分开；不保存卡号、银行信息 |
| 业务审批 / 庚 | 确认业务范围、预算损失和风险责任 | 尚未核法律授权，不把虚构岗位视为现行签字权 |

“代理被移出BC”只是一条合成备忘录。戊应准备而非执行的残余访问核对：BC继承成员、广告账户直接用户、dataset直接/共享权限、应用/令牌的责任人、Finance能力、在途活动及交接责任逐项列状态unknown；仅登记责任人和非秘密元信息。移除BC partner不能证明这些全部撤回，也不撤销素材许可或停止广告。

待批权限差异应包含：明确对象、现有状态证据、拟新增/撤回关系、业务理由、owner批准、期限、回退与交接人。若发现未知owner、异常支出或暴露，停止继续修改并交业务/安全/财务责任人；不擅轮换密钥、暂停或删除。

## 12. 交付、缺证与来源边界

已交：三层文字草稿；四分路选择；完整英文广告/六镜头与商品页；六日志排错；跨窗报表解释；双快照经济表；一变量准备与变更记录；同输入资产职责/残余权限准备。

最少后续证据：甲的真实商品/页面/库存与权益确认；丙的金额单位/币种/身份/触发及授权平台回读；己的客服等完整成本及成熟确认；丁/戊的市场资格、实际控制与资产关系；庚的明确预算损失与容量批准。不要求“再找一堆资料”，也不把这些unknown改成已完成。

本次业务参考限三份：

- [广告对象、测量与实验](../../references/ads-measurement-and-experiments.md)：分路、三层结果和测量门禁。
- [普通广告交付与诊断](../../references/ads-delivery-and-diagnostics.md)：三层结构、排错和单变量变更。
- [Business Center资产治理](../../references/business-center-and-asset-governance.md)：同输入角色、直接/继承与Finance隔离。

入口与[来源限制](../../provenance/limits.md)同样约束本文。按本次精确执行令的三参考路由执行，未扩读第四专业参考，未改原入口规则。历史参考日期不等于本日官方核验；当前枚举/资格/权利均未确认。本文不解决平台逐订单归因算法，不恢复已删视频，不替代独立QA、正式Skill/Vault融合或商业发布。
