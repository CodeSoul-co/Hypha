# Tool and MCP Known Limitations

- The reference persistent stores are file/SQLite implementations. Multi-process production
  deployments need a transactional shared store that preserves the same revision CAS contract.
- `InMemoryToolResultCache` is process-local; production cache adapters must preserve the complete
  validity key and audit cache hits.
- External side-effect recovery needs a provider-specific `ToolReceiptReconciler`. Without one,
  interrupted writes intentionally become `conflict`.
- HTTP Tool cancellation uses the runner-owned AbortSignal; providers without cancellation or
  idempotency APIs can still finish remotely after client timeout.
- MCP authorization references are resolved by deployment DI. The framework does not ship a
  production secret manager.
- Performance results are local synthetic baselines, not distributed load or provider-network
  benchmarks.
- Generic OCR and video-source contracts do not bundle OCR engines, codecs, site parsers, or
  customer credentials. Those implementations belong in business projects such as LexPlan.
- The two independent business demos in the owner specification were explicitly excluded from this
  acceptance by the owner.
