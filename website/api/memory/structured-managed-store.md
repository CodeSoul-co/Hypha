# `@codesoul-co/hypha-memory` / `structured-managed-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/structured-managed-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-managed-store.ts)
- Exports: **2**

## Using this module

Use the Structured managed store module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  StructuredManagedMemoryRecordStore,
} from '@codesoul-co/hypha-memory';

import type {
  StructuredManagedMemoryRecordStoreOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `StructuredManagedMemoryRecordStore` | class | <code>new StructuredManagedMemoryRecordStore(options: StructuredManagedMemoryRecordStoreOptions): StructuredManagedMemoryRecordStore</code> | Structured Managed Memory Record Store class with 11 public constructor or member entries; its exact declarations are listed below. |
| `StructuredManagedMemoryRecordStoreOptions` | interface | <code>interface StructuredManagedMemoryRecordStoreOptions</code> | Structured Managed Memory Record Store Options interface with 5 public fields or methods. |

## `StructuredManagedMemoryRecordStore`

Structured Managed Memory Record Store class with 11 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { StructuredManagedMemoryRecordStore } from '@codesoul-co/hypha-memory';`
- Source module: [`structured-managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-managed-store.ts)

### Declaration

```text
export declare class StructuredManagedMemoryRecordStore implements ManagedMemoryRecordStore {
    constructor(options: StructuredManagedMemoryRecordStoreOptions);
    create(record: ManagedMemoryRecord): Promise<ManagedMemoryRecord>;
    get(id: string, scope: ManagedMemoryScope): Promise<ManagedMemoryRecord | null>;
    getVersionByScopeHash(id: string, versionId: string, scopeHash: string): Promise<ManagedMemoryRecord | null>;
    list(request: ManagedMemoryRecordQuery): Promise<ManagedMemoryRecord[]>;
    createVersion(record: ManagedMemoryRecord, expectedRevision: number): Promise<ManagedMemoryRecord>;
    updateStatus(id: string, scope: ManagedMemoryScope, expectedRevision: number, status: MemoryStatus, updatedAt: string): Promise<ManagedMemoryRecord>;
    delete(id: string, scope: ManagedMemoryScope): Promise<void>;
    history(id: string, scope: ManagedMemoryScope): Promise<ManagedMemoryRecord[]>;
    transaction<T>(fn: (store: ManagedMemoryRecordStore) => Promise<T>): Promise<T>;
    health(): Promise<ProviderHealth>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: StructuredManagedMemoryRecordStoreOptions): StructuredManagedMemoryRecordStore</code> | Creates an instance of this class. |
| `create` | method | <code>create(record: ManagedMemoryRecord): Promise&lt;ManagedMemoryRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `createVersion` | method | <code>createVersion(record: ManagedMemoryRecord, expectedRevision: number): Promise&lt;ManagedMemoryRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `delete` | method | <code>delete(id: string, scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(id: string, scope: ManagedMemoryScope): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getVersionByScopeHash` | method | <code>getVersionByScopeHash(id: string, versionId: string, scopeHash: string): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(id: string, scope: ManagedMemoryScope): Promise&lt;ManagedMemoryRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: ManagedMemoryRecordQuery): Promise&lt;ManagedMemoryRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (store: ManagedMemoryRecordStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `updateStatus` | method | <code>updateStatus(id: string, scope: ManagedMemoryScope, expectedRevision: number, status: MemoryStatus, updatedAt: string): Promise&lt;ManagedMemoryRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `StructuredManagedMemoryRecordStoreOptions`

Structured Managed Memory Record Store Options interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { StructuredManagedMemoryRecordStoreOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`structured-managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-managed-store.ts)

### Declaration

```text
export interface StructuredManagedMemoryRecordStoreOptions {
    provider: StructuredStoreProvider;
    currentTable?: string;
    versionsTable?: string;
    inTransaction?: boolean;
    now?: () => Date;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `currentTable` | property | <code>currentTable?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inTransaction` | property | <code>inTransaction?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `provider` | property | <code>provider: StructuredStoreProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionsTable` | property | <code>versionsTable?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
