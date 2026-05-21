# Execution Log: Kiosk Scroll Position Restore

- BDD: 桌面展厅列表返回位置恢复 -> Given 用户在桌面端滚动 `medical-kiosk` 展厅内部列表并进入产品详情 When 点击返回展厅 Then 原内部滚动位置被恢复而不是回到顶部。
- BDD: 手机整页返回位置恢复 -> Given 用户在手机竖屏下滚动 `medical-kiosk` 展厅整页并进入产品详情 When 点击返回展厅 Then 原页面滚动位置被恢复而不是回到顶部。
- BDD: 首页公司详情返回位置恢复 -> Given 用户在首页进入公司详情 When 点击返回首页 Then 首页原浏览位置被恢复。
- RED: `npm test -- --run src/medical-kiosk.test.js` -> FAIL, 返回列表后 `scrollTop` 仍回到 `0`，桌面 gallery 和首页返回位置都未恢复。
- GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS
- GREEN: `npm run build` -> PASS
- GREEN: `npx playwright test tests/kiosk-gallery.spec.js --reporter=line` -> PASS
- AUDIT: 2026-05-21 -> 已增加 browse 位置缓存，并在 `openCompanyDetail` / `openProductDetail` 前记录当前位置，在 `backToGallery` 后按当前滚动目标恢复到原位置。
