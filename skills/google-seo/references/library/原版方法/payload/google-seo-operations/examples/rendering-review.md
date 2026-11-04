# 渲染完整示例｜既有成品适配，非新调用

全部题面合成；下列R是给定快照，不是运行I获得。不以HTTP/JSON检查冒称Googlebot实测，.example不访问。已复用的日期化技术方法见[工作流](../references/workflow-and-templates.md)。

### 3.1 任务与元信息

```json
{
  "fixture_id": "SEO-B2-SHELF-01",
  "provenance": "synthetic_not_browser_or_googlebot_test",
  "url": "https://shelfcase.example/products/shelf-40",
  "market_language": "US/en",
  "page_task": "Let a shopper check whether the shelf fits a 42 cm wide space",
  "owner_truth": {"sku":"SH-40","name":"ShelfCase 40","width_cm":40,"depth_cm":18,"height_cm":22,"as_of":"2026-09-06T01:10:00+08:00"},
  "permission": "offline_diagnosis_and_evidence_request_draft_only",
  "business_result": "reconciled_paid_order",
  "business_measurement": "UNKNOWN",
  "account_access": "none",
  "parent_page_given_link": "<a href='/products/shelf-40'>ShelfCase 40</a>",
  "page_response": {"http":200,"redirect":false,"x_robots_tag":"absent_in_fixture"},
  "robots_file": "User-agent: *\nAllow: /\n",
  "actual_google_crawl": "UNKNOWN",
  "actual_google_render": "UNKNOWN",
  "gsc_indexed_state": "UNKNOWN",
  "generated_snapshot_time": "2026-09-06T01:12:00+08:00",
  "snapshot_elapsed_ms": 2000,
  "latest_production_change": "UNKNOWN"
}
```

父页链接、robots 与响应只是题面输入，未从网络取得。40 cm 是虚构商家真值，不可发布为真实商品尺寸；“是否适合 42 cm 空间”还需安装余量等事实，不能在本例保证可安装。

### 3.2 初始 HTML（题面 I）

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>ShelfCase 40 — dimensions and fit</title>
  <link rel="canonical" href="https://shelfcase.example/products/shelf-40">
  <script defer src="/assets/product.js"></script>
</head>
<body>
  <nav><a href="/shelves">All shelves</a></nav>
  <main>
    <h1 id="name">Loading product</h1>
    <section id="dimensions" aria-label="Dimensions">Loading dimensions</section>
    <div id="guide"></div>
  </main>
</body>
</html>
```

### 3.3 给定渲染后 HTML（题面 R；不是执行以上脚本得到）

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>ShelfCase 40 — dimensions and fit</title>
  <link rel="canonical" href="https://shelfcase.example/products/shelf-40">
  <script defer src="/assets/product.js"></script>
</head>
<body>
  <nav><a href="/shelves">All shelves</a></nav>
  <main>
    <h1 id="name">ShelfCase 40</h1>
    <section id="dimensions" aria-label="Dimensions">Dimensions unavailable</section>
    <div id="guide"><a href="/guides/measure-space">How to measure your space</a></div>
  </main>
</body>
</html>
```

### 3.4 资源与处理分支证据（题面 T）

| 相对时刻 / 请求 | 给定状态与内容 | 给定调用关系 |
| --- | --- | --- |
| 0 ms `/products/shelf-40` | 200，HTML I | 顶层文档 |
| 100 ms `/assets/product.js` | 200 | 启动名称、尺寸两个独立请求；插入 guide 的 `<a href>` |
| 180 ms `/data/sh-40-summary.json` | 200；`{"name":"ShelfCase 40"}` | 成功分支更新 `#name` |
| 220 ms `/data/sh-40-dimensions.json` | 403；正文未提供 | 非成功分支将 `#dimensions` 设为 `Dimensions unavailable` |
| 250 ms `/metrics/view` | 403；正文未提供 | 独立上报，无正文或导航写入，无阻塞等待 |
| 2000 ms 快照 | HTML R | 名称和链接已有，尺寸值仍缺失 |

题面给定 console 事件：`dimensions_request_failed; status=403; target=#dimensions`。这里的 403 原因（路由权限、边缘规则、应用逻辑或其他）、响应头、请求上下文均未知。未提供完整脚本，调用关系仅作为本题明确输入，不冒充从源代码反向验证。两个 403 不能因为状态码相同就归为同一根因。

## 4. 实际差异诊断输出

### 4.1 HTML 与链接比较

| 字段 | 初始 I → 给定 R | 判断 |
| --- | --- | --- |
| 名称 | Loading product → ShelfCase 40 | 在题面快照中已出现，不能说“JS 全部没运行” |
| 尺寸 | Loading dimensions → Dimensions unavailable | width/depth/height 仍缺，用户核心尺寸任务未完成 |
| guide 链接 | 无 → `<a href="/guides/measure-space">…</a>` | 给定动态链接形式可解析；不是 onclick-only，不应因动态生成就判坏链接 |
| 分类链接 | `/shelves` 保持不变 | 形式无已知问题；其目标 HTTP 未提供 |
| canonical/title | 前后相同 | 本题未见变化，不等于 Google 选择该 canonical |
| robots/noindex | 题面未给阻止指令 | 不能把缺尺寸归因于 robots/noindex；真实服务器行为仍未知 |

### 4.2 最早有证据断点

| 阶段 | 已观察（仅题面） | 未知 / 单一对象状态 |
| --- | --- | --- |
| 发现 | 父页给了有效形式链接 | Google 是否实际发现 UNKNOWN；不是已证实的第一缺陷 |
| 顶层抓取 | 文档 HTTP 200，题面 robots 允许 | 真实 Googlebot 响应 UNKNOWN |
| 关键资源获取 → 渲染 | 尺寸资源 403；给定失败分支对应 R 的尺寸缺失 | **第一处已证实异常为关键尺寸资源获取失败并传导到渲染内容；NEEDS_FIX**。403 根因 UNKNOWN |
| 索引 / 呈现 | 无一方证据 | UNKNOWN，不由快照或 canonical 补造 |
| 访问 / 业务 | 无流量和订单证据 | UNKNOWN，不算损失金额或排名下降 |

第一断点限定为“题面渲染过程中的关键资源失败”，不是“Googlebot 被封”或“整站不能抓取”。`/metrics/view` 被给定为非关键独立上报，优先修它不能补上尺寸。初始 app shell 本身也不是这里已证实的缺陷。官方文档只支持诊断方法，不证明本题的运行时事实。

报告主状态 `NEEDS_FIX`：尺寸内容缺失已证实，但 403 的原因没有证据，所以不能直接关闭防火墙、放开权限、加 Cookie、重做 SSR 或发布替代内容。可以完成离线取证草稿；本次无须实际账号操作，不把未来权限需求自动当作当前报告的人工阻断。

## 5. 唯一优先动作：尺寸资源定点取证草稿

```json
{
  "draft_id": "SEO-B2-DIMENSIONS-EVIDENCE-01",
  "status": "DRAFT",
  "request_type": "delegated_evidence_request_not_sent_to_site_owner",
  "goal": "Identify why the dimensions resource returns 403 in the same render context before choosing a fix",
  "asset_alias": "SHELFCASE-PAGE-01",
  "target_page": "/products/shelf-40",
  "target_resource": "/data/sh-40-dimensions.json",
  "evidence_owner": "authorized_site_technical_owner_UNKNOWN",
  "time_contract": "one_correlated_render_attempt_timestamp_and_timezone; same_version_for_page_resource_and_DOM",
  "minimum_fields": [
    "relative_resource_path_and_HTTP_status",
    "response_content_type_and_sanitized_error_category_if_available",
    "request_initiator_and_page_build_version",
    "sanitized_console_error_with_target_selector",
    "rendered_dimensions_text_and_snapshot_elapsed_time",
    "whether_evidence_is_browser_test_or_Google_test_or_server_log"
  ],
  "optional_if_already_available": ["authorized_owner_supplied_sanitized_deny_layer_or_rule_category"],
  "exclude": ["cookies", "authorization_headers", "tokens", "IP_addresses", "customer_records", "raw_full_logs", "full_HAR", "secrets"],
  "delivery": "local_sanitized_JSON_or_short_text_with_generated_at_and_hash",
  "real_request_or_account_read_performed": false,
  "no_change": ["robots", "canonical", "routing", "authentication", "WAF", "SSR", "CMS", "deployment", "metrics_endpoint"],
  "if_unavailable": "keep_403_cause_UNKNOWN_and_stop_implementation"
}
```

给未来获授权技术负责人的可直接使用正文：请只提供上述单页面、单尺寸资源在同一次渲染中的脱敏状态、构建版本、发起关系和尺寸 DOM；说明证据来自普通浏览器还是 Google 测试。若已有可用的拒绝层分类，请附分类，不导出完整日志或凭证。不要为取证改访问控制，也不要把浏览器结果标成 Googlebot 结果。当前草稿未实际发送，未知负责人不补造为 使用者。

本轮成功证据：请求精准定位尺寸资源，并能区分资源错误原因未知、尺寸未出现和可正常解析的动态链接；不以一份全站审计替代单点问题。未来取证退出条件：同一版本、同一上下文的状态/发起关系/DOM 足以判断拒绝发生在哪层；若仍只有裸 403，则原因保持 UNKNOWN，另交最小补证方案。

未来修复验收字段（不是当前实施）：资源按授权设计可取得正确尺寸，渲染后尺寸值与商家真值相符，名称/链接/canonical 保持预期，错误分支安全。不能只凭 HTTP 200 就通过，也不要求凭证公开。观察窗口是一组有关联时刻的完整渲染证据；本题 2000 ms 不是通用超时阈值。若要真实重现、读账号、查看原始日志或改生产配置，单独授权。当前没有状态修改，回滚为撤回草稿；未来修复必须另订可逆范围。

即使未来浏览器尺寸正常，仍不能声明 Google 已渲染/索引。Google 侧证据是后续独立范围，本批不发 URL Inspection 请求或登录 Search Console。


