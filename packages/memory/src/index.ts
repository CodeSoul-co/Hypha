export interface MemoryScope {
  workspaceId?: string;
  sessionId?: string;
  runId?: string;
  userId?: string;
}

export interface MemoryRecord<TValue = unknown> {
  id: string;
  type: 'working' | 'episodic' | 'semantic' | 'procedural' | 'artifact' | 'governance';
  value: TValue;
  provenance?: Record<string, unknown>;
  createdAt: string;
}

export interface MemoryProvider {
  read(scope: MemoryScope, query: unknown): Promise<MemoryRecord[]>;
  search(scope: MemoryScope, query: unknown): Promise<MemoryRecord[]>;
  write(scope: MemoryScope, record: MemoryRecord, policy?: unknown): Promise<void>;
}
