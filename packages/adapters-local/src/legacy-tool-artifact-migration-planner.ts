import type { ToolArtifactManagerContext } from './artifact-manager-tool-port';
import type {
  LegacyToolArtifactInventoryEntry,
  LegacyToolArtifactInventoryResult,
} from './legacy-tool-artifact-inventory';
import {
  legacyArtifactReference,
  type LegacyToolArtifactImportRequest,
} from './legacy-tool-artifact-importer';
import { legacyToolArtifactMigrationPlanHash } from './legacy-tool-artifact-migration-report';

export type LegacyToolArtifactMigrationPlanErrorCode =
  | 'LEGACY_MIGRATION_INVALID_INVENTORY'
  | 'LEGACY_MIGRATION_DUPLICATE_SOURCE'
  | 'LEGACY_MIGRATION_LIMIT_EXCEEDED'
  | 'LEGACY_MIGRATION_INVALID_RESOLUTION';

export class LegacyToolArtifactMigrationPlanError extends Error {
  constructor(
    readonly code: LegacyToolArtifactMigrationPlanErrorCode,
    message: string,
    readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'LegacyToolArtifactMigrationPlanError';
  }
}

export interface LegacyToolArtifactMigrationImportResolution {
  action: 'import';
  context: ToolArtifactManagerContext;
  toolId: string;
  invocationId: string;
  metadata?: Record<string, unknown>;
}

export interface LegacyToolArtifactMigrationSkipResolution {
  action: 'skip';
  reason: string;
}

export type LegacyToolArtifactMigrationResolution =
  | LegacyToolArtifactMigrationImportResolution
  | LegacyToolArtifactMigrationSkipResolution;

export interface LegacyToolArtifactMigrationPlanRequest {
  inventory: LegacyToolArtifactInventoryResult;
  resolve: (
    entry: Readonly<LegacyToolArtifactInventoryEntry>
  ) => LegacyToolArtifactMigrationResolution | Promise<LegacyToolArtifactMigrationResolution>;
}

export interface LegacyToolArtifactMigrationImportPlanItem {
  source: LegacyToolArtifactInventoryEntry;
  request: LegacyToolArtifactImportRequest;
}

export interface LegacyToolArtifactMigrationSkipPlanItem {
  source: LegacyToolArtifactInventoryEntry;
  reason: string;
}

export interface LegacyToolArtifactMigrationPlan {
  planHash: string;
  imports: LegacyToolArtifactMigrationImportPlanItem[];
  skipped: LegacyToolArtifactMigrationSkipPlanItem[];
  totalEntries: number;
  totalBytes: number;
}

export interface LegacyToolArtifactMigrationPlannerOptions {
  maxEntries?: number;
}

/**
 * Creates a deterministic migration plan without reading, importing, or
 * deleting Artifact bytes. Historical path segments are never identities.
 */
export class LegacyToolArtifactMigrationPlanner {
  private readonly maxEntries: number;

  constructor(options: LegacyToolArtifactMigrationPlannerOptions = {}) {
    this.maxEntries = positiveInteger(options.maxEntries ?? 10_000, 'maxEntries');
  }

  async plan(
    request: LegacyToolArtifactMigrationPlanRequest
  ): Promise<LegacyToolArtifactMigrationPlan> {
    const entries = validateInventory(request.inventory, this.maxEntries);
    const imports: LegacyToolArtifactMigrationImportPlanItem[] = [];
    const skipped: LegacyToolArtifactMigrationSkipPlanItem[] = [];

    for (const source of entries) {
      const resolution = await request.resolve(Object.freeze({ ...source }));
      if (resolution.action === 'skip') {
        const reason = requiredText(resolution.reason, 'skip reason', source.relativePath);
        skipped.push({ source: { ...source }, reason });
        continue;
      }

      const toolId = requiredText(resolution.toolId, 'toolId', source.relativePath);
      const invocationId = requiredText(
        resolution.invocationId,
        'invocationId',
        source.relativePath
      );
      imports.push({
        source: { ...source },
        request: {
          relativePath: source.relativePath,
          expectedLegacyArtifactId: source.legacyArtifactId,
          expectedContentHash: source.contentHash,
          expectedSizeBytes: source.sizeBytes,
          context: resolution.context,
          toolId,
          invocationId,
          mimeType: source.mimeType,
          metadata: resolution.metadata,
        },
      });
    }

    const plan = {
      imports,
      skipped,
      totalEntries: entries.length,
      totalBytes: request.inventory.totalBytes,
    };
    try {
      return { planHash: legacyToolArtifactMigrationPlanHash(plan), ...plan };
    } catch (error) {
      throw new LegacyToolArtifactMigrationPlanError(
        'LEGACY_MIGRATION_INVALID_RESOLUTION',
        'Legacy Artifact migration resolution contains non-canonical evidence.',
        { cause: error instanceof Error ? error.message : 'Unknown canonicalization error.' }
      );
    }
  }
}

function validateInventory(
  inventory: LegacyToolArtifactInventoryResult,
  maxEntries: number
): LegacyToolArtifactInventoryEntry[] {
  if (!Array.isArray(inventory.entries) || inventory.entries.length > maxEntries) {
    throw new LegacyToolArtifactMigrationPlanError(
      'LEGACY_MIGRATION_LIMIT_EXCEEDED',
      'Legacy Artifact inventory exceeds the migration planning limit.',
      { maxEntries }
    );
  }
  if (!Number.isSafeInteger(inventory.totalBytes) || inventory.totalBytes < 0) {
    throw invalidInventory('Legacy Artifact inventory totalBytes is invalid.');
  }

  const relativePaths = new Set<string>();
  const legacyArtifactIds = new Set<string>();
  let actualTotalBytes = 0;
  const entries = [...inventory.entries].sort((left, right) =>
    left.relativePath.localeCompare(right.relativePath, 'en')
  );
  for (const entry of entries) {
    validateEntry(entry);
    if (relativePaths.has(entry.relativePath) || legacyArtifactIds.has(entry.legacyArtifactId)) {
      throw new LegacyToolArtifactMigrationPlanError(
        'LEGACY_MIGRATION_DUPLICATE_SOURCE',
        'Legacy Artifact inventory contains a duplicate source.',
        { relativePath: entry.relativePath, legacyArtifactId: entry.legacyArtifactId }
      );
    }
    relativePaths.add(entry.relativePath);
    legacyArtifactIds.add(entry.legacyArtifactId);
    actualTotalBytes += entry.sizeBytes;
    if (!Number.isSafeInteger(actualTotalBytes)) {
      throw invalidInventory('Legacy Artifact inventory byte total is unsafe.');
    }
  }
  if (actualTotalBytes !== inventory.totalBytes) {
    throw invalidInventory('Legacy Artifact inventory totalBytes does not match its entries.', {
      expectedTotalBytes: inventory.totalBytes,
      actualTotalBytes,
    });
  }
  return entries;
}

function validateEntry(entry: LegacyToolArtifactInventoryEntry): void {
  const pathEvidence = parseInventoryPath(entry.relativePath);
  if (
    pathEvidence.toolPathSegment !== entry.legacyToolPathSegment ||
    pathEvidence.invocationPathSegment !== entry.legacyInvocationPathSegment ||
    pathEvidence.mimeType !== entry.mimeType
  ) {
    throw invalidInventory('Legacy Artifact path evidence is internally inconsistent.', {
      relativePath: entry.relativePath,
    });
  }
  if (!Number.isSafeInteger(entry.sizeBytes) || entry.sizeBytes < 0) {
    throw invalidInventory('Legacy Artifact inventory entry size is invalid.', {
      relativePath: entry.relativePath,
    });
  }
  const expectedLegacyArtifactId = legacyArtifactReference(entry.relativePath, entry.sizeBytes);
  if (entry.legacyArtifactId !== expectedLegacyArtifactId) {
    throw invalidInventory('Legacy Artifact ID does not match its path and size.', {
      relativePath: entry.relativePath,
    });
  }
  if (!/^sha256:[a-f0-9]{64}$/u.test(entry.contentHash)) {
    throw invalidInventory('Legacy Artifact content hash is invalid.', {
      relativePath: entry.relativePath,
    });
  }
  if (entry.mimeType !== 'application/json' && entry.mimeType !== 'text/plain') {
    throw invalidInventory('Legacy Artifact MIME type is invalid.', {
      relativePath: entry.relativePath,
    });
  }
}

function parseInventoryPath(relativePath: string): {
  toolPathSegment: string;
  invocationPathSegment: string;
  mimeType: 'application/json' | 'text/plain';
} {
  const segments = relativePath.split('/');
  const filename = segments[2] ?? '';
  const match = /^(.*)\.(json|txt)$/iu.exec(filename);
  if (
    segments.length !== 3 ||
    segments[0] !== 'tool-results' ||
    !isLegacySafeSegment(segments[1]) ||
    !match ||
    !isLegacySafeSegment(match[1])
  ) {
    throw invalidInventory('Legacy Artifact relative path is invalid.', { relativePath });
  }
  return {
    toolPathSegment: segments[1],
    invocationPathSegment: match[1],
    mimeType: match[2].toLowerCase() === 'txt' ? 'text/plain' : 'application/json',
  };
}

function isLegacySafeSegment(value: string): boolean {
  return Boolean(value && value !== '.' && value !== '..' && /^[A-Za-z0-9._-]+$/u.test(value));
}

function requiredText(value: string, field: string, relativePath: string): string {
  if (!value.trim()) {
    throw new LegacyToolArtifactMigrationPlanError(
      'LEGACY_MIGRATION_INVALID_RESOLUTION',
      `Legacy Artifact migration ${field} is required.`,
      { relativePath }
    );
  }
  return value;
}

function invalidInventory(message: string, details?: Record<string, unknown>) {
  return new LegacyToolArtifactMigrationPlanError(
    'LEGACY_MIGRATION_INVALID_INVENTORY',
    message,
    details
  );
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isInteger(value) || value <= 0) throw new TypeError(`${name} must be positive.`);
  return value;
}
