# Frontend Feature Evidence

## Feature Goal

为 `medical-kiosk` 顶部标题条中的 7 个展厅文字签名补充来自 `官网数据.xlsx` 的对应 SVG icon，并保持首页标题无展厅 icon。

## Non-Goals

- 不改动 `/showroom`。
- 不改动产品内容、语音状态或后端契约。
- 不新增 fallback 或占位资源。

## Requirements And Acceptance IDs

- `ACC-1`: 七个展厅分类切换后，标题条应显示对应的 SVG icon。
- `ACC-2`: 首页分类标题继续只显示文字，不显示展厅 icon。
- `ACC-3`: icon 资源来源必须可追溯到 `官网数据.xlsx` 对应的 SVG 本地路径。

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/`
- Entry: `createMedicalKioskApp(root)`
- Components/files:
  - `D:\ProjectPackage\Website\src\medical-kiosk.js`
  - `D:\ProjectPackage\Website\src\medical-kiosk.css`
  - `D:\ProjectPackage\Website\src\medical-kiosk-title-icons.test.js`
  - `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
  - `D:\ProjectPackage\Website\public\kiosk-hall-icons\**`

## API Contracts And Data States

- API contracts: None. 使用本地前端分类数据与 Excel 对应的 SVG 资源。
- Data states:
  - Home category: text-only title.
  - Seven showroom categories: title text plus matching SVG icon.

## BDD Scenarios

- `kiosk hall title shows the matching showroom svg icon`
- `kiosk home title remains text-only`

BDD:

- `kiosk hall title shows the matching showroom svg icon` -> Given the kiosk title strip switches into any of the seven showroom categories / When the active title renders / Then exactly one matching Excel-sourced SVG icon should appear beside the title text.
- `kiosk home title remains text-only` -> Given the kiosk is on the home category / When the title strip renders / Then no showroom icon should be present.

## RED Command And Expected Failure

- `npm test -- --run src/medical-kiosk.test.js`
- Expected failure: `[data-active-category-icon]` count remained `0` after switching away from home because the title strip still rendered text only.

RED:

- `npm test -- --run src/medical-kiosk.test.js` -> FAIL because `[data-active-category-icon]` was not rendered after leaving home.

## GREEN Command And Passing Result

- `npm test -- --run src/medical-kiosk-title-icons.test.js`
- Result: the dedicated title-icon regression test passed and confirmed all seven non-home categories render exactly one matching SVG icon while home remains text-only.

GREEN:

- `npm test -- --run src/medical-kiosk-title-icons.test.js` -> PASS.
- `npm run build` -> PASS.
- `npx playwright test tests/kiosk-gallery.spec.js --reporter=line` -> PASS.

## Responsive, Accessibility, Loading, Empty, Error, And Permission Checks

- Responsive: title strip icon uses responsive clamp sizing and smaller badge gaps in portrait breakpoints.
- Accessibility: icon should be decorative and not duplicate title text for screen readers.
- Loading: N/A.
- Empty: N/A.
- Error: fail fast if expected SVG assets are missing from the copied `public/kiosk-hall-icons/` set.
- Permission: N/A.

## E2E Or Component Verification Path

- Component: `npm test -- --run src/medical-kiosk-title-icons.test.js`
- Browser path: open `/`, confirm home title has no icon, use the right title-strip arrow to switch to cardiology, confirm one icon appears and its source ends with `/kiosk-hall-icons/cardiology.svg`, then switch back home and confirm the icon disappears.

## Blockers And Follow-Up Skills

- None.
