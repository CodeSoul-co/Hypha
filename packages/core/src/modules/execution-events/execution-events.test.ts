import { describe, expect, it } from 'vitest';
import { createFrameworkEvent } from '../../events';
import {
  commandExecutionEventExample,
  createExecutionFrameworkEvent,
  executionEventJsonSchemas,
  executionFrameworkEventTypes,
  networkAuthorizationEventExample,
  sandboxLifecycleEventExample,
  validateExecutionEventPayload,
  validateExecutionFrameworkEvent,
} from './index';

describe('Execution lifecycle Event contracts', () => {
  it('validates Sandbox, Command, and Network event fixtures', () => {
    expect(validateExecutionFrameworkEvent(sandboxLifecycleEventExample)).toEqual(
      sandboxLifecycleEventExample
    );
    expect(validateExecutionFrameworkEvent(commandExecutionEventExample)).toEqual(
      commandExecutionEventExample
    );
    expect(validateExecutionFrameworkEvent(networkAuthorizationEventExample)).toEqual(
      networkAuthorizationEventExample
    );
  });

  it('exports every lifecycle event type and payload JSON Schema', () => {
    expect(executionFrameworkEventTypes).toHaveLength(28);
    expect(executionFrameworkEventTypes).toEqual(
      expect.arrayContaining([
        'sandbox.create.requested',
        'command.execution.completed',
        'network.authorization.revoked',
      ])
    );
    expect(Object.keys(executionEventJsonSchemas)).toEqual(
      expect.arrayContaining([
        'ExecutionEventPayloadBase',
        'SandboxLifecycleEventPayload',
        'CommandExecutionEventPayload',
        'NetworkAuthorizationEventPayload',
        'ExecutionFrameworkEvent',
      ])
    );
  });

  it('keeps the existing Framework event factory compatible with new types', () => {
    const event = createFrameworkEvent({
      id: 'event.execution.requested.example',
      type: 'command.execution.requested',
      workspaceId: 'workspace.example',
      runId: 'run.example',
      timestamp: '2026-07-16T00:00:00.000Z',
      payload: {
        operationId: 'operation.command.example',
        executionId: 'execution.example',
        workspaceId: 'workspace.example',
      },
    });
    expect(event.type).toBe('command.execution.requested');
  });

  it('creates and validates a typed Execution framework event', () => {
    const event = createExecutionFrameworkEvent({
      id: 'event.command.queued.example',
      type: 'command.execution.queued',
      workspaceId: 'workspace.example',
      runId: 'run.example',
      timestamp: '2026-07-16T00:00:00.000Z',
      payload: {
        executionId: 'execution.example',
        workspaceId: 'workspace.example',
        status: 'queued',
      },
    });
    expect(event.payload.status).toBe('queued');
  });

  it('requires create-request identity before a Sandbox ID exists', () => {
    expect(
      validateExecutionEventPayload('sandbox.create.requested', {
        operationId: 'operation.sandbox.create.example',
        workspaceId: 'workspace.example',
        environmentId: 'environment.example',
        environmentRevision: 'sha256:environment',
      }).sandboxId
    ).toBeUndefined();
    expect(() =>
      validateExecutionEventPayload('sandbox.create.requested', {
        operationId: 'operation.sandbox.create.example',
        workspaceId: 'workspace.example',
        environmentId: 'environment.example',
      })
    ).toThrow(/environmentRevision/u);
  });

  it('requires Sandbox event status to match its lifecycle name', () => {
    expect(() =>
      validateExecutionEventPayload('sandbox.ready', {
        sandboxId: 'sandbox.example',
        providerId: 'provider.docker.example',
        status: 'starting',
      })
    ).toThrow(/must be ready/u);
    expect(() =>
      validateExecutionEventPayload('sandbox.cleanup.failed', {
        sandboxId: 'sandbox.example',
        status: 'failed',
      })
    ).toThrow(/error/u);
  });

  it('requires Command terminal evidence and matching normalized errors', () => {
    expect(() =>
      validateExecutionEventPayload('command.execution.completed', {
        executionId: 'execution.example',
        status: 'completed',
        latencyMs: 10,
      })
    ).toThrow(/exitCode/u);
    expect(() =>
      validateExecutionEventPayload('command.execution.timeout', {
        executionId: 'execution.example',
        status: 'timed_out',
        error: {
          code: 'EXECUTION_OOM_KILLED',
          message: 'wrong error',
          retryable: false,
        },
      })
    ).toThrow(/must match/u);
    expect(
      validateExecutionEventPayload('command.execution.timeout', {
        executionId: 'execution.example',
        status: 'timed_out',
        error: {
          code: 'EXECUTION_TIMEOUT',
          message: 'execution timed out',
          retryable: true,
        },
      }).status
    ).toBe('timed_out');
  });

  it('requires output truncation events to name the affected stream', () => {
    expect(() =>
      validateExecutionEventPayload('command.execution.output.truncated', {
        executionId: 'execution.example',
        outputStream: 'stdout',
        outputTruncated: false,
      })
    ).toThrow(/must be true/u);
    expect(
      validateExecutionEventPayload('command.execution.output.truncated', {
        executionId: 'execution.example',
        outputStream: 'stderr',
        outputTruncated: true,
        artifactRefs: ['artifact:stderr'],
      }).outputStream
    ).toBe('stderr');
  });

  it('distinguishes unknown and recovered Provider results', () => {
    expect(() =>
      validateExecutionEventPayload('command.execution.result.unknown', {
        executionId: 'execution.example',
        recoveryDisposition: 'provider_state_unknown',
      })
    ).toThrow(/error/u);
    expect(
      validateExecutionEventPayload('command.execution.result.unknown', {
        executionId: 'execution.example',
        recoveryDisposition: 'provider_state_unknown',
        error: {
          code: 'EXECUTION_RESULT_UNKNOWN',
          message: 'Provider state could not be queried',
          retryable: false,
        },
      }).recoveryDisposition
    ).toBe('provider_state_unknown');
  });

  it('binds Network event names to decisions and grant expiry', () => {
    expect(() =>
      validateExecutionEventPayload('network.authorization.granted', {
        executionId: 'execution.example',
        authorizationId: 'authorization.example',
        networkPolicyHash: 'sha256:network-policy',
        decision: 'granted',
      })
    ).toThrow(/expiresAt/u);
    expect(() =>
      validateExecutionEventPayload('network.authorization.denied', {
        executionId: 'execution.example',
        authorizationId: 'authorization.example',
        networkPolicyHash: 'sha256:network-policy',
        decision: 'granted',
        reason: 'Policy denied access',
      })
    ).toThrow(/must be denied/u);
  });

  it('rejects duplicate Artifact references', () => {
    expect(() =>
      validateExecutionEventPayload('command.execution.completed', {
        executionId: 'execution.example',
        status: 'completed',
        exitCode: 0,
        latencyMs: 10,
        artifactRefs: ['artifact:one', 'artifact:one'],
      })
    ).toThrow(/duplicate Artifact/u);
  });

  it('rejects plaintext Secrets, raw output, host paths, and environment values', () => {
    for (const metadata of [
      { secretValue: 'plaintext' },
      { stdout: 'unbounded output' },
      { nested: { hostPath: 'C:\\Users\\example' } },
      { environmentVariables: { TOKEN: 'plaintext' } },
    ]) {
      expect(() =>
        validateExecutionEventPayload('command.execution.queued', {
          executionId: 'execution.example',
          status: 'queued',
          metadata,
        })
      ).toThrow(/forbidden/u);
    }
  });

  it('rejects unknown top-level payload and envelope fields instead of silently stripping them', () => {
    expect(() =>
      validateExecutionEventPayload('command.execution.queued', {
        executionId: 'execution.example',
        status: 'queued',
        stdout: 'unbounded output',
      })
    ).toThrow();
    expect(() =>
      validateExecutionFrameworkEvent({
        ...commandExecutionEventExample,
        secretValue: 'plaintext',
      })
    ).toThrow();
  });

  it('applies sensitive-field checks to nested normalized error details', () => {
    expect(() =>
      validateExecutionEventPayload('command.execution.failed', {
        executionId: 'execution.example',
        status: 'failed',
        error: {
          code: 'EXECUTION_INTERNAL_ERROR',
          message: 'provider failed',
          retryable: false,
          details: { secret: 'plaintext' },
        },
      })
    ).toThrow(/forbidden/u);
  });

  it('keeps envelope and payload Workspace identity consistent', () => {
    expect(() =>
      validateExecutionFrameworkEvent({
        ...commandExecutionEventExample,
        workspaceId: 'workspace.one',
        payload: { ...commandExecutionEventExample.payload, workspaceId: 'workspace.two' },
      })
    ).toThrow(/event workspaceId/u);
  });

  it('rejects sensitive data in event-envelope metadata', () => {
    expect(() =>
      validateExecutionFrameworkEvent({
        ...commandExecutionEventExample,
        metadata: { rawOutput: 'unbounded output' },
      })
    ).toThrow(/forbidden/u);
  });
});
