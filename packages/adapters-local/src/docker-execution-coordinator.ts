import type { CommandExecutionResult, FileMutation } from '@codesoul-co/hypha-core';
import type { DockerCliResult } from './docker-cli-transport';
import {
  DockerEngineClientError,
  validContainerReference,
  validateCreateInput,
  type DockerContainerCreateInput,
  type DockerContainerInspection,
} from './docker-engine-boundary';
import type { DockerEngineClient } from './docker-engine-client';
import {
  validateExecInput,
  type DockerContainerExecInput,
  type DockerContainerIo,
} from './docker-exec-io';
import type {
  DockerResourceAccounting,
  DockerResourceSnapshot,
} from './docker-resource-accounting';
import type { LocalProcessOutputEvent } from './local-process-supervisor';
import {
  buildDockerTerminalResult,
  type DockerEvidenceFailureCode,
  type DockerExecutionCleanupEvidence,
} from './docker-terminal-result';

const RESERVED_LABELS = [
  'hypha.execution.managed',
  'hypha.execution.scope',
  'hypha.execution.id',
  'hypha.execution.sandbox',
] as const;

export interface DockerExecutionCollectedOutputs {
  changedFiles: FileMutation[];
  generatedArtifactRefs: string[];
  stdoutArtifactRef?: string;
  stderrArtifactRef?: string;
}

export interface DockerExecutionOutputSession {
  onOutput(event: LocalProcessOutputEvent): void | Promise<void>;
  collect(input: {
    executionId: string;
    containerReference: string;
    processResult: DockerCliResult;
  }): Promise<DockerExecutionCollectedOutputs>;
  abort(error: unknown): Promise<void>;
}

export interface DockerExecutionOutputCollector {
  prepare(input: {
    executionId: string;
    workspaceRoot: string;
  }): Promise<DockerExecutionOutputSession>;
}

export interface DockerExecutionCoordinatorInput {
  providerId: string;
  executionId: string;
  revision: number;
  sandboxId: string;
  scopeId: string;
  createInput: DockerContainerCreateInput;
  execInput: Omit<DockerContainerExecInput, 'containerReference'>;
  cleanupStopTimeoutSeconds: number;
}

export type DockerExecutionCoordinatorPhase =
  | 'prepare'
  | 'create'
  | 'start'
  | 'execute'
  | 'inspect'
  | 'quiesce'
  | 'collect'
  | 'remove'
  | 'terminal';

export class DockerExecutionCoordinatorError extends Error {
  readonly name = 'DockerExecutionCoordinatorError';

  constructor(
    readonly phase: DockerExecutionCoordinatorPhase,
    readonly code: DockerEvidenceFailureCode,
    readonly cleanup?: DockerExecutionCleanupEvidence
  ) {
    super(`Docker execution failed during ${phase}.`);
  }
}

/**
 * Internal single-execution orchestration. Policy, Provider registration,
 * durable queueing, and Server composition remain outside this component.
 */
export class DockerExecutionCoordinator {
  constructor(
    private readonly engine: DockerEngineClient,
    private readonly io: DockerContainerIo,
    private readonly accounting: DockerResourceAccounting,
    private readonly outputs: DockerExecutionOutputCollector
  ) {}

  async execute(input: DockerExecutionCoordinatorInput): Promise<CommandExecutionResult> {
    validateCoordinatorInput(input);
    let phase: DockerExecutionCoordinatorPhase = 'prepare';
    let containerReference: string | undefined;
    let inspection: DockerContainerInspection | undefined;
    let cleanupEvidence: DockerExecutionCleanupEvidence | undefined;
    let outputSession: DockerExecutionOutputSession | undefined;
    let outputSessionSettled = false;

    try {
      outputSession = await this.outputs.prepare({
        executionId: input.executionId,
        workspaceRoot: input.createInput.workspaceMount.source,
      });
      phase = 'create';
      const createdReference = validContainerReference(
        await this.engine.createContainer(withManagedLabels(input))
      );
      containerReference = createdReference;
      phase = 'start';
      await this.engine.startContainer(createdReference);

      phase = 'execute';
      const [processEvidence, resourceEvidence] = await Promise.all([
        settle(() =>
          this.io.execute({
            ...input.execInput,
            containerReference: createdReference,
            onOutput: async (event) => {
              await outputSession?.onOutput(event);
              await input.execInput.onOutput?.(event);
            },
          })
        ),
        captureResource(this.accounting, createdReference, input.execInput.signal),
      ]);
      if ('error' in processEvidence) throw processEvidence.error;

      phase = 'inspect';
      inspection = (await this.engine.inspectContainer(createdReference)) ?? undefined;
      if (!inspection) {
        throw new DockerEngineClientError(
          'Docker execution container disappeared before terminal inspection.',
          'DOCKER_INVALID_RESPONSE',
          'container inspect'
        );
      }

      phase = 'quiesce';
      const quiesced = await quiesceContainer(
        this.engine,
        createdReference,
        inspection,
        input.cleanupStopTimeoutSeconds
      );
      inspection = quiesced.inspection;

      phase = 'collect';
      const outputEvidence = await outputSession.collect({
        executionId: input.executionId,
        containerReference: createdReference,
        processResult: processEvidence.value,
      });
      outputSessionSettled = true;

      phase = 'remove';
      cleanupEvidence = await removeQuiescedContainer(
        this.engine,
        createdReference,
        quiesced.stopAttempted
      );
      phase = 'terminal';
      return buildDockerTerminalResult({
        providerId: input.providerId,
        executionId: input.executionId,
        revision: input.revision,
        sandboxId: input.sandboxId,
        containerReference: createdReference,
        processResult: processEvidence.value,
        inspection,
        ...resourceEvidence,
        cleanup: cleanupEvidence,
        ...outputEvidence,
      });
    } catch (error) {
      if (outputSession && !outputSessionSettled) {
        await outputSession.abort(error).catch(() => undefined);
      }
      cleanupEvidence ??=
        containerReference !== undefined
          ? await cleanupContainer(
              this.engine,
              containerReference,
              inspection,
              input.cleanupStopTimeoutSeconds
            )
          : undefined;
      throw new DockerExecutionCoordinatorError(phase, failureCode(error), cleanupEvidence);
    }
  }
}

interface QuiescedContainer {
  inspection: DockerContainerInspection;
  stopAttempted: boolean;
}

async function quiesceContainer(
  engine: DockerEngineClient,
  containerReference: string,
  inspection: DockerContainerInspection,
  stopTimeoutSeconds: number
): Promise<QuiescedContainer> {
  if (inspection.id !== containerReference) {
    throw new DockerEngineClientError(
      'Docker container inspection identity does not match the execution container.',
      'DOCKER_INVALID_RESPONSE',
      'container inspect'
    );
  }
  if (inspection.running) {
    await engine.stopContainer(containerReference, stopTimeoutSeconds);
  }
  const finalInspection = await engine.inspectContainer(containerReference);
  if (!finalInspection || finalInspection.id !== containerReference || finalInspection.running) {
    throw new DockerEngineClientError(
      'Docker execution container was not quiescent before output collection.',
      'DOCKER_INVALID_RESPONSE',
      'container inspect'
    );
  }
  return { inspection: finalInspection, stopAttempted: inspection.running };
}

async function removeQuiescedContainer(
  engine: DockerEngineClient,
  containerReference: string,
  stopAttempted: boolean
): Promise<DockerExecutionCleanupEvidence> {
  try {
    await engine.removeContainer(containerReference);
    if ((await engine.inspectContainer(containerReference)) !== null) {
      return cleanupFailure(
        'remove',
        new DockerEngineClientError(
          'Docker execution container remained after removal.',
          'DOCKER_INVALID_RESPONSE',
          'container inspect'
        ),
        stopAttempted
      );
    }
    return { complete: true, containerAbsent: true, stopAttempted };
  } catch (error) {
    return cleanupFailure('remove', error, stopAttempted);
  }
}

function withManagedLabels(input: DockerExecutionCoordinatorInput): DockerContainerCreateInput {
  return {
    ...input.createInput,
    labels: {
      ...input.createInput.labels,
      'hypha.execution.managed': 'true',
      'hypha.execution.scope': input.scopeId,
      'hypha.execution.id': input.executionId,
      'hypha.execution.sandbox': input.sandboxId,
    },
  };
}

async function cleanupContainer(
  engine: DockerEngineClient,
  containerReference: string,
  knownInspection: DockerContainerInspection | undefined,
  stopTimeoutSeconds: number
): Promise<DockerExecutionCleanupEvidence> {
  let inspection = knownInspection;
  if (!inspection) {
    try {
      inspection = (await engine.inspectContainer(containerReference)) ?? undefined;
    } catch (error) {
      return cleanupFailure('inspect', error, false);
    }
  }
  if (!inspection) {
    return { complete: true, containerAbsent: true, stopAttempted: false };
  }
  if (inspection.id !== containerReference) {
    return {
      complete: false,
      containerAbsent: false,
      stopAttempted: false,
      failureStage: 'inspect',
      failureCode: 'DOCKER_INVALID_RESPONSE',
    };
  }

  if (inspection.running) {
    try {
      await engine.stopContainer(containerReference, stopTimeoutSeconds);
    } catch (error) {
      return cleanupFailure('stop', error, true);
    }
  }
  try {
    await engine.removeContainer(containerReference);
    return {
      complete: true,
      containerAbsent: true,
      stopAttempted: inspection.running,
    };
  } catch (error) {
    return cleanupFailure('remove', error, inspection.running);
  }
}

function cleanupFailure(
  failureStage: 'inspect' | 'stop' | 'remove',
  error: unknown,
  stopAttempted: boolean
): DockerExecutionCleanupEvidence {
  return {
    complete: false,
    containerAbsent: false,
    stopAttempted,
    failureStage,
    failureCode: failureCode(error),
  };
}

async function captureResource(
  accounting: DockerResourceAccounting,
  containerReference: string,
  signal: AbortSignal
): Promise<
  { resourceSnapshot: DockerResourceSnapshot } | { resourceFailureCode: DockerEvidenceFailureCode }
> {
  try {
    return { resourceSnapshot: await accounting.snapshot(containerReference, signal) };
  } catch (error) {
    return { resourceFailureCode: failureCode(error) };
  }
}

async function settle<T>(operation: () => Promise<T>): Promise<{ value: T } | { error: unknown }> {
  try {
    return { value: await operation() };
  } catch (error) {
    return { error };
  }
}

function failureCode(error: unknown): DockerEvidenceFailureCode {
  return error instanceof DockerEngineClientError ? error.code : 'UNEXPECTED';
}

function validateCoordinatorInput(input: DockerExecutionCoordinatorInput): void {
  if (!isRecord(input)) throw new TypeError('Docker coordinator input must be an object.');
  validateCreateInput(input.createInput);
  validContainerReference(input.scopeId, 'Docker execution scopeId');
  for (const label of RESERVED_LABELS) {
    if (Object.hasOwn(input.createInput.labels, label)) {
      throw new TypeError(`Docker reserved label ${label} is coordinator-owned.`);
    }
  }
  validateExecInput({
    ...input.execInput,
    containerReference: input.createInput.name,
  });
  if (input.execInput.workingDirectory !== input.createInput.workingDirectory) {
    throw new TypeError('Docker create and exec working directories must match.');
  }
  if (
    !Number.isSafeInteger(input.cleanupStopTimeoutSeconds) ||
    input.cleanupStopTimeoutSeconds < 0
  ) {
    throw new TypeError('Docker cleanupStopTimeoutSeconds must be a non-negative safe integer.');
  }
  nonEmptyString(input.providerId, 'Docker providerId');
  nonEmptyString(input.executionId, 'Docker executionId');
  nonEmptyString(input.sandboxId, 'Docker sandboxId');
  if (!Number.isSafeInteger(input.revision) || input.revision < 0) {
    throw new TypeError('Docker revision must be a non-negative safe integer.');
  }
}

function nonEmptyString(value: unknown, name: string): void {
  if (typeof value !== 'string' || value.trim().length === 0 || value.includes('\u0000')) {
    throw new TypeError(`${name} must be a non-empty string containing no NUL bytes.`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
