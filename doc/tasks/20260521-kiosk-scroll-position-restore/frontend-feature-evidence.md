# Frontend Feature Evidence

## Feature Goal And Non-Goals

- Goal: Restore the previous browse position when returning from `medical-kiosk` company or product detail screens.
- Non-goals:
  - Do not preserve scroll for every re-render in the app.
  - Do not change `/showroom`.
  - Do not redesign the layout or playback flow.

## Acceptance Criteria

- `AC-SCROLL-1`: Returning from product detail on desktop restores the previous internal gallery scroll position.
- `AC-SCROLL-2`: Returning from product detail on mobile portrait restores the previous document scroll position.
- `AC-SCROLL-3`: Returning from company detail does not reset the home browse position.
- `AC-SCROLL-4`: Existing hall switching and detail navigation paths remain available.

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Runtime component: `D:\ProjectPackage\Website\src\medical-kiosk.js`
- Unit test: `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- Browser test: `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`

## API Contracts And Data States

- API contract: keep the existing `showroom/display/app-config` and product detail contract.
- Data states:
  - Home browse state
  - Hall gallery browse state
  - Company detail state
  - Product detail loading / ready / error state

## BDD Scenarios

- `BDD: desktop gallery scroll is restored after returning from detail -> Given a desktop user scrolls the hall gallery list and opens a product detail / When the user clicks Back to hall / Then the previous gallery scrollTop is restored.`
- `BDD: mobile document scroll is restored after returning from detail -> Given a mobile portrait user scrolls the hall gallery page and opens a product detail / When the user clicks Back to hall / Then the previous document scrollTop is restored.`
- `BDD: home browse position survives company detail round-trip -> Given the user leaves the kiosk home browse state for company detail / When the user returns home / Then the home browse position is restored instead of resetting to the top.`

## RED Command And Expected Failure

RED:

- `npm test -- --run src/medical-kiosk.test.js`
- Expected failure:
  - Current implementation rerenders the browse screen without restoring the previous scroll position.

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run src/medical-kiosk.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test tests/kiosk-gallery.spec.js --reporter=line` -> PASS

## Verification Notes

Verification:

- Unit test confirms desktop internal gallery scroll restores after returning from product detail.
- Unit test confirms home browse document scroll restores after returning from company detail.
- Playwright confirms desktop internal gallery `scrollTop` is restored after detail round-trip.
- Playwright confirms mobile portrait document `scrollTop` is restored after detail round-trip.
- Existing gallery switching, swipe hint, and company detail navigation paths remain green.

## Blockers And Follow-Up Skills

Blockers:

- None.
