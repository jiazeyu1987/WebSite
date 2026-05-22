BDD: kiosk 公司详情首屏保留主图 -> Given 用户从根路径 kiosk 首页进入公司详情页 When 公司详情渲染 Then 左侧主展示区应明确显示公司主图，并保持可见主视觉比例。
BDD: kiosk 公司详情使用图标化播放/停止入口 -> Given 用户位于根路径 kiosk 公司详情页 When 页面渲染与切换讲解状态 Then 播放/停止入口应以图标按钮呈现，并随播放态切换可见图标语义。
BDD: kiosk 公司详情主体区显示若干信息卡片 -> Given 公司详情消费 IntRuoyi 真实公司字段 When 页面渲染 Then 黄框主体区域应展示若干张公司信息卡片，而不是仅以长段正文占满主体区。
RED: `npm test -- --run src/medical-kiosk.test.js` -> FAIL, 当前公司详情页缺少 `data-company-detail-media-card` 与 `data-company-detail-content-card` 节点，播放入口仍是纯文字按钮而非图标播控。
RED: `npx playwright test tests/kiosk-gallery.spec.js --grep "kiosk company detail" --reporter=line` -> FAIL, 浏览器中 `data-company-detail-media-card` 不存在，说明红框主图区与黄框卡片化容器尚未按目标图落地。
GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS, 公司详情已渲染独立主图卡、3 个内容卡片容器与图标化播放/停止按钮，固定 5 个字段卡片和 fail-fast 逻辑保持通过。
GREEN: `npx playwright test tests/kiosk-gallery.spec.js --grep "kiosk company detail" --reporter=line` -> PASS, 浏览器中公司详情显示左侧主图、右侧图标播控摘要卡、讲解稿卡和下方字段卡片区。
GREEN: `npx playwright test tests/kiosk-gallery.spec.js tests/kiosk-detail.spec.js --reporter=line` -> PASS, 根路径首页/公司详情与产品详情的浏览器路径均通过，未引入详情播控回归。
GREEN: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-company-detail-image-icon-cards/frontend-feature-evidence.md` -> PASS, 前端证据文档在清理前已通过校验。
GREEN: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-company-detail-image-icon-cards --mode preview` -> PASS, 仅计划删除本次任务附属证据文件。
GREEN: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-company-detail-image-icon-cards --mode apply` -> PASS, 已按基线清理 `frontend-feature-evidence.md`，保留 `task.md` 与 `execution-log.md`。
