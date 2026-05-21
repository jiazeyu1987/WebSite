# Frontend Feature Evidence

## Feature Goal And Non-Goals

- Goal: Make the `medical-kiosk` voice panel compact by default on mobile portrait while keeping the full text reachable through an explicit expand action.
- Non-goals:
  - Do not change `/showroom`.
  - Do not remove the language, mute, or play controls.
  - Do not redesign the desktop voice panel layout.

## Acceptance Criteria

- `AC-VOICE-1`: Mobile portrait renders the voice panel in a compact collapsed state by default.
- `AC-VOICE-2`: Mobile portrait shows a visible expand/collapse control for the narration panel.
- `AC-VOICE-3`: Expanding the panel reveals the full narration text and allows collapsing again.
- `AC-VOICE-4`: Desktop behavior keeps the full voice panel available without forced collapse.

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Runtime component: `D:\ProjectPackage\Website\src\medical-kiosk.js`
- Styles: `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Unit test: `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- Browser test: `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`

## API Contracts And Data States

- API contract: keep existing `showroom/display/app-config` and product detail contracts unchanged.
- Data states:
  - Mobile portrait collapsed voice panel
  - Mobile portrait expanded voice panel
  - Desktop full voice panel

## BDD Scenarios

- `BDD: mobile portrait voice panel starts compact -> Given a mobile portrait user opens the kiosk screen / When the voice panel renders / Then the panel starts in a compact collapsed state with a visible summary and expand action.`
- `BDD: mobile portrait voice panel can expand and collapse -> Given the panel is collapsed on mobile portrait / When the user toggles the narration panel open / Then the full narration text is shown and the same control can collapse it again.`
- `BDD: desktop voice panel remains fully available -> Given a desktop user opens the kiosk screen / When the voice panel renders / Then the existing full narration panel remains available without relying on the compact collapsed behavior.`

## RED Command And Expected Failure

RED:

- `npm test -- --run src/medical-kiosk.test.js`
- Expected failure:
  - Current implementation does not expose a compact collapsed voice panel state or explicit expand/collapse control.

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run src/medical-kiosk.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test tests/kiosk-gallery.spec.js --reporter=line` -> PASS

## Verification Notes

Verification:

- Unit test confirms the voice panel renders `data-voice-panel-expanded="false"` by default and toggles to expanded/collapsed on click.
- Unit test confirms the compact preview contains the first narration line.
- Playwright desktop regression confirms the compact toggle is hidden and the full voice copy remains visible.
- Playwright mobile portrait confirms the compact toggle is visible, the preview is shown by default, and the full text becomes visible after expansion.
- Existing gallery switching, swipe guidance, and scroll-restore tests remain green.

## Blockers And Follow-Up Skills

Blockers:

- None.
