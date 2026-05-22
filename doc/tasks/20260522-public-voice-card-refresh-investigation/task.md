# Task: 排查公开讲解卡片按钮触发刷新感

## Goal

排查 `D:\ProjectPackage\Website` 中“公开讲解”卡片上的按钮点击后为何看起来像页面刷新，明确这是浏览器真实整页刷新、默认提交/跳转，还是前端整树重渲染造成的刷新感，并给出代码级归因。

## Scope

- `D:\ProjectPackage\Website\doc\tasks\20260522-public-voice-card-refresh-investigation\**`
- `D:\ProjectPackage\Website\src\medical-kiosk.js` 只读排查

## Non-Scope

- 不在未确认需求前修改生产代码
- 不新增 fallback、降级、兼容分支或测试专用 UI
- 不改动后端接口、路由结构或数据来源

## Dependencies

- `D:\ProjectPackage\Website\src\medical-kiosk.js` 当前实现可读
- UTF-8 方式读取中文源码与任务文档

## Milestones

1. 建立任务记录，并确认上一未完成任务的阻塞状态。
2. 定位“公开讲解”卡片及其按钮的渲染代码与点击事件入口。
3. 判断点击后出现“刷新感”的直接原因，并区分是否属于浏览器真实刷新。
4. 更新任务状态与验证结论。

## Expected Verification

- `rg -n "公开讲解|data-language-toggle-button|data-speech-mute-toggle|data-voice-panel-toggle|root.innerHTML = createAppMarkup\\(state\\)" src/medical-kiosk.js`
- UTF-8 读取 `src/medical-kiosk.js` 对应片段并交叉核对按钮渲染、事件委托与 `render()` 实现

## Current Status

- Status: Completed
- Completed work:
  - 已确认上一任务 `20260522-homepage-detail-runtime-blocker` 当前因上游 live preview 数据缺口阻塞，并已显式记录为 `Blocked`。
  - 已定位“公开讲解”卡片渲染位于 `src/medical-kiosk.js` 的 `createVoicePanelMarkup()`。
  - 已确认卡片内按钮均为 `type="button"`，未发现表单提交型按钮。
  - 已确认点击处理通过根节点事件委托进入 `switchLanguage()`、`toggleMute()`、`toggleVoicePanel()`。
  - 已确认这些状态切换最终会调用 `render()` 或 `rerenderPreservingBrowseScroll()`，而 `render()` 会执行 `root.innerHTML = createAppMarkup(state)`，导致整个应用根节点被重建，视觉上表现为“页面刷新”。
- Final verification result:
  - 结论为“前端整树重渲染导致的刷新感”，不是浏览器真实整页 reload，也不是 `<form>` 默认提交。
