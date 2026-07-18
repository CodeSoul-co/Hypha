import type { SpecRef } from '@hypha/core';
import type {
  ManagedMemoryScope,
  ManagedMemoryType,
  MemoryManagementCapabilities,
  MemoryPrincipal,
  NormalizedMemoryError,
  MemoryProfileSpec,
} from './contracts';
import type {
  ContextBuildInput,
  ContextEnvelope,
  ContextInjectionGateway,
  MemoryContextBuilder,
} from './context-contracts';
import type { ManagedMemorySearchRequest, MemoryManagementProvider } from './operations';
import { hashMemoryScope, normalizeMemoryError, sha256 } from './memory-utils';
import type { MemoryEventContext, MemoryEventPublisher } from './memory-events';

export type MemoryActivityOperation =
  | 'extract'
  | 'search'
  | 'write'
  | 'maintain'
  | 'delete'
  | 'build_context';

export interface MemoryActivityRequest {
  operationId: string;
  operation: MemoryActivityOperation;
  principal: MemoryPrincipal;
  scope: ManagedMemoryScope;
  profileRef: SpecRef;
  eventContext: MemoryEventContext;
  payload: unknown;
  timeoutMs?: number;
  idempotencyKey?: string;
}

export interface MemoryActivityResult {
  operationId: string;
  status: 'completed' | 'failed' | 'cancelled' | 'partial';
  memoryRefs?: string[];
  contextEnvelopeRef?: string;
  eventIds: string[];
  error?: NormalizedMemoryError;
  output?: unknown;
}

export interface MemoryActivityPort {
  execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise<MemoryActivityResult>;
}

export type MemoryActivityHandler = (
  request: MemoryActivityRequest,
  signal?: AbortSignal
) => Promise<Omit<MemoryActivityResult, 'operationId'>>;

export interface MemoryActivityPolicyDecision {
  allowed: boolean;
  reason?: string;
  policyRevision?: string;
}

export interface MemoryActivityPolicyPort {
  authorize(
    request: MemoryActivityRequest,
    signal?: AbortSignal
  ): Promise<MemoryActivityPolicyDecision>;
}

export interface MemoryActivityObserver {
  onStarted?(request: MemoryActivityRequest): void | Promise<void>;
  onCompleted?(request: MemoryActivityRequest, result: MemoryActivityResult): void | Promise<void>;
  onFailed?(request: MemoryActivityRequest, result: MemoryActivityResult): void | Promise<void>;
}

export interface MemoryActivityHarnessHook {
  beforeExecute(request: MemoryActivityRequest, signal: AbortSignal): void | Promise<void>;
  afterExecute(request: MemoryActivityRequest, result: MemoryActivityResult): void | Promise<void>;
}

export interface DefaultMemoryActivityPortOptions {
  policy: MemoryActivityPolicyPort;
  events: MemoryEventPublisher;
  harness: MemoryActivityHarnessHook;
  observers?: MemoryActivityObserver[];
}

export class DefaultMemoryActivityPort implements MemoryActivityPort {
  private readonly handlers = new Map<MemoryActivityOperation, MemoryActivityHandler>();

  constructor(private readonly options: DefaultMemoryActivityPortOptions) {}

  register(operation: MemoryActivityOperation, handler: MemoryActivityHandler): this {
    this.handlers.set(operation, handler);
    return this;
  }

  async execute(
    request: MemoryActivityRequest,
    signal?: AbortSignal
  ): Promise<MemoryActivityResult> {
    const execution = createMemoryActivitySignal(request.timeoutMs, signal);
    const eventIds: string[] = [];
    let harnessStarted = false;
    try {
      eventIds.push(await this.publish(request, 'memory.activity.requested', 'requested'));
      throwIfAborted(execution.signal);

      const decision = await awaitWithSignal(
        this.options.policy.authorize(request, execution.signal),
        execution.signal
      );
      if (!decision.allowed) {
        return this.finish(
          request,
          {
            operationId: request.operationId,
            status: 'failed',
            eventIds,
            error: {
              code: 'MEMORY_POLICY_REJECTED',
              message: decision.reason ?? 'Memory activity was rejected by policy.',
              retryable: false,
              details: { policyRevision: decision.policyRevision },
            },
          },
          harnessStarted
        );
      }

      await awaitWithSignal(
        Promise.resolve(this.options.harness.beforeExecute(request, execution.signal)),
        execution.signal
      );
      harnessStarted = true;

      const handler = this.handlers.get(request.operation);
      if (!handler) {
        return this.finish(
          request,
          {
            operationId: request.operationId,
            status: 'failed',
            eventIds,
            error: {
              code: 'MEMORY_INVALID_INPUT',
              message: 'No Memory Activity handler is registered for ' + request.operation + '.',
              retryable: false,
            },
          },
          harnessStarted
        );
      }

      await this.notify('onStarted', request);
      const handled = await awaitWithSignal(handler(request, execution.signal), execution.signal);
      return this.finish(
        request,
        {
          operationId: request.operationId,
          ...handled,
          eventIds: [...eventIds, ...handled.eventIds],
        },
        harnessStarted
      );
    } catch (error) {
      const cancelled = execution.signal.aborted && !execution.timedOut();
      return this.finish(
        request,
        {
          operationId: request.operationId,
          status: cancelled ? 'cancelled' : 'failed',
          eventIds,
          error: normalizeMemoryError(execution.signal.aborted ? execution.signal.reason : error),
        },
        harnessStarted
      );
    } finally {
      execution.cleanup();
    }
  }

  private async finish(
    request: MemoryActivityRequest,
    initialResult: MemoryActivityResult,
    harnessStarted: boolean
  ): Promise<MemoryActivityResult> {
    let result = initialResult;
    if (harnessStarted) {
      try {
        await this.options.harness.afterExecute(request, result);
      } catch (error) {
        result = {
          ...result,
          status: result.status === 'completed' ? 'partial' : result.status,
          error: normalizeMemoryError(error),
        };
      }
    }

    try {
      const type =
        result.status === 'completed'
          ? 'memory.activity.completed'
          : result.status === 'cancelled'
            ? 'memory.activity.cancelled'
            : 'memory.activity.failed';
      const eventId = await this.publish(request, type, result.status, result.error);
      result = { ...result, eventIds: [...result.eventIds, eventId] };
    } catch (error) {
      result = {
        ...result,
        status: result.status === 'completed' ? 'partial' : result.status,
        error: normalizeMemoryError(error),
      };
    }

    await this.notify(result.status === 'completed' ? 'onCompleted' : 'onFailed', request, result);
    return result;
  }

  private publish(
    request: MemoryActivityRequest,
    type:
      | 'memory.activity.requested'
      | 'memory.activity.completed'
      | 'memory.activity.failed'
      | 'memory.activity.cancelled',
    status: string,
    error?: NormalizedMemoryError
  ): Promise<string> {
    return this.options.events.publish(
      type,
      {
        operationId: request.operationId,
        profileId: request.profileRef.id,
        profileRevision: request.profileRef.revision ?? request.profileRef.version,
        scopeHash: hashMemoryScope(request.scope),
        status,
        error,
        metadata: {
          operation: request.operation,
          idempotencyKey: request.idempotencyKey,
        },
      },
      request.eventContext
    );
  }

  private async notify(
    hook: keyof MemoryActivityObserver,
    request: MemoryActivityRequest,
    result?: MemoryActivityResult
  ): Promise<void> {
    await Promise.all(
      (this.options.observers ?? []).map(async (observer) => {
        try {
          const callback = observer[hook];
          if (callback) await callback.call(observer, request, result as MemoryActivityResult);
        } catch {
          // Observability must not change the governed operation result.
        }
      })
    );
  }
}

interface MemoryActivitySignal {
  signal: AbortSignal;
  timedOut(): boolean;
  cleanup(): void;
}

function createMemoryActivitySignal(
  timeoutMs: number | undefined,
  externalSignal: AbortSignal | undefined
): MemoryActivitySignal {
  const controller = new AbortController();
  let timeoutReached = false;
  const forwardAbort = (): void => controller.abort(externalSignal?.reason);
  if (externalSignal?.aborted) {
    forwardAbort();
  } else {
    externalSignal?.addEventListener('abort', forwardAbort, { once: true });
  }

  const timer =
    timeoutMs === undefined
      ? undefined
      : setTimeout(() => {
          timeoutReached = true;
          controller.abort({
            code: 'MEMORY_PROVIDER_TIMEOUT',
            message: 'Memory activity timed out after ' + timeoutMs + 'ms.',
            retryable: true,
          } satisfies NormalizedMemoryError);
        }, timeoutMs);

  return {
    signal: controller.signal,
    timedOut: () => timeoutReached,
    cleanup: () => {
      if (timer) clearTimeout(timer);
      externalSignal?.removeEventListener('abort', forwardAbort);
    },
  };
}

async function awaitWithSignal<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  throwIfAborted(signal);
  return new Promise<T>((resolve, reject) => {
    const onAbort = (): void => reject(signal.reason);
    signal.addEventListener('abort', onAbort, { once: true });
    promise.then(resolve, reject).finally(() => signal.removeEventListener('abort', onAbort));
  });
}

function throwIfAborted(signal: AbortSignal): void {
  if (signal.aborted) throw signal.reason;
}
export function createMemorySearchActivityHandler(
  provider: MemoryManagementProvider
): MemoryActivityHandler {
  return async (activity) => {
    const payload = activity.payload as Partial<ManagedMemorySearchRequest>;
    const results = await provider.search({
      operationId: activity.operationId,
      principal: activity.principal,
      scope: activity.scope,
      profileRef: activity.profileRef,
      query: payload.query,
      queryEmbedding: payload.queryEmbedding,
      filters: payload.filters,
      memoryTypes: payload.memoryTypes,
      mode: payload.mode,
      topK: payload.topK,
      scoreThreshold: payload.scoreThreshold,
      includeDormant: payload.includeDormant,
      includeSuperseded: payload.includeSuperseded,
      includeContent: payload.includeContent,
      includeProvenance: payload.includeProvenance,
      includeRelations: payload.includeRelations,
      rerank: payload.rerank,
      updateAccessStats: payload.updateAccessStats,
      pagination: payload.pagination,
      metadata: payload.metadata,
    });
    return {
      status: 'completed',
      memoryRefs: results.map((result) => result.record.versionId),
      eventIds: [],
      output: results,
    };
  };
}

export function createContextBuildActivityHandler(
  builder: MemoryContextBuilder,
  gateway: ContextInjectionGateway
): MemoryActivityHandler {
  return async (activity) => {
    const input = activity.payload as ContextBuildInput;
    if (
      !input ||
      input.operationId !== activity.operationId ||
      input.principal.principalId !== activity.principal.principalId ||
      hashMemoryScope(input.scope) !== hashMemoryScope(activity.scope) ||
      !sameSpecRef(input.profileRef, activity.profileRef)
    ) {
      throw {
        code: 'MEMORY_INVALID_INPUT',
        message: 'Context activity payload does not match its operation or profile.',
        retryable: false,
      } satisfies NormalizedMemoryError;
    }
    const bundle = await builder.build(input);
    const envelope = await gateway.buildEnvelope(bundle, input.profile);
    return {
      status: 'completed',
      contextEnvelopeRef: envelope.id,
      eventIds: [],
      output: envelope,
    };
  };
}

export interface InferenceContextInput {
  envelope: ContextEnvelope;
  contextHash: string;
  provenanceRequired: boolean;
}

export interface WorkflowStateMemoryBinding {
  memoryProfileRef?: SpecRef;
  contextProfileRef?: SpecRef;
  extractionProfileRef?: SpecRef;
  readPolicyRef?: SpecRef;
  writePolicyRef?: SpecRef;
  allowedMemoryTypes?: ManagedMemoryType[];
  memoryAccessMode?: 'none' | 'read' | 'write' | 'read_write';
  autoCapture?: boolean;
}

export interface SessionMemoryBinding {
  memoryProfileRef?: SpecRef;
  contextProfileRef?: SpecRef;
  memoryScopeTemplate?: Partial<ManagedMemoryScope>;
  sessionScopeMode?: 'isolated' | 'user_shared' | 'workspace_shared';
}

export interface DomainMemoryDependencySnapshot {
  domainPackRef: SpecRef;
  memoryProfileRef?: SpecRef;
  contextProfileRef?: SpecRef;
  extractionProfileRef?: SpecRef;
  providerRefs: SpecRef[];
  policyRefs: SpecRef[];
  scopeTemplate?: Partial<ManagedMemoryScope>;
  capabilitySnapshot: Partial<MemoryManagementCapabilities>;
  dependencyHash: string;
  createdAt: string;
}

export interface MemoryCacheValidityInput {
  memoryProfileRevision: string;
  contextProfileRevision?: string;
  scopeHash: string;
  queryHash?: string;
  recordSetRevision?: string;
  selectedMemoryVersionIds?: string[];
  providerRevision?: string;
  embeddingRevision?: string;
  policyRevision?: string;
}

export interface MemoryCacheInvalidation {
  operationId: string;
  scopeHash: string;
  reason: 'created' | 'updated' | 'invalidated' | 'deleted' | 'provider_revision';
  memoryIds: string[];
  memoryVersionIds?: string[];
  validityHash: string;
}

export function createMemoryCacheValidityInput(
  input: Omit<MemoryCacheValidityInput, 'scopeHash'> & { scope: ManagedMemoryScope }
): MemoryCacheValidityInput {
  const { scope, ...rest } = input;
  return {
    ...rest,
    scopeHash: hashMemoryScope(scope),
    selectedMemoryVersionIds: [...(input.selectedMemoryVersionIds ?? [])].sort(),
  };
}

export function memoryCacheValidityHash(input: MemoryCacheValidityInput): string {
  return sha256({
    ...input,
    selectedMemoryVersionIds: [...(input.selectedMemoryVersionIds ?? [])].sort(),
  });
}

export function memoryRecordVersionSetHash(versionIds: string[]): string {
  return sha256(Array.from(new Set(versionIds)).sort());
}

export function createDomainMemoryDependencySnapshot(
  input: Omit<DomainMemoryDependencySnapshot, 'dependencyHash' | 'createdAt'>,
  now = new Date().toISOString()
): DomainMemoryDependencySnapshot {
  const normalized = {
    ...input,
    providerRefs: [...input.providerRefs].sort(compareSpecRefs),
    policyRefs: [...input.policyRefs].sort(compareSpecRefs),
  };
  return {
    ...normalized,
    dependencyHash: sha256(normalized),
    createdAt: now,
  };
}

export function validateMemoryBindingCapabilities(
  binding: WorkflowStateMemoryBinding,
  capabilities: MemoryManagementCapabilities
): string[] {
  const errors: string[] = [];
  const access = binding.memoryAccessMode ?? 'none';
  if ((access === 'read' || access === 'read_write') && !capabilities.search) {
    errors.push('Memory provider does not support search required by the workflow state.');
  }
  if ((access === 'write' || access === 'read_write') && !capabilities.add) {
    errors.push('Memory provider does not support add required by the workflow state.');
  }
  if (access !== 'none' && !binding.memoryProfileRef) {
    errors.push('A memory profile reference is required when memory access is enabled.');
  }
  if (binding.autoCapture && access !== 'write' && access !== 'read_write') {
    errors.push('autoCapture requires write or read_write access.');
  }
  return errors;
}
export function validateMemoryProfileCapabilities(
  profile: MemoryProfileSpec,
  capabilities: MemoryManagementCapabilities
): string[] {
  const errors: string[] = [];
  if (profile.retrievalPolicy.defaultMode === 'hybrid' && !capabilities.hybridSearch) {
    errors.push('Memory provider does not support hybrid search required by the retrieval policy.');
  }
  if (profile.writePolicy.conflictDetection && !capabilities.conflictDetection) {
    errors.push(
      'Memory provider does not support conflict detection required by the write policy.'
    );
  }
  if (profile.retentionPolicy.retainHistory && !capabilities.history) {
    errors.push('Memory provider does not support history required by the retention policy.');
  }
  if (profile.consolidationPolicy?.enabled && !capabilities.consolidate) {
    errors.push(
      'Memory provider does not support consolidation required by the consolidation policy.'
    );
  }
  if (profile.conflictPolicy?.detectOnWrite && !capabilities.conflictDetection) {
    errors.push(
      'Memory provider does not support conflict detection required by the conflict policy.'
    );
  }
  if (profile.indexingPolicy?.mode === 'async_outbox' && !capabilities.asyncWrite) {
    errors.push(
      'Memory provider does not support asynchronous writes required by the indexing policy.'
    );
  }
  return errors;
}

export interface MemoryReplayReference {
  operationId: string;
  profileRevision: string;
  scopeHash: string;
  eventIds: string[];
  memoryVersionIds: string[];
  retrievalSnapshotId?: string;
  contextHash?: string;
}

export interface MemoryEvaluationCase {
  id: string;
  category: 'extraction' | 'retrieval' | 'context' | 'lifecycle';
  inputRef: string;
  expectedRef?: string;
  metricIds: string[];
  metadata?: Record<string, unknown>;
}

export interface MemoryEvaluationObservation {
  caseId: string;
  operationId: string;
  traceEventIds: string[];
  memoryVersionIds?: string[];
  retrievalSnapshotId?: string;
  contextHash?: string;
  metrics?: Record<string, number>;
}

export interface MemoryEvaluationPort {
  record(observation: MemoryEvaluationObservation): Promise<void>;
}

export interface InferenceContextPort<TOutput = unknown> {
  invoke(input: InferenceContextInput, signal?: AbortSignal): Promise<TOutput>;
}

export interface MemoryContextInferenceResult<TOutput = unknown> {
  activity: MemoryActivityResult;
  inferenceOutput: TOutput;
}

export class MemoryContextInferenceBridge {
  constructor(
    private readonly activities: MemoryActivityPort,
    private readonly inference: InferenceContextPort
  ) {}

  async execute(
    request: MemoryActivityRequest,
    signal?: AbortSignal
  ): Promise<MemoryContextInferenceResult> {
    if (request.operation !== 'build_context') {
      throw {
        code: 'MEMORY_INVALID_INPUT',
        message: 'MemoryContextInferenceBridge only accepts build_context activities.',
        retryable: false,
      } satisfies NormalizedMemoryError;
    }
    const activity = await this.activities.execute(request, signal);
    if (activity.status !== 'completed' || !isContextEnvelope(activity.output)) {
      throw (
        activity.error ?? {
          code: 'MEMORY_INTERNAL_ERROR',
          message: 'Context activity did not produce a ContextEnvelope.',
          retryable: false,
        }
      );
    }
    const envelope = activity.output;
    const inferenceOutput = await this.inference.invoke(
      {
        envelope,
        contextHash: envelope.contextHash,
        provenanceRequired: true,
      },
      signal
    );
    return { activity, inferenceOutput };
  }
}

function isContextEnvelope(value: unknown): value is ContextEnvelope {
  if (!value || typeof value !== 'object') return false;
  const envelope = value as Partial<ContextEnvelope>;
  return (
    typeof envelope.id === 'string' &&
    typeof envelope.contextHash === 'string' &&
    Array.isArray(envelope.dataSegments)
  );
}

function sameSpecRef(left: SpecRef, right: SpecRef): boolean {
  return left.id === right.id && left.version === right.version && left.revision === right.revision;
}

function compareSpecRefs(left: SpecRef, right: SpecRef): number {
  return specRefKey(left).localeCompare(specRefKey(right));
}

function specRefKey(ref: SpecRef): string {
  return `${ref.id}@${ref.version ?? ''}#${ref.revision ?? ''}`;
}
