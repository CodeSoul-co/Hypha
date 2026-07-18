import type {
  ArtifactIdempotencyRecord,
  ArtifactRecordCommitRequest,
  ArtifactRecordRepository,
  ProviderHealth,
  StoredArtifactRecord,
} from '@hypha/core';
import {
  ArtifactRecordRepositoryConflictError,
  validateArtifactRecord,
} from '@hypha/core';

export interface InMemoryArtifactRecordRepositoryOptions {
  id?: string;
  now?: () => string;
}

export class InMemoryArtifactRecordRepository implements ArtifactRecordRepository {
  readonly id: string;
  private readonly now: () => string;
  private readonly recordsByVersion = new Map<string, StoredArtifactRecord>();
  private readonly idempotency = new Map<string, ArtifactIdempotencyRecord>();

  constructor(options: InMemoryArtifactRecordRepositoryOptions = {}) {
    this.id = options.id ?? 'artifact-record-repository.in-memory.execution';
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async get(artifactId: string, versionId?: string): Promise<StoredArtifactRecord | null> {
    if (versionId) {
      const stored = this.recordsByVersion.get(versionId);
      return stored?.record.id === artifactId ? cloneStoredRecord(stored) : null;
    }
    const latest = this.latestForArtifact(artifactId);
    return latest ? cloneStoredRecord(latest) : null;
  }

  async getByVersionId(versionId: string): Promise<StoredArtifactRecord | null> {
    const stored = this.recordsByVersion.get(versionId);
    return stored ? cloneStoredRecord(stored) : null;
  }

  async list(): Promise<StoredArtifactRecord[]> {
    return [...this.recordsByVersion.values()]
      .sort(compareStoredRecords)
      .map(cloneStoredRecord);
  }

  async findIdempotency(
    operationId: string,
    idempotencyKey: string
  ): Promise<StoredArtifactRecord | null> {
    const result = this.idempotency.get(idempotencyMapKey(operationId, idempotencyKey));
    if (!result) return null;
    return this.get(result.artifactId, result.versionId);
  }

  async commit(request: ArtifactRecordCommitRequest): Promise<void> {
    if (request.records.length === 0) {
      throw new TypeError('Artifact record commit must include at least one record.');
    }
    this.assertRevisionFence(request);
    const validated = request.records.map(validateStoredRecord);
    this.assertRecordUpdates(validated);
    this.assertIdempotency(request.idempotency);

    for (const stored of validated) {
      this.recordsByVersion.set(stored.record.versionId, cloneStoredRecord(stored));
    }
    if (request.idempotency) {
      this.idempotency.set(
        idempotencyMapKey(
          request.idempotency.operationId,
          request.idempotency.idempotencyKey
        ),
        { ...request.idempotency }
      );
    }
  }

  async health(): Promise<ProviderHealth> {
    return {
      status: 'healthy',
      checkedAt: this.now(),
      details: {
        repositoryId: this.id,
        records: this.recordsByVersion.size,
        idempotencyRecords: this.idempotency.size,
      },
    };
  }

  private assertRevisionFence(request: ArtifactRecordCommitRequest): void {
    const fence = request.expectedLatest;
    if (!fence) return;
    const latest = this.latestForArtifact(fence.artifactId);
    if (
      !latest ||
      latest.record.versionId !== fence.versionId ||
      latest.record.revision !== fence.revision
    ) {
      throw new ArtifactRecordRepositoryConflictError(
        'Artifact revision fence no longer matches the latest persisted version.',
        {
          artifactId: fence.artifactId,
          expectedVersionId: fence.versionId,
          expectedRevision: fence.revision,
          actualVersionId: latest?.record.versionId,
          actualRevision: latest?.record.revision,
        }
      );
    }
  }

  private assertRecordUpdates(records: StoredArtifactRecord[]): void {
    for (const stored of records) {
      const existing = this.recordsByVersion.get(stored.record.versionId);
      if (existing && existing.record.id !== stored.record.id) {
        throw new ArtifactRecordRepositoryConflictError(
          'Artifact version ID is already owned by another Artifact.',
          {
            versionId: stored.record.versionId,
            artifactId: stored.record.id,
            existingArtifactId: existing.record.id,
          }
        );
      }
    }
  }

  private assertIdempotency(result?: ArtifactIdempotencyRecord): void {
    if (!result) return;
    const existing = this.idempotency.get(
      idempotencyMapKey(result.operationId, result.idempotencyKey)
    );
    if (
      existing &&
      (existing.artifactId !== result.artifactId || existing.versionId !== result.versionId)
    ) {
      throw new ArtifactRecordRepositoryConflictError(
        'Artifact idempotency key is already bound to a different result.',
        {
          operationId: result.operationId,
          idempotencyKey: result.idempotencyKey,
          artifactId: existing.artifactId,
          versionId: existing.versionId,
        }
      );
    }
  }

  private latestForArtifact(artifactId: string): StoredArtifactRecord | undefined {
    return [...this.recordsByVersion.values()]
      .filter((stored) => stored.record.id === artifactId)
      .sort((left, right) => right.record.versionNumber - left.record.versionNumber)[0];
  }
}

function validateStoredRecord(stored: StoredArtifactRecord): StoredArtifactRecord {
  if (!stored.profileRef.id.trim()) throw new TypeError('Artifact profileRef.id is required.');
  return {
    record: validateArtifactRecord(stored.record),
    profileRef: { ...stored.profileRef },
  };
}

function cloneStoredRecord(stored: StoredArtifactRecord): StoredArtifactRecord {
  return structuredClone(stored);
}

function compareStoredRecords(left: StoredArtifactRecord, right: StoredArtifactRecord): number {
  return (
    left.record.createdAt.localeCompare(right.record.createdAt) ||
    left.record.id.localeCompare(right.record.id) ||
    left.record.versionNumber - right.record.versionNumber
  );
}

function idempotencyMapKey(operationId: string, idempotencyKey: string): string {
  return `${operationId}\u0000${idempotencyKey}`;
}
