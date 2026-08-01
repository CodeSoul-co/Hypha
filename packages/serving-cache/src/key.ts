import { createHash } from 'crypto';
import type { LLMCacheKeyInput, PromptPrefixBlock, PromptPrefixMetadata } from './types';

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
  const customBlocks = normalizePromptBlocks(input.promptBlocks);
  const blocks: PromptPrefixMetadata['blocks'] = [];
  if (normalized.system && !hasPromptBlock(customBlocks, ['system', 'prompt-template'])) {
    blocks.push({
      id: 'system',
      type: 'system',
      hash: hashStableJson(normalized.system),
      stable: true,
      content: normalized.system,
      tokenEstimate: estimateTokens(normalized.system),
      order: 0,
      source: 'request.instructions',
    });
  }
  if (normalized.tools?.length && !hasPromptBlock(customBlocks, ['tool-schema'])) {
    const content = stableJson(normalized.tools);
    blocks.push({
      id: 'tool-schema',
      type: 'tool-schema',
      hash: hashStableJson(normalized.tools),
      stable: true,
      content,
      tokenEstimate: estimateTokens(content),
      order: 10,
      source: 'request.tools',
    });
  }
  if (normalized.cacheScope?.projectId && !hasPromptBlock(customBlocks, ['project-context'])) {
    blocks.push({
      id: `project:${normalized.cacheScope.projectId}`,
      type: 'project-context',
      hash: hashStableJson(normalized.cacheScope.projectId),
      stable: true,
      content: normalized.cacheScope.projectId,
      tokenEstimate: estimateTokens(normalized.cacheScope.projectId),
      order: 20,
      source: 'cacheScope.projectId',
    });
  }
  if (normalized.cacheScope?.domainPackId && !hasPromptBlock(customBlocks, ['domain-pack'])) {
    blocks.push({
      id: `domain-pack:${normalized.cacheScope.domainPackId}`,
      type: 'domain-pack',
      hash: hashStableJson(normalized.cacheScope.domainPackId),
      stable: true,
      content: normalized.cacheScope.domainPackId,
      tokenEstimate: estimateTokens(normalized.cacheScope.domainPackId),
      order: 30,
      source: 'cacheScope.domainPackId',
    });
  }
  const mergedBlocks = mergePromptBlocks([...blocks, ...customBlocks]);
  const toolSchemaHash = normalized.tools?.length ? hashStableJson(normalized.tools) : undefined;
  const domainPackHash = normalized.cacheScope?.domainPackId
    ? hashStableJson(normalized.cacheScope.domainPackId)
    : undefined;
  return {
    prefixHash: hashStableJson(
      mergedBlocks
        .filter((block) => block.stable)
        .map((block) => blockIdentity(block))
    ),
    dynamicSuffixHash: hashStableJson(normalized.messages),
    requestHash: hashStableJson(normalized),
    toolSchemaHash,
    domainPackHash,
    prefixTokenEstimate: mergedBlocks.reduce(
      (sum, block) => sum + (block.tokenEstimate ?? estimateTokens(block.content ?? block.hash)),
      0
    ),
    blocks: mergedBlocks,
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

function normalizePromptBlocks(blocks: unknown): PromptPrefixBlock[] {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .map((block, index) => normalizePromptBlock(block, index))
    .filter((block): block is PromptPrefixBlock => Boolean(block));
}

function normalizePromptBlock(block: unknown, index: number): PromptPrefixBlock | null {
  if (!block || typeof block !== 'object' || Array.isArray(block)) return null;
  const record = block as Record<string, unknown>;
  const id = stringValue(record.id);
  const type = promptBlockType(record.type);
  if (!id || !type) return null;
  const content = stringValue(record.content);
  const hash = stringValue(record.hash) ?? hashStableJson(content ?? stableJson(record));
  return {
    id,
    type,
    hash,
    stable: record.stable !== false,
    content,
    tokenEstimate: numberValue(record.tokenEstimate),
    order: numberValue(record.order) ?? 100 + index,
    source: stringValue(record.source),
    templateId: stringValue(record.templateId),
    templateVersion: stringValue(record.templateVersion),
    metadata: record.metadata && typeof record.metadata === 'object' && !Array.isArray(record.metadata)
      ? (record.metadata as Record<string, unknown>)
      : undefined,
  };
}

function mergePromptBlocks(blocks: PromptPrefixBlock[]): PromptPrefixBlock[] {
  const byKey = new Map<string, PromptPrefixBlock>();
  for (const block of blocks) {
    byKey.set(`${block.type}:${block.id}`, block);
  }
  return Array.from(byKey.values()).sort((left, right) => {
    const order = (left.order ?? 1000) - (right.order ?? 1000);
    if (order !== 0) return order;
    return `${left.type}:${left.id}`.localeCompare(`${right.type}:${right.id}`);
  });
}

function blockIdentity(block: PromptPrefixBlock): Record<string, unknown> {
  return {
    id: block.id,
    type: block.type,
    hash: block.hash,
    stable: block.stable,
    order: block.order,
    templateId: block.templateId,
    templateVersion: block.templateVersion,
  };
}

function promptBlockType(value: unknown): PromptPrefixBlock['type'] | undefined {
  const text = stringValue(value);
  if (
    text === 'system' ||
    text === 'tool-schema' ||
    text === 'project-context' ||
    text === 'domain-pack' ||
    text === 'memory' ||
    text === 'prompt-template'
  ) {
    return text;
  }
  return undefined;
}

function hasPromptBlock(blocks: PromptPrefixBlock[], types: PromptPrefixBlock['type'][]): boolean {
  return blocks.some((block) => types.includes(block.type));
}

function estimateTokens(content: string): number {
  return Math.max(1, Math.ceil(content.length / 4));
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function numberValue(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}
