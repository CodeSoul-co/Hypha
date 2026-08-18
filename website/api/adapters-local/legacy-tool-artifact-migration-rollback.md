# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-migration-rollback`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts)
- Exports: **8**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LegacyToolArtifactMigrationRollbackError` | class | <code>new LegacyToolArtifactMigrationRollbackError(code: LegacyToolArtifactMigrationRollbackErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationRollbackError</code> | Runtime implementation for Legacy Tool Artifact Migration Rollback Error; see its public constructor and members below. |
| `LegacyToolArtifactMigrationRollbackExecutor` | class | <code>new LegacyToolArtifactMigrationRollbackExecutor(options: LegacyToolArtifactMigrationRollbackExecutorOptions): LegacyToolArtifactMigrationRollbackExecutor</code> | Reverses only Artifacts proven to have been created by a specific migration report. Revision fences prevent rollback from deleting a later mutation. |
| `LegacyToolArtifactMigrationRollbackExecutorOptions` | interface | <code>interface LegacyToolArtifactMigrationRollbackExecutorOptions</code> | Field contract for Legacy Tool Artifact Migration Rollback Executor Options; see all contract members below. |
| `LegacyToolArtifactMigrationRollbackItem` | interface | <code>interface LegacyToolArtifactMigrationRollbackItem</code> | Field contract for Legacy Tool Artifact Migration Rollback Item; see all contract members below. |
| `LegacyToolArtifactMigrationRollbackRequest` | interface | <code>interface LegacyToolArtifactMigrationRollbackRequest</code> | Field contract for Legacy Tool Artifact Migration Rollback Request; see all contract members below. |
| `LegacyToolArtifactMigrationRollbackResult` | interface | <code>interface LegacyToolArtifactMigrationRollbackResult</code> | Field contract for Legacy Tool Artifact Migration Rollback Result; see all contract members below. |
| `LegacyToolArtifactMigrationRollbackSummary` | interface | <code>interface LegacyToolArtifactMigrationRollbackSummary</code> | Field contract for Legacy Tool Artifact Migration Rollback Summary; see all contract members below. |
| `LegacyToolArtifactMigrationRollbackErrorCode` | type | <code>type LegacyToolArtifactMigrationRollbackErrorCode = 'LEGACY_MIGRATION_ROLLBACK_INVALID_REPORT' &#124; 'LEGACY_MIGRATION_ROLLBACK_TARGET_MISMATCH'</code> | Public type alias for Legacy Tool Artifact Migration Rollback Error Code. |

## `LegacyToolArtifactMigrationRollbackError` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `code` | property | <code>code: LegacyToolArtifactMigrationRollbackErrorCode</code> | Public code property. |
| `constructor` | constructor | <code>(code: LegacyToolArtifactMigrationRollbackErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationRollbackError</code> | Creates an instance of this class. |
| `details` | property | <code>details: Record&lt;string, unknown&gt;</code> | Public details property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `stack` | property | <code>stack: string</code> | Public stack property. |
| `static captureStackTrace` | method | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public runtime operation for prepare Stack Trace. |
| `static stackTraceLimit` | property | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LegacyToolArtifactMigrationRollbackExecutor` public members

Reverses only Artifacts proven to have been created by a specific migration report. Revision fences prevent rollback from deleting a later mutation.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LegacyToolArtifactMigrationRollbackExecutorOptions): LegacyToolArtifactMigrationRollbackExecutor</code> | Creates an instance of this class. |
| `rollback` | method | <code>rollback(request: LegacyToolArtifactMigrationRollbackRequest): Promise&lt;LegacyToolArtifactMigrationRollbackResult&gt;</code> | Public runtime operation for rollback. |

## `LegacyToolArtifactMigrationRollbackExecutorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `manager` | property | <code>manager: Pick&lt;ArtifactManager, "delete" &#124; "get"&gt;</code> | Public manager property. |

## `LegacyToolArtifactMigrationRollbackItem` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public artifact Id property. |
| `failure` | property | <code>failure: LegacyToolArtifactMigrationFailure</code> | Public failure property. |
| `legacyArtifactId` | property | <code>legacyArtifactId: string</code> | Public legacy Artifact Id property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `status` | property | <code>status: "failed" &#124; "rolled_back" &#124; "dry_run" &#124; "already_absent"</code> | Public status property. |
| `target` | property | <code>target: LegacyToolArtifactMigrationTargetSummary</code> | Public target property. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |

## `LegacyToolArtifactMigrationRollbackRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dryRun` | property | <code>dryRun: boolean</code> | Public dry Run property. |
| `execution` | property | <code>execution: LegacyToolArtifactMigrationExecutionResult</code> | Public execution property. |
| `plan` | property | <code>plan: LegacyToolArtifactMigrationPlan</code> | Public plan property. |

## `LegacyToolArtifactMigrationRollbackResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionReportId` | property | <code>executionReportId: string</code> | Public execution Report Id property. |
| `items` | property | <code>items: LegacyToolArtifactMigrationRollbackItem[]</code> | Public items property. |
| `mode` | property | <code>mode: "rollback" &#124; "dry_run"</code> | Public mode property. |
| `planHash` | property | <code>planHash: string</code> | Public plan Hash property. |
| `reportId` | property | <code>reportId: string</code> | Public report Id property. |
| `summary` | property | <code>summary: LegacyToolArtifactMigrationRollbackSummary</code> | Public summary property. |

## `LegacyToolArtifactMigrationRollbackSummary` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `alreadyAbsent` | property | <code>alreadyAbsent: number</code> | Public already Absent property. |
| `candidates` | property | <code>candidates: number</code> | Public candidates property. |
| `dryRun` | property | <code>dryRun: number</code> | Public dry Run property. |
| `failed` | property | <code>failed: number</code> | Public failed property. |
| `rolledBack` | property | <code>rolledBack: number</code> | Public rolled Back property. |
