import type { MemoryManagementCapabilities } from './contracts';
import type { ExternalMemoryClient } from './external-adapters';
import type {
  ManagedMemoryDeleteRequest,
  ManagedMemorySearchRequest,
  ManagedMemoryUpdateRequest,
  MemoryAddRequest,
  MemoryGetRequest,
  MemoryHistoryRequest,
  MemoryListRequest,
} from './operations';
import { memoryError } from './memory-utils';

export interface ExternalProviderAcceptanceFixture {
  add: MemoryAddRequest;
  search: ManagedMemorySearchRequest;
  list: MemoryListRequest;
  get(memoryId: string): MemoryGetRequest;
  update(memoryId: string): ManagedMemoryUpdateRequest;
  history(memoryId: string): MemoryHistoryRequest;
  delete(memoryId: string): ManagedMemoryDeleteRequest;
  resolveMemoryId(result: {
    addedIds: string[];
    searchedIds: string[];
    listedIds: string[];
  }): string | undefined;
}

export interface ExternalProviderAcceptanceReport {
  capabilities: MemoryManagementCapabilities;
  memoryId: string;
  addStatus: string;
  searchCount: number;
  listCount: number;
  updateStatus?: string;
  historyCount?: number;
  deleteStatus: string;
  healthStatus: string;
}

/** Provider-neutral management acceptance flow shared by every external client. */
export async function runExternalProviderAcceptance(
  client: ExternalMemoryClient,
  fixture: ExternalProviderAcceptanceFixture,
  signal?: AbortSignal
): Promise<ExternalProviderAcceptanceReport> {
  assertContractShape(client);
  const discovered = await client.capabilities(signal);
  const capabilities = normalizeCapabilities(discovered);
  for (const required of ['add', 'search', 'get', 'list', 'delete'] as const) {
    if (!capabilities[required]) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        `External provider acceptance requires capability ${required}.`
      );
    }
  }

  const added = await client.add(fixture.add, signal);
  const searched = await client.search(fixture.search, signal);
  const listed = await client.list(fixture.list, signal);
  const memoryId = fixture.resolveMemoryId({
    addedIds: added.records.map((record) => record.id),
    searchedIds: searched.map((result) => result.record.id),
    listedIds: listed.records.map((record) => record.id),
  });
  if (!memoryId) {
    throw memoryError(
      'MEMORY_PROVIDER_UNAVAILABLE',
      'External provider acceptance could not reconcile a stable memory id.'
    );
  }

  const record = await client.get(fixture.get(memoryId), signal);
  if (
    !record ||
    (record.scopeHash !== searched.find((item) => item.record.id === memoryId)?.record.scopeHash &&
      searched.length > 0)
  ) {
    throw memoryError(
      'MEMORY_SCOPE_DENIED',
      'External provider acceptance observed missing or cross-scope get semantics.'
    );
  }

  let updateStatus: string | undefined;
  if (capabilities.update && client.update) {
    updateStatus = (await client.update(fixture.update(memoryId), signal)).status;
  }
  let historyCount: number | undefined;
  if (capabilities.history && client.history) {
    historyCount = (await client.history(fixture.history(memoryId), signal)).length;
  }
  const deleted = await client.delete(fixture.delete(memoryId), signal);
  const health = await client.health(signal);
  await client.close?.();
  return {
    capabilities,
    memoryId,
    addStatus: added.status,
    searchCount: searched.length,
    listCount: listed.records.length,
    updateStatus,
    historyCount,
    deleteStatus: deleted.status,
    healthStatus: health.status,
  };
}

export function assertContractShape(client: ExternalMemoryClient): void {
  for (const method of [
    'capabilities',
    'add',
    'search',
    'get',
    'list',
    'delete',
    'health',
  ] as const) {
    if (typeof client[method] !== 'function') {
      throw memoryError(
        'MEMORY_PROVIDER_NOT_INSTALLED',
        `External provider client is missing required method ${method}.`
      );
    }
  }
}

function normalizeCapabilities(
  value: Partial<MemoryManagementCapabilities>
): MemoryManagementCapabilities {
  const names: Array<keyof MemoryManagementCapabilities> = [
    'add',
    'search',
    'get',
    'list',
    'update',
    'delete',
    'deleteByFilter',
    'history',
    'summarize',
    'consolidate',
    'decay',
    'reinforce',
    'conflictDetection',
    'hybridSearch',
    'graphRelations',
    'asyncWrite',
    'batchOperations',
  ];
  return Object.fromEntries(
    names.map((name) => [name, value[name] === true])
  ) as unknown as MemoryManagementCapabilities;
}
