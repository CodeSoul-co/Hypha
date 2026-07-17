import type { SpecRef } from '@hypha/core';
import type {
  ManagedMemoryScope,
  ManagedMemoryType,
  MemoryManagementCapabilities,
  MemoryPrincipal,
  NormalizedMemoryError,
} from './contracts';
import type {
  ContextBuildInput,
  ContextEnvelope,
  ContextInjectionGateway,
  MemoryContextBuilder,
} from './context-contracts';
import type { ManagedMemorySearchRequest, MemoryManagementProvider } from './operations';
import { hashMemoryScope, normalizeMemoryError, sha256 } from './memory-utils';

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

export interface DefaultMemoryActivityPortOptions {
  policy: MemoryActivityPolicyPort;
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
    if (signal?.aborted) {
      return this.finish(request, {
        operationId: request.operationId,
        status: 'cancelled',
        eventIds: [],
      });
    }
    try {
      const decision = await this.options.policy.authorize(request, signal);
      if (!decision.allowed) {
        return this.finish(request, {
          operationId: request.operationId,
          status: 'failed',
          eventIds: [],
          error: {
            code: 'MEMORY_POLICY_REJECTED',
            message: decision.reason ?? 'Memory activity was rejected by policy.',
            retryable: false,
            details: { policyRevision: decision.policyRevision },
          },
        });
      }
    } catch (error) {
      return this.finish(request, {
        operationId: request.operationId,
        status: 'failed',
        eventIds: [],
        error: normalizeMemoryError(error),
      });
    }
    const handler = this.handlers.get(request.operation);
    if (!handler) {
      return this.finish(request, {
        operationId: request.operationId,
        status: 'failed',
        eventIds: [],
        error: {
          code: 'MEMORY_INVALID_INPUT',
          message: `No Memory Activity handler is registered for ${request.operation}.`,
          retryable: false,
        },
      });
    }
    await this.notify('onStarted', request);
    try {
      return this.finish(request, {
        operationId: request.operationId,
        ...(await handler(request, signal)),
      });
    } catch (error) {
      return this.finish(request, {
        operationId: request.operationId,
        status: signal?.aborted ? 'cancelled' : 'failed',
        eventIds: [],
        error: normalizeMemoryError(error),
      });
    }
  }

  private async finish(
    request: MemoryActivityRequest,
    result: MemoryActivityResult
  ): Promise<MemoryActivityResult> {
    await this.notify(result.status === 'completed' ? 'onCompleted' : 'onFailed', request, result);
    return result;
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
  return `${left.id}@${left.version ?? ''}`.localeCompare(`${right.id}@${right.version ?? ''}`);
}
