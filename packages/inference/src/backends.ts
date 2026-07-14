import { FrameworkError } from '@hypha/core';
import type {
  InferenceBackend,
  InferenceBackendCapabilities,
  InferenceBackendKind,
  InferenceBackendRegistryEntry,
  InferenceBackendRequest,
  InferenceBackendResponse,
  InferenceGenerationOptions,
  InferenceUsage,
  PromptMessage,
} from './types';

export interface InferenceBackendTransport {
  postJson<TResponse = unknown>(
    url: string,
    body: unknown,
    headers?: Record<string, string>,
    timeoutMs?: number
  ): Promise<TResponse>;
  streamJson?<TResponse = unknown>(
    url: string,
    body: unknown,
    headers?: Record<string, string>,
    timeoutMs?: number
  ): AsyncIterable<TResponse>;
}

export interface HttpInferenceBackendConfig {
  id?: string;
  baseUrl: string;
  endpoint: string;
  apiKey?: string;
  apiKeyEnv?: string;
  timeoutMs?: number;
  transport?: InferenceBackendTransport;
  capabilities?: Partial<InferenceBackendCapabilities>;
}

export interface DefaultInferenceBackendRegistryOptions {
  defaultBackendId?: string;
  ollama?: Partial<HttpInferenceBackendConfig>;
  sglang?: Partial<HttpInferenceBackendConfig>;
  vllm?: Partial<HttpInferenceBackendConfig>;
  llamaCpp?: Partial<HttpInferenceBackendConfig>;
  openaiApi?: Partial<HttpInferenceBackendConfig>;
}

const DEFAULT_CAPABILITIES: InferenceBackendCapabilities = {
  streaming: true,
  chatCompletions: false,
  textCompletions: true,
  prefixCaching: true,
  kvCaching: true,
  cacheInvalidation: false,
};

export class FetchInferenceBackendTransport implements InferenceBackendTransport {
  async postJson<TResponse = unknown>(
    url: string,
    body: unknown,
    headers: Record<string, string> = {},
    timeoutMs = 60000
  ): Promise<TResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...headers },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new FrameworkError({
          code: 'INFERENCE_BACKEND_HTTP_ERROR',
          message: `Inference backend returned HTTP ${response.status}`,
          context: { url, status: response.status, body: await safeReadText(response) },
        });
      }
      return (await response.json()) as TResponse;
    } finally {
      clearTimeout(timeout);
    }
  }

  async *streamJson<TResponse = unknown>(
    url: string,
    body: unknown,
    headers: Record<string, string> = {},
    timeoutMs = 60000
  ): AsyncIterable<TResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...headers },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new FrameworkError({
          code: 'INFERENCE_BACKEND_STREAM_HTTP_ERROR',
          message: `Inference backend stream returned HTTP ${response.status}`,
          context: { url, status: response.status, body: await safeReadText(response) },
        });
      }

      const reader = (response.body as any)?.getReader?.();
      if (!reader) return;

      const decoder = new TextDecoder();
      let buffer = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          const event = parseJsonStreamLine<TResponse>(line);
          if (event) yield event;
        }
      }
      const finalEvent = parseJsonStreamLine<TResponse>(buffer);
      if (finalEvent) yield finalEvent;
    } finally {
      clearTimeout(timeout);
    }
  }
}

export class InferenceBackendRegistry {
  private readonly entries = new Map<string, InferenceBackendRegistryEntry>();
  private defaultBackendId: string;

  constructor(defaultBackendId = 'sglang') {
    this.defaultBackendId = defaultBackendId;
  }

  register(backend: InferenceBackend, options: { default?: boolean } = {}): void {
    this.entries.set(backend.id, {
      id: backend.id,
      backend,
      default: options.default,
    });
    if (options.default) this.defaultBackendId = backend.id;
  }

  get(id: string): InferenceBackend | null {
    return this.entries.get(id)?.backend ?? null;
  }

  require(id: string): InferenceBackend {
    const backend = this.get(id);
    if (!backend) {
      throw new FrameworkError({
        code: 'INFERENCE_BACKEND_NOT_FOUND',
        message: `Inference backend not found: ${id}`,
        context: { backendId: id },
      });
    }
    return backend;
  }

  default(): InferenceBackend {
    return this.require(this.defaultBackendId);
  }

  list(): InferenceBackendRegistryEntry[] {
    return Array.from(this.entries.values());
  }
}

abstract class HttpInferenceBackend implements InferenceBackend {
  readonly id: string;
  readonly kind: InferenceBackendKind;
  protected readonly baseUrl: string;
  protected readonly endpoint: string;
  protected readonly apiKey?: string;
  protected readonly apiKeyEnv?: string;
  protected readonly timeoutMs: number;
  protected readonly transport: InferenceBackendTransport;
  private readonly backendCapabilities: InferenceBackendCapabilities;

  protected constructor(
    id: string,
    kind: InferenceBackendKind,
    config: HttpInferenceBackendConfig
  ) {
    this.id = config.id ?? id;
    this.kind = kind;
    this.baseUrl = config.baseUrl;
    this.endpoint = config.endpoint;
    this.apiKey = config.apiKey;
    this.apiKeyEnv = config.apiKeyEnv;
    this.timeoutMs = config.timeoutMs ?? 60000;
    this.transport = config.transport ?? new FetchInferenceBackendTransport();
    this.backendCapabilities = {
      ...DEFAULT_CAPABILITIES,
      ...config.capabilities,
    };
  }

  capabilities(): InferenceBackendCapabilities {
    return this.backendCapabilities;
  }

  async infer(request: InferenceBackendRequest): Promise<InferenceBackendResponse> {
    try {
      const raw = await this.transport.postJson(
        this.url(),
        this.buildBody(request, false),
        this.headers(),
        this.timeoutMs
      );
      return this.normalize(raw, request);
    } catch (error) {
      throw this.wrapError(error, request);
    }
  }

  async *stream(request: InferenceBackendRequest): AsyncIterable<InferenceBackendResponse> {
    if (!this.transport.streamJson) {
      throw new FrameworkError({
        code: 'INFERENCE_BACKEND_STREAM_NOT_SUPPORTED',
        message: `Inference backend transport does not support streaming: ${this.id}`,
        context: { backendId: this.id, runId: request.runId, stepId: request.stepId },
      });
    }

    try {
      for await (const raw of this.transport.streamJson(
        this.url(),
        this.buildBody(request, true),
        this.headers(),
        this.timeoutMs
      )) {
        yield this.normalize(raw, request);
      }
    } catch (error) {
      throw this.wrapError(error, request);
    }
  }

  protected abstract buildBody(
    request: InferenceBackendRequest,
    stream: boolean
  ): Record<string, unknown>;

  protected abstract normalize(
    raw: unknown,
    request: InferenceBackendRequest
  ): InferenceBackendResponse;

  private url(): string {
    return `${this.baseUrl.replace(/\/+$/, '')}/${this.endpoint.replace(/^\/+/, '')}`;
  }

  private headers(): Record<string, string> {
    const apiKey = this.apiKey ?? (this.apiKeyEnv ? process.env[this.apiKeyEnv] : undefined);
    return apiKey ? { authorization: `Bearer ${apiKey}` } : {};
  }

  private wrapError(error: unknown, request: InferenceBackendRequest): FrameworkError {
    if (error instanceof FrameworkError) return error;
    const message = error instanceof Error ? error.message : String(error);
    return new FrameworkError({
      code: 'INFERENCE_BACKEND_ERROR',
      message: `Inference backend failed: ${this.id}`,
      context: {
        backendId: this.id,
        backendKind: this.kind,
        runId: request.runId,
        stepId: request.stepId,
        message,
      },
    });
  }
}

export class OllamaInferenceBackend extends HttpInferenceBackend {
  constructor(config: Partial<HttpInferenceBackendConfig> = {}) {
    super('ollama', 'ollama', {
      baseUrl: 'http://localhost:11434',
      endpoint: '/api/chat',
      capabilities: {
        chatCompletions: true,
        textCompletions: false,
        prefixCaching: true,
        kvCaching: false,
      },
      ...config,
    });
  }

  protected buildBody(request: InferenceBackendRequest, stream: boolean): Record<string, unknown> {
    return {
      model: resolveBackendModel(request),
      messages: toOpenAIChatMessages(request.compiledPrompt.messages),
      stream,
      options: removeUndefined({
        temperature: request.options?.temperature,
        num_predict: request.options?.maxTokens,
        top_p: request.options?.topP,
        top_k: request.options?.topK,
        stop: request.options?.stop,
        seed: request.options?.seed,
      }),
      keep_alive: request.options?.extra?.ollamaKeepAlive,
      ...backendExtra(request.options, 'ollama'),
    };
  }

  protected normalize(
    raw: unknown,
    request: InferenceBackendRequest
  ): InferenceBackendResponse<string> {
    const record = asRecord(raw);
    const message = asRecord(record.message);
    const output = firstString(message.content, record.response, record.content) ?? '';
    return {
      id: firstString(record.id) ?? `${request.runId}:${request.stepId}:ollama`,
      output,
      usage: usageFromRecord(record),
      metadata: { backendId: this.id, backendKind: this.kind },
      raw,
    };
  }
}

export class SGLangInferenceBackend extends HttpInferenceBackend {
  constructor(config: Partial<HttpInferenceBackendConfig> = {}) {
    super('sglang', 'sglang', {
      baseUrl: 'http://localhost:30000',
      endpoint: '/generate',
      ...config,
    });
  }

  protected buildBody(request: InferenceBackendRequest, stream: boolean): Record<string, unknown> {
    return {
      text: request.compiledPrompt.text,
      sampling_params: samplingParams(request.options),
      stream,
      return_logprob: false,
      cache: backendCacheEnvelope(request),
      ...backendExtra(request.options, 'sglang'),
    };
  }

  protected normalize(
    raw: unknown,
    request: InferenceBackendRequest
  ): InferenceBackendResponse<string> {
    const record = asRecord(raw);
    const output =
      firstString(record.text, record.output, record.generated_text) ?? choiceText(record) ?? '';
    return {
      id: firstString(record.id) ?? `${request.runId}:${request.stepId}:sglang`,
      output,
      usage: usageFromRecord(record),
      physicalKvCache: cacheHandleFromRecord(record),
      metadata: { backendId: this.id, backendKind: this.kind },
      raw,
    };
  }
}

export class VLLMInferenceBackend extends HttpInferenceBackend {
  constructor(config: Partial<HttpInferenceBackendConfig> = {}) {
    super('vllm', 'vllm', {
      baseUrl: 'http://localhost:8000',
      endpoint: '/v1/chat/completions',
      capabilities: { chatCompletions: true, textCompletions: false },
      ...config,
    });
  }

  protected buildBody(request: InferenceBackendRequest, stream: boolean): Record<string, unknown> {
    return {
      model: resolveBackendModel(request),
      messages: toOpenAIChatMessages(request.compiledPrompt.messages),
      stream,
      ...openAICompletionOptions(request.options),
      cache: backendCacheEnvelope(request),
      ...backendExtra(request.options, 'vllm'),
    };
  }

  protected normalize(
    raw: unknown,
    request: InferenceBackendRequest
  ): InferenceBackendResponse<string> {
    return normalizeOpenAICompatibleResponse(raw, request, this.id, this.kind);
  }
}

export class LlamaCppInferenceBackend extends HttpInferenceBackend {
  constructor(config: Partial<HttpInferenceBackendConfig> = {}) {
    super('llama.cpp', 'llama.cpp', {
      baseUrl: 'http://localhost:8080',
      endpoint: '/completion',
      capabilities: { chatCompletions: false, textCompletions: true },
      ...config,
    });
  }

  protected buildBody(request: InferenceBackendRequest, stream: boolean): Record<string, unknown> {
    return {
      prompt: request.compiledPrompt.text,
      stream,
      cache_prompt: true,
      n_predict: request.options?.maxTokens,
      temperature: request.options?.temperature,
      top_p: request.options?.topP,
      top_k: request.options?.topK,
      stop: request.options?.stop,
      seed: request.options?.seed,
      cache: backendCacheEnvelope(request),
      ...backendExtra(request.options, 'llamaCpp'),
    };
  }

  protected normalize(
    raw: unknown,
    request: InferenceBackendRequest
  ): InferenceBackendResponse<string> {
    const record = asRecord(raw);
    const output =
      firstString(record.content, record.text, record.output, record.generated_text) ?? '';
    return {
      id: firstString(record.id) ?? `${request.runId}:${request.stepId}:llama.cpp`,
      output,
      usage: usageFromRecord(record),
      physicalKvCache: cacheHandleFromRecord(record),
      metadata: { backendId: this.id, backendKind: this.kind },
      raw,
    };
  }
}

export class OpenAIAPIInferenceBackend extends HttpInferenceBackend {
  constructor(config: Partial<HttpInferenceBackendConfig> = {}) {
    super('openai-api', 'openai-api', {
      baseUrl: 'https://api.openai.com/v1',
      endpoint: '/chat/completions',
      capabilities: {
        chatCompletions: true,
        textCompletions: false,
        prefixCaching: false,
        kvCaching: false,
      },
      ...config,
    });
  }

  protected buildBody(request: InferenceBackendRequest, stream: boolean): Record<string, unknown> {
    return {
      model: resolveBackendModel(request),
      messages: toOpenAIChatMessages(request.compiledPrompt.messages),
      stream,
      ...openAICompletionOptions(request.options),
      ...backendExtra(request.options, 'openaiApi'),
    };
  }

  protected normalize(
    raw: unknown,
    request: InferenceBackendRequest
  ): InferenceBackendResponse<string> {
    return normalizeOpenAICompatibleResponse(raw, request, this.id, this.kind);
  }
}

export function createDefaultInferenceBackendRegistry(
  options: DefaultInferenceBackendRegistryOptions = {}
): InferenceBackendRegistry {
  const registry = new InferenceBackendRegistry(options.defaultBackendId ?? 'sglang');
  registry.register(new OllamaInferenceBackend(options.ollama), {
    default: options.defaultBackendId === 'ollama',
  });
  registry.register(new SGLangInferenceBackend(options.sglang), {
    default: (options.defaultBackendId ?? 'sglang') === 'sglang',
  });
  registry.register(new VLLMInferenceBackend(options.vllm), {
    default: options.defaultBackendId === 'vllm',
  });
  registry.register(new LlamaCppInferenceBackend(options.llamaCpp), {
    default: options.defaultBackendId === 'llama.cpp',
  });
  registry.register(new OpenAIAPIInferenceBackend(options.openaiApi), {
    default: options.defaultBackendId === 'openai-api',
  });
  return registry;
}

function samplingParams(options: InferenceGenerationOptions = {}): Record<string, unknown> {
  return removeUndefined({
    temperature: options.temperature,
    max_new_tokens: options.maxTokens,
    top_p: options.topP,
    top_k: options.topK,
    stop: options.stop,
    seed: options.seed,
  });
}

function openAICompletionOptions(
  options: InferenceGenerationOptions = {}
): Record<string, unknown> {
  return removeUndefined({
    temperature: options.temperature,
    max_tokens: options.maxTokens,
    top_p: options.topP,
    stop: options.stop,
    seed: options.seed,
    response_format:
      typeof options.responseFormat === 'string'
        ? responseFormatToOpenAI(options.responseFormat)
        : options.responseFormat,
  });
}

function responseFormatToOpenAI(
  format: 'text' | 'json_object'
): Record<string, string> | undefined {
  if (format === 'json_object') return { type: 'json_object' };
  return undefined;
}

function backendCacheEnvelope(request: InferenceBackendRequest): Record<string, unknown> {
  return removeUndefined({
    prefix_refs: request.prefixRefs,
    kv_cache_ref: request.kvCache,
    kv_cache_value: request.resolvedKvCacheValue ?? request.physicalKvCache,
    stable_prefix_hash: request.segmentation.metadata?.stablePrefixHash,
  });
}

function backendExtra(
  options: InferenceGenerationOptions | undefined,
  key: string
): Record<string, unknown> {
  const extra = options?.extra?.[key];
  return asRecord(extra);
}

function toOpenAIChatMessages(messages: PromptMessage[]): Array<Record<string, string>> {
  return messages.map((message) => {
    const role =
      message.role === 'assistant'
        ? 'assistant'
        : message.role === 'tool'
          ? 'tool'
          : message.role === 'user'
            ? 'user'
            : 'system';
    return removeUndefined({
      role,
      content: message.content,
      name: message.name,
    }) as Record<string, string>;
  });
}

function normalizeOpenAICompatibleResponse(
  raw: unknown,
  request: InferenceBackendRequest,
  backendId: string,
  backendKind: InferenceBackendKind
): InferenceBackendResponse<string> {
  const record = asRecord(raw);
  return {
    id: firstString(record.id) ?? `${request.runId}:${request.stepId}:${backendId}`,
    output: choiceText(record) ?? firstString(record.text, record.output) ?? '',
    usage: usageFromRecord(record),
    physicalKvCache: cacheHandleFromRecord(record),
    metadata: { backendId, backendKind },
    raw,
  };
}

function resolveBackendModel(request: InferenceBackendRequest): string {
  return firstString(
    request.metadata?.providerModel,
    request.metadata?.model,
    request.modelAlias
  ) as string;
}

function choiceText(record: Record<string, unknown>): string | undefined {
  const choices = record.choices;
  if (!Array.isArray(choices) || choices.length === 0) return undefined;
  const first = asRecord(choices[0]);
  const message = asRecord(first.message);
  return firstString(message.content, first.text, first.delta && asRecord(first.delta).content);
}

function usageFromRecord(record: Record<string, unknown>): InferenceUsage | undefined {
  const usage = asRecord(record.usage);
  const inputTokens = firstNumber(
    usage.prompt_tokens,
    usage.input_tokens,
    record.prompt_tokens,
    record.tokens_evaluated
  );
  const outputTokens = firstNumber(
    usage.completion_tokens,
    usage.output_tokens,
    record.completion_tokens,
    record.tokens_predicted
  );
  const totalTokens = firstNumber(usage.total_tokens, record.total_tokens);
  const normalized = removeUndefined({
    inputTokens,
    outputTokens,
    totalTokens: totalTokens ?? addNumbers(inputTokens, outputTokens),
  });
  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

function cacheHandleFromRecord(record: Record<string, unknown>): unknown {
  return record.kv_cache ?? record.kvCache ?? record.cache_handle ?? record.cache;
}

function parseJsonStreamLine<TResponse>(line: string): TResponse | null {
  const trimmed = line.trim();
  if (!trimmed) return null;
  const payload = trimmed.startsWith('data:') ? trimmed.slice(5).trim() : trimmed;
  if (!payload || payload === '[DONE]') return null;
  try {
    return JSON.parse(payload) as TResponse;
  } catch {
    return null;
  }
}

async function safeReadText(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch {
    return '';
  }
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function firstString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === 'string') return value;
  }
  return undefined;
}

function firstNumber(...values: unknown[]): number | undefined {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
  }
  return undefined;
}

function addNumbers(a?: number, b?: number): number | undefined {
  if (a === undefined || b === undefined) return undefined;
  return a + b;
}

function removeUndefined<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(Object.entries(value).filter((entry) => entry[1] !== undefined)) as T;
}
