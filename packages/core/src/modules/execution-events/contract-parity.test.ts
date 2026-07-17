import { describe, expect, it } from 'vitest';
import {
  expectContractParity,
  type ContractSchemaPair,
} from '../../../test-support/contract-schema-parity';
import {
  commandExecutionEventPayloadSchema,
  executionEventJsonSchemas,
  executionEventPayloadBaseSchema,
  executionFrameworkEventEnvelopeSchema,
  networkAuthorizationEventPayloadSchema,
  sandboxLifecycleEventPayloadSchema,
} from './index';

const contractPairs: ContractSchemaPair[] = [
  {
    name: 'ExecutionEventPayloadBase',
    zod: executionEventPayloadBaseSchema,
    json: executionEventJsonSchemas.ExecutionEventPayloadBase,
  },
  {
    name: 'SandboxLifecycleEventPayload',
    zod: sandboxLifecycleEventPayloadSchema,
    json: executionEventJsonSchemas.SandboxLifecycleEventPayload,
  },
  {
    name: 'CommandExecutionEventPayload',
    zod: commandExecutionEventPayloadSchema,
    json: executionEventJsonSchemas.CommandExecutionEventPayload,
  },
  {
    name: 'NetworkAuthorizationEventPayload',
    zod: networkAuthorizationEventPayloadSchema,
    json: executionEventJsonSchemas.NetworkAuthorizationEventPayload,
  },
  {
    name: 'ExecutionFrameworkEvent',
    zod: executionFrameworkEventEnvelopeSchema,
    json: executionEventJsonSchemas.ExecutionFrameworkEvent,
  },
];

describe('Execution Event Zod and JSON Schema parity', () => {
  it.each(contractPairs)('keeps $name properties and required fields aligned', (pair) => {
    expectContractParity(pair);
  });
});
