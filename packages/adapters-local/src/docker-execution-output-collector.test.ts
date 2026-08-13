import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type { CommandExecutionRequest } from '@codesoul-co/hypha-core';
import { afterEach, describe, expect, it } from 'vitest';
import type { DockerCliResult } from './docker-cli-transport';
import {
  bindDockerExecutionOutputArtifacts,
  LocalDockerExecutionOutputCollector,
  type DockerExecutionArtifactStreamPort,
} from './docker-execution-output-collector';
import type {
  LocalProcessArtifactStream,
  LocalProcessOutputArtifactPort,
  LocalProcessOutputArtifactStream,
  LocalProcessOutputArtifactStreamRequest,
} from './local-process-output-artifacts';

const roots: string[] = [];

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => fs.rm(root, { recursive: true, force: true })));
});

describe('LocalDockerExecutionOutputCollector', () => {
  it('captures the pre-execution snapshot and returns streamed Artifact and final Workspace evidence', async () => {
    const root = await workspace();
    await fs.writeFile(path.join(root, 'existing.txt'), 'before');
    const artifacts = new FakeArtifactPort();
    const collector = new LocalDockerExecutionOutputCollector({
      workspaceRoot: root,
      outputArtifacts: artifacts,
    });
    const session = await collector.prepare({
      executionId: 'execution.docker.1',
      workspaceRoot: root,
    });

    await fs.writeFile(path.join(root, 'existing.txt'), 'after');
    await fs.writeFile(path.join(root, 'created.txt'), 'created');
    await session.onOutput(output('stdout', 'out'));
    await session.onOutput(output('stderr', 'err'));
    const result = await session.collect({
      executionId: 'execution.docker.1',
      containerReference: 'container123',
      processResult: processResult(),
    });

    expect(result).toMatchObject({
      stdoutArtifactRef: 'artifact.execution.docker.1.stdout',
      stderrArtifactRef: 'artifact.execution.docker.1.stderr',
      generatedArtifactRefs: [],
      changedFiles: [
        {
          path: 'created.txt',
          operation: 'created',
          detectedAt: '2026-07-28T00:00:01.000Z',
        },
        {
          path: 'existing.txt',
          operation: 'modified',
          detectedAt: '2026-07-28T00:00:01.000Z',
        },
      ],
    });
    expect(artifacts.content('stdout')).toEqual(Buffer.from('out'));
    expect(artifacts.content('stderr')).toEqual(Buffer.from('err'));
  });

  it('rejects a Workspace mount that differs from the configured governed root', async () => {
    const root = await workspace();
    const other = await workspace();
    const collector = new LocalDockerExecutionOutputCollector({
      workspaceRoot: root,
      outputArtifacts: new FakeArtifactPort(),
    });

    await expect(
      collector.prepare({
        executionId: 'execution.docker.1',
        workspaceRoot: other,
      })
    ).rejects.toThrow('does not match');
  });

  it('accepts an equivalent Workspace root reached through a filesystem symlink', async () => {
    const root = await workspace();
    const aliasParent = await workspace();
    const alias = path.join(aliasParent, 'workspace-alias');
    await fs.symlink(root, alias, process.platform === 'win32' ? 'junction' : 'dir');
    const collector = new LocalDockerExecutionOutputCollector({
      workspaceRoot: alias,
      outputArtifacts: new FakeArtifactPort(),
    });

    await expect(
      collector.prepare({
        executionId: 'execution.docker.symlink',
        workspaceRoot: await fs.realpath(root),
      })
    ).resolves.toBeDefined();
  });

  it('opens a stream for truncated evidence even when the final event has no captured bytes', async () => {
    const root = await workspace();
    const artifacts = new FakeArtifactPort();
    const session = await new LocalDockerExecutionOutputCollector({
      workspaceRoot: root,
      outputArtifacts: artifacts,
    }).prepare({
      executionId: 'execution.docker.1',
      workspaceRoot: root,
    });

    await session.onOutput({
      stream: 'stdout',
      chunk: new Uint8Array(),
      truncated: true,
    });
    const result = await session.collect({
      executionId: 'execution.docker.1',
      containerReference: 'container123',
      processResult: processResult({ observedStdoutBytes: 12 }),
    });

    expect(result.stdoutArtifactRef).toBe('artifact.execution.docker.1.stdout');
  });

  it('aborts every opened stream when Artifact completion fails', async () => {
    const root = await workspace();
    const artifacts = new FakeArtifactPort('stderr');
    const session = await new LocalDockerExecutionOutputCollector({
      workspaceRoot: root,
      outputArtifacts: artifacts,
    }).prepare({
      executionId: 'execution.docker.1',
      workspaceRoot: root,
    });
    await session.onOutput(output('stdout', 'out'));
    await session.onOutput(output('stderr', 'err'));

    await expect(
      session.collect({
        executionId: 'execution.docker.1',
        containerReference: 'container123',
        processResult: processResult(),
      })
    ).rejects.toThrow('Artifact completion failed');
    expect(artifacts.aborted('stdout')).toBe(true);
    expect(artifacts.aborted('stderr')).toBe(true);
  });

  it('aborts output streams when the final Workspace snapshot cannot be collected', async () => {
    const root = await workspace();
    const artifacts = new FakeArtifactPort();
    const session = await new LocalDockerExecutionOutputCollector({
      workspaceRoot: root,
      outputArtifacts: artifacts,
      maxTrackedBytes: 4,
    }).prepare({
      executionId: 'execution.docker.1',
      workspaceRoot: root,
    });
    await session.onOutput(output('stdout', 'out'));
    await fs.writeFile(path.join(root, 'too-large.txt'), 'too large');

    await expect(
      session.collect({
        executionId: 'execution.docker.1',
        containerReference: 'container123',
        processResult: processResult(),
      })
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_RESOURCE_EXCEEDED' },
    });
    expect(artifacts.aborted('stdout')).toBe(true);
  });

  it('makes abort idempotent and rejects output after abort', async () => {
    const root = await workspace();
    const artifacts = new FakeArtifactPort();
    const session = await new LocalDockerExecutionOutputCollector({
      workspaceRoot: root,
      outputArtifacts: artifacts,
    }).prepare({
      executionId: 'execution.docker.1',
      workspaceRoot: root,
    });
    await session.onOutput(output('stdout', 'out'));

    await session.abort(new Error('execution failed'));
    await session.abort(new Error('duplicate abort'));

    expect(artifacts.abortCount('stdout')).toBe(1);
    await expect(session.onOutput(output('stdout', 'late'))).rejects.toThrow('aborted');
  });

  it('binds a runtime-validated command scope to the governed streaming Artifact port', () => {
    let opened: LocalProcessOutputArtifactStreamRequest | undefined;
    const stream = new FakeArtifactStream('artifact.stdout', false);
    const artifacts: LocalProcessOutputArtifactPort = {
      store: async () => 'artifact.compatibility',
      openStream: (input) => {
        opened = input;
        return stream;
      },
    };
    const request = commandRequest();
    const bound = bindDockerExecutionOutputArtifacts(artifacts, request);

    expect(
      bound.openStream({
        executionId: 'execution.docker.1',
        stream: 'stdout',
      })
    ).toBe(stream);
    expect(opened).toMatchObject({
      executionId: 'execution.docker.1',
      request,
      stream: 'stdout',
    });
    expect(() =>
      bindDockerExecutionOutputArtifacts(artifacts, {
        ...request,
        operationId: '',
      })
    ).toThrow();
  });
});

class FakeArtifactPort implements DockerExecutionArtifactStreamPort {
  private readonly streams = new Map<LocalProcessArtifactStream, FakeArtifactStream>();

  constructor(private readonly failCompletion?: LocalProcessArtifactStream) {}

  openStream(input: {
    executionId: string;
    stream: LocalProcessArtifactStream;
  }): LocalProcessOutputArtifactStream {
    if (this.streams.has(input.stream)) throw new Error('stream opened more than once');
    const stream = new FakeArtifactStream(
      `artifact.${input.executionId}.${input.stream}`,
      input.stream === this.failCompletion
    );
    this.streams.set(input.stream, stream);
    return stream;
  }

  content(stream: LocalProcessArtifactStream): Buffer {
    return Buffer.concat(this.streams.get(stream)?.chunks ?? []);
  }

  aborted(stream: LocalProcessArtifactStream): boolean {
    return this.streams.get(stream)?.wasAborted ?? false;
  }

  abortCount(stream: LocalProcessArtifactStream): number {
    return this.streams.get(stream)?.abortCalls ?? 0;
  }
}

class FakeArtifactStream implements LocalProcessOutputArtifactStream {
  readonly chunks: Buffer[] = [];
  wasAborted = false;
  abortCalls = 0;

  constructor(
    private readonly reference: string,
    private readonly failCompletion: boolean
  ) {}

  async append(chunk: Uint8Array): Promise<void> {
    this.chunks.push(Buffer.from(chunk));
  }

  async complete(): Promise<string> {
    if (this.failCompletion) throw new Error('Artifact completion failed');
    return this.reference;
  }

  async abort(_error: unknown): Promise<void> {
    this.abortCalls += 1;
    this.wasAborted = true;
  }
}

async function workspace(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-docker-output-'));
  roots.push(root);
  return root;
}

function output(
  stream: LocalProcessArtifactStream,
  content: string
): {
  stream: LocalProcessArtifactStream;
  chunk: Uint8Array;
  truncated: boolean;
} {
  return {
    stream,
    chunk: Buffer.from(content),
    truncated: false,
  };
}

function processResult(overrides: Partial<DockerCliResult> = {}): DockerCliResult {
  return {
    outcome: 'exited',
    exitCode: 0,
    stdout: 'out',
    stderr: 'err',
    observedStdoutBytes: 3,
    observedStderrBytes: 3,
    startedAt: '2026-07-28T00:00:00.000Z',
    completedAt: '2026-07-28T00:00:01.000Z',
    latencyMs: 1_000,
    terminationMechanism: 'posix_process_group',
    processTreeTerminationVerified: true,
    ...overrides,
  };
}

function commandRequest(): CommandExecutionRequest {
  return {
    operationId: 'operation.docker.output',
    principal: {
      principalId: 'principal.local',
      type: 'user',
      userId: 'user.local',
      permissionScopes: ['execution.run', 'artifact:write'],
    },
    userId: 'user.local',
    workspaceId: 'workspace.local',
    runId: 'run.local',
    environmentRef: { id: 'execution-environment.docker', version: '1.0.0' },
    executable: 'node',
  };
}
