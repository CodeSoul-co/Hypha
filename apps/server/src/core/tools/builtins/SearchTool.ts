import { BaseTool } from '../types';
import type { ToolDefinition, ToolGovernanceSpec, ToolParams } from '../types';
import axios from 'axios';

const DEFAULT_DUCKDUCKGO_ENDPOINT = 'https://api.duckduckgo.com/';
const DEFAULT_LIMIT = 3;
const MAX_LIMIT = 10;

type WebSearchProvider = 'stub' | 'duckduckgo';

interface SearchResultItem {
  title: string;
  url: string;
  snippet: string;
  source: string;
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

/**
 * Provider-neutral web-search tool.
 *
 * Default mode is a deterministic offline stub for local tests. Set
 * WEB_SEARCH_PROVIDER=duckduckgo to call the DuckDuckGo Instant Answer API
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
    const { query, limit = DEFAULT_LIMIT } = params as { query: string; limit?: number };
    if (!query || typeof query !== 'string') throw new Error('query is required');
    const normalizedLimit = this.normalizeLimit(limit);
    const provider = this.provider();

    if (provider === 'duckduckgo') {
      return this.searchDuckDuckGo(query, normalizedLimit);
    }

    return this.searchStub(query, normalizedLimit);
  }

  private provider(): WebSearchProvider {
    const raw = (process.env.WEB_SEARCH_PROVIDER || 'stub').toLowerCase();
    if (raw === 'stub' || raw === 'duckduckgo') {
      return raw;
    }
    throw new Error(`Unsupported WEB_SEARCH_PROVIDER: ${raw}`);
  }

  private normalizeLimit(limit: number): number {
    if (!Number.isFinite(limit) || limit <= 0) {
      throw new Error('limit must be a positive number');
    }
    return Math.min(Math.trunc(limit), MAX_LIMIT);
  }

  private searchStub(query: string, limit: number): Record<string, unknown> {
    const items = Array.from({ length: Math.min(limit, DEFAULT_LIMIT) }, (_, i) => ({
      title: `Stub result ${i + 1} for "${query}"`,
      url: `https://example.com/search?q=${encodeURIComponent(query)}&i=${i + 1}`,
      snippet: 'Deterministic offline result. Set WEB_SEARCH_PROVIDER=duckduckgo for HTTP search.',
      source: 'stub',
    }));
    return { query, count: items.length, items, provider: 'stub' };
  }

  private async searchDuckDuckGo(query: string, limit: number): Promise<Record<string, unknown>> {
    const endpoint = process.env.WEB_SEARCH_ENDPOINT || DEFAULT_DUCKDUCKGO_ENDPOINT;
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
}
