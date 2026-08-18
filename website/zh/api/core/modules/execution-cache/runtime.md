# `@codesoul-co/hypha-core` / `modules/execution-cache/runtime`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/execution-cache/runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/runtime.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExecutionResultCache` | 类 | <code>new ExecutionResultCache(options: ExecutionResultCacheOptions): ExecutionResultCache</code> | Conservative Result Cache for deterministic, read-only command executions. It returns an Execution-owned projection and never fabricates a new receipt, mutates a Workspace, or treats a hit as an executed side effect. |
| `ExecutionResultCacheOptions` | 接口 | <code>interface ExecutionResultCacheOptions</code> | Execution Result Cache Options 的字段契约；完整字段见下表。 |

## `ExecutionResultCache` 公开成员

Conservative Result Cache for deterministic, read-only command executions. It returns an Execution-owned projection and never fabricates a new receipt, mutates a Workspace, or treats a hit as an executed side effect.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: ExecutionResultCacheOptions): ExecutionResultCache</code> | 创建该类的实例。 |
| `invalidate` | 方法 | <code>invalidate(rawInput: ExecutionCacheLookupInput): Promise&lt;boolean&gt;</code> | invalidate 的公开运行时操作。 |
| `lookup` | 方法 | <code>lookup(rawInput: ExecutionCacheLookupInput): Promise&lt;ExecutionCacheLookupResult&gt;</code> | lookup 的公开运行时操作。 |
| `write` | 方法 | <code>write(rawInput: ExecutionCacheWriteInput): Promise&lt;boolean&gt;</code> | write 的公开运行时操作。 |

## `ExecutionResultCacheOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactVerifier` | 属性 | <code>artifactVerifier: ExecutionCacheArtifactVerifier</code> | artifact Verifier 字段。 |
| `failureMode` | 属性 | <code>failureMode: ExecutionCacheFailureMode</code> | failure Mode 字段。 |
| `hasher` | 属性 | <code>hasher: ExecutionFingerprintHasher</code> | hasher 字段。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes: number</code> | max Entry Bytes 字段。 |
| `now` | 方法 | <code>now(): number</code> | now 的公开运行时操作。 |
| `operationTimeoutMs` | 属性 | <code>operationTimeoutMs: number</code> | operation Timeout Ms 字段。 |
| `store` | 属性 | <code>store: ExecutionCacheStore</code> | store 字段。 |
| `trace` | 方法 | <code>trace(event: ExecutionCacheEvent): Promise&lt;void&gt; &#124; void</code> | trace 的公开运行时操作。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |
