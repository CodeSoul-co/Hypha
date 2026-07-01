import { ILLMAdapter, LLMProvider, ModelInfo, ChatOptions, ChatResponse, LLMMessage, StreamChunk } from './types';
import { ClaudeAdapter } from './adapters/ClaudeAdapter';
import { OpenAIAdapter } from './adapters/OpenAIAdapter';
import { GeminiAdapter } from './adapters/GeminiAdapter';
import { OllamaAdapter } from './adapters/OllamaAdapter';
import { DeepSeekAdapter } from './adapters/DeepSeekAdapter';
import { OpenAICompatibleAdapter } from './adapters/OpenAICompatibleAdapter';
import { llmConfig, getConfig } from '../../config';
import { logger } from '../../utils/logger';

// OpenAI compatible provider configurations
interface CompatibleProviderConfig {
  name: string;
  baseUrl: string;
  models: { id: string; name: string; description?: string }[];
  defaultModel?: string;
}

const COMPATIBLE_PROVIDERS: Record<string, CompatibleProviderConfig> = {
  kimi: {
    name: 'Kimi',
    baseUrl: 'https://api.moonshot.cn/v1',
    models: [
      { id: 'moonshot-v1-8k', name: 'Moonshot V1 8K', description: '8K context window' },
      { id: 'moonshot-v1-32k', name: 'Moonshot V1 32K', description: '32K context window' },
      { id: 'moonshot-v1-128k', name: 'Moonshot V1 128K', description: '128K context window' },
    ],
    defaultModel: 'moonshot-v1-8k',
  },
  siliconflow: {
    name: 'SiliconFlow',
    baseUrl: 'https://api.siliconflow.cn/v1',
    models: [
      { id: 'Qwen/Qwen3-32B', name: 'Qwen3-32B', description: 'Latest Qwen with strong reasoning' },
      { id: 'Qwen/Qwen2.5-7B-Instruct', name: 'Qwen 2.5 7B', description: 'Fast and efficient' },
      { id: 'deepseek-ai/DeepSeek-V2.5', name: 'DeepSeek V2.5', description: 'Advanced reasoning' },
      { id: 'THUDM/glm-4-9b-chat', name: 'GLM-4 9B', description: 'Chinese optimized' },
    ],
    defaultModel: 'Qwen/Qwen3-32B',
  },
  groq: {
    name: 'Groq',
    baseUrl: 'https://api.groq.com/openai/v1',
    models: [
      { id: 'llama-3.1-70b-versatile', name: 'Llama 3.1 70B', description: 'Fast inference' },
      { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', description: 'Ultra fast' },
      { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', description: 'High quality' },
    ],
    defaultModel: 'llama-3.1-8b-instant',
  },
  together: {
    name: 'Together AI',
    baseUrl: 'https://api.together.xyz/v1',
    models: [
      { id: 'meta-llama/Llama-3-70b-chat-hf', name: 'Llama 3 70B', description: 'High quality chat' },
      { id: 'mistralai/Mixtral-8x22B-Instruct-v0.1', name: 'Mixtral 8x22B', description: 'Expert model' },
      { id: 'deepseek-ai/DeepSeek-V2', name: 'DeepSeek V2', description: 'Efficient MoE' },
    ],
    defaultModel: 'meta-llama/Llama-3-70b-chat-hf',
  },
  perplexity: {
    name: 'Perplexity',
    baseUrl: 'https://api.perplexity.ai',
    models: [
      { id: 'llama-3.1-sonar-large-128k-online', name: 'Sonar Large Online', description: 'With web search' },
      { id: 'llama-3.1-sonar-huge-128k-online', name: 'Sonar Huge Online', description: 'Best with search' },
      { id: 'llama-3.1-sonar-large-128k-chat', name: 'Sonar Large Chat', description: 'General chat' },
    ],
    defaultModel: 'llama-3.1-sonar-large-128k-online',
  },
};

export class LLMManager {
  private adapters: Map<string, ILLMAdapter> = new Map();
  private defaultProvider: string;
  private defaultModel: string;
  private initialized: boolean = false;

  constructor() {
    const config = llmConfig();
    this.defaultProvider = config.defaultProvider;
    this.defaultModel = config.defaultModel;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    const config = getConfig();

    // Initialize Claude
    if (config.llm.anthropic?.enabled !== false && config.llm.providers?.anthropic?.apiKey) {
      const adapter = new ClaudeAdapter(
        config.llm.providers.anthropic.apiKey,
        config.llm.providers.anthropic.baseUrl,
        config.llm.providers.anthropic.timeout
      );
      await adapter.initialize();
      this.adapters.set('anthropic', adapter);
      logger.info('Anthropic Claude adapter initialized');
    }

    // Initialize OpenAI
    if (config.llm.openai?.enabled !== false && config.llm.providers?.openai?.apiKey) {
      const adapter = new OpenAIAdapter(
        config.llm.providers.openai.apiKey,
        config.llm.providers.openai.baseUrl,
        config.llm.providers.openai.timeout
      );
      await adapter.initialize();
      this.adapters.set('openai', adapter);
      logger.info('OpenAI adapter initialized');
    }

    // Initialize Gemini
    if (config.llm.google?.enabled !== false && config.llm.providers?.google?.apiKey) {
      const adapter = new GeminiAdapter(
        config.llm.providers.google.apiKey,
        config.llm.providers.google.baseUrl,
        config.llm.providers.google.timeout
      );
      await adapter.initialize();
      this.adapters.set('google', adapter);
      logger.info('Google Gemini adapter initialized');
    }

    // Initialize Ollama
    if (config.llm.ollama?.enabled !== false) {
      try {
        const adapter = new OllamaAdapter(
          config.llm.ollama?.baseUrl || 'http://localhost:11434',
          config.llm.providers?.ollama?.timeout || 120000
        );
        await adapter.initialize();
        this.adapters.set('ollama', adapter);
        logger.info('Ollama adapter initialized');
      } catch (error) {
        logger.warn('Ollama adapter failed to initialize (is Ollama running?)');
      }
    }

    // Initialize DeepSeek (has its own adapter)
    if (config.llm.deepseek?.enabled !== false && config.llm.providers?.deepseek?.apiKey) {
      const adapter = new DeepSeekAdapter(
        config.llm.providers.deepseek.apiKey,
        config.llm.providers.deepseek.baseUrl,
        config.llm.providers.deepseek.timeout
      );
      await adapter.initialize();
      this.adapters.set('deepseek', adapter);
      logger.info('DeepSeek adapter initialized');
    }

    // Initialize OpenAI-compatible providers
    for (const [providerKey, providerConfig] of Object.entries(COMPATIBLE_PROVIDERS)) {
      const apiKey = process.env[`${providerKey.toUpperCase()}_API_KEY`] as string;

      if (apiKey) {
        try {
          const adapter = new OpenAICompatibleAdapter({
            name: providerConfig.name,
            provider: providerKey as LLMProvider,
            baseUrl: providerConfig.baseUrl,
            apiKey,
            timeout: 60000,
            models: providerConfig.models.map(m => m.id),
            defaultModel: providerConfig.defaultModel,
          });
          await adapter.initialize();
          this.adapters.set(providerKey, adapter);
          logger.info(`${providerConfig.name} adapter initialized`);
        } catch (error) {
          logger.warn(`${providerConfig.name} adapter failed to initialize`);
        }
      }
    }

    this.initialized = true;
    logger.info('LLMManager initialized', {
      providers: Array.from(this.adapters.keys()),
      defaultProvider: this.defaultProvider,
      defaultModel: this.defaultModel,
    });
  }

  async destroy(): Promise<void> {
    for (const [provider, adapter] of this.adapters) {
      await adapter.destroy();
      logger.info(`Adapter ${provider} destroyed`);
    }
    this.adapters.clear();
    this.initialized = false;
  }

  getAdapter(provider?: string): ILLMAdapter | null {
    const targetProvider = provider || this.defaultProvider;
    return this.adapters.get(targetProvider) || null;
  }

  getDefaultProvider(): string {
    return this.defaultProvider;
  }

  getDefaultModel(): string {
    return this.defaultModel;
  }

  async setDefaultProvider(provider: string): Promise<void> {
    if (!this.adapters.has(provider)) {
      throw new Error(`Provider ${provider} is not available`);
    }
    this.defaultProvider = provider;

    // Find default model for this provider
    const providerModels = COMPATIBLE_PROVIDERS[provider as keyof typeof COMPATIBLE_PROVIDERS];
    if (providerModels?.defaultModel) {
      this.defaultModel = providerModels.defaultModel;
    }

    logger.info(`Default provider changed to ${provider}`);
  }

  async setDefaultModel(model: string): Promise<void> {
    this.defaultModel = model;
    logger.info(`Default model changed to ${model}`);
  }

  async chat(messages: LLMMessage[], options?: ChatOptions): Promise<ChatResponse> {
    const provider = options?.model ? this.getProviderFromModel(options.model) : this.defaultProvider;
    const adapter = this.getAdapter(provider);

    if (!adapter) {
      throw new Error(`No adapter available for provider: ${provider}`);
    }

    return adapter.chat(messages, {
      ...options,
      model: options?.model || this.defaultModel,
    });
  }

  async *streamChat(messages: LLMMessage[], options?: ChatOptions): AsyncGenerator<StreamChunk> {
    const provider = options?.model ? this.getProviderFromModel(options.model) : this.defaultProvider;
    const adapter = this.getAdapter(provider);

    if (!adapter) {
      throw new Error(`No adapter available for provider: ${provider}`);
    }

    yield* adapter.streamChat(messages, {
      ...options,
      model: options?.model || this.defaultModel,
    });
  }

  async listAllModels(): Promise<ModelInfo[]> {
    const allModels: ModelInfo[] = [];

    // Add models from compatible providers
    for (const [providerKey, providerConfig] of Object.entries(COMPATIBLE_PROVIDERS)) {
      const models = providerConfig.models.map(m => ({
        id: m.id,
        name: m.id,
        provider: providerKey as LLMProvider,
        displayName: m.name,
        description: m.description || '',
        contextWindow: 128000,
        supportedFeatures: {
          streaming: true,
          toolCalling: true,
          vision: false,
        },
      }));
      allModels.push(...models);
    }

    // Add models from initialized adapters
    for (const [provider, adapter] of this.adapters) {
      try {
        const models = await adapter.listModels();
        allModels.push(...models);
      } catch (error) {
        logger.warn(`Failed to list models for ${provider}`);
      }
    }

    return allModels;
  }

  async listProviderModels(provider: string): Promise<ModelInfo[]> {
    const adapter = this.adapters.get(provider);
    if (adapter) {
      return adapter.listModels();
    }

    // Return predefined models for compatible providers
    const providerConfig = COMPATIBLE_PROVIDERS[provider as keyof typeof COMPATIBLE_PROVIDERS];
    if (providerConfig) {
      return providerConfig.models.map(m => ({
        id: m.id,
        name: m.id,
        provider: provider as LLMProvider,
        displayName: m.name,
        description: m.description || '',
        contextWindow: 128000,
        supportedFeatures: {
          streaming: true,
          toolCalling: true,
          vision: false,
        },
      }));
    }

    return [];
  }

  async healthCheck(): Promise<Record<string, boolean>> {
    const health: Record<string, boolean> = {};
    for (const [provider, adapter] of this.adapters) {
      health[provider] = await adapter.healthCheck().catch(() => false);
    }
    return health;
  }

  getAvailableProviders(): string[] {
    return Array.from(this.adapters.keys());
  }

  isProviderAvailable(provider: string): boolean {
    return this.adapters.has(provider);
  }

  isProviderEnabled(provider: string): boolean {
    const config = getConfig();
    const providerConfig = (config.llm as any)[provider];
    return providerConfig?.enabled !== false;
  }

  async isModelEnabled(modelId: string): Promise<boolean> {
    const allModels = await this.listAllModels();
    return allModels.some(m => m.id === modelId);
  }

  getProviderFromModel(modelId: string): string {
    // Check if it's a known model ID for a compatible provider
    for (const [providerKey, providerConfig] of Object.entries(COMPATIBLE_PROVIDERS)) {
      if (providerConfig.models.some(m => m.id === modelId)) {
        return providerKey;
      }
    }
    // Check if it's a standard model (anthropic, openai, etc.)
    const standardProviders = ['anthropic', 'openai', 'google', 'ollama', 'deepseek'];
    for (const provider of standardProviders) {
      if (this.adapters.has(provider)) {
        return provider;
      }
    }
    return this.defaultProvider;
  }
}

// Singleton instance
let llmManagerInstance: LLMManager | null = null;

export function getLLMManager(): LLMManager {
  if (!llmManagerInstance) {
    llmManagerInstance = new LLMManager();
  }
  return llmManagerInstance;
}

export async function initializeLLM(): Promise<LLMManager> {
  const manager = getLLMManager();
  await manager.initialize();
  return manager;
}

export async function destroyLLM(): Promise<void> {
  if (llmManagerInstance) {
    await llmManagerInstance.destroy();
    llmManagerInstance = null;
  }
}

export default LLMManager;
