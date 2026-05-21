BDD: root kiosk reads hall and product display data from IntRuoyi -> Given the public root route is display-only / When the kiosk renders home, hall gallery, company detail, and product detail states / Then the displayed business data must come from IntRuoyi public APIs rather than local hardcoded business content.

BDD: root kiosk plays backend audio instead of browser speech synthesis -> Given the kiosk product and company views expose public narration audio URLs from IntRuoyi / When the user plays narration / Then the page must use backend audio playback and must not synthesize local speech.

RED: audit current root kiosk -> FAIL, `src/medical-kiosk.js` still contained local hall arrays, local product detail copy generation, and browser speech synthesis behavior before this task.

GREEN: `npm test -- --run` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test --reporter=line` -> PASS

INFO: final root kiosk data flow uses anonymous `GET /showroom/display/app-config` for home, company, hall, and product card rendering, plus anonymous `GET /showroom/display/product/{productId}` for product detail fields.

GREEN: real browser probe against local IntRuoyi runtime -> PASS, `http://127.0.0.1:4174/` rendered company home image, hall title, product detail fields, and backend audio URLs from real anonymous showroom endpoints.

GREEN: distinct-hall verification probe -> PASS, the root route now cycles through distinct hall/product pairs: `240, 241, 242, 243, 245, 246, 248, 251`.
