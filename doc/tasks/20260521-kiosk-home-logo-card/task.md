# Task: Kiosk Home Logo Card

## Goal

将根路径 `D:\ProjectPackage\Website` 的 `medical-kiosk` 首页红框卡片区改成只显示一个公司 Logo 卡片，不再在首页展示产品卡片矩阵；其他展厅分类和产品详情路径继续保持现有行为。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-home-logo-card\**`

## Non-Scope

- 不修改 `/showroom` 入口或其远程数据消费逻辑。
- 不引入新的后端接口、Logo 下载链路或 fallback 资源请求。
- 不修改心内/神经/外周等非首页展厅的产品详情结构。

## Previous Task Check

- Previous same-repo task record: `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-card-bilingual-names\task.md`
- Status before this task: `Blocked`
- Impact: 旧任务阻塞点是英文名映射缺失，与本次首页 Logo 单卡片需求无关；该阻塞已在原任务文档中明确记录，因此可以继续本次独立前端改动。

## Dependencies

- 根路径 `/` 必须继续渲染 `medical-kiosk`。
- 首页右侧 `语音讲解` 面板继续可见并保持现有文案。
- `Vitest`、`Playwright`、`Vite build` 与前端证据校验脚本必须可运行。

## Milestones

1. 创建任务文档、执行日志和前端证据骨架。
2. 先补 RED 测试，锁定“首页只有一个 Logo 卡片，产品详情改从心内展厅进入”的新行为。
3. 实现首页 Logo 单卡片布局与样式，保留其他展厅和详情路径不变。
4. 跑通单测、构建、浏览器验证、证据校验与 closeout preview。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test tests/kiosk-gallery.spec.js tests/kiosk-detail.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-home-logo-card/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-home-logo-card --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已创建任务目录、执行日志与前端证据骨架。
  - 已确认本次只改根首页 `medical-kiosk` 的首页卡片区。
- Verification evidence:
  - `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-home-logo-card\task.md`
  - `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-home-logo-card\execution-log.md`
  - `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-home-logo-card\frontend-feature-evidence.md`
- Remaining blockers:
  - Waiting for RED tests and homepage Logo card implementation.

### Milestone 2

- Status: Completed
- Completed work:
  - 已先改写 `medical-kiosk` 单测，锁定首页只剩一个 Logo 卡片、且详情改从 `心内介入展厅` 首个产品进入。
  - 已改写 `Playwright` 浏览器用例，锁定首页 Logo 卡片显示与非首页详情流保持可用。
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
  - 已在 `medical-kiosk` 首页将 `home` 分类卡片区替换为单个公司 Logo 卡片。
  - 已保留其他展厅的产品卡矩阵和详情页路径不变。
  - 已新增首页 Logo 卡片的专用样式。
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
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-home-logo-card/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-home-logo-card --mode preview`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 首页红框区域已收敛为单个公司 Logo 卡片。
  - 切换到其他展厅后，产品卡矩阵和详情页路径保持可用。
  - 根路径 `/` 继续保持 `medical-kiosk` 入口不变。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-home-logo-card/frontend-feature-evidence.md`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-home-logo-card --mode preview`
