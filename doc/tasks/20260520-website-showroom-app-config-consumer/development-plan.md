# Development Plan: Website Showroom App Config Consumer

## Objective

将 `Website` 的展厅前端改造成一个纯消费端：

- 从 `IntRuoyi` showroom 聚合接口取数据
- 在前端完成渲染、交互、播放与错误展示
- 不在运行时依赖本地 Excel 或硬编码业务数据

## Owned Files

- `src/main.js`
- `src/app.js`
- `src/demoData.js`
- `src/admin-console.js`
- `src/config-schema.js`
- `src/config-workbook.js`
- 新增 `src/showroom-api.js` 或同类 adapter 文件
- `tests/**`

## Phase Plan

### Phase W1: Freeze entry strategy

- 保持当前 kiosk 根入口不被误替换。
- 为 showroom 集成路径定义明确入口：
  - 单独 route
  - 单独 mount page
  - 或受控环境开关
- 未完成联调前，不直接切换线上根入口。

### Phase W2: Build backend contract adapter

- 定义 app-config 响应类型。
- 把后端 JSON 映射成 `createShowroomApp` 可消费的前端结构。
- 所有字段校验必须 fail fast：
  - 缺 company
  - 缺 hall
  - 缺 product
  - 缺字幕
  - 缺音频 URL
  - 缺图片 URL

### Phase W3: Remote loading and rendering

- 首屏加载远程 app-config。
- 显示 loading、success、error 三种状态。
- 禁止运行时回退到本地 demo 数据。
- 公司主页、展厅页、产品页只消费远程数据。

### Phase W4: Frontend verification

- 单测覆盖：
  - contract mapping
  - 缺字段报错
  - 页面切换
- 浏览器验证覆盖：
  - 正常加载
  - 公司页
  - 展厅页
  - 产品页
  - 音频与图片元素可见
  - 后端不可用时报错

### Phase W5: Final cross-repo integration test

- 使用真实 `IntRuoyi` runtime，而不是本地拦截数据。
- 验证：
  - `Website` 能加载真实 app-config
  - 公司图片与双语音频可访问
  - 展厅列表顺序与后端一致
  - 产品详情与讲解文本来自真实后端

## Acceptance Criteria

- `Website` 不再以本地工作簿作为生产运行主数据源。
- 前端展示数据全部来自 `IntRuoyi` app-config 接口。
- 运行时缺少接口或接口字段异常时，页面明确报错。
- kiosk 根入口不被无意替换。
- 联调阶段真实浏览器路径通过。

## Final Integration Test

前置条件：

- `IntRuoyi` 任务已交付并部署可访问 runtime
- app-config 接口字段冻结
- 文件访问与跨域策略可用

联调检查项：

1. `Website` 打开真实入口
2. 请求 `GET /showroom/display/app-config`
3. 公司主页渲染成功
4. 展厅切换成功
5. 产品详情、双语字幕、双语音频 URL 渲染成功
6. 任一关键字段缺失时明确报错
