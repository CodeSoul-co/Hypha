export interface LocalAdapterProfile {
  id: string;
  type: 'sqlite' | 'local-vector' | 'file-artifact';
  rootPath?: string;
  options?: Record<string, unknown>;
}

export const LOCAL_ADAPTER_TYPES = ['sqlite', 'local-vector', 'file-artifact'] as const;
