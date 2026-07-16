import { describe, expect, it } from 'vitest';
import {
  canTransitionCommandExecutionStatus,
  commandExecutionJsonSchemas,
  commandExecutionRequestExample,
  commandExecutionResultExample,
  commandOutputChunkExample,
  executionCancelRequestExample,
  validateCommandExecutionRequest,
  validateCommandExecutionResult,
  validateCommandOutputChunk,
  validateExecutionCancelRequest,
} from './index';

describe('Command execution contracts', () => {
  it('validates the request, result, output, and cancellation fixtures', () => {
    expect(validateCommandExecutionRequest(commandExecutionRequestExample)).toEqual(
      commandExecutionRequestExample
    );
    expect(validateCommandExecutionResult(commandExecutionResultExample)).toEqual(
      commandExecutionResultExample
    );
    expect(validateCommandOutputChunk(commandOutputChunkExample)).toEqual(
      commandOutputChunkExample
    );
    expect(validateExecutionCancelRequest(executionCancelRequestExample)).toEqual(
      executionCancelRequestExample
    );
  });

  it('exports JSON Schemas for every command boundary', () => {
    expect(Object.keys(commandExecutionJsonSchemas)).toEqual(
      expect.arrayContaining([
        'CommandExecutionRequest',
        'CommandExecutionResult',
        'ExecutionResourceUsage',
        'ExecutionReceipt',
        'CommandOutputChunk',
        'ExecutionCancelRequest',
      ])
    );
    expect(commandExecutionJsonSchemas.CommandExecutionRequest.required).toContain('principal');
    expect(commandExecutionJsonSchemas.CommandExecutionResult.required).toContain('changedFiles');
  });

  it('keeps user and tenant ownership aligned with the principal', () => {
    expect(() =>
      validateCommandExecutionRequest({
        ...commandExecutionRequestExample,
        userId: 'user.other',
      })
    ).toThrow(/principal\.userId/u);

    expect(() =>
      validateCommandExecutionRequest({
        ...commandExecutionRequestExample,
        principal: { ...commandExecutionRequestExample.principal, tenantId: 'tenant.a' },
        tenantId: 'tenant.b',
      })
    ).toThrow(/principal\.tenantId/u);
  });

  it('rejects unsafe command strings and environment values', () => {
    expect(() =>
      validateCommandExecutionRequest({
        ...commandExecutionRequestExample,
        executable: 'node\0unsafe',
      })
    ).toThrow(/null bytes/u);
    expect(() =>
      validateCommandExecutionRequest({
        ...commandExecutionRequestExample,
        args: ['safe', 'unsafe\0argument'],
      })
    ).toThrow(/null bytes/u);
    expect(() =>
      validateCommandExecutionRequest({
        ...commandExecutionRequestExample,
        env: { 'BAD=NAME': 'value' },
      })
    ).toThrow(/environment names/u);
  });

  it('requires cwd to stay inside the Workspace namespace', () => {
    expect(() =>
      validateCommandExecutionRequest({
        ...commandExecutionRequestExample,
        cwd: '../outside',
      })
    ).toThrow(/traversal/u);
    expect(() =>
      validateCommandExecutionRequest({
        ...commandExecutionRequestExample,
        cwd: 'C:\\host',
      })
    ).toThrow(/relative workspace path/u);
  });

  it('requires unique Secret references and positive execution limits', () => {
    expect(() =>
      validateCommandExecutionRequest({
        ...commandExecutionRequestExample,
        secretRefs: ['secret:token', 'secret:token'],
      })
    ).toThrow(/duplicate Secret/u);
    expect(() =>
      validateCommandExecutionRequest({
        ...commandExecutionRequestExample,
        timeoutMs: 0,
      })
    ).toThrow();
  });

  it('does not treat shell mode as authorization', () => {
    const request = validateCommandExecutionRequest({
      ...commandExecutionRequestExample,
      shell: true,
    });
    expect(request.shell).toBe(true);
    expect(request).not.toHaveProperty('approved');
  });

  it('requires terminal results to contain completion evidence', () => {
    expect(() =>
      validateCommandExecutionResult({
        ...commandExecutionResultExample,
        completedAt: undefined,
      })
    ).toThrow(/terminal execution/u);
    expect(() =>
      validateCommandExecutionResult({
        ...commandExecutionResultExample,
        status: 'running',
        exitCode: 0,
        completedAt: undefined,
      })
    ).toThrow(/exitCode/u);
  });

  it('defines fail-closed command status transitions', () => {
    expect(canTransitionCommandExecutionStatus('queued', 'starting')).toBe(true);
    expect(canTransitionCommandExecutionStatus('running', 'completed')).toBe(true);
    expect(canTransitionCommandExecutionStatus('running', 'queued')).toBe(false);
    expect(canTransitionCommandExecutionStatus('completed', 'running')).toBe(false);
    expect(canTransitionCommandExecutionStatus('cancelled', 'cancelled')).toBe(false);
  });

  it('requires normalized errors that match terminal failure status', () => {
    expect(() =>
      validateCommandExecutionResult({
        ...commandExecutionResultExample,
        status: 'timed_out',
        exitCode: null,
      })
    ).toThrow(/error/u);

    expect(() =>
      validateCommandExecutionResult({
        ...commandExecutionResultExample,
        status: 'timed_out',
        exitCode: null,
        error: {
          code: 'EXECUTION_OOM_KILLED',
          message: 'wrong failure mapping',
          retryable: false,
        },
      })
    ).toThrow(/must match/u);

    expect(
      validateCommandExecutionResult({
        ...commandExecutionResultExample,
        status: 'timed_out',
        exitCode: null,
        error: {
          code: 'EXECUTION_TIMEOUT',
          message: 'execution timed out',
          retryable: true,
        },
      }).status
    ).toBe('timed_out');
  });

  it('requires truncated output to be preserved by reference', () => {
    expect(() =>
      validateCommandExecutionResult({
        ...commandExecutionResultExample,
        stdout: 'summary',
        stdoutTruncated: true,
      })
    ).toThrow(/stdoutArtifactRef/u);

    expect(
      validateCommandExecutionResult({
        ...commandExecutionResultExample,
        stdout: 'summary',
        stdoutTruncated: true,
        stdoutArtifactRef: 'artifact:stdout',
      }).stdoutArtifactRef
    ).toBe('artifact:stdout');
  });

  it('rejects invalid usage, duplicate Artifacts, and reversed timestamps', () => {
    expect(() =>
      validateCommandExecutionResult({
        ...commandExecutionResultExample,
        resourceUsage: { peakMemoryBytes: -1 },
      })
    ).toThrow();
    expect(() =>
      validateCommandExecutionResult({
        ...commandExecutionResultExample,
        generatedArtifactRefs: ['artifact:one', 'artifact:one'],
      })
    ).toThrow(/duplicate Artifact/u);
    expect(() =>
      validateCommandExecutionResult({
        ...commandExecutionResultExample,
        completedAt: '2026-07-15T23:59:59.000Z',
      })
    ).toThrow(/earlier/u);
  });

  it('binds an external Provider receipt to the same execution', () => {
    expect(() =>
      validateCommandExecutionResult({
        ...commandExecutionResultExample,
        externalReceipt: {
          id: 'receipt.example',
          providerId: 'provider.remote',
          executionId: 'execution.other',
          status: 'completed',
          issuedAt: '2026-07-16T00:00:02.000Z',
          receiptHash: 'sha256:receipt',
        },
      })
    ).toThrow(/result executionId/u);
  });

  it('validates streamed output encoding and sequence', () => {
    expect(
      validateCommandOutputChunk({
        ...commandOutputChunkExample,
        encoding: 'base64',
        content: 'aHlwaGE=',
        byteLength: 5,
      }).content
    ).toBe('aHlwaGE=');
    expect(() =>
      validateCommandOutputChunk({ ...commandOutputChunkExample, sequence: -1 })
    ).toThrow();
    expect(() =>
      validateCommandOutputChunk({
        ...commandOutputChunkExample,
        encoding: 'base64',
        content: 'not base64!',
      })
    ).toThrow(/base64/u);
  });

  it('keeps cancellation governed, revision-aware, and idempotent', () => {
    expect(() =>
      validateExecutionCancelRequest({
        ...executionCancelRequestExample,
        expectedRevision: -1,
      })
    ).toThrow();
    expect(() => {
      const { principal: _principal, ...ungoverned } = executionCancelRequestExample;
      validateExecutionCancelRequest(ungoverned);
    }).toThrow();
  });
});
