# `@codesoul-co/hypha-memory` / `dead-letter-management`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/dead-letter-management.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)
- 导出数: **10**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMemoryDeadLetterRepository` | 类 | <code>new InMemoryMemoryDeadLetterRepository(): InMemoryMemoryDeadLetterRepository</code> | In Memory Memory Dead Letter Repository 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryDeadLetterManager` | 类 | <code>new MemoryDeadLetterManager(repository: MemoryDeadLetterRepository): MemoryDeadLetterManager</code> | Memory Dead Letter Manager 的运行时实现；公开构造函数与成员见下表。 |
| `deadLetterFromTask` | 函数 | <code>deadLetterFromTask(task: MemoryLifecycleTask, occurredAt?: string): MemoryDeadLetterRecord</code> | dead Letter From Task 的公开运行时操作。 |
| `inspectMemoryLifecycleDeadLetters` | 函数 | <code>inspectMemoryLifecycleDeadLetters(store: MemoryLifecycleTaskStore, query?: { workerType?: MemoryLifecycleWorkerType; scopeHash?: string; }): Promise&lt;MemoryDeadLetterInspection[]&gt;</code> | Returns operator-safe DLQ metadata without exposing task payloads or Provider messages. |
| `DeadLetterDispositionRequest` | 接口 | <code>interface DeadLetterDispositionRequest</code> | Dead Letter Disposition Request 的字段契约；完整字段见下表。 |
| `MemoryDeadLetterInspection` | 接口 | <code>interface MemoryDeadLetterInspection</code> | Memory Dead Letter Inspection 的字段契约；完整字段见下表。 |
| `MemoryDeadLetterQuery` | 接口 | <code>interface MemoryDeadLetterQuery</code> | Memory Dead Letter Query 的字段契约；完整字段见下表。 |
| `MemoryDeadLetterRecord` | 接口 | <code>interface MemoryDeadLetterRecord</code> | Memory Dead Letter Record 的字段契约；完整字段见下表。 |
| `MemoryDeadLetterRepository` | 接口 | <code>interface MemoryDeadLetterRepository</code> | Memory Dead Letter Repository 的字段契约；完整字段见下表。 |
| `MemoryDeadLetterState` | 类型 | <code>type MemoryDeadLetterState = 'dead_letter' &#124; 'replay_queued' &#124; 'discarded'</code> | Memory Dead Letter State 的公共类型别名。 |

## `InMemoryMemoryDeadLetterRepository` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryMemoryDeadLetterRepository</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(id: string): Promise&lt;MemoryDeadLetterRecord &#124; null&gt;</code> | 读取 get。 |
| `list` | 方法 | <code>list(query?: MemoryDeadLetterQuery): Promise&lt;MemoryDeadLetterRecord[]&gt;</code> | 列出 list。 |
| `set` | 方法 | <code>set(record: MemoryDeadLetterRecord): Promise&lt;void&gt;</code> | 写入 set。 |

## `MemoryDeadLetterManager` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(repository: MemoryDeadLetterRepository): MemoryDeadLetterManager</code> | 创建该类的实例。 |
| `discard` | 方法 | <code>discard(request: DeadLetterDispositionRequest): Promise&lt;MemoryDeadLetterRecord&gt;</code> | discard 的公开运行时操作。 |
| `query` | 方法 | <code>query(input?: MemoryDeadLetterQuery): Promise&lt;MemoryDeadLetterRecord[]&gt;</code> | query 的公开运行时操作。 |
| `replay` | 方法 | <code>replay(request: DeadLetterDispositionRequest): Promise&lt;MemoryDeadLetterRecord&gt;</code> | replay 的公开运行时操作。 |

## `DeadLetterDispositionRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actorId` | 属性 | <code>actorId: string</code> | actor Id 字段。 |
| `confirmation` | 属性 | <code>confirmation: "replay" &#124; "discard"</code> | confirmation 字段。 |
| `deadLetterId` | 属性 | <code>deadLetterId: string</code> | dead Letter Id 字段。 |
| `expectedFailureFingerprint` | 属性 | <code>expectedFailureFingerprint: string</code> | expected Failure Fingerprint 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | occurred At 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |

## `MemoryDeadLetterInspection` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | attempts 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `error` | 属性 | <code>error: Pick&lt;NormalizedMemoryError, "code" &#124; "retryable" &#124; "providerCode"&gt;</code> | error 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | payload Hash 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `taskId` | 属性 | <code>taskId: string</code> | task Id 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `workerType` | 属性 | <code>workerType: MemoryLifecycleWorkerType</code> | worker Type 字段。 |

## `MemoryDeadLetterQuery` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `failureFingerprint` | 属性 | <code>failureFingerprint: string</code> | failure Fingerprint 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `state` | 属性 | <code>state: MemoryDeadLetterState</code> | state 字段。 |
| `workerType` | 属性 | <code>workerType: MemoryLifecycleWorkerType</code> | worker Type 字段。 |

## `MemoryDeadLetterRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | attempts 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `disposition` | 属性 | <code>disposition: { actorId: string; reason: string; occurredAt: string; }</code> | disposition 字段。 |
| `failure` | 属性 | <code>failure: NormalizedMemoryError</code> | failure 字段。 |
| `failureFingerprint` | 属性 | <code>failureFingerprint: string</code> | failure Fingerprint 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `payload` | 属性 | <code>payload: unknown</code> | payload 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `state` | 属性 | <code>state: MemoryDeadLetterState</code> | state 字段。 |
| `taskId` | 属性 | <code>taskId: string</code> | task Id 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `workerType` | 属性 | <code>workerType: MemoryLifecycleWorkerType</code> | worker Type 字段。 |

## `MemoryDeadLetterRepository` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(id: string): Promise&lt;MemoryDeadLetterRecord &#124; null&gt;</code> | 读取 get。 |
| `list` | 方法 | <code>list(query?: MemoryDeadLetterQuery): Promise&lt;MemoryDeadLetterRecord[]&gt;</code> | 列出 list。 |
| `set` | 方法 | <code>set(record: MemoryDeadLetterRecord): Promise&lt;void&gt;</code> | 写入 set。 |
