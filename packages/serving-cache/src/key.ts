import { createHash } from 'crypto';
import type { LLMCacheKeyInput, PromptPrefixMetadata } from './types';

export function createLLMCacheKey(input: LLMCacheKeyInput): string {
  return `llm:exact:sha256:${hashStableJson(normalizeLLMCacheKeyInput(input))}`;
}

export function normalizeLLMCacheKeyInput(input: LLMCacheKeyInput): LLMCacheKeyInput {
  return removeUndefined({
    provider: input.provider,
    model: input.model,
    system: input.system,
    messages: input.messages,
    tools: input.tools ? sortToolSchemas(input.tools) : undefined,
    params: input.params,
    cacheScope: input.cacheScope,
  }) as LLMCacheKeyInput;
}

export function buildPromptPrefixMetadata(input: LLMCacheKeyInput): PromptPrefixMetadata {
  const normalized = normalizeLLMCacheKeyInput(input);
  const blocks: PromptPrefixMetadata['blocks'] = [];
  if (normalized.system) {
    blocks.push({
      id: 'system',
      type: 'system',
      hash: hashStableJson(normalized.system),
      stable: true,
    });
  }
  if (normalized.tools?.length) {
    blocks.push({
      id: 'tool-schema',
      type: 'tool-schema',
      hash: hashStableJson(normalized.tools),
      stable: true,
    });
  }
  if (normalized.cacheScope?.projectId) {
    blocks.push({
      id: `project:${normalized.cacheScope.projectId}`,
      type: 'project-context',
      hash: hashStableJson(normalized.cacheScope.projectId),
      stable: true,
    });
  }
  if (normalized.cacheScope?.domainPackId) {
    blocks.push({
      id: `domain-pack:${normalized.cacheScope.domainPackId}`,
      type: 'domain-pack',
      hash: hashStableJson(normalized.cacheScope.domainPackId),
      stable: true,
    });
  }
  const toolSchemaHash = normalized.tools?.length ? hashStableJson(normalized.tools) : undefined;
  const domainPackHash = normalized.cacheScope?.domainPackId
    ? hashStableJson(normalized.cacheScope.domainPackId)
    : undefined;
  return {
    prefixHash: hashStableJson(blocks),
    dynamicSuffixHash: hashStableJson(normalized.messages),
    requestHash: hashStableJson(normalized),
    toolSchemaHash,
    domainPackHash,
    blocks,
  };
}

export function hashStableJson(value: unknown): string {
  return createHash('sha256').update(stableJson(value)).digest('hex');
}

export function stableJson(value: unknown): string {
  return JSON.stringify(canonicalize(value));
}

export function canonicalize(value: unknown): unknown {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) {
    return value.map(canonicalize).filter((item) => item !== undefined);
  }
  if (typeof value === 'object') {
    const input = value as Record<string, unknown>;
    const output: Record<string, unknown> = {};
    for (const key of Object.keys(input).sort()) {
      const next = canonicalize(input[key]);
      if (next !== undefined) output[key] = next;
    }
    return output;
  }
  if (typeof value === 'function' || typeof value === 'symbol') {
    return undefined;
  }
  return value;
}

function removeUndefined(value: unknown): unknown {
  return canonicalize(value);
}

function sortToolSchemas(tools: unknown[]): unknown[] {
  return [...tools].sort((left, right) => {
    const leftId = toolSortKey(left);
    const rightId = toolSortKey(right);
    return leftId.localeCompare(rightId);
  });
}

function toolSortKey(tool: unknown): string {
  if (tool && typeof tool === 'object') {
    const record = tool as Record<string, unknown>;
    const name = record.name ?? record.id ?? nestedName(record);
    if (typeof name === 'string') return name;
  }
  return stableJson(tool);
}

function nestedName(record: Record<string, unknown>): unknown {
  const fn = record.function;
  if (!fn || typeof fn !== 'object') return undefined;
  return (fn as Record<string, unknown>).name;
}
