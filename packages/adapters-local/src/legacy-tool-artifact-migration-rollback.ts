import type { ArtifactManager, ArtifactRecord } from '@hypha/core';
import type {
  LegacyToolArtifactMigrationExecutionItem,
  LegacyToolArtifactMigrationExecutionResult,
  LegacyToolArtifactMigrationFailure,
  LegacyToolArtifactMigrationTargetSummary,
} from './legacy-tool-artifact-migration-executor';
import type {
  LegacyToolArtifactMigrationImportPlanItem,
  LegacyToolArtifactMigrationPlan,
} from './legacy-tool-artifact-migration-planner';
import {
  isLegacyToolArtifactMigrationExecutionReportId,
  isLegacyToolArtifactMigrationPlanHash,
  legacyToolArtifactMigrationExecutionReportId,
  legacyToolArtifactMigrationPlanHash,
  legacyToolArtifactMigrationRollbackReportId,
} from './legacy-tool-artifact-migration-report';

export type LegacyToolArtifactMigrationRollbackErrorCode =
  | 'LEGACY_MIGRATION_ROLLBACK_INVALID_REPORT'
  | 'LEGACY_MIGRATION_ROLLBACK_TARGET_MISMATCH';

export class LegacyToolArtifactMigrationRollbackError extends Error {
  constructor(
    readonly code: LegacyToolArtifactMigrationRollbackErrorCode,
    message: string,
    readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'LegacyToolArtifactMigrationRollbackError';
  }
}

export interface LegacyToolArtifactMigrationRollbackExecutorOptions {
  manager: Pick<ArtifactManager, 'get' | 'delete'>;
}

export interface LegacyToolArtifactMigrationRollbackRequest {
  plan: LegacyToolArtifactMigrationPlan;
  execution: LegacyToolArtifactMigrationExecutionResult;
  dryRun?: boolean;
}

export interface LegacyToolArtifactMigrationRollbackItem {
  relativePath: string;
  legacyArtifactId: string;
  artifactId: string;
  versionId: string;
  revision: number;
  target: LegacyToolArtifactMigrationTargetSummary;
  status: 'dry_run' | 'rolled_back' | 'already_absent' | 'failed';
  failure?: LegacyToolArtifactMigrationFailure;
}

export interface LegacyToolArtifactMigrationRollbackSummary {
  candidates: number;
  dryRun: number;
  rolledBack: number;
  alreadyAbsent: number;
  failed: number;
}

export interface LegacyToolArtifactMigrationRollbackResult {
  planHash: string;
  executionReportId: string;
  reportId: string;
  mode: 'dry_run' | 'rollback';
  items: LegacyToolArtifactMigrationRollbackItem[];
  summary: LegacyToolArtifactMigrationRollbackSummary;
}

interface BoundRollbackCandidate {
  planItem: LegacyToolArtifactMigrationImportPlanItem;
  executionItem: LegacyToolArtifactMigrationExecutionItem & {
    status: 'imported';
    artifactId: string;
    versionId: string;
    revision: number;
    contentHash: string;
    sizeBytes: number;
  };
}

/**
 * Reverses only Artifacts proven to have been created by a specific migration
 * report. Revision fences prevent rollback from deleting a later mutation.
 */
export class LegacyToolArtifactMigrationRollbackExecutor {
  private readonly manager: Pick<ArtifactManager, 'get' | 'delete'>;

  constructor(options: LegacyToolArtifactMigrationRollbackExecutorOptions) {
    this.manager = options.manager;
  }

  async rollback(
    request: LegacyToolArtifactMigrationRollbackRequest
  ): Promise<LegacyToolArtifactMigrationRollbackResult> {
    const candidates = bindRollbackCandidates(request.plan, request.execution).reverse();
    const dryRun = request.dryRun === true;
    const items: LegacyToolArtifactMigrationRollbackItem[] = [];

    for (const candidate of candidates) {
      const base = rollbackItemBase(candidate);
      try {
        const current = await this.manager.get({
          principal: candidate.planItem.request.context.principal,
          artifactId: candidate.executionItem.artifactId,
        });
        if (!current) {
          items.push({ ...base, status: 'already_absent' });
          continue;
        }
        assertRollbackTarget(candidate, current);
        if (dryRun) {
          items.push({ ...base, status: 'dry_run' });
          continue;
        }

        await this.manager.delete({
          operationId: `legacy-tool-artifact-rollback:${candidate.executionItem.legacyArtifactId}`,
          idempotencyKey: `legacy-tool-artifact-rollback:${candidate.executionItem.legacyArtifactId}`,
          principal: candidate.planItem.request.context.principal,
          artifactId: candidate.executionItem.artifactId,
          expectedRevision: candidate.executionItem.revision,
          reason: 'Rollback legacy Tool Artifact migration.',
        });
        const remaining = await this.manager.get({
          principal: candidate.planItem.request.context.principal,
          artifactId: candidate.executionItem.artifactId,
        });
        if (remaining) {
          throw targetMismatch(
            candidate,
            'Artifact remained visible after the rollback delete completed.'
          );
        }
        items.push({ ...base, status: 'rolled_back' });
      } catch (error) {
        items.push({ ...base, status: 'failed', failure: boundedFailure(error) });
      }
    }

    const report: Omit<LegacyToolArtifactMigrationRollbackResult, 'reportId'> = {
      planHash: request.plan.planHash,
      executionReportId: request.execution.reportId,
      mode: dryRun ? 'dry_run' : 'rollback',
      items,
      summary: {
        candidates: candidates.length,
        dryRun: countStatus(items, 'dry_run'),
        rolledBack: countStatus(items, 'rolled_back'),
        alreadyAbsent: countStatus(items, 'already_absent'),
        failed: countStatus(items, 'failed'),
      },
    };
    return {
      reportId: legacyToolArtifactMigrationRollbackReportId(report),
      ...report,
    };
  }
}

function bindRollbackCandidates(
  plan: LegacyToolArtifactMigrationPlan,
  execution: LegacyToolArtifactMigrationExecutionResult
): BoundRollbackCandidate[] {
  assertReportIntegrity(plan, execution);
  if (
    execution.mode !== 'execute' ||
    !Array.isArray(plan.imports) ||
    !Array.isArray(plan.skipped) ||
    !Array.isArray(execution.items) ||
    !Array.isArray(execution.skipped) ||
    execution.items.length !== plan.imports.length ||
    execution.skipped.length !== plan.skipped.length
  ) {
    throw invalidReport('Legacy Artifact rollback requires a complete execute-mode report.');
  }
  for (let index = 0; index < plan.skipped.length; index += 1) {
    const planned = plan.skipped[index];
    const reported = execution.skipped[index];
    if (
      planned.reason !== reported.reason ||
      planned.source.relativePath !== reported.source.relativePath ||
      planned.source.legacyArtifactId !== reported.source.legacyArtifactId
    ) {
      throw invalidReport(
        'Legacy Artifact rollback skipped-item evidence does not match the plan.'
      );
    }
  }

  const candidates: BoundRollbackCandidate[] = [];
  const artifactIds = new Set<string>();
  for (let index = 0; index < plan.imports.length; index += 1) {
    const planItem = plan.imports[index];
    const executionItem = execution.items[index];
    assertPlanAndExecutionBinding(planItem, executionItem);
    if (executionItem.status === 'failed') {
      if (
        executionItem.artifactId !== undefined ||
        executionItem.versionId !== undefined ||
        executionItem.revision !== undefined
      ) {
        throw invalidReport('A failed migration item must not contain rollback target evidence.');
      }
      continue;
    }
    if (
      executionItem.status !== 'imported' ||
      !executionItem.artifactId ||
      !executionItem.versionId ||
      !Number.isSafeInteger(executionItem.revision) ||
      (executionItem.revision ?? -1) < 0 ||
      executionItem.contentHash !== planItem.source.contentHash ||
      executionItem.sizeBytes !== planItem.source.sizeBytes
    ) {
      throw invalidReport('An imported migration item has incomplete rollback evidence.');
    }
    if (artifactIds.has(executionItem.artifactId)) {
      throw invalidReport('A migration report contains duplicate rollback targets.');
    }
    artifactIds.add(executionItem.artifactId);
    candidates.push({
      planItem,
      executionItem: executionItem as BoundRollbackCandidate['executionItem'],
    });
  }

  const imported = candidates.length;
  const failed = execution.items.filter((item) => item.status === 'failed').length;
  if (
    execution.summary.planned !== execution.items.length ||
    execution.summary.dryRun !== 0 ||
    execution.summary.imported !== imported ||
    execution.summary.failed !== failed ||
    execution.summary.skipped !== plan.skipped.length
  ) {
    throw invalidReport('Legacy Artifact rollback summary does not match the execution evidence.');
  }
  return candidates;
}

function assertReportIntegrity(
  plan: LegacyToolArtifactMigrationPlan,
  execution: LegacyToolArtifactMigrationExecutionResult
): void {
  try {
    if (
      !isLegacyToolArtifactMigrationPlanHash(plan.planHash) ||
      legacyToolArtifactMigrationPlanHash(plan) !== plan.planHash
    ) {
      throw invalidReport('Legacy Artifact rollback plan hash does not match its evidence.');
    }
    if (execution.planHash !== plan.planHash) {
      throw invalidReport('Legacy Artifact execution report is bound to a different plan.');
    }
    if (
      !isLegacyToolArtifactMigrationExecutionReportId(execution.reportId) ||
      legacyToolArtifactMigrationExecutionReportId(execution) !== execution.reportId
    ) {
      throw invalidReport('Legacy Artifact execution report ID does not match its evidence.');
    }
  } catch (error) {
    if (error instanceof LegacyToolArtifactMigrationRollbackError) throw error;
    throw invalidReport(
      `Legacy Artifact rollback evidence is not canonical: ${
        error instanceof Error ? error.message : 'unknown error'
      }`
    );
  }
}

function assertPlanAndExecutionBinding(
  planItem: LegacyToolArtifactMigrationImportPlanItem,
  executionItem: LegacyToolArtifactMigrationExecutionItem
): void {
  const { source, request } = planItem;
  if (
    request.relativePath !== source.relativePath ||
    request.expectedLegacyArtifactId !== source.legacyArtifactId ||
    request.expectedContentHash !== source.contentHash ||
    request.expectedSizeBytes !== source.sizeBytes ||
    executionItem.relativePath !== source.relativePath ||
    executionItem.legacyArtifactId !== source.legacyArtifactId ||
    executionItem.target.principalId !== request.context.principal.principalId ||
    executionItem.target.workspaceId !== request.context.workspaceId ||
    executionItem.target.toolId !== request.toolId ||
    executionItem.target.invocationId !== request.invocationId
  ) {
    throw invalidReport('Legacy Artifact rollback report is not bound to its migration plan.');
  }
}

function assertRollbackTarget(candidate: BoundRollbackCandidate, record: ArtifactRecord): void {
  const { planItem, executionItem } = candidate;
  const request = planItem.request;
  const provenanceMetadata = record.provenance.metadata ?? {};
  const metadata = record.metadata ?? {};
  if (
    record.id !== executionItem.artifactId ||
    record.versionId !== executionItem.versionId ||
    record.revision !== executionItem.revision ||
    record.contentHash !== executionItem.contentHash ||
    record.sizeBytes !== executionItem.sizeBytes ||
    record.userId !== request.context.userId ||
    record.tenantId !== request.context.tenantId ||
    record.workspaceId !== request.context.workspaceId ||
    record.kind !== 'tool_output' ||
    record.provenance.sourceType !== 'imported' ||
    record.provenance.createdBy !== request.context.principal.principalId ||
    record.provenance.toolInvocationId !== request.invocationId ||
    record.provenance.transformation !== 'legacy_tool_artifact_import' ||
    provenanceMetadata.legacyArtifactId !== executionItem.legacyArtifactId ||
    provenanceMetadata.legacyRelativePath !== executionItem.relativePath ||
    provenanceMetadata.toolId !== request.toolId ||
    metadata.legacyArtifactId !== executionItem.legacyArtifactId ||
    metadata.legacyRelativePath !== executionItem.relativePath ||
    metadata.invocationId !== request.invocationId ||
    metadata.toolId !== request.toolId ||
    !record.tags?.includes('legacy-import')
  ) {
    throw targetMismatch(
      candidate,
      'Artifact no longer matches the identity and revision recorded by the migration.'
    );
  }
}

function rollbackItemBase(candidate: BoundRollbackCandidate) {
  return {
    relativePath: candidate.executionItem.relativePath,
    legacyArtifactId: candidate.executionItem.legacyArtifactId,
    artifactId: candidate.executionItem.artifactId,
    versionId: candidate.executionItem.versionId,
    revision: candidate.executionItem.revision,
    target: { ...candidate.executionItem.target },
  };
}

function countStatus(
  items: LegacyToolArtifactMigrationRollbackItem[],
  status: LegacyToolArtifactMigrationRollbackItem['status']
): number {
  return items.filter((item) => item.status === status).length;
}

function boundedFailure(error: unknown): LegacyToolArtifactMigrationFailure {
  const record =
    typeof error === 'object' && error !== null ? (error as Record<string, unknown>) : {};
  const normalized =
    typeof record.normalizedError === 'object' && record.normalizedError !== null
      ? (record.normalizedError as Record<string, unknown>)
      : {};
  const rawCode =
    typeof record.code === 'string'
      ? record.code
      : typeof normalized.code === 'string'
        ? normalized.code
        : undefined;
  return {
    name: boundedText(error instanceof Error ? error.name : 'Error', 80, 'Error'),
    ...(rawCode && /^[A-Za-z0-9_.-]{1,96}$/u.test(rawCode) ? { code: rawCode } : {}),
    message: boundedText(
      error instanceof Error ? error.message : 'Legacy Artifact rollback failed.',
      512,
      'Legacy Artifact rollback failed.'
    ),
  };
}

function boundedText(value: string, maxLength: number, fallback: string): string {
  const sanitized = Array.from(value, (character) => {
    const code = character.codePointAt(0) ?? 0;
    return code <= 0x1f || code === 0x7f ? ' ' : character;
  })
    .join('')
    .trim();
  return sanitized ? sanitized.slice(0, maxLength) : fallback;
}

function invalidReport(message: string): LegacyToolArtifactMigrationRollbackError {
  return new LegacyToolArtifactMigrationRollbackError(
    'LEGACY_MIGRATION_ROLLBACK_INVALID_REPORT',
    message
  );
}

function targetMismatch(
  candidate: BoundRollbackCandidate,
  message: string
): LegacyToolArtifactMigrationRollbackError {
  return new LegacyToolArtifactMigrationRollbackError(
    'LEGACY_MIGRATION_ROLLBACK_TARGET_MISMATCH',
    message,
    {
      relativePath: candidate.executionItem.relativePath,
      artifactId: candidate.executionItem.artifactId,
      expectedVersionId: candidate.executionItem.versionId,
      expectedRevision: candidate.executionItem.revision,
    }
  );
}
