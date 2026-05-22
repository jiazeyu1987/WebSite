BDD: desktop dual-column pages keep a bottom gap and scroll inside the right panel -> Given 用户在桌面横屏查看 kiosk 首页或公司详情双列页 / When 页面渲染且右侧文案超过可见高度 / Then 左右两列底部都应保留约 45px 可见空白，右栏只在卡片内部竖向滚动查看全文，左侧图片继续按容器拉伸铺满。
RED: npx vitest run src/medical-kiosk.test.js -t "applies the desktop bottom gap and keeps the narration copy inside an internal scroll container" -> FAIL, 当前桌面样式中还没有 `--kiosk-desktop-bottom-gap` 规则，右栏仅有已有滚动容器但没有统一的桌面底部留白约束。
RED: npx playwright test tests/kiosk-gallery.spec.js --grep "desktop dual-column bottom gap|company detail dual-column bottom gap" --reporter=line -> FAIL, 首页主图与公司详情内容区底边超出视口底边，剩余 gap 为负值，说明当前桌面双列页没有保留目标底部空白。
GREEN: npx vitest run src/medical-kiosk.test.js -> PASS
GREEN: npx playwright test tests/kiosk-gallery.spec.js --grep "desktop dual-column bottom gap|company detail dual-column bottom gap" --reporter=line -> PASS
GREEN: npx playwright test tests/kiosk-gallery.spec.js --reporter=line -> PASS
GREEN: python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-desktop-dual-column-bottom-gap/frontend-feature-evidence.md -> PASS
GREEN: python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-desktop-dual-column-bottom-gap --mode preview -> PASS
