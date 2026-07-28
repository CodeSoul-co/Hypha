import type { ProviderHealth } from './contracts';

export type WorkspaceFileOperation = 'read' | 'write' | 'list' | 'execute';

export interface WorkspaceRuntimeConfig {
  workingDirectory: string;
  readPaths: string[];
  writePaths: string[];
  executePaths: string[];
  execution: {
    enabled: boolean;
    timeoutMs: number;
    maxOutputBytes: number;
  };
}

export interface WorkspaceRuntimeRequest {
  operation: WorkspaceFileOperation;
  path: string;
  content?: string;
  executable?: boolean;
  args?: string[];
  cwd?: string;
  timeoutMs?: number;
  signal?: AbortSignal;
}

export interface WorkspaceRuntimePort {
  execute(request: WorkspaceRuntimeRequest): Promise<unknown>;
  health(): Promise<ProviderHealth>;
  close?(): Promise<void>;
}
