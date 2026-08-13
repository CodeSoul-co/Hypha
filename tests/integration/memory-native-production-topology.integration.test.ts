import Redis from 'ioredis';
import mongoose, { type Connection } from 'mongoose';
import { createConnection as createNetConnection } from 'node:net';
import {
  InMemoryLocalVectorStoreAdapter,
  IndexOutboxWorker,
  MongoStructuredStoreProvider,
  NativeMemoryManagementProvider,
  RedisMemorySearchCacheStore,
  RedisWorkingMemoryStore,
  StructuredMemoryIndexOutboxStore,
  StructuredMemoryLifecycleTaskStore,
  StructuredMemoryPersistenceUnitOfWork,
  composeMemorySearchCacheProvider,
  hashMemoryScope,
  memoryProfileSpecExample,
  type ManagedMemoryScope,
  type MemoryAddRequest,
  type MemoryIndexOutboxRecord,
  type MemoryLifecycleTask,
  type MongoDatabaseLike,
} from '../../packages/memory/src';

const required = process.env.HYPHA_TEST_NATIVE_PRODUCTION_TOPOLOGY === 'required';
const describeTopology = required ? describe : describe.skip;
const mongoUri =
  process.env.HYPHA_TEST_NATIVE_REPLICA_SET_URI ??
  'mongodb://host.docker.internal:27117,host.docker.internal:27118,host.docker.internal:27119/hypha_native_production_test?replicaSet=hypha-rs&retryWrites=true&w=majority';
const topologyHost = process.env.HYPHA_TEST_NATIVE_HOST ?? '127.0.0.1';
const sentinels = [
  { host: topologyHost, port: 27301 },
  { host: topologyHost, port: 27302 },
  { host: topologyHost, port: 27303 },
];
const natMap = {
  'host.docker.internal:27201': { host: topologyHost, port: 27201 },
  'host.docker.internal:27202': { host: topologyHost, port: 27202 },
  'host.docker.internal:27203': { host: topologyHost, port: 27203 },
};

jest.setTimeout(120_000);

function redisClient(): Redis {
  const client = new Redis({
    sentinels,
    name: 'hypha-master',
    natMap,
    lazyConnect: true,
    connectTimeout: 5_000,
    maxRetriesPerRequest: 5,
    sentinelRetryStrategy: (attempt) => Math.min(attempt * 100, 1_000),
    retryStrategy: (attempt) => Math.min(attempt * 100, 1_000),
  });
  client.on('error', () => undefined);
  return client;
}

function mongoProvider(connection: Connection, prefix: string): MongoStructuredStoreProvider {
  if (!connection.db) throw new Error('MongoDB connection has no database.');
  const database: MongoDatabaseLike = {
    collection: (name) => connection.db!.collection(name) as never,
    startSession: () => connection.getClient().startSession() as never,
    command: (command) => connection.db!.command(command),
  };
  return new MongoStructuredStoreProvider({
    database,
    collectionPrefix: prefix,
    transactionMode: 'required',
  });
}

function addRequest(
  operationId: string,
  userId = 'user:native-production',
  input = 'native production topology memory'
): MemoryAddRequest {
  return {
    operationId,
    principal: {
      principalId: userId,
      type: 'user',
      userId,
      permissionScopes: ['memory:write'],
    },
    scope: {
      userId,
      workspaceId: 'workspace:native-production',
      sessionId: 'session:native-production',
      runId: 'run:native-production',
      agentId: 'agent:native-production',
    },
    profileRef: memoryProfileSpecExample,
    input,
    inputType: 'text',
    memoryType: 'semantic',
    source: { type: 'user_message', sourceId: operationId + ':source' },
    extractionMode: 'none',
    writeMode: 'sync',
    idempotencyKey: operationId,
  };
}

function lifecycleTask(id: string): MemoryLifecycleTask {
  return {
    id,
    operationId: 'operation:' + id,
    type: 'retention',
    scopeHash: 'scope:native-production',
    payload: {},
    state: 'pending',
    attempts: 0,
    availableAt: '2026-07-27T00:00:00.000Z',
    createdAt: '2026-07-27T00:00:00.000Z',
    updatedAt: '2026-07-27T00:00:00.000Z',
  };
}

function outboxRecord(id: string): MemoryIndexOutboxRecord {
  return {
    id,
    operationId: 'operation:' + id,
    memoryId: 'memory:' + id,
    memoryVersionId: 'memory:' + id + ':v1',
    scopeHash: 'scope:native-production',
    action: 'upsert',
    targetVectorStoreIds: ['memory.vector.local'],
    state: 'pending',
    attempts: 0,
    availableAt: '2026-07-27T00:00:00.000Z',
    createdAt: '2026-07-27T00:00:00.000Z',
    updatedAt: '2026-07-27T00:00:00.000Z',
  };
}

async function waitFor<T>(
  read: () => Promise<T>,
  accept: (value: T) => boolean,
  timeoutMs = 30_000
): Promise<T> {
  const deadline = Date.now() + timeoutMs;
  let last: T;
  do {
    last = await read();
    if (accept(last)) return last;
    await new Promise((resolve) => setTimeout(resolve, 250));
  } while (Date.now() < deadline);
  throw new Error('Timed out waiting for production topology state: ' + JSON.stringify(last));
}

function sentinelHasHealthyReplica(value: unknown): boolean {
  if (!Array.isArray(value)) return false;
  return value.some((entry) => {
    if (!Array.isArray(entry)) return false;
    const fields = new Map<string, string>();
    for (let index = 0; index + 1 < entry.length; index += 2) {
      fields.set(String(entry[index]), String(entry[index + 1]));
    }
    const flags = fields.get('flags') ?? '';
    return (
      fields.get('master-link-status') === 'ok' &&
      !flags.includes('s_down') &&
      !flags.includes('o_down') &&
      !flags.includes('disconnected')
    );
  });
}
async function closeRedis(client?: Redis): Promise<void> {
  if (!client || client.status === 'end') return;
  if (client.status === 'wait') {
    client.disconnect();
    return;
  }
  try {
    await client.quit();
  } catch {
    client.disconnect();
  }
}

describeTopology('Native Redis + MongoDB production topology acceptance', () => {
  let connection: Connection;
  let topologyReady = false;
  const prefixes: string[] = [];
  const redisNamespaces: string[] = [];

  beforeAll(async () => {
    await assertTopologyEndpointsReachable([
      ...mongoEndpoints(mongoUri),
      ...sentinels.map(({ host, port }) => ({ host, port })),
    ]);
    connection = await mongoose
      .createConnection(mongoUri, {
        serverSelectionTimeoutMS: 20_000,
        maxPoolSize: 10,
        retryWrites: true,
      })
      .asPromise();
    const hello = await connection.db!.admin().command({ hello: 1 });
    expect(hello.setName).toBe('hypha-rs');
    expect(hello.isWritablePrimary).toBe(true);
    expect(hello.hosts).toHaveLength(3);
    topologyReady = true;
  });

  afterEach(async () => {
    if (!topologyReady) {
      prefixes.length = 0;
      redisNamespaces.length = 0;
      return;
    }
    if (connection?.readyState === 1 && connection.db) {
      const collections = await connection.db.collections();
      for (const collection of collections) {
        if (prefixes.some((prefix) => collection.collectionName.startsWith(prefix))) {
          await collection.drop();
        }
      }
    }
    const redis = redisClient();
    try {
      await redis.connect();
      for (const namespace of redisNamespaces) {
        let cursor = '0';
        do {
          const [next, keys] = await redis.scan(cursor, 'MATCH', namespace + '*', 'COUNT', 200);
          cursor = next;
          if (keys.length > 0) await redis.del(...keys);
        } while (cursor !== '0');
      }
    } finally {
      await closeRedis(redis);
    }
    prefixes.length = 0;
    redisNamespaces.length = 0;
  });

  afterAll(async () => {
    if (topologyReady) await connection?.close();
  });

  it('atomically commits record/history/outbox and retries transient and commit-timeout failures', async () => {
    const prefix = 'production_atomic_' + Date.now() + '_';
    prefixes.push(prefix);
    const provider = mongoProvider(connection, prefix);
    await provider.initialize(['records', 'history', 'outbox']);
    await provider.insert('outbox', { id: 'duplicate', state: 'existing' });

    await expect(
      provider.transaction(async (transaction) => {
        await transaction.insert('records', { id: 'rolled-back', value: 'record' });
        await transaction.insert('history', { id: 'rolled-back:v1', value: 'history' });
        await transaction.insert('outbox', { id: 'duplicate', state: 'new' });
      })
    ).rejects.toMatchObject({ code: 'MEMORY_REVISION_CONFLICT' });
    await expect(provider.get('records', 'rolled-back')).resolves.toBeNull();
    await expect(provider.get('history', 'rolled-back:v1')).resolves.toBeNull();

    const admin = connection.getClient().db('admin');
    await admin.command({
      configureFailPoint: 'failCommand',
      mode: { times: 1 },
      data: {
        failCommands: ['insert'],
        errorCode: 112,
        errorLabels: ['TransientTransactionError'],
      },
    });
    let transactionAttempts = 0;
    await provider.transaction(async (transaction) => {
      transactionAttempts += 1;
      await transaction.insert('records', { id: 'retried', transactionAttempts });
    });
    expect(transactionAttempts).toBeGreaterThan(1);
    await expect(provider.get('records', 'retried')).resolves.toMatchObject({ id: 'retried' });

    await admin.command({
      configureFailPoint: 'failCommand',
      mode: { times: 1 },
      data: {
        failCommands: ['commitTransaction'],
        errorCode: 64,
        errorLabels: ['UnknownTransactionCommitResult'],
      },
    });
    let commitCallbackCount = 0;
    await provider.transaction(async (transaction) => {
      commitCallbackCount += 1;
      await transaction.insert('outbox', { id: 'commit-retried', state: 'pending' });
    });
    expect(commitCallbackCount).toBe(1);
    await expect(provider.get('outbox', 'commit-retried')).resolves.toMatchObject({
      state: 'pending',
    });
  });

  it('recovers after primary stepdown and preserves majority-committed data', async () => {
    const prefix = 'production_stepdown_' + Date.now() + '_';
    prefixes.push(prefix);
    const provider = mongoProvider(connection, prefix);
    await provider.initialize(['records']);
    await provider.transaction((transaction) =>
      transaction.insert('records', { id: 'before-stepdown', value: 1 })
    );
    const before = await connection.db!.admin().command({ hello: 1 });
    await connection
      .getClient()
      .db('admin')
      .command({ replSetStepDown: 5, force: true })
      .catch(() => undefined);

    const after = await waitFor(
      () => connection.db!.admin().command({ hello: 1 }),
      (hello) => hello.isWritablePrimary === true && hello.primary !== before.primary,
      45_000
    );
    expect(after.primary).not.toBe(before.primary);
    await provider.transaction((transaction) =>
      transaction.insert('records', { id: 'after-stepdown', value: 2 })
    );
    await expect(provider.get('records', 'before-stepdown')).resolves.toMatchObject({ value: 1 });
    await expect(provider.get('records', 'after-stepdown')).resolves.toMatchObject({ value: 2 });
  });

  it('fences concurrent revisions and recovers unique scope-isolated outbox state after restart', async () => {
    const prefix = 'production_revision_' + Date.now() + '_';
    prefixes.push(prefix);
    const firstStore = mongoProvider(connection, prefix);
    const secondStore = mongoProvider(connection, prefix);
    await firstStore.initialize([
      'managed_memory_current',
      'managed_memory_versions',
      'managed_memory_index_outbox',
      'memory_idempotency_results',
    ]);
    const first = new NativeMemoryManagementProvider({
      profile: memoryProfileSpecExample,
      persistence: new StructuredMemoryPersistenceUnitOfWork({ provider: firstStore }),
    });
    const second = new NativeMemoryManagementProvider({
      profile: memoryProfileSpecExample,
      persistence: new StructuredMemoryPersistenceUnitOfWork({ provider: secondStore }),
    });
    const created = await first.add(addRequest('operation:production:create'));
    const memoryId = created.records[0]!.id;
    const updates = await Promise.allSettled([
      first.update({
        operationId: 'operation:production:update:first',
        principal: addRequest('unused').principal,
        scope: addRequest('unused').scope,
        profileRef: memoryProfileSpecExample,
        memoryId,
        expectedRevision: 1,
        patch: { content: 'first concurrent update' },
      }),
      second.update({
        operationId: 'operation:production:update:second',
        principal: addRequest('unused').principal,
        scope: addRequest('unused').scope,
        profileRef: memoryProfileSpecExample,
        memoryId,
        expectedRevision: 1,
        patch: { content: 'second concurrent update' },
      }),
    ]);
    expect(updates.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
    expect(updates.filter((result) => result.status === 'rejected')).toHaveLength(1);
    await expect(first.get({ memoryId, scope: addRequest('unused').scope })).resolves.toMatchObject(
      {
        revision: 2,
      }
    );

    const restartedConnection = await mongoose
      .createConnection(mongoUri, { serverSelectionTimeoutMS: 20_000, maxPoolSize: 4 })
      .asPromise();
    try {
      const restartedStore = mongoProvider(restartedConnection, prefix);
      const restarted = new NativeMemoryManagementProvider({
        profile: memoryProfileSpecExample,
        persistence: new StructuredMemoryPersistenceUnitOfWork({ provider: restartedStore }),
      });
      const other = await restarted.add(
        addRequest('operation:production:other-user', 'user:native-production:other')
      );
      expect(other.records[0]!.scope.userId).toBe('user:native-production:other');
      const outbox = await new StructuredMemoryIndexOutboxStore({
        provider: restartedStore,
      }).list();
      expect(new Set(outbox.map((record) => record.id)).size).toBe(outbox.length);
      expect(new Set(outbox.map((record) => record.scopeHash))).toEqual(
        new Set([
          hashMemoryScope(addRequest('unused').scope),
          hashMemoryScope(addRequest('unused', 'user:native-production:other').scope),
        ])
      );
      await expect(
        restarted.list({
          scope: addRequest('unused', 'user:native-production:other').scope,
          profileRef: memoryProfileSpecExample,
          pagination: { limit: 10 },
        })
      ).resolves.toMatchObject({
        records: [expect.objectContaining({ id: other.records[0]!.id })],
      });
    } finally {
      await restartedConnection.close();
    }
  });

  it('renews leases, takes over crashed workers and rejects stale fencing tokens', async () => {
    const prefix = 'production_lease_' + Date.now() + '_';
    prefixes.push(prefix);
    const provider = mongoProvider(connection, prefix);
    await provider.initialize(['memory_lifecycle_tasks', 'managed_memory_index_outbox']);
    const lifecycle = new StructuredMemoryLifecycleTaskStore({ store: provider });
    const outbox = new StructuredMemoryIndexOutboxStore({ provider });
    await lifecycle.enqueue(lifecycleTask('lifecycle:production'));
    await outbox.enqueue(outboxRecord('outbox:production'));

    const [leasedTask] = await lifecycle.lease(
      'retention',
      'worker:first',
      '2026-07-27T00:00:01.000Z',
      '2026-07-27T00:00:05.000Z',
      1
    );
    expect(
      await lifecycle.renew(
        leasedTask!.id,
        'worker:first',
        leasedTask!.leaseToken!,
        '2026-07-27T00:00:04.000Z',
        '2026-07-27T00:00:09.000Z'
      )
    ).toBe(true);
    await expect(
      lifecycle.lease(
        'retention',
        'worker:early',
        '2026-07-27T00:00:06.000Z',
        '2026-07-27T00:00:10.000Z',
        1
      )
    ).resolves.toEqual([]);
    const [taskTakeover] = await lifecycle.lease(
      'retention',
      'worker:recovery',
      '2026-07-27T00:00:10.000Z',
      '2026-07-27T00:00:20.000Z',
      1
    );
    expect(taskTakeover!.fencingToken).toBe(2);
    expect(
      await lifecycle.complete(
        leasedTask!.id,
        'worker:first',
        leasedTask!.leaseToken!,
        '2026-07-27T00:00:11.000Z'
      )
    ).toBe(false);
    expect(
      await lifecycle.complete(
        taskTakeover!.id,
        'worker:recovery',
        taskTakeover!.leaseToken!,
        '2026-07-27T00:00:11.000Z'
      )
    ).toBe(true);

    const [leasedOutbox] = await outbox.lease(
      'index:first',
      '2026-07-27T00:00:01.000Z',
      '2026-07-27T00:00:05.000Z',
      1
    );
    const [outboxTakeover] = await outbox.lease(
      'index:recovery',
      '2026-07-27T00:00:06.000Z',
      '2026-07-27T00:00:10.000Z',
      1
    );
    expect(outboxTakeover!.fencingToken).toBe(2);
    expect(
      await outbox.complete(
        leasedOutbox!.id,
        'index:first',
        leasedOutbox!.leaseToken!,
        '2026-07-27T00:00:07.000Z'
      )
    ).toBe(false);
    expect(
      await outbox.complete(
        outboxTakeover!.id,
        'index:recovery',
        outboxTakeover!.leaseToken!,
        '2026-07-27T00:00:07.000Z'
      )
    ).toBe(true);
  });

  it('survives Redis disconnect, script errors, key eviction and Sentinel failover', async () => {
    const namespace = 'hypha:native-production:redis:' + Date.now();
    redisNamespaces.push(namespace);
    const first = redisClient();
    const sentinel = new Redis(27301, topologyHost, {
      lazyConnect: true,
      maxRetriesPerRequest: 2,
    });
    sentinel.on('error', () => undefined);
    let recovered: Redis | undefined;
    try {
      await Promise.all([first.connect(), sentinel.connect()]);
      const store = new RedisWorkingMemoryStore({ client: first, namespace });
      const scope: ManagedMemoryScope = {
        userId: 'user:redis-production',
        workspaceId: 'workspace:redis-production',
      };
      await store.set({
        id: 'working:durable',
        scope,
        value: { generation: 1 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      await expect(
        first.eval("return redis.call('NO_SUCH_HYPHA_COMMAND')", 0)
      ).rejects.toBeTruthy();
      await expect(first.ping()).resolves.toBe('PONG');

      await waitFor(
        () => sentinel.call('SENTINEL', 'replicas', 'hypha-master'),
        sentinelHasHealthyReplica,
        60_000
      );
      const before = (await sentinel.call(
        'SENTINEL',
        'get-master-addr-by-name',
        'hypha-master'
      )) as [string, string];
      await first.call('WAIT', 1, 5_000);
      await sentinel.call('SENTINEL', 'failover', 'hypha-master');
      const after = await waitFor(
        () =>
          sentinel.call('SENTINEL', 'get-master-addr-by-name', 'hypha-master') as Promise<
            [string, string]
          >,
        (address) => address[1] !== before[1],
        45_000
      );
      expect(after[1]).not.toBe(before[1]);
      await waitFor(
        () => store.get(scope, 'working:durable'),
        (entry) => entry?.value != null,
        30_000
      );

      first.disconnect();
      recovered = redisClient();
      await recovered.connect();
      const recoveredStore = new RedisWorkingMemoryStore({ client: recovered, namespace });
      await expect(recoveredStore.get(scope, 'working:durable')).resolves.toMatchObject({
        value: { generation: 1 },
      });

      const info = await recovered.info('memory');
      const used = Number(/used_memory:(\d+)/u.exec(info)?.[1] ?? 0);
      await recovered.config('SET', 'maxmemory-policy', 'volatile-ttl');
      await recovered.config('SET', 'maxmemory', String(used + 512 * 1024));
      const evictedKey = namespace + ':eviction-target';
      await recovered.set(evictedKey, 'target', 'EX', 5);
      for (let index = 0; index < 2_000 && (await recovered.exists(evictedKey)); index += 1) {
        await recovered.set(namespace + ':filler:' + index, 'x'.repeat(8_192), 'EX', 300);
      }
      await expect(recovered.exists(evictedKey)).resolves.toBe(0);
      await recovered.config('SET', 'maxmemory', '0');
      await recovered.config('SET', 'maxmemory-policy', 'noeviction');
    } finally {
      await closeRedis(first);
      await closeRedis(recovered);
      await closeRedis(sentinel);
    }
  });

  it('reconciles Mongo/Redis failure windows and makes hard delete clear history, vector and Cache', async () => {
    const prefix = 'production_reconcile_' + Date.now() + '_';
    const namespace = 'hypha:native-production:reconcile:' + Date.now();
    prefixes.push(prefix);
    redisNamespaces.push(namespace);
    const structured = mongoProvider(connection, prefix);
    await structured.initialize([
      'managed_memory_current',
      'managed_memory_versions',
      'managed_memory_index_outbox',
      'memory_idempotency_results',
    ]);
    const persistence = new StructuredMemoryPersistenceUnitOfWork({ provider: structured });
    const native = new NativeMemoryManagementProvider({
      profile: memoryProfileSpecExample,
      persistence,
    });
    const redis = redisClient();
    await redis.connect();
    const working = new RedisWorkingMemoryStore({ client: redis, namespace });
    const cache = new RedisMemorySearchCacheStore({
      client: redis,
      namespace: namespace + ':cache',
    });
    const cached = composeMemorySearchCacheProvider({
      mode: 'enabled',
      provider: native,
      cache,
      providerRevision: memoryProfileSpecExample.revision!,
    });
    const vector = new InMemoryLocalVectorStoreAdapter(
      memoryProfileSpecExample.vectorStoreRefs![0]!.id
    );
    const worker = new IndexOutboxWorker({
      ownerId: 'worker:production-index',
      outboxStore: native.outboxStore,
      recordStore: native.recordStore,
      embeddingProvider: { embed: async () => [[1, 0, 0]] },
      vectorStores: [vector],
    });

    try {
      const request = addRequest('operation:production:reconcile');
      const created = await cached.add(request);
      const record = created.records[0]!;
      await worker.runOnce();
      await working.set({
        id: record.id,
        scope: request.scope,
        value: { memoryVersionId: record.versionId },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      await expect(
        cached.search({
          operationId: 'operation:production:cached-search',
          principal: request.principal,
          scope: request.scope,
          profileRef: memoryProfileSpecExample,
          query: 'native production',
          topK: 5,
          updateAccessStats: false,
        })
      ).resolves.toHaveLength(1);

      redis.disconnect();
      await expect(
        working.set({
          id: 'working:mongo-success-redis-failure',
          scope: request.scope,
          value: { memoryId: record.id },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      ).rejects.toBeTruthy();
      const recoveredRedis = redisClient();
      await recoveredRedis.connect();
      try {
        const recoveredWorking = new RedisWorkingMemoryStore({
          client: recoveredRedis,
          namespace,
        });
        const canonical = await native.get({ memoryId: record.id, scope: request.scope });
        expect(canonical).not.toBeNull();
        await recoveredWorking.set({
          id: 'working:mongo-success-redis-failure',
          scope: request.scope,
          value: { memoryId: canonical!.id, reconciled: true },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        await expect(
          native.update({
            operationId: 'operation:production:mongo-failure',
            principal: request.principal,
            scope: request.scope,
            profileRef: memoryProfileSpecExample,
            memoryId: record.id,
            expectedRevision: 999,
            patch: { content: 'must not commit' },
          })
        ).rejects.toMatchObject({ code: 'MEMORY_REVISION_CONFLICT' });
        await recoveredWorking.delete(request.scope, 'working:mongo-failure');
        await expect(
          recoveredWorking.get(request.scope, 'working:mongo-failure')
        ).resolves.toBeNull();

        const recoveredCache = new RedisMemorySearchCacheStore({
          client: recoveredRedis,
          namespace: namespace + ':cache',
        });
        const recoveredCached = composeMemorySearchCacheProvider({
          mode: 'enabled',
          provider: native,
          cache: recoveredCache,
          providerRevision: memoryProfileSpecExample.revision!,
        });
        await recoveredCached.delete({
          operationId: 'operation:production:hard-delete',
          principal: request.principal,
          scope: request.scope,
          profileRef: memoryProfileSpecExample,
          memoryIds: [record.id],
          mode: 'hard',
        });
        await worker.runOnce();
        await recoveredWorking.delete(request.scope, record.id);
        await expect(native.get({ memoryId: record.id, scope: request.scope })).resolves.toBeNull();
        await expect(
          native.history({
            operationId: 'operation:production:history-after-delete',
            principal: request.principal,
            scope: request.scope,
            profileRef: memoryProfileSpecExample,
            memoryId: record.id,
          })
        ).resolves.toEqual([]);
        await expect(
          vector.search({
            vector: [1, 0, 0],
            topK: 5,
            filter: { scopeHash: hashMemoryScope(request.scope) },
          })
        ).resolves.toEqual([]);
        await expect(
          recoveredCached.search({
            operationId: 'operation:production:search-after-delete',
            principal: request.principal,
            scope: request.scope,
            profileRef: memoryProfileSpecExample,
            query: 'native production',
            topK: 5,
            updateAccessStats: false,
          })
        ).resolves.toEqual([]);
        await expect(recoveredWorking.get(request.scope, record.id)).resolves.toBeNull();
        await expect(native.outboxStore.list()).resolves.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              operationId: 'operation:production:hard-delete',
              state: 'completed',
              action: 'delete',
            }),
          ])
        );
      } finally {
        await closeRedis(recoveredRedis);
      }
    } finally {
      await worker.stopAndDrain();
      await closeRedis(redis);
    }
  });
});

async function assertTopologyEndpointsReachable(
  endpoints: ReadonlyArray<{ host: string; port: number }>,
  timeoutMs = 5_000
): Promise<void> {
  const failures = (
    await Promise.all(
      endpoints.map(async (endpoint) => {
        try {
          await connectTcp(endpoint, timeoutMs);
          return undefined;
        } catch {
          return `${endpoint.host}:${endpoint.port}`;
        }
      })
    )
  ).filter((endpoint): endpoint is string => endpoint !== undefined);
  if (failures.length > 0) {
    throw new Error(
      `Native Memory production topology is unavailable at: ${failures.join(', ')}. ` +
        'Start configs/memory/native-production-test/compose.yaml before running this required gate.'
    );
  }
}

function connectTcp(endpoint: { host: string; port: number }, timeoutMs: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const socket = createNetConnection(endpoint);
    let settled = false;
    const finish = (error?: Error): void => {
      if (settled) return;
      settled = true;
      socket.removeAllListeners();
      socket.destroy();
      if (error) reject(error);
      else resolve();
    };
    socket.setTimeout(timeoutMs, () => finish(new Error('TCP preflight timed out.')));
    socket.once('connect', () => finish());
    socket.once('error', (error) => finish(error));
  });
}

function mongoEndpoints(uri: string): Array<{ host: string; port: number }> {
  const authority = uri
    .replace(/^mongodb(?:\+srv)?:\/\//u, '')
    .split('/')[0]
    ?.split('@')
    .at(-1);
  if (!authority) throw new Error('Native Memory MongoDB URI does not contain any hosts.');
  return authority.split(',').map((entry) => {
    const match = /^(?:\[([^\]]+)\]|([^:]+))(?::([0-9]+))?$/u.exec(entry);
    if (!match) throw new Error(`Native Memory MongoDB endpoint is invalid: ${entry}`);
    const port = Number(match[3] ?? 27017);
    if (!Number.isSafeInteger(port) || port < 1 || port > 65_535) {
      throw new Error(`Native Memory MongoDB port is invalid: ${entry}`);
    }
    return { host: match[1] ?? match[2]!, port };
  });
}
