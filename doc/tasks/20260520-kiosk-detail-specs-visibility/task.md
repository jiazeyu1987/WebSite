# Task: Kiosk Detail Specs Panel Visibility

## Goal

Restore the bottom four-card summary panel on the `medical-kiosk` detail page so the red-box section is visibly rendered in the real detail view.

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260520-kiosk-detail-specs-visibility\**`

## Non-Scope

- `showroom` data contracts, backend APIs, or remote assets.
- New fallback UI, placeholder data, or compatibility shims.
- Changes to kiosk gallery navigation outside the detail-page bug.

## Dependencies

- The kiosk root route `/` must keep rendering from `medical-kiosk`.
- `Vitest`, `Playwright`, and local `Vite` preview must be runnable.
- Detail-page product data must keep using the existing in-repo product source.

## Milestones

1. Document the bug, identify the affected detail-page panel, and reproduce the missing-visibility symptom.
2. Add a failing regression test that proves the detail-page bottom summary panel is present and visible.
3. Apply the smallest production fix that restores the panel without changing unrelated detail-page behavior.
4. Run targeted verification, update task evidence, and run closeout preview.

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test --reporter=line --config temporary output/playwright-reuse-config.mjs`
- `python C:\Users\BJB110\.codex\skills\bug-regression-fix-loop\scripts\validate_bug_regression.py --evidence doc/tasks/20260520-kiosk-detail-specs-visibility/bug-regression-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-kiosk-detail-specs-visibility --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - Confirmed the affected section is the detail-page `data-product-specs-panel` in `medical-kiosk`.
  - Reproduced the symptom with Playwright at `1920x911`, where the panel existed but started at `y=915.53`, just below the viewport.
- Verification evidence:
  - Playwright viewport probe against `http://127.0.0.1:4174/`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - Tightened `tests/kiosk-detail.spec.js` to open the detail page at the reference height and require `data-product-specs-panel` to be in the viewport.
- Verification evidence:
  - `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - Added a short-height landscape media query that compacts the detail-page header, hero, description, and spec-card spacing without changing data or navigation behavior.
  - After the CSS fix, the same Playwright probe measured the panel at `y=815.77`, bringing it back into the `1920x911` viewport.
- Verification evidence:
  - `D:\ProjectPackage\Website\src\medical-kiosk.css`
  - `D:\ProjectPackage\Website\output\playwright\kiosk-detail-911-after-fix.png`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - Ran targeted unit, build, Playwright, bug-regression evidence, and closeout-preview verification for the detail-page visibility fix.
- Verification evidence:
  - `npm test -- --run src/medical-kiosk.test.js`
  - `npm run build`
  - `npx playwright test --reporter=line --config temporary output/playwright-reuse-config.mjs`
  - `python C:\Users\BJB110\.codex\skills\bug-regression-fix-loop\scripts\validate_bug_regression.py --evidence doc/tasks/20260520-kiosk-detail-specs-visibility/bug-regression-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-kiosk-detail-specs-visibility --mode preview`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - The detail-page bottom summary panel now stays visible at the reference desktop height instead of slipping just below the viewport.
  - A Playwright regression now guards the `1920x911` detail-page viewport against future layout regressions.
  - Verification and closeout preview completed for this task.
- Remaining blockers:
  - None.

## Cleanup Candidates

- `D:\ProjectPackage\Website\doc\tasks\20260520-kiosk-detail-specs-visibility\bug-regression-evidence.md`

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test --reporter=line --config temporary output/playwright-reuse-config.mjs`
- PASS: `python C:\Users\BJB110\.codex\skills\bug-regression-fix-loop\scripts\validate_bug_regression.py --evidence doc/tasks/20260520-kiosk-detail-specs-visibility/bug-regression-evidence.md`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-kiosk-detail-specs-visibility --mode preview`
