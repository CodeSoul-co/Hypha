import type { StructuredStoreProvider } from './index';
import type {
  MemoryExtractionBatch,
  MemoryExtractionCursor,
  MemoryExtractionJob,
  MemoryExtractionSourceType,
} from './lifecycle-contracts';
import type { MemoryExtractionStateStore } from './extraction';
import { memoryError } from './memory-utils';

interface StoredExtractionCursor extends MemoryExtractionCursor {
  id: string;
}

export interface StructuredMemoryExtractionStateStoreOptions {
  store: StructuredStoreProvider;
  jobTable?: string;
  batchTable?: string;
  cursorTable?: string;
}

export class StructuredMemoryExtractionStateStore implements MemoryExtractionStateStore {
  private readonly jobTable: string;
  private readonly batchTable: string;
  private readonly cursorTable: string;

  constructor(private readonly options: StructuredMemoryExtractionStateStoreOptions) {
    this.jobTable = options.jobTable ?? 'memory_extraction_jobs';
    this.batchTable = options.batchTable ?? 'memory_extraction_batches';
    this.cursorTable = options.cursorTable ?? 'memory_extraction_cursors';
  }

  getJob(id: string): Promise<MemoryExtractionJob | null> {
    return this.options.store.get<MemoryExtractionJob>(this.jobTable, id);
  }

  saveJob(job: MemoryExtractionJob): Promise<void> {
    return this.upsert(this.jobTable, job);
  }

  getBatch(id: string): Promise<MemoryExtractionBatch | null> {
    return this.options.store.get<MemoryExtractionBatch>(this.batchTable, id);
  }

  saveBatch(batch: MemoryExtractionBatch): Promise<void> {
    return this.upsert(this.batchTable, batch);
  }

  async getCursor(
    sourceType: MemoryExtractionSourceType,
    sourceId: string
  ): Promise<MemoryExtractionCursor | null> {
    const stored = await this.options.store.get<StoredExtractionCursor>(
      this.cursorTable,
      extractionCursorId(sourceType, sourceId)
    );
    if (!stored) return null;
    const { id: _id, ...cursor } = stored;
    return cursor;
  }

  async saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise<void> {
    const id = extractionCursorId(cursor.sourceType, cursor.sourceId);
    await this.options.store.transaction(async (transaction) => {
      const current = await transaction.get<StoredExtractionCursor>(this.cursorTable, id);
      const currentSequence = current?.sequence ?? 0;
      const expected = expectedSequence ?? currentSequence;
      if (currentSequence !== expected) {
        throw memoryError(
          'MEMORY_EXTRACTION_CURSOR_CONFLICT',
          `Extraction cursor changed before commit: ${id}`
        );
      }
      const stored: StoredExtractionCursor = { ...cursor, id };
      if (current) await transaction.update(this.cursorTable, id, stored);
      else await transaction.insert(this.cursorTable, stored);
    });
  }

  private async upsert<T extends { id: string }>(table: string, record: T): Promise<void> {
    await this.options.store.transaction(async (transaction) => {
      const current = await transaction.get<T>(table, record.id);
      if (current) await transaction.update(table, record.id, record);
      else await transaction.insert(table, record);
    });
  }
}

function extractionCursorId(type: MemoryExtractionSourceType, sourceId: string): string {
  return `${type}:${sourceId}`;
}
