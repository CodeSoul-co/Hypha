# `@codesoul-co/hypha-memory` / `dead-letter-management`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/dead-letter-management.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)
- Exports: **10**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMemoryDeadLetterRepository` | class | <code>new InMemoryMemoryDeadLetterRepository(): InMemoryMemoryDeadLetterRepository</code> | Runtime implementation for In Memory Memory Dead Letter Repository; see its public constructor and members below. |
| `MemoryDeadLetterManager` | class | <code>new MemoryDeadLetterManager(repository: MemoryDeadLetterRepository): MemoryDeadLetterManager</code> | Runtime implementation for Memory Dead Letter Manager; see its public constructor and members below. |
| `deadLetterFromTask` | function | <code>deadLetterFromTask(task: MemoryLifecycleTask, occurredAt?: string): MemoryDeadLetterRecord</code> | Public runtime operation for dead Letter From Task. |
| `inspectMemoryLifecycleDeadLetters` | function | <code>inspectMemoryLifecycleDeadLetters(store: MemoryLifecycleTaskStore, query?: { workerType?: MemoryLifecycleWorkerType; scopeHash?: string; }): Promise&lt;MemoryDeadLetterInspection[]&gt;</code> | Returns operator-safe DLQ metadata without exposing task payloads or Provider messages. |
| `DeadLetterDispositionRequest` | interface | <code>interface DeadLetterDispositionRequest</code> | Field contract for Dead Letter Disposition Request; see all contract members below. |
| `MemoryDeadLetterInspection` | interface | <code>interface MemoryDeadLetterInspection</code> | Field contract for Memory Dead Letter Inspection; see all contract members below. |
| `MemoryDeadLetterQuery` | interface | <code>interface MemoryDeadLetterQuery</code> | Field contract for Memory Dead Letter Query; see all contract members below. |
| `MemoryDeadLetterRecord` | interface | <code>interface MemoryDeadLetterRecord</code> | Field contract for Memory Dead Letter Record; see all contract members below. |
| `MemoryDeadLetterRepository` | interface | <code>interface MemoryDeadLetterRepository</code> | Field contract for Memory Dead Letter Repository; see all contract members below. |
| `MemoryDeadLetterState` | type | <code>type MemoryDeadLetterState = 'dead_letter' &#124; 'replay_queued' &#124; 'discarded'</code> | Public type alias for Memory Dead Letter State. |

## `InMemoryMemoryDeadLetterRepository` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryMemoryDeadLetterRepository</code> | Creates an instance of this class. |
| `get` | method | <code>get(id: string): Promise&lt;MemoryDeadLetterRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `list` | method | <code>list(query?: MemoryDeadLetterQuery): Promise&lt;MemoryDeadLetterRecord[]&gt;</code> | Lists list at this module boundary. |
| `set` | method | <code>set(record: MemoryDeadLetterRecord): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `MemoryDeadLetterManager` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(repository: MemoryDeadLetterRepository): MemoryDeadLetterManager</code> | Creates an instance of this class. |
| `discard` | method | <code>discard(request: DeadLetterDispositionRequest): Promise&lt;MemoryDeadLetterRecord&gt;</code> | Public runtime operation for discard. |
| `query` | method | <code>query(input?: MemoryDeadLetterQuery): Promise&lt;MemoryDeadLetterRecord[]&gt;</code> | Public runtime operation for query. |
| `replay` | method | <code>replay(request: DeadLetterDispositionRequest): Promise&lt;MemoryDeadLetterRecord&gt;</code> | Public runtime operation for replay. |

## `DeadLetterDispositionRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actorId` | property | <code>actorId: string</code> | Public actor Id property. |
| `confirmation` | property | <code>confirmation: "replay" &#124; "discard"</code> | Public confirmation property. |
| `deadLetterId` | property | <code>deadLetterId: string</code> | Public dead Letter Id property. |
| `expectedFailureFingerprint` | property | <code>expectedFailureFingerprint: string</code> | Public expected Failure Fingerprint property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public occurred At property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |

## `MemoryDeadLetterInspection` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public attempts property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `error` | property | <code>error: Pick&lt;NormalizedMemoryError, "code" &#124; "retryable" &#124; "providerCode"&gt;</code> | Public error property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `payloadHash` | property | <code>payloadHash: string</code> | Public payload Hash property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `taskId` | property | <code>taskId: string</code> | Public task Id property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `workerType` | property | <code>workerType: MemoryLifecycleWorkerType</code> | Public worker Type property. |

## `MemoryDeadLetterQuery` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `failureFingerprint` | property | <code>failureFingerprint: string</code> | Public failure Fingerprint property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `state` | property | <code>state: MemoryDeadLetterState</code> | Public state property. |
| `workerType` | property | <code>workerType: MemoryLifecycleWorkerType</code> | Public worker Type property. |

## `MemoryDeadLetterRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public attempts property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `disposition` | property | <code>disposition: { actorId: string; reason: string; occurredAt: string; }</code> | Public disposition property. |
| `failure` | property | <code>failure: NormalizedMemoryError</code> | Public failure property. |
| `failureFingerprint` | property | <code>failureFingerprint: string</code> | Public failure Fingerprint property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `payload` | property | <code>payload: unknown</code> | Public payload property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `state` | property | <code>state: MemoryDeadLetterState</code> | Public state property. |
| `taskId` | property | <code>taskId: string</code> | Public task Id property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `workerType` | property | <code>workerType: MemoryLifecycleWorkerType</code> | Public worker Type property. |

## `MemoryDeadLetterRepository` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(id: string): Promise&lt;MemoryDeadLetterRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `list` | method | <code>list(query?: MemoryDeadLetterQuery): Promise&lt;MemoryDeadLetterRecord[]&gt;</code> | Lists list at this module boundary. |
| `set` | method | <code>set(record: MemoryDeadLetterRecord): Promise&lt;void&gt;</code> | Sets set at this module boundary. |
