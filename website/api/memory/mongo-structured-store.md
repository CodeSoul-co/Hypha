# `@codesoul-co/hypha-memory` / `mongo-structured-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/mongo-structured-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)
- Exports: **10**

## Using this module

Use the Mongo structured store module for persisting and reading data at this boundary. It exports 1 class, 1 function, 7 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  MongoStructuredStoreProvider,
  normalizeMongoStructuredStoreError,
} from '@codesoul-co/hypha-memory';

import type {
  MongoCollectionLike,
  MongoCursorLike,
  MongoDatabaseLike,
  MongoOperationOptionsLike,
  MongoSessionLike,
  MongoStructuredStoreHealth,
  MongoStructuredStoreProviderOptions,
  MongoTransactionMode,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 8 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MongoStructuredStoreProvider` | class | <code>new MongoStructuredStoreProvider(options: MongoStructuredStoreProviderOptions, session?: MongoSessionLike &#124; undefined): MongoStructuredStoreProvider</code> | Mongo-backed StructuredStoreProvider without leaking a Mongo SDK into Memory contracts. |
| `normalizeMongoStructuredStoreError` | function | <code>normalizeMongoStructuredStoreError(error: unknown, operation: string): import("./contracts").NormalizedMemoryError</code> | Normalize Mongo Structured Store Error function with 1 public call signature; parameters and return types are listed below. |
| `MongoCollectionLike` | interface | <code>interface MongoCollectionLike</code> | Mongo Collection Like interface with 6 public fields or methods. |
| `MongoCursorLike` | interface | <code>interface MongoCursorLike</code> | Mongo Cursor Like interface with 3 public fields or methods. |
| `MongoDatabaseLike` | interface | <code>interface MongoDatabaseLike</code> | Mongo Database Like interface with 3 public fields or methods. |
| `MongoOperationOptionsLike` | interface | <code>interface MongoOperationOptionsLike</code> | Mongo Operation Options Like interface with 1 public fields or methods. |
| `MongoSessionLike` | interface | <code>interface MongoSessionLike</code> | Mongo Session Like interface with 2 public fields or methods. |
| `MongoStructuredStoreHealth` | interface | <code>interface MongoStructuredStoreHealth</code> | Mongo Structured Store Health interface with 3 public fields or methods. |
| `MongoStructuredStoreProviderOptions` | interface | <code>interface MongoStructuredStoreProviderOptions</code> | Mongo Structured Store Provider Options interface with 3 public fields or methods. |
| `MongoTransactionMode` | type | <code>type MongoTransactionMode = 'required' &#124; 'preferred' &#124; 'disabled'</code> | Public type alias for Mongo Transaction Mode; the declaration contains its complete type expression. |

## `MongoStructuredStoreProvider`

Mongo-backed StructuredStoreProvider without leaking a Mongo SDK into Memory contracts.

- Kind: class
- Import: `import { MongoStructuredStoreProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### Declaration

```text
export declare class MongoStructuredStoreProvider implements StructuredStoreProvider {
    constructor(options: MongoStructuredStoreProviderOptions, session?: MongoSessionLike | undefined);
    get<T>(table: string, id: string): Promise<T | null>;
    insert<T extends {
            id: string;
        }>(table: string, record: T): Promise<void>;
    update<T>(table: string, id: string, patch: Partial<T>): Promise<void>;
    compareAndSet<T>(table: string, id: string, expected: Partial<T>, patch: Partial<T>): Promise<boolean>;
    delete(table: string, id: string): Promise<void>;
    query<T>(table: string, query: StructuredQuery): Promise<T[]>;
    transaction<T>(operation: (tx: StructuredStoreProvider) => Promise<T>): Promise<T>;
    supportsTransactions(): boolean;
    initialize(collections: readonly string[]): Promise<void>;
    health(): Promise<MongoStructuredStoreHealth>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compareAndSet` | method | <code>compareAndSet&lt;T&gt;(table: string, id: string, expected: Partial&lt;T&gt;, patch: Partial&lt;T&gt;): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: MongoStructuredStoreProviderOptions, session?: MongoSessionLike &#124; undefined): MongoStructuredStoreProvider</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(table: string, id: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get&lt;T&gt;(table: string, id: string): Promise&lt;T &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;MongoStructuredStoreHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `initialize` | method | <code>initialize(collections: readonly string[]): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `insert` | method | <code>insert&lt;T extends { id: string; }&gt;(table: string, record: T): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `query` | method | <code>query&lt;T&gt;(table: string, query: StructuredQuery): Promise&lt;T[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `supportsTransactions` | method | <code>supportsTransactions(): boolean</code> | Public method; parameters and return type are shown in the signature. |
| `transaction` | method | <code>transaction&lt;T&gt;(operation: (tx: StructuredStoreProvider) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update&lt;T&gt;(table: string, id: string, patch: Partial&lt;T&gt;): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `normalizeMongoStructuredStoreError`

Normalize Mongo Structured Store Error function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizeMongoStructuredStoreError } from '@codesoul-co/hypha-memory';`
- Source module: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### Declaration

```text
export declare function normalizeMongoStructuredStoreError(error: unknown, operation: string): import("./contracts").NormalizedMemoryError;
```

### Call signature

```text
normalizeMongoStructuredStoreError(error: unknown, operation: string): import("./contracts").NormalizedMemoryError
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `operation` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `NormalizedMemoryError`
- Description: The return contract is defined by the type shown above.

## `MongoCollectionLike`

Mongo Collection Like interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MongoCollectionLike } from '@codesoul-co/hypha-memory';`
- Source module: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### Declaration

```text
export interface MongoCollectionLike {
    findOne<T>(filter: Record<string, unknown>, options?: MongoOperationOptionsLike): Promise<T | null>;
    insertOne<T extends object>(document: T, options?: MongoOperationOptionsLike): Promise<unknown>;
    updateOne(filter: Record<string, unknown>, update: {
        $set: Record<string, unknown>;
    }, options?: MongoOperationOptionsLike): Promise<{
        matchedCount?: number;
    }>;
    deleteOne(filter: Record<string, unknown>, options?: MongoOperationOptionsLike): Promise<{
        deletedCount?: number;
    }>;
    find<T>(filter: Record<string, unknown>, options?: MongoOperationOptionsLike): MongoCursorLike<T>;
    createIndex?(keys: Record<string, 1 | -1>, options?: {
        unique?: boolean;
        name?: string;
    }): Promise<unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createIndex` | method | <code>createIndex?(keys: Record&lt;string, 1 &#124; -1&gt;, options?: { unique?: boolean; name?: string; }): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `deleteOne` | method | <code>deleteOne(filter: Record&lt;string, unknown&gt;, options?: MongoOperationOptionsLike): Promise&lt;{ deletedCount?: number; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `find` | method | <code>find&lt;T&gt;(filter: Record&lt;string, unknown&gt;, options?: MongoOperationOptionsLike): MongoCursorLike&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `findOne` | method | <code>findOne&lt;T&gt;(filter: Record&lt;string, unknown&gt;, options?: MongoOperationOptionsLike): Promise&lt;T &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `insertOne` | method | <code>insertOne&lt;T extends object&gt;(document: T, options?: MongoOperationOptionsLike): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `updateOne` | method | <code>updateOne(filter: Record&lt;string, unknown&gt;, update: { $set: Record&lt;string, unknown&gt;; }, options?: MongoOperationOptionsLike): Promise&lt;{ matchedCount?: number; }&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MongoCursorLike`

Mongo Cursor Like interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MongoCursorLike } from '@codesoul-co/hypha-memory';`
- Source module: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### Declaration

```text
export interface MongoCursorLike<T> {
    sort?(order: Record<string, 1 | -1>): MongoCursorLike<T>;
    limit?(limit: number): MongoCursorLike<T>;
    toArray(): Promise<T[]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `limit` | method | <code>limit?(limit: number): MongoCursorLike&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `sort` | method | <code>sort?(order: Record&lt;string, 1 &#124; -1&gt;): MongoCursorLike&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `toArray` | method | <code>toArray(): Promise&lt;T[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MongoDatabaseLike`

Mongo Database Like interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MongoDatabaseLike } from '@codesoul-co/hypha-memory';`
- Source module: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### Declaration

```text
export interface MongoDatabaseLike {
    collection(name: string): MongoCollectionLike;
    startSession?(): MongoSessionLike;
    command?(command: Record<string, unknown>): Promise<unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collection` | method | <code>collection(name: string): MongoCollectionLike</code> | Public method; parameters and return type are shown in the signature. |
| `command` | method | <code>command?(command: Record&lt;string, unknown&gt;): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `startSession` | method | <code>startSession?(): MongoSessionLike</code> | Public method; parameters and return type are shown in the signature. |

## `MongoOperationOptionsLike`

Mongo Operation Options Like interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MongoOperationOptionsLike } from '@codesoul-co/hypha-memory';`
- Source module: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### Declaration

```text
export interface MongoOperationOptionsLike {
    session?: MongoSessionLike;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `session` | property | <code>session?: MongoSessionLike</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MongoSessionLike`

Mongo Session Like interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MongoSessionLike } from '@codesoul-co/hypha-memory';`
- Source module: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### Declaration

```text
export interface MongoSessionLike {
    withTransaction<T>(operation: () => Promise<T>): Promise<T>;
    endSession(): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `endSession` | method | <code>endSession(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `withTransaction` | method | <code>withTransaction&lt;T&gt;(operation: () =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MongoStructuredStoreHealth`

Mongo Structured Store Health interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MongoStructuredStoreHealth } from '@codesoul-co/hypha-memory';`
- Source module: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### Declaration

```text
export interface MongoStructuredStoreHealth {
    status: 'healthy' | 'degraded' | 'unhealthy';
    transactions: boolean;
    message?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `message` | property | <code>message?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "healthy" &#124; "degraded" &#124; "unhealthy"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transactions` | property | <code>transactions: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MongoStructuredStoreProviderOptions`

Mongo Structured Store Provider Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MongoStructuredStoreProviderOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### Declaration

```text
export interface MongoStructuredStoreProviderOptions {
    database: MongoDatabaseLike;
    transactionMode?: MongoTransactionMode;
    collectionPrefix?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collectionPrefix` | property | <code>collectionPrefix?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `database` | property | <code>database: MongoDatabaseLike</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transactionMode` | property | <code>transactionMode?: MongoTransactionMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MongoTransactionMode`

Public type alias for Mongo Transaction Mode; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MongoTransactionMode } from '@codesoul-co/hypha-memory';`
- Source module: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### Declaration

```text
export type MongoTransactionMode = 'required' | 'preferred' | 'disabled';
```
