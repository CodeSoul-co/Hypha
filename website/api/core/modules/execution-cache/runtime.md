# `@codesoul-co/hypha-core` / `modules/execution-cache/runtime`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/execution-cache/runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/runtime.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExecutionResultCache` | class | <code>new ExecutionResultCache(options: ExecutionResultCacheOptions): ExecutionResultCache</code> | Conservative Result Cache for deterministic, read-only command executions. It returns an Execution-owned projection and never fabricates a new receipt, mutates a Workspace, or treats a hit as an executed side effect. |
| `ExecutionResultCacheOptions` | interface | <code>interface ExecutionResultCacheOptions</code> | Field contract for Execution Result Cache Options; see all contract members below. |

## `ExecutionResultCache` public members

Conservative Result Cache for deterministic, read-only command executions. It returns an Execution-owned projection and never fabricates a new receipt, mutates a Workspace, or treats a hit as an executed side effect.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: ExecutionResultCacheOptions): ExecutionResultCache</code> | Creates an instance of this class. |
| `invalidate` | method | <code>invalidate(rawInput: ExecutionCacheLookupInput): Promise&lt;boolean&gt;</code> | Public runtime operation for invalidate. |
| `lookup` | method | <code>lookup(rawInput: ExecutionCacheLookupInput): Promise&lt;ExecutionCacheLookupResult&gt;</code> | Public runtime operation for lookup. |
| `write` | method | <code>write(rawInput: ExecutionCacheWriteInput): Promise&lt;boolean&gt;</code> | Public runtime operation for write. |

## `ExecutionResultCacheOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactVerifier` | property | <code>artifactVerifier: ExecutionCacheArtifactVerifier</code> | Public artifact Verifier property. |
| `failureMode` | property | <code>failureMode: ExecutionCacheFailureMode</code> | Public failure Mode property. |
| `hasher` | property | <code>hasher: ExecutionFingerprintHasher</code> | Public hasher property. |
| `maxEntryBytes` | property | <code>maxEntryBytes: number</code> | Public max Entry Bytes property. |
| `now` | method | <code>now(): number</code> | Public runtime operation for now. |
| `operationTimeoutMs` | property | <code>operationTimeoutMs: number</code> | Public operation Timeout Ms property. |
| `store` | property | <code>store: ExecutionCacheStore</code> | Public store property. |
| `trace` | method | <code>trace(event: ExecutionCacheEvent): Promise&lt;void&gt; &#124; void</code> | Public runtime operation for trace. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |
