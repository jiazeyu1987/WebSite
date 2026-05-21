# Frontend Feature Evidence

## Feature Goal And Non-Goals

- Goal: 提升 `medical-kiosk` 手机端顶部展厅切换区的可发现性，让用户看到明确的左右切换提示和当前槽位进度。
- Non-goals:
  - 不改 `/showroom`。
  - 不改列表返回位置记忆。
  - 不变更后端接口、语音播放流程或现有 swipe/arrow/keyboard 切换机制。

## Acceptance Criteria

- `AC-SWIPE-1`: 顶部展厅切换区必须显示可见的“左右滑动或点击切换展厅”提示。
- `AC-SWIPE-2`: 顶部展厅切换区必须显示当前槽位与总槽位进度。
- `AC-SWIPE-3`: 从首页切到 `心内介入展厅` 后，进度必须从 `1 / 3` 更新为 `2 / 3`。
- `AC-SWIPE-4`: 现有箭头切换、触摸 swipe 切换和 gallery 浏览路径不得回归。

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Runtime component: `D:\ProjectPackage\Website\src\medical-kiosk.js`
- Styles: `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Unit test: `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- Browser test: `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`

## API Contracts And Data States

- API contract: 继续使用现有 `showroom/display/app-config` 公开展示配置。
- Data states:
  - Home slot: `data-current-slot="1"` and `data-total-slots="3"`.
  - First hall slot: `data-current-slot="2"` and `data-total-slots="3"`.
  - Existing hall switching behavior remains unchanged.

## BDD Scenarios

- `BDD: visible swipe instruction on kiosk title strip -> Given a mobile user opens the kiosk home screen / When the title strip renders / Then the strip shows a visible swipe-or-click instruction instead of relying on hidden affordance only.`
- `BDD: slot progress updates with active hall -> Given the kiosk has home plus two hall slots / When the user switches from home to the cardiology hall / Then the title strip updates slot progress from 1 / 3 to 2 / 3.`
- `BDD: existing gallery switching path remains valid -> Given the title strip now includes discoverability UI / When the user uses the existing arrows to change halls and browse the gallery / Then the gallery switching path still works without regression.`

## RED Command And Expected Failure

RED:

- `npm test -- --run src/medical-kiosk.test.js`
- Expected failure:
  - 当前实现没有 `data-swipe-hint`。
  - 当前实现没有 `data-swipe-progress`、`data-current-slot` 或 `data-total-slots`。

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run src/medical-kiosk.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test tests/kiosk-gallery.spec.js --reporter=line` -> PASS

## Verification Notes

Verification:

- 单测确认 `data-swipe-hint` 已渲染。
- 单测确认首页进度为 `1 / 3`，切到 `cardiology` 后进度为 `2 / 3`。
- Playwright 手机视口用例确认提示文案与进度在真实页面中可见，且切换后进度同步更新。
- 既有 gallery 浏览与公司详情入口用例继续通过。

## Blockers And Follow-Up Skills

Blockers:

- None.

- Follow-up skills: `task-closeout-cleanup`
