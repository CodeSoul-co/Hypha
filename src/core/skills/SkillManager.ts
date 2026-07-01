import fs from 'fs/promises';
import path from 'path';
import { ISkill, SkillConfig, SkillContext, SkillResult, SkillTrigger } from './types';
import { loadAllSkillsFromDir, type ParsedSkillFile } from './parser';
import { logger } from '../../utils/logger';
import { getConfig } from '../../config';

/**
 * Default skill directories — relative to the project root unless the env
 * ORBIT_SKILLS_DIR adds extras. Override via the `skills.dirs` list in
 * config.yaml (or per-env) to control which paths are scanned at boot.
 */
const DEFAULT_BUILTIN_DIR = path.resolve(process.cwd(), 'src/core/skills/builtins');

/**
 * Built-in runtime handlers keyed by skill id. .md files provide the
 * description / frontmatter; the behaviour for each builtin id is
 * implemented in TypeScript here so it can use the same SkillContext /
 * SkillResult contract as before.
 *
 * User-installed skills (under ~/.orbit/skills/) are registered as
 * no-op skills whose `body` is exposed to the chat handler as a system
 * message — i.e. they are documentation/prompt skills, not executable
 * ones. Adding a new executable user-skill requires writing a `.skill.ts`
 * file in the user dir; the parser ignores anything that isn't `.md`.
 */
const BUILTIN_HANDLERS: Record<string, (context: SkillContext) => Promise<SkillResult>> = {
  'context-enrichment': async (ctx) => {
    const msg = ctx.currentMessage.content || '';
    const language = /[一-鿿]/.test(msg) ? 'zh' : 'en';
    return {
      success: true,
      shouldContinue: true,
      variables: {
        messageLength: msg.length,
        historyTurns: ctx.messages.length,
        language,
      },
    };
  },
  'intent-classification': async (ctx) => {
    const msg = ctx.currentMessage.content || '';
    const intents: Array<[string, RegExp]> = [
      ['help',     /\b(help|usage|how to|怎么|如何|帮助)\b/i],
      ['question', /\?|？|why|what|when|where|who|how/i],
      ['command',  /^\s*[\/!](\w+)/],
    ];
    let intent = 'chat';
    for (const [name, re] of intents) {
      if (re.test(msg)) { intent = name; break; }
    }
    return { success: true, shouldContinue: true, variables: { intent } };
  },
};

export interface RegisteredSkill {
  /** Parsed config from the .md frontmatter. */
  config: SkillConfig;
  /** Absolute path of the source .md file. */
  filePath: string;
  /** Markdown body — appended to the system prompt by the chat handler. */
  body: string;
  /** The runtime function. Falls back to a no-op for skills without a handler. */
  run: (context: SkillContext) => Promise<SkillResult>;
}

export class SkillManager {
  private skills: Map<string, RegisteredSkill> = new Map();
  private dirs: string[];

  constructor(opts?: { dirs?: string[] }) {
    // Precedence: explicit arg > env ORBIT_SKILLS_DIR (colon-separated) > config > builtins.
    const configDirs = (getConfig().skills as any).dirs as string[] | undefined;
    const envDirs = (process.env.ORBIT_SKILLS_DIR || '')
      .split(':').map((s) => s.trim()).filter(Boolean);
    const raw = [
      ...(opts?.dirs || []),
      ...envDirs,
      ...(configDirs || []),
      DEFAULT_BUILTIN_DIR,
    ];
    // Expand leading "~" to $HOME so the boot-time scan and the install
    // service agree on the install target.
    const home = require('os').homedir();
    this.dirs = raw.map((d) => d.startsWith('~/') ? home + d.slice(1) : d);
  }

  /** Where the manager scans for .md skill files. */
  getDirs(): string[] { return [...this.dirs]; }

  async initialize(): Promise<void> {
    for (const dir of this.dirs) {
      const parsed = await loadAllSkillsFromDir(dir);
      for (const skill of parsed) {
        this.register(skill);
      }
    }
    logger.info('SkillManager initialized', {
      skillCount: this.skills.size,
      dirs: this.dirs,
    });
  }

  async destroy(): Promise<void> {
    this.skills.clear();
    logger.info('SkillManager destroyed');
  }

  /**
   * Register a parsed .md skill. If a skill with the same id is already
   * registered we honour precedence: explicit `.register(skill)` after
   * initialize() wins, and on the first `register()` from .md a warning
   * is logged for duplicate ids across the scanned directories.
   */
  register(skill: ParsedSkillFile | { filePath: string; config: SkillConfig; body: string }): void {
    const handler = BUILTIN_HANDLERS[skill.config.id];
    const run: RegisteredSkill['run'] = handler
      ? (ctx) => handler(ctx)
      : async () => ({ success: true, shouldContinue: true });
    if (this.skills.has(skill.config.id)) {
      logger.warn(`Duplicate skill id "${skill.config.id}" — overwriting with ${skill.filePath}`);
    }
    this.skills.set(skill.config.id, {
      config: skill.config,
      filePath: skill.filePath,
      body: skill.body,
      run,
    });
    logger.info(`Skill loaded: ${skill.config.id} (${skill.config.name}) from ${path.basename(skill.filePath)}`);
  }

  async unregister(skillId: string): Promise<boolean> {
    return this.skills.delete(skillId);
  }

  getSkill(skillId: string): RegisteredSkill | null { return this.skills.get(skillId) || null; }
  getSkillConfig(skillId: string): SkillConfig | null { return this.skills.get(skillId)?.config || null; }
  getSkillBody(skillId: string): string | null { return this.skills.get(skillId)?.body || null; }

  listSkills(enabledOnly: boolean = false): SkillConfig[] {
    const list: SkillConfig[] = [];
    for (const s of this.skills.values()) {
      if (!enabledOnly || s.config.enabled) list.push(s.config);
    }
    return list.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Run all enabled skills whose trigger matches, in priority order.
   * Each skill's return value is folded into the shared context:
   *   - `variables` → merged into context.variables
   *   - `modifiedContent` → replaces the user message
   *   - `shouldContinue: false` → halts the pipeline
   */
  async executeSkills(context: SkillContext): Promise<SkillContext> {
    const sorted = Array.from(this.skills.values())
      .filter((s) => s.config.enabled)
      .sort((a, b) => b.config.priority - a.config.priority);

    let current = context;
    for (const skill of sorted) {
      if (!this.shouldTrigger(skill.config.triggers, current)) continue;
      try {
        logger.debug(`Executing skill: ${skill.config.id}`);
        const result = await skill.run(current);
        if (result.success) {
          if (result.variables) {
            current.variables = { ...current.variables, ...result.variables };
          }
          if (result.modifiedContent && current.currentMessage) {
            current.currentMessage.content = result.modifiedContent;
          }
        }
        if (!result.shouldContinue) {
          logger.debug(`Skill ${skill.config.id} stopped further processing`);
          break;
        }
      } catch (error) {
        logger.error(`Error executing skill ${skill.config.id}:`, error);
      }
    }
    return current;
  }

  private shouldTrigger(triggers: SkillTrigger[], context: SkillContext): boolean {
    for (const t of triggers) {
      switch (t.type) {
        case 'always':
          return true;
        case 'keyword':
          if (context.currentMessage.content.toLowerCase().includes(t.pattern.toLowerCase())) return true;
          break;
        case 'regex':
          try {
            if (new RegExp(t.pattern, 'i').test(context.currentMessage.content)) return true;
          } catch { logger.warn(`Invalid regex trigger: ${t.pattern}`); }
          break;
        case 'intent':
          if (context.variables?.intent === t.pattern) return true;
          break;
      }
    }
    return false;
  }
}

// Singleton instance
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

/** Re-exported for tests. */
export type { ParsedSkillFile } from './parser';

export default SkillManager;
