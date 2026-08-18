# `@codesoul-co/hypha-core` / `contracts/execution`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/execution.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution.ts)
- Exports: **3**

## Using this module

Use the Execution module for declaring and runtime-validating contracts. It exports 3 interfaces.

### Import from the package entrypoint

```ts
import type {
  ExecutionPrincipal,
  NormalizedExecutionError,
  ProviderHealth,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExecutionPrincipal` | interface | <code>interface ExecutionPrincipal</code> | Execution Principal interface with 8 public fields or methods. |
| `NormalizedExecutionError` | interface | <code>interface NormalizedExecutionError</code> | Normalized Execution Error interface with 6 public fields or methods. |
| `ProviderHealth` | interface | <code>interface ProviderHealth</code> | Provider Health interface with 5 public fields or methods. |

## `ExecutionPrincipal`

Execution Principal interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionPrincipal } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `permissionScopes` | property | <code>permissionScopes: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `roles` | property | <code>roles?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `NormalizedExecutionError`

Normalized Execution Error interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { NormalizedExecutionError } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causeRef` | property | <code>causeRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>code: "EXECUTION_INVALID_REQUEST" &#124; "EXECUTION_PERMISSION_DENIED" &#124; "EXECUTION_POLICY_DENIED" &#124; "EXECUTION_APPROVAL_REQUIRED" &#124; "EXECUTION_WORKSPACE_NOT_FOUND" &#124; "EXECUTION_PATH_ESCAPE" &#124; "EXECUTION_PATH_DENIED" &#124; "EXECUTION_QUOTA_EXCEEDED" &#124; "EXECUTION_ENVIRONMENT_UNAVAILABLE" &#124; "EXECUTION_SANDBOX_CREATE_FAILED" &#124; "EXECUTION_SANDBOX_START_FAILED" &#124; "EXECUTION_IMAGE_UNTRUSTED" &#124; "EXECUTION_NETWORK_DENIED" &#124; "EXECU...</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `details` | property | <code>details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerCode` | property | <code>providerCode?: string &#124; number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryable` | property | <code>retryable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ProviderHealth`

Provider Health interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ProviderHealth } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution.ts)

### Declaration

```text
export interface ProviderHealth {
    status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
    checkedAt: string;
    latencyMs?: number;
    message?: string;
    details?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `details` | property | <code>details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `latencyMs` | property | <code>latencyMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "healthy" &#124; "degraded" &#124; "unhealthy" &#124; "unknown"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
