# Test Plan

- Task ID: `5-20260520T012123`
- Created: `2026-05-20T01:21:23`
- Workspace: `D:\ProjectPackage\Website`
- User Request: `Schedule execution for five hours later to add an admin console page, support one-click import/export of a configuration workbook, and generate the frontend pages from workbook data for company home, showrooms, and products.`

## Test Scope

Validate the workbook contract, import/export logic, admin console behavior, and visitor-facing rendering driven by imported config. Backend persistence and asset production remain out of scope.

## Environment

- Workspace: `D:\ProjectPackage\Website`
- Runtime: local Vite frontend with the repo's installed Node.js dependencies
- Browser validation: Playwright against the real local app entry point
- Assumed workbook format: `.xlsx`
- Assumed media reference model: URL or relative-path strings, not embedded binary media

## Accounts and Fixtures

- No authenticated account is expected for the current frontend-only scope.
- Required fixture: at least one valid workbook that includes company home data, two or more showrooms, and at least one product per showroom.
- Required negative fixture: at least one invalid workbook missing required fields or relationships.

If any required item is missing, the tester must fail fast and record the missing prerequisite.

## Commands

- `npm test -- --run`
  - Expected success signal: all focused unit/integration tests for config parsing and rendering pass.
- `npm run build`
  - Expected success signal: Vite production build completes without errors.
- `npx playwright test`
  - Expected success signal: browser tests pass for admin import/export and config-driven rendering, with evidence artifacts saved by Playwright.

## Test Cases

### T1: Validate workbook schema import rules

- Covers: P1-AC1, P1-AC2
- Level: unit
- Command: `npm test -- --run`
- Expected: valid workbook data is normalized into the runtime config shape, and missing required fields or broken showroom-product links fail with explicit errors.

### T2: Validate workbook export round-trip

- Covers: P1-AC3
- Level: unit
- Command: `npm test -- --run`
- Expected: exported workbook data preserves the agreed schema and can be re-imported without field loss.

### T3: Admin console import/export browser flow

- Covers: P2-AC1, P2-AC2, P2-AC3
- Level: e2e
- Command: `npx playwright test`
- Expected: a user can open the admin console, import a valid workbook, export the active workbook, and see explicit validation errors for invalid input without partial state application.

### T4: Company homepage renders from imported config

- Covers: P3-AC1
- Level: integration,e2e
- Command: `npm test -- --run` and `npx playwright test`
- Expected: homepage image plus Chinese and English media/text fields render from the imported config instead of hardcoded data.

### T5: Showrooms and products render from imported config

- Covers: P3-AC2, P3-AC3
- Level: integration,e2e
- Command: `npm test -- --run` and `npx playwright test`
- Expected: showroom names, showroom images, product lists, product images, and bilingual media/text fields all reflect the imported config.

### T6: Delivery verification and browser evidence

- Covers: P4-AC1, P4-AC2, P4-AC3
- Level: regression
- Command: `npm test -- --run`, `npm run build`, and `npx playwright test`
- Expected: RED/GREEN evidence exists in `execution-log.md`, all verification commands pass, and Playwright evidence files exist for the final report.

## Coverage Matrix

| Case ID | Area | Scenario | Level | Acceptance IDs | Evidence |
| --- | --- | --- | --- | --- | --- |
| T1 | Config schema | Import validates required fields and relationships | unit | P1-AC1, P1-AC2 | `execution-log.md`, unit test output |
| T2 | Config export | Export preserves workbook schema for round-trip use | unit | P1-AC3 | `execution-log.md`, unit test output |
| T3 | Admin console | Import/export actions work in a real browser and invalid import fails clearly | e2e | P2-AC1, P2-AC2, P2-AC3 | Playwright screenshots, traces, `test-report.md` |
| T4 | Company homepage | Homepage media/text renders from imported config | integration,e2e | P3-AC1 | Test output, Playwright evidence |
| T5 | Showroom and product rendering | Showrooms and products render from config with no hardcoded dependency | integration,e2e | P3-AC2, P3-AC3 | Test output, Playwright evidence |
| T6 | Final verification | Commands pass and TDD/browser evidence is present | regression | P4-AC1, P4-AC2, P4-AC3 | `execution-log.md`, Playwright evidence, `test-report.md` |

## Evaluator Independence

- Mode: blind-first-pass
- Validation surface: real-browser
- Required tools: vitest, vite, playwright
- First-pass readable artifacts: prd.md, test-plan.md
- Withheld artifacts: execution-log.md, task-state.json
- Real environment expectation: Run against the real repo and local runtime. Use a real browser session for admin console and generated frontend paths, then record concrete evidence.
- Escalation rule: Do not inspect withheld artifacts until the tester has written an initial verdict or the main agent explicitly asks for discrepancy analysis.

## Pass / Fail Criteria

- Pass when:
  - Every acceptance id from `P1-AC1` through `P4-AC3` is validated by at least one executed case.
  - `npm test -- --run`, `npm run build`, and `npx playwright test` all pass.
  - Browser evidence exists for admin import/export and config-driven page rendering.
- Fail when:
  - Any required config field is silently defaulted or ignored.
  - Import/export only works with hardcoded demo data.
  - Playwright validation cannot exercise the real frontend path.
  - Any required command fails or required evidence is missing.

## Regression Scope

- Existing category/showroom navigation behavior
- Existing responsive layout behavior
- Current app boot path in `src/main.js`
- Any existing tests in `src/app.test.js`
- Build output for the current Vite app

## Reporting Notes

Write results to `test-report.md`.

The tester must remain independent from the executor and should prefer blind-first-pass unless the task explicitly needs full-context evaluation.
