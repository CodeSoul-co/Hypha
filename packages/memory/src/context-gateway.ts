import type {
  ContextBuildExplanation,
  ContextEnvelope,
  ContextInjectionGateway,
  ContextSourceResolverRegistry,
  MemoryContextBuilder,
  ResolvedContextBuildInput,
} from './context-contracts';
import type { MemoryActivityHarnessHook, MemoryActivityRequest } from './integration-contracts';
import { hashMemoryScope, memoryError } from './memory-utils';

export type ContextGatewayConsumer = 'chat' | 'workflow' | 'harness';
export interface ContextGatewayRequest extends ResolvedContextBuildInput {
  consumer: ContextGatewayConsumer;
}
export interface ContextGatewayResult {
  envelope: ContextEnvelope;
  explanation: ContextBuildExplanation;
  sourceItemCount: number;
  consumer: ContextGatewayConsumer;
}
export interface MemoryContextGateway {
  build(request: ContextGatewayRequest, signal?: AbortSignal): Promise<ContextGatewayResult>;
}
export interface DefaultMemoryContextGatewayOptions {
  resolver: ContextSourceResolverRegistry;
  builder: MemoryContextBuilder;
  injection: ContextInjectionGateway;
  activityHook?: MemoryActivityHarnessHook;
  eventContext?: (request: ContextGatewayRequest) => MemoryActivityRequest['eventContext'];
}

/** Canonical Context entry point shared by Chat, Workflow, and Harness consumers. */
export class DefaultMemoryContextGateway implements MemoryContextGateway {
  constructor(private readonly options: DefaultMemoryContextGatewayOptions) {}

  async build(request: ContextGatewayRequest, signal?: AbortSignal): Promise<ContextGatewayResult> {
    throwIfAborted(signal);
    validateRequest(request);
    const activity = this.toActivity(request);
    const hookSignal = signal ?? new AbortController().signal;
    await this.options.activityHook?.beforeExecute(activity, hookSignal);
    try {
      const sourceItems = await this.options.resolver.resolve(request);
      throwIfAborted(signal);
      const bundle = await this.options.builder.build({ ...request, sourceItems });
      const envelope = await this.options.injection.buildEnvelope(bundle, request.profile);
      const explanation = await this.options.builder.explain(bundle.contextHash);
      if (!explanation) {
        throw memoryError(
          'MEMORY_INTERNAL_ERROR',
          'Context builder did not retain an explanation for the generated context.'
        );
      }
      await this.options.activityHook?.afterExecute(activity, {
        operationId: request.operationId,
        status: 'completed',
        contextEnvelopeRef: envelope.id,
        eventIds: [],
        output: {
          contextHash: envelope.contextHash,
          profileRevision: envelope.profileRevision,
          sourceItemCount: sourceItems.length,
          consumer: request.consumer,
        },
      });
      return {
        envelope,
        explanation,
        sourceItemCount: sourceItems.length,
        consumer: request.consumer,
      };
    } catch (error) {
      await this.options.activityHook?.afterExecute(activity, {
        operationId: request.operationId,
        status: signal?.aborted ? 'cancelled' : 'failed',
        eventIds: [],
        error: isNormalizedError(error)
          ? error
          : memoryError(
              'MEMORY_INTERNAL_ERROR',
              error instanceof Error ? error.message : String(error)
            ),
      });
      throw error;
    }
  }

  private toActivity(request: ContextGatewayRequest): MemoryActivityRequest {
    return {
      operationId: request.operationId,
      operation: 'build_context',
      principal: request.principal,
      scope: request.scope,
      profileRef: request.profileRef,
      eventContext: this.options.eventContext?.(request) ?? {
        runId: request.runId,
        workspaceId: request.scope.workspaceId,
        stepId: request.stepId,
      },
      payload: {
        consumer: request.consumer,
        profileRevision: request.profile.revision ?? request.profile.version,
        scopeHash: hashMemoryScope(request.scope),
      },
    };
  }
}
function validateRequest(request: ContextGatewayRequest): void {
  if (!['chat', 'workflow', 'harness'].includes(request.consumer)) {
    throw memoryError('MEMORY_INVALID_INPUT', 'Unknown Context Gateway consumer.');
  }
  if (request.profile.id !== request.profileRef.id) {
    throw memoryError('MEMORY_INVALID_INPUT', 'Context profile reference does not match profile.');
  }
}
function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) throw signal.reason;
}
function isNormalizedError(error: unknown): error is ReturnType<typeof memoryError> {
  return Boolean(
    error &&
    typeof error === 'object' &&
    typeof (error as { code?: unknown }).code === 'string' &&
    typeof (error as { retryable?: unknown }).retryable === 'boolean'
  );
}
