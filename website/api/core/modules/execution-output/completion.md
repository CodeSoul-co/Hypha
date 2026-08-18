# `@codesoul-co/hypha-core` / `modules/execution-output/completion`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/execution-output/completion.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)
- Exports: **10**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DurableExecutionCompletionCoordinator` | class | <code>new DurableExecutionCompletionCoordinator(options: DurableExecutionCompletionCoordinatorOptions): DurableExecutionCompletionCoordinator</code> | Orders the Execution-owned durable completion barriers. Provider execution is deliberately absent: retries begin from the persisted terminal receipt, repeat idempotent Artifact collection/finalization, and only then attempt the fenced terminal record CAS. |
| `DurableExecutionTerminalEventCoordinator` | class | <code>new DurableExecutionTerminalEventCoordinator(options: DurableExecutionTerminalEventCoordinatorOptions): DurableExecutionTerminalEventCoordinator</code> | Appends the Execution terminal event only after a durable terminal record exists. Provider execution and Artifact collection are deliberately absent, so recovery can retry a failed append without repeating either side effect. |
| `createDurableExecutionTerminalEvent` | function | <code>createDurableExecutionTerminalEvent(recordValue: ExecutionRecord): ExecutionFrameworkEvent</code> | Creates Durable Execution Terminal Event at this module boundary. |
| `DurableExecutionCompletionCoordinatorOptions` | interface | <code>interface DurableExecutionCompletionCoordinatorOptions</code> | Field contract for Durable Execution Completion Coordinator Options; see all contract members below. |
| `DurableExecutionCompletionRequest` | interface | <code>interface DurableExecutionCompletionRequest</code> | Field contract for Durable Execution Completion Request; see all contract members below. |
| `DurableExecutionCompletionResult` | interface | <code>interface DurableExecutionCompletionResult</code> | Field contract for Durable Execution Completion Result; see all contract members below. |
| `DurableExecutionCompletionWorker` | interface | <code>interface DurableExecutionCompletionWorker</code> | Field contract for Durable Execution Completion Worker; see all contract members below. |
| `DurableExecutionTerminalEventCommitPort` | interface | <code>interface DurableExecutionTerminalEventCommitPort</code> | Runtime implements this port with its durable Event Store. Repeated calls with the same idempotency key and event must resolve to the same append. |
| `DurableExecutionTerminalEventCommitRequest` | interface | <code>interface DurableExecutionTerminalEventCommitRequest</code> | Field contract for Durable Execution Terminal Event Commit Request; see all contract members below. |
| `DurableExecutionTerminalEventCoordinatorOptions` | interface | <code>interface DurableExecutionTerminalEventCoordinatorOptions</code> | Field contract for Durable Execution Terminal Event Coordinator Options; see all contract members below. |

## `DurableExecutionCompletionCoordinator` public members

Orders the Execution-owned durable completion barriers. Provider execution is deliberately absent: retries begin from the persisted terminal receipt, repeat idempotent Artifact collection/finalization, and only then attempt the fenced terminal record CAS.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(request: DurableExecutionCompletionRequest): Promise&lt;DurableExecutionCompletionResult&gt;</code> | Public runtime operation for complete. |
| `constructor` | constructor | <code>(options: DurableExecutionCompletionCoordinatorOptions): DurableExecutionCompletionCoordinator</code> | Creates an instance of this class. |

## `DurableExecutionTerminalEventCoordinator` public members

Appends the Execution terminal event only after a durable terminal record exists. Provider execution and Artifact collection are deliberately absent, so recovery can retry a failed append without repeating either side effect.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(recordValue: ExecutionRecord): Promise&lt;ExecutionFrameworkEvent&gt;</code> | Appends append at this module boundary. |
| `constructor` | constructor | <code>(options: DurableExecutionTerminalEventCoordinatorOptions): DurableExecutionTerminalEventCoordinator</code> | Creates an instance of this class. |

## `DurableExecutionCompletionCoordinatorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collector` | property | <code>collector: ExecutionOutputCollector</code> | Public collector property. |
| `planner` | property | <code>planner: ExecutionOutputPlanner</code> | Public planner property. |
| `worker` | property | <code>worker: DurableExecutionCompletionWorker</code> | Public worker property. |

## `DurableExecutionCompletionRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `outputContext` | property | <code>outputContext: ExecutionOutputCollectionContext</code> | Public output Context property. |
| `outputPolicy` | property | <code>outputPolicy: ExecutionOutputCollectionPolicy</code> | Public output Policy property. |
| `record` | property | <code>record: ExecutionRecord</code> | Public record property. |
| `result` | property | <code>result: CommandExecutionResult</code> | Public result property. |

## `DurableExecutionCompletionResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `output` | property | <code>output: ExecutionOutputCollectionResult</code> | Public output property. |
| `record` | property | <code>record: ExecutionRecord</code> | Public record property. |

## `DurableExecutionCompletionWorker` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointTerminalReceipt` | method | <code>checkpointTerminalReceipt(record: ExecutionRecord, receipt: ExecutionReceipt): Promise&lt;ExecutionRecord&gt;</code> | Public runtime operation for checkpoint Terminal Receipt. |
| `commit` | method | <code>commit(record: ExecutionRecord, result: CommandExecutionResult): Promise&lt;ExecutionRecord&gt;</code> | Public runtime operation for commit. |
| `renew` | method | <code>renew(record: ExecutionRecord): Promise&lt;ExecutionRecord&gt;</code> | Public runtime operation for renew. |

## `DurableExecutionTerminalEventCommitPort` contract members

Runtime implements this port with its durable Event Store. Repeated calls with the same idempotency key and event must resolve to the same append.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: DurableExecutionTerminalEventCommitRequest): Promise&lt;unknown&gt;</code> | Appends append at this module boundary. |

## `DurableExecutionTerminalEventCommitRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `event` | property | <code>event: ExecutionFrameworkEvent</code> | Public event property. |
| `executionRevision` | property | <code>executionRevision: number</code> | Public execution Revision property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |

## `DurableExecutionTerminalEventCoordinatorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: DurableExecutionTerminalEventCommitPort</code> | Public events property. |
