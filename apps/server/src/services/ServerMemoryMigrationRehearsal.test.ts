import type { Collection } from 'mongodb';
import type { TempMessage } from '../core/llm/types';
import type {
  ManagedMemoryRecord,
  MemoryApplicationService,
  MemoryServerMigrationRehearsalCheckpoint,
} from '@hypha/memory';
import {
  MongoServerMemoryMigrationCheckpointStore,
  ServerCanonicalMemoryMigrationDataPort,
  ServerLegacyMemoryMigrationSource,
} from './ServerMemoryMigrationRehearsal';

describe('Server Memory migration rehearsal adapters', () => {
  it('maps isolated Redis/Mongo legacy records into the canonical service', async () => {
    const temporaryMessages: TempMessage[] = [
      tempMessage('temp-1', 'session-1', 'legacy temporary message'),
    ];
    const source = new ServerLegacyMemoryMigrationSource(
      {
        temporary: {
          getAllSessions: async () => ['session-1'],
          getMessages: async (sessionId) =>
            temporaryMessages.filter((message) => message.sessionId === sessionId),
          addMessage: async (sessionId, message) => {
            temporaryMessages.push({
              ...message,
              id: `probe-${temporaryMessages.length}`,
              sessionId,
              timestamp: new Date('2026-07-25T01:00:00.000Z'),
            });
          },
        },
        permanent: {
          listConversations: async () => [conversation()],
          getMessages: async () => [permanentMessage()],
        },
      },
      'user-1',
      'migration-probe-session'
    );
    const service = canonicalService();
    const port = new ServerCanonicalMemoryMigrationDataPort({
      migrationId: 'migration-1',
      userId: 'user-1',
      source,
      service: () => service.api,
      profileRef: () => ({ id: 'native-default', version: '1.0.0' }),
    });

    const legacy = await port.listLegacy();
    expect(() => structuredClone(legacy)).not.toThrow();
    expect(legacy.map((record) => record.key)).toEqual([
      'conversation:conversation-1',
      'permanent-message:permanent-1',
      'temporary-message:temp-1',
    ]);
    for (const record of legacy) {
      await port.importCanonical(record, `import:${record.key}`);
    }
    const probe = await port.writeDualProbe('dual-probe');
    expect(probe.record.key).toContain('temporary-message:probe-');
    expect(await port.listCanonical()).toHaveLength(4);

    port.beginRetirementObservation();
    await expect(port.observeRetirement()).resolves.toEqual({
      legacyReadTraffic: 0,
      legacyWriteTraffic: 0,
      legacyImports: 0,
      legacyRegistrations: 0,
    });
    await port.removeCanonical([...service.records.values()].map((record) => record.id));
    expect(await port.listCanonical()).toHaveLength(0);
  });

  it('persists and reloads checkpoints through a Mongo collection', async () => {
    let document: { _id: string; checkpoint: MemoryServerMigrationRehearsalCheckpoint } | null =
      null;
    const collection = {
      findOne: async () => document,
      updateOne: async (filter: { _id: string }, update: { $set: any }) => {
        document = { _id: filter._id, checkpoint: update.$set.checkpoint };
      },
    } as unknown as Collection<any>;
    const store = new MongoServerMemoryMigrationCheckpointStore(collection);
    const checkpoint = {
      state: {
        migrationId: 'migration-1',
        revision: 'revision-1',
        phase: 'planned' as const,
        activePath: 'legacy' as const,
        updatedAt: '2026-07-25T00:00:00.000Z',
        reconciliation: {
          status: 'not_run' as const,
          comparedRecords: 0,
          mismatchCount: 0,
          shadowResult: 'not_run' as const,
        },
      },
      events: [],
      importedCanonicalIds: [],
      reconciliation: {
        status: 'not_run' as const,
        comparedRecords: 0,
        mismatchCount: 0,
        shadowResult: 'not_run' as const,
      },
    };
    await store.save('migration-1', checkpoint);
    await expect(store.load('migration-1')).resolves.toEqual(checkpoint);
  });
});

function canonicalService() {
  const records = new Map<string, ManagedMemoryRecord>();
  let sequence = 0;
  const api = {
    add: async (request: any) => {
      const id = `canonical-${++sequence}`;
      const now = '2026-07-25T01:00:00.000Z';
      const record = {
        id,
        versionId: `${id}:v1`,
        revision: 1,
        type: request.memoryType,
        status: 'active',
        scope: request.scope,
        content: request.input,
        canonicalText: JSON.stringify(request.input),
        tags: request.tags,
        metadata: request.metadata,
        source: request.source,
        provenance: { createdBy: 'test', providerId: 'native' },
        createdAt: now,
        updatedAt: now,
      } as ManagedMemoryRecord;
      records.set(id, record);
      return { status: 'completed', records: [record] };
    },
    list: async (request: any) => ({
      records: [...records.values()].filter((record) =>
        request.filter.tagsAll.every((tag: string) => record.tags?.includes(tag))
      ),
    }),
    delete: async (request: any) => {
      for (const id of request.memoryIds) records.delete(id);
      return { status: 'completed', deletedIds: request.memoryIds };
    },
  } as unknown as MemoryApplicationService;
  return { api, records };
}

function tempMessage(id: string, sessionId: string, content: string) {
  return {
    id,
    userId: 'user-1',
    sessionId,
    role: 'user' as const,
    content,
    timestamp: new Date('2026-07-25T00:00:00.000Z'),
    metadata: {},
  };
}

function conversation() {
  return {
    id: 'conversation-1',
    userId: 'user-1',
    sessionId: 'session-1',
    agentId: 'agent-1',
    modelId: 'model-1',
    modelProvider: 'provider-1',
    title: 'Legacy conversation',
    tags: new Proxy(['legacy-tag'], {}),
    createdAt: new Date('2026-07-25T00:00:00.000Z'),
    updatedAt: new Date('2026-07-25T00:00:00.000Z'),
    isArchived: false,
  };
}

function permanentMessage() {
  return {
    id: 'permanent-1',
    conversationId: 'conversation-1',
    role: 'assistant' as const,
    content: 'legacy permanent message',
    timestamp: new Date('2026-07-25T00:01:00.000Z'),
    metadata: new Proxy({ legacy: true }, {}),
  };
}
