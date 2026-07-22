import type { JsonSchema } from '@hypha/core';
import { z, type ZodType } from 'zod';
import {
  memoryContractJsonSchemas,
  memoryManagementProviderSpecExample,
  memoryProfileSpecExample,
} from './profile-contract';
import {
  memoryRuntimeConfigSchema,
  memoryRuntimeProfileSchema,
  type MemoryRuntime,
  type MemoryRuntimeConfig,
  type MemoryRuntimeFactory,
  type MemoryRuntimeProfile,
} from './memory-runtime-factory';

export interface CanonicalMemoryRuntimeConfig extends MemoryRuntimeConfig {
  schemaVersion: '1.0';
}

export interface MemoryRuntimeReferenceResolver {
  resolve(
    reference: string,
    kind: 'connection' | 'secret' | 'environment' | 'dependency'
  ): Promise<unknown>;
}

export interface LoadedCanonicalMemoryRuntimeConfig {
  config: MemoryRuntimeConfig;
  references: ReadonlyMap<string, unknown>;
}

export const canonicalMemoryRuntimeConfigSchema: ZodType<CanonicalMemoryRuntimeConfig> = z
  .object({
    schemaVersion: z.literal('1.0'),
    activeProfile: z.string().min(1),
    profiles: z.record(z.string().min(1), memoryRuntimeProfileSchema),
  })
  .strict()
  .superRefine((document, context) => {
    const result = memoryRuntimeConfigSchema.safeParse({
      activeProfile: document.activeProfile,
      profiles: document.profiles,
    });
    if (!result.success) {
      for (const issue of result.error.issues) {
        context.addIssue({ ...issue, path: issue.path });
      }
    }
  });

const runtimeProfileJsonSchema: JsonSchema = {
  type: 'object',
  required: ['profile', 'management'],
  properties: {
    profile: memoryContractJsonSchemas.MemoryProfileSpec,
    management: memoryContractJsonSchemas.MemoryManagementProviderSpec,
  },
  additionalProperties: false,
};

export const canonicalMemoryRuntimeConfigJsonSchema: JsonSchema = {
  type: 'object',
  required: ['schemaVersion', 'activeProfile', 'profiles'],
  properties: {
    schemaVersion: { enum: ['1.0'] },
    activeProfile: { type: 'string', minLength: 1 },
    profiles: {
      type: 'object',
      additionalProperties: runtimeProfileJsonSchema,
    },
  },
  additionalProperties: false,
};

export const canonicalMemoryRuntimeConfigExample: CanonicalMemoryRuntimeConfig = {
  schemaVersion: '1.0',
  activeProfile: memoryProfileSpecExample.id,
  profiles: {
    [memoryProfileSpecExample.id]: {
      profile: memoryProfileSpecExample,
      management: {
        ...memoryManagementProviderSpecExample,
        capabilities: {
          ...memoryManagementProviderSpecExample.capabilities,
          summarize: false,
          consolidate: false,
          decay: false,
          reinforce: false,
          graphRelations: false,
        },
      },
    },
  },
};

export class CanonicalMemoryRuntimeLoader {
  constructor(private readonly resolver: MemoryRuntimeReferenceResolver) {}

  async load(input: unknown): Promise<LoadedCanonicalMemoryRuntimeConfig> {
    const document = canonicalMemoryRuntimeConfigSchema.parse(input);
    const config: MemoryRuntimeConfig = {
      activeProfile: document.activeProfile,
      profiles: document.profiles,
    };
    const selected = config.profiles[config.activeProfile];
    const references = new Map<string, unknown>();
    for (const reference of collectReferences(selected)) {
      if (references.has(reference.value)) continue;
      references.set(reference.value, await this.resolver.resolve(reference.value, reference.kind));
    }
    return { config, references };
  }

  async create(factory: MemoryRuntimeFactory, input: unknown): Promise<MemoryRuntime> {
    const loaded = await this.load(input);
    return factory.create(loaded.config, loaded.references);
  }
}

function collectReferences(runtime: MemoryRuntimeProfile): Array<{
  value: string;
  kind: 'connection' | 'secret' | 'environment' | 'dependency';
}> {
  const references: Array<{
    value: string;
    kind: 'connection' | 'secret' | 'environment' | 'dependency';
  }> = [];
  if (runtime.management.connectionRef) {
    references.push({ value: runtime.management.connectionRef, kind: 'connection' });
  }
  collectConfigReferences(runtime.management.config, references);
  return references;
}

function collectConfigReferences(
  value: unknown,
  references: Array<{
    value: string;
    kind: 'connection' | 'secret' | 'environment' | 'dependency';
  }>,
  key = ''
): void {
  if (typeof value === 'string') {
    if (/Env$/u.test(key)) references.push({ value, kind: 'environment' });
    else if (/Ref$/u.test(key)) {
      references.push({
        value,
        kind: /(?:credential|secret|token|key)/iu.test(key) ? 'secret' : 'dependency',
      });
    }
    return;
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) return;
  for (const [nestedKey, nested] of Object.entries(value)) {
    collectConfigReferences(nested, references, nestedKey);
  }
}
