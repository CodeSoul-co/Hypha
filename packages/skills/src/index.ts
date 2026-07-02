import type { JsonSchema, SpecMetadata, VersionedSpec } from '@hypha/core';

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
