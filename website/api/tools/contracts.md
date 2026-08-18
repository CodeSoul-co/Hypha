# `@codesoul-co/hypha-tools` / `contracts`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Package guide: [learning and composition guide](/packages/tools)
- Source: [`packages/tools/src/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)
- Exports: **76**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `effectiveAgentCapabilitySnapshotSchema` | constant | <code>const effectiveAgentCapabilitySnapshotSchema: z.ZodObject&lt;{ id: z.ZodString; runId: z.ZodString; agentId: z.ZodString; principalId: z.ZodString; tenantId: z.ZodOptional&lt;z.ZodString&gt;; domainId: z.ZodOptional&lt;z.ZodString&gt;; createdAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; skillRevisions: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; contentHash: z.ZodString; }, "strip", z.ZodTypeAny, {...</code> | Runtime schema for effective Agent Capability Snapshot. |
| `effectiveCapabilityApprovalSchema` | constant | <code>const effectiveCapabilityApprovalSchema: z.ZodObject&lt;{ taskId: z.ZodString; subjectType: z.ZodLiteral&lt;"effective_capability_snapshot"&gt;; subjectHash: z.ZodString; snapshotId: z.ZodString; runId: z.ZodString; agentId: z.ZodString; principalId: z.ZodString; approvedBy: z.ZodString; approvedAt: z.ZodString; expiresAt: z.ZodString; status: z.ZodLiteral&lt;"approved"&gt;; }, "strict", z.ZodTypeAny, { status: "approved"; runId...</code> | Runtime schema for effective Capability Approval. |
| `governedHumanApprovalDefinition` | constant | <code>const governedHumanApprovalDefinition: SpecSchemaDefinition&lt;GovernedHumanApprovalRequest&gt;</code> | governed Human Approval Definition constant exported by the `contracts` module. |
| `governedHumanApprovalExample` | constant | <code>const governedHumanApprovalExample: GovernedHumanApprovalRequest</code> | Valid example value for governed Human Approval. |
| `governedHumanApprovalJsonSchema` | constant | <code>const governedHumanApprovalJsonSchema: JsonSchema</code> | JSON Schema for governed Human Approval. |
| `governedHumanApprovalPolicySpecSchema` | constant | <code>const governedHumanApprovalPolicySpecSchema: z.ZodObject&lt;{ mode: z.ZodEnum&lt;["never", "policy", "always"]&gt;; requiredForSideEffects: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["none", "read", "write", "external_effect", "irreversible"]&gt;, "many"&gt;&gt;; approverRoles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; minApprovals: z.ZodOptional&lt;z.ZodNumber&gt;; expiresAfterSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; allowParameterEdit: z.Zo...</code> | Runtime schema for governed Human Approval Policy Spec. |
| `governedHumanApprovalRequestSchema` | constant | <code>const governedHumanApprovalRequestSchema: z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; invocationId: z.ZodString; toolRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; ...</code> | Runtime schema for governed Human Approval Request. |
| `governedToolContractDefinition` | constant | <code>const governedToolContractDefinition: SpecSchemaDefinition&lt;GovernedToolContractSpec&gt;</code> | governed Tool Contract Definition constant exported by the `contracts` module. |
| `governedToolContractExample` | constant | <code>const governedToolContractExample: GovernedToolContractSpec</code> | Valid example value for governed Tool Contract. |
| `governedToolContractJsonSchema` | constant | <code>const governedToolContractJsonSchema: JsonSchema</code> | JSON Schema for governed Tool Contract. |
| `governedToolContractJsonSchemas` | constant | <code>const governedToolContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | governed Tool Contract Json Schemas constant exported by the `contracts` module. |
| `governedToolContractSpecSchema` | constant | <code>const governedToolContractSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; revision: z.ZodString; name: z.ZodString; displayName: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodString; instructions: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; input: z.ZodObject&lt;{ jsonSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; schemaId: z.ZodOptional&lt;z.ZodString&gt;; s...</code> | Runtime schema for governed Tool Contract Spec. |
| `governedToolInvocationDefinition` | constant | <code>const governedToolInvocationDefinition: SpecSchemaDefinition&lt;GovernedToolInvocationRecord&gt;</code> | governed Tool Invocation Definition constant exported by the `contracts` module. |
| `governedToolInvocationExample` | constant | <code>const governedToolInvocationExample: GovernedToolInvocationRecord</code> | Valid example value for governed Tool Invocation. |
| `governedToolInvocationJsonSchema` | constant | <code>const governedToolInvocationJsonSchema: JsonSchema</code> | JSON Schema for governed Tool Invocation. |
| `governedToolInvocationRecordSchema` | constant | <code>const governedToolInvocationRecordSchema: z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; operationId: z.ZodString; toolRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }...</code> | Runtime schema for governed Tool Invocation Record. |
| `governedToolInvocationStatusSchema` | constant | <code>const governedToolInvocationStatusSchema: z.ZodEnum&lt;["created", "validating", "validated", "denied", "waiting_approval", "approved", "rejected", "queued", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "expired", "conflict"]&gt;</code> | Runtime schema for governed Tool Invocation Status. |
| `normalizedToolErrorSchema` | constant | <code>const normalizedToolErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["TOOL_NOT_FOUND", "TOOL_DISABLED", "TOOL_SCHEMA_INVALID", "TOOL_OUTPUT_INVALID", "TOOL_PERMISSION_DENIED", "TOOL_POLICY_DENIED", "TOOL_APPROVAL_REQUIRED", "TOOL_APPROVAL_REJECTED", "TOOL_APPROVAL_EXPIRED", "TOOL_IDEMPOTENCY_CONFLICT", "TOOL_CONCURRENCY_CONFLICT", "TOOL_TIMEOUT", "TOOL_CANCELLED", "TOOL_ADAPTER_UNAVAILABLE", "TOOL_RETRY_EXHAUSTED", "TO...</code> | Runtime schema for normalized Tool Error. |
| `providerHealthSchema` | constant | <code>const providerHealthSchema: z.ZodObject&lt;{ status: z.ZodEnum&lt;["healthy", "degraded", "unhealthy", "unknown"]&gt;; checkedAt: z.ZodString; latencyMs: z.ZodOptional&lt;z.ZodNumber&gt;; message: z.ZodOptional&lt;z.ZodString&gt;; details: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "strip", z.ZodTypeAny, { status: "unknown" &#124; "healthy" &#124; "degraded" &#124; "unhealthy"; checkedAt: string; message?: string &#124; undefined; latencyM...</code> | Runtime schema for provider Health. |
| `toolCachePolicySpecSchema` | constant | <code>const toolCachePolicySpecSchema: z.ZodObject&lt;{ mode: z.ZodEnum&lt;["disabled", "result", "observation_ref"]&gt;; ttlSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; scope: z.ZodEnum&lt;["run", "session", "workspace", "tenant"]&gt;; keyFields: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; includeToolRevision: z.ZodBoolean; includePolicyRevision: z.ZodBoolean; allowForSideEffectLevels: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["none", "read", ...</code> | Runtime schema for tool Cache Policy Spec. |
| `toolContractSnapshotDefinition` | constant | <code>const toolContractSnapshotDefinition: SpecSchemaDefinition&lt;ToolContractSnapshot&gt;</code> | tool Contract Snapshot Definition constant exported by the `contracts` module. |
| `toolContractSnapshotExample` | constant | <code>const toolContractSnapshotExample: ToolContractSnapshot</code> | Valid example value for tool Contract Snapshot. |
| `toolContractSnapshotItemSchema` | constant | <code>const toolContractSnapshotItemSchema: z.ZodObject&lt;{ toolId: z.ZodString; toolVersion: z.ZodString; toolRevision: z.ZodString; inputSchemaHash: z.ZodString; outputSchemaHash: z.ZodOptional&lt;z.ZodString&gt;; sourceCapabilityHash: z.ZodOptional&lt;z.ZodString&gt;; sideEffectLevel: z.ZodEnum&lt;["none", "read", "write", "external_effect", "irreversible"]&gt;; adapterRef: z.ZodString; }, "strip", z.ZodTypeAny, { toolId: string; toolVe...</code> | Runtime schema for tool Contract Snapshot Item. |
| `toolContractSnapshotJsonSchema` | constant | <code>const toolContractSnapshotJsonSchema: JsonSchema</code> | JSON Schema for tool Contract Snapshot. |
| `toolContractSnapshotSchema` | constant | <code>const toolContractSnapshotSchema: z.ZodObject&lt;{ id: z.ZodString; runId: z.ZodString; createdAt: z.ZodString; toolContracts: z.ZodArray&lt;z.ZodObject&lt;{ toolId: z.ZodString; toolVersion: z.ZodString; toolRevision: z.ZodString; inputSchemaHash: z.ZodString; outputSchemaHash: z.ZodOptional&lt;z.ZodString&gt;; sourceCapabilityHash: z.ZodOptional&lt;z.ZodString&gt;; sideEffectLevel: z.ZodEnum&lt;["none", "read", "write", "external_effec...</code> | Runtime schema for tool Contract Snapshot. |
| `toolEventPayloadBaseDefinition` | constant | <code>const toolEventPayloadBaseDefinition: SpecSchemaDefinition&lt;ToolEventPayloadBase&gt;</code> | tool Event Payload Base Definition constant exported by the `contracts` module. |
| `toolEventPayloadBaseExample` | constant | <code>const toolEventPayloadBaseExample: ToolEventPayloadBase</code> | Valid example value for tool Event Payload Base. |
| `toolEventPayloadBaseJsonSchema` | constant | <code>const toolEventPayloadBaseJsonSchema: JsonSchema</code> | JSON Schema for tool Event Payload Base. |
| `toolEventPayloadBaseSchema` | constant | <code>const toolEventPayloadBaseSchema: z.ZodObject&lt;{ invocationId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodOptional&lt;z.ZodString&gt;; toolId: z.ZodOptional&lt;z.ZodString&gt;; toolVersion: z.ZodOptional&lt;z.ZodString&gt;; toolRevision: z.ZodOptional&lt;z.ZodString&gt;; contractSnapshotRef: z.ZodOptional&lt;z.ZodString&gt;; scopeHash: z.ZodOptional&lt;z.ZodString&gt;; principalId: z.ZodOptional&lt;z.ZodString&gt;; sideEffectLevel: z.ZodOptional&lt;z.ZodEn...</code> | Runtime schema for tool Event Payload Base. |
| `toolExecutionContextSpecSchema` | constant | <code>const toolExecutionContextSpecSchema: z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;;...</code> | Runtime schema for tool Execution Context Spec. |
| `toolExecutionPolicySpecSchema` | constant | <code>const toolExecutionPolicySpecSchema: z.ZodObject&lt;{ timeout: z.ZodObject&lt;{ timeoutMs: z.ZodNumber; onTimeout: z.ZodOptional&lt;z.ZodEnum&lt;["fail", "retry", "human_review"]&gt;&gt;; }, "strip", z.ZodTypeAny, { timeoutMs: number; onTimeout?: "fail" &#124; "retry" &#124; "human_review" &#124; undefined; }, { timeoutMs: number; onTimeout?: "fail" &#124; "retry" &#124; "human_review" &#124; undefined; }&gt;; retry: z.ZodObject&lt;{ maxAttempts: z.ZodNumber; backoff...</code> | Runtime schema for tool Execution Policy Spec. |
| `toolGovernanceSpecSchema` | constant | <code>const toolGovernanceSpecSchema: z.ZodObject&lt;{ requiredPermissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; deniedPermissionScopes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; allowedPrincipalTypes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;, "many"&gt;&gt;; policyRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z....</code> | Runtime schema for tool Governance Spec. |
| `toolInvocationScopeSpecSchema` | constant | <code>const toolInvocationScopeSpecSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; stepId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; fsmState: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { runId: string; userId: string; sessionId: string; agentId?: string &#124; undefined; ten...</code> | Runtime schema for tool Invocation Scope Spec. |
| `toolObservabilitySpecSchema` | constant | <code>const toolObservabilitySpecSchema: z.ZodObject&lt;{ traceLevel: z.ZodEnum&lt;["none", "metadata", "summary", "full_redacted"]&gt;; recordInput: z.ZodOptional&lt;z.ZodBoolean&gt;; recordOutput: z.ZodOptional&lt;z.ZodBoolean&gt;; recordAttempts: z.ZodOptional&lt;z.ZodBoolean&gt;; recordPolicyDecision: z.ZodOptional&lt;z.ZodBoolean&gt;; metricsEnabled: z.ZodOptional&lt;z.ZodBoolean&gt;; redactionPolicyRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; vers...</code> | Runtime schema for tool Observability Spec. |
| `toolPrincipalSpecSchema` | constant | <code>const toolPrincipalSpecSchema: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; delegatedBy: z.ZodOptional&lt;z.Zo...</code> | Runtime schema for tool Principal Spec. |
| `toolSchemaSpecSchema` | constant | <code>const toolSchemaSpecSchema: z.ZodObject&lt;{ jsonSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; schemaId: z.ZodOptional&lt;z.ZodString&gt;; schemaVersion: z.ZodOptional&lt;z.ZodString&gt;; schemaHash: z.ZodString; strict: z.ZodOptional&lt;z.ZodBoolean&gt;; allowAdditionalProperties: z.ZodOptional&lt;z.ZodBoolean&gt;; maxSerializedBytes: z.ZodOptional&lt;z.ZodNumber&gt;; sensitivePaths: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; red...</code> | Runtime schema for tool Schema Spec. |
| `toolSemanticSpecSchema` | constant | <code>const toolSemanticSpecSchema: z.ZodType&lt;ToolSemanticSpec, z.ZodTypeDef, ToolSemanticSpec&gt;</code> | Runtime schema for tool Semantic Spec. |
| `toolSourceRefSchema` | constant | <code>const toolSourceRefSchema: z.ZodObject&lt;{ adapterId: z.ZodOptional&lt;z.ZodString&gt;; handlerId: z.ZodOptional&lt;z.ZodString&gt;; endpointRef: z.ZodOptional&lt;z.ZodString&gt;; mcpServerId: z.ZodOptional&lt;z.ZodString&gt;; mcpCapabilityId: z.ZodOptional&lt;z.ZodString&gt;; mcpCapabilityHash: z.ZodOptional&lt;z.ZodString&gt;; pluginId: z.ZodOptional&lt;z.ZodString&gt;; hostedToolId: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodStr...</code> | Runtime schema for tool Source Ref. |
| `canonicalJson` | function | <code>canonicalJson(value: unknown): string</code> | Checks whether it can onical Json at this module boundary. |
| `createToolCacheValidityKey` | function | <code>createToolCacheValidityKey(input: ToolCacheValidityInput): string</code> | Creates Tool Cache Validity Key at this module boundary. |
| `createToolSchemaSpec` | function | <code>createToolSchemaSpec(jsonSchema: JsonSchema, options?: Omit&lt;Partial&lt;ToolSchemaSpec&gt;, "jsonSchema" &#124; "schemaHash"&gt;): ToolSchemaSpec</code> | Creates Tool Schema Spec at this module boundary. |
| `hashToolContract` | function | <code>hashToolContract(value: unknown): string</code> | Checks whether h Tool Contract at this module boundary. |
| `EffectiveAgentCapabilitySnapshot` | interface | <code>interface EffectiveAgentCapabilitySnapshot</code> | Field contract for Effective Agent Capability Snapshot; see all contract members below. |
| `EffectiveCapabilityApproval` | interface | <code>interface EffectiveCapabilityApproval</code> | Field contract for Effective Capability Approval; see all contract members below. |
| `GovernedHumanApprovalPolicySpec` | interface | <code>interface GovernedHumanApprovalPolicySpec</code> | Field contract for Governed Human Approval Policy Spec; see all contract members below. |
| `GovernedHumanApprovalRequest` | interface | <code>interface GovernedHumanApprovalRequest</code> | Field contract for Governed Human Approval Request; see all contract members below. |
| `GovernedToolContractSpec` | interface | <code>interface GovernedToolContractSpec</code> | Field contract for Governed Tool Contract Spec; see all contract members below. |
| `GovernedToolInvocationRecord` | interface | <code>interface GovernedToolInvocationRecord</code> | Field contract for Governed Tool Invocation Record; see all contract members below. |
| `HumanApprovalDecisionRecord` | interface | <code>interface HumanApprovalDecisionRecord</code> | Field contract for Human Approval Decision Record; see all contract members below. |
| `NormalizedToolError` | interface | <code>interface NormalizedToolError</code> | Field contract for Normalized Tool Error; see all contract members below. |
| `ProviderHealth` | interface | <code>interface ProviderHealth</code> | Field contract for Provider Health; see all contract members below. |
| `ToolArtifactContract` | interface | <code>interface ToolArtifactContract</code> | Field contract for Tool Artifact Contract; see all contract members below. |
| `ToolCachePolicySpec` | interface | <code>interface ToolCachePolicySpec</code> | Field contract for Tool Cache Policy Spec; see all contract members below. |
| `ToolCacheValidityInput` | interface | <code>interface ToolCacheValidityInput</code> | Field contract for Tool Cache Validity Input; see all contract members below. |
| `ToolCacheValidityRecord` | interface | <code>interface ToolCacheValidityRecord extends ToolCacheValidityInput</code> | Field contract for Tool Cache Validity Record; see all contract members below. |
| `ToolCancellationPolicySpec` | interface | <code>interface ToolCancellationPolicySpec</code> | Field contract for Tool Cancellation Policy Spec; see all contract members below. |
| `ToolConcurrencyPolicySpec` | interface | <code>interface ToolConcurrencyPolicySpec</code> | Field contract for Tool Concurrency Policy Spec; see all contract members below. |
| `ToolContractSnapshot` | interface | <code>interface ToolContractSnapshot</code> | Field contract for Tool Contract Snapshot; see all contract members below. |
| `ToolContractSnapshotItem` | interface | <code>interface ToolContractSnapshotItem</code> | Field contract for Tool Contract Snapshot Item; see all contract members below. |
| `ToolContractSnapshotStore` | interface | <code>interface ToolContractSnapshotStore</code> | Field contract for Tool Contract Snapshot Store; see all contract members below. |
| `ToolEventPayloadBase` | interface | <code>interface ToolEventPayloadBase</code> | Field contract for Tool Event Payload Base; see all contract members below. |
| `ToolExecutionContextSpec` | interface | <code>interface ToolExecutionContextSpec</code> | Field contract for Tool Execution Context Spec; see all contract members below. |
| `ToolExecutionPolicySpec` | interface | <code>interface ToolExecutionPolicySpec</code> | Field contract for Tool Execution Policy Spec; see all contract members below. |
| `ToolExternalReceipt` | interface | <code>interface ToolExternalReceipt</code> | Field contract for Tool External Receipt; see all contract members below. |
| `ToolGovernanceSpec` | interface | <code>interface ToolGovernanceSpec</code> | Field contract for Tool Governance Spec; see all contract members below. |
| `ToolInvocationScopeSpec` | interface | <code>interface ToolInvocationScopeSpec</code> | Field contract for Tool Invocation Scope Spec; see all contract members below. |
| `ToolLateResultPolicySpec` | interface | <code>interface ToolLateResultPolicySpec</code> | Field contract for Tool Late Result Policy Spec; see all contract members below. |
| `ToolObservabilitySpec` | interface | <code>interface ToolObservabilitySpec</code> | Field contract for Tool Observability Spec; see all contract members below. |
| `ToolOutputLimitSpec` | interface | <code>interface ToolOutputLimitSpec</code> | Field contract for Tool Output Limit Spec; see all contract members below. |
| `ToolPrincipalSpec` | interface | <code>interface ToolPrincipalSpec</code> | Field contract for Tool Principal Spec; see all contract members below. |
| `ToolSchemaSpec` | interface | <code>interface ToolSchemaSpec</code> | Field contract for Tool Schema Spec; see all contract members below. |
| `ToolSemanticSpec` | interface | <code>interface ToolSemanticSpec</code> | Field contract for Tool Semantic Spec; see all contract members below. |
| `ToolSourceRef` | interface | <code>interface ToolSourceRef</code> | Field contract for Tool Source Ref; see all contract members below. |
| `ToolStreamingSpec` | interface | <code>interface ToolStreamingSpec</code> | Field contract for Tool Streaming Spec; see all contract members below. |
| `GovernedToolInvocationStatus` | type | <code>type GovernedToolInvocationStatus = 'created' &#124; 'validating' &#124; 'validated' &#124; 'denied' &#124; 'waiting_approval' &#124; 'approved' &#124; 'rejected' &#124; 'queued' &#124; 'running' &#124; 'cancelling' &#124; 'cancelled' &#124; 'completed' &#124; 'failed' &#124; 'timed_out' &#124; 'expired' &#124; 'conflict'</code> | Public type alias for Governed Tool Invocation Status. |
| `ToolSource` | type | <code>type ToolSource = 'local' &#124; 'mcp' &#124; 'http' &#124; 'plugin' &#124; 'hosted' &#124; 'execution' &#124; 'custom'</code> | Public type alias for Tool Source. |

## `EffectiveAgentCapabilitySnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `allowedExecutionProfiles` | property | <code>allowedExecutionProfiles: string[]</code> | Public allowed Execution Profiles property. |
| `allowedMCPServerIds` | property | <code>allowedMCPServerIds: string[]</code> | Public allowed MCP Server Ids property. |
| `allowedToolIds` | property | <code>allowedToolIds: string[]</code> | Public allowed Tool Ids property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `domainId` | property | <code>domainId: string</code> | Public domain Id property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `maximumSideEffectLevel` | property | <code>maximumSideEffectLevel: SideEffectLevel</code> | Public maximum Side Effect Level property. |
| `memoryAccess` | property | <code>memoryAccess: "none" &#124; "read" &#124; "write" &#124; "read_write"</code> | Public memory Access property. |
| `policyRefs` | property | <code>policyRefs: string[]</code> | Public policy Refs property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `requiresHumanReview` | property | <code>requiresHumanReview: boolean</code> | Public requires Human Review property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `skillRevisions` | property | <code>skillRevisions: { id: string; version: string; contentHash: string; }[]</code> | Public skill Revisions property. |
| `snapshotHash` | property | <code>snapshotHash: string</code> | Public snapshot Hash property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |

## `EffectiveCapabilityApproval` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `approvedAt` | property | <code>approvedAt: string</code> | Public approved At property. |
| `approvedBy` | property | <code>approvedBy: string</code> | Public approved By property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `snapshotId` | property | <code>snapshotId: string</code> | Public snapshot Id property. |
| `status` | property | <code>status: "approved"</code> | Public status property. |
| `subjectHash` | property | <code>subjectHash: string</code> | Public subject Hash property. |
| `subjectType` | property | <code>subjectType: "effective_capability_snapshot"</code> | Public subject Type property. |
| `taskId` | property | <code>taskId: string</code> | Public task Id property. |

## `GovernedHumanApprovalPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowParameterEdit` | property | <code>allowParameterEdit: boolean</code> | Public allow Parameter Edit property. |
| `approverRoles` | property | <code>approverRoles: string[]</code> | Public approver Roles property. |
| `escalationPolicyRef` | property | <code>escalationPolicyRef: { id: string; version?: string; revision?: string; }</code> | Public escalation Policy Ref property. |
| `expiresAfterSeconds` | property | <code>expiresAfterSeconds: number</code> | Public expires After Seconds property. |
| `minApprovals` | property | <code>minApprovals: number</code> | Public min Approvals property. |
| `mode` | property | <code>mode: "policy" &#124; "never" &#124; "always"</code> | Public mode property. |
| `requiredForSideEffects` | property | <code>requiredForSideEffects: SideEffectLevel[]</code> | Public required For Side Effects property. |
| `requireReason` | property | <code>requireReason: boolean</code> | Public require Reason property. |
| `revalidateOnResume` | property | <code>revalidateOnResume: boolean</code> | Public revalidate On Resume property. |

## `GovernedHumanApprovalRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `decisions` | property | <code>decisions: HumanApprovalDecisionRecord[]</code> | Public decisions property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `invocationId` | property | <code>invocationId: string</code> | Public invocation Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `parameterHash` | property | <code>parameterHash: string</code> | Public parameter Hash property. |
| `parameterSummary` | property | <code>parameterSummary: unknown</code> | Public parameter Summary property. |
| `pendingActionRef` | property | <code>pendingActionRef: string</code> | Public pending Action Ref property. |
| `policyDecisionRef` | property | <code>policyDecisionRef: string</code> | Public policy Decision Ref property. |
| `principal` | property | <code>principal: ToolPrincipalSpec</code> | Public principal property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `requestSummary` | property | <code>requestSummary: string</code> | Public request Summary property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `riskSummary` | property | <code>riskSummary: string</code> | Public risk Summary property. |
| `scope` | property | <code>scope: ToolInvocationScopeSpec</code> | Public scope property. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public side Effect Level property. |
| `status` | property | <code>status: "rejected" &#124; "cancelled" &#124; "expired" &#124; "pending" &#124; "approved"</code> | Public status property. |
| `toolRef` | property | <code>toolRef: { id: string; version?: string; revision?: string; }</code> | Public tool Ref property. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public tool Revision property. |

## `GovernedToolContractSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cache` | property | <code>cache: ToolCachePolicySpec</code> | Public cache property. |
| `deprecated` | property | <code>deprecated: boolean</code> | Public deprecated property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `displayName` | property | <code>displayName: string</code> | Public display Name property. |
| `enabled` | property | <code>enabled: boolean</code> | Public enabled property. |
| `execution` | property | <code>execution: ToolExecutionPolicySpec</code> | Public execution property. |
| `governance` | property | <code>governance: ToolGovernanceSpec</code> | Public governance property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `input` | property | <code>input: ToolSchemaSpec</code> | Public input property. |
| `instructions` | property | <code>instructions: string</code> | Public instructions property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `observability` | property | <code>observability: ToolObservabilitySpec</code> | Public observability property. |
| `output` | property | <code>output: ToolSchemaSpec</code> | Public output property. |
| `replacedBy` | property | <code>replacedBy: { id: string; version?: string; revision?: string; }</code> | Public replaced By property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `semantics` | property | <code>semantics: ToolSemanticSpec</code> | Public semantics property. |
| `source` | property | <code>source: ToolSource</code> | Public source property. |
| `sourceRef` | property | <code>sourceRef: ToolSourceRef</code> | Public source Ref property. |
| `streaming` | property | <code>streaming: ToolStreamingSpec</code> | Public streaming property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `GovernedToolInvocationRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvalRequestId` | property | <code>approvalRequestId: string</code> | Public approval Request Id property. |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef: string</code> | Public contract Snapshot Ref property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `currentAttempt` | property | <code>currentAttempt: number</code> | Public current Attempt property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `error` | property | <code>error: NormalizedToolError</code> | Public error property. |
| `externalReceipt` | property | <code>externalReceipt: ToolExternalReceipt</code> | Public external Receipt property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `idempotencyFingerprint` | property | <code>idempotencyFingerprint: string</code> | Public idempotency Fingerprint property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `input` | property | <code>input: unknown</code> | Public input property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `lateResultState` | property | <code>lateResultState: "none" &#124; "accepted" &#124; "quarantined" &#124; "pending" &#124; "discarded"</code> | Public late Result State property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `observationRefs` | property | <code>observationRefs: string[]</code> | Public observation Refs property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `output` | property | <code>output: unknown</code> | Public output property. |
| `outputHash` | property | <code>outputHash: string</code> | Public output Hash property. |
| `principal` | property | <code>principal: ToolPrincipalSpec</code> | Public principal property. |
| `queuedAt` | property | <code>queuedAt: string</code> | Public queued At property. |
| `redactedInput` | property | <code>redactedInput: unknown</code> | Public redacted Input property. |
| `reusedFromInvocationId` | property | <code>reusedFromInvocationId: string</code> | Public reused From Invocation Id property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `scope` | property | <code>scope: ToolInvocationScopeSpec</code> | Public scope property. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public side Effect Level property. |
| `startedAt` | property | <code>startedAt: string</code> | Public started At property. |
| `status` | property | <code>status: GovernedToolInvocationStatus</code> | Public status property. |
| `toolRef` | property | <code>toolRef: { id: string; version?: string; revision?: string; }</code> | Public tool Ref property. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public tool Revision property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `HumanApprovalDecisionRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `decidedAt` | property | <code>decidedAt: string</code> | Public decided At property. |
| `decidedBy` | property | <code>decidedBy: string</code> | Public decided By property. |
| `decision` | property | <code>decision: "rejected" &#124; "approved"</code> | Public decision property. |
| `parameterHash` | property | <code>parameterHash: string</code> | Public parameter Hash property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |

## `NormalizedToolError` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt: number</code> | Public attempt property. |
| `causeRef` | property | <code>causeRef: string</code> | Public cause Ref property. |
| `code` | property | <code>code: "TOOL_NOT_FOUND" &#124; "TOOL_DISABLED" &#124; "TOOL_SCHEMA_INVALID" &#124; "TOOL_OUTPUT_INVALID" &#124; "TOOL_PERMISSION_DENIED" &#124; "TOOL_POLICY_DENIED" &#124; "TOOL_APPROVAL_REQUIRED" &#124; "TOOL_APPROVAL_REJECTED" &#124; "TOOL_APPROVAL_EXPIRED" &#124; "TOOL_IDEMPOTENCY_CONFLICT" &#124; "TOOL_CONCURRENCY_CONFLICT" &#124; "TOOL_TIMEOUT" &#124; "TOOL_CANCELLED" &#124; "TOOL_ADAPTER_UNAVAILABLE" &#124; "TOOL_RETRY_EXHAUSTED" &#124; "TOOL_LATE_RESULT" &#124; "TOOL_EXECUTION_FAILED" &#124;...</code> | Public code property. |
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

## `ToolArtifactContract` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `kind` | property | <code>kind: string</code> | Public kind property. |
| `maxInlineBytes` | property | <code>maxInlineBytes: number</code> | Public max Inline Bytes property. |
| `mimeTypes` | property | <code>mimeTypes: string[]</code> | Public mime Types property. |
| `required` | property | <code>required: boolean</code> | Public required property. |

## `ToolCachePolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowForSideEffectLevels` | property | <code>allowForSideEffectLevels: SideEffectLevel[]</code> | Public allow For Side Effect Levels property. |
| `includePolicyRevision` | property | <code>includePolicyRevision: boolean</code> | Public include Policy Revision property. |
| `includeToolRevision` | property | <code>includeToolRevision: boolean</code> | Public include Tool Revision property. |
| `keyFields` | property | <code>keyFields: string[]</code> | Public key Fields property. |
| `mode` | property | <code>mode: "disabled" &#124; "result" &#124; "observation_ref"</code> | Public mode property. |
| `scope` | property | <code>scope: "workspace" &#124; "session" &#124; "run" &#124; "tenant"</code> | Public scope property. |
| `staleWhileRevalidateSeconds` | property | <code>staleWhileRevalidateSeconds: number</code> | Public stale While Revalidate Seconds property. |
| `ttlSeconds` | property | <code>ttlSeconds: number</code> | Public ttl Seconds property. |

## `ToolCacheValidityInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityHash` | property | <code>capabilityHash: string</code> | Public capability Hash property. |
| `contractSnapshotHash` | property | <code>contractSnapshotHash: string</code> | Public contract Snapshot Hash property. |
| `externalStateVersion` | property | <code>externalStateVersion: string</code> | Public external State Version property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public tool Revision property. |

## `ToolCacheValidityRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityHash` | property | <code>capabilityHash: string</code> | Public capability Hash property. |
| `contractSnapshotHash` | property | <code>contractSnapshotHash: string</code> | Public contract Snapshot Hash property. |
| `externalStateVersion` | property | <code>externalStateVersion: string</code> | Public external State Version property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public tool Revision property. |
| `validUntil` | property | <code>validUntil: string</code> | Public valid Until property. |

## `ToolCancellationPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `gracePeriodMs` | property | <code>gracePeriodMs: number</code> | Public grace Period Ms property. |
| `mode` | property | <code>mode: "provider" &#124; "cooperative" &#124; "unsupported"</code> | Public mode property. |

## `ToolConcurrencyPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `keyFields` | property | <code>keyFields: string[]</code> | Public key Fields property. |
| `maxConcurrent` | property | <code>maxConcurrent: number</code> | Public max Concurrent property. |
| `queueWhenBusy` | property | <code>queueWhenBusy: boolean</code> | Public queue When Busy property. |

## `ToolContractSnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `catalogRevision` | property | <code>catalogRevision: string</code> | Public catalog Revision property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `effectiveCapabilities` | property | <code>effectiveCapabilities: EffectiveAgentCapabilitySnapshot</code> | Public effective Capabilities property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `snapshotHash` | property | <code>snapshotHash: string</code> | Public snapshot Hash property. |
| `toolContracts` | property | <code>toolContracts: ToolContractSnapshotItem[]</code> | Public tool Contracts property. |

## `ToolContractSnapshotItem` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adapterRef` | property | <code>adapterRef: string</code> | Public adapter Ref property. |
| `inputSchemaHash` | property | <code>inputSchemaHash: string</code> | Public input Schema Hash property. |
| `outputSchemaHash` | property | <code>outputSchemaHash: string</code> | Public output Schema Hash property. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public side Effect Level property. |
| `sourceCapabilityHash` | property | <code>sourceCapabilityHash: string</code> | Public source Capability Hash property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public tool Revision property. |
| `toolVersion` | property | <code>toolVersion: string</code> | Public tool Version property. |

## `ToolContractSnapshotStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(snapshotId: string): Promise&lt;ToolContractSnapshot &#124; null&gt;</code> | Gets get at this module boundary. |
| `save` | method | <code>save(snapshot: ToolContractSnapshot): Promise&lt;void&gt;</code> | Saves save at this module boundary. |

## `ToolEventPayloadBase` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt: number</code> | Public attempt property. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef: string</code> | Public contract Snapshot Ref property. |
| `error` | property | <code>error: NormalizedToolError</code> | Public error property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `invocationId` | property | <code>invocationId: string</code> | Public invocation Id property. |
| `latencyMs` | property | <code>latencyMs: number</code> | Public latency Ms property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `outputHash` | property | <code>outputHash: string</code> | Public output Hash property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public side Effect Level property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public tool Revision property. |
| `toolVersion` | property | <code>toolVersion: string</code> | Public tool Version property. |

## `ToolExecutionContextSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal: AbortSignal</code> | Public abort Signal property. |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `capabilityApprovals` | property | <code>capabilityApprovals: EffectiveCapabilityApproval[]</code> | Public capability Approvals property. |
| `capabilitySnapshotRef` | property | <code>capabilitySnapshotRef: string</code> | Public capability Snapshot Ref property. |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef: string</code> | Public contract Snapshot Ref property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `fsmState` | property | <code>fsmState: string</code> | Public fsm State property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `invocationId` | property | <code>invocationId: string</code> | Public invocation Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `parentEventId` | property | <code>parentEventId: string</code> | Public parent Event Id property. |
| `principal` | property | <code>principal: ToolPrincipalSpec</code> | Public principal property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ToolExecutionPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancellation` | property | <code>cancellation: ToolCancellationPolicySpec</code> | Public cancellation property. |
| `concurrency` | property | <code>concurrency: ToolConcurrencyPolicySpec</code> | Public concurrency property. |
| `environmentRef` | property | <code>environmentRef: { id: string; version?: string; revision?: string; }</code> | Public environment Ref property. |
| `lateResult` | property | <code>lateResult: ToolLateResultPolicySpec</code> | Public late Result property. |
| `outputLimit` | property | <code>outputLimit: ToolOutputLimitSpec</code> | Public output Limit property. |
| `retry` | property | <code>retry: RetryPolicySpec</code> | Public retry property. |
| `timeout` | property | <code>timeout: TimeoutPolicySpec</code> | Public timeout property. |

## `ToolExternalReceipt` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `committedAt` | property | <code>committedAt: string</code> | Public committed At property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `provider` | property | <code>provider: string</code> | Public provider property. |
| `receiptId` | property | <code>receiptId: string</code> | Public receipt Id property. |
| `status` | property | <code>status: string</code> | Public status property. |

## `ToolGovernanceSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowDelegation` | property | <code>allowDelegation: boolean</code> | Public allow Delegation property. |
| `allowedPrincipalTypes` | property | <code>allowedPrincipalTypes: ("system" &#124; "agent" &#124; "user" &#124; "service")[]</code> | Public allowed Principal Types property. |
| `approvalPolicy` | property | <code>approvalPolicy: HumanReviewPolicySpec</code> | Public approval Policy property. |
| `auditPolicy` | property | <code>auditPolicy: { enabled: boolean; includeInput?: boolean; includeOutput?: boolean; redactPaths?: string[]; }</code> | Public audit Policy property. |
| `deniedPermissionScopes` | property | <code>deniedPermissionScopes: string[]</code> | Public denied Permission Scopes property. |
| `maxDelegationDepth` | property | <code>maxDelegationDepth: number</code> | Public max Delegation Depth property. |
| `policyRefs` | property | <code>policyRefs: { id: string; version?: string; revision?: string; }[]</code> | Public policy Refs property. |
| `requiredPermissionScopes` | property | <code>requiredPermissionScopes: string[]</code> | Public required Permission Scopes property. |
| `tenantIsolation` | property | <code>tenantIsolation: boolean</code> | Public tenant Isolation property. |
| `workspaceIsolation` | property | <code>workspaceIsolation: boolean</code> | Public workspace Isolation property. |

## `ToolInvocationScopeSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `fsmState` | property | <code>fsmState: string</code> | Public fsm State property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ToolLateResultPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mode` | property | <code>mode: "reconcile" &#124; "quarantine" &#124; "discard" &#124; "accept"</code> | Public mode property. |
| `reconciliationToolRef` | property | <code>reconciliationToolRef: { id: string; version?: string; revision?: string; }</code> | Public reconciliation Tool Ref property. |

## `ToolObservabilitySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `metricsEnabled` | property | <code>metricsEnabled: boolean</code> | Public metrics Enabled property. |
| `recordAttempts` | property | <code>recordAttempts: boolean</code> | Public record Attempts property. |
| `recordInput` | property | <code>recordInput: boolean</code> | Public record Input property. |
| `recordOutput` | property | <code>recordOutput: boolean</code> | Public record Output property. |
| `recordPolicyDecision` | property | <code>recordPolicyDecision: boolean</code> | Public record Policy Decision property. |
| `redactionPolicyRef` | property | <code>redactionPolicyRef: { id: string; version?: string; revision?: string; }</code> | Public redaction Policy Ref property. |
| `traceLevel` | property | <code>traceLevel: "none" &#124; "metadata" &#124; "summary" &#124; "full_redacted"</code> | Public trace Level property. |

## `ToolOutputLimitSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxInlineBytes` | property | <code>maxInlineBytes: number</code> | Public max Inline Bytes property. |
| `overflow` | property | <code>overflow: "fail" &#124; "artifact" &#124; "truncate"</code> | Public overflow property. |

## `ToolPrincipalSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `authenticationContext` | property | <code>authenticationContext: Record&lt;string, unknown&gt;</code> | Public authentication Context property. |
| `delegatedBy` | property | <code>delegatedBy: string</code> | Public delegated By property. |
| `delegationDepth` | property | <code>delegationDepth: number</code> | Public delegation Depth property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `permissionScopes` | property | <code>permissionScopes: string[]</code> | Public permission Scopes property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `roles` | property | <code>roles: string[]</code> | Public roles property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `type` | property | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | Public type property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ToolSchemaSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowAdditionalProperties` | property | <code>allowAdditionalProperties: boolean</code> | Public allow Additional Properties property. |
| `jsonSchema` | property | <code>jsonSchema: JsonSchema</code> | Public json schema property. |
| `maxSerializedBytes` | property | <code>maxSerializedBytes: number</code> | Public max Serialized Bytes property. |
| `redactedPaths` | property | <code>redactedPaths: string[]</code> | Public redacted Paths property. |
| `schemaHash` | property | <code>schemaHash: string</code> | Public schema Hash property. |
| `schemaId` | property | <code>schemaId: string</code> | Public schema Id property. |
| `schemaVersion` | property | <code>schemaVersion: string</code> | Public schema Version property. |
| `sensitivePaths` | property | <code>sensitivePaths: string[]</code> | Public sensitive Paths property. |
| `strict` | property | <code>strict: boolean</code> | Public strict property. |

## `ToolSemanticSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `destructiveHint` | property | <code>destructiveHint: boolean</code> | Public destructive Hint property. |
| `deterministic` | property | <code>deterministic: boolean</code> | Public deterministic property. |
| `expectedArtifacts` | property | <code>expectedArtifacts: ToolArtifactContract[]</code> | Public expected Artifacts property. |
| `idempotency` | property | <code>idempotency: "none" &#124; "caller_key" &#124; "derived_key" &#124; "provider_key" &#124; "intrinsic"</code> | Public idempotency property. |
| `openWorldHint` | property | <code>openWorldHint: boolean</code> | Public open World Hint property. |
| `postconditions` | property | <code>postconditions: PolicyRuleSpec[]</code> | Public postconditions property. |
| `preconditions` | property | <code>preconditions: PolicyRuleSpec[]</code> | Public preconditions property. |
| `readOnlyHint` | property | <code>readOnlyHint: boolean</code> | Public read Only Hint property. |
| `resultSemantics` | property | <code>resultSemantics: "artifact" &#124; "observation" &#124; "state_patch" &#124; "external_receipt"</code> | Public result Semantics property. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public side Effect Level property. |

## `ToolSourceRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adapterId` | property | <code>adapterId: string</code> | Public adapter Id property. |
| `endpointRef` | property | <code>endpointRef: string</code> | Public endpoint Ref property. |
| `handlerId` | property | <code>handlerId: string</code> | Public handler Id property. |
| `hostedToolId` | property | <code>hostedToolId: string</code> | Public hosted Tool Id property. |
| `mcpCapabilityHash` | property | <code>mcpCapabilityHash: string</code> | Public mcp Capability Hash property. |
| `mcpCapabilityId` | property | <code>mcpCapabilityId: string</code> | Public mcp Capability Id property. |
| `mcpServerId` | property | <code>mcpServerId: string</code> | Public mcp Server Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `pluginId` | property | <code>pluginId: string</code> | Public plugin Id property. |

## `ToolStreamingSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `enabled` | property | <code>enabled: boolean</code> | Public enabled property. |
| `maxUpdates` | property | <code>maxUpdates: number</code> | Public max Updates property. |
| `supportsProgress` | property | <code>supportsProgress: boolean</code> | Public supports Progress property. |
| `supportsStructuredContent` | property | <code>supportsStructuredContent: boolean</code> | Public supports Structured Content property. |
