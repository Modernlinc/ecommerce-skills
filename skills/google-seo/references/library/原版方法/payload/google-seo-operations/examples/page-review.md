# 页面完整示例｜既有成品适配，非新调用

全部商户/HTML/状态为原创合成，.example不访问；Googlebot/索引/排名未实测。保留完整输入/brief/精确修复，历史过程不分发；[来源登记](../references/source-register.json)提供命题边界。

## A. 自足合成输入

任务：虚构商户 TidyShelf 希望顾客看懂一个普通收纳盒能否放进自己的层板。请审查分类、商品和尺寸说明三个页面，找第一处可证明的问题，并交一份可直接给编辑的完整尺寸页 brief 与安全取证/修复交接。只要离线报告，不改站、不请求收录、不登录。

### A1. 业务与产品事实（SYN-S01，案例版本1）

- 市场美国，页面语言 English；业务电商销售普通家用收纳盒。目标先是让顾客正确判断尺寸并到对应商品页继续查看，不把这一中间动作当成交。
- 产品 Box 30：单一产品、单一尺寸、无变体；硬质内衬、布面、开口式、无把手。产品在指定使用朝向的最大外尺寸为宽30×深20×高15 cm，包含外缘，不能靠挤压缩小。
- 商品负责人提供的护理事实仅为用微湿布擦拭；承重、内尺寸、尺寸公差、可水洗、堆叠安全、适配某品牌柜体、当前价格/库存/配送退货细则没有给定，全部 UNKNOWN。
- 不需要拍摄或复制第三方图；当前图像权利/原图未提供。本轮不生成图片或 schema，不处理Merchant。
- 角色：PO-1 产品事实负责人；ED-1 英文编辑；TECH-1 站点技术负责人；DATA-1 获授权搜索/业务数据负责人；APP-1 发布批准人。角色均是案例职责代号，非已联系真人。
- 允许动作仅审阅与草稿；损失护栏为本轮0真实投放/生产变更、0删除、0账号动作。业务毛利、订单、真实转化和可承受经营损失未知，不能形成增长或收益闭环。

### A2. 页面及链接快照（SYN-S02，案例2026-09-05 09:00 UTC）

|ID与URL|给定HTTP/HTML与可见内容|已知链接/声明|未给定|
|---|---|---|---|
|P-C `https://tidyshelf.example/collections/storage-boxes`|HTTP200；H1 Storage Boxes；普通静态分类说明，商品卡写Box 30与外尺寸|可解析 `<a href="/products/box-30">Box 30</a>`；声明canonical为本页；未见meta noindex|Google选择canonical、服务器日志、全站链接图|
|P-P `https://tidyshelf.example/products/box-30`|HTTP200；H1 Box 30 Fabric Storage Box；正文与SYN-S01一致，尺寸以W×D×H标明|商品页“Check your shelf size”链接为 `<a href="/guides/measure-shelfs">Check your shelf size</a>`；canonical为本页；未见meta noindex|当前索引、表单/购买动作、移动端视觉|
|P-G `https://tidyshelf.example/guides/measure-shelf`|HTTP200；H1 Size Guide；正文只有“Check the shelf size before ordering”，没有测量步骤、轴向说明或对照例子|声明canonical为本页；当前所给HTML未见meta noindex；有回商品页的可解析链接|全站是否还有正确入链、实际Googlebot渲染、当前索引|

TECH快照另明确：P-P链接的精确目标 `/guides/measure-shelfs`（结尾多s）在同一09:00 UTC返回404，不是P-G的别名，也没有重定向。这是链接目标检查，不新增第四个内容页面。

题面附 robots 相关段落未阻止上述页面；未给 robots 全站内容、响应头、完整 sitemap 或访问日志，不能宣称所有爬虫访问均正常。

### A3. 分时检查与报告摘要（SYN-S03）

|记录|对象/时间/题面值|边界|
|---|---|---|
|IDX-1|P-G，indexed快照的抓取时间2026-09-01 04:00 UTC；排除原因字段为noindex；Google-selected canonical未提供|只证明题面记录的旧时点状态|
|CHG-1|TECH记录2026-09-03 10:00 UTC移除了P-G模板的meta noindex|变更记录本身不是Google重抓/收录回执|
|LIVE-1|P-G，2026-09-04 12:00 UTC的live摘要：fetch成功、该测试未检测到noindex|不代表2026-09-05的索引状态或Google选定canonical|
|PERF-1|合成P-P页面报告，Web/美国/desktop，2026-08-25至08-31，报表日期口径PT；impressions1000，clicks20|没有前一同口径窗口、query细分、数据成熟声明或同期变量；不提供排名/CTR变化因果|
|BUS-1|GA4、订单、退款、成本均未提供|不是0会话/0订单/0收入|

## C. 实际业务答复

### C1. 先修哪一处、哪些还不能判断

**报告状态：NEEDS_FIX。** 当前最早能证实的问题，是商品页到尺寸说明的已提供站内发现/导航路径断了：P-P把顾客和可解析链接指向拼错的地址，目标确实返回404（SYN-S02）。先形成把这一条href改为P-G的精确草案，不是先加内容数量、做schema或提交收录。

这个结论只覆盖该条路径，不表示Google从未发现正确P-G，也不能用它解释所有搜索表现。P-G被发现的其他路径、最新索引、Google-selected canonical和业务结果仍UNKNOWN。另一项已确认的内容缺陷是尺寸说明只要求“量一下”，没有教顾客怎么量与比较；下方给完整brief，但不与优先链接动作捆绑发布，以免混淆变化与结果。

|阶段/对象|OBSERVED（仅题面）|判断/主状态|关键未知与下一证据|
|---|---|---|---|
|发现：P-C→P-P|静态可解析href与目标200|DRAFT：该样本路径未发现断点|不是全站链接覆盖证明|
|发现/目标响应：P-P→尺寸说明|href拼错，给定目标404；正确P-G200|NEEDS_FIX：本样本最早已证实断点|改动前确认内容版本；改动后同一href/目标回读|
|抓取/渲染：三个内容URL|给定HTTP200/局部HTML/robots片段|UNKNOWN：不足以证明Google实际抓取渲染全链|完整相关响应头/HTML与必要受控检查摘要；不要求全站日志|
|索引：P-G|IDX-1旧noindex；CHG-1移除记录；LIVE-1较新测试未见noindex|UNKNOWN：不同时间不能互相替代|DATA-1如已有权限，提供生成时间和抓取时间均明确的indexed摘要|
|页面价值：P-G|只有一句泛提示，缺轴向、测量、比较|NEEDS_FIX：不能完成给定顾客任务|PO-1确认产品事实与尺寸不确定项；ED-1审本文brief|
|呈现/访问：P-P|PERF-1这一范围的1000展示/20点击|DRAFT：只能描述给定窗口；计算CTR=2%|无同口径前期与query，不诊断CTR下降/算法原因|
|业务结果|没有GA4/订单/退款/成本|UNKNOWN|本次只做健康审阅，不凭空要求客户数据完成收益结论|

indexed/live时间线的具体答复：2026-09-01抓到noindex → 09-03有移除记录 → 09-04测试未见noindex → 09-05最新索引未知。不能说“已恢复收录”，也不能把旧排除记录当09-05仍有noindex的证据。declared canonical为自指也不证明Google采用。

### C2. 意图与页面任务地图

下列主题来自合成顾客任务，不是搜索词报告，不声称有关键词量级。

|页面|唯一任务/主题|需要的事实与内容|下一步CTA/内链|不应混成什么|
|---|---|---|---|---|
|P-C Storage Boxes|比较现有收纳盒并找到具体产品|只展示实际有据的产品与外尺寸；无其他款则不伪造比较|View Box 30→P-P|不为每个同义词建分类页|
|P-P Box 30|了解此产品并判断是否继续购买|W×D×H定义、不可压缩、真实护理；价格库存等按未来商户事实核验|Check your shelf size→P-G；交易CTA由真实站点另核|不承诺适配任意柜体、不混尺寸教学和所有售后政策|
|P-G Measure Your Shelf|量层板并按既定朝向比较外尺寸，知道何时不能确认|以下完整brief与案例；没有公差则明确询问|View Box 30 dimensions→P-P；比较更多产品→P-C|不堆GEO FAQ、不伪造品牌适配榜单|

三个页面任务不同，本例不合并、不删页、不重定向；当前P-G canonical/索引计划保持原声明，仅记录观察未知，不自行发指令更改索引控制。

### C3. 可直接交编辑的完整页面 brief

产物状态 DRAFT；目标页面为既有P-G，修订而非新建同义页。读者是准备把Box 30放进现有层板的英语顾客；核心任务为正确量出可用空间、比较朝向对应的外尺寸，并知道证据不足时先不下结论。编辑ED-1，事实签字PO-1；发布另交APP-1授权。

**Title候选**：How to Measure Your Shelf for Box 30 | TidyShelf

**Meta description候选**：Measure usable shelf width, depth and height, then compare them with Box 30. Check access space and ask us when the fit is uncertain.

**H1**：Will Box 30 Fit Your Shelf?

**导语（实际文案）**：

Box 30 measures 30 cm wide, 20 cm deep and 15 cm high on the outside. These measurements include the outer edge. The rigid liner does not compress to fit a smaller space. Use the steps below to compare your shelf with the box in its intended orientation.

**H2 1 — Measure the usable space, not the furniture label**

Measure the clear width where the box will sit, the usable depth, and the smallest clear height above that surface. Also check the opening you must move the box through. Hinges, lips and other obstructions can make the usable space smaller than the shelf dimensions shown in a furniture listing. Record all three measurements in centimetres and keep the width, depth and height labels with them.

此段为公司原创任务说明，不声称完成过某柜体适配测试。所需事实：顾客自行测量的净空间；本例没有真实测量照片/用户数据。

**H2 2 — Compare the same dimensions**

|Dimension|Box 30 outside size|Your usable space|
|---|---|---|
|Width|30 cm|Measure and record|
|Depth|20 cm|Measure and record|
|Height|15 cm|Measure and record|

Compare width with width, depth with depth, and height with height. Do not substitute the box's internal capacity for its outside size. If one usable dimension is smaller than the corresponding box dimension, the box does not fit in that orientation. Equal numbers alone do not confirm a practical fit: measurement tolerance and space to move the box are not established here.

**H2 3 — Use these examples as a check, not a fit guarantee**

|Example in the stated orientation|Comparison|What it means|
|---|---|---|
|31 cm W × 21 cm D × 16 cm H|Each listed dimension is 1 cm larger than the box|The listed sizes are larger, but confirm the opening, obstructions, tolerance and handling space before deciding|
|29.5 cm W × 21 cm D × 16 cm H|Width is 0.5 cm less than the box|It does not fit in this orientation; do not force the rigid box into the gap|

These are illustrative measurements, not tests on a named shelf. We have not established a universal clearance allowance or the product's manufacturing tolerance. Do not assume the box can be compressed or rotated to solve a mismatch without checking the complete opening and intended use.

**H2 4 — Still unsure? Check before ordering**

If the opening is tight, a measurement is missing, or you need a confirmed clearance allowance, pause your choice and ask for clarification. Keep the product model, intended orientation and all three usable measurements together. This guide does not establish internal capacity, load limits, stacking suitability or compatibility with a particular furniture brand.

**结尾与CTA（实际文案）**：

Review the outside dimensions on the Box 30 product page before making your choice. If Box 30 does not meet your measurements, return to Storage Boxes to review the available product information.

- Primary CTA: **View Box 30 dimensions** → `/products/box-30`。
- Secondary CTA: **Browse storage boxes** → `/collections/storage-boxes`。
- “Ask for clarification”只作说明文字；实际联系入口未在题面给定，不编造邮箱、表单或链接。发布前若增加联系CTA，须由商户提供真实可用入口。

**素材与事实交接**：当前只交文字和原创对照表，不交图片。若后续需要W/D/H示意图，PO-1先给允许使用的实物/尺寸资料，ED-1拟准确alt，不使用未授权产品照片；本批不出图。尺寸三轴回接SYN-S01，2个示例是原创演算，不是试验结果。微湿布护理与本页任务关联弱，不为字数塞入。价格/库存/配送/退货/承重/内尺寸/公差/适配品牌等未知不写成承诺。

**编辑验收与维护**：核对Title/description/H1与正文任务一致，三轴数值/单位/朝向一致，两个例子正确；所有CTA与目标对应；没有固定字数、排名/收录/引用/销量保证。PO-1确认规格与公差信息，ED-1检查英文与易懂性，APP-1另行审批发布。产品外尺寸、设计、名称、URL或已确认公差改变时复查；发现内容与商品事实冲突时先撤回该草稿，已发布内容则交获授权负责人处理，本任务不自行删除。本文有AI辅助原创草稿属性，未冒称真人产品实测或客户体验。

### C4. 一个优先动作和最小安全委托

**优先动作 S-P1：只把商品页尺寸说明链接的href从 `/guides/measure-shelfs` 改为 `/guides/measure-shelf` 的离线修复单。** 依据SYN-S02；负责人TECH-1，事实页归PO-1，未来批准人APP-1。本轮只写草案，不改站，也不连带发布上面的brief。

精确差异：

```diff
- <a href="/guides/measure-shelfs">Check your shelf size</a>
+ <a href="/guides/measure-shelf">Check your shelf size</a>
```

最小取证委托草稿（未发送）：TECH-1在其已有授权范围内提供P-P对应锚文本/href片段、P-G精确目标的状态/相关响应头、采集时间及页面版本即可。只需要这两个URL及错误目标状态，不要全站抓取、客户查询或完整日志。若该片段来自共享模板，先确认影响是否扩到其他产品；超出此单页则停止并缩小差异，不能批量替换。

验证分层：

1. 本地草案检查：锚文本不变，精确路径少一个末尾s，目标与P-G相同，未改canonical/noindex/正文/产品规格。
2. 未来获授权实施后的技术回读：同一P-P版本包含正确href，目标返回与预期一致的页面，访问路径可用。只有此时才能说链接修复已回读；本轮未执行。
3. 如另需判断搜索索引，由DATA-1提供已有授权的P-G indexed摘要，列清property代号、生成时间、上次抓取时间、排除原因及Google-selected canonical（有则给、无则UNKNOWN）。此证据不是链接草案本身的前置，不为此要求新手登录或推测等待天数。
4. 观察搜索/业务变化需先取得同口径基线、变更日志和完整观察窗。本题没有这些证据，不声称链接改动或brief会使流量/订单上升。

保持不变：P-C、产品参数、价格库存、正文brief、canonical/noindex/robots/sitemap全部不动；不提交收录、不迁移/删除、不上schema、不做AI或Ads实验。

停止/回滚：登录、发布、真实客户资料、服务器/Production写入前需单独授权；目标内容不等价、页面不200、影响共享模板或资料时点不清时暂停实施草案。当前只可退回文档版本；未来修复前由获授权TECH-1保留精确旧片段/版本，若导航异常按批准方案恢复原片段并继续调查，不批量重定向。

下一步：TECH-1审这条单页href差异，ED-1/PO-1在离线审上面的完整brief。没有真实账号/数据时仍可完成两份草稿；当前索引与经营结果继续UNKNOWN。报告NEEDS_FIX是题面缺陷的判断，不是授权本任务执行修复。


