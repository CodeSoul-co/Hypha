import { describe, expect, it } from 'vitest';
import { z, type ZodRawShape, type ZodTypeAny } from 'zod';
import type { JsonSchema } from '../../specs';
import {
  executionEnvironmentSpecJsonSchema,
  executionEnvironmentSpecSchema,
  executionImageSpecSchema,
  executionLoggingPolicySpecSchema,
  networkPolicySpecSchema,
  processPolicySpecSchema,
  resourceLimitSpecSchema,
  sandboxFilesystemPolicySpecSchema,
  sandboxLifecyclePolicySpecSchema,
  sandboxMountSpecSchema,
  sandboxSecurityPolicySpecSchema,
  sandboxTmpfsSpecSchema,
  secretInjectionPolicySpecSchema,
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

function requireItems(schema: JsonSchema, property: string): JsonSchema {
  const items = requireProperty(schema, property).items;
  if (!items) throw new TypeError(`missing JSON Schema items for ${property}`);
  return items;
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

const filesystemJsonSchema = requireProperty(executionEnvironmentSpecJsonSchema, 'filesystem');

const contractPairs: ContractSchemaPair[] = [
  {
    name: 'ExecutionImageSpec',
    zod: executionImageSpecSchema,
    json: requireProperty(executionEnvironmentSpecJsonSchema, 'image'),
  },
  {
    name: 'ProcessPolicySpec',
    zod: processPolicySpecSchema,
    json: requireProperty(executionEnvironmentSpecJsonSchema, 'process'),
  },
  {
    name: 'ResourceLimitSpec',
    zod: resourceLimitSpecSchema,
    json: requireProperty(executionEnvironmentSpecJsonSchema, 'resources'),
  },
  {
    name: 'SandboxMountSpec',
    zod: sandboxMountSpecSchema,
    json: requireItems(filesystemJsonSchema, 'mounts'),
  },
  {
    name: 'SandboxTmpfsSpec',
    zod: sandboxTmpfsSpecSchema,
    json: requireItems(filesystemJsonSchema, 'tmpfs'),
  },
  {
    name: 'SandboxFilesystemPolicySpec',
    zod: sandboxFilesystemPolicySpecSchema,
    json: filesystemJsonSchema,
  },
  {
    name: 'NetworkPolicySpec',
    zod: networkPolicySpecSchema,
    json: requireProperty(executionEnvironmentSpecJsonSchema, 'network'),
  },
  {
    name: 'SandboxSecurityPolicySpec',
    zod: sandboxSecurityPolicySpecSchema,
    json: requireProperty(executionEnvironmentSpecJsonSchema, 'security'),
  },
  {
    name: 'SecretInjectionPolicySpec',
    zod: secretInjectionPolicySpecSchema,
    json: requireProperty(executionEnvironmentSpecJsonSchema, 'secrets'),
  },
  {
    name: 'ExecutionLoggingPolicySpec',
    zod: executionLoggingPolicySpecSchema,
    json: requireProperty(executionEnvironmentSpecJsonSchema, 'logging'),
  },
  {
    name: 'SandboxLifecyclePolicySpec',
    zod: sandboxLifecyclePolicySpecSchema,
    json: requireProperty(executionEnvironmentSpecJsonSchema, 'lifecycle'),
  },
  {
    name: 'ExecutionEnvironmentSpec',
    zod: executionEnvironmentSpecSchema,
    json: executionEnvironmentSpecJsonSchema,
  },
];

describe('Execution Environment Zod and JSON Schema parity', () => {
  it.each(contractPairs)('keeps $name properties and required fields aligned', (pair) => {
    expectContractParity(pair);
  });
});
