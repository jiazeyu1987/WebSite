# Execution Log: Showroom Mobile Field Cards

- BDD: 手机字段列表卡片化 -> Given 用户在手机宽度进入 `/showroom` 详情页 When 字段列表渲染 Then 每个公开字段都作为独立卡片出现，标签和值层级清楚。
- BDD: 字段标签和值有稳定标记 -> Given 详情页字段列表渲染 When 前端和测试读取字段节点 Then 标签和值分别有稳定的 `data-company-field-label` 与 `data-company-field-value` 标记。
- BDD: 桌面路径保持可用 -> Given 用户在桌面宽度访问 `/showroom` 详情页 When 页面渲染 Then 现有详情、返回和播放路径继续可用。
- RED: `npm test -- --run src/showroom-app.test.js` -> FAIL, 当前字段节点没有独立的 label/value 标记，也无法锁定手机卡片化字段结构。
- GREEN: `npm test -- --run src/showroom-app.test.js` -> PASS
- GREEN: `npm run build` -> PASS
- GREEN: `npx playwright test tests/showroom-app.spec.js --reporter=line` -> PASS
- AUDIT: 2026-05-21 -> 已为字段标签和值补充稳定 `data-company-field-label` / `data-company-field-value` 标记，并在手机宽度下把字段区改成有独立间距、圆角和阴影的卡片式阅读块。
