# `@codesoul-co/hypha-memory` / `memory-server-permanent-migration`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-server-permanent-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)
- 导出数: **14**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `PermanentMemoryMigrationAdapter` | 类 | <code>new PermanentMemoryMigrationAdapter(options: PermanentMemoryMigrationAdapterOptions): PermanentMemoryMigrationAdapter</code> | Permanent Memory Migration Adapter 的运行时实现；公开构造函数与成员见下表。 |
| `decidePermanentMemoryFailure` | 函数 | <code>decidePermanentMemoryFailure(error: NormalizedMemoryError, request: PermanentMemoryMigrationRequest, operation: PermanentMemoryMigrationOperation): PermanentMemoryFailureDecision</code> | 决定 Permanent Memory Failure。 |
| `isExplicitPermanentMemoryNotFound` | 函数 | <code>isExplicitPermanentMemoryNotFound(error: unknown): boolean</code> | 判断 Explicit Permanent Memory Not Found。 |
| `normalizePermanentMemoryProviderError` | 函数 | <code>normalizePermanentMemoryProviderError(providerError: unknown, request: PermanentMemoryMigrationRequest, operation: PermanentMemoryMigrationOperation): NormalizedMemoryError</code> | 规范化 Permanent Memory Provider Error。 |
| `PermanentMemoryFailureDecision` | 接口 | <code>interface PermanentMemoryFailureDecision</code> | Permanent Memory Failure Decision 的字段契约；完整字段见下表。 |
| `PermanentMemoryFailureEvent` | 接口 | <code>interface PermanentMemoryFailureEvent</code> | Permanent Memory Failure Event 的字段契约；完整字段见下表。 |
| `PermanentMemoryFailureObserver` | 接口 | <code>interface PermanentMemoryFailureObserver</code> | Permanent Memory Failure Observer 的字段契约；完整字段见下表。 |
| `PermanentMemoryMigrationAdapterOptions` | 接口 | <code>interface PermanentMemoryMigrationAdapterOptions</code> | Permanent Memory Migration Adapter Options 的字段契约；完整字段见下表。 |
| `PermanentMemoryMigrationPort` | 接口 | <code>interface PermanentMemoryMigrationPort</code> | Permanent Memory Migration Port 的字段契约；完整字段见下表。 |
| `PermanentMemoryMigrationProvider` | 接口 | <code>interface PermanentMemoryMigrationProvider</code> | Permanent Memory Migration Provider 的字段契约；完整字段见下表。 |
| `PermanentMemoryMigrationRequest` | 接口 | <code>interface PermanentMemoryMigrationRequest</code> | Permanent Memory Migration Request 的字段契约；完整字段见下表。 |
| `PermanentMemoryFailureDisposition` | 类型 | <code>type PermanentMemoryFailureDisposition = 'retry' &#124; 'reconcile' &#124; 'quarantine' &#124; 'dlq'</code> | Permanent Memory Failure Disposition 的公共类型别名。 |
| `PermanentMemoryFailureFinalState` | 类型 | <code>type PermanentMemoryFailureFinalState = 'waiting' &#124; 'reconciling' &#124; 'quarantined' &#124; 'dead_lettered'</code> | Permanent Memory Failure Final State 的公共类型别名。 |
| `PermanentMemoryMigrationOperation` | 类型 | <code>type PermanentMemoryMigrationOperation = 'get' &#124; 'list' &#124; 'delete' &#124; 'write'</code> | Permanent Memory Migration Operation 的公共类型别名。 |

## `PermanentMemoryMigrationAdapter` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: PermanentMemoryMigrationAdapterOptions): PermanentMemoryMigrationAdapter</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: PermanentMemoryMigrationRequest): Promise&lt;boolean&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest): Promise&lt;TValue &#124; null&gt;</code> | 读取 get。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest): Promise&lt;TValue[]&gt;</code> | 列出 list。 |
| `write` | 方法 | <code>write&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest, value: TValue): Promise&lt;void&gt;</code> | write 的公开运行时操作。 |

## `PermanentMemoryFailureDecision` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt: number</code> | attempt 字段。 |
| `disposition` | 属性 | <code>disposition: PermanentMemoryFailureDisposition</code> | disposition 字段。 |
| `finalState` | 属性 | <code>finalState: PermanentMemoryFailureFinalState</code> | final State 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | retryable 字段。 |

## `PermanentMemoryFailureEvent` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt: number</code> | attempt 字段。 |
| `disposition` | 属性 | <code>disposition: PermanentMemoryFailureDisposition</code> | disposition 字段。 |
| `error` | 属性 | <code>error: NormalizedMemoryError</code> | error 字段。 |
| `finalState` | 属性 | <code>finalState: PermanentMemoryFailureFinalState</code> | final State 字段。 |
| `operation` | 属性 | <code>operation: PermanentMemoryMigrationOperation</code> | operation 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `profileRef` | 属性 | <code>profileRef: string</code> | profile Ref 字段。 |
| `providerRef` | 属性 | <code>providerRef: string</code> | provider Ref 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `type` | 属性 | <code>type: "permanent_memory.operation_failed"</code> | type 字段。 |

## `PermanentMemoryFailureObserver` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `record` | 方法 | <code>record(event: PermanentMemoryFailureEvent): void &#124; Promise&lt;void&gt;</code> | 记录 record。 |

## `PermanentMemoryMigrationAdapterOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `observer` | 属性 | <code>observer: PermanentMemoryFailureObserver</code> | observer 字段。 |
| `provider` | 属性 | <code>provider: PermanentMemoryMigrationProvider</code> | provider 字段。 |

## `PermanentMemoryMigrationPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(request: PermanentMemoryMigrationRequest): Promise&lt;boolean&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest): Promise&lt;TValue &#124; null&gt;</code> | 读取 get。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest): Promise&lt;TValue[]&gt;</code> | 列出 list。 |
| `write` | 方法 | <code>write&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest, value: TValue): Promise&lt;void&gt;</code> | write 的公开运行时操作。 |

## `PermanentMemoryMigrationProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(scope: ManagedMemoryScope, recordId: string): Promise&lt;boolean&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, recordId: string): Promise&lt;TValue &#124; null&gt;</code> | 读取 get。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;TValue[]&gt;</code> | 列出 list。 |
| `write` | 方法 | <code>write&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, recordId: string, value: TValue): Promise&lt;void&gt;</code> | write 的公开运行时操作。 |

## `PermanentMemoryMigrationRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt: number</code> | attempt 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `profileRef` | 属性 | <code>profileRef: string</code> | profile Ref 字段。 |
| `providerRef` | 属性 | <code>providerRef: string</code> | provider Ref 字段。 |
| `recordId` | 属性 | <code>recordId: string</code> | record Id 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |
