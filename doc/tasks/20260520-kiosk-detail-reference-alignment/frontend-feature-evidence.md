# Frontend Feature Evidence: Kiosk Detail Reference Alignment

## Feature Goal

- 让 `medical-kiosk` 的卡片详情页回到参考图对应的构图：点击卡片进入独立详情页，保留返回展厅入口，并展示右侧标签、讲解按钮、产品描述和底部四块信息卡。

## Non-Goals

- 不修改 `/showroom` 路径、接口 contract、后端行为或数据字段。
- 不引入远程图片、mock 数据或 fallback 分支。
- 不重做首页卡片墙、左右滑动切换逻辑或根路径入口。

## Requirements And Acceptance IDs

- `AC-1`: 用户点击首页器械卡片后，必须进入独立产品详情页。
- `AC-2`: 详情页必须保留返回展厅按钮，并能回到原展厅卡片列表。
- `AC-3`: 详情页首屏必须包含主图区域、右侧标签区、讲解按钮和产品描述模块。
- `AC-4`: 详情页底部必须显示四块信息卡，包含所属展厅、产品名称、器械轮廓和交互入口。
- `AC-5`: 改动仅限 `medical-kiosk` 展示层，不修改真实数据边界与路由契约。

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Runtime component: `D:\ProjectPackage\Website\src\medical-kiosk.js`
- Styles: `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Unit test: `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- Browser test: `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`

## API Contracts And Data States

- Data source: existing local `kioskCategories` and generated SVG product art.
- Gallery state: homepage card wall with `data-product-card`.
- Detail state: `data-product-detail-id`.
- Narration CTA: `data-speech-toggle`.
- Summary cards: `data-product-specs-panel` and `data-product-spec-item`.

## BDD Scenarios

- `BDD: Kiosk detail matches the reference composition -> Given the user opens the kiosk home page and clicks a product card / When the detail page appears / Then it must show the large hero image area, right-side tags, playback button, product description module, and bottom four-card summary layout from the reference image.`
- `BDD: Kiosk detail remains returnable -> Given the user is on a product detail page / When the user clicks the return button / Then the page must return to the original showroom gallery without changing the existing root route or data source.`

## RED:

- `npm test -- --run src/medical-kiosk.test.js` -> FAIL, the current detail page no longer exposed the bottom info cards and still used the old top-right state text instead of the reference-style narration prompt.

## GREEN:

- `npm test -- --run src/medical-kiosk.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test tests/kiosk-detail.spec.js --reporter=line` -> PASS

## Responsive, Accessibility, Loading, Empty, Error, And Permission Checks

- Responsive: detail hero and bottom info grid collapse to single-column layouts under the existing portrait breakpoints.
- Accessibility: return button and narration CTA remain native buttons, while the swipe header continues to expose keyboard arrow behavior.
- Loading: not applicable in this scope because the kiosk root uses local data and has no async loading state.
- Empty: not applicable in this scope because the kiosk requires at least one category and local products at boot.
- Error: narration button now reports an explicit unsupported-browser state instead of pretending to play when speech synthesis is unavailable.
- Permission: not applicable in this scope because the kiosk route has no auth gate.

## E2E Or Component Verification Path

- Component path: boot `/` -> click first `data-product-card` -> assert detail view, tags, narration CTA, and four summary cards -> click `data-back-to-gallery`.
- Browser path: open `/` -> click first product card -> verify reference-style detail composition -> capture `output/playwright/kiosk-detail-reference-alignment.png` -> click return.

## Blockers And Follow-Up Skills

- Blockers: None.
- Follow-up skills: None.

