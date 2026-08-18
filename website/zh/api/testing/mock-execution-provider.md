# `@codesoul-co/hypha-testing` / `mock-execution-provider`

- 包索引: [`@codesoul-co/hypha-testing`](/zh/api/testing)
- 模块指南: [学习与组合说明](/zh/packages/testing)
- 源码: [`packages/testing/src/mock-execution-provider.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/mock-execution-provider.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MockExecutionProvider` | 类 | <code>new MockExecutionProvider(options?: MockExecutionProviderOptions): MockExecutionProvider</code> | Deterministic, in-memory SandboxProvider for contract tests, replay fixtures, and failure injection. It never starts a process or mutates a real Workspace. |
| `MockExecutionProviderError` | 类 | <code>new MockExecutionProviderError(normalizedError: NormalizedExecutionError): MockExecutionProviderError</code> | Mock Execution Provider Error 的运行时实现；公开构造函数与成员见下表。 |
| `MockExecutionBehavior` | 接口 | <code>interface MockExecutionBehavior</code> | Mock Execution Behavior 的字段契约；完整字段见下表。 |
| `MockExecutionProviderOptions` | 接口 | <code>interface MockExecutionProviderOptions</code> | Mock Execution Provider Options 的字段契约；完整字段见下表。 |

## `MockExecutionProvider` 公开成员

Deterministic, in-memory SandboxProvider for contract tests, replay fixtures, and failure injection. It never starts a process or mutates a real Workspace.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(input: ExecutionCancelRequest): Promise&lt;void&gt;</code> | 取消 cancel。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;SandboxProviderCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `cleanup` | 方法 | <code>cleanup(input: SandboxCleanupRequest): Promise&lt;void&gt;</code> | cleanup 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options?: MockExecutionProviderOptions): MockExecutionProvider</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: SandboxCreateRequest): Promise&lt;SandboxRecord&gt;</code> | 创建 create。 |
| `enqueue` | 方法 | <code>enqueue(behavior: MockExecutionBehavior): void</code> | enqueue 的公开运行时操作。 |
| `execute` | 方法 | <code>execute(input: CommandExecutionRequest): Promise&lt;CommandExecutionResult&gt;</code> | execute 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `setHealth` | 方法 | <code>setHealth(health: ProviderHealth): void</code> | 写入 Health。 |
| `start` | 方法 | <code>start(input: SandboxStartRequest): Promise&lt;SandboxRecord&gt;</code> | 启动 start。 |
| `status` | 方法 | <code>status(input: SandboxStatusRequest): Promise&lt;SandboxRecord &#124; null&gt;</code> | status 的公开运行时操作。 |
| `terminate` | 方法 | <code>terminate(input: SandboxTerminateRequest): Promise&lt;void&gt;</code> | terminate 的公开运行时操作。 |

## `MockExecutionProviderError` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause: unknown</code> | cause 字段。 |
| `constructor` | 构造函数 | <code>(normalizedError: NormalizedExecutionError): MockExecutionProviderError</code> | 创建该类的实例。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `normalizedError` | 属性 | <code>normalizedError: NormalizedExecutionError</code> | normalized Error 字段。 |
| `stack` | 属性 | <code>stack: string</code> | stack 字段。 |
| `static captureStackTrace` | 方法 | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | prepare Stack Trace 的公开运行时操作。 |
| `static stackTraceLimit` | 属性 | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `MockExecutionBehavior` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `changedFiles` | 属性 | <code>changedFiles: FileMutation[]</code> | changed Files 字段。 |
| `delayMs` | 属性 | <code>delayMs: number</code> | delay Ms 字段。 |
| `error` | 属性 | <code>error: NormalizedExecutionError</code> | error 字段。 |
| `exitCode` | 属性 | <code>exitCode: number</code> | exit Code 字段。 |
| `generatedArtifactRefs` | 属性 | <code>generatedArtifactRefs: string[]</code> | generated Artifact Refs 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `resourceUsage` | 属性 | <code>resourceUsage: ExecutionResourceUsage</code> | resource Usage 字段。 |
| `signal` | 属性 | <code>signal: string</code> | signal 字段。 |
| `snapshotAfterRef` | 属性 | <code>snapshotAfterRef: string</code> | snapshot After Ref 字段。 |
| `snapshotBeforeRef` | 属性 | <code>snapshotBeforeRef: string</code> | snapshot Before Ref 字段。 |
| `status` | 属性 | <code>status: "completed" &#124; "failed" &#124; "timed_out" &#124; "oom_killed" &#124; "resource_exceeded" &#124; "quarantined"</code> | status 字段。 |
| `stderr` | 属性 | <code>stderr: string</code> | stderr 字段。 |
| `stderrArtifactRef` | 属性 | <code>stderrArtifactRef: string</code> | stderr Artifact Ref 字段。 |
| `stderrTruncated` | 属性 | <code>stderrTruncated: boolean</code> | stderr Truncated 字段。 |
| `stdout` | 属性 | <code>stdout: string</code> | stdout 字段。 |
| `stdoutArtifactRef` | 属性 | <code>stdoutArtifactRef: string</code> | stdout Artifact Ref 字段。 |
| `stdoutTruncated` | 属性 | <code>stdoutTruncated: boolean</code> | stdout Truncated 字段。 |

## `MockExecutionProviderOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `behaviors` | 属性 | <code>behaviors: MockExecutionBehavior[]</code> | behaviors 字段。 |
| `capabilities` | 属性 | <code>capabilities: Partial&lt;SandboxProviderCapabilities&gt;</code> | capabilities 字段。 |
| `defaultBehavior` | 属性 | <code>defaultBehavior: MockExecutionBehavior</code> | default Behavior 字段。 |
| `executionId` | 方法 | <code>executionId(request: CommandExecutionRequest): string</code> | execution Id 的公开运行时操作。 |
| `health` | 属性 | <code>health: ProviderHealth</code> | health 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `sandboxId` | 方法 | <code>sandboxId(request: SandboxCreateRequest): string</code> | sandbox Id 的公开运行时操作。 |
