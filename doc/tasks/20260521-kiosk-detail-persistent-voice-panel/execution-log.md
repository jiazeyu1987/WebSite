BDD: gallery-to-detail keeps the same right narration panel -> Given the user is viewing a kiosk hall gallery with the right-side narration panel visible / When the user opens a product detail page / Then the right-side narration panel must still show the active hall narration copy while the left side switches to the product detail layout.

BDD: detail-to-gallery preserves the hall narration panel -> Given the user is on a kiosk product detail page / When the user clicks the return button / Then the page must return to the same hall gallery and the right-side narration panel must still match that hall.

BDD: detail narration controls do not replace the fixed right panel -> Given the user is on a kiosk detail page / When the user toggles narration playback / Then the speaking-state copy and speech button state must change without removing or replacing the fixed right-side narration panel.

RED: `npm test -- --run src/medical-kiosk.test.js` -> FAIL, detail mode still replaced the shared `kiosk-content` split layout with a dedicated detail screen, so `.kiosk-voice` disappeared after opening a product card and the hall narration copy no longer remained on the right.

GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test tests/kiosk-detail.spec.js --reporter=line` -> PASS

GREEN: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-detail-persistent-voice-panel/frontend-feature-evidence.md` -> PASS

GREEN: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-detail-persistent-voice-panel --mode preview` -> PASS
