BDD: home hero opens company detail from IntRuoyi -> Given the user is on the homepage hero image / When the user clicks the hero card / Then the left main region must switch to a company detail screen populated from anonymous `GET /showroom/display/app-config`.

BDD: company detail shows explicit loading and error states -> Given the homepage company detail depends on remote app-config / When the request is in flight or fails / Then the page must show an explicit loading or error state and must not fall back to local fake data.

BDD: non-home hall detail flow still works -> Given the homepage now opens company detail / When the user switches to `心内介入展厅` and clicks the first product card / Then the existing product detail page must still open and return to that hall gallery.

RED: `npm test -- --run src/medical-kiosk.test.js` -> FAIL, 首页当前大图不可点击进入公司详情，且 `medical-kiosk` 还没有远程公司详情 loading / error / ready 状态。

GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line` -> PASS

INFO: 公司详情直接复用现有匿名 `GET /showroom/display/app-config` 链路，不新增本地 fallback 或新的后端合同。
