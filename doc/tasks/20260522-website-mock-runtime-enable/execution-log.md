BDD: Website aggregate runtime can boot from local mock data -> Given IntRuoyi is not available / When the Website dev server receives a request for the aggregate endpoint / Then it must return local mock aggregate data and allow both /showroom and root kiosk to load without touching IntRuoyi.
INFO: Started Website mock runtime enablement task.
GREEN: `curl http://127.0.0.1:4173/mock/showroom-display-website-config.json` -> PASS, local Vite serves the mock aggregate payload.
GREEN: `curl -I http://127.0.0.1:4173/showroom` -> PASS.
GREEN: `curl -I http://127.0.0.1:4173/` -> PASS.
