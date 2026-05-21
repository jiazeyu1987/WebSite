# Task: Kiosk Voice Mute Controls

## Goal

在 `D:\ProjectPackage\Website\src\medical-kiosk.js` 的产品详情页语音讲解区域增加“一键静音”和“一键解除静音”两个 icon 按钮，并让静音状态在当前应用会话内持续生效：静音时只显示文字不播音，解除静音时若仍处于讲解态则立即恢复当前产品讲解播音。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-voice-mute-controls\**`

## Non-Scope

- 不修改 `showroom` 路由、配置消费逻辑或音频数据结构。
- 不给展厅页右侧语音栏新增静音按钮。
- 不引入 fallback、mock 数据或新的浏览器兼容分支。

## Dependencies

- 根路径 `/` 继续作为 `medical-kiosk` 入口。
- 现有产品详情页讲解按钮、语音合成运行时与描述文案继续可用。
- `Vitest`、`Playwright`、`Vite build` 与前端验证脚本可在本地执行。

## Milestones

1. 创建任务文档并记录 BDD/TDD 验收框架。
2. 先写 RED 测试，锁定静音、解除静音、讲解态保留与跨产品状态规则。
3. 实现 `medical-kiosk` 的静音状态机、icon 控件与波形联动样式。
4. 跑通单测、构建、浏览器验证与证据校验，更新任务文档并执行 closeout preview。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test tests/kiosk-detail.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-voice-mute-controls/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-voice-mute-controls --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已创建任务目录、任务文档、执行日志与前端证据文件。
  - 已锁定本次只修改 `medical-kiosk` 详情页相关文件与验证命令。
- Verification evidence:
  - `doc/tasks/20260521-kiosk-voice-mute-controls/task.md`
  - `doc/tasks/20260521-kiosk-voice-mute-controls/execution-log.md`
  - `doc/tasks/20260521-kiosk-voice-mute-controls/frontend-feature-evidence.md`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Pending
- Completed work:
  - 已先补 `Vitest` RED 回归用例，覆盖静音播放、播音中静音、讲解态解除静音重播，以及跨产品保留静音但重置讲解态。
  - 已补 `Playwright` 真实路径断言，覆盖详情页 mute/unmute icon 控件与语音运行时调用链。
- Verification evidence:
  - `src/medical-kiosk.test.js`
  - `tests/kiosk-detail.spec.js`
  - `npm test -- --run src/medical-kiosk.test.js` (RED)
- Remaining blockers:
  - None.

### Milestone 3

- Status: Pending
- Completed work:
  - 已将讲解逻辑拆为静音态与讲解态双状态模型，静音时只显示文字，不再触发播音。
  - 已在详情页讲解标题区加入静音与解除静音 icon 按钮、状态标签和仅在真实播音时激活的波形。
  - 已增加显式语音运行时注入入口，供浏览器用例稳定接管 `speechSynthesis`。
- Verification evidence:
  - `src/medical-kiosk.js`
  - `src/medical-kiosk.css`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - 已跑通单测、构建与 Playwright 详情页路径验证。
  - 已生成浏览器截图并补齐证据文档。
  - 已通过前端证据校验与 task closeout preview。
- Verification evidence:
  - `npm test -- --run src/medical-kiosk.test.js`
  - `npm run build`
  - `npx playwright test tests/kiosk-detail.spec.js --reporter=line`
  - `output/playwright/kiosk-detail-reference-alignment.png`
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-voice-mute-controls/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-voice-mute-controls --mode preview`
- Remaining blockers:
  - None.

## Current Status

Completed

- Completed work:
  - 已完成 `medical-kiosk` 详情页静音/解除静音 icon 控件、静音持久状态与讲解态联动实现。
  - 已补齐单测与浏览器回归，覆盖静音播放、讲解中静音立即停声、解除静音立即重播与跨产品静音保留。
  - 已为浏览器验证增加可注入的语音运行时测试钩子，确保真实点击路径可稳定验收。
- Remaining blockers:
  - None.

## Cleanup Candidates

- `doc/tasks/20260521-kiosk-voice-mute-controls/frontend-feature-evidence.md`

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test tests/kiosk-detail.spec.js --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-voice-mute-controls/frontend-feature-evidence.md`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-voice-mute-controls --mode preview`
