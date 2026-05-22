# Execution Log: 20260522-homepage-detail-runtime-blocker

BDD: 主页详情页真实路径应在当前 live 运行时成功打开 -> Given Website 根路径使用真实 IntRuoyi 聚合接口且不启用 mock / When 用户打开 `http://127.0.0.1:4173/` 并进入主页详情链路 / Then 页面应加载真实展厅数据并进入详情内容，而不是停在运行时错误页
BDD: Website 应在上游聚合接口失败时显式暴露真实错误 -> Given 匿名 `GET /showroom/display/website-config` 返回非零 code / When 根路径启动加载真实数据 / Then 页面应展示明确错误而不是静默降级或切回 mock
BDD: 主页产品封面应与后台产品封面一致 -> Given IntRuoyi 产品编辑页已经为产品保存了后台封面图 / When Website 根路径与 `/showroom` 渲染产品卡片和产品详情首图 / Then 前台展示图应与后台封面一致，而不是继续优先显示 preview asset 默认图

RED: `http://127.0.0.1:4173/` -> FAIL, 浏览器当前显示 `展厅数据加载失败`
RED: `Invoke-WebRequest http://127.0.0.1:48081/showroom/display/website-config` -> FAIL, returns `{"success":false,"message":"SHOWROOM_TARGET_NOT_FOUND: live product preview asset source revision mismatch","code":500,...}`
INFO: 既有 `IntRuoyi` 任务 `20260522-showroom-product-live-narration-revision-guard` 已于今日修复过同类 live 版本漂移并曾把 `website-config` 恢复到 HTTP 200；当前失败形态改为 preview asset mismatch，疑似新的 live 数据漂移而非 Website 前端回归
INFO: upstream direct-publish guard fix -> PASS, `IntRuoyi` 已补上“直发时同步 live PRODUCT preview”的正式代码修复，并通过定向 RED/GREEN 测试
INFO: upstream local live data repair -> PASS, `product_001` preview 已对齐到 `1377`，`product_166` 公共映射已软删除
INFO: follow-up runtime probe `GET /showroom/display/website-config` -> FAIL, error advanced to `SHOWROOM_TARGET_NOT_FOUND: live product preview asset is required`
INFO: follow-up data inspection -> current public hall mappings contain `165` active mapped products; `164` of them still have no published PRODUCT preview, while PUBLIC ZH/EN narration counts remain complete
INFO: first failing mapped product -> `hall_id=1 / display_order=2 / product_002(id=2) / current_revision_id=1363 / preview_source_revision_id=NULL`; the aggregate interface fails on this product first, but the missing-preview issue is dataset-wide rather than isolated to a single product
INFO: follow-up live contract probe on 2026-05-22 -> PASS, `GET /showroom/display/website-config` now returns `code=0`, but multiple product `previewImageUrl` values still resolve to the same default preview asset path.
INFO: follow-up root-cause audit -> `Website` currently renders the anonymous showroom contract field `previewImageUrl` as-is; `IntRuoyi ShowroomApiRuntime` prefers product preview asset over admin `cover_image`, so the current mismatch is upstream contract behavior rather than a Website-only rendering bug.
GREEN: `mvn -pl yudao-module-showroom "-Dtest=ShowroomHttpApiIntegrationTest#websiteConfigAndHallDisplayShouldPreferAdminProductCoverImageOverPreviewAsset" "-Dsurefire.failIfNoSpecifiedTests=false" test` -> PASS, upstream showroom regression test now proves product display prefers admin cover image.
GREEN: `mvn -pl yudao-server -am -DskipTests package` -> PASS, new showroom image-priority code entered `yudao-server.jar`.
GREEN: `cmd /c D:\ProjectPackage\Int\IntRuoyi\restart-ruoyi.bat` -> PASS, local `IntRuoyi` runtime restarted onto the rebuilt jar.
GREEN: `Invoke-WebRequest -UseBasicParsing http://127.0.0.1:48081/showroom/display/website-config` -> PASS, first public product now exposes `/admin-api/infra/file/28/get/showroom/product/cover/20260521/product-product_001-cover.png`.
GREEN: real Playwright root-path verification -> PASS, `http://127.0.0.1:4173/` first product card and product detail hero image both resolve to the same admin cover path.
