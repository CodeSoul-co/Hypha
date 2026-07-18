import type {
  ArtifactIdempotencyRecord,
  ArtifactGarbageCollectionCandidate,
  ArtifactGarbageCollectionClaimRequest,
  ArtifactGarbageCollectionScanRequest,
  ArtifactRecordCommitRequest,
  ArtifactRecordRepository,
  ProviderHealth,
  StoredArtifactRecord,
} from '@hypha/core';
import { ArtifactRecordRepositoryConflictError } from '@hypha/core';
import {
  artifactIdempotencyMapKey,
  cloneStoredArtifactRecord,
  compareStoredArtifactRecords,
  validateStoredArtifactRecord,
} from './artifact-record-repository-values';
import {
  artifactStorageKey,
  buildArtifactGarbageCollectionCandidates,
  sameCandidateVersions,
  type ArtifactGarbageCollectionRecordState,
} from './artifact-gc-values';

export interface InMemoryArtifactRecordRepositoryOptions {
  id?: string;
  now?: () => string;
}

export class InMemoryArtifactRecordRepository implements ArtifactRecordRepository {
  readonly id: string;
  private readonly now: () => string;
  private readonly recordsByVersion = new Map<string, StoredArtifactRecord>();
  private readonly idempotency = new Map<string, ArtifactIdempotencyRecord>();
  private readonly garbageCollection = new Map<string, ArtifactGarbageCollectionRecordState>();

  constructor(options: InMemoryArtifactRecordRepositoryOptions = {}) {
    this.id = options.id ?? 'artifact-record-repository.in-memory.execution';
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async get(artifactId: string, versionId?: string): Promise<StoredArtifactRecord | null> {
    if (versionId) {
      const stored = this.recordsByVersion.get(versionId);
      return stored?.record.id === artifactId ? cloneStoredArtifactRecord(stored) : null;
    }
    const latest = this.latestForArtifact(artifactId);
    return latest ? cloneStoredArtifactRecord(latest) : null;
  }

  async getByVersionId(versionId: string): Promise<StoredArtifactRecord | null> {
    const stored = this.recordsByVersion.get(versionId);
    return stored ? cloneStoredArtifactRecord(stored) : null;
  }

  async list(): Promise<StoredArtifactRecord[]> {
    return [...this.recordsByVersion.values()]
      .sort(compareStoredRecords)
      .map(cloneStoredArtifactRecord);
  }

  async findIdempotency(
    operationId: string,
    idempotencyKey: string
  ): Promise<StoredArtifactRecord | null> {
    const result = this.idempotency.get(artifactIdempotencyMapKey(operationId, idempotencyKey));
    if (!result) return null;
    return this.get(result.artifactId, result.versionId);
  }

  async commit(request: ArtifactRecordCommitRequest): Promise<void> {
    if (request.records.length === 0) {
      throw new TypeError('Artifact record commit must include at least one record.');
    }
    this.assertRevisionFence(request);
    const validated = request.records.map(validateStoredArtifactRecord);
    this.assertRecordUpdates(validated);
    this.assertIdempotency(request.idempotency, validated);
    this.assertGarbageCollectionClaims(validated);

    for (const stored of validated) {
      this.recordsByVersion.set(stored.record.versionId, cloneStoredArtifactRecord(stored));
      const key = artifactStorageKey(stored.record.storageRef);
      const existing = this.garbageCollection.get(stored.record.versionId);
      this.garbageCollection.set(
        stored.record.versionId,
        existing?.storageKey === key ? existing : { storageKey: key }
      );
    }
    if (request.idempotency) {
      this.idempotency.set(
        artifactIdempotencyMapKey(
          request.idempotency.operationId,
          request.idempotency.idempotencyKey
        ),
        { ...request.idempotency }
      );
    }
  }

  async listGarbageCollectionCandidates(
    request: ArtifactGarbageCollectionScanRequest
  ): Promise<ArtifactGarbageCollectionCandidate[]> {
    return buildArtifactGarbageCollectionCandidates(this.garbageCollectionEntries(), request);
  }

  async claimGarbageCollection(request: ArtifactGarbageCollectionClaimRequest): Promise<boolean> {
    const current = buildArtifactGarbageCollectionCandidates(this.garbageCollectionEntries(), {
      staleBefore: request.staleBefore,
    }).find((candidate) => sameCandidateVersions(candidate, request.candidate));
    if (!current) return false;
    for (const versionId of current.versionIds) {
      const state = this.garbageCollection.get(versionId)!;
      if (state.completedAt) continue;
      this.garbageCollection.set(versionId, {
        ...state,
        claimId: request.claimId,
        claimedAt: request.claimedAt,
      });
    }
    return true;
  }

  async completeGarbageCollection(claimId: string, completedAt: string): Promise<void> {
    for (const [versionId, state] of this.garbageCollection) {
      if (state.claimId !== claimId) continue;
      this.garbageCollection.set(versionId, {
        storageKey: state.storageKey,
        completedAt,
      });
    }
  }

  async releaseGarbageCollection(claimId: string): Promise<void> {
    for (const [versionId, state] of this.garbageCollection) {
      if (state.claimId !== claimId) continue;
      this.garbageCollection.set(versionId, { storageKey: state.storageKey });
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
        garbageCollectionClaims: [...this.garbageCollection.values()].filter(
          (state) => state.claimId
        ).length,
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

  private assertIdempotency(
    result: ArtifactIdempotencyRecord | undefined,
    records: StoredArtifactRecord[]
  ): void {
    if (!result) return;
    const existing = this.idempotency.get(
      artifactIdempotencyMapKey(result.operationId, result.idempotencyKey)
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
    const targetInCommit = records.some(
      (stored) =>
        stored.record.id === result.artifactId && stored.record.versionId === result.versionId
    );
    const targetPersisted = this.recordsByVersion.get(result.versionId);
    if (!targetInCommit && (!targetPersisted || targetPersisted.record.id !== result.artifactId)) {
      throw new ArtifactRecordRepositoryConflictError(
        'Artifact idempotency result must reference a committed Artifact version.',
        { artifactId: result.artifactId, versionId: result.versionId }
      );
    }
  }

  private latestForArtifact(artifactId: string): StoredArtifactRecord | undefined {
    return [...this.recordsByVersion.values()]
      .filter((stored) => stored.record.id === artifactId)
      .sort((left, right) => right.record.versionNumber - left.record.versionNumber)[0];
  }

  private assertGarbageCollectionClaims(records: StoredArtifactRecord[]): void {
    for (const stored of records) {
      const key = artifactStorageKey(stored.record.storageRef);
      const claimed = [...this.garbageCollection.values()].some(
        (state) => state.storageKey === key && state.claimId && !state.completedAt
      );
      if (claimed) {
        throw new ArtifactRecordRepositoryConflictError(
          'Artifact storage reference is currently claimed by garbage collection.',
          {
            storeId: stored.record.storageRef.storeId,
            objectKey: stored.record.storageRef.objectKey,
          }
        );
      }
    }
  }

  private garbageCollectionEntries() {
    return [...this.recordsByVersion.values()].map((stored) => ({
      stored: cloneStoredArtifactRecord(stored),
      state: { ...this.garbageCollection.get(stored.record.versionId)! },
    }));
  }
}

function compareStoredRecords(left: StoredArtifactRecord, right: StoredArtifactRecord): number {
  return compareStoredArtifactRecords(left, right);
}
