import { describe, expect, it } from 'vitest';
import {
  canTransitionSandboxStatus,
  sandboxCreateRequestExample,
  sandboxLifecycleJsonSchemas,
  sandboxProviderCapabilitiesExample,
  sandboxRecordExample,
  validateSandboxCleanupRequest,
  validateSandboxCreateRequest,
  validateSandboxProviderCapabilities,
  validateSandboxRecord,
  validateSandboxStartRequest,
  validateSandboxStatusRequest,
  validateSandboxTerminateRequest,
} from './index';

const lifecyclePrincipal = sandboxCreateRequestExample.principal;

describe('Sandbox lifecycle contracts', () => {
  it('validates the capability, create-request, and record fixtures', () => {
    expect(validateSandboxProviderCapabilities(sandboxProviderCapabilitiesExample)).toEqual(
      sandboxProviderCapabilitiesExample
    );
    expect(validateSandboxCreateRequest(sandboxCreateRequestExample)).toEqual(
      sandboxCreateRequestExample
    );
    expect(validateSandboxRecord(sandboxRecordExample)).toEqual(sandboxRecordExample);
  });

  it('exports JSON Schemas for every lifecycle boundary', () => {
    expect(Object.keys(sandboxLifecycleJsonSchemas)).toEqual(
      expect.arrayContaining([
        'SandboxProviderCapabilities',
        'SandboxRecord',
        'SandboxCreateRequest',
        'SandboxStartRequest',
        'SandboxStatusRequest',
        'SandboxTerminateRequest',
        'SandboxCleanupRequest',
      ])
    );
    expect(sandboxLifecycleJsonSchemas.SandboxRecord.required).toContain('environmentRevision');
    expect(sandboxLifecycleJsonSchemas.SandboxCreateRequest.required).toContain('principal');
  });

  it('keeps lifecycle operations governed and revision-aware', () => {
    const base = {
      operationId: 'operation.example',
      sandboxId: 'sandbox.example',
      principal: lifecyclePrincipal,
      expectedRevision: 1,
      idempotencyKey: 'operation.example:1',
    };

    expect(validateSandboxStartRequest(base)).toEqual(base);
    expect(validateSandboxTerminateRequest({ ...base, reason: 'run cancelled' })).toMatchObject({
      expectedRevision: 1,
      reason: 'run cancelled',
    });
    expect(validateSandboxCleanupRequest(base)).toEqual(base);
    expect(
      validateSandboxStatusRequest({ sandboxId: 'sandbox.example', principal: lifecyclePrincipal })
    ).toMatchObject({ sandboxId: 'sandbox.example' });
    expect(() => validateSandboxStartRequest({ ...base, expectedRevision: -1 })).toThrow();
    expect(() => {
      const { principal: _principal, ...ungoverned } = base;
      validateSandboxCleanupRequest(ungoverned);
    }).toThrow();
  });

  it('defines fail-closed Sandbox state transitions', () => {
    expect(canTransitionSandboxStatus('creating', 'created')).toBe(true);
    expect(canTransitionSandboxStatus('ready', 'busy')).toBe(true);
    expect(canTransitionSandboxStatus('busy', 'cleaning')).toBe(false);
    expect(canTransitionSandboxStatus('cleaned', 'starting')).toBe(false);
    expect(canTransitionSandboxStatus('ready', 'ready')).toBe(false);
  });

  it('prevents create requests from crossing declared user or tenant boundaries', () => {
    expect(() =>
      validateSandboxCreateRequest({ ...sandboxCreateRequestExample, userId: 'user.other' })
    ).toThrow(/principal\.userId/u);

    expect(() =>
      validateSandboxCreateRequest({
        ...sandboxCreateRequestExample,
        principal: { ...lifecyclePrincipal, tenantId: 'tenant.a' },
        tenantId: 'tenant.b',
      })
    ).toThrow(/principal\.tenantId/u);
  });

  it('validates the complete Environment at the create boundary', () => {
    expect(() =>
      validateSandboxCreateRequest({
        ...sandboxCreateRequestExample,
        environment: {
          ...sandboxCreateRequestExample.environment,
          process: {
            ...sandboxCreateRequestExample.environment.process,
            killProcessTreeOnExit: false,
          },
        },
      })
    ).toThrow();
  });

  it('requires every provider capability to be reported explicitly', () => {
    const { networkIsolation: _networkIsolation, ...incomplete } =
      sandboxProviderCapabilitiesExample;
    expect(() => validateSandboxProviderCapabilities(incomplete)).toThrow();
  });

  it('requires lifecycle timestamps that agree with record status', () => {
    const { readyAt: _readyAt, ...notReady } = sandboxRecordExample;
    expect(() => validateSandboxRecord(notReady)).toThrow(/readyAt/u);

    expect(() =>
      validateSandboxRecord({
        ...sandboxRecordExample,
        status: 'terminated',
        readyAt: undefined,
      })
    ).toThrow(/terminatedAt/u);

    expect(() =>
      validateSandboxRecord({
        ...sandboxRecordExample,
        status: 'cleaned',
        readyAt: undefined,
      })
    ).toThrow(/cleanedAt/u);
  });

  it('requires a normalized error for failed records', () => {
    expect(() =>
      validateSandboxRecord({
        ...sandboxRecordExample,
        status: 'failed',
        readyAt: undefined,
      })
    ).toThrow(/error/u);

    expect(
      validateSandboxRecord({
        ...sandboxRecordExample,
        status: 'failed',
        readyAt: undefined,
        error: {
          code: 'EXECUTION_SANDBOX_START_FAILED',
          message: 'provider failed to start',
          retryable: true,
        },
      }).error
    ).toMatchObject({ code: 'EXECUTION_SANDBOX_START_FAILED', retryable: true });
  });

  it('rejects duplicate or active execution IDs in inactive records', () => {
    expect(() =>
      validateSandboxRecord({
        ...sandboxRecordExample,
        status: 'busy',
        activeExecutionIds: ['execution.1', 'execution.1'],
      })
    ).toThrow(/duplicate/u);

    expect(() =>
      validateSandboxRecord({
        ...sandboxRecordExample,
        status: 'stopped',
        readyAt: undefined,
        activeExecutionIds: ['execution.1'],
      })
    ).toThrow(/must be empty/u);
  });

  it('rejects malformed record timestamps', () => {
    expect(() =>
      validateSandboxRecord({ ...sandboxRecordExample, createdAt: 'not-a-timestamp' })
    ).toThrow();
  });
});
