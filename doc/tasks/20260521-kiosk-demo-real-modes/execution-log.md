BDD: demo mode renders virtual kiosk data without remote requests -> Given the user switches to `演示模式` / When the kiosk re-renders / Then homepage, company detail, hall gallery, and product detail must use local virtual data and must not call IntRuoyi.

BDD: real mode renders IntRuoyi data and fails fast on backend errors -> Given the user switches to `真实模式` / When the kiosk requests IntRuoyi public data / Then the kiosk must render the real company/hall/product content or show an explicit error state without falling back to demo mode.

BDD: mode selection persists across reloads -> Given the user selected either `演示模式` or `真实模式` / When the page reloads / Then the kiosk must restore the last selected mode from local storage.

RED: `npm test -- --run src/medical-kiosk.test.js` -> FAIL, 页面还没有 `演示模式 / 真实模式` 切换控件，也没有双数据源与模式持久化。

GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line` -> PASS

INFO: 默认模式保持为 `真实模式`，用户可手动切回 `演示模式`；真实模式失败时只显式报错，不自动 fallback。
