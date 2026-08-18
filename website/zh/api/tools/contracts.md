# `@codesoul-co/hypha-tools` / `contracts`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 源码: [`packages/tools/src/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)
- 导出数: **76**

## 模块用法

用于声明并运行时校验契约。Contracts 模块公开 38 常量、4 函数、32 接口、2 类型。

### 从包入口导入

```ts
import {
  effectiveAgentCapabilitySnapshotSchema,
  effectiveCapabilityApprovalSchema,
  governedHumanApprovalDefinition,
  governedHumanApprovalExample,
  governedHumanApprovalJsonSchema,
  governedHumanApprovalPolicySpecSchema,
  governedHumanApprovalRequestSchema,
  governedToolContractDefinition,
} from '@codesoul-co/hypha-tools';

import type {
  EffectiveAgentCapabilitySnapshot,
  EffectiveCapabilityApproval,
  GovernedHumanApprovalPolicySpec,
  GovernedHumanApprovalRequest,
  GovernedToolContractSpec,
  GovernedToolInvocationRecord,
  HumanApprovalDecisionRecord,
  NormalizedToolError,
} from '@codesoul-co/hypha-tools';

// 完整导出列表见下方。
```

### 使用要点

- 34 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 38 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { effectiveAgentCapabilitySnapshotSchema } from '@codesoul-co/hypha-tools';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = effectiveAgentCapabilitySnapshotSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `effectiveAgentCapabilitySnapshotSchema` | 常量 | <code>const effectiveAgentCapabilitySnapshotSchema: z.ZodObject&lt;{ id: z.ZodString; runId: z.ZodString; agentId: z.ZodString; principalId: z.ZodString; tenantId: z.ZodOptional&lt;z.ZodString&gt;; domainId: z.ZodOptional&lt;z.ZodString&gt;; createdAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; skillRevisions: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; contentHash: z.ZodString; }, "strip", z.ZodTypeAny, {...</code> | Effective Agent Capability Snapshot 的运行时 Schema。 |
| `effectiveCapabilityApprovalSchema` | 常量 | <code>const effectiveCapabilityApprovalSchema: z.ZodObject&lt;{ taskId: z.ZodString; subjectType: z.ZodLiteral&lt;"effective_capability_snapshot"&gt;; subjectHash: z.ZodString; snapshotId: z.ZodString; runId: z.ZodString; agentId: z.ZodString; principalId: z.ZodString; approvedBy: z.ZodString; approvedAt: z.ZodString; expiresAt: z.ZodString; status: z.ZodLiteral&lt;"approved"&gt;; }, "strict", z.ZodTypeAny, { status: "approved"; runId...</code> | Effective Capability Approval 的运行时 Schema。 |
| `governedHumanApprovalDefinition` | 常量 | <code>const governedHumanApprovalDefinition: SpecSchemaDefinition&lt;GovernedHumanApprovalRequest&gt;</code> | 由 `contracts` 模块导出的 Governed Human Approval Definition 常量。 |
| `governedHumanApprovalExample` | 常量 | <code>const governedHumanApprovalExample: GovernedHumanApprovalRequest</code> | Governed Human Approval 的有效示例值。 |
| `governedHumanApprovalJsonSchema` | 常量 | <code>const governedHumanApprovalJsonSchema: JsonSchema</code> | Governed Human Approval 的 JSON Schema。 |
| `governedHumanApprovalPolicySpecSchema` | 常量 | <code>const governedHumanApprovalPolicySpecSchema: z.ZodObject&lt;{ mode: z.ZodEnum&lt;["never", "policy", "always"]&gt;; requiredForSideEffects: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["none", "read", "write", "external_effect", "irreversible"]&gt;, "many"&gt;&gt;; approverRoles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; minApprovals: z.ZodOptional&lt;z.ZodNumber&gt;; expiresAfterSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; allowParameterEdit: z.Zo...</code> | Governed Human Approval Policy Spec 的运行时 Schema。 |
| `governedHumanApprovalRequestSchema` | 常量 | <code>const governedHumanApprovalRequestSchema: z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; invocationId: z.ZodString; toolRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; ...</code> | Governed Human Approval Request 的运行时 Schema。 |
| `governedToolContractDefinition` | 常量 | <code>const governedToolContractDefinition: SpecSchemaDefinition&lt;GovernedToolContractSpec&gt;</code> | 由 `contracts` 模块导出的 Governed Tool Contract Definition 常量。 |
| `governedToolContractExample` | 常量 | <code>const governedToolContractExample: GovernedToolContractSpec</code> | Governed Tool Contract 的有效示例值。 |
| `governedToolContractJsonSchema` | 常量 | <code>const governedToolContractJsonSchema: JsonSchema</code> | Governed Tool Contract 的 JSON Schema。 |
| `governedToolContractJsonSchemas` | 常量 | <code>const governedToolContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts` 模块导出的 Governed Tool Contract JSON Schemas 常量。 |
| `governedToolContractSpecSchema` | 常量 | <code>const governedToolContractSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; revision: z.ZodString; name: z.ZodString; displayName: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodString; instructions: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; input: z.ZodObject&lt;{ jsonSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; schemaId: z.ZodOptional&lt;z.ZodString&gt;; s...</code> | Governed Tool Contract Spec 的运行时 Schema。 |
| `governedToolInvocationDefinition` | 常量 | <code>const governedToolInvocationDefinition: SpecSchemaDefinition&lt;GovernedToolInvocationRecord&gt;</code> | 由 `contracts` 模块导出的 Governed Tool Invocation Definition 常量。 |
| `governedToolInvocationExample` | 常量 | <code>const governedToolInvocationExample: GovernedToolInvocationRecord</code> | Governed Tool Invocation 的有效示例值。 |
| `governedToolInvocationJsonSchema` | 常量 | <code>const governedToolInvocationJsonSchema: JsonSchema</code> | Governed Tool Invocation 的 JSON Schema。 |
| `governedToolInvocationRecordSchema` | 常量 | <code>const governedToolInvocationRecordSchema: z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; operationId: z.ZodString; toolRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }...</code> | Governed Tool Invocation Record 的运行时 Schema。 |
| `governedToolInvocationStatusSchema` | 常量 | <code>const governedToolInvocationStatusSchema: z.ZodEnum&lt;["created", "validating", "validated", "denied", "waiting_approval", "approved", "rejected", "queued", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "expired", "conflict"]&gt;</code> | Governed Tool Invocation Status 的运行时 Schema。 |
| `normalizedToolErrorSchema` | 常量 | <code>const normalizedToolErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["TOOL_NOT_FOUND", "TOOL_DISABLED", "TOOL_SCHEMA_INVALID", "TOOL_OUTPUT_INVALID", "TOOL_PERMISSION_DENIED", "TOOL_POLICY_DENIED", "TOOL_APPROVAL_REQUIRED", "TOOL_APPROVAL_REJECTED", "TOOL_APPROVAL_EXPIRED", "TOOL_IDEMPOTENCY_CONFLICT", "TOOL_CONCURRENCY_CONFLICT", "TOOL_TIMEOUT", "TOOL_CANCELLED", "TOOL_ADAPTER_UNAVAILABLE", "TOOL_RETRY_EXHAUSTED", "TO...</code> | Normalized Tool Error 的运行时 Schema。 |
| `providerHealthSchema` | 常量 | <code>const providerHealthSchema: z.ZodObject&lt;{ status: z.ZodEnum&lt;["healthy", "degraded", "unhealthy", "unknown"]&gt;; checkedAt: z.ZodString; latencyMs: z.ZodOptional&lt;z.ZodNumber&gt;; message: z.ZodOptional&lt;z.ZodString&gt;; details: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "strip", z.ZodTypeAny, { status: "unknown" &#124; "healthy" &#124; "degraded" &#124; "unhealthy"; checkedAt: string; message?: string &#124; undefined; latencyM...</code> | Provider Health 的运行时 Schema。 |
| `toolCachePolicySpecSchema` | 常量 | <code>const toolCachePolicySpecSchema: z.ZodObject&lt;{ mode: z.ZodEnum&lt;["disabled", "result", "observation_ref"]&gt;; ttlSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; scope: z.ZodEnum&lt;["run", "session", "workspace", "tenant"]&gt;; keyFields: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; includeToolRevision: z.ZodBoolean; includePolicyRevision: z.ZodBoolean; allowForSideEffectLevels: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["none", "read", ...</code> | Tool Cache Policy Spec 的运行时 Schema。 |
| `toolContractSnapshotDefinition` | 常量 | <code>const toolContractSnapshotDefinition: SpecSchemaDefinition&lt;ToolContractSnapshot&gt;</code> | 由 `contracts` 模块导出的 Tool Contract Snapshot Definition 常量。 |
| `toolContractSnapshotExample` | 常量 | <code>const toolContractSnapshotExample: ToolContractSnapshot</code> | Tool Contract Snapshot 的有效示例值。 |
| `toolContractSnapshotItemSchema` | 常量 | <code>const toolContractSnapshotItemSchema: z.ZodObject&lt;{ toolId: z.ZodString; toolVersion: z.ZodString; toolRevision: z.ZodString; inputSchemaHash: z.ZodString; outputSchemaHash: z.ZodOptional&lt;z.ZodString&gt;; sourceCapabilityHash: z.ZodOptional&lt;z.ZodString&gt;; sideEffectLevel: z.ZodEnum&lt;["none", "read", "write", "external_effect", "irreversible"]&gt;; adapterRef: z.ZodString; }, "strip", z.ZodTypeAny, { toolId: string; toolVe...</code> | Tool Contract Snapshot Item 的运行时 Schema。 |
| `toolContractSnapshotJsonSchema` | 常量 | <code>const toolContractSnapshotJsonSchema: JsonSchema</code> | Tool Contract Snapshot 的 JSON Schema。 |
| `toolContractSnapshotSchema` | 常量 | <code>const toolContractSnapshotSchema: z.ZodObject&lt;{ id: z.ZodString; runId: z.ZodString; createdAt: z.ZodString; toolContracts: z.ZodArray&lt;z.ZodObject&lt;{ toolId: z.ZodString; toolVersion: z.ZodString; toolRevision: z.ZodString; inputSchemaHash: z.ZodString; outputSchemaHash: z.ZodOptional&lt;z.ZodString&gt;; sourceCapabilityHash: z.ZodOptional&lt;z.ZodString&gt;; sideEffectLevel: z.ZodEnum&lt;["none", "read", "write", "external_effec...</code> | Tool Contract Snapshot 的运行时 Schema。 |
| `toolEventPayloadBaseDefinition` | 常量 | <code>const toolEventPayloadBaseDefinition: SpecSchemaDefinition&lt;ToolEventPayloadBase&gt;</code> | 由 `contracts` 模块导出的 Tool Event Payload Base Definition 常量。 |
| `toolEventPayloadBaseExample` | 常量 | <code>const toolEventPayloadBaseExample: ToolEventPayloadBase</code> | Tool Event Payload Base 的有效示例值。 |
| `toolEventPayloadBaseJsonSchema` | 常量 | <code>const toolEventPayloadBaseJsonSchema: JsonSchema</code> | Tool Event Payload Base 的 JSON Schema。 |
| `toolEventPayloadBaseSchema` | 常量 | <code>const toolEventPayloadBaseSchema: z.ZodObject&lt;{ invocationId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodOptional&lt;z.ZodString&gt;; toolId: z.ZodOptional&lt;z.ZodString&gt;; toolVersion: z.ZodOptional&lt;z.ZodString&gt;; toolRevision: z.ZodOptional&lt;z.ZodString&gt;; contractSnapshotRef: z.ZodOptional&lt;z.ZodString&gt;; scopeHash: z.ZodOptional&lt;z.ZodString&gt;; principalId: z.ZodOptional&lt;z.ZodString&gt;; sideEffectLevel: z.ZodOptional&lt;z.ZodEn...</code> | Tool Event Payload Base 的运行时 Schema。 |
| `toolExecutionContextSpecSchema` | 常量 | <code>const toolExecutionContextSpecSchema: z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;;...</code> | Tool Execution Context Spec 的运行时 Schema。 |
| `toolExecutionPolicySpecSchema` | 常量 | <code>const toolExecutionPolicySpecSchema: z.ZodObject&lt;{ timeout: z.ZodObject&lt;{ timeoutMs: z.ZodNumber; onTimeout: z.ZodOptional&lt;z.ZodEnum&lt;["fail", "retry", "human_review"]&gt;&gt;; }, "strip", z.ZodTypeAny, { timeoutMs: number; onTimeout?: "fail" &#124; "retry" &#124; "human_review" &#124; undefined; }, { timeoutMs: number; onTimeout?: "fail" &#124; "retry" &#124; "human_review" &#124; undefined; }&gt;; retry: z.ZodObject&lt;{ maxAttempts: z.ZodNumber; backoff...</code> | Tool Execution Policy Spec 的运行时 Schema。 |
| `toolGovernanceSpecSchema` | 常量 | <code>const toolGovernanceSpecSchema: z.ZodObject&lt;{ requiredPermissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; deniedPermissionScopes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; allowedPrincipalTypes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;, "many"&gt;&gt;; policyRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z....</code> | Tool Governance Spec 的运行时 Schema。 |
| `toolInvocationScopeSpecSchema` | 常量 | <code>const toolInvocationScopeSpecSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; stepId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; fsmState: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { runId: string; userId: string; sessionId: string; agentId?: string &#124; undefined; ten...</code> | Tool Invocation Scope Spec 的运行时 Schema。 |
| `toolObservabilitySpecSchema` | 常量 | <code>const toolObservabilitySpecSchema: z.ZodObject&lt;{ traceLevel: z.ZodEnum&lt;["none", "metadata", "summary", "full_redacted"]&gt;; recordInput: z.ZodOptional&lt;z.ZodBoolean&gt;; recordOutput: z.ZodOptional&lt;z.ZodBoolean&gt;; recordAttempts: z.ZodOptional&lt;z.ZodBoolean&gt;; recordPolicyDecision: z.ZodOptional&lt;z.ZodBoolean&gt;; metricsEnabled: z.ZodOptional&lt;z.ZodBoolean&gt;; redactionPolicyRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; vers...</code> | Tool Observability Spec 的运行时 Schema。 |
| `toolPrincipalSpecSchema` | 常量 | <code>const toolPrincipalSpecSchema: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; delegatedBy: z.ZodOptional&lt;z.Zo...</code> | Tool Principal Spec 的运行时 Schema。 |
| `toolSchemaSpecSchema` | 常量 | <code>const toolSchemaSpecSchema: z.ZodObject&lt;{ jsonSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; schemaId: z.ZodOptional&lt;z.ZodString&gt;; schemaVersion: z.ZodOptional&lt;z.ZodString&gt;; schemaHash: z.ZodString; strict: z.ZodOptional&lt;z.ZodBoolean&gt;; allowAdditionalProperties: z.ZodOptional&lt;z.ZodBoolean&gt;; maxSerializedBytes: z.ZodOptional&lt;z.ZodNumber&gt;; sensitivePaths: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; red...</code> | Tool Schema Spec 的运行时 Schema。 |
| `toolSemanticSpecSchema` | 常量 | <code>const toolSemanticSpecSchema: z.ZodType&lt;ToolSemanticSpec, z.ZodTypeDef, ToolSemanticSpec&gt;</code> | Tool Semantic Spec 的运行时 Schema。 |
| `toolSourceRefSchema` | 常量 | <code>const toolSourceRefSchema: z.ZodObject&lt;{ adapterId: z.ZodOptional&lt;z.ZodString&gt;; handlerId: z.ZodOptional&lt;z.ZodString&gt;; endpointRef: z.ZodOptional&lt;z.ZodString&gt;; mcpServerId: z.ZodOptional&lt;z.ZodString&gt;; mcpCapabilityId: z.ZodOptional&lt;z.ZodString&gt;; mcpCapabilityHash: z.ZodOptional&lt;z.ZodString&gt;; pluginId: z.ZodOptional&lt;z.ZodString&gt;; hostedToolId: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodStr...</code> | Tool Source Ref 的运行时 Schema。 |
| `canonicalJson` | 函数 | <code>canonicalJson(value: unknown): string</code> | Canonical JSON 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createToolCacheValidityKey` | 函数 | <code>createToolCacheValidityKey(input: ToolCacheValidityInput): string</code> | Create Tool Cache Validity Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createToolSchemaSpec` | 函数 | <code>createToolSchemaSpec(jsonSchema: JsonSchema, options?: Omit&lt;Partial&lt;ToolSchemaSpec&gt;, "jsonSchema" &#124; "schemaHash"&gt;): ToolSchemaSpec</code> | Create Tool Schema Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `hashToolContract` | 函数 | <code>hashToolContract(value: unknown): string</code> | Hash Tool Contract 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `EffectiveAgentCapabilitySnapshot` | 接口 | <code>interface EffectiveAgentCapabilitySnapshot</code> | Effective Agent Capability Snapshot 接口，共包含 17 个公开字段或方法。 |
| `EffectiveCapabilityApproval` | 接口 | <code>interface EffectiveCapabilityApproval</code> | Effective Capability Approval 接口，共包含 11 个公开字段或方法。 |
| `GovernedHumanApprovalPolicySpec` | 接口 | <code>interface GovernedHumanApprovalPolicySpec</code> | Governed Human Approval Policy Spec 接口，共包含 9 个公开字段或方法。 |
| `GovernedHumanApprovalRequest` | 接口 | <code>interface GovernedHumanApprovalRequest</code> | Governed Human Approval Request 接口，共包含 19 个公开字段或方法。 |
| `GovernedToolContractSpec` | 接口 | <code>interface GovernedToolContractSpec</code> | Governed Tool Contract Spec 接口，共包含 22 个公开字段或方法。 |
| `GovernedToolInvocationRecord` | 接口 | <code>interface GovernedToolInvocationRecord</code> | Governed Tool Invocation Record 接口，共包含 35 个公开字段或方法。 |
| `HumanApprovalDecisionRecord` | 接口 | <code>interface HumanApprovalDecisionRecord</code> | Human Approval Decision Record 接口，共包含 5 个公开字段或方法。 |
| `NormalizedToolError` | 接口 | <code>interface NormalizedToolError</code> | Normalized Tool Error 接口，共包含 7 个公开字段或方法。 |
| `ProviderHealth` | 接口 | <code>interface ProviderHealth</code> | Provider Health 接口，共包含 5 个公开字段或方法。 |
| `ToolArtifactContract` | 接口 | <code>interface ToolArtifactContract</code> | Tool Artifact Contract 接口，共包含 4 个公开字段或方法。 |
| `ToolCachePolicySpec` | 接口 | <code>interface ToolCachePolicySpec</code> | Tool Cache Policy Spec 接口，共包含 8 个公开字段或方法。 |
| `ToolCacheValidityInput` | 接口 | <code>interface ToolCacheValidityInput</code> | Tool Cache Validity Input 接口，共包含 8 个公开字段或方法。 |
| `ToolCacheValidityRecord` | 接口 | <code>interface ToolCacheValidityRecord extends ToolCacheValidityInput</code> | Tool Cache Validity Record 接口，共包含 10 个公开字段或方法。 |
| `ToolCancellationPolicySpec` | 接口 | <code>interface ToolCancellationPolicySpec</code> | Tool Cancellation Policy Spec 接口，共包含 2 个公开字段或方法。 |
| `ToolConcurrencyPolicySpec` | 接口 | <code>interface ToolConcurrencyPolicySpec</code> | Tool Concurrency Policy Spec 接口，共包含 3 个公开字段或方法。 |
| `ToolContractSnapshot` | 接口 | <code>interface ToolContractSnapshot</code> | Tool Contract Snapshot 接口，共包含 8 个公开字段或方法。 |
| `ToolContractSnapshotItem` | 接口 | <code>interface ToolContractSnapshotItem</code> | Tool Contract Snapshot Item 接口，共包含 8 个公开字段或方法。 |
| `ToolContractSnapshotStore` | 接口 | <code>interface ToolContractSnapshotStore</code> | Tool Contract Snapshot Store 接口，共包含 2 个公开字段或方法。 |
| `ToolEventPayloadBase` | 接口 | <code>interface ToolEventPayloadBase</code> | Tool Event Payload Base 接口，共包含 15 个公开字段或方法。 |
| `ToolExecutionContextSpec` | 接口 | <code>interface ToolExecutionContextSpec</code> | Tool Execution Context Spec 接口，共包含 21 个公开字段或方法。 |
| `ToolExecutionPolicySpec` | 接口 | <code>interface ToolExecutionPolicySpec</code> | Tool Execution Policy Spec 接口，共包含 7 个公开字段或方法。 |
| `ToolExternalReceipt` | 接口 | <code>interface ToolExternalReceipt</code> | Tool External Receipt 接口，共包含 5 个公开字段或方法。 |
| `ToolGovernanceSpec` | 接口 | <code>interface ToolGovernanceSpec</code> | Tool Governance Spec 接口，共包含 10 个公开字段或方法。 |
| `ToolInvocationScopeSpec` | 接口 | <code>interface ToolInvocationScopeSpec</code> | Tool Invocation Scope Spec 接口，共包含 8 个公开字段或方法。 |
| `ToolLateResultPolicySpec` | 接口 | <code>interface ToolLateResultPolicySpec</code> | Tool Late Result Policy Spec 接口，共包含 2 个公开字段或方法。 |
| `ToolObservabilitySpec` | 接口 | <code>interface ToolObservabilitySpec</code> | Tool Observability Spec 接口，共包含 7 个公开字段或方法。 |
| `ToolOutputLimitSpec` | 接口 | <code>interface ToolOutputLimitSpec</code> | Tool Output Limit Spec 接口，共包含 2 个公开字段或方法。 |
| `ToolPrincipalSpec` | 接口 | <code>interface ToolPrincipalSpec</code> | Tool Principal Spec 接口，共包含 12 个公开字段或方法。 |
| `ToolSchemaSpec` | 接口 | <code>interface ToolSchemaSpec</code> | Tool Schema Spec 接口，共包含 9 个公开字段或方法。 |
| `ToolSemanticSpec` | 接口 | <code>interface ToolSemanticSpec</code> | Tool Semantic Spec 接口，共包含 10 个公开字段或方法。 |
| `ToolSourceRef` | 接口 | <code>interface ToolSourceRef</code> | Tool Source Ref 接口，共包含 9 个公开字段或方法。 |
| `ToolStreamingSpec` | 接口 | <code>interface ToolStreamingSpec</code> | Tool Streaming Spec 接口，共包含 4 个公开字段或方法。 |
| `GovernedToolInvocationStatus` | 类型 | <code>type GovernedToolInvocationStatus = 'created' &#124; 'validating' &#124; 'validated' &#124; 'denied' &#124; 'waiting_approval' &#124; 'approved' &#124; 'rejected' &#124; 'queued' &#124; 'running' &#124; 'cancelling' &#124; 'cancelled' &#124; 'completed' &#124; 'failed' &#124; 'timed_out' &#124; 'expired' &#124; 'conflict'</code> | Governed Tool Invocation Status 公共类型别名；完整类型表达式见声明。 |
| `ToolSource` | 类型 | <code>type ToolSource = 'local' &#124; 'mcp' &#124; 'http' &#124; 'plugin' &#124; 'hosted' &#124; 'execution' &#124; 'custom'</code> | Tool Source 公共类型别名；完整类型表达式见声明。 |

## `effectiveAgentCapabilitySnapshotSchema`

Effective Agent Capability Snapshot 的运行时 Schema。

- 种类: 常量
- 导入: `import { effectiveAgentCapabilitySnapshotSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const effectiveAgentCapabilitySnapshotSchema: z.ZodObject<{ id: z.ZodString; runId: z.ZodString; agentId: z.ZodString; principalId: z.ZodString; tenantId: z.ZodOptional<z.ZodString>; domainId: z.ZodOptional<z.ZodString>; createdAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; skillRevisions: z.ZodArray<z.ZodObject<{ id: z.ZodString; version: z.ZodString; contentHash: z.ZodString; }, "strip", z.ZodTypeAny, { id: string; version: string; contentHash: string; }, { id: string; version: string; contentHash: string; }>, "many">; allowedToolIds: z.ZodArray<z.ZodString, "many">; allowedMCPServerIds: z.ZodArray<z.ZodString, "many">; memoryAccess: z.ZodEnum<["none", "read", "write", "read_write"]>; allowedExecutionProfiles: z.ZodArray<z.ZodString, "many">; maximumSideEffectLevel: z.ZodEnum<["none", "read", "write", "external_effect", "irreversible"]>; requiresHumanReview: z.ZodBoolean; policyRefs: z.ZodArray<z.ZodString, "many">; snapshotHash: z.ZodString; }, "strip", z.ZodTypeAny, { id: string; policyRefs: string[]; runId: string; agentId: string; principalId: string; createdAt: string; skillRevisions: { id: string; version: string; contentHash: string; }[]; allowedToolIds: string[]; allowedMCPServerIds: string[]; memoryAccess: "none" | "read" | "write" | "read_write"; allowedExecutionProfiles: string[]; maximumSideEffectLevel: "none" | "read" | "write" | "external_effect" | "irreversible"; requiresHumanReview: boolean; snapshotHash: string; tenantId?: string | undefined; domainId?: string | undefined; expiresAt?: string | undefined; }, { id: string; policyRefs: string[]; runId: string; agentId: string; principalId: string; createdAt: string; skillRevisions: { id: string; version: string; contentHash: string; }[]; allowedToolIds: string[]; allowedMCPServerIds: string[]; memoryAccess: "none" | "read" | "write" | "read_write"; allowedExecutionProfiles: string[]; maximumSideEffectLevel: "none" | "read" | "write" | "external_effect" | "irreversible"; requiresHumanReview: boolean; snapshotHash: string; tenantId?: string | undefined; domainId?: string | undefined; expiresAt?: string | undefined; }>;
```

## `effectiveCapabilityApprovalSchema`

Effective Capability Approval 的运行时 Schema。

- 种类: 常量
- 导入: `import { effectiveCapabilityApprovalSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const effectiveCapabilityApprovalSchema: z.ZodObject<{ taskId: z.ZodString; subjectType: z.ZodLiteral<"effective_capability_snapshot">; subjectHash: z.ZodString; snapshotId: z.ZodString; runId: z.ZodString; agentId: z.ZodString; principalId: z.ZodString; approvedBy: z.ZodString; approvedAt: z.ZodString; expiresAt: z.ZodString; status: z.ZodLiteral<"approved">; }, "strict", z.ZodTypeAny, { status: "approved"; runId: string; agentId: string; principalId: string; expiresAt: string; taskId: string; subjectType: "effective_capability_snapshot"; subjectHash: string; snapshotId: string; approvedBy: string; approvedAt: string; }, { status: "approved"; runId: string; agentId: string; principalId: string; expiresAt: string; taskId: string; subjectType: "effective_capability_snapshot"; subjectHash: string; snapshotId: string; approvedBy: string; approvedAt: string; }>;
```

## `governedHumanApprovalDefinition`

由 `contracts` 模块导出的 Governed Human Approval Definition 常量。

- 种类: 常量
- 导入: `import { governedHumanApprovalDefinition } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const governedHumanApprovalDefinition: SpecSchemaDefinition<GovernedHumanApprovalRequest>;
```

## `governedHumanApprovalExample`

Governed Human Approval 的有效示例值。

- 种类: 常量
- 导入: `import { governedHumanApprovalExample } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const governedHumanApprovalExample: GovernedHumanApprovalRequest;
```

## `governedHumanApprovalJsonSchema`

Governed Human Approval 的 JSON Schema。

- 种类: 常量
- 导入: `import { governedHumanApprovalJsonSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const governedHumanApprovalJsonSchema: JsonSchema;
```

## `governedHumanApprovalPolicySpecSchema`

Governed Human Approval Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { governedHumanApprovalPolicySpecSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const governedHumanApprovalPolicySpecSchema: z.ZodObject<{ mode: z.ZodEnum<["never", "policy", "always"]>; requiredForSideEffects: z.ZodOptional<z.ZodArray<z.ZodEnum<["none", "read", "write", "external_effect", "irreversible"]>, "many">>; approverRoles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; minApprovals: z.ZodOptional<z.ZodNumber>; expiresAfterSeconds: z.ZodOptional<z.ZodNumber>; allowParameterEdit: z.ZodOptional<z.ZodBoolean>; requireReason: z.ZodOptional<z.ZodBoolean>; revalidateOnResume: z.ZodOptional<z.ZodBoolean>; escalationPolicyRef: z.ZodOptional<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; revision?: string | undefined; }, { id: string; version?: string | undefined; revision?: string | undefined; }>>; }, "strip", z.ZodTypeAny, { mode: "never" | "policy" | "always"; requiredForSideEffects?: ("none" | "read" | "write" | "external_effect" | "irreversible")[] | undefined; approverRoles?: string[] | undefined; minApprovals?: number | undefined; expiresAfterSeconds?: number | undefined; allowParameterEdit?: boolean | undefined; requireReason?: boolean | undefined; revalidateOnResume?: boolean | undefined; escalationPolicyRef?: { id: string; version?: string | undefined; revision?: string | undefined; } | undefined; }, { mode: "never" | "policy" | "always"; requiredForSideEffects?: ("none" | "read" | "write" | "external_effect" | "irreversible")[] | undefined; approverRoles?: string[] | undefined; minApprovals?: number | undefined; expiresAfterSeconds?: number | undefined; allowParameterEdit?: boolean | undefined; requireReason?: boolean | undefined; revalidateOnResume?: boolean | undefined; escalationPolicyRef?: { id: string; version?: string | undefined; revision?: string | undefined; } | undefined; }>;
```

## `governedHumanApprovalRequestSchema`

Governed Human Approval Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { governedHumanApprovalRequestSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const governedHumanApprovalRequestSchema: (typeof import('@codesoul-co/hypha-tools'))['governedHumanApprovalRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `governedToolContractDefinition`

由 `contracts` 模块导出的 Governed Tool Contract Definition 常量。

- 种类: 常量
- 导入: `import { governedToolContractDefinition } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const governedToolContractDefinition: SpecSchemaDefinition<GovernedToolContractSpec>;
```

## `governedToolContractExample`

Governed Tool Contract 的有效示例值。

- 种类: 常量
- 导入: `import { governedToolContractExample } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const governedToolContractExample: GovernedToolContractSpec;
```

## `governedToolContractJsonSchema`

Governed Tool Contract 的 JSON Schema。

- 种类: 常量
- 导入: `import { governedToolContractJsonSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const governedToolContractJsonSchema: JsonSchema;
```

## `governedToolContractJsonSchemas`

由 `contracts` 模块导出的 Governed Tool Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { governedToolContractJsonSchemas } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const governedToolContractJsonSchemas: Record<string, JsonSchema>;
```

## `governedToolContractSpecSchema`

Governed Tool Contract Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { governedToolContractSpecSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const governedToolContractSpecSchema: (typeof import('@codesoul-co/hypha-tools'))['governedToolContractSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `governedToolInvocationDefinition`

由 `contracts` 模块导出的 Governed Tool Invocation Definition 常量。

- 种类: 常量
- 导入: `import { governedToolInvocationDefinition } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const governedToolInvocationDefinition: SpecSchemaDefinition<GovernedToolInvocationRecord>;
```

## `governedToolInvocationExample`

Governed Tool Invocation 的有效示例值。

- 种类: 常量
- 导入: `import { governedToolInvocationExample } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const governedToolInvocationExample: GovernedToolInvocationRecord;
```

## `governedToolInvocationJsonSchema`

Governed Tool Invocation 的 JSON Schema。

- 种类: 常量
- 导入: `import { governedToolInvocationJsonSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const governedToolInvocationJsonSchema: JsonSchema;
```

## `governedToolInvocationRecordSchema`

Governed Tool Invocation Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { governedToolInvocationRecordSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const governedToolInvocationRecordSchema: (typeof import('@codesoul-co/hypha-tools'))['governedToolInvocationRecordSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `governedToolInvocationStatusSchema`

Governed Tool Invocation Status 的运行时 Schema。

- 种类: 常量
- 导入: `import { governedToolInvocationStatusSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const governedToolInvocationStatusSchema: z.ZodEnum<["created", "validating", "validated", "denied", "waiting_approval", "approved", "rejected", "queued", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "expired", "conflict"]>;
```

## `normalizedToolErrorSchema`

Normalized Tool Error 的运行时 Schema。

- 种类: 常量
- 导入: `import { normalizedToolErrorSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const normalizedToolErrorSchema: z.ZodObject<{ code: z.ZodEnum<["TOOL_NOT_FOUND", "TOOL_DISABLED", "TOOL_SCHEMA_INVALID", "TOOL_OUTPUT_INVALID", "TOOL_PERMISSION_DENIED", "TOOL_POLICY_DENIED", "TOOL_APPROVAL_REQUIRED", "TOOL_APPROVAL_REJECTED", "TOOL_APPROVAL_EXPIRED", "TOOL_IDEMPOTENCY_CONFLICT", "TOOL_CONCURRENCY_CONFLICT", "TOOL_TIMEOUT", "TOOL_CANCELLED", "TOOL_ADAPTER_UNAVAILABLE", "TOOL_RETRY_EXHAUSTED", "TOOL_LATE_RESULT", "TOOL_EXECUTION_FAILED", "TOOL_INTERNAL_ERROR"]>; message: z.ZodString; retryable: z.ZodBoolean; attempt: z.ZodOptional<z.ZodNumber>; providerCode: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>; details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; causeRef: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { code: "TOOL_NOT_FOUND" | "TOOL_DISABLED" | "TOOL_SCHEMA_INVALID" | "TOOL_OUTPUT_INVALID" | "TOOL_PERMISSION_DENIED" | "TOOL_POLICY_DENIED" | "TOOL_APPROVAL_REQUIRED" | "TOOL_APPROVAL_REJECTED" | "TOOL_APPROVAL_EXPIRED" | "TOOL_IDEMPOTENCY_CONFLICT" | "TOOL_CONCURRENCY_CONFLICT" | "TOOL_TIMEOUT" | "TOOL_CANCELLED" | "TOOL_ADAPTER_UNAVAILABLE" | "TOOL_RETRY_EXHAUSTED" | "TOOL_LATE_RESULT" | "TOOL_EXECUTION_FAILED" | "TOOL_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, unknown> | undefined; attempt?: number | undefined; providerCode?: string | number | undefined; causeRef?: string | undefined; }, { code: "TOOL_NOT_FOUND" | "TOOL_DISABLED" | "TOOL_SCHEMA_INVALID" | "TOOL_OUTPUT_INVALID" | "TOOL_PERMISSION_DENIED" | "TOOL_POLICY_DENIED" | "TOOL_APPROVAL_REQUIRED" | "TOOL_APPROVAL_REJECTED" | "TOOL_APPROVAL_EXPIRED" | "TOOL_IDEMPOTENCY_CONFLICT" | "TOOL_CONCURRENCY_CONFLICT" | "TOOL_TIMEOUT" | "TOOL_CANCELLED" | "TOOL_ADAPTER_UNAVAILABLE" | "TOOL_RETRY_EXHAUSTED" | "TOOL_LATE_RESULT" | "TOOL_EXECUTION_FAILED" | "TOOL_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, unknown> | undefined; attempt?: number | undefined; providerCode?: string | number | undefined; causeRef?: string | undefined; }>;
```

## `providerHealthSchema`

Provider Health 的运行时 Schema。

- 种类: 常量
- 导入: `import { providerHealthSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const providerHealthSchema: z.ZodObject<{ status: z.ZodEnum<["healthy", "degraded", "unhealthy", "unknown"]>; checkedAt: z.ZodString; latencyMs: z.ZodOptional<z.ZodNumber>; message: z.ZodOptional<z.ZodString>; details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { status: "unknown" | "healthy" | "degraded" | "unhealthy"; checkedAt: string; message?: string | undefined; latencyMs?: number | undefined; details?: Record<string, unknown> | undefined; }, { status: "unknown" | "healthy" | "degraded" | "unhealthy"; checkedAt: string; message?: string | undefined; latencyMs?: number | undefined; details?: Record<string, unknown> | undefined; }>;
```

## `toolCachePolicySpecSchema`

Tool Cache Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolCachePolicySpecSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const toolCachePolicySpecSchema: z.ZodObject<{ mode: z.ZodEnum<["disabled", "result", "observation_ref"]>; ttlSeconds: z.ZodOptional<z.ZodNumber>; scope: z.ZodEnum<["run", "session", "workspace", "tenant"]>; keyFields: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; includeToolRevision: z.ZodBoolean; includePolicyRevision: z.ZodBoolean; allowForSideEffectLevels: z.ZodOptional<z.ZodArray<z.ZodEnum<["none", "read", "write", "external_effect", "irreversible"]>, "many">>; staleWhileRevalidateSeconds: z.ZodOptional<z.ZodNumber>; }, "strip", z.ZodTypeAny, { mode: "disabled" | "result" | "observation_ref"; scope: "run" | "session" | "workspace" | "tenant"; includeToolRevision: boolean; includePolicyRevision: boolean; keyFields?: string[] | undefined; ttlSeconds?: number | undefined; allowForSideEffectLevels?: ("none" | "read" | "write" | "external_effect" | "irreversible")[] | undefined; staleWhileRevalidateSeconds?: number | undefined; }, { mode: "disabled" | "result" | "observation_ref"; scope: "run" | "session" | "workspace" | "tenant"; includeToolRevision: boolean; includePolicyRevision: boolean; keyFields?: string[] | undefined; ttlSeconds?: number | undefined; allowForSideEffectLevels?: ("none" | "read" | "write" | "external_effect" | "irreversible")[] | undefined; staleWhileRevalidateSeconds?: number | undefined; }>;
```

## `toolContractSnapshotDefinition`

由 `contracts` 模块导出的 Tool Contract Snapshot Definition 常量。

- 种类: 常量
- 导入: `import { toolContractSnapshotDefinition } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const toolContractSnapshotDefinition: SpecSchemaDefinition<ToolContractSnapshot>;
```

## `toolContractSnapshotExample`

Tool Contract Snapshot 的有效示例值。

- 种类: 常量
- 导入: `import { toolContractSnapshotExample } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const toolContractSnapshotExample: ToolContractSnapshot;
```

## `toolContractSnapshotItemSchema`

Tool Contract Snapshot Item 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolContractSnapshotItemSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const toolContractSnapshotItemSchema: z.ZodObject<{ toolId: z.ZodString; toolVersion: z.ZodString; toolRevision: z.ZodString; inputSchemaHash: z.ZodString; outputSchemaHash: z.ZodOptional<z.ZodString>; sourceCapabilityHash: z.ZodOptional<z.ZodString>; sideEffectLevel: z.ZodEnum<["none", "read", "write", "external_effect", "irreversible"]>; adapterRef: z.ZodString; }, "strip", z.ZodTypeAny, { toolId: string; toolVersion: string; toolRevision: string; inputSchemaHash: string; sideEffectLevel: "none" | "read" | "write" | "external_effect" | "irreversible"; adapterRef: string; outputSchemaHash?: string | undefined; sourceCapabilityHash?: string | undefined; }, { toolId: string; toolVersion: string; toolRevision: string; inputSchemaHash: string; sideEffectLevel: "none" | "read" | "write" | "external_effect" | "irreversible"; adapterRef: string; outputSchemaHash?: string | undefined; sourceCapabilityHash?: string | undefined; }>;
```

## `toolContractSnapshotJsonSchema`

Tool Contract Snapshot 的 JSON Schema。

- 种类: 常量
- 导入: `import { toolContractSnapshotJsonSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const toolContractSnapshotJsonSchema: JsonSchema;
```

## `toolContractSnapshotSchema`

Tool Contract Snapshot 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolContractSnapshotSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const toolContractSnapshotSchema: (typeof import('@codesoul-co/hypha-tools'))['toolContractSnapshotSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `toolEventPayloadBaseDefinition`

由 `contracts` 模块导出的 Tool Event Payload Base Definition 常量。

- 种类: 常量
- 导入: `import { toolEventPayloadBaseDefinition } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const toolEventPayloadBaseDefinition: SpecSchemaDefinition<ToolEventPayloadBase>;
```

## `toolEventPayloadBaseExample`

Tool Event Payload Base 的有效示例值。

- 种类: 常量
- 导入: `import { toolEventPayloadBaseExample } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const toolEventPayloadBaseExample: ToolEventPayloadBase;
```

## `toolEventPayloadBaseJsonSchema`

Tool Event Payload Base 的 JSON Schema。

- 种类: 常量
- 导入: `import { toolEventPayloadBaseJsonSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const toolEventPayloadBaseJsonSchema: JsonSchema;
```

## `toolEventPayloadBaseSchema`

Tool Event Payload Base 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolEventPayloadBaseSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const toolEventPayloadBaseSchema: (typeof import('@codesoul-co/hypha-tools'))['toolEventPayloadBaseSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `toolExecutionContextSpecSchema`

Tool Execution Context Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolExecutionContextSpecSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const toolExecutionContextSpecSchema: (typeof import('@codesoul-co/hypha-tools'))['toolExecutionContextSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `toolExecutionPolicySpecSchema`

Tool Execution Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolExecutionPolicySpecSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const toolExecutionPolicySpecSchema: (typeof import('@codesoul-co/hypha-tools'))['toolExecutionPolicySpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `toolGovernanceSpecSchema`

Tool Governance Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolGovernanceSpecSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const toolGovernanceSpecSchema: z.ZodObject<{ requiredPermissionScopes: z.ZodArray<z.ZodString, "many">; deniedPermissionScopes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; allowedPrincipalTypes: z.ZodOptional<z.ZodArray<z.ZodEnum<["user", "agent", "service", "system"]>, "many">>; policyRefs: z.ZodOptional<z.ZodArray<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; revision?: string | undefined; }, { id: string; version?: string | undefined; revision?: string | undefined; }>, "many">>; approvalPolicy: z.ZodOptional<z.ZodObject<{ required: z.ZodBoolean; reason: z.ZodOptional<z.ZodString>; approverRole: z.ZodOptional<z.ZodString>; timeoutPolicy: z.ZodOptional<z.ZodObject<{ timeoutMs: z.ZodNumber; onTimeout: z.ZodOptional<z.ZodEnum<["fail", "retry", "human_review"]>>; }, "strip", z.ZodTypeAny, { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; }, { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; }>>; }, "strip", z.ZodTypeAny, { required: boolean; reason?: string | undefined; approverRole?: string | undefined; timeoutPolicy?: { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; } | undefined; }, { required: boolean; reason?: string | undefined; approverRole?: string | undefined; timeoutPolicy?: { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; } | undefined; }>>; auditPolicy: z.ZodObject<{ enabled: z.ZodBoolean; includeInput: z.ZodOptional<z.ZodBoolean>; includeOutput: z.ZodOptional<z.ZodBoolean>; redactPaths: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { enabled: boolean; includeInput?: boolean | undefined; includeOutput?: boolean | undefined; redactPaths?: string[] | undefined; }, { enabled: boolean; includeInput?: boolean | undefined; includeOutput?: boolean | undefined; redactPaths?: string[] | undefined; }>; tenantIsolation: z.ZodOptional<z.ZodBoolean>; workspaceIsolation: z.ZodOptional<z.ZodBoolean>; allowDelegation: z.ZodOptional<z.ZodBoolean>; maxDelegationDepth: z.ZodOptional<z.ZodNumber>; }, "strip", z.ZodTypeAny, { requiredPermissionScopes: string[]; auditPolicy: { enabled: boolean; includeInput?: boolean | undefined; includeOutput?: boolean | undefined; redactPaths?: string[] | undefined; }; deniedPermissionScopes?: string[] | undefined; allowedPrincipalTypes?: ("user" | "agent" | "service" | "system")[] | undefined; policyRefs?: { id: string; version?: string | undefined; revision?: string | undefined; }[] | undefined; approvalPolicy?: { required: boolean; reason?: string | undefined; approverRole?: string | undefined; timeoutPolicy?: { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; } | undefined; } | undefined; tenantIsolation?: boolean | undefined; workspaceIsolation?: boolean | undefined; allowDelegation?: boolean | undefined; maxDelegationDepth?: number | undefined; }, { requiredPermissionScopes: string[]; auditPolicy: { enabled: boolean; includeInput?: boolean | undefined; includeOutput?: boolean | undefined; redactPaths?: string[] | undefined; }; deniedPermissionScopes?: string[] | undefined; allowedPrincipalTypes?: ("user" | "agent" | "service" | "system")[] | undefined; policyRefs?: { id: string; version?: string | undefined; revision?: string | undefined; }[] | undefined; approvalPolicy?: { required: boolean; reason?: string | undefined; approverRole?: string | undefined; timeoutPolicy?: { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; } | undefined; } | undefined; tenantIsolation?: boolean | undefined; workspaceIsolation?: boolean | undefined; allowDelegation?: boolean | undefined; maxDelegationDepth?: number | undefined; }>;
```

## `toolInvocationScopeSpecSchema`

Tool Invocation Scope Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolInvocationScopeSpecSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const toolInvocationScopeSpecSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; stepId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; fsmState: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { runId: string; userId: string; sessionId: string; agentId?: string | undefined; tenantId?: string | undefined; workspaceId?: string | undefined; stepId?: string | undefined; fsmState?: string | undefined; }, { runId: string; userId: string; sessionId: string; agentId?: string | undefined; tenantId?: string | undefined; workspaceId?: string | undefined; stepId?: string | undefined; fsmState?: string | undefined; }>;
```

## `toolObservabilitySpecSchema`

Tool Observability Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolObservabilitySpecSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const toolObservabilitySpecSchema: z.ZodObject<{ traceLevel: z.ZodEnum<["none", "metadata", "summary", "full_redacted"]>; recordInput: z.ZodOptional<z.ZodBoolean>; recordOutput: z.ZodOptional<z.ZodBoolean>; recordAttempts: z.ZodOptional<z.ZodBoolean>; recordPolicyDecision: z.ZodOptional<z.ZodBoolean>; metricsEnabled: z.ZodOptional<z.ZodBoolean>; redactionPolicyRef: z.ZodOptional<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; revision?: string | undefined; }, { id: string; version?: string | undefined; revision?: string | undefined; }>>; }, "strip", z.ZodTypeAny, { traceLevel: "metadata" | "none" | "summary" | "full_redacted"; recordInput?: boolean | undefined; recordOutput?: boolean | undefined; recordAttempts?: boolean | undefined; recordPolicyDecision?: boolean | undefined; metricsEnabled?: boolean | undefined; redactionPolicyRef?: { id: string; version?: string | undefined; revision?: string | undefined; } | undefined; }, { traceLevel: "metadata" | "none" | "summary" | "full_redacted"; recordInput?: boolean | undefined; recordOutput?: boolean | undefined; recordAttempts?: boolean | undefined; recordPolicyDecision?: boolean | undefined; metricsEnabled?: boolean | undefined; redactionPolicyRef?: { id: string; version?: string | undefined; revision?: string | undefined; } | undefined; }>;
```

## `toolPrincipalSpecSchema`

Tool Principal Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolPrincipalSpecSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const toolPrincipalSpecSchema: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; workspaceId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; delegatedBy: z.ZodOptional<z.ZodString>; delegationDepth: z.ZodOptional<z.ZodNumber>; authenticationContext: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; workspaceId?: string | undefined; roles?: string[] | undefined; delegatedBy?: string | undefined; delegationDepth?: number | undefined; authenticationContext?: Record<string, unknown> | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; workspaceId?: string | undefined; roles?: string[] | undefined; delegatedBy?: string | undefined; delegationDepth?: number | undefined; authenticationContext?: Record<string, unknown> | undefined; }>;
```

## `toolSchemaSpecSchema`

Tool Schema Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolSchemaSpecSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const toolSchemaSpecSchema: z.ZodObject<{ jsonSchema: z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>; schemaId: z.ZodOptional<z.ZodString>; schemaVersion: z.ZodOptional<z.ZodString>; schemaHash: z.ZodString; strict: z.ZodOptional<z.ZodBoolean>; allowAdditionalProperties: z.ZodOptional<z.ZodBoolean>; maxSerializedBytes: z.ZodOptional<z.ZodNumber>; sensitivePaths: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; redactedPaths: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { jsonSchema: JsonSchema; schemaHash: string; schemaId?: string | undefined; schemaVersion?: string | undefined; strict?: boolean | undefined; allowAdditionalProperties?: boolean | undefined; maxSerializedBytes?: number | undefined; sensitivePaths?: string[] | undefined; redactedPaths?: string[] | undefined; }, { jsonSchema: JsonSchema; schemaHash: string; schemaId?: string | undefined; schemaVersion?: string | undefined; strict?: boolean | undefined; allowAdditionalProperties?: boolean | undefined; maxSerializedBytes?: number | undefined; sensitivePaths?: string[] | undefined; redactedPaths?: string[] | undefined; }>;
```

## `toolSemanticSpecSchema`

Tool Semantic Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolSemanticSpecSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const toolSemanticSpecSchema: z.ZodType<ToolSemanticSpec, z.ZodTypeDef, ToolSemanticSpec>;
```

## `toolSourceRefSchema`

Tool Source Ref 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolSourceRefSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare const toolSourceRefSchema: z.ZodObject<{ adapterId: z.ZodOptional<z.ZodString>; handlerId: z.ZodOptional<z.ZodString>; endpointRef: z.ZodOptional<z.ZodString>; mcpServerId: z.ZodOptional<z.ZodString>; mcpCapabilityId: z.ZodOptional<z.ZodString>; mcpCapabilityHash: z.ZodOptional<z.ZodString>; pluginId: z.ZodOptional<z.ZodString>; hostedToolId: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { adapterId?: string | undefined; handlerId?: string | undefined; endpointRef?: string | undefined; mcpServerId?: string | undefined; mcpCapabilityId?: string | undefined; mcpCapabilityHash?: string | undefined; pluginId?: string | undefined; hostedToolId?: string | undefined; metadata?: Record<string, unknown> | undefined; }, { adapterId?: string | undefined; handlerId?: string | undefined; endpointRef?: string | undefined; mcpServerId?: string | undefined; mcpCapabilityId?: string | undefined; mcpCapabilityHash?: string | undefined; pluginId?: string | undefined; hostedToolId?: string | undefined; metadata?: Record<string, unknown> | undefined; }>;
```

## `canonicalJson`

Canonical JSON 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { canonicalJson } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare function canonicalJson(value: unknown): string;
```

### 调用签名

```text
canonicalJson(value: unknown): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `createToolCacheValidityKey`

Create Tool Cache Validity Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createToolCacheValidityKey } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare function createToolCacheValidityKey(input: ToolCacheValidityInput): string;
```

### 调用签名

```text
createToolCacheValidityKey(input: ToolCacheValidityInput): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>ToolCacheValidityInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `createToolSchemaSpec`

Create Tool Schema Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createToolSchemaSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare function createToolSchemaSpec(jsonSchema: JsonSchema, options?: Omit<Partial<ToolSchemaSpec>, 'jsonSchema' | 'schemaHash'>): ToolSchemaSpec;
```

### 调用签名

```text
createToolSchemaSpec(jsonSchema: JsonSchema, options?: Omit<Partial<ToolSchemaSpec>, "jsonSchema" | "schemaHash">): ToolSchemaSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `jsonSchema` | <code>JsonSchema</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `options` | <code>Omit&lt;Partial&lt;ToolSchemaSpec&gt;, "jsonSchema" &#124; "schemaHash"&gt;</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ToolSchemaSpec`
- 说明: 返回值契约由上述类型定义。

## `hashToolContract`

Hash Tool Contract 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { hashToolContract } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export declare function hashToolContract(value: unknown): string;
```

### 调用签名

```text
hashToolContract(value: unknown): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `EffectiveAgentCapabilitySnapshot`

Effective Agent Capability Snapshot 接口，共包含 17 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EffectiveAgentCapabilitySnapshot } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface EffectiveAgentCapabilitySnapshot {
    id: string;
    runId: string;
    agentId: string;
    principalId: string;
    tenantId?: string;
    domainId?: string;
    createdAt: string;
    expiresAt?: string;
    skillRevisions: Array<{
        id: string;
        version: string;
        contentHash: string;
    }>;
    allowedToolIds: string[];
    allowedMCPServerIds: string[];
    memoryAccess: 'none' | 'read' | 'write' | 'read_write';
    allowedExecutionProfiles: string[];
    maximumSideEffectLevel: SideEffectLevel;
    requiresHumanReview: boolean;
    policyRefs: string[];
    snapshotHash: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedExecutionProfiles` | 属性 | <code>allowedExecutionProfiles: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedMCPServerIds` | 属性 | <code>allowedMCPServerIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedToolIds` | 属性 | <code>allowedToolIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainId` | 属性 | <code>domainId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maximumSideEffectLevel` | 属性 | <code>maximumSideEffectLevel: SideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryAccess` | 属性 | <code>memoryAccess: "none" &#124; "read" &#124; "write" &#124; "read_write"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiresHumanReview` | 属性 | <code>requiresHumanReview: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillRevisions` | 属性 | <code>skillRevisions: { id: string; version: string; contentHash: string; }[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotHash` | 属性 | <code>snapshotHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EffectiveCapabilityApproval`

Effective Capability Approval 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EffectiveCapabilityApproval } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface EffectiveCapabilityApproval {
    taskId: string;
    subjectType: 'effective_capability_snapshot';
    subjectHash: string;
    snapshotId: string;
    runId: string;
    agentId: string;
    principalId: string;
    approvedBy: string;
    approvedAt: string;
    expiresAt: string;
    status: 'approved';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `approvedAt` | 属性 | <code>approvedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `approvedBy` | 属性 | <code>approvedBy: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotId` | 属性 | <code>snapshotId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "approved"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `subjectHash` | 属性 | <code>subjectHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `subjectType` | 属性 | <code>subjectType: "effective_capability_snapshot"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskId` | 属性 | <code>taskId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `GovernedHumanApprovalPolicySpec`

Governed Human Approval Policy Spec 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { GovernedHumanApprovalPolicySpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface GovernedHumanApprovalPolicySpec {
    mode: 'never' | 'policy' | 'always';
    requiredForSideEffects?: SideEffectLevel[];
    approverRoles?: string[];
    minApprovals?: number;
    expiresAfterSeconds?: number;
    allowParameterEdit?: boolean;
    requireReason?: boolean;
    revalidateOnResume?: boolean;
    escalationPolicyRef?: {
        id: string;
        version?: string;
        revision?: string;
    };
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowParameterEdit` | 属性 | <code>allowParameterEdit?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `approverRoles` | 属性 | <code>approverRoles?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `escalationPolicyRef` | 属性 | <code>escalationPolicyRef?: { id: string; version?: string; revision?: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAfterSeconds` | 属性 | <code>expiresAfterSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `minApprovals` | 属性 | <code>minApprovals?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "policy" &#124; "never" &#124; "always"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredForSideEffects` | 属性 | <code>requiredForSideEffects?: SideEffectLevel[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requireReason` | 属性 | <code>requireReason?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revalidateOnResume` | 属性 | <code>revalidateOnResume?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `GovernedHumanApprovalRequest`

Governed Human Approval Request 接口，共包含 19 个公开字段或方法。

- 种类: 接口
- 导入: `import type { GovernedHumanApprovalRequest } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface GovernedHumanApprovalRequest {
    id: string;
    revision: number;
    invocationId: string;
    toolRef: {
        id: string;
        version?: string;
        revision?: string;
    };
    toolRevision: string;
    scope: ToolInvocationScopeSpec;
    principal: ToolPrincipalSpec;
    requestSummary: string;
    parameterSummary?: unknown;
    parameterHash: string;
    riskSummary?: string;
    sideEffectLevel: SideEffectLevel;
    policyDecisionRef?: string;
    requestedAt: string;
    expiresAt?: string;
    status: 'pending' | 'approved' | 'rejected' | 'expired' | 'cancelled';
    decisions: HumanApprovalDecisionRecord[];
    pendingActionRef: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `decisions` | 属性 | <code>decisions: HumanApprovalDecisionRecord[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `parameterHash` | 属性 | <code>parameterHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `parameterSummary` | 属性 | <code>parameterSummary?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyDecisionRef` | 属性 | <code>policyDecisionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ToolPrincipalSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestSummary` | 属性 | <code>requestSummary: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `riskSummary` | 属性 | <code>riskSummary?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ToolInvocationScopeSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "rejected" &#124; "cancelled" &#124; "expired" &#124; "pending" &#124; "approved"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRef` | 属性 | <code>toolRef: { id: string; version?: string; revision?: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `GovernedToolContractSpec`

Governed Tool Contract Spec 接口，共包含 22 个公开字段或方法。

- 种类: 接口
- 导入: `import type { GovernedToolContractSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface GovernedToolContractSpec {
    id: string;
    version: string;
    revision: string;
    name: string;
    displayName?: string;
    description: string;
    instructions?: string;
    tags?: string[];
    input: ToolSchemaSpec;
    output?: ToolSchemaSpec;
    source: ToolSource;
    sourceRef?: ToolSourceRef;
    semantics: ToolSemanticSpec;
    execution: ToolExecutionPolicySpec;
    governance: ToolGovernanceSpec;
    observability: ToolObservabilitySpec;
    cache?: ToolCachePolicySpec;
    streaming?: ToolStreamingSpec;
    enabled?: boolean;
    deprecated?: boolean;
    replacedBy?: {
        id: string;
        version?: string;
        revision?: string;
    };
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cache` | 属性 | <code>cache?: ToolCachePolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deprecated` | 属性 | <code>deprecated?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `displayName` | 属性 | <code>displayName?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `enabled` | 属性 | <code>enabled?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `execution` | 属性 | <code>execution: ToolExecutionPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `governance` | 属性 | <code>governance: ToolGovernanceSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: ToolSchemaSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `instructions` | 属性 | <code>instructions?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observability` | 属性 | <code>observability: ToolObservabilitySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: ToolSchemaSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `replacedBy` | 属性 | <code>replacedBy?: { id: string; version?: string; revision?: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `semantics` | 属性 | <code>semantics: ToolSemanticSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: ToolSource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceRef` | 属性 | <code>sourceRef?: ToolSourceRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `streaming` | 属性 | <code>streaming?: ToolStreamingSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `GovernedToolInvocationRecord`

Governed Tool Invocation Record 接口，共包含 35 个公开字段或方法。

- 种类: 接口
- 导入: `import type { GovernedToolInvocationRecord } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface GovernedToolInvocationRecord {
    id: string;
    revision: number;
    operationId: string;
    toolRef: {
        id: string;
        version?: string;
        revision?: string;
    };
    toolRevision: string;
    contractSnapshotRef?: string;
    principal: ToolPrincipalSpec;
    scope: ToolInvocationScopeSpec;
    input?: unknown;
    inputHash: string;
    redactedInput?: unknown;
    status: GovernedToolInvocationStatus;
    sideEffectLevel: SideEffectLevel;
    idempotencyKey?: string;
    idempotencyFingerprint?: string;
    reusedFromInvocationId?: string;
    approvalRequestId?: string;
    currentAttempt: number;
    maxAttempts: number;
    queuedAt?: string;
    startedAt?: string;
    deadlineAt?: string;
    completedAt?: string;
    output?: unknown;
    outputHash?: string;
    artifactRefs?: string[];
    observationRefs?: string[];
    externalReceipt?: ToolExternalReceipt;
    error?: NormalizedToolError;
    lateResultState?: 'none' | 'pending' | 'accepted' | 'discarded' | 'quarantined';
    correlationId?: string;
    causationId?: string;
    createdAt: string;
    updatedAt: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvalRequestId` | 属性 | <code>approvalRequestId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `completedAt` | 属性 | <code>completedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `currentAttempt` | 属性 | <code>currentAttempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedToolError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `externalReceipt` | 属性 | <code>externalReceipt?: ToolExternalReceipt</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyFingerprint` | 属性 | <code>idempotencyFingerprint?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lateResultState` | 属性 | <code>lateResultState?: "none" &#124; "accepted" &#124; "quarantined" &#124; "pending" &#124; "discarded"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observationRefs` | 属性 | <code>observationRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputHash` | 属性 | <code>outputHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ToolPrincipalSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `queuedAt` | 属性 | <code>queuedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redactedInput` | 属性 | <code>redactedInput?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reusedFromInvocationId` | 属性 | <code>reusedFromInvocationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ToolInvocationScopeSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startedAt` | 属性 | <code>startedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: GovernedToolInvocationStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRef` | 属性 | <code>toolRef: { id: string; version?: string; revision?: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `HumanApprovalDecisionRecord`

Human Approval Decision Record 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { HumanApprovalDecisionRecord } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface HumanApprovalDecisionRecord {
    decidedBy: string;
    decision: 'approved' | 'rejected';
    reason?: string;
    decidedAt: string;
    parameterHash: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `decidedAt` | 属性 | <code>decidedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decidedBy` | 属性 | <code>decidedBy: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decision` | 属性 | <code>decision: "rejected" &#124; "approved"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `parameterHash` | 属性 | <code>parameterHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `NormalizedToolError`

Normalized Tool Error 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { NormalizedToolError } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface NormalizedToolError {
    code: 'TOOL_NOT_FOUND' | 'TOOL_DISABLED' | 'TOOL_SCHEMA_INVALID' | 'TOOL_OUTPUT_INVALID' | 'TOOL_PERMISSION_DENIED' | 'TOOL_POLICY_DENIED' | 'TOOL_APPROVAL_REQUIRED' | 'TOOL_APPROVAL_REJECTED' | 'TOOL_APPROVAL_EXPIRED' | 'TOOL_IDEMPOTENCY_CONFLICT' | 'TOOL_CONCURRENCY_CONFLICT' | 'TOOL_TIMEOUT' | 'TOOL_CANCELLED' | 'TOOL_ADAPTER_UNAVAILABLE' | 'TOOL_RETRY_EXHAUSTED' | 'TOOL_LATE_RESULT' | 'TOOL_EXECUTION_FAILED' | 'TOOL_INTERNAL_ERROR';
    message: string;
    retryable: boolean;
    attempt?: number;
    providerCode?: string | number;
    details?: Record<string, unknown>;
    causeRef?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causeRef` | 属性 | <code>causeRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>code: "TOOL_NOT_FOUND" &#124; "TOOL_DISABLED" &#124; "TOOL_SCHEMA_INVALID" &#124; "TOOL_OUTPUT_INVALID" &#124; "TOOL_PERMISSION_DENIED" &#124; "TOOL_POLICY_DENIED" &#124; "TOOL_APPROVAL_REQUIRED" &#124; "TOOL_APPROVAL_REJECTED" &#124; "TOOL_APPROVAL_EXPIRED" &#124; "TOOL_IDEMPOTENCY_CONFLICT" &#124; "TOOL_CONCURRENCY_CONFLICT" &#124; "TOOL_TIMEOUT" &#124; "TOOL_CANCELLED" &#124; "TOOL_ADAPTER_UNAVAILABLE" &#124; "TOOL_RETRY_EXHAUSTED" &#124; "TOOL_LATE_RESULT" &#124; "TOOL_EXECUTION_FAILED" &#124;...</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `details` | 属性 | <code>details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerCode` | 属性 | <code>providerCode?: string &#124; number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ProviderHealth`

Provider Health 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProviderHealth } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

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

## `ToolArtifactContract`

Tool Artifact Contract 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolArtifactContract } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolArtifactContract {
    kind?: string;
    mimeTypes?: string[];
    maxInlineBytes?: number;
    required?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `kind` | 属性 | <code>kind?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxInlineBytes` | 属性 | <code>maxInlineBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mimeTypes` | 属性 | <code>mimeTypes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `required` | 属性 | <code>required?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolCachePolicySpec`

Tool Cache Policy Spec 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolCachePolicySpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolCachePolicySpec {
    mode: 'disabled' | 'result' | 'observation_ref';
    ttlSeconds?: number;
    scope: 'run' | 'session' | 'workspace' | 'tenant';
    keyFields?: string[];
    includeToolRevision: boolean;
    includePolicyRevision: boolean;
    allowForSideEffectLevels?: SideEffectLevel[];
    staleWhileRevalidateSeconds?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowForSideEffectLevels` | 属性 | <code>allowForSideEffectLevels?: SideEffectLevel[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includePolicyRevision` | 属性 | <code>includePolicyRevision: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeToolRevision` | 属性 | <code>includeToolRevision: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `keyFields` | 属性 | <code>keyFields?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "disabled" &#124; "result" &#124; "observation_ref"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: "workspace" &#124; "session" &#124; "run" &#124; "tenant"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `staleWhileRevalidateSeconds` | 属性 | <code>staleWhileRevalidateSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlSeconds` | 属性 | <code>ttlSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolCacheValidityInput`

Tool Cache Validity Input 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolCacheValidityInput } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolCacheValidityInput {
    toolId: string;
    toolRevision: string;
    inputHash: string;
    scopeHash: string;
    policyRevision: string;
    contractSnapshotHash?: string;
    capabilityHash?: string;
    externalStateVersion?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityHash` | 属性 | <code>capabilityHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contractSnapshotHash` | 属性 | <code>contractSnapshotHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `externalStateVersion` | 属性 | <code>externalStateVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolCacheValidityRecord`

Tool Cache Validity Record 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolCacheValidityRecord } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolCacheValidityRecord extends ToolCacheValidityInput {
    key: string;
    validUntil?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityHash` | 属性 | <code>capabilityHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contractSnapshotHash` | 属性 | <code>contractSnapshotHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `externalStateVersion` | 属性 | <code>externalStateVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validUntil` | 属性 | <code>validUntil?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolCancellationPolicySpec`

Tool Cancellation Policy Spec 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolCancellationPolicySpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolCancellationPolicySpec {
    mode: 'cooperative' | 'provider' | 'unsupported';
    gracePeriodMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `gracePeriodMs` | 属性 | <code>gracePeriodMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "provider" &#124; "cooperative" &#124; "unsupported"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolConcurrencyPolicySpec`

Tool Concurrency Policy Spec 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolConcurrencyPolicySpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolConcurrencyPolicySpec {
    maxConcurrent?: number;
    keyFields?: string[];
    queueWhenBusy?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `keyFields` | 属性 | <code>keyFields?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxConcurrent` | 属性 | <code>maxConcurrent?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `queueWhenBusy` | 属性 | <code>queueWhenBusy?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolContractSnapshot`

Tool Contract Snapshot 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolContractSnapshot } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolContractSnapshot {
    id: string;
    runId: string;
    createdAt: string;
    toolContracts: ToolContractSnapshotItem[];
    catalogRevision?: string;
    policyRevision?: string;
    effectiveCapabilities?: EffectiveAgentCapabilitySnapshot;
    snapshotHash: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `catalogRevision` | 属性 | <code>catalogRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `effectiveCapabilities` | 属性 | <code>effectiveCapabilities?: EffectiveAgentCapabilitySnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotHash` | 属性 | <code>snapshotHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolContracts` | 属性 | <code>toolContracts: ToolContractSnapshotItem[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolContractSnapshotItem`

Tool Contract Snapshot Item 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolContractSnapshotItem } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolContractSnapshotItem {
    toolId: string;
    toolVersion: string;
    toolRevision: string;
    inputSchemaHash: string;
    outputSchemaHash?: string;
    sourceCapabilityHash?: string;
    sideEffectLevel: SideEffectLevel;
    adapterRef: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adapterRef` | 属性 | <code>adapterRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputSchemaHash` | 属性 | <code>inputSchemaHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputSchemaHash` | 属性 | <code>outputSchemaHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceCapabilityHash` | 属性 | <code>sourceCapabilityHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolVersion` | 属性 | <code>toolVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolContractSnapshotStore`

Tool Contract Snapshot Store 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolContractSnapshotStore } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolContractSnapshotStore {
    get(snapshotId: string): Promise<ToolContractSnapshot | null>;
    save(snapshot: ToolContractSnapshot): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(snapshotId: string): Promise&lt;ToolContractSnapshot &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `save` | 方法 | <code>save(snapshot: ToolContractSnapshot): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolEventPayloadBase`

Tool Event Payload Base 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolEventPayloadBase } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolEventPayloadBase {
    invocationId?: string;
    operationId?: string;
    toolId?: string;
    toolVersion?: string;
    toolRevision?: string;
    contractSnapshotRef?: string;
    scopeHash?: string;
    principalId?: string;
    sideEffectLevel?: SideEffectLevel;
    attempt?: number;
    latencyMs?: number;
    inputHash?: string;
    outputHash?: string;
    error?: NormalizedToolError;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedToolError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invocationId` | 属性 | <code>invocationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `latencyMs` | 属性 | <code>latencyMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputHash` | 属性 | <code>outputHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel?: SideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRevision` | 属性 | <code>toolRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolVersion` | 属性 | <code>toolVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolExecutionContextSpec`

Tool Execution Context Spec 接口，共包含 21 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolExecutionContextSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolExecutionContextSpec {
    principal: ToolPrincipalSpec;
    tenantId?: string;
    userId: string;
    workspaceId?: string;
    sessionId: string;
    runId: string;
    stepId?: string;
    agentId?: string;
    fsmState?: string;
    invocationId: string;
    operationId: string;
    idempotencyKey?: string;
    correlationId?: string;
    causationId?: string;
    parentEventId?: string;
    contractSnapshotRef?: string;
    capabilitySnapshotRef?: string;
    capabilityApprovals?: EffectiveCapabilityApproval[];
    deadlineAt?: string;
    abortSignal?: AbortSignal;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal?: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityApprovals` | 属性 | <code>capabilityApprovals?: EffectiveCapabilityApproval[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilitySnapshotRef` | 属性 | <code>capabilitySnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmState` | 属性 | <code>fsmState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `parentEventId` | 属性 | <code>parentEventId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ToolPrincipalSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolExecutionPolicySpec`

Tool Execution Policy Spec 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolExecutionPolicySpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolExecutionPolicySpec {
    timeout: TimeoutPolicySpec;
    retry: RetryPolicySpec;
    cancellation?: ToolCancellationPolicySpec;
    concurrency?: ToolConcurrencyPolicySpec;
    lateResult?: ToolLateResultPolicySpec;
    outputLimit?: ToolOutputLimitSpec;
    environmentRef?: {
        id: string;
        version?: string;
        revision?: string;
    };
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancellation` | 属性 | <code>cancellation?: ToolCancellationPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `concurrency` | 属性 | <code>concurrency?: ToolConcurrencyPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentRef` | 属性 | <code>environmentRef?: { id: string; version?: string; revision?: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lateResult` | 属性 | <code>lateResult?: ToolLateResultPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputLimit` | 属性 | <code>outputLimit?: ToolOutputLimitSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retry` | 属性 | <code>retry: RetryPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeout` | 属性 | <code>timeout: TimeoutPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolExternalReceipt`

Tool External Receipt 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolExternalReceipt } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolExternalReceipt {
    provider?: string;
    receiptId: string;
    status?: string;
    committedAt?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `committedAt` | 属性 | <code>committedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `receiptId` | 属性 | <code>receiptId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolGovernanceSpec`

Tool Governance Spec 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolGovernanceSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolGovernanceSpec {
    requiredPermissionScopes: string[];
    deniedPermissionScopes?: string[];
    allowedPrincipalTypes?: Array<'user' | 'agent' | 'service' | 'system'>;
    policyRefs?: Array<{
        id: string;
        version?: string;
        revision?: string;
    }>;
    approvalPolicy?: HumanReviewPolicySpec;
    auditPolicy: {
        enabled: boolean;
        includeInput?: boolean;
        includeOutput?: boolean;
        redactPaths?: string[];
    };
    tenantIsolation?: boolean;
    workspaceIsolation?: boolean;
    allowDelegation?: boolean;
    maxDelegationDepth?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowDelegation` | 属性 | <code>allowDelegation?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedPrincipalTypes` | 属性 | <code>allowedPrincipalTypes?: ("system" &#124; "agent" &#124; "user" &#124; "service")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `approvalPolicy` | 属性 | <code>approvalPolicy?: HumanReviewPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `auditPolicy` | 属性 | <code>auditPolicy: { enabled: boolean; includeInput?: boolean; includeOutput?: boolean; redactPaths?: string[]; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deniedPermissionScopes` | 属性 | <code>deniedPermissionScopes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxDelegationDepth` | 属性 | <code>maxDelegationDepth?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs?: { id: string; version?: string; revision?: string; }[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredPermissionScopes` | 属性 | <code>requiredPermissionScopes: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantIsolation` | 属性 | <code>tenantIsolation?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceIsolation` | 属性 | <code>workspaceIsolation?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolInvocationScopeSpec`

Tool Invocation Scope Spec 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolInvocationScopeSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolInvocationScopeSpec {
    tenantId?: string;
    userId: string;
    workspaceId?: string;
    sessionId: string;
    runId: string;
    stepId?: string;
    agentId?: string;
    fsmState?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmState` | 属性 | <code>fsmState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolLateResultPolicySpec`

Tool Late Result Policy Spec 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolLateResultPolicySpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolLateResultPolicySpec {
    mode: 'discard' | 'accept' | 'quarantine' | 'reconcile';
    reconciliationToolRef?: {
        id: string;
        version?: string;
        revision?: string;
    };
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mode` | 属性 | <code>mode: "reconcile" &#124; "quarantine" &#124; "discard" &#124; "accept"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconciliationToolRef` | 属性 | <code>reconciliationToolRef?: { id: string; version?: string; revision?: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolObservabilitySpec`

Tool Observability Spec 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolObservabilitySpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolObservabilitySpec {
    traceLevel: 'none' | 'metadata' | 'summary' | 'full_redacted';
    recordInput?: boolean;
    recordOutput?: boolean;
    recordAttempts?: boolean;
    recordPolicyDecision?: boolean;
    metricsEnabled?: boolean;
    redactionPolicyRef?: {
        id: string;
        version?: string;
        revision?: string;
    };
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `metricsEnabled` | 属性 | <code>metricsEnabled?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordAttempts` | 属性 | <code>recordAttempts?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordInput` | 属性 | <code>recordInput?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordOutput` | 属性 | <code>recordOutput?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordPolicyDecision` | 属性 | <code>recordPolicyDecision?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redactionPolicyRef` | 属性 | <code>redactionPolicyRef?: { id: string; version?: string; revision?: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceLevel` | 属性 | <code>traceLevel: "none" &#124; "metadata" &#124; "summary" &#124; "full_redacted"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolOutputLimitSpec`

Tool Output Limit Spec 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolOutputLimitSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolOutputLimitSpec {
    maxInlineBytes: number;
    overflow: 'fail' | 'truncate' | 'artifact';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxInlineBytes` | 属性 | <code>maxInlineBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `overflow` | 属性 | <code>overflow: "fail" &#124; "artifact" &#124; "truncate"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolPrincipalSpec`

Tool Principal Spec 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolPrincipalSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolPrincipalSpec {
    principalId: string;
    type: 'user' | 'agent' | 'service' | 'system';
    tenantId?: string;
    userId?: string;
    workspaceId?: string;
    agentId?: string;
    roles?: string[];
    permissionScopes: string[];
    delegatedBy?: string;
    delegationDepth?: number;
    authenticationContext?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `authenticationContext` | 属性 | <code>authenticationContext?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `delegatedBy` | 属性 | <code>delegatedBy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `delegationDepth` | 属性 | <code>delegationDepth?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `permissionScopes` | 属性 | <code>permissionScopes: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `roles` | 属性 | <code>roles?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolSchemaSpec`

Tool Schema Spec 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolSchemaSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolSchemaSpec {
    jsonSchema: JsonSchema;
    schemaId?: string;
    schemaVersion?: string;
    schemaHash: string;
    strict?: boolean;
    allowAdditionalProperties?: boolean;
    maxSerializedBytes?: number;
    sensitivePaths?: string[];
    redactedPaths?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowAdditionalProperties` | 属性 | <code>allowAdditionalProperties?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `jsonSchema` | 属性 | <code>jsonSchema: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxSerializedBytes` | 属性 | <code>maxSerializedBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redactedPaths` | 属性 | <code>redactedPaths?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaHash` | 属性 | <code>schemaHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaId` | 属性 | <code>schemaId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaVersion` | 属性 | <code>schemaVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sensitivePaths` | 属性 | <code>sensitivePaths?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `strict` | 属性 | <code>strict?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolSemanticSpec`

Tool Semantic Spec 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolSemanticSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolSemanticSpec {
    sideEffectLevel: SideEffectLevel;
    idempotency: 'none' | 'caller_key' | 'derived_key' | 'provider_key' | 'intrinsic';
    deterministic?: boolean;
    readOnlyHint?: boolean;
    destructiveHint?: boolean;
    openWorldHint?: boolean;
    preconditions?: PolicyRuleSpec[];
    postconditions?: PolicyRuleSpec[];
    expectedArtifacts?: ToolArtifactContract[];
    resultSemantics?: 'observation' | 'artifact' | 'state_patch' | 'external_receipt';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `destructiveHint` | 属性 | <code>destructiveHint?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deterministic` | 属性 | <code>deterministic?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedArtifacts` | 属性 | <code>expectedArtifacts?: ToolArtifactContract[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotency` | 属性 | <code>idempotency: "none" &#124; "caller_key" &#124; "derived_key" &#124; "provider_key" &#124; "intrinsic"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `openWorldHint` | 属性 | <code>openWorldHint?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `postconditions` | 属性 | <code>postconditions?: PolicyRuleSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preconditions` | 属性 | <code>preconditions?: PolicyRuleSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `readOnlyHint` | 属性 | <code>readOnlyHint?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resultSemantics` | 属性 | <code>resultSemantics?: "artifact" &#124; "observation" &#124; "state_patch" &#124; "external_receipt"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolSourceRef`

Tool Source Ref 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolSourceRef } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolSourceRef {
    adapterId?: string;
    handlerId?: string;
    endpointRef?: string;
    mcpServerId?: string;
    mcpCapabilityId?: string;
    mcpCapabilityHash?: string;
    pluginId?: string;
    hostedToolId?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adapterId` | 属性 | <code>adapterId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `endpointRef` | 属性 | <code>endpointRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `handlerId` | 属性 | <code>handlerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hostedToolId` | 属性 | <code>hostedToolId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mcpCapabilityHash` | 属性 | <code>mcpCapabilityHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mcpCapabilityId` | 属性 | <code>mcpCapabilityId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mcpServerId` | 属性 | <code>mcpServerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pluginId` | 属性 | <code>pluginId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolStreamingSpec`

Tool Streaming Spec 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolStreamingSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export interface ToolStreamingSpec {
    enabled: boolean;
    supportsProgress?: boolean;
    supportsStructuredContent?: boolean;
    maxUpdates?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `enabled` | 属性 | <code>enabled: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxUpdates` | 属性 | <code>maxUpdates?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `supportsProgress` | 属性 | <code>supportsProgress?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `supportsStructuredContent` | 属性 | <code>supportsStructuredContent?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `GovernedToolInvocationStatus`

Governed Tool Invocation Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { GovernedToolInvocationStatus } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export type GovernedToolInvocationStatus = 'created' | 'validating' | 'validated' | 'denied' | 'waiting_approval' | 'approved' | 'rejected' | 'queued' | 'running' | 'cancelling' | 'cancelled' | 'completed' | 'failed' | 'timed_out' | 'expired' | 'conflict';
```

## `ToolSource`

Tool Source 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ToolSource } from '@codesoul-co/hypha-tools';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### 声明

```text
export type ToolSource = 'local' | 'mcp' | 'http' | 'plugin' | 'hosted' | 'execution' | 'custom';
```
