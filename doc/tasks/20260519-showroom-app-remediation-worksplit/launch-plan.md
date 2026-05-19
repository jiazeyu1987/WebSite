# Showroom APP Layer Launch Plan

## Scope Ownership

- `D:\ProjectPackage\Website` only owns APP display-layer work.
- IntRuoyi backend and back-office management remain in:
  - `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro`
  - `D:\ProjectPackage\Int\IntRuoyi\yudao-ui-admin-vue3`

## APP Tasks

- `W1`
  - home page / company page / top navigation / home button
- `W2`
  - product wall / audio playback / narration text / settings semantics
- `W3`
  - large-screen / Pad / mobile shells
- `W4`
  - APP integration and E2E closeout

## Dependencies

- `W1` depends on stable company/home contracts from IntRuoyi backend
- `W2` depends on stable display / narration / preview-image contracts
- `W3` depends on stable APP-facing display contracts
- `W4` depends on `W1 + W2 + W3`

## Recommended Order

1. Start `W1`
2. Start `W2` and `W3` once APP-facing backend contracts are stable
3. Start `W4` after `W1/W2/W3` are complete

## Worker Bootstrap Rule

Each Website worker should read:

1. `D:\ProjectPackage\Int\IntRuoyi\AGENTS.md`
2. Its own Website `task.md`

No extra chat context should be required.
