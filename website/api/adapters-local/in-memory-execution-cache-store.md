# `@codesoul-co/hypha-adapters-local` / `in-memory-execution-cache-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/in-memory-execution-cache-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-cache-store.ts)
- Exports: **4**

## Using this module

Use the In memory execution cache store module for persisting and reading data at this boundary. It exports 2 classes, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  InMemoryExecutionCacheStore,
  NodeExecutionFingerprintHasher,
} from '@codesoul-co/hypha-adapters-local';

import type {
  InMemoryExecutionCacheStoreOptions,
  InMemoryExecutionCacheStoreStats,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryExecutionCacheStore` | class | <code>new InMemoryExecutionCacheStore(options?: InMemoryExecutionCacheStoreOptions): InMemoryExecutionCacheStore</code> | Bounded local reference store. Durable or shared providers implement the same Core port. |
| `NodeExecutionFingerprintHasher` | class | <code>new NodeExecutionFingerprintHasher(): NodeExecutionFingerprintHasher</code> | Node Execution Fingerprint Hasher class with 3 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryExecutionCacheStoreOptions` | interface | <code>interface InMemoryExecutionCacheStoreOptions</code> | In Memory Execution Cache Store Options interface with 3 public fields or methods. |
| `InMemoryExecutionCacheStoreStats` | interface | <code>interface InMemoryExecutionCacheStoreStats</code> | In Memory Execution Cache Store Stats interface with 3 public fields or methods. |

## `InMemoryExecutionCacheStore`

Bounded local reference store. Durable or shared providers implement the same Core port.

- Kind: class
- Import: `import { InMemoryExecutionCacheStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`in-memory-execution-cache-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-cache-store.ts)

### Declaration

```text
export declare class InMemoryExecutionCacheStore implements ExecutionCacheStore {
    constructor(options?: InMemoryExecutionCacheStoreOptions);
    get(key: string): Promise<ExecutionCacheRecord | null>;
    set(key: string, rawRecord: ExecutionCacheRecord): Promise<void>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
    stats(): InMemoryExecutionCacheStoreStats;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options?: InMemoryExecutionCacheStoreOptions): InMemoryExecutionCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;ExecutionCacheRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(key: string, rawRecord: ExecutionCacheRecord): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `stats` | method | <code>stats(): InMemoryExecutionCacheStoreStats</code> | Public method; parameters and return type are shown in the signature. |

## `NodeExecutionFingerprintHasher`

Node Execution Fingerprint Hasher class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { NodeExecutionFingerprintHasher } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`in-memory-execution-cache-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-cache-store.ts)

### Declaration

```text
export declare class NodeExecutionFingerprintHasher implements ExecutionFingerprintHasher {
    readonly algorithm: "sha256";
    hashUtf8(canonicalValue: string): Promise<string>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `algorithm` | property | <code>readonly algorithm: "sha256"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(): NodeExecutionFingerprintHasher</code> | Creates an instance of this class. |
| `hashUtf8` | method | <code>hashUtf8(canonicalValue: string): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryExecutionCacheStoreOptions`

In Memory Execution Cache Store Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryExecutionCacheStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`in-memory-execution-cache-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-cache-store.ts)

### Declaration

```text
export interface InMemoryExecutionCacheStoreOptions {
    maxEntries?: number;
    maxBytes?: number;
    maxEntryBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxBytes` | property | <code>maxBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEntries` | property | <code>maxEntries?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEntryBytes` | property | <code>maxEntryBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InMemoryExecutionCacheStoreStats`

In Memory Execution Cache Store Stats interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryExecutionCacheStoreStats } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`in-memory-execution-cache-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-cache-store.ts)

### Declaration

```text
export interface InMemoryExecutionCacheStoreStats {
    entries: number;
    sizeBytes: number;
    evictions: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `entries` | property | <code>entries: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evictions` | property | <code>evictions: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
