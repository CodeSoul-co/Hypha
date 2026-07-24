import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  DurableExecutionWorker,
  commandExecutionResultExample,
  executionRecordCreateRequestExample,
  type ExecutionRecord,
} from '@hypha/core';
import { SQLiteExecutionStore } from './sqlite-execution-store';

describe('SQLite Execution Store durable worker integration', () => {
  let rootPath: string;
  let store: SQLiteExecutionStore;
  let now: string;

  beforeEach(async () => {
    rootPath = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-sqlite-worker-'));
    now = '2026-07-16T00:00:01.000Z';
    store = new SQLiteExecutionStore({ rootPath });
    await store.create(executionRecordCreateRequestExample);
  });

  afterEach(async () => {
    await store.close();
    fs.rmSync(rootPath, { recursive: true, force: true });
  });

  it('allows only one of two real workers to claim a queued Execution', async () => {
    const first = worker('worker.one');
    const second = worker('worker.two');

    const claims = await Promise.all([first.claimNext(), second.claimNext()]);
    const acquired = claims.filter((record): record is ExecutionRecord => record !== null);

    expect(acquired).toHaveLength(1);
    expect(acquired[0]).toMatchObject({
      status: 'starting',
      revision: 1,
      attempt: 1,
      lease: { fencingToken: 1 },
    });
    expect(['worker.one', 'worker.two']).toContain(acquired[0].lease?.ownerId);
  });

  it('renews only the owning worker lease and advances its durable revision', async () => {
    const owner = worker('worker.one');
    const stranger = worker('worker.two');
    const claimed = requiredRecord(await owner.claimNext());
    now = '2026-07-16T00:00:01.500Z';

    const renewed = await owner.renew(claimed);

    expect(renewed).toMatchObject({
      revision: 2,
      lease: {
        ownerId: 'worker.one',
        fencingToken: 1,
        heartbeatAt: now,
      },
    });
    await expect(stranger.renew(renewed)).rejects.toMatchObject({
      code: 'EXECUTION_WORKER_LEASE_LOST',
    });
  });

  it('fences an expired worker after takeover and permits only the new worker to commit', async () => {
    const first = worker('worker.one');
    const second = worker('worker.two');
    const firstClaim = requiredRecord(await first.claimNext());
    now = '2026-07-16T00:00:03.000Z';
    const secondClaim = requiredRecord(await second.claimNext());

    expect(secondClaim.lease).toMatchObject({
      ownerId: 'worker.two',
      fencingToken: 2,
    });
    await expect(first.commit(firstClaim, resultFor(firstClaim))).rejects.toMatchObject({
      code: expect.stringMatching(
        /^(EXECUTION_STORE_REVISION_CONFLICT|EXECUTION_STORE_FENCING_REJECTED)$/u
      ),
    });

    now = '2026-07-16T00:00:03.500Z';
    const committed = await second.commit(secondClaim, resultFor(secondClaim));
    expect(committed).toMatchObject({
      status: 'completed',
      lease: undefined,
      result: { executionId: secondClaim.id, status: 'completed' },
    });
    await expect(store.get(secondClaim.id)).resolves.toEqual(committed);
  });

  it('stops claiming new work during shutdown', async () => {
    const candidate = worker('worker.one');
    candidate.stopClaiming();

    await expect(candidate.claimNext()).resolves.toBeNull();
    const record = await store.get(executionRecordCreateRequestExample.record.id);
    expect(record).toMatchObject({ status: 'queued' });
    expect(record?.lease).toBeUndefined();
  });

  function worker(workerId: string): DurableExecutionWorker {
    return new DurableExecutionWorker({
      store,
      workerId,
      leaseTtlMs: 1000,
      now: () => now,
      leaseId: (executionId) => `lease:${workerId}:${executionId}:${now}`,
    });
  }
});

function requiredRecord(record: ExecutionRecord | null): ExecutionRecord {
  if (!record) throw new Error('Expected a claimed Execution record.');
  return record;
}

function resultFor(record: ExecutionRecord) {
  return {
    ...structuredClone(commandExecutionResultExample),
    executionId: record.id,
    revision: record.revision + 1,
  };
}
