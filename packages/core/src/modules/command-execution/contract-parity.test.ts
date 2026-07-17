import { describe, expect, it } from 'vitest';
import {
  expectContractParity,
  type ContractSchemaPair,
} from '../../../test-support/contract-schema-parity';
import {
  commandExecutionJsonSchemas,
  commandExecutionRequestSchema,
  commandExecutionResultSchema,
  commandOutputChunkSchema,
  executionCancelRequestSchema,
  executionReceiptSchema,
  executionResourceUsageSchema,
} from './index';

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
