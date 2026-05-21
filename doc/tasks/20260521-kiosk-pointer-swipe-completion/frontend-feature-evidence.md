# Frontend Feature Evidence

## Feature Goal And Non-Goals

- Goal: Complete the `medical-kiosk` title swipe interaction with unified pointer handling, drag feedback, better axis discrimination, and cancel recovery.
- Non-goals:
  - Do not change `/showroom`.
  - Do not change backend contract or audio behavior.
  - Do not redesign the whole kiosk layout.

## Acceptance Criteria

- `AC-SWIPE-COMPLETE-1`: The title strip exposes a visible drag feedback state while a horizontal swipe is in progress.
- `AC-SWIPE-COMPLETE-2`: Predominantly vertical drags on the title strip do not switch halls.
- `AC-SWIPE-COMPLETE-3`: `pointercancel` or interrupted drags reset the swipe state and remove visual offsets.
- `AC-SWIPE-COMPLETE-4`: Existing arrow, keyboard, and successful hall switch paths remain functional.

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Runtime component: `D:\ProjectPackage\Website\src\medical-kiosk.js`
- Styles: `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Unit test: `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- Browser test: `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`

## API Contracts And Data States

- API contract: keep the existing `showroom/display/app-config` and product detail contract unchanged.
- Data states:
  - Idle swipe state
  - Active horizontal drag state
  - Cancelled drag state
  - Successful hall switch state

## BDD Scenarios

- `BDD: title strip shows drag feedback during horizontal pointer swipe -> Given a user presses on the kiosk title strip / When the user drags horizontally before release / Then the strip exposes a visible drag state and offset feedback.`
- `BDD: vertical drag does not switch halls -> Given a user drags mostly vertically on the title strip / When the gesture ends / Then the active hall remains unchanged.`
- `BDD: cancelled drag resets the strip -> Given a user begins dragging the title strip / When the pointer interaction is cancelled / Then the drag state and visual offset reset immediately.`

## RED Command And Expected Failure

RED:

- `npm test -- --run src/medical-kiosk.test.js`
- Expected failure:
  - Current implementation does not expose a dedicated drag feedback state or pointer-cancel cleanup path.

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run src/medical-kiosk.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test tests/kiosk-gallery.spec.js --reporter=line` -> PASS

## Verification Notes

Verification:

- Unit test confirms horizontal pointer drags expose `data-swipe-dragging="true"` and `data-swipe-axis="x"` before release.
- Unit test confirms `pointercancel` clears drag state and visual offset.
- Unit test confirms predominantly vertical pointer drags do not switch halls.
- Playwright mobile viewport confirms drag feedback appears, `pointercancel` clears, and vertical drags keep the active hall unchanged.
- Existing arrow switching, gallery scrolling, voice panel, and detail-return paths remain green.

## Blockers And Follow-Up Skills

Blockers:

- None.
