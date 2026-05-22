# Task: 展厅产品可见范围排查

## Goal

排查 `Website` 当前展厅页为什么只显示少量产品，明确：

- 前台实际从 `IntRuoyi` 取到多少展厅与多少产品；
- `IntRuoyi` 当前已发布产品总量与展厅映射产品量的差异；
- 差异是来自接口 contract、展厅映射、还是产品发布状态。

## Scope

- `D:\ProjectPackage\Website\doc\tasks\20260522-showroom-product-visibility-investigation\**`
- 只读检查 `D:\ProjectPackage\Website\src\showroom-api.js`
- 只读检查 `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\yudao-module-showroom\**`
- 只读探针本地 `IntRuoyi` 运行时与只读数据库

## Non-Scope

- 不修改前后端代码
- 不写入 `IntRuoyi` 数据库
- 不调整展厅映射或产品发布状态

## Milestones

1. 建立任务文档并确认前台取数链。
2. 读取真实 `website-config` payload，统计展厅数和前台可见产品数。
3. 只读核对 `IntRuoyi` 数据层中的已发布产品与展厅映射数量。
4. 输出差异原因与下一步建议。

## Expected Verification

- `GET http://127.0.0.1:48081/showroom/display/website-config`
- 只读统计本地 `IntRuoyi` 展厅映射与产品发布数据

## Current Status

- Status: Completed
- Completed work:
  - 已确认前台只消费 `GET /showroom/display/website-config`
  - 已确认后端按 `hall.productMappings()` 组装前台可见产品
  - 已确认真实 `website-config` 当前返回 `8` 个展厅、`8` 个可见产品，且每个展厅当前仅映射 `1` 个产品
  - 已确认本地 `IntRuoyi` 数据库当前共有 `191` 个产品快照、`188` 个有 current revision 的产品、`321` 条 `PUBLISHED` 产品版本
  - 已确认前台“产品很少”不是因为接口漏拉全部已发布产品，而是因为展厅映射表 `showroom_hall_product` 当前只配置了 `8` 条映射
- Remaining blockers:
  - 无

## Final Verification Result

- PASS: `GET http://127.0.0.1:48081/showroom/display/website-config` -> `hallCount=8`, `visibleProductCount=8`, `distinctProductCount=8`
- PASS: 只读 MySQL 统计：
  - `showroom_hall = 8`
  - `showroom_hall_product = 8`
  - `showroom_product = 191`
  - `showroom_product.current_revision_id IS NOT NULL = 188`
  - `showroom_product_revision.status='PUBLISHED' = 321`
