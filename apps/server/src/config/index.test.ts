import {
  dbConfig,
  filesystemToolConfig,
  inferenceConfig,
  redisConfig,
  reloadConfig,
  servingCacheConfig,
  storageConfig,
  workCacheConfig,
} from './index';

const trackedEnv = [
  'MONGODB_URI',
  'MONGODB_HOST',
  'REDIS_URL',
  'REDIS_HOST',
  'HYPHA_STORAGE_EVENT_DB',
  'HYPHA_STORAGE_STRUCTURED_DB',
  'HYPHA_STORAGE_VECTOR_INDEX',
  'HYPHA_STORAGE_ARTIFACT_ROOT',
  'HYPHA_SYSTEM_LOG_PATH',
  'KAFKA_ENABLED',
  'HYPHA_INFERENCE_DEFAULT_BACKEND',
  'HYPHA_INFERENCE_RUNTIME_PROVIDER',
  'HYPHA_LOCAL_INFERENCE_ENABLED',
  'HYPHA_LOCAL_INFERENCE_ENGINE',
  'HYPHA_LOCAL_INFERENCE_MODE',
  'HYPHA_LOCAL_INFERENCE_AUTO_START',
  'HYPHA_LOCAL_INFERENCE_MODEL',
  'HYPHA_LOCAL_INFERENCE_PORT',
  'OLLAMA_INFERENCE_BASE_URL',
  'SGLANG_BASE_URL',
  'VLLM_BASE_URL',
  'LLAMA_CPP_BASE_URL',
  'OPENAI_INFERENCE_BASE_URL',
  'HYPHA_SERVING_CACHE',
  'HYPHA_SERVING_CACHE_ENABLED',
  'HYPHA_SERVING_CACHE_MODE',
  'HYPHA_WORKCACHE',
  'HYPHA_WORKCACHE_ENABLED',
  'HYPHA_WORKCACHE_SQLITE_PATH',
  'HYPHA_WORKCACHE_PROMPT_BUDGET_TOKENS',
  'HYPHA_FILESYSTEM_WORKING_DIRECTORY',
  'HYPHA_FILESYSTEM_READ_PATHS',
  'HYPHA_FILESYSTEM_WRITE_PATHS',
  'HYPHA_FILESYSTEM_EXECUTE_PATHS',
  'HYPHA_FILESYSTEM_EXECUTION_ENABLED',
  'HYPHA_FILESYSTEM_EXECUTION_TIMEOUT_MS',
  'HYPHA_FILESYSTEM_MAX_OUTPUT_BYTES',
  'FILESYSTEM_TOOL_ROOT',
] as const;

describe('configuration storage taxonomy', () => {
  const originalEnv: Partial<Record<(typeof trackedEnv)[number], string>> = {};

  beforeEach(() => {
    for (const key of trackedEnv) {
      originalEnv[key] = process.env[key];
      delete process.env[key];
    }
  });

  afterEach(() => {
    for (const key of trackedEnv) {
      const value = originalEnv[key];
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
    reloadConfig();
  });

  it('loads document, messaging, relational, and vector storage groups', () => {
    process.env.MONGODB_HOST = 'mongo.local';
    process.env.REDIS_HOST = 'redis.local';
    process.env.HYPHA_STORAGE_EVENT_DB = './data/events.test.sqlite';
    process.env.HYPHA_STORAGE_VECTOR_INDEX = './data/vectors.test.json';
    process.env.HYPHA_SYSTEM_LOG_PATH = './data/logs/test-system.log';
    process.env.KAFKA_ENABLED = 'true';

    const config = reloadConfig();

    expect(config.storage.document.mongodb.host).toBe('mongo.local');
    expect(config.storage.messaging.redis.host).toBe('redis.local');
    expect(config.storage.messaging.kafka.enabled).toBe(true);
    expect(config.storage.relational.sqlite.eventDbPath).toBe('./data/events.test.sqlite');
    expect(config.storage.vector.local.path).toBe('./data/vectors.test.json');
    expect(config.logging.outputs?.[1]?.path).toBe('./data/logs/test-system.log');
    expect(dbConfig().host).toBe('mongo.local');
    expect(redisConfig().host).toBe('redis.local');
  });

  it('normalizes empty connection URLs while preserving local startup defaults', () => {
    process.env.MONGODB_URI = '';
    process.env.REDIS_URL = '';

    reloadConfig();

    expect(dbConfig().uri).toBeUndefined();
    expect(dbConfig().host).toBe('localhost');
    expect(redisConfig().url).toBeUndefined();
    expect(redisConfig().host).toBe('localhost');
    expect(storageConfig().relational.sqlite.eventDbPath).toBe(
      './data/runtime/events/hypha-runtime-events.sqlite'
    );
    expect(storageConfig().relational.sqlite.structuredDbPath).toBe(
      './data/runtime/structured/hypha-structured.sqlite'
    );
    expect(storageConfig().vector.local.path).toBe('./data/storage/vector/hypha-vectors.json');
    expect(storageConfig().artifacts.local.rootPath).toBe('./data/storage/artifacts');
    expect(reloadConfig().logging.outputs?.[1]?.path).toBe('./data/logs/system.log');
  });

  it('exports storage provider profiles for functional categories', () => {
    const profiles = storageConfig().profiles.map((profile) => profile.id);

    expect(profiles).toContain('storage.mongodb.document');
    expect(profiles).toContain('storage.redis.messaging');
    expect(profiles).toContain('storage.sqlite.events');
    expect(profiles).toContain('storage.local-vector.semantic');
  });

  it('loads inference backend configuration with SGLang as default', () => {
    process.env.HYPHA_INFERENCE_DEFAULT_BACKEND = 'sglang';
    process.env.SGLANG_BASE_URL = 'http://sglang.local:30000';
    process.env.VLLM_BASE_URL = 'http://vllm.local:8000';
    process.env.LLAMA_CPP_BASE_URL = 'http://llama.local:8080';
    process.env.OPENAI_INFERENCE_BASE_URL = 'https://openai.example/v1';

    const config = reloadConfig();

    expect(config.inference.defaultBackend).toBe('sglang');
    expect(inferenceConfig().backends.sglang.baseUrl).toBe('http://sglang.local:30000');
    expect(inferenceConfig().backends.vllm.baseUrl).toBe('http://vllm.local:8000');
    expect(inferenceConfig().backends.llamaCpp.baseUrl).toBe('http://llama.local:8080');
    expect(inferenceConfig().backends.openaiApi.baseUrl).toBe('https://openai.example/v1');
    expect(inferenceConfig().plasmod.reusePolicy).toMatchObject({
      allowCrossSession: false,
      requireExactHash: true,
    });
  });

  it('keeps WorkCache enabled by default on cache-base and switches configured stores from env', () => {
    reloadConfig();
    expect(workCacheConfig()).toMatchObject({
      enabled: true,
      store: 'memory',
      promptBudgetTokens: 4096,
    });

    process.env.HYPHA_WORKCACHE = 'sqlite';
    process.env.HYPHA_WORKCACHE_SQLITE_PATH = './data/runtime/cache/test-workcache.sqlite';
    process.env.HYPHA_WORKCACHE_PROMPT_BUDGET_TOKENS = '2048';

    expect(workCacheConfig()).toMatchObject({
      enabled: true,
      store: 'sqlite',
      promptBudgetTokens: 2048,
      sqlite: { path: './data/runtime/cache/test-workcache.sqlite' },
    });

    process.env.HYPHA_WORKCACHE = 'off';
    expect(workCacheConfig()).toMatchObject({ enabled: false, store: 'off' });
  });

  it('gives explicit off stores precedence over cache enabled flags', () => {
    process.env.HYPHA_SERVING_CACHE = 'off';
    process.env.HYPHA_SERVING_CACHE_ENABLED = 'true';
    process.env.HYPHA_SERVING_CACHE_MODE = 'readwrite';
    process.env.HYPHA_WORKCACHE = 'off';
    process.env.HYPHA_WORKCACHE_ENABLED = 'true';
    reloadConfig();

    expect(servingCacheConfig()).toMatchObject({ enabled: false, store: 'off', mode: 'off' });
    expect(workCacheConfig()).toMatchObject({ enabled: false, store: 'off' });
  });

  it('loads a managed local Ollama runtime without changing the provider default', () => {
    process.env.HYPHA_INFERENCE_RUNTIME_PROVIDER = 'backend';
    process.env.HYPHA_LOCAL_INFERENCE_ENABLED = 'true';
    process.env.HYPHA_LOCAL_INFERENCE_ENGINE = 'ollama';
    process.env.HYPHA_LOCAL_INFERENCE_MODE = 'managed';
    process.env.HYPHA_LOCAL_INFERENCE_AUTO_START = 'true';
    process.env.HYPHA_LOCAL_INFERENCE_MODEL = 'qwen3:8b';
    process.env.HYPHA_LOCAL_INFERENCE_PORT = '11435';
    process.env.OLLAMA_INFERENCE_BASE_URL = 'http://ollama.local:11435';

    reloadConfig();

    expect(inferenceConfig()).toMatchObject({
      runtimeProvider: 'backend',
      local: {
        enabled: true,
        engine: 'ollama',
        mode: 'managed',
        autoStart: true,
        model: 'qwen3:8b',
        port: 11435,
      },
      backends: {
        ollama: { baseUrl: 'http://ollama.local:11435' },
      },
    });
  });

  it('loads separate filesystem read, write, and execute path policies', () => {
    process.env.HYPHA_FILESYSTEM_WORKING_DIRECTORY = './workspace';
    process.env.HYPHA_FILESYSTEM_READ_PATHS = './workspace,./shared';
    process.env.HYPHA_FILESYSTEM_WRITE_PATHS = './workspace/output';
    process.env.HYPHA_FILESYSTEM_EXECUTE_PATHS = './workspace/bin';
    process.env.HYPHA_FILESYSTEM_EXECUTION_ENABLED = 'false';
    process.env.HYPHA_FILESYSTEM_EXECUTION_TIMEOUT_MS = '2500';
    process.env.HYPHA_FILESYSTEM_MAX_OUTPUT_BYTES = '8192';

    reloadConfig();

    expect(filesystemToolConfig()).toEqual({
      workingDirectory: './workspace',
      readPaths: ['./workspace', './shared'],
      writePaths: ['./workspace/output'],
      executePaths: ['./workspace/bin'],
      execution: {
        enabled: false,
        timeoutMs: 2500,
        maxOutputBytes: 8192,
      },
    });
  });

  it('keeps FILESYSTEM_TOOL_ROOT as a legacy read-write fallback', () => {
    process.env.FILESYSTEM_TOOL_ROOT = './legacy-workspace';

    reloadConfig();

    expect(filesystemToolConfig()).toMatchObject({
      workingDirectory: './legacy-workspace',
      readPaths: ['./legacy-workspace'],
      writePaths: ['./legacy-workspace'],
    });
  });
});
