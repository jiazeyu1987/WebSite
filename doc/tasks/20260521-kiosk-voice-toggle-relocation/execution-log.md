BDD: voice header uses one toggle button instead of two detail buttons -> Given the kiosk product detail page shows the persistent right voice panel / When the user inspects the voice panel header / Then there must be exactly one mute toggle button in the header and no separate mute/unmute buttons in the detail controls.

BDD: unmuted state shows green speaker and toggles to muted red speaker -> Given the page is currently allowed to speak / When the user taps the voice toggle button / Then the page enters muted state and the same button switches from a green speaker action to a red muted speaker action.

BDD: muted narration still becomes text-only and unmuting replays speech -> Given the page is muted while narration mode is active / When the user taps the same voice toggle button again / Then the page returns to audible narration and replays the current transcript immediately.

RED: npm test -- --run src/medical-kiosk.test.js -> FAIL, the page still rendered two detail-area mute buttons, no header toggle button existed, and mute/unmute state could not be asserted through one shared control.

GREEN: npm test -- --run src/medical-kiosk.test.js -> PASS

GREEN: npm run build -> PASS

GREEN: npx playwright test tests/kiosk-detail.spec.js --reporter=line -> PASS

INFO: Moved the mute control into the right voice panel header as one toggle button, removed the old detail mute controls, and verified green/red icon state switching through the real browser path.
