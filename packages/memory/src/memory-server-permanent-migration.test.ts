import { describe, expect, it } from 'vitest';
import { runPermanentMemoryBehaviorAcceptance } from './memory-server-permanent-migration-acceptance';
import {
  createPermanentMemoryMigrationAdapterHarness,
  createReferencePermanentMemoryMigrationHarness,
  permanentMemoryFailureFixtures,
} from './memory-server-permanent-migration-fixtures';
import {
  isExplicitPermanentMemoryNotFound,
  PermanentMemoryMigrationAdapter,
  type PermanentMemoryMigrationProvider,
} from './memory-server-permanent-migration';

const request = {
  operationId: 'permanent:test',
  scope: { userId: 'user:permanent-test' },
  providerRef: 'mongodb:permanent-memory',
  profileRef: 'memory.profile.permanent',
  recordId: 'memory:test',
};

describe('P0-3 Permanent Memory error propagation acceptance', () => {
  it('runs the complete failure matrix against the reference port', async () => {
    await expect(
      runPermanentMemoryBehaviorAcceptance(createReferencePermanentMemoryMigrationHarness)
    ).resolves.toEqual({
      passed: true,
      cases: permanentMemoryFailureFixtures.length,
      findings: [],
    });
  });

  it('runs the same failure matrix against the concrete provider adapter', async () => {
    await expect(
      runPermanentMemoryBehaviorAcceptance(createPermanentMemoryMigrationAdapterHarness)
    ).resolves.toEqual({
      passed: true,
      cases: permanentMemoryFailureFixtures.length,
      findings: [],
    });
  });

  it('does not infer not-found from an empty message or unknown provider exception', async () => {
    expect(isExplicitPermanentMemoryNotFound(new Error('not found'))).toBe(false);
    expect(isExplicitPermanentMemoryNotFound({ code: 'UNKNOWN', message: 'not found' })).toBe(
      false
    );
    expect(isExplicitPermanentMemoryNotFound({ code: 'MEMORY_NOT_FOUND' })).toBe(true);
  });

  it('propagates non-not-found failures from get, list and delete instead of fabricating empties', async () => {
    const provider: PermanentMemoryMigrationProvider = {
      get: async () => Promise.reject({ code: 'ECONNRESET' }),
      list: async () => Promise.reject({ code: 'MONGO_CURSOR_INTERRUPTED' }),
      delete: async () => Promise.reject({ code: 18 }),
      write: async () => undefined,
    };
    const adapter = new PermanentMemoryMigrationAdapter({ provider });

    await expect(adapter.get(request)).rejects.toMatchObject({
      code: 'MEMORY_STORE_UNAVAILABLE',
      retryable: true,
    });
    await expect(adapter.list({ ...request, recordId: undefined })).rejects.toMatchObject({
      code: 'MEMORY_STORE_UNAVAILABLE',
      retryable: true,
    });
    await expect(adapter.delete(request)).rejects.toMatchObject({
      code: 'MEMORY_PERMISSION_DENIED',
      retryable: false,
    });
  });

  it('keeps raw credentials, connection strings and user data out of propagated diagnostics', async () => {
    const provider: PermanentMemoryMigrationProvider = {
      get: async () =>
        Promise.reject({
          code: 18,
          message: 'mongodb://admin:secret@private user content Bearer top-secret-token',
        }),
      list: async () => [],
      delete: async () => false,
      write: async () => undefined,
    };
    const adapter = new PermanentMemoryMigrationAdapter({ provider });
    let thrown: unknown;
    try {
      await adapter.get(request);
    } catch (error) {
      thrown = error;
    }
    const serialized = JSON.stringify(thrown).toLowerCase();
    expect(serialized).not.toContain('mongodb://');
    expect(serialized).not.toContain('secret');
    expect(serialized).not.toContain('user content');
    expect(serialized).toContain('causeRef'.toLowerCase());
  });
});
