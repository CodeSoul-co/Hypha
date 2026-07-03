import { hashContent } from './cache';
import { renderMessages } from './prompt';
import type {
  CompiledPrompt,
  PrefixSegment,
  PrefixSegmentKind,
  PrefixSegmentationResult,
  PrefixSegmenter,
  PrefixSegmentScope,
  PromptMessage,
} from './types';

const CACHEABLE_ROLES = new Set(['system', 'developer', 'context', 'memory', 'tool']);

export class DefaultPrefixSegmenter implements PrefixSegmenter {
  async segment(prompt: CompiledPrompt): Promise<PrefixSegmentationResult> {
    const segments: PrefixSegment[] = [];
    let previousCacheableSegmentId: string | undefined;

    prompt.messages.forEach((message, index) => {
      const rendered = renderMessages([message]);
      const contentHash = hashContent(rendered);
      const cacheable = CACHEABLE_ROLES.has(message.role);
      const segment: PrefixSegment = {
        id: `${prompt.id}:segment:${index}:${contentHash.slice(0, 12)}`,
        kind: roleToKind(message),
        scope: roleToScope(message),
        content: rendered,
        contentHash,
        tokenCount: estimateTokenCount(rendered),
        cacheable,
        dependencies: previousCacheableSegmentId ? [previousCacheableSegmentId] : [],
        metadata: {
          messageRole: message.role,
          messageName: message.name,
          messageMetadata: message.metadata,
        },
      };

      segments.push(segment);
      if (cacheable) previousCacheableSegmentId = segment.id;
    });

    const stablePrefix = segments
      .filter((segment) => segment.cacheable)
      .map((segment) => segment.content)
      .join('\n\n');
    const dynamicPrompt = segments
      .filter((segment) => !segment.cacheable)
      .map((segment) => segment.content)
      .join('\n\n');

    return {
      compiled: prompt,
      segments,
      stablePrefix,
      dynamicPrompt,
      metadata: {
        segmentCount: segments.length,
        cacheableSegmentCount: segments.filter((segment) => segment.cacheable).length,
        stablePrefixHash: stablePrefix ? hashContent(stablePrefix) : undefined,
        dynamicPromptHash: dynamicPrompt ? hashContent(dynamicPrompt) : undefined,
      },
    };
  }
}

export function estimateTokenCount(content: string): number {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charEstimate = Math.ceil(content.length / 4);
  return Math.max(1, Math.max(wordCount, charEstimate));
}

function roleToKind(message: PromptMessage): PrefixSegmentKind {
  if (message.role === 'system') return 'system';
  if (message.role === 'developer') return 'developer';
  if (message.role === 'context') return 'context';
  if (message.role === 'memory') return 'memory';
  if (message.role === 'tool') return 'tool';
  if (message.role === 'assistant') return 'assistant';
  return 'user';
}

function roleToScope(message: PromptMessage): PrefixSegmentScope {
  if (message.role === 'system') return 'global';
  if (message.role === 'developer') return 'agent';
  if (message.role === 'context' || message.role === 'memory') return 'session';
  if (message.role === 'tool') return 'run';
  return 'dynamic';
}
