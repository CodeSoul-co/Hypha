# `@codesoul-co/hypha-adapters-local` / `session-queue`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/session-queue.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/session-queue.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteSessionQueue` | class | <code>new SQLiteSessionQueue(options: SQLiteSessionQueueOptions): SQLiteSessionQueue</code> | Runtime implementation for SQ Lite Session Queue; see its public constructor and members below. |
| `SQLiteSessionQueueOptions` | interface | <code>interface SQLiteSessionQueueOptions</code> | Field contract for SQ Lite Session Queue Options; see all contract members below. |

## `SQLiteSessionQueue` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancelPending` | method | <code>cancelPending(request: CancelSessionCommandsRequest): Promise&lt;CancelSessionCommandsResult&gt;</code> | Cancels Pending at this module boundary. |
| `claim` | method | <code>claim(request: ClaimSessionCommandRequest): Promise&lt;SessionCommandRecord &#124; null&gt;</code> | Public runtime operation for claim. |
| `close` | method | <code>close(): void</code> | Public runtime operation for close. |
| `closeDeadLetter` | method | <code>closeDeadLetter(request: CloseDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public runtime operation for close Dead Letter. |
| `complete` | method | <code>complete(request: CompleteSessionCommandRequest): Promise&lt;void&gt;</code> | Public runtime operation for complete. |
| `constructor` | constructor | <code>(options: SQLiteSessionQueueOptions): SQLiteSessionQueue</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(scope: SessionQueueScope): Promise&lt;void&gt;</code> | Public runtime operation for drain. |
| `enqueue` | method | <code>enqueue(request: EnqueueSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public runtime operation for enqueue. |
| `fail` | method | <code>fail(request: FailSessionCommandRequest): Promise&lt;void&gt;</code> | Public runtime operation for fail. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth &amp; { details: SessionQueueHealthSnapshot; }&gt;</code> | Public runtime operation for health. |
| `list` | method | <code>list(request: ListSessionCommandsRequest): Promise&lt;SessionCommandRecord[]&gt;</code> | Lists list at this module boundary. |
| `listStuck` | method | <code>listStuck(request: ListStuckSessionCommandsRequest): Promise&lt;StuckSessionCommand[]&gt;</code> | Lists Stuck at this module boundary. |
| `redriveDeadLetter` | method | <code>redriveDeadLetter(request: RedriveDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public runtime operation for redrive Dead Letter. |
| `release` | method | <code>release(request: ReleaseSessionCommandRequest): Promise&lt;void&gt;</code> | Public runtime operation for release. |
| `renew` | method | <code>renew(request: RenewSessionCommandRequest): Promise&lt;SessionCommandClaim&gt;</code> | Public runtime operation for renew. |

## `SQLiteSessionQueueOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `drainPollMs` | property | <code>drainPollMs: number</code> | Public drain Poll Ms property. |
| `duplicatePolicy` | property | <code>duplicatePolicy: "reuse" &#124; "reject"</code> | Public duplicate Policy property. |
| `filename` | property | <code>filename: string</code> | Public filename property. |
| `maxConcurrentSessions` | property | <code>maxConcurrentSessions: number</code> | Public max Concurrent Sessions property. |
| `maxConcurrentSessionsPerUser` | property | <code>maxConcurrentSessionsPerUser: number</code> | Public max Concurrent Sessions Per User property. |
| `maxPendingGlobal` | property | <code>maxPendingGlobal: number</code> | Public max Pending Global property. |
| `maxPendingPerSession` | property | <code>maxPendingPerSession: number</code> | Public max Pending Per Session property. |
| `maxPendingPerUser` | property | <code>maxPendingPerUser: number</code> | Public max Pending Per User property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `priorityAgingMs` | property | <code>priorityAgingMs: number</code> | Public priority Aging Ms property. |
