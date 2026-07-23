import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import type { ArtifactProfileSpec, ExecutionPrincipal } from '@hypha/core';
import { DefaultArtifactManager } from '@hypha/core';
import { hashArtifactBytes } from './artifact-content-io';
import { InMemoryArtifactRecordRepository } from './in-memory-artifact-record-repository';
import { InMemoryExecutionArtifactStore } from './in-memory-execution-artifact-store';
import {
  LegacyToolArtifactImportError,
  LegacyToolArtifactImporter,
  legacyArtifactReference,
} from './legacy-tool-artifact-importer';

const principal: ExecutionPrincipal = {
  principalId: 'agent.legacy-import',
  type: 'agent',
  agentId: 'agent.legacy-import',
  userId: 'user.legacy-import',
  permissionScopes: ['artifact:read', 'artifact:write'],
};

describe('LegacyToolArtifactImporter', () => {
  it('imports an explicitly identified legacy file with hash, provenance, and idempotency', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-artifact-import-'));
    const relativePath = 'tool-results/tool.report/invocation-1.json';
    const content = '{"result":"legacy"}';
    await writeLegacyFile(root, relativePath, content);
    const fixture = createFixture(root);
    const expectedLegacyArtifactId = legacyArtifactReference(
      relativePath,
      Buffer.byteLength(content)
    );
    const request = {
      relativePath,
      expectedLegacyArtifactId,
      context: fixture.context,
      toolId: 'tool.report',
      invocationId: 'invocation-1',
      metadata: { migrationBatch: 'batch-1' },
    };

    const first = await fixture.importer.import(request);
    await expect(fixture.importer.import(request)).resolves.toEqual(first);
    const record = await fixture.manager.get({ principal, artifactId: first.artifactId });
    const read = await fixture.manager.read({ principal, artifactId: first.artifactId });

    expect(first).toMatchObject({ legacyArtifactId: expectedLegacyArtifactId, revision: 0 });
    expect(record).toMatchObject({
      id: first.artifactId,
      versionId: first.versionId,
      revision: first.revision,
      contentHash: first.contentHash,
      kind: 'tool_output',
      mimeType: 'application/json',
      provenance: {
        sourceType: 'imported',
        toolInvocationId: 'invocation-1',
        transformation: 'legacy_tool_artifact_import',
        metadata: {
          legacyArtifactId: expectedLegacyArtifactId,
          legacyRelativePath: relativePath,
          toolId: 'tool.report',
        },
      },
      metadata: {
        migrationBatch: 'batch-1',
        legacyArtifactId: expectedLegacyArtifactId,
        legacyRelativePath: relativePath,
      },
    });
    await expect(readText(read.content.stream)).resolves.toBe(content);
    await expect(fixture.repository.list()).resolves.toHaveLength(1);
    await expect(fs.readFile(path.join(root, ...relativePath.split('/')), 'utf8')).resolves.toBe(
      content
    );
  });

  it('rejects path escape, unexpected layout, and mismatched legacy identity before import', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-artifact-invalid-'));
    const relativePath = 'tool-results/tool.report/invocation-1.txt';
    await writeLegacyFile(root, relativePath, 'legacy');
    const fixture = createFixture(root);

    for (const invalidPath of [
      '../tool-results/tool.report/invocation-1.txt',
      path.resolve(root, ...relativePath.split('/')),
      'other/tool.report/invocation-1.txt',
      'tool-results/tool.report/nested/invocation-1.txt',
      'tool-results/tool.report/invocation-1.exe',
    ]) {
      await expect(
        fixture.importer.import({
          relativePath: invalidPath,
          context: fixture.context,
          toolId: 'tool.report',
          invocationId: 'invocation-1',
        })
      ).rejects.toBeInstanceOf(LegacyToolArtifactImportError);
    }
    await expect(
      fixture.importer.import({
        relativePath,
        expectedLegacyArtifactId: `artifact:${'0'.repeat(64)}`,
        context: fixture.context,
        toolId: 'tool.report',
        invocationId: 'invocation-1',
      })
    ).rejects.toMatchObject({ code: 'LEGACY_ARTIFACT_ID_MISMATCH' });
    await expect(fixture.repository.list()).resolves.toHaveLength(0);
  });

  it('fails closed for oversized files and symbolic-link path components', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-artifact-bounds-'));
    const largePath = 'tool-results/tool.large/invocation-large.txt';
    await writeLegacyFile(root, largePath, 'too large');
    const fixture = createFixture(root, 2);

    await expect(
      fixture.importer.import({
        relativePath: largePath,
        context: fixture.context,
        toolId: 'tool.large',
        invocationId: 'invocation-large',
      })
    ).rejects.toMatchObject({ code: 'LEGACY_ARTIFACT_TOO_LARGE' });

    const outside = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-artifact-outside-'));
    await fs.writeFile(path.join(outside, 'invocation-link.txt'), 'outside');
    const linkedToolDirectory = path.join(root, 'tool-results', 'tool.link');
    await fs.symlink(
      outside,
      linkedToolDirectory,
      process.platform === 'win32' ? 'junction' : 'dir'
    );
    await expect(
      fixture.importer.import({
        relativePath: 'tool-results/tool.link/invocation-link.txt',
        context: fixture.context,
        toolId: 'tool.link',
        invocationId: 'invocation-link',
      })
    ).rejects.toMatchObject({ code: 'LEGACY_ARTIFACT_INVALID_PATH' });
    await expect(fixture.repository.list()).resolves.toHaveLength(0);
  });

  it('rejects hard-linked legacy files before importing external content', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-artifact-hardlink-'));
    const relativePath = 'tool-results/tool.link/invocation-link.txt';
    const outsideRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), 'hypha-legacy-artifact-hardlink-outside-')
    );
    const outside = path.join(outsideRoot, 'outside.txt');
    const linked = path.join(root, ...relativePath.split('/'));
    await fs.writeFile(outside, 'outside content');
    await fs.mkdir(path.dirname(linked), { recursive: true });
    await fs.link(outside, linked);
    const fixture = createFixture(root);

    await expect(
      fixture.importer.import({
        relativePath,
        context: fixture.context,
        toolId: 'tool.link',
        invocationId: 'invocation-link',
      })
    ).rejects.toMatchObject({ code: 'LEGACY_ARTIFACT_INVALID_PATH' });
    await expect(fixture.repository.list()).resolves.toHaveLength(0);
    await expect(fs.readFile(outside, 'utf8')).resolves.toBe('outside content');
  });

  it('rejects inventory size or content evidence that no longer matches the source', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-artifact-evidence-'));
    const relativePath = 'tool-results/tool.report/invocation-evidence.txt';
    const original = 'before';
    await writeLegacyFile(root, relativePath, original);
    const fixture = createFixture(root);
    const baseRequest = {
      relativePath,
      context: fixture.context,
      toolId: 'tool.report',
      invocationId: 'invocation-evidence',
    };

    await expect(
      fixture.importer.import({ ...baseRequest, expectedSizeBytes: original.length + 1 })
    ).rejects.toMatchObject({ code: 'LEGACY_ARTIFACT_SIZE_MISMATCH' });

    await writeLegacyFile(root, relativePath, 'after!');
    await expect(
      fixture.importer.import({
        ...baseRequest,
        expectedLegacyArtifactId: legacyArtifactReference(relativePath, original.length),
        expectedSizeBytes: original.length,
        expectedContentHash: hashArtifactBytes(new TextEncoder().encode(original)),
      })
    ).rejects.toMatchObject({ code: 'LEGACY_ARTIFACT_CONTENT_MISMATCH' });
    await expect(fixture.repository.list()).resolves.toHaveLength(0);
  });
});

function createFixture(root: string, maxArtifactBytes = 1024) {
  const store = new InMemoryExecutionArtifactStore({ id: 'artifact-store.legacy-import' });
  const repository = new InMemoryArtifactRecordRepository();
  const profile: ArtifactProfileSpec = {
    id: 'artifact-profile.legacy-import',
    version: '1.0.0',
    storeRef: { id: store.id },
    contentAddressing: { hashAlgorithm: 'sha256', verifyOnRead: true, deduplicate: true },
    versioning: { strategy: 'append_only', retainPreviousVersions: true },
    access: {
      defaultVisibility: 'workspace',
      requiredReadScopes: ['artifact:read'],
      requiredWriteScopes: ['artifact:write'],
    },
    retention: { garbageCollectUnreferenced: true },
    validation: { checksumRequired: true },
    allowedKinds: ['tool_output'],
    allowedMimeTypes: ['application/json', 'text/plain'],
    maxArtifactBytes: 1024,
  };
  let nextId = 0;
  const manager = new DefaultArtifactManager({
    profiles: [profile],
    stores: [store],
    repository,
    idGenerator: () => `legacy-import-${++nextId}`,
  });
  const context = {
    principal,
    profileRef: { id: profile.id, version: profile.version },
    userId: 'user.legacy-import',
    workspaceId: 'workspace.legacy-import',
  };
  return {
    context,
    importer: new LegacyToolArtifactImporter({
      legacyRootPath: root,
      manager,
      maxArtifactBytes,
    }),
    manager,
    repository,
  };
}

async function writeLegacyFile(root: string, relativePath: string, content: string): Promise<void> {
  const filename = path.join(root, ...relativePath.split('/'));
  await fs.mkdir(path.dirname(filename), { recursive: true });
  await fs.writeFile(filename, content);
}

async function readText(stream: AsyncIterable<Uint8Array>): Promise<string> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) chunks.push(chunk);
  const size = chunks.reduce((total, chunk) => total + chunk.byteLength, 0);
  const content = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    content.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(content);
}
