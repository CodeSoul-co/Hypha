import { createHash } from 'crypto';
import { z, type ZodType } from 'zod';
import {
  createFrameworkEvent,
  auditPolicySpecSchema,
  defineSpecSchema,
  denyExternalEffectsPolicyEngine,
  exportSpecJsonSchemas,
  FrameworkError,
  humanReviewPolicySpecSchema,
  jsonSchemaSchema,
  retryPolicySpecSchema,
  sideEffectLevelSchema,
  specRefSchema,
  timeoutPolicySpecSchema,
  type AuditPolicySpec,
  type FrameworkEventType,
  type HumanReviewPolicySpec,
  type JsonSchema,
  type PolicyEngine,
  type PolicyDecision,
  type RetryPolicySpec,
  type SideEffectLevel,
  type SpecRef,
  type TimeoutPolicySpec,
  type TelemetryMetricKind,
  type TelemetryRecorder,
  type TraceRecorder,
  type VersionedSpec,
} from '@hypha/core';
import {
  createToolSchemaSpec,
  createToolCacheValidityKey,
  hashToolContract,
  toolCachePolicySpecSchema,
  toolExecutionPolicySpecSchema,
  toolGovernanceSpecSchema,
  toolObservabilitySpecSchema,
  toolSchemaSpecSchema,
  toolSemanticSpecSchema,
  type GovernedToolContractSpec,
  type ToolCachePolicySpec,
  type ToolCacheValidityRecord,
  type ToolExecutionPolicySpec,
  type ToolExternalReceipt,
  type ToolGovernanceSpec,
  type ToolObservabilitySpec,
  type ProviderHealth,
  type ToolSchemaSpec,
  type ToolContractSnapshot,
  type ToolContractSnapshotStore,
  type EffectiveAgentCapabilitySnapshot,
  type ToolSemanticSpec,
  type ToolSource,
  type ToolSourceRef,
  type ToolStreamingSpec,
} from './contracts';

export * from './contracts';
export * from './common-tools';
export * from './common-tool-ports';
export * from './common-tool-catalog';
export * from './media';
export * from './workspace';
export * from './adapter-factory';
export * from './execution-adapter';

class ToolTimeoutError extends Error {
  readonly code = 'TOOL_TIMEOUT';

  constructor(timeoutMs: number) {
    super(`Tool execution timed out after ${timeoutMs}ms.`);
    this.name = 'ToolTimeoutError';
  }
}

export interface ToolSpec {
  id: string;
  version: string;
  revision?: string;
  name?: string;
  displayName?: string;
  description: string;
  instructions?: string;
  tags?: string[];
  inputSchema: JsonSchema;
  outputSchema?: JsonSchema;
  input?: ToolSchemaSpec;
  output?: ToolSchemaSpec;
  sideEffectLevel: SideEffectLevel;
  permissionScope?: string[];
  preconditions?: string[];
  postconditions?: string[];
  timeoutPolicy?: TimeoutPolicySpec;
  retryPolicy?: RetryPolicySpec;
  auditPolicy?: AuditPolicySpec;
  humanApprovalPolicy?: HumanReviewPolicySpec;
  idempotencyPolicy?: {
    mode: 'none' | 'optional' | 'required';
  };
  source?: ToolSource;
  sourceRef?: {
    serverId?: string;
    capabilityId?: string;
    capabilityHash?: string;
    trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
    declarationSource?: 'framework' | 'user' | 'server' | 'unknown';
  } & ToolSourceRef;
  semantics?: ToolSemanticSpec;
  execution?: ToolExecutionPolicySpec;
  governance?: ToolGovernanceSpec;
  observability?: ToolObservabilitySpec;
  cache?: ToolCachePolicySpec;
  streaming?: ToolStreamingSpec;
  enabled?: boolean;
  deprecated?: boolean;
  replacedBy?: { id: string; version?: string; revision?: string };
  metadata?: Record<string, unknown>;
}

export type ResolvedToolSpec = ToolSpec & GovernedToolContractSpec;

export interface ToolCallContext {
  runId: string;
  stepId: string;
  invocationId?: string;
  userId?: string;
  tenantId?: string;
  workspaceId?: string;
  sessionId?: string;
  agentId?: string;
  fsmState?: string;
  idempotencyKey?: string;
  operationId?: string;
  correlationId?: string;
  causationId?: string;
  parentEventId?: string;
  contractSnapshotRef?: string;
  capabilitySnapshotRef?: string;
  deadlineAt?: string;
  signal?: AbortSignal;
  abortSignal?: AbortSignal;
  reportProgress?: (update: ToolProgressUpdate) => void | Promise<void>;
  executionScope?: ToolExecutionScope;
  principal?: ToolPrincipal;
  metadata?: Record<string, unknown>;
}

export interface ToolExecutionScope {
  allowedToolIds?: readonly string[];
  policyRefs?: readonly string[];
  fsmState?: string;
}

export interface ToolPrincipal {
  id: string;
  principalId?: string;
  type: 'user' | 'agent' | 'service' | 'system';
  permissionScopes: readonly string[];
  tenantId?: string;
  userId?: string;
  workspaceId?: string;
  agentId?: string;
  roles?: readonly string[];
  delegatedBy?: string;
  delegationDepth?: number;
  authenticationContext?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface ToolAuthorizationInput {
  tool: ToolSpec;
  request: ToolCallRequest;
  principal?: ToolPrincipal;
  executionScope?: ToolExecutionScope;
}

export interface ToolAuthorizationDecision {
  allowed: boolean;
  reason?: string;
  missingPermissionScopes?: string[];
}

export interface ToolAuthorizer {
  authorize(input: ToolAuthorizationInput): Promise<ToolAuthorizationDecision>;
}

export class PermissionScopeToolAuthorizer implements ToolAuthorizer {
  async authorize(input: ToolAuthorizationInput): Promise<ToolAuthorizationDecision> {
    const required =
      input.tool.governance?.requiredPermissionScopes ?? input.tool.permissionScope ?? [];
    if (required.length === 0) return { allowed: true };
    const granted = new Set(input.principal?.permissionScopes ?? []);
    const missingPermissionScopes = required.filter(
      (scope) => !granted.has('*') && !granted.has(scope)
    );
    return missingPermissionScopes.length === 0
      ? { allowed: true }
      : {
          allowed: false,
          reason: input.principal
            ? 'Tool principal is missing required permission scopes.'
            : 'Tool requires an authenticated principal.',
          missingPermissionScopes,
        };
  }
}

export class AllowAllToolAuthorizer implements ToolAuthorizer {
  async authorize(): Promise<ToolAuthorizationDecision> {
    return { allowed: true };
  }
}

export interface ToolCallRequest<TInput = unknown> {
  toolId: string;
  input: TInput;
  context: ToolCallContext;
}

export interface ToolCallResult<TOutput = unknown> {
  toolId: string;
  invocationId?: string;
  output?: TOutput;
  error?: ToolCallError | string;
  approvalRequest?: ToolApprovalRequest;
  attempts?: number;
  durationMs?: number;
  content?: ToolResultContent[];
  artifactRefs?: string[];
  observationRefs?: string[];
  externalReceipt?: ToolExternalReceipt;
  status: 'completed' | 'failed' | 'denied' | 'human_review_required' | 'cancelled' | 'conflict';
}

export interface ToolProgressUpdate {
  message?: string;
  current?: number;
  total?: number;
  percentage?: number;
  stage?: string;
  metadata?: Record<string, unknown>;
}

export type ToolResultContent =
  | { type: 'text'; text: string }
  | { type: 'json'; value: unknown }
  | { type: 'image'; artifactRef?: string; url?: string; mimeType?: string; alt?: string }
  | { type: 'resource'; uri: string; mimeType?: string; title?: string }
  | { type: 'artifact'; artifactRef: string; title?: string; mimeType?: string };

export interface ToolExecutionEnvelope<TOutput = unknown> {
  kind: 'tool_execution_envelope';
  output?: TOutput;
  content?: ToolResultContent[];
  artifactRefs?: string[];
  observationRefs?: string[];
  externalReceipt?: ToolExternalReceipt;
  metadata?: Record<string, unknown>;
}

export interface ToolArtifactPort {
  store(request: {
    invocationId: string;
    toolId: string;
    value: unknown;
    mimeType?: string;
    metadata?: Record<string, unknown>;
  }): Promise<string>;
}

export interface ToolReceiptReconciliation {
  state: 'committed' | 'not_committed' | 'unknown';
  receipt?: ToolExternalReceipt;
  details?: Record<string, unknown>;
}

export interface ToolReceiptReconciler {
  reconcile(request: {
    invocationId: string;
    tool: ResolvedToolSpec;
    call: ToolCallRequest;
    attempt: number;
  }): Promise<ToolReceiptReconciliation>;
}

export interface ToolResultCacheEntry {
  schemaVersion: '1.0';
  keyVersion: '1';
  validity: ToolCacheValidityRecord;
  result: ToolCachedResultProjection;
  createdAt: string;
}

/** Only stable, replay-safe output fields may cross invocation boundaries. */
export interface ToolCachedResultProjection {
  output?: unknown;
  content?: ToolResultContent[];
  artifactRefs?: string[];
}

export interface ToolResultCache {
  get(key: string): Promise<ToolResultCacheEntry | null>;
  set(entry: ToolResultCacheEntry): Promise<void>;
  delete?(key: string): Promise<void>;
}

export interface ToolResultCacheArtifactVerifier {
  verify(request: {
    toolId: string;
    artifactRefs: readonly string[];
    tenantId?: string;
    userId?: string;
    workspaceId?: string;
  }): Promise<boolean>;
}

export const toolCacheValidityRecordSchema = z
  .object({
    toolId: z.string().min(1).max(512),
    toolRevision: z.string().min(1).max(512),
    inputHash: z.string().min(1).max(512),
    scopeHash: z.string().min(1).max(512),
    policyRevision: z.string().min(1).max(512),
    contractSnapshotHash: z.string().min(1).max(512).optional(),
    capabilityHash: z.string().min(1).max(512).optional(),
    externalStateVersion: z.string().min(1).max(512).optional(),
    key: z.string().min(1).max(512),
    validUntil: z.string().datetime().optional(),
  })
  .strict() satisfies ZodType<ToolCacheValidityRecord>;

const toolResultContentSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('text'), text: z.string().max(1024 * 1024) }).strict(),
  z
    .object({
      type: z.literal('json'),
      value: z.custom<unknown>((value) => value !== undefined, 'JSON content value is required.'),
    })
    .strict(),
  z
    .object({
      type: z.literal('image'),
      artifactRef: z.string().min(1).max(4096).optional(),
      url: z.string().min(1).max(16_384).optional(),
      mimeType: z.string().min(1).max(512).optional(),
      alt: z.string().max(4096).optional(),
    })
    .strict(),
  z
    .object({
      type: z.literal('resource'),
      uri: z.string().min(1).max(16_384),
      mimeType: z.string().min(1).max(512).optional(),
      title: z.string().max(4096).optional(),
    })
    .strict(),
  z
    .object({
      type: z.literal('artifact'),
      artifactRef: z.string().min(1).max(4096),
      title: z.string().max(4096).optional(),
      mimeType: z.string().min(1).max(512).optional(),
    })
    .strict(),
]) as unknown as ZodType<ToolResultContent>;

export const toolResultCacheEntrySchema = z
  .object({
    schemaVersion: z.literal('1.0'),
    keyVersion: z.literal('1'),
    validity: toolCacheValidityRecordSchema,
    result: z
      .object({
        output: z.unknown().optional(),
        content: z.array(toolResultContentSchema).max(1_000).optional(),
        artifactRefs: z.array(z.string().min(1).max(4096)).max(1_000).optional(),
      })
      .strict(),
    createdAt: z.string().datetime(),
  })
  .strict() satisfies ZodType<ToolResultCacheEntry>;

export const toolResultCacheEntryJsonSchema: JsonSchema = {
  type: 'object',
  required: ['schemaVersion', 'keyVersion', 'validity', 'result', 'createdAt'],
  properties: {
    schemaVersion: { const: '1.0' },
    keyVersion: { const: '1' },
    validity: {
      type: 'object',
      required: ['toolId', 'toolRevision', 'inputHash', 'scopeHash', 'policyRevision', 'key'],
      properties: {
        toolId: { type: 'string', maxLength: 512 },
        toolRevision: { type: 'string', maxLength: 512 },
        inputHash: { type: 'string', maxLength: 512 },
        scopeHash: { type: 'string', maxLength: 512 },
        policyRevision: { type: 'string', maxLength: 512 },
        contractSnapshotHash: { type: 'string', maxLength: 512 },
        capabilityHash: { type: 'string', maxLength: 512 },
        externalStateVersion: { type: 'string', maxLength: 512 },
        key: { type: 'string', maxLength: 512 },
        validUntil: { type: 'string', format: 'date-time' },
      },
      additionalProperties: false,
    },
    result: {
      type: 'object',
      properties: {
        output: {},
        content: {
          type: 'array',
          maxItems: 1000,
          items: {
            oneOf: [
              {
                type: 'object',
                required: ['type', 'text'],
                properties: {
                  type: { const: 'text' },
                  text: { type: 'string', maxLength: 1048576 },
                },
                additionalProperties: false,
              },
              {
                type: 'object',
                required: ['type', 'value'],
                properties: { type: { const: 'json' }, value: {} },
                additionalProperties: false,
              },
              {
                type: 'object',
                required: ['type'],
                properties: {
                  type: { const: 'image' },
                  artifactRef: { type: 'string', maxLength: 4096 },
                  url: { type: 'string', maxLength: 16384 },
                  mimeType: { type: 'string', maxLength: 512 },
                  alt: { type: 'string', maxLength: 4096 },
                },
                additionalProperties: false,
              },
              {
                type: 'object',
                required: ['type', 'uri'],
                properties: {
                  type: { const: 'resource' },
                  uri: { type: 'string', maxLength: 16384 },
                  mimeType: { type: 'string', maxLength: 512 },
                  title: { type: 'string', maxLength: 4096 },
                },
                additionalProperties: false,
              },
              {
                type: 'object',
                required: ['type', 'artifactRef'],
                properties: {
                  type: { const: 'artifact' },
                  artifactRef: { type: 'string', maxLength: 4096 },
                  title: { type: 'string', maxLength: 4096 },
                  mimeType: { type: 'string', maxLength: 512 },
                },
                additionalProperties: false,
              },
            ],
          },
        },
        artifactRefs: {
          type: 'array',
          maxItems: 1000,
          items: { type: 'string', maxLength: 4096 },
        },
      },
      additionalProperties: false,
    },
    createdAt: { type: 'string', format: 'date-time' },
  },
  additionalProperties: false,
};

export interface InMemoryToolResultCacheOptions {
  maxEntries?: number;
  maxEntryBytes?: number;
}

export class ToolResultCacheEntryTooLargeError extends Error {
  readonly code = 'TOOL_RESULT_CACHE_ENTRY_TOO_LARGE';

  constructor(
    readonly actualBytes: number,
    readonly maxEntryBytes: number
  ) {
    super(`Tool result cache entry is ${actualBytes} bytes; limit is ${maxEntryBytes} bytes.`);
    this.name = 'ToolResultCacheEntryTooLargeError';
  }
}

export class ToolResultCacheOperationTimeoutError extends Error {
  readonly code = 'TOOL_RESULT_CACHE_TIMEOUT';

  constructor(
    readonly operation: 'get' | 'set' | 'delete' | 'verify',
    readonly timeoutMs: number
  ) {
    super(`Tool result cache ${operation} timed out after ${timeoutMs}ms.`);
    this.name = 'ToolResultCacheOperationTimeoutError';
  }
}

export class ToolResultCacheValidationError extends Error {
  readonly code = 'TOOL_RESULT_CACHE_CORRUPT';

  constructor(message: string) {
    super(message);
    this.name = 'ToolResultCacheValidationError';
  }
}

export interface RedisLikeToolResultCacheClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, mode?: 'PX', durationMilliseconds?: number): Promise<unknown>;
  del(...keys: string[]): Promise<number>;
}

export interface RedisToolResultCacheOptions {
  client: RedisLikeToolResultCacheClient;
  namespace?: string;
  maxEntryBytes?: number;
  defaultTtlMs?: number;
  now?: () => string;
}

/** Shared Redis-compatible Store for local, self-hosted, and managed Redis deployments. */
export class RedisToolResultCache implements ToolResultCache {
  private readonly namespace: string;
  private readonly maxEntryBytes: number;
  private readonly defaultTtlMs: number;
  private readonly now: () => string;

  constructor(private readonly options: RedisToolResultCacheOptions) {
    this.namespace = (options.namespace ?? 'hypha:tool-result-cache:v1').replace(/:+$/, '');
    this.maxEntryBytes = Math.max(1, options.maxEntryBytes ?? 1024 * 1024);
    this.defaultTtlMs = Math.max(1, options.defaultTtlMs ?? 24 * 60 * 60 * 1000);
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async get(key: string): Promise<ToolResultCacheEntry | null> {
    const physicalKey = this.physicalKey(key);
    const raw = await this.options.client.get(physicalKey);
    if (raw === null) return null;
    try {
      if (Buffer.byteLength(raw, 'utf8') > this.maxEntryBytes) {
        throw new ToolResultCacheValidationError('Tool result cache entry exceeds its read limit.');
      }
      const entry = validateToolResultCacheEntry(JSON.parse(raw), this.maxEntryBytes);
      if (entry.validity.key !== key) {
        throw new ToolResultCacheValidationError(
          'Tool result cache physical key does not match the logical validity key.'
        );
      }
      return entry;
    } catch {
      await this.options.client.del(physicalKey).catch(() => 0);
      return null;
    }
  }

  async set(entry: ToolResultCacheEntry): Promise<void> {
    const validated = validateToolResultCacheEntry(entry, this.maxEntryBytes);
    const serialized = JSON.stringify(validated);
    const validUntil = validated.validity.validUntil
      ? Date.parse(validated.validity.validUntil)
      : undefined;
    if (validUntil !== undefined) {
      const ttlMs = validUntil - Date.parse(this.now());
      if (ttlMs <= 0) {
        await this.delete(validated.validity.key);
        return;
      }
      await this.options.client.set(
        this.physicalKey(validated.validity.key),
        serialized,
        'PX',
        ttlMs
      );
      return;
    }
    await this.options.client.set(
      this.physicalKey(validated.validity.key),
      serialized,
      'PX',
      this.defaultTtlMs
    );
  }

  async delete(key: string): Promise<void> {
    await this.options.client.del(this.physicalKey(key));
  }

  private physicalKey(key: string): string {
    return `${this.namespace}:${key}`;
  }
}

export interface ToolObservationPort {
  record(request: {
    invocationId: string;
    toolId: string;
    toolRevision: string;
    runId: string;
    stepId: string;
    inputHash: string;
    outputHash: string;
    value: unknown;
    artifactRefs?: string[];
    provenance: Record<string, unknown>;
  }): Promise<string>;
}

export class InMemoryToolResultCache implements ToolResultCache {
  private readonly entries = new Map<string, ToolResultCacheEntry>();
  private readonly maxEntries: number;
  private readonly maxEntryBytes: number;

  constructor(options: InMemoryToolResultCacheOptions = {}) {
    this.maxEntries = Math.max(1, options.maxEntries ?? 1_000);
    this.maxEntryBytes = Math.max(1, options.maxEntryBytes ?? 1024 * 1024);
  }

  async get(key: string): Promise<ToolResultCacheEntry | null> {
    const entry = this.entries.get(key);
    if (!entry) return null;
    let validated: ToolResultCacheEntry;
    try {
      validated = validateToolResultCacheEntry(entry, this.maxEntryBytes);
      if (validated.validity.key !== key) throw new ToolResultCacheValidationError('Key mismatch.');
    } catch {
      this.entries.delete(key);
      return null;
    }
    this.entries.delete(key);
    this.entries.set(key, validated);
    return cloneToolCacheValue(validated);
  }

  async set(entry: ToolResultCacheEntry): Promise<void> {
    const validated = validateToolResultCacheEntry(entry, this.maxEntryBytes);
    const serialized = JSON.stringify(validated);
    const actualBytes = Buffer.byteLength(serialized, 'utf8');
    if (actualBytes > this.maxEntryBytes) {
      throw new ToolResultCacheEntryTooLargeError(actualBytes, this.maxEntryBytes);
    }
    const copy = cloneToolCacheValue(validated);
    this.entries.delete(validated.validity.key);
    this.entries.set(validated.validity.key, copy);
    while (this.entries.size > this.maxEntries) {
      const oldestKey = this.entries.keys().next().value as string | undefined;
      if (!oldestKey) break;
      this.entries.delete(oldestKey);
    }
  }

  async delete(key: string): Promise<void> {
    this.entries.delete(key);
  }

  size(): number {
    return this.entries.size;
  }
}

export interface ToolTargetResolution {
  toolId: string;
  input: unknown;
  metadata?: Record<string, unknown>;
}

export interface ToolTargetResolver {
  resolve(request: ToolCallRequest, registry: ToolRegistry): Promise<ToolTargetResolution>;
}

export interface ToolMiddlewareContext {
  invocationId: string;
  request: ToolCallRequest;
  originalRequest: ToolCallRequest;
  spec: ResolvedToolSpec;
  attempt?: number;
}

export interface ToolMiddleware {
  id: string;
  beforeAuthorization?(context: ToolMiddlewareContext): Promise<void> | void;
  beforeExecution?(context: ToolMiddlewareContext): Promise<void> | void;
  afterExecution?(
    context: ToolMiddlewareContext,
    result: ToolExecutionEnvelope
  ): Promise<ToolExecutionEnvelope | void> | ToolExecutionEnvelope | void;
  onError?(context: ToolMiddlewareContext, error: unknown): Promise<void> | void;
}

export type ToolExecutionPhase =
  | 'resolution'
  | 'authorization'
  | 'input_validation'
  | 'policy'
  | 'approval'
  | 'execution'
  | 'timeout'
  | 'output_validation';

export interface ToolCallError {
  code: string;
  message: string;
  phase: ToolExecutionPhase;
  retryable?: boolean;
  details?: Record<string, unknown>;
}

export interface ToolApprovalRequest {
  id: string;
  invocationId: string;
  toolId: string;
  toolRevision?: string;
  contractSnapshotRef?: string;
  principalId?: string;
  policyDecisionRef?: string;
  inputHash: string;
  runId: string;
  stepId: string;
  userId?: string;
  reason?: string;
  requestedAt: string;
  expiresAt?: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired' | 'cancelled';
}

export interface ToolApprovalGrant {
  requestId: string;
  invocationId: string;
  toolId: string;
  inputHash: string;
  toolRevision?: string;
  contractSnapshotRef?: string;
  principalId?: string;
  policyDecisionRef?: string;
  approvedBy: string;
  approvedAt: string;
  expiresAt?: string;
}

export interface ToolApprovalStore {
  getRequest(invocationId: string): Promise<ToolApprovalRequest | null>;
  requestApproval(request: ToolApprovalRequest): Promise<ToolApprovalRequest>;
  getGrant(invocationId: string): Promise<ToolApprovalGrant | null>;
  approve(
    invocationId: string,
    approvedBy: string,
    options?: { approvedAt?: string; expiresAt?: string }
  ): Promise<ToolApprovalGrant>;
  reject(invocationId: string): Promise<ToolApprovalRequest>;
}

export class InMemoryToolApprovalStore implements ToolApprovalStore {
  private readonly requests = new Map<string, ToolApprovalRequest>();
  private readonly grants = new Map<string, ToolApprovalGrant>();

  async getRequest(invocationId: string): Promise<ToolApprovalRequest | null> {
    return this.requests.get(invocationId) ?? null;
  }

  async requestApproval(request: ToolApprovalRequest): Promise<ToolApprovalRequest> {
    const existing = this.requests.get(request.invocationId);
    if (existing) return existing;
    this.requests.set(request.invocationId, request);
    return request;
  }

  async getGrant(invocationId: string): Promise<ToolApprovalGrant | null> {
    return this.grants.get(invocationId) ?? null;
  }

  async approve(
    invocationId: string,
    approvedBy: string,
    options: { approvedAt?: string; expiresAt?: string } = {}
  ): Promise<ToolApprovalGrant> {
    const request = this.requests.get(invocationId);
    if (!request) throw new Error('Tool approval request not found: ' + invocationId);
    if (request.status !== 'pending') {
      throw new Error(
        'Tool approval request is already resolved as ' + request.status + ': ' + invocationId
      );
    }
    const approvedAt = options.approvedAt ?? new Date().toISOString();
    if (request.expiresAt && Date.parse(request.expiresAt) <= Date.parse(approvedAt)) {
      this.requests.set(invocationId, { ...request, status: 'expired' });
      throw new Error('Tool approval request has expired: ' + invocationId);
    }
    const grant: ToolApprovalGrant = {
      requestId: request.id,
      invocationId,
      toolId: request.toolId,
      inputHash: request.inputHash,
      toolRevision: request.toolRevision,
      contractSnapshotRef: request.contractSnapshotRef,
      principalId: request.principalId,
      policyDecisionRef: request.policyDecisionRef,
      approvedBy,
      approvedAt,
      expiresAt: options.expiresAt,
    };
    this.requests.set(invocationId, { ...request, status: 'approved' });
    this.grants.set(invocationId, grant);
    return grant;
  }

  async reject(invocationId: string): Promise<ToolApprovalRequest> {
    const request = this.requests.get(invocationId);
    if (!request) throw new Error('Tool approval request not found: ' + invocationId);
    if (request.status !== 'pending') {
      throw new Error(
        'Tool approval request is already resolved as ' + request.status + ': ' + invocationId
      );
    }
    const rejected = { ...request, status: 'rejected' as const };
    this.requests.set(invocationId, rejected);
    this.grants.delete(invocationId);
    return rejected;
  }
}

export const TOOL_INVOCATION_STATUSES = [
  'created',
  'validating',
  'validated',
  'policy_checked',
  'waiting_approval',
  'approved',
  'rejected',
  'queued',
  'running',
  'cancelling',
  'completed',
  'failed',
  'timed_out',
  'expired',
  'conflict',
  'denied',
  'cancelled',
] as const;

export type ToolInvocationStatus = (typeof TOOL_INVOCATION_STATUSES)[number];

export interface ToolInvocationRecord {
  id: string;
  operationId?: string;
  toolId: string;
  toolVersion?: string;
  toolRevision?: string;
  contractSnapshotRef?: string;
  principal?: ToolPrincipal;
  scope?: {
    tenantId?: string;
    userId?: string;
    workspaceId?: string;
    sessionId?: string;
    runId: string;
    stepId?: string;
    agentId?: string;
    fsmState?: string;
  };
  status: ToolInvocationStatus;
  inputHash: string;
  redactedInput?: unknown;
  sideEffectLevel?: SideEffectLevel;
  idempotencyKey?: string;
  idempotencyFingerprint?: string;
  reusedFromInvocationId?: string;
  request: ToolCallRequest;
  executionCycle: number;
  attemptCount: number;
  revision: number;
  result?: ToolCallResult;
  approvalRequest?: ToolApprovalRequest;
  approvalRequestId?: string;
  maxAttempts?: number;
  queuedAt?: string;
  deadlineAt?: string;
  outputHash?: string;
  artifactRefs?: string[];
  observationRefs?: string[];
  externalReceipt?: {
    provider?: string;
    receiptId: string;
    status?: string;
    metadata?: Record<string, unknown>;
  };
  lateResultState?: 'none' | 'pending' | 'accepted' | 'discarded' | 'quarantined';
  correlationId?: string;
  causationId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
}

export type ToolInvocationPatch = Partial<
  Pick<
    ToolInvocationRecord,
    | 'status'
    | 'executionCycle'
    | 'attemptCount'
    | 'result'
    | 'approvalRequest'
    | 'updatedAt'
    | 'startedAt'
    | 'completedAt'
    | 'lateResultState'
    | 'outputHash'
    | 'artifactRefs'
    | 'observationRefs'
    | 'externalReceipt'
  >
>;

export interface ToolIdempotencyLookup {
  toolId: string;
  idempotencyKey: string;
  scopeHash: string;
}

export interface ToolInvocationListRequest {
  statuses?: readonly ToolInvocationStatus[];
  toolId?: string;
  runId?: string;
  limit?: number;
}

export interface ToolInvocationStore {
  get(invocationId: string): Promise<ToolInvocationRecord | null>;
  findByIdempotency(request: ToolIdempotencyLookup): Promise<ToolInvocationRecord | null>;
  list(request?: ToolInvocationListRequest): Promise<ToolInvocationRecord[]>;
  create(record: ToolInvocationRecord): Promise<ToolInvocationRecord>;
  update(
    invocationId: string,
    patch: ToolInvocationPatch,
    options?: {
      expectedStatuses?: readonly ToolInvocationStatus[];
      expectedRevision?: number;
    }
  ): Promise<ToolInvocationRecord>;
  getCompleted(invocationId: string): Promise<ToolCallResult | null>;
  saveCompleted(invocationId: string, result: ToolCallResult): Promise<void>;
}

export class InMemoryToolInvocationStore implements ToolInvocationStore {
  private readonly records = new Map<string, ToolInvocationRecord>();
  private readonly completed = new Map<string, ToolCallResult>();
  private readonly idempotencyIndex = new Map<string, string>();

  async get(invocationId: string): Promise<ToolInvocationRecord | null> {
    return this.records.get(invocationId) ?? null;
  }

  async findByIdempotency(request: ToolIdempotencyLookup): Promise<ToolInvocationRecord | null> {
    return this.findByIdempotencySync(request);
  }

  async list(request: ToolInvocationListRequest = {}): Promise<ToolInvocationRecord[]> {
    return Array.from(this.records.values())
      .filter(
        (record) =>
          (!request.statuses || request.statuses.includes(record.status)) &&
          (!request.toolId || record.toolId === request.toolId) &&
          (!request.runId || record.scope?.runId === request.runId)
      )
      .sort((left, right) => left.createdAt.localeCompare(right.createdAt))
      .slice(0, request.limit ?? Number.POSITIVE_INFINITY);
  }

  private findByIdempotencySync(request: ToolIdempotencyLookup): ToolInvocationRecord | null {
    const key = inMemoryIdempotencyIndexKey(request);
    const invocationId = this.idempotencyIndex.get(key);
    if (!invocationId) return null;
    const record = this.records.get(invocationId);
    if (record) return record;
    this.idempotencyIndex.delete(key);
    return null;
  }

  async create(record: ToolInvocationRecord): Promise<ToolInvocationRecord> {
    const existing = this.records.get(record.id);
    if (existing) return existing;
    if (record.idempotencyKey && typeof record.metadata?.idempotencyScopeHash === 'string') {
      const lookup = {
        toolId: record.toolId,
        idempotencyKey: record.idempotencyKey,
        scopeHash: record.metadata.idempotencyScopeHash,
      };
      const idempotent = this.findByIdempotencySync(lookup);
      if (idempotent) return idempotent;
      this.idempotencyIndex.set(inMemoryIdempotencyIndexKey(lookup), record.id);
    }
    this.records.set(record.id, record);
    return record;
  }

  async update(
    invocationId: string,
    patch: ToolInvocationPatch,
    options: {
      expectedStatuses?: readonly ToolInvocationStatus[];
      expectedRevision?: number;
    } = {}
  ): Promise<ToolInvocationRecord> {
    const existing = this.records.get(invocationId);
    if (!existing) {
      throw new FrameworkError({
        code: 'TOOL_INVOCATION_NOT_FOUND',
        message: 'Tool invocation not found: ' + invocationId,
      });
    }
    if (options.expectedStatuses && !options.expectedStatuses.includes(existing.status)) {
      throw new FrameworkError({
        code: 'TOOL_INVOCATION_STATE_CONFLICT',
        message: 'Tool invocation ' + invocationId + ' is in state ' + existing.status + '.',
        context: { invocationId, status: existing.status },
      });
    }
    if (options.expectedRevision !== undefined && options.expectedRevision !== existing.revision) {
      throw new FrameworkError({
        code: 'TOOL_INVOCATION_REVISION_CONFLICT',
        message: 'Tool invocation revision changed: ' + invocationId,
        context: {
          invocationId,
          expectedRevision: options.expectedRevision,
          actualRevision: existing.revision,
        },
      });
    }
    const updated: ToolInvocationRecord = {
      ...existing,
      ...patch,
      revision: existing.revision + 1,
    };
    this.records.set(invocationId, updated);
    if (updated.status === 'completed' && updated.result) {
      this.completed.set(invocationId, updated.result);
    }
    return updated;
  }

  async getCompleted(invocationId: string): Promise<ToolCallResult | null> {
    return this.records.get(invocationId)?.status === 'completed'
      ? (this.records.get(invocationId)?.result ?? null)
      : (this.completed.get(invocationId) ?? null);
  }

  async saveCompleted(invocationId: string, result: ToolCallResult): Promise<void> {
    this.completed.set(invocationId, result);
    const existing = this.records.get(invocationId);
    if (existing) {
      this.records.set(invocationId, {
        ...existing,
        status: 'completed',
        result,
        revision: existing.revision + 1,
      });
    }
  }
}

function inMemoryIdempotencyIndexKey(request: ToolIdempotencyLookup): string {
  return JSON.stringify([request.toolId, request.idempotencyKey, request.scopeHash]);
}

export type ToolHandler<TInput = unknown, TOutput = unknown> = (
  input: TInput,
  context: ToolCallContext
) => Promise<TOutput>;

export interface ToolAdapterCapabilities {
  execute: boolean;
  cancel: boolean;
  health: boolean;
  close: boolean;
  streaming?: boolean;
}

export interface AdapterExecutionRequest<TInput = unknown> {
  toolId: string;
  input: TInput;
  context: ToolCallContext;
}

export interface AdapterCancellationRequest {
  toolId: string;
  invocationId: string;
  reason?: string;
}

export interface ToolAdapter<TInput = unknown, TOutput = unknown> {
  readonly id: string;
  readonly source: ToolSource;
  capabilities(): Promise<ToolAdapterCapabilities>;
  execute(request: AdapterExecutionRequest<TInput>): Promise<ToolExecutionEnvelope<TOutput>>;
  cancel?(request: AdapterCancellationRequest): Promise<void>;
  health(): Promise<ProviderHealth>;
  close?(): Promise<void>;
}

export class LocalFunctionToolAdapter<TInput = unknown, TOutput = unknown> implements ToolAdapter<
  TInput,
  TOutput
> {
  readonly source: ToolSource = 'local';

  constructor(
    readonly id: string,
    private readonly handler: ToolHandler<TInput, TOutput>
  ) {}

  async capabilities(): Promise<ToolAdapterCapabilities> {
    return { execute: true, cancel: false, health: true, close: false };
  }

  async execute(request: AdapterExecutionRequest<TInput>): Promise<ToolExecutionEnvelope<TOutput>> {
    const output = await this.handler(request.input, request.context);
    return toolExecutionEnvelope(output) as ToolExecutionEnvelope<TOutput>;
  }

  async health(): Promise<ProviderHealth> {
    return healthyProvider();
  }
}

export class PluginToolAdapter<
  TInput = unknown,
  TOutput = unknown,
> extends LocalFunctionToolAdapter<TInput, TOutput> {
  readonly source: ToolSource = 'plugin';
}

export class MockToolAdapter<TInput = unknown, TOutput = unknown> extends LocalFunctionToolAdapter<
  TInput,
  TOutput
> {
  readonly source: ToolSource = 'custom';
}

export interface HttpToolAdapterOptions {
  endpoint: string;
  headers?: Record<string, string>;
  fetch?: typeof fetch;
}

export class HttpToolAdapter implements ToolAdapter {
  readonly source: ToolSource = 'http';
  private readonly fetchImpl: typeof fetch;

  constructor(
    readonly id: string,
    private readonly options: HttpToolAdapterOptions
  ) {
    this.fetchImpl = options.fetch ?? fetch;
  }

  async capabilities(): Promise<ToolAdapterCapabilities> {
    return { execute: true, cancel: true, health: true, close: false };
  }

  async execute(request: AdapterExecutionRequest): Promise<ToolExecutionEnvelope> {
    const response = await this.fetchImpl(this.options.endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...this.options.headers },
      body: JSON.stringify({ toolId: request.toolId, input: request.input }),
      signal: request.context.signal ?? request.context.abortSignal,
    });
    if (!response.ok) {
      throw new FrameworkError({
        code: 'TOOL_HTTP_ERROR',
        message: `HTTP Tool adapter ${this.id} returned ${response.status}.`,
        context: { adapterId: this.id, status: response.status },
      });
    }
    return toolExecutionEnvelope(await response.json());
  }

  async cancel(): Promise<void> {
    // The runner-owned AbortSignal is the cancellation mechanism for HTTP requests.
  }

  async health(): Promise<ProviderHealth> {
    return healthyProvider({ endpoint: this.options.endpoint });
  }
}

export interface MCPToolInvocationPort {
  invoke(request: {
    serverId: string;
    capabilityId: string;
    input: unknown;
    context: ToolCallContext;
  }): Promise<unknown>;
  health(serverId: string): Promise<ProviderHealth>;
  cancel?(requestId: string): Promise<void>;
}

export class MCPToolAdapter implements ToolAdapter {
  readonly source: ToolSource = 'mcp';

  constructor(
    readonly id: string,
    private readonly serverId: string,
    private readonly capabilityId: string,
    private readonly gateway: MCPToolInvocationPort
  ) {}

  async capabilities(): Promise<ToolAdapterCapabilities> {
    return {
      execute: true,
      cancel: Boolean(this.gateway.cancel),
      health: true,
      close: false,
    };
  }

  async execute(request: AdapterExecutionRequest): Promise<ToolExecutionEnvelope> {
    return toolExecutionEnvelope(
      await this.gateway.invoke({
        serverId: this.serverId,
        capabilityId: this.capabilityId,
        input: request.input,
        context: request.context,
      })
    );
  }

  async cancel(request: AdapterCancellationRequest): Promise<void> {
    await this.gateway.cancel?.(request.invocationId);
  }

  async health(): Promise<ProviderHealth> {
    return this.gateway.health(this.serverId);
  }
}

export interface ToolRunner {
  run(request: ToolCallRequest): Promise<ToolCallResult>;
  cancelInvocation?(invocationId: string, reason?: string): Promise<ToolCallResult | null>;
}

export type MockToolHandler = (
  request: ToolCallRequest
) => Promise<ToolCallResult> | ToolCallResult;

export class MockToolRunner implements ToolRunner {
  private readonly handlers = new Map<string, MockToolHandler>();
  private readonly results = new Map<string, ToolCallResult>();

  constructor(private readonly defaultOutput: unknown = { ok: true }) {}

  registerHandler(toolId: string, handler: MockToolHandler): void {
    this.handlers.set(toolId, handler);
  }

  registerResult(toolId: string, result: ToolCallResult): void {
    this.results.set(toolId, result);
  }

  async run(request: ToolCallRequest): Promise<ToolCallResult> {
    const invocationId = resolveInvocationId(request);
    const handler = this.handlers.get(request.toolId);
    if (handler) return { ...(await handler(request)), invocationId };
    const result = this.results.get(request.toolId);
    if (result) return { ...result, invocationId };
    return {
      toolId: request.toolId,
      invocationId,
      status: 'completed',
      output: {
        toolId: request.toolId,
        input: request.input,
        output: this.defaultOutput,
      },
    };
  }
}

export class ToolRegistry {
  private readonly specs = new Map<string, ResolvedToolSpec>();
  private readonly adapters = new Map<string, ToolAdapter>();
  private readonly revisions = new Map<string, { spec: ResolvedToolSpec; adapter: ToolAdapter }>();
  private readonly targetResolvers = new Map<string, ToolTargetResolver>();

  register(
    spec: ToolSpec,
    handler: ToolHandler,
    options: { replace?: boolean; targetResolver?: ToolTargetResolver } = {}
  ): void {
    this.registerAdapter(spec, new LocalFunctionToolAdapter(`${spec.id}:local`, handler), options);
  }

  registerAdapter(
    spec: ToolSpec,
    adapter: ToolAdapter,
    options: { replace?: boolean; targetResolver?: ToolTargetResolver } = {}
  ): void {
    const parsed = normalizeToolSpec(validateToolSpec(spec));
    if (this.specs.has(parsed.id) && !options.replace) {
      throw new FrameworkError({
        code: 'TOOL_ALREADY_REGISTERED',
        message: 'Tool already registered: ' + parsed.id,
        context: { toolId: parsed.id },
      });
    }
    this.specs.set(parsed.id, parsed);
    this.adapters.set(parsed.id, adapter);
    this.revisions.set(this.revisionKey(parsed.id, parsed.version, parsed.revision), {
      spec: parsed,
      adapter,
    });
    if (options.targetResolver) this.targetResolvers.set(parsed.id, options.targetResolver);
  }

  unregister(toolId: string): boolean {
    const removedSpec = this.specs.delete(toolId);
    const removedAdapter = this.adapters.delete(toolId);
    this.targetResolvers.delete(toolId);
    return removedSpec || removedAdapter;
  }

  getSpec(toolId: string): ResolvedToolSpec | null {
    return this.specs.get(toolId) ?? null;
  }

  getAdapter(toolId: string): ToolAdapter | null {
    return this.adapters.get(toolId) ?? null;
  }

  getTargetResolver(toolId: string): ToolTargetResolver | null {
    return this.targetResolvers.get(toolId) ?? null;
  }

  resolve(ref: { id: string; version?: string; revision?: string }): {
    spec: ResolvedToolSpec;
    adapter: ToolAdapter;
  } | null {
    if (ref.revision) {
      const exact = ref.version
        ? this.revisions.get(this.revisionKey(ref.id, ref.version, ref.revision))
        : Array.from(this.revisions.values()).find(
            (entry) => entry.spec.id === ref.id && entry.spec.revision === ref.revision
          );
      if (!exact || exact.spec.enabled === false || exact.spec.deprecated) return null;
      return exact;
    }
    const spec = this.getSpec(ref.id);
    const adapter = this.getAdapter(ref.id);
    if (!spec || !adapter) return null;
    if (ref.version && spec.version !== ref.version) return null;
    if (ref.revision && spec.revision !== ref.revision) return null;
    if (spec.enabled === false || spec.deprecated) return null;
    return { spec, adapter };
  }

  list(): ResolvedToolSpec[] {
    return Array.from(this.specs.values());
  }

  private revisionKey(id: string, version: string, revision: string): string {
    return `${id}\u0000${version}\u0000${revision}`;
  }
}
export function validateEffectiveCapabilityAccess(input: {
  snapshot: ToolContractSnapshot | null;
  context: ToolCallContext;
  spec: ToolSpec;
}): string | null {
  const effective = input.snapshot?.effectiveCapabilities;
  if (!effective) {
    return input.context.capabilitySnapshotRef
      ? 'The requested effective capability snapshot is unavailable.'
      : null;
  }
  if (input.context.capabilitySnapshotRef !== input.snapshot?.id) {
    return 'Invocation is missing the exact effective capability snapshot reference.';
  }
  if (effective.runId !== input.context.runId) {
    return 'Effective capability snapshot belongs to a different Run.';
  }
  if (
    effective.expiresAt &&
    (!Number.isFinite(Date.parse(effective.expiresAt)) || Date.parse(effective.expiresAt) <= Date.now())
  ) {
    return 'Effective capability snapshot is expired.';
  }
  const contextAgentId = input.context.agentId ?? input.context.principal?.agentId;
  if (effective.agentId !== contextAgentId) {
    return 'Effective capability snapshot belongs to a different Agent.';
  }
  const principalId =
    input.context.principal?.principalId ?? input.context.principal?.id;
  if (effective.principalId !== principalId) {
    return 'Effective capability snapshot belongs to a different principal.';
  }
  if (effective.tenantId && effective.tenantId !== input.context.tenantId) {
    return 'Effective capability snapshot belongs to a different tenant.';
  }
  if (!effective.allowedToolIds.includes(input.spec.id)) {
    return `Tool ${input.spec.id} is not allowed by the effective capability snapshot.`;
  }
  if (
    capabilitySideEffectRank(input.spec.sideEffectLevel) >
    capabilitySideEffectRank(effective.maximumSideEffectLevel)
  ) {
    return `Tool ${input.spec.id} exceeds the effective side-effect ceiling.`;
  }
  if (
    input.spec.source === 'mcp' &&
    (!(input.spec.sourceRef?.serverId ?? input.spec.sourceRef?.mcpServerId) ||
      !effective.allowedMCPServerIds.includes(
        (input.spec.sourceRef?.serverId ?? input.spec.sourceRef?.mcpServerId)!
      ))
  ) {
    return `MCP server for ${input.spec.id} is not allowed by the effective capability snapshot.`;
  }
  if (input.spec.source === 'execution') {
    const profile = input.spec.sourceRef?.adapterId;
    if (!profile || !effective.allowedExecutionProfiles.includes(profile)) {
      return `Execution profile for ${input.spec.id} is not allowed by the effective capability snapshot.`;
    }
  }
  const isMemoryTool =
    input.spec.id === 'common.memory' || input.spec.permissionScope?.includes('memory.activity');
  if (isMemoryTool) {
    const required =
      capabilitySideEffectRank(input.spec.sideEffectLevel) >= capabilitySideEffectRank('write')
        ? 'write'
        : 'read';
    if (!capabilityMemoryAllows(effective.memoryAccess, required)) {
      return `Memory ${required} is not allowed by the effective capability snapshot.`;
    }
  }
  return null;
}

function capabilitySideEffectRank(level: SideEffectLevel): number {
  return ['none', 'read', 'write', 'external_effect', 'irreversible'].indexOf(level);
}

function capabilityMemoryAllows(
  access: EffectiveAgentCapabilitySnapshot['memoryAccess'],
  required: 'read' | 'write'
): boolean {
  return access === 'read_write' || access === required;
}

export class GovernedToolRunner implements ToolRunner {
  private readonly approvalStore: ToolApprovalStore;
  private readonly invocationStore: ToolInvocationStore;
  private readonly authorizer: ToolAuthorizer;
  private readonly now: () => string;
  private readonly middleware: ToolMiddleware[];
  private readonly artifactPort?: ToolArtifactPort;
  private readonly snapshotStore?: ToolContractSnapshotStore;
  private readonly receiptReconciler?: ToolReceiptReconciler;
  private readonly resultCache?: ToolResultCache;
  private readonly resultCacheFailureMode: 'bypass' | 'strict';
  private readonly resultCacheTimeoutMs: number;
  private readonly resultCacheMaxEntryBytes: number;
  private readonly resultCacheArtifactVerifier?: ToolResultCacheArtifactVerifier;
  private readonly observationPort?: ToolObservationPort;
  private readonly telemetry?: TelemetryRecorder;
  private readonly inFlight = new Map<string, Promise<ToolCallResult>>();
  private readonly idempotencyInFlight = new Map<
    string,
    { fingerprint: string; execution: Promise<ToolCallResult> }
  >();
  private readonly abortControllers = new Map<string, AbortController>();

  constructor(
    private readonly registry: ToolRegistry,
    private readonly trace: TraceRecorder,
    private readonly policy: PolicyEngine = denyExternalEffectsPolicyEngine,
    options: {
      approvalStore?: ToolApprovalStore;
      invocationStore?: ToolInvocationStore;
      authorizer?: ToolAuthorizer;
      middleware?: ToolMiddleware[];
      artifactPort?: ToolArtifactPort;
      snapshotStore?: ToolContractSnapshotStore;
      receiptReconciler?: ToolReceiptReconciler;
      resultCache?: ToolResultCache;
      resultCacheFailureMode?: 'bypass' | 'strict';
      resultCacheTimeoutMs?: number;
      resultCacheMaxEntryBytes?: number;
      resultCacheArtifactVerifier?: ToolResultCacheArtifactVerifier;
      observationPort?: ToolObservationPort;
      telemetry?: TelemetryRecorder;
      now?: () => string;
    } = {}
  ) {
    this.approvalStore = options.approvalStore ?? new InMemoryToolApprovalStore();
    this.invocationStore = options.invocationStore ?? new InMemoryToolInvocationStore();
    this.authorizer = options.authorizer ?? new PermissionScopeToolAuthorizer();
    this.middleware = [...(options.middleware ?? [])];
    this.artifactPort = options.artifactPort;
    this.snapshotStore = options.snapshotStore;
    this.receiptReconciler = options.receiptReconciler;
    this.resultCache = options.resultCache;
    this.resultCacheFailureMode = options.resultCacheFailureMode ?? 'bypass';
    this.resultCacheTimeoutMs = Math.max(1, options.resultCacheTimeoutMs ?? 250);
    this.resultCacheMaxEntryBytes = Math.max(1, options.resultCacheMaxEntryBytes ?? 1024 * 1024);
    this.resultCacheArtifactVerifier = options.resultCacheArtifactVerifier;
    this.observationPort = options.observationPort;
    this.telemetry = options.telemetry;
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async getInvocation(invocationId: string): Promise<ToolInvocationRecord | null> {
    return this.invocationStore.get(invocationId);
  }

  async listInvocations(request: ToolInvocationListRequest = {}): Promise<ToolInvocationRecord[]> {
    return this.invocationStore.list(request);
  }

  async recoverPendingInvocations(): Promise<ToolCallResult[]> {
    const interruptedStatuses: readonly ToolInvocationStatus[] = [
      'created',
      'validating',
      'policy_checked',
      'approved',
      'queued',
      'running',
      'cancelling',
    ];
    const records = await this.invocationStore.list({ statuses: interruptedStatuses });
    const results: ToolCallResult[] = [];
    for (const record of records) {
      if (record.status === 'cancelling') {
        results.push(await this.cancelInvocation(record.id, 'Recovered pending cancellation.'));
        continue;
      }
      if (record.status === 'created' || record.status === 'approved') {
        results.push(await this.run(record.request));
        continue;
      }

      const spec = this.registry.getSpec(record.toolId);
      if (!spec) {
        const result = failedToolResult(
          record.toolId,
          record.id,
          'TOOL_NOT_FOUND',
          'Cannot recover an invocation whose Tool is no longer registered.',
          'resolution'
        );
        await this.invocationStore.update(
          record.id,
          { status: 'failed', result, updatedAt: this.now(), completedAt: this.now() },
          { expectedStatuses: [record.status], expectedRevision: record.revision }
        );
        results.push(result);
        continue;
      }

      let reconciliation: ToolReceiptReconciliation | undefined;
      if (hasExternalSideEffect(spec.sideEffectLevel)) {
        reconciliation = this.receiptReconciler
          ? await this.receiptReconciler.reconcile({
              invocationId: record.id,
              tool: spec,
              call: record.request,
              attempt: record.attemptCount,
            })
          : { state: 'unknown' };
        await this.recordControlEvent(
          record,
          'tool.external_receipt.reconciled',
          'recovery-receipt-reconciled',
          { reconciliation, recovery: true }
        );
      }

      if (reconciliation?.state === 'committed') {
        const result: ToolCallResult = {
          toolId: record.toolId,
          invocationId: record.id,
          status: 'completed',
          externalReceipt: reconciliation.receipt,
          attempts: record.attemptCount,
        };
        await this.invocationStore.update(
          record.id,
          {
            status: 'completed',
            result,
            externalReceipt: reconciliation.receipt,
            lateResultState: 'accepted',
            updatedAt: this.now(),
            completedAt: this.now(),
          },
          { expectedStatuses: [record.status], expectedRevision: record.revision }
        );
        results.push(result);
        continue;
      }

      if (reconciliation && reconciliation.state !== 'not_committed') {
        const result = failedToolResult(
          record.toolId,
          record.id,
          'TOOL_CONCURRENCY_CONFLICT',
          'Interrupted side-effect invocation has an unknown external commit state.',
          'execution',
          'conflict'
        );
        await this.invocationStore.update(
          record.id,
          {
            status: 'conflict',
            result,
            lateResultState: 'pending',
            updatedAt: this.now(),
            completedAt: this.now(),
          },
          { expectedStatuses: [record.status], expectedRevision: record.revision }
        );
        results.push(result);
        continue;
      }

      await this.invocationStore.update(
        record.id,
        { status: 'failed', updatedAt: this.now() },
        { expectedStatuses: [record.status], expectedRevision: record.revision }
      );
      results.push(await this.run(record.request));
    }
    return results;
  }

  run(request: ToolCallRequest): Promise<ToolCallResult> {
    const identity = toolIdempotencyIdentity(request, this.registry.getSpec(request.toolId));
    if (!identity) return this.runInvocation(request);
    const active = this.idempotencyInFlight.get(identity.lookupKey);
    if (active) {
      if (active.fingerprint !== identity.fingerprint) {
        return this.idempotencyConflictResult(request, identity.fingerprint, active.fingerprint);
      }
      return active.execution;
    }
    const execution = this.runInvocation(request).finally(() => {
      const current = this.idempotencyInFlight.get(identity.lookupKey);
      if (current?.execution === execution) this.idempotencyInFlight.delete(identity.lookupKey);
    });
    this.idempotencyInFlight.set(identity.lookupKey, {
      fingerprint: identity.fingerprint,
      execution,
    });
    return execution;
  }

  private async runInvocation(request: ToolCallRequest): Promise<ToolCallResult> {
    let invocationId = resolveInvocationId(request);
    let normalizedRequest = persistableToolRequest(request, invocationId);
    const inputHash = hashToolInput(request.input);
    const registeredSpec = this.registry.getSpec(request.toolId);
    const idempotencyIdentity = toolIdempotencyIdentity(request, registeredSpec);

    if (idempotencyIdentity) {
      const existing = await this.invocationStore.findByIdempotency({
        toolId: request.toolId,
        idempotencyKey: request.context.idempotencyKey!,
        scopeHash: idempotencyIdentity.scopeHash,
      });
      if (existing && existing.id !== invocationId) {
        if (existing.idempotencyFingerprint !== idempotencyIdentity.fingerprint) {
          await this.recordControlEvent(
            existing,
            'tool.idempotency.conflict',
            'idempotency-conflict',
            {
              requestedInvocationId: invocationId,
              idempotencyKey: request.context.idempotencyKey,
              existingInputHash: existing.inputHash,
              requestedInputHash: inputHash,
            }
          );
          await this.metric('tool_idempotency_conflict_total', 'counter', 1, {
            tool_id: request.toolId,
          });
          return failedToolResult(
            request.toolId,
            invocationId,
            'TOOL_IDEMPOTENCY_CONFLICT',
            'Idempotency key is already bound to different input, scope, policy, or Tool revision.',
            'authorization',
            'conflict',
            { existingInvocationId: existing.id }
          );
        }
        if (existing.status === 'completed' && existing.result) {
          await this.recordControlEvent(existing, 'tool.idempotency.reused', 'idempotency-reused', {
            requestedInvocationId: invocationId,
            idempotencyKey: request.context.idempotencyKey,
          });
          await this.metric('tool_idempotency_reuse_total', 'counter', 1, {
            tool_id: existing.toolId,
          });
          return existing.result;
        }
        if (existing.status === 'waiting_approval' && existing.result) return existing.result;
        invocationId = existing.id;
        normalizedRequest = existing.request;
      }
    }

    const running = this.inFlight.get(invocationId);
    if (running) return running;

    let invocation = await this.invocationStore.get(invocationId);
    if (invocation) {
      if (invocation.toolId !== request.toolId || invocation.inputHash !== inputHash) {
        return failedToolResult(
          request.toolId,
          invocationId,
          'TOOL_INVOCATION_CONFLICT',
          'Invocation ID is already bound to a different tool or input.',
          'authorization',
          'denied'
        );
      }
      if (invocation.status === 'completed' && invocation.result) return invocation.result;
      if (
        (invocation.status === 'cancelled' || invocation.status === 'denied') &&
        invocation.result
      ) {
        return invocation.result;
      }
      if (invocation.status === 'waiting_approval') {
        const grant = await this.approvalStore.getGrant(invocationId);
        if (!grant) {
          return (
            invocation.result ??
            failedToolResult(
              request.toolId,
              invocationId,
              'TOOL_APPROVAL_REQUIRED',
              'Tool invocation is waiting for human approval.',
              'approval',
              'human_review_required'
            )
          );
        }
        invocation = await this.invocationStore.update(
          invocationId,
          { status: 'approved', updatedAt: this.now() },
          { expectedStatuses: ['waiting_approval'] }
        );
      }
      if (
        invocation.status === 'validating' ||
        invocation.status === 'policy_checked' ||
        invocation.status === 'running'
      ) {
        return failedToolResult(
          request.toolId,
          invocationId,
          'TOOL_INVOCATION_BUSY',
          'Tool invocation is already being processed by another executor.',
          'execution',
          'failed',
          { status: invocation.status, retryable: true }
        );
      }
    } else {
      const timestamp = this.now();
      invocation = await this.invocationStore.create({
        id: invocationId,
        operationId: request.context.operationId ?? invocationId,
        toolId: request.toolId,
        toolVersion: registeredSpec?.version,
        toolRevision: registeredSpec?.revision,
        contractSnapshotRef: request.context.contractSnapshotRef,
        principal: request.context.principal,
        scope: {
          tenantId: request.context.tenantId ?? request.context.principal?.tenantId,
          userId: request.context.userId,
          workspaceId: request.context.workspaceId,
          sessionId: request.context.sessionId,
          runId: request.context.runId,
          stepId: request.context.stepId,
          agentId: request.context.agentId,
          fsmState: request.context.fsmState ?? request.context.executionScope?.fsmState,
        },
        status: 'created',
        inputHash,
        sideEffectLevel: registeredSpec?.sideEffectLevel,
        idempotencyKey: request.context.idempotencyKey,
        idempotencyFingerprint: idempotencyIdentity?.fingerprint,
        request: normalizedRequest,
        executionCycle: 0,
        attemptCount: 0,
        maxAttempts: registeredSpec?.retryPolicy?.maxAttempts ?? 1,
        revision: 0,
        lateResultState: 'none',
        correlationId: request.context.correlationId,
        causationId: request.context.causationId,
        metadata: idempotencyIdentity
          ? {
              idempotencyScopeHash: idempotencyIdentity.scopeHash,
              policyRevision: idempotencyIdentity.policyRevision,
            }
          : undefined,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
      if (invocation.id === invocationId && invocation.revision === 0) {
        await this.metric('tool_invocation_total', 'counter', 1, {
          tool_id: invocation.toolId,
          side_effect_level: invocation.sideEffectLevel ?? 'unknown',
        });
      }
      if (invocation.id !== invocationId) {
        if (invocation.idempotencyFingerprint !== idempotencyIdentity?.fingerprint) {
          return this.idempotencyConflictResult(
            request,
            idempotencyIdentity?.fingerprint ?? '',
            invocation.idempotencyFingerprint ?? ''
          );
        }
        if (invocation.status === 'completed' && invocation.result) return invocation.result;
        invocationId = invocation.id;
        normalizedRequest = invocation.request;
      }
    }

    const previousStatus = invocation.status;
    let claimed: ToolInvocationRecord;
    try {
      claimed = await this.invocationStore.update(
        invocationId,
        {
          status: 'validating',
          executionCycle: invocation.executionCycle + 1,
          attemptCount: 0,
          result: undefined,
          updatedAt: this.now(),
          startedAt: this.now(),
          completedAt: undefined,
        },
        {
          expectedStatuses: ['created', 'approved', 'failed'],
          expectedRevision: invocation.revision,
        }
      );
    } catch (error) {
      const latest = await this.invocationStore.get(invocationId);
      if (latest?.status === 'completed' && latest.result) return latest.result;
      return failedToolResult(
        request.toolId,
        invocationId,
        'TOOL_INVOCATION_BUSY',
        error instanceof Error ? error.message : String(error),
        'execution',
        'failed',
        { status: latest?.status, retryable: true }
      );
    }

    const runtimeRequest: ToolCallRequest = {
      ...normalizedRequest,
      context: {
        ...normalizedRequest.context,
        signal: request.context.signal,
        abortSignal: request.context.abortSignal,
        reportProgress: request.context.reportProgress,
      },
    };
    const execution = this.runOnce(runtimeRequest, claimed, previousStatus)
      .then((result) => this.finalizeInvocation(claimed, result))
      .catch((error) =>
        this.finalizeInvocation(
          claimed,
          failedToolResult(
            request.toolId,
            invocationId,
            'TOOL_RUNTIME_FAILED',
            error instanceof Error ? error.message : String(error),
            'execution'
          )
        )
      )
      .finally(() => {
        this.inFlight.delete(invocationId);
        this.abortControllers.delete(invocationId);
      });
    this.inFlight.set(invocationId, execution);
    return execution;
  }

  async approveAndResume(
    invocationId: string,
    approvedBy: string,
    options: { approvedAt?: string; expiresAt?: string } = {}
  ): Promise<ToolCallResult> {
    const invocation = await this.requireInvocation(invocationId);
    if (invocation.status === 'completed' && invocation.result) return invocation.result;
    if (invocation.status !== 'waiting_approval') {
      throw new FrameworkError({
        code: 'TOOL_INVOCATION_NOT_WAITING_APPROVAL',
        message:
          'Tool invocation is not waiting for approval: ' +
          invocationId +
          ' (' +
          invocation.status +
          ')',
      });
    }
    await this.recordControlEvent(
      invocation,
      'human.review.resume.started',
      'human-review-resume-started',
      { approvedBy }
    );
    try {
      await this.approvalStore.approve(invocationId, approvedBy, options);
      const approvalRequestedAt = invocation.approvalRequest?.requestedAt;
      if (approvalRequestedAt) {
        await this.metric(
          'tool_approval_latency_ms',
          'histogram',
          Math.max(
            0,
            Date.parse(options.approvedAt ?? this.now()) - Date.parse(approvalRequestedAt)
          ),
          { tool_id: invocation.toolId }
        );
      }
      await this.invocationStore.update(
        invocationId,
        { status: 'approved', updatedAt: options.approvedAt ?? this.now() },
        { expectedStatuses: ['waiting_approval'] }
      );
      await this.recordControlEvent(
        invocation,
        'human.review.resume.revalidated',
        'human-review-resume-revalidated',
        { approvedBy, toolRevision: invocation.toolRevision }
      );
      return this.run(invocation.request);
    } catch (error) {
      if (error instanceof Error && error.message.includes('has expired')) {
        const expired = await this.invocationStore.update(
          invocationId,
          { status: 'expired', updatedAt: this.now(), completedAt: this.now() },
          { expectedStatuses: ['waiting_approval'] }
        );
        await this.recordControlEvent(expired, 'human.review.expired', 'human-review-expired', {
          approvedBy,
        });
      }
      await this.recordControlEvent(
        invocation,
        'human.review.resume.failed',
        'human-review-resume-failed',
        { error: error instanceof Error ? error.message : String(error) }
      );
      throw error;
    }
  }

  async rejectInvocation(invocationId: string): Promise<ToolCallResult> {
    const invocation = await this.requireInvocation(invocationId);
    if (invocation.status !== 'waiting_approval') {
      throw new FrameworkError({
        code: 'TOOL_INVOCATION_NOT_WAITING_APPROVAL',
        message: 'Tool invocation is not waiting for approval: ' + invocationId,
      });
    }
    const approvalRequest = await this.approvalStore.reject(invocationId);
    const result = failedToolResult(
      invocation.toolId,
      invocationId,
      'TOOL_APPROVAL_REJECTED',
      'Human approval was rejected for tool: ' + invocation.toolId,
      'approval',
      'denied'
    );
    await this.invocationStore.update(
      invocationId,
      {
        status: 'denied',
        approvalRequest,
        result,
        updatedAt: this.now(),
        completedAt: this.now(),
      },
      { expectedStatuses: ['waiting_approval'] }
    );
    await this.recordControlEvent(invocation, 'human.review.rejected', 'human-review-rejected', {
      approvalRequest,
    });
    return result;
  }

  async cancelInvocation(
    invocationId: string,
    reason = 'Tool invocation cancelled.'
  ): Promise<ToolCallResult> {
    const invocation = await this.requireInvocation(invocationId);
    if (invocation.status === 'completed' && invocation.result) return invocation.result;
    if (
      invocation.status === 'validating' ||
      invocation.status === 'policy_checked' ||
      invocation.status === 'approved' ||
      invocation.status === 'queued' ||
      invocation.status === 'running'
    ) {
      await this.invocationStore.update(
        invocationId,
        { status: 'cancelling', updatedAt: this.now() },
        { expectedStatuses: [invocation.status] }
      );
      await this.recordControlEvent(
        invocation,
        'tool.call.cancellation.requested',
        'cancellation-requested',
        { reason }
      );
      this.abortControllers.get(invocationId)?.abort(reason);
      const adapter = this.registry.getAdapter(invocation.toolId);
      if (adapter?.cancel) {
        await adapter.cancel({ toolId: invocation.toolId, invocationId, reason });
      }
      const running = this.inFlight.get(invocationId);
      if (running) return running;
    }
    const result = failedToolResult(
      invocation.toolId,
      invocationId,
      'TOOL_INVOCATION_CANCELLED',
      reason,
      'execution',
      'cancelled'
    );
    await this.invocationStore.update(invocationId, {
      status: 'cancelled',
      result,
      updatedAt: this.now(),
      completedAt: this.now(),
    });
    await this.recordControlEvent(invocation, 'tool.invocation.state.changed', 'cancelled', {
      from: invocation.status,
      to: 'cancelled',
      reason,
    });
    await this.recordControlEvent(invocation, 'tool.call.cancelled', 'call-cancelled', { reason });
    return result;
  }

  private async requireInvocation(invocationId: string): Promise<ToolInvocationRecord> {
    const invocation = await this.invocationStore.get(invocationId);
    if (!invocation) {
      throw new FrameworkError({
        code: 'TOOL_INVOCATION_NOT_FOUND',
        message: 'Tool invocation not found: ' + invocationId,
      });
    }
    return invocation;
  }

  private async finalizeInvocation(
    invocation: ToolInvocationRecord,
    result: ToolCallResult
  ): Promise<ToolCallResult> {
    const status = toolInvocationStatusFromResult(result);
    const current = (await this.invocationStore.get(invocation.id)) ?? invocation;
    const updated = await this.invocationStore.update(invocation.id, {
      status,
      result,
      approvalRequest: result.approvalRequest,
      outputHash: result.output === undefined ? undefined : hashToolInput(result.output),
      artifactRefs: result.artifactRefs,
      observationRefs: result.observationRefs,
      externalReceipt: result.externalReceipt,
      updatedAt: this.now(),
      completedAt: status === 'waiting_approval' || status === 'approved' ? undefined : this.now(),
    });
    if (!['waiting_approval', 'approved', 'running'].includes(status)) {
      await this.metric(
        'tool_invocation_latency_ms',
        'histogram',
        Math.max(0, Date.parse(updated.updatedAt) - Date.parse(updated.createdAt)),
        { tool_id: updated.toolId, status }
      );
    }
    if (status === 'failed' || status === 'conflict') {
      await this.metric('tool_failure_total', 'counter', 1, {
        tool_id: updated.toolId,
        status,
      });
    }
    if (status === 'denied') {
      await this.metric('tool_denied_total', 'counter', 1, { tool_id: updated.toolId });
    }
    if (current.status !== status) {
      await this.recordControlEvent(updated, 'tool.invocation.state.changed', 'state:' + status, {
        from: current.status,
        to: status,
      });
    }
    return result;
  }

  private async runOnce(
    request: ToolCallRequest,
    invocation: ToolInvocationRecord,
    previousStatus: ToolInvocationStatus
  ): Promise<ToolCallResult> {
    const invocationId = invocation.id;
    const cycle = invocation.executionCycle;
    const startedAt = Date.now();
    let executionRequest = request;
    let spec = this.registry.getSpec(request.toolId);
    let adapter = this.registry.getAdapter(request.toolId);
    const invocationController = new AbortController();
    this.abortControllers.set(invocationId, invocationController);
    const parentSignal = request.context.signal ?? request.context.abortSignal;
    if (parentSignal?.aborted) invocationController.abort(parentSignal.reason);
    parentSignal?.addEventListener('abort', () => invocationController.abort(parentSignal.reason), {
      once: true,
    });
    let eventSequence = 0;
    const traceContext = {
      runId: request.context.runId,
      stepId: request.context.stepId,
      sessionId: request.context.sessionId,
      agentId: request.context.agentId,
      fsmState: request.context.fsmState ?? request.context.executionScope?.fsmState,
    };
    const record = async (
      type: FrameworkEventType,
      suffix: string,
      payload: Record<string, unknown>
    ): Promise<void> => {
      eventSequence += 1;
      await this.trace.record(
        createFrameworkEvent({
          id: invocationId + ':cycle:' + cycle + ':event:' + eventSequence + ':' + suffix,
          type,
          ...traceContext,
          payload: {
            invocationId,
            executionCycle: cycle,
            sequence: eventSequence,
            ...payload,
          },
        })
      );
    };
    const transition = async (
      from: ToolInvocationStatus,
      to: ToolInvocationStatus,
      patch: ToolInvocationPatch = {}
    ): Promise<void> => {
      await this.invocationStore.update(invocationId, {
        ...patch,
        status: to,
        updatedAt: this.now(),
      });
      await record('tool.invocation.state.changed', 'state:' + to, { from, to });
    };

    await record('tool.invocation.state.changed', 'state:validating', {
      from: previousStatus,
      to: 'validating',
    });

    const targetResolver = this.registry.getTargetResolver(request.toolId);
    if (targetResolver) {
      const target = await targetResolver.resolve(request, this.registry);
      const resolved = this.registry.resolve({ id: target.toolId });
      if (!resolved) {
        return failedToolResult(
          request.toolId,
          invocationId,
          'TOOL_TARGET_NOT_FOUND',
          'Resolved Tool target is unavailable: ' + target.toolId,
          'resolution'
        );
      }
      executionRequest = { ...request, toolId: target.toolId, input: target.input };
      spec = resolved.spec;
      adapter = resolved.adapter;
      await record('tool.target.resolved', 'target-resolved', {
        requestedToolId: request.toolId,
        targetToolId: target.toolId,
        targetRevision: spec.revision,
        metadata: target.metadata,
      });
      await record('tool.resolved', 'resolved', {
        requestedToolId: request.toolId,
        targetToolId: target.toolId,
        toolVersion: spec.version,
        toolRevision: spec.revision,
      });
    }

    if (!spec || !adapter) {
      return failedToolResult(
        request.toolId,
        invocationId,
        'TOOL_NOT_FOUND',
        'Tool not found: ' + request.toolId,
        'resolution'
      );
    }

    const snapshotRef = request.context.contractSnapshotRef;
    let activeContractSnapshot: ToolContractSnapshot | null = null;
    if (
      request.context.capabilitySnapshotRef &&
      request.context.capabilitySnapshotRef !== snapshotRef
    ) {
      return failedToolResult(
        request.toolId,
        invocationId,
        'TOOL_CAPABILITY_SNAPSHOT_MISMATCH',
        'The effective capability snapshot ref must match the Run Tool contract snapshot ref.',
        'authorization',
        'denied'
      );
    }
    if (snapshotRef) {
      if (!this.snapshotStore) {
        return failedToolResult(
          request.toolId,
          invocationId,
          'TOOL_CONTRACT_SNAPSHOT_UNAVAILABLE',
          'A contract snapshot was requested but no snapshot store is configured.',
          'resolution'
        );
      }
      const snapshot = await this.snapshotStore.get(snapshotRef);
      activeContractSnapshot = snapshot;
      const snapshotItem = snapshot?.toolContracts.find(
        (item) => item.toolId === executionRequest.toolId || item.toolId === request.toolId
      );
      if (!snapshot || snapshot.runId !== request.context.runId || !snapshotItem) {
        return failedToolResult(
          request.toolId,
          invocationId,
          'TOOL_CONTRACT_SNAPSHOT_MISMATCH',
          'The Tool is not present in the contract snapshot for this run.',
          'resolution'
        );
      }
      const pinned = this.registry.resolve({
        id: executionRequest.toolId,
        version: snapshotItem.toolVersion,
        revision: snapshotItem.toolRevision,
      });
      if (!pinned) {
        return failedToolResult(
          request.toolId,
          invocationId,
          'TOOL_CONTRACT_REVISION_UNAVAILABLE',
          'The Tool revision pinned by the contract snapshot is unavailable.',
          'resolution'
        );
      }
      spec = pinned.spec;
      adapter = pinned.adapter;
      await record('tool.contract.snapshot.resolved', 'snapshot-resolved', {
        snapshotId: snapshot.id,
        snapshotHash: snapshot.snapshotHash,
        toolId: snapshotItem.toolId,
        toolRevision: snapshotItem.toolRevision,
      });
    }

    const capabilityDenial = validateEffectiveCapabilityAccess({
      snapshot: activeContractSnapshot,
      context: request.context,
      spec,
    });
    if (capabilityDenial) {
      const result = failedToolResult(
        request.toolId,
        invocationId,
        'TOOL_CAPABILITY_SCOPE_DENIED',
        capabilityDenial,
        'authorization',
        'denied'
      );
      await record('tool.call.rejected', 'rejected:capability-snapshot', {
        error: result.error,
        capabilitySnapshotRef: request.context.capabilitySnapshotRef,
      });
      return result;
    }

    const basePayload = {
      ...toolTracePayload(executionRequest.toolId, spec),
      invocationId,
      requestedToolId: request.toolId,
      toolRevision: spec.revision,
    };
    const auditedInput = auditToolValue(spec.auditPolicy, 'input', executionRequest.input);
    await record('tool.call.requested', 'requested', {
      ...basePayload,
      ...(auditedInput.included ? { input: auditedInput.value } : {}),
    });

    const allowedToolIds = request.context.executionScope?.allowedToolIds;
    if (allowedToolIds && !allowedToolIds.includes(request.toolId)) {
      const result = failedToolResult(
        request.toolId,
        invocationId,
        'TOOL_NOT_ALLOWED_IN_SCOPE',
        'Tool ' + request.toolId + ' is not allowed in the current execution scope.',
        'authorization',
        'denied'
      );
      await record('tool.call.rejected', 'rejected:scope', {
        ...basePayload,
        error: result.error,
        allowedToolIds: [...allowedToolIds],
      });
      return result;
    }

    const middlewareContext: ToolMiddlewareContext = {
      invocationId,
      request: executionRequest,
      originalRequest: request,
      spec,
    };
    for (const middleware of this.middleware) {
      await middleware.beforeAuthorization?.(middlewareContext);
    }

    const authorization = await this.authorizer.authorize({
      tool: spec,
      request: executionRequest,
      principal: request.context.principal,
      executionScope: request.context.executionScope,
    });
    await record('tool.authorization.checked', 'authorization', {
      ...basePayload,
      principal: request.context.principal
        ? {
            id: request.context.principal.id,
            type: request.context.principal.type,
            tenantId: request.context.principal.tenantId,
          }
        : undefined,
      decision: authorization,
    });
    if (!authorization.allowed) {
      const result = failedToolResult(
        request.toolId,
        invocationId,
        'TOOL_PERMISSION_DENIED',
        authorization.reason ?? 'Tool principal is not authorized.',
        'authorization',
        'denied',
        { missingPermissionScopes: authorization.missingPermissionScopes }
      );
      await record('tool.call.rejected', 'rejected:permission', {
        ...basePayload,
        decision: authorization,
        error: result.error,
      });
      return result;
    }

    if (spec.idempotencyPolicy?.mode === 'required' && !request.context.idempotencyKey) {
      const result = failedToolResult(
        request.toolId,
        invocationId,
        'TOOL_IDEMPOTENCY_KEY_REQUIRED',
        'Tool requires an idempotency key: ' + request.toolId,
        'authorization'
      );
      await record('tool.call.failed', 'failed:idempotency', {
        ...basePayload,
        error: result.error,
      });
      return result;
    }

    const validation = validateToolInput(spec.inputSchema, executionRequest.input);
    if (!validation.valid) {
      const result = failedToolResult(
        request.toolId,
        invocationId,
        'TOOL_INPUT_INVALID',
        validation.error ?? 'Tool input failed schema validation.',
        'input_validation',
        'failed',
        { issues: validation.issues }
      );
      await record('tool.call.failed', 'failed:validation', {
        ...basePayload,
        error: result.error,
      });
      return result;
    }

    const decision = await this.policy.evaluate({
      runId: request.context.runId,
      stepId: request.context.stepId,
      userId: request.context.userId,
      capabilityId: executionRequest.toolId,
      sideEffectLevel: spec.sideEffectLevel,
      input: executionRequest.input,
      metadata: {
        ...request.context.metadata,
        invocationId,
        fsmState: traceContext.fsmState,
        policyRefs: request.context.executionScope?.policyRefs,
        source: spec.source ?? 'local',
        sourceRef: spec.sourceRef,
        permissionScope: spec.permissionScope,
        principalId: request.context.principal?.id,
        principalType: request.context.principal?.type,
        tenantId: request.context.principal?.tenantId,
      },
    });
    await record('tool.policy.checked', 'policy', { ...basePayload, decision });
    await transition('validating', 'policy_checked');

    if (!decision.allowed) {
      const result = failedToolResult(
        request.toolId,
        invocationId,
        'TOOL_POLICY_DENIED',
        decision.reason ?? 'Policy denied tool: ' + request.toolId,
        'policy',
        'denied'
      );
      await record('tool.call.rejected', 'rejected', {
        ...basePayload,
        decision,
        error: result.error,
      });
      return result;
    }

    const cacheOperation = async <T>(
      operation: 'get' | 'set' | 'delete' | 'verify',
      task: () => Promise<T>,
      fallback: T,
      cacheKey?: string
    ): Promise<T> => {
      try {
        return await runToolCacheOperation(operation, task, this.resultCacheTimeoutMs);
      } catch (error) {
        await record('tool.cache.bypass', `cache-${operation}-failed`, {
          ...basePayload,
          reason: 'cache_operation_failed',
          cacheOperation: operation,
          cacheKey,
          code: toolCacheErrorCode(error),
        });
        if (this.resultCacheFailureMode === 'strict') throw error;
        return fallback;
      }
    };

    let cacheValidity: ToolCacheValidityRecord | undefined;
    const cachePolicy = spec.cache;
    const externalStateVersion =
      typeof request.context.metadata?.externalStateVersion === 'string' &&
      request.context.metadata.externalStateVersion.length > 0
        ? request.context.metadata.externalStateVersion
        : undefined;
    const hasSensitiveOutput = Boolean(spec.output?.sensitivePaths?.length);
    const cacheAllowed = Boolean(
      this.resultCache &&
      cachePolicy &&
      cachePolicy.mode === 'result' &&
      (spec.sideEffectLevel === 'none' || spec.sideEffectLevel === 'read') &&
      (spec.sideEffectLevel !== 'read' || externalStateVersion) &&
      !hasSensitiveOutput &&
      (!cachePolicy.allowForSideEffectLevels ||
        cachePolicy.allowForSideEffectLevels.includes(spec.sideEffectLevel))
    );
    if (cacheAllowed && cachePolicy) {
      const resultCache = this.resultCache!;
      const snapshot = request.context.contractSnapshotRef
        ? await this.snapshotStore?.get(request.context.contractSnapshotRef)
        : null;
      const validityInput = {
        toolId: spec.id,
        toolRevision: spec.revision,
        inputHash: hashToolInput(executionRequest.input),
        scopeHash: toolInvocationScopeHash(request),
        policyRevision: resolvePolicyRevision(decision, request),
        contractSnapshotHash: snapshot?.snapshotHash,
        capabilityHash:
          spec.sourceRef?.capabilityHash ?? spec.sourceRef?.mcpCapabilityHash,
        externalStateVersion,
      };
      const key = createToolCacheValidityKey(validityInput);
      cacheValidity = {
        ...validityInput,
        key,
        validUntil: cachePolicy.ttlSeconds
          ? new Date(Date.parse(this.now()) + cachePolicy.ttlSeconds * 1000).toISOString()
          : undefined,
      };
      await record('tool.cache.lookup', 'cache-lookup', { ...basePayload, cacheKey: key });
      const cachedValue = await cacheOperation('get', () => resultCache.get(key), null, key);
      let cached: ToolResultCacheEntry | null = null;
      if (cachedValue) {
        try {
          const validated = validateToolResultCacheEntry(
            cachedValue,
            this.resultCacheMaxEntryBytes
          );
          if (
            !isToolResultCacheEntryUsable(
              validated,
              cacheValidity,
              cachePolicy.ttlSeconds,
              this.now()
            )
          ) {
            throw new ToolResultCacheValidationError(
              'Tool result cache validity does not match the current invocation.'
            );
          }
          cached = validated;
        } catch (error) {
          await record('tool.cache.bypass', 'cache-entry-rejected', {
            ...basePayload,
            reason: 'cache_entry_corrupt_or_mismatched',
            cacheKey: key,
            code: toolCacheErrorCode(error),
          });
          if (resultCache.delete) {
            await cacheOperation('delete', () => resultCache.delete!(key), undefined, key);
          }
        }
      }
      const cachedArtifactRefs = cached ? collectToolCacheArtifactRefs(cached.result) : [];
      if (cached && cachedArtifactRefs.length > 0) {
        if (!this.resultCacheArtifactVerifier) {
          await record('tool.cache.bypass', 'cache-artifact-verifier-unavailable', {
            ...basePayload,
            reason: 'artifact_verification_unavailable',
            cacheKey: key,
          });
          cached = null;
        } else {
          const verified = await cacheOperation(
            'verify',
            () =>
              this.resultCacheArtifactVerifier!.verify({
                toolId: spec.id,
                artifactRefs: cachedArtifactRefs,
                tenantId: request.context.tenantId ?? request.context.principal?.tenantId,
                userId: request.context.userId ?? request.context.principal?.userId,
                workspaceId: request.context.workspaceId ?? request.context.principal?.workspaceId,
              }),
            false,
            key
          );
          if (!verified) {
            await record('tool.cache.bypass', 'cache-artifact-verification-failed', {
              ...basePayload,
              reason: 'artifact_verification_failed',
              cacheKey: key,
            });
            if (resultCache.delete) {
              await cacheOperation('delete', () => resultCache.delete!(key), undefined, key);
            }
            cached = null;
          }
        }
      }
      if (cached) {
        await record('tool.cache.hit', 'cache-hit', { ...basePayload, cacheKey: key });
        await record('tool.call.completed', 'completed:cache-hit', {
          ...basePayload,
          cacheHit: true,
          durationMs: Date.now() - startedAt,
        });
        return {
          ...cached.result,
          toolId: request.toolId,
          invocationId,
          status: 'completed',
          attempts: 0,
          durationMs: Date.now() - startedAt,
        };
      }
      await record('tool.cache.miss', 'cache-miss', { ...basePayload, cacheKey: key });
    } else if (cachePolicy && cachePolicy.mode !== 'disabled') {
      const bypassReason = !this.resultCache
        ? 'cache_port_unavailable'
        : cachePolicy.mode !== 'result'
          ? 'cache_mode_not_supported'
          : hasSensitiveOutput
            ? 'sensitive_output_not_cacheable'
            : spec.sideEffectLevel === 'read' && !externalStateVersion
              ? 'external_state_version_required'
              : 'side_effect_not_cacheable';
      await record('tool.cache.bypass', 'cache-bypass', {
        ...basePayload,
        reason: bypassReason,
      });
    }

    const approvalRequired =
      Boolean(decision.requiresHumanReview) || Boolean(spec.humanApprovalPolicy?.required);
    const inputHash = hashToolInput(executionRequest.input);
    if (approvalRequired) {
      const existingRequest = await this.approvalStore.getRequest(invocationId);
      if (existingRequest?.status === 'rejected') {
        const result = failedToolResult(
          request.toolId,
          invocationId,
          'TOOL_APPROVAL_REJECTED',
          'Human approval was rejected for tool: ' + request.toolId,
          'approval',
          'denied'
        );
        await record('tool.call.rejected', 'rejected:approval', {
          ...basePayload,
          approvalRequest: existingRequest,
          error: result.error,
        });
        return result;
      }

      const grant = await this.approvalStore.getGrant(invocationId);
      if (
        grant &&
        !isApprovalGrantValid(
          grant,
          request.toolId,
          inputHash,
          this.now(),
          spec.revision,
          request.context.contractSnapshotRef,
          request.context.principal?.principalId ?? request.context.principal?.id
        )
      ) {
        const result = failedToolResult(
          request.toolId,
          invocationId,
          'TOOL_APPROVAL_INVALID',
          'Approval grant does not match this tool invocation.',
          'approval',
          'denied'
        );
        await record('tool.call.rejected', 'rejected:approval-mismatch', {
          ...basePayload,
          error: result.error,
        });
        return result;
      }

      if (!grant) {
        const requestedAt = this.now();
        const approvalTimeoutMs = spec.humanApprovalPolicy?.timeoutPolicy?.timeoutMs;
        const approvalRequest = await this.approvalStore.requestApproval({
          id: invocationId + ':approval',
          invocationId,
          toolId: request.toolId,
          toolRevision: spec.revision,
          contractSnapshotRef: request.context.contractSnapshotRef,
          principalId: request.context.principal?.principalId ?? request.context.principal?.id,
          policyDecisionRef: decision.policyId,
          inputHash,
          runId: request.context.runId,
          stepId: request.context.stepId,
          userId: request.context.userId,
          reason: decision.reason ?? spec.humanApprovalPolicy?.reason,
          requestedAt,
          expiresAt:
            approvalTimeoutMs === undefined
              ? undefined
              : new Date(Date.parse(requestedAt) + approvalTimeoutMs).toISOString(),
          status: 'pending',
        });
        await record('human.review.requested', 'human-review', {
          ...basePayload,
          approvalRequest,
        });
        await this.metric('tool_approval_required_total', 'counter', 1, {
          tool_id: spec.id,
        });
        await transition('policy_checked', 'waiting_approval', {
          approvalRequest,
        });
        return {
          toolId: request.toolId,
          invocationId,
          status: 'human_review_required',
          error: toolCallError(
            'TOOL_APPROVAL_REQUIRED',
            approvalRequest.reason ?? 'Tool requires human approval: ' + request.toolId,
            'approval'
          ),
          approvalRequest,
        };
      }

      await transition('policy_checked', 'approved');
      await record('human.review.approved', 'human-review-approved', {
        ...basePayload,
        grant,
      });
      await record('human.review.resolved', 'human-review-resolved', {
        ...basePayload,
        grant,
      });
    }

    await transition(approvalRequired ? 'approved' : 'policy_checked', 'running', {
      startedAt: this.now(),
    });
    await record('tool.call.approved', 'approved', { ...basePayload, decision });
    await record('tool.call.started', 'started', basePayload);
    if (spec.source === 'mcp') {
      await record('mcp.call.started', 'mcp-started', {
        ...basePayload,
        serverId: spec.sourceRef?.serverId ?? spec.sourceRef?.mcpServerId,
        capabilityId:
          spec.sourceRef?.capabilityId ?? spec.sourceRef?.mcpCapabilityId ?? request.toolId,
      });
    }

    for (const middleware of this.middleware) {
      await middleware.beforeExecution?.(middlewareContext);
    }

    const reportProgress = async (update: ToolProgressUpdate): Promise<void> => {
      await record('tool.progress.reported', 'progress', {
        ...basePayload,
        update,
      });
      await request.context.reportProgress?.(update);
    };

    const maxAttempts = Math.max(1, spec.retryPolicy?.maxAttempts ?? 1);
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      await this.invocationStore.update(invocationId, {
        attemptCount: attempt,
        updatedAt: this.now(),
      });
      try {
        const rawOutput = await executeWithTimeout(
          (signal) =>
            adapter.execute({
              toolId: executionRequest.toolId,
              input: executionRequest.input,
              context: {
                ...request.context,
                invocationId,
                signal,
                abortSignal: signal,
                reportProgress,
              },
            }),
          spec.timeoutPolicy?.timeoutMs,
          invocationController.signal,
          async () => {
            await this.invocationStore.update(invocationId, {
              lateResultState: 'quarantined',
              updatedAt: this.now(),
            });
            await record('tool.call.late_result', 'late-result:' + attempt, {
              ...basePayload,
              attempt,
              disposition: 'quarantined',
            });
            await this.metric('tool_late_result_total', 'counter', 1, {
              tool_id: spec.id,
            });
          }
        );
        let envelope = toolExecutionEnvelope(rawOutput);
        for (const middleware of this.middleware) {
          const next = await middleware.afterExecution?.(
            { ...middlewareContext, attempt },
            envelope
          );
          if (next) envelope = next;
        }
        const validatedOutput = envelope.output;
        const outputValidation = spec.outputSchema
          ? validateToolInput(spec.outputSchema, validatedOutput)
          : undefined;
        if (outputValidation && !outputValidation.valid) {
          const result = failedToolResult(
            request.toolId,
            invocationId,
            'TOOL_OUTPUT_INVALID',
            outputValidation.error ?? 'Tool output failed schema validation.',
            'output_validation',
            'failed',
            { issues: outputValidation.issues }
          );
          await record('tool.call.failed', 'failed:output-validation:' + attempt, {
            ...basePayload,
            error: result.error,
            attempts: attempt,
          });
          await record('tool.output.invalid', 'output-invalid:' + attempt, {
            ...basePayload,
            error: result.error,
            attempt,
          });
          return result;
        }

        await record('tool.output.validated', 'output-validated:' + attempt, {
          ...basePayload,
          outputHash: hashToolInput(validatedOutput),
          attempt,
        });

        envelope = await this.applyOutputLimit(spec, invocationId, envelope);
        const output = envelope.output;
        if (
          this.observationPort &&
          spec.semantics.resultSemantics === 'observation' &&
          output !== undefined
        ) {
          const observationRef = await this.observationPort.record({
            invocationId,
            toolId: spec.id,
            toolRevision: spec.revision,
            runId: request.context.runId,
            stepId: request.context.stepId,
            inputHash: hashToolInput(executionRequest.input),
            outputHash: hashToolInput(output),
            value: output,
            artifactRefs: envelope.artifactRefs,
            provenance: {
              source: spec.source,
              sourceRef: spec.sourceRef,
              contractSnapshotRef: request.context.contractSnapshotRef,
              principalId: request.context.principal?.principalId ?? request.context.principal?.id,
            },
          });
          envelope = {
            ...envelope,
            observationRefs: Array.from(
              new Set([...(envelope.observationRefs ?? []), observationRef])
            ),
          };
        }

        const auditedOutput = auditToolValue(spec.auditPolicy, 'output', output);
        if (spec.source === 'mcp') {
          await record('mcp.call.completed', 'mcp-completed:' + attempt, {
            ...basePayload,
            serverId: spec.sourceRef?.serverId ?? spec.sourceRef?.mcpServerId,
            capabilityId:
              spec.sourceRef?.capabilityId ??
              spec.sourceRef?.mcpCapabilityId ??
              request.toolId,
            ...(auditedInput.included ? { input: auditedInput.value } : {}),
            ...(auditedOutput.included ? { output: auditedOutput.value } : {}),
            attempts: attempt,
          });
        }
        const durationMs = Date.now() - startedAt;
        await record('tool.call.completed', 'completed', {
          ...basePayload,
          ...(auditedInput.included ? { input: auditedInput.value } : {}),
          ...(auditedOutput.included ? { output: auditedOutput.value } : {}),
          attempts: attempt,
          durationMs,
        });
        const result: ToolCallResult = {
          toolId: request.toolId,
          invocationId,
          status: 'completed',
          output,
          content: envelope.content,
          artifactRefs: envelope.artifactRefs,
          observationRefs: envelope.observationRefs,
          externalReceipt: envelope.externalReceipt,
          attempts: attempt,
          durationMs,
        };
        if (cacheValidity && this.resultCache) {
          const resultArtifactRefs = collectToolCacheArtifactRefs(result);
          if (resultArtifactRefs.length > 0 && !this.resultCacheArtifactVerifier) {
            await record('tool.cache.bypass', 'cache-write-artifact-verifier-unavailable', {
              ...basePayload,
              reason: 'artifact_verification_unavailable',
              cacheKey: cacheValidity.key,
            });
            return result;
          }
          const wrote = await cacheOperation(
            'set',
            async () => {
              await this.resultCache!.set({
                schemaVersion: '1.0',
                keyVersion: '1',
                validity: cacheValidity,
                result: projectToolResultForCache(result),
                createdAt: this.now(),
              });
              return true;
            },
            false,
            cacheValidity.key
          );
          if (wrote) {
            await record('tool.cache.write', 'cache-write', {
              ...basePayload,
              cacheKey: cacheValidity.key,
            });
          }
        }
        return result;
      } catch (error) {
        for (const middleware of this.middleware) {
          await middleware.onError?.({ ...middlewareContext, attempt }, error);
        }
        const executionTerminalState = executionTerminalStateOf(error);
        const executionContext = frameworkErrorContext(error);
        const cancelled =
          invocationController.signal.aborted || executionTerminalState === 'cancelled';
        if (cancelled) {
          const result = failedToolResult(
            request.toolId,
            invocationId,
            'TOOL_CANCELLED',
            invocationController.signal.aborted
              ? String(invocationController.signal.reason ?? 'Tool invocation cancelled.')
              : error instanceof Error
                ? error.message
                : 'Execution provider cancelled the Tool invocation.',
            'execution',
            'cancelled',
            executionContext
          );
          await record('tool.call.cancelled', 'cancelled:' + attempt, {
            ...basePayload,
            attempt,
            error: result.error,
          });
          return result;
        }
        const timedOut =
          error instanceof ToolTimeoutError || executionTerminalState === 'timed_out';
        const message = error instanceof Error ? error.message : String(error);
        let timeoutReconciliation: ToolReceiptReconciliation | undefined;
        let sideEffectTimeoutRetrySafe = !hasExternalSideEffect(spec.sideEffectLevel);
        if (timedOut) {
          await this.metric('tool_timeout_total', 'counter', 1, { tool_id: spec.id });
          await record('tool.call.timeout', 'timeout:' + attempt, {
            ...basePayload,
            attempt,
            timeoutMs: spec.timeoutPolicy?.timeoutMs,
          });
          if (hasExternalSideEffect(spec.sideEffectLevel)) {
            timeoutReconciliation = this.receiptReconciler
              ? await this.receiptReconciler.reconcile({
                  invocationId,
                  tool: spec,
                  call: executionRequest,
                  attempt,
                })
              : { state: 'unknown' };
            sideEffectTimeoutRetrySafe = timeoutReconciliation.state === 'not_committed';
            await this.invocationStore.update(invocationId, {
              lateResultState: timeoutReconciliation.state === 'committed' ? 'accepted' : 'pending',
              externalReceipt: timeoutReconciliation.receipt,
              updatedAt: this.now(),
            });
            await record('tool.external_receipt.reconciled', 'receipt-reconciled:' + attempt, {
              ...basePayload,
              attempt,
              reconciliation: timeoutReconciliation,
            });
          }
          if (spec.timeoutPolicy?.onTimeout === 'human_review') {
            await record('human.review.requested', 'timeout-human-review:' + attempt, {
              ...basePayload,
              reason: message,
              attempt,
              reconciliation: timeoutReconciliation,
            });
            const result = failedToolResult(
              request.toolId,
              invocationId,
              'TOOL_TIMEOUT_REQUIRES_REVIEW',
              message,
              'timeout',
              'human_review_required'
            );
            if (timeoutReconciliation?.receipt) {
              result.externalReceipt = timeoutReconciliation.receipt;
            }
            return result;
          }
        }

        if (
          attempt < maxAttempts &&
          shouldRetry(
            error,
            spec,
            timedOut,
            request.context.idempotencyKey,
            sideEffectTimeoutRetrySafe
          )
        ) {
          await this.metric('tool_retry_total', 'counter', 1, { tool_id: spec.id });
          await record('tool.call.retrying', 'retrying:' + attempt, {
            ...basePayload,
            attempt,
            nextAttempt: attempt + 1,
            error: message,
          });
          await sleep(spec.retryPolicy?.backoffMs ?? 0);
          continue;
        }

        if (spec.source === 'mcp') {
          await record('mcp.call.failed', 'mcp-failed:' + attempt, {
            ...basePayload,
            serverId: spec.sourceRef?.serverId ?? spec.sourceRef?.mcpServerId,
            capabilityId:
              spec.sourceRef?.capabilityId ??
              spec.sourceRef?.mcpCapabilityId ??
              request.toolId,
            error: message,
            attempts: attempt,
          });
        }
        const executionFailureCode =
          executionTerminalState === 'unknown'
            ? 'TOOL_EXECUTION_UNKNOWN'
            : executionTerminalState === 'quarantined'
              ? 'TOOL_EXECUTION_QUARANTINED'
              : 'TOOL_EXECUTION_FAILED';
        const result = failedToolResult(
          request.toolId,
          invocationId,
          timedOut && timeoutReconciliation?.state !== 'not_committed'
            ? 'TOOL_EXTERNAL_COMMIT_UNCERTAIN'
            : timedOut
              ? 'TOOL_TIMEOUT'
              : executionFailureCode,
          message,
          timedOut ? 'timeout' : 'execution',
          'failed',
          { ...executionContext, attempts: attempt, executionTerminalState }
        );
        result.attempts = attempt;
        if (timeoutReconciliation?.receipt) {
          result.externalReceipt = timeoutReconciliation.receipt;
        }
        await record('tool.call.failed', 'failed:' + attempt, {
          ...basePayload,
          error: result.error,
          attempts: attempt,
        });
        return result;
      }
    }

    return failedToolResult(
      request.toolId,
      invocationId,
      'TOOL_NO_TERMINAL_RESULT',
      'Tool failed without a terminal result.',
      'execution'
    );
  }

  private async applyOutputLimit(
    spec: ResolvedToolSpec,
    invocationId: string,
    envelope: ToolExecutionEnvelope
  ): Promise<ToolExecutionEnvelope> {
    if (envelope.output === undefined) return envelope;
    const policy = spec.execution.outputLimit;
    if (!policy) return envelope;
    const serialized = stableStringify(envelope.output);
    if (Buffer.byteLength(serialized, 'utf-8') <= policy.maxInlineBytes) return envelope;
    if (policy.overflow === 'truncate') {
      return {
        ...envelope,
        output: serialized.slice(0, policy.maxInlineBytes),
        metadata: { ...envelope.metadata, truncated: true },
      };
    }
    if (policy.overflow === 'artifact' && this.artifactPort) {
      const artifactRef = await this.artifactPort.store({
        invocationId,
        toolId: spec.id,
        value: envelope.output,
        mimeType: 'application/json',
        metadata: { toolRevision: spec.revision },
      });
      return {
        ...envelope,
        output: { artifactRef },
        artifactRefs: [...(envelope.artifactRefs ?? []), artifactRef],
        content: [
          ...(envelope.content ?? []),
          { type: 'artifact', artifactRef, mimeType: 'application/json' },
        ],
      };
    }
    throw new FrameworkError({
      code: 'TOOL_OUTPUT_LIMIT_EXCEEDED',
      message: 'Tool output exceeds the inline byte limit.',
      context: {
        toolId: spec.id,
        maxInlineBytes: policy.maxInlineBytes,
        overflow: policy.overflow,
      },
    });
  }

  private async recordControlEvent(
    invocation: ToolInvocationRecord,
    type: FrameworkEventType,
    suffix: string,
    payload: Record<string, unknown>
  ): Promise<void> {
    await this.trace.record(
      createFrameworkEvent({
        id: invocation.id + ':control:' + (invocation.revision + 1) + ':' + suffix,
        type,
        runId: invocation.request.context.runId,
        stepId: invocation.request.context.stepId,
        sessionId: invocation.request.context.sessionId,
        agentId: invocation.request.context.agentId,
        fsmState:
          invocation.request.context.fsmState ??
          invocation.request.context.executionScope?.fsmState,
        payload: {
          invocationId: invocation.id,
          executionCycle: invocation.executionCycle,
          ...payload,
        },
      })
    );
  }

  private async metric(
    name: string,
    kind: TelemetryMetricKind,
    value: number,
    attributes?: Record<string, string | number | boolean>
  ): Promise<void> {
    if (!this.telemetry) return;
    await this.telemetry.recordMetric({
      name,
      kind,
      value,
      recordedAt: this.now(),
      attributes,
    });
  }

  private async idempotencyConflictResult(
    request: ToolCallRequest,
    requestedFingerprint: string,
    existingFingerprint: string
  ): Promise<ToolCallResult> {
    const invocationId = resolveInvocationId(request);
    const result = failedToolResult(
      request.toolId,
      invocationId,
      'TOOL_IDEMPOTENCY_CONFLICT',
      'Idempotency key is already bound to different input, scope, policy, or Tool revision.',
      'authorization',
      'conflict'
    );
    await this.trace.record(
      createFrameworkEvent({
        id: invocationId + ':idempotency-conflict',
        type: 'tool.idempotency.conflict',
        runId: request.context.runId,
        stepId: request.context.stepId,
        sessionId: request.context.sessionId,
        agentId: request.context.agentId,
        payload: {
          invocationId,
          toolId: request.toolId,
          idempotencyKey: request.context.idempotencyKey,
          requestedFingerprint,
          existingFingerprint,
        },
      })
    );
    await this.metric('tool_idempotency_conflict_total', 'counter', 1, {
      tool_id: request.toolId,
    });
    return result;
  }
}
export interface ToolProfileSpec extends VersionedSpec {
  toolRefs: SpecRef[];
  mcpProfileRefs?: SpecRef[];
  policyRefs?: SpecRef[];
  defaultPermissionScopes?: string[];
  contractSnapshotMode?: 'run' | 'state';
  lazyLoad?: boolean;
  maxLoadedTools?: number;
  metadata?: Record<string, unknown>;
  /** @deprecated Register Tool contracts separately and use toolRefs. */
  tools?: ToolSpec[];
}

export const toolProfileSpecSchema = z.object({
  id: z.string().min(1),
  version: z.string().min(1),
  revision: z.string().optional(),
  toolRefs: z.array(specRefSchema),
  mcpProfileRefs: z.array(specRefSchema).optional(),
  policyRefs: z.array(specRefSchema).optional(),
  defaultPermissionScopes: z.array(z.string()).optional(),
  contractSnapshotMode: z.enum(['run', 'state']).optional(),
  lazyLoad: z.boolean().optional(),
  maxLoadedTools: z.number().int().positive().optional(),
  metadata: z.record(z.unknown()).optional(),
  tools: z.array(z.lazy(() => toolSpecSchema)).optional(),
}) satisfies ZodType<ToolProfileSpec>;

export const toolSpecSchema = z.object({
  id: z.string().min(1),
  version: z.string().min(1),
  revision: z.string().optional(),
  name: z.string().optional(),
  displayName: z.string().optional(),
  description: z.string().min(1),
  instructions: z.string().optional(),
  tags: z.array(z.string()).optional(),
  inputSchema: jsonSchemaSchema,
  outputSchema: jsonSchemaSchema.optional(),
  input: toolSchemaSpecSchema.optional(),
  output: toolSchemaSpecSchema.optional(),
  sideEffectLevel: sideEffectLevelSchema,
  permissionScope: z.array(z.string()).optional(),
  preconditions: z.array(z.string()).optional(),
  postconditions: z.array(z.string()).optional(),
  timeoutPolicy: timeoutPolicySpecSchema.optional(),
  retryPolicy: retryPolicySpecSchema.optional(),
  auditPolicy: auditPolicySpecSchema.optional(),
  humanApprovalPolicy: humanReviewPolicySpecSchema.optional(),
  idempotencyPolicy: z
    .object({
      mode: z.enum(['none', 'optional', 'required']),
    })
    .optional(),
  source: z.enum(['local', 'mcp', 'http', 'plugin', 'hosted', 'execution', 'custom']).optional(),
  sourceRef: z
    .object({
      serverId: z.string().optional(),
      capabilityId: z.string().optional(),
      capabilityHash: z.string().optional(),
      trustLevel: z.enum(['trusted', 'reviewed', 'untrusted']).optional(),
      declarationSource: z.enum(['framework', 'user', 'server', 'unknown']).optional(),
      adapterId: z.string().optional(),
      handlerId: z.string().optional(),
      endpointRef: z.string().optional(),
      mcpServerId: z.string().optional(),
      mcpCapabilityId: z.string().optional(),
      mcpCapabilityHash: z.string().optional(),
      pluginId: z.string().optional(),
      hostedToolId: z.string().optional(),
      metadata: z.record(z.unknown()).optional(),
    })
    .optional(),
  semantics: toolSemanticSpecSchema.optional(),
  execution: toolExecutionPolicySpecSchema.optional(),
  governance: toolGovernanceSpecSchema.optional(),
  observability: toolObservabilitySpecSchema.optional(),
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
  replacedBy: z
    .object({
      id: z.string().min(1),
      version: z.string().optional(),
      revision: z.string().optional(),
    })
    .optional(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<ToolSpec>;

export const toolSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'description', 'inputSchema', 'sideEffectLevel'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    inputSchema: { type: 'object' },
    outputSchema: { type: 'object' },
    sideEffectLevel: {
      enum: ['none', 'read', 'write', 'external_effect', 'irreversible'],
    },
    permissionScope: { type: 'array', items: { type: 'string' } },
    preconditions: { type: 'array', items: { type: 'string' } },
    postconditions: { type: 'array', items: { type: 'string' } },
    timeoutPolicy: { type: 'object' },
    retryPolicy: { type: 'object' },
    auditPolicy: { type: 'object' },
    humanApprovalPolicy: { type: 'object' },
    idempotencyPolicy: { type: 'object' },
    source: { enum: ['local', 'mcp', 'http', 'plugin'] },
    sourceRef: { type: 'object' },
  },
  additionalProperties: false,
};

export const toolSpecExample: ToolSpec = {
  id: 'tool.search',
  version: '0.0.0',
  name: 'Search',
  description: 'Search local or external indexes through a governed tool call.',
  inputSchema: {
    type: 'object',
    required: ['query'],
    properties: {
      query: { type: 'string' },
    },
  },
  sideEffectLevel: 'read',
  timeoutPolicy: { timeoutMs: 5000, onTimeout: 'fail' },
  retryPolicy: { maxAttempts: 2 },
  auditPolicy: { enabled: true, includeInput: true, includeOutput: true },
  source: 'local',
};

export const toolSpecDefinition = defineSpecSchema<ToolSpec>({
  id: 'ToolSpec',
  zod: toolSpecSchema,
  jsonSchema: toolSpecJsonSchema,
  example: toolSpecExample,
});

export const toolProfileSpecDefinition = defineSpecSchema<ToolProfileSpec>({
  id: 'ToolProfileSpec',
  zod: toolProfileSpecSchema,
  jsonSchema: {
    type: 'object',
    required: ['id', 'version', 'toolRefs'],
    properties: {
      id: { type: 'string' },
      version: { type: 'string' },
      revision: { type: 'string' },
      toolRefs: { type: 'array', items: { type: 'object' } },
      mcpProfileRefs: { type: 'array', items: { type: 'object' } },
      policyRefs: { type: 'array', items: { type: 'object' } },
      defaultPermissionScopes: { type: 'array', items: { type: 'string' } },
      contractSnapshotMode: { enum: ['run', 'state'] },
      lazyLoad: { type: 'boolean' },
      maxLoadedTools: { type: 'number' },
      metadata: { type: 'object' },
      tools: { type: 'array', items: { type: 'object' } },
    },
    additionalProperties: false,
  },
  example: {
    id: 'tools.default',
    version: '1.0.0',
    toolRefs: [{ id: 'tool.search', version: '1.0.0' }],
    mcpProfileRefs: [{ id: 'mcp.default', version: '1.0.0' }],
    defaultPermissionScopes: ['search.read'],
    contractSnapshotMode: 'run',
    lazyLoad: true,
    maxLoadedTools: 20,
  },
});

export const toolSpecDefinitions = [toolSpecDefinition, toolProfileSpecDefinition] as const;
export const toolSpecJsonSchemas = exportSpecJsonSchemas(toolSpecDefinitions);

export function validateToolSpec(input: unknown): ToolSpec {
  return toolSpecDefinition.parse(input);
}

export function normalizeToolSpec(spec: ToolSpec): ResolvedToolSpec {
  const input = spec.input ?? createToolSchemaSpec(spec.inputSchema, { strict: true });
  const output =
    spec.output ??
    (spec.outputSchema ? createToolSchemaSpec(spec.outputSchema, { strict: true }) : undefined);
  const source = spec.source ?? 'local';
  const sourceRef = spec.sourceRef ? { ...spec.sourceRef } : undefined;
  const semantics: ToolSemanticSpec = spec.semantics ?? {
    sideEffectLevel: spec.sideEffectLevel,
    idempotency:
      spec.idempotencyPolicy?.mode === 'required' || spec.idempotencyPolicy?.mode === 'optional'
        ? 'caller_key'
        : 'none',
    resultSemantics: 'observation',
  };
  const execution: ToolExecutionPolicySpec = spec.execution ?? {
    timeout: spec.timeoutPolicy ?? { timeoutMs: 30_000, onTimeout: 'fail' },
    retry: spec.retryPolicy ?? { maxAttempts: 1 },
    cancellation: { mode: 'cooperative', gracePeriodMs: 500 },
    lateResult: { mode: 'quarantine' },
    outputLimit: {
      maxInlineBytes: output?.maxSerializedBytes ?? 256 * 1024,
      overflow: 'fail',
    },
  };
  const governance: ToolGovernanceSpec = spec.governance ?? {
    requiredPermissionScopes: [...(spec.permissionScope ?? [])],
    approvalPolicy: spec.humanApprovalPolicy,
    auditPolicy: spec.auditPolicy ?? {
      enabled: true,
      includeInput: true,
      includeOutput: true,
    },
  };
  const observability: ToolObservabilitySpec = spec.observability ?? {
    traceLevel: 'full_redacted',
    recordInput: governance.auditPolicy.includeInput !== false,
    recordOutput: governance.auditPolicy.includeOutput !== false,
    recordAttempts: true,
    recordPolicyDecision: true,
    metricsEnabled: true,
  };
  const contractWithoutRevision = {
    id: spec.id,
    version: spec.version,
    name: spec.name ?? spec.id,
    description: spec.description,
    input,
    output,
    source,
    sourceRef,
    semantics,
    execution,
    governance,
    observability,
    cache: spec.cache,
    streaming: spec.streaming,
    enabled: spec.enabled ?? true,
    deprecated: spec.deprecated ?? false,
  };
  return {
    ...spec,
    ...contractWithoutRevision,
    revision: spec.revision ?? hashToolContract(contractWithoutRevision),
    inputSchema: input.jsonSchema,
    outputSchema: output?.jsonSchema,
    sideEffectLevel: semantics.sideEffectLevel,
    permissionScope: governance.requiredPermissionScopes,
    timeoutPolicy: execution.timeout,
    retryPolicy: execution.retry,
    auditPolicy: governance.auditPolicy,
    humanApprovalPolicy: governance.approvalPolicy,
  } as ResolvedToolSpec;
}

export interface ToolSchemaValidationIssue {
  path: string;
  message: string;
}

export interface ToolSchemaValidationResult {
  valid: boolean;
  error?: string;
  issues: ToolSchemaValidationIssue[];
}

export function validateToolInput(schema: JsonSchema, input: unknown): ToolSchemaValidationResult {
  const issues: ToolSchemaValidationIssue[] = [];
  validateSchemaValue(schema, input, '$', issues);
  return {
    valid: issues.length === 0,
    error: issues.length
      ? issues.map((issue) => `${issue.path}: ${issue.message}`).join('; ')
      : undefined,
    issues,
  };
}

function resolveInvocationId(request: ToolCallRequest): string {
  return (
    request.context.invocationId ??
    [request.context.runId, request.context.stepId, request.toolId].join(':')
  );
}

function persistableToolRequest(request: ToolCallRequest, invocationId: string): ToolCallRequest {
  const {
    signal: _signal,
    abortSignal: _abortSignal,
    reportProgress: _reportProgress,
    ...context
  } = request.context;
  return {
    toolId: request.toolId,
    input: request.input,
    context: { ...context, invocationId },
  };
}

function toolInvocationStatusFromResult(result: ToolCallResult): ToolInvocationStatus {
  if (result.status === 'human_review_required') return 'waiting_approval';
  if (result.status === 'completed') return 'completed';
  if (result.status === 'denied') return 'denied';
  if (result.status === 'cancelled') return 'cancelled';
  if (result.status === 'conflict') return 'conflict';
  return 'failed';
}

function toolCallError(
  code: string,
  message: string,
  phase: ToolExecutionPhase,
  retryable = false,
  details?: Record<string, unknown>
): ToolCallError {
  return { code, message, phase, retryable, details };
}

function failedToolResult(
  toolId: string,
  invocationId: string,
  code: string,
  message: string,
  phase: ToolExecutionPhase,
  status: ToolCallResult['status'] = 'failed',
  details?: Record<string, unknown>
): ToolCallResult {
  return {
    toolId,
    invocationId,
    status,
    error: toolCallError(code, message, phase, false, details),
  };
}

function hashToolInput(input: unknown): string {
  return createHash('sha256').update(stableStringify(input)).digest('hex');
}

interface ToolIdempotencyIdentity {
  lookupKey: string;
  scopeHash: string;
  fingerprint: string;
  policyRevision: string;
}

function toolIdempotencyIdentity(
  request: ToolCallRequest,
  spec: ResolvedToolSpec | null
): ToolIdempotencyIdentity | null {
  const idempotencyKey = request.context.idempotencyKey;
  if (!idempotencyKey) return null;
  const scopeHash = toolInvocationScopeHash(request);
  const configuredPolicyRevision = request.context.metadata?.policyRevision;
  const policyRevision =
    typeof configuredPolicyRevision === 'string'
      ? configuredPolicyRevision
      : hashToolInput(
          spec?.governance.policyRefs ?? request.context.executionScope?.policyRefs ?? []
        );
  const fingerprint = hashToolInput({
    toolId: request.toolId,
    toolRevision: spec?.revision,
    input: request.input,
    scopeHash,
    idempotencyKey,
    policyRevision,
  });
  return {
    lookupKey: [request.toolId, scopeHash, idempotencyKey].join('\u0000'),
    scopeHash,
    fingerprint,
    policyRevision,
  };
}

function toolInvocationScopeHash(request: ToolCallRequest): string {
  return hashToolInput({
    tenantId: request.context.tenantId ?? request.context.principal?.tenantId,
    userId: request.context.userId ?? request.context.principal?.userId,
    workspaceId: request.context.workspaceId ?? request.context.principal?.workspaceId,
    sessionId: request.context.sessionId,
    runId: request.context.runId,
    agentId: request.context.agentId ?? request.context.principal?.agentId,
  });
}

function resolvePolicyRevision(decision: PolicyDecision, request: ToolCallRequest): string {
  const explicit = decision.metadata?.policyRevision ?? request.context.metadata?.policyRevision;
  return typeof explicit === 'string'
    ? explicit
    : hashToolInput({ policyId: decision.policyId, ruleId: decision.ruleId });
}

function stableStringify(value: unknown): string {
  const seen = new WeakSet<object>();
  const normalize = (candidate: unknown): unknown => {
    if (!candidate || typeof candidate !== 'object') return candidate;
    if (seen.has(candidate)) return '[Circular]';
    seen.add(candidate);
    if (Array.isArray(candidate)) return candidate.map(normalize);
    return Object.fromEntries(
      Object.entries(candidate as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, nested]) => [key, normalize(nested)])
    );
  };
  return JSON.stringify(normalize(value));
}

function isApprovalGrantValid(
  grant: ToolApprovalGrant,
  toolId: string,
  inputHash: string,
  now: string,
  toolRevision?: string,
  contractSnapshotRef?: string,
  principalId?: string
): boolean {
  if (grant.toolId !== toolId || grant.inputHash !== inputHash) return false;
  if (grant.toolRevision && grant.toolRevision !== toolRevision) return false;
  if (grant.contractSnapshotRef && grant.contractSnapshotRef !== contractSnapshotRef) return false;
  if (grant.principalId && grant.principalId !== principalId) return false;
  return !grant.expiresAt || Date.parse(grant.expiresAt) > Date.parse(now);
}

function auditToolValue(
  policy: AuditPolicySpec | undefined,
  direction: 'input' | 'output',
  value: unknown
): { included: boolean; value?: unknown } {
  if (policy?.enabled === false) return { included: false };
  const included =
    direction === 'input' ? policy?.includeInput !== false : policy?.includeOutput !== false;
  if (!included) return { included: false };
  return {
    included: true,
    value: redactAuditPaths(value, policy?.redactPaths ?? [], direction),
  };
}

function redactAuditPaths(value: unknown, paths: string[], direction: 'input' | 'output'): unknown {
  let clone: unknown;
  try {
    clone = JSON.parse(JSON.stringify(value));
  } catch {
    return '[Unserializable]';
  }
  if (!clone || typeof clone !== 'object') return clone;
  for (const rawPath of paths) {
    const normalized = rawPath
      .replace(/^\$\.?/, '')
      .replace(new RegExp('^' + direction + '\\.'), '');
    if (!normalized || normalized === direction) continue;
    const segments = normalized.split('.').filter(Boolean);
    let current: unknown = clone;
    for (let index = 0; index < segments.length - 1; index += 1) {
      if (!current || typeof current !== 'object') break;
      current = (current as Record<string, unknown>)[segments[index]];
    }
    if (current && typeof current === 'object' && segments.length) {
      (current as Record<string, unknown>)[segments[segments.length - 1]] = '[REDACTED]';
    }
  }
  return clone;
}

async function executeWithTimeout<T>(
  work: (signal: AbortSignal) => Promise<T>,
  timeoutMs?: number,
  parentSignal?: AbortSignal,
  onLateResult?: (value: T) => Promise<void> | void
): Promise<T> {
  const controller = new AbortController();
  let terminalReason: 'timeout' | 'cancelled' | undefined;
  let rejectCancellation: ((error: Error) => void) | undefined;
  const cancellation = new Promise<T>((_resolve, reject) => {
    rejectCancellation = reject;
  });
  const abort = (): void => {
    terminalReason = 'cancelled';
    controller.abort(parentSignal?.reason);
    rejectCancellation?.(new Error(String(parentSignal?.reason ?? 'Tool invocation cancelled.')));
  };
  if (parentSignal?.aborted) abort();
  else parentSignal?.addEventListener('abort', abort, { once: true });

  const workPromise = Promise.resolve().then(() => work(controller.signal));
  workPromise.then(
    (value) => {
      if (terminalReason) void onLateResult?.(value);
    },
    () => undefined
  );
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    const candidates: Promise<T>[] = [workPromise, cancellation];
    if (timeoutMs && timeoutMs > 0) {
      candidates.push(
        new Promise<T>((_resolve, reject) => {
          timeout = setTimeout(() => {
            terminalReason = 'timeout';
            controller.abort();
            reject(new ToolTimeoutError(timeoutMs));
          }, timeoutMs);
        })
      );
    }
    return await Promise.race(candidates);
  } finally {
    if (timeout) clearTimeout(timeout);
    parentSignal?.removeEventListener('abort', abort);
  }
}

function toolExecutionEnvelope(value: unknown): ToolExecutionEnvelope {
  if (
    value &&
    typeof value === 'object' &&
    (value as { kind?: unknown }).kind === 'tool_execution_envelope'
  ) {
    return value as ToolExecutionEnvelope;
  }
  return { kind: 'tool_execution_envelope', output: value };
}

function shouldRetry(
  error: unknown,
  spec: ToolSpec,
  timedOut: boolean,
  idempotencyKey?: string,
  sideEffectTimeoutRetrySafe = false
): boolean {
  if (
    spec.sideEffectLevel === 'write' ||
    spec.sideEffectLevel === 'external_effect' ||
    spec.sideEffectLevel === 'irreversible'
  ) {
    if (!idempotencyKey) return false;
  }
  if (timedOut) {
    if (hasExternalSideEffect(spec.sideEffectLevel) && !sideEffectTimeoutRetrySafe) return false;
    return spec.timeoutPolicy?.onTimeout === 'retry';
  }
  if (!spec.retryPolicy) {
    return false;
  }
  const retryableCodes = spec.retryPolicy.retryableCodes;
  if (!retryableCodes?.length) {
    return true;
  }
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code?: unknown }).code)
      : undefined;
  return !!code && retryableCodes.includes(code);
}

function executionTerminalStateOf(
  error: unknown
): 'failed' | 'timed_out' | 'cancelled' | 'unknown' | 'quarantined' | undefined {
  if (!error || typeof error !== 'object' || !('terminalState' in error)) return undefined;
  const terminalState = (error as { terminalState?: unknown }).terminalState;
  return terminalState === 'failed' ||
    terminalState === 'timed_out' ||
    terminalState === 'cancelled' ||
    terminalState === 'unknown' ||
    terminalState === 'quarantined'
    ? terminalState
    : undefined;
}

function frameworkErrorContext(error: unknown): Record<string, unknown> | undefined {
  if (!error || typeof error !== 'object' || !('context' in error)) return undefined;
  const context = (error as { context?: unknown }).context;
  return context && typeof context === 'object' && !Array.isArray(context)
    ? (context as Record<string, unknown>)
    : undefined;
}

function hasExternalSideEffect(sideEffectLevel: SideEffectLevel): boolean {
  return (
    sideEffectLevel === 'write' ||
    sideEffectLevel === 'external_effect' ||
    sideEffectLevel === 'irreversible'
  );
}

function healthyProvider(details?: Record<string, unknown>): ProviderHealth {
  return {
    status: 'healthy',
    checkedAt: new Date().toISOString(),
    details,
  };
}

function sleep(ms: number): Promise<void> {
  if (ms <= 0) {
    return Promise.resolve();
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toolTracePayload(toolId: string, spec: ToolSpec): Record<string, unknown> {
  return {
    toolId,
    source: spec.source ?? 'local',
    sourceRef: spec.sourceRef,
    sideEffectLevel: spec.sideEffectLevel,
    permissionScope: spec.permissionScope,
  };
}

function validateSchemaValue(
  schema: JsonSchema,
  value: unknown,
  path: string,
  issues: ToolSchemaValidationIssue[]
): void {
  const allOf = schemaArrayKeyword(schema, 'allOf');
  if (allOf) {
    for (const nested of allOf) {
      validateSchemaValue(nested, value, path, issues);
    }
  }

  const anyOf = schemaArrayKeyword(schema, 'anyOf');
  if (anyOf && !anyOf.some((nested) => schemaMatches(nested, value))) {
    issues.push({ path, message: 'must match at least one anyOf schema' });
  }

  const oneOf = schemaArrayKeyword(schema, 'oneOf');
  if (oneOf) {
    const matches = oneOf.filter((nested) => schemaMatches(nested, value)).length;
    if (matches !== 1) {
      issues.push({ path, message: 'must match exactly one oneOf schema' });
    }
  }

  if (schema.enum && !schema.enum.some((candidate) => deepEqual(candidate, value))) {
    issues.push({ path, message: 'must be one of the declared enum values' });
    return;
  }

  const allowedTypes = schemaTypes(schema);
  if (allowedTypes.length > 0 && !allowedTypes.some((type) => typeMatches(type, value))) {
    issues.push({ path, message: `must be ${allowedTypes.join(' or ')}` });
    return;
  }

  if (allowedTypes.includes('object') || shouldValidateObject(schema, value)) {
    validateObjectSchema(schema, value, path, issues);
  }
  if (allowedTypes.includes('array') || shouldValidateArray(schema, value)) {
    validateArraySchema(schema, value, path, issues);
  }
  if (typeof value === 'string') {
    validateStringSchema(schema, value, path, issues);
  }
  if (typeof value === 'number') {
    validateNumberSchema(schema, value, path, issues);
  }
}

function validateObjectSchema(
  schema: JsonSchema,
  value: unknown,
  path: string,
  issues: ToolSchemaValidationIssue[]
): void {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    issues.push({ path, message: 'must be an object' });
    return;
  }
  const record = value as Record<string, unknown>;
  const properties = schema.properties ?? {};
  for (const field of schema.required ?? []) {
    if (!Object.prototype.hasOwnProperty.call(record, field)) {
      issues.push({ path, message: `missing required field: ${field}` });
    }
  }
  for (const [field, nested] of Object.entries(properties)) {
    if (Object.prototype.hasOwnProperty.call(record, field)) {
      validateSchemaValue(nested, record[field], `${path}.${field}`, issues);
    }
  }
  const extraKeys = Object.keys(record).filter((field) => !(field in properties));
  if (schema.additionalProperties === false) {
    for (const field of extraKeys) {
      issues.push({ path: `${path}.${field}`, message: 'additional property is not allowed' });
    }
  } else if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
    for (const field of extraKeys) {
      validateSchemaValue(schema.additionalProperties, record[field], `${path}.${field}`, issues);
    }
  }
}

function validateArraySchema(
  schema: JsonSchema,
  value: unknown,
  path: string,
  issues: ToolSchemaValidationIssue[]
): void {
  if (!Array.isArray(value)) {
    issues.push({ path, message: 'must be an array' });
    return;
  }
  if (schema.items) {
    value.forEach((item, index) => {
      validateSchemaValue(schema.items as JsonSchema, item, `${path}[${index}]`, issues);
    });
  }
  const minItems = numberKeyword(schema, 'minItems');
  if (minItems !== undefined && value.length < minItems) {
    issues.push({ path, message: `must contain at least ${minItems} items` });
  }
  const maxItems = numberKeyword(schema, 'maxItems');
  if (maxItems !== undefined && value.length > maxItems) {
    issues.push({ path, message: `must contain at most ${maxItems} items` });
  }
}

function validateStringSchema(
  schema: JsonSchema,
  value: string,
  path: string,
  issues: ToolSchemaValidationIssue[]
): void {
  const minLength = numberKeyword(schema, 'minLength');
  if (minLength !== undefined && value.length < minLength) {
    issues.push({ path, message: `must contain at least ${minLength} characters` });
  }
  const maxLength = numberKeyword(schema, 'maxLength');
  if (maxLength !== undefined && value.length > maxLength) {
    issues.push({ path, message: `must contain at most ${maxLength} characters` });
  }
  const pattern = stringKeyword(schema, 'pattern');
  if (pattern) {
    const compiled = compileToolSchemaPattern(pattern);
    if ('error' in compiled) {
      issues.push({ path, message: compiled.error });
    } else if (value.length > 1_000_000) {
      issues.push({ path, message: 'exceeds the safe pattern input limit' });
    } else if (!compiled.expression.test(value)) {
      issues.push({ path, message: `must match pattern ${pattern}` });
    }
  }
}

function compileToolSchemaPattern(pattern: string): { expression: RegExp } | { error: string } {
  if (pattern.length > 512) return { error: 'schema pattern exceeds 512 characters' };
  if (
    /\\[1-9]/.test(pattern) ||
    /\((?:[^()]|\\.)*[*+}](?:[^()]|\\.)*\)[*+{]/.test(pattern) ||
    /\((?:[^()]|\\.)*\|(?:[^()]|\\.)*\)[*+{]/.test(pattern)
  ) {
    return { error: 'schema pattern uses unsafe backtracking constructs' };
  }
  try {
    return { expression: new RegExp(pattern) };
  } catch (error) {
    return {
      error: `schema pattern is invalid: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

function validateNumberSchema(
  schema: JsonSchema,
  value: number,
  path: string,
  issues: ToolSchemaValidationIssue[]
): void {
  const minimum = numberKeyword(schema, 'minimum');
  if (minimum !== undefined && value < minimum) {
    issues.push({ path, message: `must be greater than or equal to ${minimum}` });
  }
  const maximum = numberKeyword(schema, 'maximum');
  if (maximum !== undefined && value > maximum) {
    issues.push({ path, message: `must be less than or equal to ${maximum}` });
  }
}

function schemaMatches(schema: JsonSchema, value: unknown): boolean {
  const issues: ToolSchemaValidationIssue[] = [];
  validateSchemaValue(schema, value, '$', issues);
  return issues.length === 0;
}

function schemaArrayKeyword(schema: JsonSchema, key: string): JsonSchema[] | undefined {
  const value = schema[key];
  return Array.isArray(value) ? value.filter(isJsonSchema) : undefined;
}

function schemaTypes(schema: JsonSchema): string[] {
  const type = schema.type;
  if (Array.isArray(type))
    return type.filter((value): value is string => typeof value === 'string');
  return typeof type === 'string' ? [type] : [];
}

function typeMatches(type: string, value: unknown): boolean {
  switch (type) {
    case 'object':
      return !!value && typeof value === 'object' && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    case 'integer':
      return Number.isInteger(value);
    case 'number':
      return typeof value === 'number' && Number.isFinite(value);
    case 'string':
      return typeof value === 'string';
    case 'boolean':
      return typeof value === 'boolean';
    case 'null':
      return value === null;
    default:
      return true;
  }
}

function shouldValidateObject(schema: JsonSchema, value: unknown): boolean {
  return (
    !!schema.properties ||
    !!schema.required?.length ||
    (!!value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      schema.additionalProperties !== undefined)
  );
}

function shouldValidateArray(schema: JsonSchema, value: unknown): boolean {
  return (
    Array.isArray(value) &&
    (!!schema.items || schema.minItems !== undefined || schema.maxItems !== undefined)
  );
}

function numberKeyword(schema: JsonSchema, key: string): number | undefined {
  const value = schema[key];
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function stringKeyword(schema: JsonSchema, key: string): string | undefined {
  const value = schema[key];
  return typeof value === 'string' ? value : undefined;
}

function isJsonSchema(value: unknown): value is JsonSchema {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function projectToolResultForCache(result: ToolCallResult): ToolCachedResultProjection {
  return cloneToolCacheValue({
    output: result.output,
    content: result.content,
    artifactRefs: result.artifactRefs,
  });
}

export function validateToolResultCacheEntry(
  value: unknown,
  maxEntryBytes = 1024 * 1024
): ToolResultCacheEntry {
  let serialized: string;
  try {
    serialized = JSON.stringify(value);
  } catch (error) {
    throw new ToolResultCacheValidationError(
      `Tool result cache entry is not JSON-safe: ${error instanceof Error ? error.message : String(error)}`
    );
  }
  if (!serialized) {
    throw new ToolResultCacheValidationError('Tool result cache entry is empty.');
  }
  const actualBytes = Buffer.byteLength(serialized, 'utf8');
  if (actualBytes > Math.max(1, maxEntryBytes)) {
    throw new ToolResultCacheEntryTooLargeError(actualBytes, Math.max(1, maxEntryBytes));
  }
  const parsed = toolResultCacheEntrySchema.safeParse(JSON.parse(serialized));
  if (!parsed.success) {
    throw new ToolResultCacheValidationError(parsed.error.message);
  }
  const expectedKey = createToolCacheValidityKey(toolCacheValidityInput(parsed.data.validity));
  if (parsed.data.validity.key !== expectedKey) {
    throw new ToolResultCacheValidationError(
      'Tool result cache validity key does not match its canonical validity input.'
    );
  }
  return parsed.data;
}

function toolCacheValidityInput(validity: ToolCacheValidityRecord) {
  return {
    toolId: validity.toolId,
    toolRevision: validity.toolRevision,
    inputHash: validity.inputHash,
    scopeHash: validity.scopeHash,
    policyRevision: validity.policyRevision,
    contractSnapshotHash: validity.contractSnapshotHash,
    capabilityHash: validity.capabilityHash,
    externalStateVersion: validity.externalStateVersion,
  };
}

function isToolResultCacheEntryUsable(
  entry: ToolResultCacheEntry,
  expected: ToolCacheValidityRecord,
  ttlSeconds: number | undefined,
  currentTime: string
): boolean {
  if (!deepEqual(toolCacheValidityInput(entry.validity), toolCacheValidityInput(expected))) {
    return false;
  }
  if (entry.validity.key !== expected.key) return false;
  const createdAt = Date.parse(entry.createdAt);
  const now = Date.parse(currentTime);
  if (!Number.isFinite(createdAt) || !Number.isFinite(now) || createdAt > now + 60_000)
    return false;
  if (ttlSeconds === undefined) return entry.validity.validUntil === undefined;
  if (!entry.validity.validUntil) return false;
  const validUntil = Date.parse(entry.validity.validUntil);
  return (
    Number.isFinite(validUntil) &&
    validUntil > now &&
    validUntil <= createdAt + Math.max(0, ttlSeconds) * 1_000 + 1_000
  );
}

function collectToolCacheArtifactRefs(
  value: Pick<ToolCachedResultProjection, 'content' | 'artifactRefs'>
): string[] {
  const refs = new Set(value.artifactRefs ?? []);
  for (const item of value.content ?? []) {
    if ((item.type === 'artifact' || item.type === 'image') && item.artifactRef) {
      refs.add(item.artifactRef);
    }
  }
  return [...refs].sort();
}

function cloneToolCacheValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

async function runToolCacheOperation<T>(
  operation: 'get' | 'set' | 'delete' | 'verify',
  task: () => Promise<T>,
  timeoutMs: number
): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      task(),
      new Promise<T>((_resolve, reject) => {
        timeout = setTimeout(
          () => reject(new ToolResultCacheOperationTimeoutError(operation, timeoutMs)),
          timeoutMs
        );
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

function toolCacheErrorCode(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === 'string') return code;
  }
  return 'TOOL_RESULT_CACHE_ERROR';
}

function deepEqual(left: unknown, right: unknown): boolean {
  if (Object.is(left, right)) return true;
  try {
    return JSON.stringify(left) === JSON.stringify(right);
  } catch {
    return false;
  }
}
