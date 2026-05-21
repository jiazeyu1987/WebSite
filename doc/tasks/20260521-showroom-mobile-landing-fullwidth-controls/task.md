# Task: Showroom Mobile Landing Fullwidth Controls

## Goal

优化 `/showroom` 手机首页的公司入口卡片和语言切换区，让它们在小屏上接近整行宽度，提升可点击面积和单手操作舒适度。

## Scope

- `D:\ProjectPackage\Website\src\showroom-app.css`
- `D:\ProjectPackage\Website\tests\showroom-app.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-showroom-mobile-landing-fullwidth-controls\**`

## Non-Scope

- 不改 `/` 根路径 `medical-kiosk`。
- 不改后端接口、语言契约或音频状态机。
- 不改 `/showroom` 详情页结构与底部操作条。
- 不新增 fallback、mock 成功或新路由。

## Dependencies

- `/showroom` 继续使用现有匿名 `app-config` 接口。
- landing -> detail 路径继续可用。
- `Playwright`、`Vite build`、前端证据校验和 closeout 脚本可执行。

## Milestones

1. 建立任务记录，定义 BDD/TDD 验收与证据模板。
2. 先写 RED 测试，锁定手机 landing 页语言切换区和入口卡片的整行宽度目标。
3. 实现最小 CSS 改动，放大手机 landing 页可点击面积。
4. 跑通验证，更新证据并执行 closeout preview。

## Expected Verification

- `npm test -- --run src/showroom-app.test.js`
- `npm run build`
- `npx playwright test tests/showroom-app.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-showroom-mobile-landing-fullwidth-controls/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-showroom-mobile-landing-fullwidth-controls --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已建立本次 `showroom` 手机 landing 页全宽控件任务目录与基础文档。
  - 已限定本次只优化入口卡片与语言切换的点击面积，不扩散到详情页或接口层。
- Verification evidence:
  - `doc/tasks/20260521-showroom-mobile-landing-fullwidth-controls/task.md`
  - `doc/tasks/20260521-showroom-mobile-landing-fullwidth-controls/execution-log.md`
  - `doc/tasks/20260521-showroom-mobile-landing-fullwidth-controls/frontend-feature-evidence.md`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - 已补充手机视口 `Playwright` RED 用例，锁定语言切换区与入口卡片的全宽几何目标。
- Verification evidence:
  - `tests/showroom-app.spec.js`
  - `npx playwright test tests/showroom-app.spec.js --reporter=line` (RED)
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - 已把手机 landing 页语言切换扩成整行 segmented control。
  - 已把手机公司入口卡片扩成全宽布局，并同步调整图片比例与 header 间距。
- Verification evidence:
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
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-showroom-mobile-landing-fullwidth-controls/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-showroom-mobile-landing-fullwidth-controls --mode preview`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 已完成 `/showroom` 手机 landing 页全宽控件优化。
  - 已让语言切换和公司入口卡片在小屏上具有更大的点击面积。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/showroom-app.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test tests/showroom-app.spec.js --reporter=line`
