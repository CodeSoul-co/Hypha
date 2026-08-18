# `@codesoul-co/hypha-core` / `contracts/execution-store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/execution-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)
- Exports: **16**

## Using this module

Use the Execution store module for declaring and runtime-validating contracts. It exports 14 interfaces, 2 types.

### Import from the package entrypoint

```ts
import type {
  ExecutionIdempotencyQuery,
  ExecutionLease,
  ExecutionLeaseAcquireRequest,
  ExecutionLeaseGuard,
  ExecutionLeaseReleaseRequest,
  ExecutionLeaseRenewRequest,
  ExecutionRecord,
  ExecutionRecordCompareAndSetRequest,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 16 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExecutionIdempotencyQuery` | interface | <code>interface ExecutionIdempotencyQuery</code> | Execution Idempotency Query interface with 5 public fields or methods. |
| `ExecutionLease` | interface | <code>interface ExecutionLease</code> | Execution Lease interface with 7 public fields or methods. |
| `ExecutionLeaseAcquireRequest` | interface | <code>interface ExecutionLeaseAcquireRequest</code> | Execution Lease Acquire Request interface with 8 public fields or methods. |
| `ExecutionLeaseGuard` | interface | <code>interface ExecutionLeaseGuard</code> | Execution Lease Guard interface with 3 public fields or methods. |
| `ExecutionLeaseReleaseRequest` | interface | <code>interface ExecutionLeaseReleaseRequest</code> | Execution Lease Release Request interface with 7 public fields or methods. |
| `ExecutionLeaseRenewRequest` | interface | <code>interface ExecutionLeaseRenewRequest</code> | Execution Lease Renew Request interface with 7 public fields or methods. |
| `ExecutionRecord` | interface | <code>interface ExecutionRecord</code> | Execution Record interface with 14 public fields or methods. |
| `ExecutionRecordCompareAndSetRequest` | interface | <code>interface ExecutionRecordCompareAndSetRequest</code> | Execution Record Compare And Set Request interface with 6 public fields or methods. |
| `ExecutionRecordCreateRequest` | interface | <code>interface ExecutionRecordCreateRequest</code> | Execution Record Create Request interface with 3 public fields or methods. |
| `ExecutionRecordPage` | interface | <code>interface ExecutionRecordPage</code> | Execution Record Page interface with 2 public fields or methods. |
| `ExecutionRecordQuery` | interface | <code>interface ExecutionRecordQuery</code> | Execution Record Query interface with 10 public fields or methods. |
| `ExecutionRecoveryAssessment` | interface | <code>interface ExecutionRecoveryAssessment</code> | Execution Recovery Assessment interface with 6 public fields or methods. |
| `ExecutionStore` | interface | <code>interface ExecutionStore</code> | Execution Store interface with 10 public fields or methods. |
| `ExecutionStoreFactory` | interface | <code>interface ExecutionStoreFactory</code> | Execution Store Factory interface with 2 public fields or methods. |
| `ExecutionIdempotencyResolution` | type | <code>type ExecutionIdempotencyResolution = { status: 'miss'; } &#124; { status: 'match'; record: ExecutionRecord; } &#124; { status: 'conflict'; recordId: string; existingFingerprint: string; }</code> | Public type alias for Execution Idempotency Resolution; the declaration contains its complete type expression. |
| `ExecutionRecoveryDisposition` | type | <code>type ExecutionRecoveryDisposition = 'not_started' &#124; 'provider_queryable' &#124; 'provider_completed_result_missing' &#124; 'provider_state_unknown'</code> | Public type alias for Execution Recovery Disposition; the declaration contains its complete type expression. |

## `ExecutionIdempotencyQuery`

Execution Idempotency Query interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionIdempotencyQuery } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### Declaration

```text
export interface ExecutionIdempotencyQuery {
    tenantId?: string;
    userId: string;
    workspaceId: string;
    idempotencyKey: string;
    fingerprint: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fingerprint` | property | <code>fingerprint: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionLease`

Execution Lease interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionLease } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### Declaration

```text
export interface ExecutionLease {
    id: string;
    executionId: string;
    ownerId: string;
    fencingToken: number;
    acquiredAt: string;
    expiresAt: string;
    heartbeatAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `heartbeatAt` | property | <code>heartbeatAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionLeaseAcquireRequest`

Execution Lease Acquire Request interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionLeaseAcquireRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### Declaration

```text
export interface ExecutionLeaseAcquireRequest {
    operationId: string;
    executionId: string;
    expectedRevision: number;
    requestedLeaseId: string;
    ownerId: string;
    ttlMs: number;
    acquiredAt: string;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedLeaseId` | property | <code>requestedLeaseId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionLeaseGuard`

Execution Lease Guard interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionLeaseGuard } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### Declaration

```text
export interface ExecutionLeaseGuard {
    leaseId: string;
    ownerId: string;
    fencingToken: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseId` | property | <code>leaseId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionLeaseReleaseRequest`

Execution Lease Release Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionLeaseReleaseRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### Declaration

```text
export interface ExecutionLeaseReleaseRequest {
    operationId: string;
    executionId: string;
    expectedRevision: number;
    leaseGuard: ExecutionLeaseGuard;
    releasedAt: string;
    reason?: string;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseGuard` | property | <code>leaseGuard: ExecutionLeaseGuard</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `releasedAt` | property | <code>releasedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionLeaseRenewRequest`

Execution Lease Renew Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionLeaseRenewRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### Declaration

```text
export interface ExecutionLeaseRenewRequest {
    operationId: string;
    executionId: string;
    expectedRevision: number;
    leaseGuard: ExecutionLeaseGuard;
    ttlMs: number;
    heartbeatAt: string;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `heartbeatAt` | property | <code>heartbeatAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseGuard` | property | <code>leaseGuard: ExecutionLeaseGuard</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionRecord`

Execution Record interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### Declaration

```text
export interface ExecutionRecord {
    id: string;
    revision: number;
    request: CommandExecutionRequest;
    status: CommandExecutionStatus;
    providerId: string;
    providerExecutionRef?: string;
    sandboxId?: string;
    attempt: number;
    idempotencyFingerprint?: string;
    /**
     * Immutable Provider terminal evidence persisted before Artifact finalization and terminal CAS.
     * Once present, Store implementations must reject removal or replacement.
     */
    terminalReceipt?: ExecutionReceipt;
    result?: CommandExecutionResult;
    lease?: ExecutionLease;
    createdAt: string;
    updatedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyFingerprint` | property | <code>idempotencyFingerprint?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lease` | property | <code>lease?: ExecutionLease</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerExecutionRef` | property | <code>providerExecutionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `request` | property | <code>request: CommandExecutionRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `result` | property | <code>result?: CommandExecutionResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: CommandExecutionStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `terminalReceipt` | property | <code>terminalReceipt?: ExecutionReceipt</code> | Immutable Provider terminal evidence persisted before Artifact finalization and terminal CAS. Once present, Store implementations must reject removal or replacement. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionRecordCompareAndSetRequest`

Execution Record Compare And Set Request interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionRecordCompareAndSetRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### Declaration

```text
export interface ExecutionRecordCompareAndSetRequest {
    operationId: string;
    executionId: string;
    expectedRevision: number;
    leaseGuard?: ExecutionLeaseGuard;
    next: ExecutionRecord;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseGuard` | property | <code>leaseGuard?: ExecutionLeaseGuard</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `next` | property | <code>next: ExecutionRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionRecordCreateRequest`

Execution Record Create Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionRecordCreateRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### Declaration

```text
export interface ExecutionRecordCreateRequest {
    operationId: string;
    record: ExecutionRecord;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `record` | property | <code>record: ExecutionRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionRecordPage`

Execution Record Page interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionRecordPage } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### Declaration

```text
export interface ExecutionRecordPage {
    records: ExecutionRecord[];
    cursor?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cursor` | property | <code>cursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `records` | property | <code>records: ExecutionRecord[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionRecordQuery`

Execution Record Query interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionRecordQuery } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### Declaration

```text
export interface ExecutionRecordQuery {
    tenantId?: string;
    userId?: string;
    workspaceId?: string;
    runId?: string;
    providerId?: string;
    statuses?: CommandExecutionStatus[];
    leaseExpiresBefore?: string;
    updatedBefore?: string;
    limit?: number;
    cursor?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cursor` | property | <code>cursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseExpiresBefore` | property | <code>leaseExpiresBefore?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `limit` | property | <code>limit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statuses` | property | <code>statuses?: CommandExecutionStatus[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedBefore` | property | <code>updatedBefore?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionRecoveryAssessment`

Execution Recovery Assessment interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionRecoveryAssessment } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### Declaration

```text
export interface ExecutionRecoveryAssessment {
    executionId: string;
    recordRevision: number;
    disposition: ExecutionRecoveryDisposition;
    assessedAt: string;
    providerStatusRef?: string;
    reason?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assessedAt` | property | <code>assessedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `disposition` | property | <code>disposition: ExecutionRecoveryDisposition</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerStatusRef` | property | <code>providerStatusRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordRevision` | property | <code>recordRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionStore`

Execution Store interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionStore } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### Declaration

```text
export interface ExecutionStore {
    create(request: ExecutionRecordCreateRequest): Promise<ExecutionRecord>;
    get(executionId: string): Promise<ExecutionRecord | null>;
    list(query?: ExecutionRecordQuery): Promise<ExecutionRecordPage>;
    resolveIdempotency(query: ExecutionIdempotencyQuery): Promise<ExecutionIdempotencyResolution>;
    compareAndSet(request: ExecutionRecordCompareAndSetRequest): Promise<ExecutionRecord>;
    acquireLease(request: ExecutionLeaseAcquireRequest): Promise<ExecutionRecord>;
    renewLease(request: ExecutionLeaseRenewRequest): Promise<ExecutionRecord>;
    releaseLease(request: ExecutionLeaseReleaseRequest): Promise<ExecutionRecord>;
    health(): Promise<ProviderHealth>;
    close?(): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquireLease` | method | <code>acquireLease(request: ExecutionLeaseAcquireRequest): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `compareAndSet` | method | <code>compareAndSet(request: ExecutionRecordCompareAndSetRequest): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `create` | method | <code>create(request: ExecutionRecordCreateRequest): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(executionId: string): Promise&lt;ExecutionRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(query?: ExecutionRecordQuery): Promise&lt;ExecutionRecordPage&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `releaseLease` | method | <code>releaseLease(request: ExecutionLeaseReleaseRequest): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renewLease` | method | <code>renewLease(request: ExecutionLeaseRenewRequest): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `resolveIdempotency` | method | <code>resolveIdempotency(query: ExecutionIdempotencyQuery): Promise&lt;ExecutionIdempotencyResolution&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ExecutionStoreFactory`

Execution Store Factory interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionStoreFactory } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### Declaration

```text
export interface ExecutionStoreFactory {
    readonly storeId: string;
    create(): Promise<ExecutionStore>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(): Promise&lt;ExecutionStore&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `storeId` | property | <code>readonly storeId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionIdempotencyResolution`

Public type alias for Execution Idempotency Resolution; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionIdempotencyResolution } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### Declaration

```text
export type ExecutionIdempotencyResolution = {
    status: 'miss';
} | {
    status: 'match';
    record: ExecutionRecord;
} | {
    status: 'conflict';
    recordId: string;
    existingFingerprint: string;
};
```

## `ExecutionRecoveryDisposition`

Public type alias for Execution Recovery Disposition; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionRecoveryDisposition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### Declaration

```text
export type ExecutionRecoveryDisposition = 'not_started' | 'provider_queryable' | 'provider_completed_result_missing' | 'provider_state_unknown';
```
