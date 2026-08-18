# `@codesoul-co/hypha-core` / `modules/execution-output/completion`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/execution-output/completion.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)
- 导出数: **10**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DurableExecutionCompletionCoordinator` | 类 | <code>new DurableExecutionCompletionCoordinator(options: DurableExecutionCompletionCoordinatorOptions): DurableExecutionCompletionCoordinator</code> | Orders the Execution-owned durable completion barriers. Provider execution is deliberately absent: retries begin from the persisted terminal receipt, repeat idempotent Artifact collection/finalization, and only then attempt the fenced terminal record CAS. |
| `DurableExecutionTerminalEventCoordinator` | 类 | <code>new DurableExecutionTerminalEventCoordinator(options: DurableExecutionTerminalEventCoordinatorOptions): DurableExecutionTerminalEventCoordinator</code> | Appends the Execution terminal event only after a durable terminal record exists. Provider execution and Artifact collection are deliberately absent, so recovery can retry a failed append without repeating either side effect. |
| `createDurableExecutionTerminalEvent` | 函数 | <code>createDurableExecutionTerminalEvent(recordValue: ExecutionRecord): ExecutionFrameworkEvent</code> | 创建 Durable Execution Terminal Event。 |
| `DurableExecutionCompletionCoordinatorOptions` | 接口 | <code>interface DurableExecutionCompletionCoordinatorOptions</code> | Durable Execution Completion Coordinator Options 的字段契约；完整字段见下表。 |
| `DurableExecutionCompletionRequest` | 接口 | <code>interface DurableExecutionCompletionRequest</code> | Durable Execution Completion Request 的字段契约；完整字段见下表。 |
| `DurableExecutionCompletionResult` | 接口 | <code>interface DurableExecutionCompletionResult</code> | Durable Execution Completion Result 的字段契约；完整字段见下表。 |
| `DurableExecutionCompletionWorker` | 接口 | <code>interface DurableExecutionCompletionWorker</code> | Durable Execution Completion Worker 的字段契约；完整字段见下表。 |
| `DurableExecutionTerminalEventCommitPort` | 接口 | <code>interface DurableExecutionTerminalEventCommitPort</code> | Runtime implements this port with its durable Event Store. Repeated calls with the same idempotency key and event must resolve to the same append. |
| `DurableExecutionTerminalEventCommitRequest` | 接口 | <code>interface DurableExecutionTerminalEventCommitRequest</code> | Durable Execution Terminal Event Commit Request 的字段契约；完整字段见下表。 |
| `DurableExecutionTerminalEventCoordinatorOptions` | 接口 | <code>interface DurableExecutionTerminalEventCoordinatorOptions</code> | Durable Execution Terminal Event Coordinator Options 的字段契约；完整字段见下表。 |

## `DurableExecutionCompletionCoordinator` 公开成员

Orders the Execution-owned durable completion barriers. Provider execution is deliberately absent: retries begin from the persisted terminal receipt, repeat idempotent Artifact collection/finalization, and only then attempt the fenced terminal record CAS.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(request: DurableExecutionCompletionRequest): Promise&lt;DurableExecutionCompletionResult&gt;</code> | complete 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: DurableExecutionCompletionCoordinatorOptions): DurableExecutionCompletionCoordinator</code> | 创建该类的实例。 |

## `DurableExecutionTerminalEventCoordinator` 公开成员

Appends the Execution terminal event only after a durable terminal record exists. Provider execution and Artifact collection are deliberately absent, so recovery can retry a failed append without repeating either side effect.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(recordValue: ExecutionRecord): Promise&lt;ExecutionFrameworkEvent&gt;</code> | 追加 append。 |
| `constructor` | 构造函数 | <code>(options: DurableExecutionTerminalEventCoordinatorOptions): DurableExecutionTerminalEventCoordinator</code> | 创建该类的实例。 |

## `DurableExecutionCompletionCoordinatorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collector` | 属性 | <code>collector: ExecutionOutputCollector</code> | collector 字段。 |
| `planner` | 属性 | <code>planner: ExecutionOutputPlanner</code> | planner 字段。 |
| `worker` | 属性 | <code>worker: DurableExecutionCompletionWorker</code> | worker 字段。 |

## `DurableExecutionCompletionRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `outputContext` | 属性 | <code>outputContext: ExecutionOutputCollectionContext</code> | output Context 字段。 |
| `outputPolicy` | 属性 | <code>outputPolicy: ExecutionOutputCollectionPolicy</code> | output Policy 字段。 |
| `record` | 属性 | <code>record: ExecutionRecord</code> | record 字段。 |
| `result` | 属性 | <code>result: CommandExecutionResult</code> | result 字段。 |

## `DurableExecutionCompletionResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `output` | 属性 | <code>output: ExecutionOutputCollectionResult</code> | output 字段。 |
| `record` | 属性 | <code>record: ExecutionRecord</code> | record 字段。 |

## `DurableExecutionCompletionWorker` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointTerminalReceipt` | 方法 | <code>checkpointTerminalReceipt(record: ExecutionRecord, receipt: ExecutionReceipt): Promise&lt;ExecutionRecord&gt;</code> | checkpoint Terminal Receipt 的公开运行时操作。 |
| `commit` | 方法 | <code>commit(record: ExecutionRecord, result: CommandExecutionResult): Promise&lt;ExecutionRecord&gt;</code> | commit 的公开运行时操作。 |
| `renew` | 方法 | <code>renew(record: ExecutionRecord): Promise&lt;ExecutionRecord&gt;</code> | renew 的公开运行时操作。 |

## `DurableExecutionTerminalEventCommitPort` 契约字段

Runtime implements this port with its durable Event Store. Repeated calls with the same idempotency key and event must resolve to the same append.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: DurableExecutionTerminalEventCommitRequest): Promise&lt;unknown&gt;</code> | 追加 append。 |

## `DurableExecutionTerminalEventCommitRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `event` | 属性 | <code>event: ExecutionFrameworkEvent</code> | event 字段。 |
| `executionRevision` | 属性 | <code>executionRevision: number</code> | execution Revision 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |

## `DurableExecutionTerminalEventCoordinatorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: DurableExecutionTerminalEventCommitPort</code> | events 字段。 |
