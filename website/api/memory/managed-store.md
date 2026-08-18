# `@codesoul-co/hypha-memory` / `managed-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/managed-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)
- Exports: **13**

## Using this module

Use the Managed store module for persisting and reading data at this boundary. It exports 4 classes, 1 function, 8 interfaces.

### Import from the package entrypoint

```ts
import {
  InMemoryManagedMemoryRecordStore,
  InMemoryMemoryIdempotencyStore,
  InMemoryMemoryIndexOutboxStore,
  InMemoryMemoryPersistenceUnitOfWork,
  matchesFilter,
} from '@codesoul-co/hypha-memory';

import type {
  ManagedMemoryRecordQuery,
  ManagedMemoryRecordStore,
  MemoryIdempotencyStore,
  MemoryIndexOutboxRecord,
  MemoryIndexOutboxStore,
  MemoryPersistenceCapabilities,
  MemoryPersistenceTransaction,
  MemoryPersistenceUnitOfWork,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 8 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 4 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryManagedMemoryRecordStore` | class | <code>new InMemoryManagedMemoryRecordStore(): InMemoryManagedMemoryRecordStore</code> | In Memory Managed Memory Record Store class with 11 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryMemoryIdempotencyStore` | class | <code>new InMemoryMemoryIdempotencyStore(): InMemoryMemoryIdempotencyStore</code> | In Memory Memory Idempotency Store class with 3 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryMemoryIndexOutboxStore` | class | <code>new InMemoryMemoryIndexOutboxStore(): InMemoryMemoryIndexOutboxStore</code> | In Memory Memory Index Outbox Store class with 8 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryMemoryPersistenceUnitOfWork` | class | <code>new InMemoryMemoryPersistenceUnitOfWork(recordStore?: ManagedMemoryRecordStore, outboxStore?: MemoryIndexOutboxStore): InMemoryMemoryPersistenceUnitOfWork</code> | In Memory Memory Persistence Unit Of Work class with 5 public constructor or member entries; its exact declarations are listed below. |
| `matchesFilter` | function | <code>matchesFilter(record: ManagedMemoryRecord, filter?: MemorySearchFilter): boolean</code> | Matches Filter function with 1 public call signature; parameters and return types are listed below. |
| `ManagedMemoryRecordQuery` | interface | <code>interface ManagedMemoryRecordQuery</code> | Managed Memory Record Query interface with 5 public fields or methods. |
| `ManagedMemoryRecordStore` | interface | <code>interface ManagedMemoryRecordStore</code> | Managed Memory Record Store interface with 10 public fields or methods. |
| `MemoryIdempotencyStore` | interface | <code>interface MemoryIdempotencyStore</code> | Memory Idempotency Store interface with 2 public fields or methods. |
| `MemoryIndexOutboxRecord` | interface | <code>interface MemoryIndexOutboxRecord</code> | Memory Index Outbox Record interface with 19 public fields or methods. |
| `MemoryIndexOutboxStore` | interface | <code>interface MemoryIndexOutboxStore</code> | Memory Index Outbox Store interface with 7 public fields or methods. |
| `MemoryPersistenceCapabilities` | interface | <code>interface MemoryPersistenceCapabilities</code> | Memory Persistence Capabilities interface with 2 public fields or methods. |
| `MemoryPersistenceTransaction` | interface | <code>interface MemoryPersistenceTransaction</code> | Memory Persistence Transaction interface with 2 public fields or methods. |
| `MemoryPersistenceUnitOfWork` | interface | <code>interface MemoryPersistenceUnitOfWork extends MemoryPersistenceTransaction</code> | Memory Persistence Unit Of Work interface with 4 public fields or methods. |

## `InMemoryManagedMemoryRecordStore`

In Memory Managed Memory Record Store class with 11 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryManagedMemoryRecordStore } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### Declaration

```text
export declare class InMemoryManagedMemoryRecordStore implements ManagedMemoryRecordStore {
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
| `constructor` | constructor | <code>(): InMemoryManagedMemoryRecordStore</code> | Creates an instance of this class. |
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

## `InMemoryMemoryIdempotencyStore`

In Memory Memory Idempotency Store class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryMemoryIdempotencyStore } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### Declaration

```text
export declare class InMemoryMemoryIdempotencyStore implements MemoryIdempotencyStore {
    get(scopeHash: string, key: string): Promise<unknown | null>;
    set(scopeHash: string, key: string, result: unknown): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryMemoryIdempotencyStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(scopeHash: string, key: string): Promise&lt;unknown &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(scopeHash: string, key: string, result: unknown): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryMemoryIndexOutboxStore`

In Memory Memory Index Outbox Store class with 8 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryMemoryIndexOutboxStore } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### Declaration

```text
export declare class InMemoryMemoryIndexOutboxStore implements MemoryIndexOutboxStore {
    enqueue(record: MemoryIndexOutboxRecord): Promise<void>;
    lease(owner: string, now: string, leaseUntil: string, limit: number): Promise<MemoryIndexOutboxRecord[]>;
    renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise<boolean>;
    complete(id: string, owner: string, leaseToken: string, now: string): Promise<boolean>;
    fail(id: string, owner: string, leaseToken: string, now: string, error: import('./contracts').NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise<boolean>;
    list(): Promise<MemoryIndexOutboxRecord[]>;
    transaction<T>(fn: (store: MemoryIndexOutboxStore) => Promise<T>): Promise<T>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(id: string, owner: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): InMemoryMemoryIndexOutboxStore</code> | Creates an instance of this class. |
| `enqueue` | method | <code>enqueue(record: MemoryIndexOutboxRecord): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `fail` | method | <code>fail(id: string, owner: string, leaseToken: string, now: string, error: import("./contracts").NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `lease` | method | <code>lease(owner: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (store: MemoryIndexOutboxStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryMemoryPersistenceUnitOfWork`

In Memory Memory Persistence Unit Of Work class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryMemoryPersistenceUnitOfWork } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### Declaration

```text
export declare class InMemoryMemoryPersistenceUnitOfWork implements MemoryPersistenceUnitOfWork {
    readonly recordStore: ManagedMemoryRecordStore;
    readonly outboxStore: MemoryIndexOutboxStore;
    readonly capabilities: MemoryPersistenceCapabilities;
    constructor(recordStore?: ManagedMemoryRecordStore, outboxStore?: MemoryIndexOutboxStore);
    transaction<T>(fn: (stores: MemoryPersistenceTransaction) => Promise<T>): Promise<T>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>readonly capabilities: MemoryPersistenceCapabilities</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(recordStore?: ManagedMemoryRecordStore, outboxStore?: MemoryIndexOutboxStore): InMemoryMemoryPersistenceUnitOfWork</code> | Creates an instance of this class. |
| `outboxStore` | property | <code>readonly outboxStore: MemoryIndexOutboxStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordStore` | property | <code>readonly recordStore: ManagedMemoryRecordStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (stores: MemoryPersistenceTransaction) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `matchesFilter`

Matches Filter function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { matchesFilter } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### Declaration

```text
export declare function matchesFilter(record: ManagedMemoryRecord, filter?: MemorySearchFilter): boolean;
```

### Call signature

```text
matchesFilter(record: ManagedMemoryRecord, filter?: MemorySearchFilter): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `record` | <code>ManagedMemoryRecord&lt;unknown&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `filter` | <code>MemorySearchFilter</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `ManagedMemoryRecordQuery`

Managed Memory Record Query interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ManagedMemoryRecordQuery } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### Declaration

```text
export interface ManagedMemoryRecordQuery {
    scope: ManagedMemoryScope;
    filter?: MemorySearchFilter;
    includeSuperseded?: boolean;
    includeInvalidated?: boolean;
    limit?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filter` | property | <code>filter?: MemorySearchFilter</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeInvalidated` | property | <code>includeInvalidated?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeSuperseded` | property | <code>includeSuperseded?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `limit` | property | <code>limit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ManagedMemoryRecordStore`

Managed Memory Record Store interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { ManagedMemoryRecordStore } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### Declaration

```text
export interface ManagedMemoryRecordStore {
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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
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

## `MemoryIdempotencyStore`

Memory Idempotency Store interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryIdempotencyStore } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### Declaration

```text
export interface MemoryIdempotencyStore {
    get(scopeHash: string, key: string): Promise<unknown | null>;
    set(scopeHash: string, key: string, result: unknown): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(scopeHash: string, key: string): Promise&lt;unknown &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(scopeHash: string, key: string, result: unknown): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryIndexOutboxRecord`

Memory Index Outbox Record interface with 19 public fields or methods.

- Kind: interface
- Import: `import type { MemoryIndexOutboxRecord } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### Declaration

```text
export interface MemoryIndexOutboxRecord {
    id: string;
    operationId: string;
    memoryId: string;
    memoryVersionId: string;
    /** Logical Memory revision; distinct from this outbox record's lease fencing token. */
    memoryRevision?: number;
    scopeHash: string;
    action: 'upsert' | 'delete' | 'reindex';
    targetVectorStoreIds: string[];
    state: 'pending' | 'processing' | 'completed' | 'partial' | 'failed' | 'dead_letter';
    attempts: number;
    availableAt: string;
    completedVectorStoreIds?: string[];
    leaseOwner?: string;
    leaseToken?: string;
    leaseExpiresAt?: string;
    fencingToken?: number;
    lastError?: import('./contracts').NormalizedMemoryError;
    createdAt: string;
    updatedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `action` | property | <code>action: "delete" &#124; "reindex" &#124; "upsert"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `attempts` | property | <code>attempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `availableAt` | property | <code>availableAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `completedVectorStoreIds` | property | <code>completedVectorStoreIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastError` | property | <code>lastError?: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/contracts").NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseExpiresAt` | property | <code>leaseExpiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseOwner` | property | <code>leaseOwner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseToken` | property | <code>leaseToken?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryId` | property | <code>memoryId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryRevision` | property | <code>memoryRevision?: number</code> | Logical Memory revision; distinct from this outbox record's lease fencing token. |
| `memoryVersionId` | property | <code>memoryVersionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: "completed" &#124; "failed" &#124; "processing" &#124; "pending" &#124; "dead_letter" &#124; "partial"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetVectorStoreIds` | property | <code>targetVectorStoreIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryIndexOutboxStore`

Memory Index Outbox Store interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MemoryIndexOutboxStore } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### Declaration

```text
export interface MemoryIndexOutboxStore {
    enqueue(record: MemoryIndexOutboxRecord): Promise<void>;
    lease(owner: string, now: string, leaseUntil: string, limit: number): Promise<MemoryIndexOutboxRecord[]>;
    renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise<boolean>;
    complete(id: string, owner: string, leaseToken: string, now: string): Promise<boolean>;
    fail(id: string, owner: string, leaseToken: string, now: string, error: import('./contracts').NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise<boolean>;
    list(): Promise<MemoryIndexOutboxRecord[]>;
    transaction<T>(fn: (store: MemoryIndexOutboxStore) => Promise<T>): Promise<T>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(id: string, owner: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `enqueue` | method | <code>enqueue(record: MemoryIndexOutboxRecord): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `fail` | method | <code>fail(id: string, owner: string, leaseToken: string, now: string, error: import("./contracts").NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `lease` | method | <code>lease(owner: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (store: MemoryIndexOutboxStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryPersistenceCapabilities`

Memory Persistence Capabilities interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryPersistenceCapabilities } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### Declaration

```text
export interface MemoryPersistenceCapabilities {
    durable: boolean;
    atomicRecordAndOutbox: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `atomicRecordAndOutbox` | property | <code>atomicRecordAndOutbox: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `durable` | property | <code>durable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryPersistenceTransaction`

Memory Persistence Transaction interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryPersistenceTransaction } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### Declaration

```text
export interface MemoryPersistenceTransaction {
    recordStore: ManagedMemoryRecordStore;
    outboxStore: MemoryIndexOutboxStore;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `outboxStore` | property | <code>outboxStore: MemoryIndexOutboxStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordStore` | property | <code>recordStore: ManagedMemoryRecordStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryPersistenceUnitOfWork`

Memory Persistence Unit Of Work interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryPersistenceUnitOfWork } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts)

### Declaration

```text
export interface MemoryPersistenceUnitOfWork extends MemoryPersistenceTransaction {
    capabilities: MemoryPersistenceCapabilities;
    transaction<T>(fn: (stores: MemoryPersistenceTransaction) => Promise<T>): Promise<T>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: MemoryPersistenceCapabilities</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outboxStore` | property | <code>outboxStore: MemoryIndexOutboxStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordStore` | property | <code>recordStore: ManagedMemoryRecordStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (stores: MemoryPersistenceTransaction) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |
