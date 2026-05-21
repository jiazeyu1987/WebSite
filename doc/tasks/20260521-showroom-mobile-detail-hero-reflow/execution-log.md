# Execution Log: Showroom Mobile Detail Hero Reflow

- BDD: 手机详情首屏播放入口前置 -> Given 用户在手机宽度进入 `/showroom` 公司详情页 When 首屏渲染 Then 主图下方立即出现主标题和播放入口，不需要先经过字段列表。
- BDD: 手机详情主信息与播放入口同屏可见 -> Given 用户打开手机详情页 When 页面完成渲染 Then 主图、标题和播放入口应在首屏内可见。
- BDD: 桌面详情路径保持可用 -> Given 用户在桌面宽度访问 `/showroom` 详情页 When 页面渲染 Then 现有返回、语言切换和播放路径继续可用。
- RED: `npm test -- --run src/showroom-app.test.js` -> FAIL, 详情页当前没有独立的 summary/action hero 区，也无法锁定播放入口前置到字段列表之前。
- GREEN: `npm test -- --run src/showroom-app.test.js` -> PASS
- GREEN: `npm run build` -> PASS
- GREEN: `npx playwright test tests/showroom-app.spec.js --reporter=line` -> PASS
- AUDIT: 2026-05-21 -> 已把 `/showroom` 详情页改成 `image -> summary(hero) -> fields` 顺序，并把播放入口上提到 summary 区；手机宽度同时压缩了图片比例和间距，保证主图、标题和播放按钮同屏。
