import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type { ExecutionPrincipal } from '@hypha/core';
import { describe, expect, it, vi } from 'vitest';
import type { ToolArtifactManagerContext } from './artifact-manager-tool-port';
import { ArtifactStoreToolPort, FileArtifactStore } from './index';
import { LegacyToolArtifactInventory } from './legacy-tool-artifact-inventory';
import {
  LegacyToolArtifactMigrationPlanError,
  LegacyToolArtifactMigrationPlanner,
} from './legacy-tool-artifact-migration-planner';

const principal: ExecutionPrincipal = {
  principalId: 'agent.legacy-plan',
  type: 'agent',
  agentId: 'agent.legacy-plan',
  userId: 'user.legacy-plan',
  permissionScopes: ['artifact:read', 'artifact:write'],
};

const context: ToolArtifactManagerContext = {
  principal,
  profileRef: { id: 'artifact-profile.legacy-plan', version: '1.0.0' },
  userId: 'user.legacy-plan',
  workspaceId: 'workspace.legacy-plan',
};

describe('LegacyToolArtifactMigrationPlanner', () => {
  it('requires explicit identities and binds inventory evidence to deterministic import requests', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-plan-'));
    const oldPort = new ArtifactStoreToolPort(new FileArtifactStore({ rootPath: root }));
    await oldPort.store({
      invocationId: 'invocation / two',
      toolId: 'tool report',
      value: { rows: [1, 2, 3] },
    });
    await oldPort.store({
      invocationId: 'invocation / one',
      toolId: 'tool report',
      value: 'legacy text',
      mimeType: 'text/plain',
    });
    const inventory = await new LegacyToolArtifactInventory({ legacyRootPath: root }).scan();
    inventory.entries.reverse();
    const resolve = vi.fn((entry: (typeof inventory.entries)[number]) =>
      entry.mimeType === 'text/plain'
        ? {
            action: 'import' as const,
            context,
            toolId: 'tool report',
            invocationId: 'invocation / one',
            metadata: { migrationBatch: 'batch-1' },
          }
        : { action: 'skip' as const, reason: 'Invocation owner is not confirmed.' }
    );

    const plan = await new LegacyToolArtifactMigrationPlanner().plan({ inventory, resolve });

    expect(plan).toMatchObject({
      totalEntries: 2,
      totalBytes: inventory.totalBytes,
      imports: [
        {
          request: {
            context,
            toolId: 'tool report',
            invocationId: 'invocation / one',
            mimeType: 'text/plain',
            metadata: { migrationBatch: 'batch-1' },
          },
        },
      ],
      skipped: [{ reason: 'Invocation owner is not confirmed.' }],
    });
    const item = plan.imports[0];
    expect(item.request).toMatchObject({
      relativePath: item.source.relativePath,
      expectedLegacyArtifactId: item.source.legacyArtifactId,
      expectedContentHash: item.source.contentHash,
      expectedSizeBytes: item.source.sizeBytes,
    });
    expect(item.source.legacyToolPathSegment).toBe('tool_report');
    expect(item.source.legacyInvocationPathSegment).toBe('invocation_one');
    expect(resolve.mock.calls.map(([entry]) => entry.relativePath)).toEqual([
      'tool-results/tool_report/invocation_one.txt',
      'tool-results/tool_report/invocation_two.json',
    ]);
  });

  it('rejects duplicate or internally inconsistent inventory evidence', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-plan-invalid-'));
    const oldPort = new ArtifactStoreToolPort(new FileArtifactStore({ rootPath: root }));
    await oldPort.store({ invocationId: 'one', toolId: 'tool.plan', value: 'one' });
    const inventory = await new LegacyToolArtifactInventory({ legacyRootPath: root }).scan();
    const resolve = vi.fn(() => ({ action: 'skip' as const, reason: 'not selected' }));

    await expect(
      new LegacyToolArtifactMigrationPlanner().plan({
        inventory: { ...inventory, totalBytes: inventory.totalBytes + 1 },
        resolve,
      })
    ).rejects.toMatchObject({ code: 'LEGACY_MIGRATION_INVALID_INVENTORY' });
    await expect(
      new LegacyToolArtifactMigrationPlanner().plan({
        inventory: {
          entries: [inventory.entries[0], { ...inventory.entries[0] }],
          totalBytes: inventory.totalBytes * 2,
        },
        resolve,
      })
    ).rejects.toMatchObject({ code: 'LEGACY_MIGRATION_DUPLICATE_SOURCE' });
    await expect(
      new LegacyToolArtifactMigrationPlanner().plan({
        inventory: {
          entries: [{ ...inventory.entries[0], legacyToolPathSegment: 'tool.tampered' }],
          totalBytes: inventory.totalBytes,
        },
        resolve,
      })
    ).rejects.toMatchObject({ code: 'LEGACY_MIGRATION_INVALID_INVENTORY' });
    expect(resolve).not.toHaveBeenCalled();
  });

  it('rejects unresolved import identities and empty skip reasons', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-legacy-plan-resolution-'));
    const oldPort = new ArtifactStoreToolPort(new FileArtifactStore({ rootPath: root }));
    await oldPort.store({ invocationId: 'one', toolId: 'tool.plan', value: 'one' });
    const inventory = await new LegacyToolArtifactInventory({ legacyRootPath: root }).scan();
    const planner = new LegacyToolArtifactMigrationPlanner();

    await expect(
      planner.plan({
        inventory,
        resolve: () => ({ action: 'import', context, toolId: '', invocationId: 'one' }),
      })
    ).rejects.toBeInstanceOf(LegacyToolArtifactMigrationPlanError);
    await expect(
      planner.plan({ inventory, resolve: () => ({ action: 'skip', reason: '   ' }) })
    ).rejects.toMatchObject({ code: 'LEGACY_MIGRATION_INVALID_RESOLUTION' });
  });
});
