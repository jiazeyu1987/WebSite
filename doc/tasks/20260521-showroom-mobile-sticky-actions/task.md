# Task: Showroom Mobile Sticky Actions

## Goal

为 `/showroom` 手机详情页增加 sticky 操作条，让返回和播放入口在长字段列表滚动时仍然保持容易触达。

## Scope

- `D:\ProjectPackage\Website\src\showroom-app.js`
- `D:\ProjectPackage\Website\src\showroom-app.css`
- `D:\ProjectPackage\Website\src\showroom-app.test.js`
- `D:\ProjectPackage\Website\tests\showroom-app.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-showroom-mobile-sticky-actions\**`

## Non-Scope

- 不改 `/` 根路径 `medical-kiosk`。
- 不改后端接口、语言契约或音频状态机。
- 不做新的 fallback、mock 成功或新路由。
- 不推翻刚完成的手机详情首屏重排，只补可达性增强。

## Dependencies

- `/showroom` 继续使用现有匿名 `app-config` 接口。
- 现有 landing -> detail -> back 和播放路径继续可用。
- `Vitest`、`Playwright`、`Vite build`、前端证据校验和 closeout 脚本可执行。

## Milestones

1. 建立任务记录，定义 BDD/TDD 验收与证据模板。
2. 先写 RED 测试，锁定手机详情 sticky 操作条及滚动后可见性。
3. 实现最小前端改动，保证手机详情滚动时返回和播放入口常驻可达。
4. 跑通验证，更新证据并执行 closeout preview。

## Expected Verification

- `npm test -- --run src/showroom-app.test.js`
- `npm run build`
- `npx playwright test tests/showroom-app.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-showroom-mobile-sticky-actions/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-showroom-mobile-sticky-actions --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已建立本次 `showroom` 手机 sticky 操作条任务目录与基础文档。
  - 已限定本次只处理手机详情滚动时的返回/播放可达性，不扩散到其它页面。
- Verification evidence:
  - `doc/tasks/20260521-showroom-mobile-sticky-actions/task.md`
  - `doc/tasks/20260521-showroom-mobile-sticky-actions/execution-log.md`
  - `doc/tasks/20260521-showroom-mobile-sticky-actions/frontend-feature-evidence.md`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - 已补充 `Vitest` RED 用例，锁定独立 sticky 操作条结构。
  - 已补充手机视口 `Playwright` 用例，锁定长字段滚动后的可见性。
- Verification evidence:
  - `src/showroom-app.test.js`
  - `tests/showroom-app.spec.js`
  - `npm test -- --run src/showroom-app.test.js` (RED)
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - 已把返回与播放归并到统一 action bar 中。
  - 已在手机宽度下为 action bar 启用 sticky 样式，同时保持桌面详情路径不变。
- Verification evidence:
  - `src/showroom-app.js`
  - `src/showroom-app.css`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - 已跑通单测、构建和浏览器验证。
  - 已准备前端证据校验与 closeout preview。
- Verification evidence:
  - `npm test -- --run src/showroom-app.test.js`
  - `npm run build`
  - `npx playwright test tests/showroom-app.spec.js --reporter=line`
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-showroom-mobile-sticky-actions/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-showroom-mobile-sticky-actions --mode preview`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 已完成 `/showroom` 手机详情 sticky 操作条。
  - 已确保长字段滚动时返回和播放入口仍停留在可触达范围。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/showroom-app.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test tests/showroom-app.spec.js --reporter=line`
