import { describe, expect, it } from 'vitest';
import {
  MemoryBankManagedClient,
  memoryProfileSpecExample,
  type Mem0HttpFetch,
  type Mem0HttpResponse,
  type MemoryPrincipal,
} from './index';

const principal: MemoryPrincipal = {
  principalId: 'u1',
  type: 'user',
  userId: 'u1',
  permissionScopes: ['memory:read', 'memory:write'],
};
function json(body: unknown): Mem0HttpResponse {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

describe('MemoryBankManagedClient', () => {
  it('uses Vertex resource identity, OAuth, exact scope and async receipts', async () => {
    let call:
      | { url: string; headers?: Record<string, string>; body?: Record<string, unknown> }
      | undefined;
    const fetcher: Mem0HttpFetch = async (url, init) => {
      call = {
        url,
        headers: init?.headers,
        body: JSON.parse(init?.body ?? '{}') as Record<string, unknown>,
      };
      return json({ name: 'operations/write-1', done: false });
    };
    const client = new MemoryBankManagedClient({
      projectId: 'project',
      location: 'us-central1',
      reasoningEngineId: 'engine',
      accessToken: 'oauth-token',
      mappingProfile: 'test',
      fetch: fetcher,
    });
    const result = await client.add({
      operationId: 'write-1',
      principal,
      scope: { userId: 'u1', workspaceId: 'w1' },
      input: 'User likes blue',
      source: { type: 'user_message', sourceId: 'm1' },
      profileRef: memoryProfileSpecExample,
    });
    expect(result).toMatchObject({ status: 'queued', events: ['operations/write-1'] });
    expect(call).toMatchObject({
      url: 'https://us-central1-aiplatform.googleapis.com/v1/projects/project/locations/us-central1/reasoningEngines/engine/memories:generate',
      headers: { Authorization: 'Bearer oauth-token' },
      body: { scope: { user_id: 'u1', workspace_id: 'w1' } },
    });
  });

  it('rejects insecure managed endpoints and missing credentials', () => {
    expect(
      () =>
        new MemoryBankManagedClient({
          projectId: 'p',
          location: 'l',
          reasoningEngineId: 'e',
          accessToken: 'token',
          mappingProfile: 'test',
          baseUrl: 'http://managed.example',
        })
    ).toThrow();
    expect(
      () =>
        new MemoryBankManagedClient({
          projectId: 'p',
          location: 'l',
          reasoningEngineId: 'e',
          accessToken: '',
        })
    ).toThrow();
  });
  it('sends an exact-scope list filter', async () => {
    let requestedUrl = '';
    const client = new MemoryBankManagedClient({
      projectId: 'project',
      location: 'us-central1',
      reasoningEngineId: 'engine',
      accessToken: 'oauth-token',
      mappingProfile: 'test',
      fetch: async (url) => {
        requestedUrl = url;
        return json({ memories: [] });
      },
    });

    await client.list({
      operationId: 'list:scope-filter',
      principal,
      scope: { userId: 'u1', workspaceId: 'w1' },
    });
    expect(new URL(requestedUrl).searchParams.get('filter')).toBe(
      'scope = "{\\"user_id\\":\\"u1\\",\\"workspace_id\\":\\"w1\\"}"'
    );
  });

  it('persists and resumes Vertex update LROs instead of parsing an operation as a memory', async () => {
    const memoryName =
      'projects/project/locations/us-central1/reasoningEngines/engine/memories/memory-1';
    const calls: string[] = [];
    const client = new MemoryBankManagedClient({
      projectId: 'project',
      location: 'us-central1',
      reasoningEngineId: 'engine',
      accessToken: 'oauth-token',
      mappingProfile: 'test',
      fetch: async (url, init) => {
        calls.push(`${init?.method ?? 'GET'} ${url}`);
        if (url.endsWith('/memories:generate')) {
          return json({
            done: true,
            response: {
              generatedMemories: [
                {
                  memory: {
                    name: memoryName,
                    fact: 'Before',
                    scope: { user_id: 'u1', workspace_id: 'w1' },
                  },
                },
              ],
            },
          });
        }
        if (url.endsWith('?updateMask=fact')) {
          return json({ name: 'operations/update-1', done: false });
        }
        if (url.endsWith('/operations/update-1')) {
          return json({
            name: 'operations/update-1',
            done: true,
            response: {
              name: memoryName,
              fact: 'After',
              scope: { user_id: 'u1', workspace_id: 'w1' },
            },
          });
        }
        throw new Error(`Unexpected request: ${url}`);
      },
    });
    const added = await client.add({
      operationId: 'add-for-update',
      principal,
      scope: { userId: 'u1', workspaceId: 'w1' },
      input: 'Before',
      source: { type: 'user_message', sourceId: 'message-1' },
      profileRef: memoryProfileSpecExample,
    });
    const memoryId = added.records[0]?.id;
    expect(memoryId).toBeTruthy();
    const request = {
      operationId: 'update-1',
      principal,
      scope: { userId: 'u1', workspaceId: 'w1' },
      memoryId: memoryId!,
      patch: { canonicalText: 'After' },
      reason: 'correct fact',
    };
    await expect(client.update(request)).resolves.toMatchObject({
      status: 'queued',
      events: ['operations/update-1'],
    });
    await expect(client.update(request)).resolves.toMatchObject({
      status: 'committed',
      records: [{ canonicalText: 'After' }],
    });
    expect(calls.filter((call) => call.includes('?updateMask=fact'))).toHaveLength(1);
  });

  it('keeps Vertex deletes pending until every LRO supplies provider evidence', async () => {
    const memoryName =
      'projects/project/locations/us-central1/reasoningEngines/engine/memories/memory-2';
    let deleteRequests = 0;
    let pollRequests = 0;
    const client = new MemoryBankManagedClient({
      projectId: 'project',
      location: 'us-central1',
      reasoningEngineId: 'engine',
      accessToken: 'oauth-token',
      mappingProfile: 'test',
      fetch: async (url, init) => {
        if (url.endsWith('/memories:generate')) {
          return json({
            done: true,
            response: {
              generatedMemories: [
                {
                  memory: {
                    name: memoryName,
                    fact: 'Delete me',
                    scope: { user_id: 'u1', workspace_id: 'w1' },
                  },
                },
              ],
            },
          });
        }
        if (url.endsWith('/operations/delete-1')) {
          pollRequests += 1;
          return json({ name: 'operations/delete-1', done: true, response: {} });
        }
        if (url.endsWith('/memories/memory-2') && init?.method === 'DELETE') {
          deleteRequests += 1;
          return json({ name: 'operations/delete-1', done: false });
        }
        throw new Error(`Unexpected request: ${url}`);
      },
    });
    const added = await client.add({
      operationId: 'add-for-delete',
      principal,
      scope: { userId: 'u1', workspaceId: 'w1' },
      input: 'Delete me',
      source: { type: 'user_message', sourceId: 'message-2' },
      profileRef: memoryProfileSpecExample,
    });
    const memoryId = added.records[0]?.id;
    expect(memoryId).toBeTruthy();
    const request = {
      operationId: 'delete-1',
      principal,
      scope: { userId: 'u1', workspaceId: 'w1' },
      memoryIds: [memoryId!],
      mode: 'hard' as const,
      reason: 'user request',
    };
    await expect(client.delete(request)).resolves.toMatchObject({
      status: 'partial',
      deletedMemoryIds: [],
      pendingProviderIds: ['memory.provider.memorybank.vertex-ai'],
      events: ['operations/delete-1'],
    });
    await expect(client.delete(request)).resolves.toMatchObject({
      status: 'completed',
      deletedMemoryIds: [memoryId],
    });
    await expect(client.delete(request)).resolves.toMatchObject({
      status: 'completed',
      deletedMemoryIds: [memoryId],
    });
    expect(deleteRequests).toBe(1);
    expect(pollRequests).toBe(1);
  });
});
