import { describe, expect, it } from 'vitest';
import type {
  ArtifactCreateRequest,
  ArtifactContent,
  ArtifactDownloadAccess,
  ArtifactDownloadAccessRequest,
  ArtifactGetRequest,
  ArtifactOperationOptions,
  ArtifactObjectMetadata,
  ArtifactProfileSpec,
  ArtifactPutRequest,
  ArtifactStorageRef,
  ArtifactStoreCapabilities,
  ExecutionPrincipal,
  StoredArtifactRecord,
} from '@codesoul-co/hypha-core';
import { ArtifactManagerError, DefaultArtifactManager } from '@codesoul-co/hypha-core';
import { hashArtifactBytes } from './artifact-content-io';
import { InMemoryArtifactRecordRepository } from './in-memory-artifact-record-repository';
import { InMemoryExecutionArtifactStore } from './in-memory-execution-artifact-store';

const owner: ExecutionPrincipal = {
  principalId: 'user.owner',
  type: 'user',
  userId: 'user.owner',
  tenantId: 'tenant.example',
  permissionScopes: ['artifact:read', 'artifact:write', 'artifact:delete'],
  metadata: { workspaceIds: ['workspace.example'] },
};

describe('DefaultArtifactManager', () => {
  it('creates content-addressed records and deduplicates Store blobs', async () => {
    const fixture = createFixture();
    const bytes = new TextEncoder().encode('same-content');
    const first = await fixture.manager.create(createRequest('create-1', bytes));
    const second = await fixture.manager.create(createRequest('create-2', bytes));

    expect(first.id).not.toBe(second.id);
    expect(first.deduplicated).toBe(false);
    expect(second.deduplicated).toBe(true);
    expect(first.contentHash).toBe(hashArtifactBytes(bytes));
    expect(first.storageRef.objectKey).toBe(second.storageRef.objectKey);
    expect(fixture.store.stats()).toEqual({
      objects: 1,
      blobs: 1,
      storedBytes: bytes.byteLength,
    });
    await expect(fixture.manager.get({ principal: owner, artifactId: first.id })).resolves.toEqual(
      first
    );
  });

  it('returns the committed result for a repeated idempotency key', async () => {
    const fixture = createFixture();
    const bytes = new TextEncoder().encode('idempotent');
    const request = { ...createRequest('create-idempotent', bytes), idempotencyKey: 'request-1' };

    const first = await fixture.manager.create(request);
    const replayed = await fixture.manager.create(request);

    expect(replayed).toEqual(first);
    expect((await fixture.repository.list()).map((stored) => stored.record)).toEqual([first]);
  });

  it('appends immutable content versions behind a revision fence', async () => {
    const fixture = createFixture();
    const firstBytes = new TextEncoder().encode('version-one');
    const secondBytes = new TextEncoder().encode('version-two');
    const first = await fixture.manager.create(createRequest('create-versioned', firstBytes));

    const second = await fixture.manager.createVersion({
      operationId: 'version-2',
      principal: owner,
      artifactId: first.id,
      expectedRevision: first.revision,
      content: secondBytes,
      expectedContentHash: hashArtifactBytes(secondBytes),
      expectedSizeBytes: secondBytes.byteLength,
      provenance: {
        sourceType: 'derived',
        createdBy: owner.principalId,
        sourceArtifactIds: [first.id],
        transformation: 'update report',
      },
    });

    expect(second).toMatchObject({
      id: first.id,
      versionNumber: 2,
      previousVersionId: first.versionId,
      parentVersionId: first.versionId,
      status: 'draft',
    });
    await expect(
      fixture.manager.latest({ principal: owner, logicalArtifactId: first.logicalArtifactId })
    ).resolves.toEqual(second);
    await expect(
      fixture.manager.previous({ principal: owner, versionId: second.versionId })
    ).resolves.toMatchObject({
      versionId: first.versionId,
      nextVersionId: second.versionId,
    });
    const read = await fixture.manager.read({ principal: owner, artifactId: first.id });
    await expect(collect(read.content.stream)).resolves.toEqual(secondBytes);
    await expect(
      fixture.manager.createVersion({
        operationId: 'stale-version',
        principal: owner,
        artifactId: first.id,
        expectedRevision: first.revision,
        content: secondBytes,
        expectedContentHash: hashArtifactBytes(secondBytes),
        provenance: {
          sourceType: 'derived',
          createdBy: owner.principalId,
          sourceArtifactIds: [first.id],
        },
      })
    ).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_VERSION_CONFLICT' },
    });
  });

  it('enforces record visibility and profile scopes for reads and lists', async () => {
    const fixture = createFixture();
    const bytes = new TextEncoder().encode('private');
    const record = await fixture.manager.create({
      ...createRequest('create-private', bytes),
      access: {
        visibility: 'private',
        ownerPrincipalId: owner.principalId,
        workspaceId: 'workspace.example',
      },
    });
    const stranger: ExecutionPrincipal = {
      principalId: 'user.stranger',
      type: 'user',
      userId: 'user.stranger',
      permissionScopes: ['artifact:read'],
      metadata: { workspaceIds: ['workspace.example'] },
    };

    await expect(
      fixture.manager.get({ principal: stranger, artifactId: record.id })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_PERMISSION_DENIED' } });
    await expect(
      fixture.manager.list({ principal: stranger, workspaceId: 'workspace.example' })
    ).resolves.toEqual([]);
    await expect(
      fixture.manager.list({ principal: owner, workspaceId: 'workspace.example' })
    ).resolves.toEqual([record]);
  });

  it('fails closed when an otherwise authorized principal declares a different Artifact scope', async () => {
    const fixture = createFixture();
    const record = await fixture.manager.create({
      ...createRequest('scoped-artifact', new TextEncoder().encode('scoped')),
      sessionId: 'session.example',
      runId: 'run.example',
      access: {
        visibility: 'private',
        ownerPrincipalId: owner.principalId,
        workspaceId: 'workspace.example',
        allowedPrincipalIds: ['user.collaborator'],
      },
    });
    const matchingScope: ExecutionPrincipal = {
      ...owner,
      metadata: {
        workspaceIds: ['workspace.example'],
        sessionIds: ['session.example'],
        runIds: ['run.example'],
      },
    };
    const mismatchedPrincipals: ExecutionPrincipal[] = [
      { ...matchingScope, tenantId: 'tenant.other' },
      { ...matchingScope, metadata: { ...matchingScope.metadata, workspaceId: 'workspace.other' } },
      { ...matchingScope, metadata: { ...matchingScope.metadata, sessionId: 'session.other' } },
      { ...matchingScope, metadata: { ...matchingScope.metadata, runId: 'run.other' } },
    ];

    await expect(
      fixture.manager.get({ principal: matchingScope, artifactId: record.id })
    ).resolves.toEqual(record);
    await expect(
      fixture.manager.get({
        principal: {
          ...matchingScope,
          principalId: 'user.collaborator',
          userId: 'user.collaborator',
        },
        artifactId: record.id,
      })
    ).resolves.toEqual(record);
    for (const principal of mismatchedPrincipals) {
      await expect(
        fixture.manager.get({ principal, artifactId: record.id })
      ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_PERMISSION_DENIED' } });
      await expect(
        fixture.manager.list({ principal, workspaceId: record.workspaceId })
      ).resolves.toEqual([]);
    }

    const administrator: ExecutionPrincipal = {
      ...owner,
      tenantId: 'tenant.other',
      permissionScopes: ['artifact:read', 'artifact:admin'],
      metadata: {
        workspaceId: 'workspace.other',
        sessionId: 'session.other',
        runId: 'run.other',
      },
    };
    await expect(
      fixture.manager.get({ principal: administrator, artifactId: record.id })
    ).resolves.toEqual(record);
  });

  it('creates governed signed download access within the profile TTL', async () => {
    const fixture = createFixture({ signedAccess: true });
    const bytes = new TextEncoder().encode('downloadable');
    const record = await fixture.manager.create(createRequest('downloadable', bytes));

    await expect(
      fixture.manager.createDownloadAccess({
        operationId: 'download-access',
        principal: owner,
        artifactId: record.id,
        expiresInSeconds: 120,
      })
    ).resolves.toMatchObject({
      method: 'GET',
      url: expect.stringContaining(encodeURIComponent(record.storageRef.objectKey)),
    });
    expect(fixture.store.downloadRequests).toEqual([
      expect.objectContaining({
        ref: record.storageRef,
        expiresInSeconds: 120,
        responseMimeType: 'text/plain',
        responseFilename: 'downloadable.txt',
      }),
    ]);

    await expect(
      fixture.manager.createDownloadAccess({
        operationId: 'download-too-long',
        principal: owner,
        artifactId: record.id,
        expiresInSeconds: 301,
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_PERMISSION_DENIED' } });
  });

  it.each(['put', 'head', 'copy'] as const)(
    'fails closed when the Artifact Store returns an invalid %s result',
    async (invalidOutput) => {
      const store = new InvalidOutputArtifactStore({
        id: 'artifact-store.test',
        signedAccess: false,
      });
      store.invalidOutput = invalidOutput;
      const fixture = createFixture({ store });

      await expect(
        fixture.manager.create(
          createRequest(`invalid-${invalidOutput}`, new TextEncoder().encode(invalidOutput))
        )
      ).rejects.toMatchObject({
        normalizedError: { code: 'ARTIFACT_INTERNAL_ERROR' },
      });
    }
  );

  it('fails closed when the Artifact Store returns invalid read content', async () => {
    const store = new InvalidOutputArtifactStore({
      id: 'artifact-store.test',
      signedAccess: false,
    });
    const fixture = createFixture({ store });
    const record = await fixture.manager.create(
      createRequest('invalid-read', new TextEncoder().encode('read'))
    );
    store.invalidOutput = 'get';

    await expect(
      fixture.manager.read({ principal: owner, artifactId: record.id })
    ).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_INTERNAL_ERROR' },
    });
  });

  it('fails closed when signed-access Store outputs violate their Runtime Schemas', async () => {
    const store = new InvalidOutputArtifactStore({
      id: 'artifact-store.test',
      signedAccess: true,
    });
    const fixture = createFixture({ store });
    const record = await fixture.manager.create(
      createRequest('invalid-download', new TextEncoder().encode('download'))
    );
    const request = {
      operationId: 'invalid-download-access',
      principal: owner,
      artifactId: record.id,
    };

    store.invalidOutput = 'capabilities';
    await expect(fixture.manager.createDownloadAccess(request)).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_INTERNAL_ERROR' },
    });

    store.invalidOutput = 'download';
    await expect(fixture.manager.createDownloadAccess(request)).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_INTERNAL_ERROR' },
    });
  });

  it.each(['get', 'list', 'getByVersionId', 'findIdempotency'] as const)(
    'fails closed when the Artifact record repository returns corrupt data from %s',
    async (invalidOutput) => {
      const repository = new InvalidOutputArtifactRecordRepository();
      const fixture = createFixture({ repository });
      const bytes = new TextEncoder().encode(invalidOutput);
      const create = {
        ...createRequest(`invalid-repository-${invalidOutput}`, bytes),
        idempotencyKey: `idempotency-${invalidOutput}`,
      };
      const first = await fixture.manager.create(create);
      const second = await fixture.manager.createVersion({
        operationId: `version-${invalidOutput}`,
        principal: owner,
        artifactId: first.id,
        expectedRevision: first.revision,
        content: bytes,
        expectedContentHash: hashArtifactBytes(bytes),
        provenance: {
          sourceType: 'derived',
          createdBy: owner.principalId,
          sourceArtifactIds: [first.id],
        },
      });
      repository.invalidOutput = invalidOutput;

      const operation =
        invalidOutput === 'get'
          ? fixture.manager.get({ principal: owner, artifactId: first.id })
          : invalidOutput === 'list'
            ? fixture.manager.list({ principal: owner, workspaceId: first.workspaceId })
            : invalidOutput === 'getByVersionId'
              ? fixture.manager.previous({ principal: owner, versionId: second.versionId })
              : fixture.manager.create(create);

      await expect(operation).rejects.toMatchObject({
        normalizedError: {
          code: 'ARTIFACT_INTERNAL_ERROR',
          details: { repositoryCode: 'ARTIFACT_RECORD_REPOSITORY_CORRUPT' },
        },
      });
    }
  );

  it('fails closed when the Artifact Store cannot issue signed access', async () => {
    const fixture = createFixture();
    const bytes = new TextEncoder().encode('local-only');
    const record = await fixture.manager.create(createRequest('local-only', bytes));

    await expect(
      fixture.manager.createDownloadAccess({
        operationId: 'download-unsupported',
        principal: owner,
        artifactId: record.id,
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_DOWNLOAD_FAILED' } });
  });

  it('records lineage, lifecycle transitions, and logical tombstones', async () => {
    const fixture = createFixture({ retainFinal: false });
    const sourceBytes = new TextEncoder().encode('source');
    const derivedBytes = new TextEncoder().encode('derived');
    const source = await fixture.manager.create(createRequest('source', sourceBytes));
    const derived = await fixture.manager.create({
      ...createRequest('derived', derivedBytes),
      provenance: {
        sourceType: 'derived',
        createdBy: owner.principalId,
        sourceArtifactIds: [source.id],
        transformation: 'compile',
      },
    });

    const lineage = await fixture.manager.traceLineage({
      principal: owner,
      artifactId: derived.id,
    });
    expect(lineage.ancestors).toEqual([
      expect.objectContaining({ artifactId: source.id, versionId: source.versionId }),
    ]);
    await expect(
      fixture.manager.traceLineage({ principal: owner, artifactId: source.id })
    ).resolves.toMatchObject({
      descendants: [expect.objectContaining({ artifactId: derived.id })],
    });

    const finalized = await fixture.manager.finalize({
      operationId: 'finalize',
      principal: owner,
      artifactId: derived.id,
      expectedRevision: derived.revision,
    });
    expect(finalized).toMatchObject({ status: 'final', immutable: true });
    await fixture.manager.delete({
      operationId: 'delete',
      principal: owner,
      artifactId: derived.id,
      expectedRevision: finalized.revision,
    });
    await expect(
      fixture.manager.get({ principal: owner, artifactId: derived.id })
    ).resolves.toBeNull();
    await expect(
      fixture.manager.read({ principal: owner, artifactId: derived.id })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_NOT_FOUND' } });
    expect(fixture.store.stats().objects).toBe(2);
  });

  it('collects bytes only through a governed Workspace reader port', async () => {
    const bytes = new TextEncoder().encode('workspace-output');
    const requests: unknown[] = [];
    const fixture = createFixture({
      workspaceReader: {
        async read(request) {
          requests.push(request);
          return {
            content: bytes,
            contentHash: hashArtifactBytes(bytes),
            sizeBytes: bytes.byteLength,
            mimeType: 'text/plain',
          };
        },
      },
    });

    const record = await fixture.manager.createFromWorkspace({
      operationId: 'collect-workspace',
      principal: owner,
      profileRef: { id: fixture.profile.id, version: fixture.profile.version },
      userId: owner.userId!,
      tenantId: owner.tenantId,
      workspaceId: 'workspace.example',
      relativePath: 'outputs/report.txt',
      kind: 'report',
      expectedContentHash: hashArtifactBytes(bytes),
      expectedSizeBytes: bytes.byteLength,
      provenance: { sourceType: 'command_generated', createdBy: owner.principalId },
      retention: { referencedByCount: 1 },
    });

    expect(record).toMatchObject({
      name: 'report.txt',
      mimeType: 'text/plain',
      retention: { referencedByCount: 1 },
    });
    expect(requests).toEqual([
      expect.objectContaining({
        workspaceId: 'workspace.example',
        relativePath: 'outputs/report.txt',
      }),
    ]);
  });

  it('propagates cancellation context through every content-producing entry point', async () => {
    const workspaceBytes = new TextEncoder().encode('workspace-cancellation');
    const fixture = createFixture({
      workspaceReader: {
        async read() {
          return {
            content: workspaceBytes,
            contentHash: hashArtifactBytes(workspaceBytes),
            sizeBytes: workspaceBytes.byteLength,
            mimeType: 'text/plain',
          };
        },
      },
    });
    const createController = new AbortController();
    const versionController = new AbortController();
    const workspaceController = new AbortController();
    const created = await fixture.manager.create(
      createRequest('cancel-context-create', new TextEncoder().encode('create-cancellation')),
      { abortSignal: createController.signal }
    );
    const versionBytes = new TextEncoder().encode('version-cancellation');

    await fixture.manager.createVersion(
      {
        operationId: 'cancel-context-version',
        principal: owner,
        artifactId: created.id,
        expectedRevision: created.revision,
        content: versionBytes,
        expectedContentHash: hashArtifactBytes(versionBytes),
        expectedSizeBytes: versionBytes.byteLength,
        provenance: {
          sourceType: 'derived',
          createdBy: owner.principalId,
          sourceArtifactIds: [created.id],
          transformation: 'verify cancellation propagation',
        },
      },
      { abortSignal: versionController.signal }
    );
    await fixture.manager.createFromWorkspace(
      {
        operationId: 'cancel-context-workspace',
        principal: owner,
        profileRef: { id: fixture.profile.id, version: fixture.profile.version },
        userId: owner.userId!,
        tenantId: owner.tenantId,
        workspaceId: 'workspace.example',
        relativePath: 'outputs/cancel.txt',
        kind: 'report',
        provenance: { sourceType: 'command_generated', createdBy: owner.principalId },
      },
      { abortSignal: workspaceController.signal }
    );

    expect(fixture.store.operationOptions.map((options) => options?.abortSignal)).toEqual([
      createController.signal,
      versionController.signal,
      workspaceController.signal,
    ]);
  });

  it('does not commit an Artifact when the Store rejects a pre-cancelled upload', async () => {
    const fixture = createFixture();
    const controller = new AbortController();
    controller.abort(new Error('cancel before Artifact upload'));

    await expect(
      fixture.manager.create(
        createRequest('pre-cancelled-create', new TextEncoder().encode('cancelled')),
        { abortSignal: controller.signal }
      )
    ).rejects.toThrow('cancel before Artifact upload');

    await expect(fixture.repository.list()).resolves.toEqual([]);
    expect(fixture.store.stats()).toEqual({ objects: 0, blobs: 0, storedBytes: 0 });
  });

  it('propagates cancellation context through Artifact reads', async () => {
    const fixture = createFixture();
    const created = await fixture.manager.create(
      createRequest('cancel-context-read', new TextEncoder().encode('read-cancellation'))
    );
    const controller = new AbortController();

    await fixture.manager.read(
      { principal: owner, artifactId: created.id },
      { abortSignal: controller.signal }
    );

    expect(fixture.store.readOperationOptions).toEqual([
      expect.objectContaining({ abortSignal: controller.signal }),
    ]);
  });

  it('rejects Workspace output that changed after collection was planned', async () => {
    const bytes = new TextEncoder().encode('changed-output');
    const fixture = createFixture({
      workspaceReader: {
        async read() {
          return {
            content: bytes,
            contentHash: hashArtifactBytes(bytes),
            sizeBytes: bytes.byteLength,
            mimeType: 'text/plain',
          };
        },
      },
    });

    await expect(
      fixture.manager.createFromWorkspace({
        operationId: 'collect-changed-workspace',
        principal: owner,
        profileRef: { id: fixture.profile.id, version: fixture.profile.version },
        userId: owner.userId!,
        tenantId: owner.tenantId,
        workspaceId: 'workspace.example',
        relativePath: 'outputs/report.txt',
        kind: 'report',
        expectedContentHash: `sha256:${'0'.repeat(64)}`,
        expectedSizeBytes: bytes.byteLength,
        provenance: { sourceType: 'command_generated', createdBy: owner.principalId },
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_HASH_MISMATCH' } });
    expect(fixture.store.stats().objects).toBe(0);
  });

  it('blocks legal-hold deletion without deleting the underlying blob', async () => {
    const fixture = createFixture({ retainFinal: false });
    const bytes = new TextEncoder().encode('held');
    const record = await fixture.manager.create({
      ...createRequest('held', bytes),
      retention: { legalHold: true },
    });

    await expect(
      fixture.manager.delete({
        operationId: 'delete-held',
        principal: owner,
        artifactId: record.id,
        expectedRevision: record.revision,
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_DELETE_BLOCKED' } });
    expect(fixture.store.stats().objects).toBe(1);
  });

  it('rechecks caller permission when a lifecycle idempotency result is replayed', async () => {
    const fixture = createFixture();
    const bytes = new TextEncoder().encode('finalize-once');
    const record = await fixture.manager.create(createRequest('finalize-once', bytes));
    const request = {
      operationId: 'finalize-idempotent',
      principal: owner,
      artifactId: record.id,
      expectedRevision: record.revision,
      idempotencyKey: 'finalize-request-1',
    };
    await fixture.manager.finalize(request);

    await expect(
      fixture.manager.finalize({
        ...request,
        principal: {
          principalId: 'user.stranger',
          type: 'user',
          userId: 'user.stranger',
          permissionScopes: ['artifact:write'],
        },
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_PERMISSION_DENIED' } });
  });

  it('governs lineage and version-navigation metadata with record read access', async () => {
    const fixture = createFixture();
    const firstBytes = new TextEncoder().encode('private-version-one');
    const secondBytes = new TextEncoder().encode('private-version-two');
    const first = await fixture.manager.create({
      ...createRequest('private-version', firstBytes),
      access: {
        visibility: 'private',
        ownerPrincipalId: owner.principalId,
        workspaceId: 'workspace.example',
      },
    });
    const second = await fixture.manager.createVersion({
      operationId: 'private-version-two',
      principal: owner,
      artifactId: first.id,
      expectedRevision: first.revision,
      content: secondBytes,
      expectedContentHash: hashArtifactBytes(secondBytes),
      expectedSizeBytes: secondBytes.byteLength,
      provenance: {
        sourceType: 'derived',
        createdBy: owner.principalId,
        sourceArtifactIds: [first.id],
        transformation: 'update private version',
      },
    });
    const stranger: ExecutionPrincipal = {
      principalId: 'user.stranger',
      type: 'user',
      userId: 'user.stranger',
      permissionScopes: ['artifact:read'],
    };

    await expect(
      fixture.manager.traceLineage({ principal: stranger, artifactId: first.id })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_PERMISSION_DENIED' } });
    await expect(
      fixture.manager.latest({ principal: stranger, logicalArtifactId: first.logicalArtifactId })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_PERMISSION_DENIED' } });
    await expect(
      fixture.manager.previous({ principal: stranger, versionId: second.versionId })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_PERMISSION_DENIED' } });
  });
});

function createFixture(
  overrides: {
    retainFinal?: boolean;
    signedAccess?: boolean;
    store?: SignedInMemoryArtifactStore;
    repository?: InMemoryArtifactRecordRepository;
    workspaceReader?: ConstructorParameters<typeof DefaultArtifactManager>[0]['workspaceReader'];
  } = {}
) {
  const store =
    overrides.store ??
    new SignedInMemoryArtifactStore({
      id: 'artifact-store.test',
      signedAccess: overrides.signedAccess ?? false,
    });
  const repository = overrides.repository ?? new InMemoryArtifactRecordRepository();
  const profile: ArtifactProfileSpec = {
    id: 'artifact-profile.test',
    version: '1.0.0',
    storeRef: { id: store.id },
    contentAddressing: { hashAlgorithm: 'sha256', verifyOnRead: true, deduplicate: true },
    versioning: { strategy: 'append_only', retainPreviousVersions: true },
    access: {
      defaultVisibility: 'workspace',
      allowedPrincipalTypes: ['user', 'agent', 'service'],
      requiredReadScopes: ['artifact:read'],
      requiredWriteScopes: ['artifact:write'],
      requiredDeleteScopes: ['artifact:delete'],
      signedUrlTtlSeconds: 300,
      allowRangeRead: true,
    },
    retention: {
      retainFinal: overrides.retainFinal ?? true,
      legalHoldSupported: true,
      garbageCollectUnreferenced: true,
    },
    validation: { checksumRequired: true },
    allowedKinds: ['report'],
    allowedMimeTypes: ['text/plain'],
    maxArtifactBytes: 1024,
  };
  let id = 0;
  let tick = 0;
  const manager = new DefaultArtifactManager({
    profiles: [profile],
    stores: [store],
    repository,
    workspaceReader: overrides.workspaceReader,
    idGenerator: () => String(++id),
    now: () => new Date(Date.UTC(2026, 6, 18, 0, 0, tick++)).toISOString(),
  });
  return { manager, profile, repository, store };
}

class SignedInMemoryArtifactStore extends InMemoryExecutionArtifactStore {
  readonly downloadRequests: ArtifactDownloadAccessRequest[] = [];
  readonly operationOptions: Array<ArtifactOperationOptions | undefined> = [];
  readonly readOperationOptions: Array<ArtifactOperationOptions | undefined> = [];
  private readonly signedAccess: boolean;

  constructor(options: { id: string; signedAccess: boolean }) {
    super({ id: options.id });
    this.signedAccess = options.signedAccess;
  }

  override async capabilities(): Promise<ArtifactStoreCapabilities> {
    return { ...(await super.capabilities()), signedAccess: this.signedAccess };
  }

  override async put(
    request: ArtifactPutRequest,
    options?: ArtifactOperationOptions
  ): Promise<ArtifactStorageRef> {
    this.operationOptions.push(options);
    if (options?.abortSignal?.aborted) {
      throw options.abortSignal.reason instanceof Error
        ? options.abortSignal.reason
        : new Error('Artifact upload aborted.');
    }
    return super.put(request);
  }

  override async get(
    request: ArtifactGetRequest,
    options?: ArtifactOperationOptions
  ): ReturnType<InMemoryExecutionArtifactStore['get']> {
    this.readOperationOptions.push(options);
    return super.get(request, options);
  }

  async createDownloadAccess(
    request: ArtifactDownloadAccessRequest
  ): Promise<ArtifactDownloadAccess> {
    if (!this.signedAccess) throw new Error('signed access is disabled');
    this.downloadRequests.push(structuredClone(request));
    return {
      method: 'GET',
      url: `https://artifacts.example/${encodeURIComponent(request.ref.objectKey)}`,
      expiresAt: new Date(Date.UTC(2026, 6, 18, 0, 0, request.expiresInSeconds)).toISOString(),
    };
  }
}

class InvalidOutputArtifactStore extends SignedInMemoryArtifactStore {
  invalidOutput?: 'put' | 'head' | 'copy' | 'get' | 'capabilities' | 'download';

  override async capabilities(): Promise<ArtifactStoreCapabilities> {
    const capabilities = await super.capabilities();
    return this.invalidOutput === 'capabilities'
      ? new Proxy(capabilities, {
          get(target, property, receiver) {
            return property === 'signedAccess'
              ? 'invalid'
              : Reflect.get(target, property, receiver);
          },
        })
      : capabilities;
  }

  override async put(
    request: ArtifactPutRequest,
    options?: ArtifactOperationOptions
  ): Promise<ArtifactStorageRef> {
    const ref = await super.put(request, options);
    return this.invalidOutput === 'put' ? { ...ref, storeId: '' } : ref;
  }

  override async head(ref: ArtifactStorageRef): Promise<ArtifactObjectMetadata | null> {
    const metadata = await super.head(ref);
    return this.invalidOutput === 'head' && metadata
      ? { ...metadata, contentHash: 'invalid' }
      : metadata;
  }

  override async copy(request: Parameters<InMemoryExecutionArtifactStore['copy']>[0]) {
    const ref = await super.copy(request);
    return this.invalidOutput === 'copy' ? { ...ref, storeId: 'artifact-store.foreign' } : ref;
  }

  override async get(
    request: ArtifactGetRequest,
    options?: ArtifactOperationOptions
  ): Promise<ArtifactContent> {
    const content = await super.get(request, options);
    return this.invalidOutput === 'get' ? { ...content, contentHash: 'invalid' } : content;
  }

  override async createDownloadAccess(
    request: ArtifactDownloadAccessRequest
  ): Promise<ArtifactDownloadAccess> {
    const access = await super.createDownloadAccess(request);
    return this.invalidOutput === 'download' ? { ...access, url: 'not-a-url' } : access;
  }
}

class InvalidOutputArtifactRecordRepository extends InMemoryArtifactRecordRepository {
  invalidOutput?: 'get' | 'list' | 'getByVersionId' | 'findIdempotency';

  override async get(artifactId: string, versionId?: string): Promise<StoredArtifactRecord | null> {
    return this.corruptIfSelected('get', await super.get(artifactId, versionId));
  }

  override async list(): Promise<StoredArtifactRecord[]> {
    const stored = await super.list();
    return this.invalidOutput === 'list'
      ? stored.map((record, index) => (index === 0 ? corruptStoredRecord(record) : record))
      : stored;
  }

  override async getByVersionId(versionId: string): Promise<StoredArtifactRecord | null> {
    return this.corruptIfSelected('getByVersionId', await super.getByVersionId(versionId));
  }

  override async findIdempotency(
    operationId: string,
    idempotencyKey: string
  ): Promise<StoredArtifactRecord | null> {
    return this.corruptIfSelected(
      'findIdempotency',
      await super.findIdempotency(operationId, idempotencyKey)
    );
  }

  private corruptIfSelected(
    operation: NonNullable<InvalidOutputArtifactRecordRepository['invalidOutput']>,
    stored: StoredArtifactRecord | null
  ): StoredArtifactRecord | null {
    return this.invalidOutput === operation && stored ? corruptStoredRecord(stored) : stored;
  }
}

function corruptStoredRecord(stored: StoredArtifactRecord): StoredArtifactRecord {
  return {
    ...stored,
    record: {
      ...stored.record,
      contentHash: 'not-a-digest',
    },
  };
}

function createRequest(operationId: string, content: Uint8Array): ArtifactCreateRequest {
  return {
    operationId,
    principal: owner,
    profileRef: { id: 'artifact-profile.test', version: '1.0.0' },
    userId: owner.userId!,
    tenantId: owner.tenantId,
    workspaceId: 'workspace.example',
    name: `${operationId}.txt`,
    kind: 'report',
    mimeType: 'text/plain',
    content,
    expectedContentHash: hashArtifactBytes(content),
    expectedSizeBytes: content.byteLength,
    provenance: { sourceType: 'agent_generated', createdBy: owner.principalId },
  };
}

async function collect(stream: AsyncIterable<Uint8Array>): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  let size = 0;
  for await (const chunk of stream) {
    chunks.push(chunk);
    size += chunk.byteLength;
  }
  const result = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
}
