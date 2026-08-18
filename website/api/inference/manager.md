# `@codesoul-co/hypha-inference` / `manager`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Source: [`packages/inference/src/manager.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/manager.ts)
- Exports: **6**

## Using this module

Use the Manager module for using the public contracts and operations for this capability boundary. It exports 4 classes, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  InferenceCacheCapacityError,
  InferenceManager,
  InMemoryKvCacheProvider,
  InMemoryPrefixCacheProvider,
} from '@codesoul-co/hypha-inference';

import type {
  InMemoryKvCacheProviderOptions,
  InMemoryPrefixCacheProviderOptions,
} from '@codesoul-co/hypha-inference';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 4 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InferenceCacheCapacityError` | class | <code>new InferenceCacheCapacityError(message: string): InferenceCacheCapacityError</code> | Inference Cache Capacity Error class with 9 public constructor or member entries; its exact declarations are listed below. |
| `InferenceManager` | class | <code>new InferenceManager(options?: InferenceManagerOptions): InferenceManager</code> | Inference Manager class with 5 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryKvCacheProvider` | class | <code>new InMemoryKvCacheProvider(options?: InMemoryKvCacheProviderOptions): InMemoryKvCacheProvider</code> | In Memory Kv Cache Provider class with 6 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryPrefixCacheProvider` | class | <code>new InMemoryPrefixCacheProvider(options?: InMemoryPrefixCacheProviderOptions): InMemoryPrefixCacheProvider</code> | In Memory Prefix Cache Provider class with 5 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryKvCacheProviderOptions` | interface | <code>interface InMemoryKvCacheProviderOptions</code> | In Memory Kv Cache Provider Options interface with 3 public fields or methods. |
| `InMemoryPrefixCacheProviderOptions` | interface | <code>interface InMemoryPrefixCacheProviderOptions</code> | In Memory Prefix Cache Provider Options interface with 3 public fields or methods. |

## `InferenceCacheCapacityError`

Inference Cache Capacity Error class with 9 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InferenceCacheCapacityError } from '@codesoul-co/hypha-inference';`
- Source module: [`manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/manager.ts)

### Declaration

```text
export declare class InferenceCacheCapacityError extends Error {
    readonly code = "INFERENCE_CACHE_CAPACITY_EXCEEDED";
    constructor(message: string);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: "INFERENCE_CACHE_CAPACITY_EXCEEDED"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(message: string): InferenceCacheCapacityError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `InferenceManager`

Inference Manager class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InferenceManager } from '@codesoul-co/hypha-inference';`
- Source module: [`manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/manager.ts)

### Declaration

```text
export declare class InferenceManager {
    constructor(options?: InferenceManagerOptions);
    register(provider: InferenceProvider): void;
    get(providerId: string): InferenceProvider | null;
    infer(providerId: string, request: InferenceRequest): Promise<InferenceResponse>;
    stream(providerId: string, request: InferenceRequest): AsyncIterable<InferenceResponse>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: InferenceManagerOptions): InferenceManager</code> | Creates an instance of this class. |
| `get` | method | <code>get(providerId: string): InferenceProvider &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `infer` | method | <code>infer(providerId: string, request: InferenceRequest): Promise&lt;InferenceResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `register` | method | <code>register(provider: InferenceProvider): void</code> | Public method; parameters and return type are shown in the signature. |
| `stream` | method | <code>stream(providerId: string, request: InferenceRequest): AsyncIterable&lt;InferenceResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryKvCacheProvider`

In Memory Kv Cache Provider class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryKvCacheProvider } from '@codesoul-co/hypha-inference';`
- Source module: [`manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/manager.ts)

### Declaration

```text
export declare class InMemoryKvCacheProvider implements KvCacheProvider {
    constructor(options?: InMemoryKvCacheProviderOptions);
    get(ref: KvCacheRef): Promise<unknown | null>;
    put(ref: KvCacheRef, value: unknown): Promise<void>;
    invalidate(ref: KvCacheRef): Promise<void>;
    size(): number;
    stats(): {
            entries: number;
            totalBytes: number;
        };
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: InMemoryKvCacheProviderOptions): InMemoryKvCacheProvider</code> | Creates an instance of this class. |
| `get` | method | <code>get(ref: KvCacheRef): Promise&lt;unknown &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invalidate` | method | <code>invalidate(ref: KvCacheRef): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(ref: KvCacheRef, value: unknown): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `size` | method | <code>size(): number</code> | Public method; parameters and return type are shown in the signature. |
| `stats` | method | <code>stats(): { entries: number; totalBytes: number; }</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryPrefixCacheProvider`

In Memory Prefix Cache Provider class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryPrefixCacheProvider } from '@codesoul-co/hypha-inference';`
- Source module: [`manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/manager.ts)

### Declaration

```text
export declare class InMemoryPrefixCacheProvider implements PrefixCacheProvider {
    constructor(options?: InMemoryPrefixCacheProviderOptions);
    get(ref: PrefixCacheRef): Promise<string | null>;
    put(ref: PrefixCacheRef, content: string): Promise<void>;
    invalidate(ref: PrefixCacheRef): Promise<void>;
    stats(): {
            entries: number;
            totalBytes: number;
        };
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: InMemoryPrefixCacheProviderOptions): InMemoryPrefixCacheProvider</code> | Creates an instance of this class. |
| `get` | method | <code>get(ref: PrefixCacheRef): Promise&lt;string &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invalidate` | method | <code>invalidate(ref: PrefixCacheRef): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(ref: PrefixCacheRef, content: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `stats` | method | <code>stats(): { entries: number; totalBytes: number; }</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryKvCacheProviderOptions`

In Memory Kv Cache Provider Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryKvCacheProviderOptions } from '@codesoul-co/hypha-inference';`
- Source module: [`manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/manager.ts)

### Declaration

```text
export interface InMemoryKvCacheProviderOptions {
    maxEntries?: number;
    maxEntryBytes?: number;
    maxTotalBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxEntries` | property | <code>maxEntries?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEntryBytes` | property | <code>maxEntryBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTotalBytes` | property | <code>maxTotalBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InMemoryPrefixCacheProviderOptions`

In Memory Prefix Cache Provider Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryPrefixCacheProviderOptions } from '@codesoul-co/hypha-inference';`
- Source module: [`manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/manager.ts)

### Declaration

```text
export interface InMemoryPrefixCacheProviderOptions {
    maxEntries?: number;
    maxEntryBytes?: number;
    maxTotalBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxEntries` | property | <code>maxEntries?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEntryBytes` | property | <code>maxEntryBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTotalBytes` | property | <code>maxTotalBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
