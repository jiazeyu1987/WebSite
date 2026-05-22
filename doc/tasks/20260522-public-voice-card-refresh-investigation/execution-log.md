# Execution Log

- Task: `20260522-public-voice-card-refresh-investigation`
- Scope: `D:\ProjectPackage\Website\src\medical-kiosk.js`
- Mode: 只读排查，无生产代码变更

## Investigation Evidence

- 2026-05-22:
  - 已用 UTF-8 检查 `src/medical-kiosk.js` 中“公开讲解”卡片实现。
  - 已确认按钮定义位于 `createVoicePanelMarkup()` / `createLanguageToggleMarkup()`，相关按钮均声明 `type="button"`。
  - 已确认根节点点击委托位于 `root.addEventListener("click", ...)`，按钮点击会进入：
    - `switchLanguage()`
    - `toggleMute()`
    - `toggleVoicePanel()`
  - 已确认：
    - `switchLanguage()` 调用 `render()`
    - `toggleMute()` 调用 `render()`
    - `toggleVoicePanel()` 调用 `rerenderPreservingBrowseScroll()`，其内部也会调用 `render()`
  - 已确认 `render()` 的核心实现为 `root.innerHTML = createAppMarkup(state)`，因此每次点击相关按钮时都会重建整个应用根节点 DOM。
  - 结论：用户看到的是整树重渲染带来的“刷新感/闪动感”，而不是浏览器原生整页刷新。

## BDD / TDD

- N/A：本次仅做只读根因排查，没有行为变更，也未实施代码修复。
