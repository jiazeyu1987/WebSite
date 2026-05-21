# Task: Showroom Mobile Bottom Action Bar

## Goal

把 `/showroom` 手机详情页的 sticky 操作条从顶部粘附优化为更接近底部拇指区的悬浮操作条，并补足安全区内边距，提升单手操作舒适度。

## Scope

- `D:\ProjectPackage\Website\src\showroom-app.css`
- `D:\ProjectPackage\Website\src\showroom-app.test.js`
- `D:\ProjectPackage\Website\tests\showroom-app.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-showroom-mobile-bottom-action-bar\**`

## Non-Scope

- 不改 `/` 根路径 `medical-kiosk`。
- 不改后端接口、语言契约或音频状态机。
- 不改 `showroom` 详情页结构，只调整手机 sticky 操作条的位置与安全区。
- 不新增 fallback、mock 成功或新路由。

## Dependencies

- `/showroom` 继续使用现有匿名 `app-config` 接口。
- 现有 detail -> back 和播放路径继续可用。
- `Vitest`、`Playwright`、`Vite build`、前端证据校验和 closeout 脚本可执行。

## Milestones

1. 建立任务记录，定义 BDD/TDD 验收与证据模板。
2. 先写 RED 测试，锁定操作条位于手机底部拇指区而不是顶部。
3. 实现最小 CSS 改动，使用底部 sticky 和 safe-area 内边距。
4. 跑通验证，更新证据并执行 closeout preview。

## Expected Verification

- `npm test -- --run src/showroom-app.test.js`
- `npm run build`
- `npx playwright test tests/showroom-app.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-showroom-mobile-bottom-action-bar/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-showroom-mobile-bottom-action-bar --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已建立本次 `showroom` 手机底部操作条任务目录与基础文档。
  - 已限定本次只处理手机 sticky 条位置与安全区，不扩散到详情结构或接口层。
- Verification evidence:
  - `doc/tasks/20260521-showroom-mobile-bottom-action-bar/task.md`
  - `doc/tasks/20260521-showroom-mobile-bottom-action-bar/execution-log.md`
  - `doc/tasks/20260521-showroom-mobile-bottom-action-bar/frontend-feature-evidence.md`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - 已补充手机视口 `Playwright` RED 用例，锁定底部拇指区位置与 safe-area 偏移。
- Verification evidence:
  - `src/showroom-app.test.js`
  - `tests/showroom-app.spec.js`
  - `npx playwright test tests/showroom-app.spec.js --reporter=line` (RED)
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - 已新增手机端独立底部浮动操作条 `showroom-mobile-action-bar`。
  - 已为底部操作条加入 safe-area 偏移，并为详情正文补足底部留白；桌面 action bar 继续保留。
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
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-showroom-mobile-bottom-action-bar/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-showroom-mobile-bottom-action-bar --mode preview`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 已完成 `/showroom` 手机底部拇指区操作条。
  - 已把返回和播放入口移动到更适合单手点击的底部安全区。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/showroom-app.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test tests/showroom-app.spec.js --reporter=line`
