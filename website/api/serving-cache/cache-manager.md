# `@codesoul-co/hypha-serving-cache` / `cache-manager`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Source: [`packages/serving-cache/src/cache-manager.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/cache-manager.ts)
- Exports: **3**

## Using this module

Use the Cache manager module for reading, writing, or coordinating cache state. It exports 2 classes, 1 interface.

### Import from the package entrypoint

```ts
import {
  CacheEntryTooLargeError,
  ServingCacheManager,
} from '@codesoul-co/hypha-serving-cache';

import type {
  ServingCacheManagerOptions,
} from '@codesoul-co/hypha-serving-cache';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CacheEntryTooLargeError` | class | <code>new CacheEntryTooLargeError(sizeBytes: number, maxEntryBytes: number): CacheEntryTooLargeError</code> | Cache Entry Too Large Error class with 11 public constructor or member entries; its exact declarations are listed below. |
| `ServingCacheManager` | class | <code>new ServingCacheManager(options: ServingCacheManagerOptions): ServingCacheManager</code> | Serving Cache Manager class with 8 public constructor or member entries; its exact declarations are listed below. |
| `ServingCacheManagerOptions` | interface | <code>interface ServingCacheManagerOptions</code> | Serving Cache Manager Options interface with 3 public fields or methods. |

## `CacheEntryTooLargeError`

Cache Entry Too Large Error class with 11 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { CacheEntryTooLargeError } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`cache-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/cache-manager.ts)

### Declaration

```text
export declare class CacheEntryTooLargeError extends Error {
    readonly sizeBytes: number;
    readonly maxEntryBytes: number;
    readonly code = "CACHE_ENTRY_TOO_LARGE";
    constructor(sizeBytes: number, maxEntryBytes: number);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: "CACHE_ENTRY_TOO_LARGE"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(sizeBytes: number, maxEntryBytes: number): CacheEntryTooLargeError</code> | Creates an instance of this class. |
| `maxEntryBytes` | property | <code>readonly maxEntryBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>readonly sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `ServingCacheManager`

Serving Cache Manager class with 8 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ServingCacheManager } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`cache-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/cache-manager.ts)

### Declaration

```text
export declare class ServingCacheManager {
    readonly policy: CachePolicy;
    constructor(options: ServingCacheManagerOptions);
    keyFor(input: LLMCacheKeyInput): string;
    get<T>(key: string): Promise<CacheEntry<T> | null>;
    lookup<T>(key: string): Promise<CacheLookupResult<T>>;
    set<T>(key: string, value: T, metadata: CacheMetadata, ttlMs?: number | undefined): Promise<void>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: ServingCacheManagerOptions): ServingCacheManager</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get&lt;T&gt;(key: string): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `keyFor` | method | <code>keyFor(input: LLMCacheKeyInput): string</code> | Public method; parameters and return type are shown in the signature. |
| `lookup` | method | <code>lookup&lt;T&gt;(key: string): Promise&lt;CacheLookupResult&lt;T&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `policy` | property | <code>readonly policy: CachePolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `set` | method | <code>set&lt;T&gt;(key: string, value: T, metadata: CacheMetadata, ttlMs?: number &#124; undefined): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ServingCacheManagerOptions`

Serving Cache Manager Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ServingCacheManagerOptions } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`cache-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/cache-manager.ts)

### Declaration

```text
export interface ServingCacheManagerOptions {
    store: CacheStore;
    policy?: Partial<CachePolicy>;
    now?: () => number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now?(): number</code> | Public method; parameters and return type are shown in the signature. |
| `policy` | property | <code>policy?: Partial&lt;CachePolicy&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `store` | property | <code>store: CacheStore&lt;unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
