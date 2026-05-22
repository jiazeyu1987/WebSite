BDD: kiosk 公司详情红框改为纯图标播控 -> Given 用户从根路径 kiosk 首页进入公司详情页 / When 左下红框播控区域渲染 / Then 区域内不应显示播放或停止文字，只保留可见的主图标按钮。
BDD: kiosk 公司详情播放中显示暂停图标 -> Given 用户位于公司详情页且存在可播放公开语音 / When 用户启动讲解后停留在当前页 / Then 红框主按钮应从播放图标切换为暂停图标，并保持可点击。
RED: `npm test -- --run src/medical-kiosk.test.js` -> FAIL, 公司详情按钮仍渲染 `data-company-detail-playback-label` 文本节点，播放中仍显示停止语义而不是暂停图标。
GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS
GREEN: `npx playwright test tests/kiosk-gallery.spec.js --grep "icon-only playback" --reporter=line` -> PASS, 浏览器中左下红框只保留纯图标播控，播放后切换为暂停图标，右侧卡片区保持可见。
