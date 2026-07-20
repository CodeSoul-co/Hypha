import { describe, expect, it, vi } from 'vitest';
import type {
  ExecutionAuthorizationVerifier,
  ExecutionDispatchRequest,
  ExecutionOperationDispatcher,
} from '../../contracts/execution-port';
import { FrameworkError } from '../../errors';
import { executionActivityResultExample } from '../execution-activities';
import { workspaceExecutionActivityRequestExample } from '../execution-activities';
import {
  executionAuthorizationVerificationResultExample,
  executionDispatchRequestExample,
} from './contracts';
import { GovernedExecutionPort } from './governed-execution-port';

const now = () => '2026-07-20T12:01:00.000Z';

describe('GovernedExecutionPort', () => {
  it('verifies authorization before dispatching a governed activity', async () => {
    const { port, verifier, dispatcher } = fixture();

    await expect(port.execute(executionDispatchRequestExample, signal())).resolves.toEqual(
      executionActivityResultExample
    );
    expect(verifier.verify).toHaveBeenCalledOnce();
    expect(dispatcher.dispatch).toHaveBeenCalledOnce();
    expect(verifier.verify.mock.invocationCallOrder[0]).toBeLessThan(
      dispatcher.dispatch.mock.invocationCallOrder[0]
    );
  });

  it('permits lower-risk execution without Human Approval evidence', async () => {
    const { port, verifier, dispatcher } = fixture();
    const request: ExecutionDispatchRequest = {
      ...executionDispatchRequestExample,
      riskAssessment: {
        ...executionDispatchRequestExample.riskAssessment,
        level: 'low',
        reasons: ['governed_operation'],
        matchedRules: ['execution-risk.governed-operation'],
        requiresApproval: false,
        recommendedSandboxLevel: 'local',
      },
      authorization: {
        ...executionDispatchRequestExample.authorization,
        approvalRef: undefined,
      },
    };

    await expect(port.execute(request, signal())).resolves.toEqual(executionActivityResultExample);
    expect(verifier.verify).toHaveBeenCalledOnce();
    expect(dispatcher.dispatch).toHaveBeenCalledOnce();
  });

  it('authorizes a Workspace write only through a file-write Tool binding', async () => {
    const { port, dispatcher } = fixture({
      result: {
        ...executionActivityResultExample,
        activityId: workspaceExecutionActivityRequestExample.activityId,
      },
    });
    const request: ExecutionDispatchRequest = {
      ...executionDispatchRequestExample,
      activity: workspaceExecutionActivityRequestExample,
      binding: {
        ...executionDispatchRequestExample.binding,
        toolId: 'execution.workspace.write',
        operation: 'file_write',
        requiredScopes: ['workspace:write'],
      },
      authorization: {
        ...executionDispatchRequestExample.authorization,
        activityId: workspaceExecutionActivityRequestExample.activityId,
        runId: workspaceExecutionActivityRequestExample.runId,
        toolId: 'execution.workspace.write',
        principalId: workspaceExecutionActivityRequestExample.request.principal.principalId,
      },
    };

    await expect(port.execute(request, signal())).resolves.toMatchObject({
      activityId: workspaceExecutionActivityRequestExample.activityId,
    });
    expect(dispatcher.dispatch).toHaveBeenCalledWith(
      workspaceExecutionActivityRequestExample,
      expect.any(AbortSignal)
    );
  });

  it.each([
    {
      name: 'missing required approval',
      patch: (request: ExecutionDispatchRequest) => ({
        ...request,
        authorization: { ...request.authorization, approvalRef: undefined },
      }),
      code: 'EXECUTION_APPROVAL_REQUIRED',
    },
    {
      name: 'missing principal scope',
      patch: (request: ExecutionDispatchRequest) => ({
        ...request,
        binding: { ...request.binding, requiredScopes: ['workspace:write'] },
      }),
      code: 'EXECUTION_PERMISSION_DENIED',
    },
    {
      name: 'mismatched Tool operation',
      patch: (request: ExecutionDispatchRequest) => ({
        ...request,
        binding: { ...request.binding, operation: 'file_write' as const },
      }),
      code: 'EXECUTION_POLICY_DENIED',
    },
    {
      name: 'expired approval',
      patch: (request: ExecutionDispatchRequest) => ({
        ...request,
        authorization: { ...request.authorization, expiresAt: '2026-07-20T12:00:30.000Z' },
      }),
      code: 'EXECUTION_APPROVAL_REQUIRED',
    },
  ])('rejects $name before any side effect', async ({ patch, code }) => {
    const { port, verifier, dispatcher } = fixture();

    await expectFrameworkError(
      port.execute(patch(executionDispatchRequestExample), signal()),
      code
    );
    expect(verifier.verify).not.toHaveBeenCalled();
    expect(dispatcher.dispatch).not.toHaveBeenCalled();
  });

  it('fails closed when the external authorization verifier rejects evidence', async () => {
    const { port, dispatcher } = fixture({
      verification: {
        ...executionAuthorizationVerificationResultExample,
        valid: false,
        reason: 'approval_revoked',
      },
    });

    await expectFrameworkError(
      port.execute(executionDispatchRequestExample, signal()),
      'EXECUTION_POLICY_DENIED'
    );
    expect(dispatcher.dispatch).not.toHaveBeenCalled();
  });

  it('fails closed when verified evidence has expired', async () => {
    const { port, dispatcher } = fixture({
      verification: {
        ...executionAuthorizationVerificationResultExample,
        expiresAt: '2026-07-20T12:00:30.000Z',
      },
    });

    await expectFrameworkError(
      port.execute(executionDispatchRequestExample, signal()),
      'EXECUTION_APPROVAL_REQUIRED'
    );
    expect(dispatcher.dispatch).not.toHaveBeenCalled();
  });

  it('rechecks expiry after authorization verification completes', async () => {
    const clock = vi
      .fn()
      .mockReturnValueOnce('2026-07-20T12:01:00.000Z')
      .mockReturnValue('2026-07-20T12:06:00.000Z');
    const { port, dispatcher } = fixture({ clock });

    await expectFrameworkError(
      port.execute(executionDispatchRequestExample, signal()),
      'EXECUTION_APPROVAL_REQUIRED'
    );
    expect(dispatcher.dispatch).not.toHaveBeenCalled();
  });

  it('rejects invalid verifier evidence as an internal boundary failure', async () => {
    const { port, dispatcher } = fixture({
      verification: {
        ...executionAuthorizationVerificationResultExample,
        valid: false,
      },
    });

    await expectFrameworkError(
      port.execute(executionDispatchRequestExample, signal()),
      'EXECUTION_INTERNAL_ERROR'
    );
    expect(dispatcher.dispatch).not.toHaveBeenCalled();
  });

  it('rejects cancelled dispatch before authorization verification', async () => {
    const { port, verifier, dispatcher } = fixture();
    const controller = new AbortController();
    controller.abort();

    await expectFrameworkError(
      port.execute(executionDispatchRequestExample, controller.signal),
      'EXECUTION_CANCELLED'
    );
    expect(verifier.verify).not.toHaveBeenCalled();
    expect(dispatcher.dispatch).not.toHaveBeenCalled();
  });

  it('rejects dispatcher evidence for a different activity', async () => {
    const { port } = fixture({
      result: { ...executionActivityResultExample, activityId: 'activity.other' },
    });

    await expectFrameworkError(
      port.execute(executionDispatchRequestExample, signal()),
      'EXECUTION_INTERNAL_ERROR'
    );
  });

  it('preserves terminal evidence when cancellation races with dispatcher completion', async () => {
    const controller = new AbortController();
    const verifier = {
      verify: vi.fn().mockResolvedValue(executionAuthorizationVerificationResultExample),
    };
    const dispatcher = {
      dispatch: vi.fn().mockImplementation(async () => {
        controller.abort();
        return executionActivityResultExample;
      }),
    };
    const port = new GovernedExecutionPort(verifier, dispatcher, now);

    await expect(port.execute(executionDispatchRequestExample, controller.signal)).resolves.toEqual(
      executionActivityResultExample
    );
  });
});

function fixture(options?: {
  verification?: Awaited<ReturnType<ExecutionAuthorizationVerifier['verify']>>;
  result?: Awaited<ReturnType<ExecutionOperationDispatcher['dispatch']>>;
  clock?: () => string;
}) {
  const verifier = {
    verify: vi
      .fn()
      .mockResolvedValue(options?.verification ?? executionAuthorizationVerificationResultExample),
  };
  const dispatcher = {
    dispatch: vi.fn().mockResolvedValue(options?.result ?? executionActivityResultExample),
  };
  return {
    verifier,
    dispatcher,
    port: new GovernedExecutionPort(verifier, dispatcher, options?.clock ?? now),
  };
}

function signal(): AbortSignal {
  return new AbortController().signal;
}

async function expectFrameworkError(promise: Promise<unknown>, code: string): Promise<void> {
  try {
    await promise;
    throw new Error('Expected GovernedExecutionPort to reject');
  } catch (error) {
    expect(error).toBeInstanceOf(FrameworkError);
    expect((error as FrameworkError).code).toBe(code);
  }
}
