# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-importer`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/legacy-tool-artifact-importer.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)
- Exports: **7**

## Using this module

Use the Legacy tool artifact importer module for defining or implementing provider-neutral ports. It exports 2 classes, 1 function, 3 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  LegacyToolArtifactImporter,
  LegacyToolArtifactImportError,
  legacyArtifactReference,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LegacyToolArtifactImporterOptions,
  LegacyToolArtifactImportRequest,
  LegacyToolArtifactImportResult,
  LegacyToolArtifactImportErrorCode,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LegacyToolArtifactImporter` | class | <code>new LegacyToolArtifactImporter(options: LegacyToolArtifactImporterOptions): LegacyToolArtifactImporter</code> | Imports one explicitly identified legacy Tool file into Core ArtifactManager. |
| `LegacyToolArtifactImportError` | class | <code>new LegacyToolArtifactImportError(code: LegacyToolArtifactImportErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactImportError</code> | Legacy Tool Artifact Import Error class with 10 public constructor or member entries; its exact declarations are listed below. |
| `legacyArtifactReference` | function | <code>legacyArtifactReference(relativePath: string, sizeBytes: number): string</code> | Legacy Artifact Reference function with 1 public call signature; parameters and return types are listed below. |
| `LegacyToolArtifactImporterOptions` | interface | <code>interface LegacyToolArtifactImporterOptions</code> | Legacy Tool Artifact Importer Options interface with 3 public fields or methods. |
| `LegacyToolArtifactImportRequest` | interface | <code>interface LegacyToolArtifactImportRequest</code> | Legacy Tool Artifact Import Request interface with 9 public fields or methods. |
| `LegacyToolArtifactImportResult` | interface | <code>interface LegacyToolArtifactImportResult</code> | Legacy Tool Artifact Import Result interface with 6 public fields or methods. |
| `LegacyToolArtifactImportErrorCode` | type | <code>type LegacyToolArtifactImportErrorCode = 'LEGACY_ARTIFACT_INVALID_PATH' &#124; 'LEGACY_ARTIFACT_NOT_FOUND' &#124; 'LEGACY_ARTIFACT_TOO_LARGE' &#124; 'LEGACY_ARTIFACT_ID_MISMATCH' &#124; 'LEGACY_ARTIFACT_SIZE_MISMATCH' &#124; 'LEGACY_ARTIFACT_CONTENT_MISMATCH'</code> | Public type alias for Legacy Tool Artifact Import Error Code; the declaration contains its complete type expression. |

## `LegacyToolArtifactImporter`

Imports one explicitly identified legacy Tool file into Core ArtifactManager.

- Kind: class
- Import: `import { LegacyToolArtifactImporter } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-importer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)

### Declaration

```text
export declare class LegacyToolArtifactImporter {
    constructor(options: LegacyToolArtifactImporterOptions);
    import(request: LegacyToolArtifactImportRequest): Promise<LegacyToolArtifactImportResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LegacyToolArtifactImporterOptions): LegacyToolArtifactImporter</code> | Creates an instance of this class. |
| `import` | method | <code>import(request: LegacyToolArtifactImportRequest): Promise&lt;LegacyToolArtifactImportResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LegacyToolArtifactImportError`

Legacy Tool Artifact Import Error class with 10 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LegacyToolArtifactImportError } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-importer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)

### Declaration

```text
export declare class LegacyToolArtifactImportError extends Error {
    readonly code: LegacyToolArtifactImportErrorCode;
    readonly details?: Record<string, unknown> | undefined;
    constructor(code: LegacyToolArtifactImportErrorCode, message: string, details?: Record<string, unknown> | undefined);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: LegacyToolArtifactImportErrorCode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(code: LegacyToolArtifactImportErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactImportError</code> | Creates an instance of this class. |
| `details` | property | <code>readonly details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `legacyArtifactReference`

Legacy Artifact Reference function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { legacyArtifactReference } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-importer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)

### Declaration

```text
export declare function legacyArtifactReference(relativePath: string, sizeBytes: number): string;
```

### Call signature

```text
legacyArtifactReference(relativePath: string, sizeBytes: number): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `relativePath` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `sizeBytes` | <code>number</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `LegacyToolArtifactImporterOptions`

Legacy Tool Artifact Importer Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactImporterOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-importer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)

### Declaration

```text
export interface LegacyToolArtifactImporterOptions {
    legacyRootPath: string;
    manager: Pick<ArtifactManager, 'create'>;
    maxArtifactBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `legacyRootPath` | property | <code>legacyRootPath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `manager` | property | <code>manager: Pick&lt;ArtifactManager, "create"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxArtifactBytes` | property | <code>maxArtifactBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactImportRequest`

Legacy Tool Artifact Import Request interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactImportRequest } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-importer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)

### Declaration

```text
export interface LegacyToolArtifactImportRequest {
    relativePath: string;
    expectedLegacyArtifactId?: string;
    expectedContentHash?: string;
    expectedSizeBytes?: number;
    context: ToolArtifactManagerContext;
    toolId: string;
    invocationId: string;
    mimeType?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: ToolArtifactManagerContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedContentHash` | property | <code>expectedContentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedLegacyArtifactId` | property | <code>expectedLegacyArtifactId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedSizeBytes` | property | <code>expectedSizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invocationId` | property | <code>invocationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mimeType` | property | <code>mimeType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactImportResult`

Legacy Tool Artifact Import Result interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactImportResult } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-importer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)

### Declaration

```text
export interface LegacyToolArtifactImportResult {
    legacyArtifactId: string;
    artifactId: string;
    versionId: string;
    revision: number;
    contentHash: string;
    sizeBytes: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `legacyArtifactId` | property | <code>legacyArtifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactImportErrorCode`

Public type alias for Legacy Tool Artifact Import Error Code; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { LegacyToolArtifactImportErrorCode } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-importer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)

### Declaration

```text
export type LegacyToolArtifactImportErrorCode = 'LEGACY_ARTIFACT_INVALID_PATH' | 'LEGACY_ARTIFACT_NOT_FOUND' | 'LEGACY_ARTIFACT_TOO_LARGE' | 'LEGACY_ARTIFACT_ID_MISMATCH' | 'LEGACY_ARTIFACT_SIZE_MISMATCH' | 'LEGACY_ARTIFACT_CONTENT_MISMATCH';
```
