import { z, type ZodType } from 'zod';
import {
  defineSpecSchema,
  exportSpecJsonSchemas,
  jsonSchemaSchema,
  specMetadataSchema,
  specRefSchema,
  versionedSpecSchema,
  type JsonSchema,
  type SpecMetadata,
  type SpecRef,
  type VersionedSpec,
} from '@hypha/core';

export * from './recovery';

export type StorageProviderKind =
  | 'relational'
  | 'document'
  | 'messaging'
  | 'cache'
  | 'vector'
  | 'object'
  | 'event'
  | 'hybrid';

export type StorageDeploymentMode = 'local' | 'self_hosted' | 'managed' | 'cloud';

export type StorageEngine =
  | 'sqlite'
  | 'postgres'
  | 'mysql'
  | 'mongodb'
  | 'redis'
  | 'kafka'
  | 'local-vector'
  | 'pgvector'
  | 'qdrant'
  | 'milvus'
  | 'chroma'
  | 'pinecone'
  | 'weaviate'
  | 'file-artifact'
  | 's3'
  | 'gcs'
  | 'azure-blob'
  | 'json';

export type StorageCapability =
  | 'structured'
  | 'transactions'
  | 'events'
  | 'cache'
  | 'queue'
  | 'pubsub'
  | 'streams'
  | 'vector_search'
  | 'metadata_filter'
  | 'artifact_bytes'
  | 'managed_backup'
  | 'tls'
  | 'multi_region';

export type StorageRole =
  | 'source_of_truth'
  | 'event_log'
  | 'semantic_index'
  | 'cache'
  | 'message_queue'
  | 'artifact_store'
  | 'document_store'
  | 'hybrid_memory';

export interface StorageSecretRef {
  env?: string;
  secretRef?: string;
}

export interface StorageConnectionSpec {
  uri?: string;
  uriEnv?: string;
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  usernameEnv?: string;
  passwordEnv?: string;
  tls?: boolean;
  region?: string;
  options?: Record<string, unknown>;
}

export interface StorageProviderProfile extends VersionedSpec, SpecMetadata {
  kind: StorageProviderKind;
  engine: StorageEngine;
  deployment: StorageDeploymentMode;
  role: StorageRole;
  connection?: StorageConnectionSpec;
  capabilities?: StorageCapability[];
  consistency?: 'strong' | 'eventual';
  secrets?: {
    apiKey?: StorageSecretRef;
    username?: StorageSecretRef;
    password?: StorageSecretRef;
    token?: StorageSecretRef;
  };
  configSchema?: JsonSchema;
}

export interface StorageTopologySpec extends VersionedSpec, SpecMetadata {
  providers: StorageProviderProfile[];
  defaults: {
    relationalRef?: SpecRef;
    documentRef?: SpecRef;
    messagingRef?: SpecRef;
    cacheRef?: SpecRef;
    vectorRef?: SpecRef;
    artifactRef?: SpecRef;
    eventRef?: SpecRef;
    memoryRef?: SpecRef;
  };
}

export interface ResolvedStorageConnection {
  profileId: string;
  engine: StorageEngine;
  deployment: StorageDeploymentMode;
  uri?: string;
  uriSource?: 'env' | 'inline' | 'composed';
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  tls?: boolean;
  region?: string;
  options?: Record<string, unknown>;
}

export type EnvSource = Record<string, string | undefined>;

export const storageProviderKindSchema = z.enum([
  'relational',
  'document',
  'messaging',
  'cache',
  'vector',
  'object',
  'event',
  'hybrid',
]);

export const storageDeploymentModeSchema = z.enum(['local', 'self_hosted', 'managed', 'cloud']);

export const storageEngineSchema = z.enum([
  'sqlite',
  'postgres',
  'mysql',
  'mongodb',
  'redis',
  'kafka',
  'local-vector',
  'pgvector',
  'qdrant',
  'milvus',
  'chroma',
  'pinecone',
  'weaviate',
  'file-artifact',
  's3',
  'gcs',
  'azure-blob',
  'json',
]);

export const storageCapabilitySchema = z.enum([
  'structured',
  'transactions',
  'events',
  'cache',
  'queue',
  'pubsub',
  'streams',
  'vector_search',
  'metadata_filter',
  'artifact_bytes',
  'managed_backup',
  'tls',
  'multi_region',
]);

export const storageRoleSchema = z.enum([
  'source_of_truth',
  'event_log',
  'semantic_index',
  'cache',
  'message_queue',
  'artifact_store',
  'document_store',
  'hybrid_memory',
]);

export const storageSecretRefSchema = z.object({
  env: z.string().optional(),
  secretRef: z.string().optional(),
}) satisfies ZodType<StorageSecretRef>;

export const storageConnectionSpecSchema = z.object({
  uri: z.string().optional(),
  uriEnv: z.string().optional(),
  host: z.string().optional(),
  port: z.number().int().positive().optional(),
  database: z.string().optional(),
  username: z.string().optional(),
  usernameEnv: z.string().optional(),
  passwordEnv: z.string().optional(),
  tls: z.boolean().optional(),
  region: z.string().optional(),
  options: z.record(z.unknown()).optional(),
}) satisfies ZodType<StorageConnectionSpec>;

export const storageProviderProfileSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    kind: storageProviderKindSchema,
    engine: storageEngineSchema,
    deployment: storageDeploymentModeSchema,
    role: storageRoleSchema,
    connection: storageConnectionSpecSchema.optional(),
    capabilities: z.array(storageCapabilitySchema).optional(),
    consistency: z.enum(['strong', 'eventual']).optional(),
    secrets: z
      .object({
        apiKey: storageSecretRefSchema.optional(),
        username: storageSecretRefSchema.optional(),
        password: storageSecretRefSchema.optional(),
        token: storageSecretRefSchema.optional(),
      })
      .optional(),
    configSchema: jsonSchemaSchema.optional(),
  }) satisfies ZodType<StorageProviderProfile>;

export const storageTopologySpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    providers: z.array(storageProviderProfileSchema).min(1),
    defaults: z.object({
      relationalRef: specRefSchema.optional(),
      documentRef: specRefSchema.optional(),
      messagingRef: specRefSchema.optional(),
      cacheRef: specRefSchema.optional(),
      vectorRef: specRefSchema.optional(),
      artifactRef: specRefSchema.optional(),
      eventRef: specRefSchema.optional(),
      memoryRef: specRefSchema.optional(),
    }),
  }) satisfies ZodType<StorageTopologySpec>;

export const storageProviderProfileJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'kind', 'engine', 'deployment', 'role'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    kind: {
      enum: ['relational', 'document', 'messaging', 'cache', 'vector', 'object', 'event', 'hybrid'],
    },
    engine: {
      enum: [
        'sqlite',
        'postgres',
        'mysql',
        'mongodb',
        'redis',
        'kafka',
        'local-vector',
        'pgvector',
        'qdrant',
        'milvus',
        'chroma',
        'pinecone',
        'weaviate',
        'file-artifact',
        's3',
        'gcs',
        'azure-blob',
        'json',
      ],
    },
    deployment: { enum: ['local', 'self_hosted', 'managed', 'cloud'] },
    role: {
      enum: [
        'source_of_truth',
        'event_log',
        'semantic_index',
        'cache',
        'message_queue',
        'artifact_store',
        'document_store',
        'hybrid_memory',
      ],
    },
    connection: {
      type: 'object',
      properties: {
        uri: { type: 'string' },
        uriEnv: { type: 'string' },
        host: { type: 'string' },
        port: { type: 'number' },
        database: { type: 'string' },
        username: { type: 'string' },
        usernameEnv: { type: 'string' },
        passwordEnv: { type: 'string' },
        tls: { type: 'boolean' },
        region: { type: 'string' },
        options: { type: 'object' },
      },
      additionalProperties: false,
    },
    capabilities: {
      type: 'array',
      items: {
        enum: [
          'structured',
          'transactions',
          'events',
          'cache',
          'queue',
          'pubsub',
          'streams',
          'vector_search',
          'metadata_filter',
          'artifact_bytes',
          'managed_backup',
          'tls',
          'multi_region',
        ],
      },
    },
    consistency: { enum: ['strong', 'eventual'] },
    secrets: { type: 'object' },
    configSchema: { type: 'object' },
  },
  additionalProperties: false,
};

const specRefJsonSchema: JsonSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
  },
  additionalProperties: false,
};

export const storageTopologySpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'providers', 'defaults'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    providers: { type: 'array', items: storageProviderProfileJsonSchema },
    defaults: {
      type: 'object',
      properties: {
        relationalRef: specRefJsonSchema,
        documentRef: specRefJsonSchema,
        messagingRef: specRefJsonSchema,
        cacheRef: specRefJsonSchema,
        vectorRef: specRefJsonSchema,
        artifactRef: specRefJsonSchema,
        eventRef: specRefJsonSchema,
        memoryRef: specRefJsonSchema,
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

export const storageProviderProfileExample: StorageProviderProfile = {
  id: 'storage.sqlite.structured',
  version: '0.0.0',
  name: 'Local SQLite Structured Store',
  kind: 'relational',
  engine: 'sqlite',
  deployment: 'local',
  role: 'source_of_truth',
  connection: {
    uri: 'file:./data/runtime/structured/hypha.sqlite',
  },
  capabilities: ['structured', 'transactions'],
  consistency: 'strong',
};

export const storageTopologySpecExample: StorageTopologySpec = {
  id: 'storage.local',
  version: '0.0.0',
  name: 'Local Storage Topology',
  providers: [
    storageProviderProfileExample,
    {
      id: 'storage.redis.messaging',
      version: '0.0.0',
      name: 'Redis Messaging Store',
      kind: 'messaging',
      engine: 'redis',
      deployment: 'local',
      role: 'message_queue',
      connection: {
        uriEnv: 'REDIS_URL',
        host: 'localhost',
        port: 6379,
      },
      capabilities: ['cache', 'streams', 'queue', 'pubsub'],
      consistency: 'eventual',
    },
    {
      id: 'storage.local-vector.semantic',
      version: '0.0.0',
      name: 'Local Vector Semantic Index',
      kind: 'vector',
      engine: 'local-vector',
      deployment: 'local',
      role: 'semantic_index',
      connection: { uri: 'file:./data/storage/vector/vectors.json' },
      capabilities: ['vector_search', 'metadata_filter'],
      consistency: 'eventual',
    },
  ],
  defaults: {
    relationalRef: { id: 'storage.sqlite.structured', version: '0.0.0' },
    messagingRef: { id: 'storage.redis.messaging', version: '0.0.0' },
    cacheRef: { id: 'storage.redis.messaging', version: '0.0.0' },
    vectorRef: { id: 'storage.local-vector.semantic', version: '0.0.0' },
  },
};

export const storageProviderProfileDefinition = defineSpecSchema<StorageProviderProfile>({
  id: 'StorageProviderProfile',
  zod: storageProviderProfileSchema,
  jsonSchema: storageProviderProfileJsonSchema,
  example: storageProviderProfileExample,
});

export const storageTopologySpecDefinition = defineSpecSchema<StorageTopologySpec>({
  id: 'StorageTopologySpec',
  zod: storageTopologySpecSchema,
  jsonSchema: storageTopologySpecJsonSchema,
  example: storageTopologySpecExample,
});

export const storageSpecDefinitions = [
  storageProviderProfileDefinition,
  storageTopologySpecDefinition,
] as const;

export const storageSpecJsonSchemas = exportSpecJsonSchemas(storageSpecDefinitions);

export function validateStorageProviderProfile(input: unknown): StorageProviderProfile {
  return storageProviderProfileDefinition.parse(input);
}

export function validateStorageTopologySpec(input: unknown): StorageTopologySpec {
  const topology = storageTopologySpecDefinition.parse(input);
  const providerIds = new Set(topology.providers.map((provider) => provider.id));
  for (const ref of Object.values(topology.defaults)) {
    if (ref && !providerIds.has(ref.id)) {
      throw new Error(`Storage topology default references unknown provider: ${ref.id}`);
    }
  }
  return topology;
}

export function resolveStorageConnection(
  profile: StorageProviderProfile,
  env: EnvSource = process.env
): ResolvedStorageConnection {
  const connection = profile.connection ?? {};
  const envUri = connection.uriEnv ? nonEmpty(env[connection.uriEnv]) : undefined;
  const inlineUri = nonEmpty(connection.uri);
  const username = nonEmpty(connection.username)
    ?? (connection.usernameEnv ? nonEmpty(env[connection.usernameEnv]) : undefined);
  const resolved: ResolvedStorageConnection = {
    profileId: profile.id,
    engine: profile.engine,
    deployment: inferStorageDeployment(profile, envUri ?? inlineUri),
    host: connection.host,
    port: connection.port,
    database: connection.database,
    username,
    tls: connection.tls,
    region: connection.region,
    options: connection.options,
  };
  if (envUri) {
    return { ...resolved, uri: envUri, uriSource: 'env' };
  }
  if (inlineUri) {
    return { ...resolved, uri: inlineUri, uriSource: 'inline' };
  }
  const composed = composeStorageUri(profile, username, connection.passwordEnv
    ? nonEmpty(env[connection.passwordEnv])
    : undefined);
  return composed ? { ...resolved, uri: composed, uriSource: 'composed' } : resolved;
}

export function redactStorageConnection(
  connection: ResolvedStorageConnection
): ResolvedStorageConnection {
  return {
    ...connection,
    uri: connection.uri ? redactUri(connection.uri) : undefined,
    username: connection.username ? '<redacted>' : undefined,
  };
}

export function assertStorageCapability(
  profile: StorageProviderProfile,
  capability: StorageCapability
): void {
  if (!profile.capabilities?.includes(capability)) {
    throw new Error(`Storage profile ${profile.id} does not declare capability: ${capability}`);
  }
}

export function inferStorageDeployment(
  profile: StorageProviderProfile,
  uri?: string
): StorageDeploymentMode {
  if (profile.deployment !== 'local') return profile.deployment;
  const host = uri ? safeUrlHost(uri) : profile.connection?.host;
  if (!host) return profile.deployment;
  return isLocalHost(host) ? 'local' : 'cloud';
}

export function createMongoStorageProfile(input: {
  id?: string;
  deployment?: StorageDeploymentMode;
  uriEnv?: string;
  uri?: string;
  host?: string;
  port?: number;
  database?: string;
  tls?: boolean;
} = {}): StorageProviderProfile {
  const deployment = input.deployment ?? 'local';
  return {
    id: input.id ?? 'storage.mongodb.document',
    version: '0.0.0',
    name: 'MongoDB Document Store',
    kind: 'document',
    engine: 'mongodb',
    deployment,
    role: 'document_store',
    connection: {
      uri: input.uri,
      uriEnv: input.uriEnv ?? 'MONGODB_URI',
      host: input.host ?? 'localhost',
      port: input.port ?? 27017,
      database: input.database ?? 'hypha',
      tls: input.tls,
    },
    capabilities: withDeploymentCapabilities(['structured'], deployment, input.tls),
    consistency: 'strong',
  };
}

export function createRedisStorageProfile(input: {
  id?: string;
  deployment?: StorageDeploymentMode;
  uriEnv?: string;
  uri?: string;
  host?: string;
  port?: number;
  database?: string;
  tls?: boolean;
} = {}): StorageProviderProfile {
  const deployment = input.deployment ?? 'local';
  return {
    id: input.id ?? 'storage.redis.messaging',
    version: '0.0.0',
    name: 'Redis Messaging Store',
    kind: 'messaging',
    engine: 'redis',
    deployment,
    role: 'message_queue',
    connection: {
      uri: input.uri,
      uriEnv: input.uriEnv ?? 'REDIS_URL',
      host: input.host ?? 'localhost',
      port: input.port ?? 6379,
      database: input.database,
      tls: input.tls,
    },
    capabilities: withDeploymentCapabilities(
      ['cache', 'streams', 'queue', 'pubsub'],
      deployment,
      input.tls
    ),
    consistency: 'eventual',
  };
}

export function createKafkaStorageProfile(
  input: {
    id?: string;
    deployment?: StorageDeploymentMode;
    uriEnv?: string;
    uri?: string;
    host?: string;
    port?: number;
    tls?: boolean;
    region?: string;
  } = {}
): StorageProviderProfile {
  const deployment = input.deployment ?? 'local';
  return {
    id: input.id ?? 'storage.kafka.messaging',
    version: '0.0.0',
    name: 'Kafka Message Queue',
    kind: 'messaging',
    engine: 'kafka',
    deployment,
    role: 'message_queue',
    connection: {
      uri: input.uri,
      uriEnv: input.uriEnv ?? 'KAFKA_BROKERS',
      host: input.host ?? 'localhost',
      port: input.port ?? 9092,
      tls: input.tls,
      region: input.region,
    },
    capabilities: withDeploymentCapabilities(['queue', 'pubsub', 'streams'], deployment, input.tls),
    consistency: 'eventual',
  };
}

export function createSQLiteStorageProfile(input: {
  id?: string;
  role?: Extract<StorageRole, 'source_of_truth' | 'event_log'>;
  uri?: string;
  database?: string;
} = {}): StorageProviderProfile {
  const role = input.role ?? 'source_of_truth';
  const defaultDatabase = role === 'event_log'
    ? './data/runtime/events/hypha-events.sqlite'
    : './data/runtime/structured/hypha.sqlite';
  return {
    id: input.id ?? (role === 'event_log' ? 'storage.sqlite.events' : 'storage.sqlite.structured'),
    version: '0.0.0',
    name: role === 'event_log' ? 'Local SQLite Event Store' : 'Local SQLite Structured Store',
    kind: role === 'event_log' ? 'event' : 'relational',
    engine: 'sqlite',
    deployment: 'local',
    role,
    connection: {
      uri: input.uri ?? `file:${input.database ?? defaultDatabase}`,
      database: input.database,
    },
    capabilities:
      role === 'event_log'
        ? ['events', 'structured', 'transactions']
        : ['structured', 'transactions'],
    consistency: 'strong',
  };
}

export function createLocalVectorStorageProfile(input: {
  id?: string;
  uri?: string;
  database?: string;
} = {}): StorageProviderProfile {
  return {
    id: input.id ?? 'storage.local-vector.semantic',
    version: '0.0.0',
    name: 'Local Vector Semantic Index',
    kind: 'vector',
    engine: 'local-vector',
    deployment: 'local',
    role: 'semantic_index',
    connection: {
      uri: input.uri ?? `file:${input.database ?? './data/storage/vector/vectors.json'}`,
      database: input.database,
    },
    capabilities: ['vector_search', 'metadata_filter'],
    consistency: 'eventual',
  };
}

export function createFileArtifactStorageProfile(input: {
  id?: string;
  uri?: string;
  rootPath?: string;
} = {}): StorageProviderProfile {
  return {
    id: input.id ?? 'storage.file-artifact.local',
    version: '0.0.0',
    name: 'Local File Artifact Store',
    kind: 'object',
    engine: 'file-artifact',
    deployment: 'local',
    role: 'artifact_store',
    connection: {
      uri: input.uri ?? `file:${input.rootPath ?? './data/storage/artifacts'}`,
      database: input.rootPath,
    },
    capabilities: ['artifact_bytes'],
    consistency: 'strong',
  };
}

export type VectorStorageEngine = Extract<
  StorageEngine,
  'pgvector' | 'qdrant' | 'milvus' | 'chroma' | 'pinecone' | 'weaviate'
>;

export function createVectorStorageProfile(input: {
  engine: VectorStorageEngine;
  id?: string;
  deployment?: StorageDeploymentMode;
  uriEnv?: string;
  uri?: string;
  host?: string;
  port?: number;
  database?: string;
  tls?: boolean;
  region?: string;
  apiKeyEnv?: string;
  options?: Record<string, unknown>;
}): StorageProviderProfile {
  const deployment = input.deployment ?? 'local';
  return {
    id: input.id ?? `storage.${input.engine}.semantic`,
    version: '0.0.0',
    name: `${displayEngineName(input.engine)} Semantic Index`,
    kind: 'vector',
    engine: input.engine,
    deployment,
    role: 'semantic_index',
    connection: {
      uri: input.uri,
      uriEnv: input.uriEnv ?? defaultUriEnv(input.engine),
      host: input.host,
      port: input.port,
      database: input.database,
      tls: input.tls,
      region: input.region,
      options: input.options,
    },
    capabilities: withDeploymentCapabilities(
      ['vector_search', 'metadata_filter'],
      deployment,
      input.tls
    ),
    consistency: 'eventual',
    secrets: input.apiKeyEnv ? { apiKey: { env: input.apiKeyEnv } } : undefined,
  };
}

export function createQdrantStorageProfile(
  input: Omit<Parameters<typeof createVectorStorageProfile>[0], 'engine'> = {}
): StorageProviderProfile {
  return createVectorStorageProfile({ ...input, engine: 'qdrant' });
}

export function createChromaStorageProfile(
  input: Omit<Parameters<typeof createVectorStorageProfile>[0], 'engine'> = {}
): StorageProviderProfile {
  return createVectorStorageProfile({ ...input, engine: 'chroma' });
}

export function createPineconeStorageProfile(
  input: Omit<Parameters<typeof createVectorStorageProfile>[0], 'engine'> = {}
): StorageProviderProfile {
  return createVectorStorageProfile({
    deployment: 'managed',
    apiKeyEnv: 'PINECONE_API_KEY',
    ...input,
    engine: 'pinecone',
  });
}

export function createWeaviateStorageProfile(
  input: Omit<Parameters<typeof createVectorStorageProfile>[0], 'engine'> = {}
): StorageProviderProfile {
  return createVectorStorageProfile({ ...input, engine: 'weaviate' });
}

function composeStorageUri(
  profile: StorageProviderProfile,
  username: string | undefined,
  password: string | undefined
): string | undefined {
  const connection = profile.connection;
  if (!connection?.host) return undefined;
  const auth = username
    ? `${encodeURIComponent(username)}${password ? `:${encodeURIComponent(password)}` : ''}@`
    : '';
  const port = connection.port ? `:${connection.port}` : '';
  const database = connection.database ? `/${connection.database}` : '';
  switch (profile.engine) {
    case 'mongodb':
      return `mongodb://${auth}${connection.host}${port}${database}`;
    case 'redis':
      return `${connection.tls ? 'rediss' : 'redis'}://${auth}${connection.host}${port}${database}`;
    case 'kafka':
      return `${connection.tls ? 'kafka+ssl' : 'kafka'}://${connection.host}${port}`;
    case 'pgvector':
      return `postgresql://${auth}${connection.host}${port}${database}`;
    case 'qdrant':
    case 'milvus':
    case 'chroma':
    case 'pinecone':
    case 'weaviate':
      return `${connection.tls ? 'https' : 'http'}://${auth}${connection.host}${port}${database}`;
    case 'sqlite':
    case 'local-vector':
    case 'file-artifact':
    case 'json':
      return `file:${connection.host}${database}`;
    default:
      return undefined;
  }
}

function nonEmpty(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function safeUrlHost(uri: string): string | undefined {
  try {
    return new URL(uri).hostname;
  } catch {
    return undefined;
  }
}

function isLocalHost(host: string): boolean {
  const lower = host.toLowerCase();
  return lower === 'localhost'
    || lower === '127.0.0.1'
    || lower === '::1'
    || lower.endsWith('.local');
}

function withDeploymentCapabilities(
  base: StorageCapability[],
  deployment: StorageDeploymentMode,
  tls?: boolean
): StorageCapability[] {
  const capabilities = new Set(base);
  if (tls) capabilities.add('tls');
  if (deployment === 'managed' || deployment === 'cloud') {
    capabilities.add('managed_backup');
  }
  return Array.from(capabilities);
}

function defaultUriEnv(engine: StorageEngine): string | undefined {
  switch (engine) {
    case 'pgvector':
      return 'PGVECTOR_URL';
    case 'qdrant':
      return 'QDRANT_URL';
    case 'milvus':
      return 'MILVUS_URL';
    case 'chroma':
      return 'CHROMA_URL';
    case 'pinecone':
      return 'PINECONE_URL';
    case 'weaviate':
      return 'WEAVIATE_URL';
    default:
      return undefined;
  }
}

function displayEngineName(engine: StorageEngine): string {
  switch (engine) {
    case 'pgvector':
      return 'pgvector';
    case 'qdrant':
      return 'Qdrant';
    case 'milvus':
      return 'Milvus';
    case 'chroma':
      return 'Chroma';
    case 'pinecone':
      return 'Pinecone';
    case 'weaviate':
      return 'Weaviate';
    default:
      return engine;
  }
}

function redactUri(uri: string): string {
  try {
    const parsed = new URL(uri);
    if (parsed.username) parsed.username = '<redacted>';
    if (parsed.password) parsed.password = '<redacted>';
    return parsed.toString();
  } catch {
    return uri.replace(/\/\/([^:@/]+):([^@/]+)@/, '//<redacted>:<redacted>@');
  }
}
