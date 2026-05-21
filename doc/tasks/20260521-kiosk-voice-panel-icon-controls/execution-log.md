# Execution Log

BDD: language control moves to voice panel -> Given the kiosk is ready / When the user looks at the voice panel header / Then a single icon button shows the current language and the top header no longer shows language buttons.

BDD: language icon toggles language -> Given the current language is Chinese / When the user clicks the language icon button / Then the kiosk switches to English and the icon changes to English.

BDD: audio icon toggles mute state -> Given audio is currently unmuted / When the user clicks the green speaker icon / Then the audio becomes muted and the icon becomes a red muted speaker; clicking again restores the green speaker.

RED: `npm test -- --run src/medical-kiosk.test.js` -> FAIL, expected reason: tests looked for the new voice-panel language icon button and updated audio icon behavior before implementation.

GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS, 5 tests.

GREEN: `npm run build` -> PASS.

GREEN: `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line` -> PASS, 3 tests.

GREEN: Browser check on `http://127.0.0.1:4173/` -> PASS, `headerLanguageButtons=0`, `voiceLanguageButtons=1`, `audioButtons=1`, `audioState=unmuted`.
