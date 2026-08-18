# `@codesoul-co/hypha-adapters-local` / `local-artifact-files`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/local-artifact-files.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)
- Exports: **17**

## Using this module

Use the Local artifact files module for using the public contracts and operations for this capability boundary. It exports 2 classes, 13 functions, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  LocalArtifactIntegrityError,
  LocalArtifactTransferAbortedError,
  ensureSafeLocalArtifactDirectory,
  ensureSafeLocalArtifactFile,
  hashLocalArtifactFile,
  isNodeError,
  listLocalArtifactFiles,
  localArtifactBlobPath,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalArtifactStorePaths,
  LocalArtifactTempFile,
} from '@codesoul-co/hypha-adapters-local';

// The complete export list is documented below.
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 13 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalArtifactIntegrityError` | class | <code>new LocalArtifactIntegrityError(message: string): LocalArtifactIntegrityError</code> | Local Artifact Integrity Error class with 8 public constructor or member entries; its exact declarations are listed below. |
| `LocalArtifactTransferAbortedError` | class | <code>new LocalArtifactTransferAbortedError(): LocalArtifactTransferAbortedError</code> | Local Artifact Transfer Aborted Error class with 9 public constructor or member entries; its exact declarations are listed below. |
| `ensureSafeLocalArtifactDirectory` | function | <code>ensureSafeLocalArtifactDirectory(root: string, directory: string): Promise&lt;void&gt;</code> | Ensure Safe Local Artifact Directory function with 1 public call signature; parameters and return types are listed below. |
| `ensureSafeLocalArtifactFile` | function | <code>ensureSafeLocalArtifactFile(root: string, filename: string): Promise&lt;void&gt;</code> | Ensure Safe Local Artifact File function with 1 public call signature; parameters and return types are listed below. |
| `hashLocalArtifactFile` | function | <code>hashLocalArtifactFile(filename: string, root?: string, abortSignal?: AbortSignal): Promise&lt;{ contentHash: string; sizeBytes: number; }&gt;</code> | Hash Local Artifact File function with 1 public call signature; parameters and return types are listed below. |
| `isNodeError` | function | <code>isNodeError(error: unknown, code: string): boolean</code> | Is Node Error function with 1 public call signature; parameters and return types are listed below. |
| `listLocalArtifactFiles` | function | <code>listLocalArtifactFiles(root: string, extension?: string): Promise&lt;string[]&gt;</code> | List Local Artifact Files function with 1 public call signature; parameters and return types are listed below. |
| `localArtifactBlobPath` | function | <code>localArtifactBlobPath(paths: LocalArtifactStorePaths, contentHash: string): string</code> | Local Artifact Blob Path function with 1 public call signature; parameters and return types are listed below. |
| `localArtifactManifestPath` | function | <code>localArtifactManifestPath(paths: LocalArtifactStorePaths, objectKey: string): string</code> | Local Artifact Manifest Path function with 1 public call signature; parameters and return types are listed below. |
| `pathExists` | function | <code>pathExists(filename: string): Promise&lt;boolean&gt;</code> | Path Exists function with 1 public call signature; parameters and return types are listed below. |
| `prepareLocalArtifactStore` | function | <code>prepareLocalArtifactStore(rootPath: string): Promise&lt;LocalArtifactStorePaths&gt;</code> | Prepare Local Artifact Store function with 1 public call signature; parameters and return types are listed below. |
| `publishLocalArtifactBlob` | function | <code>publishLocalArtifactBlob(root: string, temporaryPath: string, blobPath: string, expectedHash: string, expectedSizeBytes: number): Promise&lt;void&gt;</code> | Publish Local Artifact Blob function with 1 public call signature; parameters and return types are listed below. |
| `streamLocalArtifactFile` | function | <code>streamLocalArtifactFile(filename: string, range?: ArtifactByteRange, root?: string, abortSignal?: AbortSignal): AsyncIterable&lt;Uint8Array&gt;</code> | Stream Local Artifact File function with 1 public call signature; parameters and return types are listed below. |
| `writeJsonAtomically` | function | <code>writeJsonAtomically(root: string, filename: string, value: unknown, options?: { ifAbsent?: boolean; }): Promise&lt;void&gt;</code> | Write JSON Atomically function with 1 public call signature; parameters and return types are listed below. |
| `writeLocalArtifactTempFile` | function | <code>writeLocalArtifactTempFile(source: ArtifactByteSource, paths: LocalArtifactStorePaths, maxBytes: number, abortSignal?: AbortSignal): Promise&lt;LocalArtifactTempFile&gt;</code> | Write Local Artifact Temp File function with 1 public call signature; parameters and return types are listed below. |
| `LocalArtifactStorePaths` | interface | <code>interface LocalArtifactStorePaths</code> | Local Artifact Store Paths interface with 4 public fields or methods. |
| `LocalArtifactTempFile` | interface | <code>interface LocalArtifactTempFile</code> | Local Artifact Temp File interface with 3 public fields or methods. |

## `LocalArtifactIntegrityError`

Local Artifact Integrity Error class with 8 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LocalArtifactIntegrityError } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export declare class LocalArtifactIntegrityError extends Error {
    constructor(message: string);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(message: string): LocalArtifactIntegrityError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LocalArtifactTransferAbortedError`

Local Artifact Transfer Aborted Error class with 9 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LocalArtifactTransferAbortedError } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export declare class LocalArtifactTransferAbortedError extends Error {
    readonly code = "LOCAL_ARTIFACT_TRANSFER_ABORTED";
    constructor();
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: "LOCAL_ARTIFACT_TRANSFER_ABORTED"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(): LocalArtifactTransferAbortedError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `ensureSafeLocalArtifactDirectory`

Ensure Safe Local Artifact Directory function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { ensureSafeLocalArtifactDirectory } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export declare function ensureSafeLocalArtifactDirectory(root: string, directory: string): Promise<void>;
```

### Call signature

```text
ensureSafeLocalArtifactDirectory(root: string, directory: string): Promise<void>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `root` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `directory` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<void>`
- Description: The return contract is defined by the type shown above.

## `ensureSafeLocalArtifactFile`

Ensure Safe Local Artifact File function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { ensureSafeLocalArtifactFile } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export declare function ensureSafeLocalArtifactFile(root: string, filename: string): Promise<void>;
```

### Call signature

```text
ensureSafeLocalArtifactFile(root: string, filename: string): Promise<void>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `root` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `filename` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<void>`
- Description: The return contract is defined by the type shown above.

## `hashLocalArtifactFile`

Hash Local Artifact File function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { hashLocalArtifactFile } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export declare function hashLocalArtifactFile(filename: string, root?: string, abortSignal?: AbortSignal): Promise<{
    contentHash: string;
    sizeBytes: number;
}>;
```

### Call signature

```text
hashLocalArtifactFile(filename: string, root?: string, abortSignal?: AbortSignal): Promise<{ contentHash: string; sizeBytes: number; }>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `filename` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `root` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |
| `abortSignal` | <code>AbortSignal</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<{ contentHash: string; sizeBytes: number; }>`
- Description: The return contract is defined by the type shown above.

## `isNodeError`

Is Node Error function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { isNodeError } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export declare function isNodeError(error: unknown, code: string): boolean;
```

### Call signature

```text
isNodeError(error: unknown, code: string): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `code` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `listLocalArtifactFiles`

List Local Artifact Files function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { listLocalArtifactFiles } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export declare function listLocalArtifactFiles(root: string, extension?: string): Promise<string[]>;
```

### Call signature

```text
listLocalArtifactFiles(root: string, extension?: string): Promise<string[]>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `root` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `extension` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<string[]>`
- Description: The return contract is defined by the type shown above.

## `localArtifactBlobPath`

Local Artifact Blob Path function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { localArtifactBlobPath } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export declare function localArtifactBlobPath(paths: LocalArtifactStorePaths, contentHash: string): string;
```

### Call signature

```text
localArtifactBlobPath(paths: LocalArtifactStorePaths, contentHash: string): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `paths` | <code>LocalArtifactStorePaths</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `contentHash` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `localArtifactManifestPath`

Local Artifact Manifest Path function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { localArtifactManifestPath } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export declare function localArtifactManifestPath(paths: LocalArtifactStorePaths, objectKey: string): string;
```

### Call signature

```text
localArtifactManifestPath(paths: LocalArtifactStorePaths, objectKey: string): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `paths` | <code>LocalArtifactStorePaths</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `objectKey` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `pathExists`

Path Exists function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { pathExists } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export declare function pathExists(filename: string): Promise<boolean>;
```

### Call signature

```text
pathExists(filename: string): Promise<boolean>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `filename` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<boolean>`
- Description: The return contract is defined by the type shown above.

## `prepareLocalArtifactStore`

Prepare Local Artifact Store function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { prepareLocalArtifactStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export declare function prepareLocalArtifactStore(rootPath: string): Promise<LocalArtifactStorePaths>;
```

### Call signature

```text
prepareLocalArtifactStore(rootPath: string): Promise<LocalArtifactStorePaths>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `rootPath` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<LocalArtifactStorePaths>`
- Description: The return contract is defined by the type shown above.

## `publishLocalArtifactBlob`

Publish Local Artifact Blob function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { publishLocalArtifactBlob } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export declare function publishLocalArtifactBlob(root: string, temporaryPath: string, blobPath: string, expectedHash: string, expectedSizeBytes: number): Promise<void>;
```

### Call signature

```text
publishLocalArtifactBlob(root: string, temporaryPath: string, blobPath: string, expectedHash: string, expectedSizeBytes: number): Promise<void>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `root` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `temporaryPath` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `blobPath` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `expectedHash` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `expectedSizeBytes` | <code>number</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<void>`
- Description: The return contract is defined by the type shown above.

## `streamLocalArtifactFile`

Stream Local Artifact File function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { streamLocalArtifactFile } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export declare function streamLocalArtifactFile(filename: string, range?: ArtifactByteRange, root?: string, abortSignal?: AbortSignal): AsyncIterable<Uint8Array>;
```

### Call signature

```text
streamLocalArtifactFile(filename: string, range?: ArtifactByteRange, root?: string, abortSignal?: AbortSignal): AsyncIterable<Uint8Array>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `filename` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `range` | <code>ArtifactByteRange</code> | No | Optional parameter; accepted values are defined by the type column. |
| `root` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |
| `abortSignal` | <code>AbortSignal</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `AsyncIterable<Uint8Array<ArrayBufferLike>>`
- Description: The return contract is defined by the type shown above.

## `writeJsonAtomically`

Write JSON Atomically function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { writeJsonAtomically } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export declare function writeJsonAtomically(root: string, filename: string, value: unknown, options?: {
    ifAbsent?: boolean;
}): Promise<void>;
```

### Call signature

```text
writeJsonAtomically(root: string, filename: string, value: unknown, options?: { ifAbsent?: boolean; }): Promise<void>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `root` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `filename` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `options` | <code>{ ifAbsent?: boolean; }</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<void>`
- Description: The return contract is defined by the type shown above.

## `writeLocalArtifactTempFile`

Write Local Artifact Temp File function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { writeLocalArtifactTempFile } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export declare function writeLocalArtifactTempFile(source: ArtifactByteSource, paths: LocalArtifactStorePaths, maxBytes: number, abortSignal?: AbortSignal): Promise<LocalArtifactTempFile>;
```

### Call signature

```text
writeLocalArtifactTempFile(source: ArtifactByteSource, paths: LocalArtifactStorePaths, maxBytes: number, abortSignal?: AbortSignal): Promise<LocalArtifactTempFile>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `source` | <code>ArtifactByteSource</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `paths` | <code>LocalArtifactStorePaths</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `maxBytes` | <code>number</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `abortSignal` | <code>AbortSignal</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<LocalArtifactTempFile>`
- Description: The return contract is defined by the type shown above.

## `LocalArtifactStorePaths`

Local Artifact Store Paths interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { LocalArtifactStorePaths } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export interface LocalArtifactStorePaths {
    root: string;
    blobs: string;
    objects: string;
    temporary: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `blobs` | property | <code>blobs: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `objects` | property | <code>objects: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `root` | property | <code>root: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `temporary` | property | <code>temporary: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalArtifactTempFile`

Local Artifact Temp File interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { LocalArtifactTempFile } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-files`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)

### Declaration

```text
export interface LocalArtifactTempFile {
    path: string;
    contentHash: string;
    sizeBytes: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `path` | property | <code>path: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
