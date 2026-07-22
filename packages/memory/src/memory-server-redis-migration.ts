import type { ManagedMemoryScope } from './contracts';
import { hashMemoryScope, memoryError } from './memory-utils';

export interface WorkingMemoryMigrationEntry<TValue = unknown> {
  id: string;
  scopeHash: string;
  value: TValue;
  createdAt: string;
}

export interface WorkingMemoryMigrationAppend<TValue = unknown> {
  id: string;
  scope: ManagedMemoryScope;
  value: TValue;
  createdAt: string;
  maxMessages: number;
}

export interface RedisScanBudget {
  maxCalls: number;
  maxItems: number;
  maxDurationMs: number;
  count: number;
}

export interface RedisScanReport {
  keys: string[];
  calls: number;
  terminated: boolean;
}

export interface WorkingMemoryMigrationPort {
  append<TValue = unknown>(input: WorkingMemoryMigrationAppend<TValue>): Promise<void>;
  list<TValue = unknown>(
    scope: ManagedMemoryScope
  ): Promise<Array<WorkingMemoryMigrationEntry<TValue>>>;
  latest<TValue = unknown>(
    scope: ManagedMemoryScope
  ): Promise<WorkingMemoryMigrationEntry<TValue> | null>;
  clearScope(
    scope: ManagedMemoryScope,
    budget?: Partial<RedisScanBudget>
  ): Promise<RedisScanReport>;
}

export interface RedisStreamMigrationClient {
  xadd(key: string, id: '*', field: 'entry', value: string): Promise<string | null>;
  xtrim(key: string, strategy: 'MAXLEN', threshold: number): Promise<number>;
  xrange(key: string, start: '-', end: '+'): Promise<Array<[string, string[]]>>;
  xrevrange(
    key: string,
    end: '+',
    start: '-',
    countToken: 'COUNT',
    count: 1
  ): Promise<Array<[string, string[]]>>;
  scan(
    cursor: string,
    matchToken: 'MATCH',
    pattern: string,
    countToken: 'COUNT',
    count: number
  ): Promise<[string, string[]]>;
  del(...keys: string[]): Promise<number>;
}

export interface RedisStreamWorkingMemoryMigrationAdapterOptions {
  client: RedisStreamMigrationClient;
  namespace?: string;
  scanBudget?: Partial<RedisScanBudget>;
  nowMs?: () => number;
}

const defaultScanBudget: RedisScanBudget = {
  maxCalls: 100,
  maxItems: 10_000,
  maxDurationMs: 60_000,
  count: 100,
};

/** Redis Stream adapter used by dev to execute the Framework-owned migration acceptance suite. */
export class RedisStreamWorkingMemoryMigrationAdapter implements WorkingMemoryMigrationPort {
  private readonly namespace: string;
  private readonly scanBudget: RedisScanBudget;
  private readonly nowMs: () => number;

  constructor(private readonly options: RedisStreamWorkingMemoryMigrationAdapterOptions) {
    this.namespace = options.namespace ?? 'hypha:memory:migration:working';
    this.scanBudget = { ...defaultScanBudget, ...options.scanBudget };
    this.nowMs = options.nowMs ?? (() => Date.now());
    validateScanBudget(this.scanBudget);
  }

  async append<TValue = unknown>(input: WorkingMemoryMigrationAppend<TValue>): Promise<void> {
    validateAppend(input);
    const entry: WorkingMemoryMigrationEntry<TValue> = {
      id: input.id,
      scopeHash: hashMemoryScope(input.scope),
      value: input.value,
      createdAt: input.createdAt,
    };
    const key = this.streamKey(input.scope);
    const streamId = await this.options.client.xadd(key, '*', 'entry', JSON.stringify(entry));
    if (!streamId) {
      throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Redis Stream append returned no entry id.');
    }
    await this.options.client.xtrim(key, 'MAXLEN', input.maxMessages);
  }

  async list<TValue = unknown>(
    scope: ManagedMemoryScope
  ): Promise<Array<WorkingMemoryMigrationEntry<TValue>>> {
    const rows = await this.options.client.xrange(this.streamKey(scope), '-', '+');
    return parseRows<TValue>(rows, hashMemoryScope(scope));
  }

  async latest<TValue = unknown>(
    scope: ManagedMemoryScope
  ): Promise<WorkingMemoryMigrationEntry<TValue> | null> {
    const rows = await this.options.client.xrevrange(this.streamKey(scope), '+', '-', 'COUNT', 1);
    return parseRows<TValue>(rows, hashMemoryScope(scope))[0] ?? null;
  }

  async clearScope(
    scope: ManagedMemoryScope,
    budget: Partial<RedisScanBudget> = {}
  ): Promise<RedisScanReport> {
    const report = await scanRedisWorkingMemoryKeys(
      this.options.client,
      `${this.scopePrefix(scope)}:*`,
      { ...this.scanBudget, ...budget },
      this.nowMs
    );
    if (report.keys.length > 0) await this.options.client.del(...report.keys);
    return report;
  }

  private streamKey(scope: ManagedMemoryScope): string {
    return `${this.scopePrefix(scope)}:entries`;
  }

  private scopePrefix(scope: ManagedMemoryScope): string {
    return `${this.namespace}:${hashMemoryScope(scope)}`;
  }
}

export async function scanRedisWorkingMemoryKeys(
  client: Pick<RedisStreamMigrationClient, 'scan'>,
  pattern: string,
  budget: RedisScanBudget = defaultScanBudget,
  nowMs: () => number = () => Date.now()
): Promise<RedisScanReport> {
  validateScanBudget(budget);
  const startedAt = nowMs();
  const keys = new Set<string>();
  const seenCursors = new Set<string>(['0']);
  let cursor = '0';
  let calls = 0;
  do {
    if (calls >= budget.maxCalls || nowMs() - startedAt > budget.maxDurationMs) {
      throw scanFailure('Redis SCAN budget was exhausted.', { calls, items: keys.size });
    }
    const [nextCursor, batch] = await client.scan(cursor, 'MATCH', pattern, 'COUNT', budget.count);
    calls += 1;
    for (const key of batch) {
      keys.add(key);
      if (keys.size > budget.maxItems) {
        throw scanFailure('Redis SCAN item budget was exceeded.', { calls, items: keys.size });
      }
    }
    if (nextCursor !== '0' && seenCursors.has(nextCursor)) {
      throw scanFailure('Redis SCAN returned a repeated cursor.', {
        calls,
        items: keys.size,
        repeatedCursor: nextCursor,
      });
    }
    seenCursors.add(nextCursor);
    cursor = nextCursor;
  } while (cursor !== '0');

  return { keys: [...keys].sort(), calls, terminated: true };
}

function parseRows<TValue>(
  rows: Array<[string, string[]]>,
  expectedScopeHash: string
): Array<WorkingMemoryMigrationEntry<TValue>> {
  return rows.map(([, fields]) => {
    const entryIndex = fields.indexOf('entry');
    if (entryIndex < 0 || typeof fields[entryIndex + 1] !== 'string') {
      throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Redis Stream row lacks entry payload.');
    }
    let entry: WorkingMemoryMigrationEntry<TValue>;
    try {
      entry = JSON.parse(fields[entryIndex + 1]!) as WorkingMemoryMigrationEntry<TValue>;
    } catch {
      throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Redis Stream entry payload is malformed.');
    }
    if (
      !entry ||
      typeof entry.id !== 'string' ||
      typeof entry.createdAt !== 'string' ||
      !Number.isFinite(Date.parse(entry.createdAt)) ||
      entry.scopeHash !== expectedScopeHash
    ) {
      throw memoryError(
        'MEMORY_SCOPE_DENIED',
        'Redis Stream entry does not match its Memory scope.'
      );
    }
    return entry;
  });
}

function validateAppend(input: WorkingMemoryMigrationAppend): void {
  if (!input.id || !Number.isInteger(input.maxMessages) || input.maxMessages < 0) {
    throw memoryError(
      'MEMORY_INVALID_INPUT',
      'Working Memory append requires an id and non-negative integer maxMessages.'
    );
  }
  if (!Number.isFinite(Date.parse(input.createdAt))) {
    throw memoryError(
      'MEMORY_INVALID_INPUT',
      'Working Memory createdAt must be a valid timestamp.'
    );
  }
}

function validateScanBudget(budget: RedisScanBudget): void {
  if (
    !Number.isInteger(budget.maxCalls) ||
    !Number.isInteger(budget.maxItems) ||
    !Number.isInteger(budget.count) ||
    budget.maxCalls <= 0 ||
    budget.maxItems <= 0 ||
    budget.maxDurationMs < 0 ||
    budget.count <= 0
  ) {
    throw memoryError('MEMORY_INVALID_INPUT', 'Redis SCAN budget must be finite and positive.');
  }
}

function scanFailure(message: string, details: Record<string, unknown>) {
  return memoryError('MEMORY_PROVIDER_UNAVAILABLE', message, false, {
    redisScanRejected: true,
    ...details,
  });
}
