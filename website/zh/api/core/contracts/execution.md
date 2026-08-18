# `@codesoul-co/hypha-core` / `contracts/execution`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/execution.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExecutionPrincipal` | 接口 | <code>interface ExecutionPrincipal</code> | Execution Principal 的字段契约；完整字段见下表。 |
| `NormalizedExecutionError` | 接口 | <code>interface NormalizedExecutionError</code> | Normalized Execution Error 的字段契约；完整字段见下表。 |
| `ProviderHealth` | 接口 | <code>interface ProviderHealth</code> | Provider Health 的字段契约；完整字段见下表。 |

## `ExecutionPrincipal` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `permissionScopes` | 属性 | <code>permissionScopes: string[]</code> | permission Scopes 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `roles` | 属性 | <code>roles: string[]</code> | roles 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `type` | 属性 | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | type 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `NormalizedExecutionError` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causeRef` | 属性 | <code>causeRef: string</code> | cause Ref 字段。 |
| `code` | 属性 | <code>code: "EXECUTION_INVALID_REQUEST" &#124; "EXECUTION_PERMISSION_DENIED" &#124; "EXECUTION_POLICY_DENIED" &#124; "EXECUTION_APPROVAL_REQUIRED" &#124; "EXECUTION_WORKSPACE_NOT_FOUND" &#124; "EXECUTION_PATH_ESCAPE" &#124; "EXECUTION_PATH_DENIED" &#124; "EXECUTION_QUOTA_EXCEEDED" &#124; "EXECUTION_ENVIRONMENT_UNAVAILABLE" &#124; "EXECUTION_SANDBOX_CREATE_FAILED" &#124; "EXECUTION_SANDBOX_START_FAILED" &#124; "EXECUTION_IMAGE_UNTRUSTED" &#124; "EXECUTION_NETWORK_DENIED" &#124; "EXECU...</code> | code 字段。 |
| `details` | 属性 | <code>details: Record&lt;string, unknown&gt;</code> | details 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `providerCode` | 属性 | <code>providerCode: string &#124; number</code> | provider Code 字段。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | retryable 字段。 |

## `ProviderHealth` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | checked At 字段。 |
| `details` | 属性 | <code>details: Record&lt;string, unknown&gt;</code> | details 字段。 |
| `latencyMs` | 属性 | <code>latencyMs: number</code> | latency Ms 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `status` | 属性 | <code>status: "healthy" &#124; "degraded" &#124; "unhealthy" &#124; "unknown"</code> | status 字段。 |
