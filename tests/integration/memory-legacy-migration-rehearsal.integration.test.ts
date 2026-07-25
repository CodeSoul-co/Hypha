import { randomUUID } from 'crypto';
import { MemoryServerMigrationRehearsal } from '@hypha/memory';
import application from '../../apps/server/src/app';
import { getPermanentMemory } from '../../apps/server/src/core/memory/PermanentMemory';
import { getTemporaryMemory } from '../../apps/server/src/core/memory/TemporaryMemory';
import {
  getMemoryApplicationService,
  getServerMemoryComposition,
} from '../../apps/server/src/services/ServerMemoryComposition';
import {
  MongoServerMemoryMigrationCheckpointStore,
  ServerCanonicalMemoryMigrationDataPort,
  ServerLegacyMemoryMigrationSource,
} from '../../apps/server/src/services/ServerMemoryMigrationRehearsal';
import { getMongoConnection } from '../../apps/server/src/services/database';

jest.setTimeout(90_000);

describe('real legacy Memory migration rehearsal', () => {
  beforeAll(async () => {
    await application.initialize();
  });

  afterAll(async () => {
    await application.stop();
  });

  it('copies and reconciles Redis/Mongo data, then rolls back after restart', async () => {
    const fixture = await createFixture('rollback');
    try {
      const firstProcess = new MemoryServerMigrationRehearsal(fixture.data, fixture.store());
      const prepared = await firstProcess.prepare(fixture.prepareInput);
      expect(prepared.state).toMatchObject({
        phase: 'cutover',
        activePath: 'canonical',
        reconciliation: { status: 'passed', mismatchCount: 0 },
      });
      expect(prepared.importedCanonicalIds.length).toBeGreaterThanOrEqual(4);

      const restartedProcess = new MemoryServerMigrationRehearsal(fixture.data, fixture.store());
      const rolledBack = await restartedProcess.rollback({
        migrationId: fixture.migrationId,
        expectedRevision: fixture.revision,
        occurredAt: plusSeconds(fixture.startedAt, 3),
      });
      expect(rolledBack.state).toMatchObject({ phase: 'rollback', activePath: 'legacy' });
      await expect(fixture.data.listCanonical()).resolves.toHaveLength(0);
      expect((await fixture.source.list()).length).toBeGreaterThanOrEqual(4);

      const persisted = await fixture.store().load(fixture.migrationId);
      expect(persisted?.state.phase).toBe('rollback');
    } finally {
      await fixture.cleanup();
    }
  });

  it('retires only after a zero-traffic observation and closed rollback window', async () => {
    const fixture = await createFixture('retire');
    try {
      const rehearsal = new MemoryServerMigrationRehearsal(fixture.data, fixture.store());
      const prepared = await rehearsal.prepare(fixture.prepareInput);
      expect(prepared.state.phase).toBe('cutover');

      fixture.data.beginRetirementObservation();
      const retired = await new MemoryServerMigrationRehearsal(
        fixture.data,
        fixture.store()
      ).retire({
        migrationId: fixture.migrationId,
        expectedRevision: fixture.revision,
        occurredAt: plusSeconds(fixture.startedAt, 5),
        rollbackWindowEndsAt: plusSeconds(fixture.startedAt, 4),
      });
      expect(retired.state).toMatchObject({
        phase: 'retire',
        activePath: 'canonical',
        retirement: {
          legacyReadTraffic: 0,
          legacyWriteTraffic: 0,
          legacyImports: 0,
          legacyRegistrations: 0,
        },
      });
      expect(await fixture.data.listCanonical()).toHaveLength(retired.importedCanonicalIds.length);
    } finally {
      await fixture.cleanup();
    }
  });
});

async function createFixture(kind: string) {
  const suffix = randomUUID();
  const userId = `migration-user-${suffix}`;
  const sessionId = `migration-session-${suffix}`;
  const migrationId = `server-memory-${kind}-${suffix}`;
  const revision = `revision-${suffix}`;
  const startedAt = new Date().toISOString();
  const temporary = getTemporaryMemory();
  const permanent = getPermanentMemory();

  await temporary.addMessage(sessionId, {
    userId,
    sessionId,
    role: 'user',
    content: `legacy Redis message ${suffix}`,
    metadata: { fixture: suffix },
  });
  const conversation = await permanent.createConversation({
    userId,
    sessionId,
    agentId: 'migration-agent',
    modelId: 'migration-model',
    modelProvider: 'migration-provider',
    title: `Legacy conversation ${suffix}`,
    tags: ['migration-fixture'],
    isArchived: false,
  });
  await permanent.addMessage(conversation.id, {
    role: 'assistant',
    content: `legacy Mongo message ${suffix}`,
    metadata: { fixture: suffix },
  });

  const source = new ServerLegacyMemoryMigrationSource(
    { temporary, permanent },
    userId,
    `migration-probe-${suffix}`
  );
  const data = new ServerCanonicalMemoryMigrationDataPort({
    migrationId,
    userId,
    source,
    service: getMemoryApplicationService,
    profileRef: () => getServerMemoryComposition().profileRef(),
  });
  const collection = requiredDatabase().collection('memory_migration_rehearsal_checkpoints');
  const store = () => new MongoServerMemoryMigrationCheckpointStore(collection as never);
  let importedIds: readonly string[] = [];

  return {
    migrationId,
    revision,
    startedAt,
    source,
    data,
    store,
    prepareInput: {
      migrationId,
      revision,
      occurredAt: startedAt,
      dualWriteDeadlineAt: plusSeconds(startedAt, 30),
      checkpointRef: `mongodb:memory-migration:${migrationId}`,
    },
    cleanup: async () => {
      const checkpoint = await store().load(migrationId);
      importedIds = checkpoint?.importedCanonicalIds ?? importedIds;
      await data.removeCanonical(importedIds).catch(() => undefined);
      const sessions = await temporary.getAllSessions(userId).catch(() => []);
      for (const id of sessions) {
        await temporary.clearMessages(id, userId).catch(() => undefined);
      }
      const conversations = await permanent
        .listConversations(userId, { page: 1, pageSize: 10_000 })
        .catch(() => []);
      for (const item of conversations) {
        await permanent.deleteConversation(item.id).catch(() => undefined);
      }
      await collection.deleteOne({ _id: migrationId }).catch(() => undefined);
    },
  };
}

function requiredDatabase() {
  const database = getMongoConnection()?.connection.db;
  if (!database) throw new Error('MongoDB is not initialized for migration rehearsal.');
  return database;
}

function plusSeconds(value: string, seconds: number) {
  return new Date(new Date(value).getTime() + seconds * 1_000).toISOString();
}
