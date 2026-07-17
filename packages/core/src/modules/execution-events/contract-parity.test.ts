import { describe, expect, it } from 'vitest';
import { z, type ZodRawShape, type ZodTypeAny } from 'zod';
import type { JsonSchema } from '../../specs';
import {
  commandExecutionEventPayloadSchema,
  executionEventJsonSchemas,
  executionEventPayloadBaseSchema,
  executionFrameworkEventEnvelopeSchema,
  networkAuthorizationEventPayloadSchema,
  sandboxLifecycleEventPayloadSchema,
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
