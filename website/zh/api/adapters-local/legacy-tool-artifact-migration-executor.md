# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-migration-executor`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts)
- 导出数: **10**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LegacyToolArtifactMigrationExecutionError` | 类 | <code>new LegacyToolArtifactMigrationExecutionError(code: LegacyToolArtifactMigrationExecutionErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationExecutionError</code> | Legacy Tool Artifact Migration Execution Error 的运行时实现；公开构造函数与成员见下表。 |
| `LegacyToolArtifactMigrationExecutor` | 类 | <code>new LegacyToolArtifactMigrationExecutor(options: LegacyToolArtifactMigrationExecutorOptions): LegacyToolArtifactMigrationExecutor</code> | Executes a prevalidated migration plan sequentially. It never deletes or mutates legacy source files, and individual import failures remain isolated. |
| `LegacyToolArtifactMigrationExecuteRequest` | 接口 | <code>interface LegacyToolArtifactMigrationExecuteRequest</code> | Legacy Tool Artifact Migration Execute Request 的字段契约；完整字段见下表。 |
| `LegacyToolArtifactMigrationExecutionItem` | 接口 | <code>interface LegacyToolArtifactMigrationExecutionItem</code> | Legacy Tool Artifact Migration Execution Item 的字段契约；完整字段见下表。 |
| `LegacyToolArtifactMigrationExecutionResult` | 接口 | <code>interface LegacyToolArtifactMigrationExecutionResult</code> | Legacy Tool Artifact Migration Execution Result 的字段契约；完整字段见下表。 |
| `LegacyToolArtifactMigrationExecutionSummary` | 接口 | <code>interface LegacyToolArtifactMigrationExecutionSummary</code> | Legacy Tool Artifact Migration Execution Summary 的字段契约；完整字段见下表。 |
| `LegacyToolArtifactMigrationExecutorOptions` | 接口 | <code>interface LegacyToolArtifactMigrationExecutorOptions</code> | Legacy Tool Artifact Migration Executor Options 的字段契约；完整字段见下表。 |
| `LegacyToolArtifactMigrationFailure` | 接口 | <code>interface LegacyToolArtifactMigrationFailure</code> | Legacy Tool Artifact Migration Failure 的字段契约；完整字段见下表。 |
| `LegacyToolArtifactMigrationTargetSummary` | 接口 | <code>interface LegacyToolArtifactMigrationTargetSummary</code> | Legacy Tool Artifact Migration Target Summary 的字段契约；完整字段见下表。 |
| `LegacyToolArtifactMigrationExecutionErrorCode` | 类型 | <code>type LegacyToolArtifactMigrationExecutionErrorCode = 'LEGACY_MIGRATION_EXECUTION_INVALID_PLAN' &#124; 'LEGACY_MIGRATION_EXECUTION_LIMIT_EXCEEDED' &#124; 'LEGACY_MIGRATION_RESULT_MISMATCH'</code> | Legacy Tool Artifact Migration Execution Error Code 的公共类型别名。 |

## `LegacyToolArtifactMigrationExecutionError` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause: unknown</code> | cause 字段。 |
| `code` | 属性 | <code>code: LegacyToolArtifactMigrationExecutionErrorCode</code> | code 字段。 |
| `constructor` | 构造函数 | <code>(code: LegacyToolArtifactMigrationExecutionErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationExecutionError</code> | 创建该类的实例。 |
| `details` | 属性 | <code>details: Record&lt;string, unknown&gt;</code> | details 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `stack` | 属性 | <code>stack: string</code> | stack 字段。 |
| `static captureStackTrace` | 方法 | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | prepare Stack Trace 的公开运行时操作。 |
| `static stackTraceLimit` | 属性 | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LegacyToolArtifactMigrationExecutor` 公开成员

Executes a prevalidated migration plan sequentially. It never deletes or mutates legacy source files, and individual import failures remain isolated.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LegacyToolArtifactMigrationExecutorOptions): LegacyToolArtifactMigrationExecutor</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: LegacyToolArtifactMigrationExecuteRequest): Promise&lt;LegacyToolArtifactMigrationExecutionResult&gt;</code> | execute 的公开运行时操作。 |

## `LegacyToolArtifactMigrationExecuteRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dryRun` | 属性 | <code>dryRun: boolean</code> | dry Run 字段。 |
| `plan` | 属性 | <code>plan: LegacyToolArtifactMigrationPlan</code> | plan 字段。 |

## `LegacyToolArtifactMigrationExecutionItem` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | artifact Id 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `failure` | 属性 | <code>failure: LegacyToolArtifactMigrationFailure</code> | failure 字段。 |
| `legacyArtifactId` | 属性 | <code>legacyArtifactId: string</code> | legacy Artifact Id 字段。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | relative Path 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
| `status` | 属性 | <code>status: "failed" &#124; "imported" &#124; "dry_run"</code> | status 字段。 |
| `target` | 属性 | <code>target: LegacyToolArtifactMigrationTargetSummary</code> | target 字段。 |
| `versionId` | 属性 | <code>versionId: string</code> | version Id 字段。 |

## `LegacyToolArtifactMigrationExecutionResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `items` | 属性 | <code>items: LegacyToolArtifactMigrationExecutionItem[]</code> | items 字段。 |
| `mode` | 属性 | <code>mode: "execute" &#124; "dry_run"</code> | mode 字段。 |
| `planHash` | 属性 | <code>planHash: string</code> | plan Hash 字段。 |
| `reportId` | 属性 | <code>reportId: string</code> | report Id 字段。 |
| `skipped` | 属性 | <code>skipped: LegacyToolArtifactMigrationSkipPlanItem[]</code> | skipped 字段。 |
| `summary` | 属性 | <code>summary: LegacyToolArtifactMigrationExecutionSummary</code> | summary 字段。 |

## `LegacyToolArtifactMigrationExecutionSummary` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dryRun` | 属性 | <code>dryRun: number</code> | dry Run 字段。 |
| `failed` | 属性 | <code>failed: number</code> | failed 字段。 |
| `imported` | 属性 | <code>imported: number</code> | imported 字段。 |
| `planned` | 属性 | <code>planned: number</code> | planned 字段。 |
| `skipped` | 属性 | <code>skipped: number</code> | skipped 字段。 |

## `LegacyToolArtifactMigrationExecutorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `importer` | 属性 | <code>importer: Pick&lt;LegacyToolArtifactImporter, "import"&gt;</code> | importer 字段。 |
| `maxImports` | 属性 | <code>maxImports: number</code> | max Imports 字段。 |

## `LegacyToolArtifactMigrationFailure` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `code` | 属性 | <code>code: string</code> | code 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |

## `LegacyToolArtifactMigrationTargetSummary` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `invocationId` | 属性 | <code>invocationId: string</code> | invocation Id 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |
