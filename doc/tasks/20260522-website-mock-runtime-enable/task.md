# Task: Website 启用本地 mock 聚合接口运行时

## Goal

让 `D:\ProjectPackage\Website` 在不依赖 `IntRuoyi` 后端运行态的前提下，直接通过本地 mock 数据跑起 `/showroom` 与根 `/` kiosk 的聚合接口消费链。

## Scope

- `D:\ProjectPackage\Website\vite.config.js`
- `D:\ProjectPackage\Website\src\**` 中与 mock 聚合数据直接相关的文件
- `D:\ProjectPackage\Website\doc\tasks\20260522-website-mock-runtime-enable\**`

## Non-Scope

- 不修改 `IntRuoyi` 代码或数据库
- 不恢复旧接口消费路径
- 不新增非 mock 场景下的 fallback

## Milestones

1. 建立任务记录并明确只做 Website 本地 mock 运行时。
2. 提供本地 mock 聚合 payload 与开发服务器 mock 接口。
3. 启动并验证 `/showroom/display/website-config` 可直接返回 mock 数据。
4. 验证页面可在 mock 模式下正常加载。

## Expected Verification

- `Invoke-WebRequest http://127.0.0.1:4173/showroom/display/website-config`
- 浏览器访问 `http://127.0.0.1:4173/` 与 `http://127.0.0.1:4173/showroom`

## Current Status

- Status: Completed
- Completed work:
  - 已建立本次 mock runtime 任务记录。
  - 已新增本地聚合 mock 数据文件 `public/mock/showroom-display-website-config.json`。
  - 已通过 `.env.local` 将 `Website` 本地聚合接口入口切到静态 mock JSON。
  - 已确认本地开发服务可直接返回 mock 聚合接口数据，不再依赖 `IntRuoyi` 的 `48081`。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `curl http://127.0.0.1:4173/mock/showroom-display-website-config.json`
- PASS: `curl -I http://127.0.0.1:4173/showroom`
- PASS: `curl -I http://127.0.0.1:4173/`
