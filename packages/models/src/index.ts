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

export type ModelProviderType = 'openai' | 'openai-compatible' | 'mock' | string;

export interface ModelProviderSpec extends VersionedSpec, SpecMetadata {
  id: string;
  type: ModelProviderType;
  defaultModelAlias?: string;
  capabilities?: ModelCapabilities;
  apiKeyEnv?: string;
  baseUrl?: string;
  timeoutMs?: number;
}

export interface ModelAliasSpec extends VersionedSpec, SpecMetadata {
  alias: string;
  providerId: string;
  providerModel: string;
}

export interface ModelRoutingSpec extends VersionedSpec, SpecMetadata {
  defaultAlias: string;
  aliases: ModelAliasSpec[];
  fallbackAliases?: string[];
}

export interface ModelCapabilities {
  chat?: boolean;
  streaming?: boolean;
  toolCalling?: boolean;
  jsonMode?: boolean;
  embeddings?: boolean;
  reasoning?: boolean;
  prefixCaching?: boolean;
  kvCaching?: boolean;
}

export interface ModelMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  name?: string;
  toolCallId?: string;
}

export interface ModelToolDescriptor {
  id: string;
  name: string;
  description: string;
  inputSchema: JsonSchema;
}

export interface ReasoningOptions {
  effort?: 'low' | 'medium' | 'high';
  budgetTokens?: number;
}

export interface ModelCacheControl {
  prefixContent?: string;
  kvCacheValue?: unknown;
  kvCacheRef?: {
    id: string;
    provider: string;
    modelAlias: string;
    scope: 'run' | 'session' | 'workspace';
    expiresAt?: string;
    metadata?: Record<string, unknown>;
  };
  metadata?: Record<string, unknown>;
}

export interface ModelRequest<TInput = unknown> {
  runId: string;
  stepId: string;
  modelAlias: string;
  instructions?: string;
  input: TInput;
  tools?: ModelToolDescriptor[];
  responseFormat?: SpecRef | JsonSchema;
  reasoning?: ReasoningOptions;
  temperature?: number;
  maxTokens?: number;
  cache?: ModelCacheControl;
  metadata?: Record<string, unknown>;
}

export interface NormalizedToolCall {
  id: string;
  toolId: string;
  arguments: unknown;
}

export interface ModelUsage {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  cacheHitTokens?: number;
}

export interface ModelResponse<TContent = string> {
  id: string;
  providerId?: string;
  model?: string;
  content: TContent;
  toolCalls?: NormalizedToolCall[];
  usage?: ModelUsage;
  metadata?: Record<string, unknown>;
  raw?: unknown;
}

export interface ModelStreamEvent<TContent = string> {
  type: 'delta' | 'tool_call' | 'usage' | 'done' | 'error';
  content?: TContent;
  toolCall?: NormalizedToolCall;
  usage?: ModelUsage;
  error?: unknown;
}

export interface ModelProvider<TRequest = ModelRequest, TResponse = ModelResponse> {
  id: string;
  capabilities(): ModelCapabilities;
  generate(request: TRequest): Promise<TResponse>;
  stream?(request: TRequest): AsyncIterable<ModelStreamEvent>;
  countTokens?(input: unknown): Promise<ModelUsage>;
}

export class ModelRegistry {
  private readonly providers = new Map<string, ModelProvider>();

  register(provider: ModelProvider): void {
    this.providers.set(provider.id, provider);
  }

  get(providerId: string): ModelProvider | null {
    return this.providers.get(providerId) ?? null;
  }

  list(): ModelProvider[] {
    return Array.from(this.providers.values());
  }
}

export class MockModelProvider implements ModelProvider {
  readonly id: string;

  constructor(id = 'mock') {
    this.id = id;
  }

  capabilities(): ModelCapabilities {
    return { chat: true, streaming: true, toolCalling: true, jsonMode: true };
  }

  async generate(request: ModelRequest): Promise<ModelResponse> {
    const content =
      typeof request.input === 'string' ? request.input : JSON.stringify(request.input);
    return {
      id: `${request.runId}:${request.stepId}:mock-response`,
      providerId: this.id,
      model: request.modelAlias,
      content,
      usage: this.estimateUsage(content),
      metadata: { deterministic: true },
    };
  }

  async *stream(request: ModelRequest): AsyncIterable<ModelStreamEvent> {
    const response = await this.generate(request);
    yield { type: 'delta', content: response.content };
    yield { type: 'usage', usage: response.usage };
    yield { type: 'done', usage: response.usage };
  }

  async countTokens(input: unknown): Promise<ModelUsage> {
    return this.estimateUsage(typeof input === 'string' ? input : JSON.stringify(input));
  }

  private estimateUsage(content: string): ModelUsage {
    const tokenEstimate = content.trim() ? content.trim().split(/\s+/).length : 0;
    return {
      inputTokens: tokenEstimate,
      outputTokens: tokenEstimate,
      totalTokens: tokenEstimate * 2,
    };
  }
}

export const modelCapabilitiesSchema = z.object({
  chat: z.boolean().optional(),
  streaming: z.boolean().optional(),
  toolCalling: z.boolean().optional(),
  jsonMode: z.boolean().optional(),
  embeddings: z.boolean().optional(),
  reasoning: z.boolean().optional(),
  prefixCaching: z.boolean().optional(),
  kvCaching: z.boolean().optional(),
});

export const modelProviderSpecSchema = versionedSpecSchema.merge(specMetadataSchema).extend({
  type: z.string().min(1),
  defaultModelAlias: z.string().optional(),
  capabilities: modelCapabilitiesSchema.optional(),
  apiKeyEnv: z.string().optional(),
  baseUrl: z.string().optional(),
  timeoutMs: z.number().int().positive().optional(),
}) satisfies ZodType<ModelProviderSpec>;

export const modelAliasSpecSchema = versionedSpecSchema.merge(specMetadataSchema).extend({
  alias: z.string().min(1),
  providerId: z.string().min(1),
  providerModel: z.string().min(1),
}) satisfies ZodType<ModelAliasSpec>;

export const modelRoutingSpecSchema = versionedSpecSchema.merge(specMetadataSchema).extend({
  defaultAlias: z.string().min(1),
  aliases: z.array(modelAliasSpecSchema),
  fallbackAliases: z.array(z.string().min(1)).optional(),
}) satisfies ZodType<ModelRoutingSpec>;

export const modelRequestSchema = z.object({
  runId: z.string().min(1),
  stepId: z.string().min(1),
  modelAlias: z.string().min(1),
  instructions: z.string().optional(),
  input: z.unknown(),
  tools: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        inputSchema: jsonSchemaSchema,
      })
    )
    .optional(),
  responseFormat: z.union([specRefSchema, jsonSchemaSchema]).optional(),
  reasoning: z
    .object({
      effort: z.enum(['low', 'medium', 'high']).optional(),
      budgetTokens: z.number().int().positive().optional(),
    })
    .optional(),
  temperature: z.number().optional(),
  maxTokens: z.number().int().positive().optional(),
  cache: z
    .object({
      prefixContent: z.string().optional(),
      kvCacheValue: z.unknown().optional(),
      kvCacheRef: z
        .object({
          id: z.string().min(1),
          provider: z.string().min(1),
          modelAlias: z.string().min(1),
          scope: z.enum(['run', 'session', 'workspace']),
          expiresAt: z.string().optional(),
          metadata: z.record(z.unknown()).optional(),
        })
        .optional(),
      metadata: z.record(z.unknown()).optional(),
    })
    .optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const modelProviderSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'type'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    type: { type: 'string' },
    defaultModelAlias: { type: 'string' },
    capabilities: {
      type: 'object',
      properties: {
        chat: { type: 'boolean' },
        streaming: { type: 'boolean' },
        toolCalling: { type: 'boolean' },
        jsonMode: { type: 'boolean' },
        embeddings: { type: 'boolean' },
        reasoning: { type: 'boolean' },
        prefixCaching: { type: 'boolean' },
        kvCaching: { type: 'boolean' },
      },
    },
    apiKeyEnv: { type: 'string' },
    baseUrl: { type: 'string' },
    timeoutMs: { type: 'number' },
  },
  additionalProperties: false,
};

export const modelAliasSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'alias', 'providerId', 'providerModel'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    alias: { type: 'string' },
    providerId: { type: 'string' },
    providerModel: { type: 'string' },
  },
  additionalProperties: false,
};

export const modelRoutingSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'defaultAlias', 'aliases'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    defaultAlias: { type: 'string' },
    aliases: { type: 'array', items: modelAliasSpecJsonSchema },
    fallbackAliases: { type: 'array', items: { type: 'string' } },
  },
  additionalProperties: false,
};

export const modelProviderSpecExample: ModelProviderSpec = {
  id: 'provider.default',
  version: '0.0.0',
  name: 'Default OpenAI-compatible Provider',
  type: 'openai-compatible',
  defaultModelAlias: 'default-chat',
  apiKeyEnv: 'HYPHA_LLM_API_KEY',
  baseUrl: 'https://api.example.com/v1',
  capabilities: {
    chat: true,
    streaming: true,
    toolCalling: true,
    jsonMode: true,
    reasoning: true,
    prefixCaching: true,
    kvCaching: true,
  },
};

export const modelAliasSpecExample: ModelAliasSpec = {
  id: 'model.alias.default-chat',
  version: '0.0.0',
  name: 'Default Chat Alias',
  alias: 'default-chat',
  providerId: 'provider.default',
  providerModel: 'provider-chat-model',
};

export const modelRoutingSpecExample: ModelRoutingSpec = {
  id: 'model.routing.default',
  version: '0.0.0',
  name: 'Default Model Routing',
  defaultAlias: 'default-chat',
  aliases: [modelAliasSpecExample],
  fallbackAliases: ['default-chat'],
};

export const modelProviderSpecDefinition = defineSpecSchema<ModelProviderSpec>({
  id: 'ModelProviderSpec',
  zod: modelProviderSpecSchema,
  jsonSchema: modelProviderSpecJsonSchema,
  example: modelProviderSpecExample,
});

export const modelAliasSpecDefinition = defineSpecSchema<ModelAliasSpec>({
  id: 'ModelAliasSpec',
  zod: modelAliasSpecSchema,
  jsonSchema: modelAliasSpecJsonSchema,
  example: modelAliasSpecExample,
});

export const modelRoutingSpecDefinition = defineSpecSchema<ModelRoutingSpec>({
  id: 'ModelRoutingSpec',
  zod: modelRoutingSpecSchema,
  jsonSchema: modelRoutingSpecJsonSchema,
  example: modelRoutingSpecExample,
});

export const modelSpecDefinitions = [
  modelProviderSpecDefinition,
  modelAliasSpecDefinition,
  modelRoutingSpecDefinition,
] as const;
export const modelSpecJsonSchemas = exportSpecJsonSchemas(modelSpecDefinitions);

export function validateModelProviderSpec(input: unknown): ModelProviderSpec {
  return modelProviderSpecDefinition.parse(input);
}

export function validateModelAliasSpec(input: unknown): ModelAliasSpec {
  return modelAliasSpecDefinition.parse(input);
}

export function validateModelRoutingSpec(input: unknown): ModelRoutingSpec {
  return modelRoutingSpecDefinition.parse(input);
}

export * from './providers';
export * from './router';
