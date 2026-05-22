# Task: 修复 showroom app-config 目标版本不匹配

## Goal

修复 `D:\ProjectPackage\Website` 在 `/showroom` 真实运行时加载展厅配置失败的问题，定位并消除导致 `SHOWROOM_TARGET_NOT_FOUND` 的前端回归或配置错误，确保页面能按当前后端可用 contract 正常拉取并渲染公司展厅数据。

## Scope

- `D:\ProjectPackage\Website\src\**`
- `D:\ProjectPackage\Website\tests\**`
- `D:\ProjectPackage\Website\doc\tasks\20260522-showroom-app-config-target-mismatch\**`

## Non-Scope

- 不主动改动 `IntRuoyi` 后端实现，除非排查证明本仓库无前端问题且必须记录后端阻塞。
- 不新增 fallback、mock 成功路径或兼容分支。
- 不改动与本次缺陷无关的移动端样式和交互。

## Dependencies

- 本地 `vite` 开发/预览服务可启动并访问 `/showroom`。
- 匿名 `GET /showroom/display/app-config` 真实链路可从当前环境访问。
- Playwright / Vitest 可运行，用于复现与回归验证。

## Milestones

1. 建立任务记录，复现 `/showroom` app-config 加载失败并记录根因线索。
2. 先写失败回归测试，覆盖错误目标参数或错误请求构造。
3. 实施最小修复并完成定向测试与真实运行验证。
4. 更新任务证据、完成收尾与提交。

## Expected Verification

- `npm test -- src/showroom-api.test.js`
- `npx playwright test tests/showroom-app.spec.js --reporter=line`
- 真实浏览器访问 `http://127.0.0.1:4173/showroom` 或等效本地运行地址

## Current Status

- Status: Blocked
- Completed work:
  - 已确认上一条 `doc/tasks` 任务已完成，可创建新任务。
  - 已初步定位错误链路位于 `/showroom` 启动加载 `GET /showroom/display/app-config` 阶段。
  - 已复现真实运行时失败：`http://127.0.0.1:4173/showroom/display/app-config` 与 `http://127.0.0.1:48081/showroom/display/app-config` 都返回 `SHOWROOM_TARGET_NOT_FOUND: live company ZH narration source revision mismatch`。
  - 已验证 Website 侧定向测试通过：`npm test -- --run src/showroom-api.test.js src/showroom-app.test.js`。
  - 已只读核查本地 IntRuoyi 运行库：`showroom_company.id=1` 的 `current_revision_id=7`，但公开 `PUBLISHED` 的公司中英文 narration 仍指向 `source_revision_id=5/6`，公司 preview 仍指向 `source_revision_id=5`。
  - 已确认 hall 映射产品侧 preview 与中英文 narration 当前均与各自 `current_revision_id` 对齐，本次阻塞集中在 company live 数据。
- Remaining blockers:
  - 当前阻塞不是 Website 前端 contract 或请求构造错误，而是 `IntRuoyi` 本地 live company preview / narration 数据与当前 company revision 不一致；在后端数据修复前，`/showroom` 无法成功加载。
  - `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro` 当前最新任务 `20260522-electronic-batch-record-report-visual-fidelity-optimization` 仍处于 `In Progress`，若要按同仓规范继续启动新的后端修复任务，需要先在该仓库完成或显式阻塞前一任务。

## Final Verification Result

- FAIL: `Invoke-WebRequest http://127.0.0.1:4173/showroom/display/app-config` -> `{"success":false,"message":"SHOWROOM_TARGET_NOT_FOUND: live company ZH narration source revision mismatch","code":500,...}`
- FAIL: `Invoke-WebRequest http://127.0.0.1:48081/showroom/display/app-config` -> `{"success":false,"message":"SHOWROOM_TARGET_NOT_FOUND: live company ZH narration source revision mismatch","code":500,...}`
- PASS: `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js`
