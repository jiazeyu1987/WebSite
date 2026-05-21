# Task: Kiosk Voice Panel Icon Controls

## Goal

Move language switching into the voice panel header and convert both language and audio mute controls into single icon buttons.

## Milestones

1. Record BDD/TDD expectations. Status: Completed.
2. Replace the top language segmented control with a voice-panel language icon button. Status: Completed.
3. Replace mute text with a green speaker icon and red muted speaker icon. Status: Completed.
4. Update tests and run verification. Status: Completed.

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-voice-panel-icon-controls/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-voice-panel-icon-controls --mode preview`

## Current Status

- Status: Completed
- Blockers: None.
