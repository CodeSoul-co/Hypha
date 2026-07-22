import { createHash } from 'crypto';
import { z, type ZodType } from 'zod';
import {
  defineSpecSchema,
  exportSpecJsonSchemas,
  humanReviewPolicySpecSchema,
  jsonSchemaSchema,
  retryPolicySpecSchema,
  sideEffectLevelSchema,
  timeoutPolicySpecSchema,
  type HumanReviewPolicySpec,
  type JsonSchema,
  type PolicyRuleSpec,
  type RetryPolicySpec,
  type SideEffectLevel,
  type TimeoutPolicySpec,
} from '@hypha/core';

export type ToolSource = 'local' | 'mcp' | 'http' | 'plugin' | 'hosted' | 'execution' | 'custom';

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

export interface ToolArtifactContract {
  kind?: string;
  mimeTypes?: string[];
  maxInlineBytes?: number;
  required?: boolean;
}

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

export interface ToolCancellationPolicySpec {
  mode: 'cooperative' | 'provider' | 'unsupported';
  gracePeriodMs?: number;
}

export interface ToolConcurrencyPolicySpec {
  maxConcurrent?: number;
  keyFields?: string[];
  queueWhenBusy?: boolean;
}

export interface ToolLateResultPolicySpec {
  mode: 'discard' | 'accept' | 'quarantine' | 'reconcile';
  reconciliationToolRef?: { id: string; version?: string; revision?: string };
}

export interface ToolOutputLimitSpec {
  maxInlineBytes: number;
  overflow: 'fail' | 'truncate' | 'artifact';
}

export interface ToolExecutionPolicySpec {
  timeout: TimeoutPolicySpec;
  retry: RetryPolicySpec;
  cancellation?: ToolCancellationPolicySpec;
  concurrency?: ToolConcurrencyPolicySpec;
  lateResult?: ToolLateResultPolicySpec;
  outputLimit?: ToolOutputLimitSpec;
  environmentRef?: { id: string; version?: string; revision?: string };
}

export interface ToolGovernanceSpec {
  requiredPermissionScopes: string[];
  deniedPermissionScopes?: string[];
  allowedPrincipalTypes?: Array<'user' | 'agent' | 'service' | 'system'>;
  policyRefs?: Array<{ id: string; version?: string; revision?: string }>;
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

export interface ToolObservabilitySpec {
  traceLevel: 'none' | 'metadata' | 'summary' | 'full_redacted';
  recordInput?: boolean;
  recordOutput?: boolean;
  recordAttempts?: boolean;
  recordPolicyDecision?: boolean;
  metricsEnabled?: boolean;
  redactionPolicyRef?: { id: string; version?: string; revision?: string };
}

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

export interface ToolStreamingSpec {
  enabled: boolean;
  supportsProgress?: boolean;
  supportsStructuredContent?: boolean;
  maxUpdates?: number;
}

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
  replacedBy?: { id: string; version?: string; revision?: string };
  metadata?: Record<string, unknown>;
}

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

export interface EffectiveAgentCapabilitySnapshot {
  id: string;
  runId: string;
  agentId: string;
  principalId: string;
  tenantId?: string;
  domainId?: string;
  createdAt: string;
  expiresAt?: string;
  skillRevisions: Array<{ id: string; version: string; contentHash: string }>;
  allowedToolIds: string[];
  allowedMCPServerIds: string[];
  memoryAccess: 'none' | 'read' | 'write' | 'read_write';
  allowedExecutionProfiles: string[];
  maximumSideEffectLevel: SideEffectLevel;
  requiresHumanReview: boolean;
  policyRefs: string[];
  snapshotHash: string;
}

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

export interface ToolContractSnapshotStore {
  get(snapshotId: string): Promise<ToolContractSnapshot | null>;
  save(snapshot: ToolContractSnapshot): Promise<void>;
}

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

export interface ToolCacheValidityRecord extends ToolCacheValidityInput {
  key: string;
  validUntil?: string;
}

export function createToolCacheValidityKey(input: ToolCacheValidityInput): string {
  return hashToolContract(input);
}

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
  deadlineAt?: string;
  abortSignal?: AbortSignal;
  metadata?: Record<string, unknown>;
}

export type GovernedToolInvocationStatus =
  | 'created'
  | 'validating'
  | 'validated'
  | 'denied'
  | 'waiting_approval'
  | 'approved'
  | 'rejected'
  | 'queued'
  | 'running'
  | 'cancelling'
  | 'cancelled'
  | 'completed'
  | 'failed'
  | 'timed_out'
  | 'expired'
  | 'conflict';

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

export interface ToolExternalReceipt {
  provider?: string;
  receiptId: string;
  status?: string;
  committedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface GovernedToolInvocationRecord {
  id: string;
  revision: number;
  operationId: string;
  toolRef: { id: string; version?: string; revision?: string };
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

export interface GovernedHumanApprovalPolicySpec {
  mode: 'never' | 'policy' | 'always';
  requiredForSideEffects?: SideEffectLevel[];
  approverRoles?: string[];
  minApprovals?: number;
  expiresAfterSeconds?: number;
  allowParameterEdit?: boolean;
  requireReason?: boolean;
  revalidateOnResume?: boolean;
  escalationPolicyRef?: { id: string; version?: string; revision?: string };
}

export interface HumanApprovalDecisionRecord {
  decidedBy: string;
  decision: 'approved' | 'rejected';
  reason?: string;
  decidedAt: string;
  parameterHash: string;
}

export interface GovernedHumanApprovalRequest {
  id: string;
  revision: number;
  invocationId: string;
  toolRef: { id: string; version?: string; revision?: string };
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

export interface NormalizedToolError {
  code:
    | 'TOOL_NOT_FOUND'
    | 'TOOL_DISABLED'
    | 'TOOL_SCHEMA_INVALID'
    | 'TOOL_OUTPUT_INVALID'
    | 'TOOL_PERMISSION_DENIED'
    | 'TOOL_POLICY_DENIED'
    | 'TOOL_APPROVAL_REQUIRED'
    | 'TOOL_APPROVAL_REJECTED'
    | 'TOOL_APPROVAL_EXPIRED'
    | 'TOOL_IDEMPOTENCY_CONFLICT'
    | 'TOOL_CONCURRENCY_CONFLICT'
    | 'TOOL_TIMEOUT'
    | 'TOOL_CANCELLED'
    | 'TOOL_ADAPTER_UNAVAILABLE'
    | 'TOOL_RETRY_EXHAUSTED'
    | 'TOOL_LATE_RESULT'
    | 'TOOL_EXECUTION_FAILED'
    | 'TOOL_INTERNAL_ERROR';
  message: string;
  retryable: boolean;
  attempt?: number;
  providerCode?: string | number;
  details?: Record<string, unknown>;
  causeRef?: string;
}

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

export interface ProviderHealth {
  status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
  checkedAt: string;
  latencyMs?: number;
  message?: string;
  details?: Record<string, unknown>;
}

export const providerHealthSchema = z.object({
  status: z.enum(['healthy', 'degraded', 'unhealthy', 'unknown']),
  checkedAt: z.string().min(1),
  latencyMs: z.number().nonnegative().optional(),
  message: z.string().optional(),
  details: z.record(z.unknown()).optional(),
}) satisfies ZodType<ProviderHealth>;

const specRefSchema = z.object({
  id: z.string().min(1),
  version: z.string().min(1).optional(),
  revision: z.string().min(1).optional(),
});

export const toolSchemaSpecSchema = z.object({
  jsonSchema: jsonSchemaSchema,
  schemaId: z.string().optional(),
  schemaVersion: z.string().optional(),
  schemaHash: z.string().min(1),
  strict: z.boolean().optional(),
  allowAdditionalProperties: z.boolean().optional(),
  maxSerializedBytes: z.number().int().positive().optional(),
  sensitivePaths: z.array(z.string()).optional(),
  redactedPaths: z.array(z.string()).optional(),
}) satisfies ZodType<ToolSchemaSpec>;

export const toolSourceRefSchema = z.object({
  adapterId: z.string().optional(),
  handlerId: z.string().optional(),
  endpointRef: z.string().optional(),
  mcpServerId: z.string().optional(),
  mcpCapabilityId: z.string().optional(),
  mcpCapabilityHash: z.string().optional(),
  pluginId: z.string().optional(),
  hostedToolId: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<ToolSourceRef>;

const toolArtifactContractSchema = z.object({
  kind: z.string().optional(),
  mimeTypes: z.array(z.string()).optional(),
  maxInlineBytes: z.number().int().positive().optional(),
  required: z.boolean().optional(),
});

export const toolSemanticSpecSchema = z.object({
  sideEffectLevel: sideEffectLevelSchema,
  idempotency: z.enum(['none', 'caller_key', 'derived_key', 'provider_key', 'intrinsic']),
  deterministic: z.boolean().optional(),
  readOnlyHint: z.boolean().optional(),
  destructiveHint: z.boolean().optional(),
  openWorldHint: z.boolean().optional(),
  preconditions: z.array(z.unknown()).optional(),
  postconditions: z.array(z.unknown()).optional(),
  expectedArtifacts: z.array(toolArtifactContractSchema).optional(),
  resultSemantics: z
    .enum(['observation', 'artifact', 'state_patch', 'external_receipt'])
    .optional(),
}) as ZodType<ToolSemanticSpec>;

export const toolExecutionPolicySpecSchema = z.object({
  timeout: timeoutPolicySpecSchema,
  retry: retryPolicySpecSchema,
  cancellation: z
    .object({
      mode: z.enum(['cooperative', 'provider', 'unsupported']),
      gracePeriodMs: z.number().int().nonnegative().optional(),
    })
    .optional(),
  concurrency: z
    .object({
      maxConcurrent: z.number().int().positive().optional(),
      keyFields: z.array(z.string()).optional(),
      queueWhenBusy: z.boolean().optional(),
    })
    .optional(),
  lateResult: z
    .object({
      mode: z.enum(['discard', 'accept', 'quarantine', 'reconcile']),
      reconciliationToolRef: specRefSchema.optional(),
    })
    .optional(),
  outputLimit: z
    .object({
      maxInlineBytes: z.number().int().positive(),
      overflow: z.enum(['fail', 'truncate', 'artifact']),
    })
    .optional(),
  environmentRef: specRefSchema.optional(),
}) satisfies ZodType<ToolExecutionPolicySpec>;

export const toolGovernanceSpecSchema = z.object({
  requiredPermissionScopes: z.array(z.string()),
  deniedPermissionScopes: z.array(z.string()).optional(),
  allowedPrincipalTypes: z.array(z.enum(['user', 'agent', 'service', 'system'])).optional(),
  policyRefs: z.array(specRefSchema).optional(),
  approvalPolicy: humanReviewPolicySpecSchema.optional(),
  auditPolicy: z.object({
    enabled: z.boolean(),
    includeInput: z.boolean().optional(),
    includeOutput: z.boolean().optional(),
    redactPaths: z.array(z.string()).optional(),
  }),
  tenantIsolation: z.boolean().optional(),
  workspaceIsolation: z.boolean().optional(),
  allowDelegation: z.boolean().optional(),
  maxDelegationDepth: z.number().int().nonnegative().optional(),
}) satisfies ZodType<ToolGovernanceSpec>;

export const toolObservabilitySpecSchema = z.object({
  traceLevel: z.enum(['none', 'metadata', 'summary', 'full_redacted']),
  recordInput: z.boolean().optional(),
  recordOutput: z.boolean().optional(),
  recordAttempts: z.boolean().optional(),
  recordPolicyDecision: z.boolean().optional(),
  metricsEnabled: z.boolean().optional(),
  redactionPolicyRef: specRefSchema.optional(),
}) satisfies ZodType<ToolObservabilitySpec>;

export const toolCachePolicySpecSchema = z.object({
  mode: z.enum(['disabled', 'result', 'observation_ref']),
  ttlSeconds: z.number().int().positive().optional(),
  scope: z.enum(['run', 'session', 'workspace', 'tenant']),
  keyFields: z.array(z.string()).optional(),
  includeToolRevision: z.boolean(),
  includePolicyRevision: z.boolean(),
  allowForSideEffectLevels: z.array(sideEffectLevelSchema).optional(),
  staleWhileRevalidateSeconds: z.number().int().nonnegative().optional(),
}) satisfies ZodType<ToolCachePolicySpec>;

export const governedToolContractSpecSchema = z.object({
  id: z.string().min(1),
  version: z.string().min(1),
  revision: z.string().min(1),
  name: z.string().min(1),
  displayName: z.string().optional(),
  description: z.string().min(1),
  instructions: z.string().optional(),
  tags: z.array(z.string()).optional(),
  input: toolSchemaSpecSchema,
  output: toolSchemaSpecSchema.optional(),
  source: z.enum(['local', 'mcp', 'http', 'plugin', 'hosted', 'execution', 'custom']),
  sourceRef: toolSourceRefSchema.optional(),
  semantics: toolSemanticSpecSchema,
  execution: toolExecutionPolicySpecSchema,
  governance: toolGovernanceSpecSchema,
  observability: toolObservabilitySpecSchema,
  cache: toolCachePolicySpecSchema.optional(),
  streaming: z
    .object({
      enabled: z.boolean(),
      supportsProgress: z.boolean().optional(),
      supportsStructuredContent: z.boolean().optional(),
      maxUpdates: z.number().int().positive().optional(),
    })
    .optional(),
  enabled: z.boolean().optional(),
  deprecated: z.boolean().optional(),
  replacedBy: specRefSchema.optional(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<GovernedToolContractSpec>;

export const toolContractSnapshotItemSchema = z.object({
  toolId: z.string().min(1),
  toolVersion: z.string().min(1),
  toolRevision: z.string().min(1),
  inputSchemaHash: z.string().min(1),
  outputSchemaHash: z.string().min(1).optional(),
  sourceCapabilityHash: z.string().min(1).optional(),
  sideEffectLevel: sideEffectLevelSchema,
  adapterRef: z.string().min(1),
}) satisfies ZodType<ToolContractSnapshotItem>;

export const effectiveAgentCapabilitySnapshotSchema = z.object({
  id: z.string().min(1),
  runId: z.string().min(1),
  agentId: z.string().min(1),
  principalId: z.string().min(1),
  tenantId: z.string().min(1).optional(),
  domainId: z.string().min(1).optional(),
  createdAt: z.string().min(1),
  expiresAt: z.string().min(1).optional(),
  skillRevisions: z.array(
    z.object({
      id: z.string().min(1),
      version: z.string().min(1),
      contentHash: z.string().regex(/^[a-f0-9]{64}$/u),
    })
  ),
  allowedToolIds: z.array(z.string().min(1)),
  allowedMCPServerIds: z.array(z.string().min(1)),
  memoryAccess: z.enum(['none', 'read', 'write', 'read_write']),
  allowedExecutionProfiles: z.array(z.string().min(1)),
  maximumSideEffectLevel: sideEffectLevelSchema,
  requiresHumanReview: z.boolean(),
  policyRefs: z.array(z.string().min(1)),
  snapshotHash: z.string().min(1),
}) satisfies ZodType<EffectiveAgentCapabilitySnapshot>;

export const toolContractSnapshotSchema = z.object({
  id: z.string().min(1),
  runId: z.string().min(1),
  createdAt: z.string().min(1),
  toolContracts: z.array(toolContractSnapshotItemSchema),
  catalogRevision: z.string().optional(),
  policyRevision: z.string().optional(),
  effectiveCapabilities: effectiveAgentCapabilitySnapshotSchema.optional(),
  snapshotHash: z.string().min(1),
}) satisfies ZodType<ToolContractSnapshot>;

export const toolPrincipalSpecSchema = z.object({
  principalId: z.string().min(1),
  type: z.enum(['user', 'agent', 'service', 'system']),
  tenantId: z.string().optional(),
  userId: z.string().optional(),
  workspaceId: z.string().optional(),
  agentId: z.string().optional(),
  roles: z.array(z.string()).optional(),
  permissionScopes: z.array(z.string()),
  delegatedBy: z.string().optional(),
  delegationDepth: z.number().int().nonnegative().optional(),
  authenticationContext: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<ToolPrincipalSpec>;

export const toolExecutionContextSpecSchema = z.object({
  principal: toolPrincipalSpecSchema,
  tenantId: z.string().optional(),
  userId: z.string().min(1),
  workspaceId: z.string().optional(),
  sessionId: z.string().min(1),
  runId: z.string().min(1),
  stepId: z.string().optional(),
  agentId: z.string().optional(),
  fsmState: z.string().optional(),
  invocationId: z.string().min(1),
  operationId: z.string().min(1),
  idempotencyKey: z.string().optional(),
  correlationId: z.string().optional(),
  causationId: z.string().optional(),
  parentEventId: z.string().optional(),
  contractSnapshotRef: z.string().optional(),
  capabilitySnapshotRef: z.string().optional(),
  deadlineAt: z.string().optional(),
  abortSignal: z.custom<AbortSignal>().optional(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<ToolExecutionContextSpec>;

export const governedToolInvocationStatusSchema = z.enum([
  'created',
  'validating',
  'validated',
  'denied',
  'waiting_approval',
  'approved',
  'rejected',
  'queued',
  'running',
  'cancelling',
  'cancelled',
  'completed',
  'failed',
  'timed_out',
  'expired',
  'conflict',
]);

export const toolInvocationScopeSpecSchema = z.object({
  tenantId: z.string().optional(),
  userId: z.string().min(1),
  workspaceId: z.string().optional(),
  sessionId: z.string().min(1),
  runId: z.string().min(1),
  stepId: z.string().optional(),
  agentId: z.string().optional(),
  fsmState: z.string().optional(),
}) satisfies ZodType<ToolInvocationScopeSpec>;

export const normalizedToolErrorSchema = z.object({
  code: z.enum([
    'TOOL_NOT_FOUND',
    'TOOL_DISABLED',
    'TOOL_SCHEMA_INVALID',
    'TOOL_OUTPUT_INVALID',
    'TOOL_PERMISSION_DENIED',
    'TOOL_POLICY_DENIED',
    'TOOL_APPROVAL_REQUIRED',
    'TOOL_APPROVAL_REJECTED',
    'TOOL_APPROVAL_EXPIRED',
    'TOOL_IDEMPOTENCY_CONFLICT',
    'TOOL_CONCURRENCY_CONFLICT',
    'TOOL_TIMEOUT',
    'TOOL_CANCELLED',
    'TOOL_ADAPTER_UNAVAILABLE',
    'TOOL_RETRY_EXHAUSTED',
    'TOOL_LATE_RESULT',
    'TOOL_EXECUTION_FAILED',
    'TOOL_INTERNAL_ERROR',
  ]),
  message: z.string(),
  retryable: z.boolean(),
  attempt: z.number().int().positive().optional(),
  providerCode: z.union([z.string(), z.number()]).optional(),
  details: z.record(z.unknown()).optional(),
  causeRef: z.string().optional(),
}) satisfies ZodType<NormalizedToolError>;

export const toolEventPayloadBaseSchema = z.object({
  invocationId: z.string().optional(),
  operationId: z.string().optional(),
  toolId: z.string().optional(),
  toolVersion: z.string().optional(),
  toolRevision: z.string().optional(),
  contractSnapshotRef: z.string().optional(),
  scopeHash: z.string().optional(),
  principalId: z.string().optional(),
  sideEffectLevel: sideEffectLevelSchema.optional(),
  attempt: z.number().int().positive().optional(),
  latencyMs: z.number().nonnegative().optional(),
  inputHash: z.string().optional(),
  outputHash: z.string().optional(),
  error: normalizedToolErrorSchema.optional(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<ToolEventPayloadBase>;

export const governedToolInvocationRecordSchema = z.object({
  id: z.string().min(1),
  revision: z.number().int().nonnegative(),
  operationId: z.string().min(1),
  toolRef: specRefSchema,
  toolRevision: z.string().min(1),
  contractSnapshotRef: z.string().optional(),
  principal: toolPrincipalSpecSchema,
  scope: toolInvocationScopeSpecSchema,
  input: z.unknown().optional(),
  inputHash: z.string().min(1),
  redactedInput: z.unknown().optional(),
  status: governedToolInvocationStatusSchema,
  sideEffectLevel: sideEffectLevelSchema,
  idempotencyKey: z.string().optional(),
  idempotencyFingerprint: z.string().optional(),
  reusedFromInvocationId: z.string().optional(),
  approvalRequestId: z.string().optional(),
  currentAttempt: z.number().int().nonnegative(),
  maxAttempts: z.number().int().positive(),
  queuedAt: z.string().optional(),
  startedAt: z.string().optional(),
  deadlineAt: z.string().optional(),
  completedAt: z.string().optional(),
  output: z.unknown().optional(),
  outputHash: z.string().optional(),
  artifactRefs: z.array(z.string()).optional(),
  observationRefs: z.array(z.string()).optional(),
  externalReceipt: z
    .object({
      provider: z.string().optional(),
      receiptId: z.string().min(1),
      status: z.string().optional(),
      committedAt: z.string().optional(),
      metadata: z.record(z.unknown()).optional(),
    })
    .optional(),
  error: normalizedToolErrorSchema.optional(),
  lateResultState: z.enum(['none', 'pending', 'accepted', 'discarded', 'quarantined']).optional(),
  correlationId: z.string().optional(),
  causationId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<GovernedToolInvocationRecord>;

export const governedHumanApprovalPolicySpecSchema = z.object({
  mode: z.enum(['never', 'policy', 'always']),
  requiredForSideEffects: z.array(sideEffectLevelSchema).optional(),
  approverRoles: z.array(z.string()).optional(),
  minApprovals: z.number().int().positive().optional(),
  expiresAfterSeconds: z.number().int().positive().optional(),
  allowParameterEdit: z.boolean().optional(),
  requireReason: z.boolean().optional(),
  revalidateOnResume: z.boolean().optional(),
  escalationPolicyRef: specRefSchema.optional(),
}) satisfies ZodType<GovernedHumanApprovalPolicySpec>;

export const governedHumanApprovalRequestSchema = z.object({
  id: z.string().min(1),
  revision: z.number().int().nonnegative(),
  invocationId: z.string().min(1),
  toolRef: specRefSchema,
  toolRevision: z.string().min(1),
  scope: toolInvocationScopeSpecSchema,
  principal: toolPrincipalSpecSchema,
  requestSummary: z.string().min(1),
  parameterSummary: z.unknown().optional(),
  parameterHash: z.string().min(1),
  riskSummary: z.string().optional(),
  sideEffectLevel: sideEffectLevelSchema,
  policyDecisionRef: z.string().optional(),
  requestedAt: z.string(),
  expiresAt: z.string().optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'expired', 'cancelled']),
  decisions: z.array(
    z.object({
      decidedBy: z.string().min(1),
      decision: z.enum(['approved', 'rejected']),
      reason: z.string().optional(),
      decidedAt: z.string(),
      parameterHash: z.string(),
    })
  ),
  pendingActionRef: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<GovernedHumanApprovalRequest>;

export const governedToolContractExample: GovernedToolContractSpec = {
  id: 'tool.search',
  version: '1.0.0',
  revision: 'sha256:search-v1',
  name: 'search',
  displayName: 'Search',
  description: 'Search an approved external index.',
  input: {
    jsonSchema: {
      type: 'object',
      required: ['query'],
      additionalProperties: false,
      properties: { query: { type: 'string' } },
    },
    schemaHash: 'sha256:search-input-v1',
    strict: true,
    maxSerializedBytes: 16_384,
  },
  source: 'http',
  sourceRef: { adapterId: 'http.default', endpointRef: 'search.api' },
  semantics: {
    sideEffectLevel: 'read',
    idempotency: 'intrinsic',
    deterministic: false,
    resultSemantics: 'observation',
  },
  execution: {
    timeout: { timeoutMs: 5000, onTimeout: 'fail' },
    retry: { maxAttempts: 2, retryableCodes: ['HTTP_429', 'HTTP_503'] },
    cancellation: { mode: 'cooperative', gracePeriodMs: 500 },
    outputLimit: { maxInlineBytes: 65_536, overflow: 'artifact' },
  },
  governance: {
    requiredPermissionScopes: ['network.http.get'],
    auditPolicy: { enabled: true, includeInput: true, includeOutput: true },
    tenantIsolation: true,
  },
  observability: {
    traceLevel: 'summary',
    recordAttempts: true,
    recordPolicyDecision: true,
    metricsEnabled: true,
  },
  cache: {
    mode: 'result',
    scope: 'run',
    includeToolRevision: true,
    includePolicyRevision: true,
    allowForSideEffectLevels: ['none', 'read'],
  },
  enabled: true,
};

export const governedToolContractJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'version',
    'revision',
    'name',
    'description',
    'input',
    'source',
    'semantics',
    'execution',
    'governance',
    'observability',
  ],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    revision: { type: 'string' },
    name: { type: 'string' },
    displayName: { type: 'string' },
    description: { type: 'string' },
    instructions: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' } },
    input: { type: 'object' },
    output: { type: 'object' },
    source: { enum: ['local', 'mcp', 'http', 'plugin', 'hosted', 'execution', 'custom'] },
    sourceRef: { type: 'object' },
    semantics: { type: 'object' },
    execution: { type: 'object' },
    governance: { type: 'object' },
    observability: { type: 'object' },
    cache: { type: 'object' },
    streaming: { type: 'object' },
    enabled: { type: 'boolean' },
    deprecated: { type: 'boolean' },
    replacedBy: { type: 'object' },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const toolContractSnapshotExample: ToolContractSnapshot = {
  id: 'tool-snapshot:run-example',
  runId: 'run-example',
  createdAt: '2026-07-16T00:00:00.000Z',
  catalogRevision: '12',
  policyRevision: 'policy-v1',
  effectiveCapabilities: {
    id: 'capability-snapshot:run-example',
    runId: 'run-example',
    agentId: 'agent-example',
    principalId: 'user-example',
    createdAt: '2026-07-16T00:00:00.000Z',
    skillRevisions: [],
    allowedToolIds: ['tool.search'],
    allowedMCPServerIds: [],
    memoryAccess: 'read',
    allowedExecutionProfiles: [],
    maximumSideEffectLevel: 'read',
    requiresHumanReview: false,
    policyRefs: ['policy-v1'],
    snapshotHash: 'sha256:capability-example',
  },
  snapshotHash: 'sha256:snapshot-example',
  toolContracts: [
    {
      toolId: 'tool.search',
      toolVersion: '1.0.0',
      toolRevision: 'sha256:search-v1',
      inputSchemaHash: 'sha256:search-input-v1',
      sideEffectLevel: 'read',
      adapterRef: 'http.default',
    },
  ],
};

export const toolContractSnapshotJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'runId', 'createdAt', 'toolContracts', 'snapshotHash'],
  properties: {
    id: { type: 'string' },
    runId: { type: 'string' },
    createdAt: { type: 'string' },
    catalogRevision: { type: 'string' },
    policyRevision: { type: 'string' },
    effectiveCapabilities: {
      type: 'object',
      required: [
        'id',
        'runId',
        'agentId',
        'principalId',
        'createdAt',
        'skillRevisions',
        'allowedToolIds',
        'allowedMCPServerIds',
        'memoryAccess',
        'allowedExecutionProfiles',
        'maximumSideEffectLevel',
        'requiresHumanReview',
        'policyRefs',
        'snapshotHash',
      ],
      properties: {
        id: { type: 'string' },
        runId: { type: 'string' },
        agentId: { type: 'string' },
        principalId: { type: 'string' },
        tenantId: { type: 'string' },
        domainId: { type: 'string' },
        createdAt: { type: 'string' },
        expiresAt: { type: 'string' },
        skillRevisions: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'version', 'contentHash'],
            properties: {
              id: { type: 'string' },
              version: { type: 'string' },
              contentHash: { type: 'string', pattern: '^[a-f0-9]{64}$' },
            },
            additionalProperties: false,
          },
        },
        allowedToolIds: { type: 'array', items: { type: 'string' } },
        allowedMCPServerIds: { type: 'array', items: { type: 'string' } },
        memoryAccess: { enum: ['none', 'read', 'write', 'read_write'] },
        allowedExecutionProfiles: { type: 'array', items: { type: 'string' } },
        maximumSideEffectLevel: {
          enum: ['none', 'read', 'write', 'external_effect', 'irreversible'],
        },
        requiresHumanReview: { type: 'boolean' },
        policyRefs: { type: 'array', items: { type: 'string' } },
        snapshotHash: { type: 'string' },
      },
      additionalProperties: false,
    },
    snapshotHash: { type: 'string' },
    toolContracts: {
      type: 'array',
      items: {
        type: 'object',
        required: [
          'toolId',
          'toolVersion',
          'toolRevision',
          'inputSchemaHash',
          'sideEffectLevel',
          'adapterRef',
        ],
        properties: {
          toolId: { type: 'string' },
          toolVersion: { type: 'string' },
          toolRevision: { type: 'string' },
          inputSchemaHash: { type: 'string' },
          outputSchemaHash: { type: 'string' },
          sourceCapabilityHash: { type: 'string' },
          sideEffectLevel: { enum: ['none', 'read', 'write', 'external_effect', 'irreversible'] },
          adapterRef: { type: 'string' },
        },
        additionalProperties: false,
      },
    },
  },
  additionalProperties: false,
};

const examplePrincipal: ToolPrincipalSpec = {
  principalId: 'user:owner',
  type: 'user',
  userId: 'owner',
  permissionScopes: ['tool.search'],
};

const exampleScope: ToolInvocationScopeSpec = {
  userId: 'owner',
  sessionId: 'session-example',
  runId: 'run-example',
  stepId: 'step-search',
};

export const governedToolInvocationExample: GovernedToolInvocationRecord = {
  id: 'invocation-example',
  revision: 0,
  operationId: 'operation-example',
  toolRef: { id: 'tool.search', version: '1.0.0', revision: 'sha256:search-v1' },
  toolRevision: 'sha256:search-v1',
  contractSnapshotRef: toolContractSnapshotExample.id,
  principal: examplePrincipal,
  scope: exampleScope,
  input: { query: 'hypha' },
  inputHash: 'sha256:input-example',
  status: 'created',
  sideEffectLevel: 'read',
  currentAttempt: 0,
  maxAttempts: 2,
  createdAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-07-16T00:00:00.000Z',
};

export const governedToolInvocationJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'revision',
    'operationId',
    'toolRef',
    'toolRevision',
    'principal',
    'scope',
    'inputHash',
    'status',
    'sideEffectLevel',
    'currentAttempt',
    'maxAttempts',
    'createdAt',
    'updatedAt',
  ],
  properties: {
    id: { type: 'string' },
    revision: { type: 'integer', minimum: 0 },
    operationId: { type: 'string' },
    toolRef: { type: 'object' },
    toolRevision: { type: 'string' },
    contractSnapshotRef: { type: 'string' },
    principal: { type: 'object' },
    scope: { type: 'object' },
    input: {},
    inputHash: { type: 'string' },
    redactedInput: {},
    status: { enum: governedToolInvocationStatusSchema.options },
    sideEffectLevel: { enum: ['none', 'read', 'write', 'external_effect', 'irreversible'] },
    idempotencyKey: { type: 'string' },
    idempotencyFingerprint: { type: 'string' },
    reusedFromInvocationId: { type: 'string' },
    approvalRequestId: { type: 'string' },
    currentAttempt: { type: 'integer', minimum: 0 },
    maxAttempts: { type: 'integer', minimum: 1 },
    queuedAt: { type: 'string' },
    startedAt: { type: 'string' },
    deadlineAt: { type: 'string' },
    completedAt: { type: 'string' },
    output: {},
    outputHash: { type: 'string' },
    artifactRefs: { type: 'array', items: { type: 'string' } },
    observationRefs: { type: 'array', items: { type: 'string' } },
    externalReceipt: { type: 'object' },
    error: { type: 'object' },
    lateResultState: { enum: ['none', 'pending', 'accepted', 'discarded', 'quarantined'] },
    correlationId: { type: 'string' },
    causationId: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const governedHumanApprovalExample: GovernedHumanApprovalRequest = {
  id: 'approval-example',
  revision: 0,
  invocationId: governedToolInvocationExample.id,
  toolRef: governedToolInvocationExample.toolRef,
  toolRevision: governedToolInvocationExample.toolRevision,
  scope: exampleScope,
  principal: examplePrincipal,
  requestSummary: 'Approve the external Tool operation.',
  parameterHash: governedToolInvocationExample.inputHash,
  sideEffectLevel: 'external_effect',
  requestedAt: '2026-07-16T00:00:00.000Z',
  status: 'pending',
  decisions: [],
  pendingActionRef: governedToolInvocationExample.id,
};

export const governedHumanApprovalJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'revision',
    'invocationId',
    'toolRef',
    'toolRevision',
    'scope',
    'principal',
    'requestSummary',
    'parameterHash',
    'sideEffectLevel',
    'requestedAt',
    'status',
    'decisions',
    'pendingActionRef',
  ],
  properties: {
    id: { type: 'string' },
    revision: { type: 'integer', minimum: 0 },
    invocationId: { type: 'string' },
    toolRef: { type: 'object' },
    toolRevision: { type: 'string' },
    scope: { type: 'object' },
    principal: { type: 'object' },
    requestSummary: { type: 'string' },
    parameterSummary: {},
    parameterHash: { type: 'string' },
    riskSummary: { type: 'string' },
    sideEffectLevel: { enum: ['none', 'read', 'write', 'external_effect', 'irreversible'] },
    policyDecisionRef: { type: 'string' },
    requestedAt: { type: 'string' },
    expiresAt: { type: 'string' },
    status: { enum: ['pending', 'approved', 'rejected', 'expired', 'cancelled'] },
    decisions: { type: 'array', items: { type: 'object' } },
    pendingActionRef: { type: 'string' },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const toolEventPayloadBaseExample: ToolEventPayloadBase = {
  invocationId: governedToolInvocationExample.id,
  operationId: governedToolInvocationExample.operationId,
  toolId: governedToolInvocationExample.toolRef.id,
  toolVersion: governedToolInvocationExample.toolRef.version,
  toolRevision: governedToolInvocationExample.toolRevision,
  contractSnapshotRef: governedToolInvocationExample.contractSnapshotRef,
  principalId: governedToolInvocationExample.principal.principalId,
  sideEffectLevel: governedToolInvocationExample.sideEffectLevel,
  attempt: 1,
  latencyMs: 24,
  inputHash: governedToolInvocationExample.inputHash,
  outputHash: 'sha256:output-example',
};

export const toolEventPayloadBaseJsonSchema: JsonSchema = {
  type: 'object',
  properties: {
    invocationId: { type: 'string' },
    operationId: { type: 'string' },
    toolId: { type: 'string' },
    toolVersion: { type: 'string' },
    toolRevision: { type: 'string' },
    contractSnapshotRef: { type: 'string' },
    scopeHash: { type: 'string' },
    principalId: { type: 'string' },
    sideEffectLevel: { enum: ['none', 'read', 'write', 'external_effect', 'irreversible'] },
    attempt: { type: 'integer', minimum: 1 },
    latencyMs: { type: 'number', minimum: 0 },
    inputHash: { type: 'string' },
    outputHash: { type: 'string' },
    error: { type: 'object' },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const governedToolContractDefinition = defineSpecSchema<GovernedToolContractSpec>({
  id: 'GovernedToolContractSpec',
  zod: governedToolContractSpecSchema,
  jsonSchema: governedToolContractJsonSchema,
  example: governedToolContractExample,
});

export const toolContractSnapshotDefinition = defineSpecSchema<ToolContractSnapshot>({
  id: 'ToolContractSnapshot',
  zod: toolContractSnapshotSchema,
  jsonSchema: toolContractSnapshotJsonSchema,
  example: toolContractSnapshotExample,
});

export const governedToolInvocationDefinition = defineSpecSchema<GovernedToolInvocationRecord>({
  id: 'GovernedToolInvocationRecord',
  zod: governedToolInvocationRecordSchema,
  jsonSchema: governedToolInvocationJsonSchema,
  example: governedToolInvocationExample,
});

export const governedHumanApprovalDefinition = defineSpecSchema<GovernedHumanApprovalRequest>({
  id: 'GovernedHumanApprovalRequest',
  zod: governedHumanApprovalRequestSchema,
  jsonSchema: governedHumanApprovalJsonSchema,
  example: governedHumanApprovalExample,
});

export const toolEventPayloadBaseDefinition = defineSpecSchema<ToolEventPayloadBase>({
  id: 'ToolEventPayloadBase',
  zod: toolEventPayloadBaseSchema,
  jsonSchema: toolEventPayloadBaseJsonSchema,
  example: toolEventPayloadBaseExample,
});

export const governedToolContractJsonSchemas = exportSpecJsonSchemas([
  governedToolContractDefinition,
  toolContractSnapshotDefinition,
  governedToolInvocationDefinition,
  governedHumanApprovalDefinition,
  toolEventPayloadBaseDefinition,
]);

export function hashToolContract(value: unknown): string {
  return `sha256:${createHash('sha256').update(canonicalJson(value)).digest('hex')}`;
}

export function createToolSchemaSpec(
  jsonSchema: JsonSchema,
  options: Omit<Partial<ToolSchemaSpec>, 'jsonSchema' | 'schemaHash'> = {}
): ToolSchemaSpec {
  return {
    jsonSchema,
    schemaHash: hashToolContract(jsonSchema),
    ...options,
  };
}

export function canonicalJson(value: unknown): string {
  if (value === undefined) return 'null';
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.entries(value as Record<string, unknown>)
      .filter(([, entry]) => entry !== undefined)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => `${JSON.stringify(key)}:${canonicalJson(entry)}`)
      .join(',')}}`;
  }
  return JSON.stringify(value) ?? 'null';
}
