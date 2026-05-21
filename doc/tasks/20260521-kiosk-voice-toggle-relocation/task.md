# Task: Kiosk Voice Toggle Relocation

## Goal

将 `medical-kiosk` 详情页当前的静音/开声双按钮，改成右侧语音讲解栏标题区中的单一切换按钮：有声状态显示绿色喇叭图标，点击后切为静音状态并显示红色禁止喇叭图标，再次点击恢复开声。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-voice-toggle-relocation\**`

## Non-Scope

- 不修改 `showroom` 相关页面或数据结构。
- 不改动讲解按钮的主流程语义，仍保持“播放讲解/停止讲解”。
- 不新增额外 fallback 或第二套静音入口。

## Dependencies

- 右侧 `kiosk-voice` 语音栏继续在详情页可见。
- 现有静音状态机与语音合成运行时继续可用。
- `Vitest`、`Playwright`、`Vite build`、前端证据校验与 closeout 脚本可执行。

## Milestones

1. 建立本次位置与单按钮切换改动的任务记录与 BDD/TDD 验收框架。
2. 先写 RED 测试，锁定右侧 header 单按钮位置、切换状态、颜色与静音行为。
3. 实现右侧语音栏单按钮切换、图标颜色与详情区控件收缩。
4. 跑通验证、更新任务记录，并执行 closeout preview/apply。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test tests/kiosk-detail.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-voice-toggle-relocation/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-voice-toggle-relocation --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已建立本次跟进任务目录与基础文档框架。
  - 已锁定本次只调整右侧语音栏单按钮位置、形态与交互，不扩散到 `showroom`。
- Verification evidence:
  - `doc/tasks/20260521-kiosk-voice-toggle-relocation/task.md`
  - `doc/tasks/20260521-kiosk-voice-toggle-relocation/execution-log.md`
  - `doc/tasks/20260521-kiosk-voice-toggle-relocation/frontend-feature-evidence.md`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Pending
- Completed work:
  - 已先补 `Vitest` RED 用例，锁定右侧 header 单按钮位置、旧双按钮移除、共享 toggle 状态切换与静音讲解行为。
  - 已补 `Playwright` 真实路径用例，验证 header 按钮位置、颜色状态和真实点击链路。
- Verification evidence:
  - `src/medical-kiosk.test.js`
  - `tests/kiosk-detail.spec.js`
  - `npm test -- --run src/medical-kiosk.test.js` (RED)
- Remaining blockers:
  - None.

### Milestone 3

- Status: Pending
- Completed work:
  - 已将静音入口搬到右侧 `kiosk-voice` 标题区，改为一个共享 toggle 按钮。
  - 已移除详情区旧的静音/开声双按钮与状态字，并改成绿色喇叭 / 红色禁音喇叭图标切换。
  - 已让右侧语音栏与详情描述区波形只在实际有声播报时激活。
- Verification evidence:
  - `src/medical-kiosk.js`
  - `src/medical-kiosk.css`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - 已跑通单测、构建与 Playwright 详情页验证。
  - 已通过前端证据校验、closeout preview 与 closeout apply。
- Verification evidence:
  - `npm test -- --run src/medical-kiosk.test.js`
  - `npm run build`
  - `npx playwright test tests/kiosk-detail.spec.js --reporter=line`
  - `output/playwright/kiosk-detail-reference-alignment.png`
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-voice-toggle-relocation/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-voice-toggle-relocation --mode preview`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-voice-toggle-relocation --mode apply`
- Remaining blockers:
  - None.

## Current Status

Completed

- Completed work:
  - 已完成右侧语音栏 header 单按钮切换实现，当前位置与用户标注的红框一致。
  - 已移除详情区旧的静音/开声双按钮，并改为绿色喇叭 / 红色禁音喇叭图标切换。
  - 已通过单测、构建与真实浏览器路径验证静音后文本讲解、解除静音立即恢复播音。
- Remaining blockers:
  - None.

## Cleanup Candidates

- `doc/tasks/20260521-kiosk-voice-toggle-relocation/frontend-feature-evidence.md`

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test tests/kiosk-detail.spec.js --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-voice-toggle-relocation/frontend-feature-evidence.md`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-voice-toggle-relocation --mode preview`
