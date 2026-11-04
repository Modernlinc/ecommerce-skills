# SEO限定能力组合｜原创商户资产与可审草稿

原输入与首次制作日期为2026-09-06；当前方法版本0.1.1-rc.1+owner-rule.20260913，本文件仅对既有输出作获批边界修订，不是新执行或独立验收。全部为合成输入，HTTP/页面/业务/指标仅题面给定；不访问.example。INPUT保持原文；当前调用以专项合同和来源登记为准。

## INPUT（固定范围）

请为CedarFold写同域少量URL迁移草案、普通商品类型审阅、Local资格取证、未发送编辑外联草案和测量回读；只做离线文字，不改站、不登录、不发送、不付费。

### 商户与页面
- US/en，USD，America/Los_Angeles；主营普通单件收纳盒CF-20。主业务结果为已付款未取消订单；价格60美元、完整成本和利润未知，无增长或损失金额推算授权。
- 事实负责人C-PO、技术C-TECH、数据C-DATA、编辑C-ED、审批C-APP，均虚构。商品外尺寸20×18×12 cm，不承诺承重、堆叠、适配品牌、公差或可洗。
- 当前旧商品 https://cedarfold.example/p/cf20 ：HTTP200，商品名“CedarFold Box 20”，可见60 USD、有货、单件。拟新地址 https://cedarfold.example/products/box-20 ，同商品同正文，预览HTTP200，但head仍含meta noindex，canonical仍指旧地址。当前产品JSON-LD为Product name已给、offers Offer price55.00/priceCurrency USD，没有image。
- 拟可用商品图URL https://cedarfold.example/images/cf20-front.jpg ，题面商户声称自有正面照片；文件/抓取/索引/权利证明未提供，不能凭URL说图片合格。
- 旧说明 https://cedarfold.example/learn/measure-box-space → 拟新 https://cedarfold.example/guides/measure-space ，题面同一原创测量说明、两边200，旧版canonical自指，拟新版canonical自指且未见noindex。站内导航和sitemap仍用旧商品/说明URL，未启任何跳转。
- https://cedarfold.example/products/retired-hook 已404，商品停产，无等价替代；业务方提议“都跳首页”，尚未执行。本批仅这3旧URL；域名、语言、模板外观、价格、文案内容不变，不做国际化。
- 改动前后实际响应头、服务器可承载、Google-selected canonical、GSC索引状态、完整robots/资源与部署批准均未知。

### Local角色事实
- 商户线上售货，不向顾客上门服务。现有“办公室”是共享办公地址的收信服务；没有专属招牌、没有本公司驻场人员、不接待客户。
- 草稿想把该地址写成“CedarFold Seattle Store”，门店照片/营业时间/类别/电话及真实Profile均未提供。不得编地址、门店或评论。
- 若未来另有真实接待点，只能另给证据，本题不假设它存在。

### 编辑关系
- 商户自有文字资产题目“A worksheet for measuring usable shelf space”；方法只教宽/深/高和开口分别记录、不保证适配。资产拟URL https://cedarfold.example/guides/measure-space 。
- 虚构收纳编辑E-1来信表示可以考虑相关资料，无付费、无链接承诺、无合作关系或既有链接证明；草稿只能提建议并披露来自商户。
- 同一商户另有一则尚未发布的赞助资源介绍，付费关系题面明确，拟链接到 https://makerlab.example/worksheet ，编辑想保留“dofollow换曝光”。本轮不得付费或发送。

### 测量输入
- 基线窗2026-08-24—30，GSC Web/US/mobile、页面仅旧商品URL，PT报表日期：impressions800、clicks16；没有查询分组、前期对照或数据成熟说明。
- GA4给同日标签但时区UTC、归因organic search sessions14、key events2，事件定义/同意/去重未知；业务已付款订单1，但来源和取消状态未知。不要强制对齐或相加。
- 迁移未做；本轮真实变更/花费0。业务周期、报告延迟、批准观察窗未知，不能拿别的案例7+3天来补。

## OUTPUT

### 1. 结论与第一优先项

报告主状态NEEDS_FIX：题面普通商品的可见价格60 USD与JSON-LD价格55 USD冲突；拟上线目标还保留预览noindex/旧canonical，不能直接切流。预览noindex本身可以是有意保护，不将它指责为已上线站点错误，也不要求现在解除。
先由C-PO/C-TECH确认同商品同版本的价格与标记修复稿，再建立迁移前基线；迁移与标记修复若同时发生必须记为多个变更，不归因给单一变量。现在没有任何改站、跳转或Profile动作。
本批真实首个页面发现/抓取/Google索引未知；不能仅因路径变更计划或sitemap旧值就说Google已经出错。

|层|题面观察|结论与边界|
|---|---|---|
|商品事实/呈现|可见60，Offer55，缺image|已知标记不一致；先修草稿，不认定已导致排名变化|
|迁移准备|新商品200但noindex、canonical旧址；导航/sitemap旧址|目标未达到切流前置，不等于当前主站被noindex|
|旧新内容等价|商品同SKU，说明同正文；停产钩无替代|两对可形成映射候选；钩不跳不相关首页|
|真实抓取/索引/资格|没有Google/服务器回读|UNKNOWN；无法签迁移成功/富结果资格|
|Local|收信服务，无标识/人员/接待|不能用该地址声称实体门店；草稿需纠正|
|业务结果|1付款订单但来源/取消未知|不是已验证自然搜索净订单或利润|

### 2. 同域三旧URL迁移草案

限定原域cedarfold.example，语言、商品事实、模板外观不变。以下是文档计划，不是服务器配置；来源依据为[迁移页](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)的所读映射/准备/监控段。

|旧路径|拟处理|切流前置/验证|
|---|---|---|
|/p/cf20|拟永久直达/products/box-20，服务器可用时选301方案；没有中间跳转|C-PO确认CF-20内容等价；新页可公开、声明canonical新址、无非预期索引阻止；权限/资源/容量待证|
|/learn/measure-box-space|拟永久直达/guides/measure-space|同一测量任务/原文和图片权利保留，新目标200/self canonical；完整响应和机器人访问仍需验证|
|/products/retired-hook|保持现有404，不增加首页跳转|无等价替代；此处不删除任何文件，也不伪造替代商品。若出现真实等价页再另审|

迁移准备差异合同：
- 商品页canonical在获准切流时由旧URL改为新URL；只在确认预览保护已不再需要且获得发布批准后移除该页临时noindex，不全站删除索引控制。
- 导航两条href按上表映射更新，锚文本/意图不变；新sitemap候选用两个新目标URL，不能把停产无替代URL写成200。
- 旧sitemap保留/撤下策略暂由C-TECH按已有记录和监控目的审定；所读来源的两段表述不同，本轮不发删除指令。保持原始URL基线和映射证据。
- 同域路径搬迁不请求域名/DNS变更；没有跨域Change of Address操作。Google工具、真实配置和提交均未执行。
- 核对商品图片/JS/CSS等依赖是否随路径解析改变，本题只给一张图片URL，不能称所有资源已覆盖。

退出顺序：先同版本价格/标记及页面准备回读→C-APP批准精确两对跳转/导航/声明差异→获授权C-TECH实施后读每个旧URL响应与Location、直接目标200/内容/资源、canonical/noindex及导航→C-DATA按原/新URL分别追踪Google索引与搜索表现。技术退出不等于搜索退出。
保持页面用途、价格60、尺寸20×18×12、语言、广告和内容不变；Local/外联不捆绑发布。
观察窗由当前基线成熟度、抓取节奏和业务周期确定，长度未知，不套固定几周。低样本/报告不可见写未知，不延长为无限自动巡检。
停止：目标不等价、非预期4xx/5xx/循环、意外noindex/屏蔽、商品事实冲突、权限/容量不清或影响超出两对URL。实施前预留原响应/导航/声明版本；真实回退须C-APP授权，先使访问路径恢复可用，不能自动做新旧相互跳转。当前只可撤回草稿，不声称平台回滚完成。

### 3. 普通Product/Offer审阅与有限JSON-LD草稿

对象CF-20，不是FAQ或LocalBusiness。依据[商户商品类型](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing)2026-09-06已读普通Product/Offer字段子集审阅；官方首发unknown不再独立阻塞，但所读段不是完整/永久必需字段清单，不认证当前完整Google资格。
已给name可对应同商品；Offer价格应回接60与USD，55不能为迎合旧标记保留。image缺失，输入仅给拟照片URL/权属声称，没有文件、可达/可索引及图像匹配证据。
下例是给编辑审阅字段的有限候选，不是可直接发布的全量合规JSON。image只是输入拟URL，必须在C-PO/C-TECH证实图片匹配、权利、可达及适用条件后才可进入发布稿；这条前置未闭时不能把JSON块当作ready-to-publish。

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "CedarFold Box 20",
  "image": "https://cedarfold.example/images/cf20-front.jpg",
  "offers": {
    "@type": "Offer",
    "price": "60.00",
    "priceCurrency": "USD"
  }
}
```

对象主状态NEEDS_FIX（题面存在价差）；JSON为限定DRAFT，不是完整字段/资格验收，图片相关字段保持待证。页面可见60与Offer55的不一致可直接据题面识别，不由FAQ或未知规则补证。
不添加评分/评价、品牌资质、GTIN、配送/退货、会员价或适配保证；没有证据不填占位真值。availability可见有货，但本窄JSON不为凑字段猜未核枚举；不声称未列所有推荐项即完全合格。
本地只能验JSON可解析和name/price/currency与题面一致。未运行Rich Results Test、浏览器、图片下载或URL Inspection，没有实际Google富结果或索引证据。获授权真实实施后须分别验证语法、同页可见事实、资源/类型资格和Google后续状态，四者不得互换。

### 4. Local资格取证与名称修正草案

主状态NEEDS_FIX，针对拟“Seattle Store”声明：题面明确只是共享办公收信，不接待顾客、无本公司驻场/独立标识，不能把它当实体商店。依据是[Google业务呈现指南](https://support.google.com/business/answer/3038177?hl=en)所读虚拟/共享办公室条件；没有说现实中的其他商户也不合格。
本题也说不向顾客上门，不能为绕门店条件改填服务区。仍能做线上商品内容，不必造GBP才能销售。真实Profile存在/状态UNKNOWN，不删除、停用或创建任何Profile。
可直接给编辑的改写：“CedarFold sells storage boxes online. This mailing location does not receive customers.” 此为基于题面事实的候选，不发布地址、不编营业/电话，也不把收信地点放进LocalBusiness标记。
最低取证：若业务方主张还有真实接待点，请C-PO提供是否实际接待、真实名称、类别候选、商户自有人员/招牌与营业事实的脱敏说明，并由有权限负责人确认材料；没有就保持不拟门店。不得先要身份证件/地址凭证全量上传。照片/评论权利、电话、时间不填假值。
成功标准是停止虚假门店承诺并能回接真实业务角色，不是排名改善或自动GBP合格。账号验证/创建/编辑是另授权阶段，本批不做。

### 5. 原创资产与未发送外联

资产拟题目：A worksheet for measuring usable shelf space。可供编辑审的实际内容提要：
“Record the clear width, depth and height of your shelf and its opening. Note obstructions separately. Compare those measurements with the outside dimensions of the item you are considering. Equal dimensions alone do not confirm a usable fit; when tolerances or clearance are unknown, ask before choosing.”
这是原创任务说明，不是实物测试、人体工学研究或通用公差规则。CF-20尺寸只在商品任务出现，不把工作表做成所有产品最佳榜单。

给E-1的英文草稿（未发送、无真实收件人）：

Subject: A shelf-measuring worksheet for your readers

Hello,
I’m writing on behalf of CedarFold, an online storage-box seller. You mentioned that you may consider relevant resources. We have drafted a worksheet that helps readers record usable width, depth, height and access restrictions before comparing a product’s outside dimensions.
The draft does not certify fit or recommend a particular brand. If useful, we can share the finished, fact-checked worksheet for your editorial review. You are free to decline, edit your coverage or choose whether to link; we are not offering payment or requesting a ranking link.
The planned resource address is https://cedarfold.example/guides/measure-space. It is not being presented as a published resource in this draft.
Thank you for considering it.

此请求价值是帮助读者完成测量，不是购买权重。C-ED确认文字/原创权利、C-PO核尺寸方法限制，C-APP另批发送；E-1同意考虑不等于同意链接、报道或商户背书。未上线/内容未审不发出“已发布”的描述。
不得擅自追踪/群发、附私有数据或索取dofollow。若对方要求有偿排名链接、虚构测试或不披露关联，停止该路线，不换平台补量。

#### 已知付费的独立赞助介绍

付费关系与上封无偿编辑提议分开。题面的“dofollow换曝光”不接受；不能用链接属性把操纵交易洗成SEO方法。若另行确认是合法有价值的赞助内容，拟披露文案“Sponsored resource mention”，链接草稿如下，仍未发布：

```html
<a href="https://makerlab.example/worksheet" rel="sponsored">Resource worksheet</a>
```

[链接资格来源](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links)仅支持属性选择边界；不证明第三方页面真实、合作合法、已付款或会改善排名。未核权利/内容则不推进。成功不是“得到dofollow”，而是内容/关联/编辑自主与权限一致；没有实际外链效果数据。

### 6. 测量与业务回读

|来源|可描述的题面值|不能推断|
|---|---|---|
|GSC|Web/US/mobile、旧商品URL、PT窗800展示16点击，CTR=2%|无前窗不能叫下降；不证明全站/其他市场或查询|
|GA4|UTC标签窗organic sessions14、key events2|与PT边界不同；事件未定义，不能把2当订单|
|业务|付款订单1，取消/渠道未知|不能说1个SEO净订单或60美元自然收入；利润未知|

第一证据任务由C-DATA发给已有授权负责人：提供相同页面集合、明确PT/UTC边界的聚合数据与生成时间、GSC属性/搜索类型/国家/设备/数据成熟范围、GA4归因/事件定义/同意与去重、业务净付款判定和同期变更。自由文本查询、客户标识、凭证、完整日志均排除。拿不到不补0。
新旧URL采用映射成对追踪，不把重定向旧页和新页值不加辨别地相加。迁移尚未做，所以当前数据不是后测；先保存同口径基线再约定窗口。
保持Ads、价格、促销、主要文案、事件定义和平台控制不变；若标记/Local/外联与迁移同期改，记录污染，不能声称独立迁移因果。窗口长度和停止损失金额未知，本题只有0真实变更/花费边界，不借Ads案例参数。
成功：各数值的系统/定义/时区/页面/延迟可回接，已知与未知分层；不要求16、14、2、1相等。下一报告分别呈现技术状态、GSC表现、GA4行为、业务净结果，暂不签任何增长结论。

### 7. 国际化及完整目标的未决项

本任务只做US/en；国际化实现仍BLOCKED_SOURCE_ACCESS。迁移页提到更新语言标注不等于已获得自指/返回关系完整证据，本轮没有借它补hreflang、没有创建international-implementation.md。
上面五类产物是既有合成输入下的离线文字/JSON/HTML草稿，当前只修来源与使用边界，不是本轮新业务运行、浏览器/Google测试或整套终验。普通301/canonical、所读商品字段、特定Local条件和sponsored草稿按各自证据保留；复杂迁移/变体/多市场、完整资格、国际化实施、当前AI报告、独立宿主、分发权及总控终验仍分别待证。
