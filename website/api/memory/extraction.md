# `@codesoul-co/hypha-memory` / `extraction`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/extraction.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)
- Exports: **11**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `BasicMemoryExtractionSourceAdapter` | class | <code>new BasicMemoryExtractionSourceAdapter&lt;T = unknown&gt;(type: MemoryExtractionSourceType, loader: ExtractionSourceLoader&lt;T&gt;, normalizer: (value: T, ref: MemoryExtractionSourceRef) =&gt; NormalizedExtractionInput): BasicMemoryExtractionSourceAdapter&lt;T&gt;</code> | Runtime implementation for Basic Memory Extraction Source Adapter; see its public constructor and members below. |
| `DeterministicMemoryExtractor` | class | <code>new DeterministicMemoryExtractor(): DeterministicMemoryExtractor</code> | Runtime implementation for Deterministic Memory Extractor; see its public constructor and members below. |
| `InMemoryMemoryExtractionStateStore` | class | <code>new InMemoryMemoryExtractionStateStore(): InMemoryMemoryExtractionStateStore</code> | Runtime implementation for In Memory Memory Extraction State Store; see its public constructor and members below. |
| `MemoryExtractionCoordinator` | class | <code>new MemoryExtractionCoordinator(options: MemoryExtractionCoordinatorOptions): MemoryExtractionCoordinator</code> | Runtime implementation for Memory Extraction Coordinator; see its public constructor and members below. |
| `createConversationExtractionAdapter` | function | <code>createConversationExtractionAdapter(loader: ExtractionSourceLoader&lt;unknown&gt;): BasicMemoryExtractionSourceAdapter</code> | Creates Conversation Extraction Adapter at this module boundary. |
| `createEpisodicRecordExtractionAdapter` | function | <code>createEpisodicRecordExtractionAdapter(loader: ExtractionSourceLoader&lt;unknown&gt;): BasicMemoryExtractionSourceAdapter</code> | Creates Episodic Record Extraction Adapter at this module boundary. |
| `createRuntimeEventExtractionAdapter` | function | <code>createRuntimeEventExtractionAdapter(loader: ExtractionSourceLoader&lt;unknown&gt;): BasicMemoryExtractionSourceAdapter</code> | Creates Runtime Event Extraction Adapter at this module boundary. |
| `createTruthExtractionAdapter` | function | <code>createTruthExtractionAdapter(loader: ExtractionSourceLoader&lt;unknown&gt;): BasicMemoryExtractionSourceAdapter</code> | Creates Truth Extraction Adapter at this module boundary. |
| `MemoryExtractionCoordinatorOptions` | interface | <code>interface MemoryExtractionCoordinatorOptions</code> | Field contract for Memory Extraction Coordinator Options; see all contract members below. |
| `MemoryExtractionStateStore` | interface | <code>interface MemoryExtractionStateStore</code> | Field contract for Memory Extraction State Store; see all contract members below. |
| `ExtractionSourceLoader` | type | <code>type ExtractionSourceLoader = (ref: MemoryExtractionSourceRef) =&gt; Promise&lt;T&gt;</code> | Public type alias for Extraction Source Loader. |

## `BasicMemoryExtractionSourceAdapter` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>&lt;T = unknown&gt;(type: MemoryExtractionSourceType, loader: ExtractionSourceLoader&lt;T&gt;, normalizer: (value: T, ref: MemoryExtractionSourceRef) =&gt; NormalizedExtractionInput): BasicMemoryExtractionSourceAdapter&lt;T&gt;</code> | Creates an instance of this class. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `load` | method | <code>load(refs: MemoryExtractionSourceRef[], cursor?: MemoryExtractionCursor): Promise&lt;MemoryExtractionSourceBatch&lt;T&gt;&gt;</code> | Loads load at this module boundary. |
| `normalize` | method | <code>normalize(batch: MemoryExtractionSourceBatch&lt;T&gt;): Promise&lt;NormalizedExtractionInput[]&gt;</code> | Normalizes normalize at this module boundary. |
| `type` | property | <code>type: MemoryExtractionSourceType</code> | Public type property. |

## `DeterministicMemoryExtractor` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): DeterministicMemoryExtractor</code> | Creates an instance of this class. |
| `extract` | method | <code>extract(inputs: NormalizedExtractionInput[], profile: MemoryExtractionProfileSpec): Promise&lt;ExtractedMemoryCandidate[]&gt;</code> | Public runtime operation for extract. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: "memory.extractor.deterministic"</code> | Public id property. |

## `InMemoryMemoryExtractionStateStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryMemoryExtractionStateStore</code> | Creates an instance of this class. |
| `getBatch` | method | <code>getBatch(id: string): Promise&lt;MemoryExtractionBatch &#124; null&gt;</code> | Gets Batch at this module boundary. |
| `getCursor` | method | <code>getCursor(sourceType: MemoryExtractionSourceType, sourceId: string): Promise&lt;MemoryExtractionCursor &#124; null&gt;</code> | Gets Cursor at this module boundary. |
| `getJob` | method | <code>getJob(id: string): Promise&lt;MemoryExtractionJob &#124; null&gt;</code> | Gets Job at this module boundary. |
| `saveBatch` | method | <code>saveBatch(batch: MemoryExtractionBatch): Promise&lt;void&gt;</code> | Saves Batch at this module boundary. |
| `saveCursor` | method | <code>saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise&lt;void&gt;</code> | Saves Cursor at this module boundary. |
| `saveJob` | method | <code>saveJob(job: MemoryExtractionJob): Promise&lt;void&gt;</code> | Saves Job at this module boundary. |

## `MemoryExtractionCoordinator` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: MemoryExtractionCoordinatorOptions): MemoryExtractionCoordinator</code> | Creates an instance of this class. |
| `getJob` | method | <code>getJob(id: string): Promise&lt;MemoryExtractionJob &#124; null&gt;</code> | Gets Job at this module boundary. |
| `run` | method | <code>run(request: MemoryExtractionRequest, profile: MemoryExtractionProfileSpec): Promise&lt;{ job: MemoryExtractionJob; batch: MemoryExtractionBatch; }&gt;</code> | Public runtime operation for run. |
| `stateStore` | property | <code>stateStore: MemoryExtractionStateStore</code> | Public state Store property. |

## `MemoryExtractionCoordinatorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adapters` | property | <code>adapters: MemoryExtractionSourceAdapter&lt;unknown&gt;[]</code> | Public adapters property. |
| `extractor` | property | <code>extractor: MemoryExtractor</code> | Public extractor property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `stateStore` | property | <code>stateStore: MemoryExtractionStateStore</code> | Public state Store property. |

## `MemoryExtractionStateStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `getBatch` | method | <code>getBatch(id: string): Promise&lt;MemoryExtractionBatch &#124; null&gt;</code> | Gets Batch at this module boundary. |
| `getCursor` | method | <code>getCursor(sourceType: MemoryExtractionSourceType, sourceId: string): Promise&lt;MemoryExtractionCursor &#124; null&gt;</code> | Gets Cursor at this module boundary. |
| `getJob` | method | <code>getJob(id: string): Promise&lt;MemoryExtractionJob &#124; null&gt;</code> | Gets Job at this module boundary. |
| `saveBatch` | method | <code>saveBatch(batch: MemoryExtractionBatch): Promise&lt;void&gt;</code> | Saves Batch at this module boundary. |
| `saveCursor` | method | <code>saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise&lt;void&gt;</code> | Saves Cursor at this module boundary. |
| `saveJob` | method | <code>saveJob(job: MemoryExtractionJob): Promise&lt;void&gt;</code> | Saves Job at this module boundary. |
