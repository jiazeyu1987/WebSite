BDD: live aggregate adapter sync -> Given Website 只从 IntRuoyi 聚合接口读取数据, When live `website-config` contract 被确认, Then `showroom-api.js` 应以当前 live 字段名和可空文本规则完成映射，并由接口层测试覆盖。
INFO: Live probe on 2026-05-22 confirmed `GET http://127.0.0.1:48081/showroom/display/website-config` returns `code=0` with `companyId/homeImageUrl/subtitleZh/audioZhUrl`, `hallId/hallCode/name/nameEn/description`, and product `productId/productCode/nameCn/nameEn/subtitleZh/audioZhUrl/bilingualPublicFields`.
GREEN: `npm test -- --run src/showroom-api.test.js` -> PASS
