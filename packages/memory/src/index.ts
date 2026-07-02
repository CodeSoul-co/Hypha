import type { JsonSchema, PolicyDecision, SpecMetadata, VersionedSpec } from '@hypha/core';

export interface MemoryScope {
  workspaceId?: string;
  sessionId?: string;
  runId?: string;
  userId?: string;
}

export type MemoryType = 'working' | 'episodic' | 'semantic' | 'procedural' | 'artifact' | 'governance';

export interface MemoryRecord<TValue = unknown> {
  id: string;
  type: MemoryType;
  value: TValue;
  source?: string;
  confidence?: number;
  provenance: Record<string, unknown>;
  visibility?: 'private' | 'workspace' | 'public';
  expiresAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface MemorySpec extends VersionedSpec, SpecMetadata {
  providers: MemoryProviderProfile[];
  memoryTypes: MemoryType[];
  readPolicy?: string;
  writePolicy?: string;
  freshnessPolicy?: string;
  provenancePolicy?: 'required' | 'best_effort';
  retentionPolicy?: string;
  privacyPolicy?: string;
  retrievalStrategy?: string;
}

export interface MemoryProviderProfile {
  id: string;
  type: 'structured' | 'vector' | 'artifact' | 'hybrid';
  providerRef: string;
  configSchema?: JsonSchema;
}

export interface StructuredQuery {
  where?: Record<string, unknown>;
  limit?: number;
  orderBy?: string;
}

export interface StructuredStoreProvider {
  get<T>(table: string, id: string): Promise<T | null>;
  insert<T extends { id: string }>(table: string, record: T): Promise<void>;
  update<T>(table: string, id: string, patch: Partial<T>): Promise<void>;
  query<T>(table: string, query: StructuredQuery): Promise<T[]>;
  transaction<T>(fn: (tx: StructuredStoreProvider) => Promise<T>): Promise<T>;
}

export interface VectorRecord {
  id: string;
  vector: number[];
  metadata?: Record<string, unknown>;
}

export interface VectorQuery {
  vector: number[];
  topK: number;
  filter?: Record<string, unknown>;
}

export interface VectorSearchResult {
  id: string;
  score: number;
  metadata?: Record<string, unknown>;
}

export interface VectorIndexProvider {
  upsert(records: VectorRecord[]): Promise<void>;
  search(query: VectorQuery): Promise<VectorSearchResult[]>;
  delete(ids: string[]): Promise<void>;
}

export interface ArtifactMeta {
  contentType?: string;
  sizeBytes?: number;
  hash?: string;
  metadata?: Record<string, unknown>;
}

export interface ArtifactRef {
  id: string;
  path: string;
  meta?: ArtifactMeta;
}

export interface ArtifactStoreProvider {
  put(path: string, content: Buffer | string, meta?: ArtifactMeta): Promise<ArtifactRef>;
  get(ref: ArtifactRef): Promise<Buffer>;
  delete(ref: ArtifactRef): Promise<void>;
}

export interface EmbeddingProvider {
  embed(input: string[]): Promise<number[][]>;
}

export interface MemoryReadQuery {
  ids?: string[];
  type?: MemoryType;
  limit?: number;
}

export interface MemorySearchQuery {
  text?: string;
  vector?: number[];
  type?: MemoryType;
  topK?: number;
}

export interface MemoryWritePolicy {
  allowLongTerm?: boolean;
  requireProvenance?: boolean;
  decision?: PolicyDecision;
}

export interface MemoryWriteResult {
  recordId: string;
  vectorIndexed?: boolean;
  artifactRef?: ArtifactRef;
}

export interface MemorySearchResult {
  record: MemoryRecord;
  score?: number;
  provenance: Record<string, unknown>;
}

export interface MemorySummaryOptions {
  type?: MemoryType;
  limit?: number;
}

export interface MemorySummary {
  scope: MemoryScope;
  recordCount: number;
  types: Partial<Record<MemoryType, number>>;
}

export interface MemoryAuditOptions {
  since?: string;
  until?: string;
}

export interface MemoryAuditReport {
  scope: MemoryScope;
  recordsChecked: number;
  missingProvenance: string[];
}

export interface MemoryProvider {
  read(scope: MemoryScope, query: MemoryReadQuery): Promise<MemoryRecord[]>;
  search(scope: MemoryScope, query: MemorySearchQuery): Promise<MemorySearchResult[]>;
  write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise<MemoryWriteResult>;
  update(scope: MemoryScope, recordId: string, patch: Partial<MemoryRecord>): Promise<void>;
  invalidate(scope: MemoryScope, recordId: string, reason: string): Promise<void>;
  summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise<MemorySummary>;
  audit(scope: MemoryScope, options?: MemoryAuditOptions): Promise<MemoryAuditReport>;
}

export class MemoryManager {
  constructor(private readonly provider: MemoryProvider) {}

  read(scope: MemoryScope, query: MemoryReadQuery): Promise<MemoryRecord[]> {
    return this.provider.read(scope, query);
  }

  search(scope: MemoryScope, query: MemorySearchQuery): Promise<MemorySearchResult[]> {
    return this.provider.search(scope, query);
  }

  write(
    scope: MemoryScope,
    record: MemoryRecord,
    policy: MemoryWritePolicy
  ): Promise<MemoryWriteResult> {
    return this.provider.write(scope, record, policy);
  }
}

export * from './hybrid';
