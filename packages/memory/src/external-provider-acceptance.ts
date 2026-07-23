import type {
  ManagedMemoryRecord,
  MemoryManagementCapabilities,
  NormalizedMemoryError,
} from './contracts';
import type { ExternalMemoryClient } from './external-adapters';
import type {
  ManagedMemoryDeleteRequest,
  ManagedMemorySearchRequest,
  ManagedMemoryUpdateRequest,
  ManagedMemoryWriteResult,
  MemoryAddRequest,
  MemoryGetRequest,
  MemoryHistoryRequest,
  MemoryListRequest,
} from './operations';
import { isNormalizedMemoryError, memoryError } from './memory-utils';

export interface ExternalProviderAcceptanceFixture {
  add: MemoryAddRequest;
  search: ManagedMemorySearchRequest;
  list: MemoryListRequest;
  get(memoryId: string): MemoryGetRequest;
  update(memoryId: string): ManagedMemoryUpdateRequest;
  history(memoryId: string): MemoryHistoryRequest;
  delete(memoryId: string): ManagedMemoryDeleteRequest;
  forbiddenGet?(memoryId: string): MemoryGetRequest;
  resolveMemoryId(result: {
    addedIds: string[];
    searchedIds: string[];
    listedIds: string[];
  }): string | undefined;
}

export interface ExternalProviderFailureProbe {
  id: string;
  expectedCodes: readonly NormalizedMemoryError['code'][];
  run(signal?: AbortSignal): Promise<void>;
}

export interface ExternalProviderAcceptanceHooks {
  settleAdd?(result: ManagedMemoryWriteResult, signal?: AbortSignal): Promise<void>;
  preparePagination?(signal?: AbortSignal): Promise<void>;
  verifyRestart?(memoryId: string, signal?: AbortSignal): Promise<void>;
  failureProbes?: readonly ExternalProviderFailureProbe[];
  cleanup?(signal?: AbortSignal): Promise<void>;
}
export interface ExternalProviderAcceptanceEvidenceInput {
  commitSha: string;
  providerId: string;
  providerVersion: string;
  profileHash: string;
  environmentHash: string;
  now?: () => string;
}

export interface ExternalProviderAcceptanceEvidence {
  commitSha: string;
  providerId: string;
  providerVersion: string;
  profileHash: string;
  capabilitySnapshot: MemoryManagementCapabilities;
  environmentHash: string;
  startedAt: string;
  finishedAt: string;
}

export interface ExternalProviderAcceptanceReport {
  status: 'passed';
  capabilities: MemoryManagementCapabilities;
  memoryId: string;
  addStatus: string;
  searchCount: number;
  listCount: number;
  updateStatus?: string;
  historyCount?: number;
  deleteStatus: string;
  healthStatus: string;
  paginationPageCount: number;
  scopeIsolationVerified: boolean;
  restartVerified: boolean;
  failureProbeCount: number;
  evidence?: ExternalProviderAcceptanceEvidence;
}

/** Provider-neutral management acceptance flow shared by every external client. */
export async function runExternalProviderAcceptance(
  client: ExternalMemoryClient,
  fixture: ExternalProviderAcceptanceFixture,
  signal?: AbortSignal,
  evidenceInput?: ExternalProviderAcceptanceEvidenceInput,
  hooks: ExternalProviderAcceptanceHooks = {}
): Promise<ExternalProviderAcceptanceReport> {
  const now = evidenceInput?.now ?? (() => new Date().toISOString());
  const startedAt = now();
  let memoryId: string | undefined;
  let deleteStatus: string | undefined;
  try {
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
    if (added.status === 'queued') {
      if (!hooks.settleAdd) {
        throw memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          'Queued external provider acceptance requires an explicit settlement hook.'
        );
      }
      await hooks.settleAdd(added, signal);
    }
    await hooks.preparePagination?.(signal);
    const searched = await client.search(fixture.search, signal);
    const listedRecords: ManagedMemoryRecord[] = [];
    let listRequest = fixture.list;
    let paginationPageCount = 0;
    for (let pageNumber = 0; pageNumber < 100; pageNumber += 1) {
      const page = await client.list(listRequest, signal);
      paginationPageCount += 1;
      listedRecords.push(...page.records);
      if (!page.hasMore || !page.nextCursor) break;
      if (pageNumber === 99) {
        throw memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          'External provider acceptance exceeded its pagination page limit.'
        );
      }
      listRequest = {
        ...fixture.list,
        pagination: { ...fixture.list.pagination, cursor: page.nextCursor },
      };
    }
    memoryId = fixture.resolveMemoryId({
      addedIds: added.records.map((record) => record.id),
      searchedIds: searched.map((result) => result.record.id),
      listedIds: listedRecords.map((record) => record.id),
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
      (record.scopeHash !==
        searched.find((item) => item.record.id === memoryId)?.record.scopeHash &&
        searched.length > 0)
    ) {
      throw memoryError(
        'MEMORY_SCOPE_DENIED',
        'External provider acceptance observed missing or cross-scope get semantics.'
      );
    }

    let scopeIsolationVerified = false;
    if (fixture.forbiddenGet) {
      let rejection: unknown;
      try {
        await client.get(fixture.forbiddenGet(memoryId), signal);
      } catch (error) {
        rejection = error;
      }
      if (!rejection) {
        throw memoryError(
          'MEMORY_SCOPE_DENIED',
          'External provider acceptance allowed a cross-scope get.'
        );
      }
      if (
        !isNormalizedMemoryError(rejection) ||
        !['MEMORY_SCOPE_DENIED', 'MEMORY_NOT_FOUND'].includes(rejection.code)
      ) {
        throw memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          'External provider acceptance cross-scope rejection was not normalized.'
        );
      }
      scopeIsolationVerified = true;
    }
    let updateStatus: string | undefined;
    if (capabilities.update && client.update) {
      updateStatus = (await client.update(fixture.update(memoryId), signal)).status;
    }
    let historyCount: number | undefined;
    if (capabilities.history && client.history) {
      historyCount = (await client.history(fixture.history(memoryId), signal)).length;
    }
    let restartVerified = false;
    if (hooks.verifyRestart) {
      await hooks.verifyRestart(memoryId, signal);
      restartVerified = true;
    }
    let failureProbeCount = 0;
    for (const probe of hooks.failureProbes ?? []) {
      try {
        await probe.run(signal);
        throw memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          `External provider failure probe ${probe.id} did not fail.`
        );
      } catch (error) {
        if (!isNormalizedMemoryError(error) || !probe.expectedCodes.includes(error.code)) {
          throw memoryError(
            'MEMORY_PROVIDER_UNAVAILABLE',
            `External provider failure probe ${probe.id} was not normalized as expected.`
          );
        }
        failureProbeCount += 1;
      }
    }
    const deleted = await client.delete(fixture.delete(memoryId), signal);
    deleteStatus = deleted.status;
    if (deleteStatus !== 'completed') {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        `External provider acceptance cleanup ended with ${deleteStatus}.`
      );
    }
    const health = await client.health(signal);
    if (health.status !== 'healthy') {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        `External provider acceptance health ended with ${health.status}.`
      );
    }
    const finishedAt = now();
    return {
      status: 'passed',
      capabilities,
      memoryId,
      addStatus: added.status,
      searchCount: searched.length,
      listCount: listedRecords.length,
      updateStatus,
      historyCount,
      deleteStatus,
      healthStatus: health.status,
      paginationPageCount,
      scopeIsolationVerified,
      restartVerified,
      failureProbeCount,
      evidence: evidenceInput
        ? {
            commitSha: evidenceInput.commitSha,
            providerId: evidenceInput.providerId,
            providerVersion: evidenceInput.providerVersion,
            profileHash: evidenceInput.profileHash,
            capabilitySnapshot: capabilities,
            environmentHash: evidenceInput.environmentHash,
            startedAt,
            finishedAt,
          }
        : undefined,
    };
  } finally {
    if (memoryId && deleteStatus !== 'completed') {
      try {
        await client.delete(fixture.delete(memoryId));
      } catch {
        // Preserve the original acceptance failure while still attempting cleanup.
      }
    }
    try {
      await hooks.cleanup?.(signal);
    } finally {
      await client.close?.();
    }
  }
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
