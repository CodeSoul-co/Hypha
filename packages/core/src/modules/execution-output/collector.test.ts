import { describe, expect, it, vi } from 'vitest';
import type { ArtifactRecord } from '../../contracts/artifact';
import type {
  ExecutionOutputArtifactManager,
  ExecutionOutputCollectionContext,
  ExecutionOutputCollectionPlan,
} from '../../contracts/execution-output';
import { DefaultExecutionOutputCollector } from './collector';
import { emptyExecutionOutputSkipCounts } from './contracts';

const contentHash = `sha256:${'a'.repeat(64)}`;

describe('DefaultExecutionOutputCollector', () => {
  it('collects only new Workspace outputs and finalizes them after success', async () => {
    const draft = artifactRecord({ status: 'draft' });
    const final = artifactRecord({ status: 'final', revision: 1 });
    const artifacts = artifactManager(draft, final);
    const collector = new DefaultExecutionOutputCollector(artifacts);

    const result = await collector.collect(collectionPlan(), collectionContext());

    expect(artifacts.createFromWorkspace).toHaveBeenCalledTimes(1);
    expect(artifacts.createFromWorkspace).toHaveBeenCalledWith(
      expect.objectContaining({
        operationId: 'operation.collect:create:0',
        relativePath: 'outputs/report.json',
        expectedContentHash: contentHash,
        expectedSizeBytes: 7,
        idempotencyKey: 'execution-output:execution.example:create:outputs%2Freport.json',
        provenance: {
          sourceType: 'command_generated',
          createdBy: 'user.example',
          executionId: 'execution.example',
        },
      })
    );
    expect(artifacts.finalize).toHaveBeenCalledWith(
      expect.objectContaining({
        operationId: 'operation.collect:finalize:0',
        artifactId: draft.id,
        expectedRevision: draft.revision,
      })
    );
    expect(result).toEqual({
      executionId: 'execution.example',
      collected: [
        {
          relativePath: 'outputs/report.json',
          artifactRef: final.id,
          versionId: final.versionId,
          contentHash,
          sizeBytes: 7,
          status: 'final',
        },
      ],
      existingArtifactRefs: ['artifact:stdout', 'artifact:existing'],
      artifactRefs: ['artifact:stdout', 'artifact:existing', final.id],
      finalizedArtifactRefs: [final.id],
    });
  });

  it('leaves collected outputs as drafts when the plan is not finalizable', async () => {
    const draft = artifactRecord({ status: 'draft' });
    const artifacts = artifactManager(draft);
    const collector = new DefaultExecutionOutputCollector(artifacts);

    const result = await collector.collect(
      { ...collectionPlan(), status: 'failed', finalize: false },
      collectionContext()
    );

    expect(artifacts.finalize).not.toHaveBeenCalled();
    expect(result.collected[0]).toMatchObject({ artifactRef: draft.id, status: 'draft' });
    expect(result.finalizedArtifactRefs).toEqual([]);
  });

  it('treats an already-final Artifact as an idempotent successful retry', async () => {
    const final = artifactRecord({ status: 'final', revision: 1 });
    const artifacts = artifactManager(final);
    const collector = new DefaultExecutionOutputCollector(artifacts);

    const result = await collector.collect(collectionPlan(), collectionContext());

    expect(artifacts.finalize).not.toHaveBeenCalled();
    expect(result.finalizedArtifactRefs).toEqual([final.id]);
    expect(result.collected[0]).toMatchObject({ status: 'final' });
  });

  it('fails closed when an Artifact record does not match the planned integrity evidence', async () => {
    const artifacts = artifactManager(artifactRecord({ contentHash: `sha256:${'b'.repeat(64)}` }));
    const collector = new DefaultExecutionOutputCollector(artifacts);

    await expect(collector.collect(collectionPlan(), collectionContext())).rejects.toMatchObject({
      code: 'EXECUTION_INTERNAL_ERROR',
    });
    expect(artifacts.finalize).not.toHaveBeenCalled();
  });

  it('rejects mismatched collection identity before calling Artifact Manager', async () => {
    const artifacts = artifactManager(artifactRecord());
    const collector = new DefaultExecutionOutputCollector(artifacts);

    await expect(
      collector.collect(collectionPlan(), { ...collectionContext(), userId: 'user.other' })
    ).rejects.toMatchObject({ code: 'EXECUTION_INVALID_REQUEST' });
    expect(artifacts.createFromWorkspace).not.toHaveBeenCalled();
  });
});

function collectionContext(): ExecutionOutputCollectionContext {
  return {
    operationId: 'operation.collect',
    principal: {
      principalId: 'user.example',
      type: 'user',
      tenantId: 'tenant.example',
      userId: 'user.example',
      permissionScopes: ['artifact:write'],
    },
    profileRef: { id: 'artifact-profile.execution', version: '1.0.0' },
    userId: 'user.example',
    tenantId: 'tenant.example',
    workspaceId: 'workspace.example',
    runId: 'run.example',
  };
}

function collectionPlan(): ExecutionOutputCollectionPlan {
  return {
    executionId: 'execution.example',
    status: 'completed',
    items: [
      {
        relativePath: 'outputs/report.json',
        contentHash,
        sizeBytes: 7,
        kind: 'dataset',
        mimeType: 'application/json',
      },
      {
        relativePath: 'outputs/existing.txt',
        contentHash: `sha256:${'c'.repeat(64)}`,
        sizeBytes: 5,
        kind: 'document',
        existingArtifactRef: 'artifact:existing',
      },
    ],
    existingArtifactRefs: ['artifact:stdout'],
    totalBytes: 12,
    finalize: true,
    skipped: emptyExecutionOutputSkipCounts(),
  };
}

function artifactManager(
  created: ArtifactRecord,
  finalized: ArtifactRecord = created
): ExecutionOutputArtifactManager & {
  createFromWorkspace: ReturnType<typeof vi.fn>;
  finalize: ReturnType<typeof vi.fn>;
} {
  return {
    createFromWorkspace: vi.fn().mockResolvedValue(created),
    finalize: vi.fn().mockResolvedValue(finalized),
  };
}

function artifactRecord(overrides: Partial<ArtifactRecord> = {}): ArtifactRecord {
  return {
    id: 'artifact.output',
    versionId: 'artifact.output:v1',
    versionNumber: 1,
    revision: 0,
    userId: 'user.example',
    workspaceId: 'workspace.example',
    name: 'report.json',
    relativePath: 'outputs/report.json',
    kind: 'dataset',
    mimeType: 'application/json',
    sizeBytes: 7,
    contentHash,
    hashAlgorithm: 'sha256',
    storageRef: { storeId: 'store.test', objectKey: 'blobs/output', encrypted: true },
    logicalArtifactId: 'artifact.output',
    provenance: {
      sourceType: 'command_generated',
      createdBy: 'user.example',
      executionId: 'execution.example',
    },
    access: {
      visibility: 'workspace',
      ownerPrincipalId: 'user.example',
      workspaceId: 'workspace.example',
    },
    retention: {},
    status: 'draft',
    createdAt: '2026-07-20T00:00:00.000Z',
    updatedAt: '2026-07-20T00:00:00.000Z',
    ...overrides,
  };
}
