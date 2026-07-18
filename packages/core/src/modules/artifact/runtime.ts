import type {
  ArtifactAccessRecord,
  ArtifactArchiveRequest,
  ArtifactCreateRequest,
  ArtifactDeleteRequest,
  ArtifactFinalizeRequest,
  ArtifactFromWorkspaceRequest,
  ArtifactGetRecordRequest,
  ArtifactInvalidateRequest,
  ArtifactLineage,
  ArtifactLineageNode,
  ArtifactListRequest,
  ArtifactManager,
  ArtifactMutationRequest,
  ArtifactProfileSpec,
  ArtifactReadRequest,
  ArtifactReadResult,
  ArtifactRecord,
  ArtifactRecordRepository,
  ArtifactRetentionRecord,
  ArtifactStoreProvider,
  ArtifactVersionRequest,
  ArtifactWorkspaceContentReader,
  ProviderHealth,
  SpecRef,
  StoredArtifactRecord,
} from '../..';
import {
  ArtifactRecordRepositoryConflictError,
  ArtifactRecordRepositoryError,
} from '../../contracts/artifact-record-repository';
import {
  validateArtifactProfileSpec,
  validateArtifactRecord,
} from './index';
import {
  validateArtifactCreateRequest,
  validateArtifactFromWorkspaceRequest,
  validateArtifactGetRecordRequest,
  validateArtifactListRequest,
  validateArtifactMutationRequest,
  validateArtifactReadRequest,
  validateArtifactVersionRequest,
} from './manager';
import { persistArtifactContent } from './manager-content';
import {
  ArtifactManagerError,
  artifactManagerError,
  validateArtifactManagerInput,
} from './manager-error';
import {
  assertCreateAccess,
  assertProfilePermission,
  assertRecordPermission,
  canAccessRecord,
  profileReference,
  resolveProfileRef,
} from './manager-policy';

export interface DefaultArtifactManagerOptions {
  profiles: ArtifactProfileSpec[];
  stores: ArtifactStoreProvider[];
  repository: ArtifactRecordRepository;
  workspaceReader?: ArtifactWorkspaceContentReader;
  idGenerator: () => string;
  now?: () => string;
}

export class DefaultArtifactManager implements ArtifactManager {
  private readonly profiles: ArtifactProfileSpec[];
  private readonly stores = new Map<string, ArtifactStoreProvider>();
  private readonly repository: ArtifactRecordRepository;
  private readonly workspaceReader?: ArtifactWorkspaceContentReader;
  private readonly idGenerator: () => string;
  private readonly now: () => string;
  private readonly locks = new Map<string, Promise<void>>();

  constructor(options: DefaultArtifactManagerOptions) {
    if (!options.profiles.length) throw new TypeError('At least one Artifact profile is required.');
    if (!options.stores.length) throw new TypeError('At least one Artifact Store is required.');
    if (typeof options.idGenerator !== 'function') throw new TypeError('idGenerator is required.');
    this.profiles = options.profiles.map((profile) =>
      validateArtifactManagerInput(() => validateArtifactProfileSpec(profile))
    );
    for (const store of options.stores) {
      if (this.stores.has(store.id)) throw new TypeError(`Duplicate Artifact Store ${store.id}.`);
      this.stores.set(store.id, store);
    }
    for (const profile of this.profiles) {
      if (!this.stores.has(profile.storeRef.id)) {
        throw new TypeError(
          `Artifact profile ${profile.id} references unregistered Store ${profile.storeRef.id}.`
        );
      }
    }
    this.repository = options.repository;
    this.workspaceReader = options.workspaceReader;
    this.idGenerator = options.idGenerator;
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async create(input: ArtifactCreateRequest): Promise<ArtifactRecord> {
    const request = validateArtifactManagerInput(() => validateArtifactCreateRequest(input));
    const lockKey = request.idempotencyKey
      ? `idempotency:${request.operationId}:${request.idempotencyKey}`
      : `create:${this.nextId('lock')}`;
    return this.withLock(lockKey, () => this.createUnlocked(request, false));
  }

  async createFromWorkspace(input: ArtifactFromWorkspaceRequest): Promise<ArtifactRecord> {
    const request = validateArtifactManagerInput(() => validateArtifactFromWorkspaceRequest(input));
    const lockKey = request.idempotencyKey
      ? `idempotency:${request.operationId}:${request.idempotencyKey}`
      : `workspace-create:${this.nextId('lock')}`;
    return this.withLock(lockKey, async () => {
      const idempotent = await this.findIdempotent(request.operationId, request.idempotencyKey);
      if (idempotent) {
        assertRecordPermission(
          this.requireProfile(idempotent.profileRef),
          idempotent.record,
          request.principal,
          'write'
        );
        return idempotent.record;
      }
      const profile = this.requireProfile(request.profileRef);
      assertProfilePermission(profile, request.principal, 'write');
      if (!this.workspaceReader) {
        throw artifactManagerError(
          'ARTIFACT_STORE_UNAVAILABLE',
          'Artifact Manager has no governed Workspace content reader configured.'
        );
      }
      const source = await this.workspaceReader.read({
        principal: request.principal,
        workspaceId: request.workspaceId,
        relativePath: request.relativePath,
        ...(profile.maxArtifactBytes ? { maxBytes: profile.maxArtifactBytes } : {}),
      });
      return this.createUnlocked(
        {
          ...request,
          name: request.name ?? artifactNameFromPath(request.relativePath),
          content: source.content,
          mimeType: request.mimeType ?? source.mimeType,
          expectedContentHash: qualifiedContentHash(source.contentHash),
          expectedSizeBytes: source.sizeBytes,
        },
        true
      );
    });
  }

  async createVersion(input: ArtifactVersionRequest): Promise<ArtifactRecord> {
    const request = validateArtifactManagerInput(() => validateArtifactVersionRequest(input));
    return this.withLock(`artifact:${request.artifactId}`, async () => {
      const idempotent = await this.findIdempotent(request.operationId, request.idempotencyKey);
      if (idempotent) {
        assertRecordPermission(
          this.requireProfile(idempotent.profileRef),
          idempotent.record,
          request.principal,
          'write'
        );
        return idempotent.record;
      }
      const previous = await this.requireStoredRecord(request.artifactId);
      const profile = this.requireProfile(previous.profileRef);
      assertRecordPermission(profile, previous.record, request.principal, 'write');
      if (previous.record.revision !== request.expectedRevision) {
        throw revisionConflict(previous.record, request.expectedRevision);
      }
      if (previous.record.status === 'deleted' || previous.record.status === 'deletion_pending') {
        throw artifactManagerError(
          'ARTIFACT_VERSION_CONFLICT',
          'Deleted Artifacts cannot receive a new version.'
        );
      }
      const versions = (await this.repositoryOperation(() => this.repository.list())).filter(
        (stored) => stored.record.id === previous.record.id
      );
      if (
        profile.versioning.maxVersions !== undefined &&
        versions.length >= profile.versioning.maxVersions
      ) {
        throw artifactManagerError(
          'ARTIFACT_VERSION_CONFLICT',
          'Artifact has reached the profile maximum version count.',
          false,
          { maxVersions: profile.versioning.maxVersions }
        );
      }
      this.assertContentPolicy(profile, previous.record.kind, previous.record.mimeType, request);
      const persisted = await persistArtifactContent({
        ...request,
        profile,
        store: this.requireStore(profile),
        nonce: this.nextId('content'),
      });
      const timestamp = this.timestamp();
      const versionNumber = previous.record.versionNumber + 1;
      const versionId = artifactVersionId(
        previous.record.logicalArtifactId,
        versionNumber,
        persisted.contentHash
      );
      const updatedPrevious = validateArtifactRecord({
        ...previous.record,
        nextVersionId: versionId,
        revision: previous.record.revision + 1,
        updatedAt: timestamp,
      });
      const next = validateArtifactRecord({
        ...previous.record,
        versionId,
        versionNumber,
        revision: previous.record.revision + 1,
        sizeBytes: persisted.sizeBytes,
        contentHash: persisted.contentHash,
        storageRef: persisted.storageRef,
        parentVersionId: previous.record.versionId,
        previousVersionId: previous.record.versionId,
        nextVersionId: undefined,
        sourceArtifactIds: request.provenance.sourceArtifactIds,
        provenance: request.provenance,
        status: 'draft',
        immutable: false,
        createdAt: timestamp,
        updatedAt: timestamp,
        finalizedAt: undefined,
        archivedAt: undefined,
        deletedAt: undefined,
        metadata: request.metadata ?? previous.record.metadata,
      });
      try {
        await this.commitRecords(
          [
            { record: updatedPrevious, profileRef: previous.profileRef },
            { record: next, profileRef: previous.profileRef },
          ],
          {
            artifactId: previous.record.id,
            versionId: previous.record.versionId,
            revision: request.expectedRevision,
          },
          idempotencyResult(request, next)
        );
        return next;
      } catch (error) {
        return this.reconcileIdempotency(error, request, request.principal, 'write');
      }
    });
  }

  async get(request: ArtifactGetRecordRequest): Promise<ArtifactRecord | null> {
    const validated = validateArtifactManagerInput(() => validateArtifactGetRecordRequest(request));
    const latest = await this.repositoryOperation(() =>
      this.repository.get(validated.artifactId)
    );
    if (!latest || latest.record.status === 'deleted') return null;
    const stored = await this.repositoryOperation(() =>
      this.repository.get(validated.artifactId, validated.versionId)
    );
    if (!stored) return null;
    assertRecordPermission(
      this.requireProfile(stored.profileRef),
      stored.record,
      validated.principal,
      'read'
    );
    return stored.record;
  }

  async read(input: ArtifactReadRequest): Promise<ArtifactReadResult> {
    const request = validateArtifactManagerInput(() => validateArtifactReadRequest(input));
    const latest = await this.requireStoredRecord(request.artifactId);
    if (latest.record.status === 'deleted') {
      throw artifactManagerError('ARTIFACT_NOT_FOUND', 'Artifact has been deleted.');
    }
    const stored = await this.requireStoredRecord(request.artifactId, request.versionId);
    const profile = this.requireProfile(stored.profileRef);
    assertRecordPermission(profile, stored.record, request.principal, 'read');
    if (request.range && profile.access.allowRangeRead !== true) {
      throw artifactManagerError(
        'ARTIFACT_PERMISSION_DENIED',
        'Artifact profile does not allow byte-range reads.'
      );
    }
    const content = await this.requireStore(profile).get({
      ref: stored.record.storageRef,
      range: request.range,
      expectedContentHash:
        request.expectedContentHash ??
        (profile.contentAddressing.verifyOnRead ? stored.record.contentHash : undefined),
    });
    return { record: stored.record, content };
  }

  async list(input: ArtifactListRequest): Promise<ArtifactRecord[]> {
    const request = validateArtifactManagerInput(() => validateArtifactListRequest(input));
    const latest = latestStoredByArtifact(
      await this.repositoryOperation(() => this.repository.list())
    );
    return latest
      .filter((stored) => stored.record.workspaceId === request.workspaceId)
      .filter((stored) => request.includeDeleted || stored.record.status !== 'deleted')
      .filter(
        (stored) =>
          !request.logicalArtifactId ||
          stored.record.logicalArtifactId === request.logicalArtifactId
      )
      .filter((stored) => !request.kinds || request.kinds.includes(stored.record.kind))
      .filter((stored) => !request.statuses || request.statuses.includes(stored.record.status))
      .filter(
        (stored) =>
          !request.tags || request.tags.every((tag) => stored.record.tags?.includes(tag))
      )
      .filter((stored) => {
        const profile = this.resolveProfile(stored.profileRef);
        return Boolean(
          profile &&
            canAccessRecord(stored.record, request.principal) &&
            hasRequiredReadScopes(profile, request.principal.permissionScopes)
        );
      })
      .slice(0, request.limit)
      .map((stored) => stored.record);
  }

  finalize(request: ArtifactFinalizeRequest): Promise<ArtifactRecord> {
    return this.mutate(request, 'final');
  }

  archive(request: ArtifactArchiveRequest): Promise<ArtifactRecord> {
    return this.mutate(request, 'archived');
  }

  invalidate(request: ArtifactInvalidateRequest): Promise<ArtifactRecord> {
    return this.mutate(request, 'invalidated');
  }

  async delete(input: ArtifactDeleteRequest): Promise<void> {
    const request = validateArtifactManagerInput(() => validateArtifactMutationRequest(input));
    await this.withLock(`artifact:${request.artifactId}`, async () => {
      const idempotent = await this.findIdempotent(request.operationId, request.idempotencyKey);
      if (idempotent) {
        assertRecordPermission(
          this.requireProfile(idempotent.profileRef),
          idempotent.record,
          request.principal,
          'delete'
        );
        return;
      }
      const stored = await this.requireStoredRecord(request.artifactId);
      const profile = this.requireProfile(stored.profileRef);
      assertRecordPermission(profile, stored.record, request.principal, 'delete');
      if (stored.record.revision !== request.expectedRevision) {
        throw revisionConflict(stored.record, request.expectedRevision);
      }
      if (stored.record.retention.legalHold) {
        throw artifactManagerError(
          'ARTIFACT_DELETE_BLOCKED',
          'Artifact is protected by a legal hold.'
        );
      }
      if ((stored.record.retention.referencedByCount ?? 0) > 0) {
        throw artifactManagerError(
          'ARTIFACT_DELETE_BLOCKED',
          'Artifact is still referenced and cannot be deleted.',
          false,
          { referencedByCount: stored.record.retention.referencedByCount }
        );
      }
      if (stored.record.status === 'final' && profile.retention.retainFinal) {
        throw artifactManagerError(
          'ARTIFACT_DELETE_BLOCKED',
          'Final Artifact retention policy blocks deletion.'
        );
      }
      const timestamp = this.timestamp();
      const deleted = validateArtifactRecord({
        ...stored.record,
        status: 'deleted',
        revision: stored.record.revision + 1,
        updatedAt: timestamp,
        deletedAt: timestamp,
      });
      try {
        await this.commitRecords(
          [{ record: deleted, profileRef: stored.profileRef }],
          latestFence(stored),
          idempotencyResult(request, deleted)
        );
      } catch (error) {
        await this.reconcileIdempotency(error, request, request.principal, 'delete');
      }
    });
  }

  async traceLineage(artifactId: string): Promise<ArtifactLineage> {
    const all = await this.repositoryOperation(() => this.repository.list());
    const versions = all
      .filter((stored) => stored.record.id === artifactId)
      .map((stored) => stored.record)
      .sort((left, right) => left.versionNumber - right.versionNumber);
    if (!versions.length) {
      throw artifactManagerError('ARTIFACT_NOT_FOUND', `Artifact ${artifactId} was not found.`);
    }
    const latest = latestStoredByArtifact(all);
    return {
      artifactId,
      ancestors: collectAncestors(artifactId, latest),
      descendants: collectDescendants(artifactId, latest),
      versions,
    };
  }

  async latest(logicalArtifactId: string): Promise<ArtifactRecord | null> {
    const candidates = (await this.repositoryOperation(() => this.repository.list()))
      .filter((stored) => stored.record.logicalArtifactId === logicalArtifactId)
      .sort((left, right) => right.record.versionNumber - left.record.versionNumber);
    const latest = candidates[0]?.record;
    return latest?.status === 'deleted' ? null : (latest ?? null);
  }

  async previous(versionId: string): Promise<ArtifactRecord | null> {
    const stored = await this.repositoryOperation(() =>
      this.repository.getByVersionId(versionId)
    );
    if (!stored?.record.previousVersionId) return null;
    return (
      (
        await this.repositoryOperation(() =>
          this.repository.getByVersionId(stored.record.previousVersionId!)
        )
      )?.record ?? null
    );
  }

  async profile(ref: SpecRef): Promise<ArtifactProfileSpec | null> {
    const profile = this.resolveProfile(ref);
    return profile ? structuredClone(profile) : null;
  }

  async health(): Promise<Record<string, ProviderHealth>> {
    const results: Record<string, ProviderHealth> = {
      'artifact-records': await this.repository.health().catch((error) => ({
        status: 'unhealthy',
        checkedAt: this.timestamp(),
        message: error instanceof Error ? error.message : String(error),
      })),
    };
    for (const [id, store] of this.stores) results[id] = await store.health();
    return results;
  }

  private async createUnlocked(
    request: ArtifactCreateRequest,
    trustedWorkspaceSource: boolean
  ): Promise<ArtifactRecord> {
    const idempotent = await this.findIdempotent(request.operationId, request.idempotencyKey);
    if (idempotent) {
      assertRecordPermission(
        this.requireProfile(idempotent.profileRef),
        idempotent.record,
        request.principal,
        'write'
      );
      return idempotent.record;
    }
    const profile = this.requireProfile(request.profileRef);
    assertProfilePermission(profile, request.principal, 'write');
    this.assertContentPolicy(profile, request.kind, request.mimeType, request, trustedWorkspaceSource);
    const access: ArtifactAccessRecord = request.access ?? {
      visibility: profile.access.defaultVisibility,
      ownerPrincipalId: request.principal.principalId,
      workspaceId: request.workspaceId,
    };
    assertCreateAccess(access, request.principal, request.workspaceId, request.tenantId);
    const retention = this.retentionRecord(profile, request.retention);
    const persisted = await persistArtifactContent({
      ...request,
      profile,
      store: this.requireStore(profile),
      nonce: this.nextId('content'),
    });
    const artifactId = this.nextId('artifact');
    const logicalArtifactId = request.logicalArtifactId ?? artifactId;
    const timestamp = this.timestamp();
    const record = validateArtifactRecord({
      id: artifactId,
      versionId: artifactVersionId(logicalArtifactId, 1, persisted.contentHash),
      versionNumber: 1,
      revision: 0,
      tenantId: request.tenantId,
      userId: request.userId,
      workspaceId: request.workspaceId,
      sessionId: request.sessionId,
      runId: request.runId,
      agentId: request.agentId,
      name: request.name,
      description: request.description,
      relativePath: request.relativePath,
      kind: request.kind,
      mimeType: request.mimeType ?? persisted.mimeType,
      encoding: request.encoding,
      sizeBytes: persisted.sizeBytes,
      contentHash: persisted.contentHash,
      hashAlgorithm: profile.contentAddressing.hashAlgorithm,
      storageRef: persisted.storageRef,
      logicalArtifactId,
      sourceArtifactIds: request.provenance.sourceArtifactIds,
      provenance: request.provenance,
      access,
      retention,
      status: 'draft',
      immutable: false,
      sensitive: request.sensitive,
      tags: request.tags,
      createdAt: timestamp,
      updatedAt: timestamp,
      expiresAt: retention.expiresAt,
      metadata: request.metadata,
    });
    try {
      await this.commitRecords(
        [{ record, profileRef: profileReference(profile) }],
        undefined,
        idempotencyResult(request, record)
      );
      return record;
    } catch (error) {
      return this.reconcileIdempotency(error, request, request.principal, 'write');
    }
  }

  private async mutate(
    input: ArtifactMutationRequest,
    status: 'final' | 'archived' | 'invalidated'
  ): Promise<ArtifactRecord> {
    const request = validateArtifactManagerInput(() => validateArtifactMutationRequest(input));
    return this.withLock(`artifact:${request.artifactId}`, async () => {
      const idempotent = await this.findIdempotent(request.operationId, request.idempotencyKey);
      if (idempotent) {
        assertRecordPermission(
          this.requireProfile(idempotent.profileRef),
          idempotent.record,
          request.principal,
          'write'
        );
        return idempotent.record;
      }
      const stored = await this.requireStoredRecord(request.artifactId);
      const profile = this.requireProfile(stored.profileRef);
      assertRecordPermission(profile, stored.record, request.principal, 'write');
      if (stored.record.revision !== request.expectedRevision) {
        throw revisionConflict(stored.record, request.expectedRevision);
      }
      if (stored.record.status === 'deleted') {
        throw artifactManagerError(
          'ARTIFACT_VERSION_CONFLICT',
          'Deleted Artifact lifecycle cannot be mutated.'
        );
      }
      const timestamp = this.timestamp();
      const record = validateArtifactRecord({
        ...stored.record,
        status,
        revision: stored.record.revision + 1,
        updatedAt: timestamp,
        immutable: status === 'final' || status === 'archived' ? true : stored.record.immutable,
        finalizedAt: status === 'final' ? timestamp : stored.record.finalizedAt,
        archivedAt: status === 'archived' ? timestamp : stored.record.archivedAt,
        retention:
          status === 'archived'
            ? { ...stored.record.retention, archivedAt: timestamp }
            : stored.record.retention,
      });
      try {
        await this.commitRecords(
          [{ record, profileRef: stored.profileRef }],
          latestFence(stored),
          idempotencyResult(request, record)
        );
        return record;
      } catch (error) {
        return this.reconcileIdempotency(error, request, request.principal, 'write');
      }
    });
  }

  private assertContentPolicy(
    profile: ArtifactProfileSpec,
    kind: ArtifactRecord['kind'],
    mimeType: string | undefined,
    request: { expectedContentHash?: string; expectedSizeBytes?: number },
    trustedWorkspaceSource = false
  ): void {
    if (profile.allowedKinds && !profile.allowedKinds.includes(kind)) {
      throw artifactManagerError('ARTIFACT_TYPE_DENIED', `Artifact kind ${kind} is not allowed.`);
    }
    if (
      mimeType &&
      profile.allowedMimeTypes &&
      !profile.allowedMimeTypes.some((allowed) => allowed.toLowerCase() === mimeType.toLowerCase())
    ) {
      throw artifactManagerError(
        'ARTIFACT_TYPE_DENIED',
        `Artifact MIME type ${mimeType} is not allowed.`
      );
    }
    if (
      profile.maxArtifactBytes !== undefined &&
      request.expectedSizeBytes !== undefined &&
      request.expectedSizeBytes > profile.maxArtifactBytes
    ) {
      throw artifactManagerError(
        'ARTIFACT_TOO_LARGE',
        `Artifact exceeds profile limit of ${profile.maxArtifactBytes} bytes.`
      );
    }
    if (
      profile.validation?.checksumRequired &&
      !request.expectedContentHash &&
      !trustedWorkspaceSource
    ) {
      throw artifactManagerError(
        'ARTIFACT_VALIDATION_FAILED',
        'Artifact profile requires expectedContentHash.'
      );
    }
  }

  private retentionRecord(
    profile: ArtifactProfileSpec,
    requested?: ArtifactRetentionRecord
  ): ArtifactRetentionRecord {
    if (requested?.legalHold && profile.retention.legalHoldSupported !== true) {
      throw artifactManagerError(
        'ARTIFACT_VALIDATION_FAILED',
        'Artifact profile does not support legal holds.'
      );
    }
    const expiresAt =
      requested?.expiresAt ??
      (profile.retention.defaultTtlSeconds
        ? new Date(Date.parse(this.timestamp()) + profile.retention.defaultTtlSeconds * 1000).toISOString()
        : undefined);
    return {
      ...(requested ?? {}),
      ...(expiresAt ? { expiresAt } : {}),
      referencedByCount: requested?.referencedByCount ?? 0,
    };
  }

  private requireProfile(ref: SpecRef): ArtifactProfileSpec {
    const profile = this.resolveProfile(ref);
    if (!profile) {
      throw artifactManagerError(
        'ARTIFACT_INVALID_INPUT',
        `Artifact profile ${ref.id} is not registered or is ambiguous.`
      );
    }
    return profile;
  }

  private resolveProfile(ref: SpecRef): ArtifactProfileSpec | null {
    return resolveProfileRef(this.profiles, ref);
  }

  private requireStore(profile: ArtifactProfileSpec): ArtifactStoreProvider {
    const store = this.stores.get(profile.storeRef.id);
    if (!store) {
      throw artifactManagerError(
        'ARTIFACT_STORE_UNAVAILABLE',
        `Artifact Store ${profile.storeRef.id} is not registered.`
      );
    }
    return store;
  }

  private async requireStoredRecord(
    artifactId: string,
    versionId?: string
  ): Promise<StoredArtifactRecord> {
    const stored = await this.repositoryOperation(() =>
      this.repository.get(artifactId, versionId)
    );
    if (!stored) {
      throw artifactManagerError('ARTIFACT_NOT_FOUND', `Artifact ${artifactId} was not found.`);
    }
    return stored;
  }

  private findIdempotent(
    operationId: string,
    idempotencyKey?: string
  ): Promise<StoredArtifactRecord | null> {
    return idempotencyKey
      ? this.repositoryOperation(() =>
          this.repository.findIdempotency(operationId, idempotencyKey)
        )
      : Promise.resolve(null);
  }

  private async commitRecords(
    records: StoredArtifactRecord[],
    expectedLatest?: { artifactId: string; versionId: string; revision: number },
    idempotency?: {
      operationId: string;
      idempotencyKey: string;
      artifactId: string;
      versionId: string;
    }
  ): Promise<void> {
    await this.repositoryOperation(() =>
      this.repository.commit({ records, expectedLatest, idempotency })
    );
  }

  private async repositoryOperation<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (error instanceof ArtifactRecordRepositoryConflictError) {
        throw artifactManagerError(
          'ARTIFACT_VERSION_CONFLICT',
          error.message,
          false,
          error.details
        );
      }
      if (error instanceof ArtifactRecordRepositoryError) {
        throw artifactManagerError(
          error.code === 'ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE'
            ? 'ARTIFACT_STORE_UNAVAILABLE'
            : 'ARTIFACT_INTERNAL_ERROR',
          error.message,
          error.code === 'ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE',
          { repositoryCode: error.code }
        );
      }
      throw error;
    }
  }

  private async reconcileIdempotency(
    error: unknown,
    request: { operationId: string; idempotencyKey?: string },
    principal: ArtifactReadRequest['principal'],
    permission: 'write' | 'delete'
  ): Promise<ArtifactRecord> {
    if (
      !(error instanceof ArtifactManagerError) ||
      error.normalizedError.code !== 'ARTIFACT_VERSION_CONFLICT' ||
      !request.idempotencyKey
    ) {
      throw error;
    }
    const committed = await this.findIdempotent(request.operationId, request.idempotencyKey);
    if (!committed) throw error;
    assertRecordPermission(
      this.requireProfile(committed.profileRef),
      committed.record,
      principal,
      permission
    );
    return committed.record;
  }

  private nextId(prefix: string): string {
    const value = this.idGenerator().trim();
    if (!value) throw artifactManagerError('ARTIFACT_INTERNAL_ERROR', 'idGenerator returned empty.');
    return `${prefix}.${value}`;
  }

  private timestamp(): string {
    const value = this.now();
    if (!Number.isFinite(Date.parse(value))) {
      throw artifactManagerError('ARTIFACT_INTERNAL_ERROR', 'Artifact clock returned invalid time.');
    }
    return value;
  }

  private async withLock<T>(key: string, operation: () => Promise<T>): Promise<T> {
    const previous = this.locks.get(key) ?? Promise.resolve();
    let release!: () => void;
    const current = new Promise<void>((resolve) => {
      release = resolve;
    });
    this.locks.set(key, current);
    await previous;
    try {
      return await operation();
    } finally {
      release();
      if (this.locks.get(key) === current) this.locks.delete(key);
    }
  }
}

function artifactVersionId(
  logicalArtifactId: string,
  versionNumber: number,
  contentHash: string
): string {
  return `${logicalArtifactId}:v${versionNumber}:${contentHash}`;
}

function artifactNameFromPath(relativePath: string): string {
  return relativePath.split(/[\\/]/u).filter(Boolean).at(-1) ?? 'artifact';
}

function qualifiedContentHash(value?: string): string | undefined {
  return /^(sha256|blake3):[0-9a-f]{64}$/u.test(value ?? '') ? value : undefined;
}

function latestFence(stored: StoredArtifactRecord): {
  artifactId: string;
  versionId: string;
  revision: number;
} {
  return {
    artifactId: stored.record.id,
    versionId: stored.record.versionId,
    revision: stored.record.revision,
  };
}

function idempotencyResult(
  request: { operationId: string; idempotencyKey?: string },
  record: ArtifactRecord
):
  | {
      operationId: string;
      idempotencyKey: string;
      artifactId: string;
      versionId: string;
    }
  | undefined {
  return request.idempotencyKey
    ? {
        operationId: request.operationId,
        idempotencyKey: request.idempotencyKey,
        artifactId: record.id,
        versionId: record.versionId,
      }
    : undefined;
}

function revisionConflict(record: ArtifactRecord, expectedRevision: number): ArtifactManagerError {
  return artifactManagerError(
    'ARTIFACT_VERSION_CONFLICT',
    'Artifact revision fence does not match the current revision.',
    false,
    { expectedRevision, actualRevision: record.revision, versionId: record.versionId }
  );
}

function latestStoredByArtifact(records: StoredArtifactRecord[]): StoredArtifactRecord[] {
  const latest = new Map<string, StoredArtifactRecord>();
  for (const stored of records) {
    const current = latest.get(stored.record.id);
    if (!current || stored.record.versionNumber > current.record.versionNumber) {
      latest.set(stored.record.id, stored);
    }
  }
  return [...latest.values()];
}

function hasRequiredReadScopes(profile: ArtifactProfileSpec, scopes: string[]): boolean {
  return (profile.access.requiredReadScopes ?? []).every(
    (required) =>
      scopes.includes(required) ||
      scopes.includes('*') ||
      scopes.includes(`${required.split(':')[0]}:*`)
  );
}

function collectAncestors(
  artifactId: string,
  latest: StoredArtifactRecord[]
): ArtifactLineageNode[] {
  const byId = new Map(latest.map((stored) => [stored.record.id, stored.record]));
  const result: ArtifactLineageNode[] = [];
  const visited = new Set<string>([artifactId]);
  const visit = (currentId: string): void => {
    const current = byId.get(currentId);
    for (const sourceId of current?.sourceArtifactIds ?? []) {
      if (visited.has(sourceId)) continue;
      visited.add(sourceId);
      const source = byId.get(sourceId);
      if (!source) continue;
      result.push(lineageNode(source));
      visit(sourceId);
    }
  };
  visit(artifactId);
  return result;
}

function collectDescendants(
  artifactId: string,
  latest: StoredArtifactRecord[]
): ArtifactLineageNode[] {
  const result: ArtifactLineageNode[] = [];
  const visited = new Set<string>([artifactId]);
  const visit = (currentId: string): void => {
    for (const stored of latest) {
      if (visited.has(stored.record.id)) continue;
      if (!stored.record.sourceArtifactIds?.includes(currentId)) continue;
      visited.add(stored.record.id);
      result.push(lineageNode(stored.record));
      visit(stored.record.id);
    }
  };
  visit(artifactId);
  return result;
}

function lineageNode(record: ArtifactRecord): ArtifactLineageNode {
  return {
    artifactId: record.id,
    versionId: record.versionId,
    logicalArtifactId: record.logicalArtifactId,
    contentHash: record.contentHash,
    kind: record.kind,
    transformation: record.provenance.transformation,
  };
}
