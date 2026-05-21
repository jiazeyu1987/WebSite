# Task: 展厅公司与产品详情内容适配分析

## Goal

梳理 `D:\ProjectPackage\Int\IntRuoyi` 当前展厅体系里的公司信息、产品详情、前台 display contract 与现有 `D:\ProjectPackage\Website` 渲染方式，判断 Website 里的公司详情与产品详情分别展示哪些内容最合适，并给出明确的字段映射建议。

## Scope

- `D:\ProjectPackage\Website\src\**` 只读分析
- `D:\ProjectPackage\Website\doc\tasks\20260522-showroom-content-fit-analysis\**`
- `D:\ProjectPackage\Website\docs\changes\20260522-showroom-content-fit-analysis.md`
- `D:\ProjectPackage\Int\IntRuoyi\**` 只读分析

## Non-Scope

- 不修改 `Website` 或 `IntRuoyi` 生产代码
- 不新增 fallback、占位数据或临时映射
- 不直接修复 `IntRuoyi` 当前 live company narration / preview 版本阻塞

## Dependencies

- 当前仓库既有任务文档可用于追溯 `Website` 与 `IntRuoyi` 集成路径
- 可只读访问 `D:\ProjectPackage\Int\IntRuoyi` 代码与文档
- 若需要核对运行时 payload，相关本地接口或数据源必须可读取；若受上游 live 数据阻塞，必须显式记录影响

## Milestones

1. 建立分析任务记录，并确认前一任务状态不阻塞本次只读梳理。
2. 审阅 `Website` 当前公司详情、产品详情的渲染入口与字段消费。
3. 审阅 `IntRuoyi` 当前公司信息、产品详情、frontstage display contract 与相关文档。
4. 输出适配建议：公司详情该展示哪些内容、产品详情该展示哪些内容、哪些内容不宜展示，以及后续若要改动应落在哪个仓库。

## Expected Verification

- 结论可回溯到 `Website` 与 `IntRuoyi` 本地文件
- 字段建议与当前公开 display contract、前端实现和既有任务证据一致
- 若存在无法确认的 live 内容，必须记录具体阻塞点与影响

## Current Status

- Status: Completed
- Completed work:
  - 已核对本仓库最新任务 `20260522-showroom-app-config-target-mismatch` 已显式标记为 `Blocked`，阻塞点位于 `IntRuoyi` live company narration / preview 版本不一致，不影响本次只读内容分析启动。
  - 已确认 `Website /showroom` 当前只渲染公司入口与公司详情，消费 `company.homeImage`、双语标题、双语讲解文案、双语音频与 `company.publicFields`。
  - 已确认 `Website /` 根 kiosk 的公司详情同样消费 `company.publicFields`；产品详情则消费 `GET /showroom/display/product/{productId}` 返回的 `publicProductFields`，并额外展示前序上下文中的展厅名、产品编码、预览图与讲解摘要。
  - 已核对 `IntRuoyi` 前台公开 contract：
    - 公司页 / app-config 公司区块以图片、双语标题、双语讲解、公开字段为主。
    - 产品页以 `productCard` + `publicProductFields` + 讲解入口为主。
  - 已核对 `IntRuoyi` 后台字段定义：
    - 公司信息固定 7 个字段：`发展历程`、`园区介绍`、`孵化平台`、`子公司概览`、`上市信息`、`核心制造能力`、`荣誉资质`。
    - 产品字段分为 `basic` 与 `advanced` 两层；前台公开视图只允许 `basic`，显式排除 `registration_certificate`、`clinical_effect`、`fim_status` 及其英文版。
  - 已只读验证本地真实运行时：
    - `GET http://127.0.0.1:48081/showroom/display/company` 当前返回 `SHOWROOM_TARGET_NOT_FOUND: live company ZH narration source revision mismatch`。
    - `GET http://127.0.0.1:48081/showroom/display/product/240` 当前真实公开字段仅包含 `中文名称`、`英文名称`、`所属公司`、`产品归属/类型`、`生命周期`。
    - 当前 hall 映射到的 live 产品多为 E2E 发布验证产品，绝大多数基础说明字段为空，因此前台产品详情必须接受“字段很少”的真实情况。
    - `GET http://127.0.0.1:48081/showroom/display/product/164` 证明当真实产品资料更完整时，前台公开字段会扩展到 `适应症`、`核心卖点` 等基础字段。
- Remaining blockers:
  - 公司页 live 运行时仍受 `IntRuoyi company narration / preview source revision mismatch` 阻塞，无法直接用匿名 company/app-config 成功响应做最终画面核对；但不影响本次字段层结论。

## Recommended Display Strategy

- 公司详情适合展示：
  - 公司封面图 / 首页图。
  - 中文名 / 英文名。
  - 双语讲解文案与讲解音频入口。
  - `company.publicFields` 的非空字段，按 `IntRuoyi` 既定顺序展示：`发展历程`、`园区介绍`、`孵化平台`、`子公司概览`、`上市信息`、`核心制造能力`、`荣誉资质`。
- 产品详情适合展示：
  - 预览图。
  - 中文名 / 英文名。
  - 当前展厅名与产品编码这类浏览上下文信息。
  - 双语讲解摘要与讲解音频入口。
  - `public/basic` 产品字段的非空项，重点是 `所属公司`、`产品归属/类型`、`生命周期`、`目标市场`、`管线布局`、`适应症`、`核心卖点`、`型号规格`。
- 不建议前台展示：
  - `registration_certificate`、`clinical_effect`、`fim_status` 及其英文版；这些在 `IntRuoyi` 明确定义为 `advanced`，前台公开视图应排除。
  - 任何空字段占位文案、兜底假数据或把后台内部审批/版本信息直接带到前台。
- 基于当前 `Website` 视觉结构的额外建议：
  - 产品详情页的标题区已经展示中英文名，因此即便后端 `publicProductFields` 里再次返回 `中文名称` / `英文名称`，前台也更适合过滤掉这两个重复字段，避免重复阅读。这是基于当前页面结构做出的 UI 推断，不是后端 contract 约束。

## Final Verification Result

- PASS: 代码与文档只读审计完成，结论已回溯到 `Website` 与 `IntRuoyi` 本地实现。
- PASS: 真实接口验证 `GET /showroom/display/product/240` 与 `GET /showroom/display/product/164`，确认产品前台公开字段随基础资料完整度变化。
- PASS: 数据库只读核查确认当前 company 公开字段内容较丰富，而 hall 映射的 live 产品大多仅保留最小基础字段。
- FAIL: `GET /showroom/display/company` 当前仍因 `SHOWROOM_TARGET_NOT_FOUND: live company ZH narration source revision mismatch` 无法成功返回。
