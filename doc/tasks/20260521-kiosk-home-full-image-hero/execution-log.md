BDD: home hero shows one full-area image -> Given the user opens the kiosk root homepage / When the active category is `首页` / Then the left main region must render exactly one home hero image and stretch it to fill the red-box area.

BDD: home hero keeps voice panel and title visible -> Given the homepage now uses a full-area image / When the user stays on `首页` / Then the page title and right-side `语音讲解` panel must remain visible.

BDD: non-home detail flow still works -> Given the homepage no longer shows the old logo card / When the user switches to `心内介入展厅` and clicks the first product card / Then the existing product detail page must still open and return to that hall gallery.

RED: `npm test -- --run src/medical-kiosk.test.js` -> FAIL, 首页当前仍渲染旧的 Logo 卡片，没有用户图片对应的首页大图节点。

GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line` -> PASS

INFO: 浏览器验证使用直连现成 `Vite` 服务的临时 Playwright 配置，以避免默认 `webServer` 生命周期在当前线程里遗留端口占用。
