BDD: Showroom remembers the last opened hall -> Given a user previously closed the frontend while a showroom hall page was open / When the user opens `/showroom` again with the same browser storage / Then the frontend must automatically restore that hall instead of the company homepage.

BDD: Company homepage remains the default without remembered showroom state -> Given no remembered showroom state exists in browser storage / When the user opens `/showroom` / Then the frontend must keep the current company-home first-load behavior.

RED: `npm test -- --run src/showroom-app.test.js` -> FAIL, `createShowroomConsumerApp` reloaded `/showroom` back to the company homepage, so the second boot never restored remembered hall `12`.

GREEN: `npm test -- --run src/showroom-app.test.js` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test tests/showroom-app.spec.js --reporter=line` -> PASS

GREEN: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260520-showroom-last-opened-hall/frontend-feature-evidence.md` -> PASS

GREEN: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-showroom-last-opened-hall --mode preview` -> PASS, preview keeps `task.md` and `execution-log.md`, and marks `frontend-feature-evidence.md` as the only cleanup candidate.
