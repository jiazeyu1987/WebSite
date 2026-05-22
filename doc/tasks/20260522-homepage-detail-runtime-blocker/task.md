# Task: 排查主页详情页真实运行时阻塞

## Goal

排查并恢复 `D:\ProjectPackage\Website` 根路径主页进入详情页的真实用户路径，确保本地运行时在不启用 mock、fallback 或兼容分支的前提下，可以从主页进入实际详情内容；若阻塞点不在 `Website`，则明确归因并记录上游影响。

## Scope

- `D:\ProjectPackage\Website\doc\tasks\20260522-homepage-detail-runtime-blocker\**`
- `D:\ProjectPackage\Website\src\**` 只读排查，除非确认需要前端修复
- 必要时只读联查 `D:\ProjectPackage\Int\IntRuoyi\**`

## Non-Scope

- 不主动启用 mock 或回退到本地假数据
- 不新增 fallback、降级、兼容分支或假成功
- 在未确认前端确有回归前，不修改 `Website` 生产代码

## Dependencies

- `run-website.bat` 已成功启动本地 `Website`，当前入口为 `http://127.0.0.1:4173/`
- 本地 `IntRuoyi` 匿名公开接口 `http://127.0.0.1:48081/showroom/display/website-config` 可探测
- 应用内浏览器可访问当前站点

## Milestones

1. 建立任务记录并复现主页无法进入详情页的真实症状。
2. 区分阻塞点属于 `Website` 前端、`Website` 接口适配层，还是 `IntRuoyi` 真实运行时。
3. 若可在当前仓库修复，则先补 RED 证据再实施最小修复；若阻塞在上游，则记录具体缺口与影响。
4. 更新任务状态、验证证据与后续动作建议。

## Expected Verification

- `Invoke-WebRequest http://127.0.0.1:4173/`
- `Invoke-WebRequest http://127.0.0.1:48081/showroom/display/website-config`
- 浏览器访问 `http://127.0.0.1:4173/`

## Current Status

- Status: Completed
- Completed work:
  - 已确认上一任务 `20260522-start-website-dev-server` 已完成，不阻塞本次排查。
  - 已确认当前主页在应用内浏览器打开后显示 `展厅数据加载失败`，未进入详情内容。
  - 已复现真实上游接口 `GET http://127.0.0.1:48081/showroom/display/website-config` 当前返回 `SHOWROOM_TARGET_NOT_FOUND: live product preview asset source revision mismatch`。
  - 已定位并在上游 `IntRuoyi` 修复一条正式后端缺口：产品“保存并发布 / 直发”会推进 `current_revision_id`，但不会同步 live PRODUCT preview，导致 `product_001(id=1)` 的 preview 停留在旧 revision。
  - 已完成最小 live 数据修复：`product_001` preview 已对齐到 `1377`，`product_166(id=26)` 的公共映射已软删除。
  - 已确认当前阻塞已从 `preview asset source revision mismatch` 前移为 `SHOWROOM_TARGET_NOT_FOUND: live product preview asset is required`。
  - 已确认这不是 `Website` 前端回归：当前公共展厅映射里共有 `165` 个公开产品，其中 `164` 个没有任何已发布 PRODUCT preview，匿名 `website-config` 因缺少上游真实前置数据继续 fail-fast。
  - 已确认当前触发 500 的首个公共映射产品不是 `product_001`，而是同一展厅下按 `display_order=2` 排在其后的 `product_002(id=2)`；它的 `current_revision_id=1363`，但 `preview_source_revision_id` 为空。
  - 已接收新的同范围用户反馈：当前产品卡片与产品详情封面图应与 `IntRuoyi` 产品编辑页红框中的后台产品封面一致。
  - 已复核真实 `GET http://127.0.0.1:48081/showroom/display/website-config` 当前返回 `code=0`，但多个产品 `previewImageUrl` 仍指向同一张默认 preview 图。
  - 已确认 `Website` 根路径 kiosk 与 `/showroom` 当前都直接消费匿名展示契约中的 `previewImageUrl`，前端未自行拼接或替换封面字段。
  - 已联查 `IntRuoyi` showroom 运行时，确认产品展示图当前优先使用 live `preview asset`，只有 preview 缺失时才回退到后台 `cover_image`；这与当前用户要求不一致。
  - 已在上游 `IntRuoyi` showroom 匿名展示契约完成最小修复：产品展示图现在优先使用后台 `cover_image`，并通过定向后端 RED/GREEN 回归。
  - 已完成真实运行时重打包与重启：`GET http://127.0.0.1:48081/showroom/display/website-config` 当前首个产品 `product_001` 的 `previewImageUrl` 已切换为后台封面路径 `/admin-api/infra/file/28/get/showroom/product/cover/20260521/product-product_001-cover.png`。
  - 已用真实 Playwright 路径验证 `http://127.0.0.1:4173/`：首张产品卡片与点击后的产品详情首图都已显示同一后台产品封面。
- Remaining blockers:
  - None.
