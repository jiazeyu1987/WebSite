BDD: title-strip arrow zones switch showrooms -> Given the user is on the kiosk gallery view / When the user clicks the left or right arrow zone in the title strip / Then the active showroom title and product grid switch to the adjacent showroom.

BDD: gallery card region scrolls independently -> Given the user is on the kiosk gallery view with more product rows than fit on screen / When the user scrolls vertically inside the card region / Then the card region must scroll internally so the user can reach the top and bottom rows without relying on whole-page scrolling.

RED: `npm test -- --run src/medical-kiosk.test.js` -> FAIL, the gallery view had no `data-gallery-scroll-region` and no clickable arrow controls.

RED: `npx playwright test --reporter=line --config temporary output/playwright-kiosk-gallery-red.mjs` -> FAIL, Playwright could not find `[data-gallery-scroll-region]` in the kiosk gallery.

GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test --reporter=line --config temporary output/playwright-kiosk-gallery-green.mjs` -> PASS, `kiosk-gallery.spec.js` and `kiosk-detail.spec.js` both passed against the reused local `4174` dev server.

GREEN: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260520-kiosk-gallery-arrow-scroll-controls/frontend-feature-evidence.md` -> PASS

GREEN: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-kiosk-gallery-arrow-scroll-controls --mode preview` -> PASS, preview keeps `task.md` and `execution-log.md` and marks `frontend-feature-evidence.md` as the cleanup candidate.

GREEN: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-kiosk-gallery-arrow-scroll-controls --mode apply` -> PASS, `frontend-feature-evidence.md` was deleted and only the core task records were kept.
