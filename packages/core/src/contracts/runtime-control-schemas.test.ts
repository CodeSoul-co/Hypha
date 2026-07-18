import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  runtimeControlContractDefinitions,
  runtimeRunControlCommandDefinition,
  runtimeRunControlCommandExample,
  runtimeRunControlCommandJsonSchema,
  runtimeRunControlCommandSchema,
  runtimeRunControlResultDefinition,
  runtimeRunControlResultExample,
  runtimeRunControlResultJsonSchema,
  runtimeRunControlResultSchema,
} from './runtime-control-schemas';

describe('Runtime control contracts', () => {
  it('keeps the command fixture aligned across TypeScript, Zod, and JSON Schema', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);

    expect(runtimeRunControlCommandSchema.parse(runtimeRunControlCommandExample)).toEqual(
      runtimeRunControlCommandExample
    );
    expect(
      ajv.validate(runtimeRunControlCommandJsonSchema, runtimeRunControlCommandExample),
      JSON.stringify(ajv.errors)
    ).toBe(true);
    expect(runtimeRunControlCommandDefinition.example).toEqual(runtimeRunControlCommandExample);
    expect(runtimeRunControlResultSchema.parse(runtimeRunControlResultExample)).toEqual(
      runtimeRunControlResultExample
    );
    expect(
      ajv.validate(runtimeRunControlResultJsonSchema, runtimeRunControlResultExample),
      JSON.stringify(ajv.errors)
    ).toBe(true);
    expect(runtimeRunControlResultDefinition.example).toEqual(runtimeRunControlResultExample);
    expect(runtimeControlContractDefinitions).toHaveLength(2);
  });

  it('rejects incomplete commands and non-JSON signal payloads', () => {
    expect(() =>
      runtimeRunControlCommandSchema.parse({
        ...runtimeRunControlCommandExample,
        key: '',
      })
    ).toThrow();
    expect(() =>
      runtimeRunControlCommandSchema.parse({
        ...runtimeRunControlCommandExample,
        payload: undefined,
      })
    ).toThrow();
  });
});
