# QA Test Suite Evidence

## Scope

- Verify recent mobile-facing updates across `medical-kiosk` and `/showroom` using real browser E2E coverage.

## Matrix

- `medical-kiosk` swipe and gallery regression -> `tests/kiosk-gallery.spec.js`
- `medical-kiosk` detail and voice panel regression -> `tests/kiosk-detail.spec.js`
- `/showroom` mobile landing/detail regression -> `tests/showroom-app.spec.js`

## Test Commands

Test:

- `npx playwright test tests/kiosk-gallery.spec.js --reporter=line`
- `npx playwright test tests/kiosk-detail.spec.js --reporter=line`
- `npx playwright test tests/showroom-app.spec.js --reporter=line`

## RED Expectations

RED:

- 本次未新增测试文件；直接对最近移动端改动关联的现有 E2E 套件执行回归验证。
- 预期如果有回归，将体现在 `medical-kiosk` 滑动、详情返回滚动、语音面板、`/showroom` 手机布局或操作条相关用例中。

## GREEN Results

GREEN:

- `npx playwright test tests/kiosk-gallery.spec.js tests/kiosk-detail.spec.js tests/showroom-app.spec.js --reporter=line` -> PASS
- Passed tests:
  - `tests/kiosk-gallery.spec.js` -> 7/7 PASS
  - `tests/kiosk-detail.spec.js` -> 1/1 PASS
  - `tests/showroom-app.spec.js` -> 8/8 PASS

## Verification Notes

Verification:

- Total E2E cases executed: `16`
- Browser execution mode: Playwright real browser flow with Vite web server
- Covered recent mobile changes:
  - `medical-kiosk` pointer swipe feedback, cancel reset, and vertical-drag safety
  - `medical-kiosk` gallery/detail/mobile voice panel regressions
  - `/showroom` landing full-width controls, vertical-scroll-only model, first-screen detail layout, sticky bottom action bar, and mobile field cards

## Blockers

Blockers:

- None.
