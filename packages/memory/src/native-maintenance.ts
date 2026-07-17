import type { ManagedMemoryWriteResult } from './operations';
import type {
  MemoryMaintenanceApplyRequest,
  MemoryMaintenanceDecision,
  MemoryMaintenancePlanRequest,
  MemoryMaintenancePlanner,
} from './lifecycle-contracts';
import { hashMemoryContent, sha256 } from './memory-utils';

export type MemoryMaintenanceApplier = (
  request: MemoryMaintenanceApplyRequest
) => Promise<ManagedMemoryWriteResult>;

export class DeterministicMemoryMaintenancePlanner implements MemoryMaintenancePlanner {
  private readonly decisions = new Map<string, MemoryMaintenanceDecision>();

  constructor(
    private readonly applyDecision?: MemoryMaintenanceApplier,
    private readonly now: () => string = () => new Date().toISOString()
  ) {}

  async plan(request: MemoryMaintenancePlanRequest): Promise<MemoryMaintenanceDecision> {
    const candidateKey = request.candidate.canonicalKey ?? request.candidate.canonicalText;
    const exact = request.existingRecords.find(
      (record) =>
        record.canonicalText === request.candidate.canonicalText ||
        record.contentHash === hashMemoryContent(request.candidate.content)
    );
    const sameKeyConflict = request.existingRecords.find(
      (record) =>
        record.metadata?.canonicalKey === candidateKey &&
        record.canonicalText !== request.candidate.canonicalText
    );

    let action: MemoryMaintenanceDecision['action'] = 'create';
    let reasonCode: MemoryMaintenanceDecision['reasonCode'] = 'NEW_FACT';
    let targets: string[] = [];
    let explanation = 'No matching memory exists.';

    if (exact) {
      action =
        request.policy.duplicateResolution === 'create_version'
          ? 'update'
          : request.policy.duplicateResolution === 'require_review'
            ? 'require_review'
            : 'reuse';
      reasonCode = 'EXACT_DUPLICATE';
      targets = [exact.id];
      explanation = 'An exact canonical memory already exists.';
    } else if (sameKeyConflict) {
      targets = [sameKeyConflict.id];
      reasonCode =
        request.policy.conflictResolution === 'require_review'
          ? 'CONFLICT_REQUIRES_REVIEW'
          : 'FACT_CORRECTION';
      action =
        request.policy.conflictResolution === 'require_review'
          ? 'require_review'
          : request.policy.conflictResolution === 'invalidate_old'
            ? 'invalidate'
            : 'supersede';
      explanation = 'A memory with the same canonical key has different content.';
    } else if (request.candidate.confidence < 0.5) {
      action = 'reject';
      reasonCode = 'LOW_CONFIDENCE';
      explanation = 'Candidate confidence is below the native safety threshold.';
    }

    const decision: MemoryMaintenanceDecision = {
      id: `maintenance:${sha256({ operationId: request.operationId, candidateId: request.candidate.candidateId, action })}`,
      operationId: request.operationId,
      candidateId: request.candidate.candidateId,
      scopeHash: request.existingRecords[0]?.scopeHash ?? sha256(request.scope),
      action,
      targetMemoryIds: targets,
      expectedRevisions: Object.fromEntries(
        request.existingRecords
          .filter((record) => targets.includes(record.id))
          .map((record) => [record.id, record.revision])
      ),
      duplicateScore: exact ? 1 : undefined,
      conflictScore: sameKeyConflict ? 1 : undefined,
      authorityComparison: compareAuthority(
        request.candidate.authority,
        sameKeyConflict?.humanVerified
      ),
      recordsToInvalidate: action === 'invalidate' ? targets : undefined,
      reasonCode,
      explanation,
      policyRevision: request.policy.revision ?? request.policy.version,
      createdAt: this.now(),
    };
    this.decisions.set(decision.id, decision);
    return decision;
  }

  async apply(request: MemoryMaintenanceApplyRequest): Promise<ManagedMemoryWriteResult> {
    if (!this.applyDecision) throw new Error('Memory maintenance applier is not configured.');
    const planned = this.decisions.get(request.decision.id);
    if (!planned || planned.operationId !== request.decision.operationId) {
      throw new Error(`Unknown maintenance decision: ${request.decision.id}`);
    }
    return this.applyDecision(request);
  }

  async explain(decisionId: string): Promise<MemoryMaintenanceDecision | null> {
    return this.decisions.get(decisionId) ?? null;
  }
}

function compareAuthority(
  authority: import('./lifecycle-contracts').MemoryExtractionSourceRef['authority'],
  existingVerified?: boolean
): MemoryMaintenanceDecision['authorityComparison'] {
  if (authority === 'authoritative' || authority === 'verified') {
    return existingVerified ? 'equal' : 'candidate_higher';
  }
  if (existingVerified) return 'existing_higher';
  return 'unknown';
}
