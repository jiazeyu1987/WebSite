BDD: kiosk 公司详情红框显示大图 -> Given 用户从 kiosk 首页进入公司详情页 When 页面首屏渲染 Then 左侧红框区域应以大图为主要视觉内容，而不是窄长图列。
BDD: kiosk 公司详情绿框使用 ICO 播控 -> Given 用户停留在公司详情页 When 页面展示或切换讲解状态 Then 讲解入口应以 ICO 图标按钮表达播放/停止语义。
BDD: kiosk 公司详情黄框优先展示若干卡片 -> Given 公司详情消费真实公司公开字段 When 页面首屏渲染 Then 黄框区域应优先展示若干信息卡片，而不是长段正文占满主体。
RED: 用户对照图 + 本地截图对比 -> FAIL, 当前页面仍是“左侧窄图列 + 右上摘要卡 + 主区长正文卡 + 底部卡片”，与“左上图、左下播放、右侧卡片”不一致。
GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS, 公司详情已切换为左上图片、左下播放按钮、右侧 5 张卡片的结构，并保持播控逻辑可用。
GREEN: `npx playwright test tests/kiosk-gallery.spec.js --grep "reference reflow" --reporter=line` -> PASS, 浏览器中公司详情已按“左上图、左下播放、右侧卡片”布局渲染。
GREEN: `npx playwright test tests/kiosk-gallery.spec.js tests/kiosk-detail.spec.js --reporter=line` -> PASS, 根路径公司详情、展厅列表与产品详情浏览器路径均未回归。
GREEN: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-company-detail-reference-reflow/frontend-feature-evidence.md` -> PASS, 前端证据文档在清理前已通过校验。
GREEN: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-company-detail-reference-reflow --mode preview` -> PASS, 预览仅包含任务截图与前端证据清理。
GREEN: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-company-detail-reference-reflow --mode apply` -> PASS, 已清理任务截图与前端证据文件，保留 `task.md` 与 `execution-log.md`。
