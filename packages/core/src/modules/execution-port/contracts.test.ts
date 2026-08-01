import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  executionAuthorizationEvidenceExample,
  executionAuthorizationVerificationResultExample,
  executionDispatchRequestExample,
  executionPortJsonSchemas,
  validateExecutionAuthorizationEvidence,
  validateExecutionAuthorizationVerificationResult,
  validateExecutionDispatchRequest,
} from './contracts';

describe('Execution Port contracts', () => {
  it('validates authorization, dispatch, and verification fixtures', () => {
    expect(validateExecutionAuthorizationEvidence(executionAuthorizationEvidenceExample)).toEqual(
      executionAuthorizationEvidenceExample
    );
    expect(validateExecutionDispatchRequest(executionDispatchRequestExample)).toEqual(
      executionDispatchRequestExample
    );
    expect(
      validateExecutionAuthorizationVerificationResult(
        executionAuthorizationVerificationResultExample
      )
    ).toEqual(executionAuthorizationVerificationResultExample);
  });

  it('keeps fixtures aligned with strict JSON Schemas', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);

    const fixtures = {
      ExecutionAuthorizationEvidence: executionAuthorizationEvidenceExample,
      ExecutionDispatchRequest: executionDispatchRequestExample,
      ExecutionAuthorizationVerificationResult: executionAuthorizationVerificationResultExample,
    };
    for (const [name, schema] of Object.entries(executionPortJsonSchemas)) {
      expect(ajv.validate(schema, fixtures[name as keyof typeof fixtures]), ajv.errorsText()).toBe(
        true
      );
    }
  });

  it('requires the exact Tool SHA-256 input hash representation', () => {
    expect(() =>
      validateExecutionAuthorizationEvidence({
        ...executionAuthorizationEvidenceExample,
        inputHash: `sha256:${executionAuthorizationEvidenceExample.inputHash}`,
      })
    ).toThrow(/without a prefix/u);
    expect(() =>
      validateExecutionAuthorizationEvidence({
        ...executionAuthorizationEvidenceExample,
        inputHash: 'A'.repeat(64),
      })
    ).toThrow();
  });

  it.each([
    ['activityId', { activityId: 'activity.other' }],
    ['runId', { runId: 'run.other' }],
    ['toolId', { toolId: 'tool.other' }],
    ['riskAssessmentId', { riskAssessmentId: 'risk.other' }],
    ['principalId', { principalId: 'principal.other' }],
  ])('rejects mismatched authorization %s', (_field, patch) => {
    expect(() =>
      validateExecutionDispatchRequest({
        ...executionDispatchRequestExample,
        authorization: { ...executionDispatchRequestExample.authorization, ...patch },
      })
    ).toThrow(/must match/u);
  });

  it('requires approval evidence for an assessment that requires approval', () => {
    expect(() =>
      validateExecutionDispatchRequest({
        ...executionDispatchRequestExample,
        authorization: {
          ...executionDispatchRequestExample.authorization,
          approvalRef: undefined,
        },
      })
    ).toThrow(/approval/u);
  });

  it('requires every Tool scope on the Execution principal', () => {
    expect(() =>
      validateExecutionDispatchRequest({
        ...executionDispatchRequestExample,
        binding: {
          ...executionDispatchRequestExample.binding,
          requiredScopes: ['execution:command:run', 'workspace:write'],
        },
      })
    ).toThrow(/missing required scopes/u);
  });

  it('requires expiration to advance authorization and verification time', () => {
    expect(() =>
      validateExecutionAuthorizationEvidence({
        ...executionAuthorizationEvidenceExample,
        expiresAt: executionAuthorizationEvidenceExample.authorizedAt,
      })
    ).toThrow(/later than authorizedAt/u);
    expect(() =>
      validateExecutionAuthorizationVerificationResult({
        ...executionAuthorizationVerificationResultExample,
        expiresAt: executionAuthorizationVerificationResultExample.verifiedAt,
      })
    ).toThrow(/later than verifiedAt/u);
  });

  it('requires a rejection reason and forbids one for valid evidence', () => {
    expect(() =>
      validateExecutionAuthorizationVerificationResult({
        ...executionAuthorizationVerificationResultExample,
        valid: false,
      })
    ).toThrow(/required/u);
    expect(() =>
      validateExecutionAuthorizationVerificationResult({
        ...executionAuthorizationVerificationResultExample,
        reason: 'unexpected',
      })
    ).toThrow(/must not/u);
  });
});
