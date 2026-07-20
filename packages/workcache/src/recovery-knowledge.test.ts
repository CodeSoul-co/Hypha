import { describe, expect, it } from 'vitest';
import { createFrameworkEvent, type RecoveryKnowledge } from '@hypha/core';
import { WorkCacheManager } from './manager';
import { WorkCacheRecoveryKnowledgeStore } from './recovery-knowledge';
import { MemoryWorkCacheStore } from './stores/memory-store';

function knowledge(overrides: Partial<RecoveryKnowledge> = {}): RecoveryKnowledge {
  return {
    key: {
      fingerprint: 'failure-fingerprint',
      participantId: 'memory-primary',
      policyRevision: 'policy-v1',
      specRevision: 'spec-v1',
      providerRevision: 'provider-v1',
    },
    strategy: 'degrade',
    outcome: 'degraded',
    evidenceHash: 'evidence-v2',
    learnedAt: '2026-07-16T00:00:00.000Z',
    validation: {
      status: 'verified',
      sourceEventId: 'recovery-attempt-1',
      proof: { bounded: true },
    },
    ...overrides,
  };
}

describe('@hypha/workcache recovery knowledge', () => {
  it('reuses only exact failure, participant, policy, spec, and provider revisions', async () => {
    const store = new MemoryWorkCacheStore();
    const recovery = new WorkCacheRecoveryKnowledgeStore(store, {
      now: () => Date.parse('2026-07-16T00:01:00.000Z'),
    });
    const first = knowledge();
    await recovery.put(first);

    await expect(recovery.get(first.key)).resolves.toEqual(first);
    await expect(
      recovery.get({ ...first.key, providerRevision: 'provider-v2' })
    ).resolves.toBeNull();

    const next = knowledge({
      key: { ...first.key, providerRevision: 'provider-v2' },
      learnedAt: '2026-07-16T00:02:00.000Z',
    });
    await recovery.put(next);
    await expect(recovery.get(first.key)).resolves.toBeNull();
    await expect(recovery.get(next.key)).resolves.toEqual(next);
    await expect(store.list('RecoveryTree')).resolves.toHaveLength(1);
  });

  it('expires recovery hints and deletes them from the cache source', async () => {
    const store = new MemoryWorkCacheStore();
    let time = Date.parse('2026-07-16T00:00:00.000Z');
    const recovery = new WorkCacheRecoveryKnowledgeStore(store, {
      ttlMs: 100,
      now: () => time,
    });
    const item = knowledge();
    await recovery.put(item);
    time += 101;

    await expect(recovery.get(item.key)).resolves.toBeNull();
    await expect(store.list('RecoveryTree')).resolves.toHaveLength(0);
  });

  it('exposes a shared manager port and materializes event-backed recovery knowledge', async () => {
    const store = new MemoryWorkCacheStore();
    const manager = new WorkCacheManager({
      store,
      policy: { enabled: true, store: 'memory' },
      now: () => Date.parse('2026-07-16T00:00:00.000Z'),
    });
    const item = knowledge();
    await manager.getRecoveryKnowledgePort().put(item);
    await expect(manager.getRecoveryKnowledgePort().get(item.key)).resolves.toEqual(item);

    const eventKnowledge = knowledge({
      key: { ...item.key, participantId: 'execution-primary' },
      strategy: 'reconcile',
      outcome: 'recovered',
    });
    const audit = await manager.ingest(
      createFrameworkEvent({
        id: 'recovery-attempt-2',
        type: 'recovery.attempt.completed',
        runId: 'run_recovery_cache',
        userId: 'owner',
        timestamp: '2026-07-16T00:00:00.000Z',
        payload: { knowledge: eventKnowledge },
      })
    );

    expect(audit.map((event) => event.type)).toContain('workcache.write');
    const blocks = await manager.forest.list<RecoveryKnowledge>('RecoveryTree');
    expect(blocks).toHaveLength(2);
    expect(blocks.map((block) => block.value.key.participantId)).toEqual(
      expect.arrayContaining(['memory-primary', 'execution-primary'])
    );
  });

  it('keeps optional recovery hints fail-open when the cache store is unavailable', async () => {
    const store = {
      async get() {
        throw new Error('offline');
      },
      async getByCacheKey() {
        throw new Error('offline');
      },
      async set() {
        throw new Error('offline');
      },
      async delete() {
        throw new Error('offline');
      },
      async list() {
        throw new Error('offline');
      },
    };
    const hints = new WorkCacheRecoveryKnowledgeStore(store, { failureMode: 'bypass' });

    await expect(hints.get(knowledge().key)).resolves.toBeNull();
    await expect(hints.put(knowledge())).resolves.toBeUndefined();
    await expect(hints.invalidate(knowledge().key, 'test')).resolves.toBeUndefined();
  });
});
