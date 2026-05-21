BDD: launcher restarts an existing website process -> Given the website dev server is already listening on port 4173 from this project / When the user runs `run-website.bat` / Then the script must stop the old website process and start a fresh one on the same port.

BDD: launcher still fails fast on unsafe port conflicts -> Given port 4173 is occupied by a non-website process / When the user runs `run-website.bat` / Then the script must stop and report that the occupied port cannot be restarted safely.

RED: `npx vitest run tests/run-website-bat.test.js` -> FAIL, `run-website.bat` did not yet contain restart-specific process inspection and stop logic.

GREEN: `npx vitest run tests/run-website-bat.test.js` -> PASS

GREEN: PowerShell restart verification against `run-website.bat` -> PASS, the batch script replaced the old listener PID `48792` with the new listener PID `60132` on port `4173`.

GREEN: `python C:\Users\BJB110\.codex\skills\bug-regression-fix-loop\scripts\validate_bug_regression.py --evidence doc/tasks/20260521-run-website-restart-launcher/bug-regression-evidence.md` -> PASS

GREEN: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-run-website-restart-launcher --mode preview` -> PASS, preview keeps `task.md` and `execution-log.md` and marks `bug-regression-evidence.md` as the cleanup candidate.

GREEN: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-run-website-restart-launcher --mode apply` -> PASS, `bug-regression-evidence.md` was deleted and only the core task records were kept.
