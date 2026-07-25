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
});
