# `@codesoul-co/hypha-core` / `contracts/runtime-coordination`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-coordination.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)
- 导出数: **34**

## 模块用法

用于声明并运行时校验契约。Runtime coordination 模块公开 3 常量、28 接口、3 类型。

### 从包入口导入

```ts
import {
  RUNTIME_RESOURCE_CLAIM_MODES,
  RUNTIME_RESOURCE_TYPES,
  STATE_EXECUTION_CLAIM_STATUSES,
} from '@codesoul-co/hypha-core';

import type {
  FencedRunLease,
  ResourceAcquireRequest,
  ResourceClaimAssertionRequest,
  ResourceListRequest,
  ResourceReleaseRequest,
  ResourceRenewRequest,
  RunLease,
  RunLeaseAcquireRequest,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 31 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_RESOURCE_CLAIM_MODES` | 常量 | <code>const RUNTIME_RESOURCE_CLAIM_MODES: readonly ["shared", "exclusive"]</code> | 由 `contracts/runtime-coordination` 模块导出的 RUNTIME RESOURCE CLAIM MODES 常量。 |
| `RUNTIME_RESOURCE_TYPES` | 常量 | <code>const RUNTIME_RESOURCE_TYPES: readonly ["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]</code> | 由 `contracts/runtime-coordination` 模块导出的 RUNTIME RESOURCE TYPES 常量。 |
| `STATE_EXECUTION_CLAIM_STATUSES` | 常量 | <code>const STATE_EXECUTION_CLAIM_STATUSES: readonly ["claimed", "completed", "released", "expired"]</code> | 由 `contracts/runtime-coordination` 模块导出的 STATE EXECUTION CLAIM STATUSES 常量。 |
| `FencedRunLease` | 接口 | <code>interface FencedRunLease extends RunLease</code> | Fenced Run Lease 接口，共包含 11 个公开字段或方法。 |
| `ResourceAcquireRequest` | 接口 | <code>interface ResourceAcquireRequest</code> | Resource Acquire Request 接口，共包含 6 个公开字段或方法。 |
| `ResourceClaimAssertionRequest` | 接口 | <code>interface ResourceClaimAssertionRequest extends ResourceListRequest</code> | Resource Claim Assertion Request 接口，共包含 7 个公开字段或方法。 |
| `ResourceListRequest` | 接口 | <code>interface ResourceListRequest</code> | Resource List Request 接口，共包含 4 个公开字段或方法。 |
| `ResourceReleaseRequest` | 接口 | <code>interface ResourceReleaseRequest</code> | Resource Release Request 接口，共包含 3 个公开字段或方法。 |
| `ResourceRenewRequest` | 接口 | <code>interface ResourceRenewRequest</code> | Resource Renew Request 接口，共包含 4 个公开字段或方法。 |
| `RunLease` | 接口 | <code>interface RunLease</code> | Run Lease 接口，共包含 9 个公开字段或方法。 |
| `RunLeaseAcquireRequest` | 接口 | <code>interface RunLeaseAcquireRequest extends RunLeaseScope</code> | Run Lease Acquire Request 接口，共包含 9 个公开字段或方法。 |
| `RunLeaseAssertionRequest` | 接口 | <code>interface RunLeaseAssertionRequest</code> | Run Lease Assertion Request 接口，共包含 3 个公开字段或方法。 |
| `RunLeaseAuthorization` | 接口 | <code>interface RunLeaseAuthorization</code> | Run Lease Authorization 接口，共包含 2 个公开字段或方法。 |
| `RunLeaseGuard` | 接口 | <code>interface RunLeaseGuard</code> | Run Lease Guard 接口，共包含 3 个公开字段或方法。 |
| `RunLeaseHeartbeatRequest` | 接口 | <code>interface RunLeaseHeartbeatRequest</code> | Run Lease Heartbeat Request 接口，共包含 4 个公开字段或方法。 |
| `RunLeasePreemptRequest` | 接口 | <code>interface RunLeasePreemptRequest extends RunLeaseAcquireRequest</code> | Run Lease Preempt Request 接口，共包含 10 个公开字段或方法。 |
| `RunLeaseReleaseRequest` | 接口 | <code>interface RunLeaseReleaseRequest</code> | Run Lease Release Request 接口，共包含 3 个公开字段或方法。 |
| `RunLeaseScope` | 接口 | <code>interface RunLeaseScope</code> | Run Lease Scope 接口，共包含 4 个公开字段或方法。 |
| `RunLeaseStore` | 接口 | <code>interface RunLeaseStore</code> | Run Lease Store 接口，共包含 6 个公开字段或方法。 |
| `RuntimeResourceClaim` | 接口 | <code>interface RuntimeResourceClaim</code> | Runtime Resource Claim 接口，共包含 14 个公开字段或方法。 |
| `RuntimeResourceCoordinator` | 接口 | <code>interface RuntimeResourceCoordinator</code> | Runtime Resource Coordinator 接口，共包含 5 个公开字段或方法。 |
| `RuntimeResourceRequest` | 接口 | <code>interface RuntimeResourceRequest</code> | Runtime Resource Request 接口，共包含 5 个公开字段或方法。 |
| `StateExecutionClaim` | 接口 | <code>interface StateExecutionClaim extends StateExecutionClaimScope</code> | State Execution Claim 接口，共包含 15 个公开字段或方法。 |
| `StateExecutionClaimAcquireRequest` | 接口 | <code>interface StateExecutionClaimAcquireRequest extends StateExecutionClaimScope</code> | State Execution Claim Acquire Request 接口，共包含 12 个公开字段或方法。 |
| `StateExecutionClaimAssertionRequest` | 接口 | <code>interface StateExecutionClaimAssertionRequest</code> | State Execution Claim Assertion Request 接口，共包含 3 个公开字段或方法。 |
| `StateExecutionClaimCompleteRequest` | 接口 | <code>interface StateExecutionClaimCompleteRequest</code> | State Execution Claim Complete Request 接口，共包含 4 个公开字段或方法。 |
| `StateExecutionClaimGuard` | 接口 | <code>interface StateExecutionClaimGuard</code> | State Execution Claim Guard 接口，共包含 3 个公开字段或方法。 |
| `StateExecutionClaimReleaseRequest` | 接口 | <code>interface StateExecutionClaimReleaseRequest</code> | State Execution Claim Release Request 接口，共包含 4 个公开字段或方法。 |
| `StateExecutionClaimRenewRequest` | 接口 | <code>interface StateExecutionClaimRenewRequest</code> | State Execution Claim Renew Request 接口，共包含 5 个公开字段或方法。 |
| `StateExecutionClaimScope` | 接口 | <code>interface StateExecutionClaimScope</code> | State Execution Claim Scope 接口，共包含 5 个公开字段或方法。 |
| `StateExecutionClaimStore` | 接口 | <code>interface StateExecutionClaimStore</code> | State Execution Claim Store 接口，共包含 6 个公开字段或方法。 |
| `RuntimeResourceClaimMode` | 类型 | <code>type RuntimeResourceClaimMode = (typeof RUNTIME_RESOURCE_CLAIM_MODES)[number]</code> | Runtime Resource Claim Mode 公共类型别名；完整类型表达式见声明。 |
| `RuntimeResourceType` | 类型 | <code>type RuntimeResourceType = (typeof RUNTIME_RESOURCE_TYPES)[number]</code> | Runtime Resource Type 公共类型别名；完整类型表达式见声明。 |
| `StateExecutionClaimStatus` | 类型 | <code>type StateExecutionClaimStatus = (typeof STATE_EXECUTION_CLAIM_STATUSES)[number]</code> | State Execution Claim Status 公共类型别名；完整类型表达式见声明。 |

## `RUNTIME_RESOURCE_CLAIM_MODES`

由 `contracts/runtime-coordination` 模块导出的 RUNTIME RESOURCE CLAIM MODES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_RESOURCE_CLAIM_MODES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export declare const RUNTIME_RESOURCE_CLAIM_MODES: readonly ["shared", "exclusive"];
```

## `RUNTIME_RESOURCE_TYPES`

由 `contracts/runtime-coordination` 模块导出的 RUNTIME RESOURCE TYPES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_RESOURCE_TYPES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export declare const RUNTIME_RESOURCE_TYPES: readonly ["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"];
```

## `STATE_EXECUTION_CLAIM_STATUSES`

由 `contracts/runtime-coordination` 模块导出的 STATE EXECUTION CLAIM STATUSES 常量。

- 种类: 常量
- 导入: `import { STATE_EXECUTION_CLAIM_STATUSES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export declare const STATE_EXECUTION_CLAIM_STATUSES: readonly ["claimed", "completed", "released", "expired"];
```

## `FencedRunLease`

Fenced Run Lease 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FencedRunLease } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface FencedRunLease extends RunLease {
    fencingToken: number;
    partitionKey: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `heartbeatAt` | 属性 | <code>heartbeatAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ResourceAcquireRequest`

Resource Acquire Request 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ResourceAcquireRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface ResourceAcquireRequest {
    runLease: RunLeaseAuthorization;
    stateId?: string;
    resources: RuntimeResourceRequest[];
    ttlMs: number;
    acquiredAt: string;
    idempotencyKey: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resources` | 属性 | <code>resources: RuntimeResourceRequest[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ResourceClaimAssertionRequest`

Resource Claim Assertion Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ResourceClaimAssertionRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface ResourceClaimAssertionRequest extends ResourceListRequest {
    claimId: string;
    ownerId: string;
    fencingToken: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `claimId` | 属性 | <code>claimId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceKey` | 属性 | <code>resourceKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceType` | 属性 | <code>resourceType: "artifact" &#124; "workspace" &#124; "custom" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ResourceListRequest`

Resource List Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ResourceListRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface ResourceListRequest {
    tenantId?: string;
    resourceType: RuntimeResourceType;
    resourceKey: string;
    checkedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceKey` | 属性 | <code>resourceKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceType` | 属性 | <code>resourceType: "artifact" &#124; "workspace" &#124; "custom" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ResourceReleaseRequest`

Resource Release Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ResourceReleaseRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface ResourceReleaseRequest {
    runLease: RunLeaseAuthorization;
    claimIds: string[];
    releasedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimIds` | 属性 | <code>claimIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `releasedAt` | 属性 | <code>releasedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ResourceRenewRequest`

Resource Renew Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ResourceRenewRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface ResourceRenewRequest {
    runLease: RunLeaseAuthorization;
    claimIds: string[];
    ttlMs: number;
    renewedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimIds` | 属性 | <code>claimIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `renewedAt` | 属性 | <code>renewedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RunLease`

Run Lease 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RunLease } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface RunLease {
    id: string;
    tenantId?: string;
    userId: string;
    runId: string;
    ownerId: string;
    acquiredAt: string;
    expiresAt: string;
    heartbeatAt: string;
    revision: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `heartbeatAt` | 属性 | <code>heartbeatAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RunLeaseAcquireRequest`

Run Lease Acquire Request 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RunLeaseAcquireRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface RunLeaseAcquireRequest extends RunLeaseScope {
    requestedLeaseId: string;
    ownerId: string;
    ttlMs: number;
    acquiredAt: string;
    idempotencyKey: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedLeaseId` | 属性 | <code>requestedLeaseId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RunLeaseAssertionRequest`

Run Lease Assertion Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RunLeaseAssertionRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface RunLeaseAssertionRequest {
    scope: RunLeaseScope;
    guard: RunLeaseGuard;
    checkedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `guard` | 属性 | <code>guard: RunLeaseGuard</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RunLeaseScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RunLeaseAuthorization`

Run Lease Authorization 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RunLeaseAuthorization } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface RunLeaseAuthorization {
    scope: RunLeaseScope;
    guard: RunLeaseGuard;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guard` | 属性 | <code>guard: RunLeaseGuard</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RunLeaseScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RunLeaseGuard`

Run Lease Guard 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RunLeaseGuard } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface RunLeaseGuard {
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

## `RunLeaseHeartbeatRequest`

Run Lease Heartbeat Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RunLeaseHeartbeatRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface RunLeaseHeartbeatRequest {
    scope: RunLeaseScope;
    guard: RunLeaseGuard;
    ttlMs: number;
    heartbeatAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guard` | 属性 | <code>guard: RunLeaseGuard</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `heartbeatAt` | 属性 | <code>heartbeatAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RunLeaseScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RunLeasePreemptRequest`

Run Lease Preempt Request 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RunLeasePreemptRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface RunLeasePreemptRequest extends RunLeaseAcquireRequest {
    reason: 'cancellation';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: "cancellation"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedLeaseId` | 属性 | <code>requestedLeaseId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RunLeaseReleaseRequest`

Run Lease Release Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RunLeaseReleaseRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface RunLeaseReleaseRequest {
    scope: RunLeaseScope;
    guard: RunLeaseGuard;
    releasedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guard` | 属性 | <code>guard: RunLeaseGuard</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `releasedAt` | 属性 | <code>releasedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RunLeaseScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RunLeaseScope`

Run Lease Scope 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RunLeaseScope } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface RunLeaseScope {
    tenantId?: string;
    userId: string;
    runId: string;
    partitionKey: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RunLeaseStore`

Run Lease Store 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RunLeaseStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface RunLeaseStore {
    acquire(request: RunLeaseAcquireRequest): Promise<FencedRunLease | null>;
    preempt(request: RunLeasePreemptRequest): Promise<FencedRunLease>;
    heartbeat(request: RunLeaseHeartbeatRequest): Promise<FencedRunLease>;
    release(request: RunLeaseReleaseRequest): Promise<void>;
    get(scope: RunLeaseScope, checkedAt?: string): Promise<FencedRunLease | null>;
    assertCurrent(request: RunLeaseAssertionRequest): Promise<FencedRunLease>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: RunLeaseAcquireRequest): Promise&lt;FencedRunLease &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: RunLeaseAssertionRequest): Promise&lt;FencedRunLease&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(scope: RunLeaseScope, checkedAt?: string): Promise&lt;FencedRunLease &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `heartbeat` | 方法 | <code>heartbeat(request: RunLeaseHeartbeatRequest): Promise&lt;FencedRunLease&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `preempt` | 方法 | <code>preempt(request: RunLeasePreemptRequest): Promise&lt;FencedRunLease&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `release` | 方法 | <code>release(request: RunLeaseReleaseRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeResourceClaim`

Runtime Resource Claim 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeResourceClaim } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface RuntimeResourceClaim {
    id: string;
    tenantId?: string;
    userId: string;
    resourceType: RuntimeResourceType;
    resourceKey: string;
    mode: RuntimeResourceClaimMode;
    runId: string;
    stateId?: string;
    ownerId: string;
    fencingToken: number;
    runFencingToken: number;
    acquiredAt: string;
    expiresAt: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "shared" &#124; "exclusive"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceKey` | 属性 | <code>resourceKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceType` | 属性 | <code>resourceType: "artifact" &#124; "workspace" &#124; "custom" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runFencingToken` | 属性 | <code>runFencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeResourceCoordinator`

Runtime Resource Coordinator 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeResourceCoordinator } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface RuntimeResourceCoordinator {
    acquire(request: ResourceAcquireRequest): Promise<RuntimeResourceClaim[]>;
    renew(request: ResourceRenewRequest): Promise<RuntimeResourceClaim[]>;
    release(request: ResourceReleaseRequest): Promise<void>;
    list(request: ResourceListRequest): Promise<RuntimeResourceClaim[]>;
    assertCurrent(request: ResourceClaimAssertionRequest): Promise<RuntimeResourceClaim>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: ResourceAcquireRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: ResourceClaimAssertionRequest): Promise&lt;RuntimeResourceClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: ResourceListRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `release` | 方法 | <code>release(request: ResourceReleaseRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(request: ResourceRenewRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeResourceRequest`

Runtime Resource Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeResourceRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface RuntimeResourceRequest {
    requestedClaimId: string;
    resourceType: RuntimeResourceType;
    resourceKey: string;
    mode: RuntimeResourceClaimMode;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "shared" &#124; "exclusive"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedClaimId` | 属性 | <code>requestedClaimId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceKey` | 属性 | <code>resourceKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceType` | 属性 | <code>resourceType: "artifact" &#124; "workspace" &#124; "custom" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StateExecutionClaim`

State Execution Claim 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StateExecutionClaim } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface StateExecutionClaim extends StateExecutionClaimScope {
    claimId: string;
    processRevision: string;
    expectedRunRevision: number;
    fencingToken: number;
    ownerId: string;
    status: StateExecutionClaimStatus;
    acquiredAt: string;
    expiresAt: string;
    completedAt?: string;
    releasedAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `claimId` | 属性 | <code>claimId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `completedAt` | 属性 | <code>completedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRunRevision` | 属性 | <code>expectedRunRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processRevision` | 属性 | <code>processRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `releasedAt` | 属性 | <code>releasedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "completed" &#124; "expired" &#124; "claimed" &#124; "released"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StateExecutionClaimAcquireRequest`

State Execution Claim Acquire Request 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StateExecutionClaimAcquireRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface StateExecutionClaimAcquireRequest extends StateExecutionClaimScope {
    requestedClaimId: string;
    processRevision: string;
    expectedRunRevision: number;
    runLease: RunLeaseAuthorization;
    ttlMs: number;
    acquiredAt: string;
    idempotencyKey: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRunRevision` | 属性 | <code>expectedRunRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processRevision` | 属性 | <code>processRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedClaimId` | 属性 | <code>requestedClaimId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StateExecutionClaimAssertionRequest`

State Execution Claim Assertion Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StateExecutionClaimAssertionRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface StateExecutionClaimAssertionRequest {
    scope: StateExecutionClaimScope;
    guard: StateExecutionClaimGuard;
    checkedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `guard` | 属性 | <code>guard: StateExecutionClaimGuard</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: StateExecutionClaimScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StateExecutionClaimCompleteRequest`

State Execution Claim Complete Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StateExecutionClaimCompleteRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface StateExecutionClaimCompleteRequest {
    scope: StateExecutionClaimScope;
    guard: StateExecutionClaimGuard;
    runLease: RunLeaseAuthorization;
    completedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `completedAt` | 属性 | <code>completedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `guard` | 属性 | <code>guard: StateExecutionClaimGuard</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: StateExecutionClaimScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StateExecutionClaimGuard`

State Execution Claim Guard 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StateExecutionClaimGuard } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface StateExecutionClaimGuard {
    claimId: string;
    ownerId: string;
    fencingToken: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimId` | 属性 | <code>claimId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StateExecutionClaimReleaseRequest`

State Execution Claim Release Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StateExecutionClaimReleaseRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface StateExecutionClaimReleaseRequest {
    scope: StateExecutionClaimScope;
    guard: StateExecutionClaimGuard;
    runLease: RunLeaseAuthorization;
    releasedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guard` | 属性 | <code>guard: StateExecutionClaimGuard</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `releasedAt` | 属性 | <code>releasedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: StateExecutionClaimScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StateExecutionClaimRenewRequest`

State Execution Claim Renew Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StateExecutionClaimRenewRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface StateExecutionClaimRenewRequest {
    scope: StateExecutionClaimScope;
    guard: StateExecutionClaimGuard;
    runLease: RunLeaseAuthorization;
    ttlMs: number;
    renewedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guard` | 属性 | <code>guard: StateExecutionClaimGuard</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `renewedAt` | 属性 | <code>renewedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: StateExecutionClaimScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StateExecutionClaimScope`

State Execution Claim Scope 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StateExecutionClaimScope } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface StateExecutionClaimScope {
    tenantId?: string;
    userId: string;
    runId: string;
    stateId: string;
    stateAttempt: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StateExecutionClaimStore`

State Execution Claim Store 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StateExecutionClaimStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export interface StateExecutionClaimStore {
    acquire(request: StateExecutionClaimAcquireRequest): Promise<StateExecutionClaim | null>;
    renew(request: StateExecutionClaimRenewRequest): Promise<StateExecutionClaim>;
    complete(request: StateExecutionClaimCompleteRequest): Promise<StateExecutionClaim>;
    release(request: StateExecutionClaimReleaseRequest): Promise<StateExecutionClaim>;
    get(scope: StateExecutionClaimScope, checkedAt?: string): Promise<StateExecutionClaim | null>;
    assertCurrent(request: StateExecutionClaimAssertionRequest): Promise<StateExecutionClaim>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: StateExecutionClaimAcquireRequest): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: StateExecutionClaimAssertionRequest): Promise&lt;StateExecutionClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `complete` | 方法 | <code>complete(request: StateExecutionClaimCompleteRequest): Promise&lt;StateExecutionClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(scope: StateExecutionClaimScope, checkedAt?: string): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `release` | 方法 | <code>release(request: StateExecutionClaimReleaseRequest): Promise&lt;StateExecutionClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(request: StateExecutionClaimRenewRequest): Promise&lt;StateExecutionClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeResourceClaimMode`

Runtime Resource Claim Mode 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeResourceClaimMode } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export type RuntimeResourceClaimMode = (typeof RUNTIME_RESOURCE_CLAIM_MODES)[number];
```

## `RuntimeResourceType`

Runtime Resource Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeResourceType } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export type RuntimeResourceType = (typeof RUNTIME_RESOURCE_TYPES)[number];
```

## `StateExecutionClaimStatus`

State Execution Claim Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { StateExecutionClaimStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### 声明

```text
export type StateExecutionClaimStatus = (typeof STATE_EXECUTION_CLAIM_STATUSES)[number];
```
