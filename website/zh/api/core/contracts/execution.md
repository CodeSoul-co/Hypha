# `@codesoul-co/hypha-core` / `contracts/execution`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/execution.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution.ts)
- 导出数: **3**

## 模块用法

用于声明并运行时校验契约。Execution 模块公开 3 接口。

### 从包入口导入

```ts
import type {
  ExecutionPrincipal,
  NormalizedExecutionError,
  ProviderHealth,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExecutionPrincipal` | 接口 | <code>interface ExecutionPrincipal</code> | Execution Principal 接口，共包含 8 个公开字段或方法。 |
| `NormalizedExecutionError` | 接口 | <code>interface NormalizedExecutionError</code> | Normalized Execution Error 接口，共包含 6 个公开字段或方法。 |
| `ProviderHealth` | 接口 | <code>interface ProviderHealth</code> | Provider Health 接口，共包含 5 个公开字段或方法。 |

## `ExecutionPrincipal`

Execution Principal 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionPrincipal } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution.ts)

### 声明

```text
export interface ExecutionPrincipal {
    principalId: string;
    type: 'user' | 'agent' | 'service' | 'system';
    tenantId?: string;
    userId?: string;
    agentId?: string;
    roles?: string[];
    permissionScopes: string[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `permissionScopes` | 属性 | <code>permissionScopes: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `roles` | 属性 | <code>roles?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `NormalizedExecutionError`

Normalized Execution Error 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { NormalizedExecutionError } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution.ts)

### 声明

```text
export interface NormalizedExecutionError {
    code: 'EXECUTION_INVALID_REQUEST' | 'EXECUTION_PERMISSION_DENIED' | 'EXECUTION_POLICY_DENIED' | 'EXECUTION_APPROVAL_REQUIRED' | 'EXECUTION_WORKSPACE_NOT_FOUND' | 'EXECUTION_PATH_ESCAPE' | 'EXECUTION_PATH_DENIED' | 'EXECUTION_QUOTA_EXCEEDED' | 'EXECUTION_ENVIRONMENT_UNAVAILABLE' | 'EXECUTION_SANDBOX_CREATE_FAILED' | 'EXECUTION_SANDBOX_START_FAILED' | 'EXECUTION_IMAGE_UNTRUSTED' | 'EXECUTION_NETWORK_DENIED' | 'EXECUTION_SECRET_DENIED' | 'EXECUTION_PROCESS_START_FAILED' | 'EXECUTION_TIMEOUT' | 'EXECUTION_IDLE_TIMEOUT' | 'EXECUTION_CANCELLED' | 'EXECUTION_OOM_KILLED' | 'EXECUTION_RESOURCE_EXCEEDED' | 'EXECUTION_OUTPUT_LIMIT' | 'EXECUTION_RESULT_UNKNOWN' | 'EXECUTION_REVISION_CONFLICT' | 'EXECUTION_LEASE_HELD' | 'EXECUTION_LEASE_LOST' | 'EXECUTION_IDEMPOTENCY_CONFLICT' | 'EXECUTION_CLEANUP_FAILED' | 'EXECUTION_INTERNAL_ERROR';
    message: string;
    retryable: boolean;
    providerCode?: string | number;
    details?: Record<string, unknown>;
    causeRef?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causeRef` | 属性 | <code>causeRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>code: "EXECUTION_INVALID_REQUEST" &#124; "EXECUTION_PERMISSION_DENIED" &#124; "EXECUTION_POLICY_DENIED" &#124; "EXECUTION_APPROVAL_REQUIRED" &#124; "EXECUTION_WORKSPACE_NOT_FOUND" &#124; "EXECUTION_PATH_ESCAPE" &#124; "EXECUTION_PATH_DENIED" &#124; "EXECUTION_QUOTA_EXCEEDED" &#124; "EXECUTION_ENVIRONMENT_UNAVAILABLE" &#124; "EXECUTION_SANDBOX_CREATE_FAILED" &#124; "EXECUTION_SANDBOX_START_FAILED" &#124; "EXECUTION_IMAGE_UNTRUSTED" &#124; "EXECUTION_NETWORK_DENIED" &#124; "EXECU...</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `details` | 属性 | <code>details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerCode` | 属性 | <code>providerCode?: string &#124; number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ProviderHealth`

Provider Health 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProviderHealth } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution.ts)

### 声明

```text
export interface ProviderHealth {
    status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
    checkedAt: string;
    latencyMs?: number;
    message?: string;
    details?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `details` | 属性 | <code>details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `latencyMs` | 属性 | <code>latencyMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "healthy" &#124; "degraded" &#124; "unhealthy" &#124; "unknown"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
