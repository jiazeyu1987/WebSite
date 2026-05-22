# Task: 启动 Website 当前程序

## Goal

启动 `D:\ProjectPackage\Website` 当前本地程序，确保开发服务按仓库既定入口正常运行，并保留 fail-fast 行为。

## Scope

- `D:\ProjectPackage\Website\run-website.bat`
- `D:\ProjectPackage\Website\doc\tasks\20260522-start-website-dev-server\**`

## Non-Scope

- 不修改前端业务代码、样式或接口消费逻辑
- 不修改 `IntRuoyi` 后端代码或数据库
- 不新增 fallback、mock 成功路径或兼容分支

## Dependencies

- `package.json`、`node_modules`、`npm`、`powershell` 可用
- 端口 `4173` 未被非本项目进程占用，或可由 `run-website.bat` 安全重启当前站点进程

## Milestones

1. 检查上一任务状态并建立本次任务记录。
2. 核对本地启动入口与前置条件，记录启动前验证。
3. 启动当前程序并验证 `http://127.0.0.1:4173/` 可访问。
4. 更新任务状态、记录验证证据，并执行收尾清理预览。

## Expected Verification

- `Invoke-WebRequest http://127.0.0.1:4173/`
- 端口 `4173` 存在本项目 `node/vite` 监听进程

## Current Status

- Status: Completed
- Completed work:
  - 已确认最近相关任务 `20260522-kiosk-company-detail-reference-reflow` 与 `20260522-kiosk-company-detail-image-icon-cards` 已完成，不阻塞本次仅启动程序任务。
  - 已确认当前仓库启动入口为 `D:\ProjectPackage\Website\run-website.bat`，内部通过 `npm run dev -- --host 127.0.0.1 --port 4173 --strictPort` 启动 Vite。
  - 已确认启动前 `http://127.0.0.1:4173/` 已返回 `HTTP 200`，且监听进程为当前仓库 `vite`，PID `33372`。
  - 已通过 `run-website.bat` 执行一次安全重启，原监听 PID `33372` 已被脚本停止并替换为新的当前仓库 `vite` 监听 PID `35868`。
  - 已验证重启后首页 `http://127.0.0.1:4173/` 返回 `HTTP 200`，页面标题为 `介入医疗产品切换 Demo`。
  - 已执行 `task-closeout-cleanup` 预览，确认本任务仅 `launcher-stdout.log` 与 `launcher-stderr.log` 属于可清理附属产物；因站点进程仍在运行，当前仅保留预览结果，不执行删除。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `run-website.bat` -> 安全停止旧的当前仓库站点进程 `PID 33372` 并重新拉起新进程
- PASS: `netstat -ano | findstr /r /c:":4173 .*LISTENING"` -> `PID 35868`
- PASS: `Invoke-WebRequest http://127.0.0.1:4173/` -> `HTTP 200`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-start-website-dev-server --mode preview`
