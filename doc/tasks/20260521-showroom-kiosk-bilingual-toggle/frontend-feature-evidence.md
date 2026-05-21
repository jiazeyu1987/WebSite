# Frontend Feature Evidence

## Feature Goal

Enable explicit Chinese and English switching for the public `/showroom` flow and the backend-driven kiosk flow on `/`, including persisted language state and language-aligned narration audio.

## Non-Goals

- No backend contract changes.
- No mock or fallback bilingual content paths at runtime.
- No visual redesign outside the minimum controls needed for language switching.

## Requirements And Acceptance IDs

- `AC-01`: `/showroom` exposes explicit Chinese and English toggles.
- `AC-02`: `/showroom` company text and narration audio switch together with the selected language.
- `AC-03`: `/showroom` restores the last selected language on reload.
- `AC-04`: `/` kiosk home, hall, company detail, and product detail copy switch to the selected language.
- `AC-05`: `/` kiosk restores the last selected language on reload.
- `AC-06`: `/` kiosk company and product narration audio use the active language source.

## Entry Points And Owned Files

- Route: `/`
- Route: `/showroom`
- Files:
  - `D:\ProjectPackage\Website\src\medical-kiosk.js`
  - `D:\ProjectPackage\Website\src\medical-kiosk.css`
  - `D:\ProjectPackage\Website\src\showroom-app.js`
  - `D:\ProjectPackage\Website\src\showroom-app.css`
  - `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
  - `D:\ProjectPackage\Website\src\medical-kiosk-title-icons.test.js`
  - `D:\ProjectPackage\Website\src\showroom-app.test.js`
  - `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
  - `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
  - `D:\ProjectPackage\Website\tests\showroom-app.spec.js`

## API Contracts And Data States

- `GET /showroom/display/app-config`
  - Provides bilingual company, hall, and product summary fields used by `/showroom` and `/`.
- `GET /showroom/display/product/:productId`
  - Provides product detail fields for kiosk product detail rendering.
- Loading:
  - `/showroom` and `/` show explicit loading UI while app config is pending.
- Error:
  - `/showroom` and `/` show explicit error UI when the required backend payload fails.
- Empty:
  - Company and product detail panels render explicit empty states when public fields are absent.

## BDD Scenarios

- BDD: showroom language toggle switches company text and audio -> Given bilingual company text and narration URLs are present / When the user switches `/showroom` from Chinese to English / Then the company copy and active audio source switch together.
- BDD: showroom language toggle persists across reload -> Given the user selected English on `/showroom` / When the showroom app is created again / Then English renders first.
- BDD: kiosk language toggle switches product and company copy -> Given the kiosk app-config contains bilingual company, hall, and product summary fields / When the user switches `/` from Chinese to English / Then the visible hall, company, and product copy render in English.
- BDD: kiosk language toggle persists across reload -> Given the user selected English on `/` / When the kiosk app is created again / Then English renders first.

## RED And GREEN Evidence

- RED: `npm test -- --run` -> FAIL, runtime tests expected language toggles, persisted English state, and synchronized English audio/text behavior that the frontend did not render yet.
- GREEN: `npm test -- --run` -> PASS
- GREEN: `npm run build` -> PASS
- GREEN: `npx playwright test --reporter=line` -> PASS

## Responsive, Accessibility, And State Checks

- Responsive:
  - Kiosk Playwright coverage confirms the gallery still scrolls internally on the large-screen layout.
- Accessibility:
  - Language toggles expose `aria-pressed`.
  - Audio mute controls expose localized `aria-label` text.
  - Hall icon images remain decorative with empty `alt` and `aria-hidden="true"`.
- Loading:
  - `/showroom` loading state and `/` kiosk loading state remain explicit.
- Empty:
  - Company and product empty states remain explicit.
- Error:
  - `/showroom` app-config failure and `/` kiosk app-config failure remain explicit.
- Permission:
  - No permission-gated flows were changed.

## E2E Verification Path

- `/`:
  - Load kiosk app-config.
  - Switch to English.
  - Navigate to a hall and open a product detail.
  - Verify English copy, persisted language, and English audio source.
- `/showroom`:
  - Load showroom app-config.
  - Switch to English.
  - Open company detail.
  - Verify English copy, persisted language, and English company audio source.

## Blockers

- None.
