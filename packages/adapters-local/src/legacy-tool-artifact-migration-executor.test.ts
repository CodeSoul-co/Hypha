import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type { ExecutionPrincipal } from '@hypha/core';
import { describe, expect, it, vi } from 'vitest';
import type { ToolArtifactManagerContext } from './artifact-manager-tool-port';
import { ArtifactStoreToolPort, FileArtifactStore } from './index';
import type {
  LegacyToolArtifactImportRequest,
  LegacyToolArtifactImportResult,
} from './legacy-tool-artifact-importer';
import { LegacyToolArtifactInventory } from './legacy-tool-artifact-inventory';
import {
  LegacyToolArtifactMigrationExecutionError,
  LegacyToolArtifactMigrationExecutor,
} from './legacy-tool-artifact-migration-executor';
import {
  type LegacyToolArtifactMigrationPlan,
  LegacyToolArtifactMigrationPlanner,
} from './legacy-tool-artifact-migration-planner';

const principal: ExecutionPrincipal = {
  principalId: 'agent.legacy-execute',
  type: 'agent',
  agentId: 'agent.legacy-execute',
  userId: 'user.legacy-execute',
  permissionScopes: ['artifact:read', 'artifact:write'],
};

const context: ToolArtifactManagerContext = {
  principal,
  profileRef: { id: 'artifact-profile.legacy-execute', version: '1.0.0' },
  userId: 'user.legacy-execute',
  workspaceId: 'workspace.legacy-execute',
};

describe('LegacyToolArtifactMigrationExecutor', () => {
  it('reports a dry run without calling the importer or deleting legacy files', async () => {
    const fixture = await createPlan(true);
    const importer = { import: vi.fn() };
    const executor = new LegacyToolArtifactMigrationExecutor({ importer });

    const result = await executor.execute({ plan: fixture.plan, dryRun: true });

    expect(importer.import).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      mode: 'dry_run',
      items: [{ status: 'dry_run' }],
      skipped: [{ reason: 'Owner identity is not confirmed.' }],
      summary: { planned: 1, dryRun: 1, imported: 0, failed: 0, skipped: 1 },
    });
    await expect(fs.readFile(fixture.firstFilename, 'utf8')).resolves.toBe('first');
  });

  it('isolates failures, continues in order, and produces stable retry requests', async () => {
    const fixture = await createPlan(false);
    const importer = {
      import: vi.fn(async (request: LegacyToolArtifactImportRequest) => {
        if (request.invocationId === 'invocation-one') {
          throw Object.assign(new Error('source changed\nprivate stack omitted'), {
            code: 'LEGACY_ARTIFACT_CONTENT_MISMATCH',
          });
        }
        return successfulResult(request);
      }),
    };
    const executor = new LegacyToolArtifactMigrationExecutor({ importer });

    const first = await executor.execute({ plan: fixture.plan });
    const retry = await executor.execute({ plan: fixture.plan });

    expect(first).toEqual(retry);
    expect(first.summary).toEqual({ planned: 2, dryRun: 0, imported: 1, failed: 1, skipped: 0 });
    expect(first.items).toMatchObject([
      {
        status: 'failed',
        failure: {
          code: 'LEGACY_ARTIFACT_CONTENT_MISMATCH',
          message: 'source changed private stack omitted',
        },
      },
      {
        status: 'imported',
        artifactId: expect.any(String),
        versionId: expect.any(String),
        revision: 0,
      },
    ]);
    expect(importer.import).toHaveBeenCalledTimes(4);
    expect(importer.import.mock.calls[0][0]).toEqual(importer.import.mock.calls[2][0]);
    expect(importer.import.mock.calls[1][0]).toEqual(importer.import.mock.calls[3][0]);
  });

  it('marks an importer result mismatch as a bounded item failure', async () => {
    const fixture = await createPlan(true);
    const importer = {
      import: vi.fn(async (request: LegacyToolArtifactImportRequest) => ({
        ...successfulResult(request),
        contentHash: `sha256:${'0'.repeat(64)}`,
      })),
    };

    const result = await new LegacyToolArtifactMigrationExecutor({ importer }).execute({
      plan: fixture.plan,
    });

    expect(result.summary).toMatchObject({ imported: 0, failed: 1 });
    expect(result.items[0]).toMatchObject({
      status: 'failed',
      failure: { code: 'LEGACY_MIGRATION_RESULT_MISMATCH' },
    });
  });

  it('rejects an invalid revision in the importer evidence', async () => {
    const fixture = await createPlan(true);
    const importer = {
      import: vi.fn(async (request: LegacyToolArtifactImportRequest) => ({
        ...successfulResult(request),
        revision: -1,
      })),
    };

    const result = await new LegacyToolArtifactMigrationExecutor({ importer }).execute({
      plan: fixture.plan,
    });

    expect(result.summary).toMatchObject({ imported: 0, failed: 1 });
    expect(result.items[0]).toMatchObject({
      status: 'failed',
      failure: { code: 'LEGACY_MIGRATION_RESULT_MISMATCH' },
    });
  });

  it('rejects a tampered or oversized plan before the first import', async () => {
    const fixture = await createPlan(false);
    const importer = { import: vi.fn() };
    const tampered = structuredClone(fixture.plan);
    tampered.imports[0].request.expectedContentHash = `sha256:${'0'.repeat(64)}`;

    await expect(
      new LegacyToolArtifactMigrationExecutor({ importer }).execute({ plan: tampered })
    ).rejects.toBeInstanceOf(LegacyToolArtifactMigrationExecutionError);
    await expect(
      new LegacyToolArtifactMigrationExecutor({ importer, maxImports: 1 }).execute({
        plan: fixture.plan,
      })
    ).rejects.toMatchObject({ code: 'LEGACY_MIGRATION_EXECUTION_LIMIT_EXCEEDED' });
    expect(importer.import).not.toHaveBeenCalled();
  });
});

async function createPlan(skipSecond: boolean): Promise<{
  plan: LegacyToolArtifactMigrationPlan;
  firstFilename: string;
}> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-execute-'));
  const oldPort = new ArtifactStoreToolPort(new FileArtifactStore({ rootPath: root }));
  await oldPort.store({
    invocationId: 'one',
    toolId: 'tool.execute',
    value: 'first',
    mimeType: 'text/plain',
  });
  await oldPort.store({
    invocationId: 'two',
    toolId: 'tool.execute',
    value: 'second',
    mimeType: 'text/plain',
  });
  const inventory = await new LegacyToolArtifactInventory({ legacyRootPath: root }).scan();
  const plan = await new LegacyToolArtifactMigrationPlanner().plan({
    inventory,
    resolve: (entry) => {
      if (skipSecond && entry.legacyInvocationPathSegment === 'two') {
        return { action: 'skip', reason: 'Owner identity is not confirmed.' };
      }
      return {
        action: 'import',
        context,
        toolId: 'tool.execute',
        invocationId:
          entry.legacyInvocationPathSegment === 'one' ? 'invocation-one' : 'invocation-two',
      };
    },
  });
  return {
    plan,
    firstFilename: path.join(root, 'tool-results', 'tool.execute', 'one.txt'),
  };
}

function successfulResult(
  request: LegacyToolArtifactImportRequest
): LegacyToolArtifactImportResult {
  return {
    legacyArtifactId: request.expectedLegacyArtifactId ?? '',
    artifactId: `artifact.imported:${request.invocationId}`,
    versionId: `version.imported:${request.invocationId}`,
    revision: 0,
    contentHash: request.expectedContentHash ?? '',
    sizeBytes: request.expectedSizeBytes ?? 0,
  };
}
