import {
  validateExecutionCacheRecord,
  type ExecutionCacheRecord,
  type ExecutionCacheStore,
} from '@hypha/core';

export interface RedisLikeExecutionCacheClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, mode: 'PX', durationMilliseconds: number): Promise<unknown>;
  del(...keys: string[]): Promise<number>;
}

export interface RedisExecutionCacheStoreOptions {
  client: RedisLikeExecutionCacheClient;
  namespace?: string;
  maxEntryBytes?: number;
  defaultTtlMs?: number;
  now?: () => number;
}

/**
 * Key-bound shared Execution Cache Store. The client port can wrap local,
 * self-hosted, or managed Redis without exposing a Redis SDK to Core.
 */
export class RedisExecutionCacheStore implements ExecutionCacheStore {
  private readonly namespace: string;
  private readonly maxEntryBytes: number;
  private readonly defaultTtlMs: number;
  private readonly now: () => number;

  constructor(private readonly options: RedisExecutionCacheStoreOptions) {
    this.namespace = (options.namespace ?? 'hypha:execution-cache:v1').replace(/:+$/, '');
    this.maxEntryBytes = positiveInteger(options.maxEntryBytes ?? 1024 * 1024, 'maxEntryBytes');
    this.defaultTtlMs = positiveInteger(options.defaultTtlMs ?? 6 * 60 * 60 * 1000, 'defaultTtlMs');
    this.now = options.now ?? Date.now;
  }

  async get(key: string): Promise<ExecutionCacheRecord | null> {
    const physicalKey = this.physicalKey(key);
    const raw = await this.options.client.get(physicalKey);
    if (raw === null) return null;
    try {
      if (Buffer.byteLength(raw, 'utf8') > this.maxEntryBytes) {
        throw new Error('Execution Cache record exceeds its configured read limit.');
      }
      const record = validateExecutionCacheRecord(JSON.parse(raw), this.maxEntryBytes);
      if (record.key !== key) {
        throw new Error('Execution Cache physical key does not match its logical record key.');
      }
      return record;
    } catch {
      await this.options.client.del(physicalKey).catch(() => 0);
      return null;
    }
  }

  async set(key: string, input: ExecutionCacheRecord): Promise<void> {
    const record = validateExecutionCacheRecord(input, this.maxEntryBytes);
    if (record.key !== key) {
      throw new Error('Execution Cache store key does not match ExecutionCacheRecord.key.');
    }
    const ttlMs = record.expiresAt ? record.expiresAt - this.now() : this.defaultTtlMs;
    if (ttlMs <= 0) {
      await this.delete(key);
      return;
    }
    await this.options.client.set(this.physicalKey(key), JSON.stringify(record), 'PX', ttlMs);
  }

  async delete(key: string): Promise<void> {
    await this.options.client.del(this.physicalKey(key));
  }

  private physicalKey(key: string): string {
    return `${this.namespace}:${key}`;
  }
}

function positiveInteger(value: number, field: string): number {
  if (!Number.isInteger(value) || value <= 0) {
    throw new TypeError(`${field} must be a positive integer.`);
  }
  return value;
}
