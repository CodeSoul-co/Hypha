import type { FrameworkEvent } from '@hypha/core';
import { WorkGraphIndex } from './graph';
import { hashStableJson } from './key';
import { fallbackAuditIdentity, sameValidity } from './materializers';
import { normalizeWorkCachePolicy } from './policies';
import { createDefaultRuntimeTypeRegistry } from './registry';
import { TypedCacheForest } from './forest';
import { HotIndexedWorkCacheStore } from './stores/hot-index-store';
import type {
  CacheBlock,
  CacheTreeType,
  DemandSignal,
  PromptPrefixMaterialization,
  WorkGraph,
  WorkCacheAuditEvent,
  WorkCacheAuditEventType,
  WorkCacheAuditPayload,
  WorkCacheLookupQuery,
  WorkCacheLookupResult,
  WorkCacheManagerOptions,
  WorkCachePolicy,
  WorkCacheStore,
  WorkGraphIndexLike,
  WorkGraphUpdate,
} from './types';

export class WorkCacheManager {
  readonly policy: WorkCachePolicy;
  readonly forest: TypedCacheForest;
  private readonly store: WorkCacheStore;
  private readonly registry: NonNullable<WorkCacheManagerOptions['registry']>;
  private readonly workGraph: WorkGraphIndexLike;
  private readonly now: () => number;

  constructor(options: WorkCacheManagerOptions) {
    this.policy = normalizeWorkCachePolicy(options.policy);
    this.store =
      options.hotIndex === false
        ? options.store
        : new HotIndexedWorkCacheStore(options.store, { maxEntries: this.maxHotEntries() });
    this.registry =
      options.registry ??
      createDefaultRuntimeTypeRegistry({
        allowExtensionEvents: this.policy.allowExtensionEvents,
        unknownEventPolicy: this.policy.unknownEventPolicy,
      });
    this.now = options.now ?? Date.now;
    this.workGraph = options.workGraph ?? new WorkGraphIndex({ now: this.now });
    this.forest = new TypedCacheForest(this.store);
  }

  async ingest(event: FrameworkEvent): Promise<WorkCacheAuditEvent[]> {
    if (!this.policy.enabled || this.policy.store === 'off') return [];
    if (isWorkCacheEvent(event.type)) return [];

    const normalized = this.registry.normalize(event, {
      unknownEventPolicy: this.policy.unknownEventPolicy,
    });
    if (!normalized) return [];

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
    const graphUpdate = this.workGraph.ingest(normalized, blocks);
    if (!blocks.length) {
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
    for (const block of blocks) {
      const normalizedBlock = this.applyTreePolicy(
        this.applyDemandToBlock(block, graphUpdate)
      );
      events.push(
        this.auditEvent('workcache.lookup', event, {
          treeType: normalizedBlock.treeType,
          nodeType: normalizedBlock.nodeType,
          blockId: normalizedBlock.id,
          cacheKey: normalizedBlock.cacheKey,
        })
      );

      const existing = await this.forest.lookup(normalizedBlock.treeType, normalizedBlock.cacheKey);
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
        await this.forest.write(normalizedBlock);
        events.push(this.writeEvent(event, normalizedBlock));
        continue;
      }

      const expired = this.isExpired(existing);
      if (expired || existing.validity.status === 'invalid') {
        await this.forest.invalidate(existing.treeType, existing.id);
        events.push(
          this.auditEvent('workcache.invalidate', event, {
            treeType: existing.treeType,
            nodeType: existing.nodeType,
            blockId: existing.id,
            cacheKey: existing.cacheKey,
            reason: expired ? 'expired' : 'invalid',
          })
        );
        events.push(
          this.auditEvent('workcache.miss', event, {
            treeType: normalizedBlock.treeType,
            nodeType: normalizedBlock.nodeType,
            blockId: normalizedBlock.id,
            cacheKey: normalizedBlock.cacheKey,
            reason: expired ? 'expired' : 'invalid',
          })
        );
        await this.forest.write(normalizedBlock);
        events.push(this.writeEvent(event, normalizedBlock));
        continue;
      }

      if (!sameValidity(existing.validity, normalizedBlock.validity)) {
        await this.forest.invalidate(existing.treeType, existing.id);
        events.push(
          this.auditEvent('workcache.invalidate', event, {
            treeType: existing.treeType,
            nodeType: existing.nodeType,
            blockId: existing.id,
            cacheKey: existing.cacheKey,
            reason: 'validity_changed',
          })
        );
        await this.forest.write(normalizedBlock);
        events.push(this.writeEvent(event, normalizedBlock));
        continue;
      }

      await this.store.touch?.(existing.id, this.now());
      await this.applyDemandToExistingBlock(existing, graphUpdate);
      events.push(
        this.auditEvent('workcache.hit', event, {
          treeType: existing.treeType,
          nodeType: existing.nodeType,
          blockId: existing.id,
          cacheKey: existing.cacheKey,
          ageMs: Math.max(0, this.now() - existing.createdAt),
        })
      );
    }
    return events;
  }

  getWorkGraph(runId: string): WorkGraph | null {
    return this.workGraph.getGraph(runId);
  }

  listDemandSignals(runId?: string): DemandSignal[] {
    return this.workGraph.listDemandSignals(runId);
  }

  async lookup<T = unknown>(query: WorkCacheLookupQuery): Promise<WorkCacheLookupResult<T>> {
    if (!this.policy.enabled || this.policy.store === 'off') {
      return { hit: false, reason: 'disabled' };
    }
    const block = await this.forest.lookup<T>(query.treeType, query.cacheKey);
    if (!block) return { hit: false, reason: 'not_found' };
    if (this.isExpired(block)) {
      await this.forest.invalidate(block.treeType, block.id);
      return { hit: false, reason: 'expired' };
    }
    if (block.validity.status === 'invalid') return { hit: false, reason: 'invalid' };
    await this.store.touch?.(block.id, this.now());
    return { hit: true, block, ageMs: Math.max(0, this.now() - block.createdAt) };
  }

  async materializePromptPrefix(
    sourceEvent?: FrameworkEvent
  ): Promise<{ materialization: PromptPrefixMaterialization; event?: WorkCacheAuditEvent }> {
    const blocks = (await this.forest.list<{ content: string; tokenEstimate?: number }>(
      'PromptPrefixTree'
    ))
      .filter((block) => !this.isExpired(block) && block.validity.status === 'valid')
      .sort((left, right) => {
        const leftKey = `${left.metadata?.prefixHash ?? ''}:${left.id}`;
        const rightKey = `${right.metadata?.prefixHash ?? ''}:${right.id}`;
        return leftKey.localeCompare(rightKey);
      });
    const selected: Array<CacheBlock<{ content: string; tokenEstimate?: number }>> = [];
    let usedTokens = 0;
    for (const block of blocks) {
      const estimate =
        typeof block.value.tokenEstimate === 'number'
          ? block.value.tokenEstimate
          : Math.ceil(block.value.content.length / 4);
      if (usedTokens + estimate > this.policy.promptBudgetTokens) continue;
      selected.push(block);
      usedTokens += estimate;
    }
    const prefix = selected.map((block) => block.value.content).join('\n\n');
    const prefixHash = hashStableJson({
      blocks: selected.map((block) => ({
        cacheKey: block.cacheKey,
        validity: block.validity,
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
        cacheKey: first?.cacheKey ?? `workcache:PromptPrefixTree:prompt_prefix:sha256:${prefixHash}`,
        reason: 'materialized',
        prefixHash,
      }),
    };
  }

  private applyTreePolicy<T>(block: CacheBlock<T>): CacheBlock<T> {
    const treePolicy = this.policy.trees[block.treeType];
    const createdAt = block.createdAt || this.now();
    const ttlMs = treePolicy?.ttlMs;
    return {
      ...block,
      createdAt,
      updatedAt: this.now(),
      expiresAt: block.expiresAt ?? (ttlMs ? createdAt + ttlMs : undefined),
    };
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
    return Object.values(this.policy.trees).reduce(
      (sum, tree) => sum + (tree.maxEntries ?? 0),
      0
    );
  }
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

function mergeDemand(
  utility: CacheBlock['utility'],
  signal: DemandSignal
): CacheBlock['utility'] {
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
