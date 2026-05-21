# Frontend Feature Evidence: Kiosk Detail Persistent Voice Panel

## Feature Goal

- Keep the kiosk right-side hall narration panel visible and stable on both the gallery and detail screens, while moving product detail content fully into the left-side stage.

## Non-Goals

- Do not change `/showroom`, root routing, backend data contracts, or narration data sources.
- Do not add fallback copy or compatibility branches.
- Do not redesign the gallery card wall beyond what is necessary to preserve the fixed right panel in detail mode.

## Requirements And Acceptance IDs

- `AC-1`: Clicking a kiosk product card still opens a product detail page.
- `AC-2`: The detail page must keep rendering the hall-level right narration panel with the active category copy unchanged.
- `AC-3`: The detail page must continue to show product hero, title, summary, narration action, and product description content on the left.
- `AC-4`: Clicking the return button must restore the original gallery while keeping the same hall narration panel.
- `AC-5`: The change must stay within the `medical-kiosk` frontend surface and keep existing route and API contracts unchanged.

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Runtime component: `D:\ProjectPackage\Website\src\medical-kiosk.js`
- Styles: `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Unit test: `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- Browser test: `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`

## API Contracts And Data States

- Data source: local `kioskCategories` and generated SVG art.
- Gallery state: `data-product-card` grid with fixed hall narration panel.
- Detail state: `data-product-detail-id` with the same fixed hall narration panel.
- Narration panel contract: `data-active-category-id` and `data-voice-copy` remain available in detail mode.
- Detail content contract: `data-product-description-panel`, `data-product-detail-title`, `data-product-hero-art`, `data-speech-toggle`, and `data-back-to-gallery` remain available.
- Existing narration controls contract: `data-speech-mute`, `data-speech-unmute`, and `data-muted-state` remain available in detail mode.

## BDD Scenarios

- `BDD: gallery-to-detail keeps the same right narration panel -> Given the user is viewing a kiosk hall gallery with the right-side narration panel visible / When the user opens a product detail page / Then the right-side narration panel must still show the active hall narration copy while the left side switches to the product detail layout.`
- `BDD: detail-to-gallery preserves the hall narration panel -> Given the user is on a kiosk product detail page / When the user clicks the return button / Then the page must return to the same hall gallery and the right-side narration panel must still match that hall.`
- `BDD: detail narration controls do not replace the fixed right panel -> Given the user is on a kiosk detail page / When the user toggles narration playback / Then the speaking-state copy and speech button state must change without removing or replacing the fixed right-side narration panel.`

## RED

- `RED: npm test -- --run src/medical-kiosk.test.js`
- `npm test -- --run src/medical-kiosk.test.js` -> FAIL, detail mode still replaced the shared `kiosk-content` split layout with a dedicated detail screen, so `.kiosk-voice` disappeared after opening a product card and the hall narration copy no longer remained on the right.

## GREEN

- `GREEN: verification suite`
- `npm test -- --run src/medical-kiosk.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test tests/kiosk-detail.spec.js --reporter=line` -> PASS

## Responsive, Accessibility, Loading, Empty, Error, And Permission Checks

- Responsive: desktop keeps the right fixed panel; portrait layouts continue stacking while preserving the same narration module.
- Accessibility: back button and narration toggle remain native buttons; swipe header keyboard behavior remains unchanged.
- Loading: not applicable because the kiosk uses local synchronous data.
- Empty: not applicable because the kiosk still requires at least one category at boot.
- Error: unsupported speech synthesis must keep using the explicit speaking-state error copy.
- Permission: not applicable because the kiosk route has no auth gate.

## E2E Or Component Verification Path

- Component path: boot `/` -> read the initial right narration copy -> click first product card -> assert detail state, left detail content, and unchanged right narration copy -> toggle mute/text-only narration -> unmute -> click return -> assert gallery cards restored.
- Browser path: open `/` -> capture the right narration text -> click first product card -> verify detail left content and unchanged right narration panel -> toggle mute/text-only narration -> unmute -> click return.

## Blockers And Follow-Up Skills

- Blockers: None.
- Follow-up skills: `task-closeout-cleanup` preview at the end of verification.
