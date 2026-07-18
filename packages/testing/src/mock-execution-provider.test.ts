import { describe, expect, it } from 'vitest';
import {
  commandExecutionRequestExample,
  createExecutionFrameworkEvent,
  executionEnvironmentSpecExample,
  sandboxCreateRequestExample,
  validateCommandExecutionResult,
  validateSandboxRecord,
} from '@hypha/core';
import {
  createMockExecutionProviderFactory,
  MockExecutionProvider,
  MockExecutionProviderError,
} from './mock-execution-provider';

const fixedNow = () => '2026-07-17T00:00:00.000Z';
const principal = sandboxCreateRequestExample.principal;

describe('MockExecutionProvider', () => {
  it('exposes a deterministic Factory for root DI registration', async () => {
    const factory = createMockExecutionProviderFactory({ id: 'provider.mock.test' });

    expect(factory).toMatchObject({ providerType: 'mock', providerId: 'provider.mock.test' });
    expect(await factory.create()).toMatchObject({ id: 'provider.mock.test' });
  });

  it('runs a deterministic lifecycle with configured output and file evidence', async () => {
    const provider = new MockExecutionProvider({
      now: fixedNow,
      behaviors: [
        {
          stdout: '{"ok":true}\n',
          stderr: '',
          changedFiles: [
            {
              path: 'outputs/report.json',
              operation: 'created',
              afterHash: 'sha256:report',
              afterSizeBytes: 12,
              artifactRef: 'artifact:report',
              detectedAt: fixedNow(),
            },
          ],
          generatedArtifactRefs: ['artifact:report'],
          resourceUsage: { cpuTimeMs: 5, outputBytes: 12 },
        },
      ],
    });

    expect(await provider.capabilities()).toMatchObject({
      cancellation: true,
      processTreeKill: true,
      snapshots: true,
      processIsolation: false,
    });
    const created = await provider.create(sandboxCreateRequestExample);
    expect(validateSandboxRecord(created)).toMatchObject({ status: 'created', revision: 0 });

    const ready = await provider.start({
      operationId: 'operation.sandbox.start',
      sandboxId: created.id,
      principal,
      expectedRevision: 0,
    });
    expect(ready).toMatchObject({ status: 'ready', revision: 2 });

    const result = await provider.execute({
      ...commandExecutionRequestExample,
      executionId: 'execution.mock.success',
      sandboxId: created.id,
      snapshotBefore: false,
      snapshotAfter: false,
      snapshotOnFailure: false,
    });
    expect(validateCommandExecutionResult(result)).toMatchObject({
      executionId: 'execution.mock.success',
      status: 'completed',
      revision: 3,
      exitCode: 0,
      stdout: '{"ok":true}\n',
      changedFiles: [expect.objectContaining({ path: 'outputs/report.json' })],
      generatedArtifactRefs: ['artifact:report'],
    });
    const traceEvent = createExecutionFrameworkEvent({
      id: 'event.mock.execution.completed',
      type: 'command.execution.completed',
      workspaceId: commandExecutionRequestExample.workspaceId,
      runId: commandExecutionRequestExample.runId,
      timestamp: fixedNow(),
      payload: {
        operationId: commandExecutionRequestExample.operationId,
        executionId: result.executionId,
        revision: result.revision,
        providerId: provider.id,
        sandboxId: result.sandboxId,
        workspaceId: commandExecutionRequestExample.workspaceId,
        artifactRefs: result.generatedArtifactRefs,
        status: result.status,
        exitCode: result.exitCode,
        latencyMs: result.latencyMs,
        resourceUsage: result.resourceUsage,
      },
    });
    expect(traceEvent).toMatchObject({
      type: 'command.execution.completed',
      payload: {
        executionId: 'execution.mock.success',
        resourceUsage: { cpuTimeMs: 5, outputBytes: 12 },
      },
    });

    const afterExecution = await provider.status({ sandboxId: created.id, principal });
    expect(afterExecution).toMatchObject({ status: 'ready', revision: 4 });
    await provider.cleanup({
      operationId: 'operation.sandbox.cleanup',
      sandboxId: created.id,
      principal,
      expectedRevision: 4,
    });
    await expect(provider.status({ sandboxId: created.id, principal })).resolves.toMatchObject({
      status: 'cleaned',
      revision: 6,
      cleanedAt: fixedNow(),
    });
  });

  it('makes timeout, retry, and normalized failures controllable in queue order', async () => {
    const provider = new MockExecutionProvider({
      now: fixedNow,
      behaviors: [
        { status: 'timed_out', delayMs: 25 },
        { stdout: 'retry succeeded' },
        {
          status: 'failed',
          stderr: 'fixture failure',
          error: {
            code: 'EXECUTION_PROCESS_START_FAILED',
            message: 'Injected process start failure.',
            retryable: true,
            providerCode: 'MOCK_START_FAILURE',
          },
        },
      ],
    });
    const ready = await createReadySandbox(provider);

    await expect(
      provider.execute({
        ...commandExecutionRequestExample,
        executionId: 'execution.mock.timeout',
        sandboxId: ready.id,
      })
    ).resolves.toMatchObject({
      status: 'timed_out',
      latencyMs: 25,
      error: { code: 'EXECUTION_TIMEOUT', retryable: true },
    });
    await expect(
      provider.execute({
        ...commandExecutionRequestExample,
        executionId: 'execution.mock.retry',
        sandboxId: ready.id,
      })
    ).resolves.toMatchObject({
      status: 'completed',
      stdout: 'retry succeeded',
    });
    await expect(
      provider.execute({
        ...commandExecutionRequestExample,
        executionId: 'execution.mock.failure',
        sandboxId: ready.id,
      })
    ).resolves.toMatchObject({
      status: 'failed',
      stderr: 'fixture failure',
      error: {
        code: 'EXECUTION_PROCESS_START_FAILED',
        providerCode: 'MOCK_START_FAILURE',
      },
    });
  });

  it('interrupts a configured delay through the governed cancel request', async () => {
    const provider = new MockExecutionProvider({
      now: fixedNow,
      defaultBehavior: { delayMs: 60_000, stdout: 'must not affect cancellation' },
    });
    const ready = await createReadySandbox(provider);
    const execution = provider.execute({
      ...commandExecutionRequestExample,
      executionId: 'execution.mock.cancel',
      sandboxId: ready.id,
    });

    await provider.cancel({
      operationId: 'operation.execution.cancel',
      executionId: 'execution.mock.cancel',
      principal,
      expectedRevision: 2,
      reason: 'test cancellation',
    });

    await expect(execution).resolves.toMatchObject({
      status: 'cancelled',
      revision: 4,
      exitCode: null,
      error: { code: 'EXECUTION_CANCELLED', retryable: false },
    });
  });

  it('restores the Sandbox when an invalid failure fixture is rejected', async () => {
    const provider = new MockExecutionProvider({
      now: fixedNow,
      defaultBehavior: { delayMs: -1 },
    });
    const ready = await createReadySandbox(provider);

    await expect(
      provider.execute({
        ...commandExecutionRequestExample,
        executionId: 'execution.mock.invalid-fixture',
        sandboxId: ready.id,
      })
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_INVALID_REQUEST' },
    });
    await expect(provider.status({ sandboxId: ready.id, principal })).resolves.toMatchObject({
      status: 'ready',
      activeExecutionIds: [],
    });
  });

  it('fails closed for incompatible environments, stale revisions, and closed health', async () => {
    const provider = new MockExecutionProvider({ now: fixedNow });
    await expect(
      provider.create({
        ...sandboxCreateRequestExample,
        environment: executionEnvironmentSpecExample,
      })
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_ENVIRONMENT_UNAVAILABLE' },
    });

    const created = await provider.create(sandboxCreateRequestExample);
    await expect(
      provider.start({
        operationId: 'operation.sandbox.stale-start',
        sandboxId: created.id,
        principal,
        expectedRevision: 7,
      })
    ).rejects.toMatchObject({
      normalizedError: {
        code: 'EXECUTION_REVISION_CONFLICT',
        details: { actualRevision: 0, expectedRevision: 7 },
      },
    });

    await provider.close();
    await expect(provider.health()).resolves.toMatchObject({
      status: 'unhealthy',
      message: expect.stringContaining('closed'),
    });
    await expect(provider.capabilities()).rejects.toBeInstanceOf(MockExecutionProviderError);
  });
});

async function createReadySandbox(provider: MockExecutionProvider) {
  const created = await provider.create(sandboxCreateRequestExample);
  return provider.start({
    operationId: 'operation.sandbox.start',
    sandboxId: created.id,
    principal,
    expectedRevision: created.revision,
  });
}
