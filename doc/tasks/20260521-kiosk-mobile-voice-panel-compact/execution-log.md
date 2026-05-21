# Execution Log: Kiosk Mobile Voice Panel Compact

- BDD: 手机竖屏语音面板默认折叠 -> Given 用户在手机竖屏进入 `medical-kiosk` 首页或展厅页 When 页面首屏渲染 Then 语音面板默认以紧凑摘要显示，而不是展开全文长面板。
- BDD: 手机竖屏可以显式展开全文 -> Given 语音面板默认折叠 When 用户点击展开讲解按钮 Then 全量讲解文本区域可见，并允许再次收起。
- BDD: 桌面行为保持完整语音面板 -> Given 用户在桌面宽度访问 `medical-kiosk` When 语音面板渲染 Then 保持现有完整语音文本展示与按钮入口，不默认折叠。
- RED: `npm test -- --run src/medical-kiosk.test.js` -> FAIL, 当前实现没有 `data-voice-panel-expanded`、`data-voice-preview` 或 `data-voice-panel-toggle`。
- GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS
- GREEN: `npm run build` -> PASS
- GREEN: `npx playwright test tests/kiosk-gallery.spec.js --reporter=line` -> PASS
- AUDIT: 2026-05-21 -> 已为 `medical-kiosk` 语音面板增加显式折叠状态、摘要预览区和竖屏展开/收起按钮；桌面宽度继续保留完整文本区并隐藏折叠开关。
