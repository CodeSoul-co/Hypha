# `@codesoul-co/hypha-harness` / `index`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Package guide: [learning and composition guide](/packages/harness)
- Source: [`packages/harness/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryTraceRecorder` | class | <code>new InMemoryTraceRecorder(): InMemoryTraceRecorder</code> | Runtime implementation for In Memory Trace Recorder; see its public constructor and members below. |
| `SessionProjector` | class | <code>new SessionProjector(): SessionProjector</code> | Runtime implementation for Session Projector; see its public constructor and members below. |
| `UserScopedSessionQueue` | class | <code>new UserScopedSessionQueue&lt;T = unknown&gt;(): UserScopedSessionQueue&lt;T&gt;</code> | Runtime implementation for User Scoped Session Queue; see its public constructor and members below. |
| `createRunStartedEvent` | function | <code>createRunStartedEvent(run: RunRecord): FrameworkEvent</code> | Creates Run Started Event at this module boundary. |
| `QueueTask` | interface | <code>interface QueueTask</code> | Field contract for Queue Task; see all contract members below. |
| `RegressionCase` | interface | <code>interface RegressionCase</code> | Field contract for Regression Case; see all contract members below. |
| `ReplayFixture` | interface | <code>interface ReplayFixture</code> | Field contract for Replay Fixture; see all contract members below. |
| `RunRecord` | interface | <code>interface RunRecord</code> | Field contract for Run Record; see all contract members below. |
| `SessionView` | interface | <code>interface SessionView</code> | Field contract for Session View; see all contract members below. |

## `InMemoryTraceRecorder` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryTraceRecorder</code> | Creates an instance of this class. |
| `list` | method | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | Lists list at this module boundary. |
| `record` | method | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | Records record at this module boundary. |

## `SessionProjector` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): SessionProjector</code> | Creates an instance of this class. |
| `project` | method | <code>project(events: FrameworkEvent[]): SessionView[]</code> | Projects project at this module boundary. |

## `UserScopedSessionQueue` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>&lt;T = unknown&gt;(): UserScopedSessionQueue&lt;T&gt;</code> | Creates an instance of this class. |
| `dequeue` | method | <code>dequeue(userId: string, sessionId: string): QueueTask&lt;T&gt; &#124; null</code> | Public runtime operation for dequeue. |
| `enqueue` | method | <code>enqueue(task: QueueTask&lt;T&gt;): number</code> | Public runtime operation for enqueue. |
| `size` | method | <code>size(userId: string, sessionId: string): number</code> | Public runtime operation for size. |

## `QueueTask` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `payload` | property | <code>payload: T</code> | Public payload property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `RegressionCase` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actualEvents` | property | <code>actualEvents: FrameworkEvent&lt;unknown&gt;[]</code> | Public actual Events property. |
| `fixture` | property | <code>fixture: ReplayFixture</code> | Public fixture property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `outputContract` | property | <code>outputContract: OutputContractSpec</code> | Public output Contract property. |
| `requiredChecks` | property | <code>requiredChecks: ("output_contract" &#124; "state_path" &#124; "event_types" &#124; "tool_calls" &#124; "policy_decisions")[]</code> | Public required Checks property. |

## `ReplayFixture` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `events` | property | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | Public events property. |
| `eventTypes` | property | <code>eventTypes: string[]</code> | Public event Types property. |
| `finalOutput` | property | <code>finalOutput: unknown</code> | Public final Output property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `memoryReadSet` | property | <code>memoryReadSet: string[]</code> | Public memory Read Set property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelCalls` | property | <code>modelCalls: string[]</code> | Public model Calls property. |
| `outputContract` | property | <code>outputContract: OutputContractSpec</code> | Public output Contract property. |
| `policyDecisions` | property | <code>policyDecisions: string[]</code> | Public policy Decisions property. |
| `replaySpecRef` | property | <code>replaySpecRef: SpecRef</code> | Public replay Spec Ref property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `statePath` | property | <code>statePath: string[]</code> | Public state Path property. |
| `toolCalls` | property | <code>toolCalls: string[]</code> | Public tool Calls property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `RunRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentSystemId` | property | <code>agentSystemId: string</code> | Public agent System Id property. |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `fsmSnapshot` | property | <code>fsmSnapshot: FSMSnapshot</code> | Public fsm Snapshot property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `input` | property | <code>input: TInput</code> | Public input property. |
| `output` | property | <code>output: TOutput</code> | Public output property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `status` | property | <code>status: "completed" &#124; "queued" &#124; "running" &#124; "cancelled" &#124; "failed" &#124; "waiting_human"</code> | Public status property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `SessionView` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `runIds` | property | <code>runIds: string[]</code> | Public run Ids property. |
| `status` | property | <code>status: "active" &#124; "closed"</code> | Public status property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
