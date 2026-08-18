# `@codesoul-co/hypha-tools` / `execution-adapter`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 模块指南: [学习与组合说明](/zh/packages/tools)
- 源码: [`packages/tools/src/execution-adapter.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)
- 导出数: **18**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExecutionToolAdapter` | 类 | <code>new ExecutionToolAdapter&lt;TInput = unknown&gt;(id: string, port: ExecutionToolRuntimePort, createDispatch: ExecutionToolDispatchFactory&lt;TInput&gt;, options: ExecutionToolAdapterOptions): ExecutionToolAdapter&lt;TInput&gt;</code> | Execution Tool Adapter 的运行时实现；公开构造函数与成员见下表。 |
| `ExecutionToolTerminalError` | 类 | <code>new ExecutionToolTerminalError(observation: ExecutionToolObservation): ExecutionToolTerminalError</code> | Execution Tool Terminal Error 的运行时实现；公开构造函数与成员见下表。 |
| `EXECUTION_TOOL_TERMINAL_STATES` | 常量 | <code>const EXECUTION_TOOL_TERMINAL_STATES: readonly ["completed", "failed", "timed_out", "cancelled", "unknown", "quarantined"]</code> | 由 `execution-adapter` 模块导出的 EXECUTION TOOL TERMINAL STATES 常量。 |
| `hashExecutionToolInput` | 函数 | <code>hashExecutionToolInput(input: unknown): string</code> | 判断是否存在 h Execution Tool Input。 |
| `normalizeExecutionToolInput` | 函数 | <code>normalizeExecutionToolInput&lt;TInput&gt;(input: TInput): TInput</code> | 规范化 Execution Tool Input。 |
| `validateExecutionToolRuntimeRequest` | 函数 | <code>validateExecutionToolRuntimeRequest&lt;TInput&gt;(input: ExecutionToolRuntimeRequest&lt;TInput&gt;): ExecutionToolRuntimeRequest&lt;TInput&gt;</code> | Recomputes the normalized input digest at the Execution boundary. Runtime-port implementations must call this validator before delegating to a provider. |
| `ExecutionToolAdapterOptions` | 接口 | <code>interface ExecutionToolAdapterOptions</code> | Execution Tool Adapter Options 的字段契约；完整字段见下表。 |
| `ExecutionToolDispatchFactoryRequest` | 接口 | <code>interface ExecutionToolDispatchFactoryRequest extends AdapterExecutionRequest&lt;TInput&gt;</code> | Execution Tool Dispatch Factory Request 的字段契约；完整字段见下表。 |
| `ExecutionToolDispatchPlan` | 接口 | <code>interface ExecutionToolDispatchPlan</code> | Execution Tool Dispatch Plan 的字段契约；完整字段见下表。 |
| `ExecutionToolEvidence` | 接口 | <code>interface ExecutionToolEvidence</code> | Execution Tool Evidence 的字段契约；完整字段见下表。 |
| `ExecutionToolObservation` | 接口 | <code>interface ExecutionToolObservation extends ExecutionToolRuntimeResult</code> | Execution Tool Observation 的字段契约；完整字段见下表。 |
| `ExecutionToolProvenance` | 接口 | <code>interface ExecutionToolProvenance</code> | Execution Tool Provenance 的字段契约；完整字段见下表。 |
| `ExecutionToolRuntimePort` | 接口 | <code>interface ExecutionToolRuntimePort</code> | Execution Tool Runtime Port 的字段契约；完整字段见下表。 |
| `ExecutionToolRuntimeRequest` | 接口 | <code>interface ExecutionToolRuntimeRequest</code> | Execution Tool Runtime Request 的字段契约；完整字段见下表。 |
| `ExecutionToolRuntimeResult` | 接口 | <code>interface ExecutionToolRuntimeResult</code> | Execution Tool Runtime Result 的字段契约；完整字段见下表。 |
| `ExecutionToolRuntimeScope` | 接口 | <code>interface ExecutionToolRuntimeScope</code> | Execution Tool Runtime Scope 的字段契约；完整字段见下表。 |
| `ExecutionToolDispatchFactory` | 类型 | <code>type ExecutionToolDispatchFactory = (request: ExecutionToolDispatchFactoryRequest&lt;TInput&gt;) =&gt; Promise&lt;ExecutionToolDispatchPlan&gt; &#124; ExecutionToolDispatchPlan</code> | Execution Tool Dispatch Factory 的公共类型别名。 |
| `ExecutionToolTerminalState` | 类型 | <code>type ExecutionToolTerminalState = (typeof EXECUTION_TOOL_TERMINAL_STATES)[number]</code> | Execution Tool Terminal State 的公共类型别名。 |

## `ExecutionToolAdapter` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(request: AdapterCancellationRequest): Promise&lt;void&gt;</code> | 取消 cancel。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>&lt;TInput = unknown&gt;(id: string, port: ExecutionToolRuntimePort, createDispatch: ExecutionToolDispatchFactory&lt;TInput&gt;, options: ExecutionToolAdapterOptions): ExecutionToolAdapter&lt;TInput&gt;</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;ExecutionToolObservation&gt;&gt;</code> | execute 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `source` | 属性 | <code>source: ToolSource</code> | source 字段。 |

## `ExecutionToolTerminalError` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause: unknown</code> | cause 字段。 |
| `code` | 属性 | <code>code: string</code> | code 字段。 |
| `constructor` | 构造函数 | <code>(observation: ExecutionToolObservation): ExecutionToolTerminalError</code> | 创建该类的实例。 |
| `context` | 属性 | <code>context: Record&lt;string, unknown&gt;</code> | context 字段。 |
| `executionError` | 属性 | <code>executionError: NormalizedExecutionError</code> | execution Error 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `observation` | 属性 | <code>observation: ExecutionToolObservation</code> | observation 字段。 |
| `stack` | 属性 | <code>stack: string</code> | stack 字段。 |
| `static captureStackTrace` | 方法 | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | prepare Stack Trace 的公开运行时操作。 |
| `static stackTraceLimit` | 属性 | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |
| `terminalState` | 属性 | <code>terminalState: "unknown" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "quarantined"</code> | terminal State 字段。 |

## `ExecutionToolAdapterOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `binding` | 属性 | <code>binding: ExecutionToolBinding</code> | binding 字段。 |
| `healthTimeoutMs` | 属性 | <code>healthTimeoutMs: number</code> | health Timeout Ms 字段。 |
| `maxEvidenceBytes` | 属性 | <code>maxEvidenceBytes: number</code> | max Evidence Bytes 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | tool Revision 字段。 |

## `ExecutionToolDispatchFactoryRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `context` | 属性 | <code>context: ToolCallContext</code> | context 字段。 |
| `input` | 属性 | <code>input: TInput</code> | input 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `normalizedInput` | 属性 | <code>normalizedInput: TInput</code> | normalized Input 字段。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | signal 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |

## `ExecutionToolDispatchPlan` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvalExpiresAt` | 属性 | <code>approvalExpiresAt: string</code> | approval Expires At 字段。 |
| `dispatch` | 属性 | <code>dispatch: ExecutionDispatchRequest</code> | dispatch 字段。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | expected Revision 字段。 |

## `ExecutionToolEvidence` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `hash` | 属性 | <code>hash: string</code> | hash 字段。 |
| `kind` | 属性 | <code>kind: "artifact" &#124; "event" &#124; "snapshot" &#124; "authorization" &#124; "trace" &#124; "receipt"</code> | kind 字段。 |
| `recordedAt` | 属性 | <code>recordedAt: string</code> | recorded At 字段。 |
| `ref` | 属性 | <code>ref: string</code> | ref 字段。 |

## `ExecutionToolObservation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityResult` | 属性 | <code>activityResult: ExecutionActivityResult</code> | activity Result 字段。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef: string</code> | contract Snapshot Ref 字段。 |
| `evidence` | 属性 | <code>evidence: ExecutionToolEvidence[]</code> | evidence 字段。 |
| `evidenceHash` | 属性 | <code>evidenceHash: string</code> | evidence Hash 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `provenance` | 属性 | <code>provenance: ExecutionToolProvenance</code> | provenance 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `scope` | 属性 | <code>scope: ExecutionToolRuntimeScope</code> | scope 字段。 |
| `terminalState` | 属性 | <code>terminalState: "unknown" &#124; "completed" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "quarantined"</code> | terminal State 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |
| `toolOperation` | 属性 | <code>toolOperation: "artifact" &#124; "command" &#124; "file_read" &#124; "file_write" &#124; "sandbox"</code> | tool Operation 字段。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | tool Revision 字段。 |

## `ExecutionToolProvenance` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorizationEvidenceId` | 属性 | <code>authorizationEvidenceId: string</code> | authorization Evidence Id 字段。 |
| `authorizationVerificationRef` | 属性 | <code>authorizationVerificationRef: string</code> | authorization Verification Ref 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `receiptRef` | 属性 | <code>receiptRef: string</code> | receipt Ref 字段。 |
| `receivedAt` | 属性 | <code>receivedAt: string</code> | received At 字段。 |
| `resultHash` | 属性 | <code>resultHash: string</code> | result Hash 字段。 |
| `terminalEventId` | 属性 | <code>terminalEventId: string</code> | terminal Event Id 字段。 |

## `ExecutionToolRuntimePort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `execute` | 方法 | <code>execute(request: ExecutionToolRuntimeRequest, signal: AbortSignal): Promise&lt;unknown&gt;</code> | execute 的公开运行时操作。 |
| `health` | 方法 | <code>health(signal: AbortSignal): Promise&lt;unknown&gt;</code> | health 的公开运行时操作。 |

## `ExecutionToolRuntimeRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dispatch` | 属性 | <code>dispatch: ExecutionDispatchRequest</code> | dispatch 字段。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | expected Revision 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `normalizedInput` | 属性 | <code>normalizedInput: TInput</code> | normalized Input 字段。 |

## `ExecutionToolRuntimeResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityResult` | 属性 | <code>activityResult: ExecutionActivityResult</code> | activity Result 字段。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef: string</code> | contract Snapshot Ref 字段。 |
| `evidence` | 属性 | <code>evidence: ExecutionToolEvidence[]</code> | evidence 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `provenance` | 属性 | <code>provenance: ExecutionToolProvenance</code> | provenance 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `scope` | 属性 | <code>scope: ExecutionToolRuntimeScope</code> | scope 字段。 |
| `terminalState` | 属性 | <code>terminalState: "unknown" &#124; "completed" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "quarantined"</code> | terminal State 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |
| `toolOperation` | 属性 | <code>toolOperation: "artifact" &#124; "command" &#124; "file_read" &#124; "file_write" &#124; "sandbox"</code> | tool Operation 字段。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | tool Revision 字段。 |

## `ExecutionToolRuntimeScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |
