# Task: Showroom Mobile Field Cards

## Goal

优化 `/showroom` 手机详情页的字段列表扫读体验：把公开字段改成更独立的卡片式阅读块，让标签和值层级更清楚、更适合快速浏览。

## Scope

- `D:\ProjectPackage\Website\src\showroom-app.js`
- `D:\ProjectPackage\Website\src\showroom-app.css`
- `D:\ProjectPackage\Website\src\showroom-app.test.js`
- `D:\ProjectPackage\Website\tests\showroom-app.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-showroom-mobile-field-cards\**`

## Non-Scope

- 不改 `/` 根路径 `medical-kiosk`。
- 不改后端接口、语言契约或音频状态机。
- 不新增 fallback、mock 成功或新路由。
- 不推翻已完成的 sticky 操作条和 hero 重排，只增强字段区可读性。

## Dependencies

- `/showroom` 继续使用现有匿名 `app-config` 接口。
- 现有 detail -> back 和播放路径继续可用。
- `Vitest`、`Playwright`、`Vite build`、前端证据校验和 closeout 脚本可执行。

## Milestones

1. 建立任务记录，定义 BDD/TDD 验收与证据模板。
2. 先写 RED 测试，锁定字段标签和值的稳定标记与手机卡片式排版。
3. 实现最小前端改动，优化手机字段区层级与扫读体验。
4. 跑通验证，更新证据并执行 closeout preview。

## Expected Verification

- `npm test -- --run src/showroom-app.test.js`
- `npm run build`
- `npx playwright test tests/showroom-app.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-showroom-mobile-field-cards/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-showroom-mobile-field-cards --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已建立本次 `showroom` 手机字段卡片化任务目录与基础文档。
  - 已限定本次只增强字段区扫读体验，不扩散到接口层或其它页面。
- Verification evidence:
  - `doc/tasks/20260521-showroom-mobile-field-cards/task.md`
  - `doc/tasks/20260521-showroom-mobile-field-cards/execution-log.md`
  - `doc/tasks/20260521-showroom-mobile-field-cards/frontend-feature-evidence.md`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - 已补充 `Vitest` RED 用例，锁定字段 label/value 标记。
  - 已补充手机视口 `Playwright` 用例，锁定字段卡片化间距和层级。
- Verification evidence:
  - `src/showroom-app.test.js`
  - `tests/showroom-app.spec.js`
  - `npm test -- --run src/showroom-app.test.js` (RED)
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - 已为字段标签和值增加稳定的 `data-*` 标记。
  - 已在手机宽度下把字段区改成独立卡片块，并拉开卡片间距。
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
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-showroom-mobile-field-cards/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-showroom-mobile-field-cards --mode preview`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 已完成 `/showroom` 手机字段列表卡片化扫读优化。
  - 已让字段标签和值层级更清楚，并增强卡片间距、圆角和块级分隔。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/showroom-app.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test tests/showroom-app.spec.js --reporter=line`
