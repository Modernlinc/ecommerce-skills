# 静态 UTM 设计与离线 URL 检查（FB-1）

适用：通过[读前准入](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__permissions-and-live-gates.md#打开资料前的准入)的网站广告准备。交本次标签字典、广告对应表、完整URL字符串和检查结果；不进入账户，不打开生成的追踪链接。下方旧示例使用保留域名；一般方法及新工具不限制为该商品/域名。本版是待独立检查的离线准备，不是测量部署。

## 先决定本次要辨认什么

UTM 是点击入口的标签，不是追踪系统本身。先固定目的地、渠道、活动命名、广告/素材版本和需要区分的层级，再生成链接。仅给“请设置 UTM”不算完成；交出本次实际字典和每条拟广告的 URL。

Google Analytics 官方说明区分来源、媒介、活动和创意，参数值区分大小写；2026-10-19读取的建议使用统一命名，付费社交媒介可用 paid_social。utm_term 的原定义是付费关键词，不默认拿来装广告组。[GA 官方字段与命名说明](https://support.google.com/analytics/answer/10917952?hl=en)

本例采用小写英文、数字、下划线的公司命名约定，便于核对；这不是平台强制格式。非英文合法值可以编码，但在同一方案内保持一种命名约定。

|字段|要回答的问题|本例静态值|可证明与不可证明|
|---|---|---|---|
|utm_source|此链接计划来自哪个来源？|facebook|仅本例限定 Facebook 的链接；跨 Instagram 等来源不能照抄为已识别来源|
|utm_medium|属于哪类营销媒介？|paid_social|不是 feed/reels 等版位；不保证分析工具已正确分组|
|utm_campaign|哪一次营销活动？|fb_us_organizer_20261019|与本地拟系列名完全一致；不是已创建的 Meta 系列 ID|
|utm_content|哪个广告/表达版本？|c01_a01_demo_v1 或 c01_a02_fit_v1|稳定映射本地广告编号及素材版本；换主张/版本应更新映射|
|utm_term|是否确需关键词维度？|本例不加|不把广告组冒充官方关键词含义；广告组保留在本地对应表|

若任务已有命名规范，优先沿用并解决冲突，不为小写重命名历史记录。是否增加 utm_id、utm_source_platform 或自定义字段，取决于已确定的分析/导入合同；不要凭空发明平台 ID。用户名、邮箱、订单号、客户 ID、凭据不得进入 URL 标签。

## 静态值、动态模板、实际替换值不能混为一项

- 静态值：现在就能确定且写入字符串，例如 facebook。本例只用静态值。
- 动态模板：平台在特定时点/动作替换的表达式；准确拼写、支持对象、名称更改行为和替换时点均需当前 Meta 原文。
- 实际替换值：经获准点击/回读才观察到的最终字符串。模板存在、预览展示或离线 URL 解析成功均不能证明真实替换发生。

2026-10-19 Meta 动态 URL 参数帮助页仅返回登录/限制页；一次定向补搜仍未取得可核正文。动态字段保持 NEEDS_RESEARCH，不从课程整理文本或 GA 举例推断 Meta 可用语法。不得把点号和下划线互换“修正”。静态方案可继续；动态需求单列：目标字段、目标平台对象、官方适用说明、替换后样本和与对象表一致性，取得后再形成具名版本。[待核 Meta 帮助页](https://www.facebook.com/business/help/2360940870872492)

## 完整静态方案：两条拟广告、一个目的页

合成事实：美国英文收纳用品概念，Facebook 来源限定；落地页路径、产品款式选择与锚点已由本题给定，不是线上可用证明。草稿对象均 exists_in_meta=false、published=false。

|本地系列 → 广告组 → 广告|表达任务|活动名 / content|目的地|
|---|---|---|---|
|C01 → S01 → A01|展示桌面收纳过程|fb_us_organizer_20261019 / c01_a01_demo_v1|blue 款式，details 锚点|
|C01 → S01 → A02|解释尺寸与适配|fb_us_organizer_20261019 / c01_a02_fit_v1|同页同款同锚点|

原始目的 URL（按字符串处理）：`https://shop.example/products/organizer?variant=blue#details`

A01 完整结果：

```text
https://shop.example/products/organizer?variant=blue&utm_source=facebook&utm_medium=paid_social&utm_campaign=fb_us_organizer_20261019&utm_content=c01_a01_demo_v1#details
```

A02 完整结果：

```text
https://shop.example/products/organizer?variant=blue&utm_source=facebook&utm_medium=paid_social&utm_campaign=fb_us_organizer_20261019&utm_content=c01_a02_fit_v1#details
```

两条保持来源/媒介/活动一致，只用 content 区分广告版本；这不会使自动投放变成均等曝光实验。以后若广告组/市场/页面发生实质变化，先更新对应表与命名版本，不能把旧点击数据重新归到新对象。跨来源无法核实际平台时，给分别限定的静态草案或明确来源未知，不虚称自动识别。

## 生成与检查的可执行顺序

1. 以完整 URL 分离 scheme、host、path、query、fragment。一般任务只接受https，先从独立的页面/款式说明确定精确origin/path，再与待处理URL核对，不从待核URL反推正确目的地；不含userinfo。UTM 放在 query，不能追加到 # 后。
2. 先读取全部键值及数量，保留原非 UTM 参数（本例 variant=blue）。存在同名 UTM、大小写混用键、空值、旧活动或与字典冲突时，先报冲突与候选修复；不使用“最后一个覆盖前一个”隐藏问题。即使重复值相同，也只在确认本次方案归属后明确修订为单值，不自动覆盖。非 UTM 的重复/顺序也不擅改。
3. 无 query 时以 ? 开始，有 query 时正确追加 &；用 URL/URLSearchParams 等标准解析器处理值，别靠整串拼接。对含签名、时效 token、未知路由语义的链接，不做重序列化或试点，交给具名实现核定。
4. 值按一次编码处理：先给解析器原始值，不把已编码的 %20 再编码为 %2520。空格可能规范为 + 或 %20；原始加号需 %2B，值中的 & 需 %26，中文可百分号编码。比较解码后的值而非只比字符串外观；非法百分号/无效 UTF-8 应报错，不用解析器宽容行为当有效。
5. 检查生成后每个预期字段恰好一个，字典值一致，非 UTM 参数含义与 fragment 保持，URL 不含未替换模板。返回完整 URL 和逐项结果，不只交参数串；将来实际使用只选一种追加机制，避免目标网址和后台参数栏重复添加。本例不指定当前后台按钮。
6. 有重定向时分别保留“初始 URL、各跳转证据、最终 URL、观察时间和授权”。静态解析只能核字符串，不能证明重定向保留参数、页面可访问或锚点存在。本轮所有 live_final_url、redirect_chain、GA 接收值均 UNKNOWN。
7. 将来的获准验证应确认最终主机/路径/商品/语言/款式符合目的，query 与 fragment 位置正确，参数未丢失/替换，实际分析采集值与广告对应表一致。跨域、短链、平台追加参数与跳转可能改变结果；无证据只停止相应测量结论，不阻止离线文案/参数交付。

编码与 URL 分段基于标准解析语义；本节是公司检查程序，不声称属于 Meta 官方设置步骤。[WHATWG URL 标准](https://url.spec.whatwg.org/)

## 可手工核对的边界例

|输入或变化（仅本地解析）|应观察到什么|处置|
|---|---|---|
|https://shop.example/products/organizer|没有 query/fragment|按字典加 ?utm_source=…；检查 content 对象一致|
|https://shop.example/products/organizer?variant=blue#details|有已有 query 与 fragment|使用上方完整结果；variant 与 details 保留|
|https://shop.example/products/organizer?utm_source=facebook&utm_source=instagram|同键两个来源|NEEDS_FIX；先识别所属方案，不猜哪条应生效|
|https://shop.example/products/organizer#details?utm_source=facebook|UTM 在 fragment 中，query 没有它|NEEDS_FIX；保留已确定锚点并把参数移到 query 的候选待审|
|https://shop.example/products/organizer?utm_content=desk%20%26%20cable%2Bkit|解码值为 desk & cable+kit|编码单项有效；这不是完整活动 URL|
|https://shop.example/products/organizer?utm_content=desk%2520kit|一次解码仍为 desk%20kit|与期望原值 desk kit 不符，疑似二次编码|
|https://shop.example/products/organizer?utm_content=%ZZ|非法编码|NEEDS_FIX；回到原始值，不猜替代文本|

本例合格只表示字符串、字典和映射一致。未知真实配置是 NEEDS_RESEARCH，受影响字段保留 UNKNOWN；存在可见重复/错位置则为 NEEDS_FIX。两者不要混用。

## 新输入静态工具

先按权限页完成资料读前准入，再用包内[static_utm.mjs](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__tools__static_utm.mjs)。已有Node 18及以上时，在本说明所在目录运行：

```text
node payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__tools__static_utm.mjs --input /明确获准目录/本次输入.json --output /明确获准目录/本次新结果.json
```

显式单文件输入与新输出，输入输出分离；父目录须已存在，拒绝覆盖、符号链接（含路径中间层）、隐式目录扫描。仅标准库，无网络。--help只打印说明；空参/未知参不读文件。资源边界为UTF-8 JSON不超过1 MiB、每批1—500条，不是固定测试样例或平台额度。读取后若发现敏感内容停止处理；工具中的风险键拦截只是补充，不能替代读前准入。

输入合同（精确字段，不接受额外键/重复JSON键）：
- 根：schema_version=1；admission；ads数组。
- admission：classification为synthetic/public_non_sensitive/owner_non_sensitive之一，read_scope_confirmed=true，confirmation_ref为本次真实准入说明位置。它记录调用者声明，不自动证明有权。
- 每条：ad_id为本地技术编号（字母开头、其余字母数字/下划线/点/横线，最长64字符且批内唯一，不放个人信息）；destination_confirmation；destination_url；tags。
- destination_confirmation：origin为独立确认的精确HTTPS origin（无尾斜杠、无路径），path为规范编码的绝对路径，evidence_ref为页面/款式确认依据；不得由待核URL自填。工具只比声明一致性，不认证这个依据独立有效。
- tags：必有utm_source/utm_medium/utm_campaign；逐广告区分通常增加utm_content；需要时可用utm_term/utm_id/utm_source_platform，不自动加值。仅接收非空原始语义值，已编码的百分号转义须退回原值，避免二次编码；新的自定义字段另审合同，不冒充标准参数。

输出按index及合格ad_id列完整URL和确定性检查；失败条只含序号/错误代码，没有可用URL或原始敏感值。退出0表示全部字符串检查通过，1表示逐条失败但结果已保存，2表示参数/合同/文件失败；无效根合同不写结果。成功保存后工具实际重读并报告哈希/一致性，接收人再按对象表核对应关系。部分失败不授权使用失败条，也不使其他合格条成为平台已验证。
已有任意UTM（包括大小写/编码混用）先停该条要求明确解决；新字典不覆盖旧值。原非UTM query字节、顺序和fragment保留，标准解析核值、一次编码新值；签名/身份/凭据键、非法编码、动态宏、错误目的地均拒绝。原query如有不明路由/时效语义，Agent不调用工具重写。工具不会打开链接、检查跳转或GA接收。
没有Node时可交完整人工离线字典/候选URL，但明确未运行此校验，不能称工具通过或强行安装依赖。无工具不阻断文案、结构及受限交接。

## 从点击标签到经营结果的证据链

本地对象对应表 → 最终 URL 的实际值 → 分析工具的来源/活动识别 → 订单与付款/退款核对 → 同窗口贡献判断，各段需要自己的证据。UTM 不负责 Pixel/CAPI 去重、同意管理、跨设备识别、广告成本导入或订单关联；缺任一段不能用“UTM 已配置”补齐。用户会话、平台归因和业务订单可能不一致，原因需核而非互相覆盖。

继续使用[测量四层](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__measurement-attribution-and-events.md)和[经营口径](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__business-math-and-unit-economics.md)。本版 causal_claim_allowed=false、live_action_authorized=false；不承诺完整 ROI 还原或因果增量。

