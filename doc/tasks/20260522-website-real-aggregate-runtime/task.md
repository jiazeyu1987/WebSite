# Task: Website 切回真实聚合接口运行时

## Goal

将 `D:\ProjectPackage\Website` 本地环境从 mock 聚合接口切回真实 `IntRuoyi` 聚合接口运行时，并保留 fail-fast 行为。

## Scope

- `D:\ProjectPackage\Website\.env.local`
- `D:\ProjectPackage\Website\doc\tasks\20260522-website-real-aggregate-runtime\**`

## Non-Scope

- 不修改 `IntRuoyi` 代码或数据库
- 不恢复旧接口消费路径
- 不回退到 mock 作为运行时兜底

## Milestones

1. 建立任务记录。
2. 关闭本地 mock 聚合接口开关。
3. 探测真实 `website-config` 聚合接口可用性并记录结果。

## Expected Verification

- `GET http://127.0.0.1:48081/showroom/display/website-config`
- `Website` 本地环境不再指向 `/mock/showroom-display-website-config.json`

## Current Status

- Status: Completed
- Completed work:
  - 已将本地环境切回真实聚合接口，不再指向 mock JSON
  - 已确认真实聚合接口 `GET http://127.0.0.1:48081/showroom/display/website-config` 返回 `code=0`
  - 已确认 `Website` 在真实接口下可正常渲染 `/showroom` 公司详情与根 `/` kiosk 产品详情
- Remaining blockers:
  - 当前公司 `bilingualPublicFields[].valueEn` 仍为空字符串，运行态仅证明 contract 可用，未证明公司英文详情正文已填满

## Final Verification Result

- PASS: `GET http://127.0.0.1:48081/showroom/display/website-config` -> `code=0`
- PASS: `http://127.0.0.1:4173/showroom` -> `data-load-state="ready"`，公司详情字段数 `7`
- PASS: `http://127.0.0.1:4173/` -> `data-load-state="ready"`，进入首个展厅后可打开产品详情，详情行数 `4`
