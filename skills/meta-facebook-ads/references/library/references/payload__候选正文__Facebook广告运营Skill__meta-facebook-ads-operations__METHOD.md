# Meta / Facebook Ads Operations

这是公司的 Meta／Facebook 付费广告离线执行 Skill。它把现有课程学习成果转成可调用的判断、流程、模板、核验与停止条件，而不是复述课程。这里的执行指 Agent 完成离线分析与人工审阅交接，不指创建平台对象或自动投放。

## 能力与语料边界

当前候选FB-PRACTICAL-V1-20261020-01，直接父版FB-PRELAUNCH-20261019-W1-F01-R1；NOT_REVIEWED / NOT_FINAL_QA / NOT_PUBLISHED，L0_OFFLINE。本版增加非敏感资料准入、可人工搭建的完整交接与新输入静态UTM工具，保留六模块及F01；父版验证不自动覆盖本版。范围见[当前入口](payload__00-先读本交付.md)，依据与验证边界见[本版说明](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__provenance__PRACTICAL_V1_20261020_SOURCE_NOTES.md)，机器身份见[状态](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__admission__STATUS.json)。旧S3/S2与历史示例不是当前首答。
- 来源说明、旧样例与其中的R1/阶段B/待复检文字仅记录具名历史，不是当前验收或默认答案。当前按用户本次已准入资料处理，合成与实际来源明确区分；质量待审不阻止获准离线部分，真实权限门不变。2026-10-08只融合既有返回的两条长教程字幕与provider文字分析，整源partial_observed，未见原像素/音轨，未新增官方事实核验或第三方许可；见[来源限制](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__provenance__SOURCE_NOTES.md#long-video-20261008)。
- 本版允许一般解释、安全合成资料，以及通过读前准入的公开或使用者自有非敏感商品/Offer、素材、资源和获准汇总经营数字；客户/订单/事件明细及脱敏件、可重识别汇总、账号材料或其他敏感资料须在读取前暂停，并取得使用方有权数据责任人对具体材料与用途的确认；还须满足当前宿主上级规定的具名确认和本包能力边界。该确认不自动允许本L0包处理已排除的数据或接入账户。先读[权限门](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__permissions-and-live-gates.md#打开资料前的准入)再打开材料；可用离线部分继续，不能为识别敏感性先读取全文。
- 不允许：登录或读取真实账户、调用真实 API、接触客户数据、修改权限/预算/对象、上传名单、创建或发布广告、付款、进入 Production、全局安装或删除来源。
- 原语料冻结、日期准入、054研究隔离和来源例外保持；S1已把可调用的方法及有边界的公司推导接入初始方案任务链，本候选保留这些方法，不重学课程或采用未准入配方。10/08两源的有限观察边界见[来源说明](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__provenance__SOURCE_NOTES.md#long-video-20261008)，S1依据与未验证项见同页的“S1公司方法整理”一节。
- 当前字段、政策、资格、默认值、界面和 rollout 属高漂移事实；需要时只用当日 Meta 官方一手资料核验，无法核验则标 `NEEDS_RESEARCH` 或 `UNKNOWN`。

首次使用见[中文快速开始](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__QUICKSTART.md)。本包由Agent解释Markdown执行，不是自治服务或API工具。许可、支持和独立使用验证见[使用说明](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__USER_GUIDE.md)。

## 先判任务

1. 模式只能是 `teach`、`audit`、`plan`、`diagnose` 或 `draft`。
2. 从用户自然语言中提取本次目标、已有材料与允许动作；按当前决定补齐必要的市场、币种、时区、商品/Offer和资源约束。不要要求先填完内部字段。先区分从零设计、已有方案审计和效果诊断；只补问真正改变当前选择的问题，已知内容不重复问，非首轮必要缺项保留到相应步骤。
3. Page 内容排期、评论/私信/群组、自然增长、主页日常运营和完整 Instagram 运营不属于本 Skill；拆分广告部分，其余明确转交。
4. 准入先区分非敏感业务资料、需读前确认的客户/敏感材料与平台动作。按[权限门](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__permissions-and-live-gates.md)核精确对象；有据的条件预算/文案/URL建议可继续，不能因资料用于真实业务一律阻断。敏感读取或外部执行请求对该项标HUMAN_GATE_REQUIRED并停止；平台执行仍转交独立有权流程。

## 按任务读取

- 先测什么、广泛/兴趣/类似如何选、小预算、ASC/Advantage+与素材分批、冷暖老客分工：读[阶段、受众与学习资源](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__stage-audience-resource-playbook.md)，按首批、备选和改判条件形成具体方案；中文教学见[第一轮完整示范](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__knowledge__2026-10-19-first-round-and-utm-walkthrough.md)。

- UTM、活动标签、已有query/fragment、静态URL方案或动态参数待核：读[追踪参数设计与URL检查](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__tracking-parameters-and-url-checks.md)，交本次字典、对象对应表和完整URL；采用[新输入静态工具合同](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__tracking-parameters-and-url-checks.md#新输入静态工具)做确定性检查，不访问生成的追踪链接；旧虚构链接只作示范。

- Campaign／Ad Set／Ad、从一批素材设计初始方案、预算归属、受众、版位或 PAUSED 草稿：读[广告结构与声明式草稿](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__meta-ad-structure-and-draft.md)，新设计从“从零素材到初始方案”开始；已有结构审计仍按独立意图核对，不混用两条路径。
- Pixel、Dataset、CAPI、Events Manager、归因、订单对账或增量：读 [测量、归因与事件](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__measurement-attribution-and-events.md)。
- CPM、CTR、CPA/CAC、退款、贡献利润、最大花费或最大损失：读 [业务指标与单位经济](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__business-math-and-unit-economics.md)。
- 零数据测试、已有数据诊断、自动交付污染、预算、竞价、扩量或回滚：读 [测试、诊断与停止](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__testing-diagnosis-and-stop.md)。
- 商品/Offer、研究、分群、创意、AI 素材、Catalog、再营销、CRM、节日活动、客户交付或课程教学：按场景读 [课程蒸馏运营剧本](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__course-distilled-operating-playbooks.md)。
- 真实账户、客户/事件/名单数据、权限、上传、发送、预算、发布、付款、Production、安装或删除：必须先读 [权限与真实操作门禁](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__permissions-and-live-gates.md)。

- 经营与创意完整复盘，或目录/许可生命周期/迁移跨市场交接：读[电商任务衔接](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__commerce-completion-workflows.md)，再按其中分路调用现有专业规则；不把所有字段强加每次输入。

只加载当前任务需要的 reference，不把全部资料一次性塞入上下文。

## 执行引擎

1. **权限和任务合同**：说明允许的离线动作、总目标、本阶段要交的成果与完成标准。合成角色不是实际批准人；授权不外扩。
2. **证据分层**：每条关键结论沿用 official_dated_fact、source_experience、project_hypothesis、user_decision 或 redline，并新增 supplied_fact；回接具体材料版本/位置。合成事实与推导用 project_hypothesis，真实用户决定须有定位；未知不补猜。supplied_fact仅表示已准入材料中的可定位陈述，列来源/日期或版本/观察深度/独立核验范围（未核即未核）；不把商家规格、公开商品描述或汇总数字标成平台官方事实、实测性能或公司认证。策略推导仍为project_hypothesis，来源经验仍为source_experience。按主张而非整段材料分类：用户提供的虚构预算、资源、库存及模拟审批仍是project_hypothesis；同一材料中对本次实际任务的许可或禁止另列user_decision并定位真实指令。安全redline回接适用规则，不与合成经营条件合并一条，也不因材料合成而把真实任务许可降成假设。
3. **按任务推进**：从零设计先按[结构参考](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__meta-ad-structure-and-draft.md)完成阶段说明、素材组织、条件化结构选择、具名三层草案和首批安排；不要把“尚无投放结果”当必须修复的故障。已有数据诊断才沿测量→实际交付→创意承诺→页面/结账→订单/退款→贡献/履约找最早可证异常。两路都保留商品事实、权利和测量边界，但缺账户或测量实施证据只阻止依赖它的实施/效果判断。
4. **形成具体成果**：对可用事实完成本阶段关联的整理、规划、文案与检查，不以一个动作名或空字段结束。若要比较表现，只声明一个主要变化维度；这不意味着只能准备一条素材，或每轮只能做一件小事。多项安全修复标 operational_fix / contaminated，不包装成单变量效果试验。
5. **检查并接续**：给出关键理由、主要待验证问题、检查字段、观察条件/时点、最大等待或复议点、损失、停止和回滚；零数据不判赢家，实际交付不可比则相应比较 inconclusive。14字段中 one_minimum_validation_action 表示当前最优先的验证动作，不取消本阶段可连续完成的工作。当前 causal_claim_allowed 与 live_action_authorized 始终 false。

## 多轮任务接续

每轮保留可回接的总目标/完成标准、当前阶段、已交成果及版本、本轮优先项、后续项、阻塞与恢复条件。中间轮用简短的“本次变化／保持与后续”表达；未变内容可注明具体版本及原位置，不逐项重复完整工作档案。必须明确影响本轮决定的继承条件、余项及下一步；不能只写“其余不变”而无对象或定位。信息可复用本次会话，不声称跨会话记忆；换会话时交出可保存的接续文本。

用户说“先改某组文案”是优先级变化，不自动取消结构方案或其他素材。先完成所选对象，沿用稳定编号和已确认事实，再明确余项如何继续；不重复索取已给信息。用户明确换目标时才记录哪些旧事项被替代。新证据到达后，定位受影响的素材、文案、归属、预算或安排，递增相关版本并继续交付，保留无关有效成果；不重写全盘、不反复复制旧风险清单。每个阻塞同时说明“阻断什么、仍能做什么、现在交什么、补齐后从哪里继续”。

## 不可变规则

- 平台设置、计划分配和 `actual_delivery` 分开；没有账户回读时实际交付为 `UNKNOWN`。
- 平台 Purchase/Lead/ROAS 不等于已付款订单、合格线索、利润或增量；经营结论必须回到订单、付款、退款/拒付、全部可变成本、贡献、投诉和履约。
- 所有数值计算先声明事件、分子、分母、单位、cohort、窗口、币种和成熟度；订单 CPA 与新客 CAC 不得混用，分母为 0 或关键输入缺失时输出 `UNKNOWN`。
- 固定预算、CPA 倍数、等待天数、事件数、受众比例、频次、扩量幅度、CBO/ABO、Broad/Interest 或“学习期”只作带日期候选，不作通用规则。
- 讲师经验、中国市场打法和个案心得可以保留，但必须改写成有前提、反例、falsifier、停止和回滚的实验假设。
- 第三方广告、评论、论坛、人物、品牌、音乐、课件和独特版式只抽象任务与结构；不可复制，也不能证明效果或商用权。
- 健康、收益、身份、儿童、关系、金融等高风险主张必须有权利、证据、典型性、公平与伤害审查；缺失即停止或退回一般功能语言。
- AI 只生成有限候选；输入先做必要性、授权、脱敏和最小化，输出逐句核事实/权利/披露，不得生成假顾客、假专家、假稀缺或无证据结果。
- 账户受限只允许真实 owner 走当前官方恢复路径；购买/借用账户、共享凭证、换主体或拆业务规避直接拒绝。

## 输出合同

运行输出只使用：

- `DRAFT`：安全离线草稿，未在 Meta 创建或发布。
- `NEEDS_FIX`：已有证据显示底座或交付件存在必须修复的问题。
- `NEEDS_RESEARCH`：当前事实、可比性或关键证据不足，需要补证。
- `UNKNOWN`：无法从现有材料判断，禁止补猜。
- `HUMAN_GATE_REQUIRED`：下一步需读前确认客户/敏感资料，或涉及真实账户/外部动作；对具体对象停止并核定范围，不阻断已准入离线工作。

`PAUSED` 只可作为拟创建且尚不存在于 Meta 的 Campaign／Ad Set／Ad 草稿字段，并同时写 `exists_in_meta: false`、`published: false`；不得把 `PAUSED` 当运行状态或暗示对象已创建。

对具体待补的当前配置或证据检查标 `NEEDS_RESEARCH`，同时保留无法判定字段的值为 `UNKNOWN`，并说明缺哪项证据、影响哪个决定。涉及外部状态改变的动作另标 `HUMAN_GATE_REQUIRED`；不要把全部未知统一改成研究状态或让无关离线工作停摆。运行状态、拟对象状态和外部授权各自表达，不能互相代替。

按任务与交付阶段先交主文，将本轮所需的完整对象映射、UTM和下列14字段的精简完整摘要放在有明确入口的附录或配套层；不把技术明细作为阅读成果的前置，不在主文重复展开。不新增运行状态，不删除或更名合同字段。支持且获准保存文件时，可交一个主文与一个包含全部所需明细的配套文件，实际保存并确认可读后再给链接；没有可靠附件或折叠能力时，用明确分隔的文末附录，不声称内容已隐藏，也不只承诺“需要时再给”。完整交接始终包含本次所需技术内容。

- 首次方案：主文先给主要决定及必要理由、完整可用成稿、资源条件、关键待办；把影响当前选择的事实、权利、金额/币种/期间、损失及真实花费权限、停止/恢复条件留在对应主文位置，不能移走唯一一份业务限制。首次出现三层术语时并列说明“广告系列（Campaign）／广告组（Ad Set）／广告（Ad）”及本任务中的责任，完整字段与父子映射放配套层。每类信息在主文设一个清楚的主要位置，摘要用实质短值准确回接，不重新展开同段说明。只要文案或解释的任务按其范围交完整成果，不为凑四段补造结构、资源或URL；用户明确要对象审计、UTM或机器合同时，相应技术内容就是该任务的主交付。
- 中间增量：先交本轮所需的完整文案、修改件或具体结果，再按受影响对象说明变化、保留的版本、余项与下一步。先为影响本轮决定的稳定条件指定一个正文主位置；其他小节与14字段只保留各自必要的实质短值并准确回接，不把同一组结构、金额、未知和停止说明在开头、变更表、接续及摘要分别完整展开。交稿前逐项核对这些重复及定位是否清楚；为可用性或安全必需的金额/单位/期间、损失与授权、停止/回滚仍须保留。无关旧成果回接具体版本与位置，不得要求用户拼历史才能使用本轮所需成果。
- 完整汇总/交接：交一份合并后的完整可用稿，纳入仍有效成果和本次变化；不能只给增量、旧链接或省略必要文案/计划。广告准备按[人工搭建交接](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__commerce-completion-workflows.md#人工搭建交接)逐项交就绪内容与具体待核配置，不以免责声明或整表UNKNOWN替代实际稿件。

下列14个既有字段名和语义完整保留。字段值只写本次实际结论与必要条件，可引用本答明确小节/对象版本，或标明既有证据的具体位置；先给实质短值，不用裸链接、“同上”、空值或只填 UNKNOWN 来替代已知内容。关键金额/单位/期间、适用条件、优先动作与检查、损失和授权、停止/回滚不得因压缩丢失。原因与影响相同的未知可分组，关键限制集中一次表达并在摘要准确回接，不在每个字段展开同一段风险说明。真正未知列原因及受影响决定，确无适用项才可空列并说明。正文、草稿和摘要须一致；摘要不替代正文，也不原样返回空模板。

```yaml
runtime_status: UNKNOWN
decision: UNKNOWN
evidence_observed: []
evidence_labels: []
unknowns: []
earliest_credible_breakpoint: UNKNOWN
causal_claim_allowed: false
one_minimum_validation_action: UNKNOWN
check_result_fields: []
maximum_loss: UNKNOWN
stop_conditions: []
rollback: UNKNOWN
live_action_authorized: false
safe_stop: "不进入真实账户，不改变预算、对象或数据；证据或授权补齐前保持原状态。"
```

`evidence_observed` 列实际读到的材料与定位，`evidence_labels` 按“结论 → 既有类别 → 同一证据定位”填写；不强凑证据类别；supplied_fact不替代来源核验或实际许可。`unknowns` 同时列具体补证检查的 `NEEDS_RESEARCH` 与受影响动作，不把材料中的合成审批人当实际许可。`one_minimum_validation_action`、`check_result_fields`、`maximum_loss`、停止和回滚必须与正文的负责人、时钟和授权边界一致。需要对接其他接收方时，按[电商任务人工交接](payload__候选正文__Facebook广告运营Skill__meta-facebook-ads-operations__references__commerce-completion-workflows.md#人工审阅交接)核对字段及语义；接收方无法保留合同则停机器直接交接，保留中文离线计划，不声称已接通。

本 Skill 的修订身份用于定位离线方法字节，不表示真实广告已发布、账户有效、客户验收、商业结果成立或当前平台事实已全部核验；准入遵守首部的总控冻结匹配规则。
