INFO: Previous Website task `20260522-runtime-playback-button-unify` is already marked `Completed`, so this read-only triage can proceed.
INFO: Current Website runtime reads one anonymous aggregate payload from `GET /showroom/display/website-config` and then renders remote image/audio URLs directly.
INFO: Existing integration plan already recommended additive `lastPublishedAt / revisionId / versionNo / etag / updatedAt` fields for cache invalidation and troubleshooting.
INFO: Runtime probe `GET http://127.0.0.1:48081/showroom/display/website-config` returned HTTP 200 with company image/audio, hall image, and product image/audio URLs.
INFO: HEAD probe against the returned company image URL showed `Cache-Control: no-cache, no-store, max-age=0, must-revalidate`.
INFO: HEAD probe against the returned company ZH audio URL showed `Cache-Control: no-cache, no-store, max-age=0, must-revalidate`.
INFO: Conclusion: incremental media reuse is feasible in principle, but current runtime headers explicitly block browser-side media cache reuse.
