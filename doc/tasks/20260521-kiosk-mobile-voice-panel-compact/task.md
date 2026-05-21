# Task: Kiosk Mobile Voice Panel Compact

## Goal

压缩 `medical-kiosk` 手机竖屏下语音面板的首屏占高：默认显示紧凑摘要，并提供明确的展开/收起入口；桌面与大屏布局保持现有阅读体验。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-mobile-voice-panel-compact\**`

## Non-Scope

- 不改 `/showroom`。
- 不改后台接口、音频契约或页面主路由。
- 不删除现有语言切换、静音和播放入口。
- 不扩展为新的设计系统重构或全局布局重排。

## Dependencies

- `medical-kiosk` 继续保留当前语音面板、语言切换、静音按钮和播放按钮。
- 手机竖屏仍沿用当前单列布局；桌面和横屏继续保留原完整语音面板。
- `Vitest`、`Playwright`、`Vite build`、前端证据校验和 closeout 脚本可执行。

## Milestones

1. 建立任务记录，定义 BDD/TDD 验收与证据模板。
2. 先写 RED 测试，锁定手机竖屏默认折叠、摘要可见和展开交互。
3. 实现最小前端改动，压缩竖屏语音面板占高并保持桌面行为不变。
4. 跑通验证，更新证据并执行 closeout preview。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test tests/kiosk-gallery.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-mobile-voice-panel-compact/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-mobile-voice-panel-compact --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已建立本次手机竖屏语音面板压缩任务目录与基础文档。
  - 已限定本次只处理 `medical-kiosk` 竖屏语音面板折叠/展开，不扩散到 `showroom` 或其它布局重排。
- Verification evidence:
  - `doc/tasks/20260521-kiosk-mobile-voice-panel-compact/task.md`
  - `doc/tasks/20260521-kiosk-mobile-voice-panel-compact/execution-log.md`
  - `doc/tasks/20260521-kiosk-mobile-voice-panel-compact/frontend-feature-evidence.md`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - 已补充 `Vitest` RED 用例，锁定默认折叠状态、摘要预览与展开/收起切换。
  - 已补充 `Playwright` 用例，锁定桌面完整面板与手机竖屏折叠行为。
- Verification evidence:
  - `src/medical-kiosk.test.js`
  - `tests/kiosk-gallery.spec.js`
  - `npm test -- --run src/medical-kiosk.test.js` (RED)
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - 已在 `medical-kiosk` 语音面板中加入紧凑摘要、显式展开/收起按钮和折叠状态标记。
  - 已让桌面宽度继续显示完整面板，同时把折叠开关限制为手机竖屏可见。
- Verification evidence:
  - `src/medical-kiosk.js`
  - `src/medical-kiosk.css`
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
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-mobile-voice-panel-compact/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-mobile-voice-panel-compact --mode preview`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 已完成 `medical-kiosk` 手机竖屏语音面板压缩。
  - 已实现默认折叠摘要、显式展开/收起按钮和桌面完整面板保留。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test tests/kiosk-gallery.spec.js --reporter=line`
