import { FrameworkError } from '@hypha/core';
import type {
  ModelCapabilities,
  ModelMessage,
  ModelProvider,
  ModelProviderSpec,
  ModelRequest,
  ModelResponse,
  ModelUsage,
  NormalizedToolCall,
} from './index';

export interface OpenAICompatibleProviderConfig {
  id: string;
  type: 'openai' | 'openai-compatible';
  baseUrl: string;
  apiKey?: string;
  apiKeyEnv?: string;
  providerModelByAlias: Record<string, string>;
  capabilities?: ModelCapabilities;
  timeoutMs?: number;
  transport?: ModelTransport;
}

export interface ModelTransport {
  postJson<TResponse>(
    url: string,
    body: unknown,
    headers: Record<string, string>,
    timeoutMs?: number
  ): Promise<TResponse>;
}

export interface OpenAIChatCompletionResponse {
  id: string;
  choices: Array<{
    message?: {
      content?: string | null;
      tool_calls?: Array<{
        id: string;
        function?: {
          name: string;
          arguments: string;
        };
      }>;
    };
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}

export class FetchModelTransport implements ModelTransport {
  async postJson<TResponse>(
    url: string,
    body: unknown,
    headers: Record<string, string>,
    timeoutMs = 120000
  ): Promise<TResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new FrameworkError({
          code: 'MODEL_PROVIDER_HTTP_ERROR',
          message: `Model provider returned HTTP ${response.status}`,
          context: { status: response.status, url },
        });
      }
      return (await response.json()) as TResponse;
    } finally {
      clearTimeout(timeout);
    }
  }
}

export class OpenAICompatibleModelProvider implements ModelProvider<ModelRequest, ModelResponse> {
  readonly id: string;
  private readonly transport: ModelTransport;

  constructor(private readonly config: OpenAICompatibleProviderConfig) {
    this.id = config.id;
    this.transport = config.transport ?? new FetchModelTransport();
  }

  capabilities(): ModelCapabilities {
    return {
      chat: true,
      streaming: false,
      toolCalling: true,
      jsonMode: true,
      ...this.config.capabilities,
    };
  }

  async generate(request: ModelRequest): Promise<ModelResponse> {
    const providerModel = this.resolveModel(request.modelAlias);
    const instructions = [
      request.cache?.prefixContent,
      request.instructions,
    ].filter(Boolean).join('\n\n') || undefined;
    const response = await this.transport.postJson<OpenAIChatCompletionResponse>(
      `${this.config.baseUrl.replace(/\/$/, '')}/chat/completions`,
      {
        model: providerModel,
        messages: normalizeMessages(instructions, request.input),
        tools: request.tools?.map((tool) => ({
          type: 'function',
          function: {
            name: tool.name,
            description: tool.description,
            parameters: tool.inputSchema,
          },
        })),
        temperature: request.temperature,
        max_tokens: request.maxTokens,
      },
      this.headers(),
      this.config.timeoutMs
    );
    return normalizeOpenAIChatResponse(response);
  }

  private resolveModel(modelAlias: string): string {
    const providerModel = this.config.providerModelByAlias[modelAlias];
    if (!providerModel) {
      throw new FrameworkError({
        code: 'MODEL_ALIAS_NOT_FOUND',
        message: `Model alias not configured: ${modelAlias}`,
        context: { providerId: this.id, modelAlias },
      });
    }
    return providerModel;
  }

  private headers(): Record<string, string> {
    const apiKey = this.config.apiKey ?? (this.config.apiKeyEnv ? process.env[this.config.apiKeyEnv] : undefined);
    return {
      'Content-Type': 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    };
  }
}

export class OpenAIModelProvider extends OpenAICompatibleModelProvider {
  constructor(config: Omit<OpenAICompatibleProviderConfig, 'type'>) {
    super({ ...config, type: 'openai' });
  }
}

export function createDeepSeekProvider(
  config: Omit<OpenAICompatibleProviderConfig, 'type' | 'baseUrl'> & { baseUrl?: string }
): OpenAICompatibleModelProvider {
  return new OpenAICompatibleModelProvider({
    ...config,
    type: 'openai-compatible',
    baseUrl: config.baseUrl ?? 'https://api.deepseek.com/v1',
  });
}

export function providerSpecFromConfig(config: OpenAICompatibleProviderConfig): ModelProviderSpec {
  return {
    id: config.id,
    version: '0.0.0',
    type: config.type,
    baseUrl: config.baseUrl,
    apiKeyEnv: config.apiKeyEnv,
    timeoutMs: config.timeoutMs,
    capabilities: config.capabilities,
  };
}

export function normalizeOpenAIChatResponse(
  response: OpenAIChatCompletionResponse
): ModelResponse {
  const choice = response.choices[0];
  return {
    id: response.id,
    content: choice?.message?.content ?? '',
    toolCalls: normalizeToolCalls(choice?.message?.tool_calls),
    usage: normalizeUsage(response.usage),
    raw: response,
  };
}

function normalizeMessages(
  instructions: string | undefined,
  input: ModelRequest['input']
): ModelMessage[] {
  const inputMessages = Array.isArray(input) ? input : [{ role: 'user' as const, content: String(input) }];
  return instructions
    ? [{ role: 'system', content: instructions }, ...inputMessages]
    : inputMessages;
}

function normalizeUsage(usage: OpenAIChatCompletionResponse['usage']): ModelUsage | undefined {
  if (!usage) return undefined;
  return {
    inputTokens: usage.prompt_tokens,
    outputTokens: usage.completion_tokens,
    totalTokens: usage.total_tokens,
  };
}

function normalizeToolCalls(
  toolCalls: NonNullable<OpenAIChatCompletionResponse['choices'][number]['message']>['tool_calls']
): NormalizedToolCall[] | undefined {
  if (!toolCalls?.length) return undefined;
  return toolCalls.map((toolCall): NormalizedToolCall => ({
    id: toolCall.id,
    toolId: toolCall.function?.name ?? toolCall.id,
    arguments: parseToolArguments(toolCall.function?.arguments),
  }));
}

function parseToolArguments(value: string | undefined): unknown {
  if (!value) return {};
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
