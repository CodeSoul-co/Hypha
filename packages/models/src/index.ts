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

export interface ModelRequest<TInput = ModelMessage[]> {
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
}

export interface ModelResponse<TContent = string> {
  id: string;
  content: TContent;
  toolCalls?: NormalizedToolCall[];
  usage?: ModelUsage;
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
    return { chat: true, streaming: false, toolCalling: true, jsonMode: true };
  }

  async generate(request: ModelRequest): Promise<ModelResponse> {
    return {
      id: `${request.runId}:${request.stepId}:mock-response`,
      content: typeof request.input === 'string' ? request.input : JSON.stringify(request.input),
      usage: { inputTokens: 0, outputTokens: 0, totalTokens: 0 },
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

export const modelProviderSpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    type: z.string().min(1),
    defaultModelAlias: z.string().optional(),
    capabilities: modelCapabilitiesSchema.optional(),
    apiKeyEnv: z.string().optional(),
    baseUrl: z.string().optional(),
    timeoutMs: z.number().int().positive().optional(),
  }) satisfies ZodType<ModelProviderSpec>;

export const modelAliasSpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    alias: z.string().min(1),
    providerId: z.string().min(1),
    providerModel: z.string().min(1),
  }) satisfies ZodType<ModelAliasSpec>;

export const modelRequestSchema = z.object({
  runId: z.string().min(1),
  stepId: z.string().min(1),
  modelAlias: z.string().min(1),
  instructions: z.string().optional(),
  input: z.unknown(),
  tools: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    inputSchema: jsonSchemaSchema,
  })).optional(),
  responseFormat: z.union([specRefSchema, jsonSchemaSchema]).optional(),
  reasoning: z.object({
    effort: z.enum(['low', 'medium', 'high']).optional(),
    budgetTokens: z.number().int().positive().optional(),
  }).optional(),
  temperature: z.number().optional(),
  maxTokens: z.number().int().positive().optional(),
  cache: z.object({
    prefixContent: z.string().optional(),
    kvCacheValue: z.unknown().optional(),
    kvCacheRef: z.object({
      id: z.string().min(1),
      provider: z.string().min(1),
      modelAlias: z.string().min(1),
      scope: z.enum(['run', 'session', 'workspace']),
      expiresAt: z.string().optional(),
      metadata: z.record(z.unknown()).optional(),
    }).optional(),
    metadata: z.record(z.unknown()).optional(),
  }).optional(),
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

export const modelProviderSpecDefinition = defineSpecSchema<ModelProviderSpec>({
  id: 'ModelProviderSpec',
  zod: modelProviderSpecSchema,
  jsonSchema: modelProviderSpecJsonSchema,
  example: modelProviderSpecExample,
});

export const modelSpecDefinitions = [modelProviderSpecDefinition] as const;
export const modelSpecJsonSchemas = exportSpecJsonSchemas(modelSpecDefinitions);

export function validateModelProviderSpec(input: unknown): ModelProviderSpec {
  return modelProviderSpecDefinition.parse(input);
}

export * from './providers';
