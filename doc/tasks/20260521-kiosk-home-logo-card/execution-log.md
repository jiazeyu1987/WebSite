BDD: home gallery shows only one company logo card -> Given the user opens the kiosk root homepage / When the active category is `首页` / Then the main card region must render exactly one company logo card and no product cards.

BDD: gallery detail flow still works from a non-home hall -> Given the homepage no longer shows product cards / When the user switches to `心内介入展厅` and clicks the first product card / Then the existing product detail page must still open and return to that hall gallery.

BDD: home swipe and hall navigation remain available -> Given the homepage now shows a single logo card / When the user swipes or clicks the category arrows / Then the app must still switch into the next hall and render that hall's product grid.

RED: `npm test -- --run src/medical-kiosk.test.js` -> FAIL, 首页当前仍渲染整组产品卡片，没有单独的公司 Logo 卡片；详情路径测试也仍默认从首页首张产品卡进入。

GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line` -> PASS

INFO: 浏览器验证使用直连现成 `Vite` 服务的临时 Playwright 配置，以避免默认 `webServer` 生命周期在当前线程里遗留端口占用。
