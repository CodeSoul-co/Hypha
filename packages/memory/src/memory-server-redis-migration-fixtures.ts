import type { ManagedMemoryScope } from './contracts';
import { hashMemoryScope, memoryError } from './memory-utils';
import {
  RedisStreamWorkingMemoryMigrationAdapter,
  type RedisScanBudget,
  type RedisScanReport,
  type RedisStreamMigrationClient,
  type WorkingMemoryMigrationAppend,
  type WorkingMemoryMigrationEntry,
  type WorkingMemoryMigrationPort,
} from './memory-server-redis-migration';

export interface RedisWorkingMemoryBoundaryCase {
  id: string;
  preloadCount: number;
  appendCount: number;
  maxMessages: number;
  concurrent: boolean;
  exactOrder: boolean;
}

export const redisWorkingMemoryBoundaryCases: readonly RedisWorkingMemoryBoundaryCase[] = [
  {
    id: 'max-zero',
    preloadCount: 0,
    appendCount: 1,
    maxMessages: 0,
    concurrent: false,
    exactOrder: true,
  },
  {
    id: 'empty-to-one',
    preloadCount: 0,
    appendCount: 1,
    maxMessages: 1,
    concurrent: false,
    exactOrder: true,
  },
  {
    id: 'at-max',
    preloadCount: 3,
    appendCount: 1,
    maxMessages: 3,
    concurrent: false,
    exactOrder: true,
  },
  {
    id: 'max-plus-one',
    preloadCount: 4,
    appendCount: 1,
    maxMessages: 3,
    concurrent: false,
    exactOrder: true,
  },
  {
    id: 'large-batch',
    preloadCount: 0,
    appendCount: 25,
    maxMessages: 10,
    concurrent: false,
    exactOrder: true,
  },
  {
    id: 'concurrent',
    preloadCount: 5,
    appendCount: 25,
    maxMessages: 10,
    concurrent: true,
    exactOrder: false,
  },
];

export interface WorkingMemoryMigrationAcceptanceHarness {
  port: WorkingMemoryMigrationPort;
  restart(): WorkingMemoryMigrationPort;
}

export type WorkingMemoryMigrationHarnessFactory = (
  fixtureId: string
) => WorkingMemoryMigrationAcceptanceHarness;

export function createInMemoryWorkingMemoryMigrationHarness(): WorkingMemoryMigrationAcceptanceHarness {
  const storage = new Map<string, WorkingMemoryMigrationEntry[]>();
  return {
    port: new InMemoryWorkingMemoryMigrationPort(storage),
    restart: () => new InMemoryWorkingMemoryMigrationPort(storage),
  };
}

export function createRedisStreamWorkingMemoryMigrationHarness(
  fixtureId: string,
  client = new InMemoryRedisStreamMigrationClient()
): WorkingMemoryMigrationAcceptanceHarness & { client: InMemoryRedisStreamMigrationClient } {
  const options = {
    client,
    namespace: `test:memory:migration:${fixtureId}`,
    scanBudget: { count: 1 },
    nowMs: () => 0,
  };
  return {
    client,
    port: new RedisStreamWorkingMemoryMigrationAdapter(options),
    restart: () => new RedisStreamWorkingMemoryMigrationAdapter(options),
  };
}

export class InMemoryWorkingMemoryMigrationPort implements WorkingMemoryMigrationPort {
  constructor(private readonly storage = new Map<string, WorkingMemoryMigrationEntry[]>()) {}

  async append<TValue = unknown>(input: WorkingMemoryMigrationAppend<TValue>): Promise<void> {
    if (!Number.isInteger(input.maxMessages) || input.maxMessages < 0) {
      throw memoryError('MEMORY_INVALID_INPUT', 'maxMessages must be a non-negative integer.');
    }
    const key = hashMemoryScope(input.scope);
    const entries = this.storage.get(key) ?? [];
    entries.push({
      id: input.id,
      scopeHash: key,
      value: input.value,
      createdAt: input.createdAt,
    });
    this.storage.set(key, input.maxMessages === 0 ? [] : entries.slice(-input.maxMessages));
  }

  async list<TValue = unknown>(
    scope: ManagedMemoryScope
  ): Promise<Array<WorkingMemoryMigrationEntry<TValue>>> {
    return structuredClone(this.storage.get(hashMemoryScope(scope)) ?? []) as Array<
      WorkingMemoryMigrationEntry<TValue>
    >;
  }

  async latest<TValue = unknown>(
    scope: ManagedMemoryScope
  ): Promise<WorkingMemoryMigrationEntry<TValue> | null> {
    const entries = await this.list<TValue>(scope);
    return entries.at(-1) ?? null;
  }

  async clearScope(
    scope: ManagedMemoryScope,
    _budget?: Partial<RedisScanBudget>
  ): Promise<RedisScanReport> {
    this.storage.delete(hashMemoryScope(scope));
    return { keys: [hashMemoryScope(scope)], calls: 1, terminated: true };
  }
}

export type RedisMigrationCommand =
  | { name: 'XADD'; key: string }
  | { name: 'XTRIM'; key: string; strategy: 'MAXLEN'; threshold: number }
  | { name: 'XRANGE'; key: string; start: '-'; end: '+' }
  | { name: 'XREVRANGE'; key: string; end: '+'; start: '-'; count: 1 }
  | { name: 'SCAN'; cursor: string; pattern: string; count: number }
  | { name: 'DEL'; keys: string[] };

export class InMemoryRedisStreamMigrationClient implements RedisStreamMigrationClient {
  readonly commands: RedisMigrationCommand[] = [];
  private readonly streams = new Map<string, Array<[string, string[]]>>();
  private sequence = 0;
  private repeatedScanCursor?: string;

  async xadd(key: string, _id: '*', field: 'entry', value: string): Promise<string> {
    const streamId = `${++this.sequence}-0`;
    const entries = this.streams.get(key) ?? [];
    entries.push([streamId, [field, value]]);
    this.streams.set(key, entries);
    this.commands.push({ name: 'XADD', key });
    return streamId;
  }

  async xtrim(key: string, strategy: 'MAXLEN', threshold: number): Promise<number> {
    const entries = this.streams.get(key) ?? [];
    const retained = threshold === 0 ? [] : entries.slice(-threshold);
    this.streams.set(key, retained);
    this.commands.push({ name: 'XTRIM', key, strategy, threshold });
    return entries.length - retained.length;
  }

  async xrange(key: string, start: '-', end: '+'): Promise<Array<[string, string[]]>> {
    this.commands.push({ name: 'XRANGE', key, start, end });
    return structuredClone(this.streams.get(key) ?? []);
  }

  async xrevrange(
    key: string,
    end: '+',
    start: '-',
    _countToken: 'COUNT',
    count: 1
  ): Promise<Array<[string, string[]]>> {
    this.commands.push({ name: 'XREVRANGE', key, end, start, count });
    return structuredClone((this.streams.get(key) ?? []).slice(-count).reverse());
  }

  async scan(
    cursor: string,
    _matchToken: 'MATCH',
    pattern: string,
    _countToken: 'COUNT',
    count: number
  ): Promise<[string, string[]]> {
    this.commands.push({ name: 'SCAN', cursor, pattern, count });
    if (this.repeatedScanCursor) return [this.repeatedScanCursor, []];
    const prefix = pattern.endsWith('*') ? pattern.slice(0, -1) : pattern;
    const keys = [...this.streams.keys()].filter((key) => key.startsWith(prefix)).sort();
    const offset = Number.parseInt(cursor, 10);
    const batch = keys.slice(offset, offset + count);
    const next = offset + batch.length >= keys.length ? '0' : String(offset + batch.length);
    return [next, batch];
  }

  async del(...keys: string[]): Promise<number> {
    let deleted = 0;
    for (const key of keys) if (this.streams.delete(key)) deleted += 1;
    this.commands.push({ name: 'DEL', keys: [...keys] });
    return deleted;
  }

  seedStream(key: string): void {
    this.streams.set(key, []);
  }

  repeatScanCursor(cursor: string): void {
    this.repeatedScanCursor = cursor;
  }
}
