import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  runtimeHumanTaskContractDefinitions,
  runtimeHumanTaskDecisionCommandExample,
  runtimeHumanTaskDecisionCommandJsonSchema,
  runtimeHumanTaskDecisionCommandSchema,
  runtimeHumanTaskExample,
  runtimeHumanTaskJsonSchema,
  runtimeHumanTaskSchema,
} from './runtime-human-task-schemas';

describe('Runtime HumanTask contracts', () => {
  it('keeps task and decision fixtures aligned across schema formats', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);

    expect(runtimeHumanTaskSchema.parse(runtimeHumanTaskExample)).toEqual(runtimeHumanTaskExample);
    expect(ajv.validate(runtimeHumanTaskJsonSchema, runtimeHumanTaskExample)).toBe(true);
    expect(
      runtimeHumanTaskDecisionCommandSchema.parse(runtimeHumanTaskDecisionCommandExample)
    ).toEqual(runtimeHumanTaskDecisionCommandExample);
    expect(
      ajv.validate(
        runtimeHumanTaskDecisionCommandJsonSchema,
        runtimeHumanTaskDecisionCommandExample
      )
    ).toBe(true);
    expect(runtimeHumanTaskContractDefinitions).toHaveLength(2);
  });

  it('rejects unsupported kinds, bare hashes, and empty decision scopes', () => {
    expect(() =>
      runtimeHumanTaskSchema.parse({ ...runtimeHumanTaskExample, kind: 'custom' })
    ).toThrow();
    expect(() =>
      runtimeHumanTaskSchema.parse({
        ...runtimeHumanTaskExample,
        subjectHash: 'a'.repeat(64),
      })
    ).toThrow();
    expect(() =>
      runtimeHumanTaskSchema.parse({
        ...runtimeHumanTaskExample,
        allowedDecisionScopes: [],
      })
    ).toThrow();
    expect(() =>
      runtimeHumanTaskSchema.parse({
        ...runtimeHumanTaskExample,
        activityDescriptorRef: 'artifact-ref:missing-hash',
      })
    ).toThrow(/provided together/u);
  });

  it('requires replacement provenance only for superseded tasks and decisions', () => {
    const supersededTask = {
      ...runtimeHumanTaskExample,
      status: 'superseded' as const,
      revision: 2,
      decisionEventId: 'event.human-task.superseded',
      decisionCommandId: 'command.human-task.supersede',
      decisionIdempotencyKey: 'human-task.supersede',
      decidedBy: 'reviewer.default',
      decidedAt: '2026-07-23T10:05:00.000Z',
      supersededByTaskId: 'human-task.replacement',
    };
    const supersededDecision = {
      ...runtimeHumanTaskDecisionCommandExample,
      decision: 'superseded' as const,
      supersededByTaskId: 'human-task.replacement',
    };

    expect(runtimeHumanTaskSchema.parse(supersededTask)).toEqual(supersededTask);
    expect(runtimeHumanTaskDecisionCommandSchema.parse(supersededDecision)).toEqual(
      supersededDecision
    );
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    expect(ajv.validate(runtimeHumanTaskJsonSchema, supersededTask)).toBe(true);
    expect(ajv.validate(runtimeHumanTaskDecisionCommandJsonSchema, supersededDecision)).toBe(true);
    expect(() =>
      runtimeHumanTaskSchema.parse({
        ...supersededTask,
        supersededByTaskId: undefined,
      })
    ).toThrow(/supersededByTaskId is required/u);
    expect(
      ajv.validate(runtimeHumanTaskJsonSchema, {
        ...supersededTask,
        supersededByTaskId: undefined,
      })
    ).toBe(false);
    expect(() =>
      runtimeHumanTaskDecisionCommandSchema.parse({
        ...runtimeHumanTaskDecisionCommandExample,
        supersededByTaskId: 'human-task.replacement',
      })
    ).toThrow(/only valid/u);
  });
});
