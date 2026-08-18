# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-migration-executor`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)
- Exports: **10**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LegacyToolArtifactMigrationExecutionError` | class | <code>new LegacyToolArtifactMigrationExecutionError(code: LegacyToolArtifactMigrationExecutionErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationExecutionError</code> | Runtime implementation for Legacy Tool Artifact Migration Execution Error; see its public constructor and members below. |
| `LegacyToolArtifactMigrationExecutor` | class | <code>new LegacyToolArtifactMigrationExecutor(options: LegacyToolArtifactMigrationExecutorOptions): LegacyToolArtifactMigrationExecutor</code> | Executes a prevalidated migration plan sequentially. It never deletes or mutates legacy source files, and individual import failures remain isolated. |
| `LegacyToolArtifactMigrationExecuteRequest` | interface | <code>interface LegacyToolArtifactMigrationExecuteRequest</code> | Field contract for Legacy Tool Artifact Migration Execute Request; see all contract members below. |
| `LegacyToolArtifactMigrationExecutionItem` | interface | <code>interface LegacyToolArtifactMigrationExecutionItem</code> | Field contract for Legacy Tool Artifact Migration Execution Item; see all contract members below. |
| `LegacyToolArtifactMigrationExecutionResult` | interface | <code>interface LegacyToolArtifactMigrationExecutionResult</code> | Field contract for Legacy Tool Artifact Migration Execution Result; see all contract members below. |
| `LegacyToolArtifactMigrationExecutionSummary` | interface | <code>interface LegacyToolArtifactMigrationExecutionSummary</code> | Field contract for Legacy Tool Artifact Migration Execution Summary; see all contract members below. |
| `LegacyToolArtifactMigrationExecutorOptions` | interface | <code>interface LegacyToolArtifactMigrationExecutorOptions</code> | Field contract for Legacy Tool Artifact Migration Executor Options; see all contract members below. |
| `LegacyToolArtifactMigrationFailure` | interface | <code>interface LegacyToolArtifactMigrationFailure</code> | Field contract for Legacy Tool Artifact Migration Failure; see all contract members below. |
| `LegacyToolArtifactMigrationTargetSummary` | interface | <code>interface LegacyToolArtifactMigrationTargetSummary</code> | Field contract for Legacy Tool Artifact Migration Target Summary; see all contract members below. |
| `LegacyToolArtifactMigrationExecutionErrorCode` | type | <code>type LegacyToolArtifactMigrationExecutionErrorCode = 'LEGACY_MIGRATION_EXECUTION_INVALID_PLAN' &#124; 'LEGACY_MIGRATION_EXECUTION_LIMIT_EXCEEDED' &#124; 'LEGACY_MIGRATION_RESULT_MISMATCH'</code> | Public type alias for Legacy Tool Artifact Migration Execution Error Code. |

## `LegacyToolArtifactMigrationExecutionError` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `code` | property | <code>code: LegacyToolArtifactMigrationExecutionErrorCode</code> | Public code property. |
| `constructor` | constructor | <code>(code: LegacyToolArtifactMigrationExecutionErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationExecutionError</code> | Creates an instance of this class. |
| `details` | property | <code>details: Record&lt;string, unknown&gt;</code> | Public details property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `stack` | property | <code>stack: string</code> | Public stack property. |
| `static captureStackTrace` | method | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public runtime operation for prepare Stack Trace. |
| `static stackTraceLimit` | property | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LegacyToolArtifactMigrationExecutor` public members

Executes a prevalidated migration plan sequentially. It never deletes or mutates legacy source files, and individual import failures remain isolated.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LegacyToolArtifactMigrationExecutorOptions): LegacyToolArtifactMigrationExecutor</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: LegacyToolArtifactMigrationExecuteRequest): Promise&lt;LegacyToolArtifactMigrationExecutionResult&gt;</code> | Public runtime operation for execute. |

## `LegacyToolArtifactMigrationExecuteRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dryRun` | property | <code>dryRun: boolean</code> | Public dry Run property. |
| `plan` | property | <code>plan: LegacyToolArtifactMigrationPlan</code> | Public plan property. |

## `LegacyToolArtifactMigrationExecutionItem` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public artifact Id property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `failure` | property | <code>failure: LegacyToolArtifactMigrationFailure</code> | Public failure property. |
| `legacyArtifactId` | property | <code>legacyArtifactId: string</code> | Public legacy Artifact Id property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
| `status` | property | <code>status: "failed" &#124; "imported" &#124; "dry_run"</code> | Public status property. |
| `target` | property | <code>target: LegacyToolArtifactMigrationTargetSummary</code> | Public target property. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |

## `LegacyToolArtifactMigrationExecutionResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `items` | property | <code>items: LegacyToolArtifactMigrationExecutionItem[]</code> | Public items property. |
| `mode` | property | <code>mode: "execute" &#124; "dry_run"</code> | Public mode property. |
| `planHash` | property | <code>planHash: string</code> | Public plan Hash property. |
| `reportId` | property | <code>reportId: string</code> | Public report Id property. |
| `skipped` | property | <code>skipped: LegacyToolArtifactMigrationSkipPlanItem[]</code> | Public skipped property. |
| `summary` | property | <code>summary: LegacyToolArtifactMigrationExecutionSummary</code> | Public summary property. |

## `LegacyToolArtifactMigrationExecutionSummary` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dryRun` | property | <code>dryRun: number</code> | Public dry Run property. |
| `failed` | property | <code>failed: number</code> | Public failed property. |
| `imported` | property | <code>imported: number</code> | Public imported property. |
| `planned` | property | <code>planned: number</code> | Public planned property. |
| `skipped` | property | <code>skipped: number</code> | Public skipped property. |

## `LegacyToolArtifactMigrationExecutorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `importer` | property | <code>importer: Pick&lt;LegacyToolArtifactImporter, "import"&gt;</code> | Public importer property. |
| `maxImports` | property | <code>maxImports: number</code> | Public max Imports property. |

## `LegacyToolArtifactMigrationFailure` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `code` | property | <code>code: string</code> | Public code property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `name` | property | <code>name: string</code> | Public name property. |

## `LegacyToolArtifactMigrationTargetSummary` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `invocationId` | property | <code>invocationId: string</code> | Public invocation Id property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |
