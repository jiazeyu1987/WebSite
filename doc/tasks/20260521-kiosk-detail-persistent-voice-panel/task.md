# Task: Kiosk Detail Persistent Voice Panel

## Goal

Keep the right-side `语音讲解` panel fixed across both the kiosk gallery and product detail views, while reflowing the detail content into the left-side stage only.

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-detail-persistent-voice-panel\**`

## Non-Scope

- Root route changes, showroom route behavior, or backend/API contracts.
- New fallback narration copy, alternate data sources, or graceful-degradation branches.
- Unrelated visual redesign of the kiosk gallery grid or top swipe header.

## Dependencies

- Route `/` must continue to render `medical-kiosk`.
- Existing kiosk category narration copy must remain available in `kioskCategories`.
- `Vitest`, `Vite build`, and local `Playwright` verification must remain runnable.

## Milestones

1. Create the task record and BDD/TDD evidence scaffolding.
2. Add failing regression coverage for the persistent right-side voice panel.
3. Rework the kiosk detail layout so the right narration panel remains fixed and the detail content stays on the left.
4. Run verification and update the task evidence and closeout preview.

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test tests/kiosk-detail.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-detail-persistent-voice-panel/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-detail-persistent-voice-panel --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - Created the task directory and baseline task artifacts for the persistent voice-panel change.
  - Locked the scope to the `medical-kiosk` layout, tests, and task evidence only.
- Verification evidence:
  - `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-detail-persistent-voice-panel\task.md`
  - `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-detail-persistent-voice-panel\execution-log.md`
  - `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-detail-persistent-voice-panel\frontend-feature-evidence.md`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - Tightened unit and browser regression coverage so the detail page must keep rendering the hall-level right narration panel and still preserve the existing mute/unmute narration controls.
  - Captured the RED failure showing that the current detail screen removed the shared right narration panel after opening a product card.
- Verification evidence:
  - `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
  - `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
  - `npm test -- --run src/medical-kiosk.test.js`
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - Reworked `medical-kiosk` so gallery and detail screens now share the same `kiosk-content` two-column shell, with the hall narration panel always staying in the right column.
  - Reflowed the detail hero, narration controls, mute/unmute controls, and description content into the left column only, while preserving the existing detail interactions and hall-level narration copy source.
  - Hardened delegated click handling with a composed-path lookup so the detail narration controls remain reliable in the browser runtime.
- Verification evidence:
  - `D:\ProjectPackage\Website\src\medical-kiosk.js`
  - `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - Ran unit, build, Playwright, frontend-feature evidence, and closeout-preview verification for the persistent voice-panel detail layout.
- Verification evidence:
  - `npm test -- --run src/medical-kiosk.test.js`
  - `npm run build`
  - `npx playwright test tests/kiosk-detail.spec.js --reporter=line`
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-detail-persistent-voice-panel/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-detail-persistent-voice-panel --mode preview`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - The kiosk detail page now keeps the hall narration panel fixed on the right while the detail hero, narration controls, and description content render only on the left.
  - Existing detail mute/unmute narration behavior remains available and verified alongside the new fixed-panel layout.
  - Verification passed across unit, build, and real-browser coverage, and task closeout preview has been prepared.
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test tests/kiosk-detail.spec.js --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-detail-persistent-voice-panel/frontend-feature-evidence.md`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-detail-persistent-voice-panel --mode preview`
