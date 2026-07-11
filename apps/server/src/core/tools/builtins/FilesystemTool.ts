import { execFile } from 'child_process';
import { constants as fsConstants } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { BaseTool } from '../types';
import type { ToolDefinition, ToolGovernanceSpec, ToolParams } from '../types';

export interface FilesystemToolConfig {
  workingDirectory: string;
  readPaths: string[];
  writePaths: string[];
  executePaths: string[];
  execution: {
    enabled: boolean;
    timeoutMs: number;
    maxOutputBytes: number;
  };
}

type FilesystemOperation = 'read' | 'write' | 'list' | 'execute';

const defaultConfig: FilesystemToolConfig = {
  workingDirectory: '.',
  readPaths: ['.'],
  writePaths: ['./data/workspace'],
  executePaths: ['./data/workspace/bin'],
  execution: {
    enabled: false,
    timeoutMs: 30000,
    maxOutputBytes: 1048576,
  },
};

/** Governed local filesystem access with separate read, write, and execute roots. */
export default class FilesystemTool extends BaseTool {
  readonly id = 'filesystem';
  readonly name = 'filesystem';
  readonly description: string;
  readonly governance: ToolGovernanceSpec = {
    permissionScope: ['filesystem:read', 'filesystem:write', 'filesystem:execute'],
    auditPolicy: {
      enabled: true,
      includeInput: true,
      includeOutput: true,
      redactPaths: ['content'],
    },
  };
  readonly schema: ToolDefinition;

  private readonly config: FilesystemToolConfig;
  private readonly workingDirectory: string;
  private readonly readRoots: string[];
  private readonly writeRoots: string[];
  private readonly executeRoots: string[];

  constructor(config: FilesystemToolConfig = defaultConfig) {
    super();
    this.config = config;
    this.workingDirectory = path.resolve(config.workingDirectory);
    this.readRoots = this.resolveRoots(config.readPaths);
    this.writeRoots = this.resolveRoots(config.writePaths);
    this.executeRoots = this.resolveRoots(config.executePaths);
    this.description = [
      'Read, write, list, or execute files within configured local filesystem paths.',
      `Read: ${config.readPaths.join(', ') || '(none)'}.`,
      `Write: ${config.writePaths.join(', ') || '(none)'}.`,
      `Execute: ${config.executePaths.join(', ') || '(none)'} (${config.execution.enabled ? 'enabled' : 'disabled'}).`,
    ].join(' ');
    this.schema = this.createSchema();
  }

  async onLoad(): Promise<void> {
    await Promise.all(this.writeRoots.map((root) => fs.mkdir(root, { recursive: true })));
  }

  protected async run(params: ToolParams): Promise<unknown> {
    const operation = params.operation as FilesystemOperation | undefined;
    const requestedPath = params.path;
    if (!operation || typeof requestedPath !== 'string' || !requestedPath.trim()) {
      throw new Error('operation and path are required');
    }
    const absolutePath = this.resolvePath(requestedPath);

    switch (operation) {
      case 'read':
        await this.assertExistingPathAllowed(absolutePath, this.readRoots, 'read');
        return { path: requestedPath, content: await fs.readFile(absolutePath, 'utf-8') };
      case 'list': {
        await this.assertExistingPathAllowed(absolutePath, this.readRoots, 'read');
        const entries = await fs.readdir(absolutePath, { withFileTypes: true });
        return {
          path: requestedPath,
          entries: entries.map((entry) => ({
            name: entry.name,
            type: entry.isDirectory() ? 'dir' : entry.isFile() ? 'file' : 'other',
          })),
        };
      }
      case 'write':
        return this.writeFile(absolutePath, requestedPath, params);
      case 'execute':
        return this.executeFile(absolutePath, requestedPath, params);
      default:
        throw new Error(`Unknown operation: ${String(operation)}`);
    }
  }

  private async writeFile(
    absolutePath: string,
    requestedPath: string,
    params: ToolParams
  ): Promise<unknown> {
    if (typeof params.content !== 'string') throw new Error('content is required for write');
    await this.assertWritablePath(absolutePath);
    const executable = params.executable === true;
    if (executable) {
      await this.assertCandidateWithinRoots(absolutePath, this.executeRoots, 'execute');
    }
    await fs.mkdir(path.dirname(absolutePath), { recursive: true });
    await fs.writeFile(absolutePath, params.content, 'utf-8');
    if (executable) await fs.chmod(absolutePath, 0o700);
    return {
      path: requestedPath,
      bytesWritten: Buffer.byteLength(params.content, 'utf-8'),
      executable,
    };
  }

  private async executeFile(
    absolutePath: string,
    requestedPath: string,
    params: ToolParams
  ): Promise<unknown> {
    if (!this.config.execution.enabled) throw new Error('Filesystem execution is disabled');
    await this.assertExistingPathAllowed(absolutePath, this.executeRoots, 'execute');
    await fs.access(absolutePath, fsConstants.X_OK);

    const args = params.args ?? [];
    if (!Array.isArray(args) || args.some((arg) => typeof arg !== 'string')) {
      throw new Error('args must be an array of strings');
    }
    const cwd =
      typeof params.cwd === 'string' && params.cwd.trim()
        ? this.resolvePath(params.cwd)
        : this.workingDirectory;
    await this.assertExistingPathAllowed(
      cwd,
      [...this.readRoots, ...this.writeRoots],
      'use as cwd'
    );

    const requestedTimeout =
      typeof params.timeoutMs === 'number' && Number.isFinite(params.timeoutMs)
        ? Math.max(1, Math.floor(params.timeoutMs))
        : this.config.execution.timeoutMs;
    const timeoutMs = Math.min(requestedTimeout, this.config.execution.timeoutMs);
    const result = await this.runExecutable(absolutePath, args, cwd, timeoutMs);
    return { path: requestedPath, ...result, timeoutMs };
  }

  private runExecutable(
    executablePath: string,
    args: string[],
    cwd: string,
    timeoutMs: number
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    return new Promise((resolve, reject) => {
      execFile(
        executablePath,
        args,
        {
          cwd,
          encoding: 'utf-8',
          timeout: timeoutMs,
          maxBuffer: this.config.execution.maxOutputBytes,
          shell: false,
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

  private createSchema(): ToolDefinition {
    return {
      name: 'filesystem',
      description: this.description,
      inputSchema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          operation: { type: 'string', enum: ['read', 'write', 'list', 'execute'] },
          path: {
            type: 'string',
            description: 'Absolute path or path relative to workingDirectory',
          },
          content: { type: 'string', description: 'Required for operation=write' },
          executable: {
            type: 'boolean',
            description: 'Mark a written file executable; path must also be execution-allowed',
          },
          args: {
            type: 'array',
            items: { type: 'string' },
            description: 'Arguments passed directly to an executable without a shell',
          },
          cwd: {
            type: 'string',
            description: 'Execution directory, constrained to configured read or write paths',
          },
          timeoutMs: {
            type: 'number',
            description: 'Execution timeout capped by the configured maximum',
          },
        },
        required: ['operation', 'path'],
      },
    };
  }

  private executionEnvironment(): NodeJS.ProcessEnv {
    const allowedNames = ['PATH', 'HOME', 'TMPDIR', 'TMP', 'TEMP', 'LANG', 'LC_ALL'];
    return Object.fromEntries(
      allowedNames
        .filter((name) => process.env[name] !== undefined)
        .map((name) => [name, process.env[name]])
    );
  }

  private resolvePath(requestedPath: string): string {
    return path.isAbsolute(requestedPath)
      ? path.resolve(requestedPath)
      : path.resolve(this.workingDirectory, requestedPath);
  }

  private async assertWritablePath(candidate: string): Promise<void> {
    await this.assertCandidateWithinRoots(candidate, this.writeRoots, 'write');
    const existingAncestor = await this.findExistingAncestor(candidate);
    const realAncestor = await fs.realpath(existingAncestor);
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
        const code = (error as NodeJS.ErrnoException).code;
        if (code !== 'ENOENT') throw error;
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
}
