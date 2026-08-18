# `@codesoul-co/hypha-core` / `modules/execution-cache/runtime`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-cache/runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/runtime.ts)
- Exports: **2**

## Using this module

Use the Runtime module for executing runtime behavior at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  ExecutionResultCache,
} from '@codesoul-co/hypha-core';

import type {
  ExecutionResultCacheOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExecutionResultCache` | class | <code>new ExecutionResultCache(options: ExecutionResultCacheOptions): ExecutionResultCache</code> | Conservative Result Cache for deterministic, read-only command executions. It returns an Execution-owned projection and never fabricates a new receipt, mutates a Workspace, or treats a hit as an executed side effect. |
| `ExecutionResultCacheOptions` | interface | <code>interface ExecutionResultCacheOptions</code> | Execution Result Cache Options interface with 9 public fields or methods. |

## `ExecutionResultCache`

Conservative Result Cache for deterministic, read-only command executions. It returns an Execution-owned projection and never fabricates a new receipt, mutates a Workspace, or treats a hit as an executed side effect.

- Kind: class
- Import: `import { ExecutionResultCache } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/runtime.ts)

### Declaration

```text
export declare class ExecutionResultCache {
    constructor(options: ExecutionResultCacheOptions);
    lookup(rawInput: ExecutionCacheLookupInput): Promise<ExecutionCacheLookupResult>;
    write(rawInput: ExecutionCacheWriteInput): Promise<boolean>;
    invalidate(rawInput: ExecutionCacheLookupInput): Promise<boolean>;
    close(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: ExecutionResultCacheOptions): ExecutionResultCache</code> | Creates an instance of this class. |
| `invalidate` | method | <code>invalidate(rawInput: ExecutionCacheLookupInput): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `lookup` | method | <code>lookup(rawInput: ExecutionCacheLookupInput): Promise&lt;ExecutionCacheLookupResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `write` | method | <code>write(rawInput: ExecutionCacheWriteInput): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ExecutionResultCacheOptions`

Execution Result Cache Options interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionResultCacheOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-cache/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/runtime.ts)

### Declaration

```text
export interface ExecutionResultCacheOptions {
    store: ExecutionCacheStore;
    hasher: ExecutionFingerprintHasher;
    artifactVerifier?: ExecutionCacheArtifactVerifier;
    failureMode?: ExecutionCacheFailureMode;
    operationTimeoutMs?: number;
    ttlMs?: number;
    maxEntryBytes?: number;
    now?: () => number;
    trace?: (event: ExecutionCacheEvent) => Promise<void> | void;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactVerifier` | property | <code>artifactVerifier?: ExecutionCacheArtifactVerifier</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failureMode` | property | <code>failureMode?: ExecutionCacheFailureMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hasher` | property | <code>hasher: ExecutionFingerprintHasher</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEntryBytes` | property | <code>maxEntryBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): number</code> | Public method; parameters and return type are shown in the signature. |
| `operationTimeoutMs` | property | <code>operationTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `store` | property | <code>store: ExecutionCacheStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trace` | method | <code>trace?(event: ExecutionCacheEvent): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |
| `ttlMs` | property | <code>ttlMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
