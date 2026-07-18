import { describe, expect, it } from 'vitest';
import type { RuntimeCheckpointRecord } from '../../contracts/runtime-checkpoint';
import { runtimeCheckpointRecordExample } from '../../contracts/runtime-checkpoint-schemas';
import type { RuntimeScope } from '../../contracts/runtime';
import {
  InMemoryRuntimeCheckpointStore,
  runtimeCheckpointChecksum,
} from './runtime-checkpoint-store';

function record(
  id: string,
  sequence: number,
  lastEventSequence: number,
  overrides: Partial<RuntimeCheckpointRecord> = {}
): RuntimeCheckpointRecord {
  const withoutChecksum = {
    ...structuredClone(runtimeCheckpointRecordExample),
    id,
    sequence,
    lastEventSequence,
    requestHash: `request.${id}`,
    ...overrides,
  };
  return { ...withoutChecksum, checksum: runtimeCheckpointChecksum(withoutChecksum) };
}

describe('InMemoryRuntimeCheckpointStore', () => {
  it('reuses identical writes and rejects changed input for the same idempotency key', async () => {
    const store = new InMemoryRuntimeCheckpointStore();
    const checkpoint = record('checkpoint.1', 1, 3);

    await expect(store.put(checkpoint, 'put.1')).resolves.toMatchObject({ reused: false });
    await expect(store.put(checkpoint, 'put.1')).resolves.toMatchObject({ reused: true });
    await expect(store.put(record('checkpoint.changed', 1, 3), 'put.1')).rejects.toMatchObject({
      code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
    });
  });

  it('enforces unique ids, contiguous sequences, and monotonic Event coverage', async () => {
    const store = new InMemoryRuntimeCheckpointStore();
    const first = record('checkpoint.1', 1, 3);
    await store.put(first, 'put.1');

    await expect(store.put(first, 'put.duplicate-id')).rejects.toMatchObject({
      code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
    });
    await expect(store.put(record('checkpoint.3', 3, 4), 'put.sequence-gap')).rejects.toMatchObject(
      {
        code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
      }
    );
    await expect(
      store.put(record('checkpoint.2', 2, 2), 'put.event-regression')
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
    await expect(store.put(record('checkpoint.2', 2, 4), 'put.2')).resolves.toMatchObject({
      reused: false,
    });
    await expect(store.list(first.scope)).resolves.toMatchObject([
      { id: 'checkpoint.2' },
      { id: 'checkpoint.1' },
    ]);
  });

  it('isolates scopes and returns defensive copies', async () => {
    const store = new InMemoryRuntimeCheckpointStore();
    const first = record('checkpoint.shared', 1, 3);
    const otherScope: RuntimeScope = {
      ...first.scope,
      tenantId: 'tenant.other',
      userId: 'user.other',
      runId: 'run.other',
    };
    const second = record('checkpoint.shared', 1, 3, {
      scope: otherScope,
      projectionSnapshot: { ...first.projectionSnapshot, runId: otherScope.runId },
    });

    await Promise.all([store.put(first, 'put.first'), store.put(second, 'put.second')]);
    const loaded = await store.get(first.scope, first.id);
    loaded!.projectionSnapshot.statePath.push('Mutated');

    expect((await store.get(first.scope, first.id))?.projectionSnapshot.statePath).toEqual([
      'Acting',
    ]);
    expect((await store.get(otherScope, second.id))?.scope.tenantId).toBe('tenant.other');
  });

  it('rejects content whose checksum was tampered with', async () => {
    const store = new InMemoryRuntimeCheckpointStore();
    const tampered = { ...record('checkpoint.tampered', 1, 3), variablesHash: 'changed' };

    await expect(store.put(tampered, 'put.tampered')).rejects.toMatchObject({
      code: 'RUNTIME_CHECKPOINT_FAILED',
    });
  });
});
