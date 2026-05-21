# Task: Kiosk Gallery Arrow And Scroll Controls

## Goal

Update the `medical-kiosk` gallery view so the left/right arrow zones in the title strip switch showrooms by click, and the product-card area becomes an internal vertical swipe/scroll region for browsing top and bottom rows.

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260520-kiosk-gallery-arrow-scroll-controls\**`

## Non-Scope

- Detail-page composition, narration content, or product data structure.
- `showroom` route, backend contracts, or remote assets.
- New fallback interaction paths beyond the requested gallery controls.

## Dependencies

- Route `/` must continue rendering `medical-kiosk`.
- Existing category and product data in `src/medical-kiosk.js` must remain the source of truth.
- `Vitest`, `Playwright`, and local `Vite` runtime must remain available.

## Milestones

1. Record the requested gallery interaction changes and reproduce the current click/scroll limitations.
2. Add failing regression coverage for clickable gallery arrows and internal vertical card scrolling.
3. Implement the smallest gallery-view markup, event, and layout changes that satisfy the requested interactions.
4. Run targeted verification, update evidence, and run closeout preview.

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test --reporter=line --config temporary output/playwright-kiosk-gallery-green.mjs`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260520-kiosk-gallery-arrow-scroll-controls/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-kiosk-gallery-arrow-scroll-controls --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - Confirmed the title-strip side chevrons were decorative only and did not expose a click interaction.
  - Confirmed the gallery card area was not an internal scroll region: the document height grew to `1062` at the `1920x911` kiosk viewport, while the gallery itself had `overflowY: visible`.
- Verification evidence:
  - Local Playwright viewport probe against `http://127.0.0.1:4174/`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - Added unit coverage for clickable left/right showroom arrow controls and the dedicated gallery scroll region marker.
  - Added Playwright coverage for switching showrooms by arrow click and scrolling the gallery region internally to reveal the last card row.
- Verification evidence:
  - `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
  - `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - Converted the title-strip arrow zones into semantic buttons while preserving existing swipe and keyboard category switching.
  - Introduced a gallery-view-only internal scroll container for the card region and kept portrait stacking behavior by releasing the fixed-height constraint in portrait breakpoints.
- Verification evidence:
  - `D:\ProjectPackage\Website\src\medical-kiosk.js`
  - `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - Ran targeted unit, build, Playwright, frontend-feature evidence, and closeout-preview verification for the gallery interaction change.
  - Applied task closeout cleanup after updating the task status format expected by the cleanup script.
- Verification evidence:
  - `npm test -- --run src/medical-kiosk.test.js`
  - `npm run build`
  - `npx playwright test --reporter=line --config temporary output/playwright-kiosk-gallery-green.mjs`
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260520-kiosk-gallery-arrow-scroll-controls/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-kiosk-gallery-arrow-scroll-controls --mode preview`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-kiosk-gallery-arrow-scroll-controls --mode apply`
- Remaining blockers:
  - None.

## Current Status

Completed.
- Completed work:
  - The title-strip red-box areas now click left/right to switch showrooms.
  - The green-box product card area now scrolls internally in gallery view, allowing top and bottom card rows to be browsed without whole-page scrolling.
  - Existing swipe-header, keyboard direction keys, and detail-page regression coverage remain intact.
  - Task closeout cleanup has been applied; the task directory now keeps only `task.md` and `execution-log.md`.
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test --reporter=line --config temporary output/playwright-kiosk-gallery-green.mjs`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260520-kiosk-gallery-arrow-scroll-controls/frontend-feature-evidence.md`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-kiosk-gallery-arrow-scroll-controls --mode preview`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-kiosk-gallery-arrow-scroll-controls --mode apply`
