import path from 'node:path';
import {
  validateCommandExecutionRequest,
  type CommandExecutionRequest,
} from '@hypha/core';
import type { DockerCliResult } from './docker-cli-transport';
import type {
  DockerExecutionCollectedOutputs,
  DockerExecutionOutputCollector,
  DockerExecutionOutputSession,
} from './docker-execution-coordinator';
import type {
  LocalProcessArtifactStream,
  LocalProcessOutputArtifactPort,
  LocalProcessOutputArtifactStream,
} from './local-process-output-artifacts';
import type { LocalProcessOutputEvent } from './local-process-supervisor';
import { LocalWorkspaceAdapter } from './local-workspace-adapter';
import type { LocalWorkspaceSnapshot } from './local-workspace-mutations';

export interface DockerExecutionArtifactStreamPort {
  openStream(input: {
    executionId: string;
    stream: LocalProcessArtifactStream;
  }): LocalProcessOutputArtifactStream;
}

export interface DockerExecutionOutputCollectorOptions {
  workspaceRoot: string;
  outputArtifacts: DockerExecutionArtifactStreamPort;
  maxTrackedFiles?: number;
  maxTrackedBytes?: number;
}

/**
 * Binds Docker output collection to one governed Workspace and Artifact port.
 * The coordinator prepares it before container creation and only calls collect
 * after the container has been stopped and re-inspected as quiescent.
 */
export class LocalDockerExecutionOutputCollector implements DockerExecutionOutputCollector {
  private readonly workspace: LocalWorkspaceAdapter;
  private readonly outputArtifacts: DockerExecutionArtifactStreamPort;

  constructor(options: DockerExecutionOutputCollectorOptions) {
    this.workspace = new LocalWorkspaceAdapter({
      workspaceRoot: options.workspaceRoot,
      maxTrackedFiles: options.maxTrackedFiles,
      maxTrackedBytes: options.maxTrackedBytes,
    });
    this.outputArtifacts = options.outputArtifacts;
  }

  async prepare(input: {
    executionId: string;
    workspaceRoot: string;
  }): Promise<DockerExecutionOutputSession> {
    if (!sameResolvedPath(input.workspaceRoot, this.workspace.workspaceRoot)) {
      throw new Error('Docker Workspace mount does not match the configured output collector.');
    }
    await this.workspace.assertAvailable();
    const before = await this.workspace.capture();
    return new LocalDockerExecutionOutputSession(
      input.executionId,
      this.workspace,
      before,
      this.outputArtifacts
    );
  }
}

/**
 * Adapts the existing governed output Artifact port to a single Docker command
 * request without registering a Docker Provider or Factory.
 */
export function bindDockerExecutionOutputArtifacts(
  artifacts: LocalProcessOutputArtifactPort,
  request: CommandExecutionRequest
): DockerExecutionArtifactStreamPort {
  if (!artifacts.openStream) {
    throw new TypeError('Docker output collection requires streaming Artifact persistence.');
  }
  const validatedRequest = validateCommandExecutionRequest(request);
  const openStream = artifacts.openStream.bind(artifacts);
  return {
    openStream: ({ executionId, stream }) =>
      openStream({
        executionId,
        request: validatedRequest,
        stream,
      }),
  };
}

type SessionState = 'open' | 'collecting' | 'collected' | 'aborted';

class LocalDockerExecutionOutputSession implements DockerExecutionOutputSession {
  private readonly streams: Partial<
    Record<LocalProcessArtifactStream, LocalProcessOutputArtifactStream>
  > = {};
  private state: SessionState = 'open';

  constructor(
    private readonly executionId: string,
    private readonly workspace: LocalWorkspaceAdapter,
    private readonly before: LocalWorkspaceSnapshot,
    private readonly outputArtifacts: DockerExecutionArtifactStreamPort
  ) {}

  async onOutput(event: LocalProcessOutputEvent): Promise<void> {
    this.assertOpen();
    const stream =
      this.streams[event.stream] ??
      this.outputArtifacts.openStream({
        executionId: this.executionId,
        stream: event.stream,
      });
    this.streams[event.stream] = stream;
    if (event.chunk.byteLength > 0) await stream.append(event.chunk);
  }

  async collect(input: {
    executionId: string;
    containerReference: string;
    processResult: DockerCliResult;
  }): Promise<DockerExecutionCollectedOutputs> {
    this.assertOpen();
    if (input.executionId !== this.executionId) {
      throw new Error('Docker output session execution identity changed.');
    }
    this.state = 'collecting';
    try {
      const after = await this.workspace.capture();
      const changedFiles = this.workspace.diff(
        this.before,
        after,
        input.processResult.completedAt
      );
      const [stdoutArtifactRef, stderrArtifactRef] = await Promise.all([
        this.streams.stdout?.complete(),
        this.streams.stderr?.complete(),
      ]);
      this.state = 'collected';
      return {
        changedFiles,
        generatedArtifactRefs: [],
        ...(stdoutArtifactRef ? { stdoutArtifactRef } : {}),
        ...(stderrArtifactRef ? { stderrArtifactRef } : {}),
      };
    } catch (error) {
      await this.abortStreams(error);
      this.state = 'aborted';
      throw error;
    }
  }

  async abort(error: unknown): Promise<void> {
    if (this.state === 'aborted' || this.state === 'collected') return;
    this.state = 'aborted';
    await this.abortStreams(error);
  }

  private assertOpen(): void {
    if (this.state !== 'open') {
      throw new Error(`Docker output session is ${this.state}.`);
    }
  }

  private async abortStreams(error: unknown): Promise<void> {
    await Promise.allSettled(Object.values(this.streams).map((stream) => stream.abort(error)));
  }
}

function sameResolvedPath(left: string, right: string): boolean {
  return path.relative(path.resolve(left), path.resolve(right)) === '';
}
