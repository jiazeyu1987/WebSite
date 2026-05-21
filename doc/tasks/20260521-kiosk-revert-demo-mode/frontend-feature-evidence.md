# Frontend Feature Evidence

## Task

- Task ID: `20260521-kiosk-revert-demo-mode`
- Feature: Root kiosk rollback to single real-data mode
- Status: Completed

## Behavior

- The root `/` kiosk loads the existing real IntRuoyi app-config data path.
- The home hero image remains clickable and opens the company detail view.
- Product detail loading remains available from hall product cards.
- Demo/real mode UI and local virtual data mode are removed.

## Acceptance

- PASS: Root kiosk no longer renders `[data-mode-option]`.
- PASS: Root kiosk calls the real app-config loader and renders the backend company home image.
- PASS: Clicking the home hero opens company detail loaded from app-config.
- PASS: Product detail still loads from the backend product detail loader.

## BDD

- `BDD: kiosk reverts to the single real-data mode -> Given the user no longer wants demo mode / When the kiosk root homepage loads / Then the page must use the existing real-data path only and no longer render a mode switch.`
- `BDD: company detail and product detail still work after rollback -> Given demo mode is removed / When the user opens company detail from the home hero and product detail from a hall / Then both paths must remain available.`

## TDD Evidence

- `RED: rg -n "KIOSK_MODE|DEMO_|data-mode|demo mode|medical-kiosk-mode|demo-silence" src tests public -S -> FAIL, demo-mode runtime code, E2E test, and asset were still present before rollback.`
- `GREEN: npm test -- --run src/medical-kiosk.test.js -> PASS, 5 tests.`
- `GREEN: npm run build -> PASS.`
- `GREEN: npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line -> PASS, 3 tests.`
- `GREEN: Browser check on http://127.0.0.1:4173/ -> PASS, modeButtons=0, homeHeroImages=1, companyEntryCards=1.`

## Verification

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line`
- PASS: In-app browser check on `http://127.0.0.1:4173/`

## Files Changed

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\public\demo-silence.wav`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-revert-demo-mode\execution-log.md`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-revert-demo-mode\frontend-feature-evidence.md`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-revert-demo-mode\task.md`

## Notes

- This rollback intentionally does not touch `/showroom`.
- This rollback intentionally keeps the real-data company detail flow.

## Blockers

- None.
