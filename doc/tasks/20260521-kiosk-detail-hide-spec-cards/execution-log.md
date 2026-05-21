BDD: detail page does not show bottom spec cards -> Given the user opens a kiosk product detail page / When the detail page finishes rendering / Then the bottom four-card spec section must not be displayed.

BDD: detail page keeps core content after removing spec cards -> Given the user is on a kiosk product detail page / When the bottom spec cards are hidden / Then the hero area, narration action, product description, and return path must still work.

RED: `npm test -- --run src/medical-kiosk.test.js` -> FAIL, the detail page still rendered `data-product-specs-panel` and four `data-product-spec-item` nodes.

RED: `npx playwright test --reporter=line --config temporary output/playwright-kiosk-detail-hide-spec-cards-red.mjs` -> FAIL, the browser path still found four `data-product-spec-item` nodes on the detail page.

GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test --reporter=line --config temporary output/playwright-kiosk-detail-hide-spec-cards.mjs` -> PASS

GREEN: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-detail-hide-spec-cards/frontend-feature-evidence.md` -> PASS

GREEN: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-detail-hide-spec-cards --mode preview` -> PASS, preview keeps `task.md` and `execution-log.md` and marks `frontend-feature-evidence.md` as the cleanup candidate.

GREEN: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-detail-hide-spec-cards --mode apply` -> PASS, `frontend-feature-evidence.md` was deleted and only the core task records were kept.
