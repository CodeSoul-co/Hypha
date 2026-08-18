# `@codesoul-co/hypha-memory` / `hybrid`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/hybrid.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hybrid.ts)
- Exports: **2**

## Using this module

Use the Hybrid module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  HybridMemoryProvider,
} from '@codesoul-co/hypha-memory';

import type {
  HybridMemoryProviderOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `HybridMemoryProvider` | class | <code>new HybridMemoryProvider(options: HybridMemoryProviderOptions): HybridMemoryProvider</code> | Hybrid Memory Provider class with 8 public constructor or member entries; its exact declarations are listed below. |
| `HybridMemoryProviderOptions` | interface | <code>interface HybridMemoryProviderOptions</code> | Hybrid Memory Provider Options interface with 5 public fields or methods. |

## `HybridMemoryProvider`

Hybrid Memory Provider class with 8 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { HybridMemoryProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`hybrid`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hybrid.ts)

### Declaration

```text
export declare class HybridMemoryProvider implements MemoryProvider {
    constructor(options: HybridMemoryProviderOptions);
    read(scope: MemoryScope, query: MemoryReadQuery): Promise<MemoryRecord[]>;
    search(scope: MemoryScope, query: MemorySearchQuery): Promise<MemorySearchResult[]>;
    write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise<MemoryWriteResult>;
    update(scope: MemoryScope, recordId: string, patch: Partial<MemoryRecord>): Promise<void>;
    invalidate(scope: MemoryScope, recordId: string, reason: string): Promise<void>;
    summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise<MemorySummary>;
    audit(scope: MemoryScope, _options?: MemoryAuditOptions): Promise<MemoryAuditReport>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `audit` | method | <code>audit(scope: MemoryScope, _options?: MemoryAuditOptions): Promise&lt;MemoryAuditReport&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: HybridMemoryProviderOptions): HybridMemoryProvider</code> | Creates an instance of this class. |
| `invalidate` | method | <code>invalidate(scope: MemoryScope, recordId: string, reason: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `read` | method | <code>read(scope: MemoryScope, query: MemoryReadQuery): Promise&lt;MemoryRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(scope: MemoryScope, query: MemorySearchQuery): Promise&lt;MemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `summarize` | method | <code>summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise&lt;MemorySummary&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(scope: MemoryScope, recordId: string, patch: Partial&lt;MemoryRecord&gt;): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `write` | method | <code>write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise&lt;MemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `HybridMemoryProviderOptions`

Hybrid Memory Provider Options interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { HybridMemoryProviderOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`hybrid`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hybrid.ts)

### Declaration

```text
export interface HybridMemoryProviderOptions {
    structured: StructuredStoreProvider;
    vector?: VectorIndexProvider;
    artifacts?: ArtifactStoreProvider;
    embeddings?: EmbeddingProvider;
    tableName?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts?: ArtifactStoreProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `embeddings` | property | <code>embeddings?: EmbeddingProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `structured` | property | <code>structured: StructuredStoreProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tableName` | property | <code>tableName?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vector` | property | <code>vector?: VectorIndexProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
