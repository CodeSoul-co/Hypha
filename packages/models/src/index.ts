export interface ModelProviderSpec {
  id: string;
  version: string;
  type: 'openai' | 'openai-compatible' | 'mock' | string;
  defaultModelAlias?: string;
  capabilities?: Record<string, boolean>;
}

export interface ModelProvider<TRequest = unknown, TResponse = unknown> {
  id: string;
  generate(request: TRequest): Promise<TResponse>;
  stream?(request: TRequest): AsyncIterable<TResponse>;
}
