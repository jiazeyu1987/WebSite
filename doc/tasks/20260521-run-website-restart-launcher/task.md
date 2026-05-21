# Task: Run Website Launcher Restart Behavior

## Goal

Update `run-website.bat` so it restarts the website launcher flow: if the current website process is already running, stop it first and then start a fresh dev server.

## Scope

- `D:\ProjectPackage\Website\run-website.bat`
- `D:\ProjectPackage\Website\tests\run-website-bat.test.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-run-website-restart-launcher\**`

## Non-Scope

- Frontend application code, kiosk UI, or showroom UI.
- Package scripts, port numbers, or build output paths.
- Support for restarting unrelated processes that are not this website launcher.

## Dependencies

- `run-website.bat` must continue to target `http://127.0.0.1:4173/`.
- Windows `npm`, `node_modules`, `netstat`, `taskkill`, and `powershell` must remain available.
- The restart flow must still fail fast if port `4173` is occupied by a non-website process.

## Milestones

1. Record the restart requirement and reproduce the current launcher behavior that exits on an occupied port.
2. Add failing regression coverage for restart-specific batch logic.
3. Implement the smallest safe restart flow in `run-website.bat`.
4. Run targeted verification, update evidence, and run closeout preview.

## Expected Verification

- `npx vitest run tests/run-website-bat.test.js`
- PowerShell restart verification against `run-website.bat`
- `python C:\Users\BJB110\.codex\skills\bug-regression-fix-loop\scripts\validate_bug_regression.py --evidence doc/tasks/20260521-run-website-restart-launcher/bug-regression-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-run-website-restart-launcher --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - Confirmed the current `run-website.bat` exited immediately when port `4173` was already listening.
  - Reproduced the missing restart capability from the existing occupied-port error branch.
- Verification evidence:
  - `D:\ProjectPackage\Website\run-website.bat`
  - `D:\ProjectPackage\Website\tests\run-website-bat.test.js`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - Tightened `tests/run-website-bat.test.js` so the batch file must now include safe process inspection, targeted `taskkill`, and restart messaging.
- Verification evidence:
  - `D:\ProjectPackage\Website\tests\run-website-bat.test.js`
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - Added safe restart logic to `run-website.bat`: inspect the listener on `4173`, stop it only when it is this project's node/vite dev server, and fail fast on unrelated port conflicts.
- Verification evidence:
  - `D:\ProjectPackage\Website\run-website.bat`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - Ran the targeted batch-file test, a real restart verification that replaced one live `4173` listener PID with another, and task evidence validation.
- Verification evidence:
  - `npx vitest run tests/run-website-bat.test.js`
  - PowerShell restart verification -> `PASS old_listener_pid=48792 new_listener_pid=60132`
  - `python C:\Users\BJB110\.codex\skills\bug-regression-fix-loop\scripts\validate_bug_regression.py --evidence doc/tasks/20260521-run-website-restart-launcher/bug-regression-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-run-website-restart-launcher --mode preview`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-run-website-restart-launcher --mode apply`
- Remaining blockers:
  - None.

## Current Status

Completed.
- Completed work:
  - `run-website.bat` now restarts the current website process instead of failing immediately when the project's dev server is already listening on `4173`.
  - The launcher still fails fast when `4173` is occupied by a non-website process.
  - Task closeout cleanup has been applied and the bug-regression evidence file has been removed.
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npx vitest run tests/run-website-bat.test.js`
- PASS: PowerShell restart verification against `run-website.bat`
- PASS: `python C:\Users\BJB110\.codex\skills\bug-regression-fix-loop\scripts\validate_bug_regression.py --evidence doc/tasks/20260521-run-website-restart-launcher/bug-regression-evidence.md`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-run-website-restart-launcher --mode preview`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-run-website-restart-launcher --mode apply`
