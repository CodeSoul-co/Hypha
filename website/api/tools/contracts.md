# `@codesoul-co/hypha-tools` / `contracts`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Source: [`packages/tools/src/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)
- Exports: **76**

## Using this module

Use the Contracts module for declaring and runtime-validating contracts. It exports 38 constants, 4 functions, 32 interfaces, 2 types.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 34 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 38 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { effectiveAgentCapabilitySnapshotSchema } from '@codesoul-co/hypha-tools';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = effectiveAgentCapabilitySnapshotSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `effectiveAgentCapabilitySnapshotSchema` | constant | <code>const effectiveAgentCapabilitySnapshotSchema: z.ZodObject&lt;{ id: z.ZodString; runId: z.ZodString; agentId: z.ZodString; principalId: z.ZodString; tenantId: z.ZodOptional&lt;z.ZodString&gt;; domainId: z.ZodOptional&lt;z.ZodString&gt;; createdAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; skillRevisions: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; contentHash: z.ZodString; }, "strip", z.ZodTypeAny, {...</code> | Runtime schema for Effective Agent Capability Snapshot. |
| `effectiveCapabilityApprovalSchema` | constant | <code>const effectiveCapabilityApprovalSchema: z.ZodObject&lt;{ taskId: z.ZodString; subjectType: z.ZodLiteral&lt;"effective_capability_snapshot"&gt;; subjectHash: z.ZodString; snapshotId: z.ZodString; runId: z.ZodString; agentId: z.ZodString; principalId: z.ZodString; approvedBy: z.ZodString; approvedAt: z.ZodString; expiresAt: z.ZodString; status: z.ZodLiteral&lt;"approved"&gt;; }, "strict", z.ZodTypeAny, { status: "approved"; runId...</code> | Runtime schema for Effective Capability Approval. |
| `governedHumanApprovalDefinition` | constant | <code>const governedHumanApprovalDefinition: SpecSchemaDefinition&lt;GovernedHumanApprovalRequest&gt;</code> | Governed Human Approval Definition constant exported by the `contracts` module. |
| `governedHumanApprovalExample` | constant | <code>const governedHumanApprovalExample: GovernedHumanApprovalRequest</code> | Valid example value for Governed Human Approval. |
| `governedHumanApprovalJsonSchema` | constant | <code>const governedHumanApprovalJsonSchema: JsonSchema</code> | JSON Schema for Governed Human Approval. |
| `governedHumanApprovalPolicySpecSchema` | constant | <code>const governedHumanApprovalPolicySpecSchema: z.ZodObject&lt;{ mode: z.ZodEnum&lt;["never", "policy", "always"]&gt;; requiredForSideEffects: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["none", "read", "write", "external_effect", "irreversible"]&gt;, "many"&gt;&gt;; approverRoles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; minApprovals: z.ZodOptional&lt;z.ZodNumber&gt;; expiresAfterSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; allowParameterEdit: z.Zo...</code> | Runtime schema for Governed Human Approval Policy Spec. |
| `governedHumanApprovalRequestSchema` | constant | <code>const governedHumanApprovalRequestSchema: z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; invocationId: z.ZodString; toolRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; ...</code> | Runtime schema for Governed Human Approval Request. |
| `governedToolContractDefinition` | constant | <code>const governedToolContractDefinition: SpecSchemaDefinition&lt;GovernedToolContractSpec&gt;</code> | Governed Tool Contract Definition constant exported by the `contracts` module. |
| `governedToolContractExample` | constant | <code>const governedToolContractExample: GovernedToolContractSpec</code> | Valid example value for Governed Tool Contract. |
| `governedToolContractJsonSchema` | constant | <code>const governedToolContractJsonSchema: JsonSchema</code> | JSON Schema for Governed Tool Contract. |
| `governedToolContractJsonSchemas` | constant | <code>const governedToolContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Governed Tool Contract JSON Schemas constant exported by the `contracts` module. |
| `governedToolContractSpecSchema` | constant | <code>const governedToolContractSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; revision: z.ZodString; name: z.ZodString; displayName: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodString; instructions: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; input: z.ZodObject&lt;{ jsonSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; schemaId: z.ZodOptional&lt;z.ZodString&gt;; s...</code> | Runtime schema for Governed Tool Contract Spec. |
| `governedToolInvocationDefinition` | constant | <code>const governedToolInvocationDefinition: SpecSchemaDefinition&lt;GovernedToolInvocationRecord&gt;</code> | Governed Tool Invocation Definition constant exported by the `contracts` module. |
| `governedToolInvocationExample` | constant | <code>const governedToolInvocationExample: GovernedToolInvocationRecord</code> | Valid example value for Governed Tool Invocation. |
| `governedToolInvocationJsonSchema` | constant | <code>const governedToolInvocationJsonSchema: JsonSchema</code> | JSON Schema for Governed Tool Invocation. |
| `governedToolInvocationRecordSchema` | constant | <code>const governedToolInvocationRecordSchema: z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; operationId: z.ZodString; toolRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }...</code> | Runtime schema for Governed Tool Invocation Record. |
| `governedToolInvocationStatusSchema` | constant | <code>const governedToolInvocationStatusSchema: z.ZodEnum&lt;["created", "validating", "validated", "denied", "waiting_approval", "approved", "rejected", "queued", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "expired", "conflict"]&gt;</code> | Runtime schema for Governed Tool Invocation Status. |
| `normalizedToolErrorSchema` | constant | <code>const normalizedToolErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["TOOL_NOT_FOUND", "TOOL_DISABLED", "TOOL_SCHEMA_INVALID", "TOOL_OUTPUT_INVALID", "TOOL_PERMISSION_DENIED", "TOOL_POLICY_DENIED", "TOOL_APPROVAL_REQUIRED", "TOOL_APPROVAL_REJECTED", "TOOL_APPROVAL_EXPIRED", "TOOL_IDEMPOTENCY_CONFLICT", "TOOL_CONCURRENCY_CONFLICT", "TOOL_TIMEOUT", "TOOL_CANCELLED", "TOOL_ADAPTER_UNAVAILABLE", "TOOL_RETRY_EXHAUSTED", "TO...</code> | Runtime schema for Normalized Tool Error. |
| `providerHealthSchema` | constant | <code>const providerHealthSchema: z.ZodObject&lt;{ status: z.ZodEnum&lt;["healthy", "degraded", "unhealthy", "unknown"]&gt;; checkedAt: z.ZodString; latencyMs: z.ZodOptional&lt;z.ZodNumber&gt;; message: z.ZodOptional&lt;z.ZodString&gt;; details: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "strip", z.ZodTypeAny, { status: "unknown" &#124; "healthy" &#124; "degraded" &#124; "unhealthy"; checkedAt: string; message?: string &#124; undefined; latencyM...</code> | Runtime schema for Provider Health. |
| `toolCachePolicySpecSchema` | constant | <code>const toolCachePolicySpecSchema: z.ZodObject&lt;{ mode: z.ZodEnum&lt;["disabled", "result", "observation_ref"]&gt;; ttlSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; scope: z.ZodEnum&lt;["run", "session", "workspace", "tenant"]&gt;; keyFields: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; includeToolRevision: z.ZodBoolean; includePolicyRevision: z.ZodBoolean; allowForSideEffectLevels: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["none", "read", ...</code> | Runtime schema for Tool Cache Policy Spec. |
| `toolContractSnapshotDefinition` | constant | <code>const toolContractSnapshotDefinition: SpecSchemaDefinition&lt;ToolContractSnapshot&gt;</code> | Tool Contract Snapshot Definition constant exported by the `contracts` module. |
| `toolContractSnapshotExample` | constant | <code>const toolContractSnapshotExample: ToolContractSnapshot</code> | Valid example value for Tool Contract Snapshot. |
| `toolContractSnapshotItemSchema` | constant | <code>const toolContractSnapshotItemSchema: z.ZodObject&lt;{ toolId: z.ZodString; toolVersion: z.ZodString; toolRevision: z.ZodString; inputSchemaHash: z.ZodString; outputSchemaHash: z.ZodOptional&lt;z.ZodString&gt;; sourceCapabilityHash: z.ZodOptional&lt;z.ZodString&gt;; sideEffectLevel: z.ZodEnum&lt;["none", "read", "write", "external_effect", "irreversible"]&gt;; adapterRef: z.ZodString; }, "strip", z.ZodTypeAny, { toolId: string; toolVe...</code> | Runtime schema for Tool Contract Snapshot Item. |
| `toolContractSnapshotJsonSchema` | constant | <code>const toolContractSnapshotJsonSchema: JsonSchema</code> | JSON Schema for Tool Contract Snapshot. |
| `toolContractSnapshotSchema` | constant | <code>const toolContractSnapshotSchema: z.ZodObject&lt;{ id: z.ZodString; runId: z.ZodString; createdAt: z.ZodString; toolContracts: z.ZodArray&lt;z.ZodObject&lt;{ toolId: z.ZodString; toolVersion: z.ZodString; toolRevision: z.ZodString; inputSchemaHash: z.ZodString; outputSchemaHash: z.ZodOptional&lt;z.ZodString&gt;; sourceCapabilityHash: z.ZodOptional&lt;z.ZodString&gt;; sideEffectLevel: z.ZodEnum&lt;["none", "read", "write", "external_effec...</code> | Runtime schema for Tool Contract Snapshot. |
| `toolEventPayloadBaseDefinition` | constant | <code>const toolEventPayloadBaseDefinition: SpecSchemaDefinition&lt;ToolEventPayloadBase&gt;</code> | Tool Event Payload Base Definition constant exported by the `contracts` module. |
| `toolEventPayloadBaseExample` | constant | <code>const toolEventPayloadBaseExample: ToolEventPayloadBase</code> | Valid example value for Tool Event Payload Base. |
| `toolEventPayloadBaseJsonSchema` | constant | <code>const toolEventPayloadBaseJsonSchema: JsonSchema</code> | JSON Schema for Tool Event Payload Base. |
| `toolEventPayloadBaseSchema` | constant | <code>const toolEventPayloadBaseSchema: z.ZodObject&lt;{ invocationId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodOptional&lt;z.ZodString&gt;; toolId: z.ZodOptional&lt;z.ZodString&gt;; toolVersion: z.ZodOptional&lt;z.ZodString&gt;; toolRevision: z.ZodOptional&lt;z.ZodString&gt;; contractSnapshotRef: z.ZodOptional&lt;z.ZodString&gt;; scopeHash: z.ZodOptional&lt;z.ZodString&gt;; principalId: z.ZodOptional&lt;z.ZodString&gt;; sideEffectLevel: z.ZodOptional&lt;z.ZodEn...</code> | Runtime schema for Tool Event Payload Base. |
| `toolExecutionContextSpecSchema` | constant | <code>const toolExecutionContextSpecSchema: z.ZodObject&lt;{ principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;;...</code> | Runtime schema for Tool Execution Context Spec. |
| `toolExecutionPolicySpecSchema` | constant | <code>const toolExecutionPolicySpecSchema: z.ZodObject&lt;{ timeout: z.ZodObject&lt;{ timeoutMs: z.ZodNumber; onTimeout: z.ZodOptional&lt;z.ZodEnum&lt;["fail", "retry", "human_review"]&gt;&gt;; }, "strip", z.ZodTypeAny, { timeoutMs: number; onTimeout?: "fail" &#124; "retry" &#124; "human_review" &#124; undefined; }, { timeoutMs: number; onTimeout?: "fail" &#124; "retry" &#124; "human_review" &#124; undefined; }&gt;; retry: z.ZodObject&lt;{ maxAttempts: z.ZodNumber; backoff...</code> | Runtime schema for Tool Execution Policy Spec. |
| `toolGovernanceSpecSchema` | constant | <code>const toolGovernanceSpecSchema: z.ZodObject&lt;{ requiredPermissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; deniedPermissionScopes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; allowedPrincipalTypes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;, "many"&gt;&gt;; policyRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z....</code> | Runtime schema for Tool Governance Spec. |
| `toolInvocationScopeSpecSchema` | constant | <code>const toolInvocationScopeSpecSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; stepId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; fsmState: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { runId: string; userId: string; sessionId: string; agentId?: string &#124; undefined; ten...</code> | Runtime schema for Tool Invocation Scope Spec. |
| `toolObservabilitySpecSchema` | constant | <code>const toolObservabilitySpecSchema: z.ZodObject&lt;{ traceLevel: z.ZodEnum&lt;["none", "metadata", "summary", "full_redacted"]&gt;; recordInput: z.ZodOptional&lt;z.ZodBoolean&gt;; recordOutput: z.ZodOptional&lt;z.ZodBoolean&gt;; recordAttempts: z.ZodOptional&lt;z.ZodBoolean&gt;; recordPolicyDecision: z.ZodOptional&lt;z.ZodBoolean&gt;; metricsEnabled: z.ZodOptional&lt;z.ZodBoolean&gt;; redactionPolicyRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; vers...</code> | Runtime schema for Tool Observability Spec. |
| `toolPrincipalSpecSchema` | constant | <code>const toolPrincipalSpecSchema: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; delegatedBy: z.ZodOptional&lt;z.Zo...</code> | Runtime schema for Tool Principal Spec. |
| `toolSchemaSpecSchema` | constant | <code>const toolSchemaSpecSchema: z.ZodObject&lt;{ jsonSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; schemaId: z.ZodOptional&lt;z.ZodString&gt;; schemaVersion: z.ZodOptional&lt;z.ZodString&gt;; schemaHash: z.ZodString; strict: z.ZodOptional&lt;z.ZodBoolean&gt;; allowAdditionalProperties: z.ZodOptional&lt;z.ZodBoolean&gt;; maxSerializedBytes: z.ZodOptional&lt;z.ZodNumber&gt;; sensitivePaths: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; red...</code> | Runtime schema for Tool Schema Spec. |
| `toolSemanticSpecSchema` | constant | <code>const toolSemanticSpecSchema: z.ZodType&lt;ToolSemanticSpec, z.ZodTypeDef, ToolSemanticSpec&gt;</code> | Runtime schema for Tool Semantic Spec. |
| `toolSourceRefSchema` | constant | <code>const toolSourceRefSchema: z.ZodObject&lt;{ adapterId: z.ZodOptional&lt;z.ZodString&gt;; handlerId: z.ZodOptional&lt;z.ZodString&gt;; endpointRef: z.ZodOptional&lt;z.ZodString&gt;; mcpServerId: z.ZodOptional&lt;z.ZodString&gt;; mcpCapabilityId: z.ZodOptional&lt;z.ZodString&gt;; mcpCapabilityHash: z.ZodOptional&lt;z.ZodString&gt;; pluginId: z.ZodOptional&lt;z.ZodString&gt;; hostedToolId: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodStr...</code> | Runtime schema for Tool Source Ref. |
| `canonicalJson` | function | <code>canonicalJson(value: unknown): string</code> | Canonical JSON function with 1 public call signature; parameters and return types are listed below. |
| `createToolCacheValidityKey` | function | <code>createToolCacheValidityKey(input: ToolCacheValidityInput): string</code> | Create Tool Cache Validity Key function with 1 public call signature; parameters and return types are listed below. |
| `createToolSchemaSpec` | function | <code>createToolSchemaSpec(jsonSchema: JsonSchema, options?: Omit&lt;Partial&lt;ToolSchemaSpec&gt;, "jsonSchema" &#124; "schemaHash"&gt;): ToolSchemaSpec</code> | Create Tool Schema Spec function with 1 public call signature; parameters and return types are listed below. |
| `hashToolContract` | function | <code>hashToolContract(value: unknown): string</code> | Hash Tool Contract function with 1 public call signature; parameters and return types are listed below. |
| `EffectiveAgentCapabilitySnapshot` | interface | <code>interface EffectiveAgentCapabilitySnapshot</code> | Effective Agent Capability Snapshot interface with 17 public fields or methods. |
| `EffectiveCapabilityApproval` | interface | <code>interface EffectiveCapabilityApproval</code> | Effective Capability Approval interface with 11 public fields or methods. |
| `GovernedHumanApprovalPolicySpec` | interface | <code>interface GovernedHumanApprovalPolicySpec</code> | Governed Human Approval Policy Spec interface with 9 public fields or methods. |
| `GovernedHumanApprovalRequest` | interface | <code>interface GovernedHumanApprovalRequest</code> | Governed Human Approval Request interface with 19 public fields or methods. |
| `GovernedToolContractSpec` | interface | <code>interface GovernedToolContractSpec</code> | Governed Tool Contract Spec interface with 22 public fields or methods. |
| `GovernedToolInvocationRecord` | interface | <code>interface GovernedToolInvocationRecord</code> | Governed Tool Invocation Record interface with 35 public fields or methods. |
| `HumanApprovalDecisionRecord` | interface | <code>interface HumanApprovalDecisionRecord</code> | Human Approval Decision Record interface with 5 public fields or methods. |
| `NormalizedToolError` | interface | <code>interface NormalizedToolError</code> | Normalized Tool Error interface with 7 public fields or methods. |
| `ProviderHealth` | interface | <code>interface ProviderHealth</code> | Provider Health interface with 5 public fields or methods. |
| `ToolArtifactContract` | interface | <code>interface ToolArtifactContract</code> | Tool Artifact Contract interface with 4 public fields or methods. |
| `ToolCachePolicySpec` | interface | <code>interface ToolCachePolicySpec</code> | Tool Cache Policy Spec interface with 8 public fields or methods. |
| `ToolCacheValidityInput` | interface | <code>interface ToolCacheValidityInput</code> | Tool Cache Validity Input interface with 8 public fields or methods. |
| `ToolCacheValidityRecord` | interface | <code>interface ToolCacheValidityRecord extends ToolCacheValidityInput</code> | Tool Cache Validity Record interface with 10 public fields or methods. |
| `ToolCancellationPolicySpec` | interface | <code>interface ToolCancellationPolicySpec</code> | Tool Cancellation Policy Spec interface with 2 public fields or methods. |
| `ToolConcurrencyPolicySpec` | interface | <code>interface ToolConcurrencyPolicySpec</code> | Tool Concurrency Policy Spec interface with 3 public fields or methods. |
| `ToolContractSnapshot` | interface | <code>interface ToolContractSnapshot</code> | Tool Contract Snapshot interface with 8 public fields or methods. |
| `ToolContractSnapshotItem` | interface | <code>interface ToolContractSnapshotItem</code> | Tool Contract Snapshot Item interface with 8 public fields or methods. |
| `ToolContractSnapshotStore` | interface | <code>interface ToolContractSnapshotStore</code> | Tool Contract Snapshot Store interface with 2 public fields or methods. |
| `ToolEventPayloadBase` | interface | <code>interface ToolEventPayloadBase</code> | Tool Event Payload Base interface with 15 public fields or methods. |
| `ToolExecutionContextSpec` | interface | <code>interface ToolExecutionContextSpec</code> | Tool Execution Context Spec interface with 21 public fields or methods. |
| `ToolExecutionPolicySpec` | interface | <code>interface ToolExecutionPolicySpec</code> | Tool Execution Policy Spec interface with 7 public fields or methods. |
| `ToolExternalReceipt` | interface | <code>interface ToolExternalReceipt</code> | Tool External Receipt interface with 5 public fields or methods. |
| `ToolGovernanceSpec` | interface | <code>interface ToolGovernanceSpec</code> | Tool Governance Spec interface with 10 public fields or methods. |
| `ToolInvocationScopeSpec` | interface | <code>interface ToolInvocationScopeSpec</code> | Tool Invocation Scope Spec interface with 8 public fields or methods. |
| `ToolLateResultPolicySpec` | interface | <code>interface ToolLateResultPolicySpec</code> | Tool Late Result Policy Spec interface with 2 public fields or methods. |
| `ToolObservabilitySpec` | interface | <code>interface ToolObservabilitySpec</code> | Tool Observability Spec interface with 7 public fields or methods. |
| `ToolOutputLimitSpec` | interface | <code>interface ToolOutputLimitSpec</code> | Tool Output Limit Spec interface with 2 public fields or methods. |
| `ToolPrincipalSpec` | interface | <code>interface ToolPrincipalSpec</code> | Tool Principal Spec interface with 12 public fields or methods. |
| `ToolSchemaSpec` | interface | <code>interface ToolSchemaSpec</code> | Tool Schema Spec interface with 9 public fields or methods. |
| `ToolSemanticSpec` | interface | <code>interface ToolSemanticSpec</code> | Tool Semantic Spec interface with 10 public fields or methods. |
| `ToolSourceRef` | interface | <code>interface ToolSourceRef</code> | Tool Source Ref interface with 9 public fields or methods. |
| `ToolStreamingSpec` | interface | <code>interface ToolStreamingSpec</code> | Tool Streaming Spec interface with 4 public fields or methods. |
| `GovernedToolInvocationStatus` | type | <code>type GovernedToolInvocationStatus = 'created' &#124; 'validating' &#124; 'validated' &#124; 'denied' &#124; 'waiting_approval' &#124; 'approved' &#124; 'rejected' &#124; 'queued' &#124; 'running' &#124; 'cancelling' &#124; 'cancelled' &#124; 'completed' &#124; 'failed' &#124; 'timed_out' &#124; 'expired' &#124; 'conflict'</code> | Public type alias for Governed Tool Invocation Status; the declaration contains its complete type expression. |
| `ToolSource` | type | <code>type ToolSource = 'local' &#124; 'mcp' &#124; 'http' &#124; 'plugin' &#124; 'hosted' &#124; 'execution' &#124; 'custom'</code> | Public type alias for Tool Source; the declaration contains its complete type expression. |

## `effectiveAgentCapabilitySnapshotSchema`

Runtime schema for Effective Agent Capability Snapshot.

- Kind: constant
- Import: `import { effectiveAgentCapabilitySnapshotSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const effectiveAgentCapabilitySnapshotSchema: z.ZodObject<{ id: z.ZodString; runId: z.ZodString; agentId: z.ZodString; principalId: z.ZodString; tenantId: z.ZodOptional<z.ZodString>; domainId: z.ZodOptional<z.ZodString>; createdAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; skillRevisions: z.ZodArray<z.ZodObject<{ id: z.ZodString; version: z.ZodString; contentHash: z.ZodString; }, "strip", z.ZodTypeAny, { id: string; version: string; contentHash: string; }, { id: string; version: string; contentHash: string; }>, "many">; allowedToolIds: z.ZodArray<z.ZodString, "many">; allowedMCPServerIds: z.ZodArray<z.ZodString, "many">; memoryAccess: z.ZodEnum<["none", "read", "write", "read_write"]>; allowedExecutionProfiles: z.ZodArray<z.ZodString, "many">; maximumSideEffectLevel: z.ZodEnum<["none", "read", "write", "external_effect", "irreversible"]>; requiresHumanReview: z.ZodBoolean; policyRefs: z.ZodArray<z.ZodString, "many">; snapshotHash: z.ZodString; }, "strip", z.ZodTypeAny, { id: string; policyRefs: string[]; runId: string; agentId: string; principalId: string; createdAt: string; skillRevisions: { id: string; version: string; contentHash: string; }[]; allowedToolIds: string[]; allowedMCPServerIds: string[]; memoryAccess: "none" | "read" | "write" | "read_write"; allowedExecutionProfiles: string[]; maximumSideEffectLevel: "none" | "read" | "write" | "external_effect" | "irreversible"; requiresHumanReview: boolean; snapshotHash: string; tenantId?: string | undefined; domainId?: string | undefined; expiresAt?: string | undefined; }, { id: string; policyRefs: string[]; runId: string; agentId: string; principalId: string; createdAt: string; skillRevisions: { id: string; version: string; contentHash: string; }[]; allowedToolIds: string[]; allowedMCPServerIds: string[]; memoryAccess: "none" | "read" | "write" | "read_write"; allowedExecutionProfiles: string[]; maximumSideEffectLevel: "none" | "read" | "write" | "external_effect" | "irreversible"; requiresHumanReview: boolean; snapshotHash: string; tenantId?: string | undefined; domainId?: string | undefined; expiresAt?: string | undefined; }>;
```

## `effectiveCapabilityApprovalSchema`

Runtime schema for Effective Capability Approval.

- Kind: constant
- Import: `import { effectiveCapabilityApprovalSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const effectiveCapabilityApprovalSchema: z.ZodObject<{ taskId: z.ZodString; subjectType: z.ZodLiteral<"effective_capability_snapshot">; subjectHash: z.ZodString; snapshotId: z.ZodString; runId: z.ZodString; agentId: z.ZodString; principalId: z.ZodString; approvedBy: z.ZodString; approvedAt: z.ZodString; expiresAt: z.ZodString; status: z.ZodLiteral<"approved">; }, "strict", z.ZodTypeAny, { status: "approved"; runId: string; agentId: string; principalId: string; expiresAt: string; taskId: string; subjectType: "effective_capability_snapshot"; subjectHash: string; snapshotId: string; approvedBy: string; approvedAt: string; }, { status: "approved"; runId: string; agentId: string; principalId: string; expiresAt: string; taskId: string; subjectType: "effective_capability_snapshot"; subjectHash: string; snapshotId: string; approvedBy: string; approvedAt: string; }>;
```

## `governedHumanApprovalDefinition`

Governed Human Approval Definition constant exported by the `contracts` module.

- Kind: constant
- Import: `import { governedHumanApprovalDefinition } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const governedHumanApprovalDefinition: SpecSchemaDefinition<GovernedHumanApprovalRequest>;
```

## `governedHumanApprovalExample`

Valid example value for Governed Human Approval.

- Kind: constant
- Import: `import { governedHumanApprovalExample } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const governedHumanApprovalExample: GovernedHumanApprovalRequest;
```

## `governedHumanApprovalJsonSchema`

JSON Schema for Governed Human Approval.

- Kind: constant
- Import: `import { governedHumanApprovalJsonSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const governedHumanApprovalJsonSchema: JsonSchema;
```

## `governedHumanApprovalPolicySpecSchema`

Runtime schema for Governed Human Approval Policy Spec.

- Kind: constant
- Import: `import { governedHumanApprovalPolicySpecSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const governedHumanApprovalPolicySpecSchema: z.ZodObject<{ mode: z.ZodEnum<["never", "policy", "always"]>; requiredForSideEffects: z.ZodOptional<z.ZodArray<z.ZodEnum<["none", "read", "write", "external_effect", "irreversible"]>, "many">>; approverRoles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; minApprovals: z.ZodOptional<z.ZodNumber>; expiresAfterSeconds: z.ZodOptional<z.ZodNumber>; allowParameterEdit: z.ZodOptional<z.ZodBoolean>; requireReason: z.ZodOptional<z.ZodBoolean>; revalidateOnResume: z.ZodOptional<z.ZodBoolean>; escalationPolicyRef: z.ZodOptional<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; revision?: string | undefined; }, { id: string; version?: string | undefined; revision?: string | undefined; }>>; }, "strip", z.ZodTypeAny, { mode: "never" | "policy" | "always"; requiredForSideEffects?: ("none" | "read" | "write" | "external_effect" | "irreversible")[] | undefined; approverRoles?: string[] | undefined; minApprovals?: number | undefined; expiresAfterSeconds?: number | undefined; allowParameterEdit?: boolean | undefined; requireReason?: boolean | undefined; revalidateOnResume?: boolean | undefined; escalationPolicyRef?: { id: string; version?: string | undefined; revision?: string | undefined; } | undefined; }, { mode: "never" | "policy" | "always"; requiredForSideEffects?: ("none" | "read" | "write" | "external_effect" | "irreversible")[] | undefined; approverRoles?: string[] | undefined; minApprovals?: number | undefined; expiresAfterSeconds?: number | undefined; allowParameterEdit?: boolean | undefined; requireReason?: boolean | undefined; revalidateOnResume?: boolean | undefined; escalationPolicyRef?: { id: string; version?: string | undefined; revision?: string | undefined; } | undefined; }>;
```

## `governedHumanApprovalRequestSchema`

Runtime schema for Governed Human Approval Request.

- Kind: constant
- Import: `import { governedHumanApprovalRequestSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const governedHumanApprovalRequestSchema: (typeof import('@codesoul-co/hypha-tools'))['governedHumanApprovalRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `governedToolContractDefinition`

Governed Tool Contract Definition constant exported by the `contracts` module.

- Kind: constant
- Import: `import { governedToolContractDefinition } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const governedToolContractDefinition: SpecSchemaDefinition<GovernedToolContractSpec>;
```

## `governedToolContractExample`

Valid example value for Governed Tool Contract.

- Kind: constant
- Import: `import { governedToolContractExample } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const governedToolContractExample: GovernedToolContractSpec;
```

## `governedToolContractJsonSchema`

JSON Schema for Governed Tool Contract.

- Kind: constant
- Import: `import { governedToolContractJsonSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const governedToolContractJsonSchema: JsonSchema;
```

## `governedToolContractJsonSchemas`

Governed Tool Contract JSON Schemas constant exported by the `contracts` module.

- Kind: constant
- Import: `import { governedToolContractJsonSchemas } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const governedToolContractJsonSchemas: Record<string, JsonSchema>;
```

## `governedToolContractSpecSchema`

Runtime schema for Governed Tool Contract Spec.

- Kind: constant
- Import: `import { governedToolContractSpecSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const governedToolContractSpecSchema: (typeof import('@codesoul-co/hypha-tools'))['governedToolContractSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `governedToolInvocationDefinition`

Governed Tool Invocation Definition constant exported by the `contracts` module.

- Kind: constant
- Import: `import { governedToolInvocationDefinition } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const governedToolInvocationDefinition: SpecSchemaDefinition<GovernedToolInvocationRecord>;
```

## `governedToolInvocationExample`

Valid example value for Governed Tool Invocation.

- Kind: constant
- Import: `import { governedToolInvocationExample } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const governedToolInvocationExample: GovernedToolInvocationRecord;
```

## `governedToolInvocationJsonSchema`

JSON Schema for Governed Tool Invocation.

- Kind: constant
- Import: `import { governedToolInvocationJsonSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const governedToolInvocationJsonSchema: JsonSchema;
```

## `governedToolInvocationRecordSchema`

Runtime schema for Governed Tool Invocation Record.

- Kind: constant
- Import: `import { governedToolInvocationRecordSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const governedToolInvocationRecordSchema: (typeof import('@codesoul-co/hypha-tools'))['governedToolInvocationRecordSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `governedToolInvocationStatusSchema`

Runtime schema for Governed Tool Invocation Status.

- Kind: constant
- Import: `import { governedToolInvocationStatusSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const governedToolInvocationStatusSchema: z.ZodEnum<["created", "validating", "validated", "denied", "waiting_approval", "approved", "rejected", "queued", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "expired", "conflict"]>;
```

## `normalizedToolErrorSchema`

Runtime schema for Normalized Tool Error.

- Kind: constant
- Import: `import { normalizedToolErrorSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const normalizedToolErrorSchema: z.ZodObject<{ code: z.ZodEnum<["TOOL_NOT_FOUND", "TOOL_DISABLED", "TOOL_SCHEMA_INVALID", "TOOL_OUTPUT_INVALID", "TOOL_PERMISSION_DENIED", "TOOL_POLICY_DENIED", "TOOL_APPROVAL_REQUIRED", "TOOL_APPROVAL_REJECTED", "TOOL_APPROVAL_EXPIRED", "TOOL_IDEMPOTENCY_CONFLICT", "TOOL_CONCURRENCY_CONFLICT", "TOOL_TIMEOUT", "TOOL_CANCELLED", "TOOL_ADAPTER_UNAVAILABLE", "TOOL_RETRY_EXHAUSTED", "TOOL_LATE_RESULT", "TOOL_EXECUTION_FAILED", "TOOL_INTERNAL_ERROR"]>; message: z.ZodString; retryable: z.ZodBoolean; attempt: z.ZodOptional<z.ZodNumber>; providerCode: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>; details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; causeRef: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { code: "TOOL_NOT_FOUND" | "TOOL_DISABLED" | "TOOL_SCHEMA_INVALID" | "TOOL_OUTPUT_INVALID" | "TOOL_PERMISSION_DENIED" | "TOOL_POLICY_DENIED" | "TOOL_APPROVAL_REQUIRED" | "TOOL_APPROVAL_REJECTED" | "TOOL_APPROVAL_EXPIRED" | "TOOL_IDEMPOTENCY_CONFLICT" | "TOOL_CONCURRENCY_CONFLICT" | "TOOL_TIMEOUT" | "TOOL_CANCELLED" | "TOOL_ADAPTER_UNAVAILABLE" | "TOOL_RETRY_EXHAUSTED" | "TOOL_LATE_RESULT" | "TOOL_EXECUTION_FAILED" | "TOOL_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, unknown> | undefined; attempt?: number | undefined; providerCode?: string | number | undefined; causeRef?: string | undefined; }, { code: "TOOL_NOT_FOUND" | "TOOL_DISABLED" | "TOOL_SCHEMA_INVALID" | "TOOL_OUTPUT_INVALID" | "TOOL_PERMISSION_DENIED" | "TOOL_POLICY_DENIED" | "TOOL_APPROVAL_REQUIRED" | "TOOL_APPROVAL_REJECTED" | "TOOL_APPROVAL_EXPIRED" | "TOOL_IDEMPOTENCY_CONFLICT" | "TOOL_CONCURRENCY_CONFLICT" | "TOOL_TIMEOUT" | "TOOL_CANCELLED" | "TOOL_ADAPTER_UNAVAILABLE" | "TOOL_RETRY_EXHAUSTED" | "TOOL_LATE_RESULT" | "TOOL_EXECUTION_FAILED" | "TOOL_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, unknown> | undefined; attempt?: number | undefined; providerCode?: string | number | undefined; causeRef?: string | undefined; }>;
```

## `providerHealthSchema`

Runtime schema for Provider Health.

- Kind: constant
- Import: `import { providerHealthSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const providerHealthSchema: z.ZodObject<{ status: z.ZodEnum<["healthy", "degraded", "unhealthy", "unknown"]>; checkedAt: z.ZodString; latencyMs: z.ZodOptional<z.ZodNumber>; message: z.ZodOptional<z.ZodString>; details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { status: "unknown" | "healthy" | "degraded" | "unhealthy"; checkedAt: string; message?: string | undefined; latencyMs?: number | undefined; details?: Record<string, unknown> | undefined; }, { status: "unknown" | "healthy" | "degraded" | "unhealthy"; checkedAt: string; message?: string | undefined; latencyMs?: number | undefined; details?: Record<string, unknown> | undefined; }>;
```

## `toolCachePolicySpecSchema`

Runtime schema for Tool Cache Policy Spec.

- Kind: constant
- Import: `import { toolCachePolicySpecSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const toolCachePolicySpecSchema: z.ZodObject<{ mode: z.ZodEnum<["disabled", "result", "observation_ref"]>; ttlSeconds: z.ZodOptional<z.ZodNumber>; scope: z.ZodEnum<["run", "session", "workspace", "tenant"]>; keyFields: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; includeToolRevision: z.ZodBoolean; includePolicyRevision: z.ZodBoolean; allowForSideEffectLevels: z.ZodOptional<z.ZodArray<z.ZodEnum<["none", "read", "write", "external_effect", "irreversible"]>, "many">>; staleWhileRevalidateSeconds: z.ZodOptional<z.ZodNumber>; }, "strip", z.ZodTypeAny, { mode: "disabled" | "result" | "observation_ref"; scope: "run" | "session" | "workspace" | "tenant"; includeToolRevision: boolean; includePolicyRevision: boolean; keyFields?: string[] | undefined; ttlSeconds?: number | undefined; allowForSideEffectLevels?: ("none" | "read" | "write" | "external_effect" | "irreversible")[] | undefined; staleWhileRevalidateSeconds?: number | undefined; }, { mode: "disabled" | "result" | "observation_ref"; scope: "run" | "session" | "workspace" | "tenant"; includeToolRevision: boolean; includePolicyRevision: boolean; keyFields?: string[] | undefined; ttlSeconds?: number | undefined; allowForSideEffectLevels?: ("none" | "read" | "write" | "external_effect" | "irreversible")[] | undefined; staleWhileRevalidateSeconds?: number | undefined; }>;
```

## `toolContractSnapshotDefinition`

Tool Contract Snapshot Definition constant exported by the `contracts` module.

- Kind: constant
- Import: `import { toolContractSnapshotDefinition } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const toolContractSnapshotDefinition: SpecSchemaDefinition<ToolContractSnapshot>;
```

## `toolContractSnapshotExample`

Valid example value for Tool Contract Snapshot.

- Kind: constant
- Import: `import { toolContractSnapshotExample } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const toolContractSnapshotExample: ToolContractSnapshot;
```

## `toolContractSnapshotItemSchema`

Runtime schema for Tool Contract Snapshot Item.

- Kind: constant
- Import: `import { toolContractSnapshotItemSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const toolContractSnapshotItemSchema: z.ZodObject<{ toolId: z.ZodString; toolVersion: z.ZodString; toolRevision: z.ZodString; inputSchemaHash: z.ZodString; outputSchemaHash: z.ZodOptional<z.ZodString>; sourceCapabilityHash: z.ZodOptional<z.ZodString>; sideEffectLevel: z.ZodEnum<["none", "read", "write", "external_effect", "irreversible"]>; adapterRef: z.ZodString; }, "strip", z.ZodTypeAny, { toolId: string; toolVersion: string; toolRevision: string; inputSchemaHash: string; sideEffectLevel: "none" | "read" | "write" | "external_effect" | "irreversible"; adapterRef: string; outputSchemaHash?: string | undefined; sourceCapabilityHash?: string | undefined; }, { toolId: string; toolVersion: string; toolRevision: string; inputSchemaHash: string; sideEffectLevel: "none" | "read" | "write" | "external_effect" | "irreversible"; adapterRef: string; outputSchemaHash?: string | undefined; sourceCapabilityHash?: string | undefined; }>;
```

## `toolContractSnapshotJsonSchema`

JSON Schema for Tool Contract Snapshot.

- Kind: constant
- Import: `import { toolContractSnapshotJsonSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const toolContractSnapshotJsonSchema: JsonSchema;
```

## `toolContractSnapshotSchema`

Runtime schema for Tool Contract Snapshot.

- Kind: constant
- Import: `import { toolContractSnapshotSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const toolContractSnapshotSchema: (typeof import('@codesoul-co/hypha-tools'))['toolContractSnapshotSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `toolEventPayloadBaseDefinition`

Tool Event Payload Base Definition constant exported by the `contracts` module.

- Kind: constant
- Import: `import { toolEventPayloadBaseDefinition } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const toolEventPayloadBaseDefinition: SpecSchemaDefinition<ToolEventPayloadBase>;
```

## `toolEventPayloadBaseExample`

Valid example value for Tool Event Payload Base.

- Kind: constant
- Import: `import { toolEventPayloadBaseExample } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const toolEventPayloadBaseExample: ToolEventPayloadBase;
```

## `toolEventPayloadBaseJsonSchema`

JSON Schema for Tool Event Payload Base.

- Kind: constant
- Import: `import { toolEventPayloadBaseJsonSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const toolEventPayloadBaseJsonSchema: JsonSchema;
```

## `toolEventPayloadBaseSchema`

Runtime schema for Tool Event Payload Base.

- Kind: constant
- Import: `import { toolEventPayloadBaseSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const toolEventPayloadBaseSchema: (typeof import('@codesoul-co/hypha-tools'))['toolEventPayloadBaseSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `toolExecutionContextSpecSchema`

Runtime schema for Tool Execution Context Spec.

- Kind: constant
- Import: `import { toolExecutionContextSpecSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const toolExecutionContextSpecSchema: (typeof import('@codesoul-co/hypha-tools'))['toolExecutionContextSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `toolExecutionPolicySpecSchema`

Runtime schema for Tool Execution Policy Spec.

- Kind: constant
- Import: `import { toolExecutionPolicySpecSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const toolExecutionPolicySpecSchema: (typeof import('@codesoul-co/hypha-tools'))['toolExecutionPolicySpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `toolGovernanceSpecSchema`

Runtime schema for Tool Governance Spec.

- Kind: constant
- Import: `import { toolGovernanceSpecSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const toolGovernanceSpecSchema: z.ZodObject<{ requiredPermissionScopes: z.ZodArray<z.ZodString, "many">; deniedPermissionScopes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; allowedPrincipalTypes: z.ZodOptional<z.ZodArray<z.ZodEnum<["user", "agent", "service", "system"]>, "many">>; policyRefs: z.ZodOptional<z.ZodArray<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; revision?: string | undefined; }, { id: string; version?: string | undefined; revision?: string | undefined; }>, "many">>; approvalPolicy: z.ZodOptional<z.ZodObject<{ required: z.ZodBoolean; reason: z.ZodOptional<z.ZodString>; approverRole: z.ZodOptional<z.ZodString>; timeoutPolicy: z.ZodOptional<z.ZodObject<{ timeoutMs: z.ZodNumber; onTimeout: z.ZodOptional<z.ZodEnum<["fail", "retry", "human_review"]>>; }, "strip", z.ZodTypeAny, { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; }, { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; }>>; }, "strip", z.ZodTypeAny, { required: boolean; reason?: string | undefined; approverRole?: string | undefined; timeoutPolicy?: { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; } | undefined; }, { required: boolean; reason?: string | undefined; approverRole?: string | undefined; timeoutPolicy?: { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; } | undefined; }>>; auditPolicy: z.ZodObject<{ enabled: z.ZodBoolean; includeInput: z.ZodOptional<z.ZodBoolean>; includeOutput: z.ZodOptional<z.ZodBoolean>; redactPaths: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { enabled: boolean; includeInput?: boolean | undefined; includeOutput?: boolean | undefined; redactPaths?: string[] | undefined; }, { enabled: boolean; includeInput?: boolean | undefined; includeOutput?: boolean | undefined; redactPaths?: string[] | undefined; }>; tenantIsolation: z.ZodOptional<z.ZodBoolean>; workspaceIsolation: z.ZodOptional<z.ZodBoolean>; allowDelegation: z.ZodOptional<z.ZodBoolean>; maxDelegationDepth: z.ZodOptional<z.ZodNumber>; }, "strip", z.ZodTypeAny, { requiredPermissionScopes: string[]; auditPolicy: { enabled: boolean; includeInput?: boolean | undefined; includeOutput?: boolean | undefined; redactPaths?: string[] | undefined; }; deniedPermissionScopes?: string[] | undefined; allowedPrincipalTypes?: ("user" | "agent" | "service" | "system")[] | undefined; policyRefs?: { id: string; version?: string | undefined; revision?: string | undefined; }[] | undefined; approvalPolicy?: { required: boolean; reason?: string | undefined; approverRole?: string | undefined; timeoutPolicy?: { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; } | undefined; } | undefined; tenantIsolation?: boolean | undefined; workspaceIsolation?: boolean | undefined; allowDelegation?: boolean | undefined; maxDelegationDepth?: number | undefined; }, { requiredPermissionScopes: string[]; auditPolicy: { enabled: boolean; includeInput?: boolean | undefined; includeOutput?: boolean | undefined; redactPaths?: string[] | undefined; }; deniedPermissionScopes?: string[] | undefined; allowedPrincipalTypes?: ("user" | "agent" | "service" | "system")[] | undefined; policyRefs?: { id: string; version?: string | undefined; revision?: string | undefined; }[] | undefined; approvalPolicy?: { required: boolean; reason?: string | undefined; approverRole?: string | undefined; timeoutPolicy?: { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; } | undefined; } | undefined; tenantIsolation?: boolean | undefined; workspaceIsolation?: boolean | undefined; allowDelegation?: boolean | undefined; maxDelegationDepth?: number | undefined; }>;
```

## `toolInvocationScopeSpecSchema`

Runtime schema for Tool Invocation Scope Spec.

- Kind: constant
- Import: `import { toolInvocationScopeSpecSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const toolInvocationScopeSpecSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; stepId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; fsmState: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { runId: string; userId: string; sessionId: string; agentId?: string | undefined; tenantId?: string | undefined; workspaceId?: string | undefined; stepId?: string | undefined; fsmState?: string | undefined; }, { runId: string; userId: string; sessionId: string; agentId?: string | undefined; tenantId?: string | undefined; workspaceId?: string | undefined; stepId?: string | undefined; fsmState?: string | undefined; }>;
```

## `toolObservabilitySpecSchema`

Runtime schema for Tool Observability Spec.

- Kind: constant
- Import: `import { toolObservabilitySpecSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const toolObservabilitySpecSchema: z.ZodObject<{ traceLevel: z.ZodEnum<["none", "metadata", "summary", "full_redacted"]>; recordInput: z.ZodOptional<z.ZodBoolean>; recordOutput: z.ZodOptional<z.ZodBoolean>; recordAttempts: z.ZodOptional<z.ZodBoolean>; recordPolicyDecision: z.ZodOptional<z.ZodBoolean>; metricsEnabled: z.ZodOptional<z.ZodBoolean>; redactionPolicyRef: z.ZodOptional<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; revision?: string | undefined; }, { id: string; version?: string | undefined; revision?: string | undefined; }>>; }, "strip", z.ZodTypeAny, { traceLevel: "metadata" | "none" | "summary" | "full_redacted"; recordInput?: boolean | undefined; recordOutput?: boolean | undefined; recordAttempts?: boolean | undefined; recordPolicyDecision?: boolean | undefined; metricsEnabled?: boolean | undefined; redactionPolicyRef?: { id: string; version?: string | undefined; revision?: string | undefined; } | undefined; }, { traceLevel: "metadata" | "none" | "summary" | "full_redacted"; recordInput?: boolean | undefined; recordOutput?: boolean | undefined; recordAttempts?: boolean | undefined; recordPolicyDecision?: boolean | undefined; metricsEnabled?: boolean | undefined; redactionPolicyRef?: { id: string; version?: string | undefined; revision?: string | undefined; } | undefined; }>;
```

## `toolPrincipalSpecSchema`

Runtime schema for Tool Principal Spec.

- Kind: constant
- Import: `import { toolPrincipalSpecSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const toolPrincipalSpecSchema: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; workspaceId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; delegatedBy: z.ZodOptional<z.ZodString>; delegationDepth: z.ZodOptional<z.ZodNumber>; authenticationContext: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; workspaceId?: string | undefined; roles?: string[] | undefined; delegatedBy?: string | undefined; delegationDepth?: number | undefined; authenticationContext?: Record<string, unknown> | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; workspaceId?: string | undefined; roles?: string[] | undefined; delegatedBy?: string | undefined; delegationDepth?: number | undefined; authenticationContext?: Record<string, unknown> | undefined; }>;
```

## `toolSchemaSpecSchema`

Runtime schema for Tool Schema Spec.

- Kind: constant
- Import: `import { toolSchemaSpecSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const toolSchemaSpecSchema: z.ZodObject<{ jsonSchema: z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>; schemaId: z.ZodOptional<z.ZodString>; schemaVersion: z.ZodOptional<z.ZodString>; schemaHash: z.ZodString; strict: z.ZodOptional<z.ZodBoolean>; allowAdditionalProperties: z.ZodOptional<z.ZodBoolean>; maxSerializedBytes: z.ZodOptional<z.ZodNumber>; sensitivePaths: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; redactedPaths: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { jsonSchema: JsonSchema; schemaHash: string; schemaId?: string | undefined; schemaVersion?: string | undefined; strict?: boolean | undefined; allowAdditionalProperties?: boolean | undefined; maxSerializedBytes?: number | undefined; sensitivePaths?: string[] | undefined; redactedPaths?: string[] | undefined; }, { jsonSchema: JsonSchema; schemaHash: string; schemaId?: string | undefined; schemaVersion?: string | undefined; strict?: boolean | undefined; allowAdditionalProperties?: boolean | undefined; maxSerializedBytes?: number | undefined; sensitivePaths?: string[] | undefined; redactedPaths?: string[] | undefined; }>;
```

## `toolSemanticSpecSchema`

Runtime schema for Tool Semantic Spec.

- Kind: constant
- Import: `import { toolSemanticSpecSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const toolSemanticSpecSchema: z.ZodType<ToolSemanticSpec, z.ZodTypeDef, ToolSemanticSpec>;
```

## `toolSourceRefSchema`

Runtime schema for Tool Source Ref.

- Kind: constant
- Import: `import { toolSourceRefSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare const toolSourceRefSchema: z.ZodObject<{ adapterId: z.ZodOptional<z.ZodString>; handlerId: z.ZodOptional<z.ZodString>; endpointRef: z.ZodOptional<z.ZodString>; mcpServerId: z.ZodOptional<z.ZodString>; mcpCapabilityId: z.ZodOptional<z.ZodString>; mcpCapabilityHash: z.ZodOptional<z.ZodString>; pluginId: z.ZodOptional<z.ZodString>; hostedToolId: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { adapterId?: string | undefined; handlerId?: string | undefined; endpointRef?: string | undefined; mcpServerId?: string | undefined; mcpCapabilityId?: string | undefined; mcpCapabilityHash?: string | undefined; pluginId?: string | undefined; hostedToolId?: string | undefined; metadata?: Record<string, unknown> | undefined; }, { adapterId?: string | undefined; handlerId?: string | undefined; endpointRef?: string | undefined; mcpServerId?: string | undefined; mcpCapabilityId?: string | undefined; mcpCapabilityHash?: string | undefined; pluginId?: string | undefined; hostedToolId?: string | undefined; metadata?: Record<string, unknown> | undefined; }>;
```

## `canonicalJson`

Canonical JSON function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { canonicalJson } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare function canonicalJson(value: unknown): string;
```

### Call signature

```text
canonicalJson(value: unknown): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `createToolCacheValidityKey`

Create Tool Cache Validity Key function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createToolCacheValidityKey } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare function createToolCacheValidityKey(input: ToolCacheValidityInput): string;
```

### Call signature

```text
createToolCacheValidityKey(input: ToolCacheValidityInput): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>ToolCacheValidityInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `createToolSchemaSpec`

Create Tool Schema Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createToolSchemaSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare function createToolSchemaSpec(jsonSchema: JsonSchema, options?: Omit<Partial<ToolSchemaSpec>, 'jsonSchema' | 'schemaHash'>): ToolSchemaSpec;
```

### Call signature

```text
createToolSchemaSpec(jsonSchema: JsonSchema, options?: Omit<Partial<ToolSchemaSpec>, "jsonSchema" | "schemaHash">): ToolSchemaSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `jsonSchema` | <code>JsonSchema</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `options` | <code>Omit&lt;Partial&lt;ToolSchemaSpec&gt;, "jsonSchema" &#124; "schemaHash"&gt;</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ToolSchemaSpec`
- Description: The return contract is defined by the type shown above.

## `hashToolContract`

Hash Tool Contract function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { hashToolContract } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export declare function hashToolContract(value: unknown): string;
```

### Call signature

```text
hashToolContract(value: unknown): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `EffectiveAgentCapabilitySnapshot`

Effective Agent Capability Snapshot interface with 17 public fields or methods.

- Kind: interface
- Import: `import type { EffectiveAgentCapabilitySnapshot } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedExecutionProfiles` | property | <code>allowedExecutionProfiles: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedMCPServerIds` | property | <code>allowedMCPServerIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedToolIds` | property | <code>allowedToolIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainId` | property | <code>domainId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maximumSideEffectLevel` | property | <code>maximumSideEffectLevel: SideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryAccess` | property | <code>memoryAccess: "none" &#124; "read" &#124; "write" &#124; "read_write"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiresHumanReview` | property | <code>requiresHumanReview: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillRevisions` | property | <code>skillRevisions: { id: string; version: string; contentHash: string; }[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotHash` | property | <code>snapshotHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EffectiveCapabilityApproval`

Effective Capability Approval interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { EffectiveCapabilityApproval } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `approvedAt` | property | <code>approvedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `approvedBy` | property | <code>approvedBy: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotId` | property | <code>snapshotId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "approved"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `subjectHash` | property | <code>subjectHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `subjectType` | property | <code>subjectType: "effective_capability_snapshot"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskId` | property | <code>taskId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `GovernedHumanApprovalPolicySpec`

Governed Human Approval Policy Spec interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { GovernedHumanApprovalPolicySpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowParameterEdit` | property | <code>allowParameterEdit?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `approverRoles` | property | <code>approverRoles?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `escalationPolicyRef` | property | <code>escalationPolicyRef?: { id: string; version?: string; revision?: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAfterSeconds` | property | <code>expiresAfterSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `minApprovals` | property | <code>minApprovals?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "policy" &#124; "never" &#124; "always"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredForSideEffects` | property | <code>requiredForSideEffects?: SideEffectLevel[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requireReason` | property | <code>requireReason?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revalidateOnResume` | property | <code>revalidateOnResume?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `GovernedHumanApprovalRequest`

Governed Human Approval Request interface with 19 public fields or methods.

- Kind: interface
- Import: `import type { GovernedHumanApprovalRequest } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `decisions` | property | <code>decisions: HumanApprovalDecisionRecord[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invocationId` | property | <code>invocationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `parameterHash` | property | <code>parameterHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `parameterSummary` | property | <code>parameterSummary?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingActionRef` | property | <code>pendingActionRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyDecisionRef` | property | <code>policyDecisionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ToolPrincipalSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestSummary` | property | <code>requestSummary: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `riskSummary` | property | <code>riskSummary?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ToolInvocationScopeSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "rejected" &#124; "cancelled" &#124; "expired" &#124; "pending" &#124; "approved"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRef` | property | <code>toolRef: { id: string; version?: string; revision?: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `GovernedToolContractSpec`

Governed Tool Contract Spec interface with 22 public fields or methods.

- Kind: interface
- Import: `import type { GovernedToolContractSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cache` | property | <code>cache?: ToolCachePolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deprecated` | property | <code>deprecated?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `displayName` | property | <code>displayName?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `enabled` | property | <code>enabled?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `execution` | property | <code>execution: ToolExecutionPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `governance` | property | <code>governance: ToolGovernanceSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: ToolSchemaSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `instructions` | property | <code>instructions?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observability` | property | <code>observability: ToolObservabilitySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: ToolSchemaSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `replacedBy` | property | <code>replacedBy?: { id: string; version?: string; revision?: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `semantics` | property | <code>semantics: ToolSemanticSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: ToolSource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceRef` | property | <code>sourceRef?: ToolSourceRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `streaming` | property | <code>streaming?: ToolStreamingSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `GovernedToolInvocationRecord`

Governed Tool Invocation Record interface with 35 public fields or methods.

- Kind: interface
- Import: `import type { GovernedToolInvocationRecord } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvalRequestId` | property | <code>approvalRequestId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `completedAt` | property | <code>completedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `currentAttempt` | property | <code>currentAttempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedToolError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `externalReceipt` | property | <code>externalReceipt?: ToolExternalReceipt</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyFingerprint` | property | <code>idempotencyFingerprint?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lateResultState` | property | <code>lateResultState?: "none" &#124; "accepted" &#124; "quarantined" &#124; "pending" &#124; "discarded"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observationRefs` | property | <code>observationRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputHash` | property | <code>outputHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ToolPrincipalSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `queuedAt` | property | <code>queuedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redactedInput` | property | <code>redactedInput?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reusedFromInvocationId` | property | <code>reusedFromInvocationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ToolInvocationScopeSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startedAt` | property | <code>startedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: GovernedToolInvocationStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRef` | property | <code>toolRef: { id: string; version?: string; revision?: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `HumanApprovalDecisionRecord`

Human Approval Decision Record interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { HumanApprovalDecisionRecord } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export interface HumanApprovalDecisionRecord {
    decidedBy: string;
    decision: 'approved' | 'rejected';
    reason?: string;
    decidedAt: string;
    parameterHash: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `decidedAt` | property | <code>decidedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decidedBy` | property | <code>decidedBy: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decision` | property | <code>decision: "rejected" &#124; "approved"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `parameterHash` | property | <code>parameterHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `NormalizedToolError`

Normalized Tool Error interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { NormalizedToolError } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causeRef` | property | <code>causeRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>code: "TOOL_NOT_FOUND" &#124; "TOOL_DISABLED" &#124; "TOOL_SCHEMA_INVALID" &#124; "TOOL_OUTPUT_INVALID" &#124; "TOOL_PERMISSION_DENIED" &#124; "TOOL_POLICY_DENIED" &#124; "TOOL_APPROVAL_REQUIRED" &#124; "TOOL_APPROVAL_REJECTED" &#124; "TOOL_APPROVAL_EXPIRED" &#124; "TOOL_IDEMPOTENCY_CONFLICT" &#124; "TOOL_CONCURRENCY_CONFLICT" &#124; "TOOL_TIMEOUT" &#124; "TOOL_CANCELLED" &#124; "TOOL_ADAPTER_UNAVAILABLE" &#124; "TOOL_RETRY_EXHAUSTED" &#124; "TOOL_LATE_RESULT" &#124; "TOOL_EXECUTION_FAILED" &#124;...</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `details` | property | <code>details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerCode` | property | <code>providerCode?: string &#124; number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryable` | property | <code>retryable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ProviderHealth`

Provider Health interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ProviderHealth } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

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

## `ToolArtifactContract`

Tool Artifact Contract interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ToolArtifactContract } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export interface ToolArtifactContract {
    kind?: string;
    mimeTypes?: string[];
    maxInlineBytes?: number;
    required?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `kind` | property | <code>kind?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxInlineBytes` | property | <code>maxInlineBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mimeTypes` | property | <code>mimeTypes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `required` | property | <code>required?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolCachePolicySpec`

Tool Cache Policy Spec interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ToolCachePolicySpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowForSideEffectLevels` | property | <code>allowForSideEffectLevels?: SideEffectLevel[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includePolicyRevision` | property | <code>includePolicyRevision: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeToolRevision` | property | <code>includeToolRevision: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `keyFields` | property | <code>keyFields?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "disabled" &#124; "result" &#124; "observation_ref"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: "workspace" &#124; "session" &#124; "run" &#124; "tenant"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `staleWhileRevalidateSeconds` | property | <code>staleWhileRevalidateSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlSeconds` | property | <code>ttlSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolCacheValidityInput`

Tool Cache Validity Input interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ToolCacheValidityInput } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityHash` | property | <code>capabilityHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contractSnapshotHash` | property | <code>contractSnapshotHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `externalStateVersion` | property | <code>externalStateVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolCacheValidityRecord`

Tool Cache Validity Record interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { ToolCacheValidityRecord } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export interface ToolCacheValidityRecord extends ToolCacheValidityInput {
    key: string;
    validUntil?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityHash` | property | <code>capabilityHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contractSnapshotHash` | property | <code>contractSnapshotHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `externalStateVersion` | property | <code>externalStateVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validUntil` | property | <code>validUntil?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolCancellationPolicySpec`

Tool Cancellation Policy Spec interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ToolCancellationPolicySpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export interface ToolCancellationPolicySpec {
    mode: 'cooperative' | 'provider' | 'unsupported';
    gracePeriodMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `gracePeriodMs` | property | <code>gracePeriodMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "provider" &#124; "cooperative" &#124; "unsupported"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolConcurrencyPolicySpec`

Tool Concurrency Policy Spec interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ToolConcurrencyPolicySpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export interface ToolConcurrencyPolicySpec {
    maxConcurrent?: number;
    keyFields?: string[];
    queueWhenBusy?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `keyFields` | property | <code>keyFields?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxConcurrent` | property | <code>maxConcurrent?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `queueWhenBusy` | property | <code>queueWhenBusy?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolContractSnapshot`

Tool Contract Snapshot interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ToolContractSnapshot } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `catalogRevision` | property | <code>catalogRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `effectiveCapabilities` | property | <code>effectiveCapabilities?: EffectiveAgentCapabilitySnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotHash` | property | <code>snapshotHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolContracts` | property | <code>toolContracts: ToolContractSnapshotItem[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolContractSnapshotItem`

Tool Contract Snapshot Item interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ToolContractSnapshotItem } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adapterRef` | property | <code>adapterRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputSchemaHash` | property | <code>inputSchemaHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputSchemaHash` | property | <code>outputSchemaHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceCapabilityHash` | property | <code>sourceCapabilityHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolVersion` | property | <code>toolVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolContractSnapshotStore`

Tool Contract Snapshot Store interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ToolContractSnapshotStore } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export interface ToolContractSnapshotStore {
    get(snapshotId: string): Promise<ToolContractSnapshot | null>;
    save(snapshot: ToolContractSnapshot): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(snapshotId: string): Promise&lt;ToolContractSnapshot &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `save` | method | <code>save(snapshot: ToolContractSnapshot): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ToolEventPayloadBase`

Tool Event Payload Base interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { ToolEventPayloadBase } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedToolError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invocationId` | property | <code>invocationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `latencyMs` | property | <code>latencyMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputHash` | property | <code>outputHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevel` | property | <code>sideEffectLevel?: SideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRevision` | property | <code>toolRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolVersion` | property | <code>toolVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolExecutionContextSpec`

Tool Execution Context Spec interface with 21 public fields or methods.

- Kind: interface
- Import: `import type { ToolExecutionContextSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal?: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityApprovals` | property | <code>capabilityApprovals?: EffectiveCapabilityApproval[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilitySnapshotRef` | property | <code>capabilitySnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmState` | property | <code>fsmState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invocationId` | property | <code>invocationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `parentEventId` | property | <code>parentEventId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ToolPrincipalSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolExecutionPolicySpec`

Tool Execution Policy Spec interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ToolExecutionPolicySpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancellation` | property | <code>cancellation?: ToolCancellationPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `concurrency` | property | <code>concurrency?: ToolConcurrencyPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentRef` | property | <code>environmentRef?: { id: string; version?: string; revision?: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lateResult` | property | <code>lateResult?: ToolLateResultPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputLimit` | property | <code>outputLimit?: ToolOutputLimitSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retry` | property | <code>retry: RetryPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeout` | property | <code>timeout: TimeoutPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolExternalReceipt`

Tool External Receipt interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ToolExternalReceipt } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export interface ToolExternalReceipt {
    provider?: string;
    receiptId: string;
    status?: string;
    committedAt?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `committedAt` | property | <code>committedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `receiptId` | property | <code>receiptId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolGovernanceSpec`

Tool Governance Spec interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { ToolGovernanceSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowDelegation` | property | <code>allowDelegation?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedPrincipalTypes` | property | <code>allowedPrincipalTypes?: ("system" &#124; "agent" &#124; "user" &#124; "service")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `approvalPolicy` | property | <code>approvalPolicy?: HumanReviewPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `auditPolicy` | property | <code>auditPolicy: { enabled: boolean; includeInput?: boolean; includeOutput?: boolean; redactPaths?: string[]; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deniedPermissionScopes` | property | <code>deniedPermissionScopes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxDelegationDepth` | property | <code>maxDelegationDepth?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs?: { id: string; version?: string; revision?: string; }[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredPermissionScopes` | property | <code>requiredPermissionScopes: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantIsolation` | property | <code>tenantIsolation?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceIsolation` | property | <code>workspaceIsolation?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolInvocationScopeSpec`

Tool Invocation Scope Spec interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ToolInvocationScopeSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmState` | property | <code>fsmState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolLateResultPolicySpec`

Tool Late Result Policy Spec interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ToolLateResultPolicySpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mode` | property | <code>mode: "reconcile" &#124; "quarantine" &#124; "discard" &#124; "accept"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconciliationToolRef` | property | <code>reconciliationToolRef?: { id: string; version?: string; revision?: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolObservabilitySpec`

Tool Observability Spec interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ToolObservabilitySpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `metricsEnabled` | property | <code>metricsEnabled?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordAttempts` | property | <code>recordAttempts?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordInput` | property | <code>recordInput?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordOutput` | property | <code>recordOutput?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordPolicyDecision` | property | <code>recordPolicyDecision?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redactionPolicyRef` | property | <code>redactionPolicyRef?: { id: string; version?: string; revision?: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceLevel` | property | <code>traceLevel: "none" &#124; "metadata" &#124; "summary" &#124; "full_redacted"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolOutputLimitSpec`

Tool Output Limit Spec interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ToolOutputLimitSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export interface ToolOutputLimitSpec {
    maxInlineBytes: number;
    overflow: 'fail' | 'truncate' | 'artifact';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxInlineBytes` | property | <code>maxInlineBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `overflow` | property | <code>overflow: "fail" &#124; "artifact" &#124; "truncate"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolPrincipalSpec`

Tool Principal Spec interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { ToolPrincipalSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `authenticationContext` | property | <code>authenticationContext?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `delegatedBy` | property | <code>delegatedBy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `delegationDepth` | property | <code>delegationDepth?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `permissionScopes` | property | <code>permissionScopes: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `roles` | property | <code>roles?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolSchemaSpec`

Tool Schema Spec interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { ToolSchemaSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowAdditionalProperties` | property | <code>allowAdditionalProperties?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `jsonSchema` | property | <code>jsonSchema: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxSerializedBytes` | property | <code>maxSerializedBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redactedPaths` | property | <code>redactedPaths?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaHash` | property | <code>schemaHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaId` | property | <code>schemaId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaVersion` | property | <code>schemaVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sensitivePaths` | property | <code>sensitivePaths?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `strict` | property | <code>strict?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolSemanticSpec`

Tool Semantic Spec interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { ToolSemanticSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `destructiveHint` | property | <code>destructiveHint?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deterministic` | property | <code>deterministic?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedArtifacts` | property | <code>expectedArtifacts?: ToolArtifactContract[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotency` | property | <code>idempotency: "none" &#124; "caller_key" &#124; "derived_key" &#124; "provider_key" &#124; "intrinsic"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `openWorldHint` | property | <code>openWorldHint?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `postconditions` | property | <code>postconditions?: PolicyRuleSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preconditions` | property | <code>preconditions?: PolicyRuleSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `readOnlyHint` | property | <code>readOnlyHint?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resultSemantics` | property | <code>resultSemantics?: "artifact" &#124; "observation" &#124; "state_patch" &#124; "external_receipt"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolSourceRef`

Tool Source Ref interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { ToolSourceRef } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adapterId` | property | <code>adapterId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `endpointRef` | property | <code>endpointRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `handlerId` | property | <code>handlerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hostedToolId` | property | <code>hostedToolId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mcpCapabilityHash` | property | <code>mcpCapabilityHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mcpCapabilityId` | property | <code>mcpCapabilityId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mcpServerId` | property | <code>mcpServerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pluginId` | property | <code>pluginId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolStreamingSpec`

Tool Streaming Spec interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ToolStreamingSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export interface ToolStreamingSpec {
    enabled: boolean;
    supportsProgress?: boolean;
    supportsStructuredContent?: boolean;
    maxUpdates?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `enabled` | property | <code>enabled: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxUpdates` | property | <code>maxUpdates?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `supportsProgress` | property | <code>supportsProgress?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `supportsStructuredContent` | property | <code>supportsStructuredContent?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `GovernedToolInvocationStatus`

Public type alias for Governed Tool Invocation Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { GovernedToolInvocationStatus } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export type GovernedToolInvocationStatus = 'created' | 'validating' | 'validated' | 'denied' | 'waiting_approval' | 'approved' | 'rejected' | 'queued' | 'running' | 'cancelling' | 'cancelled' | 'completed' | 'failed' | 'timed_out' | 'expired' | 'conflict';
```

## `ToolSource`

Public type alias for Tool Source; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ToolSource } from '@codesoul-co/hypha-tools';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts)

### Declaration

```text
export type ToolSource = 'local' | 'mcp' | 'http' | 'plugin' | 'hosted' | 'execution' | 'custom';
```
