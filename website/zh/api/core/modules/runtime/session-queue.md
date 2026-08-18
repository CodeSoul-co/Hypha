# `@codesoul-co/hypha-core` / `modules/runtime/session-queue`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/session-queue.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-queue.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemorySessionQueue` | 类 | <code>new InMemorySessionQueue(options?: InMemorySessionQueueOptions): InMemorySessionQueue</code> | In Memory Session Queue 的运行时实现；公开构造函数与成员见下表。 |
| `createSessionQueueHealthSnapshot` | 函数 | <code>createSessionQueueHealthSnapshot(records: readonly SessionCommandRecord[], checkedAt: string, recoveredExpiredLeases?: number): SessionQueueHealthSnapshot</code> | 创建 Session Queue Health Snapshot。 |
| `InMemorySessionQueueOptions` | 接口 | <code>interface InMemorySessionQueueOptions</code> | In Memory Session Queue Options 的字段契约；完整字段见下表。 |
| `SessionQueue` | 接口 | <code>interface SessionQueue</code> | Session Queue 的字段契约；完整字段见下表。 |

## `InMemorySessionQueue` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancelPending` | 方法 | <code>cancelPending(request: CancelSessionCommandsRequest): Promise&lt;CancelSessionCommandsResult&gt;</code> | 取消 Pending。 |
| `claim` | 方法 | <code>claim(request: ClaimSessionCommandRequest): Promise&lt;SessionCommandRecord &#124; null&gt;</code> | claim 的公开运行时操作。 |
| `closeDeadLetter` | 方法 | <code>closeDeadLetter(request: CloseDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | close Dead Letter 的公开运行时操作。 |
| `complete` | 方法 | <code>complete(request: CompleteSessionCommandRequest): Promise&lt;void&gt;</code> | complete 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options?: InMemorySessionQueueOptions): InMemorySessionQueue</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(scope: SessionQueueScope): Promise&lt;void&gt;</code> | drain 的公开运行时操作。 |
| `enqueue` | 方法 | <code>enqueue(request: EnqueueSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | enqueue 的公开运行时操作。 |
| `fail` | 方法 | <code>fail(request: FailSessionCommandRequest): Promise&lt;void&gt;</code> | fail 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth &amp; { details: SessionQueueHealthSnapshot; }&gt;</code> | health 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: ListSessionCommandsRequest): Promise&lt;SessionCommandRecord[]&gt;</code> | 列出 list。 |
| `listStuck` | 方法 | <code>listStuck(request: ListStuckSessionCommandsRequest): Promise&lt;StuckSessionCommand[]&gt;</code> | 列出 Stuck。 |
| `redriveDeadLetter` | 方法 | <code>redriveDeadLetter(request: RedriveDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | redrive Dead Letter 的公开运行时操作。 |
| `release` | 方法 | <code>release(request: ReleaseSessionCommandRequest): Promise&lt;void&gt;</code> | release 的公开运行时操作。 |
| `renew` | 方法 | <code>renew(request: RenewSessionCommandRequest): Promise&lt;SessionCommandClaim&gt;</code> | renew 的公开运行时操作。 |

## `InMemorySessionQueueOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `duplicatePolicy` | 属性 | <code>duplicatePolicy: "reuse" &#124; "reject"</code> | duplicate Policy 字段。 |
| `maxConcurrentSessions` | 属性 | <code>maxConcurrentSessions: number</code> | max Concurrent Sessions 字段。 |
| `maxConcurrentSessionsPerUser` | 属性 | <code>maxConcurrentSessionsPerUser: number</code> | max Concurrent Sessions Per User 字段。 |
| `maxPendingGlobal` | 属性 | <code>maxPendingGlobal: number</code> | max Pending Global 字段。 |
| `maxPendingPerSession` | 属性 | <code>maxPendingPerSession: number</code> | max Pending Per Session 字段。 |
| `maxPendingPerUser` | 属性 | <code>maxPendingPerUser: number</code> | max Pending Per User 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `priorityAgingMs` | 属性 | <code>priorityAgingMs: number</code> | priority Aging Ms 字段。 |

## `SessionQueue` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancelPending` | 方法 | <code>cancelPending(request: CancelSessionCommandsRequest): Promise&lt;CancelSessionCommandsResult&gt;</code> | 取消 Pending。 |
| `claim` | 方法 | <code>claim(request: ClaimSessionCommandRequest): Promise&lt;SessionCommandRecord &#124; null&gt;</code> | claim 的公开运行时操作。 |
| `closeDeadLetter` | 方法 | <code>closeDeadLetter(request: CloseDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | close Dead Letter 的公开运行时操作。 |
| `complete` | 方法 | <code>complete(request: CompleteSessionCommandRequest): Promise&lt;void&gt;</code> | complete 的公开运行时操作。 |
| `drain` | 方法 | <code>drain(scope: SessionQueueScope): Promise&lt;void&gt;</code> | drain 的公开运行时操作。 |
| `enqueue` | 方法 | <code>enqueue(request: EnqueueSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | enqueue 的公开运行时操作。 |
| `fail` | 方法 | <code>fail(request: FailSessionCommandRequest): Promise&lt;void&gt;</code> | fail 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth &amp; { details: SessionQueueHealthSnapshot; }&gt;</code> | health 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: ListSessionCommandsRequest): Promise&lt;SessionCommandRecord[]&gt;</code> | 列出 list。 |
| `listStuck` | 方法 | <code>listStuck(request: ListStuckSessionCommandsRequest): Promise&lt;StuckSessionCommand[]&gt;</code> | 列出 Stuck。 |
| `redriveDeadLetter` | 方法 | <code>redriveDeadLetter(request: RedriveDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | redrive Dead Letter 的公开运行时操作。 |
| `release` | 方法 | <code>release(request: ReleaseSessionCommandRequest): Promise&lt;void&gt;</code> | release 的公开运行时操作。 |
| `renew` | 方法 | <code>renew(request: RenewSessionCommandRequest): Promise&lt;SessionCommandClaim&gt;</code> | renew 的公开运行时操作。 |
