BDD: Detail page bottom summary panel stays visible -> Given the user opens the kiosk home page and enters a product detail page / When the detail page finishes rendering / Then the bottom four-card summary panel must be visibly rendered with all four spec cards.

BDD: Detail page summary fix does not break the return path -> Given the user is on the kiosk product detail page / When the user returns to the gallery / Then the original product grid must still render normally.

RED: Playwright viewport probe at 1920x911 -> FAIL, `data-product-specs-panel` existed but its top measured at `y=915.53`, so the red-box section sat just below the viewport height `911`.

GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test --reporter=line --config temporary output/playwright-reuse-config.mjs` -> PASS

GREEN: Playwright viewport probe at 1920x911 -> PASS, `data-product-specs-panel` moved to `y=815.77` and re-entered the viewport.

GREEN: `python C:\Users\BJB110\.codex\skills\bug-regression-fix-loop\scripts\validate_bug_regression.py --evidence doc/tasks/20260520-kiosk-detail-specs-visibility/bug-regression-evidence.md` -> PASS

GREEN: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-kiosk-detail-specs-visibility --mode preview` -> PASS, preview keeps `task.md` and `execution-log.md` and marks `bug-regression-evidence.md` as the cleanup candidate.
