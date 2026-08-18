# `@codesoul-co/hypha-core` / `contracts/artifact-record-repository`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/artifact-record-repository.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-record-repository.ts)
- Exports: **7**

## Using this module

Use the Artifact record repository module for declaring and runtime-validating contracts. It exports 2 classes, 5 interfaces.

### Import from the package entrypoint

```ts
import {
  ArtifactRecordRepositoryConflictError,
  ArtifactRecordRepositoryError,
} from '@codesoul-co/hypha-core';

import type {
  ArtifactIdempotencyRecord,
  ArtifactRecordCommitRequest,
  ArtifactRecordRepository,
  ArtifactRevisionFence,
  StoredArtifactRecord,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 5 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactRecordRepositoryConflictError` | class | <code>new ArtifactRecordRepositoryConflictError(message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): ArtifactRecordRepositoryConflictError</code> | Artifact Record Repository Conflict Error class with 9 public constructor or member entries; its exact declarations are listed below. |
| `ArtifactRecordRepositoryError` | class | <code>new ArtifactRecordRepositoryError(code: "ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE" &#124; "ARTIFACT_RECORD_REPOSITORY_CORRUPT", message: string, cause?: unknown &#124; undefined): ArtifactRecordRepositoryError</code> | Artifact Record Repository Error class with 9 public constructor or member entries; its exact declarations are listed below. |
| `ArtifactIdempotencyRecord` | interface | <code>interface ArtifactIdempotencyRecord</code> | Artifact Idempotency Record interface with 4 public fields or methods. |
| `ArtifactRecordCommitRequest` | interface | <code>interface ArtifactRecordCommitRequest</code> | Artifact Record Commit Request interface with 3 public fields or methods. |
| `ArtifactRecordRepository` | interface | <code>interface ArtifactRecordRepository</code> | Metadata persistence port for ArtifactManager. Implementations persist records, version/lineage links, and idempotency results, but never Artifact content bytes. |
| `ArtifactRevisionFence` | interface | <code>interface ArtifactRevisionFence</code> | Artifact Revision Fence interface with 3 public fields or methods. |
| `StoredArtifactRecord` | interface | <code>interface StoredArtifactRecord</code> | Stored Artifact Record interface with 2 public fields or methods. |

## `ArtifactRecordRepositoryConflictError`

Artifact Record Repository Conflict Error class with 9 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ArtifactRecordRepositoryConflictError } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-record-repository.ts)

### Declaration

```text
export declare class ArtifactRecordRepositoryConflictError extends Error {
    readonly details?: Record<string, unknown> | undefined;
    constructor(message: string, details?: Record<string, unknown> | undefined);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): ArtifactRecordRepositoryConflictError</code> | Creates an instance of this class. |
| `details` | property | <code>readonly details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `ArtifactRecordRepositoryError`

Artifact Record Repository Error class with 9 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ArtifactRecordRepositoryError } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-record-repository.ts)

### Declaration

```text
export declare class ArtifactRecordRepositoryError extends Error {
    readonly code: 'ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE' | 'ARTIFACT_RECORD_REPOSITORY_CORRUPT';
    readonly cause?: unknown | undefined;
    constructor(code: 'ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE' | 'ARTIFACT_RECORD_REPOSITORY_CORRUPT', message: string, cause?: unknown | undefined);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>readonly cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: "ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE" &#124; "ARTIFACT_RECORD_REPOSITORY_CORRUPT"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(code: "ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE" &#124; "ARTIFACT_RECORD_REPOSITORY_CORRUPT", message: string, cause?: unknown &#124; undefined): ArtifactRecordRepositoryError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `ArtifactIdempotencyRecord`

Artifact Idempotency Record interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactIdempotencyRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-record-repository.ts)

### Declaration

```text
export interface ArtifactIdempotencyRecord {
    operationId: string;
    idempotencyKey: string;
    artifactId: string;
    versionId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactRecordCommitRequest`

Artifact Record Commit Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactRecordCommitRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-record-repository.ts)

### Declaration

```text
export interface ArtifactRecordCommitRequest {
    records: StoredArtifactRecord[];
    expectedLatest?: ArtifactRevisionFence;
    idempotency?: ArtifactIdempotencyRecord;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedLatest` | property | <code>expectedLatest?: ArtifactRevisionFence</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotency` | property | <code>idempotency?: ArtifactIdempotencyRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `records` | property | <code>records: StoredArtifactRecord[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactRecordRepository`

Metadata persistence port for ArtifactManager. Implementations persist records, version/lineage links, and idempotency results, but never Artifact content bytes.

- Kind: interface
- Import: `import type { ArtifactRecordRepository } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-record-repository.ts)

### Declaration

```text
export interface ArtifactRecordRepository {
    get(artifactId: string, versionId?: string): Promise<StoredArtifactRecord | null>;
    getByVersionId(versionId: string): Promise<StoredArtifactRecord | null>;
    list(): Promise<StoredArtifactRecord[]>;
    findIdempotency(operationId: string, idempotencyKey: string): Promise<StoredArtifactRecord | null>;
    commit(request: ArtifactRecordCommitRequest): Promise<void>;
    listGarbageCollectionCandidates(request: ArtifactGarbageCollectionScanRequest): Promise<ArtifactGarbageCollectionCandidate[]>;
    claimGarbageCollection(request: ArtifactGarbageCollectionClaimRequest): Promise<boolean>;
    completeGarbageCollection(claimId: string, completedAt: string): Promise<void>;
    releaseGarbageCollection(claimId: string): Promise<void>;
    health(): Promise<ProviderHealth>;
    close?(): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimGarbageCollection` | method | <code>claimGarbageCollection(request: ArtifactGarbageCollectionClaimRequest): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `commit` | method | <code>commit(request: ArtifactRecordCommitRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `completeGarbageCollection` | method | <code>completeGarbageCollection(claimId: string, completedAt: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `findIdempotency` | method | <code>findIdempotency(operationId: string, idempotencyKey: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(artifactId: string, versionId?: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getByVersionId` | method | <code>getByVersionId(versionId: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): Promise&lt;StoredArtifactRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listGarbageCollectionCandidates` | method | <code>listGarbageCollectionCandidates(request: ArtifactGarbageCollectionScanRequest): Promise&lt;ArtifactGarbageCollectionCandidate[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `releaseGarbageCollection` | method | <code>releaseGarbageCollection(claimId: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ArtifactRevisionFence`

Artifact Revision Fence interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactRevisionFence } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-record-repository.ts)

### Declaration

```text
export interface ArtifactRevisionFence {
    artifactId: string;
    versionId: string;
    revision: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StoredArtifactRecord`

Stored Artifact Record interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { StoredArtifactRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-record-repository.ts)

### Declaration

```text
export interface StoredArtifactRecord {
    record: ArtifactRecord;
    profileRef: SpecRef;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `record` | property | <code>record: ArtifactRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
