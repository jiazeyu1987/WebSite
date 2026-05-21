# Task: Kiosk Mobile Swipe Discoverability

## Goal

提升 `medical-kiosk` 手机端顶部展厅切换区的可发现性，让用户无需猜测就能理解“这里可以左右滑动或点击切换展厅”。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-mobile-swipe-discoverability\**`

## Non-Scope

- 不实现列表返回位置记忆。
- 不调整 `showroom-app` 的交互模式。
- 不改动后端接口、数据契约或语音播放主流程。
- 不引入额外 fallback、mock 数据或新路由。

## Dependencies

- 当前 `medical-kiosk` 顶部标题区继续承担展厅切换入口。
- `Vitest`、`Playwright`、`Vite build`、前端证据校验和 closeout 脚本可执行。
- 现有 `medical-kiosk` 左右箭头、touch swipe 与键盘切换能力继续保留。

## Milestones

1. 建立任务记录，补充 BDD/TDD 验收与证据模板。
2. 先写 RED 测试，锁定顶部切换提示和当前展厅进度展示。
3. 实现最小前端改动，增强 swipe 区可发现性并保持现有切换行为。
4. 跑通验证，更新证据并执行 closeout preview。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test tests/kiosk-gallery.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-mobile-swipe-discoverability/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-mobile-swipe-discoverability --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已建立本次移动端顶部 swipe 可发现性优化任务记录。
  - 已限定本次只优化 `medical-kiosk` 顶部切换提示，不扩散到 `showroom` 或列表返回记忆等后续项。
- Verification evidence:
  - `doc/tasks/20260521-kiosk-mobile-swipe-discoverability/task.md`
  - `doc/tasks/20260521-kiosk-mobile-swipe-discoverability/execution-log.md`
  - `doc/tasks/20260521-kiosk-mobile-swipe-discoverability/frontend-feature-evidence.md`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - 已为顶部 swipe 提示文案与进度指示补充 `Vitest` RED 断言。
  - 已补充手机视口 `Playwright` 用例，锁定提示文案与槽位进度更新行为。
- Verification evidence:
  - `src/medical-kiosk.test.js`
  - `tests/kiosk-gallery.spec.js`
  - `npm test -- --run src/medical-kiosk.test.js` (RED)
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - 已在 `medical-kiosk` 顶部标题区加入可见 swipe 提示与当前槽位进度胶囊。
  - 已保持现有 arrows、touch swipe、keyboard 切换与 gallery/详情路径不变。
- Verification evidence:
  - `src/medical-kiosk.js`
  - `src/medical-kiosk.css`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - 已跑通单测、构建和 `Playwright` 浏览器验证。
  - 已通过前端证据校验，并完成 closeout preview。
- Verification evidence:
  - `npm test -- --run src/medical-kiosk.test.js`
  - `npm run build`
  - `npx playwright test tests/kiosk-gallery.spec.js --reporter=line`
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-mobile-swipe-discoverability/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-mobile-swipe-discoverability --mode preview`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 已完成 `medical-kiosk` 手机端顶部 swipe 区可发现性优化。
  - 已新增可见提示 `data-swipe-hint` 与槽位进度 `data-swipe-progress`。
  - 已通过单测、构建、浏览器验证和前端证据校验。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test tests/kiosk-gallery.spec.js --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-mobile-swipe-discoverability/frontend-feature-evidence.md`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-mobile-swipe-discoverability --mode preview`
