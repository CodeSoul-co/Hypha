# `@codesoul-co/hypha-adapters-local` / `session-queue`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/session-queue.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/session-queue.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteSessionQueue` | 类 | <code>new SQLiteSessionQueue(options: SQLiteSessionQueueOptions): SQLiteSessionQueue</code> | SQ Lite Session Queue 的运行时实现；公开构造函数与成员见下表。 |
| `SQLiteSessionQueueOptions` | 接口 | <code>interface SQLiteSessionQueueOptions</code> | SQ Lite Session Queue Options 的字段契约；完整字段见下表。 |

## `SQLiteSessionQueue` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancelPending` | 方法 | <code>cancelPending(request: CancelSessionCommandsRequest): Promise&lt;CancelSessionCommandsResult&gt;</code> | 取消 Pending。 |
| `claim` | 方法 | <code>claim(request: ClaimSessionCommandRequest): Promise&lt;SessionCommandRecord &#124; null&gt;</code> | claim 的公开运行时操作。 |
| `close` | 方法 | <code>close(): void</code> | close 的公开运行时操作。 |
| `closeDeadLetter` | 方法 | <code>closeDeadLetter(request: CloseDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | close Dead Letter 的公开运行时操作。 |
| `complete` | 方法 | <code>complete(request: CompleteSessionCommandRequest): Promise&lt;void&gt;</code> | complete 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: SQLiteSessionQueueOptions): SQLiteSessionQueue</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(scope: SessionQueueScope): Promise&lt;void&gt;</code> | drain 的公开运行时操作。 |
| `enqueue` | 方法 | <code>enqueue(request: EnqueueSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | enqueue 的公开运行时操作。 |
| `fail` | 方法 | <code>fail(request: FailSessionCommandRequest): Promise&lt;void&gt;</code> | fail 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth &amp; { details: SessionQueueHealthSnapshot; }&gt;</code> | health 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: ListSessionCommandsRequest): Promise&lt;SessionCommandRecord[]&gt;</code> | 列出 list。 |
| `listStuck` | 方法 | <code>listStuck(request: ListStuckSessionCommandsRequest): Promise&lt;StuckSessionCommand[]&gt;</code> | 列出 Stuck。 |
| `redriveDeadLetter` | 方法 | <code>redriveDeadLetter(request: RedriveDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | redrive Dead Letter 的公开运行时操作。 |
| `release` | 方法 | <code>release(request: ReleaseSessionCommandRequest): Promise&lt;void&gt;</code> | release 的公开运行时操作。 |
| `renew` | 方法 | <code>renew(request: RenewSessionCommandRequest): Promise&lt;SessionCommandClaim&gt;</code> | renew 的公开运行时操作。 |

## `SQLiteSessionQueueOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `drainPollMs` | 属性 | <code>drainPollMs: number</code> | drain Poll Ms 字段。 |
| `duplicatePolicy` | 属性 | <code>duplicatePolicy: "reuse" &#124; "reject"</code> | duplicate Policy 字段。 |
| `filename` | 属性 | <code>filename: string</code> | filename 字段。 |
| `maxConcurrentSessions` | 属性 | <code>maxConcurrentSessions: number</code> | max Concurrent Sessions 字段。 |
| `maxConcurrentSessionsPerUser` | 属性 | <code>maxConcurrentSessionsPerUser: number</code> | max Concurrent Sessions Per User 字段。 |
| `maxPendingGlobal` | 属性 | <code>maxPendingGlobal: number</code> | max Pending Global 字段。 |
| `maxPendingPerSession` | 属性 | <code>maxPendingPerSession: number</code> | max Pending Per Session 字段。 |
| `maxPendingPerUser` | 属性 | <code>maxPendingPerUser: number</code> | max Pending Per User 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `priorityAgingMs` | 属性 | <code>priorityAgingMs: number</code> | priority Aging Ms 字段。 |
