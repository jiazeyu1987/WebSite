# Task: 隐藏公开讲解卡片标题文本

## Goal

按用户截图调整 `D:\ProjectPackage\Website` 根路径 kiosk 首页右侧“公开讲解”卡片头部，去掉红框中的标题文字，不再显示“公开讲解 / Public narration”，同时保留现有语言切换、静音、展开收起、讲解播放与文案正文能力。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\doc\tasks\20260522-kiosk-hide-public-voice-title\**`

## Non-Scope

- 不改动公司详情左下图标播控区
- 不改动 `/showroom` 独立公司详情页
- 不新增 fallback、兼容分支、占位文案或测试专用 UI
- 不调整“公开讲解”卡片正文、按钮语义或真实数据来源

## Dependencies

- `D:\ProjectPackage\Int\IntPP\FRONTEND_STYLE.md` 前端基线已读取
- `vitest` 本地单测环境可运行
- UTF-8 方式读写中文任务文档、源码与测试

## Milestones

1. 建立任务文档并确认前序相关任务状态不阻塞本次修改。
2. 先补 RED 测试，锁定语音卡片标题文本隐藏且现有控件保留的可观察行为。
3. 以最小实现移除可见标题文本，不影响现有语音卡片交互。
4. 运行 GREEN 验证、更新证据与收尾预览。

## Expected Verification

- `npx vitest run src/medical-kiosk.test.js -t "hides the public narration title text while keeping the voice card controls available"`
- `npx vitest run src/medical-kiosk.test.js`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-hide-public-voice-title/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-hide-public-voice-title --mode preview`

## Current Status

- Status: Completed
- Completed work:
  - 已读取 `D:\ProjectPackage\Int\IntPP\FRONTEND_STYLE.md`，确认本次不做额外视觉重设计，只做现有卡片头部文本隐藏。
  - 已检查前序相关任务 `20260522-public-voice-card-local-update` 为 `Completed`，其局部刷新改造不阻塞本次继续在“公开讲解”卡片上做行为收口。
  - 已定位目标实现位于 `src/medical-kiosk.js` 的 `createVoicePanelMarkup()`，当前标题由 `copy.voiceTitle` 渲染为可见 `h2`。
  - 已新增 RED 回归用例，先复现首页右侧语音卡片仍渲染 `.kiosk-voice__title` 的现状。
  - 已移除首页右侧语音卡片头部的可见标题节点，保留语言切换、静音、展开收起与正文讲解区域不变。
  - 已完成单测回归、真实浏览器根路径核对、证据校验与 closeout 预览。
- Final verification result:
  - `npx vitest run src/medical-kiosk.test.js -t "hides the public narration title text while keeping the voice card controls available"` 通过。
  - `npx vitest run src/medical-kiosk.test.js` 通过。
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-hide-public-voice-title/frontend-feature-evidence.md` 通过。
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-hide-public-voice-title --mode preview` 通过；预览建议保留 `task.md` 与 `execution-log.md`，将 `frontend-feature-evidence.md` 视为可清理附件。
