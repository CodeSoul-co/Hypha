# `@codesoul-co/hypha-tools` / `contracts`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 模块指南: [学习与组合说明](/zh/packages/tools)
- 源码: [`packages/tools/src/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)
- 导出数: **76**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `effectiveAgentCapabilitySnapshotSchema` | 常量 | <code>const effectiveAgentCapabilitySnapshotSchema: z.ZodObject&lt;{ id: z.ZodString; runId: z.ZodString; agentId: z.ZodString; principalId: z.ZodString; tenantId: z.ZodOptional&lt;z.ZodString&gt;; domainId: z.ZodOptional&lt;z.ZodString&gt;; createdAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; skillRevisions: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; contentHash: z.ZodString; }, "strip", z.ZodTypeAny, {...</code> | effective Agent Capability Snapshot 的运行时 Schema。 |
| `effectiveCapabilityApprovalSchema` | 常量 | <code>const effectiveCapabilityApprovalSchema: z.ZodObject&lt;{ taskId: z.ZodString; subjectType: z.ZodLiteral&lt;"effective_capability_snapshot"&gt;; subjectHash: z.ZodString; snapshotId: z.ZodString; runId: z.ZodString; agentId: z.ZodString; principalId: z.ZodString; approvedBy: z.ZodString; approvedAt: z.ZodString; expiresAt: z.ZodString; status: z.ZodLiteral&lt;"approved"&gt;; }, "strict", z.ZodTypeAny, { status: "approved"; runId...</code> | effective Capability Approval 的运行时 Schema。 |
| `governedHumanApprovalDefinition` | 常量 | <code>const governedHumanApprovalDefinition: SpecSchemaDefinition&lt;GovernedHumanApprovalRequest&gt;</code> | 由 `contracts` 模块导出的 governed Human Approval Definition 常量。 |
| `governedHumanApprovalExample` | 常量 | <code>const governedHumanApprovalExample: GovernedHumanApprovalRequest</code> | governed Human Approval 的有效示例值。 |
| `governedHumanApprovalJsonSchema` | 常量 | <code>const governedHumanApprovalJsonSchema: JsonSchema</code> | governed Human Approval 的 JSON Schema。 |
| `governedHumanApprovalPolicySpecSchema` | 常量 | <code>const governedHumanApprovalPolicySpecSchema: z.ZodObject&lt;{ mode: z.ZodEnum&lt;["never", "policy", "always"]&gt;; requiredForSideEffects: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["none", "read", "write", "external_effect", "irreversible"]&gt;, "many"&gt;&gt;; approverRoles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; minApprovals: z.ZodOptional&lt;z.ZodNumber&gt;; expiresAfterSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; allowParameterEdit: z.Zo...</code> | governed Human Approval Policy Spec 的运行时 Schema。 |
| `governedHumanApprovalRequestSchema` | 常量 | <code>const governedHumanApprovalRequestSchema: z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; invocationId: z.ZodString; toolRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; ...</code> | governed Human Approval Request 的运行时 Schema。 |
| `governedToolContractDefinition` | 常量 | <code>const governedToolContractDefinition: SpecSchemaDefinition&lt;GovernedToolContractSpec&gt;</code> | 由 `contracts` 模块导出的 governed Tool Contract Definition 常量。 |
| `governedToolContractExample` | 常量 | <code>const governedToolContractExample: GovernedToolContractSpec</code> | governed Tool Contract 的有效示例值。 |
| `governedToolContractJsonSchema` | 常量 | <code>const governedToolContractJsonSchema: JsonSchema</code> | governed Tool Contract 的 JSON Schema。 |
| `governedToolContractJsonSchemas` | 常量 | <code>const governedToolContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts` 模块导出的 governed Tool Contract Json Schemas 常量。 |
| `governedToolContractSpecSchema` | 常量 | <code>const governedToolContractSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; revision: z.ZodString; name: z.ZodString; displayName: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodString; instructions: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; input: z.ZodObject&lt;{ jsonSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; schemaId: z.ZodOptional&lt;z.ZodString&gt;; s...</code> | governed Tool Contract Spec 的运行时 Schema。 |
| `governedToolInvocationDefinition` | 常量 | <code>const governedToolInvocationDefinition: SpecSchemaDefinition&lt;GovernedToolInvocationRecord&gt;</code> | 由 `contracts` 模块导出的 governed Tool Invocation Definition 常量。 |
| `governedToolInvocationExample` | 常量 | <code>const governedToolInvocationExample: GovernedToolInvocationRecord</code> | governed Tool Invocation 的有效示例值。 |
| `governedToolInvocationJsonSchema` | 常量 | <code>const governedToolInvocationJsonSchema: JsonSchema</code> | governed Tool Invocation 的 JSON Schema。 |
| `governedToolInvocationRecordSchema` | 常量 | <code>const governedToolInvocationRecordSchema: z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; operationId: z.ZodString; toolRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }...</code> | governed Tool Invocation Record 的运行时 Schema。 |
| `governedToolInvocationStatusSchema` | 常量 | <code>const governedToolInvocationStatusSchema: z.ZodEnum&lt;["created", "validating", "validated", "denied", "waiting_approval", "approved", "rejected", "queued", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "expired", "conflict"]&gt;</code> | governed Tool Invocation Status 的运行时 Schema。 |
| `normalizedToolErrorSchema` | 常量 | <code>const normalizedToolErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["TOOL_NOT_FOUND", "TOOL_DISABLED", "TOOL_SCHEMA_INVALID", "TOOL_OUTPUT_INVALID", "TOOL_PERMISSION_DENIED", "TOOL_POLICY_DENIED", "TOOL_APPROVAL_REQUIRED", "TOOL_APPROVAL_REJECTED", "TOOL_APPROVAL_EXPIRED", "TOOL_IDEMPOTENCY_CONFLICT", "TOOL_CONCURRENCY_CONFLICT", "TOOL_TIMEOUT", "TOOL_CANCELLED", "TOOL_ADAPTER_UNAVAILABLE", "TOOL_RETRY_EXHAUSTED", "TO...</code> | normalized Tool Error 的运行时 Schema。 |
| `providerHealthSchema` | 常量 | <code>const providerHealthSchema: z.ZodObject&lt;{ status: z.ZodEnum&lt;["healthy", "degraded", "unhealthy", "unknown"]&gt;; checkedAt: z.ZodString; latencyMs: z.ZodOptional&lt;z.ZodNumber&gt;; message: z.ZodOptional&lt;z.ZodString&gt;; details: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "strip", z.ZodTypeAny, { status: "unknown" &#124; "healthy" &#124; "degraded" &#124; "unhealthy"; checkedAt: string; message?: string &#124; undefined; latencyM...</code> | provider Health 的运行时 Schema。 |
| `toolCachePolicySpecSchema` | 常量 | <code>const toolCachePolicySpecSchema: z.ZodObject&lt;{ mode: z.ZodEnum&lt;["disabled", "result", "observation_ref"]&gt;; ttlSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; scope: z.ZodEnum&lt;["run", "session", "workspace", "tenant"]&gt;; keyFields: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; includeToolRevision: z.ZodBoolean; includePolicyRevision: z.ZodBoolean; allowForSideEffectLevels: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["none", "read", ...</code> | tool Cache Policy Spec 的运行时 Schema。 |
| `toolContractSnapshotDefinition` | 常量 | <code>const toolContractSnapshotDefinition: SpecSchemaDefinition&lt;ToolContractSnapshot&gt;</code> | 由 `contracts` 模块导出的 tool Contract Snapshot Definition 常量。 |
| `toolContractSnapshotExample` | 常量 | <code>const toolContractSnapshotExample: ToolContractSnapshot</code> | tool Contract Snapshot 的有效示例值。 |
| `toolContractSnapshotItemSchema` | 常量 | <code>const toolContractSnapshotItemSchema: z.ZodObject&lt;{ toolId: z.ZodString; toolVersion: z.ZodString; toolRevision: z.ZodString; inputSchemaHash: z.ZodString; outputSchemaHash: z.ZodOptional&lt;z.ZodString&gt;; sourceCapabilityHash: z.ZodOptional&lt;z.ZodString&gt;; sideEffectLevel: z.ZodEnum&lt;["none", "read", "write", "external_effect", "irreversible"]&gt;; adapterRef: z.ZodString; }, "strip", z.ZodTypeAny, { toolId: string; toolVe...</code> | tool Contract Snapshot Item 的运行时 Schema。 |
| `toolContractSnapshotJsonSchema` | 常量 | <code>const toolContractSnapshotJsonSchema: JsonSchema</code> | tool Contract Snapshot 的 JSON Schema。 |
| `toolContractSnapshotSchema` | 常量 | <code>const toolContractSnapshotSchema: z.ZodObject&lt;{ id: z.ZodString; runId: z.ZodString; createdAt: z.ZodString; toolContracts: z.ZodArray&lt;z.ZodObject&lt;{ toolId: z.ZodString; toolVersion: z.ZodString; toolRevision: z.ZodString; inputSchemaHash: z.ZodString; outputSchemaHash: z.ZodOptional&lt;z.ZodString&gt;; sourceCapabilityHash: z.ZodOptional&lt;z.ZodString&gt;; sideEffectLevel: z.ZodEnum&lt;["none", "read", "write", "external_effec...</code> | tool Contract Snapshot 的运行时 Schema。 |
| `toolEventPayloadBaseDefinition` | 常量 | <code>const toolEventPayloadBaseDefinition: SpecSchemaDefinition&lt;ToolEventPayloadBase&gt;</code> | 由 `contracts` 模块导出的 tool Event Payload Base Definition 常量。 |
| `toolEventPayloadBaseExample` | 常量 | <code>const toolEventPayloadBaseExample: ToolEventPayloadBase</code> | tool Event Payload Base 的有效示例值。 |
| `toolEventPayloadBaseJsonSchema` | 常量 | <code>const toolEventPayloadBaseJsonSchema: JsonSchema</code> | tool Event Payload Base 的 JSON Schema。 |
| `toolEventPayloadBaseSchema` | 常量 | <code>const toolEventPayloadBaseSchema: z.ZodObject&lt;{ invocationId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodOptional&lt;z.ZodString&gt;; toolId: z.ZodOptional&lt;z.ZodString&gt;; toolVersion: z.ZodOptional&lt;z.ZodString&gt;; toolRevision: z.ZodOptional&lt;z.ZodString&gt;; contractSnapshotRef: z.ZodOptional&lt;z.ZodString&gt;; scopeHash: z.ZodOptional&lt;z.ZodString&gt;; principalId: z.ZodOptional&lt;z.ZodString&gt;; sideEffectLevel: z.ZodOptional&lt;z.ZodEn...</code> | tool Event Payload Base 的运行时 Schema。 |
| `toolExecutionContextSpecSchema` | 常量 | <code>const toolExecutionContextSpecSchema: z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;;...</code> | tool Execution Context Spec 的运行时 Schema。 |
| `toolExecutionPolicySpecSchema` | 常量 | <code>const toolExecutionPolicySpecSchema: z.ZodObject&lt;{ timeout: z.ZodObject&lt;{ timeoutMs: z.ZodNumber; onTimeout: z.ZodOptional&lt;z.ZodEnum&lt;["fail", "retry", "human_review"]&gt;&gt;; }, "strip", z.ZodTypeAny, { timeoutMs: number; onTimeout?: "fail" &#124; "retry" &#124; "human_review" &#124; undefined; }, { timeoutMs: number; onTimeout?: "fail" &#124; "retry" &#124; "human_review" &#124; undefined; }&gt;; retry: z.ZodObject&lt;{ maxAttempts: z.ZodNumber; backoff...</code> | tool Execution Policy Spec 的运行时 Schema。 |
| `toolGovernanceSpecSchema` | 常量 | <code>const toolGovernanceSpecSchema: z.ZodObject&lt;{ requiredPermissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; deniedPermissionScopes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; allowedPrincipalTypes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;, "many"&gt;&gt;; policyRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z....</code> | tool Governance Spec 的运行时 Schema。 |
| `toolInvocationScopeSpecSchema` | 常量 | <code>const toolInvocationScopeSpecSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; stepId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; fsmState: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { runId: string; userId: string; sessionId: string; agentId?: string &#124; undefined; ten...</code> | tool Invocation Scope Spec 的运行时 Schema。 |
| `toolObservabilitySpecSchema` | 常量 | <code>const toolObservabilitySpecSchema: z.ZodObject&lt;{ traceLevel: z.ZodEnum&lt;["none", "metadata", "summary", "full_redacted"]&gt;; recordInput: z.ZodOptional&lt;z.ZodBoolean&gt;; recordOutput: z.ZodOptional&lt;z.ZodBoolean&gt;; recordAttempts: z.ZodOptional&lt;z.ZodBoolean&gt;; recordPolicyDecision: z.ZodOptional&lt;z.ZodBoolean&gt;; metricsEnabled: z.ZodOptional&lt;z.ZodBoolean&gt;; redactionPolicyRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; vers...</code> | tool Observability Spec 的运行时 Schema。 |
| `toolPrincipalSpecSchema` | 常量 | <code>const toolPrincipalSpecSchema: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; delegatedBy: z.ZodOptional&lt;z.Zo...</code> | tool Principal Spec 的运行时 Schema。 |
| `toolSchemaSpecSchema` | 常量 | <code>const toolSchemaSpecSchema: z.ZodObject&lt;{ jsonSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; schemaId: z.ZodOptional&lt;z.ZodString&gt;; schemaVersion: z.ZodOptional&lt;z.ZodString&gt;; schemaHash: z.ZodString; strict: z.ZodOptional&lt;z.ZodBoolean&gt;; allowAdditionalProperties: z.ZodOptional&lt;z.ZodBoolean&gt;; maxSerializedBytes: z.ZodOptional&lt;z.ZodNumber&gt;; sensitivePaths: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; red...</code> | tool Schema Spec 的运行时 Schema。 |
| `toolSemanticSpecSchema` | 常量 | <code>const toolSemanticSpecSchema: z.ZodType&lt;ToolSemanticSpec, z.ZodTypeDef, ToolSemanticSpec&gt;</code> | tool Semantic Spec 的运行时 Schema。 |
| `toolSourceRefSchema` | 常量 | <code>const toolSourceRefSchema: z.ZodObject&lt;{ adapterId: z.ZodOptional&lt;z.ZodString&gt;; handlerId: z.ZodOptional&lt;z.ZodString&gt;; endpointRef: z.ZodOptional&lt;z.ZodString&gt;; mcpServerId: z.ZodOptional&lt;z.ZodString&gt;; mcpCapabilityId: z.ZodOptional&lt;z.ZodString&gt;; mcpCapabilityHash: z.ZodOptional&lt;z.ZodString&gt;; pluginId: z.ZodOptional&lt;z.ZodString&gt;; hostedToolId: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodStr...</code> | tool Source Ref 的运行时 Schema。 |
| `canonicalJson` | 函数 | <code>canonicalJson(value: unknown): string</code> | 判断能否 onical Json。 |
| `createToolCacheValidityKey` | 函数 | <code>createToolCacheValidityKey(input: ToolCacheValidityInput): string</code> | 创建 Tool Cache Validity Key。 |
| `createToolSchemaSpec` | 函数 | <code>createToolSchemaSpec(jsonSchema: JsonSchema, options?: Omit&lt;Partial&lt;ToolSchemaSpec&gt;, "jsonSchema" &#124; "schemaHash"&gt;): ToolSchemaSpec</code> | 创建 Tool Schema Spec。 |
| `hashToolContract` | 函数 | <code>hashToolContract(value: unknown): string</code> | 判断是否存在 h Tool Contract。 |
| `EffectiveAgentCapabilitySnapshot` | 接口 | <code>interface EffectiveAgentCapabilitySnapshot</code> | Effective Agent Capability Snapshot 的字段契约；完整字段见下表。 |
| `EffectiveCapabilityApproval` | 接口 | <code>interface EffectiveCapabilityApproval</code> | Effective Capability Approval 的字段契约；完整字段见下表。 |
| `GovernedHumanApprovalPolicySpec` | 接口 | <code>interface GovernedHumanApprovalPolicySpec</code> | Governed Human Approval Policy Spec 的字段契约；完整字段见下表。 |
| `GovernedHumanApprovalRequest` | 接口 | <code>interface GovernedHumanApprovalRequest</code> | Governed Human Approval Request 的字段契约；完整字段见下表。 |
| `GovernedToolContractSpec` | 接口 | <code>interface GovernedToolContractSpec</code> | Governed Tool Contract Spec 的字段契约；完整字段见下表。 |
| `GovernedToolInvocationRecord` | 接口 | <code>interface GovernedToolInvocationRecord</code> | Governed Tool Invocation Record 的字段契约；完整字段见下表。 |
| `HumanApprovalDecisionRecord` | 接口 | <code>interface HumanApprovalDecisionRecord</code> | Human Approval Decision Record 的字段契约；完整字段见下表。 |
| `NormalizedToolError` | 接口 | <code>interface NormalizedToolError</code> | Normalized Tool Error 的字段契约；完整字段见下表。 |
| `ProviderHealth` | 接口 | <code>interface ProviderHealth</code> | Provider Health 的字段契约；完整字段见下表。 |
| `ToolArtifactContract` | 接口 | <code>interface ToolArtifactContract</code> | Tool Artifact Contract 的字段契约；完整字段见下表。 |
| `ToolCachePolicySpec` | 接口 | <code>interface ToolCachePolicySpec</code> | Tool Cache Policy Spec 的字段契约；完整字段见下表。 |
| `ToolCacheValidityInput` | 接口 | <code>interface ToolCacheValidityInput</code> | Tool Cache Validity Input 的字段契约；完整字段见下表。 |
| `ToolCacheValidityRecord` | 接口 | <code>interface ToolCacheValidityRecord extends ToolCacheValidityInput</code> | Tool Cache Validity Record 的字段契约；完整字段见下表。 |
| `ToolCancellationPolicySpec` | 接口 | <code>interface ToolCancellationPolicySpec</code> | Tool Cancellation Policy Spec 的字段契约；完整字段见下表。 |
| `ToolConcurrencyPolicySpec` | 接口 | <code>interface ToolConcurrencyPolicySpec</code> | Tool Concurrency Policy Spec 的字段契约；完整字段见下表。 |
| `ToolContractSnapshot` | 接口 | <code>interface ToolContractSnapshot</code> | Tool Contract Snapshot 的字段契约；完整字段见下表。 |
| `ToolContractSnapshotItem` | 接口 | <code>interface ToolContractSnapshotItem</code> | Tool Contract Snapshot Item 的字段契约；完整字段见下表。 |
| `ToolContractSnapshotStore` | 接口 | <code>interface ToolContractSnapshotStore</code> | Tool Contract Snapshot Store 的字段契约；完整字段见下表。 |
| `ToolEventPayloadBase` | 接口 | <code>interface ToolEventPayloadBase</code> | Tool Event Payload Base 的字段契约；完整字段见下表。 |
| `ToolExecutionContextSpec` | 接口 | <code>interface ToolExecutionContextSpec</code> | Tool Execution Context Spec 的字段契约；完整字段见下表。 |
| `ToolExecutionPolicySpec` | 接口 | <code>interface ToolExecutionPolicySpec</code> | Tool Execution Policy Spec 的字段契约；完整字段见下表。 |
| `ToolExternalReceipt` | 接口 | <code>interface ToolExternalReceipt</code> | Tool External Receipt 的字段契约；完整字段见下表。 |
| `ToolGovernanceSpec` | 接口 | <code>interface ToolGovernanceSpec</code> | Tool Governance Spec 的字段契约；完整字段见下表。 |
| `ToolInvocationScopeSpec` | 接口 | <code>interface ToolInvocationScopeSpec</code> | Tool Invocation Scope Spec 的字段契约；完整字段见下表。 |
| `ToolLateResultPolicySpec` | 接口 | <code>interface ToolLateResultPolicySpec</code> | Tool Late Result Policy Spec 的字段契约；完整字段见下表。 |
| `ToolObservabilitySpec` | 接口 | <code>interface ToolObservabilitySpec</code> | Tool Observability Spec 的字段契约；完整字段见下表。 |
| `ToolOutputLimitSpec` | 接口 | <code>interface ToolOutputLimitSpec</code> | Tool Output Limit Spec 的字段契约；完整字段见下表。 |
| `ToolPrincipalSpec` | 接口 | <code>interface ToolPrincipalSpec</code> | Tool Principal Spec 的字段契约；完整字段见下表。 |
| `ToolSchemaSpec` | 接口 | <code>interface ToolSchemaSpec</code> | Tool Schema Spec 的字段契约；完整字段见下表。 |
| `ToolSemanticSpec` | 接口 | <code>interface ToolSemanticSpec</code> | Tool Semantic Spec 的字段契约；完整字段见下表。 |
| `ToolSourceRef` | 接口 | <code>interface ToolSourceRef</code> | Tool Source Ref 的字段契约；完整字段见下表。 |
| `ToolStreamingSpec` | 接口 | <code>interface ToolStreamingSpec</code> | Tool Streaming Spec 的字段契约；完整字段见下表。 |
| `GovernedToolInvocationStatus` | 类型 | <code>type GovernedToolInvocationStatus = 'created' &#124; 'validating' &#124; 'validated' &#124; 'denied' &#124; 'waiting_approval' &#124; 'approved' &#124; 'rejected' &#124; 'queued' &#124; 'running' &#124; 'cancelling' &#124; 'cancelled' &#124; 'completed' &#124; 'failed' &#124; 'timed_out' &#124; 'expired' &#124; 'conflict'</code> | Governed Tool Invocation Status 的公共类型别名。 |
| `ToolSource` | 类型 | <code>type ToolSource = 'local' &#124; 'mcp' &#124; 'http' &#124; 'plugin' &#124; 'hosted' &#124; 'execution' &#124; 'custom'</code> | Tool Source 的公共类型别名。 |

## `EffectiveAgentCapabilitySnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `allowedExecutionProfiles` | 属性 | <code>allowedExecutionProfiles: string[]</code> | allowed Execution Profiles 字段。 |
| `allowedMCPServerIds` | 属性 | <code>allowedMCPServerIds: string[]</code> | allowed MCP Server Ids 字段。 |
| `allowedToolIds` | 属性 | <code>allowedToolIds: string[]</code> | allowed Tool Ids 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `domainId` | 属性 | <code>domainId: string</code> | domain Id 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `maximumSideEffectLevel` | 属性 | <code>maximumSideEffectLevel: SideEffectLevel</code> | maximum Side Effect Level 字段。 |
| `memoryAccess` | 属性 | <code>memoryAccess: "none" &#124; "read" &#124; "write" &#124; "read_write"</code> | memory Access 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: string[]</code> | policy Refs 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `requiresHumanReview` | 属性 | <code>requiresHumanReview: boolean</code> | requires Human Review 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `skillRevisions` | 属性 | <code>skillRevisions: { id: string; version: string; contentHash: string; }[]</code> | skill Revisions 字段。 |
| `snapshotHash` | 属性 | <code>snapshotHash: string</code> | snapshot Hash 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |

## `EffectiveCapabilityApproval` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `approvedAt` | 属性 | <code>approvedAt: string</code> | approved At 字段。 |
| `approvedBy` | 属性 | <code>approvedBy: string</code> | approved By 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `snapshotId` | 属性 | <code>snapshotId: string</code> | snapshot Id 字段。 |
| `status` | 属性 | <code>status: "approved"</code> | status 字段。 |
| `subjectHash` | 属性 | <code>subjectHash: string</code> | subject Hash 字段。 |
| `subjectType` | 属性 | <code>subjectType: "effective_capability_snapshot"</code> | subject Type 字段。 |
| `taskId` | 属性 | <code>taskId: string</code> | task Id 字段。 |

## `GovernedHumanApprovalPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowParameterEdit` | 属性 | <code>allowParameterEdit: boolean</code> | allow Parameter Edit 字段。 |
| `approverRoles` | 属性 | <code>approverRoles: string[]</code> | approver Roles 字段。 |
| `escalationPolicyRef` | 属性 | <code>escalationPolicyRef: { id: string; version?: string; revision?: string; }</code> | escalation Policy Ref 字段。 |
| `expiresAfterSeconds` | 属性 | <code>expiresAfterSeconds: number</code> | expires After Seconds 字段。 |
| `minApprovals` | 属性 | <code>minApprovals: number</code> | min Approvals 字段。 |
| `mode` | 属性 | <code>mode: "policy" &#124; "never" &#124; "always"</code> | mode 字段。 |
| `requiredForSideEffects` | 属性 | <code>requiredForSideEffects: SideEffectLevel[]</code> | required For Side Effects 字段。 |
| `requireReason` | 属性 | <code>requireReason: boolean</code> | require Reason 字段。 |
| `revalidateOnResume` | 属性 | <code>revalidateOnResume: boolean</code> | revalidate On Resume 字段。 |

## `GovernedHumanApprovalRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `decisions` | 属性 | <code>decisions: HumanApprovalDecisionRecord[]</code> | decisions 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | invocation Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `parameterHash` | 属性 | <code>parameterHash: string</code> | parameter Hash 字段。 |
| `parameterSummary` | 属性 | <code>parameterSummary: unknown</code> | parameter Summary 字段。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef: string</code> | pending Action Ref 字段。 |
| `policyDecisionRef` | 属性 | <code>policyDecisionRef: string</code> | policy Decision Ref 字段。 |
| `principal` | 属性 | <code>principal: ToolPrincipalSpec</code> | principal 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `requestSummary` | 属性 | <code>requestSummary: string</code> | request Summary 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `riskSummary` | 属性 | <code>riskSummary: string</code> | risk Summary 字段。 |
| `scope` | 属性 | <code>scope: ToolInvocationScopeSpec</code> | scope 字段。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | side Effect Level 字段。 |
| `status` | 属性 | <code>status: "rejected" &#124; "cancelled" &#124; "expired" &#124; "pending" &#124; "approved"</code> | status 字段。 |
| `toolRef` | 属性 | <code>toolRef: { id: string; version?: string; revision?: string; }</code> | tool Ref 字段。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | tool Revision 字段。 |

## `GovernedToolContractSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cache` | 属性 | <code>cache: ToolCachePolicySpec</code> | cache 字段。 |
| `deprecated` | 属性 | <code>deprecated: boolean</code> | deprecated 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `displayName` | 属性 | <code>displayName: string</code> | display Name 字段。 |
| `enabled` | 属性 | <code>enabled: boolean</code> | enabled 字段。 |
| `execution` | 属性 | <code>execution: ToolExecutionPolicySpec</code> | execution 字段。 |
| `governance` | 属性 | <code>governance: ToolGovernanceSpec</code> | governance 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `input` | 属性 | <code>input: ToolSchemaSpec</code> | input 字段。 |
| `instructions` | 属性 | <code>instructions: string</code> | instructions 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `observability` | 属性 | <code>observability: ToolObservabilitySpec</code> | observability 字段。 |
| `output` | 属性 | <code>output: ToolSchemaSpec</code> | output 字段。 |
| `replacedBy` | 属性 | <code>replacedBy: { id: string; version?: string; revision?: string; }</code> | replaced By 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `semantics` | 属性 | <code>semantics: ToolSemanticSpec</code> | semantics 字段。 |
| `source` | 属性 | <code>source: ToolSource</code> | source 字段。 |
| `sourceRef` | 属性 | <code>sourceRef: ToolSourceRef</code> | source Ref 字段。 |
| `streaming` | 属性 | <code>streaming: ToolStreamingSpec</code> | streaming 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `GovernedToolInvocationRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvalRequestId` | 属性 | <code>approvalRequestId: string</code> | approval Request Id 字段。 |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef: string</code> | contract Snapshot Ref 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `currentAttempt` | 属性 | <code>currentAttempt: number</code> | current Attempt 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `error` | 属性 | <code>error: NormalizedToolError</code> | error 字段。 |
| `externalReceipt` | 属性 | <code>externalReceipt: ToolExternalReceipt</code> | external Receipt 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `idempotencyFingerprint` | 属性 | <code>idempotencyFingerprint: string</code> | idempotency Fingerprint 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `input` | 属性 | <code>input: unknown</code> | input 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `lateResultState` | 属性 | <code>lateResultState: "none" &#124; "accepted" &#124; "quarantined" &#124; "pending" &#124; "discarded"</code> | late Result State 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `observationRefs` | 属性 | <code>observationRefs: string[]</code> | observation Refs 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `output` | 属性 | <code>output: unknown</code> | output 字段。 |
| `outputHash` | 属性 | <code>outputHash: string</code> | output Hash 字段。 |
| `principal` | 属性 | <code>principal: ToolPrincipalSpec</code> | principal 字段。 |
| `queuedAt` | 属性 | <code>queuedAt: string</code> | queued At 字段。 |
| `redactedInput` | 属性 | <code>redactedInput: unknown</code> | redacted Input 字段。 |
| `reusedFromInvocationId` | 属性 | <code>reusedFromInvocationId: string</code> | reused From Invocation Id 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `scope` | 属性 | <code>scope: ToolInvocationScopeSpec</code> | scope 字段。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | side Effect Level 字段。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | started At 字段。 |
| `status` | 属性 | <code>status: GovernedToolInvocationStatus</code> | status 字段。 |
| `toolRef` | 属性 | <code>toolRef: { id: string; version?: string; revision?: string; }</code> | tool Ref 字段。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | tool Revision 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `HumanApprovalDecisionRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `decidedAt` | 属性 | <code>decidedAt: string</code> | decided At 字段。 |
| `decidedBy` | 属性 | <code>decidedBy: string</code> | decided By 字段。 |
| `decision` | 属性 | <code>decision: "rejected" &#124; "approved"</code> | decision 字段。 |
| `parameterHash` | 属性 | <code>parameterHash: string</code> | parameter Hash 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |

## `NormalizedToolError` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt: number</code> | attempt 字段。 |
| `causeRef` | 属性 | <code>causeRef: string</code> | cause Ref 字段。 |
| `code` | 属性 | <code>code: "TOOL_NOT_FOUND" &#124; "TOOL_DISABLED" &#124; "TOOL_SCHEMA_INVALID" &#124; "TOOL_OUTPUT_INVALID" &#124; "TOOL_PERMISSION_DENIED" &#124; "TOOL_POLICY_DENIED" &#124; "TOOL_APPROVAL_REQUIRED" &#124; "TOOL_APPROVAL_REJECTED" &#124; "TOOL_APPROVAL_EXPIRED" &#124; "TOOL_IDEMPOTENCY_CONFLICT" &#124; "TOOL_CONCURRENCY_CONFLICT" &#124; "TOOL_TIMEOUT" &#124; "TOOL_CANCELLED" &#124; "TOOL_ADAPTER_UNAVAILABLE" &#124; "TOOL_RETRY_EXHAUSTED" &#124; "TOOL_LATE_RESULT" &#124; "TOOL_EXECUTION_FAILED" &#124;...</code> | code 字段。 |
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

## `ToolArtifactContract` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `kind` | 属性 | <code>kind: string</code> | kind 字段。 |
| `maxInlineBytes` | 属性 | <code>maxInlineBytes: number</code> | max Inline Bytes 字段。 |
| `mimeTypes` | 属性 | <code>mimeTypes: string[]</code> | mime Types 字段。 |
| `required` | 属性 | <code>required: boolean</code> | required 字段。 |

## `ToolCachePolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowForSideEffectLevels` | 属性 | <code>allowForSideEffectLevels: SideEffectLevel[]</code> | allow For Side Effect Levels 字段。 |
| `includePolicyRevision` | 属性 | <code>includePolicyRevision: boolean</code> | include Policy Revision 字段。 |
| `includeToolRevision` | 属性 | <code>includeToolRevision: boolean</code> | include Tool Revision 字段。 |
| `keyFields` | 属性 | <code>keyFields: string[]</code> | key Fields 字段。 |
| `mode` | 属性 | <code>mode: "disabled" &#124; "result" &#124; "observation_ref"</code> | mode 字段。 |
| `scope` | 属性 | <code>scope: "workspace" &#124; "session" &#124; "run" &#124; "tenant"</code> | scope 字段。 |
| `staleWhileRevalidateSeconds` | 属性 | <code>staleWhileRevalidateSeconds: number</code> | stale While Revalidate Seconds 字段。 |
| `ttlSeconds` | 属性 | <code>ttlSeconds: number</code> | ttl Seconds 字段。 |

## `ToolCacheValidityInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityHash` | 属性 | <code>capabilityHash: string</code> | capability Hash 字段。 |
| `contractSnapshotHash` | 属性 | <code>contractSnapshotHash: string</code> | contract Snapshot Hash 字段。 |
| `externalStateVersion` | 属性 | <code>externalStateVersion: string</code> | external State Version 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | tool Revision 字段。 |

## `ToolCacheValidityRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityHash` | 属性 | <code>capabilityHash: string</code> | capability Hash 字段。 |
| `contractSnapshotHash` | 属性 | <code>contractSnapshotHash: string</code> | contract Snapshot Hash 字段。 |
| `externalStateVersion` | 属性 | <code>externalStateVersion: string</code> | external State Version 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | tool Revision 字段。 |
| `validUntil` | 属性 | <code>validUntil: string</code> | valid Until 字段。 |

## `ToolCancellationPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `gracePeriodMs` | 属性 | <code>gracePeriodMs: number</code> | grace Period Ms 字段。 |
| `mode` | 属性 | <code>mode: "provider" &#124; "cooperative" &#124; "unsupported"</code> | mode 字段。 |

## `ToolConcurrencyPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `keyFields` | 属性 | <code>keyFields: string[]</code> | key Fields 字段。 |
| `maxConcurrent` | 属性 | <code>maxConcurrent: number</code> | max Concurrent 字段。 |
| `queueWhenBusy` | 属性 | <code>queueWhenBusy: boolean</code> | queue When Busy 字段。 |

## `ToolContractSnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `catalogRevision` | 属性 | <code>catalogRevision: string</code> | catalog Revision 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `effectiveCapabilities` | 属性 | <code>effectiveCapabilities: EffectiveAgentCapabilitySnapshot</code> | effective Capabilities 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `snapshotHash` | 属性 | <code>snapshotHash: string</code> | snapshot Hash 字段。 |
| `toolContracts` | 属性 | <code>toolContracts: ToolContractSnapshotItem[]</code> | tool Contracts 字段。 |

## `ToolContractSnapshotItem` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adapterRef` | 属性 | <code>adapterRef: string</code> | adapter Ref 字段。 |
| `inputSchemaHash` | 属性 | <code>inputSchemaHash: string</code> | input Schema Hash 字段。 |
| `outputSchemaHash` | 属性 | <code>outputSchemaHash: string</code> | output Schema Hash 字段。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | side Effect Level 字段。 |
| `sourceCapabilityHash` | 属性 | <code>sourceCapabilityHash: string</code> | source Capability Hash 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | tool Revision 字段。 |
| `toolVersion` | 属性 | <code>toolVersion: string</code> | tool Version 字段。 |

## `ToolContractSnapshotStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(snapshotId: string): Promise&lt;ToolContractSnapshot &#124; null&gt;</code> | 读取 get。 |
| `save` | 方法 | <code>save(snapshot: ToolContractSnapshot): Promise&lt;void&gt;</code> | 保存 save。 |

## `ToolEventPayloadBase` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt: number</code> | attempt 字段。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef: string</code> | contract Snapshot Ref 字段。 |
| `error` | 属性 | <code>error: NormalizedToolError</code> | error 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | invocation Id 字段。 |
| `latencyMs` | 属性 | <code>latencyMs: number</code> | latency Ms 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `outputHash` | 属性 | <code>outputHash: string</code> | output Hash 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | side Effect Level 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | tool Revision 字段。 |
| `toolVersion` | 属性 | <code>toolVersion: string</code> | tool Version 字段。 |

## `ToolExecutionContextSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal: AbortSignal</code> | abort Signal 字段。 |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `capabilityApprovals` | 属性 | <code>capabilityApprovals: EffectiveCapabilityApproval[]</code> | capability Approvals 字段。 |
| `capabilitySnapshotRef` | 属性 | <code>capabilitySnapshotRef: string</code> | capability Snapshot Ref 字段。 |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef: string</code> | contract Snapshot Ref 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `fsmState` | 属性 | <code>fsmState: string</code> | fsm State 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | invocation Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `parentEventId` | 属性 | <code>parentEventId: string</code> | parent Event Id 字段。 |
| `principal` | 属性 | <code>principal: ToolPrincipalSpec</code> | principal 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ToolExecutionPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancellation` | 属性 | <code>cancellation: ToolCancellationPolicySpec</code> | cancellation 字段。 |
| `concurrency` | 属性 | <code>concurrency: ToolConcurrencyPolicySpec</code> | concurrency 字段。 |
| `environmentRef` | 属性 | <code>environmentRef: { id: string; version?: string; revision?: string; }</code> | environment Ref 字段。 |
| `lateResult` | 属性 | <code>lateResult: ToolLateResultPolicySpec</code> | late Result 字段。 |
| `outputLimit` | 属性 | <code>outputLimit: ToolOutputLimitSpec</code> | output Limit 字段。 |
| `retry` | 属性 | <code>retry: RetryPolicySpec</code> | retry 字段。 |
| `timeout` | 属性 | <code>timeout: TimeoutPolicySpec</code> | timeout 字段。 |

## `ToolExternalReceipt` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `committedAt` | 属性 | <code>committedAt: string</code> | committed At 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `provider` | 属性 | <code>provider: string</code> | provider 字段。 |
| `receiptId` | 属性 | <code>receiptId: string</code> | receipt Id 字段。 |
| `status` | 属性 | <code>status: string</code> | status 字段。 |

## `ToolGovernanceSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowDelegation` | 属性 | <code>allowDelegation: boolean</code> | allow Delegation 字段。 |
| `allowedPrincipalTypes` | 属性 | <code>allowedPrincipalTypes: ("system" &#124; "agent" &#124; "user" &#124; "service")[]</code> | allowed Principal Types 字段。 |
| `approvalPolicy` | 属性 | <code>approvalPolicy: HumanReviewPolicySpec</code> | approval Policy 字段。 |
| `auditPolicy` | 属性 | <code>auditPolicy: { enabled: boolean; includeInput?: boolean; includeOutput?: boolean; redactPaths?: string[]; }</code> | audit Policy 字段。 |
| `deniedPermissionScopes` | 属性 | <code>deniedPermissionScopes: string[]</code> | denied Permission Scopes 字段。 |
| `maxDelegationDepth` | 属性 | <code>maxDelegationDepth: number</code> | max Delegation Depth 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: { id: string; version?: string; revision?: string; }[]</code> | policy Refs 字段。 |
| `requiredPermissionScopes` | 属性 | <code>requiredPermissionScopes: string[]</code> | required Permission Scopes 字段。 |
| `tenantIsolation` | 属性 | <code>tenantIsolation: boolean</code> | tenant Isolation 字段。 |
| `workspaceIsolation` | 属性 | <code>workspaceIsolation: boolean</code> | workspace Isolation 字段。 |

## `ToolInvocationScopeSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `fsmState` | 属性 | <code>fsmState: string</code> | fsm State 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ToolLateResultPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mode` | 属性 | <code>mode: "reconcile" &#124; "quarantine" &#124; "discard" &#124; "accept"</code> | mode 字段。 |
| `reconciliationToolRef` | 属性 | <code>reconciliationToolRef: { id: string; version?: string; revision?: string; }</code> | reconciliation Tool Ref 字段。 |

## `ToolObservabilitySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `metricsEnabled` | 属性 | <code>metricsEnabled: boolean</code> | metrics Enabled 字段。 |
| `recordAttempts` | 属性 | <code>recordAttempts: boolean</code> | record Attempts 字段。 |
| `recordInput` | 属性 | <code>recordInput: boolean</code> | record Input 字段。 |
| `recordOutput` | 属性 | <code>recordOutput: boolean</code> | record Output 字段。 |
| `recordPolicyDecision` | 属性 | <code>recordPolicyDecision: boolean</code> | record Policy Decision 字段。 |
| `redactionPolicyRef` | 属性 | <code>redactionPolicyRef: { id: string; version?: string; revision?: string; }</code> | redaction Policy Ref 字段。 |
| `traceLevel` | 属性 | <code>traceLevel: "none" &#124; "metadata" &#124; "summary" &#124; "full_redacted"</code> | trace Level 字段。 |

## `ToolOutputLimitSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxInlineBytes` | 属性 | <code>maxInlineBytes: number</code> | max Inline Bytes 字段。 |
| `overflow` | 属性 | <code>overflow: "fail" &#124; "artifact" &#124; "truncate"</code> | overflow 字段。 |

## `ToolPrincipalSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `authenticationContext` | 属性 | <code>authenticationContext: Record&lt;string, unknown&gt;</code> | authentication Context 字段。 |
| `delegatedBy` | 属性 | <code>delegatedBy: string</code> | delegated By 字段。 |
| `delegationDepth` | 属性 | <code>delegationDepth: number</code> | delegation Depth 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `permissionScopes` | 属性 | <code>permissionScopes: string[]</code> | permission Scopes 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `roles` | 属性 | <code>roles: string[]</code> | roles 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `type` | 属性 | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | type 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ToolSchemaSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowAdditionalProperties` | 属性 | <code>allowAdditionalProperties: boolean</code> | allow Additional Properties 字段。 |
| `jsonSchema` | 属性 | <code>jsonSchema: JsonSchema</code> | json schema 字段。 |
| `maxSerializedBytes` | 属性 | <code>maxSerializedBytes: number</code> | max Serialized Bytes 字段。 |
| `redactedPaths` | 属性 | <code>redactedPaths: string[]</code> | redacted Paths 字段。 |
| `schemaHash` | 属性 | <code>schemaHash: string</code> | schema Hash 字段。 |
| `schemaId` | 属性 | <code>schemaId: string</code> | schema Id 字段。 |
| `schemaVersion` | 属性 | <code>schemaVersion: string</code> | schema Version 字段。 |
| `sensitivePaths` | 属性 | <code>sensitivePaths: string[]</code> | sensitive Paths 字段。 |
| `strict` | 属性 | <code>strict: boolean</code> | strict 字段。 |

## `ToolSemanticSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `destructiveHint` | 属性 | <code>destructiveHint: boolean</code> | destructive Hint 字段。 |
| `deterministic` | 属性 | <code>deterministic: boolean</code> | deterministic 字段。 |
| `expectedArtifacts` | 属性 | <code>expectedArtifacts: ToolArtifactContract[]</code> | expected Artifacts 字段。 |
| `idempotency` | 属性 | <code>idempotency: "none" &#124; "caller_key" &#124; "derived_key" &#124; "provider_key" &#124; "intrinsic"</code> | idempotency 字段。 |
| `openWorldHint` | 属性 | <code>openWorldHint: boolean</code> | open World Hint 字段。 |
| `postconditions` | 属性 | <code>postconditions: PolicyRuleSpec[]</code> | postconditions 字段。 |
| `preconditions` | 属性 | <code>preconditions: PolicyRuleSpec[]</code> | preconditions 字段。 |
| `readOnlyHint` | 属性 | <code>readOnlyHint: boolean</code> | read Only Hint 字段。 |
| `resultSemantics` | 属性 | <code>resultSemantics: "artifact" &#124; "observation" &#124; "state_patch" &#124; "external_receipt"</code> | result Semantics 字段。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | side Effect Level 字段。 |

## `ToolSourceRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adapterId` | 属性 | <code>adapterId: string</code> | adapter Id 字段。 |
| `endpointRef` | 属性 | <code>endpointRef: string</code> | endpoint Ref 字段。 |
| `handlerId` | 属性 | <code>handlerId: string</code> | handler Id 字段。 |
| `hostedToolId` | 属性 | <code>hostedToolId: string</code> | hosted Tool Id 字段。 |
| `mcpCapabilityHash` | 属性 | <code>mcpCapabilityHash: string</code> | mcp Capability Hash 字段。 |
| `mcpCapabilityId` | 属性 | <code>mcpCapabilityId: string</code> | mcp Capability Id 字段。 |
| `mcpServerId` | 属性 | <code>mcpServerId: string</code> | mcp Server Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `pluginId` | 属性 | <code>pluginId: string</code> | plugin Id 字段。 |

## `ToolStreamingSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `enabled` | 属性 | <code>enabled: boolean</code> | enabled 字段。 |
| `maxUpdates` | 属性 | <code>maxUpdates: number</code> | max Updates 字段。 |
| `supportsProgress` | 属性 | <code>supportsProgress: boolean</code> | supports Progress 字段。 |
| `supportsStructuredContent` | 属性 | <code>supportsStructuredContent: boolean</code> | supports Structured Content 字段。 |
