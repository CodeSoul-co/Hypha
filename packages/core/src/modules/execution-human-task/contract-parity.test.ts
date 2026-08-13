import { describe, it } from 'vitest';
import { expectContractParity } from '../../../test-support/contract-schema-parity';
import { executionHumanTaskSubjectJsonSchema, executionHumanTaskSubjectSchema } from './index';

describe('Execution HumanTask subject Zod and JSON Schema parity', () => {
  it('keeps properties, required fields, and constraints aligned', () => {
    expectContractParity({
      name: 'ExecutionHumanTaskSubject',
      zod: executionHumanTaskSubjectSchema,
      json: executionHumanTaskSubjectJsonSchema,
    });
  });
});
