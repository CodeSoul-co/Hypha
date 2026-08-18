# `@codesoul-co/hypha-testing` / `mock-execution-provider`

- Package index: [`@codesoul-co/hypha-testing`](/api/testing)
- Package guide: [learning and composition guide](/packages/testing)
- Source: [`packages/testing/src/mock-execution-provider.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/mock-execution-provider.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MockExecutionProvider` | class | <code>new MockExecutionProvider(options?: MockExecutionProviderOptions): MockExecutionProvider</code> | Deterministic, in-memory SandboxProvider for contract tests, replay fixtures, and failure injection. It never starts a process or mutates a real Workspace. |
| `MockExecutionProviderError` | class | <code>new MockExecutionProviderError(normalizedError: NormalizedExecutionError): MockExecutionProviderError</code> | Runtime implementation for Mock Execution Provider Error; see its public constructor and members below. |
| `MockExecutionBehavior` | interface | <code>interface MockExecutionBehavior</code> | Field contract for Mock Execution Behavior; see all contract members below. |
| `MockExecutionProviderOptions` | interface | <code>interface MockExecutionProviderOptions</code> | Field contract for Mock Execution Provider Options; see all contract members below. |

## `MockExecutionProvider` public members

Deterministic, in-memory SandboxProvider for contract tests, replay fixtures, and failure injection. It never starts a process or mutates a real Workspace.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(input: ExecutionCancelRequest): Promise&lt;void&gt;</code> | Cancels cancel at this module boundary. |
| `capabilities` | method | <code>capabilities(): Promise&lt;SandboxProviderCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `cleanup` | method | <code>cleanup(input: SandboxCleanupRequest): Promise&lt;void&gt;</code> | Public runtime operation for cleanup. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options?: MockExecutionProviderOptions): MockExecutionProvider</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: SandboxCreateRequest): Promise&lt;SandboxRecord&gt;</code> | Creates create at this module boundary. |
| `enqueue` | method | <code>enqueue(behavior: MockExecutionBehavior): void</code> | Public runtime operation for enqueue. |
| `execute` | method | <code>execute(input: CommandExecutionRequest): Promise&lt;CommandExecutionResult&gt;</code> | Public runtime operation for execute. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `setHealth` | method | <code>setHealth(health: ProviderHealth): void</code> | Sets Health at this module boundary. |
| `start` | method | <code>start(input: SandboxStartRequest): Promise&lt;SandboxRecord&gt;</code> | Starts start at this module boundary. |
| `status` | method | <code>status(input: SandboxStatusRequest): Promise&lt;SandboxRecord &#124; null&gt;</code> | Public runtime operation for status. |
| `terminate` | method | <code>terminate(input: SandboxTerminateRequest): Promise&lt;void&gt;</code> | Public runtime operation for terminate. |

## `MockExecutionProviderError` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `constructor` | constructor | <code>(normalizedError: NormalizedExecutionError): MockExecutionProviderError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public message property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `normalizedError` | property | <code>normalizedError: NormalizedExecutionError</code> | Public normalized Error property. |
| `stack` | property | <code>stack: string</code> | Public stack property. |
| `static captureStackTrace` | method | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public runtime operation for prepare Stack Trace. |
| `static stackTraceLimit` | property | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `MockExecutionBehavior` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `changedFiles` | property | <code>changedFiles: FileMutation[]</code> | Public changed Files property. |
| `delayMs` | property | <code>delayMs: number</code> | Public delay Ms property. |
| `error` | property | <code>error: NormalizedExecutionError</code> | Public error property. |
| `exitCode` | property | <code>exitCode: number</code> | Public exit Code property. |
| `generatedArtifactRefs` | property | <code>generatedArtifactRefs: string[]</code> | Public generated Artifact Refs property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `resourceUsage` | property | <code>resourceUsage: ExecutionResourceUsage</code> | Public resource Usage property. |
| `signal` | property | <code>signal: string</code> | Public signal property. |
| `snapshotAfterRef` | property | <code>snapshotAfterRef: string</code> | Public snapshot After Ref property. |
| `snapshotBeforeRef` | property | <code>snapshotBeforeRef: string</code> | Public snapshot Before Ref property. |
| `status` | property | <code>status: "completed" &#124; "failed" &#124; "timed_out" &#124; "oom_killed" &#124; "resource_exceeded" &#124; "quarantined"</code> | Public status property. |
| `stderr` | property | <code>stderr: string</code> | Public stderr property. |
| `stderrArtifactRef` | property | <code>stderrArtifactRef: string</code> | Public stderr Artifact Ref property. |
| `stderrTruncated` | property | <code>stderrTruncated: boolean</code> | Public stderr Truncated property. |
| `stdout` | property | <code>stdout: string</code> | Public stdout property. |
| `stdoutArtifactRef` | property | <code>stdoutArtifactRef: string</code> | Public stdout Artifact Ref property. |
| `stdoutTruncated` | property | <code>stdoutTruncated: boolean</code> | Public stdout Truncated property. |

## `MockExecutionProviderOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `behaviors` | property | <code>behaviors: MockExecutionBehavior[]</code> | Public behaviors property. |
| `capabilities` | property | <code>capabilities: Partial&lt;SandboxProviderCapabilities&gt;</code> | Public capabilities property. |
| `defaultBehavior` | property | <code>defaultBehavior: MockExecutionBehavior</code> | Public default Behavior property. |
| `executionId` | method | <code>executionId(request: CommandExecutionRequest): string</code> | Public runtime operation for execution Id. |
| `health` | property | <code>health: ProviderHealth</code> | Public health property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `sandboxId` | method | <code>sandboxId(request: SandboxCreateRequest): string</code> | Public runtime operation for sandbox Id. |
