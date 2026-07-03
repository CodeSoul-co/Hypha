import http from 'http';
import type { AddressInfo } from 'net';
import SearchTool from '../../apps/server/src/core/tools/builtins/SearchTool';

const originalEnv = {
  WEB_SEARCH_PROVIDER: process.env.WEB_SEARCH_PROVIDER,
  WEB_SEARCH_ENDPOINT: process.env.WEB_SEARCH_ENDPOINT,
  WEB_SEARCH_DUCKDUCKGO_ENDPOINT: process.env.WEB_SEARCH_DUCKDUCKGO_ENDPOINT,
  WEB_SEARCH_WIKIPEDIA_ENDPOINT: process.env.WEB_SEARCH_WIKIPEDIA_ENDPOINT,
  WEB_SEARCH_BAIDU_SUGGEST_ENDPOINT: process.env.WEB_SEARCH_BAIDU_SUGGEST_ENDPOINT,
  WEB_SEARCH_SO360_SUGGEST_ENDPOINT: process.env.WEB_SEARCH_SO360_SUGGEST_ENDPOINT,
  WEB_SEARCH_PROVIDER_ORDER: process.env.WEB_SEARCH_PROVIDER_ORDER,
  WEB_SEARCH_CHINA_PROVIDER_ORDER: process.env.WEB_SEARCH_CHINA_PROVIDER_ORDER,
  WEB_SEARCH_FALLBACK_PROVIDERS: process.env.WEB_SEARCH_FALLBACK_PROVIDERS,
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
    const server = createWikipediaServer();
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

  it('calls the configured Baidu suggest-compatible HTTP endpoint', async () => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url || '/', 'http://127.0.0.1');
      expect(url.searchParams.get('prod')).toBe('pc');
      expect(url.searchParams.get('wd')).toBe('hypha');
      res.setHeader('content-type', 'application/json');
      res.end(
        JSON.stringify({
          g: [{ q: 'hypha agent' }, { q: 'hypha runtime' }],
        })
      );
    });
    const endpoint = await listen(server);
    process.env.WEB_SEARCH_PROVIDER = 'baidu';
    process.env.WEB_SEARCH_BAIDU_SUGGEST_ENDPOINT = endpoint;
    process.env.WEB_SEARCH_TIMEOUT_MS = '1000';

    try {
      const result = await new SearchTool().execute({ query: 'hypha', limit: 2 });

      expect(result.success).toBe(true);
      expect(result.output).toMatchObject({
        query: 'hypha',
        count: 2,
        provider: 'baidu',
        note: 'suggest-api',
      });
      expect(result.output.items).toEqual([
        expect.objectContaining({
          title: 'hypha agent',
          url: 'https://www.baidu.com/s?wd=hypha%20agent',
          source: 'baidu.suggest',
        }),
        expect.objectContaining({
          title: 'hypha runtime',
          source: 'baidu.suggest',
        }),
      ]);
    } finally {
      await close(server);
    }
  });

  it('uses mainland China fallback from Baidu to 360 search', async () => {
    const baidu = http.createServer((_req, res) => {
      res.statusCode = 503;
      res.end('temporary unavailable');
    });
    const so360 = http.createServer((req, res) => {
      const url = new URL(req.url || '/', 'http://127.0.0.1');
      expect(url.searchParams.get('word')).toBe('hypha');
      expect(url.searchParams.get('encodeout')).toBe('utf-8');
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ s: ['hypha runtime'] }));
    });
    const baiduEndpoint = await listen(baidu);
    const so360Endpoint = await listen(so360);
    process.env.WEB_SEARCH_PROVIDER = 'china';
    process.env.WEB_SEARCH_CHINA_PROVIDER_ORDER = 'baidu,so360';
    process.env.WEB_SEARCH_BAIDU_SUGGEST_ENDPOINT = baiduEndpoint;
    process.env.WEB_SEARCH_SO360_SUGGEST_ENDPOINT = so360Endpoint;
    process.env.WEB_SEARCH_TIMEOUT_MS = '1000';

    try {
      const result = await new SearchTool().execute({ query: 'hypha', limit: 1 });

      expect(result.success).toBe(true);
      expect(result.output).toMatchObject({
        query: 'hypha',
        count: 1,
        provider: 'so360',
        attemptedProviders: ['baidu', 'so360'],
        fallbackFrom: 'baidu',
        providerErrors: [expect.objectContaining({ provider: 'baidu', status: 503 })],
      });
      expect(result.output.items).toEqual([
        expect.objectContaining({
          title: 'hypha runtime',
          url: 'https://www.so.com/s?q=hypha%20runtime',
          source: 'so360.suggest',
        }),
      ]);
    } finally {
      await close(baidu);
      await close(so360);
    }
  });

  it('falls back from DuckDuckGo to Wikipedia in auto mode', async () => {
    const duckDuckGo = http.createServer((_req, res) => {
      res.statusCode = 503;
      res.end('temporary unavailable');
    });
    const wikipedia = createWikipediaServer();
    const duckDuckGoEndpoint = await listen(duckDuckGo);
    const wikipediaEndpoint = await listen(wikipedia);
    process.env.WEB_SEARCH_PROVIDER = 'auto';
    process.env.WEB_SEARCH_PROVIDER_ORDER = 'duckduckgo,wikipedia';
    process.env.WEB_SEARCH_DUCKDUCKGO_ENDPOINT = duckDuckGoEndpoint;
    process.env.WEB_SEARCH_WIKIPEDIA_ENDPOINT = wikipediaEndpoint;
    process.env.WEB_SEARCH_TIMEOUT_MS = '1000';

    try {
      const result = await new SearchTool().execute({ query: 'hypha', limit: 2 });

      expect(result.success).toBe(true);
      expect(result.output).toMatchObject({
        query: 'hypha',
        count: 2,
        provider: 'wikipedia',
        attemptedProviders: ['duckduckgo', 'wikipedia'],
        fallbackFrom: 'duckduckgo',
        providerErrors: [expect.objectContaining({ provider: 'duckduckgo', status: 503 })],
      });
    } finally {
      await close(duckDuckGo);
      await close(wikipedia);
    }
  });

  it('supports request-level provider override and fallback providers', async () => {
    const duckDuckGo = http.createServer((_req, res) => {
      res.statusCode = 500;
      res.end('provider failed');
    });
    const wikipedia = createWikipediaServer();
    const duckDuckGoEndpoint = await listen(duckDuckGo);
    const wikipediaEndpoint = await listen(wikipedia);
    process.env.WEB_SEARCH_PROVIDER = 'stub';
    process.env.WEB_SEARCH_DUCKDUCKGO_ENDPOINT = duckDuckGoEndpoint;
    process.env.WEB_SEARCH_WIKIPEDIA_ENDPOINT = wikipediaEndpoint;
    process.env.WEB_SEARCH_FALLBACK_PROVIDERS = 'none';
    process.env.WEB_SEARCH_TIMEOUT_MS = '1000';

    try {
      const result = await new SearchTool().execute({
        query: 'hypha',
        limit: 1,
        provider: 'duckduckgo',
        fallbackProviders: ['wikipedia'],
      });

      expect(result.success).toBe(true);
      expect(result.output).toMatchObject({
        count: 1,
        provider: 'wikipedia',
        attemptedProviders: ['duckduckgo', 'wikipedia'],
        fallbackFrom: 'duckduckgo',
      });
      expect(result.output.items).toHaveLength(1);
    } finally {
      await close(duckDuckGo);
      await close(wikipedia);
    }
  });
});

function restoreEnv(): void {
  setOptionalEnv('WEB_SEARCH_PROVIDER', originalEnv.WEB_SEARCH_PROVIDER);
  setOptionalEnv('WEB_SEARCH_ENDPOINT', originalEnv.WEB_SEARCH_ENDPOINT);
  setOptionalEnv('WEB_SEARCH_DUCKDUCKGO_ENDPOINT', originalEnv.WEB_SEARCH_DUCKDUCKGO_ENDPOINT);
  setOptionalEnv('WEB_SEARCH_WIKIPEDIA_ENDPOINT', originalEnv.WEB_SEARCH_WIKIPEDIA_ENDPOINT);
  setOptionalEnv(
    'WEB_SEARCH_BAIDU_SUGGEST_ENDPOINT',
    originalEnv.WEB_SEARCH_BAIDU_SUGGEST_ENDPOINT
  );
  setOptionalEnv(
    'WEB_SEARCH_SO360_SUGGEST_ENDPOINT',
    originalEnv.WEB_SEARCH_SO360_SUGGEST_ENDPOINT
  );
  setOptionalEnv('WEB_SEARCH_PROVIDER_ORDER', originalEnv.WEB_SEARCH_PROVIDER_ORDER);
  setOptionalEnv('WEB_SEARCH_CHINA_PROVIDER_ORDER', originalEnv.WEB_SEARCH_CHINA_PROVIDER_ORDER);
  setOptionalEnv('WEB_SEARCH_FALLBACK_PROVIDERS', originalEnv.WEB_SEARCH_FALLBACK_PROVIDERS);
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

function createWikipediaServer(): http.Server {
  return http.createServer((req, res) => {
    const url = new URL(req.url || '/', 'http://127.0.0.1');
    expect(url.searchParams.get('action')).toBe('opensearch');
    expect(url.searchParams.get('search')).toBe('hypha');
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
}
