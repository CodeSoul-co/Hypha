/**
 * Parser for .md skill files.
 *
 * Format (Anthropic-style):
 *   ---
 *   id: <string>
 *   name: <string>
 *   description: <string>
 *   version: <semver>
 *   priority: <int>          # higher runs first
 *   enabled: <bool>          # default true
 *   triggers:                # at least one
 *     - type: always         # or keyword / regex / intent
 *       pattern: <string>   # keyword/regex body, or intent name
 *   ---
 *
 *   # Markdown body
 *
 *   Body is the documentation / prompt context that gets attached to the
 *   skill's SkillContext as `currentSkillBody`. Downstream code (the chat
 *   handler, future RAG integrations) can pass it to the LLM as a system
 *   message if it wants the model to "know" the skill's intent.
 */
import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import { logger } from '../../utils/logger';
import type { SkillConfig, SkillTrigger } from './types';

export interface ParsedSkillFile {
  /** Absolute or relative file path. */
  filePath: string;
  /** Slug derived from the filename, used as a fallback id. */
  slug: string;
  /** Parsed frontmatter config. */
  config: SkillConfig;
  /** Markdown body (everything after the second `---`). */
  body: string;
}

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

/**
 * Parse a skill .md file. Throws on missing frontmatter, missing required
 * fields, or invalid triggers. The on-disk file is the source of truth —
 * if it's malformed the load fails loudly rather than silently dropping.
 */
export function parseSkillMarkdown(raw: string, filePath: string): ParsedSkillFile {
  const m = raw.match(FRONTMATTER_RE);
  if (!m) {
    throw new Error(`Skill file missing YAML frontmatter: ${filePath}`);
  }
  const [, frontmatterRaw, body] = m;

  let parsed: any;
  try {
    parsed = yaml.load(frontmatterRaw);
  } catch (err) {
    throw new Error(`Skill frontmatter is not valid YAML (${filePath}): ${(err as Error).message}`);
  }
  if (!parsed || typeof parsed !== 'object') {
    throw new Error(`Skill frontmatter is empty or not a mapping: ${filePath}`);
  }

  // Required fields. We surface all missing ones at once so a single
  // bad file doesn't generate N rounds of "fix and rerun".
  const required: Array<keyof SkillConfig> = ['id', 'name', 'description', 'version', 'priority'];
  const missing = required.filter((k) => parsed[k] === undefined || parsed[k] === null || parsed[k] === '');
  if (missing.length) {
    throw new Error(`Skill ${filePath} missing required frontmatter fields: ${missing.join(', ')}`);
  }
  if (!Array.isArray(parsed.triggers) || parsed.triggers.length === 0) {
    throw new Error(`Skill ${filePath} must declare at least one trigger in frontmatter 'triggers:'`);
  }
  // Validate each trigger shape — keyword/regex require a non-empty pattern,
  // intent requires a name. We don't restrict the pattern to a specific
  // syntax here; the engine will interpret it.
  for (const [i, t] of parsed.triggers.entries()) {
    if (!t || typeof t !== 'object' || !t.type) {
      throw new Error(`Skill ${filePath} trigger #${i} is missing 'type'`);
    }
    if ((t.type === 'keyword' || t.type === 'regex' || t.type === 'intent') &&
        (typeof t.pattern !== 'string' || t.pattern.length === 0)) {
      throw new Error(`Skill ${filePath} trigger #${i} (type=${t.type}) needs a non-empty 'pattern'`);
    }
  }

  const config: SkillConfig = {
    id: String(parsed.id),
    name: String(parsed.name),
    description: String(parsed.description),
    version: String(parsed.version),
    priority: Number(parsed.priority) || 0,
    enabled: parsed.enabled === undefined ? true : Boolean(parsed.enabled),
    triggers: parsed.triggers as SkillTrigger[],
  };

  return {
    filePath,
    slug: path.basename(filePath, path.extname(filePath)),
    config,
    body: (body || '').trim(),
  };
}

/** Read + parse a single skill file. */
export async function loadSkillFile(filePath: string): Promise<ParsedSkillFile> {
  const raw = await fs.readFile(filePath, 'utf-8');
  return parseSkillMarkdown(raw, filePath);
}

/**
 * Find all .md skill files in a directory (non-recursive). Returns absolute
 * paths sorted by filename so the registration order is deterministic across
 * restarts.
 */
export async function listSkillFiles(dir: string): Promise<string[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch (err: any) {
    if (err.code === 'ENOENT') return [];   // dir missing is fine
    throw err;
  }
  return entries
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => path.join(dir, f));
}

/**
 * Load every .md skill in `dir`, parse it, and return the parsed files.
 * Errors on individual files are logged but don't abort the whole load —
 * one bad file shouldn't take down the rest of the skill pipeline.
 */
export async function loadAllSkillsFromDir(dir: string): Promise<ParsedSkillFile[]> {
  const files = await listSkillFiles(dir);
  const out: ParsedSkillFile[] = [];
  for (const file of files) {
    try {
      out.push(await loadSkillFile(file));
    } catch (err) {
      logger.error(`Failed to load skill from ${file}:`, err);
    }
  }
  return out;
}
