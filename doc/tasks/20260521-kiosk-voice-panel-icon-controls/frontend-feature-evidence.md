# Frontend Feature Evidence

## Task

- Task ID: `20260521-kiosk-voice-panel-icon-controls`
- Feature: Kiosk voice panel language and audio icon controls
- Status: Completed

## Acceptance

- PASS: Top header no longer renders the language segmented control.
- PASS: Voice panel header renders one language icon button.
- PASS: Voice panel header renders one audio icon button when audio is available.
- PASS: Language icon button switches between Chinese and English and persists the language choice.
- PASS: Audio icon button switches from green unmuted state to red muted state and back.

## BDD

- `BDD: language control moves to voice panel -> Given the kiosk is ready / When the user looks at the voice panel header / Then a single icon button shows the current language and the top header no longer shows language buttons.`
- `BDD: language icon toggles language -> Given the current language is Chinese / When the user clicks the language icon button / Then the kiosk switches to English and the icon changes to English.`
- `BDD: audio icon toggles mute state -> Given audio is currently unmuted / When the user clicks the green speaker icon / Then the audio becomes muted and the icon becomes a red muted speaker; clicking again restores the green speaker.`

## TDD Evidence

- `RED: npm test -- --run src/medical-kiosk.test.js -> FAIL, new voice-panel language icon and audio icon expectations were not implemented yet.`
- `GREEN: npm test -- --run src/medical-kiosk.test.js -> PASS, 5 tests.`
- `GREEN: npm run build -> PASS.`
- `GREEN: npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line -> PASS, 3 tests.`
- `GREEN: Browser check on http://127.0.0.1:4173/ -> PASS, headerLanguageButtons=0, voiceLanguageButtons=1, audioButtons=1, audioState=unmuted.`

## Verification

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line`
- PASS: In-app browser check on `http://127.0.0.1:4173/`

## Blockers

- None.
