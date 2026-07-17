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
- API key records can be issued and revoked, but the current Express authentication path requires a
  Bearer JWT. Deployments must not advertise `X-API-Key` request authentication until middleware
  and endpoint permission mapping are enabled.
- Generic media contracts do not bundle OCR engines, codecs, site parsers, provider credentials, or
  domain persistence. Add those capabilities through adapters and Domain Packs.
- Run context is held in the active server process. Persistent Tool Invocation recovery is
  available, but completing a human-review Run after a full server restart requires a deployment
  Run-context restoration adapter.
