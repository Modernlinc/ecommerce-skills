# 经营综合委托输入（封定版）

ID SOCIAL-OPERATING-REVIEW-01；版本1.0；2026-09-06。所有人物、商品、金额、授权、记录为本轮原创合成材料，无真实客户/账号/合同/媒体。只准离线分析和草案。

任务：对虚构“Tray M 可叠放托盘”准备完整Offer、经营情景、现金时序、Meta/TikTok两条创意及镜头、素材用途/到期/撤回影响与跨平台复盘。不给广告执行或现金支出决定。只有一次综合任务，以下输入先固定，再由候选入口产出结果。

## 商品与Offer事实

P01：单托盘外尺寸32×22×4 cm，设计说明允许两个空托盘叠放；没有满载叠放、承重、防水或食品接触证据。湿布擦拭后晾干；无实物照片。
P02：两条合成访谈担心“桌面物件没地方归位”，不支持总体需求。用户给的替代是继续用现有浅盒；其尺寸/价格unknown，没有市场竞品调查。
P03：拟商品页列单件价70 USD，运费结算显示；配送时效unknown、退货条款未批准。不得承诺免费退换/快递日期。尺寸、空盘叠放限制及护理可列草案。
P04：“承重20kg”“省70%桌面”“餐食安全”“适合所有桌面”为未证宣传，禁用。

## 经营口径（全部假设或合成记录）

F01：三情景是每单预测参数，毛收入均70，退款扣项分别6/10/4，所以收入基数64/60/66已扣退款。各追加项与JSON一一对应：商品、支付、履约、获客。此五项是明确狭义范围，足以算该范围余量。固定费/税/全部现金不在该范围；不得称净利润。
F02：基础追加21/3/8/14；压力收入下降且商品23、履约9、获客17，支付3；改善收入66、履约7、获客12、商品21、支付3。参数为用户指定假设，不是模型预测转化弹性、可靠性或必然改善。
F03：扩展基础把退货处理加进范围，但金额unknown；没有零成本依据。它与狭义基础同一订单，用于说明扩大口径后的不足，不另造业务案例。
C01–C03：合成期初900、最低保留300；先已发生支出650，再预计到账420，再预计支出310；UTC时点见JSON。仅已列事件，不完整账户现金流；无融资/支出授权。

## 素材与用途

L01：品牌内部合成拍摄授权摘要v1，团队自有原创，US，Meta/TikTok自然与付费及剪辑，2026-09-01至2026-12-31；真实媒体未拍。拟两平台草案T01/M01由制作负责人准备，无音乐/人物素材。
L02：外部创作者合成许可摘要v2，US，TikTok自然原版，2026-09-01至2026-09-10，禁止剪辑、Meta和付费。曾获样品，实际体验/原件/声画未看。拟 T02 于09-09自然使用，M02 于09-09付费剪辑，T03 于09-12自然重用；负责人均素材管理员。
L03：上述L02另有合成条款：“若授权人通知撤回，收到后不再新增使用”；现给假设收到时间09-08T12:00:00Z，仅分析若发生对T02/M02/T03的影响，不声称已撤回/已通知。不判断既有发布下架义务，条款未提供。
L04：网图占位，作者/许可unknown，不进入本轮制作。

## 报表与复盘

D01：9月1–5日Meta报表曝光9000、点击事件180、归因收入1480 USD；TikTok曝光8000、点击事件240、归因收入1220 USD。窗口/去重/触点/退款含项unknown。两平台不构成随机分组。
D02：同日期店铺合成账表毛销售2040、已扣退款86、净销售1954 USD；与平台订单重叠和确认时间unknown。不得将两平台金额相加当真实收入，也不以店铺净销售充现金。
D03：两个不同来源标签cohort A/B的旧已签收订单中，输入方声明达到其内部成熟口径，A75单尺寸原因退货6、B50单退货4；实际政策/滞后/随机分配未验证。另有近期签收20单未成熟，无退货分子，排除在已给成熟比值之外并单列。A/B不是两个平台、不是随机实验，也不能合并成全部投放人效果。
D04：想知道“加上空盘叠放限制与尺寸提示，是否减少误购且改善总体经营结果”。分配单位、受影响购买群体、退款成熟、样本设计和损失上限没有有效依据；执行HOLD，不能用D03给因果答案。

## 原创计算输入：唯一JSON块

金额为十进制字符串，null保留未知。所有列值由本输入指定，不能修改输入来贴合结果。

```json
{
  "currency": "USD",
  "scenarios": [
    {
      "id": "base",
      "scope": "one hypothetical order; listed variable items only",
      "basis": "forecast; net of refund 6; supplied independent parameters",
      "currency": "USD",
      "revenue": "64",
      "included": [
        "refund"
      ],
      "required_components": [
        "refund",
        "goods",
        "payment",
        "fulfilment",
        "acquisition"
      ],
      "costs": [
        {
          "component": "goods",
          "amount": "21"
        },
        {
          "component": "payment",
          "amount": "3"
        },
        {
          "component": "fulfilment",
          "amount": "8"
        },
        {
          "component": "acquisition",
          "amount": "14"
        }
      ]
    },
    {
      "id": "pressure",
      "scope": "one hypothetical order; listed variable items only",
      "basis": "forecast; net of refund 10; supplied cost/revenue changes, no elasticity claim",
      "currency": "USD",
      "revenue": "60",
      "included": [
        "refund"
      ],
      "required_components": [
        "refund",
        "goods",
        "payment",
        "fulfilment",
        "acquisition"
      ],
      "costs": [
        {
          "component": "goods",
          "amount": "23"
        },
        {
          "component": "payment",
          "amount": "3"
        },
        {
          "component": "fulfilment",
          "amount": "9"
        },
        {
          "component": "acquisition",
          "amount": "17"
        }
      ]
    },
    {
      "id": "improvement",
      "scope": "one hypothetical order; listed variable items only",
      "basis": "forecast; net of refund 4; hypothetical independent parameters, no effectiveness claim",
      "currency": "USD",
      "revenue": "66",
      "included": [
        "refund"
      ],
      "required_components": [
        "refund",
        "goods",
        "payment",
        "fulfilment",
        "acquisition"
      ],
      "costs": [
        {
          "component": "goods",
          "amount": "21"
        },
        {
          "component": "payment",
          "amount": "3"
        },
        {
          "component": "fulfilment",
          "amount": "7"
        },
        {
          "component": "acquisition",
          "amount": "12"
        }
      ]
    },
    {
      "id": "extended_base",
      "scope": "one hypothetical order; listed variable items only",
      "basis": "same base; wider handling scope explicitly incomplete",
      "currency": "USD",
      "revenue": "64",
      "included": [
        "refund"
      ],
      "required_components": [
        "refund",
        "goods",
        "payment",
        "fulfilment",
        "acquisition",
        "return_handling"
      ],
      "costs": [
        {
          "component": "goods",
          "amount": "21"
        },
        {
          "component": "payment",
          "amount": "3"
        },
        {
          "component": "fulfilment",
          "amount": "8"
        },
        {
          "component": "acquisition",
          "amount": "14"
        },
        {
          "component": "return_handling",
          "amount": null
        }
      ]
    }
  ],
  "cash": {
    "scope": "listed Sep 6-8 event timeline only",
    "basis": "opening observed in synthetic case; later settlement forecast",
    "currency": "USD",
    "coverage": "partial",
    "opening": "900",
    "reserve": "300",
    "events": [
      {
        "id": "C01",
        "at": "2026-09-06T09:00:00Z",
        "direction": "out",
        "amount": "650",
        "state": "observed"
      },
      {
        "id": "C02",
        "at": "2026-09-07T12:00:00Z",
        "direction": "in",
        "amount": "420",
        "state": "forecast"
      },
      {
        "id": "C03",
        "at": "2026-09-08T09:00:00Z",
        "direction": "out",
        "amount": "310",
        "state": "forecast"
      }
    ]
  },
  "ratios": [
    {
      "label": "Meta recorded click share",
      "basis": "Sep1-5 report click events per impressions, unique people unknown",
      "numerator": "180",
      "denominator": "9000"
    },
    {
      "label": "TikTok recorded click share",
      "basis": "Sep1-5 report click events per impressions, unique people unknown",
      "numerator": "240",
      "denominator": "8000"
    },
    {
      "label": "cohort A size-return share",
      "basis": "provided mature signed orders; conditional descriptive only",
      "numerator": "6",
      "denominator": "75"
    },
    {
      "label": "cohort B size-return share",
      "basis": "provided mature signed orders; conditional descriptive only",
      "numerator": "4",
      "denominator": "50"
    }
  ]
}
```

一个优先动作由产出报告选择；虚构责任角色只是交接位置，不能实际发消息。当前无需使用者提供客户、账号、预算或素材。
