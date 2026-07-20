import { describe, it } from 'vitest';
import {
  expectContractParity,
  type ContractSchemaPair,
} from '../../../test-support/contract-schema-parity';
import {
  executionOutputCollectionItemSchema,
  executionOutputCollectionPlanSchema,
  executionOutputCollectionPolicySchema,
  executionOutputJsonSchemas,
} from './index';

const contractPairs: ContractSchemaPair[] = [
  {
    name: 'ExecutionOutputCollectionPolicy',
    zod: executionOutputCollectionPolicySchema,
    json: executionOutputJsonSchemas.ExecutionOutputCollectionPolicy,
  },
  {
    name: 'ExecutionOutputCollectionItem',
    zod: executionOutputCollectionItemSchema,
    json: executionOutputJsonSchemas.ExecutionOutputCollectionItem,
  },
  {
    name: 'ExecutionOutputCollectionPlan',
    zod: executionOutputCollectionPlanSchema,
    json: executionOutputJsonSchemas.ExecutionOutputCollectionPlan,
  },
];

describe('Execution output Zod and JSON Schema parity', () => {
  it.each(contractPairs)('keeps $name properties and required fields aligned', (pair) => {
    expectContractParity(pair);
  });
});
