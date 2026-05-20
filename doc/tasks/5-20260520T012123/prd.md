# PRD

- Task ID: `5-20260520T012123`
- Created: `2026-05-20T01:21:23`
- Workspace: `D:\ProjectPackage\Website`
- User Request: `Schedule execution for five hours later to add an admin console page, support one-click import/export of a configuration workbook, and generate the frontend pages from workbook data for company home, showrooms, and products.`

## Goal

Build a frontend admin console that can import and export a configuration workbook, then drive the existing website UI from that configuration so the company homepage, showroom list, and product content no longer depend on hardcoded demo data.

## Scope

- Add an admin console page inside the current frontend application.
- Support one-click import and export for a configuration workbook.
- Define and validate the configuration contract for:
  - company homepage image
  - company homepage Chinese audio, English audio, Chinese subtitle text, and English subtitle text
  - showroom name and showroom image
  - product membership inside each showroom
  - product name, product image, Chinese audio, English audio, Chinese subtitle text, and English subtitle text
- Replace hardcoded frontend content generation with configuration-driven rendering.
- Add automated tests plus Playwright browser verification for the import/export and render flow.

## Non-Goals

- Backend persistence, new server APIs, or database storage.
- Audio or image asset generation.
- Compatibility shims for malformed configuration files.
- Silent default values when required configuration fields are missing.
- Scope beyond the current Website frontend repository.

## Preconditions

- Node.js and the current frontend toolchain must remain runnable in `D:\ProjectPackage\Website`.
- The default workbook contract is an `.xlsx` file with URL or relative-path string fields for images and audio assets. If the user later requires another format or embedded binary media, stop and revise the contract first.
- The runtime must allow adding any frontend dependency needed for `.xlsx` import/export.
- Playwright must be available for final E2E verification.

If any item is missing, stop and record it in `task-state.json.blocking_prereqs`.

## Impacted Areas

- `src/app.js`
- `src/main.js`
- `src/demoData.js`
- `src/style.css`
- `src/app.test.js`
- New config schema / workbook parsing modules under `src/`
- Task artifacts under `doc/tasks/5-20260520T012123/`

## Phase Plan

Use stable phase ids. Do not renumber ids after execution has started.

### P1: Define workbook contract and validation model

- Objective: Replace the current implicit demo data shape with an explicit workbook-backed configuration contract for company home, showrooms, and products.
- Owned paths:
  - `src/demoData.js`
  - new `src/config-schema.js`
  - new `src/config-workbook.js`
  - `doc/tasks/5-20260520T012123/`
- Dependencies:
  - Confirmation that `.xlsx` plus URL/path media references is acceptable.
- Deliverables:
  - Normalized in-app config shape.
  - Workbook sheet and field definitions.
  - Validation rules that fail fast on missing required fields or broken showroom-product relationships.

### P2: Build admin console import/export flow

- Objective: Add an admin UI surface that can import a workbook into runtime state and export the current state back to the agreed workbook shape.
- Owned paths:
  - `src/app.js`
  - `src/main.js`
  - `src/style.css`
  - new `src/admin-console.js`
- Dependencies:
  - P1 workbook contract and parser/exporter.
- Deliverables:
  - Admin console entry point.
  - One-click import action.
  - One-click export action.
  - Explicit validation and error reporting with no silent downgrade.

### P3: Generate homepage, showroom, and product views from config

- Objective: Render the visitor-facing frontend from imported configuration instead of hardcoded content.
- Owned paths:
  - `src/app.js`
  - `src/demoData.js`
  - `src/style.css`
- Dependencies:
  - P1 data contract.
  - P2 runtime config state and admin import flow.
- Deliverables:
  - Company homepage rendering from config.
  - Showroom list and showroom detail rendering from config.
  - Product rendering from config, including image, audio, and bilingual subtitle fields.

### P4: Verify with strict TDD evidence and real-browser coverage

- Objective: Add regression coverage and browser proof for the workbook-driven experience.
- Owned paths:
  - `src/app.test.js`
  - Playwright test files and config if needed
  - `doc/tasks/5-20260520T012123/execution-log.md`
  - `doc/tasks/5-20260520T012123/test-report.md`
- Dependencies:
  - P1 through P3 delivered.
- Deliverables:
  - RED/GREEN evidence in the execution log.
  - Unit and integration coverage for parsing and rendering.
  - Playwright coverage for the admin import/export and config-driven display path.

## Phase Acceptance Criteria

### P1

- P1-AC1: The codebase has a single documented configuration contract that covers company home, showrooms, and products, including Chinese and English media/text fields.
- P1-AC2: Workbook import validation stops immediately with explicit errors when required fields, relations, or media references are missing.
- P1-AC3: Workbook export writes the same agreed contract so an exported file can be re-imported without schema loss.
- Evidence expectation: Parser tests and reviewed workbook schema documentation recorded in `execution-log.md`.

### P2

- P2-AC1: The frontend exposes an admin console page with one-click import and one-click export actions.
- P2-AC2: Importing a valid workbook updates runtime configuration for the current session without manual code edits.
- P2-AC3: Import failures surface explicit validation errors and do not partially apply invalid data.
- Evidence expectation: Focused unit tests plus browser evidence of import/export actions recorded in `execution-log.md` and `test-report.md`.

### P3

- P3-AC1: The company homepage image and bilingual media/text fields render from imported configuration.
- P3-AC2: Showroom names, showroom images, product lists, and product media/text fields render from imported configuration.
- P3-AC3: The visitor-facing UI no longer requires hardcoded showroom/product content to display the configured experience.
- Evidence expectation: Rendering tests and Playwright screenshots or traces recorded in `execution-log.md` and `test-report.md`.

### P4

- P4-AC1: Strict TDD evidence exists in `execution-log.md` with at least one RED and matching GREEN entry for the new config-driven behavior.
- P4-AC2: `npm test -- --run`, `npm run build`, and `npx playwright test` pass for the delivered scope.
- P4-AC3: The final test report includes independent browser verification evidence for the admin flow and the generated visitor-facing pages.
- Evidence expectation: Verification commands and browser evidence recorded in `execution-log.md` and `test-report.md`.

## Done Definition

- All four phases are completed and accepted.
- Every acceptance criterion from `P1-AC1` through `P4-AC3` has evidence in `execution-log.md` or `test-report.md`.
- The frontend can import a valid workbook, export the active workbook, and render company home, showrooms, and products from runtime config.
- Unit tests, build verification, and Playwright verification all pass.
- The task record is updated with final status and closeout preview evidence.

## Blocking Conditions

- The required workbook format or asset-reference model changes before implementation begins.
- Playwright cannot be run in the local environment for final browser validation.
- Required workbook fields, sample assets, or routing entry points are missing and prevent a real user flow from being exercised.
- Any implementation path would require fallback data, mock success states, or silent downgrade that the user did not request.
