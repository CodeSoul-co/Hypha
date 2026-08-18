# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-migration-planner`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)
- 导出数: **11**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LegacyToolArtifactMigrationPlanError` | 类 | <code>new LegacyToolArtifactMigrationPlanError(code: LegacyToolArtifactMigrationPlanErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationPlanError</code> | Legacy Tool Artifact Migration Plan Error 的运行时实现；公开构造函数与成员见下表。 |
| `LegacyToolArtifactMigrationPlanner` | 类 | <code>new LegacyToolArtifactMigrationPlanner(options?: LegacyToolArtifactMigrationPlannerOptions): LegacyToolArtifactMigrationPlanner</code> | Creates a deterministic migration plan without reading, importing, or deleting Artifact bytes. Historical path segments are never identities. |
| `LegacyToolArtifactMigrationImportPlanItem` | 接口 | <code>interface LegacyToolArtifactMigrationImportPlanItem</code> | Legacy Tool Artifact Migration Import Plan Item 的字段契约；完整字段见下表。 |
| `LegacyToolArtifactMigrationImportResolution` | 接口 | <code>interface LegacyToolArtifactMigrationImportResolution</code> | Legacy Tool Artifact Migration Import Resolution 的字段契约；完整字段见下表。 |
| `LegacyToolArtifactMigrationPlan` | 接口 | <code>interface LegacyToolArtifactMigrationPlan</code> | Legacy Tool Artifact Migration Plan 的字段契约；完整字段见下表。 |
| `LegacyToolArtifactMigrationPlannerOptions` | 接口 | <code>interface LegacyToolArtifactMigrationPlannerOptions</code> | Legacy Tool Artifact Migration Planner Options 的字段契约；完整字段见下表。 |
| `LegacyToolArtifactMigrationPlanRequest` | 接口 | <code>interface LegacyToolArtifactMigrationPlanRequest</code> | Legacy Tool Artifact Migration Plan Request 的字段契约；完整字段见下表。 |
| `LegacyToolArtifactMigrationSkipPlanItem` | 接口 | <code>interface LegacyToolArtifactMigrationSkipPlanItem</code> | Legacy Tool Artifact Migration Skip Plan Item 的字段契约；完整字段见下表。 |
| `LegacyToolArtifactMigrationSkipResolution` | 接口 | <code>interface LegacyToolArtifactMigrationSkipResolution</code> | Legacy Tool Artifact Migration Skip Resolution 的字段契约；完整字段见下表。 |
| `LegacyToolArtifactMigrationPlanErrorCode` | 类型 | <code>type LegacyToolArtifactMigrationPlanErrorCode = 'LEGACY_MIGRATION_INVALID_INVENTORY' &#124; 'LEGACY_MIGRATION_DUPLICATE_SOURCE' &#124; 'LEGACY_MIGRATION_LIMIT_EXCEEDED' &#124; 'LEGACY_MIGRATION_INVALID_RESOLUTION'</code> | Legacy Tool Artifact Migration Plan Error Code 的公共类型别名。 |
| `LegacyToolArtifactMigrationResolution` | 类型 | <code>type LegacyToolArtifactMigrationResolution = LegacyToolArtifactMigrationImportResolution &#124; LegacyToolArtifactMigrationSkipResolution</code> | Legacy Tool Artifact Migration Resolution 的公共类型别名。 |

## `LegacyToolArtifactMigrationPlanError` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause: unknown</code> | cause 字段。 |
| `code` | 属性 | <code>code: LegacyToolArtifactMigrationPlanErrorCode</code> | code 字段。 |
| `constructor` | 构造函数 | <code>(code: LegacyToolArtifactMigrationPlanErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationPlanError</code> | 创建该类的实例。 |
| `details` | 属性 | <code>details: Record&lt;string, unknown&gt;</code> | details 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `stack` | 属性 | <code>stack: string</code> | stack 字段。 |
| `static captureStackTrace` | 方法 | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | prepare Stack Trace 的公开运行时操作。 |
| `static stackTraceLimit` | 属性 | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LegacyToolArtifactMigrationPlanner` 公开成员

Creates a deterministic migration plan without reading, importing, or deleting Artifact bytes. Historical path segments are never identities.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: LegacyToolArtifactMigrationPlannerOptions): LegacyToolArtifactMigrationPlanner</code> | 创建该类的实例。 |
| `plan` | 方法 | <code>plan(request: LegacyToolArtifactMigrationPlanRequest): Promise&lt;LegacyToolArtifactMigrationPlan&gt;</code> | 规划 plan。 |

## `LegacyToolArtifactMigrationImportPlanItem` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `request` | 属性 | <code>request: LegacyToolArtifactImportRequest</code> | request 字段。 |
| `source` | 属性 | <code>source: LegacyToolArtifactInventoryEntry</code> | source 字段。 |

## `LegacyToolArtifactMigrationImportResolution` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `action` | 属性 | <code>action: "import"</code> | action 字段。 |
| `context` | 属性 | <code>context: ToolArtifactManagerContext</code> | context 字段。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | invocation Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |

## `LegacyToolArtifactMigrationPlan` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `imports` | 属性 | <code>imports: LegacyToolArtifactMigrationImportPlanItem[]</code> | imports 字段。 |
| `planHash` | 属性 | <code>planHash: string</code> | plan Hash 字段。 |
| `skipped` | 属性 | <code>skipped: LegacyToolArtifactMigrationSkipPlanItem[]</code> | skipped 字段。 |
| `totalBytes` | 属性 | <code>totalBytes: number</code> | total Bytes 字段。 |
| `totalEntries` | 属性 | <code>totalEntries: number</code> | total Entries 字段。 |

## `LegacyToolArtifactMigrationPlannerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxEntries` | 属性 | <code>maxEntries: number</code> | max Entries 字段。 |

## `LegacyToolArtifactMigrationPlanRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `inventory` | 属性 | <code>inventory: LegacyToolArtifactInventoryResult</code> | inventory 字段。 |
| `resolve` | 方法 | <code>resolve(entry: Readonly&lt;LegacyToolArtifactInventoryEntry&gt;): LegacyToolArtifactMigrationResolution &#124; Promise&lt;LegacyToolArtifactMigrationResolution&gt;</code> | 解析 resolve。 |

## `LegacyToolArtifactMigrationSkipPlanItem` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `source` | 属性 | <code>source: LegacyToolArtifactInventoryEntry</code> | source 字段。 |

## `LegacyToolArtifactMigrationSkipResolution` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `action` | 属性 | <code>action: "skip"</code> | action 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
