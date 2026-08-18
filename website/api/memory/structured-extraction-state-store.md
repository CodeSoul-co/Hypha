# `@codesoul-co/hypha-memory` / `structured-extraction-state-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/structured-extraction-state-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-extraction-state-store.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `StructuredMemoryExtractionStateStore` | class | <code>new StructuredMemoryExtractionStateStore(options: StructuredMemoryExtractionStateStoreOptions): StructuredMemoryExtractionStateStore</code> | Runtime implementation for Structured Memory Extraction State Store; see its public constructor and members below. |
| `StructuredMemoryExtractionStateStoreOptions` | interface | <code>interface StructuredMemoryExtractionStateStoreOptions</code> | Field contract for Structured Memory Extraction State Store Options; see all contract members below. |

## `StructuredMemoryExtractionStateStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: StructuredMemoryExtractionStateStoreOptions): StructuredMemoryExtractionStateStore</code> | Creates an instance of this class. |
| `getBatch` | method | <code>getBatch(id: string): Promise&lt;MemoryExtractionBatch &#124; null&gt;</code> | Gets Batch at this module boundary. |
| `getCursor` | method | <code>getCursor(sourceType: MemoryExtractionSourceType, sourceId: string): Promise&lt;MemoryExtractionCursor &#124; null&gt;</code> | Gets Cursor at this module boundary. |
| `getJob` | method | <code>getJob(id: string): Promise&lt;MemoryExtractionJob &#124; null&gt;</code> | Gets Job at this module boundary. |
| `saveBatch` | method | <code>saveBatch(batch: MemoryExtractionBatch): Promise&lt;void&gt;</code> | Saves Batch at this module boundary. |
| `saveCursor` | method | <code>saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise&lt;void&gt;</code> | Saves Cursor at this module boundary. |
| `saveJob` | method | <code>saveJob(job: MemoryExtractionJob): Promise&lt;void&gt;</code> | Saves Job at this module boundary. |

## `StructuredMemoryExtractionStateStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `batchTable` | property | <code>batchTable: string</code> | Public batch Table property. |
| `cursorTable` | property | <code>cursorTable: string</code> | Public cursor Table property. |
| `jobTable` | property | <code>jobTable: string</code> | Public job Table property. |
| `store` | property | <code>store: StructuredStoreProvider</code> | Public store property. |
