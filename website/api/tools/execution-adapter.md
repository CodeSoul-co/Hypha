# `@codesoul-co/hypha-tools` / `execution-adapter`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Package guide: [learning and composition guide](/packages/tools)
- Source: [`packages/tools/src/execution-adapter.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)
- Exports: **18**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExecutionToolAdapter` | class | <code>new ExecutionToolAdapter&lt;TInput = unknown&gt;(id: string, port: ExecutionToolRuntimePort, createDispatch: ExecutionToolDispatchFactory&lt;TInput&gt;, options: ExecutionToolAdapterOptions): ExecutionToolAdapter&lt;TInput&gt;</code> | Runtime implementation for Execution Tool Adapter; see its public constructor and members below. |
| `ExecutionToolTerminalError` | class | <code>new ExecutionToolTerminalError(observation: ExecutionToolObservation): ExecutionToolTerminalError</code> | Runtime implementation for Execution Tool Terminal Error; see its public constructor and members below. |
| `EXECUTION_TOOL_TERMINAL_STATES` | constant | <code>const EXECUTION_TOOL_TERMINAL_STATES: readonly ["completed", "failed", "timed_out", "cancelled", "unknown", "quarantined"]</code> | EXECUTION TOOL TERMINAL STATES constant exported by the `execution-adapter` module. |
| `hashExecutionToolInput` | function | <code>hashExecutionToolInput(input: unknown): string</code> | Checks whether h Execution Tool Input at this module boundary. |
| `normalizeExecutionToolInput` | function | <code>normalizeExecutionToolInput&lt;TInput&gt;(input: TInput): TInput</code> | Normalizes Execution Tool Input at this module boundary. |
| `validateExecutionToolRuntimeRequest` | function | <code>validateExecutionToolRuntimeRequest&lt;TInput&gt;(input: ExecutionToolRuntimeRequest&lt;TInput&gt;): ExecutionToolRuntimeRequest&lt;TInput&gt;</code> | Recomputes the normalized input digest at the Execution boundary. Runtime-port implementations must call this validator before delegating to a provider. |
| `ExecutionToolAdapterOptions` | interface | <code>interface ExecutionToolAdapterOptions</code> | Field contract for Execution Tool Adapter Options; see all contract members below. |
| `ExecutionToolDispatchFactoryRequest` | interface | <code>interface ExecutionToolDispatchFactoryRequest extends AdapterExecutionRequest&lt;TInput&gt;</code> | Field contract for Execution Tool Dispatch Factory Request; see all contract members below. |
| `ExecutionToolDispatchPlan` | interface | <code>interface ExecutionToolDispatchPlan</code> | Field contract for Execution Tool Dispatch Plan; see all contract members below. |
| `ExecutionToolEvidence` | interface | <code>interface ExecutionToolEvidence</code> | Field contract for Execution Tool Evidence; see all contract members below. |
| `ExecutionToolObservation` | interface | <code>interface ExecutionToolObservation extends ExecutionToolRuntimeResult</code> | Field contract for Execution Tool Observation; see all contract members below. |
| `ExecutionToolProvenance` | interface | <code>interface ExecutionToolProvenance</code> | Field contract for Execution Tool Provenance; see all contract members below. |
| `ExecutionToolRuntimePort` | interface | <code>interface ExecutionToolRuntimePort</code> | Field contract for Execution Tool Runtime Port; see all contract members below. |
| `ExecutionToolRuntimeRequest` | interface | <code>interface ExecutionToolRuntimeRequest</code> | Field contract for Execution Tool Runtime Request; see all contract members below. |
| `ExecutionToolRuntimeResult` | interface | <code>interface ExecutionToolRuntimeResult</code> | Field contract for Execution Tool Runtime Result; see all contract members below. |
| `ExecutionToolRuntimeScope` | interface | <code>interface ExecutionToolRuntimeScope</code> | Field contract for Execution Tool Runtime Scope; see all contract members below. |
| `ExecutionToolDispatchFactory` | type | <code>type ExecutionToolDispatchFactory = (request: ExecutionToolDispatchFactoryRequest&lt;TInput&gt;) =&gt; Promise&lt;ExecutionToolDispatchPlan&gt; &#124; ExecutionToolDispatchPlan</code> | Public type alias for Execution Tool Dispatch Factory. |
| `ExecutionToolTerminalState` | type | <code>type ExecutionToolTerminalState = (typeof EXECUTION_TOOL_TERMINAL_STATES)[number]</code> | Public type alias for Execution Tool Terminal State. |

## `ExecutionToolAdapter` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(request: AdapterCancellationRequest): Promise&lt;void&gt;</code> | Cancels cancel at this module boundary. |
| `capabilities` | method | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>&lt;TInput = unknown&gt;(id: string, port: ExecutionToolRuntimePort, createDispatch: ExecutionToolDispatchFactory&lt;TInput&gt;, options: ExecutionToolAdapterOptions): ExecutionToolAdapter&lt;TInput&gt;</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;ExecutionToolObservation&gt;&gt;</code> | Public runtime operation for execute. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `source` | property | <code>source: ToolSource</code> | Public source property. |

## `ExecutionToolTerminalError` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `code` | property | <code>code: string</code> | Public code property. |
| `constructor` | constructor | <code>(observation: ExecutionToolObservation): ExecutionToolTerminalError</code> | Creates an instance of this class. |
| `context` | property | <code>context: Record&lt;string, unknown&gt;</code> | Public context property. |
| `executionError` | property | <code>executionError: NormalizedExecutionError</code> | Public execution Error property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `observation` | property | <code>observation: ExecutionToolObservation</code> | Public observation property. |
| `stack` | property | <code>stack: string</code> | Public stack property. |
| `static captureStackTrace` | method | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public runtime operation for prepare Stack Trace. |
| `static stackTraceLimit` | property | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |
| `terminalState` | property | <code>terminalState: "unknown" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "quarantined"</code> | Public terminal State property. |

## `ExecutionToolAdapterOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `binding` | property | <code>binding: ExecutionToolBinding</code> | Public binding property. |
| `healthTimeoutMs` | property | <code>healthTimeoutMs: number</code> | Public health Timeout Ms property. |
| `maxEvidenceBytes` | property | <code>maxEvidenceBytes: number</code> | Public max Evidence Bytes property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public tool Revision property. |

## `ExecutionToolDispatchFactoryRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: ToolCallContext</code> | Public context property. |
| `input` | property | <code>input: TInput</code> | Public input property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `normalizedInput` | property | <code>normalizedInput: TInput</code> | Public normalized Input property. |
| `signal` | property | <code>signal: AbortSignal</code> | Public signal property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |

## `ExecutionToolDispatchPlan` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvalExpiresAt` | property | <code>approvalExpiresAt: string</code> | Public approval Expires At property. |
| `dispatch` | property | <code>dispatch: ExecutionDispatchRequest</code> | Public dispatch property. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public expected Revision property. |

## `ExecutionToolEvidence` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `hash` | property | <code>hash: string</code> | Public hash property. |
| `kind` | property | <code>kind: "artifact" &#124; "event" &#124; "snapshot" &#124; "authorization" &#124; "trace" &#124; "receipt"</code> | Public kind property. |
| `recordedAt` | property | <code>recordedAt: string</code> | Public recorded At property. |
| `ref` | property | <code>ref: string</code> | Public ref property. |

## `ExecutionToolObservation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityResult` | property | <code>activityResult: ExecutionActivityResult</code> | Public activity Result property. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef: string</code> | Public contract Snapshot Ref property. |
| `evidence` | property | <code>evidence: ExecutionToolEvidence[]</code> | Public evidence property. |
| `evidenceHash` | property | <code>evidenceHash: string</code> | Public evidence Hash property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `provenance` | property | <code>provenance: ExecutionToolProvenance</code> | Public provenance property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `scope` | property | <code>scope: ExecutionToolRuntimeScope</code> | Public scope property. |
| `terminalState` | property | <code>terminalState: "unknown" &#124; "completed" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "quarantined"</code> | Public terminal State property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |
| `toolOperation` | property | <code>toolOperation: "artifact" &#124; "command" &#124; "file_read" &#124; "file_write" &#124; "sandbox"</code> | Public tool Operation property. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public tool Revision property. |

## `ExecutionToolProvenance` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorizationEvidenceId` | property | <code>authorizationEvidenceId: string</code> | Public authorization Evidence Id property. |
| `authorizationVerificationRef` | property | <code>authorizationVerificationRef: string</code> | Public authorization Verification Ref property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `receiptRef` | property | <code>receiptRef: string</code> | Public receipt Ref property. |
| `receivedAt` | property | <code>receivedAt: string</code> | Public received At property. |
| `resultHash` | property | <code>resultHash: string</code> | Public result Hash property. |
| `terminalEventId` | property | <code>terminalEventId: string</code> | Public terminal Event Id property. |

## `ExecutionToolRuntimePort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `execute` | method | <code>execute(request: ExecutionToolRuntimeRequest, signal: AbortSignal): Promise&lt;unknown&gt;</code> | Public runtime operation for execute. |
| `health` | method | <code>health(signal: AbortSignal): Promise&lt;unknown&gt;</code> | Public runtime operation for health. |

## `ExecutionToolRuntimeRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dispatch` | property | <code>dispatch: ExecutionDispatchRequest</code> | Public dispatch property. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public expected Revision property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `normalizedInput` | property | <code>normalizedInput: TInput</code> | Public normalized Input property. |

## `ExecutionToolRuntimeResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityResult` | property | <code>activityResult: ExecutionActivityResult</code> | Public activity Result property. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef: string</code> | Public contract Snapshot Ref property. |
| `evidence` | property | <code>evidence: ExecutionToolEvidence[]</code> | Public evidence property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `provenance` | property | <code>provenance: ExecutionToolProvenance</code> | Public provenance property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `scope` | property | <code>scope: ExecutionToolRuntimeScope</code> | Public scope property. |
| `terminalState` | property | <code>terminalState: "unknown" &#124; "completed" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "quarantined"</code> | Public terminal State property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |
| `toolOperation` | property | <code>toolOperation: "artifact" &#124; "command" &#124; "file_read" &#124; "file_write" &#124; "sandbox"</code> | Public tool Operation property. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public tool Revision property. |

## `ExecutionToolRuntimeScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |
