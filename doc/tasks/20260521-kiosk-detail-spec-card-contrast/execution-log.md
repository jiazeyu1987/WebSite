BDD: bottom detail spec cards read as visible cards -> Given the user opens a product detail page / When the bottom spec-card section appears / Then each card must have enough visual separation from the panel to read as a distinct card.

BDD: detail contrast fix keeps existing detail behavior -> Given the user is on the detail page / When the bottom spec cards become more visible / Then the existing detail title, narration control, and four-card structure remain intact.

RED: `npx playwright test --reporter=line --config temporary output/playwright-kiosk-detail-contrast-red.mjs` -> FAIL, the first detail spec card still computed `boxShadow` as `none`.

GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test --reporter=line --config temporary output/playwright-kiosk-detail-contrast.mjs` -> PASS

GREEN: `python C:\Users\BJB110\.codex\skills\bug-regression-fix-loop\scripts\validate_bug_regression.py --evidence doc/tasks/20260521-kiosk-detail-spec-card-contrast/bug-regression-evidence.md` -> PASS
