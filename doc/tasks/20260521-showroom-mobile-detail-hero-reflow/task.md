# Task: Showroom Mobile Detail Hero Reflow

## Goal

重排 `/showroom` 手机详情页首屏，让主图之后立即出现主标题和播放入口，把核心操作往拇指区前移，同时保留现有双语播放和字段展示能力。

## Scope

- `D:\ProjectPackage\Website\src\showroom-app.js`
- `D:\ProjectPackage\Website\src\showroom-app.css`
- `D:\ProjectPackage\Website\src\showroom-app.test.js`
- `D:\ProjectPackage\Website\tests\showroom-app.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-showroom-mobile-detail-hero-reflow\**`

## Non-Scope

- 不改 `/` 根路径 `medical-kiosk`。
- 不改后端接口、语言契约或音频播放逻辑。
- 不增加 fallback、mock 成功或新路由。
- 不做整站视觉重构，只重排 `showroom` 手机详情首屏。

## Dependencies

- `/showroom` 继续使用现有匿名 `app-config` 接口。
- 现有 landing -> detail -> back 路径继续可用。
- `Vitest`、`Playwright`、`Vite build`、前端证据校验和 closeout 脚本可执行。

## Milestones

1. 建立任务记录，定义 BDD/TDD 验收与证据模板。
2. 先写 RED 测试，锁定手机详情首屏结构顺序和播放入口前置。
3. 实现最小前端重排，优化手机首屏信息和播放入口位置。
4. 跑通验证，更新证据并执行 closeout preview。

## Expected Verification

- `npm test -- --run src/showroom-app.test.js`
- `npm run build`
- `npx playwright test tests/showroom-app.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-showroom-mobile-detail-hero-reflow/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-showroom-mobile-detail-hero-reflow --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已建立本次 `showroom` 手机详情首屏重排任务目录与基础文档。
  - 已限定本次只优化手机详情首屏信息和播放入口位置，不扩散到 `medical-kiosk` 或接口层。
- Verification evidence:
  - `doc/tasks/20260521-showroom-mobile-detail-hero-reflow/task.md`
  - `doc/tasks/20260521-showroom-mobile-detail-hero-reflow/execution-log.md`
  - `doc/tasks/20260521-showroom-mobile-detail-hero-reflow/frontend-feature-evidence.md`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - 已补充 `Vitest` RED 用例，锁定详情页 `summary/actions/fields` 顺序。
  - 已补充手机视口 `Playwright` 用例，锁定主图、标题和播放入口首屏同显。
- Verification evidence:
  - `src/showroom-app.test.js`
  - `tests/showroom-app.spec.js`
  - `npm test -- --run src/showroom-app.test.js` (RED)
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - 已将详情页重排为 `media -> summary(hero) -> fields` 结构。
  - 已把播放入口上提到 summary 区，并在手机宽度下压缩图片比例与详情间距。
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
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-showroom-mobile-detail-hero-reflow/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-showroom-mobile-detail-hero-reflow --mode preview`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 已完成 `/showroom` 手机详情首屏重排。
  - 已让主图后方立即进入主信息和播放入口，并把字段区下压到 hero 区之后。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/showroom-app.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test tests/showroom-app.spec.js --reporter=line`
