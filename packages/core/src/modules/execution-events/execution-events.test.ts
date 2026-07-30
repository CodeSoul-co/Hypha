import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import { createFrameworkEvent } from '../../events';
import {
  commandExecutionEventPayloadSchema,
  commandExecutionEventExample,
  createExecutionFrameworkEvent,
  executionEventJsonSchemas,
  executionFrameworkEventTypes,
  networkAuthorizationEventExample,
  sandboxLifecycleEventPayloadSchema,
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

  it('binds each public event type to its payload contract', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    const validate = ajv.compile(executionEventJsonSchemas.ExecutionFrameworkEvent);

    expect(validate(sandboxLifecycleEventExample)).toBe(true);
    expect(validate(commandExecutionEventExample)).toBe(true);
    expect(validate(networkAuthorizationEventExample)).toBe(true);

    const commandRequested = {
      id: 'event.command.requested.example',
      type: 'command.execution.requested',
      workspaceId: 'workspace.example',
      runId: 'run.example',
      timestamp: '2026-07-16T00:00:00.000Z',
      payload: {
        operationId: 'operation.command.example',
        executionId: 'execution.example',
        workspaceId: 'workspace.example',
      },
    };
    expect(validateExecutionFrameworkEvent(commandRequested)).toEqual(commandRequested);
    expect(validate(commandRequested)).toBe(true);

    const mismatchedPayload = {
      ...commandExecutionEventExample,
      payload: sandboxLifecycleEventExample.payload,
    };
    expect(() => validateExecutionFrameworkEvent(mismatchedPayload)).toThrow();
    expect(validate(mismatchedPayload)).toBe(false);

    const incompleteCompleted = {
      ...commandExecutionEventExample,
      payload: {
        executionId: 'execution.example',
        status: 'completed',
        exitCode: 0,
      },
    };
    expect(() => validateExecutionFrameworkEvent(incompleteCompleted)).toThrow(/latencyMs/u);
    expect(validate(incompleteCompleted)).toBe(false);
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
      operationId: 'operation.command.example',
      timestamp: '2026-07-16T00:00:00.000Z',
      payload: {
        operationId: 'operation.command.example',
        executionId: 'execution.example',
        workspaceId: 'workspace.example',
        status: 'queued',
      },
    });
    expect(event.payload.status).toBe('queued');
    expect(event.operationId).toBe('operation.command.example');
  });

  it('preserves Framework correlation and idempotency identities across public contracts', () => {
    const event = createExecutionFrameworkEvent({
      id: 'event.command.queued.correlated',
      type: 'command.execution.queued',
      workspaceId: 'workspace.example',
      runId: 'run.example',
      correlationId: 'correlation.execution.example',
      causationId: 'event.command.requested.example',
      parentEventId: 'event.run.started.example',
      idempotencyKey: 'execution.example:queued',
      timestamp: '2026-07-16T00:00:00.000Z',
      payload: {
        executionId: 'execution.example',
        workspaceId: 'workspace.example',
        status: 'queued',
      },
    });
    expect(event).toMatchObject({
      correlationId: 'correlation.execution.example',
      causationId: 'event.command.requested.example',
      parentEventId: 'event.run.started.example',
      idempotencyKey: 'execution.example:queued',
    });

    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    expect(ajv.validate(executionEventJsonSchemas.ExecutionFrameworkEvent, event)).toBe(true);
  });

  it('preserves Framework creation ownership context without accepting persistence fields', () => {
    const event = createExecutionFrameworkEvent({
      id: 'event.command.queued.owned',
      type: 'command.execution.queued',
      version: '1.0.0',
      tenantId: 'tenant.example',
      userId: 'user.example',
      workspaceId: 'workspace.example',
      runId: 'run.example',
      branchId: 'branch.example',
      timestamp: '2026-07-16T00:00:00.000Z',
      payload: {
        executionId: 'execution.example',
        workspaceId: 'workspace.example',
        status: 'queued',
      },
    });

    expect(event).toMatchObject({
      version: '1.0.0',
      tenantId: 'tenant.example',
      userId: 'user.example',
      branchId: 'branch.example',
    });
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    expect(ajv.validate(executionEventJsonSchemas.ExecutionFrameworkEvent, event)).toBe(true);

    for (const persistenceField of [
      ['sequence', 1],
      ['globalSequence', 1],
      ['recordedAt', '2026-07-16T00:00:01.000Z'],
      ['payloadHash', 'sha256:persisted'],
    ] as const) {
      const persistedShape = { ...event, [persistenceField[0]]: persistenceField[1] };
      expect(() => validateExecutionFrameworkEvent(persistedShape)).toThrow();
      expect(
        ajv.validate(executionEventJsonSchemas.ExecutionFrameworkEvent, persistedShape)
      ).toBe(false);
    }
  });

  it.each(['correlationId', 'causationId', 'parentEventId', 'idempotencyKey'] as const)(
    'rejects an empty Framework %s in runtime and public contracts',
    (field) => {
      const event = { ...commandExecutionEventExample, [field]: '' };
      expect(() => validateExecutionFrameworkEvent(event)).toThrow();

      const ajv = new Ajv({ strict: true, allErrors: true });
      addFormats(ajv);
      expect(ajv.validate(executionEventJsonSchemas.ExecutionFrameworkEvent, event)).toBe(false);
    }
  );

  it.each(['version', 'tenantId', 'userId', 'branchId'] as const)(
    'rejects an empty Framework creation-context %s in runtime and public contracts',
    (field) => {
      const event = { ...commandExecutionEventExample, [field]: '' };
      expect(() => validateExecutionFrameworkEvent(event)).toThrow();

      const ajv = new Ajv({ strict: true, allErrors: true });
      addFormats(ajv);
      expect(ajv.validate(executionEventJsonSchemas.ExecutionFrameworkEvent, event)).toBe(false);
    }
  );

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

  it('keeps missing Sandbox capability uniqueness aligned across public contracts', () => {
    const duplicateCapabilities = {
      sandboxId: 'sandbox.example',
      status: 'degraded' as const,
      missingCapabilities: ['networkIsolation', 'networkIsolation'] as const,
    };

    expect(sandboxLifecycleEventPayloadSchema.safeParse(duplicateCapabilities).success).toBe(
      false
    );

    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    expect(
      ajv.validate(
        executionEventJsonSchemas.SandboxLifecycleEventPayload,
        duplicateCapabilities
      )
    ).toBe(false);

    const distinctCapabilities = {
      ...duplicateCapabilities,
      missingCapabilities: ['networkIsolation', 'filesystemIsolation'],
    };
    expect(sandboxLifecycleEventPayloadSchema.safeParse(distinctCapabilities).success).toBe(true);
    expect(
      ajv.validate(
        executionEventJsonSchemas.SandboxLifecycleEventPayload,
        distinctCapabilities
      )
    ).toBe(true);
  });

  it('requires Command terminal evidence and matching normalized errors', () => {
    const completedWithError = {
      executionId: 'execution.example',
      status: 'completed' as const,
      exitCode: 0,
      latencyMs: 10,
      error: {
        code: 'EXECUTION_INTERNAL_ERROR' as const,
        message: 'a successful terminal cannot carry an error',
        retryable: false,
      },
    };

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
    expect(() =>
      validateExecutionEventPayload('command.execution.completed', completedWithError)
    ).toThrow(/must not be present/u);

    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    expect(
      ajv.validate(
        executionEventJsonSchemas.CommandExecutionEventPayload,
        completedWithError
      )
    ).toBe(false);
    expect(
      validateExecutionEventPayload('command.execution.completed', {
        executionId: 'execution.example',
        status: 'completed',
        exitCode: 0,
        latencyMs: 10,
      }).status
    ).toBe('completed');
  });

  it.each([
    ['cancelled', 'EXECUTION_CANCELLED'],
    ['failed', 'EXECUTION_INTERNAL_ERROR'],
    ['timed_out', 'EXECUTION_TIMEOUT'],
    ['oom_killed', 'EXECUTION_OOM_KILLED'],
    ['resource_exceeded', 'EXECUTION_RESOURCE_EXCEEDED'],
    ['quarantined', 'EXECUTION_INTERNAL_ERROR'],
  ] as const)(
    'requires error evidence in the public contract for %s status',
    (status, errorCode) => {
      const payload = {
        executionId: 'execution.example',
        status,
      };

      expect(commandExecutionEventPayloadSchema.safeParse(payload).success).toBe(false);

      const ajv = new Ajv({ strict: true, allErrors: true });
      addFormats(ajv);
      expect(
        ajv.validate(executionEventJsonSchemas.CommandExecutionEventPayload, payload)
      ).toBe(false);

      const withError = {
        ...payload,
        error: {
          code: errorCode,
          message: `execution ended as ${status}`,
          retryable: false,
        },
      };
      expect(commandExecutionEventPayloadSchema.safeParse(withError).success).toBe(true);
      expect(
        ajv.validate(executionEventJsonSchemas.CommandExecutionEventPayload, withError)
      ).toBe(true);
    }
  );

  it.each(['cancelled', 'timed_out', 'oom_killed', 'resource_exceeded'] as const)(
    'requires the public error code to match %s status',
    (status) => {
      const payload = {
        executionId: 'execution.example',
        status,
        error: {
          code: 'EXECUTION_INTERNAL_ERROR',
          message: 'wrong terminal error code',
          retryable: false,
        },
      };

      expect(commandExecutionEventPayloadSchema.safeParse(payload).success).toBe(false);

      const ajv = new Ajv({ strict: true, allErrors: true });
      addFormats(ajv);
      expect(
        ajv.validate(executionEventJsonSchemas.CommandExecutionEventPayload, payload)
      ).toBe(false);
    }
  );

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

  it('accepts bounded nested metadata and shared non-cyclic values', () => {
    const shared = { attempt: 1, outcome: 'retryable' };
    expect(
      validateExecutionEventPayload('command.execution.queued', {
        executionId: 'execution.example',
        status: 'queued',
        metadata: {
          scheduling: { queue: 'default', policy: { priority: 2 } },
          first: shared,
          second: shared,
        },
      })
    ).toMatchObject({
      metadata: {
        scheduling: { queue: 'default', policy: { priority: 2 } },
        first: shared,
        second: shared,
      },
    });
  });

  it('rejects metadata that exceeds depth, node, or serialized-size limits', () => {
    const deeplyNested: Record<string, unknown> = {};
    let cursor = deeplyNested;
    for (let depth = 0; depth < 40; depth += 1) {
      const child: Record<string, unknown> = {};
      cursor.next = child;
      cursor = child;
    }

    for (const [metadata, message] of [
      [deeplyNested, /nesting depth/u],
      [{ values: Array.from({ length: 4_096 }, () => 0) }, /node limit/u],
      [{ note: 'x'.repeat(65_536) }, /serialized size limit/u],
    ] as const) {
      expect(() =>
        validateExecutionEventPayload('command.execution.queued', {
          executionId: 'execution.example',
          status: 'queued',
          metadata,
        })
      ).toThrow(message);
    }
  });

  it('rejects circular metadata deterministically', () => {
    const circular: Record<string, unknown> = {};
    circular.self = circular;

    expect(() =>
      validateExecutionEventPayload('command.execution.queued', {
        executionId: 'execution.example',
        status: 'queued',
        metadata: circular,
      })
    ).toThrow(/circular references/u);
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

  it('applies traversal bounds to normalized error details and envelope metadata', () => {
    const deeplyNested: Record<string, unknown> = {};
    let cursor = deeplyNested;
    for (let depth = 0; depth < 40; depth += 1) {
      const child: Record<string, unknown> = {};
      cursor.next = child;
      cursor = child;
    }
    expect(() =>
      validateExecutionEventPayload('command.execution.failed', {
        executionId: 'execution.example',
        status: 'failed',
        error: {
          code: 'EXECUTION_INTERNAL_ERROR',
          message: 'provider failed',
          retryable: false,
          details: deeplyNested,
        },
      })
    ).toThrow(/nesting depth/u);

    const circular: Record<string, unknown> = {};
    circular.self = circular;
    expect(() =>
      validateExecutionFrameworkEvent({
        ...commandExecutionEventExample,
        metadata: circular,
      })
    ).toThrow(/circular references/u);
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

  it('keeps envelope and payload operation identity consistent', () => {
    expect(() =>
      validateExecutionFrameworkEvent({
        ...commandExecutionEventExample,
        operationId: 'operation.envelope',
        payload: {
          ...commandExecutionEventExample.payload,
          operationId: 'operation.payload',
        },
      })
    ).toThrow(/event operationId/u);
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
