# Task: 隐藏 kiosk 顶部切换提示与页码

## Goal

按用户最新界面要求，移除 `D:\ProjectPackage\Website` 中 `medical-kiosk` 顶部展厅切换条的提示文案与页码展示，使红框区域不再渲染，同时保留左右箭头和滑动切换展厅能力。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260522-kiosk-hide-swipe-meta\**`

## Non-Scope

- 不修改展厅切换逻辑、箭头交互或语音面板行为
- 不新增 fallback、兼容分支或占位 UI
- 不改动 `IntRuoyi` 代码或数据库

## Milestones

1. 建立任务记录，并把“顶部不显示提示文案与页码”写成 BDD/TDD 目标。
2. 先更新针对性测试，得到 RED，证明当前实现仍会渲染该区域。
3. 以最小改动移除该区域渲染，并保持切换交互不变。
4. 完成单测与 Playwright 回归，补齐缺陷证据与最终状态。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npx playwright test tests/kiosk-gallery.spec.js --grep "mobile title strip hides swipe guidance and slot progress" --reporter=line`

## Current Status

Completed
- Completed work:
  - 已定位红框区域来自 `medical-kiosk` 顶部切换条的 `data-swipe-hint` 与 `data-swipe-progress`。
  - 已先更新单测与 Playwright 断言，拿到 RED，证明当前实现仍在渲染该区域。
  - 已删除顶部 meta 区的模板输出，仅保留标题、左右箭头、`aria-label` 与滑动切换事件。
  - 已完成 `src/medical-kiosk.test.js` 全文件回归，以及移动端 Playwright 目标场景回归。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npx playwright test tests/kiosk-gallery.spec.js --grep "mobile title strip hides swipe guidance and slot progress" --reporter=line`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-hide-swipe-meta --mode preview`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-hide-swipe-meta --mode apply`
