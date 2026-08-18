# `@codesoul-co/hypha-core` / `contracts/runtime-coordination`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-coordination.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)
- 导出数: **34**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_RESOURCE_CLAIM_MODES` | 常量 | <code>const RUNTIME_RESOURCE_CLAIM_MODES: readonly ["shared", "exclusive"]</code> | 由 `contracts/runtime-coordination` 模块导出的 RUNTIME RESOURCE CLAIM MODES 常量。 |
| `RUNTIME_RESOURCE_TYPES` | 常量 | <code>const RUNTIME_RESOURCE_TYPES: readonly ["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]</code> | 由 `contracts/runtime-coordination` 模块导出的 RUNTIME RESOURCE TYPES 常量。 |
| `STATE_EXECUTION_CLAIM_STATUSES` | 常量 | <code>const STATE_EXECUTION_CLAIM_STATUSES: readonly ["claimed", "completed", "released", "expired"]</code> | 由 `contracts/runtime-coordination` 模块导出的 STATE EXECUTION CLAIM STATUSES 常量。 |
| `FencedRunLease` | 接口 | <code>interface FencedRunLease extends RunLease</code> | Fenced Run Lease 的字段契约；完整字段见下表。 |
| `ResourceAcquireRequest` | 接口 | <code>interface ResourceAcquireRequest</code> | Resource Acquire Request 的字段契约；完整字段见下表。 |
| `ResourceClaimAssertionRequest` | 接口 | <code>interface ResourceClaimAssertionRequest extends ResourceListRequest</code> | Resource Claim Assertion Request 的字段契约；完整字段见下表。 |
| `ResourceListRequest` | 接口 | <code>interface ResourceListRequest</code> | Resource List Request 的字段契约；完整字段见下表。 |
| `ResourceReleaseRequest` | 接口 | <code>interface ResourceReleaseRequest</code> | Resource Release Request 的字段契约；完整字段见下表。 |
| `ResourceRenewRequest` | 接口 | <code>interface ResourceRenewRequest</code> | Resource Renew Request 的字段契约；完整字段见下表。 |
| `RunLease` | 接口 | <code>interface RunLease</code> | Run Lease 的字段契约；完整字段见下表。 |
| `RunLeaseAcquireRequest` | 接口 | <code>interface RunLeaseAcquireRequest extends RunLeaseScope</code> | Run Lease Acquire Request 的字段契约；完整字段见下表。 |
| `RunLeaseAssertionRequest` | 接口 | <code>interface RunLeaseAssertionRequest</code> | Run Lease Assertion Request 的字段契约；完整字段见下表。 |
| `RunLeaseAuthorization` | 接口 | <code>interface RunLeaseAuthorization</code> | Run Lease Authorization 的字段契约；完整字段见下表。 |
| `RunLeaseGuard` | 接口 | <code>interface RunLeaseGuard</code> | Run Lease Guard 的字段契约；完整字段见下表。 |
| `RunLeaseHeartbeatRequest` | 接口 | <code>interface RunLeaseHeartbeatRequest</code> | Run Lease Heartbeat Request 的字段契约；完整字段见下表。 |
| `RunLeasePreemptRequest` | 接口 | <code>interface RunLeasePreemptRequest extends RunLeaseAcquireRequest</code> | Run Lease Preempt Request 的字段契约；完整字段见下表。 |
| `RunLeaseReleaseRequest` | 接口 | <code>interface RunLeaseReleaseRequest</code> | Run Lease Release Request 的字段契约；完整字段见下表。 |
| `RunLeaseScope` | 接口 | <code>interface RunLeaseScope</code> | Run Lease Scope 的字段契约；完整字段见下表。 |
| `RunLeaseStore` | 接口 | <code>interface RunLeaseStore</code> | Run Lease Store 的字段契约；完整字段见下表。 |
| `RuntimeResourceClaim` | 接口 | <code>interface RuntimeResourceClaim</code> | Runtime Resource Claim 的字段契约；完整字段见下表。 |
| `RuntimeResourceCoordinator` | 接口 | <code>interface RuntimeResourceCoordinator</code> | Runtime Resource Coordinator 的字段契约；完整字段见下表。 |
| `RuntimeResourceRequest` | 接口 | <code>interface RuntimeResourceRequest</code> | Runtime Resource Request 的字段契约；完整字段见下表。 |
| `StateExecutionClaim` | 接口 | <code>interface StateExecutionClaim extends StateExecutionClaimScope</code> | State Execution Claim 的字段契约；完整字段见下表。 |
| `StateExecutionClaimAcquireRequest` | 接口 | <code>interface StateExecutionClaimAcquireRequest extends StateExecutionClaimScope</code> | State Execution Claim Acquire Request 的字段契约；完整字段见下表。 |
| `StateExecutionClaimAssertionRequest` | 接口 | <code>interface StateExecutionClaimAssertionRequest</code> | State Execution Claim Assertion Request 的字段契约；完整字段见下表。 |
| `StateExecutionClaimCompleteRequest` | 接口 | <code>interface StateExecutionClaimCompleteRequest</code> | State Execution Claim Complete Request 的字段契约；完整字段见下表。 |
| `StateExecutionClaimGuard` | 接口 | <code>interface StateExecutionClaimGuard</code> | State Execution Claim Guard 的字段契约；完整字段见下表。 |
| `StateExecutionClaimReleaseRequest` | 接口 | <code>interface StateExecutionClaimReleaseRequest</code> | State Execution Claim Release Request 的字段契约；完整字段见下表。 |
| `StateExecutionClaimRenewRequest` | 接口 | <code>interface StateExecutionClaimRenewRequest</code> | State Execution Claim Renew Request 的字段契约；完整字段见下表。 |
| `StateExecutionClaimScope` | 接口 | <code>interface StateExecutionClaimScope</code> | State Execution Claim Scope 的字段契约；完整字段见下表。 |
| `StateExecutionClaimStore` | 接口 | <code>interface StateExecutionClaimStore</code> | State Execution Claim Store 的字段契约；完整字段见下表。 |
| `RuntimeResourceClaimMode` | 类型 | <code>type RuntimeResourceClaimMode = (typeof RUNTIME_RESOURCE_CLAIM_MODES)[number]</code> | Runtime Resource Claim Mode 的公共类型别名。 |
| `RuntimeResourceType` | 类型 | <code>type RuntimeResourceType = (typeof RUNTIME_RESOURCE_TYPES)[number]</code> | Runtime Resource Type 的公共类型别名。 |
| `StateExecutionClaimStatus` | 类型 | <code>type StateExecutionClaimStatus = (typeof STATE_EXECUTION_CLAIM_STATUSES)[number]</code> | State Execution Claim Status 的公共类型别名。 |

## `FencedRunLease` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | acquired At 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `heartbeatAt` | 属性 | <code>heartbeatAt: string</code> | heartbeat At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | partition Key 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `ResourceAcquireRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | acquired At 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `resources` | 属性 | <code>resources: RuntimeResourceRequest[]</code> | resources 字段。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | run Lease 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |

## `ResourceClaimAssertionRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | checked At 字段。 |
| `claimId` | 属性 | <code>claimId: string</code> | claim Id 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `resourceKey` | 属性 | <code>resourceKey: string</code> | resource Key 字段。 |
| `resourceType` | 属性 | <code>resourceType: "artifact" &#124; "workspace" &#124; "custom" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"</code> | resource Type 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |

## `ResourceListRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | checked At 字段。 |
| `resourceKey` | 属性 | <code>resourceKey: string</code> | resource Key 字段。 |
| `resourceType` | 属性 | <code>resourceType: "artifact" &#124; "workspace" &#124; "custom" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"</code> | resource Type 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |

## `ResourceReleaseRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimIds` | 属性 | <code>claimIds: string[]</code> | claim Ids 字段。 |
| `releasedAt` | 属性 | <code>releasedAt: string</code> | released At 字段。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | run Lease 字段。 |

## `ResourceRenewRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimIds` | 属性 | <code>claimIds: string[]</code> | claim Ids 字段。 |
| `renewedAt` | 属性 | <code>renewedAt: string</code> | renewed At 字段。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | run Lease 字段。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |

## `RunLease` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | acquired At 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `heartbeatAt` | 属性 | <code>heartbeatAt: string</code> | heartbeat At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `RunLeaseAcquireRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | acquired At 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | partition Key 字段。 |
| `requestedLeaseId` | 属性 | <code>requestedLeaseId: string</code> | requested Lease Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `RunLeaseAssertionRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | checked At 字段。 |
| `guard` | 属性 | <code>guard: RunLeaseGuard</code> | guard 字段。 |
| `scope` | 属性 | <code>scope: RunLeaseScope</code> | scope 字段。 |

## `RunLeaseAuthorization` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guard` | 属性 | <code>guard: RunLeaseGuard</code> | guard 字段。 |
| `scope` | 属性 | <code>scope: RunLeaseScope</code> | scope 字段。 |

## `RunLeaseGuard` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `leaseId` | 属性 | <code>leaseId: string</code> | lease Id 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |

## `RunLeaseHeartbeatRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guard` | 属性 | <code>guard: RunLeaseGuard</code> | guard 字段。 |
| `heartbeatAt` | 属性 | <code>heartbeatAt: string</code> | heartbeat At 字段。 |
| `scope` | 属性 | <code>scope: RunLeaseScope</code> | scope 字段。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |

## `RunLeasePreemptRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | acquired At 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | partition Key 字段。 |
| `reason` | 属性 | <code>reason: "cancellation"</code> | reason 字段。 |
| `requestedLeaseId` | 属性 | <code>requestedLeaseId: string</code> | requested Lease Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `RunLeaseReleaseRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guard` | 属性 | <code>guard: RunLeaseGuard</code> | guard 字段。 |
| `releasedAt` | 属性 | <code>releasedAt: string</code> | released At 字段。 |
| `scope` | 属性 | <code>scope: RunLeaseScope</code> | scope 字段。 |

## `RunLeaseScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | partition Key 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `RunLeaseStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: RunLeaseAcquireRequest): Promise&lt;FencedRunLease &#124; null&gt;</code> | acquire 的公开运行时操作。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: RunLeaseAssertionRequest): Promise&lt;FencedRunLease&gt;</code> | 断言 Current。 |
| `get` | 方法 | <code>get(scope: RunLeaseScope, checkedAt?: string): Promise&lt;FencedRunLease &#124; null&gt;</code> | 读取 get。 |
| `heartbeat` | 方法 | <code>heartbeat(request: RunLeaseHeartbeatRequest): Promise&lt;FencedRunLease&gt;</code> | heartbeat 的公开运行时操作。 |
| `preempt` | 方法 | <code>preempt(request: RunLeasePreemptRequest): Promise&lt;FencedRunLease&gt;</code> | preempt 的公开运行时操作。 |
| `release` | 方法 | <code>release(request: RunLeaseReleaseRequest): Promise&lt;void&gt;</code> | release 的公开运行时操作。 |

## `RuntimeResourceClaim` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | acquired At 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `mode` | 属性 | <code>mode: "shared" &#124; "exclusive"</code> | mode 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `resourceKey` | 属性 | <code>resourceKey: string</code> | resource Key 字段。 |
| `resourceType` | 属性 | <code>resourceType: "artifact" &#124; "workspace" &#124; "custom" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"</code> | resource Type 字段。 |
| `runFencingToken` | 属性 | <code>runFencingToken: number</code> | run Fencing Token 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `RuntimeResourceCoordinator` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: ResourceAcquireRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | acquire 的公开运行时操作。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: ResourceClaimAssertionRequest): Promise&lt;RuntimeResourceClaim&gt;</code> | 断言 Current。 |
| `list` | 方法 | <code>list(request: ResourceListRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | 列出 list。 |
| `release` | 方法 | <code>release(request: ResourceReleaseRequest): Promise&lt;void&gt;</code> | release 的公开运行时操作。 |
| `renew` | 方法 | <code>renew(request: ResourceRenewRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | renew 的公开运行时操作。 |

## `RuntimeResourceRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `mode` | 属性 | <code>mode: "shared" &#124; "exclusive"</code> | mode 字段。 |
| `requestedClaimId` | 属性 | <code>requestedClaimId: string</code> | requested Claim Id 字段。 |
| `resourceKey` | 属性 | <code>resourceKey: string</code> | resource Key 字段。 |
| `resourceType` | 属性 | <code>resourceType: "artifact" &#124; "workspace" &#124; "custom" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"</code> | resource Type 字段。 |

## `StateExecutionClaim` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | acquired At 字段。 |
| `claimId` | 属性 | <code>claimId: string</code> | claim Id 字段。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `expectedRunRevision` | 属性 | <code>expectedRunRevision: number</code> | expected Run Revision 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `processRevision` | 属性 | <code>processRevision: string</code> | process Revision 字段。 |
| `releasedAt` | 属性 | <code>releasedAt: string</code> | released At 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | state Attempt 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `status` | 属性 | <code>status: "completed" &#124; "expired" &#124; "claimed" &#124; "released"</code> | status 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `StateExecutionClaimAcquireRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | acquired At 字段。 |
| `expectedRunRevision` | 属性 | <code>expectedRunRevision: number</code> | expected Run Revision 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `processRevision` | 属性 | <code>processRevision: string</code> | process Revision 字段。 |
| `requestedClaimId` | 属性 | <code>requestedClaimId: string</code> | requested Claim Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | run Lease 字段。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | state Attempt 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `StateExecutionClaimAssertionRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | checked At 字段。 |
| `guard` | 属性 | <code>guard: StateExecutionClaimGuard</code> | guard 字段。 |
| `scope` | 属性 | <code>scope: StateExecutionClaimScope</code> | scope 字段。 |

## `StateExecutionClaimCompleteRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `guard` | 属性 | <code>guard: StateExecutionClaimGuard</code> | guard 字段。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | run Lease 字段。 |
| `scope` | 属性 | <code>scope: StateExecutionClaimScope</code> | scope 字段。 |

## `StateExecutionClaimGuard` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimId` | 属性 | <code>claimId: string</code> | claim Id 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |

## `StateExecutionClaimReleaseRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guard` | 属性 | <code>guard: StateExecutionClaimGuard</code> | guard 字段。 |
| `releasedAt` | 属性 | <code>releasedAt: string</code> | released At 字段。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | run Lease 字段。 |
| `scope` | 属性 | <code>scope: StateExecutionClaimScope</code> | scope 字段。 |

## `StateExecutionClaimRenewRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guard` | 属性 | <code>guard: StateExecutionClaimGuard</code> | guard 字段。 |
| `renewedAt` | 属性 | <code>renewedAt: string</code> | renewed At 字段。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | run Lease 字段。 |
| `scope` | 属性 | <code>scope: StateExecutionClaimScope</code> | scope 字段。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |

## `StateExecutionClaimScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | state Attempt 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `StateExecutionClaimStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: StateExecutionClaimAcquireRequest): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | acquire 的公开运行时操作。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: StateExecutionClaimAssertionRequest): Promise&lt;StateExecutionClaim&gt;</code> | 断言 Current。 |
| `complete` | 方法 | <code>complete(request: StateExecutionClaimCompleteRequest): Promise&lt;StateExecutionClaim&gt;</code> | complete 的公开运行时操作。 |
| `get` | 方法 | <code>get(scope: StateExecutionClaimScope, checkedAt?: string): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | 读取 get。 |
| `release` | 方法 | <code>release(request: StateExecutionClaimReleaseRequest): Promise&lt;StateExecutionClaim&gt;</code> | release 的公开运行时操作。 |
| `renew` | 方法 | <code>renew(request: StateExecutionClaimRenewRequest): Promise&lt;StateExecutionClaim&gt;</code> | renew 的公开运行时操作。 |
