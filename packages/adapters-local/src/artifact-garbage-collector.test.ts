import { describe, expect, it } from 'vitest';
import type { ArtifactProfileSpec, ExecutionPrincipal } from '@hypha/core';
import { DefaultArtifactGarbageCollector, DefaultArtifactManager } from '@hypha/core';
import { hashArtifactBytes } from './artifact-content-io';
import { InMemoryArtifactRecordRepository } from './in-memory-artifact-record-repository';
import { InMemoryExecutionArtifactStore } from './in-memory-execution-artifact-store';

const principal: ExecutionPrincipal = {
  principalId: 'user.owner',
  type: 'user',
  userId: 'user.owner',
  permissionScopes: ['artifact:read', 'artifact:write', 'artifact:delete'],
  metadata: { workspaceIds: ['workspace.example'] },
};

describe('DefaultArtifactGarbageCollector', () => {
  it('validates its profiles and collection request before touching storage', async () => {
    const fixture = createFixture();
    expect(
      () =>
        new DefaultArtifactGarbageCollector({
          profiles: [{ ...fixture.profile, storeRef: { id: 'missing-store' } }],
          stores: [fixture.store],
          repository: fixture.repository,
          idGenerator: () => 'invalid',
        })
    ).toThrow(/unregistered Store/u);
    await expect(
      fixture.collector.collect({ operationId: 'invalid-dry-run', dryRun: 'yes' as never })
    ).rejects.toThrow(/dryRun/u);
  });

  it('deletes a shared Blob only after every Artifact record is tombstoned', async () => {
    const fixture = createFixture();
    const content = new TextEncoder().encode('shared-blob');
    const first = await fixture.manager.create(createRequest('first', content));
    const second = await fixture.manager.create(createRequest('second', content));
    expect(fixture.store.stats()).toMatchObject({ objects: 1, blobs: 1 });

    await deleteArtifact(fixture.manager, first.id, first.revision, 'delete-first');
    await expect(fixture.collector.collect({ operationId: 'gc-active-ref' })).resolves.toMatchObject({
      candidateObjects: 0,
      deletedObjects: 0,
    });
    expect(fixture.store.stats()).toMatchObject({ objects: 1, blobs: 1 });

    await deleteArtifact(fixture.manager, second.id, second.revision, 'delete-second');
    await expect(
      fixture.collector.collect({ operationId: 'gc-dry-run', dryRun: true })
    ).resolves.toMatchObject({ candidateObjects: 1, claimedObjects: 0, deletedObjects: 0 });
    expect(fixture.store.stats()).toMatchObject({ objects: 1, blobs: 1 });

    await expect(fixture.collector.collect({ operationId: 'gc-delete' })).resolves.toMatchObject({
      candidateObjects: 1,
      claimedObjects: 1,
      deletedObjects: 1,
      failures: [],
    });
    expect(fixture.store.stats()).toEqual({ objects: 0, blobs: 0, storedBytes: 0 });
    await expect(fixture.collector.collect({ operationId: 'gc-repeat' })).resolves.toMatchObject({
      candidateObjects: 0,
      deletedObjects: 0,
    });
  });

  it('keeps candidates whose Artifact profile disables unreferenced GC', async () => {
    const fixture = createFixture(false);
    const content = new TextEncoder().encode('retained-by-policy');
    const record = await fixture.manager.create(createRequest('retained', content));
    await deleteArtifact(fixture.manager, record.id, record.revision, 'delete-retained');

    await expect(fixture.collector.collect({ operationId: 'gc-policy' })).resolves.toMatchObject({
      candidateObjects: 1,
      skippedPolicyObjects: 1,
      deletedObjects: 0,
    });
    expect(fixture.store.stats().objects).toBe(1);
  });

  it('releases a failed claim so Store deletion can be retried', async () => {
    const fixture = createFixture();
    const content = new TextEncoder().encode('retry-delete');
    const record = await fixture.manager.create(createRequest('retry', content));
    await deleteArtifact(fixture.manager, record.id, record.revision, 'delete-retry');
    const originalDelete = fixture.store.delete.bind(fixture.store);
    let fail = true;
    fixture.store.delete = async (ref) => {
      if (fail) {
        fail = false;
        throw new Error('temporary delete failure');
      }
      await originalDelete(ref);
    };

    await expect(fixture.collector.collect({ operationId: 'gc-fails' })).resolves.toMatchObject({
      claimedObjects: 1,
      deletedObjects: 0,
      failures: [expect.objectContaining({ message: 'temporary delete failure' })],
    });
    await expect(fixture.collector.collect({ operationId: 'gc-retry' })).resolves.toMatchObject({
      claimedObjects: 1,
      deletedObjects: 1,
      failures: [],
    });
  });

  it('completes GC idempotently when the Store object is already missing', async () => {
    const fixture = createFixture();
    const content = new TextEncoder().encode('already-missing');
    const record = await fixture.manager.create(createRequest('missing', content));
    await deleteArtifact(fixture.manager, record.id, record.revision, 'delete-missing');
    await fixture.store.delete(record.storageRef);

    await expect(fixture.collector.collect({ operationId: 'gc-missing' })).resolves.toMatchObject({
      missingObjects: 1,
      deletedObjects: 0,
      failures: [],
    });
    await expect(fixture.collector.collect({ operationId: 'gc-missing-repeat' })).resolves.toMatchObject({
      candidateObjects: 0,
    });
  });

  it('blocks a new shared reference while GC owns the storage claim', async () => {
    const fixture = createFixture();
    const content = new TextEncoder().encode('claimed-content');
    const record = await fixture.manager.create(createRequest('claimed', content));
    await deleteArtifact(fixture.manager, record.id, record.revision, 'delete-claimed');
    const [candidate] = await fixture.repository.listGarbageCollectionCandidates({
      staleBefore: '2026-07-18T00:00:00.000Z',
    });
    await expect(
      fixture.repository.claimGarbageCollection({
        claimId: 'claim.concurrent',
        claimedAt: '2026-07-18T00:01:00.000Z',
        staleBefore: '2026-07-18T00:00:00.000Z',
        candidate: candidate!,
      })
    ).resolves.toBe(true);

    await expect(
      fixture.manager.create(createRequest('concurrent', content))
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_VERSION_CONFLICT' } });
    await fixture.repository.releaseGarbageCollection('claim.concurrent');
    await expect(fixture.manager.create(createRequest('after-release', content))).resolves.toMatchObject({
      contentHash: record.contentHash,
    });
  });
});

function createFixture(garbageCollectUnreferenced = true) {
  const store = new InMemoryExecutionArtifactStore({ id: 'artifact-store.gc-test' });
  const repository = new InMemoryArtifactRecordRepository();
  const profile: ArtifactProfileSpec = {
    id: 'artifact-profile.gc-test',
    version: '1.0.0',
    storeRef: { id: store.id },
    contentAddressing: { hashAlgorithm: 'sha256', verifyOnRead: true, deduplicate: true },
    versioning: { strategy: 'append_only', retainPreviousVersions: true },
    access: {
      defaultVisibility: 'workspace',
      requiredReadScopes: ['artifact:read'],
      requiredWriteScopes: ['artifact:write'],
      requiredDeleteScopes: ['artifact:delete'],
    },
    retention: { retainFinal: false, garbageCollectUnreferenced },
    validation: { checksumRequired: true },
    allowedKinds: ['report'],
    allowedMimeTypes: ['text/plain'],
  };
  let id = 0;
  let tick = 0;
  const idGenerator = () => String(++id);
  const now = () => new Date(Date.UTC(2026, 6, 18, 1, 0, tick++)).toISOString();
  const manager = new DefaultArtifactManager({
    profiles: [profile],
    stores: [store],
    repository,
    idGenerator,
    now,
  });
  const collector = new DefaultArtifactGarbageCollector({
    profiles: [profile],
    stores: [store],
    repository,
    idGenerator,
    now,
  });
  return { collector, manager, profile, repository, store };
}

function createRequest(operationId: string, content: Uint8Array) {
  return {
    operationId,
    principal,
    profileRef: { id: 'artifact-profile.gc-test', version: '1.0.0' },
    userId: principal.userId!,
    workspaceId: 'workspace.example',
    name: `${operationId}.txt`,
    kind: 'report' as const,
    mimeType: 'text/plain',
    content,
    expectedContentHash: hashArtifactBytes(content),
    expectedSizeBytes: content.byteLength,
    provenance: { sourceType: 'agent_generated' as const, createdBy: principal.principalId },
  };
}

async function deleteArtifact(
  manager: DefaultArtifactManager,
  artifactId: string,
  expectedRevision: number,
  operationId: string
): Promise<void> {
  await manager.delete({ operationId, principal, artifactId, expectedRevision });
}
