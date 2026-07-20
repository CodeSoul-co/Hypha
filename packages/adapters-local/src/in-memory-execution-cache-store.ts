import { createHash } from 'crypto';
import {
  validateExecutionCacheRecord,
  type ExecutionCacheRecord,
  type ExecutionCacheStore,
  type ExecutionFingerprintHasher,
} from '@hypha/core';

export interface InMemoryExecutionCacheStoreOptions {
  maxEntries?: number;
  maxBytes?: number;
}

export interface InMemoryExecutionCacheStoreStats {
  entries: number;
  sizeBytes: number;
  evictions: number;
}

export class NodeExecutionFingerprintHasher implements ExecutionFingerprintHasher {
  readonly algorithm = 'sha256' as const;

  async hashUtf8(canonicalValue: string): Promise<string> {
    return `sha256:${createHash('sha256').update(canonicalValue, 'utf8').digest('hex')}`;
  }
}

/** Bounded local reference store. Durable or shared providers implement the same Core port. */
export class InMemoryExecutionCacheStore implements ExecutionCacheStore {
  private readonly records = new Map<string, ExecutionCacheRecord>();
  private readonly maxEntries: number;
  private readonly maxBytes: number;
  private sizeBytes = 0;
  private evictions = 0;

  constructor(options: InMemoryExecutionCacheStoreOptions = {}) {
    this.maxEntries = positiveInteger(options.maxEntries ?? 1000, 'maxEntries');
    this.maxBytes = positiveInteger(options.maxBytes ?? 64 * 1024 * 1024, 'maxBytes');
  }

  async get(key: string): Promise<ExecutionCacheRecord | null> {
    const record = this.records.get(key);
    if (!record) return null;
    this.records.delete(key);
    this.records.set(key, record);
    return clone(record);
  }

  async set(key: string, rawRecord: ExecutionCacheRecord): Promise<void> {
    const record = validateExecutionCacheRecord(rawRecord);
    if (record.key !== key) {
      throw new Error('Execution Cache store key does not match ExecutionCacheRecord.key.');
    }
    const previous = this.records.get(key);
    if (previous) this.sizeBytes -= recordSize(previous);
    this.records.delete(key);
    this.records.set(key, clone(record));
    this.sizeBytes += recordSize(record);
    this.prune();
  }

  async delete(key: string): Promise<void> {
    const previous = this.records.get(key);
    if (previous) this.sizeBytes -= recordSize(previous);
    this.records.delete(key);
  }

  async clear(): Promise<void> {
    this.records.clear();
    this.sizeBytes = 0;
  }

  stats(): InMemoryExecutionCacheStoreStats {
    return { entries: this.records.size, sizeBytes: this.sizeBytes, evictions: this.evictions };
  }

  private prune(): void {
    while (this.records.size > this.maxEntries || this.sizeBytes > this.maxBytes) {
      const oldestKey = this.records.keys().next().value as string | undefined;
      if (!oldestKey) return;
      const record = this.records.get(oldestKey);
      if (record) this.sizeBytes -= recordSize(record);
      this.records.delete(oldestKey);
      this.evictions += 1;
    }
  }
}

function recordSize(record: ExecutionCacheRecord): number {
  return record.sizeBytes ?? Buffer.byteLength(JSON.stringify(record), 'utf8');
}

function positiveInteger(value: number, field: string): number {
  if (!Number.isInteger(value) || value <= 0) {
    throw new TypeError(`${field} must be a positive integer.`);
  }
  return value;
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
