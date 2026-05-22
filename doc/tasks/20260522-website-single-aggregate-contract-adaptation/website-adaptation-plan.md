# Website 适配 IntRuoyi 单一聚合接口说明

## 目标

当 `IntRuoyi` 按最新 PRD 改成“单一聚合接口，产品详情正文一起返回，旧接口删除”后，`Website` 应从当前的“多接口消费”切换成“只消费一个聚合接口”。

## 当前 Website 现状

当前 `Website` 主要依赖这些接口与适配点：

- `src/showroom-api.js`
  - `SHOWROOM_APP_CONFIG_ENDPOINT = "/showroom/display/app-config"`
  - `SHOWROOM_COMPANY_DETAIL_ENDPOINT = "/showroom/display/company"`
  - `SHOWROOM_PRODUCT_DETAIL_ENDPOINT_PREFIX = "/showroom/display/product/"`
- `src/showroom-app.js`
  - `/showroom` 当前只消费 `app-config` 公司区块
- `src/medical-kiosk.js`
  - 根 `/` kiosk 先消费 `app-config` 得到公司、展厅、产品卡片
  - 再在打开产品详情时请求 `display/product/{id}`

也就是说，当前 `Website` 仍是“两段式取数”：

1. `app-config` 拿列表和公司
2. `display/product/{id}` 拿产品详情正文

## 新接口落地后的总原则

`Website` 需要改成：

- 只请求一个聚合接口
- 不再调用 `display/company`
- 不再调用 `display/product/{id}`
- 所有页面状态都从同一份聚合 payload 渲染

## 需要修改的文件

### 1. `src/showroom-api.js`

这是最核心的接口适配层，需要做这些改动：

- 删除旧常量：
  - `SHOWROOM_APP_CONFIG_ENDPOINT`
  - `SHOWROOM_COMPANY_DETAIL_ENDPOINT`
  - `SHOWROOM_PRODUCT_DETAIL_ENDPOINT_PREFIX`
- 新增一个新常量，例如：
  - `SHOWROOM_WEBSITE_CONFIG_ENDPOINT = "/showroom/display/website-config"`
- 删除这些旧 fetch / map 入口：
  - `fetchShowroomCompanyDetailPayload`
  - `fetchShowroomProductDetailPayload`
  - `fetchShowroomCompanyDetail`
  - `fetchShowroomProductDetail`
  - `mapShowroomCompanyDetail`
  - `mapShowroomProductDetail`
- 保留并重写一个新的聚合 mapper，例如：
  - `mapShowroomWebsiteConfig`
  - 它要一次把公司、展厅、产品卡片、产品详情正文都映射到 `Website` 内部结构

建议新的内部结构至少包含：

- `company`
  - `id`
  - `name`
  - `nameEn`
  - `homeImage`
  - `subtitleZh`
  - `subtitleEn`
  - `audioZh`
  - `audioEn`
  - `bilingualPublicFields`
- `showrooms`
  - `id`
  - `code`
  - `name`
  - `nameEn`
  - `description`
  - `descriptionEn`
  - `previewImageUrl`
  - `products`
- `products` 中每个产品除了当前卡片字段外，还要直接带：
  - `bilingualPublicFields`

这样 `Website` 就不需要再按 `productId` 补第二次请求。

### 2. `src/medical-kiosk.js`

这是根 `/` kiosk 的主要改造点。

当前逻辑里：

- 初次加载读 `app-config`
- 点产品卡片后再调用 `loadProductDetail(productId)`

改造后应变成：

- 初次加载一次性拿到所有展厅、产品卡片、产品详情正文
- 点产品卡片时直接从已加载的聚合数据中取详情
- 删除对 `loadProductDetail` 的依赖

具体修改点：

- 删除或废弃 `loadProductDetail` 相关状态：
  - `productDetailLoadState`
  - `productDetailErrorMessage`
  - `productDetailData` 的“异步加载”语义
- 改为在初始 config 中就能按 `product.id` 找到详情正文
- 在产品详情页渲染时，直接使用产品对象上的：
  - `bilingualPublicFields`
  - `subtitleZh/subtitleEn`
  - `audioZh/audioEn`

建议新增一个本地查找函数，例如：

- `findProductDetailFromConfig(config, productId)`

但它不做网络请求，只在内存数据里查。

### 3. `src/showroom-app.js`

`/showroom` 当前主要展示公司入口和公司详情。

如果 `IntRuoyi` 聚合接口已经包含公司详情双语字段：

- 这里仍然只需要消费一个新聚合接口
- 不再保留任何“未来可能再请求 company detail”的接口预留

主要改动：

- 把 `loadAppConfig` 语义改成 `loadWebsiteConfig`
- 所有公司详情字段都从聚合 payload 的 `company` 里读取
- 继续使用 `company.bilingualPublicFields` 渲染详情字段

### 4. `src/showroom-api.test.js`

这个文件要从“测试三个接口 mapper”改成“测试一个聚合接口 mapper”。

需要调整为：

- 删除 `mapShowroomCompanyDetail` 测试
- 删除 `mapShowroomProductDetail` 测试
- 保留一个大的 `mapShowroomWebsiteConfig` 测试

重点验证：

- 公司双语字段正确映射
- 展厅顺序正确保留
- 每个展厅下产品映射正确保留
- 产品详情正文已随聚合 payload 一起映射
- 缺失 `bilingualPublicFields` 时 fail fast

### 5. `src/medical-kiosk.test.js`

这里要改的是“测试不再依赖二次请求”：

- 删除对 `loadProductDetail` mock 的依赖
- 测试应改成：
  - 初始 `loadWebsiteConfig` 就返回带产品详情正文的 payload
  - 点击产品卡片后直接进入详情页
  - 不再断言额外请求 `productId`

新增或保留的核心断言：

- 英文模式下，产品详情字段使用英文 `label/value`
- 中文模式下，产品详情字段使用中文 `label/value`
- 缺英文值时英文字段不显示，不回退中文

### 6. `src/showroom-app.test.js`

这里仍主要验证公司详情，但接口入口要改成新聚合接口 mock。

需要确认：

- `/showroom` 仍只消费一个接口
- 公司详情双语字段来自聚合 payload
- 语言切换时字段和值同步切换

### 7. `tests/kiosk-detail.spec.js`

E2E 里当前会 mock：

- `app-config`
- `display/product/101`

改造后应只 mock：

- 新的单一聚合接口

测试路径保持不变，但断言要体现：

- 点产品卡片后无需第二个接口
- 英文详情字段和音频一起切换

### 8. `tests/showroom-app.spec.js`

同样从 mock `app-config` 改成 mock 新聚合接口即可。

## 需要删除的 Website 侧旧依赖

当 `IntRuoyi` 单一聚合接口稳定后，`Website` 侧应删除这些接口依赖：

- `GET /showroom/display/app-config`
- `GET /showroom/display/company`
- `GET /showroom/display/product/{id}`

注意：这里说的是 `Website` 不再依赖它们。  
至于 `IntRuoyi` 是否物理删除旧接口，取决于它自己的前端是否已全部迁移完。

## 推荐改造顺序

1. 先改 `src/showroom-api.js`
   - 建立新的聚合 mapper
2. 再改 `src/medical-kiosk.js`
   - 去掉二次产品详情请求
3. 再改 `src/showroom-app.js`
   - 统一到新聚合接口
4. 最后改测试
   - `vitest`
   - `playwright`

## 改造完成后的目标状态

完成后，`Website` 应满足：

- 只读一个 `IntRuoyi` 匿名聚合接口
- 公司、展厅、产品卡片、产品详情正文、双语讲解全部来自这一份 payload
- 不再请求第二个产品详情接口
- 不再从客户端拼装英文正文
- 不再回退中文冒充英文

## 当前最重要的注意点

即使接口结构已经够了，真实英文效果仍取决于 `IntRuoyi` live 数据本身：

- 如果公司 `valueEn` 为空，`Website` 现在会正确显示为空/不展示
- 这不是 `Website` bug，而是后端内容数据尚未补齐
