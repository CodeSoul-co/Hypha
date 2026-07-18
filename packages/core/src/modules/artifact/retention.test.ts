import { describe, expect, it } from 'vitest';
import { artifactProfileSpecExample, artifactRecordExample } from './index';
import {
  DefaultArtifactRetentionEvaluator,
  artifactRetentionContractJsonSchemas,
  artifactRetentionDecisionSchema,
  artifactRetentionEvaluationRequestSchema,
} from './retention';
import { expectContractParity } from '../../../test-support/contract-schema-parity';

const evaluator = new DefaultArtifactRetentionEvaluator();

describe('Artifact retention evaluation', () => {
  it('keeps Zod and JSON Schema retention contracts aligned', () => {
    expectContractParity({
      name: 'ArtifactRetentionEvaluationRequest',
      zod: artifactRetentionEvaluationRequestSchema,
      json: artifactRetentionContractJsonSchemas.ArtifactRetentionEvaluationRequest,
    });
    expectContractParity({
      name: 'ArtifactRetentionDecision',
      zod: artifactRetentionDecisionSchema,
      json: artifactRetentionContractJsonSchemas.ArtifactRetentionDecision,
    });
  });

  it('selects archive and delete actions from deterministic policy times', () => {
    const record = {
      ...artifactRecordExample,
      status: 'draft' as const,
      finalizedAt: undefined,
      createdAt: '2026-07-18T00:00:00.000Z',
      updatedAt: '2026-07-18T00:00:00.000Z',
      retention: {},
    };
    const profile = {
      ...artifactProfileSpecExample,
      retention: { archiveAfterSeconds: 60, deleteAfterSeconds: 120 },
    };

    expect(
      evaluator.evaluate({ record, profile, evaluatedAt: '2026-07-18T00:00:30.000Z' })
    ).toEqual({
      action: 'retain',
      reason: 'not_due',
      effectiveAt: '2026-07-18T00:01:00.000Z',
    });
    expect(
      evaluator.evaluate({ record, profile, evaluatedAt: '2026-07-18T00:01:00.000Z' })
    ).toEqual({
      action: 'archive',
      reason: 'archive_after',
      effectiveAt: '2026-07-18T00:01:00.000Z',
    });
    expect(
      evaluator.evaluate({ record, profile, evaluatedAt: '2026-07-18T00:02:00.000Z' })
    ).toEqual({
      action: 'delete',
      reason: 'delete_after',
      effectiveAt: '2026-07-18T00:02:00.000Z',
    });
  });

  it('honors explicit expiry, legal hold, references, final, and failure retention', () => {
    const expired = {
      ...artifactRecordExample,
      status: 'draft' as const,
      finalizedAt: undefined,
      retention: { expiresAt: '2026-07-18T00:01:00.000Z' },
      expiresAt: '2026-07-18T00:01:00.000Z',
    };
    expect(
      evaluator.evaluate({
        record: expired,
        profile: artifactProfileSpecExample,
        evaluatedAt: '2026-07-18T00:01:00.000Z',
      })
    ).toMatchObject({ action: 'delete', reason: 'expired' });
    for (const [record, reason] of [
      [{ ...expired, retention: { ...expired.retention, legalHold: true } }, 'legal_hold'],
      [{ ...expired, retention: { ...expired.retention, referencedByCount: 1 } }, 'referenced'],
      [{ ...artifactRecordExample, retention: {} }, 'retain_final'],
      [{ ...expired, status: 'failed' as const }, 'retain_failure'],
    ] as const) {
      expect(
        evaluator.evaluate({
          record,
          profile: artifactProfileSpecExample,
          evaluatedAt: '2026-08-18T00:00:00.000Z',
        })
      ).toMatchObject({ action: 'retain', reason });
    }
  });
});
