# Task: Showroom Last Opened Hall Persistence

## Goal

让 `D:\ProjectPackage\Website\src\showroom-app.js` 在用户离开前端后记住当前打开的展厅，并在下次重新打开 `/showroom` 时自动恢复到该展厅页面。

## Scope

- `D:\ProjectPackage\Website\src\showroom-app.js`
- `D:\ProjectPackage\Website\src\showroom-app.test.js`
- `D:\ProjectPackage\Website\tests\showroom-app.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260520-showroom-last-opened-hall\**`

## Non-Scope

- 不修改后端 showroom app-config contract。
- 不修改 kiosk 根入口与其他业务页面。
- 不引入本地假数据或额外 fallback 分支。

## Dependencies

- `/showroom` 路径继续使用现有前端入口。
- 浏览器运行环境必须提供 `localStorage`，用于持久化当前展厅状态。
- 现有 showroom app-config contract 继续返回至少一个合法展厅。

## Milestones

1. 确认当前展厅状态切换点与恢复插入点，补齐任务文档和 BDD 场景。
2. 先写失败测试，覆盖“记住最后一次关闭时打开的展厅，并在下次启动时自动恢复”。
3. 以最小实现补齐前端持久化与恢复逻辑，不改变现有失败快报行为。
4. 运行单测、构建与浏览器路径验证，更新任务记录并完成 closeout preview。

## Expected Verification

- `npm test -- --run src/showroom-app.test.js`
- `npm run build`
- `npx playwright test tests/showroom-app.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260520-showroom-last-opened-hall/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-showroom-last-opened-hall --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已定位 `src/showroom-app.js` 为展厅切换与初始化主入口。
  - 已确认存在 `Vitest` 与 `Playwright` 两条验证路径可复用。
- Verification evidence:
  - `src/showroom-app.js`
  - `src/showroom-app.test.js`
  - `tests/showroom-app.spec.js`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - 已补充 BDD 场景与 RED 测试，覆盖“记住上次关闭时打开的展厅并在下次启动时自动恢复”。
  - 已将测试夹具扩展为双展厅，确保恢复行为可观察。
- Verification evidence:
  - `src/showroom-app.test.js`
  - `tests/showroom-app.spec.js`
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - 已在 `src/showroom-app.js` 中加入基于 `localStorage` 的视图与展厅 id 持久化。
  - 已在远程配置加载完成后恢复上次展厅，并保持无记忆状态时的公司首页默认行为。
- Verification evidence:
  - `src/showroom-app.js`
  - `npm test -- --run src/showroom-app.test.js`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - 已完成单测、构建、浏览器重载路径验证与前端证据文档整理。
- Verification evidence:
  - `npm run build`
  - `npx playwright test tests/showroom-app.spec.js --reporter=line`
  - `doc/tasks/20260520-showroom-last-opened-hall/frontend-feature-evidence.md`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 已完成展厅记忆与自动恢复能力。
  - 已完成单测、构建与浏览器路径验证。
- Remaining blockers:
  - None.

## Cleanup Candidates

- `doc/tasks/20260520-showroom-last-opened-hall/frontend-feature-evidence.md`

## Final Verification Result

- PASS: `npm test -- --run src/showroom-app.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test tests/showroom-app.spec.js --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260520-showroom-last-opened-hall/frontend-feature-evidence.md`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-showroom-last-opened-hall --mode preview`
