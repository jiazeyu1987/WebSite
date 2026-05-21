# Change Request: 展厅公司与产品详情内容适配分析

## Request Summary And Source

- Source: 当前线程用户请求
- Request summary: 了解 `IntRuoyi` 下的公司内容和产品内容，并判断 `Website` 这里的公司详情和产品详情显示 `IntRuoyi` 展厅里的哪些公司信息和产品详情内容更合适。

## Current Baseline Reviewed

- `D:\ProjectPackage\Website\src\showroom-app.js`
- `D:\ProjectPackage\Website\src\showroom-api.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\doc\tasks\20260520-website-showroom-app-config-consumer\**`
- `D:\ProjectPackage\Website\doc\tasks\20260521-website-pure-int-ruoyi-display\**`
- `D:\ProjectPackage\Website\doc\tasks\20260522-showroom-app-config-target-mismatch\**`
- `D:\ProjectPackage\Int\IntRuoyi` 下的 showroom display contract、frontstage 页面与相关设计/证据文档

## Classification

- Requirement change assessment
- Content presentation fit analysis

## Impact

- Product impact: 影响公司详情与产品详情的信息层级、阅读重点和用户理解路径。
- Design impact: 需要决定摘要文案、公开字段、标签信息、双语讲解与图片的排序关系。
- Data impact: 只能使用 `IntRuoyi` 已公开且契约稳定的字段；不能假设后台高级字段适合前台直接展示。
- API impact: 若仅调整字段取舍，现有 `showroom/display/app-config`、`showroom/display/company`、`showroom/display/product/{id}` 可能已足够；若要新增前台字段，需改 `IntRuoyi` contract。
- Test impact: 若最终落地实现，需要更新 `Website` 单测与 Playwright 用例。
- Release impact: 当前为分析，不直接影响发版；若进入实现，需要先确认变更范围是 `/showroom`、根 kiosk，还是两者一起。
- Operations impact: 当前 `/showroom` live company payload 仍受上游版本不一致阻塞，只影响运行时直连验证，不影响代码与契约层分析。

## Decision

- Decision: Split
- Accepted now: 先完成只读分析，输出内容展示建议与字段映射。
- Deferred: 是否实施到 `Website`、实施到哪个入口、是否需要补充 `IntRuoyi` 新字段，待用户确认后进入实现任务。

## Required Approvals

- 用户确认最终采用的展示策略
- 若需要新增前台 contract 字段，还需 `IntRuoyi` 侧接口调整批准

## Downstream Skill Reruns

- 若用户确认要实施：`frontend-feature-delivery`
- 若需先补充或变更后端公开字段：`backend-api-delivery`

## Blockers And Next Action

- Blocker: `D:\ProjectPackage\Website\doc\tasks\20260522-showroom-app-config-target-mismatch\task.md` 已记录 `IntRuoyi` live company narration / preview source revision mismatch。
- Impact: 当前不能依赖 `/showroom/display/app-config` live 成功响应做公司内容的最终运行时比对。
- Next action: 继续通过本地代码、文档、测试与可用 display contract 只读比对，输出“适合展示什么”的结论。
