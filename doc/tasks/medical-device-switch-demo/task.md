# Task: Medical Device Switch Demo

## Goal

Build a runnable frontend demo page that captures the visual style of the provided reference image, with top navigation switching between medical-device categories and a right-side explanation panel. If exact design assets are unavailable, record the missing resources explicitly instead of hiding the gap.

## Milestones

1. Create the task record, verification plan, and BDD/TDD execution log.
2. Scaffold a minimal runnable frontend baseline for the demo.
3. Implement the reference-style layout, category switching, and responsive behavior.
4. Add focused tests and run verification.
5. Record missing resources, final status, and closeout evidence.

## Expected Verification

- `npm test -- --run`
- `npm run build`
- Manual browser smoke check of the category switching demo

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - Created the task record and execution log.
  - Defined the demo scope as a new frontend surface because the workspace was empty.
- Verification evidence:
  - Task files created under `doc/tasks/medical-device-switch-demo/`.
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - Bootstrapped a minimal Vite frontend baseline with build and test scripts.
  - Installed the required local dependencies for the demo and verification flow.
- Verification evidence:
  - `npm install`
  - `npm run build`
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - Implemented the reference-style category navigation, product grid, and right-side explanation panel.
  - Added responsive behavior and programmatic SVG line-art so the demo remains visually coherent without hidden resource fallback.
- Verification evidence:
  - Playwright smoke check against `http://127.0.0.1:4173`
  - Screenshot artifacts saved to `output/playwright/home-demo.png` and `output/playwright/cardiology-demo.png`
- Remaining blockers:
  - Exact source assets are still missing for a production-faithful replica.

### Milestone 4

- Status: Completed
- Completed work:
  - Added a focused test for initial render and category switching behavior.
  - Completed build verification and real-browser interaction verification.
- Verification evidence:
  - `npm test -- --run`
  - `npm run build`
  - Playwright click-through verification
- Remaining blockers:
  - None for the demo scope.

### Milestone 5

- Status: Completed
- Completed work:
  - Consolidated missing resource notes and final verification evidence.
  - Prepared task closeout preview.
- Verification evidence:
  - Cleanup preview command ready for execution as part of closeout.
- Remaining blockers:
  - None for demo delivery. Exact design-resource gaps are documented below.

## Missing Resources

The following assets are not available in the workspace, so the demo uses code-drawn medical line art instead of pretending to have the final production files:

1. Exact product photography or transparent PNG/WebP assets for each medical device card.
2. Original category icon source files that match the reference one-to-one.
3. Official product names, SKU hierarchy, and per-category product inventory.
4. Final right-panel narration copy approved for each category.
5. Brand assets such as logo, font specification, and any exact background texture used in the original system.

## Final Verification

- Status: Completed
- Result: PASS for the requested demo scope
- Verified by:
  - `npm test -- --run`
  - `npm run build`
  - Playwright browser verification on the local demo

## Follow-up Updates

- 2026-05-19:
  - Expanded `.gitignore` for the frontend demo to also ignore coverage output, Vite cache files, and temporary log files.
  - Refined the page to remove the outer frame, switch the top navigation icons to a thinner outline style, remove the legacy gallery heading block, and make the desktop layout fill the viewport more completely.
  - Expanded each category gallery so the desktop grid can occupy the full main stage instead of leaving large blank space at the bottom.
  - Added portrait-only responsive rules so mobile or portrait layouts switch to a 4-column card wall with the explanation panel stacked below, while landscape tablet and large-screen layouts keep the existing horizontal split view.
- 2026-05-20:
  - Re-verified both landscape and portrait layouts against the supplied reference screenshots.
  - Increased explanation-panel copy density so the reading area more closely matches the reference image rhythm, especially for the active home category.
  - Added a Windows batch launcher so the demo can be started from a single `.bat` entry point with explicit prerequisite checks.
  - Fixed the root Vite entry so `http://127.0.0.1:4173/` renders the reference kiosk page again instead of the unrelated configuration-driven showroom interface.
  - Kept the newer showroom/config modules in the repo, but separated them from the homepage entry to avoid further homepage regressions.
  - Replaced the top multi-item menu area with a single active hall title and enabled left/right swipe switching for the hall carousel on both landscape and portrait layouts.
  - Added a dedicated root-entry regression test after the homepage entry unexpectedly reverted to the showroom console again, and restored the kiosk homepage as the active root view.
