import type {
  ManagedMemoryRecord,
  MemoryApplicationService,
  MemoryContractSpecRef,
} from '@hypha/memory';
import { ServerMemoryOperations } from './ServerMemoryOperations';

const profileRef: MemoryContractSpecRef = {
  id: 'native-test',
  version: '1.0.0',
};

function record(overrides: Partial<ManagedMemoryRecord> = {}): ManagedMemoryRecord {
  return {
    id: 'memory-1',
    versionId: 'memory-1:v1',
    revision: 1,
    type: 'working',
    content: 'hello',
    canonicalText: 'hello',
    scope: { userId: 'user-1' },
    visibility: 'private',
    source: { type: 'user_message' },
    provenance: {
      createdBy: 'user:user-1',
      providerId: 'memory.provider.native-test',
      createdAt: '2026-07-24T00:00:00.000Z',
    },
    accessCount: 0,
    status: 'active',
    tags: ['hypha:chat-message', 'session:session-1', 'role:user'],
    indexStatus: { state: 'pending', attempts: 0 },
    contentHash: 'sha256:content',
    scopeHash: 'sha256:scope',
    createdAt: '2026-07-24T00:00:00.000Z',
    updatedAt: '2026-07-24T00:00:00.000Z',
    metadata: { sessionId: 'session-1', role: 'user' },
    ...overrides,
  };
}

function serviceFixture() {
  const add = jest.fn(async () => ({
    operationId: 'write',
    status: 'committed' as const,
    records: [record()],
  }));
  const list = jest.fn(async () => ({
    records: [record()],
    hasMore: false,
  }));
  const remove = jest.fn(async () => ({
    operationId: 'delete',
    status: 'completed' as const,
    deletedMemoryIds: ['memory-1'],
  }));
  return {
    add,
    list,
    delete: remove,
    service: { add, list, delete: remove } as unknown as MemoryApplicationService,
  };
}

describe('ServerMemoryOperations', () => {
  it('maps chat writes to the canonical service with user isolation and a unique key', async () => {
    const fixture = serviceFixture();
    const operations = new ServerMemoryOperations(
      () => fixture.service,
      () => profileRef
    );

    await operations.addMessage('session-1', {
      userId: 'user-1',
      sessionId: 'session-1',
      role: 'user',
      content: 'hello',
    });

    expect(fixture.add).toHaveBeenCalledTimes(1);
    expect((fixture.add.mock.calls as unknown as Array<[Record<string, any>]>)[0][0]).toMatchObject(
      {
        principal: { principalId: 'user:user-1', userId: 'user-1' },
        scope: { userId: 'user-1' },
        profileRef,
        memoryType: 'working',
        source: { type: 'user_message' },
        tags: ['hypha:chat-message', 'session:session-1', 'role:user'],
      }
    );
    expect(
      (fixture.add.mock.calls as unknown as Array<[Record<string, any>]>)[0][0].metadata
        ?.canonicalKey
    ).toMatch(/^chat-message:/);
  });

  it('maps session reads and deletes to tag-filtered canonical operations', async () => {
    const fixture = serviceFixture();
    const operations = new ServerMemoryOperations(
      () => fixture.service,
      () => profileRef
    );

    await expect(operations.getMessages('session-1', 10, 'user-1')).resolves.toMatchObject([
      { id: 'memory-1', userId: 'user-1', sessionId: 'session-1', content: 'hello' },
    ]);
    await operations.clearMessages('session-1', 'user-1');

    expect(
      (fixture.list.mock.calls as unknown as Array<[Record<string, any>]>)[0][0]
    ).toMatchObject({
      principal: { userId: 'user-1' },
      scope: { userId: 'user-1' },
      filter: { tagsAll: ['hypha:chat-message', 'session:session-1'] },
    });
    expect(
      (fixture.delete.mock.calls as unknown as Array<[Record<string, any>]>)[0][0]
    ).toMatchObject({
      principal: { userId: 'user-1' },
      scope: { userId: 'user-1' },
      filter: { tagsAll: ['hypha:chat-message', 'session:session-1'] },
      mode: 'soft',
    });
  });
});
