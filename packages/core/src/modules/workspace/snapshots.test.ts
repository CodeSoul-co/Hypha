import { describe, expect, it } from 'vitest';
import type { ExecutionPrincipal } from '../../contracts/execution';
import {
  validateWorkspaceDiffRequest,
  validateWorkspaceDiffResult,
  validateWorkspaceDiffSummary,
  validateWorkspacePatchConflict,
  validateWorkspacePatchRequest,
  validateWorkspacePatchResult,
  validateWorkspaceRestoreRequest,
  validateWorkspaceSnapshotEntry,
  validateWorkspaceSnapshotManifest,
  validateWorkspaceSnapshotRequest,
  workspaceDiffResultExample,
  workspacePatchRequestExample,
  workspacePatchResultExample,
  workspaceSnapshotManifestExample,
  workspaceSnapshotRequestExample,
  workspaceSnapshotJsonSchemas,
} from './snapshots';

const principal: ExecutionPrincipal = {
  principalId: 'agent:execution',
  type: 'agent',
  agentId: 'agent:execution',
  permissionScopes: ['workspace:snapshot', 'workspace:write'],
};

describe('Workspace Snapshot, Diff, and Patch contracts', () => {
  it('validates reusable Snapshot, Diff, and Patch fixtures', () => {
    expect(validateWorkspaceSnapshotRequest(workspaceSnapshotRequestExample)).toEqual(
      workspaceSnapshotRequestExample
    );
    expect(validateWorkspaceSnapshotManifest(workspaceSnapshotManifestExample)).toEqual(
      workspaceSnapshotManifestExample
    );
    expect(validateWorkspaceDiffResult(workspaceDiffResultExample)).toEqual(
      workspaceDiffResultExample
    );
    expect(validateWorkspacePatchRequest(workspacePatchRequestExample)).toEqual(
      workspacePatchRequestExample
    );
    expect(validateWorkspacePatchResult(workspacePatchResultExample)).toEqual(
      workspacePatchResultExample
    );
  });

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

  it('keeps Snapshot entry kind and manifest byte evidence consistent', () => {
    expect(() =>
      validateWorkspaceSnapshotEntry({ path: 'working/link', kind: 'symlink' })
    ).toThrow(/required for symlink/u);
    expect(() =>
      validateWorkspaceSnapshotEntry({
        path: 'working/file.txt',
        kind: 'file',
        symlinkTarget: 'working/target.txt',
      })
    ).toThrow(/only valid for symlink/u);
    expect(
      validateWorkspaceSnapshotEntry({
        path: 'working/link',
        kind: 'symlink',
        symlinkTarget: 'working/target.txt',
      })
    ).toMatchObject({ kind: 'symlink', symlinkTarget: 'working/target.txt' });

    expect(() =>
      validateWorkspaceSnapshotManifest({
        ...workspaceSnapshotManifestExample,
        totalBytes: workspaceSnapshotManifestExample.totalBytes + 1,
      })
    ).toThrow(/sum of file entry sizes/u);
    expect(workspaceSnapshotJsonSchemas.WorkspaceSnapshotEntry.allOf).toHaveLength(1);
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

  it('validates component and request contract boundaries', () => {
    expect(
      validateWorkspaceSnapshotEntry(workspaceSnapshotManifestExample.entries[1])
    ).toMatchObject({ kind: 'file', artifactRef: 'artifact:output' });
    expect(
      validateWorkspaceDiffRequest({
        operationId: 'operation:diff',
        workspaceId: 'workspace:1',
        principal,
        fromSnapshotRef: 'snapshot:before',
        toSnapshotRef: 'snapshot:after',
        createPatchArtifact: true,
      })
    ).toMatchObject({ createPatchArtifact: true });
    expect(validateWorkspaceDiffSummary(workspaceDiffResultExample.summary)).toEqual(
      workspaceDiffResultExample.summary
    );
    expect(
      validateWorkspacePatchConflict({
        path: 'working/output.txt',
        reason: 'content hash mismatch',
        expectedHash: 'sha256:expected',
        actualHash: 'sha256:actual',
      })
    ).toMatchObject({ reason: 'content hash mismatch' });
  });

  it('rejects undeclared Snapshot and Patch fields', () => {
    expect(() =>
      validateWorkspaceSnapshotRequest({ ...workspaceSnapshotRequestExample, unexpected: true })
    ).toThrow();
    expect(() =>
      validateWorkspacePatchResult({ ...workspacePatchResultExample, unexpected: true })
    ).toThrow();
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
