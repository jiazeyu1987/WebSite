# Frontend Feature Evidence

## Summary

Delivered bilingual detail description and narration switching for showroom company and product detail pages by consuming `IntRuoyi` anonymous `bilingualPublicFields` payloads.

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\showroom-app.js`
- `D:\ProjectPackage\Website\src\showroom-api.js`
- `D:\ProjectPackage\Website\tests\**`

## Acceptance Intent

- Company detail and product detail must switch visible description and narration audio together when the visitor switches Chinese / English.
- Frontend must not fabricate translated detail fields when backend public contracts do not provide them.

## BDD

- `BDD: detail language switch changes description and narration together -> Given a visitor is viewing company detail or product detail / When the visitor switches between Chinese and English / Then the visible detail description and the narration audio source must switch to the selected language together.`
- `BDD: frontend fails fast when bilingual detail contract is missing -> Given the anonymous display APIs do not provide bilingual detail fields / When Website attempts to wire detail language switching / Then the task must stop and report the exact missing contract instead of fabricating translated fields on the client.`

## RED

- `RED: contract audit against the original Website and IntRuoyi display payloads -> FAIL, company/product detail public field payloads were single-language only, so the requested bilingual description switch could not be implemented truthfully in Website alone.`
- `RED: runtime probe GET http://127.0.0.1:48081/showroom/display/company -> FAIL, originally returned SHOWROOM_TARGET_NOT_FOUND: live company ZH narration source revision mismatch before any bilingual company detail verification could proceed.`

## Findings

- Website now reads bilingual detail fields from backend payloads instead of trying to infer English detail text on the client.
- `/showroom` company detail uses `company.bilingualPublicFields` for language-specific field labels and values.
- Root kiosk company detail and product detail use `bilingualPublicFields` for language-specific detail rendering while keeping existing title/audio switching behavior.
- English values that are blank on the backend are omitted from the active English field list instead of falling back to Chinese.

## Decision

- Completed. Frontend now depends on the real backend bilingual detail contract and keeps fail-fast behavior when that contract is missing.

## GREEN

- `GREEN: change-request evidence validation -> PASS, docs/changes/20260522-showroom-bilingual-detail-switch.md satisfies the change-triage evidence contract.`
- `GREEN: unit and adapter verification -> PASS, Website adapter and both detail flows now consume `bilingualPublicFields` successfully.`
- `GREEN: browser verification -> PASS, `/showroom` and root kiosk detail paths switch visible detail descriptions and narration audio together.`

## Verification

- PASS: `python C:\Users\BJB110\.codex\skills\change-request-triage\scripts\validate_change_request.py --evidence docs/changes/20260522-showroom-bilingual-detail-switch.md`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-showroom-bilingual-detail-switch/frontend-feature-evidence.md`
- PASS: `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/medical-kiosk.test.js`
- PASS: `npx playwright test tests/showroom-app.spec.js tests/kiosk-detail.spec.js --reporter=line`
- PASS: `Invoke-WebRequest http://127.0.0.1:48081/showroom/display/company`
- PASS: `Invoke-WebRequest http://127.0.0.1:48081/showroom/display/app-config`
- PASS: `Invoke-WebRequest http://127.0.0.1:48081/showroom/display/product/164`

## Blockers

- Real company English detail content is still largely empty in local live data, so the English company detail field list currently shows an explicit empty-state experience rather than translated company field values.

## Required Next Step

- If you want richer real English company detail content immediately, the next step is to fill/publish the company `_en` field values in `IntRuoyi` live content; the Website side no longer needs code changes for that.
