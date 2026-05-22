# Task: kiosk 公司详情触屏卡片吸附与播放区铺满

## Goal

按用户在首页公司详情截图中的红框/绿框要求，调整根路径 `D:\ProjectPackage\Website` 的 kiosk 公司详情页：

- 左侧红框播放区由主播放按钮完整铺满；
- 右侧绿框“公司介绍卡片”限制在固定可视区内；
- 当卡片内容超出绿框时，用户可在触屏设备上通过上下滑动按卡片吸附切换；
- 绿框卡片区不显示滚动条；
- 保持真实数据来源、字段结构、路由和现有播放语义不变。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\tests\kiosk-company-detail-image-fill.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260522-kiosk-company-detail-touch-snap-scroll\**`

## Non-Scope

- 不修改 `/showroom` 独立公司详情页
- 不修改后端接口、请求参数、响应结构、真实数据来源、音频来源或字段映射
- 不新增 fallback、占位数据、兼容分支或测试专用前端控件
- 不改动右侧独立语音面板现有结构，除非实现本次布局时发现直接冲突

## Dependencies

- `D:\ProjectPackage\Int\IntPP\FRONTEND_STYLE.md` 作为当前前端基线
- `vitest`、`playwright` 与本地 `vite` 运行环境可用
- 中文任务文档、源码与测试需按 UTF-8 读写

## Previous Task Check

- Previous same-repo task record: `D:\ProjectPackage\Website\doc\tasks\20260522-kiosk-desktop-dual-column-bottom-gap\task.md`
- Status before this task: `Completed`
- Impact:
  - 上一任务已经完成桌面双列高度链路与底部留白收口，为本次“固定绿框 + 内部吸附滚动”提供基础。
  - 本次继续修改同一批 `medical-kiosk` 前端文件，需要在现有双列布局基础上追加触屏卡片吸附与播放区铺满，不回退上一任务结果。

## Milestones

1. 建立本次任务文档与执行日志，记录 BDD 场景、验证命令和上一任务已完成状态。
2. 先补 RED 测试，锁定播放区铺满、绿框内部吸附滚动、无滚动条和播放后滚动位置保持的可观察行为。
3. 通过最小前端改动完成双列公司详情布局、滚动职责切换和触屏卡片吸附。
4. 跑通单测、Playwright、证据校验与 closeout preview，并更新任务状态。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npx playwright test tests/kiosk-gallery.spec.js --grep "company detail touch snap|company detail dual-column bottom gap|reference polish" --reporter=line`
- `npx playwright test tests/kiosk-company-detail-image-fill.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-company-detail-touch-snap-scroll/frontend-feature-evidence.md`
- `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-company-detail-touch-snap-scroll --mode preview`

## Current Status

- Status: Completed
- Completed work:
  - 已核对用户确认的实现方案为“卡片吸附”，不是自由滚动。
  - 已确认当前公司详情基线来自 `medical-kiosk` 的桌面双列布局，且上一任务 `20260522-kiosk-desktop-dual-column-bottom-gap` 已完成。
  - 已确认本次滚动职责需要从 `[data-company-detail-panel]` 切换到 `[data-company-detail-fields-panel]`。
  - 已先补 RED 测试，复现公司详情播放重渲染会把绿框卡片滚动位置重置为顶部，以及桌面公司详情外层面板仍为 `overflowY=auto` 的现状。
  - 已在 `medical-kiosk.js` 中把公司详情当前滚动目标切到 `[data-company-detail-fields-panel]`，并让播放/暂停重渲染走保位链路。
  - 已在 `medical-kiosk.css` 中收紧桌面双列公司详情高度链路，使外层面板固定、右侧卡片区内部滚动、卡片按张吸附并隐藏滚动条。
  - 已把左侧播放按钮调整为沿播放区高度拉伸铺满，同时保持既有图标语义和真实播放逻辑不变。
  - 已完成 `Vitest`、目标 `Playwright`、主图铺满回归、证据文档和任务记录更新。
- Remaining blockers:
  - 无

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npx playwright test tests/kiosk-gallery.spec.js --grep "company detail touch snap|company detail dual-column bottom gap|reference polish" --reporter=line`
- PASS: `npx playwright test tests/kiosk-company-detail-image-fill.spec.js --reporter=line`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-company-detail-touch-snap-scroll/frontend-feature-evidence.md`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-company-detail-touch-snap-scroll --mode preview`
