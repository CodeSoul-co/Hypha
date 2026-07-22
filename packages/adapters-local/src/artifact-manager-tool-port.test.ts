import { describe, expect, it, vi } from 'vitest';
import type {
  ArtifactCreateRequest,
  ArtifactProfileSpec,
  ArtifactRecord,
  ExecutionPrincipal,
} from '@hypha/core';
import { DefaultArtifactManager } from '@hypha/core';
import { hashArtifactBytes } from './artifact-content-io';
import { ArtifactManagerToolPort } from './artifact-manager-tool-port';
import { InMemoryArtifactRecordRepository } from './in-memory-artifact-record-repository';
import { InMemoryExecutionArtifactStore } from './in-memory-execution-artifact-store';

const principal: ExecutionPrincipal = {
  principalId: 'agent.tool-test',
  type: 'agent',
  agentId: 'agent.tool-test',
  userId: 'user.test',
  permissionScopes: ['artifact:read', 'artifact:write'],
};

describe('ArtifactManagerToolPort', () => {
  it('stores Tool output through Core ArtifactManager with governed context and provenance', async () => {
    const create = vi.fn(
      async (_request: ArtifactCreateRequest): Promise<ArtifactRecord> =>
        ({ id: 'artifact.tool-output.1' }) as ArtifactRecord
    );
    const port = new ArtifactManagerToolPort({
      manager: { create },
      resolveContext: async () => ({
        principal,
        profileRef: { id: 'artifact-profile.tool', version: '1.0.0' },
        userId: 'user.test',
        tenantId: 'tenant.test',
        workspaceId: 'workspace.test',
        sessionId: 'session.test',
        runId: 'run.test',
        agentId: 'agent.tool-test',
      }),
    });

    await expect(
      port.store({
        invocationId: 'invocation/1',
        toolId: 'tool.report',
        value: { result: 'ok' },
        metadata: { attempt: 1, toolId: 'untrusted-override' },
      })
    ).resolves.toBe('artifact.tool-output.1');

    const request = create.mock.calls[0]![0];
    const expectedContent = new TextEncoder().encode('{"result":"ok"}');
    expect(request).toMatchObject({
      operationId: 'tool-output:tool.report:invocation/1',
      principal,
      profileRef: { id: 'artifact-profile.tool', version: '1.0.0' },
      userId: 'user.test',
      tenantId: 'tenant.test',
      workspaceId: 'workspace.test',
      sessionId: 'session.test',
      runId: 'run.test',
      agentId: 'agent.tool-test',
      name: 'tool.report-invocation_1.tool-output',
      kind: 'tool_output',
      mimeType: 'application/json',
      expectedContentHash: hashArtifactBytes(expectedContent),
      expectedSizeBytes: expectedContent.byteLength,
      provenance: {
        sourceType: 'tool_generated',
        createdBy: principal.principalId,
        toolInvocationId: 'invocation/1',
        metadata: { toolId: 'tool.report' },
      },
      idempotencyKey: 'tool-output:tool.report:invocation/1',
      metadata: { attempt: 1, invocationId: 'invocation/1', toolId: 'tool.report' },
    });
    expect(request.content).toEqual(expectedContent);
  });

  it('preserves binary bytes and an explicitly declared MIME type', async () => {
    const create = vi.fn(
      async (_request: ArtifactCreateRequest): Promise<ArtifactRecord> =>
        ({ id: 'artifact.binary.1' }) as ArtifactRecord
    );
    const port = new ArtifactManagerToolPort({
      manager: { create },
      resolveContext: () => ({
        principal,
        profileRef: { id: 'artifact-profile.tool' },
        userId: 'user.test',
        workspaceId: 'workspace.test',
      }),
    });
    const bytes = Uint8Array.from([1, 2, 3]);

    await port.store({
      invocationId: 'invocation.binary',
      toolId: 'tool.binary',
      value: bytes,
      mimeType: 'application/x-example',
    });

    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        content: bytes,
        mimeType: 'application/x-example',
        expectedContentHash: hashArtifactBytes(bytes),
        expectedSizeBytes: 3,
      })
    );
    expect(create.mock.calls[0]![0].content).not.toBe(bytes);
  });

  it('does not persist bytes when governed Tool context cannot be resolved', async () => {
    const create = vi.fn(
      async (_request: ArtifactCreateRequest): Promise<ArtifactRecord> =>
        ({ id: 'unexpected' }) as ArtifactRecord
    );
    const port = new ArtifactManagerToolPort({
      manager: { create },
      resolveContext: async () => {
        throw new Error('Tool invocation context is unavailable');
      },
    });

    await expect(
      port.store({ invocationId: 'missing', toolId: 'tool.missing', value: 'result' })
    ).rejects.toThrow('Tool invocation context is unavailable');
    expect(create).not.toHaveBeenCalled();
  });

  it('persists and idempotently reads Tool output through the real Core manager', async () => {
    const store = new InMemoryExecutionArtifactStore({ id: 'artifact-store.tool-port' });
    const repository = new InMemoryArtifactRecordRepository();
    const profile: ArtifactProfileSpec = {
      id: 'artifact-profile.tool-port',
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
      allowedMimeTypes: ['text/plain'],
      maxArtifactBytes: 1024,
    };
    let nextId = 0;
    const manager = new DefaultArtifactManager({
      profiles: [profile],
      stores: [store],
      repository,
      idGenerator: () => `tool-artifact-${++nextId}`,
    });
    const port = new ArtifactManagerToolPort({
      manager,
      resolveContext: () => ({
        principal,
        profileRef: { id: profile.id, version: profile.version },
        userId: 'user.test',
        workspaceId: 'workspace.test',
      }),
    });
    const request = {
      invocationId: 'invocation.real',
      toolId: 'tool.real',
      value: 'governed output',
    };

    const firstRef = await port.store(request);
    await expect(port.store(request)).resolves.toBe(firstRef);
    const stored = await manager.get({ principal, artifactId: firstRef });
    const content = await manager.read({ principal, artifactId: firstRef });

    expect(stored).toMatchObject({
      id: firstRef,
      kind: 'tool_output',
      provenance: {
        sourceType: 'tool_generated',
        toolInvocationId: 'invocation.real',
      },
    });
    await expect(readText(content.content.stream)).resolves.toBe('governed output');
    await expect(repository.list()).resolves.toHaveLength(1);
  });
});

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
