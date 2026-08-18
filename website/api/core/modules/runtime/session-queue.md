# `@codesoul-co/hypha-core` / `modules/runtime/session-queue`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/session-queue.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-queue.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemorySessionQueue` | class | <code>new InMemorySessionQueue(options?: InMemorySessionQueueOptions): InMemorySessionQueue</code> | Runtime implementation for In Memory Session Queue; see its public constructor and members below. |
| `createSessionQueueHealthSnapshot` | function | <code>createSessionQueueHealthSnapshot(records: readonly SessionCommandRecord[], checkedAt: string, recoveredExpiredLeases?: number): SessionQueueHealthSnapshot</code> | Creates Session Queue Health Snapshot at this module boundary. |
| `InMemorySessionQueueOptions` | interface | <code>interface InMemorySessionQueueOptions</code> | Field contract for In Memory Session Queue Options; see all contract members below. |
| `SessionQueue` | interface | <code>interface SessionQueue</code> | Field contract for Session Queue; see all contract members below. |

## `InMemorySessionQueue` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancelPending` | method | <code>cancelPending(request: CancelSessionCommandsRequest): Promise&lt;CancelSessionCommandsResult&gt;</code> | Cancels Pending at this module boundary. |
| `claim` | method | <code>claim(request: ClaimSessionCommandRequest): Promise&lt;SessionCommandRecord &#124; null&gt;</code> | Public runtime operation for claim. |
| `closeDeadLetter` | method | <code>closeDeadLetter(request: CloseDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public runtime operation for close Dead Letter. |
| `complete` | method | <code>complete(request: CompleteSessionCommandRequest): Promise&lt;void&gt;</code> | Public runtime operation for complete. |
| `constructor` | constructor | <code>(options?: InMemorySessionQueueOptions): InMemorySessionQueue</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(scope: SessionQueueScope): Promise&lt;void&gt;</code> | Public runtime operation for drain. |
| `enqueue` | method | <code>enqueue(request: EnqueueSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public runtime operation for enqueue. |
| `fail` | method | <code>fail(request: FailSessionCommandRequest): Promise&lt;void&gt;</code> | Public runtime operation for fail. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth &amp; { details: SessionQueueHealthSnapshot; }&gt;</code> | Public runtime operation for health. |
| `list` | method | <code>list(request: ListSessionCommandsRequest): Promise&lt;SessionCommandRecord[]&gt;</code> | Lists list at this module boundary. |
| `listStuck` | method | <code>listStuck(request: ListStuckSessionCommandsRequest): Promise&lt;StuckSessionCommand[]&gt;</code> | Lists Stuck at this module boundary. |
| `redriveDeadLetter` | method | <code>redriveDeadLetter(request: RedriveDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public runtime operation for redrive Dead Letter. |
| `release` | method | <code>release(request: ReleaseSessionCommandRequest): Promise&lt;void&gt;</code> | Public runtime operation for release. |
| `renew` | method | <code>renew(request: RenewSessionCommandRequest): Promise&lt;SessionCommandClaim&gt;</code> | Public runtime operation for renew. |

## `InMemorySessionQueueOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `duplicatePolicy` | property | <code>duplicatePolicy: "reuse" &#124; "reject"</code> | Public duplicate Policy property. |
| `maxConcurrentSessions` | property | <code>maxConcurrentSessions: number</code> | Public max Concurrent Sessions property. |
| `maxConcurrentSessionsPerUser` | property | <code>maxConcurrentSessionsPerUser: number</code> | Public max Concurrent Sessions Per User property. |
| `maxPendingGlobal` | property | <code>maxPendingGlobal: number</code> | Public max Pending Global property. |
| `maxPendingPerSession` | property | <code>maxPendingPerSession: number</code> | Public max Pending Per Session property. |
| `maxPendingPerUser` | property | <code>maxPendingPerUser: number</code> | Public max Pending Per User property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `priorityAgingMs` | property | <code>priorityAgingMs: number</code> | Public priority Aging Ms property. |

## `SessionQueue` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancelPending` | method | <code>cancelPending(request: CancelSessionCommandsRequest): Promise&lt;CancelSessionCommandsResult&gt;</code> | Cancels Pending at this module boundary. |
| `claim` | method | <code>claim(request: ClaimSessionCommandRequest): Promise&lt;SessionCommandRecord &#124; null&gt;</code> | Public runtime operation for claim. |
| `closeDeadLetter` | method | <code>closeDeadLetter(request: CloseDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public runtime operation for close Dead Letter. |
| `complete` | method | <code>complete(request: CompleteSessionCommandRequest): Promise&lt;void&gt;</code> | Public runtime operation for complete. |
| `drain` | method | <code>drain(scope: SessionQueueScope): Promise&lt;void&gt;</code> | Public runtime operation for drain. |
| `enqueue` | method | <code>enqueue(request: EnqueueSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public runtime operation for enqueue. |
| `fail` | method | <code>fail(request: FailSessionCommandRequest): Promise&lt;void&gt;</code> | Public runtime operation for fail. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth &amp; { details: SessionQueueHealthSnapshot; }&gt;</code> | Public runtime operation for health. |
| `list` | method | <code>list(request: ListSessionCommandsRequest): Promise&lt;SessionCommandRecord[]&gt;</code> | Lists list at this module boundary. |
| `listStuck` | method | <code>listStuck(request: ListStuckSessionCommandsRequest): Promise&lt;StuckSessionCommand[]&gt;</code> | Lists Stuck at this module boundary. |
| `redriveDeadLetter` | method | <code>redriveDeadLetter(request: RedriveDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public runtime operation for redrive Dead Letter. |
| `release` | method | <code>release(request: ReleaseSessionCommandRequest): Promise&lt;void&gt;</code> | Public runtime operation for release. |
| `renew` | method | <code>renew(request: RenewSessionCommandRequest): Promise&lt;SessionCommandClaim&gt;</code> | Public runtime operation for renew. |
