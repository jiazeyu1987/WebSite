# Task: Kiosk Home Company Detail

## Goal

让根路径 `D:\ProjectPackage\Website` 的 `medical-kiosk` 首页大图卡片支持点击进入公司详情页，且公司详情内容从 `IntRuoyi` 的匿名 `GET /showroom/display/app-config` 中获取。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-home-company-detail\**`

## Non-Scope

- 不修改 `/showroom` 的现有页面行为。
- 不扩展或修改 `IntRuoyi` 后端契约；只复用现有匿名 `app-config`。
- 不修改非首页展厅的产品详情结构。
- 不引入本地 fallback 或假公司详情数据。

## Previous Task Check

- Previous same-repo task record: `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-home-full-image-hero\task.md`
- Status before this task: `Completed`
- Impact: 首页大图主视觉已完成，因此本次可以在该卡片上继续接入点击进入公司详情的交互。

## Dependencies

- `IntRuoyi` 匿名 `GET /showroom/display/app-config` 继续返回可用的 `company` 信息。
- 根路径 `/` 必须继续渲染 `medical-kiosk`。
- `Vitest`、`Playwright`、`Vite build` 与前端证据校验脚本必须可运行。

## Milestones

1. 创建任务文档、执行日志与前端证据骨架。
2. 先补 RED 测试，锁定“首页大图点击进入公司详情、详情内容来自 IntRuoyi、失败显式报错”的行为。
3. 实现首页大图点击入口、公司详情加载状态、错误状态和详情展示。
4. 跑通单测、构建、浏览器验证、证据校验与 closeout preview。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-home-company-detail/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-home-company-detail --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已创建任务目录、执行日志和前端证据骨架。
  - 已确认本次直接复用现有 `app-config` 公司数据链路。
- Verification evidence:
  - `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-home-company-detail\task.md`
  - `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-home-company-detail\execution-log.md`
  - `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-home-company-detail\frontend-feature-evidence.md`
- Remaining blockers:
  - Waiting for RED tests and homepage click-through implementation.

### Milestone 2

- Status: Completed
- Completed work:
  - 已先改写 `medical-kiosk` 单测，锁定首页大图点击进入公司详情、远程失败显式报错、非首页详情流仍可用。
  - 已同步改写 `Playwright` 浏览器用例，锁定首页点击进入公司详情并返回首页。
- Verification evidence:
  - `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
  - `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
  - `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
  - `npm test -- --run src/medical-kiosk.test.js` (RED)
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - 已在 `medical-kiosk` 首页大图上接入点击进入公司详情交互。
  - 已复用现有 `showroom-api` 匿名 `app-config` 链路，新增公司详情 loading / error / ready 状态。
  - 已新增公司详情布局、字段列表和返回首页动作。
- Verification evidence:
  - `D:\ProjectPackage\Website\src\medical-kiosk.js`
  - `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - 已跑通定向单测、构建和浏览器验证。
  - 已更新前端证据文档并完成 closeout preview。
- Verification evidence:
  - `npm test -- --run src/medical-kiosk.test.js`
  - `npm run build`
  - `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line`
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-home-company-detail/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-home-company-detail --mode preview`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 首页大图卡片已支持点击进入公司详情。
  - 公司详情内容已从 `IntRuoyi` 匿名 `app-config` 加载，并具备 loading / error / ready 状态。
  - 非首页展厅的产品卡片墙和详情页路径保持可用。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-home-company-detail/frontend-feature-evidence.md`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-home-company-detail --mode preview`
