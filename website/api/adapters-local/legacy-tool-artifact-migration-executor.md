# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-migration-executor`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)
- Exports: **10**

## Using this module

Use the Legacy tool artifact migration executor module for executing runtime behavior at this boundary. It exports 2 classes, 7 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  LegacyToolArtifactMigrationExecutionError,
  LegacyToolArtifactMigrationExecutor,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LegacyToolArtifactMigrationExecuteRequest,
  LegacyToolArtifactMigrationExecutionItem,
  LegacyToolArtifactMigrationExecutionResult,
  LegacyToolArtifactMigrationExecutionSummary,
  LegacyToolArtifactMigrationExecutorOptions,
  LegacyToolArtifactMigrationFailure,
  LegacyToolArtifactMigrationTargetSummary,
  LegacyToolArtifactMigrationExecutionErrorCode,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 8 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LegacyToolArtifactMigrationExecutionError` | class | <code>new LegacyToolArtifactMigrationExecutionError(code: LegacyToolArtifactMigrationExecutionErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationExecutionError</code> | Legacy Tool Artifact Migration Execution Error class with 10 public constructor or member entries; its exact declarations are listed below. |
| `LegacyToolArtifactMigrationExecutor` | class | <code>new LegacyToolArtifactMigrationExecutor(options: LegacyToolArtifactMigrationExecutorOptions): LegacyToolArtifactMigrationExecutor</code> | Executes a prevalidated migration plan sequentially. It never deletes or mutates legacy source files, and individual import failures remain isolated. |
| `LegacyToolArtifactMigrationExecuteRequest` | interface | <code>interface LegacyToolArtifactMigrationExecuteRequest</code> | Legacy Tool Artifact Migration Execute Request interface with 2 public fields or methods. |
| `LegacyToolArtifactMigrationExecutionItem` | interface | <code>interface LegacyToolArtifactMigrationExecutionItem</code> | Legacy Tool Artifact Migration Execution Item interface with 10 public fields or methods. |
| `LegacyToolArtifactMigrationExecutionResult` | interface | <code>interface LegacyToolArtifactMigrationExecutionResult</code> | Legacy Tool Artifact Migration Execution Result interface with 6 public fields or methods. |
| `LegacyToolArtifactMigrationExecutionSummary` | interface | <code>interface LegacyToolArtifactMigrationExecutionSummary</code> | Legacy Tool Artifact Migration Execution Summary interface with 5 public fields or methods. |
| `LegacyToolArtifactMigrationExecutorOptions` | interface | <code>interface LegacyToolArtifactMigrationExecutorOptions</code> | Legacy Tool Artifact Migration Executor Options interface with 2 public fields or methods. |
| `LegacyToolArtifactMigrationFailure` | interface | <code>interface LegacyToolArtifactMigrationFailure</code> | Legacy Tool Artifact Migration Failure interface with 3 public fields or methods. |
| `LegacyToolArtifactMigrationTargetSummary` | interface | <code>interface LegacyToolArtifactMigrationTargetSummary</code> | Legacy Tool Artifact Migration Target Summary interface with 4 public fields or methods. |
| `LegacyToolArtifactMigrationExecutionErrorCode` | type | <code>type LegacyToolArtifactMigrationExecutionErrorCode = 'LEGACY_MIGRATION_EXECUTION_INVALID_PLAN' &#124; 'LEGACY_MIGRATION_EXECUTION_LIMIT_EXCEEDED' &#124; 'LEGACY_MIGRATION_RESULT_MISMATCH'</code> | Public type alias for Legacy Tool Artifact Migration Execution Error Code; the declaration contains its complete type expression. |

## `LegacyToolArtifactMigrationExecutionError`

Legacy Tool Artifact Migration Execution Error class with 10 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LegacyToolArtifactMigrationExecutionError } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### Declaration

```text
export declare class LegacyToolArtifactMigrationExecutionError extends Error {
    readonly code: LegacyToolArtifactMigrationExecutionErrorCode;
    readonly details?: Record<string, unknown> | undefined;
    constructor(code: LegacyToolArtifactMigrationExecutionErrorCode, message: string, details?: Record<string, unknown> | undefined);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: LegacyToolArtifactMigrationExecutionErrorCode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(code: LegacyToolArtifactMigrationExecutionErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationExecutionError</code> | Creates an instance of this class. |
| `details` | property | <code>readonly details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LegacyToolArtifactMigrationExecutor`

Executes a prevalidated migration plan sequentially. It never deletes or mutates legacy source files, and individual import failures remain isolated.

- Kind: class
- Import: `import { LegacyToolArtifactMigrationExecutor } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### Declaration

```text
export declare class LegacyToolArtifactMigrationExecutor {
    constructor(options: LegacyToolArtifactMigrationExecutorOptions);
    execute(request: LegacyToolArtifactMigrationExecuteRequest): Promise<LegacyToolArtifactMigrationExecutionResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LegacyToolArtifactMigrationExecutorOptions): LegacyToolArtifactMigrationExecutor</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: LegacyToolArtifactMigrationExecuteRequest): Promise&lt;LegacyToolArtifactMigrationExecutionResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LegacyToolArtifactMigrationExecuteRequest`

Legacy Tool Artifact Migration Execute Request interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationExecuteRequest } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationExecuteRequest {
    plan: LegacyToolArtifactMigrationPlan;
    dryRun?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dryRun` | property | <code>dryRun?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `plan` | property | <code>plan: LegacyToolArtifactMigrationPlan</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationExecutionItem`

Legacy Tool Artifact Migration Execution Item interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationExecutionItem } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationExecutionItem {
    relativePath: string;
    legacyArtifactId: string;
    target: LegacyToolArtifactMigrationTargetSummary;
    status: 'dry_run' | 'imported' | 'failed';
    artifactId?: string;
    versionId?: string;
    revision?: number;
    contentHash?: string;
    sizeBytes?: number;
    failure?: LegacyToolArtifactMigrationFailure;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failure` | property | <code>failure?: LegacyToolArtifactMigrationFailure</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `legacyArtifactId` | property | <code>legacyArtifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "failed" &#124; "imported" &#124; "dry_run"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `target` | property | <code>target: LegacyToolArtifactMigrationTargetSummary</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationExecutionResult`

Legacy Tool Artifact Migration Execution Result interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationExecutionResult } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationExecutionResult {
    planHash: string;
    reportId: string;
    mode: 'dry_run' | 'execute';
    items: LegacyToolArtifactMigrationExecutionItem[];
    skipped: LegacyToolArtifactMigrationSkipPlanItem[];
    summary: LegacyToolArtifactMigrationExecutionSummary;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `items` | property | <code>items: LegacyToolArtifactMigrationExecutionItem[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "execute" &#124; "dry_run"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `planHash` | property | <code>planHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reportId` | property | <code>reportId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skipped` | property | <code>skipped: LegacyToolArtifactMigrationSkipPlanItem[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `summary` | property | <code>summary: LegacyToolArtifactMigrationExecutionSummary</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationExecutionSummary`

Legacy Tool Artifact Migration Execution Summary interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationExecutionSummary } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationExecutionSummary {
    planned: number;
    dryRun: number;
    imported: number;
    failed: number;
    skipped: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dryRun` | property | <code>dryRun: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failed` | property | <code>failed: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `imported` | property | <code>imported: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `planned` | property | <code>planned: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skipped` | property | <code>skipped: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationExecutorOptions`

Legacy Tool Artifact Migration Executor Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationExecutorOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationExecutorOptions {
    importer: Pick<LegacyToolArtifactImporter, 'import'>;
    maxImports?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `importer` | property | <code>importer: Pick&lt;LegacyToolArtifactImporter, "import"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxImports` | property | <code>maxImports?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationFailure`

Legacy Tool Artifact Migration Failure interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationFailure } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationFailure {
    name: string;
    code?: string;
    message: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `code` | property | <code>code?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationTargetSummary`

Legacy Tool Artifact Migration Target Summary interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationTargetSummary } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationTargetSummary {
    principalId: string;
    workspaceId: string;
    toolId: string;
    invocationId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `invocationId` | property | <code>invocationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationExecutionErrorCode`

Public type alias for Legacy Tool Artifact Migration Execution Error Code; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { LegacyToolArtifactMigrationExecutionErrorCode } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)

### Declaration

```text
export type LegacyToolArtifactMigrationExecutionErrorCode = 'LEGACY_MIGRATION_EXECUTION_INVALID_PLAN' | 'LEGACY_MIGRATION_EXECUTION_LIMIT_EXCEEDED' | 'LEGACY_MIGRATION_RESULT_MISMATCH';
```
