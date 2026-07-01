// Constants for OrbitAgent

export const APP_NAME = 'OrbitAgent';
export const APP_VERSION = '1.0.0';

// Error codes
export const ERROR_CODES = {
  // Authentication errors (1000-1099)
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_TOKEN_INVALID: 'AUTH_TOKEN_INVALID',
  AUTH_API_KEY_INVALID: 'AUTH_API_KEY_INVALID',
  AUTH_PERMISSION_DENIED: 'AUTH_PERMISSION_DENIED',

  // Validation errors (2000-2099)
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  VALIDATION_REQUIRED_FIELD: 'VALIDATION_REQUIRED_FIELD',
  VALIDATION_INVALID_FORMAT: 'VALIDATION_INVALID_FORMAT',

  // Resource errors (3000-3099)
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  RESOURCE_LIMIT_EXCEEDED: 'RESOURCE_LIMIT_EXCEEDED',

  // LLM errors (4000-4099)
  LLM_PROVIDER_ERROR: 'LLM_PROVIDER_ERROR',
  LLM_MODEL_NOT_FOUND: 'LLM_MODEL_NOT_FOUND',
  LLM_RATE_LIMIT: 'LLM_RATE_LIMIT',
  LLM_TIMEOUT: 'LLM_TIMEOUT',
  LLM_INVALID_RESPONSE: 'LLM_INVALID_RESPONSE',

  // Memory errors (5000-5099)
  MEMORY_TEMP_FULL: 'MEMORY_TEMP_FULL',
  MEMORY_PERM_ERROR: 'MEMORY_PERM_ERROR',

  // Skill errors (6000-6099)
  SKILL_NOT_FOUND: 'SKILL_NOT_FOUND',
  SKILL_EXECUTION_ERROR: 'SKILL_EXECUTION_ERROR',

  // Tool/MCP errors (7000-7099)
  TOOL_NOT_FOUND: 'TOOL_NOT_FOUND',
  TOOL_EXECUTION_ERROR: 'TOOL_EXECUTION_ERROR',
  MCP_CONNECTION_ERROR: 'MCP_CONNECTION_ERROR',

  // Workflow errors (8000-8099)
  WORKFLOW_NOT_FOUND: 'WORKFLOW_NOT_FOUND',
  WORKFLOW_EXECUTION_ERROR: 'WORKFLOW_EXECUTION_ERROR',
  WORKFLOW_INVALID_STAGE: 'WORKFLOW_INVALID_STAGE',

  // System errors (9000-9099)
  SYSTEM_ERROR: 'SYSTEM_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  CACHE_ERROR: 'CACHE_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

// Default values
export const DEFAULTS = {
  PORT: 3000,
  API_PREFIX: '/api/v1',
  PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MAX_TEMP_PAIRS: 50,
  MEMORY_TTL: 86400, // 24 hours
  CLEANUP_INTERVAL: 3600, // 1 hour
  JWT_EXPIRY: 86400, // 24 hours
  JWT_REFRESH_EXPIRY: 604800, // 7 days
  RATE_LIMIT_WINDOW: 60000, // 1 minute
  RATE_LIMIT_MAX: 100,
  REQUEST_TIMEOUT: 60000, // 1 minute
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
} as const;

// LLM Provider names
export const LLM_PROVIDERS = {
  ANTHROPIC: 'anthropic',
  OPENAI: 'openai',
  GOOGLE: 'google',
  OLLAMA: 'ollama',
  DEEPSEEK: 'deepseek',
} as const;

// Redis key prefixes
export const REDIS_KEYS = {
  SESSION: 'session',
  TEMP_MEMORY: 'memory:temp',
  RATE_LIMIT: 'ratelimit',
  API_KEY: 'apikey',
  USER_TOKEN: 'usertoken',
} as const;

// MongoDB collection names
export const MONGODB_COLLECTIONS = {
  USERS: 'users',
  CONVERSATIONS: 'conversations',
  AGENTS: 'agents',
  SKILLS: 'skills',
  TOOLS: 'tools',
  WORKFLOWS: 'workflows',
  PROMPTS: 'prompts',
  API_KEYS: 'api_keys',
} as const;

// Content types
export const CONTENT_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
  AUDIO: 'audio',
} as const;

// Status constants
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  ERROR: 'error',
  DELETED: 'deleted',
} as const;

// Workflow stage types
export const WORKFLOW_STAGES = {
  PREPROCESSOR: 'preprocessor',
  LLM: 'llm',
  POSTPROCESSOR: 'postprocessor',
  CONDITIONAL: 'conditional',
  TOOL_CALL: 'tool-call',
} as const;

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;
