# `@codesoul-co/hypha-adapters-local` / `sqlite-execution-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/sqlite-execution-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteExecutionStore` | class | <code>new SQLiteExecutionStore(options: SQLiteExecutionStoreFoundationOptions): SQLiteExecutionStore</code> | Public durable local ExecutionStore adapter. Every persisted read is validated by the foundation before it crosses the provider boundary. CAS, idempotency, lease, fencing, migration, and close semantics are therefore exposed through the stable Core ExecutionStore port. |
| `SQLiteExecutionStoreErrorCode` | type | <code>type SQLiteExecutionStoreErrorCode = SQLiteExecutionStoreFoundationErrorCode</code> | Public type alias for SQ Lite Execution Store Error Code. |
| `SQLiteExecutionStoreOptions` | type | <code>type SQLiteExecutionStoreOptions = SQLiteExecutionStoreFoundationOptions</code> | Public type alias for SQ Lite Execution Store Options. |

## `SQLiteExecutionStore` public members

Public durable local ExecutionStore adapter. Every persisted read is validated by the foundation before it crosses the provider boundary. CAS, idempotency, lease, fencing, migration, and close semantics are therefore exposed through the stable Core ExecutionStore port.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquireLease` | method | <code>acquireLease(input: ExecutionLeaseAcquireRequest): Promise&lt;ExecutionRecord&gt;</code> | Public runtime operation for acquire Lease. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `compareAndSet` | method | <code>compareAndSet(input: ExecutionRecordCompareAndSetRequest): Promise&lt;ExecutionRecord&gt;</code> | Public runtime operation for compare And Set. |
| `constructor` | constructor | <code>(options: SQLiteExecutionStoreFoundationOptions): SQLiteExecutionStore</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: ExecutionRecordCreateRequest): Promise&lt;ExecutionRecord&gt;</code> | Creates create at this module boundary. |
| `filename` | property | <code>filename: string</code> | Public filename property. |
| `get` | method | <code>get(executionId: string): Promise&lt;ExecutionRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `list` | method | <code>list(input?: ExecutionRecordQuery): Promise&lt;ExecutionRecordPage&gt;</code> | Lists list at this module boundary. |
| `releaseLease` | method | <code>releaseLease(input: ExecutionLeaseReleaseRequest): Promise&lt;ExecutionRecord&gt;</code> | Public runtime operation for release Lease. |
| `renewLease` | method | <code>renewLease(input: ExecutionLeaseRenewRequest): Promise&lt;ExecutionRecord&gt;</code> | Public runtime operation for renew Lease. |
| `resolveIdempotency` | method | <code>resolveIdempotency(input: ExecutionIdempotencyQuery): Promise&lt;ExecutionIdempotencyResolution&gt;</code> | Resolves Idempotency at this module boundary. |
| `static schemaVersion` | property | <code>schemaVersion: 7</code> | Public schema Version property. |
