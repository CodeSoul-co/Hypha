import { BaseTool } from '../types';
import type { ToolDefinition, ToolGovernanceSpec, ToolParams } from '../types';
import axios from 'axios';

const DEFAULT_DUCKDUCKGO_ENDPOINT = 'https://api.duckduckgo.com/';
const DEFAULT_WIKIPEDIA_ENDPOINT = 'https://en.wikipedia.org/w/api.php';
const DEFAULT_LIMIT = 3;
const MAX_LIMIT = 10;

type WebSearchProvider = 'auto' | 'stub' | 'duckduckgo' | 'wikipedia';
type ConcreteWebSearchProvider = Exclude<WebSearchProvider, 'auto'>;

interface SearchResultItem {
  title: string;
  url: string;
  snippet: string;
  source: string;
}

interface SearchProviderError {
  provider: ConcreteWebSearchProvider;
  message: string;
  code?: string;
  status?: number;
}

interface SearchOutput {
  query: string;
  count: number;
  items: SearchResultItem[];
  provider: ConcreteWebSearchProvider;
  note?: string;
  attemptedProviders?: ConcreteWebSearchProvider[];
  fallbackFrom?: ConcreteWebSearchProvider;
  providerErrors?: SearchProviderError[];
}

interface DuckDuckGoTopic {
  FirstURL?: string;
  Text?: string;
  Name?: string;
  Topics?: DuckDuckGoTopic[];
}

interface DuckDuckGoResponse {
  AbstractText?: string;
  AbstractURL?: string;
  AbstractSource?: string;
  Heading?: string;
  RelatedTopics?: DuckDuckGoTopic[];
}

type WikipediaOpenSearchResponse = [string, string[], string[], string[]];

/**
 * Provider-neutral web-search tool.
 *
 * Default mode is a deterministic offline stub for local tests. Set
 * WEB_SEARCH_PROVIDER=auto to try HTTP providers with fallback,
 * WEB_SEARCH_PROVIDER=duckduckgo to call the DuckDuckGo Instant Answer API,
 * or WEB_SEARCH_PROVIDER=wikipedia to call Wikipedia OpenSearch
 * without introducing a provider SDK dependency.
 */
export default class SearchTool extends BaseTool {
  readonly id = 'search';
  readonly name = 'search';
  readonly description = 'Search the web for information';
  readonly schema: ToolDefinition = {
    name: 'search',
    description: this.description,
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' },
        limit: { type: 'number', description: 'Max results to return' },
        provider: {
          type: 'string',
          enum: ['auto', 'stub', 'duckduckgo', 'wikipedia'],
          description: 'Optional provider override for this call',
        },
        fallbackProviders: {
          type: 'array',
          items: { type: 'string', enum: ['stub', 'duckduckgo', 'wikipedia'] },
          description: 'Optional ordered fallback providers for this call',
        },
      },
      required: ['query'],
    },
  };
  readonly governance: ToolGovernanceSpec = {
    sideEffectLevel: 'read',
    permissionScope: ['web.search'],
    timeoutPolicy: {
      timeoutMs: Number(process.env.WEB_SEARCH_TIMEOUT_MS || 10000),
      onTimeout: 'fail',
    },
    auditPolicy: {
      enabled: true,
      includeInput: true,
      includeOutput: true,
    },
  };

  protected async run(params: ToolParams): Promise<any> {
    const {
      query,
      limit = DEFAULT_LIMIT,
      provider: providerOverride,
      fallbackProviders,
    } = params as {
      query: string;
      limit?: number;
      provider?: string;
      fallbackProviders?: string[];
    };
    if (!query || typeof query !== 'string') throw new Error('query is required');
    const normalizedLimit = this.normalizeLimit(limit);
    const provider = this.provider(providerOverride);
    const fallbackOrder = this.fallbackProviders(provider, fallbackProviders);

    if (provider === 'auto') {
      return this.searchWithFallback(query, normalizedLimit, this.autoProviderOrder());
    }

    if (fallbackOrder.length > 0) {
      return this.searchWithFallback(query, normalizedLimit, [provider, ...fallbackOrder]);
    }

    return this.searchProvider(provider, query, normalizedLimit);
  }

  private provider(override?: string): WebSearchProvider {
    const raw = (override || process.env.WEB_SEARCH_PROVIDER || 'stub').toLowerCase();
    if (raw === 'auto' || raw === 'stub' || raw === 'duckduckgo' || raw === 'wikipedia') {
      return raw;
    }
    throw new Error(`Unsupported web search provider: ${raw}`);
  }

  private normalizeLimit(limit: number): number {
    if (!Number.isFinite(limit) || limit <= 0) {
      throw new Error('limit must be a positive number');
    }
    return Math.min(Math.trunc(limit), MAX_LIMIT);
  }

  private autoProviderOrder(): ConcreteWebSearchProvider[] {
    return this.parseProviderList(
      process.env.WEB_SEARCH_PROVIDER_ORDER || 'duckduckgo,wikipedia,stub'
    );
  }

  private fallbackProviders(
    provider: WebSearchProvider,
    override?: string[]
  ): ConcreteWebSearchProvider[] {
    if (provider === 'auto' || provider === 'stub') {
      return [];
    }
    if (override) {
      return this.parseProviderList(override.join(','));
    }
    if (process.env.WEB_SEARCH_FALLBACK_PROVIDERS !== undefined) {
      return this.parseProviderList(process.env.WEB_SEARCH_FALLBACK_PROVIDERS);
    }
    return provider === 'duckduckgo' ? ['wikipedia'] : [];
  }

  private parseProviderList(raw: string): ConcreteWebSearchProvider[] {
    const providers: ConcreteWebSearchProvider[] = [];
    for (const item of raw.split(',')) {
      const value = item.trim().toLowerCase();
      if (!value || value === 'none') continue;
      if (value !== 'stub' && value !== 'duckduckgo' && value !== 'wikipedia') {
        throw new Error(`Unsupported web search provider in list: ${value}`);
      }
      if (!providers.includes(value)) {
        providers.push(value);
      }
    }
    return providers;
  }

  private async searchWithFallback(
    query: string,
    limit: number,
    providers: ConcreteWebSearchProvider[]
  ): Promise<SearchOutput> {
    const attemptedProviders: ConcreteWebSearchProvider[] = [];
    const providerErrors: SearchProviderError[] = [];

    for (const provider of providers) {
      attemptedProviders.push(provider);
      try {
        const result = await this.searchProvider(provider, query, limit);
        return {
          ...result,
          attemptedProviders,
          fallbackFrom: attemptedProviders.length > 1 ? attemptedProviders[0] : undefined,
          providerErrors: providerErrors.length > 0 ? providerErrors : undefined,
        };
      } catch (error) {
        providerErrors.push(this.providerError(provider, error));
      }
    }

    const summary = providerErrors
      .map((error) => `${error.provider}: ${error.message}`)
      .join('; ');
    throw new Error(`Web search failed for all providers. ${summary}`);
  }

  private searchProvider(
    provider: ConcreteWebSearchProvider,
    query: string,
    limit: number
  ): Promise<SearchOutput> | SearchOutput {
    if (provider === 'duckduckgo') {
      return this.searchDuckDuckGo(query, limit);
    }
    if (provider === 'wikipedia') {
      return this.searchWikipedia(query, limit);
    }
    return this.searchStub(query, limit);
  }

  private providerError(provider: ConcreteWebSearchProvider, error: unknown): SearchProviderError {
    if (axios.isAxiosError(error)) {
      return {
        provider,
        message: error.message,
        code: error.code,
        status: error.response?.status,
      };
    }
    return {
      provider,
      message: error instanceof Error ? error.message : String(error),
    };
  }

  private searchStub(query: string, limit: number): SearchOutput {
    const items = Array.from({ length: Math.min(limit, DEFAULT_LIMIT) }, (_, i) => ({
      title: `Stub result ${i + 1} for "${query}"`,
      url: `https://example.com/search?q=${encodeURIComponent(query)}&i=${i + 1}`,
      snippet:
        'Deterministic offline result. Set WEB_SEARCH_PROVIDER=wikipedia or duckduckgo for HTTP search.',
      source: 'stub',
    }));
    return { query, count: items.length, items, provider: 'stub' };
  }

  private async searchDuckDuckGo(query: string, limit: number): Promise<SearchOutput> {
    const endpoint =
      process.env.WEB_SEARCH_DUCKDUCKGO_ENDPOINT ||
      process.env.WEB_SEARCH_ENDPOINT ||
      DEFAULT_DUCKDUCKGO_ENDPOINT;
    const timeoutMs = Number(process.env.WEB_SEARCH_TIMEOUT_MS || 10000);
    const response = await axios.get<DuckDuckGoResponse>(endpoint, {
      params: {
        q: query,
        format: 'json',
        no_redirect: '1',
        no_html: '1',
        skip_disambig: '1',
      },
      timeout: timeoutMs,
      headers: {
        'User-Agent': process.env.WEB_SEARCH_USER_AGENT || 'hypha/1.0 web-search',
      },
    });
    const items = this.parseDuckDuckGoResponse(query, response.data).slice(0, limit);
    return {
      query,
      count: items.length,
      items,
      provider: 'duckduckgo',
      note: items.length === 0 ? 'no-results' : 'instant-answer-api',
    };
  }

  private async searchWikipedia(query: string, limit: number): Promise<SearchOutput> {
    const endpoint = process.env.WEB_SEARCH_WIKIPEDIA_ENDPOINT || DEFAULT_WIKIPEDIA_ENDPOINT;
    const timeoutMs = Number(process.env.WEB_SEARCH_TIMEOUT_MS || 10000);
    const response = await axios.get<WikipediaOpenSearchResponse>(endpoint, {
      params: {
        action: 'opensearch',
        search: query,
        limit,
        format: 'json',
      },
      timeout: timeoutMs,
      headers: {
        'User-Agent': process.env.WEB_SEARCH_USER_AGENT || 'hypha/1.0 web-search',
      },
    });
    const items = this.parseWikipediaResponse(response.data).slice(0, limit);
    return {
      query,
      count: items.length,
      items,
      provider: 'wikipedia',
      note: items.length === 0 ? 'no-results' : 'opensearch-api',
    };
  }

  private parseDuckDuckGoResponse(query: string, data: DuckDuckGoResponse): SearchResultItem[] {
    const items: SearchResultItem[] = [];
    if (data.AbstractText) {
      items.push({
        title: data.Heading || query,
        url: data.AbstractURL || '',
        snippet: data.AbstractText,
        source: data.AbstractSource || 'duckduckgo.instant_answer',
      });
    }
    for (const topic of this.flattenTopics(data.RelatedTopics ?? [])) {
      if (!topic.Text) continue;
      items.push({
        title: this.topicTitle(topic.Text),
        url: topic.FirstURL || '',
        snippet: topic.Text,
        source: 'duckduckgo.related_topic',
      });
    }
    return items;
  }

  private flattenTopics(topics: DuckDuckGoTopic[]): DuckDuckGoTopic[] {
    const flattened: DuckDuckGoTopic[] = [];
    for (const topic of topics) {
      if (topic.Topics?.length) {
        flattened.push(...this.flattenTopics(topic.Topics));
      } else {
        flattened.push(topic);
      }
    }
    return flattened;
  }

  private topicTitle(text: string): string {
    const [title] = text.split(' - ');
    return title || text.slice(0, 80);
  }

  private parseWikipediaResponse(data: WikipediaOpenSearchResponse): SearchResultItem[] {
    const titles = Array.isArray(data[1]) ? data[1] : [];
    const descriptions = Array.isArray(data[2]) ? data[2] : [];
    const urls = Array.isArray(data[3]) ? data[3] : [];
    return titles.map((title, index) => ({
      title,
      url: urls[index] ?? '',
      snippet: descriptions[index] || `Wikipedia result for ${title}`,
      source: 'wikipedia.opensearch',
    }));
  }
}
