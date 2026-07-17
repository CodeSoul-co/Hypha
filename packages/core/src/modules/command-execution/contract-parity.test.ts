import { describe, expect, it } from 'vitest';
import { z, type ZodRawShape, type ZodTypeAny } from 'zod';
import type { JsonSchema } from '../../specs';
import {
  commandExecutionJsonSchemas,
  commandExecutionRequestSchema,
  commandExecutionResultSchema,
  commandOutputChunkSchema,
  executionCancelRequestSchema,
  executionReceiptSchema,
  executionResourceUsageSchema,
} from './index';

interface ContractSchemaPair {
  name: string;
  zod: ZodTypeAny;
  json: JsonSchema;
}

function unwrapObjectSchema(schema: ZodTypeAny): z.ZodObject<ZodRawShape> {
  let current = schema;
  while (current instanceof z.ZodEffects) current = current.innerType();
  if (!(current instanceof z.ZodObject)) {
    throw new TypeError('contract parity requires an object Zod schema');
  }
  return current;
}

function sorted(values: string[]): string[] {
  return [...values].sort((left, right) => left.localeCompare(right));
}

function expectContractParity(pair: ContractSchemaPair): void {
  const shape = unwrapObjectSchema(pair.zod).shape;
  const zodKeys = sorted(Object.keys(shape));
  const jsonKeys = sorted(Object.keys(pair.json.properties ?? {}));
  const zodRequired = sorted(
    Object.entries(shape)
      .filter(([, field]) => !field.isOptional())
      .map(([key]) => key)
  );
  const jsonRequired = sorted(pair.json.required ?? []);

  expect(pair.json.type, pair.name).toBe('object');
  expect(pair.json.additionalProperties, pair.name).toBe(false);
  expect(jsonKeys, `${pair.name} property drift`).toEqual(zodKeys);
  expect(jsonRequired, `${pair.name} required-field drift`).toEqual(zodRequired);
}

const contractPairs: ContractSchemaPair[] = [
  {
    name: 'CommandExecutionRequest',
    zod: commandExecutionRequestSchema,
    json: commandExecutionJsonSchemas.CommandExecutionRequest,
  },
  {
    name: 'CommandExecutionResult',
    zod: commandExecutionResultSchema,
    json: commandExecutionJsonSchemas.CommandExecutionResult,
  },
  {
    name: 'ExecutionResourceUsage',
    zod: executionResourceUsageSchema,
    json: commandExecutionJsonSchemas.ExecutionResourceUsage,
  },
  {
    name: 'ExecutionReceipt',
    zod: executionReceiptSchema,
    json: commandExecutionJsonSchemas.ExecutionReceipt,
  },
  {
    name: 'CommandOutputChunk',
    zod: commandOutputChunkSchema,
    json: commandExecutionJsonSchemas.CommandOutputChunk,
  },
  {
    name: 'ExecutionCancelRequest',
    zod: executionCancelRequestSchema,
    json: commandExecutionJsonSchemas.ExecutionCancelRequest,
  },
];

describe('Command execution Zod and JSON Schema parity', () => {
  it.each(contractPairs)('keeps $name properties and required fields aligned', (pair) => {
    expectContractParity(pair);
  });
});
