# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-migration-planner`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)
- Exports: **11**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LegacyToolArtifactMigrationPlanError` | class | <code>new LegacyToolArtifactMigrationPlanError(code: LegacyToolArtifactMigrationPlanErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationPlanError</code> | Runtime implementation for Legacy Tool Artifact Migration Plan Error; see its public constructor and members below. |
| `LegacyToolArtifactMigrationPlanner` | class | <code>new LegacyToolArtifactMigrationPlanner(options?: LegacyToolArtifactMigrationPlannerOptions): LegacyToolArtifactMigrationPlanner</code> | Creates a deterministic migration plan without reading, importing, or deleting Artifact bytes. Historical path segments are never identities. |
| `LegacyToolArtifactMigrationImportPlanItem` | interface | <code>interface LegacyToolArtifactMigrationImportPlanItem</code> | Field contract for Legacy Tool Artifact Migration Import Plan Item; see all contract members below. |
| `LegacyToolArtifactMigrationImportResolution` | interface | <code>interface LegacyToolArtifactMigrationImportResolution</code> | Field contract for Legacy Tool Artifact Migration Import Resolution; see all contract members below. |
| `LegacyToolArtifactMigrationPlan` | interface | <code>interface LegacyToolArtifactMigrationPlan</code> | Field contract for Legacy Tool Artifact Migration Plan; see all contract members below. |
| `LegacyToolArtifactMigrationPlannerOptions` | interface | <code>interface LegacyToolArtifactMigrationPlannerOptions</code> | Field contract for Legacy Tool Artifact Migration Planner Options; see all contract members below. |
| `LegacyToolArtifactMigrationPlanRequest` | interface | <code>interface LegacyToolArtifactMigrationPlanRequest</code> | Field contract for Legacy Tool Artifact Migration Plan Request; see all contract members below. |
| `LegacyToolArtifactMigrationSkipPlanItem` | interface | <code>interface LegacyToolArtifactMigrationSkipPlanItem</code> | Field contract for Legacy Tool Artifact Migration Skip Plan Item; see all contract members below. |
| `LegacyToolArtifactMigrationSkipResolution` | interface | <code>interface LegacyToolArtifactMigrationSkipResolution</code> | Field contract for Legacy Tool Artifact Migration Skip Resolution; see all contract members below. |
| `LegacyToolArtifactMigrationPlanErrorCode` | type | <code>type LegacyToolArtifactMigrationPlanErrorCode = 'LEGACY_MIGRATION_INVALID_INVENTORY' &#124; 'LEGACY_MIGRATION_DUPLICATE_SOURCE' &#124; 'LEGACY_MIGRATION_LIMIT_EXCEEDED' &#124; 'LEGACY_MIGRATION_INVALID_RESOLUTION'</code> | Public type alias for Legacy Tool Artifact Migration Plan Error Code. |
| `LegacyToolArtifactMigrationResolution` | type | <code>type LegacyToolArtifactMigrationResolution = LegacyToolArtifactMigrationImportResolution &#124; LegacyToolArtifactMigrationSkipResolution</code> | Public type alias for Legacy Tool Artifact Migration Resolution. |

## `LegacyToolArtifactMigrationPlanError` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `code` | property | <code>code: LegacyToolArtifactMigrationPlanErrorCode</code> | Public code property. |
| `constructor` | constructor | <code>(code: LegacyToolArtifactMigrationPlanErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationPlanError</code> | Creates an instance of this class. |
| `details` | property | <code>details: Record&lt;string, unknown&gt;</code> | Public details property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `stack` | property | <code>stack: string</code> | Public stack property. |
| `static captureStackTrace` | method | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public runtime operation for prepare Stack Trace. |
| `static stackTraceLimit` | property | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LegacyToolArtifactMigrationPlanner` public members

Creates a deterministic migration plan without reading, importing, or deleting Artifact bytes. Historical path segments are never identities.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: LegacyToolArtifactMigrationPlannerOptions): LegacyToolArtifactMigrationPlanner</code> | Creates an instance of this class. |
| `plan` | method | <code>plan(request: LegacyToolArtifactMigrationPlanRequest): Promise&lt;LegacyToolArtifactMigrationPlan&gt;</code> | Plans plan at this module boundary. |

## `LegacyToolArtifactMigrationImportPlanItem` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `request` | property | <code>request: LegacyToolArtifactImportRequest</code> | Public request property. |
| `source` | property | <code>source: LegacyToolArtifactInventoryEntry</code> | Public source property. |

## `LegacyToolArtifactMigrationImportResolution` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `action` | property | <code>action: "import"</code> | Public action property. |
| `context` | property | <code>context: ToolArtifactManagerContext</code> | Public context property. |
| `invocationId` | property | <code>invocationId: string</code> | Public invocation Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |

## `LegacyToolArtifactMigrationPlan` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `imports` | property | <code>imports: LegacyToolArtifactMigrationImportPlanItem[]</code> | Public imports property. |
| `planHash` | property | <code>planHash: string</code> | Public plan Hash property. |
| `skipped` | property | <code>skipped: LegacyToolArtifactMigrationSkipPlanItem[]</code> | Public skipped property. |
| `totalBytes` | property | <code>totalBytes: number</code> | Public total Bytes property. |
| `totalEntries` | property | <code>totalEntries: number</code> | Public total Entries property. |

## `LegacyToolArtifactMigrationPlannerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxEntries` | property | <code>maxEntries: number</code> | Public max Entries property. |

## `LegacyToolArtifactMigrationPlanRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `inventory` | property | <code>inventory: LegacyToolArtifactInventoryResult</code> | Public inventory property. |
| `resolve` | method | <code>resolve(entry: Readonly&lt;LegacyToolArtifactInventoryEntry&gt;): LegacyToolArtifactMigrationResolution &#124; Promise&lt;LegacyToolArtifactMigrationResolution&gt;</code> | Resolves resolve at this module boundary. |

## `LegacyToolArtifactMigrationSkipPlanItem` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `source` | property | <code>source: LegacyToolArtifactInventoryEntry</code> | Public source property. |

## `LegacyToolArtifactMigrationSkipResolution` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `action` | property | <code>action: "skip"</code> | Public action property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
