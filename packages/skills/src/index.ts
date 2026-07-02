import { z, type ZodType } from 'zod';
import {
  defineSpecSchema,
  exportSpecJsonSchemas,
  jsonSchemaSchema,
  specMetadataSchema,
  versionedSpecSchema,
  type JsonSchema,
  type SpecMetadata,
  type VersionedSpec,
} from '@hypha/core';

export interface SkillRef {
  id: string;
  version?: string;
}

export interface SkillActivationPolicy {
  mode: 'always' | 'keyword' | 'intent' | 'manual';
  patterns?: string[];
}

export interface SkillAssetRef {
  path: string;
  type: 'reference' | 'script' | 'asset';
  loadPolicy?: 'frontmatter_only' | 'on_activation' | 'never';
}

export interface SkillSpec extends VersionedSpec, SpecMetadata {
  id: string;
  version: string;
  name?: string;
  description: string;
  activationPolicy?: SkillActivationPolicy;
  instructions?: string;
  references?: SkillAssetRef[];
  scripts?: SkillAssetRef[];
  assets?: SkillAssetRef[];
  allowedTools?: string[];
  requiredTools?: string[];
  requiredMCPServers?: string[];
  memoryAccessPolicy?: string;
  sideEffectPolicy?: string;
  contextBudget?: number;
  inputSchema?: JsonSchema;
  outputContract?: JsonSchema;
  evaluationCases?: string[];
  provenance?: Record<string, unknown>;
  trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
}

export interface SkillResolutionContext {
  agentSkillRefs: SkillRef[];
  intent?: string;
  inputText?: string;
  allowedSkills?: string[];
}

export interface ResolvedSkill {
  spec: SkillSpec;
  loadedInstructions?: string;
  loadedReferences: SkillAssetRef[];
}

export class SkillRegistry {
  private readonly skills = new Map<string, SkillSpec>();

  register(skill: SkillSpec): void {
    this.skills.set(skill.id, skill);
  }

  get(skillId: string): SkillSpec | null {
    return this.skills.get(skillId) ?? null;
  }

  list(): SkillSpec[] {
    return Array.from(this.skills.values());
  }
}

export class SkillResolver {
  constructor(private readonly registry: SkillRegistry) {}

  resolve(context: SkillResolutionContext): ResolvedSkill[] {
    const allowed = context.allowedSkills ? new Set(context.allowedSkills) : null;
    return context.agentSkillRefs
      .map((ref) => this.registry.get(ref.id))
      .filter((skill): skill is SkillSpec => Boolean(skill))
      .filter((skill) => !allowed || allowed.has(skill.id))
      .filter((skill) => shouldActivate(skill, context))
      .map((skill) => ({
        spec: skill,
        loadedInstructions: skill.instructions,
        loadedReferences: [
          ...(skill.references ?? []),
          ...(skill.scripts ?? []),
          ...(skill.assets ?? []),
        ].filter((asset) => asset.loadPolicy === 'on_activation'),
      }));
  }
}

function shouldActivate(skill: SkillSpec, context: SkillResolutionContext): boolean {
  const policy = skill.activationPolicy;
  if (!policy || policy.mode === 'always') return true;
  if (policy.mode === 'manual') return false;
  if (policy.mode === 'intent') {
    return Boolean(context.intent && policy.patterns?.includes(context.intent));
  }
  const input = context.inputText?.toLowerCase() ?? '';
  return Boolean(policy.patterns?.some((pattern) => input.includes(pattern.toLowerCase())));
}

export const skillRefSchema = z.object({
  id: z.string().min(1),
  version: z.string().optional(),
});

export const skillActivationPolicySchema = z.object({
  mode: z.enum(['always', 'keyword', 'intent', 'manual']),
  patterns: z.array(z.string()).optional(),
});

export const skillAssetRefSchema = z.object({
  path: z.string().min(1),
  type: z.enum(['reference', 'script', 'asset']),
  loadPolicy: z.enum(['frontmatter_only', 'on_activation', 'never']).optional(),
});

export const skillSpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    description: z.string().min(1),
    activationPolicy: skillActivationPolicySchema.optional(),
    instructions: z.string().optional(),
    references: z.array(skillAssetRefSchema).optional(),
    scripts: z.array(skillAssetRefSchema).optional(),
    assets: z.array(skillAssetRefSchema).optional(),
    allowedTools: z.array(z.string()).optional(),
    requiredTools: z.array(z.string()).optional(),
    requiredMCPServers: z.array(z.string()).optional(),
    memoryAccessPolicy: z.string().optional(),
    sideEffectPolicy: z.string().optional(),
    contextBudget: z.number().int().positive().optional(),
    inputSchema: jsonSchemaSchema.optional(),
    outputContract: jsonSchemaSchema.optional(),
    evaluationCases: z.array(z.string()).optional(),
    provenance: z.record(z.unknown()).optional(),
    trustLevel: z.enum(['trusted', 'reviewed', 'untrusted']).optional(),
  }) satisfies ZodType<SkillSpec>;

export const skillSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'description'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    activationPolicy: { type: 'object' },
    instructions: { type: 'string' },
    references: { type: 'array', items: { type: 'object' } },
    scripts: { type: 'array', items: { type: 'object' } },
    assets: { type: 'array', items: { type: 'object' } },
    allowedTools: { type: 'array', items: { type: 'string' } },
    requiredTools: { type: 'array', items: { type: 'string' } },
    requiredMCPServers: { type: 'array', items: { type: 'string' } },
    memoryAccessPolicy: { type: 'string' },
    sideEffectPolicy: { type: 'string' },
    contextBudget: { type: 'number' },
    inputSchema: { type: 'object' },
    outputContract: { type: 'object' },
    evaluationCases: { type: 'array', items: { type: 'string' } },
    provenance: { type: 'object' },
    trustLevel: { enum: ['trusted', 'reviewed', 'untrusted'] },
  },
  additionalProperties: false,
};

export const skillSpecExample: SkillSpec = {
  id: 'skill.context-enrichment',
  version: '0.0.0',
  name: 'Context Enrichment',
  description: 'Adds relevant context before reasoning.',
  activationPolicy: { mode: 'always' },
  allowedTools: ['tool.search'],
  contextBudget: 2000,
  inputSchema: { type: 'object' },
  outputContract: { type: 'object' },
  trustLevel: 'reviewed',
};

export const skillSpecDefinition = defineSpecSchema<SkillSpec>({
  id: 'SkillSpec',
  zod: skillSpecSchema,
  jsonSchema: skillSpecJsonSchema,
  example: skillSpecExample,
});

export const skillSpecDefinitions = [skillSpecDefinition] as const;
export const skillSpecJsonSchemas = exportSpecJsonSchemas(skillSpecDefinitions);

export function validateSkillSpec(input: unknown): SkillSpec {
  return skillSpecDefinition.parse(input);
}
