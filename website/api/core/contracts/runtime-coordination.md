# `@codesoul-co/hypha-core` / `contracts/runtime-coordination`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-coordination.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)
- Exports: **34**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_RESOURCE_CLAIM_MODES` | constant | <code>const RUNTIME_RESOURCE_CLAIM_MODES: readonly ["shared", "exclusive"]</code> | RUNTIME RESOURCE CLAIM MODES constant exported by the `contracts/runtime-coordination` module. |
| `RUNTIME_RESOURCE_TYPES` | constant | <code>const RUNTIME_RESOURCE_TYPES: readonly ["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]</code> | RUNTIME RESOURCE TYPES constant exported by the `contracts/runtime-coordination` module. |
| `STATE_EXECUTION_CLAIM_STATUSES` | constant | <code>const STATE_EXECUTION_CLAIM_STATUSES: readonly ["claimed", "completed", "released", "expired"]</code> | STATE EXECUTION CLAIM STATUSES constant exported by the `contracts/runtime-coordination` module. |
| `FencedRunLease` | interface | <code>interface FencedRunLease extends RunLease</code> | Field contract for Fenced Run Lease; see all contract members below. |
| `ResourceAcquireRequest` | interface | <code>interface ResourceAcquireRequest</code> | Field contract for Resource Acquire Request; see all contract members below. |
| `ResourceClaimAssertionRequest` | interface | <code>interface ResourceClaimAssertionRequest extends ResourceListRequest</code> | Field contract for Resource Claim Assertion Request; see all contract members below. |
| `ResourceListRequest` | interface | <code>interface ResourceListRequest</code> | Field contract for Resource List Request; see all contract members below. |
| `ResourceReleaseRequest` | interface | <code>interface ResourceReleaseRequest</code> | Field contract for Resource Release Request; see all contract members below. |
| `ResourceRenewRequest` | interface | <code>interface ResourceRenewRequest</code> | Field contract for Resource Renew Request; see all contract members below. |
| `RunLease` | interface | <code>interface RunLease</code> | Field contract for Run Lease; see all contract members below. |
| `RunLeaseAcquireRequest` | interface | <code>interface RunLeaseAcquireRequest extends RunLeaseScope</code> | Field contract for Run Lease Acquire Request; see all contract members below. |
| `RunLeaseAssertionRequest` | interface | <code>interface RunLeaseAssertionRequest</code> | Field contract for Run Lease Assertion Request; see all contract members below. |
| `RunLeaseAuthorization` | interface | <code>interface RunLeaseAuthorization</code> | Field contract for Run Lease Authorization; see all contract members below. |
| `RunLeaseGuard` | interface | <code>interface RunLeaseGuard</code> | Field contract for Run Lease Guard; see all contract members below. |
| `RunLeaseHeartbeatRequest` | interface | <code>interface RunLeaseHeartbeatRequest</code> | Field contract for Run Lease Heartbeat Request; see all contract members below. |
| `RunLeasePreemptRequest` | interface | <code>interface RunLeasePreemptRequest extends RunLeaseAcquireRequest</code> | Field contract for Run Lease Preempt Request; see all contract members below. |
| `RunLeaseReleaseRequest` | interface | <code>interface RunLeaseReleaseRequest</code> | Field contract for Run Lease Release Request; see all contract members below. |
| `RunLeaseScope` | interface | <code>interface RunLeaseScope</code> | Field contract for Run Lease Scope; see all contract members below. |
| `RunLeaseStore` | interface | <code>interface RunLeaseStore</code> | Field contract for Run Lease Store; see all contract members below. |
| `RuntimeResourceClaim` | interface | <code>interface RuntimeResourceClaim</code> | Field contract for Runtime Resource Claim; see all contract members below. |
| `RuntimeResourceCoordinator` | interface | <code>interface RuntimeResourceCoordinator</code> | Field contract for Runtime Resource Coordinator; see all contract members below. |
| `RuntimeResourceRequest` | interface | <code>interface RuntimeResourceRequest</code> | Field contract for Runtime Resource Request; see all contract members below. |
| `StateExecutionClaim` | interface | <code>interface StateExecutionClaim extends StateExecutionClaimScope</code> | Field contract for State Execution Claim; see all contract members below. |
| `StateExecutionClaimAcquireRequest` | interface | <code>interface StateExecutionClaimAcquireRequest extends StateExecutionClaimScope</code> | Field contract for State Execution Claim Acquire Request; see all contract members below. |
| `StateExecutionClaimAssertionRequest` | interface | <code>interface StateExecutionClaimAssertionRequest</code> | Field contract for State Execution Claim Assertion Request; see all contract members below. |
| `StateExecutionClaimCompleteRequest` | interface | <code>interface StateExecutionClaimCompleteRequest</code> | Field contract for State Execution Claim Complete Request; see all contract members below. |
| `StateExecutionClaimGuard` | interface | <code>interface StateExecutionClaimGuard</code> | Field contract for State Execution Claim Guard; see all contract members below. |
| `StateExecutionClaimReleaseRequest` | interface | <code>interface StateExecutionClaimReleaseRequest</code> | Field contract for State Execution Claim Release Request; see all contract members below. |
| `StateExecutionClaimRenewRequest` | interface | <code>interface StateExecutionClaimRenewRequest</code> | Field contract for State Execution Claim Renew Request; see all contract members below. |
| `StateExecutionClaimScope` | interface | <code>interface StateExecutionClaimScope</code> | Field contract for State Execution Claim Scope; see all contract members below. |
| `StateExecutionClaimStore` | interface | <code>interface StateExecutionClaimStore</code> | Field contract for State Execution Claim Store; see all contract members below. |
| `RuntimeResourceClaimMode` | type | <code>type RuntimeResourceClaimMode = (typeof RUNTIME_RESOURCE_CLAIM_MODES)[number]</code> | Public type alias for Runtime Resource Claim Mode. |
| `RuntimeResourceType` | type | <code>type RuntimeResourceType = (typeof RUNTIME_RESOURCE_TYPES)[number]</code> | Public type alias for Runtime Resource Type. |
| `StateExecutionClaimStatus` | type | <code>type StateExecutionClaimStatus = (typeof STATE_EXECUTION_CLAIM_STATUSES)[number]</code> | Public type alias for State Execution Claim Status. |

## `FencedRunLease` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public acquired At property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `heartbeatAt` | property | <code>heartbeatAt: string</code> | Public heartbeat At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `partitionKey` | property | <code>partitionKey: string</code> | Public partition Key property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `ResourceAcquireRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public acquired At property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `resources` | property | <code>resources: RuntimeResourceRequest[]</code> | Public resources property. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public run Lease property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |

## `ResourceClaimAssertionRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public checked At property. |
| `claimId` | property | <code>claimId: string</code> | Public claim Id property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `resourceKey` | property | <code>resourceKey: string</code> | Public resource Key property. |
| `resourceType` | property | <code>resourceType: "artifact" &#124; "workspace" &#124; "custom" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"</code> | Public resource Type property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |

## `ResourceListRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public checked At property. |
| `resourceKey` | property | <code>resourceKey: string</code> | Public resource Key property. |
| `resourceType` | property | <code>resourceType: "artifact" &#124; "workspace" &#124; "custom" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"</code> | Public resource Type property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |

## `ResourceReleaseRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimIds` | property | <code>claimIds: string[]</code> | Public claim Ids property. |
| `releasedAt` | property | <code>releasedAt: string</code> | Public released At property. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public run Lease property. |

## `ResourceRenewRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimIds` | property | <code>claimIds: string[]</code> | Public claim Ids property. |
| `renewedAt` | property | <code>renewedAt: string</code> | Public renewed At property. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public run Lease property. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |

## `RunLease` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public acquired At property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `heartbeatAt` | property | <code>heartbeatAt: string</code> | Public heartbeat At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `RunLeaseAcquireRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public acquired At property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `partitionKey` | property | <code>partitionKey: string</code> | Public partition Key property. |
| `requestedLeaseId` | property | <code>requestedLeaseId: string</code> | Public requested Lease Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `RunLeaseAssertionRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public checked At property. |
| `guard` | property | <code>guard: RunLeaseGuard</code> | Public guard property. |
| `scope` | property | <code>scope: RunLeaseScope</code> | Public scope property. |

## `RunLeaseAuthorization` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guard` | property | <code>guard: RunLeaseGuard</code> | Public guard property. |
| `scope` | property | <code>scope: RunLeaseScope</code> | Public scope property. |

## `RunLeaseGuard` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `leaseId` | property | <code>leaseId: string</code> | Public lease Id property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |

## `RunLeaseHeartbeatRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guard` | property | <code>guard: RunLeaseGuard</code> | Public guard property. |
| `heartbeatAt` | property | <code>heartbeatAt: string</code> | Public heartbeat At property. |
| `scope` | property | <code>scope: RunLeaseScope</code> | Public scope property. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |

## `RunLeasePreemptRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public acquired At property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `partitionKey` | property | <code>partitionKey: string</code> | Public partition Key property. |
| `reason` | property | <code>reason: "cancellation"</code> | Public reason property. |
| `requestedLeaseId` | property | <code>requestedLeaseId: string</code> | Public requested Lease Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `RunLeaseReleaseRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guard` | property | <code>guard: RunLeaseGuard</code> | Public guard property. |
| `releasedAt` | property | <code>releasedAt: string</code> | Public released At property. |
| `scope` | property | <code>scope: RunLeaseScope</code> | Public scope property. |

## `RunLeaseScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `partitionKey` | property | <code>partitionKey: string</code> | Public partition Key property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `RunLeaseStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: RunLeaseAcquireRequest): Promise&lt;FencedRunLease &#124; null&gt;</code> | Public runtime operation for acquire. |
| `assertCurrent` | method | <code>assertCurrent(request: RunLeaseAssertionRequest): Promise&lt;FencedRunLease&gt;</code> | Asserts Current at this module boundary. |
| `get` | method | <code>get(scope: RunLeaseScope, checkedAt?: string): Promise&lt;FencedRunLease &#124; null&gt;</code> | Gets get at this module boundary. |
| `heartbeat` | method | <code>heartbeat(request: RunLeaseHeartbeatRequest): Promise&lt;FencedRunLease&gt;</code> | Public runtime operation for heartbeat. |
| `preempt` | method | <code>preempt(request: RunLeasePreemptRequest): Promise&lt;FencedRunLease&gt;</code> | Public runtime operation for preempt. |
| `release` | method | <code>release(request: RunLeaseReleaseRequest): Promise&lt;void&gt;</code> | Public runtime operation for release. |

## `RuntimeResourceClaim` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public acquired At property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `mode` | property | <code>mode: "shared" &#124; "exclusive"</code> | Public mode property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `resourceKey` | property | <code>resourceKey: string</code> | Public resource Key property. |
| `resourceType` | property | <code>resourceType: "artifact" &#124; "workspace" &#124; "custom" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"</code> | Public resource Type property. |
| `runFencingToken` | property | <code>runFencingToken: number</code> | Public run Fencing Token property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `RuntimeResourceCoordinator` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: ResourceAcquireRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public runtime operation for acquire. |
| `assertCurrent` | method | <code>assertCurrent(request: ResourceClaimAssertionRequest): Promise&lt;RuntimeResourceClaim&gt;</code> | Asserts Current at this module boundary. |
| `list` | method | <code>list(request: ResourceListRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Lists list at this module boundary. |
| `release` | method | <code>release(request: ResourceReleaseRequest): Promise&lt;void&gt;</code> | Public runtime operation for release. |
| `renew` | method | <code>renew(request: ResourceRenewRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public runtime operation for renew. |

## `RuntimeResourceRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `mode` | property | <code>mode: "shared" &#124; "exclusive"</code> | Public mode property. |
| `requestedClaimId` | property | <code>requestedClaimId: string</code> | Public requested Claim Id property. |
| `resourceKey` | property | <code>resourceKey: string</code> | Public resource Key property. |
| `resourceType` | property | <code>resourceType: "artifact" &#124; "workspace" &#124; "custom" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"</code> | Public resource Type property. |

## `StateExecutionClaim` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public acquired At property. |
| `claimId` | property | <code>claimId: string</code> | Public claim Id property. |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `expectedRunRevision` | property | <code>expectedRunRevision: number</code> | Public expected Run Revision property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `processRevision` | property | <code>processRevision: string</code> | Public process Revision property. |
| `releasedAt` | property | <code>releasedAt: string</code> | Public released At property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public state Attempt property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `status` | property | <code>status: "completed" &#124; "expired" &#124; "claimed" &#124; "released"</code> | Public status property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `StateExecutionClaimAcquireRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public acquired At property. |
| `expectedRunRevision` | property | <code>expectedRunRevision: number</code> | Public expected Run Revision property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `processRevision` | property | <code>processRevision: string</code> | Public process Revision property. |
| `requestedClaimId` | property | <code>requestedClaimId: string</code> | Public requested Claim Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public run Lease property. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public state Attempt property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `StateExecutionClaimAssertionRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public checked At property. |
| `guard` | property | <code>guard: StateExecutionClaimGuard</code> | Public guard property. |
| `scope` | property | <code>scope: StateExecutionClaimScope</code> | Public scope property. |

## `StateExecutionClaimCompleteRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `guard` | property | <code>guard: StateExecutionClaimGuard</code> | Public guard property. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public run Lease property. |
| `scope` | property | <code>scope: StateExecutionClaimScope</code> | Public scope property. |

## `StateExecutionClaimGuard` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimId` | property | <code>claimId: string</code> | Public claim Id property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |

## `StateExecutionClaimReleaseRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guard` | property | <code>guard: StateExecutionClaimGuard</code> | Public guard property. |
| `releasedAt` | property | <code>releasedAt: string</code> | Public released At property. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public run Lease property. |
| `scope` | property | <code>scope: StateExecutionClaimScope</code> | Public scope property. |

## `StateExecutionClaimRenewRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guard` | property | <code>guard: StateExecutionClaimGuard</code> | Public guard property. |
| `renewedAt` | property | <code>renewedAt: string</code> | Public renewed At property. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public run Lease property. |
| `scope` | property | <code>scope: StateExecutionClaimScope</code> | Public scope property. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |

## `StateExecutionClaimScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public state Attempt property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `StateExecutionClaimStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: StateExecutionClaimAcquireRequest): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | Public runtime operation for acquire. |
| `assertCurrent` | method | <code>assertCurrent(request: StateExecutionClaimAssertionRequest): Promise&lt;StateExecutionClaim&gt;</code> | Asserts Current at this module boundary. |
| `complete` | method | <code>complete(request: StateExecutionClaimCompleteRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public runtime operation for complete. |
| `get` | method | <code>get(scope: StateExecutionClaimScope, checkedAt?: string): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | Gets get at this module boundary. |
| `release` | method | <code>release(request: StateExecutionClaimReleaseRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public runtime operation for release. |
| `renew` | method | <code>renew(request: StateExecutionClaimRenewRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public runtime operation for renew. |
