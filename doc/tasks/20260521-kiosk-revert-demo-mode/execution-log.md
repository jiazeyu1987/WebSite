# Execution Log

BDD: kiosk reverts to the single real-data mode -> Given the user no longer wants demo mode / When the kiosk root homepage loads / Then the page must use the existing real-data path only and no longer render a mode switch.

BDD: company detail and product detail still work after rollback -> Given demo mode is removed / When the user opens company detail from the home hero and product detail from a hall / Then both paths must remain available.

RED: `rg -n "KIOSK_MODE|DEMO_|data-mode|demo mode|medical-kiosk-mode|demo-silence" src tests public -S` -> FAIL, expected reason: demo-mode runtime code, E2E test, and asset were still present before rollback.

GREEN: Removed the demo/real mode runtime branch from `src/medical-kiosk.js`, removed the demo-mode Playwright test, removed `public/demo-silence.wav`, and added assertions that no `[data-mode-option]` is rendered.

GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS, 5 tests.

GREEN: `npm run build` -> PASS.

GREEN: `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line` -> PASS, 3 tests.

GREEN: Browser check on `http://127.0.0.1:4173/` -> PASS, `loadState=ready`, `modeButtons=0`, `homeHeroImages=1`, `companyEntryCards=1`.
