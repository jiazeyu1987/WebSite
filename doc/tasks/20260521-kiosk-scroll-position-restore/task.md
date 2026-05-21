# Task: Kiosk Scroll Position Restore

## Goal

让 `medical-kiosk` 在用户从首页或展厅列表进入公司/产品详情后，点击返回时恢复原来的浏览位置，避免用户被甩回顶部重新查找。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-scroll-position-restore\**`

## Non-Scope

- 不把所有重渲染都改成全局滚动保持。
- 不调整 `showroom-app`。
- 不改动顶部 swipe 提示、后端接口、语音播放流程或布局结构。
- 不引入 fallback、mock 成功或新路由。

## Dependencies

- `medical-kiosk` 继续使用当前 `home -> company detail` 与 `gallery -> product detail` 的入口。
- 桌面展厅列表继续使用内部滚动容器；手机竖屏继续使用整页自然滚动。
- `Vitest`、`Playwright`、`Vite build`、前端证据校验和 closeout 脚本可执行。

## Milestones

1. 建立任务记录，定义 BDD/TDD 验收与证据模板。
2. 先写 RED 测试，锁定桌面内部滚动恢复和手机整页滚动恢复。
3. 实现最小滚动位置记忆与返回恢复逻辑，保持现有导航路径不变。
4. 跑通验证，更新证据并执行 closeout preview。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test tests/kiosk-gallery.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-scroll-position-restore/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-scroll-position-restore --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已建立本次滚动位置恢复任务目录与基础文档。
  - 已限定本次只处理“进入详情再返回”的位置恢复，不扩散到所有重渲染。
- Verification evidence:
  - `doc/tasks/20260521-kiosk-scroll-position-restore/task.md`
  - `doc/tasks/20260521-kiosk-scroll-position-restore/execution-log.md`
  - `doc/tasks/20260521-kiosk-scroll-position-restore/frontend-feature-evidence.md`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - 已补充 `Vitest` RED 用例，锁定桌面内部滚动恢复与首页返回位置恢复。
  - 已补充 `Playwright` 用例，锁定桌面内部 gallery 和手机竖屏整页滚动恢复。
- Verification evidence:
  - `src/medical-kiosk.test.js`
  - `tests/kiosk-gallery.spec.js`
  - `npm test -- --run src/medical-kiosk.test.js` (RED)
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - 已增加 browse scroll 位置缓存，并在进入公司/产品详情前保存当前位置。
  - 已在返回首页或展厅列表后按当前滚动目标恢复先前位置，同时保持现有导航路径不变。
- Verification evidence:
  - `src/medical-kiosk.js`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - 已跑通单测、构建和浏览器验证。
  - 已准备前端证据校验与 closeout preview。
- Verification evidence:
  - `npm test -- --run src/medical-kiosk.test.js`
  - `npm run build`
  - `npx playwright test tests/kiosk-gallery.spec.js --reporter=line`
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-scroll-position-restore/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-scroll-position-restore --mode preview`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 已完成 `medical-kiosk` 进入详情再返回时的滚动位置恢复。
  - 已覆盖桌面内部 gallery 滚动、手机竖屏整页滚动和首页公司详情返回路径。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test tests/kiosk-gallery.spec.js --reporter=line`
