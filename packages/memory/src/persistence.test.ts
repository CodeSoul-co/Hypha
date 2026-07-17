import { describe, expect, it } from 'vitest';
import { InMemoryMemoryPersistenceUnitOfWork, managedMemoryRecordExample } from './index';

describe('memory persistence unit of work', () => {
  it('rolls back records and outbox entries as one atomic unit', async () => {
    const unitOfWork = new InMemoryMemoryPersistenceUnitOfWork();
    const record = structuredClone(managedMemoryRecordExample);

    await expect(
      unitOfWork.transaction(async ({ recordStore, outboxStore }) => {
        await recordStore.create(record);
        await outboxStore.enqueue({
          id: 'outbox-rollback',
          operationId: 'operation-rollback',
          memoryId: record.id,
          memoryVersionId: record.versionId,
          scopeHash: record.scopeHash,
          action: 'upsert',
          targetVectorStoreIds: ['local-vector'],
          state: 'pending',
          attempts: 0,
          availableAt: record.createdAt,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
        });
        throw new Error('rollback');
      })
    ).rejects.toThrow('rollback');

    expect(unitOfWork.capabilities).toEqual({
      durable: false,
      atomicRecordAndOutbox: true,
    });
    expect(await unitOfWork.recordStore.get(record.id, record.scope)).toBeNull();
    expect(await unitOfWork.outboxStore.list()).toEqual([]);
  });

  it('removes current and historical versions during a hard delete', async () => {
    const unitOfWork = new InMemoryMemoryPersistenceUnitOfWork();
    const record = structuredClone(managedMemoryRecordExample);

    await unitOfWork.recordStore.create(record);
    await expect(unitOfWork.recordStore.history(record.id, record.scope)).resolves.toHaveLength(1);

    await unitOfWork.recordStore.delete(record.id, record.scope);

    await expect(unitOfWork.recordStore.get(record.id, record.scope)).resolves.toBeNull();
    await expect(unitOfWork.recordStore.history(record.id, record.scope)).resolves.toEqual([]);
  });
});
