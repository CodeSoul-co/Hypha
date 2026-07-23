import { describe, expect, it } from 'vitest';
import {
  assertContractShape,
  runExternalProviderAcceptance,
  type ExternalMemoryClient,
  type ManagedMemoryRecord,
  type ManagedMemoryScope,
  type MemoryPrincipal,
} from './index';

const principal: MemoryPrincipal = {
  principalId: 'acceptance-user',
  type: 'user',
  userId: 'acceptance-user',
  permissionScopes: ['memory:read', 'memory:write'],
};
const scope: ManagedMemoryScope = { userId: 'acceptance-user', workspaceId: 'acceptance-space' };
const record: ManagedMemoryRecord = {
  id: 'memory:acceptance:1',
  versionId: 'memory:acceptance:1:v1',
  revision: 1,
  type: 'semantic',
  content: 'blue',
  canonicalText: 'blue',
  scope,
  visibility: 'private',
  source: { type: 'user_message', sourceId: 'm1' },
  provenance: {
    createdBy: 'test',
    providerId: 'test-provider',
    createdAt: '2026-07-21T00:00:00.000Z',
  },
  accessCount: 0,
  status: 'active',
  indexStatus: { state: 'indexed', attempts: 0 },
  contentHash: 'hash',
  scopeHash: 'scope-hash',
  createdAt: '2026-07-21T00:00:00.000Z',
  updatedAt: '2026-07-21T00:00:00.000Z',
};
const profileRef = { id: 'memory.acceptance', version: '1.0.0' };

describe('external provider acceptance harness', () => {
  it('runs the same management lifecycle without provider-specific branches', async () => {
    let closed = false;
    let paginationPrepared = false;
    let cleaned = false;
    let listCalls = 0;
    const client: ExternalMemoryClient = {
      capabilities: async () => ({
        add: true,
        search: true,
        get: true,
        list: true,
        update: true,
        delete: true,
        history: true,
      }),
      add: async (request) => ({
        operationId: request.operationId,
        status: 'queued',
        records: [record],
      }),
      search: async () => [{ record, score: 1 }],
      get: async (request) => {
        if (request.scope.userId === 'other-user') {
          throw {
            code: 'MEMORY_SCOPE_DENIED',
            message: 'scope denied',
            retryable: false,
          };
        }
        return record;
      },
      list: async () => {
        listCalls += 1;
        return {
          records: [record],
          hasMore: listCalls === 1,
          nextCursor: listCalls === 1 ? 'next-page' : undefined,
        };
      },
      update: async (request) => ({
        operationId: request.operationId,
        status: 'committed',
        records: [record],
      }),
      delete: async (request) => ({
        operationId: request.operationId,
        status: 'completed',
        deletedMemoryIds: [record.id],
      }),
      history: async () => [
        { memoryId: record.id, versionId: record.versionId, revision: 1, record },
      ],
      health: async () => ({ status: 'healthy', checkedAt: '2026-07-21T00:00:00.000Z' }),
      close: async () => {
        closed = true;
      },
    };
    const report = await runExternalProviderAcceptance(
      client,
      {
        add: {
          operationId: 'add',
          principal,
          scope,
          input: 'blue',
          source: record.source,
          profileRef,
        },
        search: { operationId: 'search', principal, scope, profileRef, query: 'blue' },
        list: { operationId: 'list', principal, scope, pagination: { limit: 10 } },
        get: (memoryId) => ({ operationId: 'get', principal, scope, memoryId }),
        update: (memoryId) => ({
          operationId: 'update',
          principal,
          scope,
          memoryId,
          patch: { canonicalText: 'navy' },
          reason: 'acceptance',
        }),
        history: (memoryId) => ({ operationId: 'history', principal, scope, memoryId }),
        forbiddenGet: (memoryId) => ({
          operationId: 'forbidden-get',
          principal,
          scope: { userId: 'other-user' },
          memoryId,
        }),
        delete: (memoryId) => ({
          operationId: 'delete',
          principal,
          scope,
          memoryIds: [memoryId],
          mode: 'hard',
          reason: 'acceptance',
        }),
        resolveMemoryId: ({ addedIds }) => addedIds[0],
      },
      undefined,
      {
        commitSha: 'commit:acceptance',
        providerId: 'test-provider',
        providerVersion: '1.2.3',
        profileHash: 'sha256:profile',
        environmentHash: 'sha256:environment',
        now: () => '2026-07-21T00:00:00.000Z',
      },
      {
        settleAdd: async () => undefined,
        preparePagination: async () => {
          paginationPrepared = true;
        },
        verifyRestart: async (memoryId) => {
          expect(memoryId).toBe(record.id);
        },
        failureProbes: [
          {
            id: 'permission-denied',
            expectedCodes: ['MEMORY_PERMISSION_DENIED'],
            run: async () => {
              throw {
                code: 'MEMORY_PERMISSION_DENIED',
                message: 'permission denied',
                retryable: false,
              };
            },
          },
        ],
        cleanup: async () => {
          cleaned = true;
        },
      }
    );
    expect(report).toMatchObject({
      memoryId: record.id,
      addStatus: 'queued',
      updateStatus: 'committed',
      deleteStatus: 'completed',
      healthStatus: 'healthy',
      listCount: 2,
      paginationPageCount: 2,
      scopeIsolationVerified: true,
      restartVerified: true,
      failureProbeCount: 1,
      evidence: {
        commitSha: 'commit:acceptance',
        providerId: 'test-provider',
        providerVersion: '1.2.3',
        profileHash: 'sha256:profile',
        environmentHash: 'sha256:environment',
        capabilitySnapshot: expect.objectContaining({ add: true, search: true }),
      },
    });
    expect(paginationPrepared).toBe(true);
    expect(cleaned).toBe(true);
    expect(closed).toBe(true);
  });

  it('fails fast for an uninstalled shell client', () => {
    expect(() => assertContractShape({} as ExternalMemoryClient)).toThrow(
      expect.objectContaining({ code: 'MEMORY_PROVIDER_NOT_INSTALLED' })
    );
  });
});
