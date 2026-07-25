import { describe, expect, it } from 'vitest';
import {
  InMemoryMemoryDeadLetterRepository,
  InMemoryMemoryLifecycleTaskStore,
  MemoryDeadLetterManager,
  deadLetterFromTask,
  type MemoryLifecycleTask,
  inspectMemoryLifecycleDeadLetters,
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

  it('inspects durable lifecycle DLQ metadata without returning payloads or messages', async () => {
    const store = new InMemoryMemoryLifecycleTaskStore();
    await store.enqueue(task);

    const result = await inspectMemoryLifecycleDeadLetters(store, {
      workerType: 'provider_reconciliation',
      scopeHash: 'scope-1',
    });
    expect(result).toEqual([
      expect.objectContaining({
        taskId: 'task-1',
        operationId: 'operation-1',
        workerType: 'provider_reconciliation',
        attempts: 5,
        error: {
          code: 'MEMORY_PROVIDER_UNAVAILABLE',
          retryable: true,
          providerCode: undefined,
        },
        payloadHash: expect.stringMatching(/^sha256:[a-f0-9]{64}$/),
      }),
    ]);
    expect(JSON.stringify(result)).not.toContain('write-1');
    expect(JSON.stringify(result)).not.toContain('offline');
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
