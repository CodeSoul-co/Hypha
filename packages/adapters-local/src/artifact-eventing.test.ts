import { describe, expect, it } from 'vitest';
import type {
  ArtifactEventPublication,
  ArtifactEventPublisher,
  ArtifactProfileSpec,
  ExecutionPrincipal,
} from '@hypha/core';
import {
  DefaultArtifactGarbageCollector,
  DefaultArtifactManager,
  DefaultArtifactRetentionProcessor,
  EventingArtifactGarbageCollector,
  EventingArtifactManager,
  EventingArtifactRetentionProcessor,
} from '@hypha/core';
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

describe('Artifact Event publication decorators', () => {
  it('preserves Artifact request validation before publishing lifecycle facts', async () => {
    const fixture = createFixture();
    await expect(
      fixture.manager.create({ ...createRequest('', 'invalid-operation'), operationId: '' })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_INVALID_INPUT' } });
    await expect(
      fixture.eventingCollector().collect({ operationId: '', dryRun: true })
    ).rejects.toThrow(/operationId/u);
    expect(fixture.publisher.publications).toEqual([]);
  });

  it('publishes idempotent, bounded create/read/mutation/delete lifecycle evidence', async () => {
    const fixture = createFixture();
    const request = createRequest('operation.create', 'event-content', {
      idempotencyKey: 'request.create',
    });
    const created = await fixture.manager.create(request);
    await expect(fixture.manager.create(request)).resolves.toMatchObject({ id: created.id });
    const finalized = await fixture.manager.finalize({
      operationId: 'operation.finalize',
      principal,
      artifactId: created.id,
      expectedRevision: created.revision,
    });
    await fixture.manager.read({ principal, artifactId: created.id });
    await fixture.manager.delete({
      operationId: 'operation.delete',
      principal,
      artifactId: created.id,
      expectedRevision: finalized.revision,
    });

    expect(fixture.publisher.types()).toEqual([
      'artifact.create.requested',
      'artifact.created',
      'artifact.finalized',
      'artifact.read.requested',
      'artifact.read.completed',
      'artifact.delete.requested',
      'artifact.deleted',
    ]);
    expect(fixture.publisher.publications).toHaveLength(7);
    expect(fixture.publisher.byType('artifact.created')?.payload).toMatchObject({
      artifactId: created.id,
      versionId: created.versionId,
      contentHash: created.contentHash,
      status: 'draft',
    });
    expect(JSON.stringify(fixture.publisher.publications)).not.toMatch(
      /event-content|storageRef|relativePath/u
    );
  });

  it('publishes normalized create failure and delete-blocked evidence', async () => {
    const fixture = createFixture();
    await expect(
      fixture.manager.create({
        ...createRequest('operation.invalid', 'invalid'),
        kind: 'video',
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_TYPE_DENIED' } });
    const held = await fixture.manager.create({
      ...createRequest('operation.held', 'held-content'),
      retention: { legalHold: true },
    });
    await expect(
      fixture.manager.delete({
        operationId: 'operation.delete-held',
        principal,
        artifactId: held.id,
        expectedRevision: held.revision,
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_DELETE_BLOCKED' } });

    expect(fixture.publisher.byType('artifact.create.failed')?.payload.error).toMatchObject({
      code: 'ARTIFACT_TYPE_DENIED',
      retryable: false,
    });
    expect(fixture.publisher.byType('artifact.delete.blocked')?.payload.error).toMatchObject({
      code: 'ARTIFACT_DELETE_BLOCKED',
      retryable: false,
    });
  });

  it('recovers a committed idempotent create after transient event publication failure', async () => {
    const fixture = createFixture();
    const request = createRequest('operation.publisher-retry', 'publisher-retry-content', {
      idempotencyKey: 'request.publisher-retry',
    });
    fixture.publisher.failOnce('artifact.created');

    await expect(fixture.manager.create(request)).rejects.toThrow(/event publication failed/u);
    expect(await fixture.repository.list()).toHaveLength(1);
    const recovered = await fixture.manager.create(request);

    expect(await fixture.repository.list()).toHaveLength(1);
    expect(recovered.id).toBe((await fixture.repository.list())[0]!.record.id);
    expect(fixture.publisher.types()).toEqual(['artifact.create.requested', 'artifact.created']);
  });

  it('publishes deduplication only when a committed Blob is actually reused', async () => {
    const fixture = createFixture();
    const first = await fixture.manager.create(
      createRequest('operation.deduplicate.first', 'same-content')
    );
    const second = await fixture.manager.create(
      createRequest('operation.deduplicate.second', 'same-content')
    );

    expect(first.deduplicated).toBe(false);
    expect(second.deduplicated).toBe(true);
    expect(
      fixture.publisher.publications.filter(({ type }) => type === 'artifact.deduplicated')
    ).toEqual([
      expect.objectContaining({
        payload: expect.objectContaining({
          artifactId: second.id,
          versionId: second.versionId,
          contentHash: second.contentHash,
          deduplicated: true,
        }),
      }),
    ]);
  });

  it('publishes GC completion and partial-failure summaries without object content', async () => {
    const successful = createFixture();
    const record = await successful.manager.create(
      createRequest('operation.gc-source', 'gc-content')
    );
    await successful.manager.delete({
      operationId: 'operation.gc-delete',
      principal,
      artifactId: record.id,
      expectedRevision: record.revision,
    });
    const gc = successful.eventingCollector();
    await expect(gc.collect({ operationId: 'operation.gc' })).resolves.toMatchObject({
      deletedObjects: 1,
      failures: [],
    });
    expect(successful.publisher.byType('artifact.gc.completed')?.payload).toMatchObject({
      operationId: 'operation.gc',
      deletedObjects: 1,
      reclaimedBytes: new TextEncoder().encode('gc-content').byteLength,
    });

    const failing = createFixture();
    const failedRecord = await failing.manager.create(
      createRequest('operation.gc-failed-source', 'gc-failed-content')
    );
    await failing.manager.delete({
      operationId: 'operation.gc-failed-delete',
      principal,
      artifactId: failedRecord.id,
      expectedRevision: failedRecord.revision,
    });
    failing.store.delete = async () => {
      throw new Error('temporary store failure');
    };
    await expect(
      failing.eventingCollector().collect({ operationId: 'operation.gc-failed' })
    ).resolves.toMatchObject({ failures: [expect.objectContaining({ retryable: true })] });
    expect(failing.publisher.byType('artifact.gc.failed')?.payload).toMatchObject({
      operationId: 'operation.gc-failed',
      error: { code: 'ARTIFACT_INTERNAL_ERROR', retryable: true },
    });
  });

  it('applies deterministic retention expiry and publishes the resulting fact', async () => {
    const fixture = createFixture();
    const record = await fixture.manager.create(
      createRequest('operation.retention-source', 'retention-content')
    );
    const processor = new EventingArtifactRetentionProcessor({
      processor: new DefaultArtifactRetentionProcessor({
        manager: fixture.manager,
        repository: fixture.repository,
      }),
      publisher: fixture.publisher,
      idGenerator: fixture.nextEventId,
    });

    await expect(
      processor.process({
        operationId: 'operation.retention-expired',
        principal,
        artifactId: record.id,
        evaluatedAt: '2026-07-18T08:10:00.000Z',
      })
    ).resolves.toMatchObject({
      applied: true,
      decision: { action: 'delete', reason: 'delete_after' },
    });
    expect(fixture.publisher.byType('artifact.retention.expired')?.payload).toMatchObject({
      artifactId: record.id,
      versionId: record.versionId,
      reason: 'delete_after',
    });
  });
});

class CapturingArtifactEventPublisher implements ArtifactEventPublisher {
  readonly publications: ArtifactEventPublication[] = [];
  private readonly failures = new Map<ArtifactEventPublication['type'], number>();

  async publish(publication: ArtifactEventPublication): Promise<void> {
    const remainingFailures = this.failures.get(publication.type) ?? 0;
    if (remainingFailures > 0) {
      this.failures.set(publication.type, remainingFailures - 1);
      throw new Error(`event publication failed for ${publication.type}`);
    }
    const existing = this.publications.find(({ id }) => id === publication.id);
    if (existing) {
      expect({ ...publication, timestamp: existing.timestamp }).toEqual(existing);
      return;
    }
    this.publications.push(structuredClone(publication));
  }

  types(): string[] {
    return this.publications.map(({ type }) => type);
  }

  byType(type: ArtifactEventPublication['type']): ArtifactEventPublication | undefined {
    return this.publications.find((publication) => publication.type === type);
  }

  failOnce(type: ArtifactEventPublication['type']): void {
    this.failures.set(type, (this.failures.get(type) ?? 0) + 1);
  }
}

function createFixture() {
  const store = new InMemoryExecutionArtifactStore({ id: 'artifact-store.event-test' });
  const repository = new InMemoryArtifactRecordRepository();
  const publisher = new CapturingArtifactEventPublisher();
  const profile: ArtifactProfileSpec = {
    id: 'artifact-profile.event-test',
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
    retention: {
      archiveAfterSeconds: 60,
      deleteAfterSeconds: 120,
      retainFinal: false,
      legalHoldSupported: true,
      garbageCollectUnreferenced: true,
    },
    validation: { checksumRequired: true },
    allowedKinds: ['report'],
    allowedMimeTypes: ['text/plain'],
  };
  let id = 0;
  let eventId = 0;
  let tick = 0;
  const now = () => new Date(Date.UTC(2026, 6, 18, 8, 0, tick++)).toISOString();
  const baseManager = new DefaultArtifactManager({
    profiles: [profile],
    stores: [store],
    repository,
    idGenerator: () => String(++id),
    now,
  });
  const manager = new EventingArtifactManager({
    manager: baseManager,
    publisher,
    idGenerator: () => String(++eventId),
    now,
  });
  const nextEventId = () => String(++eventId);
  const eventingCollector = () =>
    new EventingArtifactGarbageCollector({
      collector: new DefaultArtifactGarbageCollector({
        profiles: [profile],
        stores: [store],
        repository,
        idGenerator: () => String(++id),
        now,
      }),
      publisher,
      idGenerator: () => String(++eventId),
      now,
      runId: 'run.maintenance',
    });
  return { eventingCollector, manager, nextEventId, profile, publisher, repository, store };
}

function createRequest(
  operationId: string,
  text: string,
  overrides: { idempotencyKey?: string } = {}
) {
  const content = new TextEncoder().encode(text);
  return {
    operationId,
    principal,
    profileRef: { id: 'artifact-profile.event-test', version: '1.0.0' },
    userId: principal.userId!,
    workspaceId: 'workspace.example',
    sessionId: 'session.example',
    runId: 'run.example',
    agentId: 'agent.example',
    name: `${operationId}.txt`,
    kind: 'report' as const,
    mimeType: 'text/plain',
    content,
    expectedContentHash: hashArtifactBytes(content),
    expectedSizeBytes: content.byteLength,
    provenance: { sourceType: 'agent_generated' as const, createdBy: principal.principalId },
    ...overrides,
  };
}
