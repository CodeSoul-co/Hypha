import { createHash } from 'node:crypto';

const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/u;
const EXECUTION_REPORT_PATTERN = /^legacy-migration-execution:[a-f0-9]{64}$/u;
const ROLLBACK_REPORT_PATTERN = /^legacy-migration-rollback:[a-f0-9]{64}$/u;

export interface LegacyToolArtifactMigrationPlanEvidence {
  imports: unknown[];
  skipped: unknown[];
  totalEntries: number;
  totalBytes: number;
  planHash?: string;
}

export interface LegacyToolArtifactMigrationExecutionEvidence {
  planHash: string;
  mode: 'dry_run' | 'execute';
  items: unknown[];
  skipped: unknown[];
  summary: unknown;
  reportId?: string;
}

export interface LegacyToolArtifactMigrationRollbackEvidence {
  planHash: string;
  executionReportId: string;
  mode: 'dry_run' | 'rollback';
  items: unknown[];
  summary: unknown;
  reportId?: string;
}

export function legacyToolArtifactMigrationPlanHash(
  plan: LegacyToolArtifactMigrationPlanEvidence
): string {
  return evidenceHash('hypha.legacy-tool-artifact-migration.plan.v1', {
    imports: plan.imports,
    skipped: plan.skipped,
    totalEntries: plan.totalEntries,
    totalBytes: plan.totalBytes,
  });
}

export function legacyToolArtifactMigrationExecutionReportId(
  report: LegacyToolArtifactMigrationExecutionEvidence
): string {
  return evidenceId('legacy-migration-execution', 'execute.v1', {
    planHash: report.planHash,
    mode: report.mode,
    items: report.items,
    skipped: report.skipped,
    summary: report.summary,
  });
}

export function legacyToolArtifactMigrationRollbackReportId(
  report: LegacyToolArtifactMigrationRollbackEvidence
): string {
  return evidenceId('legacy-migration-rollback', 'rollback.v1', {
    planHash: report.planHash,
    executionReportId: report.executionReportId,
    mode: report.mode,
    items: report.items,
    summary: report.summary,
  });
}

export function isLegacyToolArtifactMigrationPlanHash(value: unknown): value is string {
  return typeof value === 'string' && SHA256_PATTERN.test(value);
}

export function isLegacyToolArtifactMigrationExecutionReportId(value: unknown): value is string {
  return typeof value === 'string' && EXECUTION_REPORT_PATTERN.test(value);
}

export function isLegacyToolArtifactMigrationRollbackReportId(value: unknown): value is string {
  return typeof value === 'string' && ROLLBACK_REPORT_PATTERN.test(value);
}

function evidenceHash(domain: string, value: unknown): string {
  return `sha256:${digest(domain, value)}`;
}

function evidenceId(prefix: string, domain: string, value: unknown): string {
  return `${prefix}:${digest(`hypha.legacy-tool-artifact-migration.${domain}`, value)}`;
}

function digest(domain: string, value: unknown): string {
  return createHash('sha256')
    .update(domain, 'utf8')
    .update('\0', 'utf8')
    .update(canonicalJson(value), 'utf8')
    .digest('hex');
}

function canonicalJson(value: unknown): string {
  const active = new Set<object>();
  return canonicalValue(value, active);
}

function canonicalValue(value: unknown, active: Set<object>): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new TypeError('Migration evidence numbers must be finite.');
    return JSON.stringify(value);
  }
  if (typeof value !== 'object') {
    throw new TypeError('Migration evidence must contain only JSON-compatible values.');
  }
  if (active.has(value)) throw new TypeError('Migration evidence must not contain cycles.');

  active.add(value);
  try {
    if (Array.isArray(value)) {
      return `[${value
        .map((item) => {
          if (item === undefined) {
            throw new TypeError('Migration evidence arrays must not contain undefined.');
          }
          return canonicalValue(item, active);
        })
        .join(',')}]`;
    }
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new TypeError('Migration evidence objects must be plain objects.');
    }
    const record = value as Record<string, unknown>;
    const entries = Object.keys(record)
      .filter((key) => record[key] !== undefined)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalValue(record[key], active)}`);
    return `{${entries.join(',')}}`;
  } finally {
    active.delete(value);
  }
}
