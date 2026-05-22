# Task: 桌面双列页底部留白与右栏内部滚动

## Goal

实现根路径 `D:\ProjectPackage\Website` 的 kiosk 桌面双列页统一布局调整：在桌面横屏首页与同类双列详情页中，为左侧图片区和右侧讲解/内容栏底部预留约 `45px` 可见空白；右栏长文时改为卡片内部竖向滚动查看；左侧图片继续允许按容器拉伸铺满显示。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260522-kiosk-desktop-dual-column-bottom-gap\**`

## Non-Scope

- 不修改移动端竖屏语音面板折叠/展开逻辑
- 不修改后端接口、音频来源或文案数据结构
- 不新增 fallback、兼容分支、占位数据或测试专用 UI
- 不修改左图“可拉伸铺满”的现有策略

## Dependencies

- `D:\ProjectPackage\Int\IntPP\FRONTEND_STYLE.md` 作为当前前端基线
- `vitest`、`playwright` 与本地 `vite` 运行环境可用
- 中文任务文档、源码与测试需按 UTF-8 读写

## Previous Task Check

- Previous same-repo task record: `D:\ProjectPackage\Website\doc\tasks\20260522-kiosk-company-detail-icon-only-playback\task.md`
- Status before this task: `Blocked`
- Impact:
  - 上一任务与本次共享 `medical-kiosk` 同一批前端文件。
  - 已在上一任务中显式记录：由于用户切换到新的桌面双列布局需求，其最终验证与 closeout 需要并入本次布局任务一起完成，避免交叉验证与提交冲突。

## Milestones

1. 建立本次任务文档、执行日志和证据骨架，并记录上一任务阻塞状态。
2. 先补 RED 测试，锁定桌面双列页底部留白、右栏内部滚动和左图保持拉伸铺满的可观察行为。
3. 通过最小 CSS 调整实现桌面双列页统一底部留白与右栏滚动，不改移动端逻辑。
4. 跑通单测、浏览器验证、证据校验与 closeout preview，并更新任务状态。

## Expected Verification

- `npx vitest run src/medical-kiosk.test.js`
- `npx playwright test tests/kiosk-gallery.spec.js --grep "desktop dual-column bottom gap|company detail dual-column bottom gap" --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-desktop-dual-column-bottom-gap/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-desktop-dual-column-bottom-gap --mode preview`

## Current Status

- Status: Completed
- Completed work:
  - 已核对 `src/medical-kiosk.css` 中当前桌面双列布局高度、首页左图和右栏正文滚动链路。
  - 已确认首页左图当前已使用 `object-fit: fill`，满足“可拉伸铺满”的既有要求。
  - 已确认右侧语音正文当前已具备 `overflow-y: auto`，本次重点是把桌面双列页整体高度收短，显式留出底部空白并稳固内部滚动链路。
  - 已检查同仓库上一任务 `20260522-kiosk-company-detail-icon-only-playback`，并已按仓库规范显式标记为 `Blocked`，避免任务记录冲突。
  - 已为桌面双列页补充 RED 测试，先复现首页主图、公司详情内容区与右侧语音栏当前没有目标底部空白的现状。
  - 已在 `medical-kiosk.css` 中引入桌面 `45px` 底部留白规则，并把左右两列统一收进固定高度链路。
  - 已确保右侧语音栏高度固定、正文在 `[data-voice-copy]` 内部滚动，移动端折叠/展开逻辑保持不变。
  - 已完成 `Vitest`、目标 `Playwright`、整份 `kiosk-gallery.spec.js` 回归、证据校验与 closeout preview。
- Final verification result:
  - `npx vitest run src/medical-kiosk.test.js` 通过。
  - `npx playwright test tests/kiosk-gallery.spec.js --grep "desktop dual-column bottom gap|company detail dual-column bottom gap" --reporter=line` 通过。
  - `npx playwright test tests/kiosk-gallery.spec.js --reporter=line` 通过。
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-desktop-dual-column-bottom-gap/frontend-feature-evidence.md` 通过。
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-desktop-dual-column-bottom-gap --mode preview` 通过；预览建议保留 `task.md` 与 `execution-log.md`，将 `frontend-feature-evidence.md` 视为可清理附件。
