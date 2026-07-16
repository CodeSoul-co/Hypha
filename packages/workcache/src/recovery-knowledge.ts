import {
  recoveryKnowledgeKeyMatches,
  type RecoveryKnowledge,
  type RecoveryKnowledgeKey,
  type RecoveryKnowledgePort,
} from '@hypha/core';
import { hashStableJson } from './key';
import type { CacheBlock, RecoveryKnowledgeBlockValue, WorkCacheStore } from './types';

export interface WorkCacheRecoveryKnowledgeOptions {
  ttlMs?: number;
  now?: () => number;
}

export class WorkCacheRecoveryKnowledgeStore implements RecoveryKnowledgePort {
  private readonly ttlMs: number;
  private readonly now: () => number;

  constructor(
    private readonly store: WorkCacheStore,
    options: WorkCacheRecoveryKnowledgeOptions = {}
  ) {
    this.ttlMs = Math.max(1, options.ttlMs ?? 6 * 60 * 60_000);
    this.now = options.now ?? Date.now;
  }

  async get(key: RecoveryKnowledgeKey): Promise<RecoveryKnowledge | null> {
    const block = await this.store.getByCacheKey<RecoveryKnowledgeBlockValue>(
      'RecoveryTree',
      recoveryKnowledgeCacheKey(key)
    );
    if (!block) return null;
    if (
      block.validity.status !== 'valid' ||
      (block.expiresAt !== undefined && block.expiresAt <= this.now()) ||
      (block.value.expiresAt !== undefined && Date.parse(block.value.expiresAt) <= this.now())
    ) {
      await this.store.delete(block.id);
      return null;
    }
    if (!recoveryKnowledgeKeyMatches(key, block.value.key)) {
      await this.store.delete(block.id);
      return null;
    }
    await this.store.touch?.(block.id, this.now());
    return block.value;
  }

  async put(knowledge: RecoveryKnowledge): Promise<void> {
    await this.removeStaleRevisions(knowledge.key);
    await this.store.set(this.blockFromKnowledge(knowledge));
  }

  async invalidate(key: RecoveryKnowledgeKey, _reason: string): Promise<void> {
    const blocks = await this.store.list<RecoveryKnowledgeBlockValue>('RecoveryTree');
    await Promise.all(
      blocks
        .filter(
          (block) =>
            block.value.key.fingerprint === key.fingerprint &&
            block.value.key.participantId === key.participantId
        )
        .map((block) => this.store.delete(block.id))
    );
  }

  private async removeStaleRevisions(key: RecoveryKnowledgeKey): Promise<void> {
    const blocks = await this.store.list<RecoveryKnowledgeBlockValue>('RecoveryTree');
    await Promise.all(
      blocks
        .filter(
          (block) =>
            block.value.key.fingerprint === key.fingerprint &&
            block.value.key.participantId === key.participantId &&
            !recoveryKnowledgeKeyMatches(key, block.value.key)
        )
        .map((block) => this.store.delete(block.id))
    );
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
