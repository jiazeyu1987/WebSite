# Task: Showroom Mobile Vertical Scroll Hardening

## Goal

把 `/showroom` 手机端明确固化为“只负责上下滑”的信息页：消除横向溢出和横向误滑风险，让移动端操作模型与当前点击式详情流保持一致。

## Scope

- `D:\ProjectPackage\Website\src\showroom-app.css`
- `D:\ProjectPackage\Website\tests\showroom-app.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260522-showroom-mobile-vertical-scroll-hardening\**`

## Non-Scope

- 不改 `/` 根路径 `medical-kiosk`。
- 不为 `/showroom` 新增左右滑手势。
- 不改后端接口、语言契约或音频状态机。
- 不新增 fallback、mock 成功或新路由。

## Dependencies

- `/showroom` 继续使用现有匿名 `app-config` 接口。
- 现有 landing -> detail 和播放路径继续可用。
- `Playwright`、`Vite build`、前端证据校验和 closeout 脚本可执行。

## Milestones

1. 建立任务记录，定义 BDD/TDD 验收与证据模板。
2. 先写 RED 测试，锁定手机 `/showroom` 没有横向溢出并且移动端交互模型为竖向滚动。
3. 实现最小 CSS 收口，禁止横向溢出并明确 `pan-y` 交互。
4. 跑通验证，更新证据并执行 closeout preview。

## Expected Verification

- `npm test -- --run src/showroom-app.test.js`
- `npm run build`
- `npx playwright test tests/showroom-app.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-showroom-mobile-vertical-scroll-hardening/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-showroom-mobile-vertical-scroll-hardening --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已建立本次 `showroom` 手机竖向滚动收口任务目录与基础文档。
  - 已限定本次只处理手机端纵向滚动模型和横向溢出，不扩散到详情结构或接口层。
- Verification evidence:
  - `doc/tasks/20260522-showroom-mobile-vertical-scroll-hardening/task.md`
  - `doc/tasks/20260522-showroom-mobile-vertical-scroll-hardening/execution-log.md`
  - `doc/tasks/20260522-showroom-mobile-vertical-scroll-hardening/frontend-feature-evidence.md`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - 已补充手机视口 `Playwright` RED 用例，锁定无横向 overflow 与 `pan-y` 竖向滚动模型。
- Verification evidence:
  - `tests/showroom-app.spec.js`
  - `npx playwright test tests/showroom-app.spec.js --reporter=line` (RED)
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - 已为 `/showroom` 根容器增加 `overflow-x: hidden`。
  - 已为 `/showroom` 根容器增加 `touch-action: pan-y`，明确手机端竖向滚动模型。
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
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-showroom-mobile-vertical-scroll-hardening/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-showroom-mobile-vertical-scroll-hardening --mode preview`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 已完成 `/showroom` 手机竖向滚动收口。
  - 已显式限制横向溢出和横向误滑风险，明确页面以纵向浏览为主。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/showroom-app.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test tests/showroom-app.spec.js --reporter=line`
