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
      scope: { userId: 'owner', sessionId: 'session-recovery' },
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

  it('never removes or reuses recovery knowledge across user scopes', async () => {
    const store = new MemoryWorkCacheStore();
    const recovery = new WorkCacheRecoveryKnowledgeStore(store);
    const owner = knowledge();
    const collaborator = knowledge({
      key: { ...owner.key, scope: { userId: 'collaborator' } },
      learnedAt: '2026-07-16T00:01:00.000Z',
    });
    await recovery.put(owner);
    await recovery.put(collaborator);

    await expect(recovery.get(owner.key)).resolves.toEqual(owner);
    await expect(recovery.get(collaborator.key)).resolves.toEqual(collaborator);
    await recovery.invalidate(owner.key, 'owner-only');
    await expect(recovery.get(owner.key)).resolves.toBeNull();
    await expect(recovery.get(collaborator.key)).resolves.toEqual(collaborator);
  });

  it('rejects unscoped and malformed knowledge before it can be reused', async () => {
    const store = new MemoryWorkCacheStore();
    const bypass = new WorkCacheRecoveryKnowledgeStore(store);
    const unscoped = knowledge({ key: { ...knowledge().key, scope: undefined } });
    await expect(bypass.put(unscoped)).resolves.toBeUndefined();
    await expect(store.list('RecoveryTree')).resolves.toHaveLength(0);

    const valid = knowledge();
    await bypass.put(valid);
    const [block] = await store.list<RecoveryKnowledge>('RecoveryTree');
    await store.set({
      ...block,
      value: { ...block.value, unexpected: true } as RecoveryKnowledge,
    });
    await expect(bypass.get(valid.key)).resolves.toBeNull();
    await expect(store.list('RecoveryTree')).resolves.toHaveLength(0);

    const strict = new WorkCacheRecoveryKnowledgeStore(store, { failureMode: 'strict' });
    await expect(strict.put(unscoped)).rejects.toThrow();
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

    const spoofed = knowledge({
      key: {
        ...item.key,
        participantId: 'spoofed-primary',
        scope: { userId: 'collaborator' },
      },
    });
    const spoofedAudit = await manager.ingest(
      createFrameworkEvent({
        id: 'recovery-attempt-spoofed',
        type: 'recovery.attempt.completed',
        runId: 'run_recovery_cache',
        userId: 'owner',
        timestamp: '2026-07-16T00:00:01.000Z',
        payload: { knowledge: spoofed },
      })
    );
    expect(spoofedAudit.map((event) => event.type)).not.toContain('workcache.write');
    await expect(manager.forest.list<RecoveryKnowledge>('RecoveryTree')).resolves.toHaveLength(2);
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
