# `@codesoul-co/hypha-core` / `contracts/execution-store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/execution-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)
- Exports: **16**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExecutionIdempotencyQuery` | interface | <code>interface ExecutionIdempotencyQuery</code> | Field contract for Execution Idempotency Query; see all contract members below. |
| `ExecutionLease` | interface | <code>interface ExecutionLease</code> | Field contract for Execution Lease; see all contract members below. |
| `ExecutionLeaseAcquireRequest` | interface | <code>interface ExecutionLeaseAcquireRequest</code> | Field contract for Execution Lease Acquire Request; see all contract members below. |
| `ExecutionLeaseGuard` | interface | <code>interface ExecutionLeaseGuard</code> | Field contract for Execution Lease Guard; see all contract members below. |
| `ExecutionLeaseReleaseRequest` | interface | <code>interface ExecutionLeaseReleaseRequest</code> | Field contract for Execution Lease Release Request; see all contract members below. |
| `ExecutionLeaseRenewRequest` | interface | <code>interface ExecutionLeaseRenewRequest</code> | Field contract for Execution Lease Renew Request; see all contract members below. |
| `ExecutionRecord` | interface | <code>interface ExecutionRecord</code> | Field contract for Execution Record; see all contract members below. |
| `ExecutionRecordCompareAndSetRequest` | interface | <code>interface ExecutionRecordCompareAndSetRequest</code> | Field contract for Execution Record Compare And Set Request; see all contract members below. |
| `ExecutionRecordCreateRequest` | interface | <code>interface ExecutionRecordCreateRequest</code> | Field contract for Execution Record Create Request; see all contract members below. |
| `ExecutionRecordPage` | interface | <code>interface ExecutionRecordPage</code> | Field contract for Execution Record Page; see all contract members below. |
| `ExecutionRecordQuery` | interface | <code>interface ExecutionRecordQuery</code> | Field contract for Execution Record Query; see all contract members below. |
| `ExecutionRecoveryAssessment` | interface | <code>interface ExecutionRecoveryAssessment</code> | Field contract for Execution Recovery Assessment; see all contract members below. |
| `ExecutionStore` | interface | <code>interface ExecutionStore</code> | Field contract for Execution Store; see all contract members below. |
| `ExecutionStoreFactory` | interface | <code>interface ExecutionStoreFactory</code> | Field contract for Execution Store Factory; see all contract members below. |
| `ExecutionIdempotencyResolution` | type | <code>type ExecutionIdempotencyResolution = { status: 'miss'; } &#124; { status: 'match'; record: ExecutionRecord; } &#124; { status: 'conflict'; recordId: string; existingFingerprint: string; }</code> | Public type alias for Execution Idempotency Resolution. |
| `ExecutionRecoveryDisposition` | type | <code>type ExecutionRecoveryDisposition = 'not_started' &#124; 'provider_queryable' &#124; 'provider_completed_result_missing' &#124; 'provider_state_unknown'</code> | Public type alias for Execution Recovery Disposition. |

## `ExecutionIdempotencyQuery` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fingerprint` | property | <code>fingerprint: string</code> | Public fingerprint property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ExecutionLease` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public acquired At property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `heartbeatAt` | property | <code>heartbeatAt: string</code> | Public heartbeat At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |

## `ExecutionLeaseAcquireRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public acquired At property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public expected Revision property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `requestedLeaseId` | property | <code>requestedLeaseId: string</code> | Public requested Lease Id property. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |

## `ExecutionLeaseGuard` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `leaseId` | property | <code>leaseId: string</code> | Public lease Id property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |

## `ExecutionLeaseReleaseRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public expected Revision property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `leaseGuard` | property | <code>leaseGuard: ExecutionLeaseGuard</code> | Public lease Guard property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `releasedAt` | property | <code>releasedAt: string</code> | Public released At property. |

## `ExecutionLeaseRenewRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public expected Revision property. |
| `heartbeatAt` | property | <code>heartbeatAt: string</code> | Public heartbeat At property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `leaseGuard` | property | <code>leaseGuard: ExecutionLeaseGuard</code> | Public lease Guard property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |

## `ExecutionRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt: number</code> | Public attempt property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `idempotencyFingerprint` | property | <code>idempotencyFingerprint: string</code> | Public idempotency Fingerprint property. |
| `lease` | property | <code>lease: ExecutionLease</code> | Public lease property. |
| `providerExecutionRef` | property | <code>providerExecutionRef: string</code> | Public provider Execution Ref property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `request` | property | <code>request: CommandExecutionRequest</code> | Public request property. |
| `result` | property | <code>result: CommandExecutionResult</code> | Public result property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |
| `status` | property | <code>status: CommandExecutionStatus</code> | Public status property. |
| `terminalReceipt` | property | <code>terminalReceipt: ExecutionReceipt</code> | Immutable Provider terminal evidence persisted before Artifact finalization and terminal CAS. Once present, Store implementations must reject removal or replacement. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `ExecutionRecordCompareAndSetRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public expected Revision property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `leaseGuard` | property | <code>leaseGuard: ExecutionLeaseGuard</code> | Public lease Guard property. |
| `next` | property | <code>next: ExecutionRecord</code> | Public next property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |

## `ExecutionRecordCreateRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `record` | property | <code>record: ExecutionRecord</code> | Public record property. |

## `ExecutionRecordPage` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cursor` | property | <code>cursor: string</code> | Public cursor property. |
| `records` | property | <code>records: ExecutionRecord[]</code> | Public records property. |

## `ExecutionRecordQuery` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cursor` | property | <code>cursor: string</code> | Public cursor property. |
| `leaseExpiresBefore` | property | <code>leaseExpiresBefore: string</code> | Public lease Expires Before property. |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `statuses` | property | <code>statuses: CommandExecutionStatus[]</code> | Public statuses property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `updatedBefore` | property | <code>updatedBefore: string</code> | Public updated Before property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ExecutionRecoveryAssessment` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assessedAt` | property | <code>assessedAt: string</code> | Public assessed At property. |
| `disposition` | property | <code>disposition: ExecutionRecoveryDisposition</code> | Public disposition property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `providerStatusRef` | property | <code>providerStatusRef: string</code> | Public provider Status Ref property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `recordRevision` | property | <code>recordRevision: number</code> | Public record Revision property. |

## `ExecutionStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquireLease` | method | <code>acquireLease(request: ExecutionLeaseAcquireRequest): Promise&lt;ExecutionRecord&gt;</code> | Public runtime operation for acquire Lease. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `compareAndSet` | method | <code>compareAndSet(request: ExecutionRecordCompareAndSetRequest): Promise&lt;ExecutionRecord&gt;</code> | Public runtime operation for compare And Set. |
| `create` | method | <code>create(request: ExecutionRecordCreateRequest): Promise&lt;ExecutionRecord&gt;</code> | Creates create at this module boundary. |
| `get` | method | <code>get(executionId: string): Promise&lt;ExecutionRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `list` | method | <code>list(query?: ExecutionRecordQuery): Promise&lt;ExecutionRecordPage&gt;</code> | Lists list at this module boundary. |
| `releaseLease` | method | <code>releaseLease(request: ExecutionLeaseReleaseRequest): Promise&lt;ExecutionRecord&gt;</code> | Public runtime operation for release Lease. |
| `renewLease` | method | <code>renewLease(request: ExecutionLeaseRenewRequest): Promise&lt;ExecutionRecord&gt;</code> | Public runtime operation for renew Lease. |
| `resolveIdempotency` | method | <code>resolveIdempotency(query: ExecutionIdempotencyQuery): Promise&lt;ExecutionIdempotencyResolution&gt;</code> | Resolves Idempotency at this module boundary. |

## `ExecutionStoreFactory` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(): Promise&lt;ExecutionStore&gt;</code> | Creates create at this module boundary. |
| `storeId` | property | <code>storeId: string</code> | Public store Id property. |
