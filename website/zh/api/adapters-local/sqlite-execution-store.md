# `@codesoul-co/hypha-adapters-local` / `sqlite-execution-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/sqlite-execution-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteExecutionStore` | 类 | <code>new SQLiteExecutionStore(options: SQLiteExecutionStoreFoundationOptions): SQLiteExecutionStore</code> | Public durable local ExecutionStore adapter. Every persisted read is validated by the foundation before it crosses the provider boundary. CAS, idempotency, lease, fencing, migration, and close semantics are therefore exposed through the stable Core ExecutionStore port. |
| `SQLiteExecutionStoreErrorCode` | 类型 | <code>type SQLiteExecutionStoreErrorCode = SQLiteExecutionStoreFoundationErrorCode</code> | SQ Lite Execution Store Error Code 的公共类型别名。 |
| `SQLiteExecutionStoreOptions` | 类型 | <code>type SQLiteExecutionStoreOptions = SQLiteExecutionStoreFoundationOptions</code> | SQ Lite Execution Store Options 的公共类型别名。 |

## `SQLiteExecutionStore` 公开成员

Public durable local ExecutionStore adapter. Every persisted read is validated by the foundation before it crosses the provider boundary. CAS, idempotency, lease, fencing, migration, and close semantics are therefore exposed through the stable Core ExecutionStore port.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquireLease` | 方法 | <code>acquireLease(input: ExecutionLeaseAcquireRequest): Promise&lt;ExecutionRecord&gt;</code> | acquire Lease 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `compareAndSet` | 方法 | <code>compareAndSet(input: ExecutionRecordCompareAndSetRequest): Promise&lt;ExecutionRecord&gt;</code> | compare And Set 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: SQLiteExecutionStoreFoundationOptions): SQLiteExecutionStore</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: ExecutionRecordCreateRequest): Promise&lt;ExecutionRecord&gt;</code> | 创建 create。 |
| `filename` | 属性 | <code>filename: string</code> | filename 字段。 |
| `get` | 方法 | <code>get(executionId: string): Promise&lt;ExecutionRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `list` | 方法 | <code>list(input?: ExecutionRecordQuery): Promise&lt;ExecutionRecordPage&gt;</code> | 列出 list。 |
| `releaseLease` | 方法 | <code>releaseLease(input: ExecutionLeaseReleaseRequest): Promise&lt;ExecutionRecord&gt;</code> | release Lease 的公开运行时操作。 |
| `renewLease` | 方法 | <code>renewLease(input: ExecutionLeaseRenewRequest): Promise&lt;ExecutionRecord&gt;</code> | renew Lease 的公开运行时操作。 |
| `resolveIdempotency` | 方法 | <code>resolveIdempotency(input: ExecutionIdempotencyQuery): Promise&lt;ExecutionIdempotencyResolution&gt;</code> | 解析 Idempotency。 |
| `static schemaVersion` | 属性 | <code>schemaVersion: 7</code> | schema Version 字段。 |
