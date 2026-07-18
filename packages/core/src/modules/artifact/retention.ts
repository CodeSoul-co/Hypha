import { z, type ZodType } from 'zod';
import type {
  ArtifactRetentionDecision,
  ArtifactRetentionDecisionReason,
  ArtifactRetentionEvaluationRequest,
  ArtifactRetentionEvaluator,
  ArtifactRetentionProcessRequest,
  ArtifactRetentionProcessResult,
  ArtifactRetentionProcessor,
  DefaultArtifactRetentionProcessorOptions,
  JsonSchema,
} from '../..';
import { executionPrincipalJsonSchema, executionPrincipalSchema } from '../execution';
import {
  artifactProfileSpecJsonSchema,
  artifactProfileSpecSchema,
  artifactRecordJsonSchema,
  artifactRecordSchema,
} from './index';
import { artifactManagerError, validateArtifactManagerInput } from './manager-error';

const nonEmptyString = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });
const decisionReasonSchema = z.enum([
  'not_due',
  'already_terminal',
  'archive_after',
  'delete_after',
  'expired',
  'legal_hold',
  'referenced',
  'retain_final',
  'retain_failure',
]);

export const artifactRetentionEvaluationRequestSchema = z
  .object({
    record: artifactRecordSchema,
    profile: artifactProfileSpecSchema,
    evaluatedAt: timestampSchema,
  })
  .strict() satisfies ZodType<ArtifactRetentionEvaluationRequest>;

export const artifactRetentionDecisionSchema = z
  .object({
    action: z.enum(['retain', 'archive', 'delete']),
    reason: decisionReasonSchema,
    effectiveAt: timestampSchema.optional(),
  })
  .strict() satisfies ZodType<ArtifactRetentionDecision>;

export const artifactRetentionProcessRequestSchema = z
  .object({
    operationId: nonEmptyString,
    principal: executionPrincipalSchema,
    artifactId: nonEmptyString,
    evaluatedAt: timestampSchema.optional(),
    dryRun: z.boolean().optional(),
    idempotencyKey: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<ArtifactRetentionProcessRequest>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };

export const artifactRetentionEvaluationRequestJsonSchema: JsonSchema = strictObject(
  ['record', 'profile', 'evaluatedAt'],
  {
    record: artifactRecordJsonSchema,
    profile: artifactProfileSpecJsonSchema,
    evaluatedAt: timestampJsonSchema,
  }
);

export const artifactRetentionDecisionJsonSchema: JsonSchema = strictObject(['action', 'reason'], {
  action: { enum: ['retain', 'archive', 'delete'] },
  reason: { enum: decisionReasonSchema.options },
  effectiveAt: timestampJsonSchema,
});

export const artifactRetentionProcessRequestJsonSchema: JsonSchema = strictObject(
  ['operationId', 'principal', 'artifactId'],
  {
    operationId: nonEmptyStringJsonSchema,
    principal: executionPrincipalJsonSchema,
    artifactId: nonEmptyStringJsonSchema,
    evaluatedAt: timestampJsonSchema,
    dryRun: { type: 'boolean' },
    idempotencyKey: nonEmptyStringJsonSchema,
  }
);

export const artifactRetentionContractJsonSchemas: Record<string, JsonSchema> = {
  ArtifactRetentionEvaluationRequest: artifactRetentionEvaluationRequestJsonSchema,
  ArtifactRetentionDecision: artifactRetentionDecisionJsonSchema,
  ArtifactRetentionProcessRequest: artifactRetentionProcessRequestJsonSchema,
};

export class DefaultArtifactRetentionEvaluator implements ArtifactRetentionEvaluator {
  evaluate(input: ArtifactRetentionEvaluationRequest): ArtifactRetentionDecision {
    const { record, profile, evaluatedAt } = validateArtifactRetentionEvaluationRequest(input);
    if (record.status === 'deleted' || record.status === 'deletion_pending') {
      return { action: 'retain', reason: 'already_terminal' };
    }

    const evaluatedAtMs = Date.parse(evaluatedAt);
    const deleteDue = earliestDue([
      (record.retention.expiresAt ?? record.expiresAt)
        ? {
            effectiveAt: (record.retention.expiresAt ?? record.expiresAt)!,
            reason: 'expired',
          }
        : undefined,
      profile.retention.deleteAfterSeconds
        ? {
            effectiveAt: addSeconds(record.createdAt, profile.retention.deleteAfterSeconds),
            reason: 'delete_after',
          }
        : undefined,
    ]);

    if (deleteDue && evaluatedAtMs >= Date.parse(deleteDue.effectiveAt)) {
      const retained = retentionBlock(record, profile);
      return retained ?? { action: 'delete', ...deleteDue };
    }

    const archiveDue = profile.retention.archiveAfterSeconds
      ? addSeconds(record.createdAt, profile.retention.archiveAfterSeconds)
      : undefined;
    if (archiveDue && record.status !== 'archived' && evaluatedAtMs >= Date.parse(archiveDue)) {
      if (record.status === 'final' && profile.retention.retainFinal) {
        return { action: 'retain', reason: 'retain_final', effectiveAt: archiveDue };
      }
      if (record.status === 'failed' && profile.retention.retainOnFailure) {
        return { action: 'retain', reason: 'retain_failure', effectiveAt: archiveDue };
      }
      return { action: 'archive', reason: 'archive_after', effectiveAt: archiveDue };
    }

    return {
      action: 'retain',
      reason: 'not_due',
      ...(earliestTimestamp(archiveDue, deleteDue?.effectiveAt)
        ? { effectiveAt: earliestTimestamp(archiveDue, deleteDue?.effectiveAt) }
        : {}),
    };
  }
}

export class DefaultArtifactRetentionProcessor implements ArtifactRetentionProcessor {
  private readonly evaluator: ArtifactRetentionEvaluator;
  private readonly now: () => string;

  constructor(private readonly options: DefaultArtifactRetentionProcessorOptions) {
    if (!options.manager) throw new TypeError('Artifact Manager is required.');
    if (!options.repository) throw new TypeError('Artifact Record Repository is required.');
    this.evaluator = options.evaluator ?? new DefaultArtifactRetentionEvaluator();
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async process(input: ArtifactRetentionProcessRequest): Promise<ArtifactRetentionProcessResult> {
    const request = validateArtifactManagerInput(() =>
      artifactRetentionProcessRequestSchema.parse(input)
    );
    const stored = await this.options.repository.get(request.artifactId);
    if (!stored) {
      throw artifactManagerError(
        'ARTIFACT_NOT_FOUND',
        `Artifact ${request.artifactId} was not found.`
      );
    }
    const visible = await this.options.manager.get({
      principal: request.principal,
      artifactId: request.artifactId,
    });
    if (!visible && stored.record.status !== 'deleted') {
      throw artifactManagerError(
        'ARTIFACT_NOT_FOUND',
        `Artifact ${request.artifactId} was not found.`
      );
    }
    const profile = await this.options.manager.profile(stored.profileRef);
    if (!profile) {
      throw artifactManagerError(
        'ARTIFACT_VALIDATION_FAILED',
        `Artifact profile ${stored.profileRef.id} is unavailable.`
      );
    }
    const evaluatedAt = request.evaluatedAt ?? this.timestamp();
    const decision = this.evaluator.evaluate({ record: stored.record, profile, evaluatedAt });
    const dryRun = request.dryRun ?? false;
    let applied = false;
    if (!dryRun && decision.action === 'archive') {
      await this.options.manager.archive({
        operationId: `${request.operationId}:archive`,
        principal: request.principal,
        artifactId: stored.record.id,
        expectedRevision: stored.record.revision,
        reason: decision.reason,
        idempotencyKey: request.idempotencyKey,
      });
      applied = true;
    } else if (!dryRun && decision.action === 'delete') {
      await this.options.manager.delete({
        operationId: `${request.operationId}:delete`,
        principal: request.principal,
        artifactId: stored.record.id,
        expectedRevision: stored.record.revision,
        reason: decision.reason,
        idempotencyKey: request.idempotencyKey,
      });
      applied = true;
    }
    return {
      artifactId: stored.record.id,
      versionId: stored.record.versionId,
      workspaceId: stored.record.workspaceId,
      decision,
      applied,
      dryRun,
    };
  }

  private timestamp(): string {
    const value = this.now();
    if (!Number.isFinite(Date.parse(value))) {
      throw artifactManagerError('ARTIFACT_INTERNAL_ERROR', 'Artifact retention clock is invalid.');
    }
    return value;
  }
}

export function validateArtifactRetentionEvaluationRequest(
  input: unknown
): ArtifactRetentionEvaluationRequest {
  return artifactRetentionEvaluationRequestSchema.parse(input);
}

export function validateArtifactRetentionProcessRequest(
  input: unknown
): ArtifactRetentionProcessRequest {
  return artifactRetentionProcessRequestSchema.parse(input);
}

function retentionBlock(
  record: ArtifactRetentionEvaluationRequest['record'],
  profile: ArtifactRetentionEvaluationRequest['profile']
): ArtifactRetentionDecision | undefined {
  const effectiveAt = record.retention.expiresAt ?? record.expiresAt;
  if (record.retention.legalHold) return { action: 'retain', reason: 'legal_hold', effectiveAt };
  if ((record.retention.referencedByCount ?? 0) > 0) {
    return { action: 'retain', reason: 'referenced', effectiveAt };
  }
  if (record.status === 'final' && profile.retention.retainFinal) {
    return { action: 'retain', reason: 'retain_final', effectiveAt };
  }
  if (record.status === 'failed' && profile.retention.retainOnFailure) {
    return { action: 'retain', reason: 'retain_failure', effectiveAt };
  }
  return undefined;
}

function earliestDue(
  values: Array<
    | {
        effectiveAt: string;
        reason: Extract<ArtifactRetentionDecisionReason, 'expired' | 'delete_after'>;
      }
    | undefined
  >
): { effectiveAt: string; reason: 'expired' | 'delete_after' } | undefined {
  return values
    .filter((value): value is NonNullable<typeof value> => Boolean(value))
    .sort((left, right) => Date.parse(left.effectiveAt) - Date.parse(right.effectiveAt))[0];
}

function addSeconds(timestamp: string, seconds: number): string {
  return new Date(Date.parse(timestamp) + seconds * 1000).toISOString();
}

function earliestTimestamp(...timestamps: Array<string | undefined>): string | undefined {
  return timestamps
    .filter((timestamp): timestamp is string => Boolean(timestamp))
    .sort((left, right) => Date.parse(left) - Date.parse(right))[0];
}

function strictObject(required: string[], properties: Record<string, JsonSchema>): JsonSchema {
  return { type: 'object', required, properties, additionalProperties: false };
}
