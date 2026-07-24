import type { StructuredStoreProvider } from './index';
import {
  externalMemoryMappingSchema,
  type ExternalMemoryMapping,
  type ExternalMemoryMappingStore,
} from './external-adapters';
import { sha256 } from './memory-utils';

interface StoredExternalMemoryMapping extends ExternalMemoryMapping {
  id: string;
}

export interface StructuredExternalMemoryMappingStoreOptions {
  store: StructuredStoreProvider;
  table?: string;
}

/** Persistent, restart-safe mapping between Hypha memory IDs and provider IDs. */
export class StructuredExternalMemoryMappingStore implements ExternalMemoryMappingStore {
  readonly durability = 'durable' as const;
  private readonly table: string;

  constructor(private readonly options: StructuredExternalMemoryMappingStoreOptions) {
    this.table = options.table ?? 'memory_external_mappings';
  }

  async get(providerId: string, memoryId: string): Promise<ExternalMemoryMapping | null> {
    const stored = await this.options.store.get<StoredExternalMemoryMapping>(
      this.table,
      mappingId(providerId, memoryId)
    );
    return stored ? withoutStorageId(stored) : null;
  }

  async getByExternalId(
    providerId: string,
    externalId: string
  ): Promise<ExternalMemoryMapping | null> {
    const candidates = await this.options.store.query<StoredExternalMemoryMapping>(this.table, {
      where: { providerId },
    });
    const stored = candidates.find((mapping) => mapping.externalId === externalId);
    return stored ? withoutStorageId(stored) : null;
  }

  async set(mapping: ExternalMemoryMapping): Promise<void> {
    const validated = externalMemoryMappingSchema.parse(mapping);
    const record: StoredExternalMemoryMapping = {
      ...structuredClone(validated),
      id: mappingId(mapping.providerId, mapping.memoryId),
    };
    await this.options.store.transaction(async (transaction) => {
      const conflicting = (
        await transaction.query<StoredExternalMemoryMapping>(this.table, {
          where: { providerId: mapping.providerId },
        })
      ).find(
        (candidate) =>
          candidate.externalId === mapping.externalId && candidate.memoryId !== mapping.memoryId
      );
      if (conflicting) await transaction.delete(this.table, conflicting.id);
      const current = await transaction.get<StoredExternalMemoryMapping>(this.table, record.id);
      if (current) await transaction.update(this.table, record.id, record);
      else await transaction.insert(this.table, record);
    });
  }

  async list(providerId: string): Promise<ExternalMemoryMapping[]> {
    const mappings = await this.options.store.query<StoredExternalMemoryMapping>(this.table, {
      where: { providerId },
    });
    return mappings
      .sort((left, right) => left.memoryId.localeCompare(right.memoryId))
      .map(withoutStorageId);
  }
}

function mappingId(providerId: string, memoryId: string): string {
  return `memory:external-mapping:${sha256({ providerId, memoryId }).slice(0, 32)}`;
}

function withoutStorageId(stored: StoredExternalMemoryMapping): ExternalMemoryMapping {
  const { id: _id, ...mapping } = stored;
  return structuredClone(mapping);
}
