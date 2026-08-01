import Redis from 'ioredis';
import mongoose, { type Connection } from 'mongoose';
import {
  MongoStructuredStoreProvider,
  RedisWorkingMemoryStore,
  StructuredMemoryIndexOutboxStore,
  StructuredMemoryLifecycleTaskStore,
  type MemoryIndexOutboxRecord,
  type MemoryLifecycleTask,
  type MongoDatabaseLike,
} from '../../packages/memory/src';

const redisUrl =
  process.env.HYPHA_TEST_REDIS_URL ?? process.env.REDIS_URL ?? 'redis://127.0.0.1:6379';
const mongoUrl =
  process.env.HYPHA_TEST_MONGODB_URI ??
  process.env.MONGODB_URI ??
  'mongodb://127.0.0.1:27017/hypha_memory_stage_one';

function lifecycleTask(id: string): MemoryLifecycleTask {
  return {
    id,
    operationId: `operation:${id}`,
    type: 'retention',
    scopeHash: 'scope:multi-instance:real',
    payload: {},
    state: 'pending',
    attempts: 0,
    availableAt: '2026-07-24T00:00:00.000Z',
    createdAt: '2026-07-24T00:00:00.000Z',
    updatedAt: '2026-07-24T00:00:00.000Z',
  };
}

function outboxRecord(id: string): MemoryIndexOutboxRecord {
  return {
    id,
    operationId: `operation:${id}`,
    memoryId: `memory:${id}`,
    memoryVersionId: `memory:${id}:v1`,
    scopeHash: 'scope:multi-instance:real',
    action: 'upsert',
    targetVectorStoreIds: ['vector:real'],
    state: 'pending',
    attempts: 0,
    availableAt: '2026-07-24T00:00:00.000Z',
    createdAt: '2026-07-24T00:00:00.000Z',
    updatedAt: '2026-07-24T00:00:00.000Z',
  };
}

async function connectMongo(): Promise<Connection> {
  return mongoose
    .createConnection(mongoUrl, { serverSelectionTimeoutMS: 5_000, maxPoolSize: 2 })
    .asPromise();
}

function mongoProvider(connection: Connection, prefix: string): MongoStructuredStoreProvider {
  if (!connection.db) throw new Error('MongoDB connection has no database.');
  const database: MongoDatabaseLike = {
    collection: (name) => connection.db!.collection(name) as never,
    command: (command) => connection.db!.command(command),
  };
  return new MongoStructuredStoreProvider({
    database,
    collectionPrefix: prefix,
    transactionMode: 'disabled',
  });
}

async function closeRedis(client?: Redis): Promise<void> {
  if (!client || client.status === 'end') return;
  if (client.status === 'wait') {
    client.disconnect();
    return;
  }
  await client.quit();
}
describe('Native Memory real multi-instance recovery', () => {
  it('atomically leases, fences stale owners and recovers lifecycle and outbox state', async () => {
    const prefix = `multi_instance_${Date.now()}_`;
    const firstConnection = await connectMongo();
    const secondConnection = await connectMongo();
    let recoveryConnection: Connection | undefined;
    try {
      const firstProvider = mongoProvider(firstConnection, prefix);
      const secondProvider = mongoProvider(secondConnection, prefix);
      await firstProvider.initialize(['memory_lifecycle_tasks', 'managed_memory_index_outbox']);
      const firstLifecycle = new StructuredMemoryLifecycleTaskStore({ store: firstProvider });
      const secondLifecycle = new StructuredMemoryLifecycleTaskStore({ store: secondProvider });
      const task = lifecycleTask('lifecycle:real-race');
      await firstLifecycle.enqueue(task);

      const [firstClaims, secondClaims] = await Promise.all([
        firstLifecycle.lease(
          'retention',
          'worker:first',
          '2026-07-24T00:00:01.000Z',
          '2026-07-24T00:00:05.000Z',
          1
        ),
        secondLifecycle.lease(
          'retention',
          'worker:second',
          '2026-07-24T00:00:01.000Z',
          '2026-07-24T00:00:05.000Z',
          1
        ),
      ]);
      expect(firstClaims.length + secondClaims.length).toBe(1);
      const original = firstClaims[0] ?? secondClaims[0];
      expect(original?.leaseToken).toBeTruthy();

      const [takeover] = await secondLifecycle.lease(
        'retention',
        'worker:recovery',
        '2026-07-24T00:00:06.000Z',
        '2026-07-24T00:00:10.000Z',
        1
      );
      expect(takeover?.fencingToken).toBe(2);
      await expect(
        firstLifecycle.complete(
          task.id,
          original?.leaseOwner ?? '',
          original?.leaseToken ?? '',
          '2026-07-24T00:00:07.000Z'
        )
      ).resolves.toBe(false);
      await expect(
        secondLifecycle.complete(
          task.id,
          'worker:recovery',
          takeover?.leaseToken ?? '',
          '2026-07-24T00:00:07.000Z'
        )
      ).resolves.toBe(true);

      const firstOutbox = new StructuredMemoryIndexOutboxStore({ provider: firstProvider });
      const secondOutbox = new StructuredMemoryIndexOutboxStore({ provider: secondProvider });
      const outbox = outboxRecord('outbox:real-race');
      await firstOutbox.enqueue(outbox);
      const [firstOutboxClaims, secondOutboxClaims] = await Promise.all([
        firstOutbox.lease('index:first', '2026-07-24T00:00:01.000Z', '2026-07-24T00:00:05.000Z', 1),
        secondOutbox.lease(
          'index:second',
          '2026-07-24T00:00:01.000Z',
          '2026-07-24T00:00:05.000Z',
          1
        ),
      ]);
      expect(firstOutboxClaims.length + secondOutboxClaims.length).toBe(1);
      const originalOutbox = firstOutboxClaims[0] ?? secondOutboxClaims[0];
      const [outboxTakeover] = await secondOutbox.lease(
        'index:recovery',
        '2026-07-24T00:00:06.000Z',
        '2026-07-24T00:00:10.000Z',
        1
      );
      expect(outboxTakeover?.fencingToken).toBe(2);
      await expect(
        firstOutbox.complete(
          outbox.id,
          originalOutbox?.leaseOwner ?? '',
          originalOutbox?.leaseToken ?? '',
          '2026-07-24T00:00:07.000Z'
        )
      ).resolves.toBe(false);
      await expect(
        secondOutbox.complete(
          outbox.id,
          'index:recovery',
          outboxTakeover?.leaseToken ?? '',
          '2026-07-24T00:00:07.000Z'
        )
      ).resolves.toBe(true);

      await firstConnection.close();
      await secondConnection.close();
      recoveryConnection = await connectMongo();
      const recoveryProvider = mongoProvider(recoveryConnection, prefix);
      const recoveredLifecycle = new StructuredMemoryLifecycleTaskStore({
        store: recoveryProvider,
      });
      const recoveredOutbox = new StructuredMemoryIndexOutboxStore({ provider: recoveryProvider });
      await expect(recoveredLifecycle.list('retention')).resolves.toMatchObject([
        { id: task.id, state: 'completed', attempts: 2, fencingToken: 2 },
      ]);
      await expect(recoveredOutbox.list()).resolves.toMatchObject([
        { id: outbox.id, state: 'completed', attempts: 2, fencingToken: 2 },
      ]);
    } finally {
      const cleanupConnection = recoveryConnection ?? (await connectMongo());
      if (cleanupConnection.db) {
        for (const collection of await cleanupConnection.db.collections()) {
          if (collection.collectionName.startsWith(prefix)) await collection.drop();
        }
      }
      if (firstConnection.readyState !== 0) await firstConnection.close();
      if (secondConnection.readyState !== 0) await secondConnection.close();
      await cleanupConnection.close();
    }
  });

  it('shares Redis working state across clients and recovers after one client disconnects', async () => {
    const namespace = `hypha:test:memory:multi-instance:${Date.now()}`;
    const scope = { userId: 'user:real-multi', workspaceId: 'workspace:real-multi' };
    const firstClient = new Redis(redisUrl, { lazyConnect: true, maxRetriesPerRequest: 1 });
    const secondClient = new Redis(redisUrl, { lazyConnect: true, maxRetriesPerRequest: 1 });
    let recoveryClient: Redis | undefined;
    try {
      await Promise.all([firstClient.connect(), secondClient.connect()]);
      const firstStore = new RedisWorkingMemoryStore({ client: firstClient, namespace });
      const secondStore = new RedisWorkingMemoryStore({ client: secondClient, namespace });
      await firstStore.set({
        id: 'working:shared',
        scope,
        value: { generation: 1 },
        createdAt: '2026-07-24T00:00:00.000Z',
        updatedAt: '2026-07-24T00:00:00.000Z',
      });
      await expect(secondStore.get(scope, 'working:shared')).resolves.toMatchObject({
        value: { generation: 1 },
      });

      firstClient.disconnect();
      await secondStore.set({
        id: 'working:shared',
        scope,
        value: { generation: 2 },
        createdAt: '2026-07-24T00:00:00.000Z',
        updatedAt: '2026-07-24T00:00:01.000Z',
      });
      recoveryClient = new Redis(redisUrl, { lazyConnect: true, maxRetriesPerRequest: 1 });
      await recoveryClient.connect();
      const recoveredStore = new RedisWorkingMemoryStore({ client: recoveryClient, namespace });
      await expect(recoveredStore.get(scope, 'working:shared')).resolves.toMatchObject({
        value: { generation: 2 },
      });
      await recoveredStore.clearScope(scope);
      await expect(secondStore.list(scope)).resolves.toEqual([]);
    } finally {
      await Promise.all([
        closeRedis(firstClient),
        closeRedis(secondClient),
        closeRedis(recoveryClient),
      ]);
    }
  });
});
