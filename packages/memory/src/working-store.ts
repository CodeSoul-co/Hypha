import type { ManagedMemoryScope } from './contracts';
import type { ProviderHealth } from './operations';
import { hashMemoryScope } from './memory-utils';
import { scanRedisWorkingMemoryKeys, type RedisScanBudget } from './memory-server-redis-migration';

export interface WorkingMemoryEntry<TValue = unknown> {
  id: string;
  scope: ManagedMemoryScope;
  scopeHash: string;
  value: TValue;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
}

export interface WorkingMemoryStore {
  get<TValue = unknown>(
    scope: ManagedMemoryScope,
    id: string
  ): Promise<WorkingMemoryEntry<TValue> | null>;
  set<TValue = unknown>(
    entry: Omit<WorkingMemoryEntry<TValue>, 'scopeHash'>,
    ttlSeconds?: number
  ): Promise<WorkingMemoryEntry<TValue>>;
  delete(scope: ManagedMemoryScope, id: string): Promise<void>;
  list<TValue = unknown>(scope: ManagedMemoryScope): Promise<Array<WorkingMemoryEntry<TValue>>>;
  clearScope(scope: ManagedMemoryScope): Promise<void>;
  health(): Promise<ProviderHealth>;
}

export class InMemoryWorkingMemoryStore implements WorkingMemoryStore {
  private readonly entries = new Map<string, WorkingMemoryEntry>();
  constructor(private readonly now: () => Date = () => new Date()) {}

  async get<TValue = unknown>(
    scope: ManagedMemoryScope,
    id: string
  ): Promise<WorkingMemoryEntry<TValue> | null> {
    const key = workingKey(scope, id);
    const entry = this.entries.get(key);
    if (!entry) return null;
    if (entry.expiresAt && entry.expiresAt <= this.now().toISOString()) {
      this.entries.delete(key);
      return null;
    }
    return structuredClone(entry) as WorkingMemoryEntry<TValue>;
  }

  async set<TValue = unknown>(
    entry: Omit<WorkingMemoryEntry<TValue>, 'scopeHash'>,
    ttlSeconds?: number
  ): Promise<WorkingMemoryEntry<TValue>> {
    const now = this.now();
    const stored: WorkingMemoryEntry<TValue> = {
      ...entry,
      scopeHash: hashMemoryScope(entry.scope),
      expiresAt:
        ttlSeconds === undefined
          ? entry.expiresAt
          : new Date(now.getTime() + ttlSeconds * 1_000).toISOString(),
    };
    this.entries.set(workingKey(entry.scope, entry.id), structuredClone(stored));
    return structuredClone(stored);
  }

  async delete(scope: ManagedMemoryScope, id: string): Promise<void> {
    this.entries.delete(workingKey(scope, id));
  }

  async list<TValue = unknown>(
    scope: ManagedMemoryScope
  ): Promise<Array<WorkingMemoryEntry<TValue>>> {
    const scopeHash = hashMemoryScope(scope);
    const entries: Array<WorkingMemoryEntry<TValue>> = [];
    for (const entry of this.entries.values()) {
      if (entry.scopeHash !== scopeHash) continue;
      const current = await this.get<TValue>(scope, entry.id);
      if (current) entries.push(current);
    }
    return entries.sort((left, right) => left.id.localeCompare(right.id));
  }

  async clearScope(scope: ManagedMemoryScope): Promise<void> {
    const scopeHash = hashMemoryScope(scope);
    for (const [key, entry] of this.entries) {
      if (entry.scopeHash === scopeHash) this.entries.delete(key);
    }
  }

  async health(): Promise<ProviderHealth> {
    return {
      status: 'healthy',
      checkedAt: this.now().toISOString(),
      details: { entries: this.entries.size },
    };
  }
}

export interface RedisLikeWorkingMemoryClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, mode?: 'EX', durationSeconds?: number): Promise<unknown>;
  del(...keys: string[]): Promise<number>;
  scan(
    cursor: string,
    matchToken: 'MATCH',
    pattern: string,
    countToken: 'COUNT',
    count: number
  ): Promise<[string, string[]]>;
  ping?(): Promise<string>;
}

export interface RedisWorkingMemoryStoreOptions {
  client: RedisLikeWorkingMemoryClient;
  namespace?: string;
  defaultTtlSeconds?: number;
  scanCount?: number;
  scanBudget?: Partial<Omit<RedisScanBudget, 'count'>>;
  now?: () => Date;
  nowMs?: () => number;
}

export class RedisWorkingMemoryStore implements WorkingMemoryStore {
  private readonly namespace: string;
  private readonly now: () => Date;

  constructor(private readonly options: RedisWorkingMemoryStoreOptions) {
    this.namespace = options.namespace ?? 'hypha:memory:working';
    this.now = options.now ?? (() => new Date());
  }

  async get<TValue = unknown>(
    scope: ManagedMemoryScope,
    id: string
  ): Promise<WorkingMemoryEntry<TValue> | null> {
    const raw = await this.options.client.get(this.key(scope, id));
    if (!raw) return null;
    const entry = JSON.parse(raw) as WorkingMemoryEntry<TValue>;
    if (entry.scopeHash !== hashMemoryScope(scope)) return null;
    if (entry.expiresAt && entry.expiresAt <= this.now().toISOString()) {
      await this.delete(scope, id);
      return null;
    }
    return entry;
  }

  async set<TValue = unknown>(
    entry: Omit<WorkingMemoryEntry<TValue>, 'scopeHash'>,
    ttlSeconds = this.options.defaultTtlSeconds
  ): Promise<WorkingMemoryEntry<TValue>> {
    const now = this.now();
    const stored: WorkingMemoryEntry<TValue> = {
      ...entry,
      scopeHash: hashMemoryScope(entry.scope),
      expiresAt:
        ttlSeconds === undefined
          ? entry.expiresAt
          : new Date(now.getTime() + ttlSeconds * 1_000).toISOString(),
    };
    if (ttlSeconds !== undefined) {
      await this.options.client.set(
        this.key(entry.scope, entry.id),
        JSON.stringify(stored),
        'EX',
        ttlSeconds
      );
    } else {
      await this.options.client.set(this.key(entry.scope, entry.id), JSON.stringify(stored));
    }
    return stored;
  }

  async delete(scope: ManagedMemoryScope, id: string): Promise<void> {
    await this.options.client.del(this.key(scope, id));
  }

  async list<TValue = unknown>(
    scope: ManagedMemoryScope
  ): Promise<Array<WorkingMemoryEntry<TValue>>> {
    const keys = await this.scanKeys(`${this.scopePrefix(scope)}:*`);
    const entries = await Promise.all(
      keys.map(async (key) => {
        const raw = await this.options.client.get(key);
        return raw ? (JSON.parse(raw) as WorkingMemoryEntry<TValue>) : null;
      })
    );
    const scopeHash = hashMemoryScope(scope);
    return entries
      .filter((entry): entry is WorkingMemoryEntry<TValue> =>
        Boolean(entry && entry.scopeHash === scopeHash)
      )
      .sort((left, right) => left.id.localeCompare(right.id));
  }

  async clearScope(scope: ManagedMemoryScope): Promise<void> {
    const keys = await this.scanKeys(`${this.scopePrefix(scope)}:*`);
    if (keys.length > 0) await this.options.client.del(...keys);
  }

  async health(): Promise<ProviderHealth> {
    try {
      await this.options.client.ping?.();
      return { status: 'healthy', checkedAt: this.now().toISOString() };
    } catch (error) {
      return {
        status: 'unhealthy',
        checkedAt: this.now().toISOString(),
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private key(scope: ManagedMemoryScope, id: string): string {
    return `${this.scopePrefix(scope)}:${encodeURIComponent(id)}`;
  }

  private scopePrefix(scope: ManagedMemoryScope): string {
    return `${this.namespace}:${hashMemoryScope(scope)}`;
  }

  private async scanKeys(pattern: string): Promise<string[]> {
    const report = await scanRedisWorkingMemoryKeys(
      this.options.client,
      pattern,
      {
        maxCalls: this.options.scanBudget?.maxCalls ?? 100,
        maxItems: this.options.scanBudget?.maxItems ?? 10_000,
        maxDurationMs: this.options.scanBudget?.maxDurationMs ?? 60_000,
        count: this.options.scanCount ?? 100,
      },
      this.options.nowMs
    );
    return report.keys;
  }
}

function workingKey(scope: ManagedMemoryScope, id: string): string {
  return `${hashMemoryScope(scope)}:${id}`;
}
