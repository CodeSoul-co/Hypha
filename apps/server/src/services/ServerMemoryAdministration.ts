import fs from 'fs/promises';
import path from 'path';
import YAML from 'yaml';
import {
  canonicalMemoryRuntimeConfigSchema,
  inspectMemoryLifecycleDeadLetters,
  sha256,
  type MemoryDeadLetterInspection,
  type MemoryLifecycleTaskStore,
  type MemoryLifecycleWorkerType,
  type MemoryServerMigrationRehearsalCheckpoint,
  type MemoryServerMigrationRehearsalCheckpointStore,
} from '@codesoul-co/hypha-memory';
import { getMongoConnection } from './database';
import {
  getServerMemoryComposition,
  type ServerMemoryOperationalSnapshot,
} from './ServerMemoryComposition';
import { MongoServerMemoryMigrationCheckpointStore } from './ServerMemoryMigrationArchive';

export interface ServerMemoryProfileValidation {
  valid: boolean;
  configHash?: string;
  activeProfile?: string;
  profileRevision?: string;
  provider?: {
    id: string;
    type: string;
    deployment: string;
    installed: boolean;
  };
  issues: Array<{ path: string; code: string; message: string }>;
}

export interface ServerMemoryMigrationAdministrationSnapshot {
  migrationId: string;
  lifecycle: 'retired';
  legacyPathAvailable: false;
  action: 'none';
  checkpoint: null | {
    phase: string;
    activePath: string;
    revision: string;
    importedRecords: number;
    reconciliation: MemoryServerMigrationRehearsalCheckpoint['reconciliation'];
  };
}

export interface ServerMemoryAdministrationOptions {
  operationalSnapshot(): Promise<ServerMemoryOperationalSnapshot>;
  readConfiguration(): Promise<unknown>;
  migrationCheckpoints(): Pick<MemoryServerMigrationRehearsalCheckpointStore, 'load'>;
  lifecycleTaskStore(): MemoryLifecycleTaskStore;
}

export class ServerMemoryAdministration {
  constructor(private readonly options: ServerMemoryAdministrationOptions) {}

  health(): Promise<ServerMemoryOperationalSnapshot> {
    return this.options.operationalSnapshot();
  }

  async validateProfile(document?: unknown): Promise<ServerMemoryProfileValidation> {
    return validateServerMemoryConfiguration(
      document === undefined ? await this.options.readConfiguration() : document
    );
  }

  migrationPlan(input: {
    migrationId: string;
    userId: string;
  }): Promise<ServerMemoryMigrationAdministrationSnapshot> {
    return this.inspectMigration(input);
  }

  reconcile(input: {
    migrationId: string;
    userId: string;
  }): Promise<ServerMemoryMigrationAdministrationSnapshot> {
    return this.inspectMigration(input);
  }

  inspectDeadLetters(query: {
    workerType?: MemoryLifecycleWorkerType;
    scopeHash?: string;
  }): Promise<MemoryDeadLetterInspection[]> {
    return inspectMemoryLifecycleDeadLetters(this.options.lifecycleTaskStore(), query);
  }

  private async inspectMigration(input: {
    migrationId: string;
    userId: string;
  }): Promise<ServerMemoryMigrationAdministrationSnapshot> {
    if (!input.migrationId.trim() || !input.userId.trim()) {
      throw new Error('Migration ID and user ID are required.');
    }
    const checkpoint = await this.options.migrationCheckpoints().load(input.migrationId);
    return {
      migrationId: input.migrationId,
      lifecycle: 'retired',
      legacyPathAvailable: false,
      action: 'none',
      checkpoint: checkpoint
        ? {
            phase: checkpoint.state.phase,
            activePath: checkpoint.state.activePath,
            revision: checkpoint.state.revision,
            importedRecords: checkpoint.importedCanonicalIds.length,
            reconciliation: checkpoint.reconciliation,
          }
        : null,
    };
  }
}

let productionAdministration: ServerMemoryAdministration | null = null;

export function getServerMemoryAdministration(): ServerMemoryAdministration {
  if (!productionAdministration) {
    productionAdministration = new ServerMemoryAdministration({
      operationalSnapshot: () => getServerMemoryComposition().operationalSnapshot(),
      readConfiguration: readServerMemoryConfiguration,
      migrationCheckpoints: createProductionMigrationCheckpointStore,
      lifecycleTaskStore: () => getServerMemoryComposition().lifecycleTaskStore(),
    });
  }
  return productionAdministration;
}

export function validateServerMemoryConfiguration(
  document: unknown
): ServerMemoryProfileValidation {
  const parsed = canonicalMemoryRuntimeConfigSchema.safeParse(document);
  if (!parsed.success) {
    return {
      valid: false,
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        code: issue.code,
        message: issue.message,
      })),
    };
  }
  const selected = parsed.data.profiles[parsed.data.activeProfile];
  return {
    valid: true,
    configHash: sha256(parsed.data),
    activeProfile: selected.profile.id,
    profileRevision: selected.profile.revision,
    provider: {
      id: selected.management.id,
      type: selected.management.type,
      deployment: selected.management.deployment,
      installed: isInstalledServerProvider(selected.management),
    },
    issues: [],
  };
}

async function readServerMemoryConfiguration(): Promise<unknown> {
  const configPath = path.resolve(
    process.cwd(),
    process.env.HYPHA_MEMORY_CONFIG_PATH?.trim() || 'configs/memory-profiles.yaml'
  );
  return YAML.parse(await fs.readFile(configPath, 'utf8')) as unknown;
}

function createProductionMigrationCheckpointStore(): MemoryServerMigrationRehearsalCheckpointStore {
  const database = getMongoConnection()?.connection.db;
  if (!database) throw new Error('MongoDB is not initialized for Memory administration.');
  return new MongoServerMemoryMigrationCheckpointStore(
    database.collection('memory_migration_rehearsal_checkpoints') as never
  );
}

function isInstalledServerProvider(management: {
  type: string;
  deployment: string;
  config?: Record<string, unknown>;
}): boolean {
  if (management.type === 'native') return true;
  const protocol = asObject(management.config).protocol;
  return (
    (management.type === 'mem0' &&
      management.deployment === 'managed' &&
      protocol === 'mem0-platform-v3') ||
    (management.type === 'memorybank' &&
      management.deployment === 'managed' &&
      protocol === 'vertex-ai-agent-engine-memory-bank')
  );
}

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}
