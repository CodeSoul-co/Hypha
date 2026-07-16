import { FrameworkError } from '@hypha/core';
import type {
  ModelCapabilities,
  ModelMessage,
  ModelProvider,
  ModelProviderSpec,
  ModelRequest,
  ModelResponse,
  ModelStreamEvent,
  ModelUsage,
  NormalizedToolCall,
} from './index';
import { ModelProviderError, normalizeModelProviderError } from './router';

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
  streamSse?(
    url: string,
    body: unknown,
    headers: Record<string, string>,
    timeoutMs?: number
  ): AsyncIterable<string>;
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
    finish_reason?: string | null;
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
    prompt_tokens_details?: {
      cached_tokens?: number;
    };
  };
  model?: string;
}

interface OpenAICompatibleToolNameMap {
  toProviderName: Map<string, string>;
  toOriginalName: Map<string, string>;
}

interface OpenAIChatCompletionNormalizationContext {
  providerId?: string;
  providerModel?: string;
  toolNameMap?: OpenAICompatibleToolNameMap;
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
        throw new ModelProviderError({
          code: 'MODEL_PROVIDER_HTTP_ERROR',
          message: `Model provider returned HTTP ${response.status}`,
          status: response.status,
          raw: await safeJson(response),
        });
      }
      return (await response.json()) as TResponse;
    } finally {
      clearTimeout(timeout);
    }
  }

  async *streamSse(
    url: string,
    body: unknown,
    headers: Record<string, string>,
    timeoutMs = 120000
  ): AsyncIterable<string> {
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
        throw new ModelProviderError({
          code: 'MODEL_PROVIDER_HTTP_ERROR',
          message: `Model provider returned HTTP ${response.status}`,
          status: response.status,
          raw: await safeJson(response),
        });
      }
      const stream = response.body as unknown as {
        getReader?: () => {
          read: () => Promise<{ done: boolean; value?: Uint8Array }>;
          releaseLock?: () => void;
        };
      };
      const reader = stream.getReader?.();
      if (!reader) {
        throw new ModelProviderError({
          code: 'MODEL_PROVIDER_STREAM_ERROR',
          message: 'Model provider response is not a readable stream.',
          retryable: false,
        });
      }
      const decoder = new TextDecoder();
      let buffer = '';
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split(/\r?\n\r?\n/);
          buffer = events.pop() ?? '';
          for (const event of events) {
            const data = parseSseData(event);
            if (data !== null) yield data;
          }
        }
        buffer += decoder.decode();
        if (buffer.trim()) {
          const data = parseSseData(buffer);
          if (data !== null) yield data;
        }
      } finally {
        reader.releaseLock?.();
      }
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
      streaming: Boolean(this.transport.streamSse),
      toolCalling: true,
      jsonMode: true,
      ...this.config.capabilities,
    };
  }

  async generate(request: ModelRequest): Promise<ModelResponse> {
    const providerModel = this.resolveModel(request);
    const instructions =
      [request.cache?.prefixContent, request.instructions].filter(Boolean).join('\n\n') ||
      undefined;
    const toolNameMap = createOpenAICompatibleToolNameMap(request.tools);
    try {
      const response = await this.transport.postJson<OpenAIChatCompletionResponse>(
        this.chatCompletionsUrl(),
        this.buildChatRequest(request, providerModel, instructions, false, toolNameMap),
        this.headers(),
        this.config.timeoutMs
      );
      return normalizeOpenAIChatResponse(response, {
        providerId: this.id,
        providerModel,
        toolNameMap,
      });
    } catch (error) {
      throw normalizeModelProviderError(error, {
        providerId: this.id,
        modelAlias: request.modelAlias,
        operation: 'generate',
      });
    }
  }

  async *stream(request: ModelRequest): AsyncIterable<ModelStreamEvent> {
    if (!this.transport.streamSse) {
      throw new ModelProviderError({
        code: 'MODEL_PROVIDER_STREAM_ERROR',
        message: `Model provider does not support streaming: ${this.id}`,
        providerId: this.id,
        modelAlias: request.modelAlias,
        retryable: false,
      });
    }
    const providerModel = this.resolveModel(request);
    const instructions =
      [request.cache?.prefixContent, request.instructions].filter(Boolean).join('\n\n') ||
      undefined;
    const toolNameMap = createOpenAICompatibleToolNameMap(request.tools);
    try {
      let yieldedDone = false;
      for await (const event of this.transport.streamSse(
        this.chatCompletionsUrl(),
        this.buildChatRequest(request, providerModel, instructions, true, toolNameMap),
        this.headers(),
        this.config.timeoutMs
      )) {
        if (event === '[DONE]') {
          yieldedDone = true;
          yield { type: 'done' };
          continue;
        }
        for (const normalized of normalizeOpenAIStreamEvent(event, toolNameMap)) {
          if (normalized.type === 'done') yieldedDone = true;
          yield normalized;
        }
      }
      if (!yieldedDone) {
        yield { type: 'done' };
      }
    } catch (error) {
      throw normalizeModelProviderError(error, {
        providerId: this.id,
        modelAlias: request.modelAlias,
        operation: 'stream',
      });
    }
  }

  private resolveModel(request: ModelRequest): string {
    const metadataModel = request.metadata?.providerModel;
    if (typeof metadataModel === 'string' && metadataModel.length > 0) {
      return metadataModel;
    }
    const providerModel = this.config.providerModelByAlias[request.modelAlias];
    if (!providerModel) {
      throw new FrameworkError({
        code: 'MODEL_ALIAS_NOT_FOUND',
        message: `Model alias not configured: ${request.modelAlias}`,
        context: { providerId: this.id, modelAlias: request.modelAlias },
      });
    }
    return providerModel;
  }

  private chatCompletionsUrl(): string {
    return `${this.config.baseUrl.replace(/\/$/, '')}/chat/completions`;
  }

  private buildChatRequest(
    request: ModelRequest,
    providerModel: string,
    instructions: string | undefined,
    stream: boolean,
    toolNameMap: OpenAICompatibleToolNameMap
  ): Record<string, unknown> {
    return compactObject({
      model: providerModel,
      messages: normalizeMessages(instructions, request.input),
      tools: request.tools?.map((tool) => ({
        type: 'function',
        function: {
          name: toolNameMap.toProviderName.get(tool.name) ?? tool.name,
          description: tool.description,
          parameters: tool.inputSchema,
        },
      })),
      response_format: normalizeResponseFormat(request.responseFormat),
      reasoning_effort: request.reasoning?.effort,
      temperature: request.temperature,
      max_tokens: request.maxTokens,
      stream,
      stream_options: stream ? { include_usage: true } : undefined,
      metadata: request.metadata,
    });
  }

  private headers(): Record<string, string> {
    const apiKey =
      this.config.apiKey ??
      (this.config.apiKeyEnv ? process.env[this.config.apiKeyEnv] : undefined);
    return {
      'Content-Type': 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    };
  }
}

export class OpenAIModelProvider extends OpenAICompatibleModelProvider {
  constructor(
    config: Omit<OpenAICompatibleProviderConfig, 'type' | 'baseUrl'> & { baseUrl?: string }
  ) {
    super({ ...config, type: 'openai', baseUrl: config.baseUrl ?? 'https://api.openai.com/v1' });
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
  response: OpenAIChatCompletionResponse,
  context: OpenAIChatCompletionNormalizationContext = {}
): ModelResponse {
  const choice = response.choices[0];
  return {
    id: response.id,
    providerId: context.providerId,
    model: response.model ?? context.providerModel,
    content: choice?.message?.content ?? '',
    toolCalls: normalizeToolCalls(choice?.message?.tool_calls, context.toolNameMap),
    usage: normalizeUsage(response.usage),
    raw: response,
  };
}

function normalizeMessages(
  instructions: string | undefined,
  input: ModelRequest['input']
): ModelMessage[] {
  const inputMessages = Array.isArray(input)
    ? input
    : [{ role: 'user' as const, content: String(input) }];
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
    cacheHitTokens: usage.prompt_tokens_details?.cached_tokens,
  };
}

function normalizeOpenAIStreamEvent(
  event: string,
  toolNameMap?: OpenAICompatibleToolNameMap
): ModelStreamEvent[] {
  const parsed = safeParseJson<{
    choices?: Array<{
      delta?: {
        content?: string | null;
        tool_calls?: NonNullable<
          OpenAIChatCompletionResponse['choices'][number]['message']
        >['tool_calls'];
      };
      finish_reason?: string | null;
    }>;
    usage?: OpenAIChatCompletionResponse['usage'];
  }>(event);
  if (!parsed) {
    return [{ type: 'error', error: `Malformed model stream event: ${event}` }];
  }
  const events: ModelStreamEvent[] = [];
  const choice = parsed.choices?.[0];
  if (choice?.delta?.content) {
    events.push({ type: 'delta', content: choice.delta.content });
  }
  for (const toolCall of normalizeToolCalls(choice?.delta?.tool_calls, toolNameMap) ?? []) {
    events.push({ type: 'tool_call', toolCall });
  }
  if (parsed.usage) {
    events.push({ type: 'usage', usage: normalizeUsage(parsed.usage) });
  }
  if (choice?.finish_reason) {
    events.push({ type: 'done', usage: parsed.usage ? normalizeUsage(parsed.usage) : undefined });
  }
  return events;
}

function normalizeToolCalls(
  toolCalls: NonNullable<OpenAIChatCompletionResponse['choices'][number]['message']>['tool_calls'],
  toolNameMap?: OpenAICompatibleToolNameMap
): NormalizedToolCall[] | undefined {
  if (!toolCalls?.length) return undefined;
  return toolCalls.map((toolCall): NormalizedToolCall => {
    const providerName = toolCall.function?.name ?? toolCall.id;
    return {
      id: toolCall.id,
      toolId: toolNameMap?.toOriginalName.get(providerName) ?? providerName,
      arguments: parseToolArguments(toolCall.function?.arguments),
    };
  });
}

function createOpenAICompatibleToolNameMap(
  tools: ModelRequest['tools'] = []
): OpenAICompatibleToolNameMap {
  const toProviderName = new Map<string, string>();
  const toOriginalName = new Map<string, string>();

  tools.forEach((tool, index) => {
    const originalName = tool.id || tool.name;
    const providerName = uniqueOpenAICompatibleToolName(tool.name, index, toOriginalName);
    toProviderName.set(tool.name, providerName);
    toOriginalName.set(providerName, originalName);
  });

  return { toProviderName, toOriginalName };
}

function uniqueOpenAICompatibleToolName(
  name: string,
  index: number,
  used: Map<string, string>
): string {
  const sanitized = sanitizeOpenAICompatibleToolName(name) || `tool_${index + 1}`;
  let candidate = truncateToolName(sanitized);
  if (!used.has(candidate)) return candidate;

  const hashSuffix = `_${stableToolNameHash(name)}`;
  candidate = `${truncateToolName(sanitized, 64 - hashSuffix.length)}${hashSuffix}`;
  let collision = 2;
  while (used.has(candidate)) {
    const collisionSuffix = `${hashSuffix}_${collision}`;
    candidate = `${truncateToolName(sanitized, 64 - collisionSuffix.length)}${collisionSuffix}`;
    collision += 1;
  }
  return candidate;
}

function sanitizeOpenAICompatibleToolName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function truncateToolName(name: string, maxLength = 64): string {
  return name.slice(0, Math.max(1, maxLength));
}

function stableToolNameHash(name: string): string {
  let hash = 2166136261;
  for (let index = 0; index < name.length; index += 1) {
    hash ^= name.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).slice(0, 8);
}

function parseToolArguments(value: string | undefined): unknown {
  if (!value) return {};
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function normalizeResponseFormat(responseFormat: ModelRequest['responseFormat']): unknown {
  if (!responseFormat) return undefined;
  if ('id' in responseFormat) {
    return { type: 'json_object' };
  }
  if (responseFormat.type === 'object') {
    return {
      type: 'json_schema',
      json_schema: {
        name: 'hypha_response',
        schema: responseFormat,
      },
    };
  }
  return { type: 'json_object' };
}

function compactObject<T extends Record<string, unknown>>(input: T): T {
  return Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined)) as T;
}

function parseSseData(event: string): string | null {
  const dataLines = event
    .split(/\r?\n/)
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.slice('data:'.length).trim());
  return dataLines.length ? dataLines.join('\n') : null;
}

function safeParseJson<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

async function safeJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return undefined;
  }
}
