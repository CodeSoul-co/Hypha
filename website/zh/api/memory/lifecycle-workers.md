# `@codesoul-co/hypha-memory` / `lifecycle-workers`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/lifecycle-workers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)
- 导出数: **15**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMemoryLifecycleTaskStore` | 类 | <code>new InMemoryMemoryLifecycleTaskStore(): InMemoryMemoryLifecycleTaskStore</code> | In Memory Memory Lifecycle Task Store 的运行时实现；公开构造函数与成员见下表。 |
| `LeasedMemoryLifecycleWorker` | 类 | <code>new LeasedMemoryLifecycleWorker(options: MemoryLifecycleWorkerOptions): LeasedMemoryLifecycleWorker</code> | Leased Memory Lifecycle Worker 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryConsolidationWorker` | 类 | <code>new MemoryConsolidationWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryConsolidationWorker</code> | Memory Consolidation Worker 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryDecayWorker` | 类 | <code>new MemoryDecayWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryDecayWorker</code> | Memory Decay Worker 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryDeletionWorker` | 类 | <code>new MemoryDeletionWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryDeletionWorker</code> | Memory Deletion Worker 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryReindexWorker` | 类 | <code>new MemoryReindexWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryReindexWorker</code> | Memory Reindex Worker 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryRetentionWorker` | 类 | <code>new MemoryRetentionWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryRetentionWorker</code> | Memory Retention Worker 的运行时实现；公开构造函数与成员见下表。 |
| `ProviderReconciliationWorker` | 类 | <code>new ProviderReconciliationWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): ProviderReconciliationWorker</code> | Provider Reconciliation Worker 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryLifecycleTask` | 接口 | <code>interface MemoryLifecycleTask</code> | Memory Lifecycle Task 的字段契约；完整字段见下表。 |
| `MemoryLifecycleTaskStore` | 接口 | <code>interface MemoryLifecycleTaskStore</code> | Memory Lifecycle Task Store 的字段契约；完整字段见下表。 |
| `MemoryLifecycleWorkerEvent` | 接口 | <code>interface MemoryLifecycleWorkerEvent</code> | Memory Lifecycle Worker Event 的字段契约；完整字段见下表。 |
| `MemoryLifecycleWorkerOptions` | 接口 | <code>interface MemoryLifecycleWorkerOptions</code> | Memory Lifecycle Worker Options 的字段契约；完整字段见下表。 |
| `MemoryLifecycleWorkerRunResult` | 接口 | <code>interface MemoryLifecycleWorkerRunResult</code> | Memory Lifecycle Worker Run Result 的字段契约；完整字段见下表。 |
| `MemoryLifecycleTaskHandler` | 类型 | <code>type MemoryLifecycleTaskHandler = (task: MemoryLifecycleTask, signal: AbortSignal) =&gt; Promise&lt;void&gt;</code> | Memory Lifecycle Task Handler 的公共类型别名。 |
| `MemoryLifecycleWorkerType` | 类型 | <code>type MemoryLifecycleWorkerType = 'retention' &#124; 'decay' &#124; 'consolidation' &#124; 'deletion' &#124; 'reindex' &#124; 'provider_reconciliation'</code> | Memory Lifecycle Worker Type 的公共类型别名。 |

## `InMemoryMemoryLifecycleTaskStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | complete 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(): InMemoryMemoryLifecycleTaskStore</code> | 创建该类的实例。 |
| `enqueue` | 方法 | <code>enqueue(task: MemoryLifecycleTask): Promise&lt;void&gt;</code> | enqueue 的公开运行时操作。 |
| `fail` | 方法 | <code>fail(taskId: string, ownerId: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter: boolean): Promise&lt;boolean&gt;</code> | fail 的公开运行时操作。 |
| `lease` | 方法 | <code>lease(type: MemoryLifecycleWorkerType, ownerId: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryLifecycleTask[]&gt;</code> | lease 的公开运行时操作。 |
| `list` | 方法 | <code>list(type?: MemoryLifecycleWorkerType): Promise&lt;MemoryLifecycleTask[]&gt;</code> | 列出 list。 |
| `renew` | 方法 | <code>renew(taskId: string, ownerId: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | renew 的公开运行时操作。 |

## `LeasedMemoryLifecycleWorker` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: MemoryLifecycleWorkerOptions): LeasedMemoryLifecycleWorker</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | drain 的公开运行时操作。 |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | run Once 的公开运行时操作。 |
| `start` | 方法 | <code>start(): void</code> | 启动 start。 |
| `stop` | 方法 | <code>stop(): void</code> | stop 的公开运行时操作。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | stop And Drain 的公开运行时操作。 |

## `MemoryConsolidationWorker` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryConsolidationWorker</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | drain 的公开运行时操作。 |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | run Once 的公开运行时操作。 |
| `start` | 方法 | <code>start(): void</code> | 启动 start。 |
| `stop` | 方法 | <code>stop(): void</code> | stop 的公开运行时操作。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | stop And Drain 的公开运行时操作。 |

## `MemoryDecayWorker` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryDecayWorker</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | drain 的公开运行时操作。 |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | run Once 的公开运行时操作。 |
| `start` | 方法 | <code>start(): void</code> | 启动 start。 |
| `stop` | 方法 | <code>stop(): void</code> | stop 的公开运行时操作。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | stop And Drain 的公开运行时操作。 |

## `MemoryDeletionWorker` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryDeletionWorker</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | drain 的公开运行时操作。 |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | run Once 的公开运行时操作。 |
| `start` | 方法 | <code>start(): void</code> | 启动 start。 |
| `stop` | 方法 | <code>stop(): void</code> | stop 的公开运行时操作。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | stop And Drain 的公开运行时操作。 |

## `MemoryReindexWorker` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryReindexWorker</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | drain 的公开运行时操作。 |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | run Once 的公开运行时操作。 |
| `start` | 方法 | <code>start(): void</code> | 启动 start。 |
| `stop` | 方法 | <code>stop(): void</code> | stop 的公开运行时操作。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | stop And Drain 的公开运行时操作。 |

## `MemoryRetentionWorker` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryRetentionWorker</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | drain 的公开运行时操作。 |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | run Once 的公开运行时操作。 |
| `start` | 方法 | <code>start(): void</code> | 启动 start。 |
| `stop` | 方法 | <code>stop(): void</code> | stop 的公开运行时操作。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | stop And Drain 的公开运行时操作。 |

## `ProviderReconciliationWorker` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): ProviderReconciliationWorker</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | drain 的公开运行时操作。 |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | run Once 的公开运行时操作。 |
| `start` | 方法 | <code>start(): void</code> | 启动 start。 |
| `stop` | 方法 | <code>stop(): void</code> | stop 的公开运行时操作。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | stop And Drain 的公开运行时操作。 |

## `MemoryLifecycleTask` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | attempts 字段。 |
| `availableAt` | 属性 | <code>availableAt: string</code> | available At 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `lastError` | 属性 | <code>lastError: NormalizedMemoryError</code> | last Error 字段。 |
| `leaseExpiresAt` | 属性 | <code>leaseExpiresAt: string</code> | lease Expires At 字段。 |
| `leaseOwner` | 属性 | <code>leaseOwner: string</code> | lease Owner 字段。 |
| `leaseToken` | 属性 | <code>leaseToken: string</code> | lease Token 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `payload` | 属性 | <code>payload: TPayload</code> | payload 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `state` | 属性 | <code>state: "completed" &#124; "failed" &#124; "processing" &#124; "pending" &#124; "dead_letter"</code> | state 字段。 |
| `type` | 属性 | <code>type: MemoryLifecycleWorkerType</code> | type 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `MemoryLifecycleTaskStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | complete 的公开运行时操作。 |
| `enqueue` | 方法 | <code>enqueue(task: MemoryLifecycleTask): Promise&lt;void&gt;</code> | enqueue 的公开运行时操作。 |
| `fail` | 方法 | <code>fail(taskId: string, ownerId: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter: boolean): Promise&lt;boolean&gt;</code> | fail 的公开运行时操作。 |
| `lease` | 方法 | <code>lease(type: MemoryLifecycleWorkerType, ownerId: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryLifecycleTask[]&gt;</code> | lease 的公开运行时操作。 |
| `list` | 方法 | <code>list(type?: MemoryLifecycleWorkerType): Promise&lt;MemoryLifecycleTask[]&gt;</code> | 列出 list。 |
| `renew` | 方法 | <code>renew(taskId: string, ownerId: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | renew 的公开运行时操作。 |

## `MemoryLifecycleWorkerEvent` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error: NormalizedMemoryError</code> | error 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `taskId` | 属性 | <code>taskId: string</code> | task Id 字段。 |
| `type` | 属性 | <code>type: "memory.worker.started" &#124; "memory.worker.stopped" &#124; "memory.worker.failed" &#124; "memory.worker.dead_lettered"</code> | type 字段。 |
| `workerType` | 属性 | <code>workerType: MemoryLifecycleWorkerType</code> | worker Type 字段。 |

## `MemoryLifecycleWorkerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `batchSize` | 属性 | <code>batchSize: number</code> | batch Size 字段。 |
| `handler` | 方法 | <code>handler(task: MemoryLifecycleTask, signal: AbortSignal): Promise&lt;void&gt;</code> | handler 的公开运行时操作。 |
| `leaseMs` | 属性 | <code>leaseMs: number</code> | lease Ms 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
| `onEvent` | 方法 | <code>onEvent(event: MemoryLifecycleWorkerEvent): void &#124; Promise&lt;void&gt;</code> | 处理 Event。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `pollIntervalMs` | 属性 | <code>pollIntervalMs: number</code> | poll Interval Ms 字段。 |
| `renewalMs` | 属性 | <code>renewalMs: number</code> | renewal Ms 字段。 |
| `retryDelayMs` | 属性 | <code>retryDelayMs: number</code> | retry Delay Ms 字段。 |
| `store` | 属性 | <code>store: MemoryLifecycleTaskStore</code> | store 字段。 |
| `type` | 属性 | <code>type: MemoryLifecycleWorkerType</code> | type 字段。 |

## `MemoryLifecycleWorkerRunResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `completed` | 属性 | <code>completed: number</code> | completed 字段。 |
| `deadLettered` | 属性 | <code>deadLettered: number</code> | dead Lettered 字段。 |
| `failed` | 属性 | <code>failed: number</code> | failed 字段。 |
| `leased` | 属性 | <code>leased: number</code> | leased 字段。 |
