# `@codesoul-co/hypha-core` / `contracts/execution`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/execution.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExecutionPrincipal` | interface | <code>interface ExecutionPrincipal</code> | Field contract for Execution Principal; see all contract members below. |
| `NormalizedExecutionError` | interface | <code>interface NormalizedExecutionError</code> | Field contract for Normalized Execution Error; see all contract members below. |
| `ProviderHealth` | interface | <code>interface ProviderHealth</code> | Field contract for Provider Health; see all contract members below. |

## `ExecutionPrincipal` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `permissionScopes` | property | <code>permissionScopes: string[]</code> | Public permission Scopes property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `roles` | property | <code>roles: string[]</code> | Public roles property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `type` | property | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | Public type property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `NormalizedExecutionError` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causeRef` | property | <code>causeRef: string</code> | Public cause Ref property. |
| `code` | property | <code>code: "EXECUTION_INVALID_REQUEST" &#124; "EXECUTION_PERMISSION_DENIED" &#124; "EXECUTION_POLICY_DENIED" &#124; "EXECUTION_APPROVAL_REQUIRED" &#124; "EXECUTION_WORKSPACE_NOT_FOUND" &#124; "EXECUTION_PATH_ESCAPE" &#124; "EXECUTION_PATH_DENIED" &#124; "EXECUTION_QUOTA_EXCEEDED" &#124; "EXECUTION_ENVIRONMENT_UNAVAILABLE" &#124; "EXECUTION_SANDBOX_CREATE_FAILED" &#124; "EXECUTION_SANDBOX_START_FAILED" &#124; "EXECUTION_IMAGE_UNTRUSTED" &#124; "EXECUTION_NETWORK_DENIED" &#124; "EXECU...</code> | Public code property. |
| `details` | property | <code>details: Record&lt;string, unknown&gt;</code> | Public details property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `providerCode` | property | <code>providerCode: string &#124; number</code> | Public provider Code property. |
| `retryable` | property | <code>retryable: boolean</code> | Public retryable property. |

## `ProviderHealth` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public checked At property. |
| `details` | property | <code>details: Record&lt;string, unknown&gt;</code> | Public details property. |
| `latencyMs` | property | <code>latencyMs: number</code> | Public latency Ms property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `status` | property | <code>status: "healthy" &#124; "degraded" &#124; "unhealthy" &#124; "unknown"</code> | Public status property. |
