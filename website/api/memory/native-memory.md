# `@codesoul-co/hypha-memory` / `native-memory`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/native-memory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory.ts)
- Exports: **2**

## Using this module

Use the Native memory module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  NativeMemoryManagementProvider,
} from '@codesoul-co/hypha-memory';

import type {
  NativeMemoryProviderOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `NativeMemoryManagementProvider` | class | <code>new NativeMemoryManagementProvider(options: NativeMemoryProviderOptions): NativeMemoryManagementProvider</code> | Native Memory Management Provider class with 16 public constructor or member entries; its exact declarations are listed below. |
| `NativeMemoryProviderOptions` | interface | <code>interface NativeMemoryProviderOptions</code> | Native Memory Provider Options interface with 8 public fields or methods. |

## `NativeMemoryManagementProvider`

Native Memory Management Provider class with 16 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { NativeMemoryManagementProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`native-memory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory.ts)

### Declaration

```text
export declare class NativeMemoryManagementProvider implements MemoryManagementProvider {
    readonly id: string;
    readonly persistence: MemoryPersistenceUnitOfWork;
    readonly recordStore: MemoryPersistenceUnitOfWork['recordStore'];
    readonly outboxStore: MemoryPersistenceUnitOfWork['outboxStore'];
    readonly retrieval: DefaultMemoryRetrievalPipeline;
    constructor(options: NativeMemoryProviderOptions);
    capabilities(): Promise<MemoryManagementCapabilities>;
    add(request: MemoryAddRequest): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest): Promise<MemoryVersion[]>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: NativeMemoryProviderOptions): NativeMemoryManagementProvider</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(request: MemoryHistoryRequest): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `outboxStore` | property | <code>readonly outboxStore: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/managed-store").MemoryIndexOutboxStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `persistence` | property | <code>readonly persistence: MemoryPersistenceUnitOfWork</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordStore` | property | <code>readonly recordStore: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/managed-store").ManagedMemoryRecordStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retrieval` | property | <code>readonly retrieval: DefaultMemoryRetrievalPipeline</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `NativeMemoryProviderOptions`

Native Memory Provider Options interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { NativeMemoryProviderOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`native-memory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory.ts)

### Declaration

```text
export interface NativeMemoryProviderOptions {
    profile: MemoryProfileSpec;
    maintenancePolicy?: MemoryMaintenancePolicySpec;
    persistence?: MemoryPersistenceUnitOfWork;
    idempotencyStore?: MemoryIdempotencyStore;
    events?: MemoryEventPublisher;
    embeddingProvider?: EmbeddingProvider;
    vectorStores?: ManagedVectorStoreAdapter[];
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `embeddingProvider` | property | <code>embeddingProvider?: EmbeddingProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `events` | property | <code>events?: MemoryEventPublisher</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyStore` | property | <code>idempotencyStore?: MemoryIdempotencyStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maintenancePolicy` | property | <code>maintenancePolicy?: MemoryMaintenancePolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `persistence` | property | <code>persistence?: MemoryPersistenceUnitOfWork</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profile` | property | <code>profile: MemoryProfileSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vectorStores` | property | <code>vectorStores?: ManagedVectorStoreAdapter[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
