import { describe, expect, it } from 'vitest';
import type { ExecutionPrincipal } from '../../contracts/execution';
import {
  validateWorkspaceDiffResult,
  validateWorkspacePatchRequest,
  validateWorkspacePatchResult,
  validateWorkspaceRestoreRequest,
  validateWorkspaceSnapshotManifest,
  validateWorkspaceSnapshotRequest,
  workspaceSnapshotJsonSchemas,
} from './snapshots';

const principal: ExecutionPrincipal = {
  principalId: 'agent:execution',
  type: 'agent',
  agentId: 'agent:execution',
  permissionScopes: ['workspace:snapshot', 'workspace:write'],
};

describe('Workspace Snapshot, Diff, and Patch contracts', () => {
  it('requires a base reference for incremental snapshots', () => {
    const request = {
      operationId: 'operation:snapshot',
      workspaceId: 'workspace:1',
      principal,
      type: 'incremental' as const,
    };

    expect(() => validateWorkspaceSnapshotRequest(request)).toThrow(/baseSnapshotRef/u);
    expect(
      validateWorkspaceSnapshotRequest({ ...request, baseSnapshotRef: 'snapshot:base' })
    ).toMatchObject({ type: 'incremental', baseSnapshotRef: 'snapshot:base' });
  });

  it.each(['../outside', '%2e%2e%2foutside', '．．/outside'])(
    'rejects unsafe Snapshot include path %s',
    (path) => {
      expect(() =>
        validateWorkspaceSnapshotRequest({
          operationId: 'operation:snapshot',
          workspaceId: 'workspace:1',
          principal,
          type: 'full',
          includePaths: [path],
        })
      ).toThrow();
    }
  );

  it('validates a manifest with Cache validity hashes and opaque references', () => {
    expect(
      validateWorkspaceSnapshotManifest({
        id: 'snapshot:1',
        workspaceId: 'workspace:1',
        entries: [
          { path: 'working', kind: 'directory' },
          {
            path: 'working/index.ts',
            kind: 'file',
            sizeBytes: 24,
            contentHash: 'sha256:file',
            artifactRef: 'artifact:file',
          },
        ],
        sourceTreeHash: 'sha256:source-tree',
        manifestHash: 'sha256:manifest',
        totalBytes: 24,
        fileCount: 1,
        createdAt: '2026-07-16T06:00:00.000Z',
        createdBy: 'agent:execution',
      })
    ).toMatchObject({
      sourceTreeHash: 'sha256:source-tree',
      manifestHash: 'sha256:manifest',
      entries: [{ path: 'working' }, { artifactRef: 'artifact:file' }],
    });
  });

  it('rejects duplicate manifest paths and inconsistent file counts', () => {
    const manifest = {
      id: 'snapshot:invalid',
      workspaceId: 'workspace:1',
      entries: [
        { path: 'working/index.ts', kind: 'file' as const },
        { path: 'working\\index.ts', kind: 'file' as const },
      ],
      sourceTreeHash: 'sha256:source-tree',
      manifestHash: 'sha256:manifest',
      totalBytes: 0,
      fileCount: 1,
      createdAt: '2026-07-16T06:00:00.000Z',
      createdBy: 'agent:execution',
    };
    expect(() => validateWorkspaceSnapshotManifest(manifest)).toThrow(/unique/u);
    expect(() =>
      validateWorkspaceSnapshotManifest({
        ...manifest,
        entries: [{ path: 'working/index.ts', kind: 'file' }],
        fileCount: 0,
      })
    ).toThrow(/number of file entries/u);
  });

  it('retains stale-state protection on restore', () => {
    expect(
      validateWorkspaceRestoreRequest({
        operationId: 'operation:restore',
        workspaceId: 'workspace:1',
        principal,
        snapshotRef: 'snapshot:1',
        expectedWorkspaceSnapshotHash: 'sha256:current',
        idempotencyKey: 'restore:1',
      })
    ).toMatchObject({ expectedWorkspaceSnapshotHash: 'sha256:current' });
  });

  it('treats check as dry run and requires a base hash for apply', () => {
    const request = {
      operationId: 'operation:patch',
      workspaceId: 'workspace:1',
      principal,
      patchArtifactRef: 'artifact:patch',
      conflictPolicy: 'fail' as const,
    };

    expect(validateWorkspacePatchRequest({ ...request, mode: 'check' })).toMatchObject({
      mode: 'check',
    });
    expect(() => validateWorkspacePatchRequest({ ...request, mode: 'apply' })).toThrow(
      /expectedBaseSnapshotHash/u
    );
    expect(
      validateWorkspacePatchRequest({
        ...request,
        mode: 'apply',
        expectedBaseSnapshotHash: 'sha256:base',
      })
    ).toMatchObject({ mode: 'apply', expectedBaseSnapshotHash: 'sha256:base' });
  });

  it('requires applied patches to report checking and the resulting hash', () => {
    const result = { applied: true, checked: true, conflicts: [], mutations: [] };
    expect(() => validateWorkspacePatchResult(result)).toThrow(/resultingWorkspaceSnapshotHash/u);
    expect(() =>
      validateWorkspacePatchResult({
        ...result,
        checked: false,
        resultingWorkspaceSnapshotHash: 'sha256:next',
      })
    ).toThrow(/checked/u);
    expect(
      validateWorkspacePatchResult({
        ...result,
        resultingWorkspaceSnapshotHash: 'sha256:next',
      })
    ).toMatchObject({ applied: true, resultingWorkspaceSnapshotHash: 'sha256:next' });
  });

  it('keeps Diff output to mutations, opaque references, and summaries', () => {
    expect(
      validateWorkspaceDiffResult({
        fromSnapshotRef: 'snapshot:before',
        toSnapshotRef: 'snapshot:after',
        mutations: [
          {
            path: 'working/index.ts',
            operation: 'modified',
            beforeHash: 'sha256:before',
            afterHash: 'sha256:after',
            detectedAt: '2026-07-16T06:01:00.000Z',
          },
        ],
        patchArtifactRef: 'artifact:patch',
        summary: {
          created: 0,
          modified: 1,
          deleted: 0,
          renamed: 0,
          permissionChanged: 0,
          bytesAdded: 4,
          bytesRemoved: 2,
        },
      })
    ).toMatchObject({ patchArtifactRef: 'artifact:patch', summary: { modified: 1 } });
  });

  it('exports JSON Schema conditions for incremental Snapshot and Patch apply', () => {
    expect(Object.keys(workspaceSnapshotJsonSchemas)).toEqual([
      'WorkspaceSnapshotRequest',
      'WorkspaceSnapshotEntry',
      'WorkspaceSnapshotManifest',
      'WorkspaceRestoreRequest',
      'WorkspaceDiffRequest',
      'WorkspaceDiffResult',
      'WorkspaceDiffSummary',
      'WorkspacePatchRequest',
      'WorkspacePatchConflict',
      'WorkspacePatchResult',
    ]);
    expect(workspaceSnapshotJsonSchemas.WorkspaceSnapshotRequest.allOf).toHaveLength(1);
    expect(workspaceSnapshotJsonSchemas.WorkspacePatchRequest.allOf).toHaveLength(1);
    expect(workspaceSnapshotJsonSchemas.WorkspacePatchResult.allOf).toHaveLength(1);
  });
});
