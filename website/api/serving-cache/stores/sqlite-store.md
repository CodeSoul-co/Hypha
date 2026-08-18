# `@codesoul-co/hypha-serving-cache` / `stores/sqlite-store`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Source: [`packages/serving-cache/src/stores/sqlite-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/sqlite-store.ts)
- Exports: **2**

## Using this module

Use the Sqlite store module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  SQLiteCacheStore,
} from '@codesoul-co/hypha-serving-cache';

import type {
  SQLiteCacheStoreOptions,
} from '@codesoul-co/hypha-serving-cache';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteCacheStore` | class | <code>new SQLiteCacheStore(options: SQLiteCacheStoreOptions): SQLiteCacheStore</code> | SQLite Cache Store class with 6 public constructor or member entries; its exact declarations are listed below. |
| `SQLiteCacheStoreOptions` | interface | <code>interface SQLiteCacheStoreOptions</code> | SQLite Cache Store Options interface with 3 public fields or methods. |

## `SQLiteCacheStore`

SQLite Cache Store class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SQLiteCacheStore } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`stores/sqlite-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/sqlite-store.ts)

### Declaration

```text
export declare class SQLiteCacheStore implements CacheStore {
    constructor(options: SQLiteCacheStoreOptions);
    get<T>(key: string): Promise<CacheEntry<T> | null>;
    set<T>(key: string, entry: CacheEntry<T>): Promise<void>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
    touch(key: string, timestamp: number): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: SQLiteCacheStoreOptions): SQLiteCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get&lt;T&gt;(key: string): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set&lt;T&gt;(key: string, entry: CacheEntry&lt;T&gt;): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `touch` | method | <code>touch(key: string, timestamp: number): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SQLiteCacheStoreOptions`

SQLite Cache Store Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SQLiteCacheStoreOptions } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`stores/sqlite-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/sqlite-store.ts)

### Declaration

```text
export interface SQLiteCacheStoreOptions {
    filename: string;
    required?: boolean;
    maxEntries?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEntries` | property | <code>maxEntries?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `required` | property | <code>required?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
