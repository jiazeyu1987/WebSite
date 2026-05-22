# Task: showroom-api 对齐 IntRuoyi 最新聚合接口

## Goal

将 `D:\ProjectPackage\Website\src\showroom-api.js` 与当前 `IntRuoyi` live `GET /showroom/display/website-config` 聚合接口 contract 对齐，并补齐相应测试与任务记录。

## Scope

- `D:\ProjectPackage\Website\src\showroom-api.js`
- `D:\ProjectPackage\Website\src\showroom-api.test.js`
- `D:\ProjectPackage\Website\doc\tasks\20260522-showroom-api-live-contract-sync\**`

## Non-Scope

- 不修改 `IntRuoyi` 代码或数据库
- 不修改 `showroom-app` / `medical-kiosk` 页面逻辑
- 不处理历史 mock/runtime 试验文件

## Milestones

1. 建立任务文档并探测 live `website-config` payload。
2. 按当前 live contract 收敛 `showroom-api.js`。
3. 补充并运行接口层测试。
4. 更新任务记录并单独提交本任务改动。

## Expected Verification

- `GET http://127.0.0.1:48081/showroom/display/website-config`
- `npm test -- --run src/showroom-api.test.js`

## Current Status

- Status: Completed
- Completed work:
  - 已确认 live `website-config` 返回 `code=0`
  - 已确认当前 `showroom-api.js` 主要字段名仍可映射 live payload
  - 已保留 `SHOWROOM_WEBSITE_CONFIG_ENDPOINT` 的本地覆盖入口
  - 已将 `src/showroom-api.test.js` fixture 对齐当前 live contract：`hall_01/hall_02`、空 description、公司英文字段可为空字符串
- Remaining blockers:
  - 无

## Final Verification Result

- PASS: `GET http://127.0.0.1:48081/showroom/display/website-config` -> `code=0`
- PASS: `npm test -- --run src/showroom-api.test.js`
