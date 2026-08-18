# `@codesoul-co/hypha-memory` / `structured-vector-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/structured-vector-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-vector-store.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `StructuredManagedVectorStoreAdapter` | class | <code>new StructuredManagedVectorStoreAdapter(store: StructuredStoreProvider, options?: StructuredManagedVectorStoreAdapterOptions): StructuredManagedVectorStoreAdapter</code> | Durable, bounded vector projection backed by the configured Structured Store. |
| `StructuredManagedVectorStoreAdapterOptions` | interface | <code>interface StructuredManagedVectorStoreAdapterOptions</code> | Field contract for Structured Managed Vector Store Adapter Options; see all contract members below. |

## `StructuredManagedVectorStoreAdapter` public members

Durable, bounded vector projection backed by the configured Structured Store.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(store: StructuredStoreProvider, options?: StructuredManagedVectorStoreAdapterOptions): StructuredManagedVectorStoreAdapter</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(ids: string[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `initialize` | method | <code>initialize(): Promise&lt;void&gt;</code> | Public runtime operation for initialize. |
| `search` | method | <code>search(request: ManagedVectorSearchRequest): Promise&lt;ManagedVectorSearchResult[]&gt;</code> | Public runtime operation for search. |
| `upsert` | method | <code>upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | Public runtime operation for upsert. |

## `StructuredManagedVectorStoreAdapterOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `maxScanPoints` | property | <code>maxScanPoints: number</code> | Public max Scan Points property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `table` | property | <code>table: string</code> | Public table property. |
