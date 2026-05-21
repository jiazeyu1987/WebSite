# Task: Kiosk Detail Hide Spec Cards

## Goal

Hide the bottom four-card info section on the `medical-kiosk` detail page so the green-box area no longer displays.

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-detail-hide-spec-cards\**`

## Non-Scope

- Gallery interactions, narration behavior, or detail-page copy above the removed card area.
- `showroom` route, backend contracts, or remote assets.
- New fallback or alternate detail layouts.

## Dependencies

- Route `/` must continue rendering `medical-kiosk`.
- Existing detail-page hero, tags, narration action, and description panel must remain intact.
- `Vitest`, `Playwright`, and local `Vite` runtime must remain available.

## Milestones

1. Record the requirement change and identify the current detail-page spec-card render path.
2. Add failing regression coverage that proves the bottom spec-card panel must not display.
3. Remove the spec-card render path with the smallest production change.
4. Run targeted verification, update task evidence, and run closeout preview.

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test --reporter=line --config temporary output/playwright-kiosk-detail-hide-spec-cards.mjs`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-detail-hide-spec-cards/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-detail-hide-spec-cards --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - Confirmed the detail page still rendered `data-product-specs-panel` and four `data-product-spec-item` nodes.
  - Scoped the change to the bottom detail-card section only, keeping the hero, narration control, and description panel unchanged.
- Verification evidence:
  - `D:\ProjectPackage\Website\src\medical-kiosk.js`
  - `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - Tightened unit and Playwright coverage so the detail page must no longer render the bottom spec-card panel or any spec-card items.
- Verification evidence:
  - `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
  - `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - Removed the detail-page spec-card render section from `createDetailMarkup` and stopped using the local `specs` value in the detail view.
- Verification evidence:
  - `D:\ProjectPackage\Website\src\medical-kiosk.js`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - Ran targeted unit, build, Playwright, frontend-feature evidence, and closeout-preview verification for hiding the detail bottom cards.
- Verification evidence:
  - `npm test -- --run src/medical-kiosk.test.js`
  - `npm run build`
  - `npx playwright test --reporter=line --config temporary output/playwright-kiosk-detail-hide-spec-cards.mjs`
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-detail-hide-spec-cards/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-detail-hide-spec-cards --mode preview`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-detail-hide-spec-cards --mode apply`
- Remaining blockers:
  - None.

## Current Status

Completed.
- Completed work:
  - The detail-page bottom spec-card section is no longer rendered.
  - The hero area, tags, narration action, description panel, and return-to-gallery path remain intact.
  - Task closeout cleanup has been applied and the evidence file has been removed.
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test --reporter=line --config temporary output/playwright-kiosk-detail-hide-spec-cards.mjs`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-detail-hide-spec-cards/frontend-feature-evidence.md`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-detail-hide-spec-cards --mode preview`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-detail-hide-spec-cards --mode apply`
