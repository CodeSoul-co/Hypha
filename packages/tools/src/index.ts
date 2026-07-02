import {
  createFrameworkEvent,
  denyExternalEffectsPolicyEngine,
  FrameworkError,
  type AuditPolicySpec,
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
  source?: 'local' | 'mcp' | 'http' | 'plugin';
  sourceRef?: {
    serverId?: string;
    capabilityId?: string;
  };
}

export interface ToolCallContext {
  runId: string;
  stepId: string;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, unknown>;
}

export interface ToolCallRequest<TInput = unknown> {
  toolId: string;
  input: TInput;
  context: ToolCallContext;
}

export interface ToolCallResult<TOutput = unknown> {
  toolId: string;
  output?: TOutput;
  error?: unknown;
  status: 'completed' | 'failed' | 'denied' | 'human_review_required';
}

export type ToolHandler<TInput = unknown, TOutput = unknown> = (
  input: TInput,
  context: ToolCallContext
) => Promise<TOutput>;

export interface ToolRunner {
  run(request: ToolCallRequest): Promise<ToolCallResult>;
}

export class ToolRegistry {
  private readonly specs = new Map<string, ToolSpec>();
  private readonly handlers = new Map<string, ToolHandler>();

  register(spec: ToolSpec, handler: ToolHandler): void {
    this.specs.set(spec.id, spec);
    this.handlers.set(spec.id, handler);
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
  constructor(
    private readonly registry: ToolRegistry,
    private readonly trace: TraceRecorder,
    private readonly policy: PolicyEngine = denyExternalEffectsPolicyEngine
  ) {}

  async run(request: ToolCallRequest): Promise<ToolCallResult> {
    const spec = this.registry.getSpec(request.toolId);
    const handler = this.registry.getHandler(request.toolId);
    if (!spec || !handler) {
      throw new FrameworkError({
        code: 'TOOL_NOT_FOUND',
        message: `Tool not found: ${request.toolId}`,
        context: { toolId: request.toolId },
      });
    }

    await this.trace.record(
      createFrameworkEvent({
        id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:requested`,
        type: 'tool.call.requested',
        runId: request.context.runId,
        stepId: request.context.stepId,
        sessionId: request.context.sessionId,
        payload: { toolId: request.toolId, input: request.input },
      })
    );

    const validationError = validateInput(spec.inputSchema, request.input);
    if (validationError) {
      await this.trace.record(
        createFrameworkEvent({
          id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:failed:validation`,
          type: 'tool.call.failed',
          runId: request.context.runId,
          stepId: request.context.stepId,
          sessionId: request.context.sessionId,
          payload: { toolId: request.toolId, error: validationError, phase: 'input_validation' },
        })
      );
      return { toolId: request.toolId, status: 'failed', error: validationError };
    }

    const decision = await this.policy.evaluate({
      runId: request.context.runId,
      stepId: request.context.stepId,
      userId: request.context.userId,
      capabilityId: request.toolId,
      sideEffectLevel: spec.sideEffectLevel,
      input: request.input,
    });

    await this.trace.record(
      createFrameworkEvent({
        id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:policy`,
        type: 'tool.policy.checked',
        runId: request.context.runId,
        stepId: request.context.stepId,
        sessionId: request.context.sessionId,
        payload: { toolId: request.toolId, decision },
      })
    );

    if (!decision.allowed) {
      await this.trace.record(
        createFrameworkEvent({
          id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:rejected`,
          type: 'tool.call.rejected',
          runId: request.context.runId,
          stepId: request.context.stepId,
          sessionId: request.context.sessionId,
          payload: { toolId: request.toolId, decision },
        })
      );
      return { toolId: request.toolId, status: 'denied', error: decision.reason };
    }

    if (decision.requiresHumanReview || spec.humanApprovalPolicy?.required) {
      await this.trace.record(
        createFrameworkEvent({
          id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:human-review`,
          type: 'human.review.requested',
          runId: request.context.runId,
          stepId: request.context.stepId,
          sessionId: request.context.sessionId,
          payload: {
            toolId: request.toolId,
            reason: decision.reason ?? spec.humanApprovalPolicy?.reason,
          },
        })
      );
      return {
        toolId: request.toolId,
        status: 'human_review_required',
        error: decision.reason ?? spec.humanApprovalPolicy?.reason,
      };
    }

    await this.trace.record(
      createFrameworkEvent({
        id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:approved`,
        type: 'tool.call.approved',
        runId: request.context.runId,
        stepId: request.context.stepId,
        sessionId: request.context.sessionId,
        payload: { toolId: request.toolId, decision },
      })
    );
    await this.trace.record(
      createFrameworkEvent({
        id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:started`,
        type: 'tool.call.started',
        runId: request.context.runId,
        stepId: request.context.stepId,
        sessionId: request.context.sessionId,
        payload: { toolId: request.toolId, source: spec.source ?? 'local' },
      })
    );
    if (spec.source === 'mcp') {
      await this.trace.record(
        createFrameworkEvent({
          id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:mcp-started`,
          type: 'mcp.call.started',
          runId: request.context.runId,
          stepId: request.context.stepId,
          sessionId: request.context.sessionId,
          payload: {
            toolId: request.toolId,
            serverId: spec.sourceRef?.serverId,
            capabilityId: spec.sourceRef?.capabilityId ?? request.toolId,
          },
        })
      );
    }

    const maxAttempts = Math.max(1, spec.retryPolicy?.maxAttempts ?? 1);
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const output = await executeWithTimeout(
          handler(request.input, request.context),
          spec.timeoutPolicy?.timeoutMs
        );
        if (spec.source === 'mcp') {
          await this.trace.record(
            createFrameworkEvent({
              id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:mcp-completed`,
              type: 'mcp.call.completed',
              runId: request.context.runId,
              stepId: request.context.stepId,
              sessionId: request.context.sessionId,
              payload: {
                toolId: request.toolId,
                serverId: spec.sourceRef?.serverId,
                capabilityId: spec.sourceRef?.capabilityId ?? request.toolId,
                output,
                attempts: attempt,
              },
            })
          );
        }
        await this.trace.record(
          createFrameworkEvent({
            id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:completed`,
            type: 'tool.call.completed',
            runId: request.context.runId,
            stepId: request.context.stepId,
            sessionId: request.context.sessionId,
            payload: { toolId: request.toolId, output, attempts: attempt },
          })
        );
        return { toolId: request.toolId, status: 'completed', output };
      } catch (error) {
        const timedOut = error instanceof ToolTimeoutError;
        const message = error instanceof Error ? error.message : String(error);
        if (timedOut) {
          await this.trace.record(
            createFrameworkEvent({
              id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:timeout:${attempt}`,
              type: 'tool.call.timeout',
              runId: request.context.runId,
              stepId: request.context.stepId,
              sessionId: request.context.sessionId,
              payload: { toolId: request.toolId, attempt, timeoutMs: spec.timeoutPolicy?.timeoutMs },
            })
          );
          if (spec.timeoutPolicy?.onTimeout === 'human_review') {
            await this.trace.record(
              createFrameworkEvent({
                id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:timeout-human-review:${attempt}`,
                type: 'human.review.requested',
                runId: request.context.runId,
                stepId: request.context.stepId,
                sessionId: request.context.sessionId,
                payload: { toolId: request.toolId, reason: message, attempt },
              })
            );
            return { toolId: request.toolId, status: 'human_review_required', error: message };
          }
        }

        if (attempt < maxAttempts && shouldRetry(error, spec, timedOut)) {
          await this.trace.record(
            createFrameworkEvent({
              id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:retrying:${attempt}`,
              type: 'tool.call.retrying',
              runId: request.context.runId,
              stepId: request.context.stepId,
              sessionId: request.context.sessionId,
              payload: { toolId: request.toolId, attempt, nextAttempt: attempt + 1, error: message },
            })
          );
          await sleep(spec.retryPolicy?.backoffMs ?? 0);
          continue;
        }

        if (spec.source === 'mcp') {
          await this.trace.record(
            createFrameworkEvent({
              id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:mcp-failed`,
              type: 'mcp.call.failed',
              runId: request.context.runId,
              stepId: request.context.stepId,
              sessionId: request.context.sessionId,
              payload: {
                toolId: request.toolId,
                serverId: spec.sourceRef?.serverId,
                capabilityId: spec.sourceRef?.capabilityId ?? request.toolId,
                error: message,
                attempts: attempt,
              },
            })
          );
        }
        await this.trace.record(
          createFrameworkEvent({
            id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:failed`,
            type: 'tool.call.failed',
            runId: request.context.runId,
            stepId: request.context.stepId,
            sessionId: request.context.sessionId,
            payload: { toolId: request.toolId, error: message, attempts: attempt },
          })
        );
        return { toolId: request.toolId, status: 'failed', error: message };
      }
    }

    return { toolId: request.toolId, status: 'failed', error: 'Tool failed without a terminal result.' };
  }
}

export interface ToolProfileSpec extends VersionedSpec {
  tools: ToolSpec[];
}

function validateInput(schema: JsonSchema, input: unknown): string | null {
  if (schema.type === 'object') {
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
      return 'Tool input must be an object.';
    }
    for (const field of schema.required ?? []) {
      if (!Object.prototype.hasOwnProperty.call(input as Record<string, unknown>, field)) {
        return `Tool input missing required field: ${field}`;
      }
    }
  }
  if (schema.enum && !schema.enum.includes(input)) {
    return 'Tool input does not match enum.';
  }
  return null;
}

async function executeWithTimeout<T>(work: Promise<T>, timeoutMs?: number): Promise<T> {
  if (!timeoutMs || timeoutMs <= 0) {
    return work;
  }
  return Promise.race([
    work,
    new Promise<T>((_resolve, reject) => {
      setTimeout(() => reject(new ToolTimeoutError(timeoutMs)), timeoutMs);
    }),
  ]);
}

function shouldRetry(error: unknown, spec: ToolSpec, timedOut: boolean): boolean {
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
  const code = typeof error === 'object' && error !== null && 'code' in error
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
