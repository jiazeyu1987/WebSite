# Task: kiosk 公司详情参考布局微调

## Goal

在上一轮“左上图片、左下播放、右侧卡片”结构已对齐的基础上，继续把 `D:\ProjectPackage\Website` 根路径 kiosk 公司详情往用户目标图收紧，重点微调：

- 左列图片主视觉比例与占位更接近目标图；
- 左下播放区更聚焦为主操作；
- 右侧卡片区的密度、节奏和首屏呈现更稳定。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260522-kiosk-company-detail-reference-polish\**`

## Non-Scope

- 不修改 `/showroom` 独立公司详情页
- 不修改接口 contract、字段来源或播放逻辑链路
- 不新增 fallback、假数据或测试专用前端控件

## Milestones

1. 建立本轮微调任务文档，记录当前结构已基本对齐但仍需视觉收紧。
2. 通过浏览器对照确认剩余视觉差异，并把新的期望补到测试中。
3. 完成结构/样式微调并通过单测与 Playwright 回归。
4. 更新任务记录并按基线收尾。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npx playwright test tests/kiosk-gallery.spec.js --grep "reference polish" --reporter=line`

## Current Status

Completed
- Completed work:
  - 已确认前一任务 `20260522-kiosk-company-detail-reference-reflow` 已完成并提交，基础结构已改为“左上图、左下播放、右侧卡片”。
  - 已继续收紧左图占比、左下播放区和右侧卡片密度，使首屏更接近目标图。
  - 已完成单测、Playwright 目标用例和受影响浏览器回归。
  - 已完成前端证据校验与任务收尾清理。
- Remaining blockers:
  - 无

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npx playwright test tests/kiosk-gallery.spec.js --grep "reference polish" --reporter=line`
- PASS: `npx playwright test tests/kiosk-gallery.spec.js tests/kiosk-detail.spec.js --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-company-detail-reference-polish/frontend-feature-evidence.md`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-company-detail-reference-polish --mode preview`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-company-detail-reference-polish --mode apply`
