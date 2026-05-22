INFO: Started the local runtime switch from mock aggregate data back to the real IntRuoyi aggregate interface.
INFO: Real probe on 2026-05-22 against `http://127.0.0.1:48081/showroom/display/website-config` returned backend code 500 with message `SHOWROOM_TARGET_NOT_FOUND: live product ZH narration source revision mismatch`.
GREEN: Local Website environment no longer points to the mock aggregate JSON.
BDD: Real aggregate runtime recovery -> Given Website only reads the IntRuoyi aggregate interface, When `website-config` returns `code=0`, Then `/showroom` and `/` should both render ready state from the real payload without falling back to mock or legacy endpoints.
GREEN: `Invoke-WebRequest -UseBasicParsing http://127.0.0.1:48081/showroom/display/website-config` -> PASS, backend returned `code=0` with company, halls, products, and `bilingualPublicFields`.
GREEN: Real page verification via Playwright -> PASS, `/showroom` rendered company landing and detail with 7 company fields; `/` rendered ready state, opened the first hall, and opened the first product detail with 4 description lines and no console/page errors.
INFO: Live payload still exposes legacy `publicFields` alongside `bilingualPublicFields`, and current company `bilingualPublicFields[].valueEn` values remain empty strings.
