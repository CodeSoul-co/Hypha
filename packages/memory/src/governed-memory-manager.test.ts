import { describe, expect, it, vi } from 'vitest';
import {
  DefaultMemoryActivityPort,
  GovernedMemoryManager,
  InMemoryMemoryLifecycleTaskStore,
  NativeMemoryManagementProvider,
  memoryProfileSpecExample,
  registerMemoryManagementProviderHandlers,
  type MemoryAddRequest,
  type MemoryEventType,
  type MemoryPrincipal,
} from './index';

const principal: MemoryPrincipal = {
  principalId: 'user:governed',
  type: 'user',
  userId: 'user:governed',
  permissionScopes: ['memory:read', 'memory:write'],
};
const scope = {
  userId: 'user:governed',
  workspaceId: 'workspace:governed',
  runId: 'run:governed',
};

function addRequest(operationId: string): MemoryAddRequest {
  return {
    operationId,
    principal,
    scope,
    input: 'governed memory',
    inputType: 'text',
    memoryType: 'semantic',
    source: { type: 'user_message', sourceId: 'message:governed' },
    extractionMode: 'none',
    writeMode: 'sync',
    idempotencyKey: operationId,
    profileRef: memoryProfileSpecExample,
  };
}

function activityPort(allowed: boolean) {
  let sequence = 0;
  const publish = vi.fn(async (type: MemoryEventType) => `${sequence++}:${type}`);
  const beforeExecute = vi.fn();
  const afterExecute = vi.fn();
  return {
    port: new DefaultMemoryActivityPort({
      policy: {
        authorize: async () => ({
          allowed,
          reason: allowed ? undefined : 'memory policy denied the operation',
          policyRevision: 'policy:v1',
        }),
      },
      events: { publish },
      harness: { beforeExecute, afterExecute },
    }),
    publish,
    beforeExecute,
    afterExecute,
  };
}

function manager(
  port: DefaultMemoryActivityPort,
  reconciliationStore?: InMemoryMemoryLifecycleTaskStore
) {
  return new GovernedMemoryManager({
    activities: port,
    profileRef: memoryProfileSpecExample,
    eventContext: {
      runId: scope.runId,
      workspaceId: scope.workspaceId,
    },
    reconciliationStore,
    now: () => '2026-07-20T00:00:00.000Z',
  });
}

describe('GovernedMemoryManager', () => {
  it('routes managed writes through policy, harness and activity events', async () => {
    const provider = new NativeMemoryManagementProvider({ profile: memoryProfileSpecExample });
    const governance = activityPort(true);
    registerMemoryManagementProviderHandlers(governance.port, provider);

    const result = await manager(governance.port).add(addRequest('operation:governed:add'));

    expect(result.status).toBe('committed');
    expect(governance.beforeExecute).toHaveBeenCalledOnce();
    expect(governance.afterExecute).toHaveBeenCalledOnce();
    expect(governance.publish.mock.calls.map(([type]) => type)).toEqual([
      'memory.activity.requested',
      'memory.activity.completed',
    ]);
  });

  it('does not invoke a provider when policy denies the managed operation', async () => {
    const provider = new NativeMemoryManagementProvider({ profile: memoryProfileSpecExample });
    const add = vi.spyOn(provider, 'add');
    const governance = activityPort(false);
    registerMemoryManagementProviderHandlers(governance.port, provider);

    await expect(
      manager(governance.port).add(addRequest('operation:governed:denied'))
    ).rejects.toMatchObject({
      code: 'MEMORY_POLICY_REJECTED',
    });
    expect(add).not.toHaveBeenCalled();
    expect(governance.beforeExecute).not.toHaveBeenCalled();
  });

  it('turns partial provider deletion into one deterministic reconciliation task', async () => {
    const provider = new NativeMemoryManagementProvider({ profile: memoryProfileSpecExample });
    vi.spyOn(provider, 'delete').mockResolvedValue({
      operationId: 'operation:governed:delete',
      status: 'partial',
      deletedMemoryIds: ['memory:1'],
      pendingProviderIds: ['memory.provider.remote', 'memory.provider.remote'],
    });
    const governance = activityPort(true);
    registerMemoryManagementProviderHandlers(governance.port, provider);
    const tasks = new InMemoryMemoryLifecycleTaskStore();
    const governed = manager(governance.port, tasks);
    const request = {
      operationId: 'operation:governed:delete',
      principal,
      scope,
      memoryIds: ['memory:1'],
      mode: 'compliance' as const,
      reason: 'user request',
      idempotencyKey: 'delete:memory:1',
    };

    await governed.delete(request);
    await governed.delete(request);

    const queued = await tasks.list('provider_reconciliation');
    expect(queued).toHaveLength(1);
    expect(queued[0]).toMatchObject({
      operationId: request.operationId,
      state: 'pending',
      payload: { providerId: 'memory.provider.remote', operation: 'delete' },
    });
    expect(governance.publish.mock.calls.map(([type]) => type)).toEqual([
      'memory.activity.requested',
      'memory.activity.completed',
      'memory.activity.requested',
      'memory.activity.completed',
    ]);
  });
});
