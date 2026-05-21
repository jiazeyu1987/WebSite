# Task: Showroom And Kiosk Bilingual Toggle

## Goal

Enable explicit Chinese and English switching for the public `/showroom` flow and the root kiosk flow in `D:\ProjectPackage\Website`, using the existing bilingual backend fields without adding fallback behavior.

## Milestones

1. Record BDD coverage for showroom and kiosk bilingual behavior.
2. Add failing automated tests for showroom language switching, persisted language state, and kiosk language switching.
3. Implement showroom bilingual rendering and synchronized audio switching.
4. Implement kiosk bilingual rendering, persisted language state, and English narration voice selection.
5. Run unit, build, and Playwright verification and update task evidence.

## Expected Verification

- `npm test -- --run`
- `npm run build`
- `npx playwright test --reporter=line`

## Current Status

- Status: Completed
- Completed work:
  - Added explicit Chinese and English language toggles for `/showroom` and the backend-driven kiosk home, hall, company, and product paths.
  - Persisted the selected language in browser storage for both the showroom runtime and the kiosk runtime.
  - Synchronized showroom narration audio with the active language and synchronized kiosk company, hall, and product copy with the active language.
  - Updated unit and Playwright coverage to verify bilingual rendering, persisted state, and audio-source switching on real routes.
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run`
- PASS: `npm run build`
- PASS: `npx playwright test --reporter=line`
