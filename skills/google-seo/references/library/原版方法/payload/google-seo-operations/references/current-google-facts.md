# Google SEO 当前事实门禁

核验日：2026-09-04。方式：只读访问 Google Search Central、Search Console Help、Google Analytics Help、Google Business Profile Help 和 FTC 官方页面；未登录账号。本页保留2026-09-04事实快照，本构建未逐页重新访问；记录历史底座，不代替实际使用当天复核。

## 1. 搜索资格、抓取、渲染与索引

- Google Search 的最低技术要求包括：Googlebot 未被阻止、页面返回成功 HTTP 状态、内容可索引。满足要求只表示有资格，不保证抓取、索引或排名。
- sitemap 是发现线索，不保证抓取或索引；`site:`、第三方抓取量和插件分数也不是完整索引证明。
- Google 可以处理 JavaScript，但抓取、渲染和索引是不同阶段；渲染可能延迟或受资源/错误影响。服务端渲染或预渲染可提高稳定性，不是唯一资格。
- 可抓链接应使用带可解析 `href` 的 `<a>`；不要只依赖不可发现的点击处理器。
- `noindex` 必须能被 Google 抓取并读取；同一 URL 被 robots.txt 阻止时，Google 可能看不到 `noindex`。Google 不支持在 robots.txt 中声明 `noindex`。

官方入口：

- https://developers.google.com/search/docs/essentials/technical
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- https://developers.google.com/search/docs/crawling-indexing/block-indexing
- https://support.google.com/webmasters/answer/7440203?hl=en

## 2. canonical、重定向、迁移与多语言

- canonical 用于聚合同一或高度相似内容的信号，是提示而非万能删除工具；应与站内链接、sitemap 和实际页面事实保持一致。
- 永久 URL 迁移通常使用 301/308；不应把大量不相关旧 URL 都重定向到首页或一个不等价页面。
- 迁移要保留旧新 URL 映射、基线、分阶段验证、监控和回滚，不把部署成功写成迁移完成。
- 多语言/多地区版本使用不同 URL。ccTLD、子域和子目录都是可选架构，各有定位、成本与维护取舍；没有通用排名保证。
- 使用 hreflang 或 sitemap 标注版本关系，并提供用户可点击的语言/地区切换。避免只按 IP/浏览器语言强制跳转而不给用户选择。

官方入口：

- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/crawling-indexing/301-redirects
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- https://developers.google.com/search/docs/advanced/crawling/localized-versions

## 3. 页面、内容、AI 与结构化数据

- title link 和 snippet 可能由 Google 根据页面与查询生成；title、meta description、H1、URL 和结构应清楚准确，但不是机械字符数/关键词密度公式。
- 标题链接定点证据（观察2026-09-22，页面更新2025-12-10 UTC，首发unknown）：Google可综合HTML title、可见主标题、其他显著文字、og:title及链接文字等生成标题；主标题视觉主次不明只是官方所列问题之一，并非全部问题。更新需重新抓取和处理，官方描述可能数日至数周，不是保证期限；无已证页面问题时还应考虑搜索标题与查询的适合性。来源[Google标题链接说明](https://developers.google.com/search/docs/appearance/title-link)，键OFFICIAL-SEO-TITLE-LINK-20260922-01。仅支持具名标题事实与诊断候选，不证明具体站点原因、固定采用或效果。已获令写入候选，待限定独立复核；formal_adoption=false。本次沿用已读正文，不声称实施日再次抓取。
- 内容长度由完成用户任务需要决定；Google 没有“至少 600/800 字”的通用要求。
- 使用生成式 AI 不因工具本身自动违规；若用于规模化制造低价值内容、操纵排名、伪造经验或事实，则触发质量和垃圾内容风险。
- Google 对 AI 搜索功能继续建议使用正常 SEO 基础，没有要求特殊 AI 文件、特殊 schema 或额外技术优化。`llms.txt` 不能写成 Google 资格或排名要求。
- Search Console 的 Search generative AI control 已于 2026-08-31 全球推出。普通 property 默认 `include`；若存在可控制它的父 property，子 property 默认可 `inherit`。显式 `exclude` 只影响官方列明的 Search generative AI features，不等于 `noindex`，也不应外推为影响其他 Search 部分、模型训练、Merchant Center 或 Google Ads。变更可能需要传播时间；`include` 只表示允许纳入，不保证展示、引用或流量。
- 2026-09-04历史官方复核记录：Generative AI performance report于2026-08-31全球推出，以impressions为核心并有页面/国家/日期/设备等维度。2026-09-13独立专业复核该页16984139返回500/non-retryable，已停止，当前字段/聚合/范围未取得正文；不把历史记录重标本日成功，也不由control页代证。报告不可见不能直接判零曝光；本次需要实际字段时保持NEEDS_RESEARCH或依据获准导出逐项解释。
- 结构化数据必须与页面可见内容一致，使用受支持类型并遵守资格与政策；正确标记也不保证 rich result。
- Google Search文档更新条目日为2026-05-08，记录FAQ rich results自2026-05-07起不再展示；2026-09-13独立复核定位L189–196支持该生效命题。条目日/生效日/整页首发分别记录，不由此推导必须删除全部FAQ schema，也不代证Product/LocalBusiness等其他类型资格。
- 图片需要可抓 URL、相关上下文、准确 alt 与权利；去水印、翻转或换背景不会把他人素材变成原创。

官方入口：

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/snippet
- https://developers.google.com/search/docs/appearance/google-images
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://support.google.com/webmasters/answer/16908024?hl=en
- https://support.google.com/webmasters/answer/16984139?hl=en
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://developers.google.com/search/updates
- https://support.google.com/webmasters/answer/6211453?hl=en

## 4. 链接与垃圾政策

- 当前官方证据 ID：`OFFICIAL-SEO-SPAM-001`，核验日 `2026-09-04`，指向 Google Search Spam Policies。该 ID 按子命题支持：link spam、doorway abuse、expired domain abuse、scaled content abuse、site reputation policy、machine-generated traffic；不把页面未明确列举的所有“点击操纵”自动归为同一官方枚举。
- 链接应服务用户发现、引用、合作或真实传播；购买/交换、自动生成、PBN、批量评论、平台属性和其他以传递排名权重为主要目的的链接进入垃圾风险。
- 过期域名若主要用于操纵排名并承载低价值内容，属于 expired domain abuse；大量近似地域/查询页将用户导向中间页可能构成 doorway abuse。
- 大量生成、抓取、拼接或轻度改写的低价值页面，不因由人或 AI 生成而改变 scaled content abuse 风险；借宿主站既有排名信号发布第三方内容时，需按 site reputation policy 的实际条件判断，不能仅凭“第三方内容存在”下结论。
- 未经明确许可的自动化查询属于 machine-generated traffic 风险。其他人工或来源所称的点击操纵保持公司风险规则/来源风险证据，不超出官方页面直接支持范围。
- 广告、赞助、付费放置等链接应按当前官方要求使用适当的 `rel` 资格；这不把操纵性购买转成公司 SEO 方法。
- 可接受候选包括真实原创资产、数据/工具、媒体关系、相关合作、品牌提及核实和真实 broken-link reclamation；仍需权利、相关性、披露和平台规则。
- disavow 是高级、有限场景工具，不用于日常恐惧性清理；没有明确大规模垃圾链接和相应风险时，不默认使用。

官方入口：

- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
- https://support.google.com/webmasters/answer/2648487?hl=en

## 5. Local SEO 与评论

- 本地结果主要围绕 relevance、distance 和 prominence；不存在付费请求或购买更高本地排名的路径。
- Business Profile 名称、类别、地址/服务区、电话、营业与门店资格必须反映真实业务。没有实际接待客户的地址不能为了排名伪装 storefront。
- 评论不得购买、强迫、批量生成或只向满意客户选择性索取；激励、利益关系和员工/关联方内容要遵守平台与当地法规。
- LocalBusiness schema 只能描述真实可见信息，不替代 Business Profile 资格，也不保证本地排名或评论星级。

官方入口：

- https://support.google.com/business/answer/7091?hl=en
- https://support.google.com/business/answer/3038177?hl=en
- https://support.google.com/contributionpolicy/answer/7400114?hl=en
- https://support.google.com/business/answer/3474122?hl=en
- https://support.google.com/business/answer/7107242?hl=en
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful
- https://www.ftc.gov/business-guidance/advertising-marketing/endorsements-influencers-reviews

## 6. Search Console、Analytics 与因果

- Search Console 的 clicks、impressions、CTR、position 按属性、查询、页面、国家、设备与日期等维度聚合；匿名/低量查询、属性类型、canonical 归属、时区和聚合方式会造成差异。
- GA4 engagement rate 与 bounce rate 有明确计算关系，但不是 Google 自然排名的直接诊断公式。
- GA4 key events、Google Ads conversions 和业务系统结果用途、归因与处理不同；不能机械相等、相加或互相代替。
- 任何排名、流量或转化变化先冻结时间窗、页面/查询段、变更日志和同期变量，再提出原因假设；没有对照与证据时不宣布因果。

官方入口：

- https://support.google.com/webmasters/answer/7042828?hl=en
- https://support.google.com/webmasters/answer/17011364?hl=en
- https://support.google.com/analytics/answer/12195621?hl=en
- https://support.google.com/analytics/answer/13965727?hl=en

## 7. SEO 与 Google Ads 边界

Google 明确说明广告计划不会对站点在自然搜索结果中的呈现产生正面或负面影响。广告搜索词、转化与页面实验可以为市场/意图假设提供证据，但不能直接证明自然排名因果；自然表现也不能证明广告合规、增量或利润。

官方入口：

- https://developers.google.com/search/docs/fundamentals/do-i-need-seo

## 使用日复核格式

`核验日期｜市场/语言｜问题｜官方 URL｜页面更新日（如有）｜当前结论｜本次如何使用｜无法访问项｜置信度`

页面不可访问时，只把该项标为 `needs_official_verification`，不得用旧课程截图补写当前界面或政策。

## 本候选2026-09-06增量

本轮4个限定URL的必要选段另见[源登记](source-register.json)。迁移页观察到Last updated 2026-08-20 UTC，但首次发布日期仍unknown；其他页更新时间未在必要段落确认。国际化B3失败不能由迁移文档中提到语言标注一词来替代完整关系证据；不重试。新细则仅研究候选，正式采用0。



## Owner规则与限定采用｜2026-09-13

官方当前适用的已观察正文可以支持具名平台事实，首发unknown不再单独阻塞，也无需逐页日期例外；非官方来源仍遵守2024-08-01日期窗。观察日、更新日与事件日分别记录；未观察、正文冲突、实际资格、访问停止和执行授权不因新规解除。

本轮不重抓全部旧官方页面。技术/内容/Spam/Local/GSC五项继续使用各自2026-09-04已观察范围；39个旧URL列表只是入口，不能互相代证或冒充本次正文。16908024的2026-09-13独立复核L19–47支持include/exclude/inherit、父属性以及与noindex/其他Search/训练分离；推出事件为2026-08-31，不是首发。16984139保留9月4日历史事实及9月13日访问失败；当前字段未证不作确定性声明。FAQ只采用具名更新条目。

四组2026-09-06选段：site-move-with-url-changes L193–264（更新2026-08-20）支持普通映射、等价永久跳转、canonical/内链与监控；sitemap处置差异未闭，不给删除/持有时限指令。merchant-listing Product L1012–1027、Offer L1099–1115与验证L140–143只支持所读名称、图片、Offer价格币种子集，不认证完整类型资格。3038177 L173–174只支持具名虚拟/共享办公条件；qualify-outbound-links L127–159支持付费放置sponsored及nofollow替代，不证明法律或效果。首发均unknown不再单独阻塞；所读范围外不自动采用。

国际化概述只支持方向/输入，localized-versions访问停止且另已读概述不足以证明HTML自指、返回关系、单边缺失影响/实例正确性，仍不产出实现或签关系正确；停止URL不重试/改入口。新规则不证明任何账号/真实站点合格，也不签公司终验。


## 国际化规则证据刷新｜2026-10-10

本段只更新localized-versions的当前规则证据与候选方法状态，上文各日期的失败/停止及旧对象保留为历史。原登记来源于2026-10-10获准一次重读：[原URL](https://developers.google.com/search/docs/advanced/crawling/localized-versions)自动跳转至[现行官方正文](https://developers.google.com/search/docs/specialty/international/localized-versions)。工具返回411行，文章L128–340全文文本已观察；页尾更新2026-09-21 UTC，首发unknown。仅一次open，底层HTTP次数/状态未知；本次实施没有联网，不能据此恢复其他停止来源。

- 通用与HTML L149–172支持自指、绝对URL、相互返回及HTML载体约束；L155–156支持有条件保留互链部分并关注新增与原始/主导语言的关系，不等于任意漏配许可。
- HTTP L199–217与sitemap L218–231支持各自载体、必要字段和版本集合约束；代码L290–310及fallback L311–320支持语言/地区/脚本与可选未匹配兜底条件。具体修订统一使用[I1方法](international-implementation.md)，不在此维护另一套操作规范。
- 官方HTML示例L175–198已读，只证明文档示例；没有访问例站、ISO外链或第三方验证工具，没有运行本SKU实例。该页不能替代完整canonical/noindex、跨站托管/提交资格或实际站点证据。

规则证据已取得、I1候选已写入；实际应用、Google采用、经营结果与独立终验均未验证。历史问答只交叉支持其所读的返回/部分缺失窄命题，不重复计算来源或抹除未观察范围。来源身份、定位与状态见[来源登记](source-register.json)的international_revision_20261010。一次重读许可已用，其他具名停源不变。
