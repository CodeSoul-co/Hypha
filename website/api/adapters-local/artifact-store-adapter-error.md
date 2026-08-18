# `@codesoul-co/hypha-adapters-local` / `artifact-store-adapter-error`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/artifact-store-adapter-error.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-store-adapter-error.ts)
- Exports: **3**

## Using this module

Use the Artifact store adapter error module for binding external or local providers to Hypha ports. It exports 1 class, 2 functions.

### Import from the package entrypoint

```ts
import {
  ArtifactStoreAdapterError,
  artifactStoreError,
  validateArtifactStoreInput,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactStoreAdapterError` | class | <code>new ArtifactStoreAdapterError(normalizedError: NormalizedArtifactError): ArtifactStoreAdapterError</code> | Artifact Store Adapter Error class with 9 public constructor or member entries; its exact declarations are listed below. |
| `artifactStoreError` | function | <code>artifactStoreError(code: NormalizedArtifactError["code"], message: string, retryable: boolean, details?: Record&lt;string, unknown&gt;): ArtifactStoreAdapterError</code> | Artifact Store Error function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactStoreInput` | function | <code>validateArtifactStoreInput&lt;T&gt;(validate: () =&gt; T): T</code> | Validate Artifact Store Input function with 1 public call signature; parameters and return types are listed below. |

## `ArtifactStoreAdapterError`

Artifact Store Adapter Error class with 9 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ArtifactStoreAdapterError } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`artifact-store-adapter-error`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-store-adapter-error.ts)

### Declaration

```text
export declare class ArtifactStoreAdapterError extends Error {
    readonly normalizedError: NormalizedArtifactError;
    constructor(normalizedError: NormalizedArtifactError);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(normalizedError: NormalizedArtifactError): ArtifactStoreAdapterError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `normalizedError` | property | <code>readonly normalizedError: NormalizedArtifactError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `artifactStoreError`

Artifact Store Error function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { artifactStoreError } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`artifact-store-adapter-error`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-store-adapter-error.ts)

### Declaration

```text
export declare function artifactStoreError(code: NormalizedArtifactError['code'], message: string, retryable: boolean, details?: Record<string, unknown>): ArtifactStoreAdapterError;
```

### Call signature

```text
artifactStoreError(code: NormalizedArtifactError["code"], message: string, retryable: boolean, details?: Record<string, unknown>): ArtifactStoreAdapterError
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | <code>"ARTIFACT_INVALID_INPUT" &#124; "ARTIFACT_NOT_FOUND" &#124; "ARTIFACT_PERMISSION_DENIED" &#124; "ARTIFACT_TOO_LARGE" &#124; "ARTIFACT_TYPE_DENIED" &#124; "ARTIFACT_HASH_MISMATCH" &#124; "ARTIFACT_VERSION_CONFLICT" &#124; "ARTIFACT_STORE_UNAVAILABLE" &#124; "ARTIFACT_UPLOAD_FAILED" &#124; "ARTIFACT_DOWNLOAD_FAILED" &#124; "ARTIFACT_DELETE_BLOCKED" &#124; "ARTIFACT_DELETE_PARTIAL" &#124; "ARTIFACT_VALIDATION_FAILED" &#124; "ARTIFACT_INTERNAL_ERROR"</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `message` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `retryable` | <code>boolean</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `details` | <code>Record&lt;string, unknown&gt;</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactStoreAdapterError`
- Description: The return contract is defined by the type shown above.

## `validateArtifactStoreInput`

Validate Artifact Store Input function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactStoreInput } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`artifact-store-adapter-error`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-store-adapter-error.ts)

### Declaration

```text
export declare function validateArtifactStoreInput<T>(validate: () => T): T;
```

### Call signature

```text
validateArtifactStoreInput<T>(validate: () => T): T
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `validate` | <code>() =&gt; T</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `T`
- Description: The return contract is defined by the type shown above.
