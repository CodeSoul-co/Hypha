import { describe, expect, it } from 'vitest';
import {
  MemoryManagementProviderRegistry,
  memoryManagementProviderSpecExample,
  memoryProfileSpecExample,
  validateMemoryRuntimeConfig,
  type MemoryRuntimeConfig,
} from './index';

function config(): MemoryRuntimeConfig {
  return {
    activeProfile: memoryProfileSpecExample.id,
    profiles: {
      [memoryProfileSpecExample.id]: {
        profile: structuredClone(memoryProfileSpecExample),
        management: structuredClone(memoryManagementProviderSpecExample),
      },
    },
  };
}

describe('Memory runtime configuration boundary', () => {
  it('accepts validated environment and secret references without accepting secret values', () => {
    const referenced = config();
    referenced.profiles[memoryProfileSpecExample.id].management.config = {
      apiTokenEnv: 'HYPHA_MEM0_PLATFORM_TOKEN',
      credentialRef: 'secret.memory.mem0',
    };
    expect(validateMemoryRuntimeConfig(referenced)).toEqual(referenced);

    for (const invalid of [
      { apiToken: 'plain-text-token' },
      { apiTokenEnv: 'plain-text-token' },
      { credentialRef: 'plain-text-token' },
      { nested: { password: 'plain-text-password' } },
    ]) {
      const candidate = config();
      candidate.profiles[memoryProfileSpecExample.id].management.config = invalid;
      expect(() => validateMemoryRuntimeConfig(candidate)).toThrow(
        'Provider credentials must be resolved by connectionRef'
      );
    }
  });

  it('rejects unknown nested fields, profile key drift, and provider reference drift', () => {
    const unknown = config() as unknown as {
      activeProfile: string;
      profiles: Record<string, { profile: Record<string, unknown>; management: unknown }>;
    };
    unknown.profiles[memoryProfileSpecExample.id].profile.unexpected = true;
    expect(() => validateMemoryRuntimeConfig(unknown)).toThrow();

    const keyDrift = config();
    keyDrift.profiles['wrong-key'] = keyDrift.profiles[memoryProfileSpecExample.id];
    delete keyDrift.profiles[memoryProfileSpecExample.id];
    keyDrift.activeProfile = 'wrong-key';
    expect(() => validateMemoryRuntimeConfig(keyDrift)).toThrow(
      'Memory profile map key must equal profile.id'
    );

    const providerDrift = config();
    providerDrift.profiles[memoryProfileSpecExample.id].profile.managementProviderRef = {
      id: 'memory.provider.other',
      version: '1.0.0',
    };
    expect(() => validateMemoryRuntimeConfig(providerDrift)).toThrow(
      'Memory profile managementProviderRef must select its management spec'
    );
  });

  it('rejects duplicate dependencies, invalid topology and ephemeral production coordination', () => {
    const duplicateReference = config();
    duplicateReference.profiles[memoryProfileSpecExample.id].profile.vectorStoreRefs = [
      { id: 'memory.vector.duplicate', version: '1.0.0' },
      { id: 'memory.vector.duplicate', version: '1.0.0' },
    ];
    expect(() => validateMemoryRuntimeConfig(duplicateReference)).toThrow(
      'Memory profile dependency references must be unique'
    );

    const invalidNativeTopology = config();
    invalidNativeTopology.profiles[memoryProfileSpecExample.id].management.deployment = 'local';
    expect(() => validateMemoryRuntimeConfig(invalidNativeTopology)).toThrow(
      'Local Native Memory requires distinct working and record store references'
    );

    const externalWithoutConnection = config();
    const externalEntry = externalWithoutConnection.profiles[memoryProfileSpecExample.id];
    externalEntry.management.type = 'mem0';
    externalEntry.management.deployment = 'managed';
    expect(() => validateMemoryRuntimeConfig(externalWithoutConnection)).toThrow(
      'External Memory deployments require a connectionRef'
    );

    const ephemeralProduction = config();
    const managedEntry = ephemeralProduction.profiles[memoryProfileSpecExample.id];
    managedEntry.management.type = 'mem0';
    managedEntry.management.deployment = 'managed';
    managedEntry.management.connectionRef = 'memory.connection.managed';
    managedEntry.management.config = {
      mappingStoreRef: 'memory.mapping.in-memory',
      operationStoreRef: 'memory.operation.ephemeral',
    };
    expect(() => validateMemoryRuntimeConfig(ephemeralProduction)).toThrow(
      'Production Memory profiles require durable mapping and operation stores'
    );
  });
  it('rejects duplicate provider factory registration', () => {
    const factory = {
      id: 'duplicate',
      supports: () => true,
      create: () => Promise.reject(new Error('test factory must not be created')),
    };
    const registry = new MemoryManagementProviderRegistry().register(factory);
    expect(() => registry.register(factory)).toThrow(
      'Memory provider factory duplicate is already registered'
    );
  });
});
