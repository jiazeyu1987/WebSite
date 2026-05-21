# Task: Website 与 IntRuoyi 关系排查

## Goal

梳理 `D:\ProjectPackage\Website` 当前与 `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro` 的实际关系，确认是否已经存在统一接口，以及该接口覆盖到哪些前端路径。

## Milestones

1. 检索仓库内所有 `IntRuoyi`、`showroom`、`app-config` 相关代码与文档。
2. 核对当前前端入口、运行时 API 适配层、代理配置与测试证据。
3. 输出当前关系、统一接口现状、已接入范围与未统一范围。

## Expected Verification

- 代码引用可追溯到当前仓库文件
- 结论与现有任务文档、测试或运行配置一致

## Current Status

- Status: Completed
- Completed work:
  - 已定位历史集成规划任务与当前前端接口代码。
  - 已核对 `src/main.js`、`src/showroom-api.js`、`src/showroom-app.js`、`src/medical-kiosk.js`、`vite.config.js` 与现有测试/任务文档。
  - 已确认 Website 与 IntRuoyi 通过匿名 HTTP 接口集成，而不是直接共享数据库或后端代码。
  - 已确认当前统一接口为 `GET /showroom/display/app-config`，并识别出其实际消费范围与未统一范围。
- Remaining blockers:
  - None.
