import Redis from 'ioredis';
import mongoose from 'mongoose';
import {
  MongoStructuredStoreProvider,
  RedisStreamWorkingMemoryMigrationAdapter,
  runRedisWorkingMemoryBehaviorAcceptance,
  type MongoDatabaseLike,
  type RedisStreamMigrationClient,
} from '../../packages/memory/src';

const redisUrl =
  process.env.HYPHA_TEST_REDIS_URL ?? process.env.REDIS_URL ?? 'redis://127.0.0.1:6379';
const mongoUrl =
  process.env.HYPHA_TEST_MONGODB_URI ??
  process.env.MONGODB_URI ??
  'mongodb://127.0.0.1:27017/hypha_memory_stage_one';

describe('Native Memory real store acceptance', () => {
  it('runs the canonical Redis boundary suite against a real Redis server', async () => {
    const redis = new Redis(redisUrl, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      connectTimeout: 5_000,
    });
    const namespace = `hypha:test:memory:stage-one:${Date.now()}`;
    try {
      await redis.connect();
      const client = redis as unknown as RedisStreamMigrationClient;
      await expect(
        runRedisWorkingMemoryBehaviorAcceptance((fixtureId) => {
          const options = {
            client,
            namespace: `${namespace}:${fixtureId}`,
            scanBudget: { maxCalls: 100, maxItems: 10_000, maxDurationMs: 10_000, count: 25 },
          };
          return {
            port: new RedisStreamWorkingMemoryMigrationAdapter(options),
            restart: () => new RedisStreamWorkingMemoryMigrationAdapter(options),
          };
        })
      ).resolves.toEqual({ passed: true, cases: 8, findings: [] });
    } finally {
      let cursor = '0';
      do {
        const [next, keys] = await redis.scan(cursor, 'MATCH', `${namespace}:*`, 'COUNT', 100);
        cursor = next;
        if (keys.length > 0) await redis.del(...keys);
      } while (cursor !== '0');
      redis.disconnect();
    }
  });

  it('executes canonical structured CRUD and health against a real MongoDB server', async () => {
    const connection = mongoose.createConnection(mongoUrl, {
      serverSelectionTimeoutMS: 5_000,
      maxPoolSize: 2,
    });
    const prefix = `stage_one_${Date.now()}_`;
    try {
      await connection.asPromise();
      if (!connection.db) throw new Error('MongoDB connection has no database.');
      const client = connection.getClient();
      const database: MongoDatabaseLike = {
        collection: (name) => connection.db!.collection(name) as never,
        startSession: () => client.startSession() as never,
        command: (command) => connection.db!.command(command),
      };
      const provider = new MongoStructuredStoreProvider({
        database,
        collectionPrefix: prefix,
        transactionMode: 'preferred',
      });
      const table = 'managed_memory_current';
      const record = { id: 'memory:real:1', scopeHash: 'scope:real', value: 'one' };

      await provider.initialize([table]);
      await provider.insert(table, record);
      await expect(provider.get(table, record.id)).resolves.toEqual(record);
      await provider.update<typeof record>(table, record.id, { value: 'two' });
      await expect(
        provider.query<typeof record>(table, { where: { scopeHash: 'scope:real' } })
      ).resolves.toEqual([expect.objectContaining({ id: record.id, value: 'two' })]);
      await expect(provider.health()).resolves.toMatchObject({ status: 'healthy' });
      await provider.delete(table, record.id);
      await expect(provider.get(table, record.id)).resolves.toBeNull();
    } finally {
      if (connection.readyState === 1 && connection.db) {
        for (const collection of await connection.db.collections()) {
          if (collection.collectionName.startsWith(prefix)) await collection.drop();
        }
      }
      await connection.close();
    }
  });
});
