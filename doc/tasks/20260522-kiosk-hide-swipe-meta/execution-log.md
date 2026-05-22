BDD: kiosk 顶部切换 meta 区隐藏 -> Given 用户要求红框里的顶部提示文案与页码不显示 / When kiosk 首页与展厅页加载完成 / Then `data-swipe-hint` 与 `data-swipe-progress` 不应渲染，且左右切换展厅交互保持可用。
INFO: Started bug-regression-fix-loop for hiding the kiosk swipe meta area.
RED: npm test -- --run src/medical-kiosk.test.js -> FAIL, `data-swipe-hint` still renders in the title strip, so the new null assertion fails before implementation.
RED: npx playwright test tests/kiosk-gallery.spec.js --grep "mobile title strip hides swipe guidance and slot progress" --reporter=line -> FAIL, mobile kiosk still renders one `[data-swipe-hint]` element.
GREEN: npm test -- --run src/medical-kiosk.test.js -> PASS
GREEN: npx playwright test tests/kiosk-gallery.spec.js --grep "mobile title strip hides swipe guidance and slot progress" --reporter=line -> PASS
INFO: Optional broader `tests/kiosk-gallery.spec.js` sweep was not used as the task gate after one unrelated environment/runtime expectation mismatch and one parallel Playwright port conflict were observed during exploratory runs.
INFO: task-closeout-cleanup preview for `20260522-kiosk-hide-swipe-meta` reported keep=`task.md`,`execution-log.md`, delete=`bug-regression-evidence.md`, blocked=`<none>`.
INFO: task-closeout-cleanup apply for `20260522-kiosk-hide-swipe-meta` deleted `bug-regression-evidence.md` and kept the core task records.
