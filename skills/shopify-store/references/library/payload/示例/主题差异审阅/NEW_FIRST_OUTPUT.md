# SH-R3-SYNTH-THEME-01：新候选K02首答

这两份合成片段可做限定的同版本差异审阅；尚不能确认哪项应迁移。基线C=fixtures/clean，待审R=fixtures/reviewed；每项的两侧文件身份为INPUT_MANIFEST.json中files的`clean/相对路径`和`reviewed/相对路径`及对应SHA-256，不使用未提供文件的虚构身份。材料声明与config/settings_schema.json第4—6行都为Fixture Paper、Internal Synthetic Author、1.2.3。干净性依据是本次自建初始快照及锁定记录，不能单凭版本字段推广到真实主题。

范围为C、R各7个文本/JSON文件，并集8个路径：1个字节相同、5个字节修改、1个仅R存在、1个仅C存在。未运行代码或渲染。无K01报告；审计交接ID为SH-R3-SYNTH-THEME-01/NEW-FIRST，status=proposed，receiver=null，received_at=null，实际编辑/迁移结果=null。

| 差异ID / 两侧身份 | 路径、字段与实际原值 | 类型及用途所见 | 保留建议、未观察与后续核查 |
|---|---|---|---|
| D1 / C→R同路径 | sections/product-info.liquid第2行：`<p class="fixture-note">演示说明A</p>`→`<p class="fixture-note">演示说明B</p>`；第1行`<h1>{{ product.title \| escape }}</h1>`未变 | 代码文件内文字；templates/product.json的main.type指向product-info，这只证明所给模板声明的类型关联 | 保留已证未变的h1文本；A/B采用哪项待合成业务角色确认。若批准B，目标全文已列出；编辑后要核原句、模板实际分配、渲染及对应功能，不能说已应用 |
| D2 / C→R同路径 | config/settings_data.json的/platform_customizations/custom_css：左第7行[]→右第7—9行[`.fixture-title { letter-spacing: 0.02em; }`] | 设置中的CSS文本变化；背景值#FFFFFF及presets未变。所给Liquid未见对应class，只有CSS自身出现该选择器 | 先待核目标元素、实际引用和期望样式再决定保留。按当前实际字段定位，不把此拼写宣布为所有Shopify版本的唯一字段，不写平台控制设置 |
| D3 / C→R同路径 | templates/product.json第11行，/sections/info/disabled：false→true | 模板组织状态变化，FAQ类型及护理说明仍在 | 合成业务角色确认禁用意图；现有材料不证明实际页面已经隐藏，也不证明内容被删除 |
| D4 / C→R同路径 | 同文件第17—20行，/order：[main,info]→[info,main] | 有意义的数组顺序变化；不能按排序消噪处理 | 与D3共同待核，不凭数组推断最终可见顺序。需实际分配和呈现后才能验收 |
| D5 / C→R同路径 | templates/index.json：左13行→右1行；解析后字段、值及数组顺序相同 | 仅JSON排版差异；不计作已证功能变化 | 保留原语义，不增加一项迁移功能；welcome实现未给，无法检查运行 |
| D6 / C无文件→R | sections/unused-note.liquid第1行：`<aside>仅为演示新增的提示</aside>` | 新增文本文件；提供的其他文本未见引用，真实分配/用途未知 | 待本地编辑者补引用与用途，不能按文件名或无引用决定删除，也不能一律要求迁移 |
| D7 / C→R无文件 | snippets/legacy-note.liquid左第1行：`<span>旧演示提示</span>` | 在R文件集合中缺少；来源、删除者、替代实现和功能影响均未知 | 待核是否完整导出及有无引用/替代；不自行恢复或删文件 |
| D8 / C→R同路径 | templates/promo.json：左为`{"sections":{},"order":[]}`，右第1行只有`{"sections": {` | 字节有变化且R JSON解析失败（第2行第1列）；语义比较未完成 | 合成编辑责任人补齐可解析的原始待审文件；不得猜测缺失内容、默修或称已完成该模板审计 |

身份C/R只能支持本次已给副本比较，不能归因某位开发者或某个应用。settings_schema两侧相同不替代版本来源依据。assets/badge.webp无任一侧字节，既不能判存在/变化，也不能核视觉或权利；faq/welcome实现、完整主题、页面分配及真实运行材料缺失。报告没有覆盖这些部分，不能声称找全全部修改、完成迁移或所有功能通过。

先请本地合成编辑责任人补齐D8可解析原文及其身份，再回到该项完成语义审阅；其他差异保留为有据待核清单。后续保留决定需要合成业务角色确认，执行须另有具名授权。这里完成的是审阅交接，未做主题编辑、安装、删除、更新或发布，亦未给星级许可或效果承诺。
