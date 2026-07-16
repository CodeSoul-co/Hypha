import { describe, expect, it } from 'vitest';
import type { ExecutionPrincipal } from '../../contracts/execution';
import {
  validateWorkspaceDeleteRequest,
  validateWorkspaceListRequest,
  validateWorkspacePathRequest,
  validateWorkspaceReadRequest,
  validateWorkspaceWriteResult,
  validateWorkspaceWriteRequest,
  workspaceOperationJsonSchemas,
} from './operations';

const principal: ExecutionPrincipal = {
  principalId: 'user:1',
  type: 'user',
  userId: 'user:1',
  permissionScopes: ['workspace:read', 'workspace:write'],
};

describe('Workspace operation contracts', () => {
  it('validates a governed relative path request', () => {
    expect(
      validateWorkspacePathRequest({
        workspaceId: 'workspace:1',
        principal,
        relativePath: 'working/src/index.ts',
        operation: 'read',
      })
    ).toMatchObject({ operation: 'read', relativePath: 'working/src/index.ts' });
  });

  it.each([
    '/host/root',
    '\\host\\root',
    'C:\\host\\root',
    '../outside',
    '%2e%2e%2foutside',
    '%252e%252e%252foutside',
    '．．/outside',
    '%2fhost%2froot',
    '%5chost%5croot',
    '%255chost%255croot',
    'working/%00/file',
  ])('rejects raw, encoded, or Unicode-confusable unsafe path %s', (relativePath) => {
    expect(() =>
      validateWorkspacePathRequest({
        workspaceId: 'workspace:1',
        principal,
        relativePath,
        operation: 'read',
      })
    ).toThrow();
  });

  it('requires exactly one write content source', () => {
    const request = {
      operationId: 'operation:1',
      workspaceId: 'workspace:1',
      principal,
      relativePath: 'working/output.txt',
      mode: 'atomic_replace' as const,
      expectedContentHash: 'sha256:before',
    };

    expect(validateWorkspaceWriteRequest({ ...request, content: 'next' })).toMatchObject({
      expectedContentHash: 'sha256:before',
      content: 'next',
    });
    expect(validateWorkspaceWriteRequest({ ...request, artifactRef: 'artifact:1' })).toMatchObject({
      artifactRef: 'artifact:1',
    });
    expect(() => validateWorkspaceWriteRequest(request)).toThrow(/exactly one/u);
    expect(() =>
      validateWorkspaceWriteRequest({ ...request, content: 'next', artifactRef: 'artifact:1' })
    ).toThrow(/exactly one/u);
  });

  it('accepts binary content for in-process callers', () => {
    const content = new Uint8Array([1, 2, 3]);
    expect(
      validateWorkspaceWriteRequest({
        operationId: 'operation:binary',
        workspaceId: 'workspace:1',
        principal,
        relativePath: 'working/output.bin',
        mode: 'create',
        content,
      }).content
    ).toBe(content);
  });

  it('enforces read and list bounds', () => {
    expect(() =>
      validateWorkspaceReadRequest({
        workspaceId: 'workspace:1',
        principal,
        relativePath: 'inputs/data.txt',
        offset: -1,
      })
    ).toThrow();
    expect(() =>
      validateWorkspaceListRequest({
        workspaceId: 'workspace:1',
        principal,
        maxEntries: 0,
      })
    ).toThrow();
  });

  it('retains optimistic concurrency and idempotency on delete', () => {
    expect(
      validateWorkspaceDeleteRequest({
        operationId: 'operation:delete',
        workspaceId: 'workspace:1',
        principal,
        relativePath: 'working/obsolete.txt',
        expectedContentHash: 'sha256:expected',
        idempotencyKey: 'delete:obsolete',
      })
    ).toMatchObject({
      expectedContentHash: 'sha256:expected',
      idempotencyKey: 'delete:obsolete',
    });
  });

  it('validates write results and their file mutation evidence', () => {
    expect(
      validateWorkspaceWriteResult({
        relativePath: 'working/output.txt',
        afterHash: 'sha256:after',
        sizeBytes: 4,
        mutation: {
          path: 'working/output.txt',
          operation: 'modified',
          beforeHash: 'sha256:before',
          afterHash: 'sha256:after',
          detectedAt: '2026-07-16T06:00:00.000Z',
        },
      })
    ).toMatchObject({
      afterHash: 'sha256:after',
      mutation: { operation: 'modified' },
    });
  });

  it('exports JSON Schema boundaries for every operation request', () => {
    expect(Object.keys(workspaceOperationJsonSchemas)).toEqual([
      'WorkspacePathRequest',
      'WorkspaceListRequest',
      'WorkspaceReadRequest',
      'WorkspaceWriteRequest',
      'WorkspaceDeleteRequest',
      'ResolvedWorkspacePath',
      'WorkspaceFileEntry',
      'WorkspaceReadResult',
      'FileMutation',
      'WorkspaceWriteResult',
    ]);
    expect(workspaceOperationJsonSchemas.WorkspaceWriteRequest.oneOf).toHaveLength(2);
    expect(workspaceOperationJsonSchemas.WorkspaceDeleteRequest.required).toContain('operationId');
  });
});
