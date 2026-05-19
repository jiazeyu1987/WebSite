# Task: Showroom APP Layer Worksplit

## Goal

Own the showroom display-layer / APP-layer remediation inside `D:\ProjectPackage\Website`, while the IntRuoyi repositories continue to own backend APIs and back-office management pages.

## Milestones

1. Record the cross-repo boundary.
2. Split APP-layer work into independent Website tasks.
3. Provide self-contained prompts for context-free workers.
4. Document dependency on IntRuoyi backend contracts.

## Split Result

- `W1`
  - `D:\ProjectPackage\Website\doc\tasks\20260519-showroom-app-w1-home-company-navigation`
- `W2`
  - `D:\ProjectPackage\Website\doc\tasks\20260519-showroom-app-w2-gallery-audio-text`
- `W3`
  - `D:\ProjectPackage\Website\doc\tasks\20260519-showroom-app-w3-multi-device-app-shells`
- `W4`
  - `D:\ProjectPackage\Website\doc\tasks\20260519-showroom-app-w4-app-integration-e2e`

## Dependency Rules

- `W1` depends on stable company/home display contracts from IntRuoyi `B2`.
- `W2/W3` depend on stable display + narration + preview-image contracts from `B2/B5`.
- `W4` is the final APP-layer integration and E2E closeout task.

## Current Status

Completed.
