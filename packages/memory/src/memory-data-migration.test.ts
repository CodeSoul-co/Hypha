import { describe, expect, it, vi } from 'vitest';
import {
  MemoryDataMigrationCoordinator,
  type MemoryDataMigrationState,
  type MemoryDataMigrationStateStore,
} from './memory-data-migration';

class TestMigrationStateStore implements MemoryDataMigrationStateStore {
  state: MemoryDataMigrationState | null = null;
  get(): Promise<MemoryDataMigrationState | null> {
    return Promise.resolve(this.state ? structuredClone(this.state) : null);
  }
  save(state: MemoryDataMigrationState): Promise<void> {
    this.state = structuredClone(state);
    return Promise.resolve();
  }
}

describe('MemoryDataMigrationCoordinator', () => {
  it('resumes after failure and rolls applied steps back in reverse order', async () => {
    const store = new TestMigrationStateStore();
    const calls: string[] = [];
    const secondApply = vi
      .fn<() => Promise<void>>()
      .mockRejectedValueOnce(new Error('temporary migration failure'))
      .mockImplementation(async () => {
        calls.push('apply:second');
      });
    const plan = {
      id: 'legacy-memory-to-native',
      version: '1.0.0',
      source: 'server-legacy',
      target: 'hypha-native',
      steps: [
        {
          id: 'first',
          apply: async () => {
            calls.push('apply:first');
          },
          rollback: async () => {
            calls.push('rollback:first');
          },
        },
        {
          id: 'second',
          apply: secondApply,
          rollback: async () => {
            calls.push('rollback:second');
          },
        },
      ],
    };
    const firstProcess = new MemoryDataMigrationCoordinator({ stateStore: store });
    await expect(firstProcess.apply(plan)).rejects.toMatchObject({
      code: 'MEMORY_INTERNAL_ERROR',
    });
    expect(store.state).toMatchObject({ state: 'failed', appliedStepIds: ['first'] });

    const restartedProcess = new MemoryDataMigrationCoordinator({ stateStore: store });
    await expect(restartedProcess.apply(plan)).resolves.toMatchObject({
      state: 'applied',
      appliedStepIds: ['first', 'second'],
    });
    expect(calls).toEqual(['apply:first', 'apply:second']);

    await expect(restartedProcess.rollback(plan)).resolves.toMatchObject({
      state: 'rolled_back',
      appliedStepIds: [],
    });
    expect(calls).toEqual(['apply:first', 'apply:second', 'rollback:second', 'rollback:first']);
  });

  it('rejects a changed plan after a checkpoint exists', async () => {
    const store = new TestMigrationStateStore();
    const coordinator = new MemoryDataMigrationCoordinator({ stateStore: store });
    const plan = {
      id: 'stable-plan',
      version: '1.0.0',
      source: 'legacy',
      target: 'native',
      steps: [{ id: 'copy', apply: async () => undefined, rollback: async () => undefined }],
    };
    await coordinator.apply(plan);
    await expect(
      coordinator.apply({
        ...plan,
        steps: [
          ...plan.steps,
          { id: 'changed', apply: async () => undefined, rollback: async () => undefined },
        ],
      })
    ).rejects.toMatchObject({ code: 'MEMORY_MAINTENANCE_CONFLICT' });
  });
});
