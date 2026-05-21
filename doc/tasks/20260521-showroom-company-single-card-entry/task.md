# Task: Showroom Company Single Card Entry

## Goal

将 `D:\ProjectPackage\Website` 的 `/showroom` 改造为“单卡片公司入口 + 公司详情页”两屏流程：首页只显示一个公司入口卡片，点击后进入公司详情页，展示 IntRuoyi 通过匿名 `GET /showroom/display/app-config` 返回的完整公司公开字段，并提供显式中文讲解播放按钮。

## Scope

- `D:\ProjectPackage\Website\src\showroom-api.js`
- `D:\ProjectPackage\Website\src\showroom-api.test.js`
- `D:\ProjectPackage\Website\src\showroom-app.js`
- `D:\ProjectPackage\Website\src\showroom-app.css`
- `D:\ProjectPackage\Website\src\showroom-app.test.js`
- `D:\ProjectPackage\Website\tests\showroom-app.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-showroom-company-single-card-entry\**`

## Non-Scope

- 不修改根路径 `/` 的 `medical-kiosk` 行为。
- 不保留旧 `/showroom` 的展厅导航、产品墙、产品详情或语言切换流程。
- 不引入本地 mock、fallback、兼容分支或静默降级。

## Previous Task Check

- Previous same-repo task record: `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-detail-persistent-voice-panel\task.md`
- Status before this task: `Completed`
- Impact: 当前同仓上一任务已完成，因此可以继续执行本次 `/showroom` 公司入口改造。

## Dependencies

- `IntRuoyi` 必须让匿名 `GET /showroom/display/app-config` 返回 `company.publicFields`。
- `/showroom` 仍通过 `src/main.js` 路由分流进入 `createShowroomConsumerApp(root)`。
- `Vitest`、`Playwright`、`Vite build` 与前端证据校验脚本必须可运行。

## Milestones

1. 创建任务文档、证据骨架，并冻结新的 `/showroom` 交互契约。
2. 先补 RED 测试，锁定“单卡片首页、点击进入详情、详情显示公司字段、播放按钮触发音频、缺字段 fail fast”行为。
3. 实现 `showroom-api` 新契约映射与 `showroom-app` 两屏界面、程序化音频控制和显式空状态。
4. 跑通单测、构建、浏览器路径验证、证据校验与 closeout preview，并更新任务文档。

## Expected Verification

- `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js`
- `npm run build`
- `npx playwright test tests/showroom-app.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-showroom-company-single-card-entry/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-showroom-company-single-card-entry --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已确认 `/showroom` 为本次唯一入口，根路径 `/` 保持 `medical-kiosk` 不变。
  - 已创建本任务目录、执行日志与前端证据骨架。
- Verification evidence:
  - `D:\ProjectPackage\Website\doc\tasks\20260521-showroom-company-single-card-entry\task.md`
  - `D:\ProjectPackage\Website\doc\tasks\20260521-showroom-company-single-card-entry\execution-log.md`
  - `D:\ProjectPackage\Website\doc\tasks\20260521-showroom-company-single-card-entry\frontend-feature-evidence.md`
- Remaining blockers:
  - Waiting for RED tests and the backend `company.publicFields` contract update.

### Milestone 2

- Status: Completed
- Completed work:
  - 已先改写 `showroom-api` 与 `showroom-app` 单测，锁定单卡片首页、进入公司详情、播放按钮与缺字段 fail-fast 行为。
  - 已改写 `Playwright` 浏览器用例，锁定根路径 kiosk 保持不变、`/showroom` 只剩公司卡片入口与详情播放路径。
- Verification evidence:
  - `D:\ProjectPackage\Website\src\showroom-api.test.js`
  - `D:\ProjectPackage\Website\src\showroom-app.test.js`
  - `D:\ProjectPackage\Website\tests\showroom-app.spec.js`
  - `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js` (RED)
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - 已将 `showroom-api.js` 改为强校验 `company.publicFields`，并移除前端对 `showrooms` 非空的旧依赖。
  - 已将 `showroom-app.js` 重构为 `landing/detail` 两屏状态机，并加入程序化公司音频播放状态。
  - 已将 `showroom-app.css` 重排为单公司卡片首页和简洁公司详情布局。
- Verification evidence:
  - `D:\ProjectPackage\Website\src\showroom-api.js`
  - `D:\ProjectPackage\Website\src\showroom-app.js`
  - `D:\ProjectPackage\Website\src\showroom-app.css`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - 已跑通定向单测、构建、Playwright 浏览器验证。
  - 已更新前端证据文档并完成 closeout preview。
- Verification evidence:
  - `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js`
  - `npm run build`
  - `npx playwright test tests/showroom-app.spec.js --reporter=line`
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-showroom-company-single-card-entry/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-showroom-company-single-card-entry --mode preview`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - `/showroom` 已收敛为单公司卡片首页和公司详情页。
  - 详情页已渲染公司公开字段并支持中文讲解播放状态。
  - 根路径 `/` 继续保持现有 `medical-kiosk` 行为不变。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test tests/showroom-app.spec.js --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-showroom-company-single-card-entry/frontend-feature-evidence.md`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-showroom-company-single-card-entry --mode preview`
