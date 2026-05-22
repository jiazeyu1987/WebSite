# Task: 公开讲解卡片按钮改为局部更新

## Goal

修复 `D:\ProjectPackage\Website` 中“公开讲解”卡片按钮点击后的整树重渲染刷新感，确保相关按钮交互改为局部更新，不再让整个应用根节点被重建，同时保持现有文案、播控、语言切换和展开收起行为不变。

## Scope

- `D:\ProjectPackage\Website\doc\tasks\20260522-public-voice-card-local-update\**`
- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`

## Non-Scope

- 不改动后端接口、真实数据来源或路由结构
- 不新增 fallback、兼容分支或测试专用 UI
- 不调整非“公开讲解”卡片相关交互的既有行为

## Dependencies

- `vitest` 本地测试环境可运行
- UTF-8 方式读取与写入中文任务文档、源码与测试

## Milestones

1. 建立任务记录并确认上一任务状态不阻塞本次修复。
2. 为“公开讲解”卡片按钮点击触发整树重建补充回归测试。
3. 在不改变用户可见业务行为的前提下，将相关按钮改为局部更新。
4. 完成 GREEN 验证并更新任务状态、证据与收尾预览。

## Expected Verification

- `npx vitest run src/medical-kiosk.test.js -t "keeps the public narration card mounted while toggling its local controls"`
- `npx vitest run src/medical-kiosk.test.js`

## Current Status

- Status: Completed
- Completed work:
  - 已确认上一任务 `20260522-public-voice-card-refresh-investigation` 已完成，并给出根因归因为前端整树重渲染。
  - 已为“公开讲解”卡片新增回归测试，先复现语言/静音按钮会触发 ready 态整树重建。
  - 已将 kiosk ready 态拆分为头部、主体内容、公开讲解卡片三个可局部刷新的区域，避免点击语言/静音按钮时重建整个应用根节点。
  - 已将静音与讲解面板展开收起进一步收敛为语音相关区域更新，避免无关头部与主体区域重绘。
- Final verification result:
  - `npx vitest run src/medical-kiosk.test.js -t "keeps the public narration card mounted while toggling its local controls"` 通过。
  - `npx vitest run src/medical-kiosk.test.js` 通过。
