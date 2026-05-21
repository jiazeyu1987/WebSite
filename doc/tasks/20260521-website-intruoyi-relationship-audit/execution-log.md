INFO: Started relationship audit for Website and IntRuoyi integration boundaries.
INFO: Evidence collection in progress from `src/main.js`, `src/showroom-api.js`, `src/showroom-app.js`, `src/medical-kiosk.js`, `vite.config.js`, and existing task docs.
INFO: `src/main.js` confirms path split: `/showroom` uses `createShowroomConsumerApp`, all other paths use `createMedicalKioskApp`.
INFO: `src/showroom-api.js` defines the shared frontend adapter contract at anonymous `GET /showroom/display/app-config` and enforces fail-fast field validation.
INFO: `vite.config.js` proxies `/showroom/display` and `/admin-api/infra/file` to `VITE_SHOWROOM_BACKEND_ORIGIN` or `http://127.0.0.1:48081`.
INFO: `src/medical-kiosk.js` still keeps local hardcoded kiosk category/product structures, but company detail is loaded from `fetchShowroomAppConfig()`.
INFO: `src/showroom-app.js` currently renders a company landing/detail flow from `config.company`; `showrooms` are mapped in the adapter but not rendered by the current page.
INFO: Conclusion: integration exists and there is a unified showroom app-config interface, but it does not yet mean the whole Website is fully unified onto IntRuoyi data.
