import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  DefaultArtifactManager,
  type ArtifactProfileSpec,
  type ExecutionPrincipal,
} from '@hypha/core';
import { afterEach, describe, expect, it } from 'vitest';
import { hashArtifactBytes, readArtifactStream } from './artifact-content-io';
import { InMemoryArtifactRecordRepository } from './in-memory-artifact-record-repository';
import { LocalArtifactWorkspaceContentReader } from './local-artifact-workspace-content-reader';
import { LocalFilesystemExecutionArtifactStore } from './local-filesystem-execution-artifact-store';

const principal: ExecutionPrincipal = {
  principalId: 'user.streaming',
  type: 'user',
  tenantId: 'tenant.streaming',
  userId: 'user.streaming',
  permissionScopes: ['artifact:read', 'artifact:write'],
};

describe('LocalArtifactWorkspaceContentReader', () => {
  const roots: string[] = [];

  afterEach(async () => {
    await Promise.all(roots.splice(0).map((root) => fs.rm(root, { recursive: true, force: true })));
  });

  it('streams a large Workspace output through ArtifactManager and the local Store', async () => {
    const root = await createRoot('manager');
    const workspaceRoot = path.join(root, 'workspace');
    const artifactRoot = path.join(root, 'artifacts');
    const filename = path.join(workspaceRoot, 'outputs', 'large.bin');
    const bytes = Uint8Array.from({ length: 512 * 1024 }, (_unused, index) => index % 251);
    await fs.mkdir(path.dirname(filename), { recursive: true });
    await fs.writeFile(filename, bytes);
    const reader = createReader(workspaceRoot, 32 * 1024);
    const source = await reader.read(workspaceRequest('outputs/large.bin'));
    expect(source.content).not.toBeInstanceOf(Uint8Array);
    await expect(chunkSizes(source.content)).resolves.toSatisfy((sizes: number[]) =>
      sizes.every((size) => size > 0 && size <= 32 * 1024)
    );

    const store = new LocalFilesystemExecutionArtifactStore({
      id: 'artifact-store.streaming',
      rootPath: artifactRoot,
      maxObjectBytes: 3 * 1024 * 1024,
    });
    const profile = artifactProfile(store.id);
    let id = 0;
    const manager = new DefaultArtifactManager({
      profiles: [profile],
      stores: [store],
      repository: new InMemoryArtifactRecordRepository(),
      workspaceReader: reader,
      idGenerator: () => String(++id),
    });
    const contentHash = hashArtifactBytes(bytes);

    const record = await manager.createFromWorkspace({
      operationId: 'operation.streaming',
      principal,
      profileRef: { id: profile.id, version: profile.version },
      userId: principal.userId!,
      tenantId: principal.tenantId,
      workspaceId: 'workspace.streaming',
      relativePath: 'outputs/large.bin',
      kind: 'dataset',
      mimeType: 'application/octet-stream',
      expectedContentHash: contentHash,
      expectedSizeBytes: bytes.byteLength,
      provenance: { sourceType: 'command_generated', createdBy: principal.principalId },
    });

    expect(record).toMatchObject({ contentHash, sizeBytes: bytes.byteLength });
    const stored = await manager.read({
      principal,
      artifactId: record.id,
      expectedContentHash: contentHash,
    });
    await expect(readArtifactStream(stored.content.stream)).resolves.toEqual(bytes);
    await store.close();
  });

  it('rejects Workspace scope mismatches before opening the source', async () => {
    const root = await createRoot('scope');
    await fs.writeFile(path.join(root, 'output.txt'), 'output');
    const reader = createReader(root);

    await expect(
      reader.read({ ...workspaceRequest('output.txt'), workspaceId: 'workspace.other' })
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PERMISSION_DENIED' },
    });
    await expect(
      reader.read({
        ...workspaceRequest('output.txt'),
        principal: { ...principal, tenantId: 'tenant.other' },
      })
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PERMISSION_DENIED' },
    });
  });

  it('rejects traversal and control-plane paths', async () => {
    const root = await createRoot('paths');
    const reader = createReader(root);

    await expect(reader.read(workspaceRequest('../outside.txt'))).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PATH_ESCAPE' },
    });
    await expect(reader.read(workspaceRequest('.git/config'))).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PATH_ESCAPE' },
    });
  });

  it('rejects hardlink aliases without weakening regular-file identity', async () => {
    const root = await createRoot('hardlink');
    const source = path.join(root, 'output.bin');
    await fs.writeFile(source, Uint8Array.from([1, 2, 3]));
    await fs.link(source, path.join(root, 'alias.bin'));

    await expect(createReader(root).read(workspaceRequest('output.bin'))).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PATH_DENIED' },
    });
  });

  it('rejects paths that traverse a symlinked directory', async () => {
    const root = await createRoot('symlink');
    const outside = await createRoot('symlink-outside');
    await fs.writeFile(path.join(outside, 'secret.bin'), Uint8Array.from([4, 5, 6]));
    await fs.symlink(
      outside,
      path.join(root, 'linked'),
      process.platform === 'win32' ? 'junction' : 'dir'
    );

    await expect(
      createReader(root).read(workspaceRequest('linked/secret.bin'))
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PATH_ESCAPE' },
    });
  });

  it('enforces the byte limit before streaming', async () => {
    const root = await createRoot('limit');
    await fs.writeFile(path.join(root, 'output.bin'), Uint8Array.from([1, 2, 3]));

    await expect(
      createReader(root).read({ ...workspaceRequest('output.bin'), maxBytes: 2 })
    ).rejects.toMatchObject({
      normalizedError: {
        code: 'EXECUTION_RESOURCE_EXCEEDED',
        details: { maxBytes: 2, actualSizeBytes: 3 },
      },
    });
  });

  it('fails closed when the source changes after streaming starts', async () => {
    const root = await createRoot('mutation');
    const filename = path.join(root, 'output.bin');
    await fs.writeFile(
      filename,
      Uint8Array.from({ length: 128 * 1024 }, () => 7)
    );
    const source = await createReader(root, 16 * 1024).read(workspaceRequest('output.bin'));
    const iterator = requireAsyncIterable(source.content)[Symbol.asyncIterator]();

    await expect(iterator.next()).resolves.toMatchObject({ done: false });
    await fs.appendFile(filename, Uint8Array.from([8]));

    await expect(drain(iterator)).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_REVISION_CONFLICT' },
    });
  });

  it('closes the file handle when a consumer cancels the stream', async () => {
    const root = await createRoot('cancel');
    const filename = path.join(root, 'output.bin');
    await fs.writeFile(
      filename,
      Uint8Array.from({ length: 128 * 1024 }, () => 9)
    );
    const source = await createReader(root, 16 * 1024).read(workspaceRequest('output.bin'));
    const iterator = requireAsyncIterable(source.content)[Symbol.asyncIterator]();

    await iterator.next();
    await iterator.return?.();

    await expect(fs.rm(filename)).resolves.toBeUndefined();
  });

  async function createRoot(name: string): Promise<string> {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), `hypha-artifact-stream-${name}-`));
    roots.push(root);
    return root;
  }
});

function createReader(workspaceRoot: string, chunkSizeBytes = 64 * 1024) {
  return new LocalArtifactWorkspaceContentReader({
    workspaceRoot,
    workspaceId: 'workspace.streaming',
    userId: principal.userId!,
    tenantId: principal.tenantId,
    chunkSizeBytes,
  });
}

function workspaceRequest(relativePath: string) {
  return {
    principal,
    workspaceId: 'workspace.streaming',
    relativePath,
    maxBytes: 3 * 1024 * 1024,
  };
}

function artifactProfile(storeId: string): ArtifactProfileSpec {
  return {
    id: 'artifact-profile.streaming',
    version: '1.0.0',
    storeRef: { id: storeId },
    contentAddressing: { hashAlgorithm: 'sha256', verifyOnRead: true, deduplicate: true },
    versioning: { strategy: 'append_only', retainPreviousVersions: true },
    access: {
      defaultVisibility: 'workspace',
      allowedPrincipalTypes: ['user'],
      requiredReadScopes: ['artifact:read'],
      requiredWriteScopes: ['artifact:write'],
      allowRangeRead: true,
    },
    retention: {
      retainFinal: true,
      legalHoldSupported: true,
      garbageCollectUnreferenced: true,
    },
    validation: { checksumRequired: true },
    allowedKinds: ['dataset'],
    allowedMimeTypes: ['application/octet-stream'],
    maxArtifactBytes: 3 * 1024 * 1024,
  };
}

async function chunkSizes(source: AsyncIterable<Uint8Array> | Uint8Array): Promise<number[]> {
  if (source instanceof Uint8Array) return [source.byteLength];
  const sizes: number[] = [];
  for await (const chunk of source) sizes.push(chunk.byteLength);
  return sizes;
}

function requireAsyncIterable(
  source: AsyncIterable<Uint8Array> | Uint8Array
): AsyncIterable<Uint8Array> {
  if (source instanceof Uint8Array) throw new TypeError('Expected streamed Artifact content.');
  return source;
}

async function drain(iterator: AsyncIterator<Uint8Array>): Promise<void> {
  while (!(await iterator.next()).done) {
    // Consume the stream so its final identity check runs.
  }
}
