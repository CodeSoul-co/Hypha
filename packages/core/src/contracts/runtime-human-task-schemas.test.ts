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
  });
});
