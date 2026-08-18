# `@codesoul-co/hypha-inference` / `cache`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Source: [`packages/inference/src/cache.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)
- Exports: **10**

## Using this module

Use the Cache module for reading, writing, or coordinating cache state. It exports 2 classes, 4 functions, 3 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  InferenceCacheManager,
  InferenceCacheOperationTimeoutError,
  hashContent,
  inferenceCacheScopeHash,
  isKvCacheExpired,
  runInferenceCacheOperation,
} from '@codesoul-co/hypha-inference';

import type {
  InferenceCacheManagerOptions,
  KvCacheCreateInput,
  PrefixCacheCreateInput,
  InferenceCacheOperation,
} from '@codesoul-co/hypha-inference';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InferenceCacheManager` | class | <code>new InferenceCacheManager(options: InferenceCacheManagerOptions): InferenceCacheManager</code> | Inference Cache Manager class with 5 public constructor or member entries; its exact declarations are listed below. |
| `InferenceCacheOperationTimeoutError` | class | <code>new InferenceCacheOperationTimeoutError(operation: InferenceCacheOperation, timeoutMs: number): InferenceCacheOperationTimeoutError</code> | Inference Cache Operation Timeout Error class with 11 public constructor or member entries; its exact declarations are listed below. |
| `hashContent` | function | <code>hashContent(content: string): string</code> | Hash Content function with 1 public call signature; parameters and return types are listed below. |
| `inferenceCacheScopeHash` | function | <code>inferenceCacheScopeHash(scope: InferenceCacheScope &#124; undefined): string</code> | Inference Cache Scope Hash function with 1 public call signature; parameters and return types are listed below. |
| `isKvCacheExpired` | function | <code>isKvCacheExpired(ref: KvCacheRef, now?: Date): boolean</code> | Is Kv Cache Expired function with 1 public call signature; parameters and return types are listed below. |
| `runInferenceCacheOperation` | function | <code>runInferenceCacheOperation&lt;T&gt;(operation: InferenceCacheOperation, task: () =&gt; Promise&lt;T&gt;, timeoutMs: number): Promise&lt;T&gt;</code> | Run Inference Cache Operation function with 1 public call signature; parameters and return types are listed below. |
| `InferenceCacheManagerOptions` | interface | <code>interface InferenceCacheManagerOptions</code> | Inference Cache Manager Options interface with 4 public fields or methods. |
| `KvCacheCreateInput` | interface | <code>interface KvCacheCreateInput</code> | Kv Cache Create Input interface with 7 public fields or methods. |
| `PrefixCacheCreateInput` | interface | <code>interface PrefixCacheCreateInput</code> | Prefix Cache Create Input interface with 6 public fields or methods. |
| `InferenceCacheOperation` | type | <code>type InferenceCacheOperation = 'prefix_read' &#124; 'prefix_write' &#124; 'kv_read' &#124; 'kv_write' &#124; 'invalidate'</code> | Public type alias for Inference Cache Operation; the declaration contains its complete type expression. |

## `InferenceCacheManager`

Inference Cache Manager class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InferenceCacheManager } from '@codesoul-co/hypha-inference';`
- Source module: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### Declaration

```text
export declare class InferenceCacheManager {
    constructor(options: InferenceCacheManagerOptions);
    putPrefix(input: PrefixCacheCreateInput): Promise<PrefixCacheRef>;
    getPrefix(ref: PrefixCacheRef): Promise<string | null>;
    putKv(input: KvCacheCreateInput, value: unknown): Promise<KvCacheRef>;
    getKv(ref: KvCacheRef): Promise<unknown | null>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: InferenceCacheManagerOptions): InferenceCacheManager</code> | Creates an instance of this class. |
| `getKv` | method | <code>getKv(ref: KvCacheRef): Promise&lt;unknown &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getPrefix` | method | <code>getPrefix(ref: PrefixCacheRef): Promise&lt;string &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `putKv` | method | <code>putKv(input: KvCacheCreateInput, value: unknown): Promise&lt;KvCacheRef&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `putPrefix` | method | <code>putPrefix(input: PrefixCacheCreateInput): Promise&lt;PrefixCacheRef&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InferenceCacheOperationTimeoutError`

Inference Cache Operation Timeout Error class with 11 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InferenceCacheOperationTimeoutError } from '@codesoul-co/hypha-inference';`
- Source module: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### Declaration

```text
export declare class InferenceCacheOperationTimeoutError extends Error {
    readonly operation: InferenceCacheOperation;
    readonly timeoutMs: number;
    readonly code = "INFERENCE_CACHE_OPERATION_TIMEOUT";
    constructor(operation: InferenceCacheOperation, timeoutMs: number);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: "INFERENCE_CACHE_OPERATION_TIMEOUT"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(operation: InferenceCacheOperation, timeoutMs: number): InferenceCacheOperationTimeoutError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>readonly operation: InferenceCacheOperation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |
| `timeoutMs` | property | <code>readonly timeoutMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `hashContent`

Hash Content function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { hashContent } from '@codesoul-co/hypha-inference';`
- Source module: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### Declaration

```text
export declare function hashContent(content: string): string;
```

### Call signature

```text
hashContent(content: string): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `inferenceCacheScopeHash`

Inference Cache Scope Hash function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { inferenceCacheScopeHash } from '@codesoul-co/hypha-inference';`
- Source module: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### Declaration

```text
export declare function inferenceCacheScopeHash(scope: InferenceCacheScope | undefined): string;
```

### Call signature

```text
inferenceCacheScopeHash(scope: InferenceCacheScope | undefined): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `scope` | <code>InferenceCacheScope</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `isKvCacheExpired`

Is Kv Cache Expired function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { isKvCacheExpired } from '@codesoul-co/hypha-inference';`
- Source module: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### Declaration

```text
export declare function isKvCacheExpired(ref: KvCacheRef, now?: Date): boolean;
```

### Call signature

```text
isKvCacheExpired(ref: KvCacheRef, now?: Date): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `ref` | <code>KvCacheRef</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `now` | <code>Date</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `runInferenceCacheOperation`

Run Inference Cache Operation function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { runInferenceCacheOperation } from '@codesoul-co/hypha-inference';`
- Source module: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### Declaration

```text
export declare function runInferenceCacheOperation<T>(operation: InferenceCacheOperation, task: () => Promise<T>, timeoutMs: number): Promise<T>;
```

### Call signature

```text
runInferenceCacheOperation<T>(operation: InferenceCacheOperation, task: () => Promise<T>, timeoutMs: number): Promise<T>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `operation` | <code>InferenceCacheOperation</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `task` | <code>() =&gt; Promise&lt;T&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `timeoutMs` | <code>number</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<T>`
- Description: The return contract is defined by the type shown above.

## `InferenceCacheManagerOptions`

Inference Cache Manager Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { InferenceCacheManagerOptions } from '@codesoul-co/hypha-inference';`
- Source module: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### Declaration

```text
export interface InferenceCacheManagerOptions {
    prefixCache: PrefixCacheProvider;
    kvCache: KvCacheProvider;
    now?: () => Date;
    operationTimeoutMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `kvCache` | property | <code>kvCache: KvCacheProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `operationTimeoutMs` | property | <code>operationTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefixCache` | property | <code>prefixCache: PrefixCacheProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `KvCacheCreateInput`

Kv Cache Create Input interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { KvCacheCreateInput } from '@codesoul-co/hypha-inference';`
- Source module: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### Declaration

```text
export interface KvCacheCreateInput {
    id: string;
    provider: string;
    modelAlias: string;
    scope: KvCacheScope;
    cacheScope?: InferenceCacheScope;
    ttlMs?: number;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheScope` | property | <code>cacheScope?: InferenceCacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: KvCacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlMs` | property | <code>ttlMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PrefixCacheCreateInput`

Prefix Cache Create Input interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { PrefixCacheCreateInput } from '@codesoul-co/hypha-inference';`
- Source module: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### Declaration

```text
export interface PrefixCacheCreateInput {
    id: string;
    version: string;
    content: string;
    tokenCount?: number;
    cacheScope?: InferenceCacheScope;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheScope` | property | <code>cacheScope?: InferenceCacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenCount` | property | <code>tokenCount?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceCacheOperation`

Public type alias for Inference Cache Operation; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { InferenceCacheOperation } from '@codesoul-co/hypha-inference';`
- Source module: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### Declaration

```text
export type InferenceCacheOperation = 'prefix_read' | 'prefix_write' | 'kv_read' | 'kv_write' | 'invalidate';
```
