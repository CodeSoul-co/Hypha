# `@codesoul-co/hypha-core` / `modules/artifact/manager-error`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/artifact/manager-error.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-error.ts)
- Exports: **6**

## Using this module

Use the Manager error module for normalizing, classifying, or exposing error contracts. It exports 1 class, 5 functions.

### Import from the package entrypoint

```ts
import {
  ArtifactManagerError,
  artifactManagerError,
  normalizedArtifactErrorCode,
  validateArtifactManagerInput,
  validateArtifactRepositoryOutput,
  validateArtifactStoreOutput,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 5 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactManagerError` | class | <code>new ArtifactManagerError(normalizedError: NormalizedArtifactError): ArtifactManagerError</code> | Artifact Manager Error class with 9 public constructor or member entries; its exact declarations are listed below. |
| `artifactManagerError` | function | <code>artifactManagerError(code: NormalizedArtifactError["code"], message: string, retryable?: boolean, details?: Record&lt;string, unknown&gt;): ArtifactManagerError</code> | Artifact Manager Error function with 1 public call signature; parameters and return types are listed below. |
| `normalizedArtifactErrorCode` | function | <code>normalizedArtifactErrorCode(error: unknown): NormalizedArtifactError["code"] &#124; undefined</code> | Normalized Artifact Error Code function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactManagerInput` | function | <code>validateArtifactManagerInput&lt;T&gt;(validate: () =&gt; T): T</code> | Validate Artifact Manager Input function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactRepositoryOutput` | function | <code>validateArtifactRepositoryOutput&lt;T&gt;(validate: () =&gt; T): T</code> | Validate Artifact Repository Output function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactStoreOutput` | function | <code>validateArtifactStoreOutput&lt;T&gt;(validate: () =&gt; T): T</code> | Validate Artifact Store Output function with 1 public call signature; parameters and return types are listed below. |

## `ArtifactManagerError`

Artifact Manager Error class with 9 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ArtifactManagerError } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager-error`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-error.ts)

### Declaration

```text
export declare class ArtifactManagerError extends Error {
    readonly normalizedError: NormalizedArtifactError;
    constructor(normalizedError: NormalizedArtifactError);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(normalizedError: NormalizedArtifactError): ArtifactManagerError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `normalizedError` | property | <code>readonly normalizedError: NormalizedArtifactError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `artifactManagerError`

Artifact Manager Error function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { artifactManagerError } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager-error`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-error.ts)

### Declaration

```text
export declare function artifactManagerError(code: NormalizedArtifactError['code'], message: string, retryable?: boolean, details?: Record<string, unknown>): ArtifactManagerError;
```

### Call signature

```text
artifactManagerError(code: NormalizedArtifactError["code"], message: string, retryable?: boolean, details?: Record<string, unknown>): ArtifactManagerError
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | <code>"ARTIFACT_INVALID_INPUT" &#124; "ARTIFACT_NOT_FOUND" &#124; "ARTIFACT_PERMISSION_DENIED" &#124; "ARTIFACT_TOO_LARGE" &#124; "ARTIFACT_TYPE_DENIED" &#124; "ARTIFACT_HASH_MISMATCH" &#124; "ARTIFACT_VERSION_CONFLICT" &#124; "ARTIFACT_STORE_UNAVAILABLE" &#124; "ARTIFACT_UPLOAD_FAILED" &#124; "ARTIFACT_DOWNLOAD_FAILED" &#124; "ARTIFACT_DELETE_BLOCKED" &#124; "ARTIFACT_DELETE_PARTIAL" &#124; "ARTIFACT_VALIDATION_FAILED" &#124; "ARTIFACT_INTERNAL_ERROR"</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `message` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `retryable` | <code>boolean</code> | No | Optional parameter; accepted values are defined by the type column. |
| `details` | <code>Record&lt;string, unknown&gt;</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactManagerError`
- Description: The return contract is defined by the type shown above.

## `normalizedArtifactErrorCode`

Normalized Artifact Error Code function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizedArtifactErrorCode } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager-error`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-error.ts)

### Declaration

```text
export declare function normalizedArtifactErrorCode(error: unknown): NormalizedArtifactError['code'] | undefined;
```

### Call signature

```text
normalizedArtifactErrorCode(error: unknown): NormalizedArtifactError["code"] | undefined
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `"ARTIFACT_INVALID_INPUT" | "ARTIFACT_NOT_FOUND" | "ARTIFACT_PERMISSION_DENIED" | "ARTIFACT_TOO_LARGE" | "ARTIFACT_TYPE_DENIED" | "ARTIFACT_HASH_MISMATCH" | "ARTIFACT_VERSION_CONFLICT" | "ARTIFACT_STORE_UNAVAILABLE" | "ARTIFACT_UPLOAD_FAILED" | "ARTIFACT_DOWNLOAD_FAILED" | "ARTIFACT_DELETE_BLOCKED" | "ARTIFACT_DELETE_PARTIAL" | "ARTIFACT_VALIDATION_FAILED" | "ARTIFACT_INTERNAL_ERROR"`
- Description: The return contract is defined by the type shown above.

## `validateArtifactManagerInput`

Validate Artifact Manager Input function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactManagerInput } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager-error`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-error.ts)

### Declaration

```text
export declare function validateArtifactManagerInput<T>(validate: () => T): T;
```

### Call signature

```text
validateArtifactManagerInput<T>(validate: () => T): T
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `validate` | <code>() =&gt; T</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `T`
- Description: The return contract is defined by the type shown above.

## `validateArtifactRepositoryOutput`

Validate Artifact Repository Output function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactRepositoryOutput } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager-error`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-error.ts)

### Declaration

```text
export declare function validateArtifactRepositoryOutput<T>(validate: () => T): T;
```

### Call signature

```text
validateArtifactRepositoryOutput<T>(validate: () => T): T
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `validate` | <code>() =&gt; T</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `T`
- Description: The return contract is defined by the type shown above.

## `validateArtifactStoreOutput`

Validate Artifact Store Output function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactStoreOutput } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager-error`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-error.ts)

### Declaration

```text
export declare function validateArtifactStoreOutput<T>(validate: () => T): T;
```

### Call signature

```text
validateArtifactStoreOutput<T>(validate: () => T): T
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `validate` | <code>() =&gt; T</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `T`
- Description: The return contract is defined by the type shown above.
