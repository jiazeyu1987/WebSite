# Task: Scheduled Admin Config Console

## Goal

Implement a frontend admin console page that can import and export a configuration workbook, then generate the homepage, showroom views, and product views from that configuration.

## Milestones

1. Confirm the configuration contract for homepage, showroom, product, and bilingual media fields.
2. Implement import, export, and validation for the configuration workbook.
3. Add an admin console page with one-click import and export actions plus clear validation errors.
4. Replace hardcoded showroom rendering with configuration-driven homepage, showroom, and product rendering.
5. Add unit coverage, Playwright validation, and final task closeout records.

## Expected Verification

- `npm test -- --run`
- `npm run build`
- `npx playwright test`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - Defined the workbook contract as three sheets: `Company`, `Showrooms`, and `Products`.
  - Added strict runtime validation for required image, audio, subtitle, and relation fields.
- Verification evidence:
  - `src/config-schema.js`
  - `src/config-workbook.js`
  - `src/config-workbook.test.js`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - Added `.xlsx` import/export support with `xlsx`.
  - Implemented fail-fast parsing for missing sheets, missing cells, duplicate ids, and broken showroom-product references.
- Verification evidence:
  - `npm test -- --run`
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - Added a control console page with file selection, one-click import, one-click export, and explicit status/error feedback.
  - Implemented browser download flow for the exported workbook.
- Verification evidence:
  - `src/admin-console.js`
  - `src/app.js`
  - `tests/admin-config-console.spec.js`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - Replaced the hardcoded demo layout with config-driven company homepage, showroom navigation, and product detail rendering.
  - Added generated demo media so the frontend remains runnable with a valid default workbook contract.
- Verification evidence:
  - `npm test -- --run`
  - `npx playwright test`
  - `output/playwright/config-driven-showroom.png`
- Remaining blockers:
  - None for the current frontend-only scope.

### Milestone 5

- Status: Completed
- Completed work:
  - Added Vitest coverage and Playwright browser verification.
  - Recorded frontend evidence, execution log, test report, completion gate, and closeout preview.
  - During a later E2E rerun, fixed the runtime entrypoint so the browser uses the config-driven app, and isolated Vitest from Playwright spec discovery.
- Verification evidence:
  - `npm test -- --run`
  - `npm run build`
  - `npx playwright test`
  - `python C:\Users\BJB110\.codex\skills\spec-driven-delivery\scripts\check_completion.py --cwd D:\ProjectPackage\Website --task-id 5-20260520T012123 --apply`
- Remaining blockers:
  - `npm audit` still reports one high severity dependency vulnerability outside this task scope.

## Final Verification

- Status: Completed
- Result: PASS
- Verified by:
  - `npm test -- --run`
  - `npm run build`
  - `npx playwright test`
  - `npx playwright test --reporter=line`

## Closeout Preview

- Preview command:
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 5-20260520T012123 --mode preview`
- Preview result:
  - Keep: `doc/tasks/5-20260520T012123/task.md`, `doc/tasks/5-20260520T012123/execution-log.md`
  - Delete candidates: `frontend-feature-evidence.md`, `prd.md`, `task-state.json`, `test-plan.md`, `test-report.md`
  - Blocked items: none

## Current Status

- Status: Completed
- Completed at: `2026-05-20T06:31:28.6177220+08:00`
