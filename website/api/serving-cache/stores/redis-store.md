# `@codesoul-co/hypha-serving-cache` / `stores/redis-store`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Source: [`packages/serving-cache/src/stores/redis-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/redis-store.ts)
- Exports: **3**

## Using this module

Use the Redis store module for persisting and reading data at this boundary. It exports 1 class, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  RedisCacheStore,
} from '@codesoul-co/hypha-serving-cache';

import type {
  RedisCacheClient,
  RedisCacheStoreOptions,
} from '@codesoul-co/hypha-serving-cache';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RedisCacheStore` | class | <code>new RedisCacheStore(options: RedisCacheStoreOptions): RedisCacheStore</code> | Redis Cache Store class with 7 public constructor or member entries; its exact declarations are listed below. |
| `RedisCacheClient` | interface | <code>interface RedisCacheClient</code> | Redis Cache Client interface with 6 public fields or methods. |
| `RedisCacheStoreOptions` | interface | <code>interface RedisCacheStoreOptions</code> | Redis Cache Store Options interface with 4 public fields or methods. |

## `RedisCacheStore`

Redis Cache Store class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { RedisCacheStore } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`stores/redis-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/redis-store.ts)

### Declaration

```text
export declare class RedisCacheStore implements CacheStore {
    constructor(options: RedisCacheStoreOptions);
    get<T>(key: string): Promise<CacheEntry<T> | null>;
    set<T>(key: string, entry: CacheEntry<T>): Promise<void>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
    health(): Promise<CacheStoreHealth>;
    close(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: RedisCacheStoreOptions): RedisCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get&lt;T&gt;(key: string): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;CacheStoreHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set&lt;T&gt;(key: string, entry: CacheEntry&lt;T&gt;): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RedisCacheClient`

Redis Cache Client interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RedisCacheClient } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`stores/redis-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/redis-store.ts)

### Declaration

```text
export interface RedisCacheClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ...args: Array<string | number>): Promise<unknown>;
    del(...keys: string[]): Promise<number>;
    scan(cursor: string, ...args: Array<string | number>): Promise<[string, string[]]>;
    ping?(): Promise<string>;
    quit?(): Promise<unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `del` | method | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `ping` | method | <code>ping?(): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `quit` | method | <code>quit?(): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `scan` | method | <code>scan(cursor: string, ...args: Array&lt;string &#124; number&gt;): Promise&lt;[string, string[]]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(key: string, value: string, ...args: Array&lt;string &#124; number&gt;): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RedisCacheStoreOptions`

Redis Cache Store Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RedisCacheStoreOptions } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`stores/redis-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/redis-store.ts)

### Declaration

```text
export interface RedisCacheStoreOptions {
    client: RedisCacheClient;
    prefix?: string;
    closeClient?: boolean;
    now?: () => number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `client` | property | <code>client: RedisCacheClient</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `closeClient` | property | <code>closeClient?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): number</code> | Public method; parameters and return type are shown in the signature. |
| `prefix` | property | <code>prefix?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
