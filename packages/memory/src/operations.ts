import type {
  ManagedMemoryRecord,
  ManagedMemoryScope,
  ManagedMemoryType,
  MemoryContractSpecRef,
  MemoryPrincipal,
  MemorySource,
  MemoryStatus,
  NormalizedMemoryError,
} from './contracts';

export interface PaginationRequest {
  cursor?: string;
  limit?: number;
}

export interface PaginationResult {
  nextCursor?: string;
  hasMore: boolean;
}

export interface MemoryRejectedItem {
  itemId?: string;
  reason: string;
  error?: NormalizedMemoryError;
}

export interface MemoryIndexJobRef {
  id: string;
  state: 'pending' | 'processing' | 'completed' | 'partial' | 'failed';
}

export interface MemoryAddRequest {
  operationId: string;
  principal: MemoryPrincipal;
  scope: ManagedMemoryScope;
  input: unknown;
  inputType?: 'message' | 'text' | 'structured' | 'artifact_ref' | 'event_ref';
  memoryType?: ManagedMemoryType;
  source: MemorySource;
  extractionMode?: 'none' | 'native' | 'provider' | 'custom';
  writeMode?: 'sync' | 'async';
  idempotencyKey?: string;
  profileRef: MemoryContractSpecRef;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface ManagedMemoryWriteResult {
  operationId: string;
  status: 'committed' | 'queued' | 'reused' | 'rejected' | 'partial' | 'failed';
  records: ManagedMemoryRecord[];
  rejectedItems?: MemoryRejectedItem[];
  indexJobs?: MemoryIndexJobRef[];
  events?: string[];
  warnings?: string[];
}

export interface MemorySearchFilter {
  ids?: string[];
  excludeIds?: string[];
  statuses?: MemoryStatus[];
  tagsAny?: string[];
  tagsAll?: string[];
  createdAfter?: string;
  createdBefore?: string;
  updatedAfter?: string;
  expiresAfter?: string;
  confidenceGte?: number;
  importanceGte?: number;
  sourceTypes?: MemorySource['type'][];
  entityIds?: string[];
  visibility?: ManagedMemoryRecord['visibility'][];
  verifiedOnly?: boolean;
  conflictFreeOnly?: boolean;
  canonicalKeys?: string[];
  metadata?: Record<string, unknown>;
}

export interface ManagedMemorySearchRequest {
  operationId: string;
  principal: MemoryPrincipal;
  scope: ManagedMemoryScope;
  profileRef: MemoryContractSpecRef;
  query?: string;
  queryEmbedding?: number[];
  filters?: MemorySearchFilter;
  memoryTypes?: ManagedMemoryType[];
  mode?: 'structured' | 'semantic' | 'keyword' | 'hybrid' | 'graph';
  topK?: number;
  scoreThreshold?: number;
  includeDormant?: boolean;
  includeSuperseded?: boolean;
  includeContent?: boolean;
  includeProvenance?: boolean;
  includeRelations?: boolean;
  rerank?: boolean;
  updateAccessStats?: boolean;
  pagination?: PaginationRequest;
  metadata?: Record<string, unknown>;
}

export interface ManagedMemorySearchResult {
  record: ManagedMemoryRecord;
  score?: number;
  semanticScore?: number;
  keywordScore?: number;
  graphScore?: number;
  rerankScore?: number;
  reasons?: string[];
}

export interface MemoryPatch {
  content?: unknown;
  canonicalText?: string;
  summary?: string;
  confidence?: number;
  importance?: number;
  tags?: string[];
  status?: Exclude<MemoryStatus, 'deleted'>;
  metadata?: Record<string, unknown>;
}

export interface ManagedMemoryUpdateRequest {
  operationId: string;
  principal: MemoryPrincipal;
  scope: ManagedMemoryScope;
  memoryId: string;
  expectedRevision?: number;
  patch: MemoryPatch;
  reason: string;
  idempotencyKey?: string;
}

export interface ManagedMemoryDeleteRequest {
  operationId: string;
  principal: MemoryPrincipal;
  scope: ManagedMemoryScope;
  memoryIds?: string[];
  filter?: MemorySearchFilter;
  mode: 'soft' | 'hard' | 'compliance';
  reason: string;
  idempotencyKey?: string;
}

export interface MemoryGetRequest {
  operationId: string;
  principal: MemoryPrincipal;
  scope: ManagedMemoryScope;
  memoryId: string;
  includeHistory?: boolean;
}

export interface MemoryListRequest {
  operationId: string;
  principal: MemoryPrincipal;
  scope: ManagedMemoryScope;
  filter?: MemorySearchFilter;
  pagination?: PaginationRequest;
}

export interface MemoryListResult extends PaginationResult {
  records: ManagedMemoryRecord[];
}

export interface ManagedMemoryDeleteResult {
  operationId: string;
  status: 'completed' | 'partial' | 'rejected' | 'failed';
  deletedMemoryIds: string[];
  pendingProviderIds?: string[];
  events?: string[];
  warnings?: string[];
}

export interface MemoryHistoryRequest {
  operationId: string;
  principal: MemoryPrincipal;
  scope: ManagedMemoryScope;
  memoryId: string;
  pagination?: PaginationRequest;
}

export interface MemoryVersion {
  memoryId: string;
  versionId: string;
  revision: number;
  record: ManagedMemoryRecord;
}

export interface ProviderHealth {
  status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
  checkedAt: string;
  latencyMs?: number;
  message?: string;
  details?: Record<string, unknown>;
}

export interface MemoryManagementProvider {
  readonly id: string;
  capabilities(): Promise<import('./contracts').MemoryManagementCapabilities>;
  add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
  search(
    request: ManagedMemorySearchRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemorySearchResult[]>;
  get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
  list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
  update(
    request: ManagedMemoryUpdateRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryWriteResult>;
  delete(
    request: ManagedMemoryDeleteRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryDeleteResult>;
  history?(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
  health(): Promise<ProviderHealth>;
  close?(): Promise<void>;
}
