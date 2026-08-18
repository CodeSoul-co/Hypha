# `@codesoul-co/hypha-serving-cache` / `stores/memory-store`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Source: [`packages/serving-cache/src/stores/memory-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/memory-store.ts)
- Exports: **2**

## Using this module

Use the Memory store module for persisting and reading data at this boundary. It exports 2 classes.

### Import from the package entrypoint

```ts
import {
  MemoryCacheStore,
  NoopCacheStore,
} from '@codesoul-co/hypha-serving-cache';
```

### Usage patterns

- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryCacheStore` | class | <code>new MemoryCacheStore(options?: { maxEntries?: number; maxBytes?: number; }): MemoryCacheStore</code> | Memory Cache Store class with 8 public constructor or member entries; its exact declarations are listed below. |
| `NoopCacheStore` | class | <code>new NoopCacheStore(): NoopCacheStore</code> | Noop Cache Store class with 5 public constructor or member entries; its exact declarations are listed below. |

## `MemoryCacheStore`

Memory Cache Store class with 8 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryCacheStore } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`stores/memory-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/memory-store.ts)

### Declaration

```text
export declare class MemoryCacheStore implements CacheStore {
    constructor(options?: {
            maxEntries?: number;
            maxBytes?: number;
        });
    get<T>(key: string): Promise<CacheEntry<T> | null>;
    set<T>(key: string, entry: CacheEntry<T>): Promise<void>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
    touch(key: string): Promise<void>;
    stats(): Promise<CacheStoreStats>;
    health(): Promise<CacheStoreHealth>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options?: { maxEntries?: number; maxBytes?: number; }): MemoryCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get&lt;T&gt;(key: string): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;CacheStoreHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set&lt;T&gt;(key: string, entry: CacheEntry&lt;T&gt;): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `stats` | method | <code>stats(): Promise&lt;CacheStoreStats&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `touch` | method | <code>touch(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `NoopCacheStore`

Noop Cache Store class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { NoopCacheStore } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`stores/memory-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/memory-store.ts)

### Declaration

```text
export declare class NoopCacheStore implements CacheStore {
    get<T>(): Promise<CacheEntry<T> | null>;
    set<T>(): Promise<void>;
    delete(): Promise<void>;
    clear(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): NoopCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get&lt;T&gt;(): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set&lt;T&gt;(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
