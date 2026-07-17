import { describe, expect, it } from 'vitest';
import type { RuntimeActivityPort } from '../../contracts/runtime';
import {
  runtimeActivityRequestExample,
  runtimeActivityResultExample,
  runtimeActionProposalExample,
  runtimeContractJsonSchemas,
  runtimePrincipalExample,
  runtimeRunExample,
  runtimeScopeExample,
  runtimeSessionExample,
  runtimeWaitRecordExample,
  runtimeWaitRequestExample,
  runSignalRequestExample,
  stateExecutionResultExample,
  stateAttemptRecordExample,
  validateRunSignalRequest,
  validateRuntimeActivityRequest,
  validateRuntimeActivityResult,
  validateRuntimeActionProposal,
  validateRuntimePrincipal,
  validateRuntimeRun,
  validateRuntimeScope,
  validateRuntimeSession,
  validateRuntimeWaitRecord,
  validateRuntimeWaitRequest,
  validateStateExecutionResult,
  validateStateAttemptRecord,
} from './index';

describe('Runtime contracts', () => {
  it('validates the canonical contract examples', () => {
    expect(validateRuntimeScope(runtimeScopeExample)).toEqual(runtimeScopeExample);
    expect(validateRuntimePrincipal(runtimePrincipalExample)).toEqual(runtimePrincipalExample);
    expect(validateRuntimeSession(runtimeSessionExample)).toEqual(runtimeSessionExample);
    expect(validateRuntimeRun(runtimeRunExample)).toEqual(runtimeRunExample);
    expect(validateRuntimeWaitRequest(runtimeWaitRequestExample)).toEqual(
      runtimeWaitRequestExample
    );
    expect(validateRuntimeWaitRecord(runtimeWaitRecordExample)).toEqual(runtimeWaitRecordExample);
    expect(validateRunSignalRequest(runSignalRequestExample)).toEqual(runSignalRequestExample);
    expect(validateRuntimeActionProposal(runtimeActionProposalExample)).toEqual(
      runtimeActionProposalExample
    );
    expect(validateStateExecutionResult(stateExecutionResultExample)).toEqual(
      stateExecutionResultExample
    );
    expect(validateStateAttemptRecord(stateAttemptRecordExample)).toEqual(
      stateAttemptRecordExample
    );
    expect(validateRuntimeActivityRequest(runtimeActivityRequestExample)).toEqual(
      runtimeActivityRequestExample
    );
    expect(validateRuntimeActivityResult(runtimeActivityResultExample)).toEqual(
      runtimeActivityResultExample
    );
  });

  it('rejects undeclared boundary fields', () => {
    expect(() => validateRuntimeScope({ ...runtimeScopeExample, owner: 'implicit' })).toThrow();
    expect(() =>
      validateRuntimeActivityRequest({ ...runtimeActivityRequestExample, provider: 'openai' })
    ).toThrow();
  });

  it('requires principal identity appropriate to its type', () => {
    expect(() =>
      validateRuntimePrincipal({
        principalId: 'principal.user.missing',
        type: 'user',
        permissionScopes: [],
      })
    ).toThrow(/userId/u);
    expect(() =>
      validateRuntimePrincipal({
        principalId: 'principal.agent.missing',
        type: 'agent',
        permissionScopes: [],
      })
    ).toThrow(/agentId/u);
  });

  it('enforces Session lifecycle fields and timestamp order', () => {
    expect(() =>
      validateRuntimeSession({
        ...runtimeSessionExample,
        status: 'closed',
      })
    ).toThrow(/closedAt/u);
    expect(() =>
      validateRuntimeSession({
        ...runtimeSessionExample,
        closedAt: '2026-07-17T00:01:00.000Z',
      })
    ).toThrow(/active/u);
    expect(() =>
      validateRuntimeSession({
        ...runtimeSessionExample,
        updatedAt: '2026-07-16T23:59:59.000Z',
      })
    ).toThrow(/earlier/u);
  });

  it('requires terminal Run evidence and normalized failure details', () => {
    expect(() => validateRuntimeRun({ ...runtimeRunExample, status: 'completed' })).toThrow(
      /completedAt/u
    );
    expect(() =>
      validateRuntimeRun({
        ...runtimeRunExample,
        status: 'failed',
        terminalState: 'Failed',
        completedAt: '2026-07-17T00:01:00.000Z',
      })
    ).toThrow(/error/u);
    expect(() =>
      validateRuntimeRun({
        ...runtimeRunExample,
        terminalState: 'Completed',
        completedAt: '2026-07-17T00:01:00.000Z',
      })
    ).toThrow(/non-terminal/u);
  });

  it('enforces durable Wait and Signal boundary invariants', () => {
    expect(() => validateRuntimeWaitRequest({ type: 'signal' })).toThrow(/key/u);
    expect(() => validateRuntimeWaitRequest({ type: 'timer' })).toThrow(/expiresAt/u);
    expect(() =>
      validateRuntimeWaitRecord({
        ...runtimeWaitRecordExample,
        status: 'received',
      })
    ).toThrow(/resolvedAt/u);
    expect(() =>
      validateRuntimeWaitRecord({
        ...runtimeWaitRecordExample,
        resolvedAt: '2026-07-17T00:01:00.000Z',
      })
    ).toThrow(/pending/u);
    expect(() =>
      validateRunSignalRequest({ ...runSignalRequestExample, payload: undefined })
    ).toThrow(/required/u);
  });

  it('binds State execution status to Wait and failure evidence', () => {
    expect(() => validateStateExecutionResult({ status: 'waiting_signal' })).toThrow(/wait/u);
    expect(() =>
      validateStateExecutionResult({
        status: 'waiting_timer',
        wait: { type: 'signal', key: 'wrong' },
      })
    ).toThrow(/timer/u);
    expect(() => validateStateExecutionResult({ status: 'failed' })).toThrow(/failure/u);
    expect(() =>
      validateStateExecutionResult({
        status: 'completed',
        failure: {
          code: 'RUNTIME_INTERNAL_ERROR',
          message: 'invalid',
          retryable: false,
        },
      })
    ).toThrow(/absent/u);
  });

  it('binds claims and terminal evidence to State Attempts', () => {
    expect(() =>
      validateStateAttemptRecord({
        ...stateAttemptRecordExample,
        status: 'claimed',
        claimId: 'claim.example',
      })
    ).toThrow(/fencingToken/u);
    expect(() =>
      validateStateAttemptRecord({
        ...stateAttemptRecordExample,
        status: 'completed',
      })
    ).toThrow(/terminalEventId/u);
    expect(() =>
      validateStateAttemptRecord({
        ...stateAttemptRecordExample,
        attempt: 0,
      })
    ).toThrow();
  });

  it('requires Activity failures to carry consistent retry semantics', () => {
    expect(() =>
      validateRuntimeActivityResult({
        ...runtimeActivityResultExample,
        status: 'failed',
      })
    ).toThrow(/error/u);
    expect(() =>
      validateRuntimeActivityResult({
        ...runtimeActivityResultExample,
        status: 'failed',
        retryable: false,
        error: {
          code: 'RUNTIME_MESSAGE_BUS_UNAVAILABLE',
          message: 'rate limited',
          retryable: true,
        },
      })
    ).toThrow(/retryable/u);
  });

  it('exports strict JSON Schemas for every Runtime boundary', () => {
    expect(Object.keys(runtimeContractJsonSchemas)).toEqual([
      'RuntimeScope',
      'RuntimePrincipal',
      'NormalizedRuntimeError',
      'RuntimeSession',
      'RuntimeRun',
      'RuntimeWaitRequest',
      'RuntimeWaitRecord',
      'RunSignalRequest',
      'RuntimeActionProposal',
      'StateExecutionResult',
      'StateAttemptRecord',
      'RuntimeActivityRequest',
      'RuntimeActivityResult',
    ]);
    for (const schema of Object.values(runtimeContractJsonSchemas)) {
      expect(schema.additionalProperties).toBe(false);
    }
    expect(runtimeContractJsonSchemas.RuntimeActivityRequest.required).toContain('fencingToken');
    expect(runtimeContractJsonSchemas.RuntimeActivityRequest.required).toContain('runId');
    expect(runtimeContractJsonSchemas.RuntimeScope.required).toContain('userId');
  });

  it('keeps external providers behind the Runtime Activity Port', async () => {
    const port: RuntimeActivityPort = {
      execute: (request) =>
        Promise.resolve({
          activityId: request.activityId,
          status: 'completed',
          output: { accepted: true },
          eventIds: ['event.activity.completed.1'],
        }),
      cancel: () => Promise.resolve(),
      reconcile: (activityId) =>
        Promise.resolve({
          activityId,
          status: 'unknown',
          eventIds: ['event.activity.reconciled.1'],
        }),
    };

    const completed = await port.execute(runtimeActivityRequestExample);
    const reconciled = await port.reconcile(runtimeActivityRequestExample.activityId);

    expect(completed.activityId).toBe(runtimeActivityRequestExample.activityId);
    expect(completed.status).toBe('completed');
    expect(reconciled.activityId).toBe(runtimeActivityRequestExample.activityId);
    expect(reconciled.status).toBe('unknown');
  });
});
