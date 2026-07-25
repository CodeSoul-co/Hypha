import type { ContextItem, TokenEstimator } from './context-contracts';
import { sha256 } from './memory-utils';

export interface ContextCompactionRequest {
  items: ContextItem[];
  maxTokens: number;
  tokenizer: TokenEstimator;
  sourceId?: string;
}

export interface ContextCompactor {
  readonly id: string;
  compact(request: ContextCompactionRequest): Promise<ContextItem | null>;
}

export class DeterministicExtractiveContextCompactor implements ContextCompactor {
  readonly id = 'context.compactor.extractive-v1';

  async compact(request: ContextCompactionRequest): Promise<ContextItem | null> {
    if (request.maxTokens <= 0 || request.items.length === 0) return null;
    const header = '[compacted-context]\n';
    const marker = '\n[compaction-truncated]';
    const snippets = request.items.map(
      (item) => `[source:${item.sourceId ?? item.id}] ${item.text.replace(/\s+/g, ' ').trim()}`
    );
    let text = header;
    for (const snippet of snippets) {
      const candidate = text === header ? `${text}${snippet}` : `${text}\n${snippet}`;
      if (request.tokenizer.estimate(candidate) > request.maxTokens) break;
      text = candidate;
    }
    if (text === header) {
      const maxCharacters = Math.max(0, request.maxTokens * 4 - header.length - marker.length);
      text = `${header}${snippets[0]?.slice(0, maxCharacters) ?? ''}${marker}`;
    } else if (request.tokenizer.estimate(text) < request.maxTokens && snippets.length > 1) {
      const included = text.split('\n').length - 1;
      if (included < snippets.length) text = `${text}${marker}`;
    }
    while (request.tokenizer.estimate(text) > request.maxTokens && text.length > 0) {
      text = text.slice(0, Math.max(0, text.length - 8));
    }
    if (!text.trim()) return null;
    const sourceRefs = request.items.map((item) => item.sourceId ?? item.id);
    return {
      id: `context:compacted:${sha256({ sourceRefs, text }).slice(7, 23)}`,
      sourceType: 'custom',
      sourceId: request.sourceId ?? 'context-compaction',
      content: { sourceRefs },
      text,
      tokenEstimate: request.tokenizer.estimate(text),
      priority: Math.max(...request.items.map((item) => item.priority)),
      score: Math.max(...request.items.map((item) => item.score ?? 0)),
      untrusted: request.items.some((item) => item.untrusted),
      provenance: {
        compactorId: this.id,
        sourceRefs,
        sourceHashes: request.items.map((item) => sha256(item.text)),
      },
      metadata: {
        compacted: true,
        sourceItemIds: request.items.map((item) => item.id),
      },
    };
  }
}
