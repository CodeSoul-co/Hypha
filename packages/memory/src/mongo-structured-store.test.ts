import { describe, expect, it, vi } from 'vitest';
import {
  MongoStructuredStoreProvider,
  type MongoCollectionLike,
  type MongoCursorLike,
  type MongoDatabaseLike,
  type MongoOperationOptionsLike,
  type MongoSessionLike,
} from './index';

describe('MongoStructuredStoreProvider', () => {
  it('uses a Mongo session for atomic operations and creates startup indexes', async () => {
    const collection = mongoCollection();
    const session: MongoSessionLike = {
      withTransaction: vi.fn(async (operation) => operation()),
      endSession: vi.fn(async () => undefined),
    };
    const database: MongoDatabaseLike = {
      collection: () => collection,
      startSession: () => session,
      command: vi.fn(async () => ({ ok: 1 })),
    };
    const provider = new MongoStructuredStoreProvider({ database });

    await provider.initialize(['managed_memory_current']);
    await provider.transaction(async (transaction) => {
      await transaction.insert('managed_memory_current', { id: 'memory:1', value: 'stored' });
    });

    expect(session.withTransaction).toHaveBeenCalledOnce();
    expect(session.endSession).toHaveBeenCalledOnce();
    expect(collection.createIndex).toHaveBeenCalledWith(
      { id: 1 },
      { unique: true, name: 'memory_id_unique' }
    );
    await expect(provider.health()).resolves.toMatchObject({
      status: 'healthy',
      transactions: true,
    });
  });

  it('fails fast when atomic record/outbox commits require unavailable transactions', async () => {
    const provider = new MongoStructuredStoreProvider({
      database: { collection: () => mongoCollection() },
      transactionMode: 'required',
    });
    await expect(provider.transaction(async () => undefined)).rejects.toMatchObject({
      code: 'MEMORY_STORE_UNAVAILABLE',
    });
    await expect(provider.health()).resolves.toMatchObject({
      status: 'degraded',
      transactions: false,
    });
  });
  it('normalizes provider failures without leaking Mongo diagnostics', async () => {
    const failingCollection: MongoCollectionLike = {
      ...mongoCollection(),
      findOne: async <T>() =>
        Promise.reject({
          code: 18,
          message: 'mongo diagnostic credential-marker customer content',
        }) as Promise<T | null>,
      find: <T>(): MongoCursorLike<T> => ({
        toArray: async () => Promise.reject({ code: 'MONGO_CURSOR_INTERRUPTED' }),
      }),
    };
    const provider = new MongoStructuredStoreProvider({
      database: { collection: () => failingCollection },
      transactionMode: 'disabled',
    });

    await expect(provider.get('managed_memory_current', 'memory:1')).rejects.toMatchObject({
      code: 'MEMORY_PERMISSION_DENIED',
      retryable: false,
      providerCode: 'MONGO_CODE_18',
      details: { operation: 'get', provider: 'mongodb' },
    });
    await expect(provider.query('managed_memory_current', {})).rejects.toMatchObject({
      code: 'MEMORY_STORE_UNAVAILABLE',
      retryable: true,
      details: { operation: 'query', providerCode: 'MONGO_CURSOR_INTERRUPTED' },
    });
    let thrown: unknown;
    try {
      await provider.get('managed_memory_current', 'memory:1');
    } catch (error) {
      thrown = error;
    }
    const serialized = JSON.stringify(thrown).toLowerCase();
    expect(serialized).not.toContain('mongo diagnostic');
    expect(serialized).not.toContain('credential-marker');
    expect(serialized).not.toContain('customer content');
    expect(serialized).toContain('causeref');
  });
});

function mongoCollection(): MongoCollectionLike {
  const rows = new Map<string, Record<string, unknown>>();
  return {
    findOne: async <T>(filter: Record<string, unknown>) =>
      ([...rows.values()].find((row) => matches(row, filter)) as T | undefined) ?? null,
    insertOne: async <T extends object>(document: T, _options?: MongoOperationOptionsLike) => {
      const row = document as Record<string, unknown>;
      rows.set(String(row.id), structuredClone(row));
      return {};
    },
    updateOne: async (filter, update) => {
      const row = [...rows.values()].find((candidate) => matches(candidate, filter));
      if (!row) return { matchedCount: 0 };
      Object.assign(row, update.$set);
      return { matchedCount: 1 };
    },
    deleteOne: async (filter) => {
      const row = [...rows.values()].find((candidate) => matches(candidate, filter));
      return { deletedCount: row ? Number(rows.delete(String(row.id))) : 0 };
    },
    find: <T>(filter: Record<string, unknown>): MongoCursorLike<T> => ({
      toArray: async () =>
        [...rows.values()]
          .filter((row) => matches(row, filter))
          .map((row) => structuredClone(row) as T),
    }),
    createIndex: vi.fn(async () => 'memory_id_unique'),
  };
}

function matches(row: Record<string, unknown>, filter: Record<string, unknown>): boolean {
  return Object.entries(filter).every(([key, value]) => row[key] === value);
}
