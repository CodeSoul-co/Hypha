# `@codesoul-co/hypha-adapters-local` / `redis-execution-cache-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/redis-execution-cache-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/redis-execution-cache-store.ts)
- Exports: **3**

## Using this module

Use the Redis execution cache store module for persisting and reading data at this boundary. It exports 1 class, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  RedisExecutionCacheStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  RedisExecutionCacheStoreOptions,
  RedisLikeExecutionCacheClient,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RedisExecutionCacheStore` | class | <code>new RedisExecutionCacheStore(options: RedisExecutionCacheStoreOptions): RedisExecutionCacheStore</code> | Key-bound shared Execution Cache Store. The client port can wrap local, self-hosted, or managed Redis without exposing a Redis SDK to Core. |
| `RedisExecutionCacheStoreOptions` | interface | <code>interface RedisExecutionCacheStoreOptions</code> | Redis Execution Cache Store Options interface with 5 public fields or methods. |
| `RedisLikeExecutionCacheClient` | interface | <code>interface RedisLikeExecutionCacheClient</code> | Redis Like Execution Cache Client interface with 3 public fields or methods. |

## `RedisExecutionCacheStore`

Key-bound shared Execution Cache Store. The client port can wrap local, self-hosted, or managed Redis without exposing a Redis SDK to Core.

- Kind: class
- Import: `import { RedisExecutionCacheStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`redis-execution-cache-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/redis-execution-cache-store.ts)

### Declaration

```text
export declare class RedisExecutionCacheStore implements ExecutionCacheStore {
    constructor(options: RedisExecutionCacheStoreOptions);
    get(key: string): Promise<ExecutionCacheRecord | null>;
    set(key: string, input: ExecutionCacheRecord): Promise<void>;
    delete(key: string): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RedisExecutionCacheStoreOptions): RedisExecutionCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;ExecutionCacheRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(key: string, input: ExecutionCacheRecord): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RedisExecutionCacheStoreOptions`

Redis Execution Cache Store Options interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RedisExecutionCacheStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`redis-execution-cache-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/redis-execution-cache-store.ts)

### Declaration

```text
export interface RedisExecutionCacheStoreOptions {
    client: RedisLikeExecutionCacheClient;
    namespace?: string;
    maxEntryBytes?: number;
    defaultTtlMs?: number;
    now?: () => number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `client` | property | <code>client: RedisLikeExecutionCacheClient</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultTtlMs` | property | <code>defaultTtlMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEntryBytes` | property | <code>maxEntryBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `namespace` | property | <code>namespace?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): number</code> | Public method; parameters and return type are shown in the signature. |

## `RedisLikeExecutionCacheClient`

Redis Like Execution Cache Client interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RedisLikeExecutionCacheClient } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`redis-execution-cache-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/redis-execution-cache-store.ts)

### Declaration

```text
export interface RedisLikeExecutionCacheClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, mode: 'PX', durationMilliseconds: number): Promise<unknown>;
    del(...keys: string[]): Promise<number>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `del` | method | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(key: string, value: string, mode: "PX", durationMilliseconds: number): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
