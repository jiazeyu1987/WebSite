# Task: kiosk 公司详情按目标图重排

## Goal

按用户最新提供的“实际页 vs 目标图”对照图，重新调整 `D:\ProjectPackage\Website` 根路径 kiosk 的公司详情页，使其更贴近第二张目标图：

- 红框区域显示大图，而不是窄长图列；
- 讲解播放/停止入口改为目标图中的 ICO 风格图标按钮；
- 黄框区域主要显示若干公司信息卡片，不再让长段正文主导首屏；
- 保持真实数据来源、路由语义与播放逻辑不变。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260522-kiosk-company-detail-reference-reflow\**`

## Non-Scope

- 不修改 `/showroom` 独立公司详情页
- 不修改 `IntRuoyi` 接口 contract、字段结构或数据来源
- 不新增 fallback、占位数据、兼容分支或假数据

## Milestones

1. 建立新任务文档并确认目标图相对当前实现的偏差。
2. 先补 RED 测试，锁定“大图位置、图标播控、卡片首屏结构”的可观察行为。
3. 以最小前端改动重排 kiosk 公司详情布局与样式。
4. 完成单测、浏览器对照验证与任务收尾记录。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npx playwright test tests/kiosk-gallery.spec.js --grep "reference reflow" --reporter=line`

## Current Status

Completed
- Completed work:
  - 已确认上一任务 `20260522-kiosk-company-detail-image-icon-cards` 已完成并提交，但用户反馈与目标图仍不一致。
  - 已决定按第二张目标图重新收敛布局，不沿用上一版的窄图列假设。
  - 已根据用户补充把布局进一步收敛为“左上图片、左下播放按钮、右侧卡片区”。
  - 已抓取当前页截图对照，确认旧布局与目标不符。
  - 已完成 `medical-kiosk` 结构与样式重排，并通过单测与 Playwright 回归。
  - 已完成前端证据校验与任务收尾清理。
- Remaining blockers:
  - 无

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npx playwright test tests/kiosk-gallery.spec.js --grep "reference reflow" --reporter=line`
- PASS: `npx playwright test tests/kiosk-gallery.spec.js tests/kiosk-detail.spec.js --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-company-detail-reference-reflow/frontend-feature-evidence.md`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-company-detail-reference-reflow --mode preview`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-company-detail-reference-reflow --mode apply`
