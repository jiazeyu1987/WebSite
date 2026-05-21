BDD: mute during active narration keeps text-only narration state -> Given the product detail page is actively narrating through browser speech synthesis / When the user taps the mute icon in the narration header / Then the current speech must stop immediately while the page stays in narration mode and only shows text.

BDD: play while muted does not speak but stays in narration mode -> Given the product detail page is muted / When the user taps the play narration button / Then the page must enter narration mode, render the narration text, and avoid calling browser speech synthesis.

BDD: unmute during narration replays current transcript immediately -> Given the detail page is muted while narration mode is active / When the user taps the unmute icon / Then the current product transcript must start speaking immediately from the beginning.

RED: npm test -- --run src/medical-kiosk.test.js -> FAIL, detail page had no mute/unmute controls, muted playback still called speech synthesis, and narration state did not persist correctly across mute transitions.

GREEN: npm test -- --run src/medical-kiosk.test.js -> PASS

GREEN: npm run build -> PASS

GREEN: npx playwright test tests/kiosk-detail.spec.js --reporter=line -> PASS

INFO: Added a dedicated mute state, icon controls in the detail narration header, and an injected speech runtime test hook for deterministic browser verification.
