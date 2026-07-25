import { describe, expect, it } from 'vitest';
import {
  expectContractParity,
  requireJsonSchemaProperty,
  sortStrings,
  type ContractSchemaPair,
} from '../../../test-support/contract-schema-parity';
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
    json: requireJsonSchemaProperty(sandboxCapabilityDerivationInputJsonSchema, 'command'),
  },
];

describe('Sandbox Provider Zod and JSON Schema parity', () => {
  it.each(contractPairs)('keeps $name properties and required fields aligned', (pair) => {
    expectContractParity(pair);
  });

  it('keeps the capability registry complete and aligned', () => {
    expect(
      sortStrings(Object.keys(sandboxProviderCapabilitiesJsonSchema.properties ?? {}))
    ).toEqual(sortStrings(sandboxCapabilityNames));
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
