import path from 'path';
import os from 'os';
import {
  DefaultSkillPolicy,
  SkillContextLoader,
  SkillRegistry,
  SkillSelector,
  loadSkillMarkdownFile,
  type LoadedSkillContext,
  type SkillRef,
  type SkillResolutionContext,
  type SkillSpec,
} from '@hypha/skills';
import type { SkillConfig, SkillContext, SkillResult, SkillTrigger } from './types';
import { listSkillFiles, type ParsedSkillFile } from './parser';
import { logger } from '../../utils/logger';
import { getConfig } from '../../config';

const DEFAULT_BUILTIN_DIR = path.resolve(process.cwd(), 'apps/server/src/core/skills/builtins');

export interface RegisteredSkill {
  config: SkillConfig;
  filePath: string;
  body: string;
  spec: SkillSpec;
  /** Legacy workflow bridge. Prompt-only Skills are never executed as hidden handlers. */
  run: (context: SkillContext) => Promise<SkillResult>;
}

export interface ResolveServerSkillsInput {
  agentSkillRefs: SkillRef[];
  inputText?: string;
  intent?: string;
  allowedSkills?: string[];
  requiredSkills?: string[];
  manualSkillIds?: string[];
  availableToolRefs?: string[];
  metadata?: Record<string, unknown>;
}

/**
 * Server composition adapter for the package-level Skill pipeline.
 * It owns no second selector or execution loop.
 */
export class SkillManager {
  private skills = new Map<string, RegisteredSkill>();
  private registry = new SkillRegistry();
  private readonly dirs: string[];

  constructor(opts?: { dirs?: string[] }) {
    const configDirs = getConfig().skills.dirs;
    const separator = process.platform === 'win32' ? ';' : ':';
    const envDirs = (process.env.HYPHA_SKILLS_DIR || '')
      .split(separator)
      .map((entry) => entry.trim())
      .filter(Boolean);
    const home = os.homedir();
    this.dirs = [...(opts?.dirs ?? []), ...envDirs, ...(configDirs ?? []), DEFAULT_BUILTIN_DIR].map(
      (directory) => path.resolve(directory.replace(/^~/, home))
    );
  }

  getDirs(): string[] {
    return [...this.dirs];
  }

  getRegistry(): SkillRegistry {
    return this.registry;
  }

  async initialize(): Promise<void> {
    this.skills.clear();
    this.registry = new SkillRegistry();
    for (const directory of this.dirs) {
      for (const filePath of await listSkillFiles(directory)) {
        try {
          const parsed = await loadSkillMarkdownFile(filePath);
          this.registerPackageSkill(parsed.spec, filePath);
        } catch (error) {
          logger.error(`Failed to load governed Skill from ${filePath}:`, error);
        }
      }
    }
    logger.info('SkillManager initialized with package Skill registry', {
      skillCount: this.skills.size,
      dirs: this.dirs,
    });
  }

  async destroy(): Promise<void> {
    this.skills.clear();
    this.registry = new SkillRegistry();
    logger.info('SkillManager destroyed');
  }

  register(skill: ParsedSkillFile): void {
    this.registerPackageSkill(legacyParsedSkillToSpec(skill), skill.filePath);
  }

  private registerPackageSkill(spec: SkillSpec, filePath: string): void {
    const previous = this.skills.get(spec.id);
    if (previous) logger.warn(`Duplicate Skill id "${spec.id}"; replacing ${previous.filePath}`);
    this.registry.register(spec);
    this.skills.set(spec.id, {
      config: packageSpecToLegacyConfig(spec),
      filePath,
      body: spec.instructions ?? '',
      spec,
      run: async () => ({
        success: false,
        shouldContinue: false,
        error: `Skill ${spec.id} is procedural context and cannot execute as a hidden workflow handler.`,
      }),
    });
  }

  async unregister(skillId: string): Promise<boolean> {
    const removed = this.skills.delete(skillId);
    if (removed) await this.rebuildRegistry();
    return removed;
  }

  async update(
    skillId: string,
    patch: { enabled?: boolean; priority?: number }
  ): Promise<RegisteredSkill | null> {
    const current = this.skills.get(skillId);
    if (!current) return null;
    const spec: SkillSpec = {
      ...current.spec,
      enabled: patch.enabled ?? current.spec.enabled,
      priority: patch.priority ?? current.spec.priority,
    };
    const updated: RegisteredSkill = {
      ...current,
      spec,
      config: packageSpecToLegacyConfig(spec),
    };
    this.skills.set(skillId, updated);
    await this.rebuildRegistry();
    return updated;
  }

  getSkill(skillId: string): RegisteredSkill | null {
    return this.skills.get(skillId) ?? null;
  }

  getSkillConfig(skillId: string): SkillConfig | null {
    return this.skills.get(skillId)?.config ?? null;
  }

  getSkillBody(skillId: string): string | null {
    return this.skills.get(skillId)?.body ?? null;
  }

  listSkills(enabledOnly = false): SkillConfig[] {
    return Array.from(this.skills.values())
      .filter((skill) => !enabledOnly || skill.config.enabled)
      .map((skill) => skill.config)
      .sort((left, right) => right.priority - left.priority || left.id.localeCompare(right.id));
  }

  async resolveSkills(input: ResolveServerSkillsInput): Promise<LoadedSkillContext[]> {
    const context: SkillResolutionContext = { ...input };
    const selection = new SkillSelector(this.registry).select(context);
    const loaded: LoadedSkillContext[] = [];
    for (const selected of selection.selected) {
      const decision = await new DefaultSkillPolicy({ requireRegisteredTools: true }).evaluate({
        selection: selected,
        context,
      });
      if (!decision.allowed) {
        if (input.requiredSkills?.includes(selected.spec.id)) {
          throw new Error(decision.reason ?? `Required Skill ${selected.spec.id} was denied.`);
        }
        continue;
      }
      loaded.push(
        await new SkillContextLoader().load({ selection: selected, policyDecision: decision })
      );
    }
    assertRequiredSkills(input.requiredSkills ?? [], loaded, selection.rejected);
    return loaded;
  }

  private async rebuildRegistry(): Promise<void> {
    const registry = new SkillRegistry();
    for (const skill of this.skills.values()) registry.register(skill.spec);
    this.registry = registry;
  }
}

function legacyParsedSkillToSpec(skill: ParsedSkillFile): SkillSpec {
  return {
    id: skill.config.id,
    version: skill.config.version,
    name: skill.config.name,
    description: skill.config.description,
    enabled: skill.config.enabled,
    priority: skill.config.priority,
    activationPolicy: activationFromLegacyTriggers(skill.config.triggers),
    instructions: skill.body,
    provenance: { source: 'legacy-local-skill', filePath: skill.filePath },
    trustLevel: 'reviewed',
  };
}

function activationFromLegacyTriggers(triggers: SkillTrigger[]): SkillSpec['activationPolicy'] {
  if (triggers.some((trigger) => trigger.type === 'always')) return { mode: 'always' };
  const first = triggers[0];
  if (!first) return { mode: 'manual' };
  return {
    mode: first.type,
    patterns: triggers
      .filter((trigger) => trigger.type === first.type)
      .map((trigger) => trigger.pattern),
  };
}

function packageSpecToLegacyConfig(spec: SkillSpec): SkillConfig {
  const activation = spec.activationPolicy ?? { mode: 'manual' as const };
  let triggers: SkillTrigger[];
  if (activation.mode === 'always') triggers = [{ type: 'always', pattern: '' }];
  else if (activation.mode === 'manual') triggers = [];
  else {
    const type: SkillTrigger['type'] = activation.mode;
    triggers = (activation.patterns ?? []).map((pattern) => ({ type, pattern }));
  }
  return {
    id: spec.id,
    name: spec.name ?? spec.id,
    description: spec.description,
    version: spec.version,
    enabled: spec.enabled !== false,
    triggers,
    priority: spec.priority ?? 0,
  };
}

function assertRequiredSkills(
  required: string[],
  loaded: LoadedSkillContext[],
  rejected: Array<{ skillId: string; reason: string }>
): void {
  const active = new Set(loaded.map((skill) => skill.id));
  const missing = required.filter((skillId) => !active.has(skillId));
  if (!missing.length) return;
  const reasons = rejected
    .filter((entry) => missing.includes(entry.skillId))
    .map((entry) => `${entry.skillId}: ${entry.reason}`);
  throw new Error(`Required Skills failed closed: ${reasons.join('; ') || missing.join(', ')}`);
}

let skillManagerInstance: SkillManager | null = null;

export function getSkillManager(): SkillManager {
  if (!skillManagerInstance) skillManagerInstance = new SkillManager();
  return skillManagerInstance;
}

export async function initializeSkillManager(): Promise<SkillManager> {
  const manager = getSkillManager();
  await manager.initialize();
  return manager;
}

export async function destroySkillManager(): Promise<void> {
  if (skillManagerInstance) {
    await skillManagerInstance.destroy();
    skillManagerInstance = null;
  }
}

export type { ParsedSkillFile } from './parser';
export default SkillManager;
