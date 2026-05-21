# Task: Kiosk Detail Spec Card Contrast

## Goal

Make the four bottom info cards on the `medical-kiosk` detail page read as clearly visible cards instead of blending into the surrounding light panel.

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-detail-spec-card-contrast\**`

## Non-Scope

- Detail-page data, copy, routing, or gallery interactions.
- `showroom` route or backend contracts.
- New fallback UI branches.

## Dependencies

- Route `/` must continue rendering `medical-kiosk`.
- Existing detail-page spec card markup must remain the same DOM structure.
- `Playwright`, `Vitest`, and local `Vite` runtime must remain available.

## Milestones

1. Record the reported bottom-card visibility issue and reproduce the weak-contrast styling.
2. Add a failing regression test that proves the bottom info cards do not yet read as distinct cards.
3. Apply the smallest style-only fix that restores clear card contrast.
4. Run targeted verification and update bug-regression evidence.

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test --reporter=line --config temporary output/playwright-kiosk-detail-contrast.mjs`
- `python C:\Users\BJB110\.codex\skills\bug-regression-fix-loop\scripts\validate_bug_regression.py --evidence doc/tasks/20260521-kiosk-detail-spec-card-contrast/bug-regression-evidence.md`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - Reproduced the reported issue on the detail page and confirmed the bottom cards existed in the DOM.
  - Measured the first bottom card style and confirmed it had `box-shadow: none` with only a faint `rgba(102, 142, 220, 0.18)` border.
- Verification evidence:
  - Playwright style probe against `http://127.0.0.1:4174/`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - Tightened `tests/kiosk-detail.spec.js` to require the first bottom info card to have a non-`none` shadow on the detail page.
- Verification evidence:
  - `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - Updated the final effective `.kiosk-detail__spec` style to use a stronger border, a soft gradient fill, and a visible card shadow while keeping the light medical palette.
- Verification evidence:
  - `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - Ran targeted unit, build, Playwright, and bug-regression verification for the detail-card contrast fix.
- Verification evidence:
  - `npm test -- --run src/medical-kiosk.test.js`
  - `npm run build`
  - `npx playwright test --reporter=line --config temporary output/playwright-kiosk-detail-contrast.mjs`
  - `python C:\Users\BJB110\.codex\skills\bug-regression-fix-loop\scripts\validate_bug_regression.py --evidence doc/tasks/20260521-kiosk-detail-spec-card-contrast/bug-regression-evidence.md`
- Remaining blockers:
  - None.

## Current Status

Completed.
- Completed work:
  - The four bottom detail info cards now read as distinct cards instead of blending into the parent panel.
  - A Playwright regression now guards the detail page against the spec-card shadow disappearing again.
- Remaining blockers:
  - None.

## Cleanup Candidates

- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-detail-spec-card-contrast\bug-regression-evidence.md`

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test --reporter=line --config temporary output/playwright-kiosk-detail-contrast.mjs`
- PASS: `python C:\Users\BJB110\.codex\skills\bug-regression-fix-loop\scripts\validate_bug_regression.py --evidence doc/tasks/20260521-kiosk-detail-spec-card-contrast/bug-regression-evidence.md`
