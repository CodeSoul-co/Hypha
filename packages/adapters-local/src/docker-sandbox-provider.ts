import {
  validateCommandExecutionRequest,
  validateCommandExecutionResult,
  validateExecutionCancelRequest,
  validateSandboxCreateRequest,
  type CommandExecutionRequest,
  type CommandExecutionResult,
  type ExecutionCancelRequest,
  type ProviderHealth,
  type SandboxCleanupRequest,
  type SandboxCreateRequest,
  type SandboxProvider,
  type SandboxProviderCapabilities,
  type SandboxRecord,
  type SandboxStartRequest,
  type SandboxStatusRequest,
  type SandboxTerminateRequest,
} from '@hypha/core';
import { ZodError } from 'zod';
import {
  DockerExecutionCoordinator,
  DockerExecutionCoordinatorError,
} from './docker-execution-coordinator';
import { DockerExecutionPolicyResolver } from './docker-execution-policy';
import { executionProviderError } from './execution-provider-error';
import { InMemoryActiveExecutionRegistry } from './in-memory-active-execution-registry';
import {
  cloneExecutionValue,
  hashExecutionValue,
  shortExecutionHash,
} from './execution-provider-values';
import { DockerSandboxLifecycle } from './docker-sandbox-lifecycle';

export interface DockerSandboxProviderOptions {
  coordinator: Pick<DockerExecutionCoordinator, 'execute'>;
  policy: Pick<DockerExecutionPolicyResolver, 'validateEnvironment' | 'resolve'>;
  assertAvailable: () => Promise<void>;
  engineScopeId: string;
  id?: string;
  now?: () => string;
  sandboxId?: (request: SandboxCreateRequest) => string;
  executionId?: (request: CommandExecutionRequest) => string;
}

const capabilities: SandboxProviderCapabilities = {
  processIsolation: true,
  filesystemIsolation: true,
  networkIsolation: true,
  cpuLimits: true,
  memoryLimits: true,
  diskLimits: false,
  pidsLimit: true,
  cancellation: true,
  processTreeKill: true,
  snapshots: false,
  imageDigestPinning: true,
  remoteExecution: false,
};

/**
 * Composes validated Docker policy, Sandbox lifecycle, and terminal evidence.
 * Factory/registry publication remains intentionally outside this component.
 */
export class DockerSandboxProvider implements SandboxProvider {
  readonly id: string;
  private readonly coordinator: Pick<DockerExecutionCoordinator, 'execute'>;
  private readonly policy: Pick<DockerExecutionPolicyResolver, 'validateEnvironment' | 'resolve'>;
  private readonly assertAvailable: () => Promise<void>;
  private readonly engineScopeId: string;
  private readonly now: () => string;
  private readonly executionId: (request: CommandExecutionRequest) => string;
  private readonly lifecycle: DockerSandboxLifecycle;
  private readonly active = new InMemoryActiveExecutionRegistry();
  private readonly results = new Map<string, CommandExecutionResult>();
  private closed = false;

  constructor(options: DockerSandboxProviderOptions) {
    if (!options.engineScopeId.trim()) throw new Error('engineScopeId is required.');
    this.id = options.id ?? 'provider.docker';
    this.coordinator = options.coordinator;
    this.policy = options.policy;
    this.assertAvailable = options.assertAvailable;
    this.engineScopeId = options.engineScopeId;
    this.now = options.now ?? (() => new Date().toISOString());
    this.executionId =
      options.executionId ??
      ((request) => `execution.docker.${shortExecutionHash(request.operationId)}`);
    this.lifecycle = new DockerSandboxLifecycle({
      providerId: this.id,
      engineScopeId: this.engineScopeId,
      now: this.now,
      sandboxId: options.sandboxId,
    });
  }

  async capabilities(): Promise<SandboxProviderCapabilities> {
    this.assertOpen();
    return { ...capabilities };
  }

  async create(input: SandboxCreateRequest): Promise<SandboxRecord> {
    this.assertOpen();
    const request = validateSandboxCreateRequest(input);
    const environment = this.policy.validateEnvironment(request.environment);
    await this.assertAvailable();
    return this.lifecycle.create(
      { ...request, environment },
      {
        isolation: 'docker',
        engineScopeHash: shortExecutionHash(this.engineScopeId),
        imageDigest: environment.image?.digest,
      }
    );
  }

  async start(input: SandboxStartRequest): Promise<SandboxRecord> {
    this.assertOpen();
    return this.lifecycle.start(input);
  }

  async execute(input: CommandExecutionRequest): Promise<CommandExecutionResult> {
    this.assertOpen();
    const request = validateDockerCommandRequest(input);
    const environment = this.lifecycle.environmentForCommand(request);
    const executionId = request.executionId ?? this.executionId(request);
    if (this.results.has(executionId)) {
      throw executionProviderError(
        'EXECUTION_IDEMPOTENCY_CONFLICT',
        `Execution ${executionId} already completed.`,
        false
      );
    }

    const handle = this.active.begin(executionId, request.sandboxId!);
    let markedBusy = false;
    let result: CommandExecutionResult | undefined;
    try {
      const resolved = await this.policy.resolve(environment, request, handle.signal);
      this.lifecycle.markBusy(request.sandboxId!, executionId);
      markedBusy = true;
      result = validateCommandExecutionResult(
        await this.coordinator.execute({
          providerId: this.id,
          executionId,
          revision: handle.revision,
          sandboxId: request.sandboxId!,
          scopeId: dockerScopeId(request),
          createInput: {
            ...resolved.createInput,
            name: `hypha-${shortExecutionHash(executionId)}`,
            labels: {},
          },
          execInput: resolved.execInput,
          cleanupStopTimeoutSeconds: resolved.cleanupStopTimeoutSeconds,
        })
      );
      this.results.set(executionId, result);
      return cloneExecutionValue(result);
    } catch (error) {
      if (!(error instanceof DockerExecutionCoordinatorError)) throw error;
      throw executionProviderError(
        'EXECUTION_INTERNAL_ERROR',
        `Docker execution failed during ${error.phase}.`,
        error.phase !== 'terminal',
        {
          phase: error.phase,
          evidenceCode: error.code,
          ...(error.cleanup ? { cleanup: error.cleanup } : {}),
        }
      );
    } finally {
      this.active.complete(executionId);
      if (markedBusy) {
        this.lifecycle.markExecutionComplete(
          request.sandboxId!,
          executionId,
          result?.completedAt ?? this.now()
        );
      }
    }
  }

  async cancel(input: ExecutionCancelRequest): Promise<void> {
    this.assertOpen();
    const request = validateExecutionCancelRequest(input);
    const sandboxId = this.active.sandboxId(request.executionId);
    if (!sandboxId) {
      throw executionProviderError(
        'EXECUTION_RESULT_UNKNOWN',
        `Execution ${request.executionId} is not running.`,
        false
      );
    }
    this.lifecycle.status({ sandboxId, principal: request.principal });
    await this.active.cancel(request);
  }

  async terminate(input: SandboxTerminateRequest): Promise<void> {
    this.assertOpen();
    const terminating = this.lifecycle.beginTermination(input);
    await this.active.abortSandbox(terminating.id, input.reason ?? 'sandbox terminated');
    this.lifecycle.finishTermination(terminating.id);
  }

  async status(input: SandboxStatusRequest): Promise<SandboxRecord | null> {
    this.assertOpen();
    return this.lifecycle.status(input);
  }

  async cleanup(input: SandboxCleanupRequest): Promise<void> {
    this.assertOpen();
    this.lifecycle.cleanup(input);
  }

  async health(): Promise<ProviderHealth> {
    if (this.closed) {
      return { status: 'unhealthy', checkedAt: this.now(), message: 'Provider is closed.' };
    }
    try {
      await this.assertAvailable();
      return {
        status: 'healthy',
        checkedAt: this.now(),
        message: 'Docker execution surface is available.',
        details: {
          isolation: 'docker',
          engineScopeHash: shortExecutionHash(this.engineScopeId),
          factoryRegistered: false,
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        checkedAt: this.now(),
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async close(): Promise<void> {
    if (this.closed) return;
    await this.active.close();
    this.closed = true;
  }

  private assertOpen(): void {
    if (this.closed) {
      throw executionProviderError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        'Docker provider is closed.',
        false
      );
    }
  }
}

function dockerScopeId(request: CommandExecutionRequest): string {
  return `scope.${shortExecutionHash(
    hashExecutionValue({
      tenantId: request.tenantId,
      userId: request.userId,
      workspaceId: request.workspaceId,
      sessionId: request.sessionId,
      runId: request.runId,
      agentId: request.agentId,
    })
  )}`;
}

function validateDockerCommandRequest(input: CommandExecutionRequest): CommandExecutionRequest {
  try {
    return validateCommandExecutionRequest(input);
  } catch (error) {
    if (!(error instanceof ZodError)) throw error;
    throw executionProviderError(
      'EXECUTION_INVALID_REQUEST',
      'Docker command request failed schema validation.',
      false,
      { issueCount: error.issues.length }
    );
  }
}
