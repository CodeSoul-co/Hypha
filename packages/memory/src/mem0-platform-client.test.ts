import { describe, expect, it } from 'vitest';
import {
  Mem0PlatformClient,
  memoryProfileSpecExample,
  type Mem0HttpFetch,
  type Mem0HttpResponse,
  type MemoryPrincipal,
  type ManagedMemoryScope,
} from './index';

const principal: MemoryPrincipal = {
  principalId: 'platform-user',
  type: 'user',
  userId: 'platform-user',
  permissionScopes: ['memory:read', 'memory:write'],
};
const scope: ManagedMemoryScope = { userId: 'platform-user', workspaceId: 'platform-app' };

function json(body: unknown, status = 200): Mem0HttpResponse {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: String(status),
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

describe('Mem0PlatformClient', () => {
  it('uses v3 add with Token auth and returns an asynchronous receipt', async () => {
    const calls: Array<{ url: string; method?: string; headers?: Record<string, string> }> = [];
    const fetcher: Mem0HttpFetch = async (url, init) => {
      calls.push({ url, method: init?.method, headers: init?.headers });
      return json({ status: 'PENDING', event_id: 'event-1' });
    };
    const client = new Mem0PlatformClient({ apiToken: 'secret-ref-value', fetch: fetcher });
    const result = await client.add({
      operationId: 'op-1',
      principal,
      scope,
      input: 'Remember blue',
      source: {
        type: 'user_message',
        sourceId: 'message-1',
      },
      profileRef: memoryProfileSpecExample,
    });
    expect(result).toMatchObject({ status: 'queued', events: ['event-1'] });
    expect(calls[0]).toMatchObject({
      url: 'https://api.mem0.ai/v3/memories/add/',
      method: 'POST',
      headers: { Authorization: 'Token secret-ref-value' },
    });
  });

  it('maps v3 search entity ids inside filters and normalizes rate limits', async () => {
    let body: Record<string, unknown> = {};
    const fetcher: Mem0HttpFetch = async (_url, init) => {
      body = JSON.parse(init?.body ?? '{}') as Record<string, unknown>;
      return json([], 429);
    };
    const client = new Mem0PlatformClient({ apiToken: 'token', fetch: fetcher });
    await expect(
      client.search({
        operationId: 'op-search',
        principal,
        scope,
        profileRef: memoryProfileSpecExample,
        query: 'blue',
        topK: 7,
      })
    ).rejects.toMatchObject({ code: 'MEMORY_PROVIDER_UNAVAILABLE', retryable: true });
    expect(body).toMatchObject({ filters: { user_id: 'platform-user' }, top_k: 7 });
  });
});
