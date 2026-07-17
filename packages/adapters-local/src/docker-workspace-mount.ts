import fs from 'node:fs/promises';
import path from 'node:path';
import { executionProviderError } from './execution-provider-error';

export interface DockerWorkspaceMount {
  source: string;
  target: string;
  readOnly: boolean;
}

export interface DockerWorkspaceMountResolverOptions {
  workspaceRoot: string;
  containerWorkspaceRoot?: string;
}

/** Resolves the one governed host Workspace mount accepted by the Docker provider. */
export class DockerWorkspaceMountResolver {
  readonly workspaceRoot: string;
  readonly containerWorkspaceRoot: string;

  constructor(options: DockerWorkspaceMountResolverOptions) {
    if (!options.workspaceRoot.trim()) throw new Error('workspaceRoot is required.');
    this.workspaceRoot = path.resolve(options.workspaceRoot);
    this.containerWorkspaceRoot = validateContainerPath(
      options.containerWorkspaceRoot ?? '/workspace',
      'containerWorkspaceRoot'
    );
    rejectSensitiveHostPath(this.workspaceRoot);
  }

  async resolve(readOnly: boolean): Promise<DockerWorkspaceMount> {
    const realRoot = await fs.realpath(this.workspaceRoot);
    const stat = await fs.stat(realRoot);
    if (!stat.isDirectory()) {
      throw executionProviderError(
        'EXECUTION_WORKSPACE_NOT_FOUND',
        'Docker Workspace root must be a directory.',
        false
      );
    }
    rejectSensitiveHostPath(realRoot);
    return { source: realRoot, target: this.containerWorkspaceRoot, readOnly };
  }

  resolveWorkingDirectory(requested?: string): string {
    if (!requested) return this.containerWorkspaceRoot;
    if (requested.includes('\u0000')) {
      throw executionProviderError(
        'EXECUTION_PATH_ESCAPE',
        'Docker cwd contains a NUL byte.',
        false
      );
    }
    const normalized = path.posix.resolve(
      this.containerWorkspaceRoot,
      requested.replaceAll('\\', '/')
    );
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
  if (!value.startsWith('/') || value.includes('\u0000') || value.includes(',')) {
    throw new Error(`${name} must be an absolute container path without NUL or comma.`);
  }
  const normalized = path.posix.normalize(value);
  if (normalized !== value || normalized === '/') {
    throw new Error(`${name} must be normalized and cannot be the container root.`);
  }
  return normalized;
}

function rejectSensitiveHostPath(value: string): void {
  const normalized = path.resolve(value).replaceAll('\\', '/').replace(/\/$/, '').toLowerCase();
  const root = path.parse(value).root.replaceAll('\\', '/').replace(/\/$/, '').toLowerCase();
  if (normalized === root || normalized.endsWith('/docker.sock')) {
    throw executionProviderError(
      'EXECUTION_PATH_DENIED',
      'Docker Workspace mount cannot expose a host root or Docker socket.',
      false
    );
  }
}
