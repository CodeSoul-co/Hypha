import { describe, expect, it, vi } from 'vitest';
import type { ArtifactManager, ExecutionDispatchRequest, ExecutionPort } from '@hypha/core';
import type { ToolCallContext, WorkspaceRuntimePort } from '@hypha/tools';
import {
  ArtifactManagerCommonToolPort,
  GovernedCommandCommonToolPort,
  WorkspaceCommonToolPort,
} from './common-tool-port-bindings';

const context: ToolCallContext = {
  runId: 'run-a',
  stepId: 'step-a',
  invocationId: 'inv-a',
  operationId: 'op-a',
  workspaceId: 'workspace-a',
  userId: 'user-a',
  principal: {
    id: 'user-a',
    principalId: 'user-a',
    type: 'user',
    permissionScopes: ['execution.command', 'artifact.read', 'artifact.write'],
  },
};

function scopedDispatch(): ExecutionDispatchRequest {
  return {
    activity: {
      activityId: 'activity-a',
      operationId: 'op-a',
      runId: 'run-a',
      stateAttemptId: 'attempt-a',
      workspaceId: 'workspace-a',
      request: {} as never,
      fencingToken: 1,
    },
    binding: {} as never,
    riskAssessment: {} as never,
    authorization: {
      id: 'authorization-a',
      invocationId: 'inv-a',
      activityId: 'activity-a',
      runId: 'run-a',
      toolId: 'common.command',
      principalId: 'user-a',
      inputHash: 'hash-a',
      policyDecisionRef: 'policy-a',
      riskAssessmentId: 'risk-a',
      authorizedAt: '2026-07-22T00:00:00.000Z',
    },
  };
}

describe('execution-owned Common Tool provider bindings', () => {
  it('routes command execution only through a scope-matched ExecutionPort', async () => {
    const execute = vi.fn(async () => ({ activityId: 'activity-a', status: 'completed', eventIds: [] }));
    const port = new GovernedCommandCommonToolPort({ execute } as ExecutionPort, scopedDispatch);
    await expect(port.execute({ operation: 'execute', input: {}, context })).resolves.toMatchObject({
      status: 'completed',
    });
    expect(execute).toHaveBeenCalledOnce();

    await expect(port.execute({ operation: 'cancel', input: {}, context })).rejects.toMatchObject({
      code: 'EXECUTION_POLICY_DENIED',
    });
    const wrong = scopedDispatch();
    wrong.authorization.principalId = 'another-user';
    const mismatched = new GovernedCommandCommonToolPort({ execute } as ExecutionPort, () => wrong);
    await expect(
      mismatched.execute({ operation: 'execute', input: {}, context })
    ).rejects.toMatchObject({ code: 'EXECUTION_POLICY_DENIED' });
    expect(execute).toHaveBeenCalledOnce();
  });

  it('never exposes WorkspaceRuntime command execution through the file port', async () => {
    const execute = vi.fn(async (request) => request);
    const workspace = new WorkspaceCommonToolPort({
      execute,
      health: async () => ({ status: 'healthy', checkedAt: '2026-07-22T00:00:00.000Z' }),
    } as WorkspaceRuntimePort);
    await workspace.execute({ operation: 'read', input: { path: 'docs/a.txt' }, context });
    expect(execute).toHaveBeenCalledWith(
      expect.objectContaining({ operation: 'read', path: 'docs/a.txt' })
    );
    await expect(
      workspace.execute({ operation: 'execute', input: { path: 'tool.exe' }, context })
    ).rejects.toMatchObject({ code: 'EXECUTION_POLICY_DENIED' });
  });

  it('binds ArtifactManager calls to the caller principal and owned workspace', async () => {
    const create = vi.fn(async (request) => ({ id: 'artifact-a', ...request }));
    const read = vi.fn(async () => ({
      record: { id: 'artifact-a' },
      content: {
        stream: (async function* () {
          yield Uint8Array.from([104, 105]);
        })(),
        contentHash: 'hash-a',
        sizeBytes: 2,
      },
    }));
    const manager = { create, read } as unknown as ArtifactManager;
    const port = new ArtifactManagerCommonToolPort(manager, {
      profileRef: { id: 'artifact.local', version: '1.0.0' },
    });
    await port.execute({
      operation: 'put',
      input: { artifactRef: 'logical-a', contentBase64: 'aGk=', mimeType: 'text/plain' },
      context,
    });
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        workspaceId: 'workspace-a',
        principal: expect.objectContaining({ principalId: 'user-a' }),
      })
    );
    await expect(
      port.execute({ operation: 'get', input: { artifactRef: 'artifact-a' }, context })
    ).resolves.toMatchObject({ contentBase64: 'aGk=', contentHash: 'hash-a' });
  });
});
