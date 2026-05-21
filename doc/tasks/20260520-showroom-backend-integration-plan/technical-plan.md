# Showroom Backend Integration Technical Plan

## 1. Goal

让 `D:\ProjectPackage\Website` 的展厅前端不再以本地工作簿或硬编码数据为主，而是以 `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro` 的 showroom 后端模块为唯一业务数据源。

## 2. Current Evidence

### Website side

- 当前 `Website` 里已经同时存在两套前端：
  - kiosk 首页入口由 [src/main.js](D:/ProjectPackage/Website/src/main.js) 决定
  - 配置驱动的展厅控制台与展示层在 [src/app.js](D:/ProjectPackage/Website/src/app.js)、[src/config-workbook.js](D:/ProjectPackage/Website/src/config-workbook.js)
- 这说明 `Website` 目前更像一个纯前端展示仓，不持有后端服务，也不应该直接连接数据库。

### IntRuoyi backend side

- showroom 后端模块已经存在于 `yudao-module-showroom`
  - 管理接口入口：[ShowroomAdminController.java](D:/ProjectPackage/Int/IntRuoyi/ruoyi-vue-pro/yudao-module-showroom/src/main/java/cn/iocoder/yudao/module/showroom/controller/admin/ShowroomAdminController.java)
  - 公开展示接口入口：[ShowroomDisplayController.java](D:/ProjectPackage/Int/IntRuoyi/ruoyi-vue-pro/yudao-module-showroom/src/main/java/cn/iocoder/yudao/module/showroom/controller/display/ShowroomDisplayController.java)
  - 运行时聚合逻辑：[ShowroomApiRuntime.java](D:/ProjectPackage/Int/IntRuoyi/ruoyi-vue-pro/yudao-module-showroom/src/main/java/cn/iocoder/yudao/module/showroom/controller/ShowroomApiRuntime.java)
  - 持久化内容服务：[ShowroomPersistentContentService.java](D:/ProjectPackage/Int/IntRuoyi/ruoyi-vue-pro/yudao-module-showroom/src/main/java/cn/iocoder/yudao/module/showroom/content/service/ShowroomPersistentContentService.java)

### Source-of-truth tables

- 公司主表：[showroom_company](D:/ProjectPackage/Int/IntRuoyi/ruoyi-vue-pro/sql/showroom/20260519_showroom_v1_schema.sql)
- 公司修订表：`showroom_company_revision`
- 产品主表：`showroom_product`
- 产品修订表：`showroom_product_revision`
- 展厅表：`showroom_hall`
- 展厅产品映射表：`showroom_hall_product`
- 讲解版本表：`showroom_narration_version`
- 预览资产表：`showroom_preview_asset_version`

## 3. Key Conclusion

不要把“后台展厅页签”理解成要去读取后台页面本身。

正确做法是：

1. 后台页签继续编辑 IntRuoyi showroom 模块的数据。
2. IntRuoyi showroom 模块通过公开展示接口输出前台所需数据。
3. `Website` 只消费 HTTP API，不消费后台页面 DOM，不直连 MySQL，不再把 `.xlsx` 当主数据源。

## 4. Recommended Architecture

### Recommended option

以 IntRuoyi 为唯一源，新增一个面向 `Website` 的“前台聚合接口”。

建议新增：

- `GET /showroom/display/app-config`

由 `ShowroomApiRuntime` 在后端直接聚合公司、展厅、产品、图片、双语讲解文本、双语音频地址，输出成 `Website` 现在就能直接消费的配置形状。

### Why this is the preferred option

- `Website` 当前已经有一套“配置驱动渲染”模型，前端接一个完整配置对象最稳。
- 现有公开接口是拆分的：
  - `/showroom/display/home`
  - `/showroom/display/company`
  - `/showroom/display/hall/{hallId}`
  - `/showroom/display/product/{productId}`
  - `/showroom/display/narration`
- 如果前端直接拼这些接口，会产生明显的 N+1 请求、加载时序复杂度和错误处理分散问题。
- 聚合逻辑放在 IntRuoyi 后端更合理，因为它本来就掌握主数据、修订状态、live 版本、预览图和讲解版本的组合规则。

## 5. Target Contract

建议 `GET /showroom/display/app-config` 返回类似下面的结构：

```json
{
  "company": {
    "companyId": 1,
    "name": "盈泰医疗",
    "homeImageUrl": "/admin-api/infra/file/xx/get/...",
    "subtitleZh": "中文讲解稿",
    "subtitleEn": "English narration text",
    "audioZhUrl": "/admin-api/infra/file/xx/get/...",
    "audioEnUrl": "/admin-api/infra/file/xx/get/..."
  },
  "showrooms": [
    {
      "hallId": 1,
      "hallCode": "CARDIOLOGY",
      "name": "心内介入展厅",
      "description": "展厅简介",
      "previewImageUrl": "/admin-api/infra/file/xx/get/...",
      "products": [
        {
          "productId": 101,
          "productCode": "P-001",
          "nameCn": "导丝系统",
          "nameEn": "Guidewire System",
          "previewImageUrl": "/admin-api/infra/file/xx/get/...",
          "subtitleZh": "中文讲解稿",
          "subtitleEn": "English narration text",
          "audioZhUrl": "/admin-api/infra/file/xx/get/...",
          "audioEnUrl": "/admin-api/infra/file/xx/get/..."
        }
      ]
    }
  ]
}
```

## 6. Mapping Rules

### Company

- `name`
  - source: `showroom_company.display_name`
- `homeImageUrl`
  - source: `showroom_preview_asset_version`
  - target type: `COMPANY`
- `subtitleZh` / `audioZhUrl`
  - source: `showroom_narration_version`
  - target type: `COMPANY`
  - audience type: `PUBLIC`
  - language: `ZH`
- `subtitleEn` / `audioEnUrl`
  - source: `showroom_narration_version`
  - language: `EN`

### Showroom / hall

- `hallId`, `hallCode`, `name`, `description`
  - source: `showroom_hall`
- `previewImageUrl`
  - source: `showroom_preview_asset_version`
  - target type: `HALL`
- product membership and sort order
  - source: `showroom_hall_product`
  - ordered by `display_order`

### Product

- `productId`, `productCode`
  - source: `showroom_product`
- `nameCn`, `nameEn`
  - source: current or latest live row in `showroom_product_revision`
- `previewImageUrl`
  - preferred source: `showroom_preview_asset_version` with target type `PRODUCT`
  - fallback source in backend only: `showroom_product_revision.cover_image`
- `subtitleZh` / `audioZhUrl`
  - source: `showroom_narration_version`
  - target type: `PRODUCT`, audience `PUBLIC`, language `ZH`
- `subtitleEn` / `audioEnUrl`
  - source: `showroom_narration_version`
  - language `EN`

## 7. Backend Changes Needed

### Required

1. 在 `ShowroomDisplayController` 增加 `GET /showroom/display/app-config`
2. 在 `ShowroomApiRuntime` 增加聚合方法，把：
   - `displayHome`
   - `displayCompany`
   - `displayHall`
   - `displayProduct`
   - `displayNarration`
   的逻辑收敛成单次输出
3. 明确 live 版本选择规则：
   - 公司：必须使用 live company revision
   - 展厅：使用 active hall
   - 产品：优先 live product revision；如果业务明确允许草稿显示，再单独定义
4. 明确资源 URL 统一走 `fileUrl(...)`，不要让 `Website` 拼接文件路径

### Optional but recommended

5. 增加 `lastPublishedAt` / `revisionId` / `versionNo` 字段，便于前端缓存和排障
6. 增加 `etag` 或 `updatedAt`，便于 Website 做缓存失效

## 8. Website Changes Needed

1. 保留现有 config-driven 渲染结构，但把 `initialConfig` 来源从本地 `demoData.js` 改为远程 API
2. 新增一个 API adapter，例如：
   - `src/showroom-api.js`
3. 页面启动时拉取 `GET /showroom/display/app-config`
4. 把工作簿导入导出功能降级为：
   - 本地离线演示工具
   - 或后台初始化/迁移辅助工具
   - 不再作为生产主数据源
5. 对接失败时要 fail fast：
   - 接口不可达
   - live narration 缺失
   - hall/product 无发布数据
   都应明确显示错误，不要静默回退到本地假数据

## 9. Integration Boundary

### IntRuoyi owns

- 数据录入、审批、发布
- 公司/产品/展厅/讲解/预览图的业务规则
- 对外展示 API

### Website owns

- 页面结构、交互、播放体验
- API 适配与渲染
- 前端缓存和加载状态

## 10. Deployment / Runtime

如果 `Website` 与 `IntRuoyi` 不同域部署，必须提前解决：

1. API base URL 配置
2. CORS 或反向代理
3. 文件访问 `/admin-api/infra/file/...` 的跨域策略
4. 如果前台匿名访问公开展示接口，需要确认这些 `/showroom/display/*` 路由是否允许匿名，并限制只暴露公开内容

推荐做法：

- 由网关或 Nginx 反代：
  - `Website` 静态资源
  - `IntRuoyi /showroom/display/*`
  - `IntRuoyi /admin-api/infra/file/*`

这样前端无需处理复杂跨域。

## 11. Risks

1. 当前 `Website` 仓里存在 kiosk 根入口与配置驱动模块并存的情况，必须先决定最终前台入口是哪一个。
2. `showroom_narration_version` 和 `showroom_preview_asset_version` 依赖“已发布 live 数据”；如果后台只有草稿，前台会拿不到完整内容。
3. 目前没有在 `ruoyi-vue-pro/yudao-ui` 中检索到现成 showroom 管理前端源码，因此不要把“展厅页签页面实现”当成稳定依赖；应以后端接口与表结构为准。
4. 如果直接复用现有拆分接口而不做聚合，前台请求数量和状态管理复杂度会明显上升。

## 12. Recommended Rollout

### Phase 1

- 在 IntRuoyi 新增 `GET /showroom/display/app-config`
- 用真实 live 数据返回公司、展厅、产品、双语字幕和双语音频地址

### Phase 2

- `Website` 新增 API adapter
- 页面从远程 app-config 渲染
- 保留 workbook 模式作为本地调试入口，不作为默认入口

### Phase 3

- 增加联调验证：
  - `GET /showroom/display/app-config`
  - `Website` 本地真实渲染
  - 图片/音频可访问验证

## 13. Final Recommendation

推荐方案是：

- 不读取后台“页签页面”本身
- 不直连 IntRuoyi 数据库
- 不继续把 `.xlsx` 作为生产主数据源
- 由 IntRuoyi showroom 后端新增一个聚合型公开展示接口
- `Website` 仅消费这个聚合接口并负责前端展示

这是当前两仓结构下复杂度最低、边界最清晰、后续维护成本最低的方案。
