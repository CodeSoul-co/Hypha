import { randomUUID } from 'crypto';
import type { FrameworkEvent, RecoveryKnowledgePort } from '@hypha/core';
import { WorkGraphIndex } from './graph';
import { hashStableJson } from './key';
import { fallbackAuditIdentity, sameValidity, workCacheScopeFromEvent } from './materializers';
import { normalizeWorkCachePolicy } from './policies';
import { validateCacheBlock } from './schemas';
import { createDefaultRuntimeTypeRegistry } from './registry';
import { TypedCacheForest } from './forest';
import { HotIndexedWorkCacheStore } from './stores/hot-index-store';
import { TimeoutWorkCacheStore } from './stores/timeout-store';
import { WorkCacheRecoveryKnowledgeStore } from './recovery-knowledge';
import type {
  CacheBlock,
  CacheTreeType,
  DemandSignal,
  PromptPrefixBlockValue,
  PromptPrefixMaterialization,
  WorkGraph,
  WorkCacheAuditEvent,
  WorkCacheAuditEventType,
  WorkCacheAuditPayload,
  WorkCacheLookupQuery,
  WorkCacheLookupResult,
  WorkCacheManagerOptions,
  WorkCachePolicy,
  WorkCacheScope,
  WorkCacheStore,
  WorkCacheInvalidationQuery,
  WorkCacheInvalidationBus,
  WorkGraphIndexLike,
  WorkGraphUpdate,
} from './types';

export class WorkCacheBlockTooLargeError extends Error {
  readonly code = 'WORKCACHE_BLOCK_TOO_LARGE';

  constructor(
    readonly sizeBytes: number,
    readonly maxBlockBytes: number
  ) {
    super(`WorkCache block is ${sizeBytes} bytes; maximum is ${maxBlockBytes} bytes.`);
    this.name = 'WorkCacheBlockTooLargeError';
  }
}

export class WorkCacheManager {
  readonly policy: WorkCachePolicy;
  readonly forest: TypedCacheForest;
  private readonly store: WorkCacheStore;
  private readonly registry: NonNullable<WorkCacheManagerOptions['registry']>;
  private readonly workGraph: WorkGraphIndexLike;
  private readonly now: () => number;
  private readonly invalidationBus?: WorkCacheInvalidationBus;
  private readonly originId = `workcache-manager:${randomUUID()}`;
  private unsubscribeInvalidation?: () => Promise<void> | void;
  private recoveryKnowledge?: RecoveryKnowledgePort;

  constructor(options: WorkCacheManagerOptions) {
    this.policy = normalizeWorkCachePolicy(options.policy);
    const timedStore = new TimeoutWorkCacheStore(options.store, this.policy.operationTimeoutMs);
    this.store =
      options.hotIndex === false
        ? timedStore
        : new HotIndexedWorkCacheStore(timedStore, { maxEntries: this.maxHotEntries() });
    this.registry =
      options.registry ??
      createDefaultRuntimeTypeRegistry({
        allowExtensionEvents: this.policy.allowExtensionEvents,
        unknownEventPolicy: this.policy.unknownEventPolicy,
      });
    this.now = options.now ?? Date.now;
    this.workGraph = options.workGraph ?? new WorkGraphIndex({ now: this.now });
    this.forest = new TypedCacheForest(this.store);
    this.invalidationBus = options.invalidationBus;
    if (this.invalidationBus) {
      void Promise.resolve(
        this.invalidationBus.subscribe(async (message) => {
          if (message.originId === this.originId) return;
          await Promise.all(message.blockIds.map((blockId) => this.store.delete(blockId)));
        })
      )
        .then((unsubscribe) => {
          this.unsubscribeInvalidation = unsubscribe;
        })
        .catch(() => {
          // Distributed invalidation is optional acceleration; local correctness remains scoped.
        });
    }
  }

  async ingest(event: FrameworkEvent): Promise<WorkCacheAuditEvent[]> {
    try {
      return await this.ingestInternal(event);
    } catch (error) {
      if (this.policy.failureMode === 'strict') throw error;
      const definition = this.registry.getDefinition(event.type);
      const treeType = definition?.treeType ?? 'ObservationTree';
      const nodeType = definition?.nodeType ?? 'observation';
      const fallback = fallbackAuditIdentity(event, treeType, nodeType, 'store_unavailable');
      return [
        this.auditEvent('workcache.bypass', event, {
          treeType,
          nodeType,
          blockId: fallback.blockId,
          cacheKey: fallback.cacheKey,
          reason: cacheFailureReason(error),
        }),
      ];
    }
  }

  private async ingestInternal(event: FrameworkEvent): Promise<WorkCacheAuditEvent[]> {
    if (!this.policy.enabled || this.policy.store === 'off') return [];
    if (isWorkCacheEvent(event.type)) return [];

    const normalized = this.registry.normalize(event, {
      unknownEventPolicy: this.policy.unknownEventPolicy,
    });
    if (!normalized) return [];

    const scope = workCacheScopeFromEvent(event);
    if (!scopeSatisfies(scope, this.policy.scopeRequirement)) {
      const fallback = fallbackAuditIdentity(
        event,
        normalized.treeType,
        normalized.nodeType,
        'scope_missing'
      );
      return [
        this.auditEvent('workcache.bypass', event, {
          treeType: normalized.treeType,
          nodeType: normalized.nodeType,
          blockId: fallback.blockId,
          cacheKey: fallback.cacheKey,
          reason: 'scope_missing',
        }),
      ];
    }

    const treePolicy = this.policy.trees[normalized.treeType];
    if (!treePolicy?.enabled) {
      const fallback = fallbackAuditIdentity(
        event,
        normalized.treeType,
        normalized.nodeType,
        'tree_disabled'
      );
      return [
        this.auditEvent('workcache.bypass', event, {
          treeType: normalized.treeType,
          nodeType: normalized.nodeType,
          blockId: fallback.blockId,
          cacheKey: fallback.cacheKey,
          reason: 'tree_disabled',
        }),
      ];
    }

    const definition = this.registry.getDefinition(event.type);
    const blocks = definition ? definition.materialize(normalized) : [];
    if (!blocks.length) {
      this.workGraph.ingest(normalized, []);
      const fallback = fallbackAuditIdentity(
        event,
        normalized.treeType,
        normalized.nodeType,
        'not_reusable'
      );
      return [
        this.auditEvent('workcache.bypass', event, {
          treeType: normalized.treeType,
          nodeType: normalized.nodeType,
          blockId: fallback.blockId,
          cacheKey: fallback.cacheKey,
          reason: 'not_reusable',
        }),
      ];
    }

    const events: WorkCacheAuditEvent[] = [];
    const operations: WorkCacheBlockOperation[] = [];
    for (const block of blocks) {
      const normalizedBlock = this.applyTreePolicy(block);
      const existing = await this.forest.lookup(normalizedBlock.treeType, normalizedBlock.cacheKey);

      const lookupBlock = existing && !this.isExpired(existing) ? existing : normalizedBlock;
      events.push(
        this.auditEvent('workcache.lookup', event, {
          treeType: lookupBlock.treeType,
          nodeType: lookupBlock.nodeType,
          blockId: lookupBlock.id,
          cacheKey: lookupBlock.cacheKey,
        })
      );

      if (!existing) {
        events.push(
          this.auditEvent('workcache.miss', event, {
            treeType: normalizedBlock.treeType,
            nodeType: normalizedBlock.nodeType,
            blockId: normalizedBlock.id,
            cacheKey: normalizedBlock.cacheKey,
            reason: 'not_found',
          })
        );
        operations.push({ type: 'write', block: normalizedBlock });
        continue;
      }

      const expired = this.isExpired(existing);
      if (expired || existing.validity.status !== 'valid') {
        await this.invalidateBlock(existing, expired ? 'expired' : validityMissReason(existing));
        events.push(
          this.auditEvent('workcache.invalidate', event, {
            treeType: existing.treeType,
            nodeType: existing.nodeType,
            blockId: existing.id,
            cacheKey: existing.cacheKey,
            reason: expired ? 'expired' : validityMissReason(existing),
          })
        );
        events.push(
          this.auditEvent('workcache.miss', event, {
            treeType: normalizedBlock.treeType,
            nodeType: normalizedBlock.nodeType,
            blockId: normalizedBlock.id,
            cacheKey: normalizedBlock.cacheKey,
            reason: expired ? 'expired' : validityMissReason(existing),
          })
        );
        operations.push({ type: 'write', block: normalizedBlock });
        continue;
      }

      if (!sameValidity(existing.validity, normalizedBlock.validity)) {
        await this.invalidateBlock(existing, 'validity_changed');
        events.push(
          this.auditEvent('workcache.invalidate', event, {
            treeType: existing.treeType,
            nodeType: existing.nodeType,
            blockId: existing.id,
            cacheKey: existing.cacheKey,
            reason: 'validity_changed',
          })
        );
        operations.push({ type: 'write', block: normalizedBlock });
        continue;
      }

      operations.push({ type: 'hit', block: existing });
    }

    const graphUpdate = this.workGraph.ingest(
      normalized,
      operations.map((operation) => operation.block)
    );
    for (const operation of operations) {
      if (operation.type === 'write') {
        const block = this.applyTreePolicy(this.applyDemandToBlock(operation.block, graphUpdate));
        await this.forest.write(block);
        await this.enforceTreeLimit(block.treeType);
        events.push(this.writeEvent(event, block));
        continue;
      }

      await this.store.touch?.(operation.block.id, this.now());
      await this.applyDemandToExistingBlock(operation.block, graphUpdate);
      events.push(
        this.auditEvent('workcache.hit', event, {
          treeType: operation.block.treeType,
          nodeType: operation.block.nodeType,
          blockId: operation.block.id,
          cacheKey: operation.block.cacheKey,
          ageMs: Math.max(0, this.now() - operation.block.createdAt),
        })
      );
    }
    return events;
  }

  getWorkGraph(runId: string, scope?: WorkCacheScope): WorkGraph | null {
    return this.workGraph.getGraph(runId, scope);
  }

  listDemandSignals(runId?: string): DemandSignal[] {
    return this.workGraph.listDemandSignals(runId);
  }

  getRecoveryKnowledgePort(): RecoveryKnowledgePort {
    this.recoveryKnowledge ??= new WorkCacheRecoveryKnowledgeStore(this.store, {
      ttlMs: this.policy.trees.RecoveryTree.ttlMs,
      now: this.now,
      failureMode: this.policy.failureMode,
      maxEntries: this.policy.trees.RecoveryTree.maxEntries,
    });
    return this.recoveryKnowledge;
  }

  async invalidate(query: WorkCacheInvalidationQuery, reason: string): Promise<number> {
    if (!this.policy.enabled || this.policy.store === 'off') return 0;
    if (!scopeSatisfies(query.scope, this.policy.scopeRequirement)) return 0;
    try {
      const blocks = await this.forest.list(query.treeType);
      const matches = blocks.filter((block) => invalidationMatches(block, query));
      await Promise.all(matches.map((block) => this.store.delete(block.id)));
      await this.publishInvalidation(
        matches.map((block) => block.id),
        reason
      );
      return matches.length;
    } catch (error) {
      if (this.policy.failureMode === 'strict') throw error;
      return 0;
    }
  }

  async close(): Promise<void> {
    await this.unsubscribeInvalidation?.();
    await this.invalidationBus?.close?.();
    await this.store.close?.();
  }

  async lookup<T = unknown>(query: WorkCacheLookupQuery): Promise<WorkCacheLookupResult<T>> {
    if (!this.policy.enabled || this.policy.store === 'off') {
      return { hit: false, reason: 'disabled' };
    }
    if (!scopeSatisfies(query.scope, this.policy.scopeRequirement)) {
      return { hit: false, reason: 'scope_missing' };
    }
    try {
      const block = await this.forest.lookup<T>(query.treeType, query.cacheKey);
      if (!block) return { hit: false, reason: 'not_found' };
      if (!sameScope(block.scope, query.scope)) {
        return { hit: false, reason: 'scope_mismatch' };
      }
      if (this.isExpired(block)) {
        await this.invalidateBlock(block, 'expired');
        return { hit: false, reason: 'expired' };
      }
      if (block.validity.status === 'invalid') return { hit: false, reason: 'invalid' };
      if (block.validity.status === 'unknown') return { hit: false, reason: 'unproven' };
      await this.store.touch?.(block.id, this.now());
      return { hit: true, block, ageMs: Math.max(0, this.now() - block.createdAt) };
    } catch (error) {
      if (this.policy.failureMode === 'strict') throw error;
      return { hit: false, reason: 'store_unavailable' };
    }
  }

  async write<T = unknown>(block: CacheBlock<T>): Promise<boolean> {
    if (!this.policy.enabled || this.policy.store === 'off') return false;
    if (!this.policy.trees[block.treeType].enabled) return false;
    if (!scopeSatisfies(block.scope, this.policy.scopeRequirement)) return false;
    try {
      const normalized = this.applyTreePolicy(block);
      await this.forest.write(normalized);
      await this.enforceTreeLimit(normalized.treeType);
      return true;
    } catch (error) {
      if (this.policy.failureMode === 'strict') throw error;
      return false;
    }
  }

  async materializePromptPrefix(
    sourceEvent?: FrameworkEvent
  ): Promise<{ materialization: PromptPrefixMaterialization; event?: WorkCacheAuditEvent }> {
    try {
      return await this.materializePromptPrefixInternal(sourceEvent);
    } catch (error) {
      if (this.policy.failureMode === 'strict') throw error;
      return { materialization: emptyPrefixMaterialization() };
    }
  }

  private async materializePromptPrefixInternal(
    sourceEvent?: FrameworkEvent
  ): Promise<{ materialization: PromptPrefixMaterialization; event?: WorkCacheAuditEvent }> {
    const requestedScope = sourceEvent ? workCacheScopeFromEvent(sourceEvent) : undefined;
    if (!scopeSatisfies(requestedScope, this.policy.scopeRequirement)) {
      return { materialization: emptyPrefixMaterialization() };
    }
    const allBlocks = (await this.forest.list<PromptPrefixBlockValue>('PromptPrefixTree'))
      .filter(
        (block) =>
          !this.isExpired(block) &&
          block.validity.status === 'valid' &&
          sameScope(block.scope, requestedScope)
      )
      .sort((left, right) => right.updatedAt - left.updatedAt);
    const targetPrefixHash = prefixHashFromEvent(sourceEvent) ?? latestPrefixHash(allBlocks);
    const candidateBlocks = targetPrefixHash
      ? allBlocks.filter((block) => block.value.prefixHash === targetPrefixHash)
      : allBlocks;
    const blocks = latestPromptBlocks(candidateBlocks).sort((left, right) => {
      const order = left.value.order - right.value.order;
      if (order !== 0) return order;
      return `${left.value.type}:${left.value.id}`.localeCompare(
        `${right.value.type}:${right.value.id}`
      );
    });

    const selected: Array<CacheBlock<PromptPrefixBlockValue>> = [];
    let usedTokens = 0;
    for (const block of blocks) {
      const estimate = block.value.tokenEstimate ?? Math.ceil(block.value.content.length / 4);
      if (usedTokens + estimate > this.policy.promptBudgetTokens) continue;
      selected.push(block);
      usedTokens += estimate;
    }
    const prefix = selected.map((block) => block.value.content).join('\n\n');
    const prefixHash = hashStableJson({
      blocks: selected.map((block) => ({
        cacheKey: block.cacheKey,
        validity: block.validity,
        order: block.value.order,
      })),
      prefix,
    });
    const materialization = { prefix, prefixHash, blocks: selected };
    if (!sourceEvent) return { materialization };

    const first = selected[0];
    return {
      materialization,
      event: this.auditEvent('workcache.prefix.materialized', sourceEvent, {
        treeType: 'PromptPrefixTree',
        nodeType: 'prompt_prefix',
        blockId: first?.id ?? `workcache:prefix:${prefixHash}`,
        cacheKey:
          first?.cacheKey ?? `workcache:PromptPrefixTree:prompt_prefix:sha256:${prefixHash}`,
        reason: 'materialized',
        prefixHash,
      }),
    };
  }

  private applyTreePolicy<T>(block: CacheBlock<T>): CacheBlock<T> {
    assertNoUnsupportedJson(block.value);
    const treePolicy = this.policy.trees[block.treeType];
    const createdAt = block.createdAt || this.now();
    const ttlMs = treePolicy?.ttlMs;
    const normalized = {
      ...block,
      schemaVersion: '1.0' as const,
      keyVersion: '1' as const,
      createdAt,
      updatedAt: this.now(),
      expiresAt: block.expiresAt ?? (ttlMs ? createdAt + ttlMs : undefined),
    };
    const serialized = JSON.stringify(normalized);
    if (serialized === undefined) {
      throw new TypeError('WorkCache blocks must be JSON serializable.');
    }
    const sizeBytes = Buffer.byteLength(serialized, 'utf8');
    if (sizeBytes > this.policy.maxBlockBytes) {
      throw new WorkCacheBlockTooLargeError(sizeBytes, this.policy.maxBlockBytes);
    }
    return validateCacheBlock<T>({ ...JSON.parse(serialized), sizeBytes });
  }

  private applyDemandToBlock<T>(block: CacheBlock<T>, graphUpdate: WorkGraphUpdate): CacheBlock<T> {
    const demand = demandForBlock(block, graphUpdate.demandSignals);
    if (!demand) return block;
    return {
      ...block,
      utility: mergeDemand(block.utility, demand),
      metadata: {
        ...block.metadata,
        workGraph: {
          nodeId: graphUpdate.node.id,
          demandScore: demand.demandScore,
          stepsToUse: demand.stepsToUse,
        },
      },
    };
  }

  private async applyDemandToExistingBlock(
    block: CacheBlock,
    graphUpdate: WorkGraphUpdate
  ): Promise<void> {
    const demand = demandForBlock(block, graphUpdate.demandSignals);
    if (!demand) return;
    await this.store.updateUtility?.(block.id, mergeDemand(block.utility, demand), this.now());
  }

  private isExpired(block: CacheBlock): boolean {
    return block.expiresAt !== undefined && block.expiresAt <= this.now();
  }

  private async invalidateBlock(block: CacheBlock, reason: string): Promise<void> {
    await this.forest.invalidate(block.treeType, block.id);
    await this.publishInvalidation([block.id], reason);
  }

  private async publishInvalidation(blockIds: string[], reason: string): Promise<void> {
    if (!this.invalidationBus || !blockIds.length) return;
    try {
      await this.invalidationBus.publish({
        schemaVersion: '1.0',
        originId: this.originId,
        blockIds,
        reason,
        timestamp: new Date(this.now()).toISOString(),
      });
    } catch (error) {
      if (this.policy.failureMode === 'strict') throw error;
    }
  }

  private async enforceTreeLimit(treeType: CacheTreeType): Promise<void> {
    const maxEntries = this.policy.trees[treeType].maxEntries;
    if (!maxEntries) return;
    const blocks = await this.forest.list(treeType);
    if (blocks.length <= maxEntries) return;
    const excess = [...blocks]
      .sort((left, right) => {
        const score =
          (left.utility.futureDemand ?? left.utility.score) -
          (right.utility.futureDemand ?? right.utility.score);
        return score || left.updatedAt - right.updatedAt;
      })
      .slice(0, blocks.length - maxEntries);
    await Promise.all(excess.map((block) => this.store.delete(block.id)));
    await this.publishInvalidation(
      excess.map((block) => block.id),
      'capacity'
    );
  }

  private writeEvent(source: FrameworkEvent, block: CacheBlock): WorkCacheAuditEvent {
    const ttlMs = block.expiresAt ? block.expiresAt - block.createdAt : undefined;
    return this.auditEvent('workcache.write', source, {
      treeType: block.treeType,
      nodeType: block.nodeType,
      blockId: block.id,
      cacheKey: block.cacheKey,
      ttlMs,
    });
  }

  private auditEvent(
    type: WorkCacheAuditEventType,
    source: FrameworkEvent,
    payload: Omit<WorkCacheAuditPayload, 'sourceEventId' | 'sourceEventType'>
  ): WorkCacheAuditEvent {
    return {
      type,
      runId: source.runId,
      stepId: source.stepId,
      timestamp: new Date(this.now()).toISOString(),
      payload: {
        sourceEventId: source.id,
        sourceEventType: source.type,
        ...payload,
      },
    };
  }

  private maxHotEntries(): number {
    return Object.values(this.policy.trees).reduce((sum, tree) => sum + (tree.maxEntries ?? 0), 0);
  }
}

function latestPromptBlocks(
  blocks: Array<CacheBlock<PromptPrefixBlockValue>>
): Array<CacheBlock<PromptPrefixBlockValue>> {
  const byBlockKey = new Map<string, CacheBlock<PromptPrefixBlockValue>>();
  for (const block of blocks) {
    const key = `${block.value.prefixHash}:${block.value.type}:${block.value.id}`;
    const existing = byBlockKey.get(key);
    if (!existing || block.updatedAt > existing.updatedAt) {
      byBlockKey.set(key, block);
    }
  }
  return Array.from(byBlockKey.values());
}

function latestPrefixHash(blocks: Array<CacheBlock<PromptPrefixBlockValue>>): string | undefined {
  return blocks[0]?.value.prefixHash;
}

function prefixHashFromEvent(event?: FrameworkEvent): string | undefined {
  if (!event) return undefined;
  const payload = recordFromUnknown(event.payload);
  const candidates = [
    payload.prefixHash,
    recordFromUnknown(payload.prefixMetadata).prefixHash,
    recordFromUnknown(payload.metadata).prefixHash,
    recordFromUnknown(recordFromUnknown(payload.metadata).prefixMetadata).prefixHash,
    recordFromUnknown(event.metadata).prefixHash,
    recordFromUnknown(recordFromUnknown(event.metadata).prefixMetadata).prefixHash,
  ];
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.length > 0) return candidate;
  }
  return undefined;
}

function recordFromUnknown(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

interface WorkCacheBlockOperation {
  type: 'write' | 'hit';
  block: CacheBlock;
}

function isWorkCacheEvent(type: string): boolean {
  return type.startsWith('workcache.');
}

function demandForBlock(block: CacheBlock, signals: DemandSignal[]): DemandSignal | undefined {
  return signals
    .filter(
      (signal) =>
        signal.targetTreeType === block.treeType &&
        (signal.targetBlockId === block.id || signal.targetKey === block.cacheKey)
    )
    .sort((left, right) => right.demandScore - left.demandScore)[0];
}

function mergeDemand(utility: CacheBlock['utility'], signal: DemandSignal): CacheBlock['utility'] {
  const downstreamFanout =
    typeof signal.metadata?.downstreamFanout === 'number'
      ? signal.metadata.downstreamFanout
      : utility.downstreamFanout;
  return {
    ...utility,
    score: Math.max(utility.score ?? 0, signal.demandScore),
    futureDemand: Math.max(utility.futureDemand ?? 0, signal.demandScore),
    downstreamFanout,
    recomputeCost:
      typeof signal.metadata?.recomputeCost === 'number'
        ? signal.metadata.recomputeCost
        : utility.recomputeCost,
    staleRisk:
      typeof signal.metadata?.stalenessRisk === 'number'
        ? signal.metadata.stalenessRisk
        : utility.staleRisk,
    validationCost:
      typeof signal.metadata?.validationCost === 'number'
        ? signal.metadata.validationCost
        : utility.validationCost,
  };
}

function scopeSatisfies(
  scope: WorkCacheScope | undefined,
  requirement: WorkCachePolicy['scopeRequirement']
): boolean {
  if (requirement === 'none') return true;
  if (requirement === 'session') return Boolean(scope?.userId && scope.sessionId);
  return Boolean(scope?.userId);
}

function sameScope(left: WorkCacheScope | undefined, right: WorkCacheScope | undefined): boolean {
  return hashStableJson(left ?? {}) === hashStableJson(right ?? {});
}

function validityMissReason(block: CacheBlock): 'invalid' | 'unproven' {
  return block.validity.status === 'unknown' ? 'unproven' : 'invalid';
}

function invalidationMatches(block: CacheBlock, query: WorkCacheInvalidationQuery): boolean {
  if (query.treeType && block.treeType !== query.treeType) return false;
  if (query.cacheKey && block.cacheKey !== query.cacheKey) return false;
  if (query.sourceEventId && block.sourceEventId !== query.sourceEventId) return false;
  if (query.tag && !block.tags?.includes(query.tag)) return false;
  if (query.scope && !sameScope(block.scope, query.scope)) return false;
  if (query.dependencyKey) {
    const sourceHashes = block.validity.sourceHashes ?? {};
    const provenance = block.provenance ?? {};
    const dependencyValues = [
      ...Object.keys(sourceHashes),
      ...Object.values(provenance).filter((value): value is string => typeof value === 'string'),
    ];
    if (!dependencyValues.includes(query.dependencyKey)) return false;
  }
  return true;
}

function cacheFailureReason(error: unknown): string {
  if (error instanceof WorkCacheBlockTooLargeError) return 'block_oversized';
  if (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    (error as { code?: unknown }).code === 'WORKCACHE_STORE_TIMEOUT'
  ) {
    return 'store_timeout';
  }
  return 'store_unavailable';
}

function emptyPrefixMaterialization(): PromptPrefixMaterialization {
  return {
    prefix: '',
    prefixHash: hashStableJson({ blocks: [], prefix: '' }),
    blocks: [],
  };
}

function assertNoUnsupportedJson(
  value: unknown,
  inArray = false,
  ancestors = new Set<object>()
): void {
  if (value === undefined) {
    if (inArray) throw new TypeError('WorkCache arrays cannot contain undefined values.');
    return;
  }
  if (typeof value === 'function' || typeof value === 'symbol' || typeof value === 'bigint') {
    throw new TypeError(`WorkCache values cannot contain ${typeof value} values.`);
  }
  if (Array.isArray(value)) {
    if (ancestors.has(value)) throw new TypeError('WorkCache values cannot contain cycles.');
    ancestors.add(value);
    for (const item of value) assertNoUnsupportedJson(item, true, ancestors);
    ancestors.delete(value);
    return;
  }
  if (value && typeof value === 'object' && !(value instanceof Date)) {
    if (ancestors.has(value)) throw new TypeError('WorkCache values cannot contain cycles.');
    ancestors.add(value);
    for (const item of Object.values(value as Record<string, unknown>)) {
      assertNoUnsupportedJson(item, false, ancestors);
    }
    ancestors.delete(value);
  }
}
