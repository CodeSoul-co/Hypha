import { describe, expect, it } from 'vitest';
import { z, type ZodRawShape, type ZodTypeAny } from 'zod';
import type { JsonSchema } from '../../specs';
import { sandboxProviderCapabilitiesJsonSchema } from '../sandbox';
import {
  sandboxCapabilityDerivationInputJsonSchema,
  sandboxCapabilityDerivationInputSchema,
  sandboxCapabilityNames,
  sandboxCapabilityNegotiationRequestJsonSchema,
  sandboxCapabilityNegotiationRequestSchema,
  sandboxCapabilityNegotiationResultJsonSchema,
  sandboxCapabilityNegotiationResultSchema,
  sandboxCapabilityRequirementJsonSchema,
  sandboxCapabilityRequirementSchema,
  validateSandboxCapabilityNegotiationRequest,
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

function requireProperty(schema: JsonSchema, property: string): JsonSchema {
  const result = schema.properties?.[property];
  if (!result) throw new TypeError(`missing JSON Schema property ${property}`);
  return result;
}

function sorted(values: readonly string[]): string[] {
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

const commandRequirementSchema = sandboxCapabilityDerivationInputSchema.shape.command.unwrap();

const contractPairs: ContractSchemaPair[] = [
  {
    name: 'SandboxCapabilityRequirement',
    zod: sandboxCapabilityRequirementSchema,
    json: sandboxCapabilityRequirementJsonSchema,
  },
  {
    name: 'SandboxCapabilityNegotiationRequest',
    zod: sandboxCapabilityNegotiationRequestSchema,
    json: sandboxCapabilityNegotiationRequestJsonSchema,
  },
  {
    name: 'SandboxCapabilityNegotiationResult',
    zod: sandboxCapabilityNegotiationResultSchema,
    json: sandboxCapabilityNegotiationResultJsonSchema,
  },
  {
    name: 'SandboxCapabilityDerivationInput',
    zod: sandboxCapabilityDerivationInputSchema,
    json: sandboxCapabilityDerivationInputJsonSchema,
  },
  {
    name: 'SandboxCommandCapabilityRequirement',
    zod: commandRequirementSchema,
    json: requireProperty(sandboxCapabilityDerivationInputJsonSchema, 'command'),
  },
];

describe('Sandbox Provider Zod and JSON Schema parity', () => {
  it.each(contractPairs)('keeps $name properties and required fields aligned', (pair) => {
    expectContractParity(pair);
  });

  it('keeps the capability registry complete and aligned', () => {
    expect(sorted(Object.keys(sandboxProviderCapabilitiesJsonSchema.properties ?? {}))).toEqual(
      sorted(sandboxCapabilityNames)
    );
    expect(sandboxCapabilityRequirementJsonSchema.properties?.capability.enum).toEqual([
      ...sandboxCapabilityNames,
    ]);
  });

  it('rejects undeclared negotiation fields instead of silently stripping them', () => {
    expect(() =>
      validateSandboxCapabilityNegotiationRequest({
        providerId: 'provider.example',
        capabilities: Object.fromEntries(
          sandboxCapabilityNames.map((capability) => [capability, false])
        ),
        requirements: [],
        evaluatedAt: '2026-07-16T00:00:00.000Z',
        assumedCompatible: true,
      })
    ).toThrow(/unrecognized key/iu);
  });
});
