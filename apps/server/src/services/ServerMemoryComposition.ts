import fs from 'fs/promises';
import path from 'path';
import YAML from 'yaml';
import {
  CanonicalMemoryRuntimeLoader,
  InMemoryLocalVectorStoreAdapter,
  MemoryManagementProviderRegistry,
  MemoryRuntimeFactory,
  MongoStructuredStoreProvider,
  createMem0PlatformMemoryProviderFactory,
  createMemoryBankManagedProviderFactory,
  createNativeMemoryManagementProviderFactory,
  memoryError,
  type EmbeddingProvider,
  type MemoryApplicationService,
  type MemoryRuntime,
  type MemoryRuntimeCompositionReceipt,
  type MemoryServerConsumer,
  type MongoTransactionMode,
  type MongoDatabaseLike,
  type RedisLikeWorkingMemoryClient,
} from '@hypha/memory';
import { getMongoConnection, getRedisClient } from './database';
import { dbConfig } from '../config';
import { logger } from '../utils/logger';
import { createServerMemoryReferenceResolver } from './ServerMemoryReferences';

export type ServerMemoryCompositionState =
  | 'idle'
  | 'starting'
  | 'ready'
  | 'draining'
  | 'stopped'
  | 'failed';

export interface ServerMemoryReadiness {
  state: ServerMemoryCompositionState;
  ready: boolean;
  receipt?: MemoryRuntimeCompositionReceipt;
  providerStatus?: string;
  message?: string;
}

export interface ServerMemoryCompositionOptions {
  bootstrap: () => Promise<MemoryRuntime>;
}

/** The only Server registration point for the canonical Memory application service. */
export class ServerMemoryComposition {
  private state: ServerMemoryCompositionState = 'idle';
  private runtime: MemoryRuntime | null = null;
  private startPromise: Promise<MemoryRuntime> | null = null;
  private stopPromise: Promise<void> | null = null;
  private failureMessage: string | undefined;
  private readonly consumerBindings = new Map<MemoryServerConsumer, string>();

  constructor(private readonly options: ServerMemoryCompositionOptions) {}

  async start(): Promise<MemoryRuntimeCompositionReceipt> {
    if (this.runtime && this.state === 'ready') return this.runtime.compositionReceipt;
    if (this.startPromise) return (await this.startPromise).compositionReceipt;
    if (this.state === 'draining' || this.state === 'stopped') {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        'Server Memory composition cannot start after draining.'
      );
    }
    this.state = 'starting';
    this.startPromise = this.options.bootstrap();
    try {
      const runtime = await this.startPromise;
      if (this.state !== 'starting') {
        await runtime.close();
        throw memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          'Server Memory composition was drained during startup.'
        );
      }
      this.runtime = runtime;
      this.state = 'ready';
      this.failureMessage = undefined;
      return runtime.compositionReceipt;
    } catch (error) {
      this.state = 'failed';
      this.failureMessage = error instanceof Error ? error.message : String(error);
      throw error;
    } finally {
      this.startPromise = null;
    }
  }

  service(): MemoryApplicationService {
    if (this.state !== 'ready' || !this.runtime) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        `Server Memory composition is ${this.state}.`
      );
    }
    return this.runtime.service;
  }
  bindConsumer(consumer: MemoryServerConsumer): MemoryApplicationService {
    const service = this.service();
    this.consumerBindings.set(consumer, this.runtime!.compositionReceipt.serviceInstanceId);
    return service;
  }

  bindings(): Partial<Record<MemoryServerConsumer, string>> {
    return Object.fromEntries(this.consumerBindings);
  }

  profileRef() {
    if (this.state !== 'ready' || !this.runtime) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        `Server Memory composition is ${this.state}.`
      );
    }
    return {
      id: this.runtime.profile.id,
      version: this.runtime.profile.version,
      revision: this.runtime.profile.revision,
    };
  }

  async readiness(): Promise<ServerMemoryReadiness> {
    if (this.state !== 'ready' || !this.runtime) {
      return {
        state: this.state,
        ready: false,
        message: this.failureMessage,
      };
    }
    const health = await this.runtime.service.providerHealth();
    return {
      state: this.state,
      ready: health.status === 'healthy' || health.status === 'degraded',
      receipt: this.runtime.compositionReceipt,
      providerStatus: health.status,
      message: health.message,
    };
  }

  async stop(): Promise<void> {
    if (this.stopPromise) return this.stopPromise;
    this.stopPromise = this.stopInternal();
    return this.stopPromise;
  }

  private async stopInternal(): Promise<void> {
    if (this.state === 'stopped') return;
    this.state = 'draining';
    const pending = this.startPromise;
    if (pending) {
      try {
        await pending;
      } catch {
        // Startup failure is already reflected in readiness; shutdown still converges.
      }
    }
    const runtime = this.runtime;
    this.runtime = null;
    this.consumerBindings.clear();
    try {
      await runtime?.close();
    } finally {
      this.state = 'stopped';
    }
  }
}

let productionComposition: ServerMemoryComposition | null = null;

export function getServerMemoryComposition(): ServerMemoryComposition {
  if (!productionComposition) {
    productionComposition = new ServerMemoryComposition({
      bootstrap: createProductionMemoryRuntime,
    });
  }
  return productionComposition;
}

export function getMemoryApplicationService(
  consumer?: MemoryServerConsumer
): MemoryApplicationService {
  const composition = getServerMemoryComposition();
  return consumer ? composition.bindConsumer(consumer) : composition.service();
}

export async function initializeServerMemoryComposition(): Promise<MemoryRuntimeCompositionReceipt> {
  return getServerMemoryComposition().start();
}

export async function closeServerMemoryComposition(): Promise<void> {
  await getServerMemoryComposition().stop();
}

async function createProductionMemoryRuntime(): Promise<MemoryRuntime> {
  const mongo = getMongoConnection();
  const redis = getRedisClient();
  const database = mongo?.connection.db;
  if (!mongo || !database || !redis) {
    throw memoryError(
      'MEMORY_STORE_UNAVAILABLE',
      'Server storage must be initialized before Memory composition.'
    );
  }
  const client = mongo.connection.getClient();
  const hello = (await database.command({ hello: 1 })) as {
    setName?: string;
    msg?: string;
  };
  const transactionMode = resolveMongoTransactionMode(
    hello,
    process.env.HYPHA_MEMORY_MONGO_TRANSACTION_MODE,
    dbConfig().replicaSet
  );
  if (transactionMode === 'disabled') {
    logger.warn(
      'Canonical Memory is using standalone MongoDB without atomic record/outbox transactions.'
    );
  }
  const mongoDatabase: MongoDatabaseLike = {
    collection: (name) => database.collection(name) as never,
    startSession: () => client.startSession() as never,
    command: (command) => database.command(command),
  };
  const structuredStore = new MongoStructuredStoreProvider({
    database: mongoDatabase,
    collectionPrefix: 'canonical_memory_',
    transactionMode,
  });
  await structuredStore.initialize([
    'memory_external_mappings',
    'memory_external_provider_operations',
  ]);
  const registry = new MemoryManagementProviderRegistry()
    .register(
      createNativeMemoryManagementProviderFactory({
        structuredStore,
        redisClient: redis as unknown as RedisLikeWorkingMemoryClient,
        embeddingProvider: new LocalDeterministicEmbeddingProvider(),
        vectorStores: [new InMemoryLocalVectorStoreAdapter('memory.vector.local')],
        ownerId: `server:${process.pid}`,
        workingMemoryNamespace: 'hypha:memory:working',
      })
    )
    .register(createMem0PlatformMemoryProviderFactory())
    .register(createMemoryBankManagedProviderFactory());
  let eventSequence = 0;
  const factory = new MemoryRuntimeFactory({
    registry,
    activities: {
      policy: {
        authorize: async (request) => {
          const sameUser =
            !request.principal.userId || request.principal.userId === request.scope.userId;
          return {
            allowed: sameUser,
            reason: sameUser ? undefined : 'Principal user does not match Memory scope.',
            policyRevision: 'server-memory-policy-v1',
          };
        },
      },
      events: {
        publish: async (type, _payload, context) =>
          `server-memory:${context.runId}:${type}:${++eventSequence}`,
      },
      harness: {
        beforeExecute: async () => undefined,
        afterExecute: async () => undefined,
      },
    },
    eventContext: (request) => ({
      runId: request.scope.runId ?? request.operationId,
      sessionId: request.scope.sessionId,
      agentId: request.scope.agentId,
    }),
  });
  const configPath = path.resolve(
    process.cwd(),
    process.env.HYPHA_MEMORY_CONFIG_PATH?.trim() || 'configs/memory-profiles.yaml'
  );
  const document = YAML.parse(await fs.readFile(configPath, 'utf8')) as unknown;
  const loader = new CanonicalMemoryRuntimeLoader(
    createServerMemoryReferenceResolver({ structuredStore })
  );
  const loaded = await loader.load(document);
  const runtime = await factory.create(loaded.config, loaded.references);
  logger.info('Canonical Server Memory composition ready', {
    runtimeId: runtime.compositionReceipt.runtimeId,
    serviceInstanceId: runtime.compositionReceipt.serviceInstanceId,
    activeProfileId: runtime.compositionReceipt.activeProfileId,
    providerId: runtime.compositionReceipt.providerId,
  });
  return runtime;
}

export function resolveMongoTransactionMode(
  hello: { setName?: string; msg?: string },
  configured?: string,
  configuredReplicaSet?: string
): MongoTransactionMode {
  const explicit = configured?.trim().toLowerCase();
  if (explicit) {
    if (explicit === 'required' || explicit === 'preferred' || explicit === 'disabled') {
      return explicit;
    }
    throw memoryError(
      'MEMORY_INVALID_INPUT',
      'HYPHA_MEMORY_MONGO_TRANSACTION_MODE must be required, preferred, or disabled.'
    );
  }
  const transactionCapable =
    Boolean(hello.setName || configuredReplicaSet?.trim()) || hello.msg === 'isdbgrid';
  return transactionCapable ? 'required' : 'disabled';
}
class LocalDeterministicEmbeddingProvider implements EmbeddingProvider {
  async embed(inputs: string[]): Promise<number[][]> {
    return inputs.map((input) => deterministicVector(input));
  }
}

function deterministicVector(input: string): number[] {
  const values = Array.from({ length: 32 }, () => 0);
  for (let index = 0; index < input.length; index += 1) {
    values[index % values.length] += input.charCodeAt(index) / 65535;
  }
  const norm = Math.sqrt(values.reduce((sum, value) => sum + value * value, 0));
  return norm === 0 ? values : values.map((value) => value / norm);
}
