import { describe, expect, it } from 'vitest';
import {
  MEMORYBANK_LOCAL_PROTOCOL,
  MemoryBankLocalClient,
  type Mem0HttpFetch,
  type Mem0HttpResponse,
} from './index';

function json(body: unknown): Mem0HttpResponse {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

describe('MemoryBankLocalClient', () => {
  it('negotiates the versioned local protocol and forwards its version header', async () => {
    const calls: Array<{ url: string; headers?: Record<string, string> }> = [];
    const fetcher: Mem0HttpFetch = async (url, init) => {
      calls.push({ url, headers: init?.headers });
      return json({ add: true, search: true, update: false });
    };
    const client = new MemoryBankLocalClient({
      baseUrl: 'http://memorybank.local',
      fetch: fetcher,
    });
    await expect(client.capabilities()).resolves.toMatchObject({
      add: true,
      search: true,
      update: false,
      decay: false,
    });
    expect(calls[0]).toMatchObject({
      url: 'http://memorybank.local/hypha-memorybank/v1/capabilities',
      headers: { 'MemoryBank-Protocol-Version': MEMORYBANK_LOCAL_PROTOCOL },
    });
  });

  it('normalizes revision conflicts during local transport', async () => {
    const fetcher: Mem0HttpFetch = async () => ({
      ok: false,
      status: 409,
      statusText: 'Conflict',
      json: async () => ({}),
      text: async () => '',
    });
    const client = new MemoryBankLocalClient({
      baseUrl: 'http://memorybank.local',
      fetch: fetcher,
    });
    await expect(client.capabilities()).rejects.toMatchObject({
      code: 'MEMORY_REVISION_CONFLICT',
      retryable: false,
    });
  });
  it('rejects unknown or non-boolean capability fields as protocol drift', async () => {
    const unknown = new MemoryBankLocalClient({
      baseUrl: 'http://memorybank.local',
      fetch: async () => json({ search: true, inventedCapability: true }),
    });
    await expect(unknown.capabilities()).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      details: { schemaDrift: true, capabilityNegotiation: true },
    });

    const invalid = new MemoryBankLocalClient({
      baseUrl: 'http://memorybank.local',
      fetch: async () => json({ search: 'yes' }),
    });
    await expect(invalid.capabilities()).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      details: { schemaDrift: true, capabilityNegotiation: true },
    });
  });
});
