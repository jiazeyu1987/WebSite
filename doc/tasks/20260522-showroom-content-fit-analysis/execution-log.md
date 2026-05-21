INFO: Started showroom content fit analysis for Website company detail and product detail.
INFO: Previous Website task `20260522-showroom-app-config-target-mismatch` is already explicitly blocked by upstream IntRuoyi live company data drift, so this analysis proceeds as an independent read-only task.
INFO: Analysis targets are current Website rendering, IntRuoyi frontstage display contracts, and IntRuoyi back-office company/product content structures.
INFO: Website `/showroom` currently renders only company landing/detail from `company.publicFields`; it does not yet render showroom/product detail states.
INFO: Website root kiosk company detail reads `company.publicFields`, while product detail reads anonymous `GET /showroom/display/product/{productId}` and renders returned `publicProductFields`.
INFO: IntRuoyi company field source defines 7 ordered public company fields: development history, park introduction, incubation platform, subsidiary overview, stock info, core manufacturing capability, and honors awards.
INFO: IntRuoyi product field source partitions public/basic fields from advanced fields; `registration_certificate`, `clinical_effect`, and `fim_status` are explicitly advanced and should stay out of public frontstage display.
INFO: Runtime probe `GET /showroom/display/company` -> FAIL, `SHOWROOM_TARGET_NOT_FOUND: live company ZH narration source revision mismatch`.
INFO: Runtime probe `GET /showroom/display/product/240` -> PASS, current mapped live product exposes only name, owner, ownership type, and lifecycle public fields.
INFO: Runtime probe `GET /showroom/display/product/164` -> PASS, a richer published product exposes indication and core selling points in the public/basic field set.
INFO: Read-only database audit confirms current hall mappings point mostly to E2E publish verification products with sparse basic fields, so product detail UI must work well with very short public field lists.
