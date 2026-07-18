import type {
  ArtifactArchiveRequest,
  ArtifactCreateRequest,
  ArtifactDeleteRequest,
  ArtifactEventPayloadMap,
  ArtifactEventPublication,
  ArtifactEventPublisher,
  ArtifactFinalizeRequest,
  ArtifactFrameworkEventType,
  ArtifactFromWorkspaceRequest,
  ArtifactGarbageCollectionRequest,
  ArtifactGarbageCollectionResult,
  ArtifactGarbageCollector,
  ArtifactGetRecordRequest,
  ArtifactInvalidateRequest,
  ArtifactLineage,
  ArtifactListRequest,
  ArtifactManager,
  ArtifactMutationRequest,
  ArtifactProfileSpec,
  ArtifactReadRequest,
  ArtifactReadResult,
  ArtifactRecord,
  ArtifactVersionRequest,
  NormalizedArtifactError,
  ProviderHealth,
  SpecRef,
} from '../..';
import {
  ArtifactManagerError,
  artifactManagerError,
  validateArtifactManagerInput,
} from './manager-error';
import {
  normalizedArtifactErrorSchema,
  validateArtifactCreateRequest,
  validateArtifactFromWorkspaceRequest,
  validateArtifactMutationRequest,
  validateArtifactReadRequest,
  validateArtifactVersionRequest,
} from './manager';
import { validateArtifactGarbageCollectionRequest } from './gc';
import { validateArtifactEventPublication } from './events';

export interface EventingArtifactManagerOptions {
  manager: ArtifactManager;
  publisher: ArtifactEventPublisher;
  idGenerator: () => string;
  now?: () => string;
}

export interface EventingArtifactGarbageCollectorOptions {
  collector: ArtifactGarbageCollector;
  publisher: ArtifactEventPublisher;
  idGenerator: () => string;
  now?: () => string;
  workspaceId?: string;
  sessionId?: string;
  runId?: string;
  agentId?: string;
}

interface ArtifactEventContext {
  workspaceId?: string;
  sessionId?: string;
  runId?: string;
  agentId?: string;
}

export class EventingArtifactManager implements ArtifactManager {
  private readonly manager: ArtifactManager;
  private readonly events: ArtifactEventEmitter;

  constructor(options: EventingArtifactManagerOptions) {
    this.manager = options.manager;
    this.events = new ArtifactEventEmitter(options);
  }

  async create(input: ArtifactCreateRequest): Promise<ArtifactRecord> {
    const request = validateArtifactManagerInput(() => validateArtifactCreateRequest(input));
    return this.createArtifact(request, () => this.manager.create(request));
  }

  async createFromWorkspace(input: ArtifactFromWorkspaceRequest): Promise<ArtifactRecord> {
    const request = validateArtifactManagerInput(() => validateArtifactFromWorkspaceRequest(input));
    return this.createArtifact(request, () => this.manager.createFromWorkspace(request));
  }

  async createVersion(input: ArtifactVersionRequest): Promise<ArtifactRecord> {
    const request = validateArtifactManagerInput(() => validateArtifactVersionRequest(input));
    const record = await this.manager.createVersion(request);
    await this.events.publish(
      'artifact.version.created',
      recordPayload(request.operationId, record),
      recordContext(record)
    );
    await this.publishLineage(request.operationId, record);
    return record;
  }

  get(request: ArtifactGetRecordRequest): Promise<ArtifactRecord | null> {
    return this.manager.get(request);
  }

  async read(input: ArtifactReadRequest): Promise<ArtifactReadResult> {
    const request = validateArtifactManagerInput(() => validateArtifactReadRequest(input));
    const operationId = this.events.operationId('read');
    await this.events.publish('artifact.read.requested', {
      operationId,
      artifactId: request.artifactId,
    });
    const result = await this.manager.read(request);
    await this.events.publish(
      'artifact.read.completed',
      {
        operationId,
        artifactId: result.record.id,
        versionId: result.record.versionId,
        workspaceId: result.record.workspaceId,
        contentHash: result.record.contentHash,
        sizeBytes: result.content.sizeBytes,
      },
      recordContext(result.record)
    );
    return result;
  }

  list(request: ArtifactListRequest): Promise<ArtifactRecord[]> {
    return this.manager.list(request);
  }

  finalize(input: ArtifactFinalizeRequest): Promise<ArtifactRecord> {
    const request = validateArtifactManagerInput(() => validateArtifactMutationRequest(input));
    return this.mutate(request, 'artifact.finalized', () => this.manager.finalize(request));
  }

  archive(input: ArtifactArchiveRequest): Promise<ArtifactRecord> {
    const request = validateArtifactManagerInput(() => validateArtifactMutationRequest(input));
    return this.mutate(request, 'artifact.archived', () => this.manager.archive(request));
  }

  invalidate(input: ArtifactInvalidateRequest): Promise<ArtifactRecord> {
    const request = validateArtifactManagerInput(() => validateArtifactMutationRequest(input));
    return this.mutate(request, 'artifact.invalidated', () => this.manager.invalidate(request));
  }

  async delete(input: ArtifactDeleteRequest): Promise<void> {
    const request = validateArtifactManagerInput(() => validateArtifactMutationRequest(input));
    await this.events.publish('artifact.delete.requested', {
      operationId: request.operationId,
      artifactId: request.artifactId,
      ...(request.reason ? { reason: request.reason } : {}),
    });
    try {
      await this.manager.delete(request);
    } catch (error) {
      const normalized = normalizeArtifactEventError(error);
      await this.events.publish(
        normalized.code === 'ARTIFACT_DELETE_BLOCKED'
          ? 'artifact.delete.blocked'
          : 'artifact.delete.failed',
        {
          operationId: request.operationId,
          artifactId: request.artifactId,
          error: normalized,
        }
      );
      throw error;
    }
    await this.events.publish('artifact.deleted', {
      operationId: request.operationId,
      artifactId: request.artifactId,
      status: 'deleted',
    });
  }

  traceLineage(artifactId: string): Promise<ArtifactLineage> {
    return this.manager.traceLineage(artifactId);
  }

  latest(logicalArtifactId: string): Promise<ArtifactRecord | null> {
    return this.manager.latest(logicalArtifactId);
  }

  previous(versionId: string): Promise<ArtifactRecord | null> {
    return this.manager.previous(versionId);
  }

  profile(ref: SpecRef): Promise<ArtifactProfileSpec | null> {
    return this.manager.profile(ref);
  }

  health(): Promise<Record<string, ProviderHealth>> {
    return this.manager.health();
  }

  private async createArtifact(
    request: ArtifactCreateRequest | ArtifactFromWorkspaceRequest,
    create: () => Promise<ArtifactRecord>
  ): Promise<ArtifactRecord> {
    const context = requestContext(request);
    await this.events.publish(
      'artifact.create.requested',
      {
        operationId: request.operationId,
        workspaceId: request.workspaceId,
        profileRef: request.profileRef,
      },
      context
    );
    let record: ArtifactRecord;
    try {
      record = await create();
    } catch (error) {
      await this.events.publish(
        'artifact.create.failed',
        {
          operationId: request.operationId,
          workspaceId: request.workspaceId,
          error: normalizeArtifactEventError(error),
        },
        context
      );
      throw error;
    }
    await this.events.publish(
      'artifact.created',
      recordPayload(request.operationId, record),
      recordContext(record)
    );
    await this.publishLineage(request.operationId, record);
    return record;
  }

  private async mutate<TType extends 'artifact.finalized' | 'artifact.archived' | 'artifact.invalidated'>(
    request: ArtifactMutationRequest,
    type: TType,
    mutation: () => Promise<ArtifactRecord>
  ): Promise<ArtifactRecord> {
    const record = await mutation();
    await this.events.publish(
      type,
      {
        operationId: request.operationId,
        artifactId: record.id,
        versionId: record.versionId,
        workspaceId: record.workspaceId,
        status: record.status,
        ...(request.reason ? { reason: request.reason } : {}),
      } as ArtifactEventPayloadMap[TType],
      recordContext(record)
    );
    return record;
  }

  private async publishLineage(operationId: string, record: ArtifactRecord): Promise<void> {
    if (!record.sourceArtifactIds?.length) return;
    await this.events.publish(
      'artifact.lineage.recorded',
      {
        operationId,
        artifactId: record.id,
        versionId: record.versionId,
        workspaceId: record.workspaceId,
        artifactRefs: [...new Set(record.sourceArtifactIds)],
      },
      recordContext(record)
    );
  }
}

export class EventingArtifactGarbageCollector implements ArtifactGarbageCollector {
  private readonly collector: ArtifactGarbageCollector;
  private readonly events: ArtifactEventEmitter;
  private readonly context: ArtifactEventContext;

  constructor(options: EventingArtifactGarbageCollectorOptions) {
    this.collector = options.collector;
    this.events = new ArtifactEventEmitter(options);
    this.context = publicationContext(options);
  }

  async collect(input: ArtifactGarbageCollectionRequest): Promise<ArtifactGarbageCollectionResult> {
    const request = validateArtifactGarbageCollectionRequest(input);
    let result: ArtifactGarbageCollectionResult;
    try {
      result = await this.collector.collect(request);
    } catch (error) {
      await this.events.publish(
        'artifact.gc.failed',
        { operationId: request.operationId, error: normalizeArtifactEventError(error) },
        this.context
      );
      throw error;
    }
    if (result.failures.length > 0) {
      const first = result.failures[0]!;
      await this.events.publish(
        'artifact.gc.failed',
        {
          operationId: request.operationId,
          candidateObjects: result.candidateObjects,
          deletedObjects: result.deletedObjects,
          missingObjects: result.missingObjects,
          reclaimedBytes: result.reclaimedBytes,
          error: normalizeGcFailure(first.code, first.message, first.retryable),
          metadata: { failureCount: result.failures.length, dryRun: result.dryRun },
        },
        this.context
      );
    } else {
      await this.events.publish(
        'artifact.gc.completed',
        {
          operationId: request.operationId,
          candidateObjects: result.candidateObjects,
          deletedObjects: result.deletedObjects,
          missingObjects: result.missingObjects,
          reclaimedBytes: result.reclaimedBytes,
          metadata: { dryRun: result.dryRun },
        },
        this.context
      );
    }
    return result;
  }
}

class ArtifactEventEmitter {
  private readonly publisher: ArtifactEventPublisher;
  private readonly idGenerator: () => string;
  private readonly now: () => string;

  constructor(options: {
    publisher: ArtifactEventPublisher;
    idGenerator: () => string;
    now?: () => string;
  }) {
    if (!options.publisher || typeof options.publisher.publish !== 'function') {
      throw new TypeError('Artifact event publisher is required.');
    }
    if (typeof options.idGenerator !== 'function') throw new TypeError('idGenerator is required.');
    this.publisher = options.publisher;
    this.idGenerator = options.idGenerator;
    this.now = options.now ?? (() => new Date().toISOString());
  }

  operationId(kind: string): string {
    return `operation.artifact.${safeEventSegment(kind)}.${this.nextId()}`;
  }

  async publish<TType extends ArtifactFrameworkEventType>(
    type: TType,
    payload: ArtifactEventPayloadMap[TType],
    context: ArtifactEventContext = {}
  ): Promise<void> {
    const publication = validateArtifactEventPublication({
      id: eventId(type, payload),
      type,
      timestamp: this.timestamp(),
      ...context,
      payload,
    });
    await this.publisher.publish(publication);
  }

  private nextId(): string {
    const value = this.idGenerator().trim();
    if (!value) throw artifactManagerError('ARTIFACT_INTERNAL_ERROR', 'idGenerator returned empty.');
    return value;
  }

  private timestamp(): string {
    const value = this.now();
    if (!Number.isFinite(Date.parse(value))) {
      throw artifactManagerError('ARTIFACT_INTERNAL_ERROR', 'Artifact event clock returned invalid time.');
    }
    return value;
  }
}

function requestContext(
  request: ArtifactCreateRequest | ArtifactFromWorkspaceRequest
): ArtifactEventContext {
  return {
    workspaceId: request.workspaceId,
    ...(request.sessionId ? { sessionId: request.sessionId } : {}),
    ...(request.runId ? { runId: request.runId } : {}),
    ...(request.agentId ? { agentId: request.agentId } : {}),
  };
}

function recordContext(record: ArtifactRecord): ArtifactEventContext {
  return {
    workspaceId: record.workspaceId,
    ...(record.sessionId ? { sessionId: record.sessionId } : {}),
    ...(record.runId ? { runId: record.runId } : {}),
    ...(record.agentId ? { agentId: record.agentId } : {}),
  };
}

function publicationContext(input: EventingArtifactGarbageCollectorOptions): ArtifactEventContext {
  return {
    ...(input.workspaceId ? { workspaceId: input.workspaceId } : {}),
    ...(input.sessionId ? { sessionId: input.sessionId } : {}),
    ...(input.runId ? { runId: input.runId } : {}),
    ...(input.agentId ? { agentId: input.agentId } : {}),
  };
}

function recordPayload(
  operationId: string,
  record: ArtifactRecord
): ArtifactEventPayloadMap['artifact.created'] {
  return {
    operationId,
    artifactId: record.id,
    versionId: record.versionId,
    logicalArtifactId: record.logicalArtifactId,
    workspaceId: record.workspaceId,
    executionId: record.provenance.executionId,
    contentHash: record.contentHash,
    sizeBytes: record.sizeBytes,
    status: 'draft',
  };
}

function normalizeArtifactEventError(error: unknown): NormalizedArtifactError {
  if (error instanceof ArtifactManagerError) {
    return {
      code: error.normalizedError.code,
      message: error.normalizedError.message,
      retryable: error.normalizedError.retryable,
      ...(error.normalizedError.causeRef ? { causeRef: error.normalizedError.causeRef } : {}),
    };
  }
  return {
    code: 'ARTIFACT_INTERNAL_ERROR',
    message: 'Artifact operation failed unexpectedly.',
    retryable: false,
  };
}

function normalizeGcFailure(code: string, message: string, retryable: boolean): NormalizedArtifactError {
  const parsed = normalizedArtifactErrorSchema.shape.code.safeParse(code);
  return {
    code: parsed.success ? parsed.data : 'ARTIFACT_INTERNAL_ERROR',
    message: message.trim() || 'Artifact garbage collection failed.',
    retryable,
  };
}

function eventId<TType extends ArtifactFrameworkEventType>(
  type: TType,
  payload: ArtifactEventPayloadMap[TType]
): string {
  return [
    'artifact-event',
    type,
    payload.operationId,
    payload.artifactId,
    payload.versionId,
  ]
    .filter((value): value is string => Boolean(value))
    .map(safeEventSegment)
    .join('.');
}

function safeEventSegment(value: string): string {
  return value.replace(/[^A-Za-z0-9._-]+/gu, '_').replace(/^\.+|\.+$/gu, '') || 'event';
}
