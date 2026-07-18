import { describe, expect, it } from 'vitest';
import { LocalActiveExecutionRegistry } from './local-active-execution-registry';

describe('LocalActiveExecutionRegistry', () => {
  it('propagates cancellation and waits for process completion evidence', async () => {
    const registry = new LocalActiveExecutionRegistry();
    const handle = registry.begin('execution.local', 'sandbox.local');
    let settled = false;
    const cancellation = registry
      .cancel({
        operationId: 'operation.cancel',
        executionId: 'execution.local',
        principal: { principalId: 'user', type: 'user', permissionScopes: [] },
        expectedRevision: 2,
      })
      .then(() => {
        settled = true;
      });
    expect(handle.signal.aborted).toBe(true);
    await Promise.resolve();
    expect(settled).toBe(false);
    registry.complete('execution.local');
    await cancellation;
    expect(settled).toBe(true);
  });

  it('enforces execution revision fencing', async () => {
    const registry = new LocalActiveExecutionRegistry();
    registry.begin('execution.local', 'sandbox.local');
    await expect(
      registry.cancel({
        operationId: 'operation.cancel',
        executionId: 'execution.local',
        principal: { principalId: 'user', type: 'user', permissionScopes: [] },
        expectedRevision: 99,
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_REVISION_CONFLICT' } });
    registry.complete('execution.local');
  });
});
