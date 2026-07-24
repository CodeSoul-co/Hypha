import { afterEach, describe, expect, it } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { SQLiteRuntimeIntegrityStore } from './runtime-integrity-store';

const timestamp = '2026-07-24T08:00:00.000Z';

describe('SQLiteRuntimeIntegrityStore', () => {
  const stores: SQLiteRuntimeIntegrityStore[] = [];

  afterEach(() => {
    while (stores.length > 0) stores.pop()?.close();
  });

  it('persists a CAS-protected audit watermark across restart', async () => {
    const filename = temporaryDatabase();
    const first = open(filename);
    const watermark = {
      version: '1.0.0' as const,
      lastGlobalSequence: 12,
      projectionRevision: 'runtime-orchestration@1',
      schemaCatalogHash: 'sha256:schema',
      streamFingerprintRevision: 'stream-key@1',
      reportHash: 'sha256:report',
      auditedAt: timestamp,
    };

    await first.putWatermark(watermark, null);
    first.close();
    stores.splice(stores.indexOf(first), 1);

    const reopened = open(filename);
    await expect(reopened.getWatermark()).resolves.toEqual(watermark);
    await expect(
      reopened.putWatermark({ ...watermark, lastGlobalSequence: 13 }, null)
    ).rejects.toMatchObject({ code: 'RUNTIME_INTEGRITY_CONFLICT' });
    await expect(
      reopened.putWatermark({ ...watermark, lastGlobalSequence: 13 }, 12)
    ).resolves.toBeUndefined();
  });

  it('stores repair evidence idempotently and rejects conflicting reuse', async () => {
    const store = open(temporaryDatabase());
    const evidence = {
      version: '1.0.0' as const,
      repairId: 'repair-1',
      findingHash: 'sha256:finding',
      repairedRevision: 'revision-2',
      evidenceRef: 'artifact:repair-1',
      evidenceHash: 'sha256:evidence',
      repairedBy: 'operator-1',
      repairedAt: timestamp,
    };

    await store.putRepair(evidence);
    await expect(store.putRepair(evidence)).resolves.toBeUndefined();
    await expect(store.getRepair(evidence.repairId)).resolves.toEqual(evidence);
    await expect(
      store.putRepair({ ...evidence, evidenceHash: 'sha256:different' })
    ).rejects.toMatchObject({ code: 'RUNTIME_INTEGRITY_CONFLICT' });
  });

  function open(filename: string): SQLiteRuntimeIntegrityStore {
    const store = new SQLiteRuntimeIntegrityStore({ filename });
    stores.push(store);
    return store;
  }
});

function temporaryDatabase(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-runtime-integrity-'));
  return path.join(root, 'runtime.sqlite');
}
