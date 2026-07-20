import { createHash } from 'crypto';
import type { CacheTreeType, WorkCacheScope, WorkNodeType } from './types';

export interface WorkCacheKeyInput {
  treeType: CacheTreeType;
  nodeType: WorkNodeType;
  identity: unknown;
  scope?: WorkCacheScope;
}

export function createWorkCacheKey(input: WorkCacheKeyInput): string {
  return `workcache:${input.treeType}:${input.nodeType}:sha256:${hashStableJson({
    keyVersion: '1',
    scope: input.scope,
    identity: input.identity,
  })}`;
}

export function createWorkBlockId(input: WorkCacheKeyInput & { sourceEventId: string }): string {
  return `workcache:block:${hashStableJson({
    treeType: input.treeType,
    nodeType: input.nodeType,
    sourceEventId: input.sourceEventId,
    scope: input.scope,
    identity: input.identity,
  })}`;
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
  if (typeof value === 'function' || typeof value === 'symbol') return undefined;
  return value;
}
