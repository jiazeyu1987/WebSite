# Frontend Feature Evidence

## Feature

- Goal: 隐藏根路径 kiosk 首页右侧公开讲解卡片的标题文本，同时保留该卡片全部现有交互能力。
- Non-goals:
  - 不调整卡片正文讲解内容
  - 不改动公司详情或 `/showroom` 页面播控
  - 不改动后端接口、数据契约或音频来源

## Acceptance

- `AC-VOICE-TITLE-1`: 根路径 kiosk 首页右侧公开讲解卡片头部不再显示“公开讲解 / Public narration”可见标题文字。
- `AC-VOICE-TITLE-2`: 语言切换按钮、静音按钮与展开收起按钮仍保留并可交互。
- `AC-VOICE-TITLE-3`: 卡片正文讲解内容与播放按钮行为不变。

## Entry Points And Owned Files

- Route: 根路径 `/`
- Entry state: kiosk ready view 首页
- Components/files:
  - `D:\ProjectPackage\Website\src\medical-kiosk.js`
  - `D:\ProjectPackage\Website\src\medical-kiosk.test.js`

## API Contracts And Data States

- 继续消费现有 `website-config` 的公司讲解文案与音频字段。
- 不改 loading / error / empty 数据态。
- 不新增 mock 成功或 fallback 分支。

## BDD Scenarios

- `BDD: hide public narration title text while keeping controls -> Given 用户停留在根路径 kiosk 首页且右侧公开讲解卡片已渲染 / When 页面展示该卡片 / Then 卡片头部不应显示“公开讲解”或“Public narration”标题文字，但语言切换、静音与展开收起控件仍应可见。`

## RED

RED:

- `npx vitest run src/medical-kiosk.test.js -t "hides the public narration title text while keeping the voice card controls available"` -> FAIL, 当前首页右侧语音卡片仍渲染 `.kiosk-voice__title`，内容为“公开讲解”。

## GREEN

GREEN:

- `npx vitest run src/medical-kiosk.test.js -t "hides the public narration title text while keeping the voice card controls available"` -> PASS
- `npx vitest run src/medical-kiosk.test.js` -> PASS
- Real browser probe against `http://127.0.0.1:4174/` with `VITE_SHOWROOM_USE_MOCK=false` and backend `http://127.0.0.1:48081` -> PASS, right-side voice card no longer renders `.kiosk-voice__title`, and the language / mute / expand controls remain available before and after switching English.

## Verification

- Desktop: 右侧语音卡片头部在不显示标题后，按钮区仍保持可见与可点击。
- Mobile: 本次不改现有折叠逻辑，只确认标题隐藏不破坏紧凑面板结构。
- Accessibility: 保留按钮的既有 `aria-label` / `title`。

- `npx vitest run src/medical-kiosk.test.js -t "hides the public narration title text while keeping the voice card controls available"`
- `npx vitest run src/medical-kiosk.test.js`
- Real browser probe on root `/` with live backend data

## Blockers

- 无
