import { describe, expect, it, vi } from 'vitest';
import type { CommandExecutionResult } from '../../contracts/command-execution';
import type { ExecutionRecord, ExecutionStore } from '../../contracts/execution-store';
import type { RuntimeActivityRequest } from '../../contracts/runtime';
import type { SandboxProvider } from '../../contracts/sandbox-provider';
import {
  ExecutionRuntimeActivityPort,
  type ExecutionRuntimeActivityInput,
} from './execution-activity-port';

const request: RuntimeActivityRequest<ExecutionRuntimeActivityInput> = {
  activityId: 'activity.execution.build',
  activityType: 'execution',
  runId: 'run.example',
  sessionId: 'session.example',
  stateAttemptId: 'state-attempt.build.1',
  operationId: 'operation.execution.build',
  idempotencyKey: 'idempotency.execution.build',
  fencingToken: 7,
  correlationId: 'correlation.example',
  causationId: 'event.state.entered',
  input: {
    request: {
      principal: {
        principalId: 'agent.example',
        type: 'agent',
        permissionScopes: ['execution.run'],
      },
      userId: 'user.example',
      workspaceId: 'workspace.example',
      environmentRef: { id: 'environment.node', revision: 'revision.1' },
      executable: 'npm.cmd',
      args: ['test'],
    },
  },
};

describe('ExecutionRuntimeActivityPort', () => {
  it('delegates execution with Runtime identity and maps artifacts into the Activity result', async () => {
    const execute = vi.fn(async () => executionResult('completed'));
    const port = new ExecutionRuntimeActivityPort({
      provider: provider({ execute }),
      store: store(null),
      eventIds: () => ['event.execution.completed'],
    });

    await expect(port.execute(request)).resolves.toMatchObject({
      activityId: request.activityId,
      status: 'completed',
      artifactRefs: ['artifact.build', 'artifact.stdout'],
      eventIds: ['event.execution.completed'],
    });
    expect(execute).toHaveBeenCalledWith(
      expect.objectContaining({
        executionId: request.activityId,
        operationId: request.operationId,
        runId: request.runId,
        sessionId: request.sessionId,
        stepId: request.stateAttemptId,
        idempotencyKey: request.idempotencyKey,
        metadata: { runtimeFencingToken: request.fencingToken },
      })
    );
  });

  it('uses ExecutionStore as reconciliation authority without executing again', async () => {
    const execute = vi.fn();
    const get = vi
      .fn<ExecutionStore['get']>()
      .mockResolvedValueOnce(executionRecord('running'))
      .mockResolvedValueOnce(executionRecord('completed', executionResult('completed')))
      .mockResolvedValueOnce(null);
    const port = new ExecutionRuntimeActivityPort({
      provider: provider({ execute }),
      store: storeWithGet(get),
    });

    await expect(port.reconcile(request.activityId)).resolves.toMatchObject({ status: 'waiting' });
    await expect(port.reconcile(request.activityId)).resolves.toMatchObject({
      status: 'completed',
      output: { executionId: request.activityId },
    });
    await expect(port.reconcile(request.activityId)).resolves.toEqual({
      activityId: request.activityId,
      status: 'unknown',
      eventIds: [],
    });
    expect(execute).not.toHaveBeenCalled();
  });

  it('delegates cancellation with the persisted principal and revision', async () => {
    const cancel = vi.fn(async () => undefined);
    const port = new ExecutionRuntimeActivityPort({
      provider: provider({ cancel }),
      store: store(executionRecord('running')),
    });

    await port.cancel(request.activityId, 'run_cancelled');

    expect(cancel).toHaveBeenCalledWith(
      expect.objectContaining({
        executionId: request.activityId,
        expectedRevision: 3,
        reason: 'run_cancelled',
        principal: request.input.request.principal,
      })
    );
  });
});

function executionResult(status: CommandExecutionResult['status']): CommandExecutionResult {
  return {
    executionId: request.activityId,
    revision: 3,
    sandboxId: 'sandbox.example',
    status,
    exitCode: status === 'completed' ? 0 : null,
    stdoutArtifactRef: 'artifact.stdout',
    changedFiles: [],
    generatedArtifactRefs: ['artifact.build'],
    startedAt: '2026-07-17T09:00:00.000Z',
    completedAt: status === 'running' ? undefined : '2026-07-17T09:00:01.000Z',
  };
}

function executionRecord(
  status: ExecutionRecord['status'],
  result?: CommandExecutionResult
): ExecutionRecord {
  return {
    id: request.activityId,
    revision: 3,
    request: {
      ...request.input.request,
      executionId: request.activityId,
      operationId: request.operationId,
      runId: request.runId,
    },
    status,
    providerId: 'provider.fixture',
    attempt: 1,
    result,
    createdAt: '2026-07-17T09:00:00.000Z',
    updatedAt: '2026-07-17T09:00:01.000Z',
  };
}

function provider(overrides: Partial<SandboxProvider> = {}): SandboxProvider {
  return {
    id: 'provider.fixture',
    execute: vi.fn(async () => executionResult('completed')),
    cancel: vi.fn(async () => undefined),
    ...overrides,
  } as SandboxProvider;
}

function store(record: ExecutionRecord | null): ExecutionStore {
  return storeWithGet(vi.fn(async () => record));
}

function storeWithGet(get: ExecutionStore['get']): ExecutionStore {
  return { get } as ExecutionStore;
}
