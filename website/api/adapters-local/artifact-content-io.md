# `@codesoul-co/hypha-adapters-local` / `artifact-content-io`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/artifact-content-io.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-content-io.ts)
- Exports: **6**

## Using this module

Use the Artifact content io module for using the public contracts and operations for this capability boundary. It exports 1 class, 4 functions, 1 interface.

### Import from the package entrypoint

```ts
import {
  ArtifactContentLimitError,
  collectArtifactContent,
  hashArtifactBytes,
  readArtifactStream,
  streamArtifactBytes,
} from '@codesoul-co/hypha-adapters-local';

import type {
  CollectedArtifactContent,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactContentLimitError` | class | <code>new ArtifactContentLimitError(maxBytes: number, observedBytes: number): ArtifactContentLimitError</code> | Artifact Content Limit Error class with 10 public constructor or member entries; its exact declarations are listed below. |
| `collectArtifactContent` | function | <code>collectArtifactContent(source: ArtifactByteSource, maxBytes: number): Promise&lt;CollectedArtifactContent&gt;</code> | Collect Artifact Content function with 1 public call signature; parameters and return types are listed below. |
| `hashArtifactBytes` | function | <code>hashArtifactBytes(bytes: Uint8Array): string</code> | Hash Artifact Bytes function with 1 public call signature; parameters and return types are listed below. |
| `readArtifactStream` | function | <code>readArtifactStream(stream: AsyncIterable&lt;Uint8Array&gt;): Promise&lt;Uint8Array&gt;</code> | Read Artifact Stream function with 1 public call signature; parameters and return types are listed below. |
| `streamArtifactBytes` | function | <code>streamArtifactBytes(bytes: Uint8Array): AsyncIterable&lt;Uint8Array&gt;</code> | Stream Artifact Bytes function with 1 public call signature; parameters and return types are listed below. |
| `CollectedArtifactContent` | interface | <code>interface CollectedArtifactContent</code> | Collected Artifact Content interface with 2 public fields or methods. |

## `ArtifactContentLimitError`

Artifact Content Limit Error class with 10 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ArtifactContentLimitError } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`artifact-content-io`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-content-io.ts)

### Declaration

```text
export declare class ArtifactContentLimitError extends Error {
    readonly maxBytes: number;
    readonly observedBytes: number;
    constructor(maxBytes: number, observedBytes: number);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(maxBytes: number, observedBytes: number): ArtifactContentLimitError</code> | Creates an instance of this class. |
| `maxBytes` | property | <code>readonly maxBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observedBytes` | property | <code>readonly observedBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `collectArtifactContent`

Collect Artifact Content function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { collectArtifactContent } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`artifact-content-io`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-content-io.ts)

### Declaration

```text
export declare function collectArtifactContent(source: ArtifactByteSource, maxBytes: number): Promise<CollectedArtifactContent>;
```

### Call signature

```text
collectArtifactContent(source: ArtifactByteSource, maxBytes: number): Promise<CollectedArtifactContent>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `source` | <code>ArtifactByteSource</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `maxBytes` | <code>number</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<CollectedArtifactContent>`
- Description: The return contract is defined by the type shown above.

## `hashArtifactBytes`

Hash Artifact Bytes function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { hashArtifactBytes } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`artifact-content-io`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-content-io.ts)

### Declaration

```text
export declare function hashArtifactBytes(bytes: Uint8Array): string;
```

### Call signature

```text
hashArtifactBytes(bytes: Uint8Array): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `bytes` | <code>Uint8Array&lt;ArrayBufferLike&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `readArtifactStream`

Read Artifact Stream function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { readArtifactStream } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`artifact-content-io`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-content-io.ts)

### Declaration

```text
export declare function readArtifactStream(stream: AsyncIterable<Uint8Array>): Promise<Uint8Array>;
```

### Call signature

```text
readArtifactStream(stream: AsyncIterable<Uint8Array>): Promise<Uint8Array>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `stream` | <code>AsyncIterable&lt;Uint8Array&lt;ArrayBufferLike&gt;&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<Uint8Array<ArrayBufferLike>>`
- Description: The return contract is defined by the type shown above.

## `streamArtifactBytes`

Stream Artifact Bytes function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { streamArtifactBytes } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`artifact-content-io`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-content-io.ts)

### Declaration

```text
export declare function streamArtifactBytes(bytes: Uint8Array): AsyncIterable<Uint8Array>;
```

### Call signature

```text
streamArtifactBytes(bytes: Uint8Array): AsyncIterable<Uint8Array>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `bytes` | <code>Uint8Array&lt;ArrayBufferLike&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `AsyncIterable<Uint8Array<ArrayBufferLike>>`
- Description: The return contract is defined by the type shown above.

## `CollectedArtifactContent`

Collected Artifact Content interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { CollectedArtifactContent } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`artifact-content-io`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-content-io.ts)

### Declaration

```text
export interface CollectedArtifactContent {
    bytes: Uint8Array;
    contentHash: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `bytes` | property | <code>bytes: Uint8Array&lt;ArrayBufferLike&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
