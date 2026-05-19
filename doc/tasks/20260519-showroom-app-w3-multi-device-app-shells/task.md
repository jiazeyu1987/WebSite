# Task: Showroom APP W3 Large Screen / Pad / Mobile Shells

## Goal

Implement the APP-layer large-screen, Pad, and mobile shells in `D:\ProjectPackage\Website`, keeping a consistent visual language while adapting layout by device size.

## Scope

- large-screen shell
- Pad shell
- mobile shell
- shared APP-level device adaptation behavior

## Non-Scope

- No back-office work
- No backend Java changes
- No business-side approval or assignment logic

## Write Boundary

- `src/**` only for APP device-shell files owned by this task
- task-local tests
- `doc/tasks/20260519-showroom-app-w3-multi-device-app-shells/**`

## Dependencies

- Stable APP display contracts from IntRuoyi

## Expected Verification

- `npm test -- --run`
- `npm run build`

## Current Status

Pending.

## Context-Free Worker Prompt

```text
You are W3 worker for D:\ProjectPackage\Website.

Read:
1. D:\ProjectPackage\Int\IntRuoyi\AGENTS.md
2. D:\ProjectPackage\Website\doc\tasks\20260519-showroom-app-w3-multi-device-app-shells\task.md
3. D:\ProjectPackage\Int\IntRuoyi\resource\展厅当前规划内容汇总.xlsx

Goal:
- Implement large-screen, Pad, and mobile APP shells with consistent style and responsive adaptation.

Rules:
- Strict TDD
- No backend edits
- No fallback / fake success
- Stay inside your write boundary

Finish by updating task docs and running:
- npm test -- --run
- npm run build
```
