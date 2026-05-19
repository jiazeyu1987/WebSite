# Task: Showroom APP W2 Product Wall / Audio / Narration Text

## Goal

Implement the APP-layer product image wall, click-to-play behavior, narration text area, language-switch effect, and settings behavior inside `D:\ProjectPackage\Website`.

## Scope

- product image wall
- click interaction for narration playback
- narration text display area
- settings behavior for language switching
- preview-image usage in APP cards

## Non-Scope

- No back-office work
- No backend Java changes
- No multi-device shell ownership

## Write Boundary

- `src/**` only for APP gallery/audio/text/settings files owned by this task
- task-local tests
- `doc/tasks/20260519-showroom-app-w2-gallery-audio-text/**`

## Dependencies

- IntRuoyi backend display / narration / preview-image contracts from `B2/B5`

## Expected Verification

- `npm test -- --run`
- `npm run build`

## Current Status

Pending.

## Context-Free Worker Prompt

```text
You are W2 worker for D:\ProjectPackage\Website.

Read:
1. D:\ProjectPackage\Int\IntRuoyi\AGENTS.md
2. D:\ProjectPackage\Website\doc\tasks\20260519-showroom-app-w2-gallery-audio-text\task.md
3. D:\ProjectPackage\Int\IntRuoyi\resource\展厅当前规划内容汇总.xlsx

Goal:
- Implement APP product wall, click-to-play audio behavior, narration text area, and language-related settings behavior.

Rules:
- Strict TDD
- No backend edits
- No fallback / fake success
- Stay inside your write boundary
- If live narration / preview-image contract is missing, fail fast and record blocker

Finish by updating task docs and running:
- npm test -- --run
- npm run build
```
