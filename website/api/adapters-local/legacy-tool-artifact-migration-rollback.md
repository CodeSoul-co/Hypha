# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-migration-rollback`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)
- Exports: **8**

## Using this module

Use the Legacy tool artifact migration rollback module for using the public contracts and operations for this capability boundary. It exports 2 classes, 5 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  LegacyToolArtifactMigrationRollbackError,
  LegacyToolArtifactMigrationRollbackExecutor,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LegacyToolArtifactMigrationRollbackExecutorOptions,
  LegacyToolArtifactMigrationRollbackItem,
  LegacyToolArtifactMigrationRollbackRequest,
  LegacyToolArtifactMigrationRollbackResult,
  LegacyToolArtifactMigrationRollbackSummary,
  LegacyToolArtifactMigrationRollbackErrorCode,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 6 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LegacyToolArtifactMigrationRollbackError` | class | <code>new LegacyToolArtifactMigrationRollbackError(code: LegacyToolArtifactMigrationRollbackErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationRollbackError</code> | Legacy Tool Artifact Migration Rollback Error class with 10 public constructor or member entries; its exact declarations are listed below. |
| `LegacyToolArtifactMigrationRollbackExecutor` | class | <code>new LegacyToolArtifactMigrationRollbackExecutor(options: LegacyToolArtifactMigrationRollbackExecutorOptions): LegacyToolArtifactMigrationRollbackExecutor</code> | Reverses only Artifacts proven to have been created by a specific migration report. Revision fences prevent rollback from deleting a later mutation. |
| `LegacyToolArtifactMigrationRollbackExecutorOptions` | interface | <code>interface LegacyToolArtifactMigrationRollbackExecutorOptions</code> | Legacy Tool Artifact Migration Rollback Executor Options interface with 1 public fields or methods. |
| `LegacyToolArtifactMigrationRollbackItem` | interface | <code>interface LegacyToolArtifactMigrationRollbackItem</code> | Legacy Tool Artifact Migration Rollback Item interface with 8 public fields or methods. |
| `LegacyToolArtifactMigrationRollbackRequest` | interface | <code>interface LegacyToolArtifactMigrationRollbackRequest</code> | Legacy Tool Artifact Migration Rollback Request interface with 3 public fields or methods. |
| `LegacyToolArtifactMigrationRollbackResult` | interface | <code>interface LegacyToolArtifactMigrationRollbackResult</code> | Legacy Tool Artifact Migration Rollback Result interface with 6 public fields or methods. |
| `LegacyToolArtifactMigrationRollbackSummary` | interface | <code>interface LegacyToolArtifactMigrationRollbackSummary</code> | Legacy Tool Artifact Migration Rollback Summary interface with 5 public fields or methods. |
| `LegacyToolArtifactMigrationRollbackErrorCode` | type | <code>type LegacyToolArtifactMigrationRollbackErrorCode = 'LEGACY_MIGRATION_ROLLBACK_INVALID_REPORT' &#124; 'LEGACY_MIGRATION_ROLLBACK_TARGET_MISMATCH'</code> | Public type alias for Legacy Tool Artifact Migration Rollback Error Code; the declaration contains its complete type expression. |

## `LegacyToolArtifactMigrationRollbackError`

Legacy Tool Artifact Migration Rollback Error class with 10 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LegacyToolArtifactMigrationRollbackError } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-rollback`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)

### Declaration

```text
export declare class LegacyToolArtifactMigrationRollbackError extends Error {
    readonly code: LegacyToolArtifactMigrationRollbackErrorCode;
    readonly details?: Record<string, unknown> | undefined;
    constructor(code: LegacyToolArtifactMigrationRollbackErrorCode, message: string, details?: Record<string, unknown> | undefined);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: LegacyToolArtifactMigrationRollbackErrorCode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(code: LegacyToolArtifactMigrationRollbackErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationRollbackError</code> | Creates an instance of this class. |
| `details` | property | <code>readonly details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LegacyToolArtifactMigrationRollbackExecutor`

Reverses only Artifacts proven to have been created by a specific migration report. Revision fences prevent rollback from deleting a later mutation.

- Kind: class
- Import: `import { LegacyToolArtifactMigrationRollbackExecutor } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-rollback`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)

### Declaration

```text
export declare class LegacyToolArtifactMigrationRollbackExecutor {
    constructor(options: LegacyToolArtifactMigrationRollbackExecutorOptions);
    rollback(request: LegacyToolArtifactMigrationRollbackRequest): Promise<LegacyToolArtifactMigrationRollbackResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LegacyToolArtifactMigrationRollbackExecutorOptions): LegacyToolArtifactMigrationRollbackExecutor</code> | Creates an instance of this class. |
| `rollback` | method | <code>rollback(request: LegacyToolArtifactMigrationRollbackRequest): Promise&lt;LegacyToolArtifactMigrationRollbackResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LegacyToolArtifactMigrationRollbackExecutorOptions`

Legacy Tool Artifact Migration Rollback Executor Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationRollbackExecutorOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-rollback`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationRollbackExecutorOptions {
    manager: Pick<ArtifactManager, 'get' | 'delete'>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `manager` | property | <code>manager: Pick&lt;ArtifactManager, "delete" &#124; "get"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationRollbackItem`

Legacy Tool Artifact Migration Rollback Item interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationRollbackItem } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-rollback`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationRollbackItem {
    relativePath: string;
    legacyArtifactId: string;
    artifactId: string;
    versionId: string;
    revision: number;
    target: LegacyToolArtifactMigrationTargetSummary;
    status: 'dry_run' | 'rolled_back' | 'already_absent' | 'failed';
    failure?: LegacyToolArtifactMigrationFailure;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failure` | property | <code>failure?: LegacyToolArtifactMigrationFailure</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `legacyArtifactId` | property | <code>legacyArtifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "failed" &#124; "rolled_back" &#124; "dry_run" &#124; "already_absent"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `target` | property | <code>target: LegacyToolArtifactMigrationTargetSummary</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationRollbackRequest`

Legacy Tool Artifact Migration Rollback Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationRollbackRequest } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-rollback`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationRollbackRequest {
    plan: LegacyToolArtifactMigrationPlan;
    execution: LegacyToolArtifactMigrationExecutionResult;
    dryRun?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dryRun` | property | <code>dryRun?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `execution` | property | <code>execution: LegacyToolArtifactMigrationExecutionResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `plan` | property | <code>plan: LegacyToolArtifactMigrationPlan</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationRollbackResult`

Legacy Tool Artifact Migration Rollback Result interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationRollbackResult } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-rollback`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationRollbackResult {
    planHash: string;
    executionReportId: string;
    reportId: string;
    mode: 'dry_run' | 'rollback';
    items: LegacyToolArtifactMigrationRollbackItem[];
    summary: LegacyToolArtifactMigrationRollbackSummary;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionReportId` | property | <code>executionReportId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `items` | property | <code>items: LegacyToolArtifactMigrationRollbackItem[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "rollback" &#124; "dry_run"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `planHash` | property | <code>planHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reportId` | property | <code>reportId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `summary` | property | <code>summary: LegacyToolArtifactMigrationRollbackSummary</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationRollbackSummary`

Legacy Tool Artifact Migration Rollback Summary interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationRollbackSummary } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-rollback`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationRollbackSummary {
    candidates: number;
    dryRun: number;
    rolledBack: number;
    alreadyAbsent: number;
    failed: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `alreadyAbsent` | property | <code>alreadyAbsent: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `candidates` | property | <code>candidates: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dryRun` | property | <code>dryRun: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failed` | property | <code>failed: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rolledBack` | property | <code>rolledBack: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationRollbackErrorCode`

Public type alias for Legacy Tool Artifact Migration Rollback Error Code; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { LegacyToolArtifactMigrationRollbackErrorCode } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-rollback`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)

### Declaration

```text
export type LegacyToolArtifactMigrationRollbackErrorCode = 'LEGACY_MIGRATION_ROLLBACK_INVALID_REPORT' | 'LEGACY_MIGRATION_ROLLBACK_TARGET_MISMATCH';
```
