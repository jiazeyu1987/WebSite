# Frontend Feature Evidence

## Summary

Cut over Website showroom consumers to read the single aggregate IntRuoyi payload only, and removed the old product-detail second-hop consumption path.

## Scope

- `D:\ProjectPackage\Website\src\showroom-api.js`
- `D:\ProjectPackage\Website\src\showroom-app.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\showroom-api.test.js`
- `D:\ProjectPackage\Website\src\showroom-app.test.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\src\medical-kiosk-title-icons.test.js`
- `D:\ProjectPackage\Website\tests\showroom-app.spec.js`
- `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`

## Acceptance

- Website 只读取单一聚合接口，不再消费旧的 `app-config`、`display/company`、`display/product/{id}`。
- `/showroom` 公司详情与根 `/` kiosk 产品详情都从聚合 payload 读取正文。
- 聚合接口不可用时显式报错，不回退旧接口。

## BDD

- `BDD: Website reads one aggregate payload only -> Given IntRuoyi provides a single anonymous aggregate showroom interface / When Website loads showroom data for either /showroom or root kiosk / Then it must read exactly that aggregate payload and must not request a second product detail interface.`
- `BDD: Website fails fast when the aggregate interface is unavailable -> Given the aggregate endpoint is missing or returns an error / When Website boots / Then it must surface the explicit backend failure and must not fall back to the old app-config or product detail paths.`

## RED

- `RED: existing Website runtime still depended on app-config plus display/product/{id} -> FAIL, root kiosk opened product detail through a second network path and /showroom still loaded from app-config only.`

## GREEN

- `GREEN: npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/medical-kiosk.test.js src/medical-kiosk-title-icons.test.js -> PASS`
- `GREEN: npx playwright test tests/showroom-app.spec.js tests/kiosk-detail.spec.js --reporter=line -> PASS`
- `GREEN: npx playwright test tests/kiosk-gallery.spec.js --reporter=line -> PASS`

## Verification

- PASS: `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/medical-kiosk.test.js src/medical-kiosk-title-icons.test.js`
- PASS: `npx playwright test tests/showroom-app.spec.js tests/kiosk-detail.spec.js --reporter=line`
- PASS: `npx playwright test tests/kiosk-gallery.spec.js --reporter=line`

## Blockers

- Real backend aggregate endpoint availability still depends on IntRuoyi runtime delivery and uptime; Website now fails fast instead of falling back.
