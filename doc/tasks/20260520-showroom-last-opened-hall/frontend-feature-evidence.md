# Frontend Feature Evidence: Showroom Last Opened Hall Persistence

## Feature Goal

- 让 `/showroom` 在同一浏览器中重新打开时，自动恢复用户上次关闭前停留的展厅页面。

## Non-Goals

- 不改动后端 `showroom/display/app-config` contract。
- 不记住具体产品详情卡片，仅恢复展厅级别状态。
- 不引入本地假数据、兼容分支或静默降级。

## Requirements And Acceptance IDs

- `AC-1`: 用户在展厅页关闭前端后，重新打开 `/showroom` 时必须自动回到该展厅。
- `AC-2`: 浏览器里没有记忆状态时，`/showroom` 仍保持现有公司首页优先的首屏行为。
- `AC-3`: 后端 contract 不可用时，页面仍保持现有显式报错，不因为新增持久化逻辑而降级或吞错。

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/showroom`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Runtime component: `D:\ProjectPackage\Website\src\showroom-app.js`
- Unit test: `D:\ProjectPackage\Website\src\showroom-app.test.js`
- Browser test: `D:\ProjectPackage\Website\tests\showroom-app.spec.js`

## API Contracts And Data States

- API contract source: existing `showroom/display/app-config` payload consumed through `mapShowroomAppConfig`.
- Loading state: `data-screen="showroom-loading"`
- Ready company state: `data-screen="company-home"`
- Ready showroom state: `data-screen="showroom"` with `data-screen-showroom-id`
- Error state: `data-screen="showroom-error"`
- Persistence keys:
  - `showroom-consumer:view`
  - `showroom-consumer:active-showroom-id`

## BDD Scenarios

- `BDD: Showroom remembers the last opened hall -> Given a user previously closed the frontend while a showroom hall page was open / When the user opens /showroom again with the same browser storage / Then the frontend must automatically restore that hall instead of the company homepage.`
- `BDD: Company homepage remains the default without remembered showroom state -> Given no remembered showroom state exists in browser storage / When the user opens /showroom / Then the frontend must keep the current company-home first-load behavior.`

## RED:

- `npm test -- --run src/showroom-app.test.js` -> FAIL, second boot returned to the company homepage and did not restore remembered hall `12`.

## GREEN:

- `npm test -- --run src/showroom-app.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test tests/showroom-app.spec.js --reporter=line` -> PASS

## Responsive, Accessibility, Loading, Empty, Error, And Permission Checks

- Responsive: no layout structure changed; this task only updated runtime state restoration.
- Accessibility: restored hall still uses existing button-based navigation and semantic sections without adding new inaccessible controls.
- Loading: startup still renders the existing loading screen before remote config resolves.
- Empty: not applicable in this scope because current mapped contract already requires at least one showroom and fails fast otherwise.
- Error: verified `/showroom` still renders the explicit error state when backend app-config is unavailable.
- Permission: not applicable in this scope because the current frontend route has no auth gate.

## E2E Or Component Verification Path

- Component path: boot app -> click hall `12` -> recreate app with same `localStorage` -> assert `data-screen-showroom-id="12"`.
- Browser path: open `/showroom` -> click hall `12` -> reload page -> assert hall `12` auto-restores.

## Blockers And Follow-Up Skills

- Blockers: None.
- Follow-up skills: None.
