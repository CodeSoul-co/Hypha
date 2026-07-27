import type { ArtifactCreateRequest, ArtifactRecord, CommandExecutionRequest } from '@hypha/core';
import { describe, expect, it, vi } from 'vitest';
import { hashArtifactBytes } from './artifact-content-io';
import { ArtifactManagerLocalProcessOutputPort } from './local-process-output-artifacts';

describe('ArtifactManagerLocalProcessOutputPort', () => {
  it('stores bounded command output with governed scope and truncation evidence', async () => {
    const create = vi.fn(
      async (_request: ArtifactCreateRequest): Promise<ArtifactRecord> =>
        ({ id: 'artifact.execution-output.stdout' }) as ArtifactRecord
    );
    const port = new ArtifactManagerLocalProcessOutputPort({
      manager: { create },
      profileRef: { id: 'artifact-profile.execution', version: '1.0.0' },
    });
    const content = new TextEncoder().encode('bounded output');
    const contentHash = hashArtifactBytes(content);

    await expect(
      port.store({
        executionId: 'execution/output:1',
        request: commandRequest(),
        stream: 'stdout',
        content,
        contentHash,
        observedBytes: 4096,
        truncated: true,
      })
    ).resolves.toBe('artifact.execution-output.stdout');

    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        operationId: 'execution-output:execution/output:1:stdout',
        profileRef: { id: 'artifact-profile.execution', version: '1.0.0' },
        userId: 'user.local',
        workspaceId: 'workspace.local',
        runId: 'run.local',
        name: 'execution_output_1.stdout.log',
        kind: 'log',
        mimeType: 'text/plain',
        encoding: 'utf-8',
        content,
        expectedContentHash: contentHash,
        expectedSizeBytes: content.byteLength,
        provenance: {
          sourceType: 'command_generated',
          createdBy: 'principal.local',
          executionId: 'execution/output:1',
          metadata: { stream: 'stdout', observedBytes: 4096, truncated: true },
        },
        tags: ['execution-output', 'stdout'],
        idempotencyKey: 'execution-output:execution/output:1:stdout',
        metadata: {
          executionId: 'execution/output:1',
          stream: 'stdout',
          observedBytes: 4096,
          capturedBytes: content.byteLength,
          truncated: true,
        },
      })
    );
  });
});

function commandRequest(): CommandExecutionRequest {
  return {
    operationId: 'operation.local.output',
    principal: {
      principalId: 'principal.local',
      type: 'user',
      userId: 'user.local',
      permissionScopes: ['execution.run', 'artifact:write'],
    },
    userId: 'user.local',
    workspaceId: 'workspace.local',
    runId: 'run.local',
    environmentRef: { id: 'execution-environment.local', version: '1.0.0' },
    executable: 'node',
  };
}
