BDD: Kiosk detail matches the reference composition -> Given the user opens the kiosk home page and clicks a product card / When the detail page appears / Then it must show the large hero image area, right-side tags, playback button, product description module, and bottom four-card summary layout from the reference image.

BDD: Kiosk detail remains returnable -> Given the user is on a product detail page / When the user clicks the return button / Then the page must return to the original showroom gallery without changing the existing root route or data source.

RED: `npm test -- --run src/medical-kiosk.test.js` -> FAIL, the current detail page no longer exposed the bottom info cards and still used the old top-right state text instead of the reference-style narration prompt.

GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test tests/kiosk-detail.spec.js --reporter=line` -> PASS

GREEN: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260520-kiosk-detail-reference-alignment/frontend-feature-evidence.md` -> PASS

GREEN: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-kiosk-detail-reference-alignment --mode preview` -> PASS, preview keeps `task.md` and `execution-log.md`, and marks `frontend-feature-evidence.md` as the only cleanup candidate.

INFO: Screenshot artifact saved to `output/playwright/kiosk-detail-reference-alignment.png`.

BDD: Detail-page narration action stays wired -> Given the user is on the kiosk product detail page / When the user clicks the narration button / Then the page must enter the speaking state, call the speech runtime, and recover to the idle prompt after narration ends.

GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS, added regression coverage for the detail-page narration button and speaking state.

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test tests/kiosk-detail.spec.js --reporter=line` -> PASS

INFO: Follow-up scope added regression coverage only; no additional production UI changes were required.
