# Task: Kiosk Detail Reference Alignment

## Goal

将 `D:\ProjectPackage\Website\src\medical-kiosk.js` 的产品详情页重新对齐到用户提供的参考图：点击卡片进入独立详情页，保留返回展厅路径，并恢复右侧标签区、播放按钮和底部四块信息卡。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260520-kiosk-detail-reference-alignment\**`

## Non-Scope

- 不修改 `showroom` 前端路径、接口 contract 或后端数据结构。
- 不新增远程图片、接口、mock 数据或 fallback 分支。
- 不改动首页卡片墙与左右滑动切换展厅的入口行为。

## Dependencies

- 根路径 `/` 必须继续作为 kiosk 入口。
- 现有本地产品数据与 SVG 器械示意图必须继续可用于详情页主视觉。
- `Vitest`、`Playwright` 和本地 Vite 入口必须可执行。

## Milestones

1. 记录本次参考图复刻任务，明确允许修改的展示层边界与目标差异。
2. 先写失败测试，锁定详情页标签区、播放按钮、底部四块信息卡和返回路径。
3. 调整详情页结构与样式，对齐参考图的首屏构图和信息层级。
4. 运行单测、构建与浏览器截图验证，更新任务文档并完成 closeout preview。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test tests/kiosk-detail.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260520-kiosk-detail-reference-alignment/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-kiosk-detail-reference-alignment --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已确认当前详情页属于 `medical-kiosk`，且与用户参考图的主要差异是右侧标签区、播放按钮与底部四块信息卡被前一次迭代删除。
  - 已声明仅修改 `medical-kiosk` 相关展示层文件，保持 API、路由与数据边界不变。
- Verification evidence:
  - `src/medical-kiosk.js`
  - `src/medical-kiosk.css`
  - `output/playwright/kiosk-detail-page.png`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - 已补充 RED 测试，锁定详情页标签区、讲解按钮、顶部状态文案和底部四块信息卡。
  - 已确认点击卡片进入详情页与返回展厅路径仍需保持现有真实用户路径。
- Verification evidence:
  - `src/medical-kiosk.test.js`
  - `tests/kiosk-detail.spec.js`
  - `npm test -- --run src/medical-kiosk.test.js`
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - 已重建 `medical-kiosk` 详情页结构，恢复右侧标签、讲解按钮、底部四块信息卡和更贴近参考图的文案层级。
  - 已保留卡片进详情与返回展厅路径，并为讲解按钮补上浏览器原生语音朗读入口与不支持时的显式提示。
- Verification evidence:
  - `src/medical-kiosk.js`
  - `src/medical-kiosk.css`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - 已完成单测、构建、浏览器路径验证与参考图截图导出。
- Verification evidence:
  - `npm test -- --run src/medical-kiosk.test.js`
  - `npm run build`
  - `npx playwright test tests/kiosk-detail.spec.js --reporter=line`
  - `output/playwright/kiosk-detail-reference-alignment.png`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 已完成 `medical-kiosk` 详情页与参考图的结构对齐。
  - 已完成返回路径、标签区、讲解按钮与底部信息卡的验证。
  - 已补充“播放讲解”按钮的回归覆盖，确保讲解状态与语音调用链不被后续改动破坏。
- Remaining blockers:
  - None.

## Cleanup Candidates

- `doc/tasks/20260520-kiosk-detail-reference-alignment/frontend-feature-evidence.md`

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test tests/kiosk-detail.spec.js --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260520-kiosk-detail-reference-alignment/frontend-feature-evidence.md`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-kiosk-detail-reference-alignment --mode preview`

## Follow-up Updates

- 2026-05-20:
  - 为详情页 `播放讲解` 按钮新增了单测级回归覆盖，校验点击后会进入讲解状态、调用语音运行时，并在讲解结束后恢复为空闲提示。
  - 再次确认 `npm run build` 与 `tests/kiosk-detail.spec.js` 浏览器路径仍然通过。
