INFO: Previous Website task `20260523-website-media-incremental-sync-triage` is already marked `Completed`, so this read-only architecture task can proceed.
INFO: Reviewed stable repo boundary: Website is a pure frontend display consumer and should not own source-of-truth data assembly.
INFO: Reviewed stable IntRuoyi boundary: showroom module already owns company/product revisions, preview asset versions, narration versions, and a single anonymous aggregate payload.
INFO: Architectural conclusion: the optimal long-term scheme is publish-time immutable release generation plus client-side release installation, not request-time live aggregation plus ad hoc media diffing.
INFO: System design docs were generated for frontend, backend API, data model, and config/security/deployment concerns.
INFO: Open question preserved explicitly: whether a device may continue running the last verified release when a fresh update check fails must be approved as an operating policy, not silently decided by code.
