import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  DefaultArtifactManager,
  type ArtifactProfileSpec,
  type ArtifactWorkspaceContentReader,
  type ExecutionPrincipal,
  validateWorkspaceSnapshotManifest,
} from '@hypha/core';
import { afterEach, describe, expect, it } from 'vitest';
import { hashArtifactBytes, readArtifactStream } from './artifact-content-io';
import { InMemoryArtifactRecordRepository } from './in-memory-artifact-record-repository';
import { InMemoryExecutionArtifactStore } from './in-memory-execution-artifact-store';
import { LocalWorkspaceAdapter } from './local-workspace-adapter';
import { LocalWorkspaceSnapshotArtifactService } from './local-workspace-snapshot-artifacts';

const principal: ExecutionPrincipal = {
  principalId: 'user.snapshot',
  type: 'user',
  tenantId: 'tenant.snapshot',
  userId: 'user.snapshot',
  permissionScopes: ['artifact:read', 'artifact:write', 'artifact:delete'],
};
const ownerUserId = 'user.snapshot';

describe('LocalWorkspaceSnapshotArtifactService', () => {
  const roots: string[] = [];

  afterEach(async () => {
    await Promise.all(roots.splice(0).map((root) => fs.rm(root, { recursive: true, force: true })));
  });

  it('persists a complete Workspace tree and finalized manifest through ArtifactManager', async () => {
    const root = await workspaceRoot('complete');
    await fs.mkdir(path.join(root, 'empty'));
    await fs.mkdir(path.join(root, 'nested'));
    await fs.writeFile(path.join(root, 'nested', 'report.txt'), 'report');
    await fs.writeFile(path.join(root, 'raw.bin'), Uint8Array.from([0, 1, 2, 255]));
    const fixture = createFixture(root);
    const workspace = new LocalWorkspaceAdapter({ workspaceRoot: root });
    const service = createService(workspace, fixture.manager);

    const artifact = await service.createFullSnapshot(snapshotRequest());

    expect(artifact).toMatchObject({
      kind: 'snapshot',
      mimeType: 'application/json',
      status: 'final',
      metadata: {
        sourceTreeHash: expect.stringMatching(/^sha256:[0-9a-f]{64}$/u),
        manifestHash: expect.stringMatching(/^sha256:[0-9a-f]{64}$/u),
      },
    });
    const manifestContent = await fixture.manager.read({
      principal,
      artifactId: artifact.id,
      expectedContentHash: artifact.contentHash,
    });
    const manifest = validateWorkspaceSnapshotManifest(
      JSON.parse(new TextDecoder().decode(await readArtifactStream(manifestContent.content.stream)))
    );
    const captured = await workspace.capture();
    expect(manifest).toMatchObject({
      workspaceId: 'workspace.snapshot',
      sourceTreeHash: captured.sourceTreeHash,
      totalBytes: 10,
      fileCount: 2,
      entries: [
        expect.objectContaining({ path: 'empty', kind: 'directory' }),
        expect.objectContaining({ path: 'nested', kind: 'directory' }),
        expect.objectContaining({
          path: 'nested/report.txt',
          kind: 'file',
          artifactRef: expect.any(String),
        }),
        expect.objectContaining({
          path: 'raw.bin',
          kind: 'file',
          artifactRef: expect.any(String),
        }),
      ],
    });

    for (const entry of manifest.entries.filter(
      (candidate): candidate is typeof candidate & { artifactRef: string } =>
        candidate.kind === 'file' && candidate.artifactRef !== undefined
    )) {
      const fileArtifact = await fixture.manager.get({
        principal,
        artifactId: entry.artifactRef,
      });
      expect(fileArtifact).toMatchObject({
        status: 'final',
        contentHash: entry.contentHash,
        sizeBytes: entry.sizeBytes,
      });
    }

    const storedObjects = fixture.store.stats();
    await expect(service.createFullSnapshot(snapshotRequest())).resolves.toEqual(artifact);
    expect(fixture.store.stats()).toEqual(storedObjects);
  });

  it('fails before Artifact writes when Workspace scope does not match', async () => {
    const root = await workspaceRoot('scope');
    await fs.writeFile(path.join(root, 'result.txt'), 'result');
    const fixture = createFixture(root);
    const service = createService(
      new LocalWorkspaceAdapter({ workspaceRoot: root }),
      fixture.manager
    );

    await expect(
      service.createFullSnapshot({
        ...snapshotRequest(),
        workspaceId: 'workspace.other',
      })
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PERMISSION_DENIED' },
    });
    expect(fixture.store.stats().objects).toBe(0);
  });

  it('rejects an idempotency key reused after Workspace content changes', async () => {
    const root = await workspaceRoot('idempotency-conflict');
    await fs.writeFile(path.join(root, 'result.txt'), 'before');
    const fixture = createFixture(root);
    const service = createService(
      new LocalWorkspaceAdapter({ workspaceRoot: root }),
      fixture.manager
    );
    await service.createFullSnapshot(snapshotRequest());

    await fs.writeFile(path.join(root, 'result.txt'), 'after');

    await expect(service.createFullSnapshot(snapshotRequest())).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_IDEMPOTENCY_CONFLICT' },
    });
  });

  it('rejects non-full or partial snapshot requests', async () => {
    const root = await workspaceRoot('partial');
    const fixture = createFixture(root);
    const service = createService(
      new LocalWorkspaceAdapter({ workspaceRoot: root }),
      fixture.manager
    );

    await expect(
      service.createFullSnapshot({
        ...snapshotRequest(),
        includePaths: ['outputs'],
      })
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_INVALID_REQUEST' },
    });
    expect(fixture.store.stats().objects).toBe(0);
  });

  it('fails closed when the Workspace changes before manifest commit', async () => {
    const root = await workspaceRoot('revision');
    await fs.writeFile(path.join(root, 'result.txt'), 'result');
    let mutateAfterRead = true;
    const fixture = createFixture(root, async () => {
      if (!mutateAfterRead) return;
      mutateAfterRead = false;
      await fs.writeFile(path.join(root, 'late.txt'), 'late');
    });
    const service = createService(
      new LocalWorkspaceAdapter({ workspaceRoot: root }),
      fixture.manager
    );

    await expect(service.createFullSnapshot(snapshotRequest())).rejects.toMatchObject({
      normalizedError: {
        code: 'EXECUTION_REVISION_CONFLICT',
        details: {
          expectedWorkspaceSnapshotHash: expect.stringMatching(/^sha256:/u),
          actualWorkspaceSnapshotHash: expect.stringMatching(/^sha256:/u),
        },
      },
    });
    const records = await fixture.repository.list();
    expect(records.every(({ record }) => record.status !== 'final')).toBe(true);
  });

  it('rejects an external symlink target before creating Artifacts', async () => {
    const root = await workspaceRoot('link');
    const unsafeSnapshot = {
      rootPath: root,
      entries: new Map([
        [
          'outside-link',
          {
            path: 'outside-link',
            contentHash: hashArtifactBytes(new TextEncoder().encode('../outside')),
            sizeBytes: 10,
            mode: 0,
            kind: 'symlink' as const,
          },
        ],
      ]),
      directories: new Map(),
      totalBytes: 10,
      sourceTreeHash: hashArtifactBytes(new TextEncoder().encode('unsafe')),
    };
    const fixture = createFixture(root);
    const service = createService({ capture: async () => unsafeSnapshot }, fixture.manager);

    await expect(service.createFullSnapshot(snapshotRequest())).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PATH_ESCAPE' },
    });
    expect(fixture.store.stats().objects).toBe(0);
  });

  async function workspaceRoot(label: string): Promise<string> {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), `hypha-snapshot-${label}-`));
    roots.push(root);
    return root;
  }
});

function snapshotRequest() {
  return {
    operationId: 'workspace.snapshot.create',
    workspaceId: 'workspace.snapshot',
    principal,
    type: 'full' as const,
    idempotencyKey: 'workspace.snapshot.create',
  };
}

function createService(
  workspace: ConstructorParameters<typeof LocalWorkspaceSnapshotArtifactService>[0]['workspace'],
  manager: DefaultArtifactManager
): LocalWorkspaceSnapshotArtifactService {
  return new LocalWorkspaceSnapshotArtifactService({
    workspace,
    artifacts: manager,
    context: {
      profileRef: { id: 'artifact-profile.snapshot', version: '1.0.0' },
      userId: ownerUserId,
      tenantId: principal.tenantId,
      workspaceId: 'workspace.snapshot',
    },
    now: () => '2026-07-27T00:00:00.000Z',
  });
}

function createFixture(root: string, afterRead?: () => Promise<void>) {
  const store = new InMemoryExecutionArtifactStore({ id: 'artifact-store.snapshot' });
  const repository = new InMemoryArtifactRecordRepository();
  const profile: ArtifactProfileSpec = {
    id: 'artifact-profile.snapshot',
    version: '1.0.0',
    storeRef: { id: store.id },
    contentAddressing: { hashAlgorithm: 'sha256', verifyOnRead: true, deduplicate: true },
    versioning: { strategy: 'append_only', retainPreviousVersions: true },
    access: {
      defaultVisibility: 'workspace',
      allowedPrincipalTypes: ['user'],
      requiredReadScopes: ['artifact:read'],
      requiredWriteScopes: ['artifact:write'],
      requiredDeleteScopes: ['artifact:delete'],
      allowRangeRead: true,
    },
    retention: {
      retainFinal: true,
      legalHoldSupported: true,
      garbageCollectUnreferenced: true,
    },
    validation: { checksumRequired: true },
    allowedKinds: ['snapshot'],
    allowedMimeTypes: ['application/json', 'application/octet-stream'],
    maxArtifactBytes: 1024 * 1024,
  };
  const workspaceReader: ArtifactWorkspaceContentReader = {
    async read(request) {
      if (request.workspaceId !== 'workspace.snapshot') throw new Error('Workspace scope mismatch');
      const candidate = path.resolve(root, request.relativePath);
      const relative = path.relative(root, candidate);
      if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
        throw new Error('Workspace path escape');
      }
      const content = new Uint8Array(await fs.readFile(candidate));
      if (request.maxBytes !== undefined && content.byteLength > request.maxBytes) {
        throw new Error('Workspace content limit exceeded');
      }
      await afterRead?.();
      return {
        content,
        contentHash: hashArtifactBytes(content),
        sizeBytes: content.byteLength,
        mimeType: 'application/octet-stream',
      };
    },
  };
  let id = 0;
  const manager = new DefaultArtifactManager({
    profiles: [profile],
    stores: [store],
    repository,
    workspaceReader,
    idGenerator: () => String(++id),
    now: () => '2026-07-27T00:00:00.000Z',
  });
  return { manager, repository, store };
}
