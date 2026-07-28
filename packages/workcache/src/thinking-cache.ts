import type { FrameworkEventType } from '@hypha/core';
import { createWorkCacheKey, hashStableJson } from './key';
import { WorkCacheManager } from './manager';
import type { WorkCacheAuditEvent } from './types';

export type ThinkingCacheEntryKind = 'node' | 'path' | 'subgraph';

export interface ThinkingCacheScope {
  userId?: string;
  sessionId?: string;
  agentId?: string;
  domainPackId?: string;
}

export interface ThinkingCacheContext {
  runId: string;
  stepId?: string;
  sourceEventId: string;
  sourceEventType?: FrameworkEventType;
}

export interface ThinkingCacheIdentity {
  kind: ThinkingCacheEntryKind;
  scope: ThinkingCacheScope;
  providerId?: string;
  backendId?: string;
  modelAlias: string;
  strategy: Record<string, unknown>;
  prompt?: unknown;
  input: unknown;
  options?: unknown;
  tools?: unknown;
  semantic: unknown;
}

export interface ThinkingCacheEntry<T = unknown> {
  schemaVersion: '1';
  kind: ThinkingCacheEntryKind;
  identityHash: string;
  value: T;
}

export interface ThinkingCacheMetadata {
  hit: boolean;
  kind: ThinkingCacheEntryKind;
  cacheKey: string;
  blockId: string;
  ageMs?: number;
  source?: 'store' | 'in_flight' | 'computed';
}

export type ThinkingCacheTraceSink = (event: WorkCacheAuditEvent) => Promise<void> | void;

export interface ThinkingCacheOptions {
  manager: WorkCacheManager;
  trace?: ThinkingCacheTraceSink;
  now?: () => number;
}

export interface ThinkingCacheWriteOptions<T> {
  identity: ThinkingCacheIdentity;
  context: ThinkingCacheContext;
  value: T;
  provenance?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  tags?: string[];
  recomputeCost?: number;
}

export type ThinkingCacheLookupResult<T> =
  | { hit: true; value: T; metadata: ThinkingCacheMetadata }
  | { hit: false; reason: string; metadata: ThinkingCacheMetadata };

/**
 * Unified semantic cache for reasoning nodes, selected thinking paths, and
 * reusable graph fragments. It uses WorkCache storage and policy internally,
 * while keeping reasoning-specific cache identity out of framework core.
 */
export class ThinkingCache {
  private readonly manager: WorkCacheManager;
  private readonly trace?: ThinkingCacheTraceSink;
  private readonly now: () => number;
  private readonly inFlight = new Map<string, Promise<unknown>>();

  constructor(options: ThinkingCacheOptions) {
    this.manager = options.manager;
    this.trace = options.trace;
    this.now = options.now ?? Date.now;
  }

  get enabled(): boolean {
    return (
      this.manager.policy.enabled &&
      this.manager.policy.store !== 'off' &&
      this.manager.policy.trees.ComputationTree.enabled
    );
  }

  async lookup<T>(
    identity: ThinkingCacheIdentity,
    context: ThinkingCacheContext
  ): Promise<ThinkingCacheLookupResult<T>> {
    const location = thinkingCacheLocation(identity);
    if (!this.enabled) {
      return {
        hit: false,
        reason: 'disabled',
        metadata: { hit: false, kind: identity.kind, ...location },
      };
    }
    try {
      const result = await this.manager.lookup<ThinkingCacheEntry<T>>({
        treeType: 'ComputationTree',
        cacheKey: location.cacheKey,
      });
      await this.emit('workcache.lookup', identity, context, location, {
        ageMs: result.hit ? result.ageMs : undefined,
      });
      if (!result.hit) {
        await this.emit('workcache.miss', identity, context, location, {
          reason: result.reason,
        });
        return {
          hit: false,
          reason: result.reason,
          metadata: { hit: false, kind: identity.kind, ...location },
        };
      }
      await this.emit(
        'workcache.hit',
        identity,
        context,
        { cacheKey: location.cacheKey, blockId: result.block.id },
        { ageMs: result.ageMs }
      );
      return {
        hit: true,
        value: result.block.value.value,
        metadata: {
          hit: true,
          kind: identity.kind,
          cacheKey: location.cacheKey,
          blockId: result.block.id,
          ageMs: result.ageMs,
          source: 'store',
        },
      };
    } catch (error) {
      const reason = error instanceof Error ? `lookup_failed:${error.message}` : 'lookup_failed';
      await this.emit('workcache.bypass', identity, context, location, { reason });
      return {
        hit: false,
        reason,
        metadata: { hit: false, kind: identity.kind, ...location },
      };
    }
  }

  async write<T>(options: ThinkingCacheWriteOptions<T>): Promise<ThinkingCacheMetadata> {
    const { identity, context } = options;
    const location = thinkingCacheLocation(identity);
    const metadata: ThinkingCacheMetadata = {
      hit: false,
      kind: identity.kind,
      ...location,
      source: 'computed',
    };
    if (!this.enabled) return metadata;

    const timestamp = this.now();
    const ttlMs = this.manager.policy.trees.ComputationTree.ttlMs;
    try {
      await this.manager.forest.write<ThinkingCacheEntry<T>>({
        id: location.blockId,
        treeType: 'ComputationTree',
        nodeType: 'computation',
        cacheKey: location.cacheKey,
        value: {
          schemaVersion: '1',
          kind: identity.kind,
          identityHash: hashStableJson(identity),
          value: options.value,
        },
        createdAt: timestamp,
        updatedAt: timestamp,
        expiresAt: ttlMs ? timestamp + ttlMs : undefined,
        sourceEventId: context.sourceEventId,
        sourceEventType: context.sourceEventType ?? 'inference.requested',
        provenance: options.provenance,
        validity: {
          status: 'valid',
          provenanceHash: hashStableJson(identity),
          proof: {
            thinkingCacheSchemaVersion: '1',
            kind: identity.kind,
            modelAlias: identity.modelAlias,
            strategy: identity.strategy,
          },
        },
        utility: {
          score: 1,
          recomputeCost: options.recomputeCost,
          reuseCount: 0,
        },
        metadata: {
          thinkingCache: true,
          kind: identity.kind,
          ...options.metadata,
        },
        tags: ['thinking-cache', `thinking-${identity.kind}`, ...(options.tags ?? [])],
      });
      await this.emit('workcache.write', identity, context, location, { ttlMs });
    } catch (error) {
      await this.emit('workcache.bypass', identity, context, location, {
        reason: error instanceof Error ? `write_failed:${error.message}` : 'write_failed',
      });
    }
    return metadata;
  }

  async getOrCompute<T>(
    options: Omit<ThinkingCacheWriteOptions<T>, 'value'> & {
      compute: () => Promise<T>;
    }
  ): Promise<{ value: T; metadata: ThinkingCacheMetadata }> {
    const lookup = await this.lookup<T>(options.identity, options.context);
    if (lookup.hit) return { value: lookup.value, metadata: lookup.metadata };

    const location = thinkingCacheLocation(options.identity);
    const pending = this.inFlight.get(location.cacheKey) as Promise<T> | undefined;
    if (pending) {
      return {
        value: await pending,
        metadata: {
          hit: true,
          kind: options.identity.kind,
          ...location,
          source: 'in_flight',
        },
      };
    }

    const computation = options.compute();
    this.inFlight.set(location.cacheKey, computation);
    try {
      const value = await computation;
      const metadata = await this.write({ ...options, value });
      return { value, metadata };
    } finally {
      this.inFlight.delete(location.cacheKey);
    }
  }

  private async emit(
    type: WorkCacheAuditEvent['type'],
    identity: ThinkingCacheIdentity,
    context: ThinkingCacheContext,
    location: { cacheKey: string; blockId: string },
    payload: Pick<WorkCacheAuditEvent['payload'], 'reason' | 'ageMs' | 'ttlMs'>
  ): Promise<void> {
    await this.trace?.({
      type,
      runId: context.runId,
      stepId: context.stepId,
      timestamp: new Date(this.now()).toISOString(),
      payload: {
        sourceEventId: context.sourceEventId,
        sourceEventType: context.sourceEventType ?? 'inference.requested',
        treeType: 'ComputationTree',
        nodeType: 'computation',
        ...location,
        ...payload,
      },
    });
  }
}

function thinkingCacheLocation(identity: ThinkingCacheIdentity): {
  cacheKey: string;
  blockId: string;
} {
  const identityHash = hashStableJson({ schemaVersion: '1', ...identity });
  return {
    cacheKey: createWorkCacheKey({
      treeType: 'ComputationTree',
      nodeType: 'computation',
      identity: { namespace: 'thinking-cache', schemaVersion: '1', ...identity },
    }),
    blockId: `workcache:thinking:${identity.kind}:${identityHash}`,
  };
}
