import {
  validateDockerCliRequest,
  type DockerCliRequest,
  type DockerCommandTransport,
} from './docker-cli-transport';
import {
  dockerFailure,
  DockerEngineClientError,
  nonNegativeSafeInteger,
  parseContainerListing,
  validContainerReference,
  type DockerContainerInspection,
} from './docker-engine-boundary';

const MANAGED_LABEL_FILTER = 'hypha.execution.managed=true';
const SCOPE_LABEL_NAME = 'hypha.execution.scope';
const LIST_TIMEOUT_MS = 10_000;
const LIST_OUTPUT_LIMIT_BYTES = 1024 * 1024;

export interface DockerCleanupLifecycle {
  inspectContainer(containerReference: string): Promise<DockerContainerInspection | null>;
  stopContainer(containerReference: string, timeoutSeconds: number): Promise<void>;
  removeContainer(containerReference: string): Promise<void>;
}

export interface DockerContainerCleanupInput {
  scopeId: string;
  activeContainerReferences: string[];
  stopTimeoutSeconds: number;
  signal: AbortSignal;
}

export type DockerCleanupFailureStage = 'inspect' | 'stop' | 'remove';

export interface DockerCleanupFailure {
  containerReference: string;
  stage: DockerCleanupFailureStage;
  code: 'DOCKER_COMMAND_FAILED' | 'DOCKER_INVALID_RESPONSE' | 'UNEXPECTED';
}

export interface DockerContainerCleanupEvidence {
  complete: boolean;
  discovered: number;
  retainedActive: number;
  alreadyMissing: number;
  removed: Array<{
    containerReference: string;
    wasRunning: boolean;
  }>;
  failures: DockerCleanupFailure[];
}

/**
 * Reconciles only containers carrying both the Hypha managed marker and the
 * caller's stable scope marker. Docker labels are immutable after creation,
 * so the daemon-side exact filters establish the cleanup ownership boundary.
 */
export class DockerManagedContainerCleanup {
  constructor(
    private readonly transport: DockerCommandTransport,
    private readonly lifecycle: DockerCleanupLifecycle
  ) {}

  async reconcile(input: DockerContainerCleanupInput): Promise<DockerContainerCleanupEvidence> {
    validateCleanupInput(input);
    const active = new Set(input.activeContainerReferences);
    const discovered = await this.listManagedContainers(input.scopeId, input.signal);
    const evidence: DockerContainerCleanupEvidence = {
      complete: true,
      discovered: discovered.length,
      retainedActive: 0,
      alreadyMissing: 0,
      removed: [],
      failures: [],
    };

    for (const container of discovered) {
      if (active.has(container.id) || active.has(container.name)) {
        evidence.retainedActive += 1;
        continue;
      }
      if (input.signal.aborted) {
        evidence.complete = false;
        break;
      }

      const inspection = await this.inspect(container.id, evidence);
      if (inspection === 'failed') continue;
      if (inspection === null) {
        evidence.alreadyMissing += 1;
        continue;
      }

      if (
        inspection.running &&
        !(await this.perform(container.id, 'stop', evidence, () =>
          this.lifecycle.stopContainer(container.id, input.stopTimeoutSeconds)
        ))
      ) {
        continue;
      }
      if (
        !(await this.perform(container.id, 'remove', evidence, () =>
          this.lifecycle.removeContainer(container.id)
        ))
      ) {
        continue;
      }
      evidence.removed.push({
        containerReference: container.id,
        wasRunning: inspection.running,
      });
    }

    evidence.complete = evidence.complete && evidence.failures.length === 0;
    return evidence;
  }

  private async listManagedContainers(
    scopeId: string,
    signal: AbortSignal
  ): Promise<Array<{ id: string; name: string }>> {
    const request: DockerCliRequest = {
      args: [
        'container',
        'ls',
        '--all',
        '--no-trunc',
        '--filter',
        `label=${MANAGED_LABEL_FILTER}`,
        '--filter',
        `label=${SCOPE_LABEL_NAME}=${scopeId}`,
        '--format',
        '{{json .}}',
      ],
      timeoutMs: LIST_TIMEOUT_MS,
      maxStdoutBytes: LIST_OUTPUT_LIMIT_BYTES,
      maxStderrBytes: LIST_OUTPUT_LIMIT_BYTES,
      maxCombinedOutputBytes: LIST_OUTPUT_LIMIT_BYTES,
      signal,
    };
    validateDockerCliRequest(request);
    const result = await this.transport.run(request);
    if (result.outcome !== 'exited' || result.exitCode !== 0) {
      throw dockerFailure('Docker managed container discovery failed.', 'container ls', result);
    }

    const listed = parseContainerListing(result.stdout);
    const unique = new Map(listed.map((container) => [container.id, container]));
    if (unique.size !== listed.length) {
      throw new DockerEngineClientError(
        'Docker managed container discovery returned duplicate records.',
        'DOCKER_INVALID_RESPONSE',
        'container ls'
      );
    }
    return listed;
  }

  private async inspect(
    containerReference: string,
    evidence: DockerContainerCleanupEvidence
  ): Promise<DockerContainerInspection | null | 'failed'> {
    try {
      const inspection = await this.lifecycle.inspectContainer(containerReference);
      if (inspection && inspection.id !== containerReference) {
        throw new DockerEngineClientError(
          'Docker cleanup inspection returned a different container identity.',
          'DOCKER_INVALID_RESPONSE',
          'container inspect'
        );
      }
      return inspection;
    } catch (error) {
      recordFailure(evidence, containerReference, 'inspect', error);
      return 'failed';
    }
  }

  private async perform(
    containerReference: string,
    stage: Exclude<DockerCleanupFailureStage, 'inspect'>,
    evidence: DockerContainerCleanupEvidence,
    operation: () => Promise<void>
  ): Promise<boolean> {
    try {
      await operation();
      return true;
    } catch (error) {
      recordFailure(evidence, containerReference, stage, error);
      return false;
    }
  }
}

function validateCleanupInput(input: DockerContainerCleanupInput): void {
  if (!isRecord(input)) throw new TypeError('Docker cleanup input must be an object.');
  validContainerReference(input.scopeId, 'Docker cleanup scopeId');
  if (!Array.isArray(input.activeContainerReferences)) {
    throw new TypeError('Docker active container references must be an array.');
  }
  for (const reference of input.activeContainerReferences) validContainerReference(reference);
  nonNegativeSafeInteger(input.stopTimeoutSeconds, 'Docker cleanup stopTimeoutSeconds');

  validateDockerCliRequest({
    args: ['container', 'ls'],
    timeoutMs: 1,
    maxStdoutBytes: 1,
    maxStderrBytes: 1,
    maxCombinedOutputBytes: 1,
    signal: input.signal,
  });
}

function recordFailure(
  evidence: DockerContainerCleanupEvidence,
  containerReference: string,
  stage: DockerCleanupFailureStage,
  error: unknown
): void {
  const code = error instanceof DockerEngineClientError ? error.code : 'UNEXPECTED';
  evidence.failures.push({ containerReference, stage, code });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
