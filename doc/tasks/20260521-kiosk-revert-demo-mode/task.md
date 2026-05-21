# Task: Kiosk Revert Demo Mode

## Goal

Restore the root `medical-kiosk` implementation to the state before the demo/real mode feature was added.

The kiosk must keep the existing real IntRuoyi data path, the home hero image, and the click-through company detail flow. It must no longer render or execute the demo/real mode switch, local virtual showroom data, or demo audio asset.

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\public\demo-silence.wav`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-revert-demo-mode\**`

## Non-Scope

- Do not revert the home hero image.
- Do not revert the home hero click-through to company detail.
- Do not change `/showroom`.
- Do not undo the local IntRuoyi live data repair.

## Milestones

1. Create task documentation and evidence skeleton. Status: Completed.
2. Remove demo/real mode runtime code, tests, and unused demo audio asset. Status: Completed.
3. Verify unit, build, browser regression, and current in-app browser behavior. Status: Completed.
4. Update task evidence and run closeout preview. Status: Completed.

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line`
- Browser check on `http://127.0.0.1:4173/`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-revert-demo-mode/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-revert-demo-mode --mode preview`

## Final Status

- Status: Completed
- Result: The root kiosk is back to a single real-data mode. The page keeps the home hero company entry and no longer exposes demo/real switching.
- Blockers: None.
