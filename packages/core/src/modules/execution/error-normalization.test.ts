import { describe, expect, it } from 'vitest';
import { z, type ZodRawShape, type ZodTypeAny } from 'zod';
import type { JsonSchema } from '../../specs';
import {
  executionErrorCodes,
  executionPrincipalJsonSchema,
  executionPrincipalSchema,
  normalizedExecutionErrorJsonSchema,
  normalizedExecutionErrorSchema,
  validateExecutionPrincipal,
  validateNormalizedExecutionError,
} from './index';

interface ContractSchemaPair {
  name: string;
  zod: ZodTypeAny;
  json: JsonSchema;
}

function sorted(values: string[]): string[] {
  return [...values].sort((left, right) => left.localeCompare(right));
}

function expectContractParity(pair: ContractSchemaPair): void {
  if (!(pair.zod instanceof z.ZodObject)) {
    throw new TypeError('contract parity requires an object Zod schema');
  }
  const shape = pair.zod.shape as ZodRawShape;
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

const principalExample = {
  principalId: 'agent.example',
  type: 'agent' as const,
  userId: 'user.example',
  agentId: 'agent.example',
  permissionScopes: ['execution:command:run'],
};

const errorExample = {
  code: 'EXECUTION_TIMEOUT' as const,
  message: 'execution timed out',
  retryable: true,
  providerCode: 'PROVIDER_TIMEOUT',
  causeRef: 'event:timeout.example',
};

describe('Execution principal and error normalization contracts', () => {
  it.each<ContractSchemaPair>([
    {
      name: 'ExecutionPrincipal',
      zod: executionPrincipalSchema,
      json: executionPrincipalJsonSchema,
    },
    {
      name: 'NormalizedExecutionError',
      zod: normalizedExecutionErrorSchema,
      json: normalizedExecutionErrorJsonSchema,
    },
  ])('keeps $name properties and required fields aligned', (pair) => {
    expectContractParity(pair);
  });

  it('validates governed principals and normalized errors', () => {
    expect(validateExecutionPrincipal(principalExample)).toEqual(principalExample);
    expect(validateNormalizedExecutionError(errorExample)).toEqual(errorExample);
  });

  it('keeps the Zod and JSON Schema error-code registries aligned', () => {
    expect(normalizedExecutionErrorJsonSchema.properties?.code.enum).toEqual(executionErrorCodes);
  });

  it('rejects unknown execution-prefixed codes and invalid Provider codes', () => {
    expect(() =>
      validateNormalizedExecutionError({
        ...errorExample,
        code: 'EXECUTION_UNKNOWN_CODE',
      })
    ).toThrow();
    expect(() =>
      validateNormalizedExecutionError({
        ...errorExample,
        providerCode: { raw: 'PROVIDER_TIMEOUT' },
      })
    ).toThrow();
  });

  it('rejects undeclared top-level fields instead of silently stripping them', () => {
    expect(() =>
      validateExecutionPrincipal({
        ...principalExample,
        plaintextSecret: 'not allowed',
      })
    ).toThrow(/unrecognized key/iu);
    expect(() =>
      validateNormalizedExecutionError({
        ...errorExample,
        rawProviderError: 'not allowed',
      })
    ).toThrow(/unrecognized key/iu);
  });
});
