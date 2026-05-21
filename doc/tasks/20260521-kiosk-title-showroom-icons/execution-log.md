BDD: kiosk hall title shows the matching showroom svg icon -> Given the medical kiosk title strip is switched to one of the seven showroom categories / When the active title is rendered / Then the title text should include the matching Excel-sourced SVG icon for that category and only one active icon should be present.

BDD: kiosk home title remains text-only -> Given the medical kiosk is on the home category / When the title strip is rendered / Then the home title should remain text-only and should not render a showroom icon.

RED: `npm test -- --run src/medical-kiosk.test.js` -> FAIL, new showroom-title icon test asserts one `[data-active-category-icon]` after switching away from home, but the current title strip still renders text only and returns count `0`.

INFO: Moved the title-icon regression coverage into dedicated `src/medical-kiosk-title-icons.test.js` so this task can verify the title-strip icon behavior without changing unrelated legacy tests in `src/medical-kiosk.test.js`.

INFO: Copied the seven Excel-mapped hall `icon-default.svg` assets into `public/kiosk-hall-icons/` and mapped the current `prefabrication` title to the Excel row that points to the medical-standard-parts hall icon, without renaming the existing title text.

GREEN: `npm test -- --run src/medical-kiosk-title-icons.test.js` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test tests/kiosk-gallery.spec.js --reporter=line` -> PASS

GREEN: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-title-showroom-icons/frontend-feature-evidence.md` -> PASS

GREEN: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-title-showroom-icons --mode preview` -> PASS
