import type { ArtifactProfileSpec, ArtifactRecord } from './artifact';
import type { ArtifactManager } from './artifact-manager';
import type { ArtifactRecordRepository } from './artifact-record-repository';
import type { ExecutionPrincipal } from './execution';

export type ArtifactRetentionAction = 'retain' | 'archive' | 'delete';

export type ArtifactRetentionDecisionReason =
  | 'not_due'
  | 'already_terminal'
  | 'archive_after'
  | 'delete_after'
  | 'expired'
  | 'legal_hold'
  | 'referenced'
  | 'retain_final'
  | 'retain_failure';

export interface ArtifactRetentionEvaluationRequest {
  record: ArtifactRecord;
  profile: ArtifactProfileSpec;
  evaluatedAt: string;
}

export interface ArtifactRetentionDecision {
  action: ArtifactRetentionAction;
  reason: ArtifactRetentionDecisionReason;
  effectiveAt?: string;
}

export interface ArtifactRetentionEvaluator {
  evaluate(request: ArtifactRetentionEvaluationRequest): ArtifactRetentionDecision;
}

export interface ArtifactRetentionProcessRequest {
  operationId: string;
  principal: ExecutionPrincipal;
  artifactId: string;
  evaluatedAt?: string;
  dryRun?: boolean;
  idempotencyKey?: string;
}

export interface ArtifactRetentionProcessResult {
  artifactId: string;
  versionId: string;
  workspaceId: string;
  decision: ArtifactRetentionDecision;
  /** True when this invocation applied the retention mutation. */
  applied: boolean;
  /** True when the same idempotent mutation was committed by an earlier attempt. */
  replayed: boolean;
  dryRun: boolean;
}

export interface ArtifactRetentionProcessor {
  process(request: ArtifactRetentionProcessRequest): Promise<ArtifactRetentionProcessResult>;
}

export interface DefaultArtifactRetentionProcessorOptions {
  manager: ArtifactManager;
  repository: ArtifactRecordRepository;
  evaluator?: ArtifactRetentionEvaluator;
  now?: () => string;
}
