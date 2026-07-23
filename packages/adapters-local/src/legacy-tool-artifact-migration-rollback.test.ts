import type { ArtifactRecord, ExecutionPrincipal } from '@hypha/core';
import { describe, expect, it, vi } from 'vitest';
import type { LegacyToolArtifactMigrationExecutionResult } from './legacy-tool-artifact-migration-executor';
import type { LegacyToolArtifactMigrationPlan } from './legacy-tool-artifact-migration-planner';
import {
  LegacyToolArtifactMigrationRollbackError,
  LegacyToolArtifactMigrationRollbackExecutor,
} from './legacy-tool-artifact-migration-rollback';

const principal: ExecutionPrincipal = {
  principalId: 'agent.rollback',
  type: 'agent',
  agentId: 'agent.rollback',
  userId: 'user.rollback',
  permissionScopes: ['artifact:read', 'artifact:delete'],
};

describe('LegacyToolArtifactMigrationRollbackExecutor', () => {
  it('rolls back in reverse order and isolates an individual delete failure', async () => {
    const fixture = rollbackFixture(2);
    const records = new Map(
      fixture.execution.items.map((item) => [
        item.artifactId!,
        importedRecord(item.artifactId!, item.versionId!, item.revision!, item.legacyArtifactId),
      ])
    );
    const manager = {
      get: vi.fn(async ({ artifactId }: { artifactId: string }) => records.get(artifactId) ?? null),
      delete: vi.fn(async ({ artifactId }: { artifactId: string }) => {
        if (artifactId === 'artifact.rollback.2') throw new Error('delete blocked');
        records.delete(artifactId);
      }),
    };

    const result = await new LegacyToolArtifactMigrationRollbackExecutor({ manager }).rollback({
      plan: fixture.plan,
      execution: fixture.execution,
    });

    expect(result.items).toMatchObject([
      {
        artifactId: 'artifact.rollback.2',
        status: 'failed',
        failure: { message: 'delete blocked' },
      },
      { artifactId: 'artifact.rollback.1', status: 'rolled_back' },
    ]);
    expect(result.summary).toEqual({
      candidates: 2,
      dryRun: 0,
      rolledBack: 1,
      alreadyAbsent: 0,
      failed: 1,
    });
    expect(manager.delete.mock.calls.map(([request]) => request.artifactId)).toEqual([
      'artifact.rollback.2',
      'artifact.rollback.1',
    ]);
  });

  it('rejects an inconsistent report before reading or deleting any Artifact', async () => {
    const fixture = rollbackFixture(1);
    fixture.execution.summary.imported = 2;
    const manager = { get: vi.fn(), delete: vi.fn() };

    await expect(
      new LegacyToolArtifactMigrationRollbackExecutor({ manager }).rollback(fixture)
    ).rejects.toBeInstanceOf(LegacyToolArtifactMigrationRollbackError);
    expect(manager.get).not.toHaveBeenCalled();
    expect(manager.delete).not.toHaveBeenCalled();
  });
});

function rollbackFixture(count: number): {
  plan: LegacyToolArtifactMigrationPlan;
  execution: LegacyToolArtifactMigrationExecutionResult;
} {
  const imports = Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const relativePath = `tool-results/tool.rollback/invocation-${number}.txt`;
    const legacyArtifactId = `artifact:${String(number).repeat(64)}`;
    const contentHash = `sha256:${String(number).repeat(64)}`;
    const source = {
      relativePath,
      legacyArtifactId,
      contentHash,
      sizeBytes: number,
      mimeType: 'text/plain' as const,
      legacyToolPathSegment: 'tool.rollback',
      legacyInvocationPathSegment: `invocation-${number}`,
    };
    return {
      source,
      request: {
        relativePath,
        expectedLegacyArtifactId: legacyArtifactId,
        expectedContentHash: contentHash,
        expectedSizeBytes: number,
        context: {
          principal,
          profileRef: { id: 'artifact-profile.rollback', version: '1.0.0' },
          userId: 'user.rollback',
          workspaceId: 'workspace.rollback',
        },
        toolId: 'tool.rollback',
        invocationId: `invocation-${number}`,
        mimeType: 'text/plain',
      },
    };
  });
  return {
    plan: {
      imports,
      skipped: [],
      totalEntries: count,
      totalBytes: imports.reduce((total, item) => total + item.source.sizeBytes, 0),
    },
    execution: {
      mode: 'execute',
      items: imports.map((item, index) => ({
        relativePath: item.source.relativePath,
        legacyArtifactId: item.source.legacyArtifactId,
        target: {
          principalId: principal.principalId,
          workspaceId: item.request.context.workspaceId,
          toolId: item.request.toolId,
          invocationId: item.request.invocationId,
        },
        status: 'imported',
        artifactId: `artifact.rollback.${index + 1}`,
        versionId: `version.rollback.${index + 1}`,
        revision: 0,
        contentHash: item.source.contentHash,
        sizeBytes: item.source.sizeBytes,
      })),
      skipped: [],
      summary: {
        planned: count,
        dryRun: 0,
        imported: count,
        failed: 0,
        skipped: 0,
      },
    },
  };
}

function importedRecord(
  artifactId: string,
  versionId: string,
  revision: number,
  legacyArtifactId: string
): ArtifactRecord {
  const index = Number(artifactId.split('.').at(-1));
  const relativePath = `tool-results/tool.rollback/invocation-${index}.txt`;
  return {
    id: artifactId,
    versionId,
    versionNumber: 1,
    revision,
    userId: 'user.rollback',
    workspaceId: 'workspace.rollback',
    name: `invocation-${index}.txt`,
    kind: 'tool_output',
    mimeType: 'text/plain',
    sizeBytes: index,
    contentHash: `sha256:${String(index).repeat(64)}`,
    hashAlgorithm: 'sha256',
    storageRef: {
      storeId: 'artifact-store.rollback',
      objectKey: artifactId,
      contentHash: `sha256:${String(index).repeat(64)}`,
      sizeBytes: index,
    },
    logicalArtifactId: artifactId,
    provenance: {
      sourceType: 'imported',
      createdBy: principal.principalId,
      toolInvocationId: `invocation-${index}`,
      transformation: 'legacy_tool_artifact_import',
      metadata: {
        legacyArtifactId,
        legacyRelativePath: relativePath,
        toolId: 'tool.rollback',
      },
    },
    access: {
      visibility: 'workspace',
      ownerPrincipalId: principal.principalId,
      workspaceId: 'workspace.rollback',
    },
    retention: { legalHold: false },
    status: 'draft',
    tags: ['tool-output', 'legacy-import'],
    createdAt: '2026-07-23T00:00:00.000Z',
    updatedAt: '2026-07-23T00:00:00.000Z',
    metadata: {
      legacyArtifactId,
      legacyRelativePath: relativePath,
      invocationId: `invocation-${index}`,
      toolId: 'tool.rollback',
    },
  };
}
