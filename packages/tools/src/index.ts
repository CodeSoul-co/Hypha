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
  timeoutPolicySpecSchema,
  type AuditPolicySpec,
  type FrameworkEventType,
  type HumanReviewPolicySpec,
  type JsonSchema,
  type PolicyEngine,
  type RetryPolicySpec,
  type SideEffectLevel,
  type TimeoutPolicySpec,
  type TraceRecorder,
  type VersionedSpec,
} from '@hypha/core';

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
  name?: string;
  description: string;
  inputSchema: JsonSchema;
  outputSchema?: JsonSchema;
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
  source?: 'local' | 'mcp' | 'http' | 'plugin';
  sourceRef?: {
    serverId?: string;
    capabilityId?: string;
  };
}

export interface ToolCallContext {
  runId: string;
  stepId: string;
  invocationId?: string;
  userId?: string;
  sessionId?: string;
  agentId?: string;
  fsmState?: string;
  idempotencyKey?: string;
  signal?: AbortSignal;
  executionScope?: ToolExecutionScope;
  metadata?: Record<string, unknown>;
}

export interface ToolExecutionScope {
  allowedToolIds?: readonly string[];
  policyRefs?: readonly string[];
  fsmState?: string;
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
  status: 'completed' | 'failed' | 'denied' | 'human_review_required';
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
  inputHash: string;
  runId: string;
  stepId: string;
  userId?: string;
  reason?: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ToolApprovalGrant {
  requestId: string;
  invocationId: string;
  toolId: string;
  inputHash: string;
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
    if (request.status === 'rejected') {
      throw new Error('Tool approval request was rejected: ' + invocationId);
    }
    const grant: ToolApprovalGrant = {
      requestId: request.id,
      invocationId,
      toolId: request.toolId,
      inputHash: request.inputHash,
      approvedBy,
      approvedAt: options.approvedAt ?? new Date().toISOString(),
      expiresAt: options.expiresAt,
    };
    this.requests.set(invocationId, { ...request, status: 'approved' });
    this.grants.set(invocationId, grant);
    return grant;
  }

  async reject(invocationId: string): Promise<ToolApprovalRequest> {
    const request = this.requests.get(invocationId);
    if (!request) throw new Error('Tool approval request not found: ' + invocationId);
    const rejected = { ...request, status: 'rejected' as const };
    this.requests.set(invocationId, rejected);
    this.grants.delete(invocationId);
    return rejected;
  }
}

export interface ToolInvocationStore {
  getCompleted(invocationId: string): Promise<ToolCallResult | null>;
  saveCompleted(invocationId: string, result: ToolCallResult): Promise<void>;
}

export class InMemoryToolInvocationStore implements ToolInvocationStore {
  private readonly completed = new Map<string, ToolCallResult>();

  async getCompleted(invocationId: string): Promise<ToolCallResult | null> {
    return this.completed.get(invocationId) ?? null;
  }

  async saveCompleted(invocationId: string, result: ToolCallResult): Promise<void> {
    this.completed.set(invocationId, result);
  }
}
export type ToolHandler<TInput = unknown, TOutput = unknown> = (
  input: TInput,
  context: ToolCallContext
) => Promise<TOutput>;

export interface ToolRunner {
  run(request: ToolCallRequest): Promise<ToolCallResult>;
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
  private readonly specs = new Map<string, ToolSpec>();
  private readonly handlers = new Map<string, ToolHandler>();

  register(spec: ToolSpec, handler: ToolHandler, options: { replace?: boolean } = {}): void {
    const parsed = validateToolSpec(spec);
    if (this.specs.has(parsed.id) && !options.replace) {
      throw new FrameworkError({
        code: 'TOOL_ALREADY_REGISTERED',
        message: 'Tool already registered: ' + parsed.id,
        context: { toolId: parsed.id },
      });
    }
    this.specs.set(parsed.id, parsed);
    this.handlers.set(parsed.id, handler);
  }

  unregister(toolId: string): boolean {
    const removedSpec = this.specs.delete(toolId);
    const removedHandler = this.handlers.delete(toolId);
    return removedSpec || removedHandler;
  }

  getSpec(toolId: string): ToolSpec | null {
    return this.specs.get(toolId) ?? null;
  }

  getHandler(toolId: string): ToolHandler | null {
    return this.handlers.get(toolId) ?? null;
  }

  list(): ToolSpec[] {
    return Array.from(this.specs.values());
  }
}
export class GovernedToolRunner implements ToolRunner {
  private readonly approvalStore: ToolApprovalStore;
  private readonly invocationStore: ToolInvocationStore;
  private readonly now: () => string;
  private readonly inFlight = new Map<string, Promise<ToolCallResult>>();

  constructor(
    private readonly registry: ToolRegistry,
    private readonly trace: TraceRecorder,
    private readonly policy: PolicyEngine = denyExternalEffectsPolicyEngine,
    options: {
      approvalStore?: ToolApprovalStore;
      invocationStore?: ToolInvocationStore;
      now?: () => string;
    } = {}
  ) {
    this.approvalStore = options.approvalStore ?? new InMemoryToolApprovalStore();
    this.invocationStore = options.invocationStore ?? new InMemoryToolInvocationStore();
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async run(request: ToolCallRequest): Promise<ToolCallResult> {
    const invocationId = resolveInvocationId(request);
    const completed = await this.invocationStore.getCompleted(invocationId);
    if (completed) return completed;

    const running = this.inFlight.get(invocationId);
    if (running) return running;

    const execution = this.runOnce(request, invocationId).finally(() => {
      this.inFlight.delete(invocationId);
    });
    this.inFlight.set(invocationId, execution);
    return execution;
  }

  private async runOnce(request: ToolCallRequest, invocationId: string): Promise<ToolCallResult> {
    const startedAt = Date.now();
    const spec = this.registry.getSpec(request.toolId);
    const handler = this.registry.getHandler(request.toolId);
    if (!spec || !handler) {
      return failedToolResult(
        request.toolId,
        invocationId,
        'TOOL_NOT_FOUND',
        'Tool not found: ' + request.toolId,
        'resolution'
      );
    }

    const basePayload = { ...toolTracePayload(request.toolId, spec), invocationId };
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
      await this.trace.record(
        createFrameworkEvent({
          id: invocationId + ':' + suffix,
          type,
          ...traceContext,
          payload,
        })
      );
    };

    const auditedInput = auditToolValue(spec.auditPolicy, 'input', request.input);
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

    const validation = validateToolInput(spec.inputSchema, request.input);
    if (!validation.valid) {
      const message = validation.error ?? 'Tool input failed schema validation.';
      const result = failedToolResult(
        request.toolId,
        invocationId,
        'TOOL_INPUT_INVALID',
        message,
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
      capabilityId: request.toolId,
      sideEffectLevel: spec.sideEffectLevel,
      input: request.input,
      metadata: {
        ...request.context.metadata,
        invocationId,
        fsmState: traceContext.fsmState,
        policyRefs: request.context.executionScope?.policyRefs,
        source: spec.source ?? 'local',
        sourceRef: spec.sourceRef,
        permissionScope: spec.permissionScope,
      },
    });
    await record('tool.policy.checked', 'policy', { ...basePayload, decision });

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

    const approvalRequired =
      Boolean(decision.requiresHumanReview) || Boolean(spec.humanApprovalPolicy?.required);
    const inputHash = hashToolInput(request.input);
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
      if (grant && !isApprovalGrantValid(grant, request.toolId, inputHash, this.now())) {
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
        const approvalRequest = await this.approvalStore.requestApproval({
          id: invocationId + ':approval',
          invocationId,
          toolId: request.toolId,
          inputHash,
          runId: request.context.runId,
          stepId: request.context.stepId,
          userId: request.context.userId,
          reason: decision.reason ?? spec.humanApprovalPolicy?.reason,
          requestedAt: this.now(),
          status: 'pending',
        });
        await record('human.review.requested', 'human-review', {
          ...basePayload,
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

      await record('human.review.approved', 'human-review-approved', {
        ...basePayload,
        grant,
      });
      await record('human.review.resolved', 'human-review-resolved', {
        ...basePayload,
        grant,
      });
    }

    await record('tool.call.approved', 'approved', { ...basePayload, decision });
    await record('tool.call.started', 'started', basePayload);
    if (spec.source === 'mcp') {
      await record('mcp.call.started', 'mcp-started', {
        ...basePayload,
        serverId: spec.sourceRef?.serverId,
        capabilityId: spec.sourceRef?.capabilityId ?? request.toolId,
      });
    }

    const maxAttempts = Math.max(1, spec.retryPolicy?.maxAttempts ?? 1);
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const output = await executeWithTimeout(
          (signal) => handler(request.input, { ...request.context, invocationId, signal }),
          spec.timeoutPolicy?.timeoutMs
        );
        const outputValidation = spec.outputSchema
          ? validateToolInput(spec.outputSchema, output)
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
          return result;
        }

        const auditedOutput = auditToolValue(spec.auditPolicy, 'output', output);
        if (spec.source === 'mcp') {
          await record('mcp.call.completed', 'mcp-completed:' + attempt, {
            ...basePayload,
            serverId: spec.sourceRef?.serverId,
            capabilityId: spec.sourceRef?.capabilityId ?? request.toolId,
            ...(auditedOutput.included ? { output: auditedOutput.value } : {}),
            attempts: attempt,
          });
        }
        const durationMs = Date.now() - startedAt;
        await record('tool.call.completed', 'completed', {
          ...basePayload,
          ...(auditedOutput.included ? { output: auditedOutput.value } : {}),
          attempts: attempt,
          durationMs,
        });
        const result: ToolCallResult = {
          toolId: request.toolId,
          invocationId,
          status: 'completed',
          output,
          attempts: attempt,
          durationMs,
        };
        await this.invocationStore.saveCompleted(invocationId, result);
        return result;
      } catch (error) {
        const timedOut = error instanceof ToolTimeoutError;
        const message = error instanceof Error ? error.message : String(error);
        if (timedOut) {
          await record('tool.call.timeout', 'timeout:' + attempt, {
            ...basePayload,
            attempt,
            timeoutMs: spec.timeoutPolicy?.timeoutMs,
          });
          if (spec.timeoutPolicy?.onTimeout === 'human_review') {
            await record('human.review.requested', 'timeout-human-review:' + attempt, {
              ...basePayload,
              reason: message,
              attempt,
            });
            return failedToolResult(
              request.toolId,
              invocationId,
              'TOOL_TIMEOUT_REQUIRES_REVIEW',
              message,
              'timeout',
              'human_review_required'
            );
          }
        }

        if (
          attempt < maxAttempts &&
          shouldRetry(error, spec, timedOut, request.context.idempotencyKey)
        ) {
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
            serverId: spec.sourceRef?.serverId,
            capabilityId: spec.sourceRef?.capabilityId ?? request.toolId,
            error: message,
            attempts: attempt,
          });
        }
        const result = failedToolResult(
          request.toolId,
          invocationId,
          timedOut ? 'TOOL_TIMEOUT' : 'TOOL_EXECUTION_FAILED',
          message,
          timedOut ? 'timeout' : 'execution',
          'failed',
          { attempts: attempt }
        );
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
}
export interface ToolProfileSpec extends VersionedSpec {
  tools: ToolSpec[];
}

export const toolSpecSchema = z.object({
  id: z.string().min(1),
  version: z.string().min(1),
  name: z.string().optional(),
  description: z.string().min(1),
  inputSchema: jsonSchemaSchema,
  outputSchema: jsonSchemaSchema.optional(),
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
  source: z.enum(['local', 'mcp', 'http', 'plugin']).optional(),
  sourceRef: z
    .object({
      serverId: z.string().optional(),
      capabilityId: z.string().optional(),
    })
    .optional(),
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

export const toolSpecDefinitions = [toolSpecDefinition] as const;
export const toolSpecJsonSchemas = exportSpecJsonSchemas(toolSpecDefinitions);

export function validateToolSpec(input: unknown): ToolSpec {
  return toolSpecDefinition.parse(input);
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
  now: string
): boolean {
  if (grant.toolId !== toolId || grant.inputHash !== inputHash) return false;
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
  timeoutMs?: number
): Promise<T> {
  const controller = new AbortController();
  if (!timeoutMs || timeoutMs <= 0) {
    return work(controller.signal);
  }
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      work(controller.signal),
      new Promise<T>((_resolve, reject) => {
        timeout = setTimeout(() => {
          controller.abort();
          reject(new ToolTimeoutError(timeoutMs));
        }, timeoutMs);
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

function shouldRetry(
  error: unknown,
  spec: ToolSpec,
  timedOut: boolean,
  idempotencyKey?: string
): boolean {
  if (
    spec.sideEffectLevel === 'write' ||
    spec.sideEffectLevel === 'external_effect' ||
    spec.sideEffectLevel === 'irreversible'
  ) {
    if (!idempotencyKey) return false;
  }
  if (timedOut) {
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
  if (pattern && !new RegExp(pattern).test(value)) {
    issues.push({ path, message: `must match pattern ${pattern}` });
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

function deepEqual(left: unknown, right: unknown): boolean {
  if (Object.is(left, right)) return true;
  try {
    return JSON.stringify(left) === JSON.stringify(right);
  } catch {
    return false;
  }
}
