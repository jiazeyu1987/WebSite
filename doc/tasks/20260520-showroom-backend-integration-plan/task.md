# Task: Showroom Backend Integration Plan

## Goal

Define a technical integration plan so the Website showroom frontend can read its runtime data from the showroom tab data managed in `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro`.

## Milestones

1. Inspect current Website and IntRuoyi showroom-related implementation.
2. Identify the real source-of-truth entities, APIs, and admin editing surfaces in IntRuoyi.
3. Define the cross-repo integration architecture, data contract, and failure behavior.
4. Record rollout steps, risks, and open questions.

## Expected Verification

- Evidence-backed code references from both repositories
- A written technical plan with interface contract and rollout sequence

## Current Status

- Status: Completed
- Completed work:
  - Confirmed the Website root entry and the newer config-driven showroom module are currently separate paths.
  - Traced the IntRuoyi showroom backend source-of-truth tables, admin APIs, display APIs, and runtime aggregation layer.
  - Produced an evidence-backed integration plan in `technical-plan.md`.
- Remaining blockers:
  - No blocker for planning. Implementation still needs a follow-up task in IntRuoyi to add the recommended aggregation endpoint and a follow-up task in Website to consume it.
