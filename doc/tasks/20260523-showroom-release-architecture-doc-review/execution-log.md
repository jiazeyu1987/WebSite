INFO: Review gate criteria locked from user request: capability sufficiency, system self-consistency, API clarity, and complete BDD/TDD/Subagent-driven delivery plan.
INFO: Previous task `20260523-showroom-optimal-media-delivery-architecture` is marked `Completed`, so review can start.
INFO: This worker round is document-only. No production code or test execution was performed in this repository.
INFO: Blocker-level open questions were converted into explicit v1 policy or explicit stop conditions. Remaining open items are non-blocking only.

BDD: Release current exposes one immutable active release -> Given IntRuoyi has one published release and the current pointer references it / When the client requests GET /showroom/release/current / Then the response returns exactly one active releaseId, manifestHash, schemaVersion, counts, and installBytes, with no fallback to live aggregation.
BDD: Legacy website-config becomes a projection instead of a parallel source -> Given the migration period is active and a current release exists / When a consumer requests GET /showroom/display/website-config / Then the backend projects data from the active release documents and fails explicitly if the active release is incomplete.
BDD: Manifest and document contracts are fixed for v1 -> Given a published release exists / When the client requests its manifest and documents / Then v1 returns one website-index document plus product-detail-{productId} documents, and no single-document alternative remains open.
BDD: First install fails fast on missing prerequisites -> Given the device has no active release / When release current, manifest, storage, space, or hash verification fails / Then the client blocks entry and records the exact failure instead of rendering partial content.
BDD: Update failure preserves the current active release without silent downgrade -> Given the device already has a verified active release / When a newer release download or verification fails / Then the current active release stays active, the target release is marked failed, and the UI exposes the failure state.
BDD: Offline boot is allowed only with a verified active release -> Given the network is unavailable / When the device already has a verified active release / Then it boots from local storage and records probe failure without mutating the active pointer.
BDD: Garbage collection only removes unreferenced retained data -> Given a new release has been activated / When GC runs / Then it removes expired staging data, excess retained releases, and only assets not referenced by any kept release.

RED: Planned in `development-plan.md` milestone M1-M4 and `test-plan.md` case T1-T8 -> FAIL expected until backend release endpoints, frontend installer/store, and release-aware tests are implemented.
GREEN: Planned in `development-plan.md` milestone M1-M4 and `test-plan.md` case T1-T8 -> PASS only after backend tests, frontend Vitest coverage, build verification, and Playwright release-path validation all pass.
REGRESSION: Planned evidence location -> `D:\ProjectPackage\Website\doc\tasks\20260523-showroom-release-architecture-doc-review\execution-log.md`, `development-plan.md`, `test-plan.md`, future backend/website test outputs, and Playwright artifacts.

FINDING-RESOLVED: release contract no longer relies on open wording; schema, error model, caching, retention, and migration boundary are now explicit.
FINDING-RESOLVED: document model no longer leaves "single document vs multi document" undecided; v1 is fixed to `website-index + product-detail-*`.
FINDING-RESOLVED: runtime boundary now defines persistence medium, cache quota, first install, update failure, offline run, retained releases, and GC triggers.
FINDING-RESOLVED: implementation planning artifacts now exist and cover BDD + strict TDD + subagent gates instead of leaving planning as an oral follow-up.
