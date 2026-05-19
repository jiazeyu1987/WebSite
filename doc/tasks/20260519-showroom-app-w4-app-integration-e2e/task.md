# Task: Showroom APP W4 Integration and E2E

## Goal

Integrate all APP-layer Website tasks into a coherent runnable showroom APP, then run real-path E2E verification.

## Scope

- final APP routing / page composition
- final APP interaction integration
- Website-side E2E / smoke verification
- final APP closeout notes

## Non-Scope

- No backend Java changes
- No back-office management implementation

## Write Boundary

- APP integration files under `src/**`
- Website-side APP tests
- `doc/tasks/20260519-showroom-app-w4-app-integration-e2e/**`

## Dependencies

- `W1/W2/W3` completed
- IntRuoyi backend contracts stable

## Expected Verification

- `npm test -- --run`
- `npm run build`
- real browser smoke against local Website app

## Current Status

Pending.

## Context-Free Worker Prompt

```text
You are W4 worker for D:\ProjectPackage\Website.

Read:
1. D:\ProjectPackage\Int\IntRuoyi\AGENTS.md
2. D:\ProjectPackage\Website\doc\tasks\20260519-showroom-app-w4-app-integration-e2e\task.md
3. All prerequisite W1/W2/W3 task docs

Goal:
- Integrate the APP-layer pages into a coherent runnable Website app and run E2E verification.

Rules:
- Strict TDD
- No backend edits
- No fallback / fake success
- Stay inside your write boundary
- If prerequisite APP tasks are not complete, fail fast and record blocker

Finish by updating task docs and running:
- npm test -- --run
- npm run build
- real browser smoke on the local Website app
```
