# `@codesoul-co/hypha-memory` / `working-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/working-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts)
- Exports: **6**

## Using this module

Use the Working store module for persisting and reading data at this boundary. It exports 2 classes, 4 interfaces.

### Import from the package entrypoint

```ts
import {
  InMemoryWorkingMemoryStore,
  RedisWorkingMemoryStore,
} from '@codesoul-co/hypha-memory';

import type {
  RedisLikeWorkingMemoryClient,
  RedisWorkingMemoryStoreOptions,
  WorkingMemoryEntry,
  WorkingMemoryStore,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryWorkingMemoryStore` | class | <code>new InMemoryWorkingMemoryStore(now?: () =&gt; Date): InMemoryWorkingMemoryStore</code> | In Memory Working Memory Store class with 7 public constructor or member entries; its exact declarations are listed below. |
| `RedisWorkingMemoryStore` | class | <code>new RedisWorkingMemoryStore(options: RedisWorkingMemoryStoreOptions): RedisWorkingMemoryStore</code> | Redis Working Memory Store class with 7 public constructor or member entries; its exact declarations are listed below. |
| `RedisLikeWorkingMemoryClient` | interface | <code>interface RedisLikeWorkingMemoryClient</code> | Redis Like Working Memory Client interface with 5 public fields or methods. |
| `RedisWorkingMemoryStoreOptions` | interface | <code>interface RedisWorkingMemoryStoreOptions</code> | Redis Working Memory Store Options interface with 7 public fields or methods. |
| `WorkingMemoryEntry` | interface | <code>interface WorkingMemoryEntry</code> | Working Memory Entry interface with 8 public fields or methods. |
| `WorkingMemoryStore` | interface | <code>interface WorkingMemoryStore</code> | Working Memory Store interface with 6 public fields or methods. |

## `InMemoryWorkingMemoryStore`

In Memory Working Memory Store class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryWorkingMemoryStore } from '@codesoul-co/hypha-memory';`
- Source module: [`working-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts)

### Declaration

```text
export declare class InMemoryWorkingMemoryStore implements WorkingMemoryStore {
    constructor(now?: () => Date);
    get<TValue = unknown>(scope: ManagedMemoryScope, id: string): Promise<WorkingMemoryEntry<TValue> | null>;
    set<TValue = unknown>(entry: Omit<WorkingMemoryEntry<TValue>, 'scopeHash'>, ttlSeconds?: number): Promise<WorkingMemoryEntry<TValue>>;
    delete(scope: ManagedMemoryScope, id: string): Promise<void>;
    list<TValue = unknown>(scope: ManagedMemoryScope): Promise<Array<WorkingMemoryEntry<TValue>>>;
    clearScope(scope: ManagedMemoryScope): Promise<void>;
    health(): Promise<ProviderHealth>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clearScope` | method | <code>clearScope(scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(now?: () =&gt; Date): InMemoryWorkingMemoryStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(scope: ManagedMemoryScope, id: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, id: string): Promise&lt;WorkingMemoryEntry&lt;TValue&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set&lt;TValue = unknown&gt;(entry: Omit&lt;WorkingMemoryEntry&lt;TValue&gt;, "scopeHash"&gt;, ttlSeconds?: number): Promise&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RedisWorkingMemoryStore`

Redis Working Memory Store class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { RedisWorkingMemoryStore } from '@codesoul-co/hypha-memory';`
- Source module: [`working-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts)

### Declaration

```text
export declare class RedisWorkingMemoryStore implements WorkingMemoryStore {
    constructor(options: RedisWorkingMemoryStoreOptions);
    get<TValue = unknown>(scope: ManagedMemoryScope, id: string): Promise<WorkingMemoryEntry<TValue> | null>;
    set<TValue = unknown>(entry: Omit<WorkingMemoryEntry<TValue>, 'scopeHash'>, ttlSeconds?: number | undefined): Promise<WorkingMemoryEntry<TValue>>;
    delete(scope: ManagedMemoryScope, id: string): Promise<void>;
    list<TValue = unknown>(scope: ManagedMemoryScope): Promise<Array<WorkingMemoryEntry<TValue>>>;
    clearScope(scope: ManagedMemoryScope): Promise<void>;
    health(): Promise<ProviderHealth>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clearScope` | method | <code>clearScope(scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: RedisWorkingMemoryStoreOptions): RedisWorkingMemoryStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(scope: ManagedMemoryScope, id: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, id: string): Promise&lt;WorkingMemoryEntry&lt;TValue&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set&lt;TValue = unknown&gt;(entry: Omit&lt;WorkingMemoryEntry&lt;TValue&gt;, "scopeHash"&gt;, ttlSeconds?: number &#124; undefined): Promise&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RedisLikeWorkingMemoryClient`

Redis Like Working Memory Client interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RedisLikeWorkingMemoryClient } from '@codesoul-co/hypha-memory';`
- Source module: [`working-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts)

### Declaration

```text
export interface RedisLikeWorkingMemoryClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, mode?: 'EX', durationSeconds?: number): Promise<unknown>;
    del(...keys: string[]): Promise<number>;
    scan(cursor: string, matchToken: 'MATCH', pattern: string, countToken: 'COUNT', count: number): Promise<[string, string[]]>;
    ping?(): Promise<string>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `del` | method | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `ping` | method | <code>ping?(): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `scan` | method | <code>scan(cursor: string, matchToken: "MATCH", pattern: string, countToken: "COUNT", count: number): Promise&lt;[string, string[]]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(key: string, value: string, mode?: "EX", durationSeconds?: number): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RedisWorkingMemoryStoreOptions`

Redis Working Memory Store Options interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { RedisWorkingMemoryStoreOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`working-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts)

### Declaration

```text
export interface RedisWorkingMemoryStoreOptions {
    client: RedisLikeWorkingMemoryClient;
    namespace?: string;
    defaultTtlSeconds?: number;
    scanCount?: number;
    scanBudget?: Partial<Omit<RedisScanBudget, 'count'>>;
    now?: () => Date;
    nowMs?: () => number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `client` | property | <code>client: RedisLikeWorkingMemoryClient</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultTtlSeconds` | property | <code>defaultTtlSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `namespace` | property | <code>namespace?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `nowMs` | method | <code>nowMs?(): number</code> | Public method; parameters and return type are shown in the signature. |
| `scanBudget` | property | <code>scanBudget?: Partial&lt;Omit&lt;RedisScanBudget, "count"&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scanCount` | property | <code>scanCount?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkingMemoryEntry`

Working Memory Entry interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { WorkingMemoryEntry } from '@codesoul-co/hypha-memory';`
- Source module: [`working-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts)

### Declaration

```text
export interface WorkingMemoryEntry<TValue = unknown> {
    id: string;
    scope: ManagedMemoryScope;
    scopeHash: string;
    value: TValue;
    createdAt: string;
    updatedAt: string;
    expiresAt?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `value` | property | <code>value: TValue</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkingMemoryStore`

Working Memory Store interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { WorkingMemoryStore } from '@codesoul-co/hypha-memory';`
- Source module: [`working-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts)

### Declaration

```text
export interface WorkingMemoryStore {
    get<TValue = unknown>(scope: ManagedMemoryScope, id: string): Promise<WorkingMemoryEntry<TValue> | null>;
    set<TValue = unknown>(entry: Omit<WorkingMemoryEntry<TValue>, 'scopeHash'>, ttlSeconds?: number): Promise<WorkingMemoryEntry<TValue>>;
    delete(scope: ManagedMemoryScope, id: string): Promise<void>;
    list<TValue = unknown>(scope: ManagedMemoryScope): Promise<Array<WorkingMemoryEntry<TValue>>>;
    clearScope(scope: ManagedMemoryScope): Promise<void>;
    health(): Promise<ProviderHealth>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clearScope` | method | <code>clearScope(scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `delete` | method | <code>delete(scope: ManagedMemoryScope, id: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, id: string): Promise&lt;WorkingMemoryEntry&lt;TValue&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set&lt;TValue = unknown&gt;(entry: Omit&lt;WorkingMemoryEntry&lt;TValue&gt;, "scopeHash"&gt;, ttlSeconds?: number): Promise&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
