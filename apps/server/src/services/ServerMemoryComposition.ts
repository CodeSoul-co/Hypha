import fs from 'fs/promises';
import path from 'path';
import YAML from 'yaml';
import {
  CanonicalMemoryRuntimeLoader,
  InMemoryLocalVectorStoreAdapter,
  MemoryManagementProviderRegistry,
  MemoryOperationalMetrics,
  MemoryProviderTelemetry,
  MemoryRuntimeFactory,
  MongoStructuredStoreProvider,
  createHindsightLocalMemoryProviderFactory,
  createMem0OssMemoryProviderFactory,
  createMem0PlatformMemoryProviderFactory,
  createMemoryBankManagedProviderFactory,
  createNativeMemoryManagementProviderFactory,
  memoryError,
  sanitizeMemoryOperationalValue,
  type EmbeddingProvider,
  type MemoryApplicationService,
  type MemoryLifecycleTaskStore,
  type MemoryProviderCostEstimator,
  type MemoryProviderOperationalReport,
  type MemoryOperationalMetricsSnapshot,
  type MemoryProviderOperation,
  type MemoryRuntime,
  type MemoryRuntimeCompositionReceipt,
  type NativeMemoryRuntimeResources,
  type MemoryServerConsumer,
  type MongoTransactionMode,
  type MongoDatabaseLike,
  type ProviderHealth,
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
  | 'degraded'
  | 'draining'
  | 'stopped'
  | 'failed';

export interface ServerMemoryReadiness {
  state: ServerMemoryCompositionState;
  ready: boolean;
  receipt?: MemoryRuntimeCompositionReceipt;
  providerStatus?: string;
  requirement?: 'required' | 'optional';
  external?: boolean;
  evidence?: {
    profileId: string;
    providerId: string;
    providerStatus: string;
    requirement: 'required' | 'optional';
    external: boolean;
  };
  message?: string;
}

export interface ServerMemoryOperationalSnapshot {
  receipt: MemoryRuntimeCompositionReceipt;
  profile: { id: string; version: string; revision?: string };
  provider: ProviderHealth & { id: string };
  telemetry?: MemoryProviderOperationalReport;
  operationalMetrics?: MemoryOperationalMetricsSnapshot;
}
export interface ServerMemoryCompositionOptions {
  bootstrap: () => Promise<MemoryRuntime>;
  operationalMetrics?: MemoryOperationalMetrics;
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
    if (this.runtime && isServingState(this.state)) return this.runtime.compositionReceipt;
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
      this.failureMessage = sanitizeServerMemoryOperationalError(error);
      throw error;
    } finally {
      this.startPromise = null;
    }
  }

  service(): MemoryApplicationService {
    if (!isServingState(this.state) || !this.runtime) {
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
    if (!isServingState(this.state) || !this.runtime) {
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

  lifecycleTaskStore(): MemoryLifecycleTaskStore {
    if (!isServingState(this.state) || !this.runtime) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        `Server Memory composition is ${this.state}.`
      );
    }
    const resources = this.runtime.resources as Partial<NativeMemoryRuntimeResources> | undefined;
    if (!resources?.lifecycleStore) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        'The active Memory Provider does not expose a lifecycle task store.'
      );
    }
    return resources.lifecycleStore;
  }

  async operationalSnapshot(): Promise<ServerMemoryOperationalSnapshot> {
    if (!isServingState(this.state) || !this.runtime) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        `Server Memory composition is ${this.state}.`
      );
    }
    const health = await this.runtime.service.providerHealth();
    return {
      receipt: this.runtime.compositionReceipt,
      profile: {
        id: this.runtime.profile.id,
        version: this.runtime.profile.version,
        revision: this.runtime.profile.revision,
      },
      provider: { id: this.runtime.provider.id, ...health },
      telemetry: this.runtime.telemetry?.snapshot(this.runtime.provider.id),
      operationalMetrics: this.options.operationalMetrics?.snapshot(),
    };
  }

  async readiness(): Promise<ServerMemoryReadiness> {
    if (!isServingState(this.state) || !this.runtime) {
      return {
        state: this.state,
        ready: false,
        message: this.failureMessage,
      };
    }
    const health = await this.runtime.service.providerHealth();
    const availability = providerStartupAvailability(this.runtime);
    const ready =
      health.status === 'healthy' ||
      (!availability.external && health.status === 'degraded') ||
      (availability.external && availability.requirement === 'optional');
    if (
      availability.external &&
      availability.requirement === 'optional' &&
      health.status !== 'healthy'
    ) {
      this.state = 'degraded';
    } else if (this.state === 'degraded') {
      this.state = 'ready';
    }
    const message = health.message
      ? String(sanitizeMemoryOperationalValue(health.message))
      : undefined;
    return {
      state: this.state,
      ready,
      receipt: this.runtime.compositionReceipt,
      providerStatus: health.status,
      requirement: availability.requirement,
      external: availability.external,
      evidence: {
        profileId: this.runtime.profile.id,
        providerId: this.runtime.provider.id,
        providerStatus: health.status,
        requirement: availability.requirement,
        external: availability.external,
      },
      message,
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

const serverMemoryOperationalMetrics = new MemoryOperationalMetrics();

let productionComposition: ServerMemoryComposition | null = null;

export function getServerMemoryComposition(): ServerMemoryComposition {
  if (!productionComposition) {
    productionComposition = new ServerMemoryComposition({
      bootstrap: createProductionMemoryRuntime,
      operationalMetrics: serverMemoryOperationalMetrics,
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
  const database = mongo?.connection.db;
  if (!mongo || !database) {
    throw memoryError(
      'MEMORY_STORE_UNAVAILABLE',
      'MongoDB storage must be initialized before Memory composition.'
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
  const configPath = path.resolve(
    process.cwd(),
    process.env.HYPHA_MEMORY_CONFIG_PATH?.trim() || 'configs/memory-profiles.yaml'
  );
  const document = YAML.parse(await fs.readFile(configPath, 'utf8')) as unknown;
  const loader = new CanonicalMemoryRuntimeLoader(
    createServerMemoryReferenceResolver({ structuredStore })
  );
  const loaded = await loader.load(document);
  const selected = loaded.config.profiles[loaded.config.activeProfile];
  const redis = getRedisClient();
  if (selected.management.type === 'native' && !redis) {
    throw memoryError(
      'MEMORY_STORE_UNAVAILABLE',
      'The active Native Memory profile requires initialized Redis storage.'
    );
  }
  const registry = new MemoryManagementProviderRegistry();
  if (redis) {
    registry.register(
      createNativeMemoryManagementProviderFactory({
        structuredStore,
        redisClient: redis as unknown as RedisLikeWorkingMemoryClient,
        embeddingProvider: new LocalDeterministicEmbeddingProvider(),
        vectorStores: [new InMemoryLocalVectorStoreAdapter('memory.vector.local')],
        ownerId: `server:${process.pid}`,
        workingMemoryNamespace: 'hypha:memory:working',
        onIndexEvent: (event) => serverMemoryOperationalMetrics.observeIndexEvent(event),
        onLifecycleEvent: (event) => serverMemoryOperationalMetrics.observeLifecycleEvent(event),
      })
    );
  }
  registry
    .register(createMem0OssMemoryProviderFactory())
    .register(createHindsightLocalMemoryProviderFactory())
    .register(createMem0PlatformMemoryProviderFactory())
    .register(createMemoryBankManagedProviderFactory());
  let eventSequence = 0;
  const telemetry = createServerMemoryTelemetry();
  const activeProviderType = () =>
    loaded.config.profiles[loaded.config.activeProfile].management.type;
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
    telemetry,
    operationalMetrics: serverMemoryOperationalMetrics,
    providerCostEstimator: (operation, request) =>
      estimateServerMemoryOperation(operation, request, activeProviderType()),
  });
  const runtime = await factory.create(loaded.config, loaded.references);
  logger.info('Canonical Server Memory composition ready', {
    runtimeId: runtime.compositionReceipt.runtimeId,
    serviceInstanceId: runtime.compositionReceipt.serviceInstanceId,
    activeProfileId: runtime.compositionReceipt.activeProfileId,
    providerId: runtime.compositionReceipt.providerId,
  });
  return runtime;
}

export function createServerMemoryTelemetry(
  environment: NodeJS.ProcessEnv = process.env
): MemoryProviderTelemetry {
  const maxOperations = optionalNumber(environment, 'HYPHA_MEMORY_QUOTA_MAX_OPERATIONS', {
    integer: true,
    minimum: 1,
  });
  const maxCostUnits = optionalNumber(environment, 'HYPHA_MEMORY_QUOTA_MAX_COST_UNITS', {
    minimum: 0,
  });
  const maxStoredBytes = optionalNumber(environment, 'HYPHA_MEMORY_QUOTA_MAX_STORED_BYTES', {
    integer: true,
    minimum: 1,
  });
  const quota =
    maxOperations === undefined && maxCostUnits === undefined && maxStoredBytes === undefined
      ? undefined
      : { maxOperations, maxCostUnits, maxStoredBytes };
  return new MemoryProviderTelemetry({
    defaultPolicy: {
      windowMs:
        optionalNumber(environment, 'HYPHA_MEMORY_METRICS_WINDOW_MS', {
          integer: true,
          minimum: 1,
        }) ?? 300_000,
      maxSamples:
        optionalNumber(environment, 'HYPHA_MEMORY_METRICS_MAX_SAMPLES', {
          integer: true,
          minimum: 1,
        }) ?? 10_000,
      quota,
      slo: {
        minimumOperations:
          optionalNumber(environment, 'HYPHA_MEMORY_SLO_MIN_OPERATIONS', {
            integer: true,
            minimum: 1,
          }) ?? 10,
        availabilityTarget:
          optionalNumber(environment, 'HYPHA_MEMORY_SLO_AVAILABILITY', {
            minimum: 0,
            maximum: 1,
          }) ?? 0.99,
        latencyP95Ms:
          optionalNumber(environment, 'HYPHA_MEMORY_SLO_P95_MS', {
            minimum: 0,
          }) ?? 2_000,
      },
    },
  });
}

export function estimateServerMemoryOperation(
  operation: MemoryProviderOperation,
  request: unknown,
  providerType?: string
): ReturnType<MemoryProviderCostEstimator> {
  const costUnits = providerType === 'native' ? 0 : undefined;
  if (operation !== 'add' || !request || typeof request !== 'object') return { costUnits };
  const input = (request as { input?: unknown }).input;
  return { costUnits, storedBytesDelta: jsonBytes(input) };
}

function jsonBytes(value: unknown): number {
  try {
    return Buffer.byteLength(JSON.stringify(value) ?? 'null', 'utf8');
  } catch {
    return 0;
  }
}

function optionalNumber(
  environment: NodeJS.ProcessEnv,
  name: string,
  rules: { integer?: boolean; minimum?: number; maximum?: number }
): number | undefined {
  const raw = environment[name]?.trim();
  if (!raw) return undefined;
  const value = Number(raw);
  if (
    !Number.isFinite(value) ||
    (rules.integer && !Number.isInteger(value)) ||
    (rules.minimum !== undefined && value < rules.minimum) ||
    (rules.maximum !== undefined && value > rules.maximum)
  ) {
    throw memoryError('MEMORY_INVALID_INPUT', `Invalid ${name} Memory operations setting.`);
  }
  return value;
}

export function resolveMongoTransactionMode(
  hello: { setName?: string; msg?: string },
  configured?: string,
  configuredReplicaSet?: string
): MongoTransactionMode {
  const explicit = configured?.trim().toLowerCase();
  if (explicit && explicit !== 'auto') {
    if (explicit === 'required' || explicit === 'preferred' || explicit === 'disabled') {
      return explicit;
    }
    throw memoryError(
      'MEMORY_INVALID_INPUT',
      'HYPHA_MEMORY_MONGO_TRANSACTION_MODE must be auto, required, preferred, or disabled.'
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

function isServingState(state: ServerMemoryCompositionState): boolean {
  return state === 'ready' || state === 'degraded';
}

function providerStartupAvailability(runtime: MemoryRuntime): {
  requirement: 'required' | 'optional';
  external: boolean;
} {
  const configured = runtime.providerSpec.metadata?.startupRequirement;
  const requirement = configured === 'optional' ? 'optional' : 'required';
  const external =
    runtime.providerSpec.type !== undefined && runtime.providerSpec.type !== 'native';
  return { requirement, external };
}

export function sanitizeServerMemoryOperationalError(error: unknown): string {
  const value = error instanceof Error ? error.message : String(error);
  return String(sanitizeMemoryOperationalValue(value));
}
