/**
 * Skill install / uninstall / list service.
 *
 * The install target is the first writable dir in the SkillManager scan list
 * (typically `~/.orbit/skills/`) so user-installed skills take precedence
 * over the bundled builtins. All operations work with the on-disk .md file
 * format — there's no separate database; the file IS the record.
 */
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import axios from 'axios';
import { logger } from '../utils/logger';
import { getSkillManager, type RegisteredSkill } from '../core/skills/SkillManager';
import { loadSkillFile, parseSkillMarkdown } from '../core/skills/parser';
import { HTTP_STATUS } from '../constants';
import { AppError } from '../middleware/errorHandler';

export interface InstallInput {
  source: 'path' | 'url' | 'inline';
  path?: string;        // for source=path — local file path on the SERVER
  url?: string;         // for source=url — http(s) URL
  content?: string;     // for source=inline — raw .md body
  filename?: string;    // optional, used to name the saved file (defaults to <id>.md)
}

export interface InstallResult {
  id: string;
  filePath: string;
  skill: RegisteredSkill['config'];
  /** Set when source=url — the URL the skill was fetched from. */
  sourceUrl?: string;
}

/**
 * The first user-writable skill dir. We use the first entry of the manager's
 * dir list; builtins dir (last) is read-only so it's skipped. Falls back to
 * ~/.orbit/skills if the manager hasn't been initialised yet.
 */
function getInstallDir(): string {
  const dirs = (() => {
    try { return getSkillManager().getDirs(); } catch { return []; }
  })();
  // The user dir is the one inside $HOME; builtins live under the project
  // cwd and should never be the install target.
  const home = os.homedir();
  for (const d of dirs) {
    const resolved = d.replace(/^~/, home);
    if (resolved.startsWith(home)) return resolved;
  }
  // Fallback: ~/.orbit/skills (the conventional default in config.yaml).
  return path.join(home, '.orbit', 'skills');
}

async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true, mode: 0o700 });
}

function inferFilename(input: InstallInput, id: string): string {
  if (input.filename) return input.filename.endsWith('.md') ? input.filename : `${input.filename}.md`;
  return `${id}.md`;
}

/**
 * Verify the payload is a parseable skill .md. Throws AppError on failure so
 * the route handler returns 400 with a useful message instead of a 500.
 */
function validateMarkdown(raw: string, originLabel: string): void {
  try {
    parseSkillMarkdown(raw, originLabel);
  } catch (err) {
    throw new AppError('INVALID_SKILL', (err as Error).message, HTTP_STATUS.BAD_REQUEST);
  }
}

export async function installSkill(input: InstallInput): Promise<InstallResult> {
  let raw = '';
  let originLabel = '';
  if (input.source === 'inline') {
    if (typeof input.content !== 'string' || !input.content.trim()) {
      throw new AppError('VALIDATION_ERROR', 'content is required for source=inline', HTTP_STATUS.BAD_REQUEST);
    }
    raw = input.content;
    originLabel = input.filename || '<inline>';
  } else if (input.source === 'path') {
    if (typeof input.path !== 'string' || !input.path) {
      throw new AppError('VALIDATION_ERROR', 'path is required for source=path', HTTP_STATUS.BAD_REQUEST);
    }
    raw = await fs.readFile(input.path, 'utf-8');
    originLabel = input.path;
  } else if (input.source === 'url') {
    if (typeof input.url !== 'string' || !input.url) {
      throw new AppError('VALIDATION_ERROR', 'url is required for source=url', HTTP_STATUS.BAD_REQUEST);
    }
    try {
      const r = await axios.get<string>(input.url, { responseType: 'text', timeout: 15_000 });
      raw = typeof r.data === 'string' ? r.data : JSON.stringify(r.data);
    } catch (err: any) {
      throw new AppError('FETCH_FAILED', `Failed to fetch ${input.url}: ${err.message}`, HTTP_STATUS.BAD_REQUEST);
    }
    originLabel = input.url;
  } else {
    throw new AppError('VALIDATION_ERROR', `unsupported source: ${input.source}`, HTTP_STATUS.BAD_REQUEST);
  }

  validateMarkdown(raw, originLabel);
  const parsed = parseSkillMarkdown(raw, originLabel);
  // Reject duplicate ids against already-installed skills, to avoid silent
  // overwrites. Users can `uninstall` first or pass `?force=true` later if
  // we add that.
  const dir = getInstallDir();
  const target = path.join(dir, inferFilename(input, parsed.config.id));
  try {
    await fs.access(target);
    throw new AppError('SKILL_ALREADY_INSTALLED',
      `Skill "${parsed.config.id}" is already installed at ${target}; uninstall first.`,
      HTTP_STATUS.CONFLICT);
  } catch (err: any) {
    if (err && err.code === 'ENOENT') {
      // good — file does not exist
    } else if (err instanceof AppError) {
      throw err;
    } else {
      throw err;
    }
  }

  await ensureDir(dir);
  logger.info(`SkillInstaller: writing to ${target} (installDir resolved from dirs: ${JSON.stringify(getSkillManager().getDirs())})`);
  await fs.writeFile(target, raw, { mode: 0o644 });
  logger.info(`Skill installed: ${parsed.config.id} → ${target}`);

  return {
    id: parsed.config.id,
    filePath: target,
    skill: parsed.config,
    sourceUrl: input.source === 'url' ? input.url : undefined,
  };
}

export async function uninstallSkill(id: string): Promise<boolean> {
  const dir = getInstallDir();
  const target = path.join(dir, `${id}.md`);
  try {
    await fs.unlink(target);
    logger.info(`Skill uninstalled: ${id} (${target})`);
    return true;
  } catch (err: any) {
    if (err && err.code === 'ENOENT') return false;
    throw err;
  }
}

export async function listInstalledSkills(): Promise<Array<{ id: string; filePath: string; name: string }>> {
  const dir = getInstallDir();
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch (err: any) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
  const out: Array<{ id: string; filePath: string; name: string }> = [];
  for (const f of entries) {
    if (!f.endsWith('.md')) continue;
    const filePath = path.join(dir, f);
    try {
      const parsed = await loadSkillFile(filePath);
      out.push({ id: parsed.config.id, filePath, name: parsed.config.name });
    } catch (err) {
      logger.warn(`Skipping invalid skill file ${filePath}:`, err);
    }
  }
  return out;
}

/**
 * Re-scan every configured skills dir and rebuild the registry. Cheap;
 * skills are small .md files. Used by `POST /skills/reload` and by tests.
 */
export async function reloadSkills(mgr: ReturnType<typeof getSkillManager> = getSkillManager()): Promise<void> {
  await mgr.destroy();
  await mgr.initialize();
}
