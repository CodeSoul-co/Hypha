import type { JsonSchema, SpecMetadata, SpecRef, VersionedSpec } from '@hypha/core';

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

export * from './providers';
