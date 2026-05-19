BDD: Initial runnable demo baseline -> Given an empty workspace and Node.js installed / When the frontend demo scaffold is created and dependencies are installed / Then the demo should run, build, and expose a switchable reference-style page without backend dependencies

BDD: Category switching behavior -> Given the demo page is loaded / When the user selects a top category tab / Then the product grid and explanation panel should update to that category and the active tab should be visibly highlighted

BDD: Honest resource reporting -> Given exact product photography and brand assets are unavailable / When the demo is delivered / Then the missing assets should be listed explicitly instead of being silently fabricated as final production resources

RED: npm test -- --run -> FAIL, missing ./demoData.js and ./app.js modules for the category switching demo

GREEN: npm test -- --run -> PASS

GREEN: npm run build -> PASS

GREEN: Playwright local browser smoke check against http://127.0.0.1:4173 -> PASS

GREEN: .gitignore follow-up update -> PASS, frontend demo ignore rules now cover build output, cache, coverage, and log files
