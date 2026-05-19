# Task: Showroom APP W1 Home / Company / Top Navigation

## Goal

Implement the APP-layer home page, company page, top category navigation, and the leftmost home button inside `D:\ProjectPackage\Website`.

## Scope

- APP home page
- APP company page
- top category navigation
- home button entry
- company-to-hall navigation affordance

## Non-Scope

- No back-office pages
- No backend Java changes
- No audio generation logic
- No multi-device shell divergence beyond what is needed for W1

## Write Boundary

- `src/**` only for APP home/company/navigation files owned by this task
- task-local tests
- `doc/tasks/20260519-showroom-app-w1-home-company-navigation/**`

## Dependencies

- IntRuoyi backend display contracts for company/home must be stable

## Expected Verification

- `npm test -- --run`
- `npm run build`

## Current Status

Pending.

## Context-Free Worker Prompt

```text
You are W1 worker for D:\ProjectPackage\Website.

Read:
1. D:\ProjectPackage\Int\IntRuoyi\AGENTS.md
2. D:\ProjectPackage\Website\doc\tasks\20260519-showroom-app-w1-home-company-navigation\task.md
3. D:\ProjectPackage\Int\IntRuoyi\resource\展厅当前规划内容汇总.xlsx

Goal:
- Implement APP home page, company page, top category navigation, and home button.

Rules:
- Strict TDD
- No backend edits
- No fallback / fake success
- Stay inside your write boundary
- If backend contract is missing, fail fast and record blocker

Finish by updating task docs and running:
- npm test -- --run
- npm run build
```
