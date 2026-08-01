import { describe, expect, it } from 'vitest';
import type {
  ArtifactCreateRequest,
  ArtifactDownloadAccess,
  ArtifactDownloadAccessRequest,
  ArtifactProfileSpec,
  ArtifactStoreCapabilities,
  ExecutionPrincipal,
} from '@hypha/core';
import { ArtifactManagerError, DefaultArtifactManager } from '@hypha/core';
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
    });

    expect(record).toMatchObject({ name: 'report.txt', mimeType: 'text/plain' });
    expect(requests).toEqual([
      expect.objectContaining({
        workspaceId: 'workspace.example',
        relativePath: 'outputs/report.txt',
      }),
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
    workspaceReader?: ConstructorParameters<typeof DefaultArtifactManager>[0]['workspaceReader'];
  } = {}
) {
  const store = new SignedInMemoryArtifactStore({
    id: 'artifact-store.test',
    signedAccess: overrides.signedAccess ?? false,
  });
  const repository = new InMemoryArtifactRecordRepository();
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
  private readonly signedAccess: boolean;

  constructor(options: { id: string; signedAccess: boolean }) {
    super({ id: options.id });
    this.signedAccess = options.signedAccess;
  }

  override async capabilities(): Promise<ArtifactStoreCapabilities> {
    return { ...(await super.capabilities()), signedAccess: this.signedAccess };
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
