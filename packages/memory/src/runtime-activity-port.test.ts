import { describe, expect, it, vi } from 'vitest';
import type { RuntimeActivityRequest } from '@hypha/core';
import {
  MemoryManager,
  type MemoryProvider,
  type MemoryRecord,
  type MemoryRuntimeActivityInput,
} from './index';
import { MemoryRuntimeActivityPort } from './runtime-activity-port';

const record: MemoryRecord = {
  id: 'memory.plan',
  type: 'working',
  value: { title: 'Runtime plan' },
  provenance: { sourceEventId: 'event.observation' },
  createdAt: '2026-07-17T08:00:00.000Z',
};

describe('MemoryRuntimeActivityPort', () => {
  it('delegates a write with Runtime scope and idempotency and returns artifact evidence', async () => {
    const provider = memoryProvider();
    const manager = new MemoryManager(provider);
    const port = new MemoryRuntimeActivityPort({
      manager,
      eventIds: () => ['event.memory.committed'],
    });
    const request = activityRequest({
      operation: 'write',
      scope: { userId: 'user.example', workspaceId: 'workspace.example' },
      record,
      policy: { allowLongTerm: false },
    });

    await expect(port.execute(request)).resolves.toMatchObject({
      activityId: request.activityId,
      status: 'completed',
      artifactRefs: ['artifact.memory-plan'],
      eventIds: ['event.memory.committed'],
      output: { operation: 'write', result: { recordId: record.id } },
    });
    expect(provider.write).toHaveBeenCalledWith(
      {
        runId: request.runId,
        sessionId: request.sessionId,
        userId: 'user.example',
        workspaceId: 'workspace.example',
      },
      record,
      { allowLongTerm: false, idempotencyKey: request.idempotencyKey }
    );
  });

  it('does not repeat Memory operations when no durable reconciler is configured', async () => {
    const provider = memoryProvider();
    const cancel = vi.fn(async () => undefined);
    const port = new MemoryRuntimeActivityPort({
      manager: new MemoryManager(provider),
      cancel,
    });

    await expect(port.reconcile('activity.memory.unknown')).resolves.toEqual({
      activityId: 'activity.memory.unknown',
      status: 'unknown',
      eventIds: [],
    });
    await port.cancel('activity.memory.unknown', 'run_cancelled');

    expect(provider.read).not.toHaveBeenCalled();
    expect(provider.write).not.toHaveBeenCalled();
    expect(cancel).toHaveBeenCalledWith('activity.memory.unknown', 'run_cancelled');
  });

  it('dispatches read operations through MemoryManager', async () => {
    const provider = memoryProvider();
    vi.mocked(provider.read).mockResolvedValue([record]);
    const port = new MemoryRuntimeActivityPort({ manager: new MemoryManager(provider) });
    const request = activityRequest({ operation: 'read', query: { ids: [record.id] } });

    await expect(port.execute(request)).resolves.toMatchObject({
      status: 'completed',
      output: { operation: 'read', records: [record] },
    });
  });
});

function activityRequest(
  input: MemoryRuntimeActivityInput
): RuntimeActivityRequest<MemoryRuntimeActivityInput> {
  return {
    activityId: 'activity.memory.plan',
    activityType: 'memory',
    runId: 'run.example',
    sessionId: 'session.example',
    stateAttemptId: 'state-attempt.memory.1',
    operationId: 'operation.memory.plan',
    idempotencyKey: 'idempotency.memory.plan',
    fencingToken: 2,
    input,
  };
}

function memoryProvider(): MemoryProvider {
  return {
    read: vi.fn(async () => []),
    search: vi.fn(async () => []),
    write: vi.fn(async (_scope, value) => ({
      recordId: value.id,
      artifactRef: { id: 'artifact.memory-plan', path: 'memory/plan.json' },
    })),
    update: vi.fn(async () => undefined),
    invalidate: vi.fn(async () => undefined),
    summarize: vi.fn(async (scope) => ({ scope, recordCount: 0, types: {} })),
    audit: vi.fn(async (scope) => ({ scope, recordsChecked: 0, missingProvenance: [] })),
  };
}
