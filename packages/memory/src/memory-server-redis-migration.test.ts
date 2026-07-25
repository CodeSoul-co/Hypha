import { describe, expect, it } from 'vitest';
import { runRedisWorkingMemoryBehaviorAcceptance } from './memory-server-redis-migration-acceptance';
import {
  createInMemoryWorkingMemoryMigrationHarness,
  createRedisStreamWorkingMemoryMigrationHarness,
  InMemoryRedisStreamMigrationClient,
} from './memory-server-redis-migration-fixtures';
import {
  RedisStreamWorkingMemoryMigrationAdapter,
  scanRedisWorkingMemoryKeys,
} from './memory-server-redis-migration';

const scope = { userId: 'user:redis-command' };

describe('P0-2 Redis Working Memory behavior acceptance', () => {
  it('runs the complete boundary suite against the in-memory reference port', async () => {
    await expect(
      runRedisWorkingMemoryBehaviorAcceptance(() => createInMemoryWorkingMemoryMigrationHarness())
    ).resolves.toEqual({ passed: true, cases: 8, findings: [] });
  });

  it('runs the same boundary suite against the concrete Redis Stream adapter', async () => {
    await expect(
      runRedisWorkingMemoryBehaviorAcceptance((fixtureId) =>
        createRedisStreamWorkingMemoryMigrationHarness(fixtureId)
      )
    ).resolves.toEqual({ passed: true, cases: 8, findings: [] });
  });

  it('uses exact target MAXLEN, reverse latest reads and SCAN without KEYS', async () => {
    const client = new InMemoryRedisStreamMigrationClient();
    const adapter = new RedisStreamWorkingMemoryMigrationAdapter({
      client,
      namespace: 'test:redis:commands',
      scanBudget: { count: 1 },
      nowMs: () => 0,
    });
    await adapter.append({
      id: 'entry:1',
      scope,
      value: 'one',
      createdAt: '2026-07-22T00:00:00.000Z',
      maxMessages: 3,
    });
    await adapter.latest(scope);
    await adapter.clearScope(scope);

    expect(client.commands).toContainEqual(
      expect.objectContaining({ name: 'XTRIM', strategy: 'MAXLEN', threshold: 3 })
    );
    expect(client.commands).toContainEqual(
      expect.objectContaining({ name: 'XREVRANGE', end: '+', start: '-', count: 1 })
    );
    expect(client.commands).toContainEqual(expect.objectContaining({ name: 'SCAN', cursor: '0' }));
    expect(client.commands.map((command) => command.name)).not.toContain('KEYS');
  });

  it('traverses multiple SCAN pages and rejects repeated or over-budget cursors', async () => {
    const client = new InMemoryRedisStreamMigrationClient();
    client.seedStream('scope:a');
    client.seedStream('scope:b');
    client.seedStream('scope:c');
    await expect(
      scanRedisWorkingMemoryKeys(
        client,
        'scope:*',
        { maxCalls: 4, maxItems: 4, maxDurationMs: 100, count: 1 },
        () => 0
      )
    ).resolves.toEqual({ keys: ['scope:a', 'scope:b', 'scope:c'], calls: 3, terminated: true });

    const repeated = new InMemoryRedisStreamMigrationClient();
    repeated.seedStream('scope:a');
    repeated.repeatScanCursor('1');
    await expect(
      scanRedisWorkingMemoryKeys(
        repeated,
        'scope:*',
        { maxCalls: 4, maxItems: 4, maxDurationMs: 100, count: 1 },
        () => 0
      )
    ).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      details: { redisScanRejected: true, repeatedCursor: '1' },
    });

    await expect(
      scanRedisWorkingMemoryKeys(
        client,
        'scope:*',
        { maxCalls: 1, maxItems: 4, maxDurationMs: 100, count: 1 },
        () => 0
      )
    ).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      details: { redisScanRejected: true },
    });
    await expect(
      scanRedisWorkingMemoryKeys(
        client,
        'scope:*',
        { maxCalls: 4, maxItems: 1, maxDurationMs: 100, count: 2 },
        () => 0
      )
    ).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      details: { redisScanRejected: true, items: 2 },
    });
    const times = [0, 101];
    await expect(
      scanRedisWorkingMemoryKeys(
        client,
        'scope:*',
        { maxCalls: 4, maxItems: 4, maxDurationMs: 100, count: 1 },
        () => times.shift() ?? 101
      )
    ).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      details: { redisScanRejected: true, calls: 0 },
    });
  });
});
