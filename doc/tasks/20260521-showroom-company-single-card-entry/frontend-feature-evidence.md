# Frontend Feature Evidence: Showroom Company Single Card Entry

## Feature Goal

- 将 `/showroom` 收敛为单卡片公司入口和公司详情两屏流程，消费匿名 `app-config` 中的真实公司图片、讲解和公开字段。

## Non-Goals

- 不修改根路径 `/` 的 kiosk 入口。
- 不保留旧 `/showroom` 的展厅导航、产品墙、产品详情或语言切换。
- 不增加 fallback、mock 数据、默认成功值或多余兼容逻辑。

## Requirements And Acceptance IDs

- `AC-1`: `/showroom` 初始只显示一个可点击的公司入口卡片。
- `AC-2`: 首页不得再显示展厅导航、展厅卡片墙或产品详情布局。
- `AC-3`: 点击公司卡片后必须进入公司详情页，并显示返回按钮、公司名称、公司讲解文案与公司公开字段列表。
- `AC-4`: 公司详情页必须提供显式播放按钮，并通过程序化音频播放 `audioZhUrl`。
- `AC-5`: 当 `company.publicFields`、`homeImageUrl`、`audioZhUrl` 等必需字段缺失时，页面必须进入显式错误态并 fail fast。

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/showroom`
- Entry split: `D:\ProjectPackage\Website\src\main.js`
- API mapper: `D:\ProjectPackage\Website\src\showroom-api.js`
- Runtime component: `D:\ProjectPackage\Website\src\showroom-app.js`
- Styles: `D:\ProjectPackage\Website\src\showroom-app.css`
- Unit tests: `D:\ProjectPackage\Website\src\showroom-api.test.js`, `D:\ProjectPackage\Website\src\showroom-app.test.js`
- Browser test: `D:\ProjectPackage\Website\tests\showroom-app.spec.js`

## API Contracts And Data States

- Data source: anonymous `GET /showroom/display/app-config`
- Required company contract:
  - `companyId`
  - `name`
  - `nameEn`
  - `homeImageUrl`
  - `subtitleZh`
  - `subtitleEn`
  - `audioZhUrl`
  - `audioEnUrl`
  - `publicFields: [{ label, value }]`
- Landing state: exactly one company card rendered from `company` data.
- Detail state: company public fields plus programmatic audio control using `audioZhUrl`.
- Error state: explicit load failure surface with no local fallback.

## BDD Scenarios

- `BDD: showroom landing renders only one company card -> Given IntRuoyi app-config returns company image and company public fields / When the user opens `/showroom` / Then the page must show exactly one clickable company entry card and must not render hall navigation or product walls.`
- `BDD: showroom landing enters company detail -> Given the user is on the `/showroom` landing card / When the user clicks the company card / Then the page must switch to a company detail screen with a back action, company title, company narration copy, and company public fields.`
- `BDD: company detail play button controls narration audio -> Given the user is viewing the company detail screen with a valid \`audioZhUrl\` / When the user clicks the play button / Then the app must programmatically play the company audio and update visible playback state text without navigating away.`
- `BDD: company detail fails fast on missing required app-config fields -> Given the backend app-config payload omits \`company.publicFields\` or any required company media field / When \`/showroom\` boots / Then the UI must enter an explicit error state and must not fall back to local data or synthetic defaults.`

## RED Command And Expected Failure

RED:

- `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js`
- Expected failure:
  - `showroom-api.js` 仍要求 `showrooms` 非空。
  - `/showroom` 仍渲染旧的公司/展厅/产品结构，没有单卡片公司入口或公司详情播放状态。

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test tests/showroom-app.spec.js --reporter=line` -> PASS

## Responsive, Accessibility, Loading, Empty, Error, And Permission Checks

- Responsive: desktop keeps the landing card visually on the left while the detail page remains readable on mobile widths.
- Accessibility: company card, back button, and play button remain native buttons.
- Loading: `/showroom` keeps explicit loading UI while app-config is in flight.
- Empty: `publicFields: []` shows a clear empty-state block rather than fake fields.
- Error: missing required contract fields or failed audio playback show explicit state text.
- Permission: `/showroom` only depends on the anonymous `app-config` endpoint.

## E2E Or Component Verification Path

- Component path: boot `/showroom` -> assert single company card -> click card -> assert detail copy and fields -> click play button -> assert playback state change.
- Browser path: open `/` and confirm kiosk -> open `/showroom` -> assert only one company card -> click card -> assert company detail and play button -> click play -> assert playback invocation or visible state change.

## Blockers And Follow-Up Skills

- Blockers: None.
- Follow-up skills: `task-closeout-cleanup` preview after verification.
