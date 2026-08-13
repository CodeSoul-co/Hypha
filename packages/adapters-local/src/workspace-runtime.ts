import { execFile } from 'child_process';
import { randomUUID } from 'node:crypto';
import type { BigIntStats, Dirent } from 'node:fs';
import { constants as fsConstants } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import type {
  ProviderHealth,
  WorkspaceRuntimeConfig,
  WorkspaceRuntimePort,
  WorkspaceRuntimeRequest,
} from '@codesoul-co/hypha-tools';
import { WorkspaceControlPlaneGuard } from './workspace-control-plane-guard';
import {
  hasSingleLinkRegularFileIdentity,
  sameSingleLinkRegularFileIdentity,
} from './local-workspace-file-identity';

const executionEnvironmentAllowList = ['PATH', 'TMPDIR', 'TMP', 'TEMP', 'LANG', 'LC_ALL'] as const;
const windowsIdentityEnvironmentVariables = [
  'HOME',
  'USERPROFILE',
  'HOMEDRIVE',
  'HOMEPATH',
  'USERNAME',
  'USERDOMAIN',
  'LOGONSERVER',
] as const;

export class LocalWorkspaceRuntime implements WorkspaceRuntimePort {
  private readonly workingDirectory: string;
  private readonly readRoots: string[];
  private readonly writeRoots: string[];
  private readonly executeRoots: string[];
  private readonly controlPlaneGuard = new WorkspaceControlPlaneGuard();

  constructor(private readonly config: WorkspaceRuntimeConfig) {
    this.workingDirectory = path.resolve(config.workingDirectory);
    this.readRoots = this.resolveRoots(config.readPaths);
    this.writeRoots = this.resolveRoots(config.writePaths);
    this.executeRoots = this.resolveRoots(config.executePaths);
  }

  async initialize(): Promise<void> {
    const workspaceRoots = Array.from(
      new Set([this.workingDirectory, ...this.readRoots, ...this.writeRoots, ...this.executeRoots])
    );
    workspaceRoots.forEach((root) => this.controlPlaneGuard.assertWorkspaceRoot(root));
    await Promise.all(this.writeRoots.map((root) => fs.mkdir(root, { recursive: true })));
  }

  async execute(request: WorkspaceRuntimeRequest): Promise<unknown> {
    if (!request.path.trim()) throw new Error('path is required');
    if (request.path === '.' && request.operation !== 'list') {
      throw new Error('Workspace root marker is only valid for list operations');
    }
    const absolutePath = this.resolvePath(request.path);
    switch (request.operation) {
      case 'read':
        return this.readFile(absolutePath, request.path);
      case 'list':
        return this.listDirectory(absolutePath, request.path);
      case 'write':
        return this.writeFile(absolutePath, request);
      case 'execute':
        return this.executeFile(absolutePath, request);
    }
  }

  async health(): Promise<ProviderHealth> {
    try {
      await fs.access(this.workingDirectory, fsConstants.R_OK);
      return {
        status: 'healthy',
        checkedAt: new Date().toISOString(),
        message: this.config.execution.enabled
          ? 'Trusted local Workspace is available; command execution is explicitly enabled without OS isolation.'
          : 'Trusted local Workspace is available; command execution is disabled.',
        details: this.healthDetails(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        checkedAt: new Date().toISOString(),
        message: error instanceof Error ? error.message : String(error),
        details: this.healthDetails(),
      };
    }
  }

  private async writeFile(
    absolutePath: string,
    request: WorkspaceRuntimeRequest
  ): Promise<unknown> {
    if (typeof request.content !== 'string') throw new Error('content is required for write');
    await this.assertWritablePath(absolutePath);
    if (request.executable) {
      await this.assertCandidateWithinRoots(absolutePath, this.executeRoots, 'execute');
    }
    const parent = path.dirname(absolutePath);
    await fs.mkdir(parent, { recursive: true });
    await this.assertExistingPathAllowed(parent, this.writeRoots, 'write');
    const parentIdentity = await this.workspaceDirectoryIdentity(
      parent,
      'Workspace write parent must be a stable directory'
    );
    const temporaryPath = path.join(
      parent,
      `.${path.basename(absolutePath)}.hypha-write-${randomUUID()}.tmp`
    );
    let handle: fs.FileHandle | undefined;
    try {
      handle = await fs.open(temporaryPath, 'wx', request.executable ? 0o700 : 0o600);
      const opened = await handle.stat({ bigint: true });
      const openedPath = await fs.lstat(temporaryPath, { bigint: true });
      if (!sameSingleLinkRegularFileIdentity(opened, openedPath)) {
        throw new Error('Workspace write target changed during preparation');
      }

      await handle.writeFile(request.content, { encoding: 'utf-8' });
      if (request.executable && process.platform !== 'win32') await handle.chmod(0o700);
      await handle.sync();
      const writtenHandle = await handle.stat({ bigint: true });
      const writtenPath = await fs.lstat(temporaryPath, { bigint: true });
      if (
        !sameSingleLinkRegularFileIdentity(writtenHandle, writtenPath) ||
        writtenHandle.size !== BigInt(Buffer.byteLength(request.content, 'utf-8'))
      ) {
        throw new Error('Workspace write target changed during preparation');
      }
      await this.assertWorkspaceDirectoryIdentity(parent, parentIdentity);

      await handle.close();
      handle = undefined;
      await fs.rename(temporaryPath, absolutePath);
      await this.assertExistingPathAllowed(absolutePath, this.writeRoots, 'write');
      const published = await fs.lstat(absolutePath, { bigint: true });
      if (!this.sameWorkspaceFileObjectIdentity(writtenPath, published)) {
        throw new Error('Workspace write target changed during publish');
      }
      const finalPublished = await fs.lstat(absolutePath, { bigint: true });
      if (!sameSingleLinkRegularFileIdentity(published, finalPublished)) {
        throw new Error('Workspace write target changed during publish');
      }
      await this.assertWorkspaceDirectoryIdentity(parent, parentIdentity);
    } finally {
      await handle?.close().catch(() => undefined);
      await fs.rm(temporaryPath, { force: true }).catch(() => undefined);
    }
    return {
      path: request.path,
      bytesWritten: Buffer.byteLength(request.content, 'utf-8'),
      executable: Boolean(request.executable),
    };
  }

  private async readFile(absolutePath: string, requestedPath: string): Promise<unknown> {
    await this.assertExistingPathAllowed(absolutePath, this.readRoots, 'read');
    const before = await fs.lstat(absolutePath, { bigint: true });
    if (!hasSingleLinkRegularFileIdentity(before)) {
      throw new Error('Workspace read source must be a single-link regular file');
    }
    const canonicalBefore = await fs.realpath(absolutePath);
    const handle = await fs.open(absolutePath, 'r');
    try {
      const opened = await handle.stat({ bigint: true });
      const pathAfterOpen = await fs.lstat(absolutePath, { bigint: true });
      if (
        !sameSingleLinkRegularFileIdentity(before, opened) ||
        !sameSingleLinkRegularFileIdentity(before, pathAfterOpen)
      ) {
        throw new Error('Workspace source changed during read');
      }

      const content = await handle.readFile({ encoding: 'utf-8' });
      const finalHandleStat = await handle.stat({ bigint: true });
      const finalPathStat = await fs.lstat(absolutePath, { bigint: true });
      const canonicalAfter = await fs.realpath(absolutePath);
      if (
        canonicalAfter !== canonicalBefore ||
        !sameSingleLinkRegularFileIdentity(before, finalHandleStat) ||
        !sameSingleLinkRegularFileIdentity(before, finalPathStat)
      ) {
        throw new Error('Workspace source changed during read');
      }
      return { path: requestedPath, content };
    } finally {
      await handle.close().catch(() => undefined);
    }
  }

  private async listDirectory(absolutePath: string, requestedPath: string): Promise<unknown> {
    await this.assertExistingPathAllowed(absolutePath, this.readRoots, 'read');
    const before = await this.workspaceDirectoryIdentity(
      absolutePath,
      'Workspace list source must be a stable directory'
    );
    const canonicalBefore = await fs.realpath(absolutePath);
    const firstEntries = await fs.readdir(absolutePath, { withFileTypes: true });
    const secondEntries = await fs.readdir(absolutePath, { withFileTypes: true });
    const after = await this.workspaceDirectoryIdentity(
      absolutePath,
      'Workspace list source must be a stable directory'
    );
    const canonicalAfter = await fs.realpath(absolutePath);
    if (
      canonicalAfter !== canonicalBefore ||
      !this.sameWorkspaceDirectorySnapshot(before, after) ||
      this.workspaceDirectoryEntriesSignature(firstEntries) !==
        this.workspaceDirectoryEntriesSignature(secondEntries)
    ) {
      throw new Error('Workspace directory changed during list');
    }
    return {
      path: requestedPath,
      entries: secondEntries
        .filter(
          (entry) =>
            !this.controlPlaneGuard.isProtectedResolvedPath(path.join(absolutePath, entry.name))
        )
        .map((entry) => ({
          name: entry.name,
          type: entry.isDirectory() ? 'dir' : entry.isFile() ? 'file' : 'other',
        })),
    };
  }

  private async executeFile(
    absolutePath: string,
    request: WorkspaceRuntimeRequest
  ): Promise<unknown> {
    if (!this.config.execution.enabled) throw new Error('Workspace execution is disabled');
    await this.assertExistingPathAllowed(absolutePath, this.executeRoots, 'execute');
    if (process.platform !== 'win32') await fs.access(absolutePath, fsConstants.X_OK);
    const executableBefore = await fs.lstat(absolutePath, { bigint: true });
    if (!hasSingleLinkRegularFileIdentity(executableBefore)) {
      throw new Error('Workspace executable must be a single-link regular file');
    }
    const executableCanonical = await fs.realpath(absolutePath);
    const args = request.args ?? [];
    if (args.some((arg) => typeof arg !== 'string')) {
      throw new Error('args must be an array of strings');
    }
    const cwd = request.cwd?.trim() ? this.resolvePath(request.cwd) : this.workingDirectory;
    await this.assertExistingPathAllowed(
      cwd,
      [...this.readRoots, ...this.writeRoots],
      'use as cwd'
    );
    const cwdBefore = await this.workspaceDirectoryIdentity(
      cwd,
      'Workspace execution cwd must be a stable directory'
    );
    const requestedTimeout =
      typeof request.timeoutMs === 'number' && Number.isFinite(request.timeoutMs)
        ? Math.max(1, Math.floor(request.timeoutMs))
        : this.config.execution.timeoutMs;
    const timeoutMs = Math.min(requestedTimeout, this.config.execution.timeoutMs);
    const invocation = this.resolveExecutable(absolutePath, args);
    const executableHandle = await fs.open(absolutePath, 'r');
    try {
      await this.assertWorkspaceExecutableIdentity(
        absolutePath,
        executableCanonical,
        executableBefore,
        executableHandle
      );
      await this.assertWorkspaceDirectoryObjectIdentity(
        cwd,
        cwdBefore,
        'Workspace execution cwd changed before launch'
      );
      const result = await this.runExecutable(
        invocation.command,
        invocation.args,
        cwd,
        timeoutMs,
        request.signal
      );
      return { path: request.path, ...result, timeoutMs };
    } finally {
      try {
        await this.assertWorkspaceExecutableIdentity(
          absolutePath,
          executableCanonical,
          executableBefore,
          executableHandle
        );
        await this.assertWorkspaceDirectoryObjectIdentity(
          cwd,
          cwdBefore,
          'Workspace execution cwd changed during execution'
        );
      } finally {
        await executableHandle.close().catch(() => undefined);
      }
    }
  }

  private resolveExecutable(
    executablePath: string,
    args: string[]
  ): { command: string; args: string[] } {
    if (path.extname(executablePath).toLowerCase() === '.js') {
      return { command: process.execPath, args: [executablePath, ...args] };
    }
    return { command: executablePath, args };
  }

  private runExecutable(
    command: string,
    args: string[],
    cwd: string,
    timeoutMs: number,
    signal?: AbortSignal
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    return new Promise((resolve, reject) => {
      execFile(
        command,
        args,
        {
          cwd,
          encoding: 'utf-8',
          timeout: timeoutMs,
          maxBuffer: this.config.execution.maxOutputBytes,
          shell: false,
          signal,
          env: this.executionEnvironment(),
        },
        (error, stdout, stderr) => {
          if (error) {
            const details = [error.message, stderr.trim()].filter(Boolean).join(': ');
            reject(new Error(`Executable failed: ${details}`));
            return;
          }
          resolve({ stdout, stderr, exitCode: 0 });
        }
      );
    });
  }

  private resolveRoots(roots: string[]): string[] {
    return Array.from(new Set(roots.map((root) => path.resolve(root))));
  }

  private resolvePath(requestedPath: string): string {
    this.controlPlaneGuard.assertInputPath(requestedPath);
    return path.isAbsolute(requestedPath)
      ? path.resolve(requestedPath)
      : path.resolve(this.workingDirectory, requestedPath);
  }

  private async assertWritablePath(candidate: string): Promise<void> {
    await this.assertCandidateWithinRoots(candidate, this.writeRoots, 'write');
    await this.assertNoWorkspaceLink(candidate, this.writeRoots);
    const realAncestor = await fs.realpath(await this.findExistingAncestor(candidate));
    const realRoots = await this.existingRealRoots(this.writeRoots);
    if (!realRoots.some((root) => this.isWithin(realAncestor, root))) {
      throw new Error(`Path is outside configured write paths: ${candidate}`);
    }
    this.controlPlaneGuard.assertResolvedPath(candidate);
    this.controlPlaneGuard.assertResolvedPath(realAncestor);
  }

  private async assertCandidateWithinRoots(
    candidate: string,
    roots: string[],
    permission: string
  ): Promise<void> {
    if (!roots.some((root) => this.isWithin(candidate, root))) {
      throw new Error(`Path is outside configured ${permission} paths: ${candidate}`);
    }
  }

  private async assertExistingPathAllowed(
    candidate: string,
    roots: string[],
    permission: string
  ): Promise<void> {
    await this.assertCandidateWithinRoots(candidate, roots, permission);
    await this.assertNoWorkspaceLink(candidate, roots);
    const realCandidate = await fs.realpath(candidate);
    const realRoots = await this.existingRealRoots(roots);
    if (!realRoots.some((root) => this.isWithin(realCandidate, root))) {
      throw new Error(`Path is outside configured ${permission} paths: ${candidate}`);
    }
    this.controlPlaneGuard.assertResolvedPath(candidate);
    this.controlPlaneGuard.assertResolvedPath(realCandidate);
  }

  private async assertNoWorkspaceLink(candidate: string, roots: string[]): Promise<void> {
    const matchingRoots = roots.filter((root) => this.isWithin(candidate, root));
    for (const root of matchingRoots) {
      if (!(await this.containsWorkspaceLink(root, candidate))) return;
    }
    throw new Error('Workspace paths cannot traverse symbolic links or junctions');
  }

  private async containsWorkspaceLink(root: string, candidate: string): Promise<boolean> {
    const relative = path.relative(root, candidate);
    const segments = relative ? relative.split(path.sep) : [];
    let current = root;
    for (const segment of ['', ...segments]) {
      if (segment) current = path.join(current, segment);
      try {
        if ((await fs.lstat(current)).isSymbolicLink()) return true;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false;
        throw error;
      }
    }
    return false;
  }

  private async workspaceDirectoryIdentity(
    directory: string,
    invalidMessage: string
  ): Promise<BigIntStats> {
    const identity = await fs.lstat(directory, { bigint: true });
    if (!identity.isDirectory() || identity.isSymbolicLink()) {
      throw new Error(invalidMessage);
    }
    return identity;
  }

  private async assertWorkspaceDirectoryIdentity(
    directory: string,
    expected: BigIntStats
  ): Promise<void> {
    await this.assertWorkspaceDirectoryObjectIdentity(
      directory,
      expected,
      'Workspace write parent changed during publish'
    );
  }

  private async assertWorkspaceDirectoryObjectIdentity(
    directory: string,
    expected: BigIntStats,
    changedMessage: string
  ): Promise<void> {
    const current = await this.workspaceDirectoryIdentity(directory, changedMessage);
    if (
      current.dev !== expected.dev ||
      current.ino !== expected.ino ||
      current.mode !== expected.mode
    ) {
      throw new Error(changedMessage);
    }
  }

  private async assertWorkspaceExecutableIdentity(
    executablePath: string,
    expectedCanonical: string,
    expected: BigIntStats,
    handle: fs.FileHandle
  ): Promise<void> {
    const [opened, current, canonical] = await Promise.all([
      handle.stat({ bigint: true }),
      fs.lstat(executablePath, { bigint: true }),
      fs.realpath(executablePath),
    ]);
    if (
      canonical !== expectedCanonical ||
      !sameSingleLinkRegularFileIdentity(expected, opened) ||
      !sameSingleLinkRegularFileIdentity(expected, current)
    ) {
      throw new Error('Workspace executable changed during execution');
    }
  }

  private sameWorkspaceDirectorySnapshot(before: BigIntStats, after: BigIntStats): boolean {
    return (
      before.isDirectory() &&
      after.isDirectory() &&
      !before.isSymbolicLink() &&
      !after.isSymbolicLink() &&
      before.dev === after.dev &&
      before.ino === after.ino &&
      before.mode === after.mode &&
      // Directory link counts are platform/filesystem-dependent; stability matters, not nlink === 1.
      before.nlink === after.nlink &&
      before.size === after.size &&
      before.mtimeNs === after.mtimeNs &&
      before.ctimeNs === after.ctimeNs
    );
  }

  private workspaceDirectoryEntriesSignature(entries: Dirent[]): string {
    return JSON.stringify(
      entries
        .map((entry) => ({
          name: entry.name,
          type: entry.isDirectory()
            ? 'dir'
            : entry.isFile()
              ? 'file'
              : entry.isSymbolicLink()
                ? 'symlink'
                : 'other',
        }))
        .sort((left, right) => left.name.localeCompare(right.name))
    );
  }

  private sameWorkspaceFileObjectIdentity(before: BigIntStats, after: BigIntStats): boolean {
    return (
      hasSingleLinkRegularFileIdentity(before) &&
      hasSingleLinkRegularFileIdentity(after) &&
      before.dev === after.dev &&
      before.ino === after.ino &&
      before.size === after.size &&
      before.mode === after.mode
    );
  }

  private async existingRealRoots(roots: string[]): Promise<string[]> {
    const resolved = await Promise.all(
      roots.map(async (root) => {
        try {
          return await fs.realpath(root);
        } catch {
          return null;
        }
      })
    );
    return resolved.filter((root): root is string => root !== null);
  }

  private async findExistingAncestor(candidate: string): Promise<string> {
    let current = candidate;
    while (current.length > 0) {
      try {
        await fs.lstat(current);
        return current;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
        const parent = path.dirname(current);
        if (parent === current) throw error;
        current = parent;
      }
    }
    throw new Error(`Unable to resolve an existing ancestor for path: ${candidate}`);
  }

  private isWithin(candidate: string, root: string): boolean {
    const relative = path.relative(root, candidate);
    return (
      relative === '' ||
      (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))
    );
  }

  private executionEnvironment(): NodeJS.ProcessEnv {
    const environment = Object.fromEntries(
      executionEnvironmentAllowList
        .filter((name) => process.env[name] !== undefined)
        .map((name) => [name, process.env[name]])
    );
    if (process.platform === 'win32') {
      // Node/Windows restores selected identity variables even with a custom
      // environment block, so mask their values rather than relying on omission.
      for (const name of windowsIdentityEnvironmentVariables) environment[name] = '';
    }
    return environment;
  }

  private healthDetails(): Record<string, unknown> {
    return {
      profile: 'trusted-workspace',
      trustBoundary: 'trusted_local_development_only',
      commandExecution: this.config.execution.enabled ? 'explicitly_enabled' : 'disabled',
      isolation: {
        filesystem: 'path_confinement_only',
        process: false,
        network: false,
        cpu: false,
        memory: false,
        disk: false,
        pids: false,
      },
    };
  }
}
