# Governed Tool and MCP Architecture

## Execution Path

```text
Agent / FSM / HTTP Command
  -> ToolRegistry resolution and Run ToolContractSnapshot
  -> GovernedToolRunner
  -> identity -> input schema -> permission -> policy -> approval
  -> idempotency/cache -> ToolAdapter -> output schema/artifact
  -> Invocation Store + Event Store + Observation Store + Telemetry
```

`GovernedToolRunner` is the only public execution owner. Server routes issue runtime commands;
they do not call a handler or MCP SDK client. `ToolRegistry` resolves stable Tool ID, version, and
revision to one immutable contract and adapter.

## Invocation Reliability

An Invocation is persisted independently of the caller process. Idempotency identity includes the
Tool revision, canonical input, scope, key, and policy revision. Approval decisions use revision
compare-and-set. Restart recovery reuses the original request and state attempt. Interrupted reads
may resume; side effects require an external receipt reconciliation result. Unknown external commit
state becomes `conflict` and is never retried blindly.

## MCP Boundary

`MCPConnectionManager` owns stdio and Streamable HTTP sessions, initialization, negotiation,
single-start, request cancellation, reconnect, health, and cleanup. `MCPCapabilityCatalog` owns
canonical hashes, trust source, revision history, schema cache, lazy descriptor loading, drift,
quarantine, approval, and stable Tool IDs. Tools, resources, and prompts are discovered with MCP
pagination. MCP SDK types remain in the transport/session layer.

A Run stores an immutable Tool contract snapshot. Catalog drift creates a new revision; it cannot
silently replace the schema used by an active or replayed Run.

## Cross-Module Ports

- Command and file Tools call `WorkspaceRuntimePort`; process execution lives in the local adapter.
- Large output calls `ToolArtifactPort`; events contain references and hashes, not payload bytes.
- Tool observations include provenance and are available to memory extraction, but the runner does
  not write long-term memory.
- Tool result cache validity includes Tool, policy, scope, snapshot, capability, and external-state
  revisions. Side-effect Tools bypass this read cache.

## Result Cache Boundary

`InMemoryToolResultCache` is the bounded local reference Store. `RedisToolResultCache` uses the
same provider-neutral contract for local, self-hosted, or managed Redis deployments. Persisted
entries carry schema/key versions and a canonical logical key; every read is runtime-validated and
must match the physical lookup key and current Tool, input, scope, policy, snapshot, capability,
and external-state validity.

Only `none` Tools and `read` Tools with an explicit `externalStateVersion` can reuse results.
Sensitive output declarations bypass the cache. Cached values contain only output, structured
content, and Artifact references; Invocation state, receipts, observations, lifecycle metadata, and
provider payloads are excluded. Entries containing Artifact references require a deployment
`ToolResultCacheArtifactVerifier` before they can be written or reused.

Cache lookup, write, delete, and Artifact verification are time-bounded. The default `bypass`
failure mode treats unavailable, expired, corrupt, mismatched, or unverifiable entries as misses and
continues through the governed Tool Adapter. `strict` is available for deployments that explicitly
require cache availability, but cache hits never replace permission, policy, approval, or trace
checks.
