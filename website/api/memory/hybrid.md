# `@codesoul-co/hypha-memory` / `hybrid`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/hybrid.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hybrid.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `HybridMemoryProvider` | class | <code>new HybridMemoryProvider(options: HybridMemoryProviderOptions): HybridMemoryProvider</code> | Runtime implementation for Hybrid Memory Provider; see its public constructor and members below. |
| `HybridMemoryProviderOptions` | interface | <code>interface HybridMemoryProviderOptions</code> | Field contract for Hybrid Memory Provider Options; see all contract members below. |

## `HybridMemoryProvider` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `audit` | method | <code>audit(scope: MemoryScope, _options?: MemoryAuditOptions): Promise&lt;MemoryAuditReport&gt;</code> | Public runtime operation for audit. |
| `constructor` | constructor | <code>(options: HybridMemoryProviderOptions): HybridMemoryProvider</code> | Creates an instance of this class. |
| `invalidate` | method | <code>invalidate(scope: MemoryScope, recordId: string, reason: string): Promise&lt;void&gt;</code> | Public runtime operation for invalidate. |
| `read` | method | <code>read(scope: MemoryScope, query: MemoryReadQuery): Promise&lt;MemoryRecord[]&gt;</code> | Public runtime operation for read. |
| `search` | method | <code>search(scope: MemoryScope, query: MemorySearchQuery): Promise&lt;MemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `summarize` | method | <code>summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise&lt;MemorySummary&gt;</code> | Public runtime operation for summarize. |
| `update` | method | <code>update(scope: MemoryScope, recordId: string, patch: Partial&lt;MemoryRecord&gt;): Promise&lt;void&gt;</code> | Public runtime operation for update. |
| `write` | method | <code>write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise&lt;MemoryWriteResult&gt;</code> | Public runtime operation for write. |

## `HybridMemoryProviderOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: ArtifactStoreProvider</code> | Public artifacts property. |
| `embeddings` | property | <code>embeddings: EmbeddingProvider</code> | Public embeddings property. |
| `structured` | property | <code>structured: StructuredStoreProvider</code> | Public structured property. |
| `tableName` | property | <code>tableName: string</code> | Public table Name property. |
| `vector` | property | <code>vector: VectorIndexProvider</code> | Public vector property. |
