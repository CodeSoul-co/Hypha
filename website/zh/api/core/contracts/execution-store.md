# `@codesoul-co/hypha-core` / `contracts/execution-store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/execution-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)
- 导出数: **16**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExecutionIdempotencyQuery` | 接口 | <code>interface ExecutionIdempotencyQuery</code> | Execution Idempotency Query 的字段契约；完整字段见下表。 |
| `ExecutionLease` | 接口 | <code>interface ExecutionLease</code> | Execution Lease 的字段契约；完整字段见下表。 |
| `ExecutionLeaseAcquireRequest` | 接口 | <code>interface ExecutionLeaseAcquireRequest</code> | Execution Lease Acquire Request 的字段契约；完整字段见下表。 |
| `ExecutionLeaseGuard` | 接口 | <code>interface ExecutionLeaseGuard</code> | Execution Lease Guard 的字段契约；完整字段见下表。 |
| `ExecutionLeaseReleaseRequest` | 接口 | <code>interface ExecutionLeaseReleaseRequest</code> | Execution Lease Release Request 的字段契约；完整字段见下表。 |
| `ExecutionLeaseRenewRequest` | 接口 | <code>interface ExecutionLeaseRenewRequest</code> | Execution Lease Renew Request 的字段契约；完整字段见下表。 |
| `ExecutionRecord` | 接口 | <code>interface ExecutionRecord</code> | Execution Record 的字段契约；完整字段见下表。 |
| `ExecutionRecordCompareAndSetRequest` | 接口 | <code>interface ExecutionRecordCompareAndSetRequest</code> | Execution Record Compare And Set Request 的字段契约；完整字段见下表。 |
| `ExecutionRecordCreateRequest` | 接口 | <code>interface ExecutionRecordCreateRequest</code> | Execution Record Create Request 的字段契约；完整字段见下表。 |
| `ExecutionRecordPage` | 接口 | <code>interface ExecutionRecordPage</code> | Execution Record Page 的字段契约；完整字段见下表。 |
| `ExecutionRecordQuery` | 接口 | <code>interface ExecutionRecordQuery</code> | Execution Record Query 的字段契约；完整字段见下表。 |
| `ExecutionRecoveryAssessment` | 接口 | <code>interface ExecutionRecoveryAssessment</code> | Execution Recovery Assessment 的字段契约；完整字段见下表。 |
| `ExecutionStore` | 接口 | <code>interface ExecutionStore</code> | Execution Store 的字段契约；完整字段见下表。 |
| `ExecutionStoreFactory` | 接口 | <code>interface ExecutionStoreFactory</code> | Execution Store Factory 的字段契约；完整字段见下表。 |
| `ExecutionIdempotencyResolution` | 类型 | <code>type ExecutionIdempotencyResolution = { status: 'miss'; } &#124; { status: 'match'; record: ExecutionRecord; } &#124; { status: 'conflict'; recordId: string; existingFingerprint: string; }</code> | Execution Idempotency Resolution 的公共类型别名。 |
| `ExecutionRecoveryDisposition` | 类型 | <code>type ExecutionRecoveryDisposition = 'not_started' &#124; 'provider_queryable' &#124; 'provider_completed_result_missing' &#124; 'provider_state_unknown'</code> | Execution Recovery Disposition 的公共类型别名。 |

## `ExecutionIdempotencyQuery` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fingerprint` | 属性 | <code>fingerprint: string</code> | fingerprint 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ExecutionLease` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | acquired At 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `heartbeatAt` | 属性 | <code>heartbeatAt: string</code> | heartbeat At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |

## `ExecutionLeaseAcquireRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | acquired At 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | expected Revision 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `requestedLeaseId` | 属性 | <code>requestedLeaseId: string</code> | requested Lease Id 字段。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |

## `ExecutionLeaseGuard` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `leaseId` | 属性 | <code>leaseId: string</code> | lease Id 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |

## `ExecutionLeaseReleaseRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | expected Revision 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `leaseGuard` | 属性 | <code>leaseGuard: ExecutionLeaseGuard</code> | lease Guard 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `releasedAt` | 属性 | <code>releasedAt: string</code> | released At 字段。 |

## `ExecutionLeaseRenewRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | expected Revision 字段。 |
| `heartbeatAt` | 属性 | <code>heartbeatAt: string</code> | heartbeat At 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `leaseGuard` | 属性 | <code>leaseGuard: ExecutionLeaseGuard</code> | lease Guard 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |

## `ExecutionRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt: number</code> | attempt 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `idempotencyFingerprint` | 属性 | <code>idempotencyFingerprint: string</code> | idempotency Fingerprint 字段。 |
| `lease` | 属性 | <code>lease: ExecutionLease</code> | lease 字段。 |
| `providerExecutionRef` | 属性 | <code>providerExecutionRef: string</code> | provider Execution Ref 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `request` | 属性 | <code>request: CommandExecutionRequest</code> | request 字段。 |
| `result` | 属性 | <code>result: CommandExecutionResult</code> | result 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |
| `status` | 属性 | <code>status: CommandExecutionStatus</code> | status 字段。 |
| `terminalReceipt` | 属性 | <code>terminalReceipt: ExecutionReceipt</code> | Immutable Provider terminal evidence persisted before Artifact finalization and terminal CAS. Once present, Store implementations must reject removal or replacement. |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `ExecutionRecordCompareAndSetRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | expected Revision 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `leaseGuard` | 属性 | <code>leaseGuard: ExecutionLeaseGuard</code> | lease Guard 字段。 |
| `next` | 属性 | <code>next: ExecutionRecord</code> | next 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |

## `ExecutionRecordCreateRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `record` | 属性 | <code>record: ExecutionRecord</code> | record 字段。 |

## `ExecutionRecordPage` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cursor` | 属性 | <code>cursor: string</code> | cursor 字段。 |
| `records` | 属性 | <code>records: ExecutionRecord[]</code> | records 字段。 |

## `ExecutionRecordQuery` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cursor` | 属性 | <code>cursor: string</code> | cursor 字段。 |
| `leaseExpiresBefore` | 属性 | <code>leaseExpiresBefore: string</code> | lease Expires Before 字段。 |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `statuses` | 属性 | <code>statuses: CommandExecutionStatus[]</code> | statuses 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `updatedBefore` | 属性 | <code>updatedBefore: string</code> | updated Before 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ExecutionRecoveryAssessment` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assessedAt` | 属性 | <code>assessedAt: string</code> | assessed At 字段。 |
| `disposition` | 属性 | <code>disposition: ExecutionRecoveryDisposition</code> | disposition 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `providerStatusRef` | 属性 | <code>providerStatusRef: string</code> | provider Status Ref 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `recordRevision` | 属性 | <code>recordRevision: number</code> | record Revision 字段。 |

## `ExecutionStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquireLease` | 方法 | <code>acquireLease(request: ExecutionLeaseAcquireRequest): Promise&lt;ExecutionRecord&gt;</code> | acquire Lease 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `compareAndSet` | 方法 | <code>compareAndSet(request: ExecutionRecordCompareAndSetRequest): Promise&lt;ExecutionRecord&gt;</code> | compare And Set 的公开运行时操作。 |
| `create` | 方法 | <code>create(request: ExecutionRecordCreateRequest): Promise&lt;ExecutionRecord&gt;</code> | 创建 create。 |
| `get` | 方法 | <code>get(executionId: string): Promise&lt;ExecutionRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `list` | 方法 | <code>list(query?: ExecutionRecordQuery): Promise&lt;ExecutionRecordPage&gt;</code> | 列出 list。 |
| `releaseLease` | 方法 | <code>releaseLease(request: ExecutionLeaseReleaseRequest): Promise&lt;ExecutionRecord&gt;</code> | release Lease 的公开运行时操作。 |
| `renewLease` | 方法 | <code>renewLease(request: ExecutionLeaseRenewRequest): Promise&lt;ExecutionRecord&gt;</code> | renew Lease 的公开运行时操作。 |
| `resolveIdempotency` | 方法 | <code>resolveIdempotency(query: ExecutionIdempotencyQuery): Promise&lt;ExecutionIdempotencyResolution&gt;</code> | 解析 Idempotency。 |

## `ExecutionStoreFactory` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(): Promise&lt;ExecutionStore&gt;</code> | 创建 create。 |
| `storeId` | 属性 | <code>storeId: string</code> | store Id 字段。 |
