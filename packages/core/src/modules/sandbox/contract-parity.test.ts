import { describe, expect, it } from 'vitest';
import {
  expectContractParity,
  type ContractSchemaPair,
} from '../../../test-support/contract-schema-parity';
import {
  sandboxCleanupRequestSchema,
  sandboxCreateRequestSchema,
  sandboxLifecycleJsonSchemas,
  sandboxProviderCapabilitiesSchema,
  sandboxRecordSchema,
  sandboxStartRequestSchema,
  sandboxStatusRequestSchema,
  sandboxTerminateRequestSchema,
} from './index';

const contractPairs: ContractSchemaPair[] = [
  {
    name: 'SandboxProviderCapabilities',
    zod: sandboxProviderCapabilitiesSchema,
    json: sandboxLifecycleJsonSchemas.SandboxProviderCapabilities,
  },
  {
    name: 'SandboxRecord',
    zod: sandboxRecordSchema,
    json: sandboxLifecycleJsonSchemas.SandboxRecord,
  },
  {
    name: 'SandboxCreateRequest',
    zod: sandboxCreateRequestSchema,
    json: sandboxLifecycleJsonSchemas.SandboxCreateRequest,
  },
  {
    name: 'SandboxStartRequest',
    zod: sandboxStartRequestSchema,
    json: sandboxLifecycleJsonSchemas.SandboxStartRequest,
  },
  {
    name: 'SandboxStatusRequest',
    zod: sandboxStatusRequestSchema,
    json: sandboxLifecycleJsonSchemas.SandboxStatusRequest,
  },
  {
    name: 'SandboxTerminateRequest',
    zod: sandboxTerminateRequestSchema,
    json: sandboxLifecycleJsonSchemas.SandboxTerminateRequest,
  },
  {
    name: 'SandboxCleanupRequest',
    zod: sandboxCleanupRequestSchema,
    json: sandboxLifecycleJsonSchemas.SandboxCleanupRequest,
  },
];

describe('Sandbox Zod and JSON Schema parity', () => {
  it.each(contractPairs)('keeps $name properties and required fields aligned', (pair) => {
    expectContractParity(pair);
  });
});
