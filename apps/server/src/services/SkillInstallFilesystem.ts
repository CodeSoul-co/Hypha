import crypto from 'crypto';
import { constants as fsConstants } from 'fs';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { HTTP_STATUS } from '../constants';
import { AppError } from '../middleware/errorHandler';

const MAX_SKILL_BYTES = 512 * 1024;

interface FileIdentity {
  dev: bigint;
  ino: bigint;
  size: bigint;
  birthtimeMs: bigint;
}

interface DirectoryIdentity extends FileIdentity {
  canonicalPath: string;
}

export interface GovernedSkillRoots {
  data: DirectoryIdentity;
  quarantine: DirectoryIdentity;
  staging: DirectoryIdentity;
}

export async function resolveGovernedSkillRoots(): Promise<GovernedSkillRoots> {
  const home = os.homedir();
  const configured = path.resolve(
    (process.env.HYPHA_SKILL_DATA_ROOT ?? path.join(home, '.hypha', 'skills')).replace(/^~/, home)
  );
  await ensurePrivateDirectory(configured);
  const data = await directoryIdentity(configured);
  const sourceTree = await canonicalExistingPath(process.cwd());
  if (isPathWithin(sourceTree, data.canonicalPath)) {
    throw new AppError(
      'SKILL_DATA_ROOT_IN_SOURCE_TREE',
      'Skill installation data root must be outside the repository source tree.',
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }

  const quarantinePath = governedChildPath(data.canonicalPath, '.quarantine');
  const stagingPath = governedChildPath(data.canonicalPath, '.staging');
  await Promise.all([ensurePrivateDirectory(quarantinePath), ensurePrivateDirectory(stagingPath)]);
  const [quarantine, staging] = await Promise.all([
    directoryIdentity(quarantinePath),
    directoryIdentity(stagingPath),
  ]);
  assertDirectoryWithin(data, quarantine);
  assertDirectoryWithin(data, staging);
  return { data, quarantine, staging };
}

export async function readTrustedLocalSkill(
  requestedPath: string,
  configuredRoots: string[]
): Promise<{ raw: string; canonicalPath: string }> {
  const canonicalRoots = await Promise.all(configuredRoots.map(canonicalExistingPath));
  const canonicalPath = await canonicalExistingPath(requestedPath);
  if (!canonicalRoots.some((root) => isPathWithin(root, canonicalPath))) {
    throw new AppError(
      'SKILL_PATH_NOT_ALLOWED',
      'Skill path is outside configured trusted roots.',
      HTTP_STATUS.FORBIDDEN
    );
  }

  const handle = await openReadNoFollow(canonicalPath);
  try {
    const before = identity(await handle.stat({ bigint: true }));
    if (before.size > BigInt(MAX_SKILL_BYTES)) {
      throw invalidLocalSource();
    }
    const pathStat = await fs.stat(canonicalPath, { bigint: true });
    if (!pathStat.isFile() || !sameIdentity(before, identity(pathStat))) {
      throw invalidLocalSource();
    }
    const raw = (await handle.readFile({ encoding: 'utf8' })) as string;
    if (Buffer.byteLength(raw, 'utf8') > MAX_SKILL_BYTES) throw invalidLocalSource();

    const canonicalAfter = await canonicalExistingPath(requestedPath);
    const after = identity(await fs.stat(canonicalAfter, { bigint: true }));
    if (canonicalAfter !== canonicalPath || !sameIdentity(before, after)) {
      throw new AppError(
        'SKILL_SOURCE_IDENTITY_CHANGED',
        'Skill source identity changed while it was being read.',
        HTTP_STATUS.CONFLICT
      );
    }
    return { raw, canonicalPath };
  } finally {
    await handle.close();
  }
}

export async function installVerifiedSkillFile(input: {
  roots: GovernedSkillRoots;
  destination: 'active' | 'quarantine';
  filename: string;
  raw: string;
  verify(raw: string): void;
}): Promise<string> {
  const destination = input.destination === 'active' ? input.roots.data : input.roots.quarantine;
  await assertDirectoryStable(input.roots.data);
  await assertDirectoryStable(destination);
  await assertDirectoryStable(input.roots.staging);

  const target = governedChildPath(destination.canonicalPath, input.filename);
  await assertMissing(target);
  const stage = governedChildPath(
    input.roots.staging.canonicalPath,
    `${input.filename}.${crypto.randomUUID()}.tmp`
  );
  let stagedIdentity: FileIdentity | undefined;
  let promoted = false;
  try {
    const handle = await fs.open(stage, 'wx', 0o600);
    try {
      await handle.writeFile(input.raw, { encoding: 'utf8' });
      await handle.sync();
      stagedIdentity = identity(await handle.stat({ bigint: true }));
      if (stagedIdentity.size > BigInt(MAX_SKILL_BYTES)) {
        throw new AppError(
          'SKILL_TOO_LARGE',
          'Skill exceeds the 512 KiB limit.',
          HTTP_STATUS.BAD_REQUEST
        );
      }
    } finally {
      await handle.close();
    }
    input.verify(await readAndVerifyIdentity(stage, stagedIdentity));

    await assertDirectoryStable(input.roots.data);
    await assertDirectoryStable(destination);
    await assertDirectoryStable(input.roots.staging);
    await assertMissing(target);
    await fs.rename(stage, target);
    promoted = true;

    await assertDirectoryStable(input.roots.data);
    await assertDirectoryStable(destination);
    const canonicalTarget = await canonicalExistingPath(target);
    if (canonicalTarget !== target || !isPathWithin(destination.canonicalPath, canonicalTarget)) {
      throw pathEscape();
    }
    const finalIdentity = identity(await fs.stat(canonicalTarget, { bigint: true }));
    if (!sameIdentity(stagedIdentity, finalIdentity)) {
      throw new AppError(
        'SKILL_TARGET_IDENTITY_CHANGED',
        'Skill target identity changed during installation.',
        HTTP_STATUS.CONFLICT
      );
    }
    input.verify(await readAndVerifyIdentity(canonicalTarget, finalIdentity));
    return canonicalTarget;
  } catch (error) {
    if (promoted && stagedIdentity) {
      await unlinkIfIdentityMatches(target, stagedIdentity);
    } else {
      await fs.unlink(stage).catch(ignoreMissing);
    }
    throw error;
  }
}

export async function resolveExistingGovernedFile(
  directory: DirectoryIdentity,
  filename: string
): Promise<string> {
  await assertDirectoryStable(directory);
  const target = governedChildPath(directory.canonicalPath, filename);
  const canonical = await canonicalExistingPath(target);
  if (canonical !== target || !isPathWithin(directory.canonicalPath, canonical)) throw pathEscape();
  return canonical;
}

export async function readExistingGovernedFile(
  directory: DirectoryIdentity,
  filename: string
): Promise<{ raw: string; canonicalPath: string; identity: FileIdentity }> {
  await assertDirectoryStable(directory);
  const canonicalPath = await resolveExistingGovernedFile(directory, filename);
  const handle = await openReadNoFollow(canonicalPath);
  try {
    const before = identity(await handle.stat({ bigint: true }));
    if (before.size > BigInt(MAX_SKILL_BYTES)) throw invalidLocalSource();
    const raw = (await handle.readFile({ encoding: 'utf8' })) as string;
    await assertDirectoryStable(directory);
    const canonicalAfter = await canonicalExistingPath(canonicalPath);
    const after = identity(await fs.stat(canonicalAfter, { bigint: true }));
    if (
      canonicalAfter !== canonicalPath ||
      !sameIdentity(before, after) ||
      !isPathWithin(directory.canonicalPath, canonicalAfter)
    ) {
      throw new AppError(
        'SKILL_TARGET_IDENTITY_CHANGED',
        'Skill target identity changed while it was being read.',
        HTTP_STATUS.CONFLICT
      );
    }
    return { raw, canonicalPath, identity: before };
  } finally {
    await handle.close();
  }
}

export async function assertDirectoryStable(directory: DirectoryIdentity): Promise<void> {
  const current = await directoryIdentity(directory.canonicalPath);
  if (
    current.canonicalPath !== directory.canonicalPath ||
    !sameIdentity(directory, current)
  ) {
    throw new AppError(
      'SKILL_DIRECTORY_IDENTITY_CHANGED',
      'Governed Skill directory identity changed during the operation.',
      HTTP_STATUS.CONFLICT
    );
  }
}

export function governedChildPath(directory: string, filename: string): string {
  if (
    !filename ||
    filename === '.' ||
    filename === '..' ||
    filename.includes('/') ||
    filename.includes('\\') ||
    filename.includes('\0')
  ) {
    throw pathEscape();
  }
  const target = path.resolve(directory, filename);
  if (!isPathWithin(directory, target) || path.dirname(target) !== path.resolve(directory)) {
    throw pathEscape();
  }
  return target;
}

export function isPathWithin(root: string, candidate: string): boolean {
  const relative = path.relative(path.resolve(root), path.resolve(candidate));
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

export function isPortablePathWithin(
  root: string,
  candidate: string,
  style: 'posix' | 'win32'
): boolean {
  const api = style === 'win32' ? path.win32 : path.posix;
  const relative = api.relative(api.resolve(root), api.resolve(candidate));
  return relative === '' || (!relative.startsWith('..') && !api.isAbsolute(relative));
}

async function canonicalExistingPath(value: string): Promise<string> {
  return path.resolve(await fs.realpath(path.resolve(value)));
}

async function ensurePrivateDirectory(directory: string): Promise<void> {
  await fs.mkdir(directory, { recursive: true, mode: 0o700 });
}

async function directoryIdentity(directory: string): Promise<DirectoryIdentity> {
  const canonicalPath = await canonicalExistingPath(directory);
  const stat = await fs.stat(canonicalPath, { bigint: true });
  if (!stat.isDirectory()) {
    throw new AppError(
      'SKILL_PATH_INVALID',
      'Governed Skill root must be a directory.',
      HTTP_STATUS.BAD_REQUEST
    );
  }
  return { canonicalPath, ...identity(stat) };
}

function assertDirectoryWithin(root: DirectoryIdentity, child: DirectoryIdentity): void {
  if (!isPathWithin(root.canonicalPath, child.canonicalPath)) throw pathEscape();
}

async function openReadNoFollow(filePath: string) {
  const noFollow = typeof fsConstants.O_NOFOLLOW === 'number' ? fsConstants.O_NOFOLLOW : 0;
  return fs.open(filePath, fsConstants.O_RDONLY | noFollow);
}

async function readAndVerifyIdentity(
  filePath: string,
  expected: FileIdentity
): Promise<string> {
  const handle = await openReadNoFollow(filePath);
  try {
    const actual = identity(await handle.stat({ bigint: true }));
    if (!sameIdentity(expected, actual)) {
      throw new AppError(
        'SKILL_TARGET_IDENTITY_CHANGED',
        'Skill file identity changed while it was being verified.',
        HTTP_STATUS.CONFLICT
      );
    }
    return (await handle.readFile({ encoding: 'utf8' })) as string;
  } finally {
    await handle.close();
  }
}

async function assertMissing(target: string): Promise<void> {
  try {
    await fs.lstat(target);
    throw new AppError(
      'SKILL_ALREADY_INSTALLED',
      'Skill target already exists.',
      HTTP_STATUS.CONFLICT
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return;
    throw error;
  }
}

async function unlinkIfIdentityMatches(target: string, expected: FileIdentity): Promise<void> {
  try {
    const actual = identity(await fs.stat(target, { bigint: true }));
    if (sameIdentity(expected, actual)) await fs.unlink(target);
  } catch (error) {
    ignoreMissing(error as NodeJS.ErrnoException);
  }
}

function identity(stat: {
  dev: bigint;
  ino: bigint;
  size: bigint;
  birthtimeMs: bigint;
}): FileIdentity {
  return {
    dev: stat.dev,
    ino: stat.ino,
    size: stat.size,
    birthtimeMs: stat.birthtimeMs,
  };
}

function sameIdentity(left: FileIdentity, right: FileIdentity): boolean {
  if (left.ino !== 0n && right.ino !== 0n) {
    return left.dev === right.dev && left.ino === right.ino;
  }
  return (
    left.dev === right.dev &&
    left.size === right.size &&
    left.birthtimeMs === right.birthtimeMs
  );
}

function invalidLocalSource(): AppError {
  return new AppError(
    'SKILL_PATH_INVALID',
    'Skill source must be a regular file up to 512 KiB.',
    HTTP_STATUS.BAD_REQUEST
  );
}

function pathEscape(): AppError {
  return new AppError(
    'SKILL_PATH_ESCAPE',
    'Skill target escapes the governed directory.',
    HTTP_STATUS.BAD_REQUEST
  );
}

function ignoreMissing(error: NodeJS.ErrnoException): void {
  if (error.code !== 'ENOENT') throw error;
}
