import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import {
  DefaultArtifactManager,
  type ArtifactProfileSpec,
  type ExecutionPrincipal,
  type WorkspaceSnapshotManifest,
  validateWorkspaceSnapshotManifest,
} from '@hypha/core';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { hashArtifactBytes, readArtifactStream } from './artifact-content-io';
import { InMemoryArtifactRecordRepository } from './in-memory-artifact-record-repository';
import { InMemoryExecutionArtifactStore } from './in-memory-execution-artifact-store';
import { LocalArtifactWorkspaceContentReader } from './local-artifact-workspace-content-reader';
import { LocalWorkspaceAdapter } from './local-workspace-adapter';
import { workspaceRestoreJournalPath } from './local-workspace-restore-journal';
import { LocalWorkspaceSnapshotArtifactService } from './local-workspace-snapshot-artifacts';
import {
  encodeWorkspaceSnapshotManifest,
  hashWorkspaceSnapshotManifest,
} from './local-workspace-snapshot-manifest';

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
    await Promise.all(roots.splice(0).map(cleanupWorkspaceRoot));
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

  it('restores a complete Workspace tree from finalized snapshot Artifacts', async () => {
    const root = await workspaceRoot('restore');
    await fs.mkdir(path.join(root, 'empty'));
    await fs.mkdir(path.join(root, 'nested'));
    await fs.writeFile(path.join(root, 'nested', 'report.txt'), 'original report');
    await fs.writeFile(path.join(root, 'raw.bin'), Uint8Array.from([0, 1, 2, 255]));
    const fixture = createFixture(root);
    const workspace = new LocalWorkspaceAdapter({ workspaceRoot: root });
    const service = createService(workspace, fixture.manager);
    const original = await workspace.capture();
    const snapshot = await service.createFullSnapshot(snapshotRequest());

    await fs.rm(path.join(root, 'nested'), { recursive: true });
    await fs.rm(path.join(root, 'empty'), { recursive: true });
    await fs.writeFile(path.join(root, 'raw.bin'), 'changed');
    await fs.writeFile(path.join(root, 'stale.txt'), 'stale');
    const changed = await workspace.capture();

    await service.restoreFullSnapshot(restoreRequest(snapshot.id, changed.sourceTreeHash));

    await expect(fs.readFile(path.join(root, 'nested', 'report.txt'), 'utf8')).resolves.toBe(
      'original report'
    );
    await expect(fs.readFile(path.join(root, 'raw.bin'))).resolves.toEqual(
      Buffer.from([0, 1, 2, 255])
    );
    await expect(fs.stat(path.join(root, 'empty'))).resolves.toMatchObject({});
    await expect(fs.access(path.join(root, 'stale.txt'))).rejects.toMatchObject({
      code: 'ENOENT',
    });
    await expect(workspace.capture()).resolves.toMatchObject({
      sourceTreeHash: original.sourceTreeHash,
    });
    await expect(fs.access(workspaceRestoreJournalPath(root))).rejects.toMatchObject({
      code: 'ENOENT',
    });
  });

  it('does not modify the Workspace when the expected current hash is stale', async () => {
    const root = await workspaceRoot('restore-stale');
    await fs.writeFile(path.join(root, 'result.txt'), 'snapshot');
    const fixture = createFixture(root);
    const workspace = new LocalWorkspaceAdapter({ workspaceRoot: root });
    const service = createService(workspace, fixture.manager);
    const snapshot = await service.createFullSnapshot(snapshotRequest());
    await fs.writeFile(path.join(root, 'result.txt'), 'current');

    await expect(
      service.restoreFullSnapshot(restoreRequest(snapshot.id, 'sha256:stale'))
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_REVISION_CONFLICT' },
    });
    await expect(fs.readFile(path.join(root, 'result.txt'), 'utf8')).resolves.toBe('current');
  });

  it('fails closed when the Workspace changes while restore staging is prepared', async () => {
    const root = await workspaceRoot('restore-race');
    await fs.writeFile(path.join(root, 'result.txt'), 'snapshot');
    const fixture = createFixture(root);
    const workspace = new LocalWorkspaceAdapter({ workspaceRoot: root });
    const snapshot = await createService(workspace, fixture.manager).createFullSnapshot(
      snapshotRequest()
    );
    await fs.writeFile(path.join(root, 'result.txt'), 'current');
    const current = await workspace.capture();
    let captureCount = 0;
    const restoreService = createService(
      {
        workspaceRoot: root,
        async capture() {
          captureCount += 1;
          if (captureCount === 2) {
            await fs.writeFile(path.join(root, 'late.txt'), 'late');
          }
          return workspace.capture();
        },
      },
      fixture.manager
    );

    await expect(
      restoreService.restoreFullSnapshot(restoreRequest(snapshot.id, current.sourceTreeHash))
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_REVISION_CONFLICT' },
    });
    await expect(fs.readFile(path.join(root, 'result.txt'), 'utf8')).resolves.toBe('current');
    await expect(fs.readFile(path.join(root, 'late.txt'), 'utf8')).resolves.toBe('late');
  });

  it('fails closed and preserves the current Workspace when restore staging exceeds its duration budget', async () => {
    const root = await workspaceRoot('restore-duration');
    await fs.writeFile(path.join(root, 'result.txt'), 'snapshot');
    const fixture = createFixture(root);
    const workspace = new LocalWorkspaceAdapter({ workspaceRoot: root });
    const snapshot = await createService(workspace, fixture.manager).createFullSnapshot(
      snapshotRequest()
    );
    await fs.writeFile(path.join(root, 'result.txt'), 'current');
    const current = await workspace.capture();
    const readArtifact = fixture.manager.read.bind(fixture.manager);
    let artifactReads = 0;
    let expired = false;
    const read = vi.spyOn(fixture.manager, 'read').mockImplementation(async (request) => {
      const result = await readArtifact(request);
      artifactReads += 1;
      if (artifactReads === 2) expired = true;
      return result;
    });
    const now = vi.spyOn(performance, 'now').mockImplementation(() => (expired ? 2 : 0));

    try {
      const service = createService(workspace, fixture.manager, {
        maxRestoreStagingDurationMs: 1,
      });
      await expect(
        service.restoreFullSnapshot(restoreRequest(snapshot.id, current.sourceTreeHash))
      ).rejects.toMatchObject({
        normalizedError: {
          code: 'EXECUTION_RESOURCE_EXCEEDED',
          details: { maxRestoreStagingDurationMs: 1 },
        },
      });
    } finally {
      now.mockRestore();
      read.mockRestore();
    }

    await expect(fs.readFile(path.join(root, 'result.txt'), 'utf8')).resolves.toBe('current');
    await expect(fs.access(workspaceRestoreJournalPath(root))).rejects.toMatchObject({
      code: 'ENOENT',
    });
    const restoreEvidence = (await fs.readdir(path.dirname(root))).filter((candidate) =>
      candidate.startsWith(`.${path.basename(root)}.restore-`)
    );
    expect(restoreEvidence).toEqual([]);
  });

  it('rejects protected control-plane paths from a validly hashed manifest', async () => {
    const root = await workspaceRoot('restore-protected');
    await fs.writeFile(path.join(root, 'result.txt'), 'current');
    const fixture = createFixture(root);
    const workspace = new LocalWorkspaceAdapter({ workspaceRoot: root });
    const service = createService(workspace, fixture.manager);
    const manifest = await createManifestArtifact(fixture.manager, {
      id: 'snapshot.protected',
      workspaceId: 'workspace.snapshot',
      entries: [{ path: '.hypha', kind: 'directory' }],
      sourceTreeHash: hashArtifactBytes(new TextEncoder().encode('protected')),
      totalBytes: 0,
      fileCount: 0,
      createdAt: '2026-07-27T00:00:00.000Z',
      createdBy: principal.principalId,
    });
    const before = await workspace.capture();

    await expect(
      service.restoreFullSnapshot(restoreRequest(manifest.id, before.sourceTreeHash))
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PATH_DENIED' },
    });
    await expect(fs.readFile(path.join(root, 'result.txt'), 'utf8')).resolves.toBe('current');
  });

  it('rolls back an interrupted restore after the original tree was moved', async () => {
    const root = await workspaceRoot('restore-recover-backup');
    await fs.writeFile(path.join(root, 'result.txt'), 'snapshot');
    const fixture = createFixture(root);
    const workspace = new LocalWorkspaceAdapter({ workspaceRoot: root });
    const service = createService(workspace, fixture.manager);
    const snapshot = await service.createFullSnapshot(snapshotRequest());
    await fs.writeFile(path.join(root, 'result.txt'), 'current');
    const current = await workspace.capture();
    const realRename = fs.rename.bind(fs);
    let injected = false;
    const rename = vi.spyOn(fs, 'rename').mockImplementation(async (source, destination) => {
      await realRename(source, destination);
      if (!injected && path.resolve(String(source)) === path.resolve(root)) {
        injected = true;
        throw nodeFailure('EIO');
      }
    });

    try {
      await expect(
        service.restoreFullSnapshot(restoreRequest(snapshot.id, current.sourceTreeHash))
      ).rejects.toMatchObject({
        normalizedError: { code: 'EXECUTION_INTERNAL_ERROR' },
      });
    } finally {
      rename.mockRestore();
    }

    const journalPath = workspaceRestoreJournalPath(root);
    await expect(fs.access(root)).rejects.toMatchObject({ code: 'ENOENT' });
    await expect(fs.readFile(journalPath, 'utf8')).resolves.not.toContain(path.dirname(root));
    await expect(service.recoverInterruptedRestore()).resolves.toBe('rolled_back');
    await expect(fs.readFile(path.join(root, 'result.txt'), 'utf8')).resolves.toBe('current');
    await expect(fs.access(journalPath)).rejects.toMatchObject({ code: 'ENOENT' });
  });

  it('finalizes an interrupted restore after the staged tree was installed', async () => {
    const root = await workspaceRoot('restore-recover-swap');
    await fs.writeFile(path.join(root, 'result.txt'), 'snapshot');
    const fixture = createFixture(root);
    const workspace = new LocalWorkspaceAdapter({ workspaceRoot: root });
    const service = createService(workspace, fixture.manager);
    const snapshot = await service.createFullSnapshot(snapshotRequest());
    await fs.writeFile(path.join(root, 'result.txt'), 'current');
    const current = await workspace.capture();
    const realRename = fs.rename.bind(fs);
    let injected = false;
    const rename = vi.spyOn(fs, 'rename').mockImplementation(async (source, destination) => {
      await realRename(source, destination);
      if (
        !injected &&
        path.resolve(String(destination)) === path.resolve(root) &&
        path.basename(String(source)).startsWith(`.${path.basename(root)}.restore-`)
      ) {
        injected = true;
        throw nodeFailure('EIO');
      }
    });

    try {
      await expect(
        service.restoreFullSnapshot(restoreRequest(snapshot.id, current.sourceTreeHash))
      ).rejects.toMatchObject({
        normalizedError: { code: 'EXECUTION_INTERNAL_ERROR' },
      });
    } finally {
      rename.mockRestore();
    }

    await expect(service.recoverInterruptedRestore()).resolves.toBe('finalized');
    await expect(fs.readFile(path.join(root, 'result.txt'), 'utf8')).resolves.toBe('snapshot');
    await expect(fs.access(workspaceRestoreJournalPath(root))).rejects.toMatchObject({
      code: 'ENOENT',
    });
  });

  it('preserves an invalid restore journal and fails closed', async () => {
    const root = await workspaceRoot('restore-invalid-journal');
    await fs.writeFile(path.join(root, 'result.txt'), 'current');
    const fixture = createFixture(root);
    const service = createService(
      new LocalWorkspaceAdapter({ workspaceRoot: root }),
      fixture.manager
    );
    const journalPath = workspaceRestoreJournalPath(root);
    await fs.writeFile(journalPath, '{"version":1,"journalHash":"invalid"}\n');

    await expect(service.recoverInterruptedRestore()).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_CLEANUP_FAILED' },
    });
    await expect(fs.readFile(path.join(root, 'result.txt'), 'utf8')).resolves.toBe('current');
    await expect(fs.access(journalPath)).resolves.toBeUndefined();
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
    const service = createService(
      { workspaceRoot: root, capture: async () => unsafeSnapshot },
      fixture.manager
    );

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

function restoreRequest(snapshotRef: string, expectedWorkspaceSnapshotHash: string) {
  return {
    operationId: 'workspace.snapshot.restore',
    workspaceId: 'workspace.snapshot',
    principal,
    snapshotRef,
    expectedWorkspaceSnapshotHash,
    idempotencyKey: `workspace.snapshot.restore:${snapshotRef}`,
  };
}

function createService(
  workspace: ConstructorParameters<typeof LocalWorkspaceSnapshotArtifactService>[0]['workspace'],
  manager: DefaultArtifactManager,
  options: Pick<
    ConstructorParameters<typeof LocalWorkspaceSnapshotArtifactService>[0],
    'maxRestoreStagingDurationMs'
  > = {}
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
    ...options,
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
  const localWorkspaceReader = new LocalArtifactWorkspaceContentReader({
    workspaceRoot: root,
    workspaceId: 'workspace.snapshot',
    userId: ownerUserId,
    tenantId: principal.tenantId,
  });
  const workspaceReader = afterRead
    ? {
        async read(request: Parameters<typeof localWorkspaceReader.read>[0]) {
          const source = await localWorkspaceReader.read(request);
          await afterRead();
          return source;
        },
      }
    : localWorkspaceReader;
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

async function createManifestArtifact(
  manager: DefaultArtifactManager,
  manifestWithoutHash: Omit<WorkspaceSnapshotManifest, 'manifestHash'>
) {
  const manifest: WorkspaceSnapshotManifest = {
    ...manifestWithoutHash,
    manifestHash: hashWorkspaceSnapshotManifest(manifestWithoutHash),
  };
  const content = encodeWorkspaceSnapshotManifest(manifest);
  const draft = await manager.create({
    operationId: 'workspace.snapshot.fixture.create',
    principal,
    profileRef: { id: 'artifact-profile.snapshot', version: '1.0.0' },
    userId: ownerUserId,
    tenantId: principal.tenantId,
    workspaceId: 'workspace.snapshot',
    name: `${manifest.id}.json`,
    kind: 'snapshot',
    mimeType: 'application/json',
    encoding: 'utf-8',
    content,
    expectedContentHash: hashArtifactBytes(content),
    expectedSizeBytes: content.byteLength,
    provenance: {
      sourceType: 'snapshot',
      createdBy: principal.principalId,
    },
    metadata: {
      snapshotId: manifest.id,
      sourceTreeHash: manifest.sourceTreeHash,
      manifestHash: manifest.manifestHash,
    },
  });
  return manager.finalize({
    operationId: 'workspace.snapshot.fixture.finalize',
    principal,
    artifactId: draft.id,
    expectedRevision: draft.revision,
    reason: 'Workspace snapshot restore fixture',
  });
}

function nodeFailure(code: string): Error & { code: string } {
  return Object.assign(new Error(`Injected ${code}`), { code });
}

async function cleanupWorkspaceRoot(root: string): Promise<void> {
  await fs.rm(root, { recursive: true, force: true });
  const parent = path.dirname(root);
  const prefix = `.${path.basename(root)}.restore-`;
  const candidates = await fs.readdir(parent);
  await Promise.all(
    candidates
      .filter((candidate) => candidate.startsWith(prefix))
      .map((candidate) => fs.rm(path.join(parent, candidate), { recursive: true, force: true }))
  );
}
