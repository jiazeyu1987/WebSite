BDD: kiosk 公司详情左列主视觉更接近目标图 -> Given 用户查看公司详情页 When 首屏渲染 Then 左列图片应更像红框主视觉，而不是留出过多空边。
BDD: kiosk 公司详情左下播放区更聚焦 -> Given 用户查看公司详情页 When 首屏渲染 Then 左下区域应突出播放按钮本身，而不是被次级文案抢占。
BDD: kiosk 公司详情右侧卡片区更稳定 -> Given 用户查看公司详情页 When 首屏渲染 Then 右侧卡片区应保持 3 张以上卡片可见，并维持更紧凑的节奏。
RED: 当前页面视觉对照 -> FAIL, 虽然已实现“左上图、左下播放、右侧卡片”大结构，但左图留白偏多、左下区仍有较强标题干扰、右侧卡片节奏偏松。
GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS, 左列图片/播放区与右侧卡片结构保持通过，数据与播控逻辑未被破坏。
GREEN: `npx playwright test tests/kiosk-gallery.spec.js --grep "reference polish" --reporter=line` -> PASS, 浏览器中公司详情维持“左上图片、左下播放、右侧卡片”结构，并通过更紧凑的视觉约束。
GREEN: `npx playwright test tests/kiosk-gallery.spec.js tests/kiosk-detail.spec.js --reporter=line` -> PASS, 根路径公司详情、展厅列表与产品详情浏览器路径均未回归。
GREEN: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-company-detail-reference-polish/frontend-feature-evidence.md` -> PASS, 前端证据文档在清理前已通过校验。
GREEN: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-company-detail-reference-polish --mode preview` -> PASS, 预览仅包含前端证据文件清理。
GREEN: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-company-detail-reference-polish --mode apply` -> PASS, 已按基线清理前端证据文件，保留 `task.md` 与 `execution-log.md`。
