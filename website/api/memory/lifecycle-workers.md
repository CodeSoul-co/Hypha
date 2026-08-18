# `@codesoul-co/hypha-memory` / `lifecycle-workers`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/lifecycle-workers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)
- Exports: **15**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMemoryLifecycleTaskStore` | class | <code>new InMemoryMemoryLifecycleTaskStore(): InMemoryMemoryLifecycleTaskStore</code> | Runtime implementation for In Memory Memory Lifecycle Task Store; see its public constructor and members below. |
| `LeasedMemoryLifecycleWorker` | class | <code>new LeasedMemoryLifecycleWorker(options: MemoryLifecycleWorkerOptions): LeasedMemoryLifecycleWorker</code> | Runtime implementation for Leased Memory Lifecycle Worker; see its public constructor and members below. |
| `MemoryConsolidationWorker` | class | <code>new MemoryConsolidationWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryConsolidationWorker</code> | Runtime implementation for Memory Consolidation Worker; see its public constructor and members below. |
| `MemoryDecayWorker` | class | <code>new MemoryDecayWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryDecayWorker</code> | Runtime implementation for Memory Decay Worker; see its public constructor and members below. |
| `MemoryDeletionWorker` | class | <code>new MemoryDeletionWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryDeletionWorker</code> | Runtime implementation for Memory Deletion Worker; see its public constructor and members below. |
| `MemoryReindexWorker` | class | <code>new MemoryReindexWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryReindexWorker</code> | Runtime implementation for Memory Reindex Worker; see its public constructor and members below. |
| `MemoryRetentionWorker` | class | <code>new MemoryRetentionWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryRetentionWorker</code> | Runtime implementation for Memory Retention Worker; see its public constructor and members below. |
| `ProviderReconciliationWorker` | class | <code>new ProviderReconciliationWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): ProviderReconciliationWorker</code> | Runtime implementation for Provider Reconciliation Worker; see its public constructor and members below. |
| `MemoryLifecycleTask` | interface | <code>interface MemoryLifecycleTask</code> | Field contract for Memory Lifecycle Task; see all contract members below. |
| `MemoryLifecycleTaskStore` | interface | <code>interface MemoryLifecycleTaskStore</code> | Field contract for Memory Lifecycle Task Store; see all contract members below. |
| `MemoryLifecycleWorkerEvent` | interface | <code>interface MemoryLifecycleWorkerEvent</code> | Field contract for Memory Lifecycle Worker Event; see all contract members below. |
| `MemoryLifecycleWorkerOptions` | interface | <code>interface MemoryLifecycleWorkerOptions</code> | Field contract for Memory Lifecycle Worker Options; see all contract members below. |
| `MemoryLifecycleWorkerRunResult` | interface | <code>interface MemoryLifecycleWorkerRunResult</code> | Field contract for Memory Lifecycle Worker Run Result; see all contract members below. |
| `MemoryLifecycleTaskHandler` | type | <code>type MemoryLifecycleTaskHandler = (task: MemoryLifecycleTask, signal: AbortSignal) =&gt; Promise&lt;void&gt;</code> | Public type alias for Memory Lifecycle Task Handler. |
| `MemoryLifecycleWorkerType` | type | <code>type MemoryLifecycleWorkerType = 'retention' &#124; 'decay' &#124; 'consolidation' &#124; 'deletion' &#124; 'reindex' &#124; 'provider_reconciliation'</code> | Public type alias for Memory Lifecycle Worker Type. |

## `InMemoryMemoryLifecycleTaskStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | Public runtime operation for complete. |
| `constructor` | constructor | <code>(): InMemoryMemoryLifecycleTaskStore</code> | Creates an instance of this class. |
| `enqueue` | method | <code>enqueue(task: MemoryLifecycleTask): Promise&lt;void&gt;</code> | Public runtime operation for enqueue. |
| `fail` | method | <code>fail(taskId: string, ownerId: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter: boolean): Promise&lt;boolean&gt;</code> | Public runtime operation for fail. |
| `lease` | method | <code>lease(type: MemoryLifecycleWorkerType, ownerId: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryLifecycleTask[]&gt;</code> | Public runtime operation for lease. |
| `list` | method | <code>list(type?: MemoryLifecycleWorkerType): Promise&lt;MemoryLifecycleTask[]&gt;</code> | Lists list at this module boundary. |
| `renew` | method | <code>renew(taskId: string, ownerId: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | Public runtime operation for renew. |

## `LeasedMemoryLifecycleWorker` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: MemoryLifecycleWorkerOptions): LeasedMemoryLifecycleWorker</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public runtime operation for drain. |
| `runOnce` | method | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | Public runtime operation for run Once. |
| `start` | method | <code>start(): void</code> | Starts start at this module boundary. |
| `stop` | method | <code>stop(): void</code> | Public runtime operation for stop. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public runtime operation for stop And Drain. |

## `MemoryConsolidationWorker` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryConsolidationWorker</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public runtime operation for drain. |
| `runOnce` | method | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | Public runtime operation for run Once. |
| `start` | method | <code>start(): void</code> | Starts start at this module boundary. |
| `stop` | method | <code>stop(): void</code> | Public runtime operation for stop. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public runtime operation for stop And Drain. |

## `MemoryDecayWorker` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryDecayWorker</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public runtime operation for drain. |
| `runOnce` | method | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | Public runtime operation for run Once. |
| `start` | method | <code>start(): void</code> | Starts start at this module boundary. |
| `stop` | method | <code>stop(): void</code> | Public runtime operation for stop. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public runtime operation for stop And Drain. |

## `MemoryDeletionWorker` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryDeletionWorker</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public runtime operation for drain. |
| `runOnce` | method | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | Public runtime operation for run Once. |
| `start` | method | <code>start(): void</code> | Starts start at this module boundary. |
| `stop` | method | <code>stop(): void</code> | Public runtime operation for stop. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public runtime operation for stop And Drain. |

## `MemoryReindexWorker` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryReindexWorker</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public runtime operation for drain. |
| `runOnce` | method | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | Public runtime operation for run Once. |
| `start` | method | <code>start(): void</code> | Starts start at this module boundary. |
| `stop` | method | <code>stop(): void</code> | Public runtime operation for stop. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public runtime operation for stop And Drain. |

## `MemoryRetentionWorker` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryRetentionWorker</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public runtime operation for drain. |
| `runOnce` | method | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | Public runtime operation for run Once. |
| `start` | method | <code>start(): void</code> | Starts start at this module boundary. |
| `stop` | method | <code>stop(): void</code> | Public runtime operation for stop. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public runtime operation for stop And Drain. |

## `ProviderReconciliationWorker` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): ProviderReconciliationWorker</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public runtime operation for drain. |
| `runOnce` | method | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | Public runtime operation for run Once. |
| `start` | method | <code>start(): void</code> | Starts start at this module boundary. |
| `stop` | method | <code>stop(): void</code> | Public runtime operation for stop. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public runtime operation for stop And Drain. |

## `MemoryLifecycleTask` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public attempts property. |
| `availableAt` | property | <code>availableAt: string</code> | Public available At property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `lastError` | property | <code>lastError: NormalizedMemoryError</code> | Public last Error property. |
| `leaseExpiresAt` | property | <code>leaseExpiresAt: string</code> | Public lease Expires At property. |
| `leaseOwner` | property | <code>leaseOwner: string</code> | Public lease Owner property. |
| `leaseToken` | property | <code>leaseToken: string</code> | Public lease Token property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `payload` | property | <code>payload: TPayload</code> | Public payload property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `state` | property | <code>state: "completed" &#124; "failed" &#124; "processing" &#124; "pending" &#124; "dead_letter"</code> | Public state property. |
| `type` | property | <code>type: MemoryLifecycleWorkerType</code> | Public type property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `MemoryLifecycleTaskStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | Public runtime operation for complete. |
| `enqueue` | method | <code>enqueue(task: MemoryLifecycleTask): Promise&lt;void&gt;</code> | Public runtime operation for enqueue. |
| `fail` | method | <code>fail(taskId: string, ownerId: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter: boolean): Promise&lt;boolean&gt;</code> | Public runtime operation for fail. |
| `lease` | method | <code>lease(type: MemoryLifecycleWorkerType, ownerId: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryLifecycleTask[]&gt;</code> | Public runtime operation for lease. |
| `list` | method | <code>list(type?: MemoryLifecycleWorkerType): Promise&lt;MemoryLifecycleTask[]&gt;</code> | Lists list at this module boundary. |
| `renew` | method | <code>renew(taskId: string, ownerId: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | Public runtime operation for renew. |

## `MemoryLifecycleWorkerEvent` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error: NormalizedMemoryError</code> | Public error property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `taskId` | property | <code>taskId: string</code> | Public task Id property. |
| `type` | property | <code>type: "memory.worker.started" &#124; "memory.worker.stopped" &#124; "memory.worker.failed" &#124; "memory.worker.dead_lettered"</code> | Public type property. |
| `workerType` | property | <code>workerType: MemoryLifecycleWorkerType</code> | Public worker Type property. |

## `MemoryLifecycleWorkerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `batchSize` | property | <code>batchSize: number</code> | Public batch Size property. |
| `handler` | method | <code>handler(task: MemoryLifecycleTask, signal: AbortSignal): Promise&lt;void&gt;</code> | Public runtime operation for handler. |
| `leaseMs` | property | <code>leaseMs: number</code> | Public lease Ms property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `onEvent` | method | <code>onEvent(event: MemoryLifecycleWorkerEvent): void &#124; Promise&lt;void&gt;</code> | Handles Event at this module boundary. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `pollIntervalMs` | property | <code>pollIntervalMs: number</code> | Public poll Interval Ms property. |
| `renewalMs` | property | <code>renewalMs: number</code> | Public renewal Ms property. |
| `retryDelayMs` | property | <code>retryDelayMs: number</code> | Public retry Delay Ms property. |
| `store` | property | <code>store: MemoryLifecycleTaskStore</code> | Public store property. |
| `type` | property | <code>type: MemoryLifecycleWorkerType</code> | Public type property. |

## `MemoryLifecycleWorkerRunResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `completed` | property | <code>completed: number</code> | Public completed property. |
| `deadLettered` | property | <code>deadLettered: number</code> | Public dead Lettered property. |
| `failed` | property | <code>failed: number</code> | Public failed property. |
| `leased` | property | <code>leased: number</code> | Public leased property. |
