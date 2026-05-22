BDD: hide public narration title text while keeping controls -> Given 用户停留在根路径 kiosk 首页且右侧公开讲解卡片已渲染 / When 页面展示该卡片 / Then 卡片头部不应显示“公开讲解”或“Public narration”标题文字，但语言切换、静音与展开收起控件仍应可见。
RED: npx vitest run src/medical-kiosk.test.js -t "hides the public narration title text while keeping the voice card controls available" -> FAIL, 当前实现仍渲染 `.kiosk-voice__title`，其文本为“公开讲解”。
GREEN: npx vitest run src/medical-kiosk.test.js -t "hides the public narration title text while keeping the voice card controls available" -> PASS
GREEN: npx vitest run src/medical-kiosk.test.js -> PASS
GREEN: real browser probe against http://127.0.0.1:4174/ with backend http://127.0.0.1:48081 -> PASS, 首页右侧语音卡片 `titleCount=0`，且语言切换前后头部控件仍可见、正文讲解文案正常切换。
