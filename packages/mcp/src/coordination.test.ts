import { describe, expect, it } from 'vitest';
import {
  RedisMCPCapabilityCatalogStore,
  RedisMCPReconnectCoordinator,
  mcpCapabilityRecordExample,
} from './index';

class FakeRedis {
  readonly strings = new Map<string, string>();
  readonly sets = new Map<string, Set<string>>();

  async get(key: string) {
    return this.strings.get(key) ?? null;
  }

  async set(
    key: string,
    value: string,
    mode?: 'PX',
    _ttlMs?: number,
    condition?: 'NX'
  ) {
    if (mode === 'PX' && condition === 'NX' && this.strings.has(key)) return null;
    this.strings.set(key, value);
    return 'OK';
  }

  async sadd(key: string, ...members: string[]) {
    const values = this.sets.get(key) ?? new Set<string>();
    const before = values.size;
    members.forEach((member) => values.add(member));
    this.sets.set(key, values);
    return values.size - before;
  }

  async smembers(key: string) {
    return Array.from(this.sets.get(key) ?? []);
  }

  async eval(_script: string, numberOfKeys: number, ...args: Array<string | number>) {
    if (numberOfKeys === 3) {
      const [recordKey, allKey, serverKey, expected, next, id] = args.map(String);
      const current = this.strings.get(recordKey);
      if (expected === '__NULL__' ? current !== undefined : current !== expected) return 0;
      this.strings.set(recordKey, next);
      await this.sadd(allKey, id);
      await this.sadd(serverKey, id);
      return 1;
    }
    const [key, expected] = args.map(String);
    if (this.strings.get(key) !== expected) return 0;
    this.strings.delete(key);
    return 1;
  }
}

describe('MCP Redis multi-worker coordination', () => {
  it('compare-and-sets catalog decisions so a stale worker cannot overwrite approval', async () => {
    const redis = new FakeRedis();
    const left = new RedisMCPCapabilityCatalogStore(redis, 'test:mcp:catalog');
    const right = new RedisMCPCapabilityCatalogStore(redis, 'test:mcp:catalog');
    await left.save(mcpCapabilityRecordExample);
    const leftRead = (await left.list(mcpCapabilityRecordExample.serverId))[0]!;
    const rightRead = (await right.list(mcpCapabilityRecordExample.serverId))[0]!;
    const leftDecision = {
      ...leftRead,
      driftState: 'approved' as const,
      trust: {
        ...leftRead.trust,
        approvedBy: 'reviewer-left',
        approvedAt: '2026-07-24T00:00:00.000Z',
      },
      approvedAt: '2026-07-24T00:00:00.000Z',
    };
    const rightDecision = {
      ...rightRead,
      driftState: 'quarantined' as const,
    };

    await expect(left.save(leftDecision, { expected: leftRead })).resolves.toBe(true);
    await expect(right.save(rightDecision, { expected: rightRead })).resolves.toBe(false);
    await expect(left.list(mcpCapabilityRecordExample.serverId)).resolves.toEqual([
      expect.objectContaining({
        driftState: 'approved',
        trust: expect.objectContaining({ approvedBy: 'reviewer-left' }),
      }),
    ]);
  });

  it('allows one reconnect owner and uses token-bound release to protect a successor', async () => {
    const redis = new FakeRedis();
    const left = new RedisMCPReconnectCoordinator(redis, 'test:mcp:reconnect');
    const right = new RedisMCPReconnectCoordinator(redis, 'test:mcp:reconnect');
    const first = await left.acquire({ serverId: 'remote', ownerId: 'worker-left', ttlMs: 30_000 });
    expect(first).not.toBeNull();
    await expect(
      right.acquire({ serverId: 'remote', ownerId: 'worker-right', ttlMs: 30_000 })
    ).resolves.toBeNull();

    const key = 'test:mcp:reconnect:remote';
    redis.strings.delete(key);
    const successor = await right.acquire({
      serverId: 'remote',
      ownerId: 'worker-right',
      ttlMs: 30_000,
    });
    expect(successor).not.toBeNull();
    await first?.release();
    expect(redis.strings.has(key)).toBe(true);
    await successor?.release();
    expect(redis.strings.has(key)).toBe(false);
  });
});
