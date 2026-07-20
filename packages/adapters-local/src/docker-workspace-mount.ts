import fs from 'node:fs/promises';
import path from 'node:path';
import type { DockerBindMount } from './docker-engine-client';
import { executionProviderError } from './execution-provider-error';

export interface DockerWorkspaceMountResolverOptions {
  workspaceRoot: string;
  containerWorkspaceRoot?: string;
}

/** Resolves the single governed host Workspace mount accepted by the Docker provider. */
export class DockerWorkspaceMountResolver {
  readonly workspaceRoot: string;
  readonly containerWorkspaceRoot: string;

  constructor(options: DockerWorkspaceMountResolverOptions) {
    if (!options || typeof options !== 'object') {
      throw new Error('Docker workspace mount options are required.');
    }
    this.workspaceRoot = path.resolve(nonEmptyNoNul(options.workspaceRoot, 'workspaceRoot'));
    this.containerWorkspaceRoot = validateContainerPath(
      options.containerWorkspaceRoot ?? '/workspace',
      'containerWorkspaceRoot'
    );
    rejectSensitiveHostPath(this.workspaceRoot);
  }

  async resolve(readOnly: boolean): Promise<DockerBindMount> {
    if (typeof readOnly !== 'boolean') throw new Error('readOnly must be a boolean.');
    let realRoot: string;
    try {
      realRoot = await fs.realpath(this.workspaceRoot);
      const stat = await fs.stat(realRoot);
      if (!stat.isDirectory()) throw new Error('not a directory');
    } catch {
      throw executionProviderError(
        'EXECUTION_WORKSPACE_NOT_FOUND',
        'Docker Workspace root must resolve to an existing directory.',
        false
      );
    }
    rejectSensitiveHostPath(realRoot);
    return { source: realRoot, target: this.containerWorkspaceRoot, readOnly };
  }

  resolveWorkingDirectory(requested?: string): string {
    if (requested === undefined || requested === '') return this.containerWorkspaceRoot;
    if (typeof requested !== 'string' || requested.includes('\u0000')) {
      throw executionProviderError(
        'EXECUTION_PATH_ESCAPE',
        'Docker command working directory contains a NUL byte.',
        false
      );
    }
    const normalizedSeparators = requested.replaceAll('\\', '/');
    const normalized = path.posix.resolve(this.containerWorkspaceRoot, normalizedSeparators);
    const relative = path.posix.relative(this.containerWorkspaceRoot, normalized);
    if (relative === '..' || relative.startsWith('../') || path.posix.isAbsolute(relative)) {
      throw executionProviderError(
        'EXECUTION_PATH_ESCAPE',
        'Docker command working directory escapes the Workspace mount.',
        false
      );
    }
    return normalized;
  }
}

export function validateContainerPath(value: string, name: string): string {
  const candidate = nonEmptyNoNul(value, name);
  if (!candidate.startsWith('/') || candidate.includes(',')) {
    throw new Error(`${name} must be an absolute container path without commas.`);
  }
  const normalized = path.posix.normalize(candidate);
  if (normalized !== candidate || normalized === '/') {
    throw new Error(`${name} must be normalized and cannot be the container root.`);
  }
  return normalized;
}

function rejectSensitiveHostPath(value: string): void {
  const candidate = normalizedHostPath(value);
  const hostRoot = normalizedHostPath(path.parse(value).root);
  const sensitivePaths =
    process.platform === 'win32'
      ? [hostRoot, normalizedHostPath(process.env.SystemRoot ?? 'C:\\Windows')]
      : ['/', '/etc', '/proc', '/sys', '/dev', '/run', '/var/run', '/var/lib/docker'];

  if (
    sensitivePaths.includes(candidate) ||
    candidate.endsWith('/docker.sock') ||
    candidate.includes('/pipe/docker_engine')
  ) {
    throw executionProviderError(
      'EXECUTION_PATH_DENIED',
      'Docker Workspace mount cannot expose a sensitive host path or Docker socket.',
      false
    );
  }
}

function normalizedHostPath(value: string): string {
  const normalized = path.resolve(value).replaceAll('\\', '/').replace(/\/$/, '');
  return process.platform === 'win32' ? normalized.toLowerCase() : normalized;
}

function nonEmptyNoNul(value: string, name: string): string {
  if (typeof value !== 'string' || value.trim().length === 0 || value.includes('\u0000')) {
    throw new Error(`${name} must be non-empty and contain no NUL bytes.`);
  }
  return value;
}
