import type { Collection } from 'mongodb';
import type {
  MemoryServerMigrationRehearsalCheckpoint,
  MemoryServerMigrationRehearsalCheckpointStore,
} from '@codesoul-co/memory';

interface CheckpointDocument {
  _id: string;
  checkpoint: MemoryServerMigrationRehearsalCheckpoint;
  updatedAt: string;
}

/**
 * Checkpoint archive retained after the legacy runtime path is retired.
 *
 * The archive is evidence only. It does not install, call, or revive a legacy
 * Memory implementation.
 */
export class MongoServerMemoryMigrationCheckpointStore implements MemoryServerMigrationRehearsalCheckpointStore {
  constructor(private readonly collection: Collection<CheckpointDocument>) {}

  async load(migrationId: string) {
    const document = await this.collection.findOne({ _id: migrationId });
    return document?.checkpoint ?? null;
  }

  async save(migrationId: string, checkpoint: MemoryServerMigrationRehearsalCheckpoint) {
    await this.collection.updateOne(
      { _id: migrationId },
      { $set: { checkpoint: structuredClone(checkpoint), updatedAt: new Date().toISOString() } },
      { upsert: true }
    );
  }
}
