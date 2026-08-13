import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  executionGovernanceJsonSchemas,
  executionRiskAssessmentExample,
  executionRiskAssessmentJsonSchema,
  executionToolBindingExample,
  executionToolBindingJsonSchema,
  validateExecutionRiskAssessment,
  validateExecutionToolBinding,
} from './index';

describe('Execution governance boundary contracts', () => {
  it('validates Tool binding and risk assessment fixtures', () => {
    expect(validateExecutionToolBinding(executionToolBindingExample)).toEqual(
      executionToolBindingExample
    );
    expect(validateExecutionRiskAssessment(executionRiskAssessmentExample)).toEqual(
      executionRiskAssessmentExample
    );
  });

  it('keeps fixtures aligned across Zod and JSON Schema', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);

    expect(
      ajv.validate(executionToolBindingJsonSchema, executionToolBindingExample),
      ajv.errorsText()
    ).toBe(true);
    expect(
      ajv.validate(executionRiskAssessmentJsonSchema, executionRiskAssessmentExample),
      ajv.errorsText()
    ).toBe(true);
  });

  it('exports both governance JSON Schemas', () => {
    expect(Object.keys(executionGovernanceJsonSchemas)).toEqual([
      'ExecutionToolBinding',
      'ExecutionRiskAssessment',
    ]);
  });

  it('requires at least one unique permission scope', () => {
    expect(() =>
      validateExecutionToolBinding({
        ...executionToolBindingExample,
        requiredScopes: [],
      })
    ).toThrow();
    expect(() =>
      validateExecutionToolBinding({
        ...executionToolBindingExample,
        requiredScopes: ['execution:command:run', 'execution:command:run'],
      })
    ).toThrow(/duplicate permission/u);
  });

  it('does not admit an ungoverned none side-effect level', () => {
    expect(() =>
      validateExecutionToolBinding({
        ...executionToolBindingExample,
        sideEffectLevel: 'none',
      })
    ).toThrow();
  });

  it('requires meaningful and unique risk evidence', () => {
    expect(() =>
      validateExecutionRiskAssessment({
        ...executionRiskAssessmentExample,
        reasons: [],
      })
    ).toThrow();
    expect(() =>
      validateExecutionRiskAssessment({
        ...executionRiskAssessmentExample,
        matchedRules: ['execution-risk.shell', 'execution-risk.shell'],
      })
    ).toThrow(/duplicate matched rules/u);
  });

  it.each(['high', 'critical'])('fails closed for %s risk without approval', (level) => {
    const assessment = {
      ...executionRiskAssessmentExample,
      level,
      requiresApproval: false,
    };
    expect(() => validateExecutionRiskAssessment(assessment)).toThrow(/must be true/u);

    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    expect(ajv.validate(executionRiskAssessmentJsonSchema, assessment)).toBe(false);
  });

  it('permits policy to request approval for lower-risk work', () => {
    expect(
      validateExecutionRiskAssessment({
        ...executionRiskAssessmentExample,
        level: 'low',
        reasons: ['policy_requires_review'],
        matchedRules: ['policy.execution.review'],
        requiresApproval: true,
        recommendedSandboxLevel: 'local',
      })
    ).toMatchObject({ level: 'low', requiresApproval: true });
  });
});
