# `@codesoul-co/hypha-core` / `contracts/execution-store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/execution-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)
- 导出数: **16**

## 模块用法

用于声明并运行时校验契约。Execution store 模块公开 14 接口、2 类型。

### 从包入口导入

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

// 完整导出列表见下方。
```

### 使用要点

- 16 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExecutionIdempotencyQuery` | 接口 | <code>interface ExecutionIdempotencyQuery</code> | Execution Idempotency Query 接口，共包含 5 个公开字段或方法。 |
| `ExecutionLease` | 接口 | <code>interface ExecutionLease</code> | Execution Lease 接口，共包含 7 个公开字段或方法。 |
| `ExecutionLeaseAcquireRequest` | 接口 | <code>interface ExecutionLeaseAcquireRequest</code> | Execution Lease Acquire Request 接口，共包含 8 个公开字段或方法。 |
| `ExecutionLeaseGuard` | 接口 | <code>interface ExecutionLeaseGuard</code> | Execution Lease Guard 接口，共包含 3 个公开字段或方法。 |
| `ExecutionLeaseReleaseRequest` | 接口 | <code>interface ExecutionLeaseReleaseRequest</code> | Execution Lease Release Request 接口，共包含 7 个公开字段或方法。 |
| `ExecutionLeaseRenewRequest` | 接口 | <code>interface ExecutionLeaseRenewRequest</code> | Execution Lease Renew Request 接口，共包含 7 个公开字段或方法。 |
| `ExecutionRecord` | 接口 | <code>interface ExecutionRecord</code> | Execution Record 接口，共包含 14 个公开字段或方法。 |
| `ExecutionRecordCompareAndSetRequest` | 接口 | <code>interface ExecutionRecordCompareAndSetRequest</code> | Execution Record Compare And Set Request 接口，共包含 6 个公开字段或方法。 |
| `ExecutionRecordCreateRequest` | 接口 | <code>interface ExecutionRecordCreateRequest</code> | Execution Record Create Request 接口，共包含 3 个公开字段或方法。 |
| `ExecutionRecordPage` | 接口 | <code>interface ExecutionRecordPage</code> | Execution Record Page 接口，共包含 2 个公开字段或方法。 |
| `ExecutionRecordQuery` | 接口 | <code>interface ExecutionRecordQuery</code> | Execution Record Query 接口，共包含 10 个公开字段或方法。 |
| `ExecutionRecoveryAssessment` | 接口 | <code>interface ExecutionRecoveryAssessment</code> | Execution Recovery Assessment 接口，共包含 6 个公开字段或方法。 |
| `ExecutionStore` | 接口 | <code>interface ExecutionStore</code> | Execution Store 接口，共包含 10 个公开字段或方法。 |
| `ExecutionStoreFactory` | 接口 | <code>interface ExecutionStoreFactory</code> | Execution Store Factory 接口，共包含 2 个公开字段或方法。 |
| `ExecutionIdempotencyResolution` | 类型 | <code>type ExecutionIdempotencyResolution = { status: 'miss'; } &#124; { status: 'match'; record: ExecutionRecord; } &#124; { status: 'conflict'; recordId: string; existingFingerprint: string; }</code> | Execution Idempotency Resolution 公共类型别名；完整类型表达式见声明。 |
| `ExecutionRecoveryDisposition` | 类型 | <code>type ExecutionRecoveryDisposition = 'not_started' &#124; 'provider_queryable' &#124; 'provider_completed_result_missing' &#124; 'provider_state_unknown'</code> | Execution Recovery Disposition 公共类型别名；完整类型表达式见声明。 |

## `ExecutionIdempotencyQuery`

Execution Idempotency Query 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionIdempotencyQuery } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### 声明

```text
export interface ExecutionIdempotencyQuery {
    tenantId?: string;
    userId: string;
    workspaceId: string;
    idempotencyKey: string;
    fingerprint: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fingerprint` | 属性 | <code>fingerprint: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionLease`

Execution Lease 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionLease } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `heartbeatAt` | 属性 | <code>heartbeatAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionLeaseAcquireRequest`

Execution Lease Acquire Request 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionLeaseAcquireRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedLeaseId` | 属性 | <code>requestedLeaseId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionLeaseGuard`

Execution Lease Guard 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionLeaseGuard } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### 声明

```text
export interface ExecutionLeaseGuard {
    leaseId: string;
    ownerId: string;
    fencingToken: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseId` | 属性 | <code>leaseId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionLeaseReleaseRequest`

Execution Lease Release Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionLeaseReleaseRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseGuard` | 属性 | <code>leaseGuard: ExecutionLeaseGuard</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `releasedAt` | 属性 | <code>releasedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionLeaseRenewRequest`

Execution Lease Renew Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionLeaseRenewRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `heartbeatAt` | 属性 | <code>heartbeatAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseGuard` | 属性 | <code>leaseGuard: ExecutionLeaseGuard</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionRecord`

Execution Record 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyFingerprint` | 属性 | <code>idempotencyFingerprint?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lease` | 属性 | <code>lease?: ExecutionLease</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerExecutionRef` | 属性 | <code>providerExecutionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `request` | 属性 | <code>request: CommandExecutionRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `result` | 属性 | <code>result?: CommandExecutionResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: CommandExecutionStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `terminalReceipt` | 属性 | <code>terminalReceipt?: ExecutionReceipt</code> | Immutable Provider terminal evidence persisted before Artifact finalization and terminal CAS. Once present, Store implementations must reject removal or replacement. |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionRecordCompareAndSetRequest`

Execution Record Compare And Set Request 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionRecordCompareAndSetRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseGuard` | 属性 | <code>leaseGuard?: ExecutionLeaseGuard</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `next` | 属性 | <code>next: ExecutionRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionRecordCreateRequest`

Execution Record Create Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionRecordCreateRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### 声明

```text
export interface ExecutionRecordCreateRequest {
    operationId: string;
    record: ExecutionRecord;
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `record` | 属性 | <code>record: ExecutionRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionRecordPage`

Execution Record Page 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionRecordPage } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### 声明

```text
export interface ExecutionRecordPage {
    records: ExecutionRecord[];
    cursor?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cursor` | 属性 | <code>cursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `records` | 属性 | <code>records: ExecutionRecord[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionRecordQuery`

Execution Record Query 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionRecordQuery } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cursor` | 属性 | <code>cursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseExpiresBefore` | 属性 | <code>leaseExpiresBefore?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `limit` | 属性 | <code>limit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statuses` | 属性 | <code>statuses?: CommandExecutionStatus[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedBefore` | 属性 | <code>updatedBefore?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionRecoveryAssessment`

Execution Recovery Assessment 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionRecoveryAssessment } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assessedAt` | 属性 | <code>assessedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `disposition` | 属性 | <code>disposition: ExecutionRecoveryDisposition</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerStatusRef` | 属性 | <code>providerStatusRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordRevision` | 属性 | <code>recordRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionStore`

Execution Store 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquireLease` | 方法 | <code>acquireLease(request: ExecutionLeaseAcquireRequest): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `compareAndSet` | 方法 | <code>compareAndSet(request: ExecutionRecordCompareAndSetRequest): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `create` | 方法 | <code>create(request: ExecutionRecordCreateRequest): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(executionId: string): Promise&lt;ExecutionRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(query?: ExecutionRecordQuery): Promise&lt;ExecutionRecordPage&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `releaseLease` | 方法 | <code>releaseLease(request: ExecutionLeaseReleaseRequest): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renewLease` | 方法 | <code>renewLease(request: ExecutionLeaseRenewRequest): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolveIdempotency` | 方法 | <code>resolveIdempotency(query: ExecutionIdempotencyQuery): Promise&lt;ExecutionIdempotencyResolution&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExecutionStoreFactory`

Execution Store Factory 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionStoreFactory } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### 声明

```text
export interface ExecutionStoreFactory {
    readonly storeId: string;
    create(): Promise<ExecutionStore>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(): Promise&lt;ExecutionStore&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `storeId` | 属性 | <code>readonly storeId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionIdempotencyResolution`

Execution Idempotency Resolution 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionIdempotencyResolution } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### 声明

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

Execution Recovery Disposition 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionRecoveryDisposition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-store.ts)

### 声明

```text
export type ExecutionRecoveryDisposition = 'not_started' | 'provider_queryable' | 'provider_completed_result_missing' | 'provider_state_unknown';
```
