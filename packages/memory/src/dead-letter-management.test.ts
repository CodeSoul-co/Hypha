import { describe, expect, it } from 'vitest';
import {
  InMemoryMemoryDeadLetterRepository,
  MemoryDeadLetterManager,
  deadLetterFromTask,
  type MemoryLifecycleTask,
} from './index';

const task: MemoryLifecycleTask = {
  id: 'task-1',
  operationId: 'operation-1',
  type: 'provider_reconciliation',
  scopeHash: 'scope-1',
  payload: { idempotencyKey: 'write-1' },
  state: 'dead_letter',
  attempts: 5,
  availableAt: '2026-07-21T00:00:00.000Z',
  lastError: { code: 'MEMORY_PROVIDER_UNAVAILABLE', message: 'offline', retryable: true },
  createdAt: '2026-07-21T00:00:00.000Z',
  updatedAt: '2026-07-21T00:00:00.000Z',
};

describe('MemoryDeadLetterManager', () => {
  it('queries and safely replays reviewed dead letters', async () => {
    const repository = new InMemoryMemoryDeadLetterRepository();
    const record = deadLetterFromTask(task);
    await repository.set(record);
    const manager = new MemoryDeadLetterManager(repository);
    expect(await manager.query({ workerType: 'provider_reconciliation' })).toHaveLength(1);
    await expect(
      manager.replay({
        deadLetterId: record.id,
        actorId: 'operator-1',
        reason: 'provider recovered',
        expectedFailureFingerprint: record.failureFingerprint,
        confirmation: 'replay',
        idempotencyKey: 'write-1',
        occurredAt: '2026-07-21T01:00:00.000Z',
      })
    ).resolves.toMatchObject({
      state: 'replay_queued',
      disposition: { actorId: 'operator-1', reason: 'provider recovered' },
    });
  });

  it('requires exact fingerprint and explicit discard confirmation', async () => {
    const repository = new InMemoryMemoryDeadLetterRepository();
    const record = deadLetterFromTask(task);
    await repository.set(record);
    const manager = new MemoryDeadLetterManager(repository);
    await expect(
      manager.discard({
        deadLetterId: record.id,
        actorId: 'operator-1',
        reason: 'duplicate task',
        expectedFailureFingerprint: 'stale',
        confirmation: 'discard',
      })
    ).rejects.toMatchObject({ code: 'MEMORY_REVISION_CONFLICT' });
    await expect(
      manager.discard({
        deadLetterId: record.id,
        actorId: 'operator-1',
        reason: 'duplicate task',
        expectedFailureFingerprint: record.failureFingerprint,
        confirmation: 'replay',
      })
    ).rejects.toMatchObject({ code: 'MEMORY_INVALID_INPUT' });
  });
});
