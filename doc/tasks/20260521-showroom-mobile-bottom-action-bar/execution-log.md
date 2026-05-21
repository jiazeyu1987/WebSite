# Execution Log: Showroom Mobile Bottom Action Bar

- BDD: 手机操作条位于底部拇指区 -> Given 用户在手机宽度进入 `/showroom` 详情页 When 页面滚动 Then 返回和播放操作条应靠近视口底部而不是顶部。
- BDD: 手机操作条保留安全区内边距 -> Given 用户在带底部安全区的手机上浏览详情页 When 操作条渲染 Then 操作条与底部边缘之间保留安全区偏移。
- BDD: 桌面路径保持可用 -> Given 用户在桌面宽度访问 `/showroom` 详情页 When 页面渲染 Then 现有返回和播放路径继续可用。
- RED: `npx playwright test tests/showroom-app.spec.js --reporter=line` -> FAIL, 当前移动端 sticky 条仍位于视口上半区，不满足底部拇指区目标。
- GREEN: `npm test -- --run src/showroom-app.test.js` -> PASS
- GREEN: `npm run build` -> PASS
- GREEN: `npx playwright test tests/showroom-app.spec.js --reporter=line` -> PASS
- AUDIT: 2026-05-21 -> 已新增独立的 `showroom-mobile-action-bar`，把手机端返回与播放入口移到视口底部，并加入底部安全区偏移与内容留白；桌面详情摘要区保留原有 action bar。
