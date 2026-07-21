/** Governed Skill installation service. */
import crypto from 'crypto';
import dns from 'dns/promises';
import fs from 'fs/promises';
import net from 'net';
import os from 'os';
import path from 'path';
import axios from 'axios';
import { logger } from '../utils/logger';
import { getSkillManager, type RegisteredSkill } from '../core/skills/SkillManager';
import { loadSkillFile, parseSkillMarkdown } from '../core/skills/parser';
import { HTTP_STATUS } from '../constants';
import { AppError } from '../middleware/errorHandler';

const MAX_SKILL_BYTES = 512 * 1024;
const SKILL_ID_RE = /^[a-z0-9](?:[a-z0-9._-]{0,126}[a-z0-9])?$/;

export interface InstallInput {
  source: 'path' | 'url' | 'inline';
  path?: string;
  url?: string;
  content?: string;
  /** Retained for compatibility but never used as a filesystem path. */
  filename?: string;
  expectedSha256?: string;
  activate?: boolean;
}

export interface InstallResult {
  id: string;
  filePath: string;
  skill: RegisteredSkill['config'];
  sourceUrl?: string;
  contentHash: string;
  status: 'active' | 'quarantined';
}

function configuredList(name: string): string[] {
  return (process.env[name] ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

function getInstallDir(): string {
  const dirs = (() => {
    try {
      return getSkillManager().getDirs();
    } catch {
      return [];
    }
  })();
  const home = os.homedir();
  for (const directory of dirs) {
    const resolved = path.resolve(directory.replace(/^~/, home));
    if (isPathWithin(home, resolved)) return resolved;
  }
  return path.join(home, '.hypha', 'skills');
}

function getQuarantineDir(): string {
  return path.join(getInstallDir(), '.quarantine');
}

async function ensureDir(directory: string): Promise<void> {
  await fs.mkdir(directory, { recursive: true, mode: 0o700 });
}

function validateSkillId(id: string): string {
  if (!SKILL_ID_RE.test(id)) {
    throw new AppError(
      'INVALID_SKILL_ID',
      'Skill id must contain only lowercase letters, numbers, dots, underscores, or hyphens.',
      HTTP_STATUS.BAD_REQUEST
    );
  }
  return id;
}

function isPathWithin(root: string, candidate: string): boolean {
  const relative = path.relative(path.resolve(root), path.resolve(candidate));
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

async function confinedTarget(directory: string, filename: string): Promise<string> {
  await ensureDir(directory);
  const realDirectory = await fs.realpath(directory);
  const target = path.resolve(realDirectory, filename);
  if (!isPathWithin(realDirectory, target) || path.dirname(target) !== realDirectory) {
    throw new AppError(
      'SKILL_PATH_ESCAPE',
      'Skill target escapes the governed directory.',
      HTTP_STATUS.BAD_REQUEST
    );
  }
  return target;
}

function validateMarkdown(raw: string, originLabel: string): ReturnType<typeof parseSkillMarkdown> {
  if (Buffer.byteLength(raw, 'utf8') > MAX_SKILL_BYTES) {
    throw new AppError(
      'SKILL_TOO_LARGE',
      'Skill exceeds the 512 KiB limit.',
      HTTP_STATUS.BAD_REQUEST
    );
  }
  try {
    return parseSkillMarkdown(raw, originLabel);
  } catch (error) {
    throw new AppError('INVALID_SKILL', (error as Error).message, HTTP_STATUS.BAD_REQUEST);
  }
}

function sha256(raw: string): string {
  return crypto.createHash('sha256').update(raw, 'utf8').digest('hex');
}

function verifyExpectedHash(actual: string, expected?: string): void {
  if (!expected) return;
  if (!/^[a-f0-9]{64}$/i.test(expected) || actual !== expected.toLowerCase()) {
    throw new AppError(
      'SKILL_HASH_MISMATCH',
      'Skill content hash does not match expectedSha256.',
      HTTP_STATUS.BAD_REQUEST
    );
  }
}

function isForbiddenAddress(address: string): boolean {
  if (address === '::' || address === '::1' || address === '0.0.0.0') return true;
  if (
    address.toLowerCase().startsWith('fe80:') ||
    address.toLowerCase().startsWith('fc') ||
    address.toLowerCase().startsWith('fd')
  )
    return true;
  if (address.startsWith('::ffff:')) return isForbiddenAddress(address.slice(7));
  if (net.isIP(address) === 4) {
    const [a, b] = address.split('.').map(Number);
    return (
      a === 10 ||
      a === 127 ||
      a === 0 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 100 && b >= 64 && b <= 127) ||
      a >= 224
    );
  }
  return false;
}

async function validateRemoteUrl(value: string): Promise<URL> {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new AppError('INVALID_SKILL_URL', 'Skill URL is invalid.', HTTP_STATUS.BAD_REQUEST);
  }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) {
    throw new AppError(
      'INVALID_SKILL_URL',
      'Skill URL must use HTTPS without embedded credentials.',
      HTTP_STATUS.BAD_REQUEST
    );
  }
  const allowedHosts = new Set(
    configuredList('HYPHA_SKILL_URL_ALLOWLIST').map((host) => host.toLowerCase())
  );
  if (!allowedHosts.has(parsed.hostname.toLowerCase())) {
    throw new AppError(
      'SKILL_URL_NOT_ALLOWED',
      'Skill URL host is not allow-listed.',
      HTTP_STATUS.FORBIDDEN
    );
  }
  const addresses = await dns.lookup(parsed.hostname, { all: true, verbatim: true });
  if (!addresses.length || addresses.some(({ address }) => isForbiddenAddress(address))) {
    throw new AppError(
      'SKILL_URL_FORBIDDEN_ADDRESS',
      'Skill URL resolves to a forbidden address.',
      HTTP_STATUS.FORBIDDEN
    );
  }
  return parsed;
}

async function readLocalSource(value: string): Promise<string> {
  if (process.env.HYPHA_SKILL_ALLOW_LOCAL_PATHS !== 'true') {
    throw new AppError(
      'SKILL_PATH_SOURCE_DISABLED',
      'Server-side path installation is disabled.',
      HTTP_STATUS.FORBIDDEN
    );
  }
  const roots = configuredList('HYPHA_SKILL_LOCAL_ROOTS');
  if (!roots.length) {
    throw new AppError(
      'SKILL_PATH_ROOT_REQUIRED',
      'No trusted local Skill roots are configured.',
      HTTP_STATUS.FORBIDDEN
    );
  }
  const source = await fs.realpath(value);
  const realRoots = await Promise.all(roots.map((root) => fs.realpath(root)));
  if (!realRoots.some((root) => isPathWithin(root, source))) {
    throw new AppError(
      'SKILL_PATH_NOT_ALLOWED',
      'Skill path is outside configured trusted roots.',
      HTTP_STATUS.FORBIDDEN
    );
  }
  const stat = await fs.stat(source);
  if (!stat.isFile() || stat.size > MAX_SKILL_BYTES) {
    throw new AppError(
      'SKILL_PATH_INVALID',
      'Skill source must be a regular file up to 512 KiB.',
      HTTP_STATUS.BAD_REQUEST
    );
  }
  return fs.readFile(source, 'utf8');
}

async function readRemoteSource(value: string): Promise<string> {
  const parsed = await validateRemoteUrl(value);
  try {
    const response = await axios.get<string>(parsed.toString(), {
      responseType: 'text',
      timeout: 15_000,
      maxRedirects: 0,
      maxContentLength: MAX_SKILL_BYTES,
      maxBodyLength: MAX_SKILL_BYTES,
      validateStatus: (status) => status >= 200 && status < 300,
      headers: { Accept: 'text/markdown,text/plain;q=0.9' },
    });
    const contentType = String(response.headers['content-type'] ?? '').toLowerCase();
    if (
      contentType &&
      !contentType.includes('text/plain') &&
      !contentType.includes('text/markdown')
    ) {
      throw new Error(`unsupported content-type ${contentType}`);
    }
    return typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
  } catch (error) {
    throw new AppError(
      'FETCH_FAILED',
      `Failed to fetch approved Skill URL: ${(error as Error).message}`,
      HTTP_STATUS.BAD_REQUEST
    );
  }
}

async function assertNotInstalled(target: string, id: string): Promise<void> {
  try {
    await fs.access(target);
    throw new AppError(
      'SKILL_ALREADY_INSTALLED',
      `Skill "${id}" is already installed.`,
      HTTP_STATUS.CONFLICT
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return;
    throw error;
  }
}

export async function installSkill(input: InstallInput): Promise<InstallResult> {
  let raw: string;
  let originLabel: string;
  if (input.source === 'inline') {
    if (typeof input.content !== 'string' || !input.content.trim()) {
      throw new AppError(
        'VALIDATION_ERROR',
        'content is required for source=inline',
        HTTP_STATUS.BAD_REQUEST
      );
    }
    raw = input.content;
    originLabel = '<inline>';
  } else if (input.source === 'path') {
    if (typeof input.path !== 'string' || !input.path) {
      throw new AppError(
        'VALIDATION_ERROR',
        'path is required for source=path',
        HTTP_STATUS.BAD_REQUEST
      );
    }
    raw = await readLocalSource(input.path);
    originLabel = '<trusted-local-path>';
  } else if (input.source === 'url') {
    if (typeof input.url !== 'string' || !input.url) {
      throw new AppError(
        'VALIDATION_ERROR',
        'url is required for source=url',
        HTTP_STATUS.BAD_REQUEST
      );
    }
    raw = await readRemoteSource(input.url);
    originLabel = input.url;
  } else {
    throw new AppError(
      'VALIDATION_ERROR',
      `unsupported source: ${input.source}`,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const parsed = validateMarkdown(raw, originLabel);
  const id = validateSkillId(parsed.config.id);
  const contentHash = sha256(raw);
  verifyExpectedHash(contentHash, input.expectedSha256);

  const activeTarget = await confinedTarget(getInstallDir(), `${id}.md`);
  await assertNotInstalled(activeTarget, id);
  const externalSource = input.source !== 'inline';
  const canActivate = input.activate === true && (!externalSource || Boolean(input.expectedSha256));
  const activeInline = input.source === 'inline' && input.activate !== false;
  const status = canActivate || activeInline ? 'active' : 'quarantined';
  const target =
    status === 'active'
      ? activeTarget
      : await confinedTarget(getQuarantineDir(), `${id}.${contentHash}.md`);

  await fs.writeFile(target, raw, { encoding: 'utf8', mode: 0o600, flag: 'wx' });
  logger.info('Skill installation recorded', {
    event: 'skill.lifecycle',
    action: 'install',
    id,
    contentHash,
    status,
    source: input.source,
  });
  return {
    id,
    filePath: target,
    skill: parsed.config,
    sourceUrl: input.source === 'url' ? input.url : undefined,
    contentHash,
    status,
  };
}

export async function activateQuarantinedSkill(
  idInput: string,
  contentHash: string
): Promise<InstallResult> {
  const id = validateSkillId(idInput);
  if (!/^[a-f0-9]{64}$/.test(contentHash)) {
    throw new AppError(
      'INVALID_SKILL_HASH',
      'A lowercase SHA-256 content hash is required.',
      HTTP_STATUS.BAD_REQUEST
    );
  }
  const source = await confinedTarget(getQuarantineDir(), `${id}.${contentHash}.md`);
  const raw = await fs.readFile(source, 'utf8');
  verifyExpectedHash(sha256(raw), contentHash);
  const parsed = validateMarkdown(raw, '<quarantine>');
  if (parsed.config.id !== id) {
    throw new AppError(
      'SKILL_ID_MISMATCH',
      'Quarantined Skill id does not match activation request.',
      HTTP_STATUS.BAD_REQUEST
    );
  }
  const target = await confinedTarget(getInstallDir(), `${id}.md`);
  await assertNotInstalled(target, id);
  await fs.writeFile(target, raw, { encoding: 'utf8', mode: 0o600, flag: 'wx' });
  await fs.unlink(source);
  logger.info('Skill activation recorded', {
    event: 'skill.lifecycle',
    action: 'activate',
    id,
    contentHash,
  });
  return { id, filePath: target, skill: parsed.config, contentHash, status: 'active' };
}

export async function uninstallSkill(idInput: string): Promise<boolean> {
  const id = validateSkillId(idInput);
  const target = await confinedTarget(getInstallDir(), `${id}.md`);
  try {
    await fs.unlink(target);
    logger.info('Skill uninstall recorded', { event: 'skill.lifecycle', action: 'uninstall', id });
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false;
    throw error;
  }
}

export async function listInstalledSkills(): Promise<
  Array<{ id: string; filePath: string; name: string }>
> {
  const directory = getInstallDir();
  let entries: string[];
  try {
    entries = await fs.readdir(directory);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw error;
  }
  const installed: Array<{ id: string; filePath: string; name: string }> = [];
  for (const filename of entries) {
    if (!filename.endsWith('.md')) continue;
    const filePath = await confinedTarget(directory, filename);
    try {
      const parsed = await loadSkillFile(filePath);
      installed.push({ id: parsed.config.id, filePath, name: parsed.config.name });
    } catch (error) {
      logger.warn('Skipping invalid installed Skill', { filePath, error });
    }
  }
  return installed;
}

export async function reloadSkills(
  manager: ReturnType<typeof getSkillManager> = getSkillManager()
): Promise<void> {
  await manager.destroy();
  await manager.initialize();
}
