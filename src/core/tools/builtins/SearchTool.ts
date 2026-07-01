import { BaseTool } from '../types';
import type { ToolDefinition, ToolParams } from '../types';

/**
 * Placeholder web-search tool.
 *
 * The intent here is for the LLM tool-call pipeline to have a registered
 * search tool to choose. Wire it to a real provider (Perplexity, Brave,
 * Tavily, SerpAPI…) by replacing the body of `run()`. As-is it returns a
 * deterministic stub so the rest of the system can be exercised without
 * external API keys.
 */
export default class SearchTool extends BaseTool {
  readonly id = 'search';
  readonly name = 'search';
  readonly description = 'Search the web for information (stub implementation — wire to a real provider)';
  readonly schema: ToolDefinition = {
    name: 'search',
    description: this.description,
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' },
        limit: { type: 'number', description: 'Max results to return', },
      },
      required: ['query'],
    },
  };

  protected async run(params: ToolParams): Promise<any> {
    const { query, limit = 3 } = params as { query: string; limit?: number };
    if (!query || typeof query !== 'string') throw new Error('query is required');

    // Stub: deterministic placeholder results.
    const items = Array.from({ length: Math.min(limit, 3) }, (_, i) => ({
      title: `Stub result ${i + 1} for "${query}"`,
      url: `https://example.com/search?q=${encodeURIComponent(query)}&i=${i + 1}`,
      snippet: 'This is a placeholder. Wire SearchTool to a real provider.',
    }));
    return { query, count: items.length, items, note: 'stub-implementation' };
  }
}
