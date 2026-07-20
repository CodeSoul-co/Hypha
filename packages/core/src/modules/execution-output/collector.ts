import type {
  CollectedExecutionOutput,
  ExecutionOutputArtifactManager,
  ExecutionOutputCollectionContext,
  ExecutionOutputCollectionPlan,
  ExecutionOutputCollectionResult,
  ExecutionOutputCollector,
} from '../../contracts/execution-output';
import { FrameworkError } from '../../errors';
import { validateExecutionOutputCollectionPlan } from './contracts';

export class DefaultExecutionOutputCollector implements ExecutionOutputCollector {
  constructor(private readonly artifacts: ExecutionOutputArtifactManager) {}

  async collect(
    rawPlan: ExecutionOutputCollectionPlan,
    context: ExecutionOutputCollectionContext
  ): Promise<ExecutionOutputCollectionResult> {
    const plan = validateExecutionOutputCollectionPlan(rawPlan);
    validateCollectionContext(context);

    const existingArtifactRefs = new Set(plan.existingArtifactRefs);
    const collected: CollectedExecutionOutput[] = [];
    const finalizedArtifactRefs: string[] = [];

    for (const [index, item] of plan.items.entries()) {
      if (item.existingArtifactRef) {
        existingArtifactRefs.add(item.existingArtifactRef);
        continue;
      }

      const identity = collectionIdentity(context, plan.executionId, item.relativePath, index);
      let record = await this.artifacts.createFromWorkspace({
        operationId: identity.createOperationId,
        principal: context.principal,
        profileRef: context.profileRef,
        userId: context.userId,
        ...(context.tenantId ? { tenantId: context.tenantId } : {}),
        workspaceId: context.workspaceId,
        ...(context.sessionId ? { sessionId: context.sessionId } : {}),
        ...(context.runId ? { runId: context.runId } : {}),
        ...(context.agentId ? { agentId: context.agentId } : {}),
        relativePath: item.relativePath,
        kind: item.kind,
        ...(item.mimeType ? { mimeType: item.mimeType } : {}),
        expectedContentHash: item.contentHash,
        expectedSizeBytes: item.sizeBytes,
        provenance: {
          sourceType: 'command_generated',
          createdBy: context.principal.principalId,
          executionId: plan.executionId,
        },
        idempotencyKey: identity.createIdempotencyKey,
      });

      assertCollectedRecordMatchesPlan(record, item.relativePath, item.contentHash, item.sizeBytes);

      if (plan.finalize) {
        if (record.status === 'draft') {
          record = await this.artifacts.finalize({
            operationId: identity.finalizeOperationId,
            principal: context.principal,
            artifactId: record.id,
            expectedRevision: record.revision,
            reason: `Execution ${plan.executionId} completed successfully`,
            idempotencyKey: identity.finalizeIdempotencyKey,
          });
        }
        if (record.status !== 'final') {
          throw new FrameworkError({
            code: 'EXECUTION_INTERNAL_ERROR',
            message: 'Successful Execution output collection did not produce a final Artifact',
            context: {
              relativePath: item.relativePath,
              artifactRef: record.id,
              status: record.status,
            },
          });
        }
        finalizedArtifactRefs.push(record.id);
        assertCollectedRecordMatchesPlan(
          record,
          item.relativePath,
          item.contentHash,
          item.sizeBytes
        );
      }

      collected.push({
        relativePath: item.relativePath,
        artifactRef: record.id,
        versionId: record.versionId,
        contentHash: record.contentHash,
        sizeBytes: record.sizeBytes,
        status: record.status,
      });
    }

    const artifactRefs = [
      ...existingArtifactRefs,
      ...collected.map((artifact) => artifact.artifactRef),
    ];
    return {
      executionId: plan.executionId,
      collected,
      existingArtifactRefs: [...existingArtifactRefs],
      artifactRefs: [...new Set(artifactRefs)],
      finalizedArtifactRefs,
    };
  }
}

function validateCollectionContext(context: ExecutionOutputCollectionContext): void {
  const required = [
    context.operationId,
    context.principal.principalId,
    context.profileRef.id,
    context.userId,
    context.workspaceId,
  ];
  if (required.some((value) => value.trim().length === 0)) {
    throw new FrameworkError({
      code: 'EXECUTION_INVALID_REQUEST',
      message: 'Execution output collection identity fields must not be empty',
    });
  }
  if (context.principal.userId && context.principal.userId !== context.userId) {
    throw new FrameworkError({
      code: 'EXECUTION_INVALID_REQUEST',
      message: 'Execution output collection userId must match principal.userId',
    });
  }
  if (context.principal.tenantId !== context.tenantId) {
    throw new FrameworkError({
      code: 'EXECUTION_INVALID_REQUEST',
      message: 'Execution output collection tenantId must match principal.tenantId',
    });
  }
}

function collectionIdentity(
  context: ExecutionOutputCollectionContext,
  executionId: string,
  relativePath: string,
  index: number
): {
  createOperationId: string;
  finalizeOperationId: string;
  createIdempotencyKey: string;
  finalizeIdempotencyKey: string;
} {
  const pathIdentity = encodeURIComponent(relativePath.normalize('NFKC'));
  const prefix = context.idempotencyKeyPrefix ?? `execution-output:${executionId}`;
  return {
    createOperationId: `${context.operationId}:create:${index}`,
    finalizeOperationId: `${context.operationId}:finalize:${index}`,
    createIdempotencyKey: `${prefix}:create:${pathIdentity}`,
    finalizeIdempotencyKey: `${prefix}:finalize:${pathIdentity}`,
  };
}

function assertCollectedRecordMatchesPlan(
  record: Awaited<ReturnType<ExecutionOutputArtifactManager['createFromWorkspace']>>,
  relativePath: string,
  expectedContentHash: string,
  expectedSizeBytes: number
): void {
  if (record.contentHash !== expectedContentHash || record.sizeBytes !== expectedSizeBytes) {
    throw new FrameworkError({
      code: 'EXECUTION_INTERNAL_ERROR',
      message: 'Artifact Manager returned output that does not match the collection plan',
      context: {
        relativePath,
        expectedContentHash,
        actualContentHash: record.contentHash,
        expectedSizeBytes,
        actualSizeBytes: record.sizeBytes,
      },
    });
  }
}
