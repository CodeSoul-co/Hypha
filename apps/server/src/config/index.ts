import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { z } from 'zod';
import { storageProviderProfileSchema } from '@hypha/storage';
import { logger } from '../utils/logger';

// Load environment variables
dotenv.config();

// Model configuration schema
const modelConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  enabled: z.boolean().default(true),
  default: z.boolean().default(false),
  description: z.string().optional(),
  contextWindow: z.number().optional(),
  features: z
    .object({
      streaming: z.boolean().default(true),
      toolCalling: z.boolean().default(false),
      vision: z.boolean().default(false),
    })
    .optional(),
  pricing: z
    .object({
      input: z.number().optional(),
      output: z.number().optional(),
      currency: z.string().default('USD'),
    })
    .optional(),
});

const storageDeploymentSchema = z.enum(['local', 'self_hosted', 'managed', 'cloud']);
const optionalStringSchema = z.preprocess((value) => {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  return trimmed === '' ? undefined : trimmed;
}, z.string().optional());

function parseBooleanish(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  const normalized = value.trim().toLowerCase();
  if (['true', '1', 'yes', 'y', 'on'].includes(normalized)) return true;
  if (['false', '0', 'no', 'n', 'off', ''].includes(normalized)) return false;
  return value;
}

const booleanishSchema = z.preprocess(parseBooleanish, z.boolean());
const optionalBooleanishSchema = z.preprocess((value) => {
  if (typeof value === 'string' && value.trim() === '') return undefined;
  return parseBooleanish(value);
}, z.boolean().optional());

// Provider API config schema
const providerConfigSchema = z.object({
  apiKey: optionalStringSchema,
  baseUrl: optionalStringSchema,
  timeout: z.number().default(60000),
});

const mongoStorageConfigSchema = z.object({
  uri: optionalStringSchema,
  uriEnv: z.string().default('MONGODB_URI'),
  deployment: storageDeploymentSchema.default('local'),
  host: z.string().default('localhost'),
  port: z.coerce.number().default(27017),
  database: z.string().default('hypha'),
  username: optionalStringSchema,
  password: optionalStringSchema,
  tls: booleanishSchema.default(false),
  authSource: optionalStringSchema,
  replicaSet: optionalStringSchema,
  directConnection: optionalBooleanishSchema,
  options: z
    .object({
      maxPoolSize: z.coerce.number().default(10),
      retryWrites: booleanishSchema.default(true),
    })
    .optional(),
});

const redisStorageConfigSchema = z.object({
  url: optionalStringSchema,
  urlEnv: z.string().default('REDIS_URL'),
  deployment: storageDeploymentSchema.default('local'),
  host: z.string().default('localhost'),
  port: z.coerce.number().default(6379),
  password: optionalStringSchema,
  db: z.coerce.number().default(0),
  keyPrefix: z.string().default('hypha:'),
  tls: booleanishSchema.default(false),
});

const kafkaStorageConfigSchema = z.object({
  enabled: booleanishSchema.default(false),
  deployment: storageDeploymentSchema.default('local'),
  brokers: z.array(z.string()).default([]),
  brokersEnv: z.string().default('KAFKA_BROKERS'),
  clientId: z.string().default('hypha'),
  ssl: booleanishSchema.default(false),
  saslUsernameEnv: z.string().optional(),
  saslPasswordEnv: z.string().optional(),
});

const relationalStorageConfigSchema = z.object({
  sqlite: z
    .object({
      enabled: booleanishSchema.default(true),
      deployment: z.literal('local').default('local'),
      sqliteMode: z.enum(['auto', 'sqlite', 'node-sqlite', 'json']).default('auto'),
      eventDbPath: z.string().default('./data/runtime/events/hypha-runtime-events.sqlite'),
      structuredDbPath: z.string().default('./data/runtime/structured/hypha-structured.sqlite'),
    })
    .default({}),
  postgres: z
    .object({
      enabled: booleanishSchema.default(false),
      deployment: storageDeploymentSchema.default('local'),
      url: optionalStringSchema,
      urlEnv: z.string().default('POSTGRES_URL'),
      host: z.string().default('localhost'),
      port: z.coerce.number().default(5432),
      database: z.string().default('hypha'),
      username: optionalStringSchema,
      passwordEnv: z.string().default('POSTGRES_PASSWORD'),
      tls: booleanishSchema.default(false),
    })
    .default({}),
});

const vectorStorageConfigSchema = z.object({
  local: z
    .object({
      enabled: booleanishSchema.default(true),
      deployment: z.literal('local').default('local'),
      path: z.string().default('./data/storage/vector/hypha-vectors.json'),
    })
    .default({}),
  qdrant: z
    .object({
      enabled: booleanishSchema.default(false),
      deployment: storageDeploymentSchema.default('self_hosted'),
      url: optionalStringSchema,
      urlEnv: z.string().default('QDRANT_URL'),
      collection: z.string().default('hypha_memory'),
      apiKeyEnv: z.string().default('QDRANT_API_KEY'),
      tls: booleanishSchema.default(false),
    })
    .default({}),
  chroma: z
    .object({
      enabled: booleanishSchema.default(false),
      deployment: storageDeploymentSchema.default('local'),
      url: optionalStringSchema,
      urlEnv: z.string().default('CHROMA_URL'),
      collection: z.string().default('hypha_memory'),
      tls: booleanishSchema.default(false),
    })
    .default({}),
  pinecone: z
    .object({
      enabled: booleanishSchema.default(false),
      deployment: storageDeploymentSchema.default('managed'),
      url: optionalStringSchema,
      urlEnv: z.string().default('PINECONE_URL'),
      index: z.string().default('hypha-memory'),
      apiKeyEnv: z.string().default('PINECONE_API_KEY'),
      region: optionalStringSchema,
      tls: booleanishSchema.default(true),
    })
    .default({}),
});

const artifactStorageConfigSchema = z.object({
  local: z
    .object({
      enabled: booleanishSchema.default(true),
      deployment: z.literal('local').default('local'),
      rootPath: z.string().default('./data/storage/artifacts'),
    })
    .default({}),
  s3: z
    .object({
      enabled: booleanishSchema.default(false),
      deployment: storageDeploymentSchema.default('managed'),
      bucket: optionalStringSchema,
      region: optionalStringSchema,
      endpoint: optionalStringSchema,
    })
    .default({}),
});

// Configuration schema
const configSchema = z.object({
  app: z.object({
    name: z.string().default('hypha'),
    version: z.string().default('1.0.0'),
    env: z.enum(['development', 'production', 'test']).default('development'),
    host: z.string().default('0.0.0.0'),
    port: z.coerce.number().default(3000),
    apiPrefix: z.string().default('/api/v1'),
  }),
  database: z
    .object({
      mongodb: mongoStorageConfigSchema.default({}),
    })
    .optional(),
  redis: redisStorageConfigSchema.optional(),
  llm: z.object({
    defaultProvider: z.string().default('anthropic'),
    defaultModel: z.string().default('claude-3-5-sonnet-20241022'),
    aliases: z.record(z.string()).default({}),
    fallbackAliases: z.array(z.string()).default([]),

    // Provider-specific model configurations
    anthropic: z
      .object({
        enabled: z.boolean().default(true),
        models: z.array(modelConfigSchema).optional(),
      })
      .optional(),

    openai: z
      .object({
        enabled: z.boolean().default(true),
        models: z.array(modelConfigSchema).optional(),
      })
      .optional(),

    google: z
      .object({
        enabled: z.boolean().default(true),
        models: z.array(modelConfigSchema).optional(),
      })
      .optional(),

    ollama: z
      .object({
        enabled: z.boolean().default(true),
        baseUrl: z.string().default('http://localhost:11434'),
        models: z.array(modelConfigSchema).optional(),
      })
      .optional(),

    deepseek: z
      .object({
        enabled: z.boolean().default(true),
        models: z.array(modelConfigSchema).optional(),
      })
      .optional(),

    // Legacy provider config (for API access)
    providers: z.record(providerConfigSchema).optional(),
  }),
  memory: z.object({
    temporary: z.object({
      maxPairs: z.number().default(50),
      ttl: z.number().default(86400),
      cleanupInterval: z.number().default(3600),
    }),
    permanent: z.object({
      enabled: z.boolean().default(true),
      archiveAfter: z.number().default(2592000),
    }),
  }),
  storage: z
    .object({
      deployment: z
        .object({
          mode: storageDeploymentSchema.default('local'),
          profile: z.string().default('local'),
        })
        .default({}),
      document: z
        .object({
          mongodb: mongoStorageConfigSchema.default({}),
        })
        .default({}),
      messaging: z
        .object({
          redis: redisStorageConfigSchema.default({}),
          kafka: kafkaStorageConfigSchema.default({}),
        })
        .default({}),
      relational: relationalStorageConfigSchema.default({}),
      vector: vectorStorageConfigSchema.default({}),
      artifacts: artifactStorageConfigSchema.default({}),
      profiles: z.array(storageProviderProfileSchema).default([]),
    })
    .default({
      deployment: {},
      document: {},
      messaging: {},
      relational: {},
      vector: {},
      artifacts: {},
      profiles: [],
    }),
  agents: z.object({
    configPath: z.string().default('./configs/agents.yaml'),
    defaultAgentId: z.string().default('default'),
  }),
  skills: z.object({
    // Back-compat: keep configPath as an optional field so old configs that
    // only declare a path don't error out. New configs should use `dirs`.
    configPath: z.string().optional(),
    autoLoad: z.boolean().default(true),
    // Extra directories (relative or absolute, ~ supported) to scan for
    // .md skill files in addition to the bundled builtins directory.
    // Order matters: later dirs override earlier ids.
    dirs: z.array(z.string()).optional(),
  }),
  tools: z.object({
    configPath: z.string().default('./configs/tools.yaml'),
    mcpServers: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          mode: z.enum(['local', 'remote']),
          command: z.string().optional(),
          args: z.array(z.string()).optional(),
          endpoint: z.string().optional(),
          authToken: z.string().optional(),
          autoStart: z.boolean().optional(),
          autoConnect: z.boolean().optional(),
        })
      )
      .optional(),
  }),
  workflows: z.object({
    configPath: z.string().default('./configs/workflows'),
    autoReload: z.boolean().default(true),
  }),
  prompts: z.object({
    templatesPath: z.string().default('./apps/server/src/prompts'),
    cacheEnabled: z.boolean().default(true),
  }),
  logging: z.object({
    level: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
    format: z.enum(['json', 'text']).default('json'),
    outputs: z
      .array(
        z.object({
          type: z.enum(['console', 'file']),
          path: z.string().optional(),
        })
      )
      .default([
        { type: 'console' },
        { type: 'file', path: './data/logs/system.log' },
      ]),
  }),
  auth: z.object({
    enabled: z.boolean().default(true),
    mode: z.enum(['single-user', 'multi-user']).default('single-user'),
    registration: z
      .object({
        enabled: z.boolean().default(false),
      })
      .default({ enabled: false }),
    singleUser: z
      .object({
        email: z.string().default('owner@hypha.local'),
        username: z.string().default('owner'),
        password: z.string().default('hypha_owner_2026'),
        displayName: z.string().default('hypha Owner'),
      })
      .default({
        email: 'owner@hypha.local',
        username: 'owner',
        password: 'hypha_owner_2026',
        displayName: 'hypha Owner',
      }),
    jwt: z.object({
      secret: z.string(),
      expiry: z.number().default(86400),
      refreshExpiry: z.number().default(604800),
    }),
    apiKey: z.object({
      enabled: z.boolean().default(true),
      headerName: z.string().default('X-API-Key'),
      storedHashed: z.boolean().default(true),
    }),
  }),
  rateLimit: z.object({
    enabled: z.boolean().default(true),
    windowMs: z.number().default(60000),
    max: z.number().default(100),
  }),
});

export type Config = z.infer<typeof configSchema>;

// Model config types
export interface ModelConfig {
  id: string;
  name: string;
  enabled: boolean;
  default: boolean;
  description?: string;
  contextWindow?: number;
  features?: {
    streaming: boolean;
    toolCalling: boolean;
    vision: boolean;
  };
  pricing?: {
    input?: number;
    output?: number;
    currency: string;
  };
}

// Provider model config types
export interface ProviderModelsConfig {
  enabled: boolean;
  models?: ModelConfig[];
  baseUrl?: string;
}

// Environment variable resolver - supports ${VAR} and ${VAR:default}
function resolveEnvVariables(obj: any): any {
  if (typeof obj === 'string') {
    // Match ${VAR} or ${VAR:default}
    const envPattern = /\$\{([^}:]+)(?::([^}]*))?\}/g;
    return obj.replace(envPattern, (_, varName, defaultValue) => {
      const envValue = process.env[varName];
      if (envValue !== undefined && envValue !== '') {
        return envValue;
      }
      return defaultValue !== undefined ? defaultValue : '';
    });
  }
  if (Array.isArray(obj)) {
    return obj.map(resolveEnvVariables);
  }
  if (obj && typeof obj === 'object') {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = resolveEnvVariables(value);
    }
    return result;
  }
  return obj;
}

// Load configuration from YAML
function loadYamlConfig(configPath: string): any {
  try {
    const fullPath = path.resolve(process.cwd(), configPath);
    if (!fs.existsSync(fullPath)) {
      logger.warn(`Config file not found: ${fullPath}`);
      return {};
    }
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    return yaml.load(fileContent) || {};
  } catch (error) {
    logger.error(`Failed to load config from ${configPath}:`, error);
    return {};
  }
}

// Merge configs
function mergeConfigs(...configs: any[]): any {
  return configs.reduce((acc, config) => {
    if (!config) return acc;
    for (const [key, value] of Object.entries(config)) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        acc[key] = mergeConfigs(acc[key] || {}, value);
      } else if (value !== undefined) {
        acc[key] = value;
      }
    }
    return acc;
  }, {});
}

// Load and validate configuration
function loadConfig(): Config {
  const configPath = path.resolve(process.cwd(), 'config.yaml');
  const yamlConfig = loadYamlConfig(configPath);

  const mergedConfig = mergeConfigs(yamlConfig, {
    app: { env: process.env.NODE_ENV || 'development' },
  });

  const resolvedConfig = resolveEnvVariables(mergedConfig);

  try {
    return configSchema.parse(resolvedConfig);
  } catch (error) {
    logger.error('Configuration validation failed:', error);
    throw new Error('Invalid configuration');
  }
}

// Singleton config instance
let configInstance: Config | null = null;

export function getConfig(): Config {
  if (!configInstance) {
    configInstance = loadConfig();
  }
  return configInstance;
}

export function reloadConfig(): Config {
  configInstance = loadConfig();
  return configInstance;
}

// Export specific config sections for convenience
export const appConfig = () => getConfig().app;
export const dbConfig = () => {
  const config = getConfig();
  return config.database?.mongodb ?? config.storage.document.mongodb;
};
export const redisConfig = () => {
  const config = getConfig();
  return config.redis ?? config.storage.messaging.redis;
};
export const storageConfig = () => getConfig().storage;
export const llmConfig = () => getConfig().llm;
export const memoryConfig = () => getConfig().memory;
export const authConfig = () => getConfig().auth;
export const rateLimitConfig = () => getConfig().rateLimit;

// Get enabled models for a provider
export function getEnabledModels(provider: string): ModelConfig[] {
  const config = getConfig().llm;
  const providerConfig = (config as any)[provider] as ProviderModelsConfig | undefined;

  if (!providerConfig?.enabled || !providerConfig.models) {
    return [];
  }

  return providerConfig.models.filter((m) => m.enabled);
}

// Get default model for a provider
export function getDefaultModel(provider: string): ModelConfig | undefined {
  const models = getEnabledModels(provider);
  return models.find((m) => m.default) || models[0];
}

export default getConfig;
