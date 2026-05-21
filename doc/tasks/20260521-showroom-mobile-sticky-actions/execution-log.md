# Execution Log: Showroom Mobile Sticky Actions

- BDD: 手机详情 sticky 操作条可见 -> Given 用户在手机宽度进入 `/showroom` 公司详情页 When 页面渲染 Then 返回和播放入口位于同一个操作条中，并作为主操作保持可见。
- BDD: 手机详情长字段滚动后仍可触达 -> Given 用户向下浏览公司字段列表 When 页面滚动超过首屏 Then 返回和播放入口仍保持在视口内。
- BDD: 桌面详情路径保持可用 -> Given 用户在桌面宽度访问 `/showroom` 详情页 When 页面渲染 Then 现有返回和播放路径继续可用。
- RED: `npm test -- --run src/showroom-app.test.js` -> FAIL, 当前详情页没有独立的 `data-company-detail-action-bar`，无法锁定手机 sticky 操作条。
- GREEN: `npm test -- --run src/showroom-app.test.js` -> PASS
- GREEN: `npm run build` -> PASS
- GREEN: `npx playwright test tests/showroom-app.spec.js --reporter=line` -> PASS
- AUDIT: 2026-05-21 -> 已将返回与播放合并到统一的 `showroom-detail__action-bar` 中，并在手机宽度下启用 sticky 条，使长字段滚动时主操作仍留在视口内。
