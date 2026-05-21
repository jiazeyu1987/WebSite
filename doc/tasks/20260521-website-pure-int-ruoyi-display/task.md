# Task: Website Pure IntRuoyi Display

## Goal

Make `D:\ProjectPackage\Website` a display-only frontend for the public showroom experience. The root kiosk route must stop using local hardcoded hall data, local product copy generation, and browser speech synthesis. Displayed business data must come from IntRuoyi public APIs.

## Scope

- `D:\ProjectPackage\Website\src\**`
- `D:\ProjectPackage\Website\tests\**`
- `D:\ProjectPackage\Website\doc\tasks\20260521-website-pure-int-ruoyi-display\**`

## Non-Scope

- No fallback or placeholder business data
- No browser text-to-speech for production narration
- No unrelated visual redesign

## Milestones

1. Audit the current root kiosk data sources and local computation paths.
2. Define the minimum IntRuoyi public contracts needed by the root kiosk.
3. Replace local hall, product, detail, and voice sources with backend-driven rendering.
4. Verify unit, build, and browser paths.

## Expected Verification

- `npm test -- --run`
- `npm run build`
- `npx playwright test --reporter=line`

## Current Status

- Status: Completed
- Completed work:
  - Replaced root kiosk business content loading with IntRuoyi-driven app-config and product detail loaders.
  - Removed root kiosk dependency on local hall/product business copy and browser speech synthesis.
  - Switched root kiosk image, hall title, product title, product detail fields, and audio playback to backend data.
  - Preserved `/showroom` behavior while keeping the kiosk root entry on `/`.
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run`
- PASS: `npm run build`
- PASS: `npx playwright test --reporter=line`
