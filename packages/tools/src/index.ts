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
      return { toolId: request.toolId, status: 'denied', error: decision.reason };
    }

    const output = await handler(request.input, request.context);
    await this.trace.record(
      createFrameworkEvent({
        id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:completed`,
        type: 'tool.call.completed',
        runId: request.context.runId,
        stepId: request.context.stepId,
        sessionId: request.context.sessionId,
        payload: { toolId: request.toolId, output },
      })
    );
    return { toolId: request.toolId, status: 'completed', output };
  }
}

export interface ToolProfileSpec extends VersionedSpec {
  tools: ToolSpec[];
}
