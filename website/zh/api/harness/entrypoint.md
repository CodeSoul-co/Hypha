# `@codesoul-co/hypha-harness` / `index`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 模块指南: [学习与组合说明](/zh/packages/harness)
- 源码: [`packages/harness/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryTraceRecorder` | 类 | <code>new InMemoryTraceRecorder(): InMemoryTraceRecorder</code> | In Memory Trace Recorder 的运行时实现；公开构造函数与成员见下表。 |
| `SessionProjector` | 类 | <code>new SessionProjector(): SessionProjector</code> | Session Projector 的运行时实现；公开构造函数与成员见下表。 |
| `UserScopedSessionQueue` | 类 | <code>new UserScopedSessionQueue&lt;T = unknown&gt;(): UserScopedSessionQueue&lt;T&gt;</code> | User Scoped Session Queue 的运行时实现；公开构造函数与成员见下表。 |
| `createRunStartedEvent` | 函数 | <code>createRunStartedEvent(run: RunRecord): FrameworkEvent</code> | 创建 Run Started Event。 |
| `QueueTask` | 接口 | <code>interface QueueTask</code> | Queue Task 的字段契约；完整字段见下表。 |
| `RegressionCase` | 接口 | <code>interface RegressionCase</code> | Regression Case 的字段契约；完整字段见下表。 |
| `ReplayFixture` | 接口 | <code>interface ReplayFixture</code> | Replay Fixture 的字段契约；完整字段见下表。 |
| `RunRecord` | 接口 | <code>interface RunRecord</code> | Run Record 的字段契约；完整字段见下表。 |
| `SessionView` | 接口 | <code>interface SessionView</code> | Session View 的字段契约；完整字段见下表。 |

## `InMemoryTraceRecorder` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryTraceRecorder</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | 列出 list。 |
| `record` | 方法 | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | 记录 record。 |

## `SessionProjector` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): SessionProjector</code> | 创建该类的实例。 |
| `project` | 方法 | <code>project(events: FrameworkEvent[]): SessionView[]</code> | 投影 project。 |

## `UserScopedSessionQueue` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>&lt;T = unknown&gt;(): UserScopedSessionQueue&lt;T&gt;</code> | 创建该类的实例。 |
| `dequeue` | 方法 | <code>dequeue(userId: string, sessionId: string): QueueTask&lt;T&gt; &#124; null</code> | dequeue 的公开运行时操作。 |
| `enqueue` | 方法 | <code>enqueue(task: QueueTask&lt;T&gt;): number</code> | enqueue 的公开运行时操作。 |
| `size` | 方法 | <code>size(userId: string, sessionId: string): number</code> | size 的公开运行时操作。 |

## `QueueTask` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `payload` | 属性 | <code>payload: T</code> | payload 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `RegressionCase` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actualEvents` | 属性 | <code>actualEvents: FrameworkEvent&lt;unknown&gt;[]</code> | actual Events 字段。 |
| `fixture` | 属性 | <code>fixture: ReplayFixture</code> | fixture 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `outputContract` | 属性 | <code>outputContract: OutputContractSpec</code> | output Contract 字段。 |
| `requiredChecks` | 属性 | <code>requiredChecks: ("output_contract" &#124; "state_path" &#124; "event_types" &#124; "tool_calls" &#124; "policy_decisions")[]</code> | required Checks 字段。 |

## `ReplayFixture` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `events` | 属性 | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | events 字段。 |
| `eventTypes` | 属性 | <code>eventTypes: string[]</code> | event Types 字段。 |
| `finalOutput` | 属性 | <code>finalOutput: unknown</code> | final Output 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `memoryReadSet` | 属性 | <code>memoryReadSet: string[]</code> | memory Read Set 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelCalls` | 属性 | <code>modelCalls: string[]</code> | model Calls 字段。 |
| `outputContract` | 属性 | <code>outputContract: OutputContractSpec</code> | output Contract 字段。 |
| `policyDecisions` | 属性 | <code>policyDecisions: string[]</code> | policy Decisions 字段。 |
| `replaySpecRef` | 属性 | <code>replaySpecRef: SpecRef</code> | replay Spec Ref 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | state Path 字段。 |
| `toolCalls` | 属性 | <code>toolCalls: string[]</code> | tool Calls 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `RunRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentSystemId` | 属性 | <code>agentSystemId: string</code> | agent System Id 字段。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `fsmSnapshot` | 属性 | <code>fsmSnapshot: FSMSnapshot</code> | fsm Snapshot 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `input` | 属性 | <code>input: TInput</code> | input 字段。 |
| `output` | 属性 | <code>output: TOutput</code> | output 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `status` | 属性 | <code>status: "completed" &#124; "queued" &#124; "running" &#124; "cancelled" &#124; "failed" &#124; "waiting_human"</code> | status 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `SessionView` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `runIds` | 属性 | <code>runIds: string[]</code> | run Ids 字段。 |
| `status` | 属性 | <code>status: "active" &#124; "closed"</code> | status 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
