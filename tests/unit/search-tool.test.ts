import http from 'http';
import type { AddressInfo } from 'net';
import SearchTool from '../../apps/server/src/core/tools/builtins/SearchTool';

const originalEnv = {
  WEB_SEARCH_PROVIDER: process.env.WEB_SEARCH_PROVIDER,
  WEB_SEARCH_ENDPOINT: process.env.WEB_SEARCH_ENDPOINT,
  WEB_SEARCH_DUCKDUCKGO_ENDPOINT: process.env.WEB_SEARCH_DUCKDUCKGO_ENDPOINT,
  WEB_SEARCH_WIKIPEDIA_ENDPOINT: process.env.WEB_SEARCH_WIKIPEDIA_ENDPOINT,
  WEB_SEARCH_TIMEOUT_MS: process.env.WEB_SEARCH_TIMEOUT_MS,
  WEB_SEARCH_USER_AGENT: process.env.WEB_SEARCH_USER_AGENT,
};

afterEach(() => {
  restoreEnv();
});

describe('SearchTool', () => {
  it('uses the deterministic offline provider by default', async () => {
    delete process.env.WEB_SEARCH_PROVIDER;
    const tool = new SearchTool();

    const result = await tool.execute({ query: 'hypha', limit: 2 });

    expect(result.success).toBe(true);
    expect(result.output).toMatchObject({
      query: 'hypha',
      count: 2,
      provider: 'stub',
    });
    expect(result.output.items).toHaveLength(2);
  });

  it('calls the configured DuckDuckGo-compatible HTTP endpoint', async () => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url || '/', 'http://127.0.0.1');
      expect(url.searchParams.get('q')).toBe('hypha');
      expect(url.searchParams.get('format')).toBe('json');
      expect(url.searchParams.get('no_html')).toBe('1');
      res.setHeader('content-type', 'application/json');
      res.end(
        JSON.stringify({
          Heading: 'Hypha',
          AbstractText: 'Hypha is a harness-oriented agent system.',
          AbstractURL: 'https://example.com/hypha',
          AbstractSource: 'fixture',
          RelatedTopics: [
            {
              Text: 'Hypha docs - Runtime and harness documentation.',
              FirstURL: 'https://example.com/hypha/docs',
            },
          ],
        })
      );
    });
    const endpoint = await listen(server);
    process.env.WEB_SEARCH_PROVIDER = 'duckduckgo';
    process.env.WEB_SEARCH_ENDPOINT = endpoint;
    process.env.WEB_SEARCH_TIMEOUT_MS = '1000';

    try {
      const result = await new SearchTool().execute({ query: 'hypha', limit: 2 });

      expect(result.success).toBe(true);
      expect(result.output).toMatchObject({
        query: 'hypha',
        count: 2,
        provider: 'duckduckgo',
      });
      expect(result.output.items).toEqual([
        expect.objectContaining({
          title: 'Hypha',
          url: 'https://example.com/hypha',
          source: 'fixture',
        }),
        expect.objectContaining({
          title: 'Hypha docs',
          url: 'https://example.com/hypha/docs',
          source: 'duckduckgo.related_topic',
        }),
      ]);
    } finally {
      await close(server);
    }
  });

  it('calls the configured Wikipedia OpenSearch-compatible HTTP endpoint', async () => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url || '/', 'http://127.0.0.1');
      expect(url.searchParams.get('action')).toBe('opensearch');
      expect(url.searchParams.get('search')).toBe('hypha');
      expect(url.searchParams.get('limit')).toBe('2');
      expect(url.searchParams.get('format')).toBe('json');
      res.setHeader('content-type', 'application/json');
      res.end(
        JSON.stringify([
          'hypha',
          ['Hypha', 'Hypha architecture'],
          [
            'Hypha is a branching filamentous structure.',
            'Hypha architecture describes a harness-oriented runtime.',
          ],
          ['https://en.wikipedia.org/wiki/Hypha', 'https://example.com/hypha-architecture'],
        ])
      );
    });
    const endpoint = await listen(server);
    process.env.WEB_SEARCH_PROVIDER = 'wikipedia';
    process.env.WEB_SEARCH_ENDPOINT = 'https://api.duckduckgo.com/';
    process.env.WEB_SEARCH_WIKIPEDIA_ENDPOINT = endpoint;
    process.env.WEB_SEARCH_TIMEOUT_MS = '1000';

    try {
      const result = await new SearchTool().execute({ query: 'hypha', limit: 2 });

      expect(result.success).toBe(true);
      expect(result.output).toMatchObject({
        query: 'hypha',
        count: 2,
        provider: 'wikipedia',
      });
      expect(result.output.items).toEqual([
        expect.objectContaining({
          title: 'Hypha',
          url: 'https://en.wikipedia.org/wiki/Hypha',
          source: 'wikipedia.opensearch',
        }),
        expect.objectContaining({
          title: 'Hypha architecture',
          url: 'https://example.com/hypha-architecture',
          source: 'wikipedia.opensearch',
        }),
      ]);
    } finally {
      await close(server);
    }
  });
});

function restoreEnv(): void {
  setOptionalEnv('WEB_SEARCH_PROVIDER', originalEnv.WEB_SEARCH_PROVIDER);
  setOptionalEnv('WEB_SEARCH_ENDPOINT', originalEnv.WEB_SEARCH_ENDPOINT);
  setOptionalEnv('WEB_SEARCH_DUCKDUCKGO_ENDPOINT', originalEnv.WEB_SEARCH_DUCKDUCKGO_ENDPOINT);
  setOptionalEnv('WEB_SEARCH_WIKIPEDIA_ENDPOINT', originalEnv.WEB_SEARCH_WIKIPEDIA_ENDPOINT);
  setOptionalEnv('WEB_SEARCH_TIMEOUT_MS', originalEnv.WEB_SEARCH_TIMEOUT_MS);
  setOptionalEnv('WEB_SEARCH_USER_AGENT', originalEnv.WEB_SEARCH_USER_AGENT);
}

function setOptionalEnv(name: string, value: string | undefined): void {
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }
}

function listen(server: http.Server): Promise<string> {
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', reject);
      const address = server.address() as AddressInfo;
      resolve(`http://127.0.0.1:${address.port}/`);
    });
  });
}

function close(server: http.Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}
