import { IMessage } from '../../types';

// LLM Provider types
export type LLMProvider = 'anthropic' | 'openai' | 'google' | 'ollama' | 'deepseek' | 'kimi' | 'siliconflow' | 'groq' | 'together' | 'perplexity';

// Message format
export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
}

// Temporary message for Redis storage
export interface TempMessage {
  id: string;
  userId: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  modelId?: string;
  modelProvider?: string;
  metadata?: Record<string, any>;
}

// Chat options
export interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  topK?: number;
  stopSequences?: string[];
  stream?: boolean;
  systemPrompt?: string;
  tools?: ToolDefinition[];
  toolChoice?: 'auto' | 'none' | { type: 'function'; function: { name: string } };
  cache?: LLMCacheOptions;
}

export interface LLMCacheOptions {
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

// Tool definition
export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties?: Record<string, any>;
    required?: string[];
  };
}

// Chat response
export interface ChatResponse {
  id: string;
  model: string;
  provider: LLMProvider;
  content: string;
  role: 'assistant';
  finishReason: 'stop' | 'length' | 'tool_use' | 'content_filter';
  usage?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    /** Subset of `inputTokens` served from the provider's prompt cache
     *  (e.g. DeepSeek's `prompt_tokens_details.cached_tokens`). Defaults to 0
     *  when the provider doesn't break the count down. */
    cacheHitTokens?: number;
  };
  toolCalls?: ToolCall[];
  raw?: any;
}

// Tool call
export interface ToolCall {
  id: string;
  name: string;
  input: any;
}

// Stream chunk
export interface StreamChunk {
  type: 'content' | 'tool_call' | 'tool_result' | 'error' | 'done';
  content?: string;
  toolCall?: ToolCall;
  error?: string;
  finishReason?: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    cacheHitTokens?: number;
  };
}

// Model info
export interface ModelInfo {
  id: string;
  name: string;
  provider: LLMProvider;
  displayName: string;
  description: string;
  contextWindow: number;
  supportedFeatures: {
    streaming: boolean;
    toolCalling: boolean;
    vision: boolean;
    functionCalling?: boolean;
  };
  pricing?: {
    input?: number;
    output?: number;
    currency?: string;
  };
}

// LLM Adapter interface
export interface ILLMAdapter {
  readonly name: string;
  readonly provider: LLMProvider;

  // Core methods
  chat(messages: LLMMessage[], options?: ChatOptions): Promise<ChatResponse>;
  streamChat(messages: LLMMessage[], options?: ChatOptions): AsyncGenerator<StreamChunk>;

  // Tool calling
  createToolCall(messages: LLMMessage[], tools: ToolDefinition[], options?: ChatOptions): Promise<ChatResponse>;

  // Model management
  listModels(): Promise<ModelInfo[]>;
  getModel(modelId: string): Promise<ModelInfo | null>;

  // Health check
  healthCheck(): Promise<boolean>;

  // Initialize
  initialize(): Promise<void>;
  destroy(): Promise<void>;
}

// LLM Factory
export interface LLMFactoryConfig {
  provider: LLMProvider;
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
  defaultModel?: string;
}
