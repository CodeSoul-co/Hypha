import { execFile } from 'child_process';
import { constants as fsConstants } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import type {
  ProviderHealth,
  WorkspaceRuntimeConfig,
  WorkspaceRuntimePort,
  WorkspaceRuntimeRequest,
} from '@hypha/tools';

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

  constructor(private readonly config: WorkspaceRuntimeConfig) {
    this.workingDirectory = path.resolve(config.workingDirectory);
    this.readRoots = this.resolveRoots(config.readPaths);
    this.writeRoots = this.resolveRoots(config.writePaths);
    this.executeRoots = this.resolveRoots(config.executePaths);
  }

  async initialize(): Promise<void> {
    await Promise.all(this.writeRoots.map((root) => fs.mkdir(root, { recursive: true })));
  }

  async execute(request: WorkspaceRuntimeRequest): Promise<unknown> {
    if (!request.path.trim()) throw new Error('path is required');
    const absolutePath = this.resolvePath(request.path);
    switch (request.operation) {
      case 'read':
        await this.assertExistingPathAllowed(absolutePath, this.readRoots, 'read');
        return { path: request.path, content: await fs.readFile(absolutePath, 'utf-8') };
      case 'list': {
        await this.assertExistingPathAllowed(absolutePath, this.readRoots, 'read');
        const entries = await fs.readdir(absolutePath, { withFileTypes: true });
        return {
          path: request.path,
          entries: entries.map((entry) => ({
            name: entry.name,
            type: entry.isDirectory() ? 'dir' : entry.isFile() ? 'file' : 'other',
          })),
        };
      }
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
    await fs.mkdir(path.dirname(absolutePath), { recursive: true });
    await fs.writeFile(absolutePath, request.content, 'utf-8');
    if (request.executable && process.platform !== 'win32') await fs.chmod(absolutePath, 0o700);
    return {
      path: request.path,
      bytesWritten: Buffer.byteLength(request.content, 'utf-8'),
      executable: Boolean(request.executable),
    };
  }

  private async executeFile(
    absolutePath: string,
    request: WorkspaceRuntimeRequest
  ): Promise<unknown> {
    if (!this.config.execution.enabled) throw new Error('Workspace execution is disabled');
    await this.assertExistingPathAllowed(absolutePath, this.executeRoots, 'execute');
    if (process.platform !== 'win32') await fs.access(absolutePath, fsConstants.X_OK);
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
    const requestedTimeout =
      typeof request.timeoutMs === 'number' && Number.isFinite(request.timeoutMs)
        ? Math.max(1, Math.floor(request.timeoutMs))
        : this.config.execution.timeoutMs;
    const timeoutMs = Math.min(requestedTimeout, this.config.execution.timeoutMs);
    const invocation = this.resolveExecutable(absolutePath, args);
    const result = await this.runExecutable(
      invocation.command,
      invocation.args,
      cwd,
      timeoutMs,
      request.signal
    );
    return { path: request.path, ...result, timeoutMs };
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
    return path.isAbsolute(requestedPath)
      ? path.resolve(requestedPath)
      : path.resolve(this.workingDirectory, requestedPath);
  }

  private async assertWritablePath(candidate: string): Promise<void> {
    await this.assertCandidateWithinRoots(candidate, this.writeRoots, 'write');
    const realAncestor = await fs.realpath(await this.findExistingAncestor(candidate));
    const realRoots = await this.existingRealRoots(this.writeRoots);
    if (!realRoots.some((root) => this.isWithin(realAncestor, root))) {
      throw new Error(`Path is outside configured write paths: ${candidate}`);
    }
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
    const realCandidate = await fs.realpath(candidate);
    const realRoots = await this.existingRealRoots(roots);
    if (!realRoots.some((root) => this.isWithin(realCandidate, root))) {
      throw new Error(`Path is outside configured ${permission} paths: ${candidate}`);
    }
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
