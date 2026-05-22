# Frontend Feature Evidence

## Feature Goal And Non-Goals

Feature:

- Goal: 让根路径 kiosk 公司详情页的左侧播放区铺满红框可用区域，并让右侧公司介绍卡片固定在绿框内，通过触屏上下滑动按卡片吸附切换且不显示滚动条。
- Non-goals:
  - 不修改 `/showroom` 独立公司详情页
  - 不修改 `IntRuoyi` 接口、请求参数、响应结构、真实数据来源或字段映射
  - 不修改右侧独立语音面板的业务链路

## Acceptance Criteria

Acceptance:

- `AC-TOUCH-1`: 桌面横屏公司详情页中，左侧播放按钮应在视觉上基本铺满 `[data-company-detail-play-dock]`。
- `AC-TOUCH-2`: `[data-company-detail-panel]` 不再承担纵向滚动，右侧 `[data-company-detail-fields-panel]` 成为唯一可滚动卡片容器。
- `AC-TOUCH-3`: 绿框卡片区需要具备 `pan-y` 触屏滑动、`y mandatory` 吸附滚动和逐卡片吸附对齐行为。
- `AC-TOUCH-4`: 用户滑到后续卡片后触发播放/暂停重渲染，卡片区滚动位置不应回顶。
- `AC-TOUCH-5`: 既有左图铺满、左下播放区、右侧五张固定卡片和真实播放语义保持不变。

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Logic: `D:\ProjectPackage\Website\src\medical-kiosk.js`
- Styles: `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Unit test: `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- Browser tests:
  - `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
  - `D:\ProjectPackage\Website\tests\kiosk-company-detail-image-fill.spec.js`

## API Contracts And Data States

- API contract: 保持现有 `GET /showroom/display/website-config` 前端消费方式不变。
- Data states:
  - 首页公司入口卡片
  - 公司详情左上主图、左下播放区
  - 公司详情右侧五张固定卡片
  - 右侧卡片长文超出绿框时的内部吸附滚动状态

## BDD Scenarios

- `BDD: 公司详情播放区铺满 -> Given 用户在桌面横屏 kiosk 首页进入公司详情页 / When 页面渲染左侧播放区 / Then 主播放按钮应铺满红框可用区域且保留现有播放语义。`
- `BDD: 公司介绍卡片固定在绿框内 -> Given 用户在桌面横屏 kiosk 公司详情页看到右侧公司介绍卡片区 / When 公司字段卡片总高度超出可视区 / Then 外层公司详情面板不再承担纵向滚动且绿框内部成为唯一滚动容器。`
- `BDD: 触屏上下滑动按卡片吸附切换 -> Given 公司介绍卡片区内容超出绿框可视范围 / When 用户在绿框内上下滑动 / Then 卡片列表应在绿框内部滚动并按卡片起始位置吸附切换且不显示滚动条。`
- `BDD: 播放重渲染不重置卡片位置 -> Given 用户已滑到后续公司介绍卡片 / When 点击播放或暂停触发公司详情重渲染 / Then 绿框卡片滚动位置应保持不回到顶部。`

## RED Command And Expected Failure

RED:

- `npm test -- --run src/medical-kiosk.test.js`
- Expected failure:
  - 新增断言 `preserves the company detail cards scroll position when playback rerenders the company screen` 失败；点击播放后 `[data-company-detail-fields-panel]` 的 `scrollTop` 从 `168` 变回 `0`。
- `npx playwright test tests/kiosk-gallery.spec.js --grep "company detail touch snap" --reporter=line`
- Expected failure:
  - `company detail touch snap keeps the playback dock filled and the company cards scrolling inside the fixed green frame` 失败；`[data-company-detail-panel]` 的 `overflowY` 仍为 `auto`，未切换为固定绿框布局所需的 `hidden`。

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run src/medical-kiosk.test.js` -> PASS
- `npx playwright test tests/kiosk-gallery.spec.js --grep "company detail touch snap|company detail dual-column bottom gap|reference polish" --reporter=line` -> PASS
- `npx playwright test tests/kiosk-company-detail-image-fill.spec.js --reporter=line` -> PASS

## Verification Notes

Verification:

- 已把公司详情页当前滚动目标优先切换到 `[data-company-detail-fields-panel]`，并让播放成功、暂停和失败重渲染都走保留当前滚动位置的链路。
- 已把桌面双列公司详情外层面板改为固定高度链路和 `overflow: hidden`，避免整块面板继续承担纵向滚动。
- 已把右侧公司介绍区收敛为“标题固定 + 卡片列表内部滚动”，并为卡片列表配置 `touch-action: pan-y`、`overscroll-behavior: contain`、`scroll-snap-type: y mandatory`、`scroll-snap-stop: always`。
- 已为绿框卡片区隐藏滚动条，同时保留真实触摸滚动。
- 已保持现有左图铺满回归通过，确认本次绿框吸附滚动未破坏此前完成的主图铺满行为。

## Blockers And Follow-Up Skills

Blockers:

- None.

