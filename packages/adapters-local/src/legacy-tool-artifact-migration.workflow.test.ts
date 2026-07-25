import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type { ArtifactProfileSpec, ExecutionPrincipal } from '@hypha/core';
import { DefaultArtifactManager } from '@hypha/core';
import { describe, expect, it } from 'vitest';
import { ArtifactStoreToolPort, FileArtifactStore } from './index';
import { InMemoryArtifactRecordRepository } from './in-memory-artifact-record-repository';
import { InMemoryExecutionArtifactStore } from './in-memory-execution-artifact-store';
import { LegacyToolArtifactImporter } from './legacy-tool-artifact-importer';
import { LegacyToolArtifactInventory } from './legacy-tool-artifact-inventory';
import { LegacyToolArtifactMigrationExecutor } from './legacy-tool-artifact-migration-executor';
import { LegacyToolArtifactMigrationPlanner } from './legacy-tool-artifact-migration-planner';
import { LegacyToolArtifactMigrationRollbackExecutor } from './legacy-tool-artifact-migration-rollback';

const principal: ExecutionPrincipal = {
  principalId: 'agent.legacy-workflow',
  type: 'agent',
  agentId: 'agent.legacy-workflow',
  userId: 'user.legacy-workflow',
  permissionScopes: ['artifact:read', 'artifact:write', 'artifact:delete'],
};

describe('legacy Tool Artifact migration workflow', () => {
  it('migrates an old Provider output through Core ArtifactManager and retries idempotently', async () => {
    const legacyRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-workflow-'));
    const oldPort = new ArtifactStoreToolPort(new FileArtifactStore({ rootPath: legacyRoot }));
    const legacyContent = 'legacy execution output';
    const legacyArtifactId = await oldPort.store({
      toolId: 'tool legacy report',
      invocationId: 'invocation legacy one',
      value: legacyContent,
      mimeType: 'text/plain',
    });
    const fixture = createFixture();
    const inventory = await new LegacyToolArtifactInventory({
      legacyRootPath: legacyRoot,
    }).scan();
    const plan = await new LegacyToolArtifactMigrationPlanner().plan({
      inventory,
      resolve: () => ({
        action: 'import',
        context: fixture.context,
        toolId: 'tool legacy report',
        invocationId: 'invocation legacy one',
        metadata: { migrationBatch: 'e1-workflow-acceptance' },
      }),
    });
    const executor = new LegacyToolArtifactMigrationExecutor({
      importer: new LegacyToolArtifactImporter({
        legacyRootPath: legacyRoot,
        manager: fixture.manager,
      }),
    });

    const first = await executor.execute({ plan });
    const retry = await executor.execute({ plan });

    expect(plan.imports[0].source).toMatchObject({
      legacyArtifactId,
      legacyToolPathSegment: 'tool_legacy_report',
      legacyInvocationPathSegment: 'invocation_legacy_one',
    });
    expect(plan.planHash).toMatch(/^sha256:[a-f0-9]{64}$/u);
    expect(first).toEqual(retry);
    expect(first.planHash).toBe(plan.planHash);
    expect(first.reportId).toMatch(/^legacy-migration-execution:[a-f0-9]{64}$/u);
    expect(first.summary).toEqual({ planned: 1, dryRun: 0, imported: 1, failed: 0, skipped: 0 });
    const migrated = first.items[0];
    expect(migrated).toMatchObject({
      status: 'imported',
      legacyArtifactId,
      revision: 0,
      contentHash: plan.imports[0].source.contentHash,
      sizeBytes: Buffer.byteLength(legacyContent),
    });
    const record = await fixture.manager.get({
      principal,
      artifactId: migrated.artifactId ?? '',
    });
    const read = await fixture.manager.read({
      principal,
      artifactId: migrated.artifactId ?? '',
    });
    expect(record).toMatchObject({
      versionId: migrated.versionId,
      revision: migrated.revision,
      contentHash: migrated.contentHash,
      sizeBytes: migrated.sizeBytes,
      kind: 'tool_output',
      mimeType: 'text/plain',
      provenance: {
        sourceType: 'imported',
        createdBy: principal.principalId,
        toolInvocationId: 'invocation legacy one',
        transformation: 'legacy_tool_artifact_import',
        metadata: {
          legacyArtifactId,
          legacyRelativePath: 'tool-results/tool_legacy_report/invocation_legacy_one.txt',
          toolId: 'tool legacy report',
        },
      },
      metadata: {
        migrationBatch: 'e1-workflow-acceptance',
        legacyArtifactId,
        invocationId: 'invocation legacy one',
        toolId: 'tool legacy report',
      },
    });
    await expect(readText(read.content.stream)).resolves.toBe(legacyContent);
    await expect(fixture.repository.list()).resolves.toHaveLength(1);
    const rollback = new LegacyToolArtifactMigrationRollbackExecutor({
      manager: fixture.manager,
    });
    const tampered = structuredClone(first);
    tampered.items[0].revision = (tampered.items[0].revision ?? 0) + 1;
    await expect(rollback.rollback({ plan, execution: tampered })).rejects.toMatchObject({
      code: 'LEGACY_MIGRATION_ROLLBACK_INVALID_REPORT',
      message: expect.stringContaining('report ID'),
    });
    await expect(
      fixture.manager.get({ principal, artifactId: migrated.artifactId ?? '' })
    ).resolves.toMatchObject({ revision: migrated.revision });
    const dryRun = await rollback.rollback({ plan, execution: first, dryRun: true });
    expect(dryRun).toMatchObject({
      planHash: plan.planHash,
      executionReportId: first.reportId,
      reportId: expect.stringMatching(/^legacy-migration-rollback:[a-f0-9]{64}$/u),
    });
    expect(dryRun.summary).toEqual({
      candidates: 1,
      dryRun: 1,
      rolledBack: 0,
      alreadyAbsent: 0,
      failed: 0,
    });
    await expect(
      fixture.manager.get({ principal, artifactId: migrated.artifactId ?? '' })
    ).resolves.toMatchObject({ revision: migrated.revision });

    const rolledBack = await rollback.rollback({ plan, execution: first });
    expect(rolledBack.reportId).toMatch(/^legacy-migration-rollback:[a-f0-9]{64}$/u);
    expect(rolledBack.reportId).not.toBe(dryRun.reportId);
    expect(rolledBack.items).toMatchObject([{ status: 'rolled_back' }]);
    expect(rolledBack.summary).toEqual({
      candidates: 1,
      dryRun: 0,
      rolledBack: 1,
      alreadyAbsent: 0,
      failed: 0,
    });
    await expect(
      fixture.manager.get({ principal, artifactId: migrated.artifactId ?? '' })
    ).resolves.toBeNull();

    const retriedRollback = await rollback.rollback({ plan, execution: first });
    expect(retriedRollback.reportId).toMatch(/^legacy-migration-rollback:[a-f0-9]{64}$/u);
    expect(retriedRollback.reportId).not.toBe(rolledBack.reportId);
    expect(retriedRollback.items).toMatchObject([{ status: 'already_absent' }]);
    expect(retriedRollback.summary).toEqual({
      candidates: 1,
      dryRun: 0,
      rolledBack: 0,
      alreadyAbsent: 1,
      failed: 0,
    });
    await expect(
      fs.readFile(
        path.join(legacyRoot, 'tool-results', 'tool_legacy_report', 'invocation_legacy_one.txt'),
        'utf8'
      )
    ).resolves.toBe(legacyContent);
  });
});

function createFixture() {
  const store = new InMemoryExecutionArtifactStore({ id: 'artifact-store.legacy-workflow' });
  const repository = new InMemoryArtifactRecordRepository();
  const profile: ArtifactProfileSpec = {
    id: 'artifact-profile.legacy-workflow',
    version: '1.0.0',
    storeRef: { id: store.id },
    contentAddressing: { hashAlgorithm: 'sha256', verifyOnRead: true, deduplicate: true },
    versioning: { strategy: 'append_only', retainPreviousVersions: true },
    access: {
      defaultVisibility: 'workspace',
      requiredReadScopes: ['artifact:read'],
      requiredWriteScopes: ['artifact:write'],
      requiredDeleteScopes: ['artifact:delete'],
    },
    retention: { garbageCollectUnreferenced: true },
    validation: { checksumRequired: true },
    allowedKinds: ['tool_output'],
    allowedMimeTypes: ['application/json', 'text/plain'],
    maxArtifactBytes: 1024,
  };
  let nextId = 0;
  const manager = new DefaultArtifactManager({
    profiles: [profile],
    stores: [store],
    repository,
    idGenerator: () => `legacy-workflow-${++nextId}`,
  });
  return {
    context: {
      principal,
      profileRef: { id: profile.id, version: profile.version },
      userId: 'user.legacy-workflow',
      workspaceId: 'workspace.legacy-workflow',
    },
    manager,
    repository,
  };
}

async function readText(stream: AsyncIterable<Uint8Array>): Promise<string> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) chunks.push(chunk);
  const size = chunks.reduce((total, chunk) => total + chunk.byteLength, 0);
  const content = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    content.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(content);
}
