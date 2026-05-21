# Task: Kiosk Demo Real Modes

## Goal

为根路径 `D:\ProjectPackage\Website` 的 `medical-kiosk` 增加两个可切换模式：

- `演示模式`：使用之前的虚拟数据
- `真实模式`：使用当前 `IntRuoyi` 公开接口返回的真实数据

并让用户可在页面内切换模式，切换后首页、公司详情、展厅卡片墙、产品详情和语音入口都按对应模式运行。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-demo-real-modes\**`

## Non-Scope

- 不修改 `/showroom` 页面。
- 不扩展 `IntRuoyi` 后端合同。
- 不引入 fallback：真实模式失败时必须显式报错，不能自动退回演示模式。

## Previous Task Check

- Previous same-repo task record: `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-home-company-detail\task.md`
- Status before this task: `Completed`
- Impact: 首页点击公司详情已经通路，本次可以继续在同一入口上增加数据模式切换，不会和上一任务冲突。

## Dependencies

- `真实模式` 继续依赖匿名 `GET /showroom/display/app-config` 与 `/showroom/display/product/{id}`
- `演示模式` 需要在前端本地保留一份稳定虚拟数据集
- `Vitest`、`Playwright`、`Vite build` 与前端证据校验脚本必须可运行

## Milestones

1. 创建任务文档、执行日志与前端证据骨架。
2. 先补 RED 测试，锁定模式切换、模式持久化、真实模式失败显式报错与演示模式不触发远程请求。
3. 实现顶部模式切换、演示数据集、真实/演示双数据源切换和状态重置。
4. 跑通单测、构建、浏览器验证、证据校验与 closeout preview。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-demo-real-modes/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-demo-real-modes --mode preview`

## Current Status

- Status: Completed
- Completed work:
  - 已新增 `演示模式 / 真实模式` 顶部切换控件。
  - `演示模式` 已切到本地虚拟 company / hall / product 数据，并使用本地静音音频资源。
  - `真实模式` 继续使用 IntRuoyi 公开接口数据，失败时显示显式错误态，不自动回落到演示模式。
  - 模式选择已支持本地持久化。
- Remaining blockers:
  - None.

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已创建任务文档、执行日志与前端证据骨架。
- Verification evidence:
  - `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-demo-real-modes\task.md`
  - `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-demo-real-modes\execution-log.md`
  - `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-demo-real-modes\frontend-feature-evidence.md`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - 已先补 RED 测试，锁定模式切换、模式持久化、真实模式显式报错与演示模式不触发远程请求。
- Verification evidence:
  - `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
  - `npm test -- --run src/medical-kiosk.test.js` (RED)
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - 已在 `medical-kiosk` 中增加模式状态、本地演示数据、顶部模式切换控件和模式持久化。
  - 已新增 `D:\ProjectPackage\Website\public\demo-silence.wav` 作为演示模式本地音频资源。
- Verification evidence:
  - `D:\ProjectPackage\Website\src\medical-kiosk.js`
  - `D:\ProjectPackage\Website\src\medical-kiosk.css`
  - `D:\ProjectPackage\Website\public\demo-silence.wav`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - 已跑通单测、构建与浏览器验证。
  - 已更新前端证据并完成 closeout preview。
- Verification evidence:
  - `npm test -- --run src/medical-kiosk.test.js`
  - `npm run build`
  - `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line`
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-demo-real-modes/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-demo-real-modes --mode preview`
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-demo-real-modes/frontend-feature-evidence.md`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-demo-real-modes --mode preview`
