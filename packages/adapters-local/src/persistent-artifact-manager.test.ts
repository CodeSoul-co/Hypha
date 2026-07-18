import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import type { ArtifactProfileSpec, ExecutionPrincipal } from '@hypha/core';
import { DefaultArtifactManager } from '@hypha/core';
import { hashArtifactBytes } from './artifact-content-io';
import { LocalFilesystemExecutionArtifactStore } from './local-filesystem-execution-artifact-store';
import { SQLiteArtifactRecordRepository } from './sqlite-artifact-record-repository';

const roots: string[] = [];
const principal: ExecutionPrincipal = {
  principalId: 'user.owner',
  type: 'user',
  userId: 'user.owner',
  permissionScopes: ['artifact:read', 'artifact:write'],
  metadata: { workspaceIds: ['workspace.example'] },
};

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => fs.rm(root, { recursive: true, force: true })));
});

describe('persistent Artifact Manager composition', () => {
  it('recovers records, bytes, versions, and idempotency after a full local restart', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-persistent-artifacts-'));
    roots.push(root);
    const content = new TextEncoder().encode('persistent-artifact');
    const first = composition(root, 'first');
    const request = {
      operationId: 'operation.create.persistent',
      idempotencyKey: 'request-persistent-1',
      principal,
      profileRef: { id: first.profile.id, version: first.profile.version },
      userId: principal.userId!,
      workspaceId: 'workspace.example',
      name: 'persistent.txt',
      kind: 'report' as const,
      mimeType: 'text/plain',
      content,
      expectedContentHash: hashArtifactBytes(content),
      expectedSizeBytes: content.byteLength,
      provenance: { sourceType: 'agent_generated' as const, createdBy: principal.principalId },
    };
    const created = await first.manager.create(request);
    await first.repository.close();
    await first.store.close();

    const reopened = composition(root, 'reopened');
    await expect(
      reopened.manager.get({ principal, artifactId: created.id })
    ).resolves.toEqual(created);
    const read = await reopened.manager.read({ principal, artifactId: created.id });
    await expect(collect(read.content.stream)).resolves.toEqual(content);
    await expect(reopened.manager.create(request)).resolves.toEqual(created);
    await expect(reopened.manager.health()).resolves.toMatchObject({
      'artifact-records': { status: 'healthy' },
      'artifact-store.persistent-test': { status: 'healthy' },
    });
    await reopened.repository.close();
    await reopened.store.close();
  });

  it('reconciles concurrent idempotent creates across Manager instances', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-persistent-artifacts-'));
    roots.push(root);
    const first = composition(root, 'first');
    const second = composition(root, 'second');
    const content = new TextEncoder().encode('concurrent-idempotency');
    const request = {
      operationId: 'operation.create.concurrent',
      idempotencyKey: 'request-concurrent-1',
      principal,
      profileRef: { id: first.profile.id, version: first.profile.version },
      userId: principal.userId!,
      workspaceId: 'workspace.example',
      name: 'concurrent.txt',
      kind: 'report' as const,
      mimeType: 'text/plain',
      content,
      expectedContentHash: hashArtifactBytes(content),
      expectedSizeBytes: content.byteLength,
      provenance: { sourceType: 'agent_generated' as const, createdBy: principal.principalId },
    };

    const [left, right] = await Promise.all([
      first.manager.create(request),
      second.manager.create(request),
    ]);

    expect(right).toEqual(left);
    await expect(first.repository.list()).resolves.toHaveLength(1);
    await first.repository.close();
    await second.repository.close();
    await first.store.close();
    await second.store.close();
  });
});

function composition(root: string, idPrefix: string) {
  const store = new LocalFilesystemExecutionArtifactStore({
    id: 'artifact-store.persistent-test',
    rootPath: path.join(root, 'blobs'),
  });
  const repository = new SQLiteArtifactRecordRepository({
    rootPath: path.join(root, 'records'),
  });
  const profile: ArtifactProfileSpec = {
    id: 'artifact-profile.persistent-test',
    version: '1.0.0',
    storeRef: { id: store.id },
    contentAddressing: { hashAlgorithm: 'sha256', verifyOnRead: true, deduplicate: true },
    versioning: { strategy: 'append_only', retainPreviousVersions: true },
    access: {
      defaultVisibility: 'workspace',
      requiredReadScopes: ['artifact:read'],
      requiredWriteScopes: ['artifact:write'],
      allowRangeRead: true,
    },
    retention: { garbageCollectUnreferenced: true },
    validation: { checksumRequired: true },
    allowedKinds: ['report'],
    allowedMimeTypes: ['text/plain'],
  };
  let id = 0;
  const manager = new DefaultArtifactManager({
    profiles: [profile],
    stores: [store],
    repository,
    idGenerator: () => `${idPrefix}-${++id}`,
  });
  return { manager, profile, repository, store };
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
