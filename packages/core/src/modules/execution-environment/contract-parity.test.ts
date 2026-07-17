import { describe, expect, it } from 'vitest';
import {
  expectContractParity,
  requireJsonSchemaItems,
  requireJsonSchemaProperty,
  type ContractSchemaPair,
} from '../../../test-support/contract-schema-parity';
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

const filesystemJsonSchema = requireJsonSchemaProperty(
  executionEnvironmentSpecJsonSchema,
  'filesystem'
);

const contractPairs: ContractSchemaPair[] = [
  {
    name: 'ExecutionImageSpec',
    zod: executionImageSpecSchema,
    json: requireJsonSchemaProperty(executionEnvironmentSpecJsonSchema, 'image'),
  },
  {
    name: 'ProcessPolicySpec',
    zod: processPolicySpecSchema,
    json: requireJsonSchemaProperty(executionEnvironmentSpecJsonSchema, 'process'),
  },
  {
    name: 'ResourceLimitSpec',
    zod: resourceLimitSpecSchema,
    json: requireJsonSchemaProperty(executionEnvironmentSpecJsonSchema, 'resources'),
  },
  {
    name: 'SandboxMountSpec',
    zod: sandboxMountSpecSchema,
    json: requireJsonSchemaItems(filesystemJsonSchema, 'mounts'),
  },
  {
    name: 'SandboxTmpfsSpec',
    zod: sandboxTmpfsSpecSchema,
    json: requireJsonSchemaItems(filesystemJsonSchema, 'tmpfs'),
  },
  {
    name: 'SandboxFilesystemPolicySpec',
    zod: sandboxFilesystemPolicySpecSchema,
    json: filesystemJsonSchema,
  },
  {
    name: 'NetworkPolicySpec',
    zod: networkPolicySpecSchema,
    json: requireJsonSchemaProperty(executionEnvironmentSpecJsonSchema, 'network'),
  },
  {
    name: 'SandboxSecurityPolicySpec',
    zod: sandboxSecurityPolicySpecSchema,
    json: requireJsonSchemaProperty(executionEnvironmentSpecJsonSchema, 'security'),
  },
  {
    name: 'SecretInjectionPolicySpec',
    zod: secretInjectionPolicySpecSchema,
    json: requireJsonSchemaProperty(executionEnvironmentSpecJsonSchema, 'secrets'),
  },
  {
    name: 'ExecutionLoggingPolicySpec',
    zod: executionLoggingPolicySpecSchema,
    json: requireJsonSchemaProperty(executionEnvironmentSpecJsonSchema, 'logging'),
  },
  {
    name: 'SandboxLifecyclePolicySpec',
    zod: sandboxLifecyclePolicySpecSchema,
    json: requireJsonSchemaProperty(executionEnvironmentSpecJsonSchema, 'lifecycle'),
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
