import type { StructuredStoreProvider } from './index';
import type { MemoryIdempotencyStore } from './managed-store';
import { sha256 } from './memory-utils';

interface StoredMemoryIdempotencyResult {
  id: string;
  scopeHash: string;
  key: string;
  result: unknown;
}

export interface StructuredMemoryIdempotencyStoreOptions {
  store: StructuredStoreProvider;
  table?: string;
}

/** Durable idempotency results used to reconcile retries after process restart. */
export class StructuredMemoryIdempotencyStore implements MemoryIdempotencyStore {
  private readonly table: string;

  constructor(private readonly options: StructuredMemoryIdempotencyStoreOptions) {
    this.table = options.table ?? 'memory_idempotency_results';
  }

  async get(scopeHash: string, key: string): Promise<unknown | null> {
    const stored = await this.options.store.get<StoredMemoryIdempotencyResult>(
      this.table,
      idempotencyId(scopeHash, key)
    );
    return stored ? structuredClone(stored.result) : null;
  }

  async set(scopeHash: string, key: string, result: unknown): Promise<void> {
    const record: StoredMemoryIdempotencyResult = {
      id: idempotencyId(scopeHash, key),
      scopeHash,
      key,
      result: structuredClone(result),
    };
    await this.options.store.transaction(async (transaction) => {
      const current = await transaction.get<StoredMemoryIdempotencyResult>(this.table, record.id);
      if (current) await transaction.update(this.table, record.id, record);
      else await transaction.insert(this.table, record);
    });
  }
}

function idempotencyId(scopeHash: string, key: string): string {
  return `memory:idempotency:${sha256({ scopeHash, key }).slice(0, 32)}`;
}
