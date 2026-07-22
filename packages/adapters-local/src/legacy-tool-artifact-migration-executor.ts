import type {
  LegacyToolArtifactImportRequest,
  LegacyToolArtifactImportResult,
  LegacyToolArtifactImporter,
} from './legacy-tool-artifact-importer';
import type {
  LegacyToolArtifactMigrationImportPlanItem,
  LegacyToolArtifactMigrationPlan,
  LegacyToolArtifactMigrationSkipPlanItem,
} from './legacy-tool-artifact-migration-planner';

export type LegacyToolArtifactMigrationExecutionErrorCode =
  | 'LEGACY_MIGRATION_EXECUTION_INVALID_PLAN'
  | 'LEGACY_MIGRATION_EXECUTION_LIMIT_EXCEEDED'
  | 'LEGACY_MIGRATION_RESULT_MISMATCH';

export class LegacyToolArtifactMigrationExecutionError extends Error {
  constructor(
    readonly code: LegacyToolArtifactMigrationExecutionErrorCode,
    message: string,
    readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'LegacyToolArtifactMigrationExecutionError';
  }
}

export interface LegacyToolArtifactMigrationExecutorOptions {
  importer: Pick<LegacyToolArtifactImporter, 'import'>;
  maxImports?: number;
}

export interface LegacyToolArtifactMigrationExecuteRequest {
  plan: LegacyToolArtifactMigrationPlan;
  dryRun?: boolean;
}

export interface LegacyToolArtifactMigrationTargetSummary {
  principalId: string;
  workspaceId: string;
  toolId: string;
  invocationId: string;
}

export interface LegacyToolArtifactMigrationFailure {
  name: string;
  code?: string;
  message: string;
}

export interface LegacyToolArtifactMigrationExecutionItem {
  relativePath: string;
  legacyArtifactId: string;
  target: LegacyToolArtifactMigrationTargetSummary;
  status: 'dry_run' | 'imported' | 'failed';
  artifactId?: string;
  versionId?: string;
  contentHash?: string;
  sizeBytes?: number;
  failure?: LegacyToolArtifactMigrationFailure;
}

export interface LegacyToolArtifactMigrationExecutionSummary {
  planned: number;
  dryRun: number;
  imported: number;
  failed: number;
  skipped: number;
}

export interface LegacyToolArtifactMigrationExecutionResult {
  mode: 'dry_run' | 'execute';
  items: LegacyToolArtifactMigrationExecutionItem[];
  skipped: LegacyToolArtifactMigrationSkipPlanItem[];
  summary: LegacyToolArtifactMigrationExecutionSummary;
}

/**
 * Executes a prevalidated migration plan sequentially. It never deletes or
 * mutates legacy source files, and individual import failures remain isolated.
 */
export class LegacyToolArtifactMigrationExecutor {
  private readonly importer: Pick<LegacyToolArtifactImporter, 'import'>;
  private readonly maxImports: number;

  constructor(options: LegacyToolArtifactMigrationExecutorOptions) {
    this.importer = options.importer;
    this.maxImports = positiveInteger(options.maxImports ?? 1_000, 'maxImports');
  }

  async execute(
    request: LegacyToolArtifactMigrationExecuteRequest
  ): Promise<LegacyToolArtifactMigrationExecutionResult> {
    const plan = validateAndSnapshotPlan(request.plan, this.maxImports);
    const dryRun = request.dryRun === true;
    const items: LegacyToolArtifactMigrationExecutionItem[] = [];

    for (const item of plan.imports) {
      const base = executionItemBase(item);
      if (dryRun) {
        items.push({ ...base, status: 'dry_run' });
        continue;
      }
      try {
        const imported = await this.importer.import(item.request);
        assertImportResult(item, imported);
        items.push({
          ...base,
          status: 'imported',
          artifactId: imported.artifactId,
          versionId: imported.versionId,
          contentHash: imported.contentHash,
          sizeBytes: imported.sizeBytes,
        });
      } catch (error) {
        items.push({ ...base, status: 'failed', failure: boundedFailure(error) });
      }
    }

    return {
      mode: dryRun ? 'dry_run' : 'execute',
      items,
      skipped: plan.skipped,
      summary: {
        planned: plan.imports.length,
        dryRun: items.filter((item) => item.status === 'dry_run').length,
        imported: items.filter((item) => item.status === 'imported').length,
        failed: items.filter((item) => item.status === 'failed').length,
        skipped: plan.skipped.length,
      },
    };
  }
}

function validateAndSnapshotPlan(
  plan: LegacyToolArtifactMigrationPlan,
  maxImports: number
): LegacyToolArtifactMigrationPlan {
  if (!Array.isArray(plan.imports) || !Array.isArray(plan.skipped)) {
    throw invalidPlan('Legacy Artifact migration plan collections are invalid.');
  }
  if (plan.imports.length > maxImports) {
    throw new LegacyToolArtifactMigrationExecutionError(
      'LEGACY_MIGRATION_EXECUTION_LIMIT_EXCEEDED',
      'Legacy Artifact migration plan exceeds the execution limit.',
      { maxImports, actualImports: plan.imports.length }
    );
  }
  if (
    !Number.isSafeInteger(plan.totalEntries) ||
    plan.totalEntries < 0 ||
    plan.totalEntries !== plan.imports.length + plan.skipped.length
  ) {
    throw invalidPlan('Legacy Artifact migration plan entry total is inconsistent.');
  }
  if (!Number.isSafeInteger(plan.totalBytes) || plan.totalBytes < 0) {
    throw invalidPlan('Legacy Artifact migration plan byte total is invalid.');
  }

  const relativePaths = new Set<string>();
  const legacyArtifactIds = new Set<string>();
  let totalBytes = 0;
  const imports = plan.imports.map((item) => {
    validateUniqueSource(item.source, relativePaths, legacyArtifactIds);
    validateRequestBinding(item);
    totalBytes = addSafeBytes(totalBytes, item.source.sizeBytes);
    return snapshotImportItem(item);
  });
  const skipped = plan.skipped.map((item) => {
    validateUniqueSource(item.source, relativePaths, legacyArtifactIds);
    if (!item.reason.trim()) throw invalidPlan('Legacy Artifact skip reason is required.');
    totalBytes = addSafeBytes(totalBytes, item.source.sizeBytes);
    return { source: { ...item.source }, reason: item.reason };
  });
  if (totalBytes !== plan.totalBytes) {
    throw invalidPlan('Legacy Artifact migration plan byte total is inconsistent.', {
      expectedTotalBytes: plan.totalBytes,
      actualTotalBytes: totalBytes,
    });
  }
  return { imports, skipped, totalEntries: plan.totalEntries, totalBytes: plan.totalBytes };
}

function validateRequestBinding(item: LegacyToolArtifactMigrationImportPlanItem): void {
  const { source, request } = item;
  if (
    request.relativePath !== source.relativePath ||
    request.expectedLegacyArtifactId !== source.legacyArtifactId ||
    request.expectedContentHash !== source.contentHash ||
    request.expectedSizeBytes !== source.sizeBytes ||
    request.mimeType !== source.mimeType
  ) {
    throw invalidPlan('Legacy Artifact import request is not bound to its source evidence.', {
      relativePath: source.relativePath,
    });
  }
  if (
    !request.toolId.trim() ||
    !request.invocationId.trim() ||
    !request.context.principal.principalId.trim() ||
    !request.context.workspaceId.trim()
  ) {
    throw invalidPlan('Legacy Artifact import target identity is incomplete.', {
      relativePath: source.relativePath,
    });
  }
}

function validateUniqueSource(
  source: LegacyToolArtifactMigrationImportPlanItem['source'],
  relativePaths: Set<string>,
  legacyArtifactIds: Set<string>
): void {
  if (relativePaths.has(source.relativePath) || legacyArtifactIds.has(source.legacyArtifactId)) {
    throw invalidPlan('Legacy Artifact migration plan contains a duplicate source.', {
      relativePath: source.relativePath,
      legacyArtifactId: source.legacyArtifactId,
    });
  }
  if (!Number.isSafeInteger(source.sizeBytes) || source.sizeBytes < 0) {
    throw invalidPlan('Legacy Artifact migration source size is invalid.', {
      relativePath: source.relativePath,
    });
  }
  relativePaths.add(source.relativePath);
  legacyArtifactIds.add(source.legacyArtifactId);
}

function snapshotImportItem(
  item: LegacyToolArtifactMigrationImportPlanItem
): LegacyToolArtifactMigrationImportPlanItem {
  const request: LegacyToolArtifactImportRequest = {
    ...item.request,
    context: {
      ...item.request.context,
      principal: {
        ...item.request.context.principal,
        permissionScopes: [...item.request.context.principal.permissionScopes],
      },
      profileRef: { ...item.request.context.profileRef },
    },
    metadata: item.request.metadata ? { ...item.request.metadata } : undefined,
  };
  return { source: { ...item.source }, request };
}

function executionItemBase(item: LegacyToolArtifactMigrationImportPlanItem) {
  return {
    relativePath: item.source.relativePath,
    legacyArtifactId: item.source.legacyArtifactId,
    target: {
      principalId: item.request.context.principal.principalId,
      workspaceId: item.request.context.workspaceId,
      toolId: item.request.toolId,
      invocationId: item.request.invocationId,
    },
  };
}

function assertImportResult(
  item: LegacyToolArtifactMigrationImportPlanItem,
  result: LegacyToolArtifactImportResult
): void {
  if (
    result.legacyArtifactId !== item.source.legacyArtifactId ||
    result.contentHash !== item.source.contentHash ||
    result.sizeBytes !== item.source.sizeBytes ||
    !result.artifactId ||
    !result.versionId
  ) {
    throw new LegacyToolArtifactMigrationExecutionError(
      'LEGACY_MIGRATION_RESULT_MISMATCH',
      'Imported Artifact result does not match the migration source evidence.',
      { relativePath: item.source.relativePath }
    );
  }
}

function boundedFailure(error: unknown): LegacyToolArtifactMigrationFailure {
  const record =
    typeof error === 'object' && error !== null ? (error as Record<string, unknown>) : {};
  const rawName = error instanceof Error ? error.name : 'Error';
  const rawMessage = error instanceof Error ? error.message : 'Legacy Artifact migration failed.';
  const rawCode = typeof record.code === 'string' ? record.code : undefined;
  return {
    name: boundedText(rawName, 80, 'Error'),
    ...(rawCode && /^[A-Za-z0-9_.-]{1,96}$/u.test(rawCode) ? { code: rawCode } : {}),
    message: boundedText(rawMessage, 512, 'Legacy Artifact migration failed.'),
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

function addSafeBytes(total: number, sizeBytes: number): number {
  const next = total + sizeBytes;
  if (!Number.isSafeInteger(next)) throw invalidPlan('Legacy Artifact byte total is unsafe.');
  return next;
}

function invalidPlan(message: string, details?: Record<string, unknown>) {
  return new LegacyToolArtifactMigrationExecutionError(
    'LEGACY_MIGRATION_EXECUTION_INVALID_PLAN',
    message,
    details
  );
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isInteger(value) || value <= 0) throw new TypeError(`${name} must be positive.`);
  return value;
}
