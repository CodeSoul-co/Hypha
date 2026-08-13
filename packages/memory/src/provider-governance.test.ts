import { describe, expect, it } from 'vitest';
import {
  InMemoryMemoryProviderQuota,
  createMemoryDeletionEvidence,
  verifyMemoryDeletionEvidence,
} from './index';

describe('provider quota and deletion evidence', () => {
  it('enforces independent provider operation and cost budgets', () => {
    const quota = new InMemoryMemoryProviderQuota(
      [
        {
          providerId: 'provider-1',
          windowMs: 60_000,
          maxOperations: 2,
          maxCostUnits: 5,
        },
      ],
      () => new Date('2026-07-21T00:00:00.000Z')
    );
    quota.record('provider-1', 2);
    quota.record('provider-1', 2);
    expect(quota.check('provider-1', 1)).toMatchObject({
      allowed: false,
      reason: 'operation_quota',
      remainingOperations: 0,
    });
  });

  it('creates verifiable partial and complete deletion proofs', () => {
    const partial = createMemoryDeletionEvidence({
      operationId: 'delete-1',
      providerId: 'provider-1',
      scope: { userId: 'u1' },
      requestedMemoryIds: ['m2', 'm1'],
      deletedMemoryIds: ['m1'],
      mode: 'compliance',
      completedAt: '2026-07-21T00:00:00.000Z',
      providerReceiptRef: 'receipt-1',
    });
    expect(partial).toMatchObject({
      requestedMemoryIds: ['m1', 'm2'],
      deletedMemoryIds: ['m1'],
      pendingMemoryIds: ['m2'],
    });
    expect(verifyMemoryDeletionEvidence(partial)).toBe(true);
    expect(verifyMemoryDeletionEvidence({ ...partial, deletedMemoryIds: ['m1', 'm2'] })).toBe(
      false
    );
  });
});
