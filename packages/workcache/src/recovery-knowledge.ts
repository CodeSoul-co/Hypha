import {
  parseRecoveryKnowledge,
  parseScopedRecoveryKnowledge,
  recoveryKnowledgeKeySchema,
  recoveryKnowledgeKeyMatches,
  recoveryKnowledgeScopeMatches,
  scopedRecoveryKnowledgeKeySchema,
  type RecoveryKnowledge,
  type RecoveryKnowledgeKey,
  type RecoveryKnowledgePort,
} from '@hypha/core';
import { hashStableJson } from './key';
import type { CacheBlock, RecoveryKnowledgeBlockValue, WorkCacheStore } from './types';

export interface WorkCacheRecoveryKnowledgeOptions {
  ttlMs?: number;
  now?: () => number;
  failureMode?: 'bypass' | 'strict';
  maxEntries?: number;
  requireUserScope?: boolean;
}

export class WorkCacheRecoveryKnowledgeStore implements RecoveryKnowledgePort {
  private readonly ttlMs: number;
  private readonly now: () => number;
  private readonly failureMode: 'bypass' | 'strict';
  private readonly maxEntries: number;
  private readonly requireUserScope: boolean;

  constructor(
    private readonly store: WorkCacheStore,
    options: WorkCacheRecoveryKnowledgeOptions = {}
  ) {
    this.ttlMs = Math.max(1, options.ttlMs ?? 6 * 60 * 60_000);
    this.now = options.now ?? Date.now;
    this.failureMode = options.failureMode ?? 'bypass';
    this.maxEntries = Math.max(1, options.maxEntries ?? 1000);
    this.requireUserScope = options.requireUserScope ?? true;
  }

  async get(key: RecoveryKnowledgeKey): Promise<RecoveryKnowledge | null> {
    try {
      return await this.getInternal(this.validateKey(key));
    } catch (error) {
      if (this.failureMode === 'strict') throw error;
      return null;
    }
  }

  private async getInternal(key: RecoveryKnowledgeKey): Promise<RecoveryKnowledge | null> {
    const block = await this.store.getByCacheKey<RecoveryKnowledgeBlockValue>(
      'RecoveryTree',
      recoveryKnowledgeCacheKey(key)
    );
    if (!block) return null;
    let knowledge: RecoveryKnowledge;
    try {
      knowledge = this.validateKnowledge(block.value);
    } catch (error) {
      await this.store.delete(block.id);
      throw error;
    }
    if (
      block.validity.status !== 'valid' ||
      (block.expiresAt !== undefined && block.expiresAt <= this.now()) ||
      (knowledge.expiresAt !== undefined && Date.parse(knowledge.expiresAt) <= this.now())
    ) {
      await this.store.delete(block.id);
      return null;
    }
    if (!recoveryKnowledgeKeyMatches(key, knowledge.key)) {
      await this.store.delete(block.id);
      return null;
    }
    await this.store.touch?.(block.id, this.now());
    return knowledge;
  }

  async put(knowledge: RecoveryKnowledge): Promise<void> {
    try {
      const validated = this.validateKnowledge(knowledge);
      await this.removeStaleRevisions(validated.key);
      await this.store.set(this.blockFromKnowledge(validated));
      await this.prune();
    } catch (error) {
      if (this.failureMode === 'strict') throw error;
    }
  }

  async invalidate(key: RecoveryKnowledgeKey, _reason: string): Promise<void> {
    try {
      const validatedKey = this.validateKey(key);
      const blocks = await this.listValidatedBlocks();
      await Promise.all(
        blocks
          .filter((block) => sameRecoveryKnowledgeIdentity(block.value.key, validatedKey))
          .map((block) => this.store.delete(block.id))
      );
    } catch (error) {
      if (this.failureMode === 'strict') throw error;
    }
  }

  private async removeStaleRevisions(key: RecoveryKnowledgeKey): Promise<void> {
    const blocks = await this.listValidatedBlocks();
    await Promise.all(
      blocks
        .filter(
          (block) =>
            sameRecoveryKnowledgeIdentity(block.value.key, key) &&
            !recoveryKnowledgeKeyMatches(key, block.value.key)
        )
        .map((block) => this.store.delete(block.id))
    );
  }

  private async prune(): Promise<void> {
    const blocks = await this.listValidatedBlocks();
    const excess = blocks
      .sort((left, right) => left.updatedAt - right.updatedAt)
      .slice(0, Math.max(0, blocks.length - this.maxEntries));
    await Promise.all(excess.map((block) => this.store.delete(block.id)));
  }

  private async listValidatedBlocks(): Promise<CacheBlock<RecoveryKnowledgeBlockValue>[]> {
    const blocks = await this.store.list<RecoveryKnowledgeBlockValue>('RecoveryTree');
    const valid: CacheBlock<RecoveryKnowledgeBlockValue>[] = [];
    for (const block of blocks) {
      try {
        valid.push({ ...block, value: this.validateKnowledge(block.value) });
      } catch (error) {
        await this.store.delete(block.id);
        if (this.failureMode === 'strict') throw error;
      }
    }
    return valid;
  }

  private validateKey(key: RecoveryKnowledgeKey): RecoveryKnowledgeKey {
    return this.requireUserScope
      ? scopedRecoveryKnowledgeKeySchema.parse(key)
      : recoveryKnowledgeKeySchema.parse(key);
  }

  private validateKnowledge(knowledge: RecoveryKnowledge): RecoveryKnowledge {
    return this.requireUserScope
      ? parseScopedRecoveryKnowledge(knowledge)
      : parseRecoveryKnowledge(knowledge);
  }

  private blockFromKnowledge(
    knowledge: RecoveryKnowledge
  ): CacheBlock<RecoveryKnowledgeBlockValue> {
    const now = this.now();
    const keyHash = hashStableJson(knowledge.key);
    const expiresAt = knowledge.expiresAt
      ? Math.min(Date.parse(knowledge.expiresAt), now + this.ttlMs)
      : now + this.ttlMs;
    const sourceHashes = Object.fromEntries(
      [
        ['policy', knowledge.key.policyRevision],
        ['spec', knowledge.key.specRevision],
        ['provider', knowledge.key.providerRevision],
      ].filter((entry): entry is [string, string] => typeof entry[1] === 'string')
    );
    return {
      id: `workcache:recovery:${keyHash}`,
      treeType: 'RecoveryTree',
      nodeType: 'recovery',
      cacheKey: recoveryKnowledgeCacheKey(knowledge.key),
      value: knowledge,
      createdAt: now,
      updatedAt: now,
      expiresAt,
      sourceEventId: knowledge.validation.sourceEventId ?? `recovery:${keyHash}`,
      sourceEventType: 'recovery.attempt.completed',
      provenance: {
        fingerprint: knowledge.key.fingerprint,
        participantId: knowledge.key.participantId,
        learnedAt: knowledge.learnedAt,
      },
      validity: {
        status: 'valid',
        proof: knowledge.validation.proof,
        sourceHashes,
        provenanceHash: hashStableJson({
          key: knowledge.key,
          validation: knowledge.validation,
        }),
      },
      utility: {
        score: knowledge.validation.status === 'verified' ? 1 : 0.25,
        staleRisk: sourceHashes.provider ? 0.1 : 0.5,
        validationCost: 1,
      },
      metadata: {
        strategy: knowledge.strategy,
        outcome: knowledge.outcome,
        validationStatus: knowledge.validation.status,
      },
      tags: ['recovery-knowledge', `recovery:${knowledge.validation.status}`],
    };
  }
}

export function recoveryKnowledgeCacheKey(key: RecoveryKnowledgeKey): string {
  return `workcache:RecoveryTree:recovery:sha256:${hashStableJson(key)}`;
}

function sameRecoveryKnowledgeIdentity(
  left: RecoveryKnowledgeKey,
  right: RecoveryKnowledgeKey
): boolean {
  return (
    left.fingerprint === right.fingerprint &&
    left.participantId === right.participantId &&
    recoveryKnowledgeScopeMatches(left.scope, right.scope)
  );
}
