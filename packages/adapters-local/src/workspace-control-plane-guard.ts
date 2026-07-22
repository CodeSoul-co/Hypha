import os from 'node:os';
import path from 'node:path';

const protectedDirectoryNames = new Set([
  '.aws',
  '.azure',
  '.docker',
  '.git',
  '.hypha',
  '.kube',
  '.oci',
  '.ssh',
  'node_modules',
]);
const protectedCredentialNames = new Set(['.git-credentials', '.netrc', '.npmrc', '.pypirc']);
const protectedSocketNames = new Set(['containerd.sock', 'docker.sock', 'podman.sock']);
const ambiguousSeparators = /[\u2044\u2215\u29f8\ufe68\uff0f\uff3c]/u;
const urlEncodedOctet = /%[0-9a-f]{2}/iu;
const windowsDriveAbsolutePath = /^[a-z]:[\\/]/iu;

/**
 * Independent deny guard for framework control-plane, credential, package,
 * system, and container-runtime paths. Workspace allow-lists cannot override it.
 */
export class WorkspaceControlPlaneGuard {
  private readonly protectedRoots: string[];

  constructor(frameworkRoot = process.cwd(), homeDirectory = os.homedir()) {
    this.protectedRoots = this.uniqueResolvedRoots([
      path.join(frameworkRoot, 'data', 'runtime'),
      path.join(frameworkRoot, '.git'),
      path.join(frameworkRoot, 'node_modules'),
      path.join(homeDirectory, '.aws'),
      path.join(homeDirectory, '.azure'),
      path.join(homeDirectory, '.docker'),
      path.join(homeDirectory, '.hypha'),
      path.join(homeDirectory, '.kube'),
      path.join(homeDirectory, '.oci'),
      path.join(homeDirectory, '.ssh'),
      process.execPath,
      ...this.configuredControlPlaneRoots(),
      ...this.systemRoots(),
    ]);
  }

  assertInputPath(requestedPath: string): void {
    if (
      Array.from(requestedPath).some((character) => {
        const codePoint = character.codePointAt(0) ?? 0;
        return codePoint <= 0x1f || codePoint === 0x7f;
      })
    ) {
      throw new Error('Workspace path contains a control character');
    }
    if (urlEncodedOctet.test(requestedPath)) {
      throw new Error('URL-encoded Workspace paths are not allowed');
    }
    if (ambiguousSeparators.test(requestedPath)) {
      throw new Error('Workspace path contains an ambiguous Unicode separator');
    }
    if (requestedPath.startsWith('\\\\')) {
      throw new Error('UNC and Windows device Workspace paths are not allowed');
    }
    if (process.platform !== 'win32' && windowsDriveAbsolutePath.test(requestedPath)) {
      throw new Error('Windows drive paths are not allowed on this platform');
    }

    const normalized = requestedPath.normalize('NFKC');
    if (normalized !== requestedPath && this.hasProtectedLexicalShape(normalized)) {
      throw new Error('Workspace path normalizes to a protected path');
    }
    if (this.hasTraversalSegment(requestedPath)) {
      throw new Error('Workspace path traversal is not allowed');
    }
    if (this.hasProtectedLexicalShape(requestedPath)) {
      throw new Error('Workspace path is protected by the control-plane policy');
    }
  }

  assertResolvedPath(candidate: string): void {
    if (this.isProtectedResolvedPath(candidate)) {
      throw new Error('Workspace path is protected by the control-plane policy');
    }
  }

  isProtectedResolvedPath(candidate: string): boolean {
    const resolvedCandidate = path.resolve(candidate);
    return (
      this.hasProtectedLexicalShape(resolvedCandidate) ||
      this.protectedRoots.some((root) => this.isWithin(resolvedCandidate, root))
    );
  }

  private hasProtectedLexicalShape(candidate: string): boolean {
    const lowerPath = candidate.toLowerCase();
    if (lowerPath.startsWith('\\\\.\\') || lowerPath.startsWith('\\\\?\\')) return true;

    const segments = this.portableSegments(candidate);
    if (segments.some((segment) => protectedDirectoryNames.has(segment))) return true;
    if (segments.some((segment) => protectedCredentialNames.has(segment))) return true;
    if (segments.some((segment) => /^\.env(?:\..+)?$/u.test(segment))) return true;
    if (segments.some((segment) => protectedSocketNames.has(segment))) return true;

    return segments.some(
      (segment, index) =>
        (segment === 'data' && segments[index + 1] === 'runtime') ||
        (segment === '.config' && segments[index + 1] === 'gcloud')
    );
  }

  private hasTraversalSegment(candidate: string): boolean {
    return this.portableSegments(candidate).some((segment) => segment === '..');
  }

  private portableSegments(candidate: string): string[] {
    return candidate
      .replace(/[\\/]/gu, '/')
      .split('/')
      .filter(Boolean)
      .map((segment) => segment.toLowerCase());
  }

  private uniqueResolvedRoots(roots: string[]): string[] {
    return Array.from(new Set(roots.filter(Boolean).map((root) => path.resolve(root))));
  }

  private systemRoots(): string[] {
    if (process.platform === 'win32') {
      return [
        process.env.SystemRoot,
        process.env.ProgramFiles,
        process.env['ProgramFiles(x86)'],
        process.env.ProgramData,
      ].filter((root): root is string => Boolean(root));
    }
    return ['/boot', '/dev', '/etc', '/proc', '/root', '/run', '/sys', '/var/run'];
  }

  private configuredControlPlaneRoots(): string[] {
    return [
      'HYPHA_MCP_CATALOG_STORE',
      'HYPHA_RUNTIME_EVENT_DB',
      'HYPHA_STORAGE_EVENT_DB',
      'HYPHA_STORAGE_STRUCTURED_DB',
      'HYPHA_STORAGE_VECTOR_INDEX',
      'HYPHA_SYSTEM_LOG_PATH',
      'HYPHA_TOOL_ARTIFACT_ROOT',
      'HYPHA_TOOL_CONTRACT_SNAPSHOT_ROOT',
      'HYPHA_TOOL_OBSERVATION_ROOT',
      'HYPHA_TOOL_RUNTIME_STORE',
    ]
      .map((name) => process.env[name]?.trim())
      .filter((root): root is string => Boolean(root));
  }

  private isWithin(candidate: string, root: string): boolean {
    const relative = path.relative(root, candidate);
    return (
      relative === '' ||
      (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))
    );
  }
}
