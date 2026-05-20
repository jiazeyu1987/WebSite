BDD: Initial runnable demo baseline -> Given an empty workspace and Node.js installed / When the frontend demo scaffold is created and dependencies are installed / Then the demo should run, build, and expose a switchable reference-style page without backend dependencies

BDD: Category switching behavior -> Given the demo page is loaded / When the user selects a top category tab / Then the product grid and explanation panel should update to that category and the active tab should be visibly highlighted

BDD: Honest resource reporting -> Given exact product photography and brand assets are unavailable / When the demo is delivered / Then the missing assets should be listed explicitly instead of being silently fabricated as final production resources

RED: npm test -- --run -> FAIL, missing ./demoData.js and ./app.js modules for the category switching demo

GREEN: npm test -- --run -> PASS

GREEN: npm run build -> PASS

GREEN: Playwright local browser smoke check against http://127.0.0.1:4173 -> PASS

GREEN: .gitignore follow-up update -> PASS, frontend demo ignore rules now cover build output, cache, coverage, and log files

BDD: Full-bleed replica refinement -> Given the reference image uses no outer frame and a dense full-stage composition / When the desktop demo is rendered / Then the navigation icons should use a thin outline style, the legacy gallery heading block should be removed, and the content should fill the viewport without large left, right, or bottom gaps

RED: npm test -- --run -> FAIL, full-bleed layout markers and outline tab icon markers were not present in the old page structure

GREEN: npm test -- --run -> PASS

GREEN: npm run build -> PASS

GREEN: Playwright viewport verification screenshot output/playwright/full-bleed-home-v4.png -> PASS

BDD: Portrait mobile layout refinement -> Given the reference portrait layout places the product grid above a full-width explanation panel / When the page is viewed in a portrait viewport / Then the card wall should render in four columns and the explanation panel should stack below the gallery instead of staying on the right

RED: npm test -- --run -> FAIL, the page did not expose a portrait-stack responsive layout marker before the refinement

GREEN: npm test -- --run -> PASS

GREEN: npm run build -> PASS

GREEN: Playwright portrait verification at 866x1536 -> PASS, first row rendered 4 cards and the explanation panel stacked below the gallery

BDD: Landscape and portrait reference confirmation -> Given the supplied landscape and portrait screenshots define the expected composition / When the demo is rendered at matching wide and tall viewports / Then the landscape view should keep a 6-card first row with the explanation panel on the right, and the portrait view should keep a 4-card first row with the explanation panel stacked below

RED: npm test -- --run -> FAIL, the explanation panel copy was too short to match the reference reading density

GREEN: npm test -- --run -> PASS

GREEN: npm run build -> PASS

GREEN: Playwright landscape verification at 1692x951 -> PASS, first row rendered 6 cards and the explanation panel stayed on the right

GREEN: Playwright portrait verification at 866x1536 -> PASS, first row rendered 4 cards and the explanation panel stacked below the gallery

BDD: Windows launcher script -> Given this project runs on a Windows machine / When the user executes the batch launcher from the project root / Then the script should fail fast on missing npm, missing dependencies, or a busy port, and otherwise start the website on http://127.0.0.1:4173

RED: npx vitest run tests/run-website-bat.test.js -> FAIL, run-website.bat did not exist yet

GREEN: npx vitest run tests/run-website-bat.test.js -> PASS

GREEN: run-website.bat execution -> PASS, Vite started on http://127.0.0.1:4173

BDD: Root entry must render the reference kiosk -> Given the homepage screenshots define the expected public-facing page / When the browser opens http://127.0.0.1:4173/ / Then the root entry should render the medical kiosk layout instead of the unrelated configuration-driven showroom console

RED: npx vitest run src/medical-kiosk.test.js -> FAIL, medical-kiosk.js did not exist and the homepage entry was still wired to createShowroomApp

GREEN: npx vitest run src/medical-kiosk.test.js src/app.test.js tests/run-website-bat.test.js -> PASS

GREEN: npm run build -> PASS

GREEN: Playwright landscape verification at 1692x951 -> PASS, the root page rendered data-reference-layout="medical-kiosk", a 6-card first row, and the explanation panel on the right

GREEN: Playwright portrait verification at 866x1536 -> PASS, the root page rendered data-reference-layout="medical-kiosk", a 4-card first row, and the explanation panel below the gallery
