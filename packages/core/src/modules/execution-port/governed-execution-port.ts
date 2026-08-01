import { z, ZodError } from 'zod';
import type {
  ExecutionActivityRequest,
  ExecutionActivityResult,
} from '../../contracts/execution-activities';
import type { ExecutionToolOperation } from '../../contracts/execution-governance';
import type {
  ExecutionAuthorizationVerifier,
  ExecutionDispatchRequest,
  ExecutionOperationDispatcher,
  ExecutionPort,
} from '../../contracts/execution-port';
import { FrameworkError } from '../../errors';
import { validateExecutionActivityResult } from '../execution-activities';
import {
  validateExecutionAuthorizationVerificationResult,
  validateExecutionDispatchRequest,
} from './contracts';

export class GovernedExecutionPort implements ExecutionPort {
  constructor(
    private readonly authorizationVerifier: ExecutionAuthorizationVerifier,
    private readonly dispatcher: ExecutionOperationDispatcher,
    private readonly now: () => string
  ) {}

  async execute(
    input: ExecutionDispatchRequest,
    abortSignal: AbortSignal
  ): Promise<ExecutionActivityResult> {
    assertNotAborted(abortSignal);
    const request = parseDispatchRequest(input);
    assertOperationMatches(request);

    const dispatchStartedAt = parseCurrentTime(this.now());
    assertActivityWithinDeadline(request, dispatchStartedAt);
    assertNotExpired(request.authorization.expiresAt, dispatchStartedAt, request);

    const verification = validateVerificationResult(
      await this.authorizationVerifier.verify(request, abortSignal)
    );
    assertNotAborted(abortSignal);

    if (!verification.valid) {
      throw new FrameworkError({
        code: 'EXECUTION_POLICY_DENIED',
        message: 'Execution authorization evidence was rejected',
        context: {
          activityId: request.activity.activityId,
          authorizationId: request.authorization.id,
          verificationRef: verification.verificationRef,
          reason: verification.reason,
        },
      });
    }
    const verifiedAt = parseCurrentTime(this.now());
    assertActivityWithinDeadline(request, verifiedAt);
    assertNotExpired(request.authorization.expiresAt, verifiedAt, request);
    assertNotExpired(verification.expiresAt, verifiedAt, request, verification.verificationRef);

    const result = validateActivityResult(
      await this.dispatcher.dispatch(request.activity, abortSignal)
    );
    if (result.activityId !== request.activity.activityId) {
      throw new FrameworkError({
        code: 'EXECUTION_INTERNAL_ERROR',
        message: 'Execution dispatcher returned evidence for another activity',
        context: {
          expectedActivityId: request.activity.activityId,
          actualActivityId: result.activityId,
          verificationRef: verification.verificationRef,
        },
      });
    }
    return result;
  }
}

function parseDispatchRequest(input: unknown): ExecutionDispatchRequest {
  try {
    return validateExecutionDispatchRequest(input);
  } catch (error) {
    if (error instanceof ZodError) {
      const issuePaths = error.issues.map((issue) => issue.path.join('.'));
      if (issuePaths.includes('authorization.approvalRef')) {
        throw boundaryError(
          'EXECUTION_APPROVAL_REQUIRED',
          'Execution approval evidence is required',
          error
        );
      }
      if (issuePaths.includes('binding.requiredScopes')) {
        throw boundaryError(
          'EXECUTION_PERMISSION_DENIED',
          'Execution principal is missing required permission scopes',
          error
        );
      }
    }
    throw boundaryError(
      'EXECUTION_INVALID_REQUEST',
      'Execution dispatch request is invalid',
      error
    );
  }
}

function validateVerificationResult(input: unknown) {
  try {
    return validateExecutionAuthorizationVerificationResult(input);
  } catch (error) {
    throw boundaryError(
      'EXECUTION_INTERNAL_ERROR',
      'Execution authorization verifier returned invalid evidence',
      error
    );
  }
}

function validateActivityResult(input: unknown): ExecutionActivityResult {
  try {
    return validateExecutionActivityResult(input);
  } catch (error) {
    throw boundaryError(
      'EXECUTION_INTERNAL_ERROR',
      'Execution dispatcher returned an invalid activity result',
      error
    );
  }
}

function assertActivityWithinDeadline(request: ExecutionDispatchRequest, now: number): void {
  if (!request.activity.deadlineAt || Date.parse(request.activity.deadlineAt) > now) {
    return;
  }
  throw new FrameworkError({
    code: 'EXECUTION_TIMEOUT',
    message: 'Execution activity deadline has expired',
    context: {
      activityId: request.activity.activityId,
      runId: request.activity.runId,
      stateAttemptId: request.activity.stateAttemptId,
      deadlineAt: request.activity.deadlineAt,
    },
  });
}

function assertOperationMatches(request: ExecutionDispatchRequest): void {
  const actualOperation = inferActivityOperation(request.activity);
  if (request.binding.operation !== actualOperation) {
    throw new FrameworkError({
      code: 'EXECUTION_POLICY_DENIED',
      message: 'Execution Tool binding does not authorize the requested operation',
      context: {
        activityId: request.activity.activityId,
        toolId: request.binding.toolId,
        authorizedOperation: request.binding.operation,
        requestedOperation: actualOperation,
      },
    });
  }
}

function inferActivityOperation(activity: ExecutionActivityRequest): ExecutionToolOperation {
  const request = activity.request;
  if ('executable' in request) {
    return 'command';
  }
  if ('operation' in request) {
    switch (request.operation) {
      case 'execute':
        return 'command';
      case 'write':
      case 'delete':
        return 'file_write';
      case 'read':
      case 'list':
        return 'file_read';
    }
  }
  if ('patchArtifactRef' in request || 'snapshotRef' in request || 'mode' in request) {
    return 'file_write';
  }
  if ('fromSnapshotRef' in request || 'type' in request) {
    return 'artifact';
  }
  if ('operationId' in request && 'relativePath' in request) {
    return 'file_write';
  }
  return 'file_read';
}

function assertNotExpired(
  expiresAt: string | undefined,
  now: number,
  request: ExecutionDispatchRequest,
  verificationRef?: string
): void {
  if (!expiresAt || Date.parse(expiresAt) > now) {
    return;
  }
  throw new FrameworkError({
    code: request.riskAssessment.requiresApproval
      ? 'EXECUTION_APPROVAL_REQUIRED'
      : 'EXECUTION_POLICY_DENIED',
    message: 'Execution authorization evidence has expired',
    context: {
      activityId: request.activity.activityId,
      authorizationId: request.authorization.id,
      verificationRef,
      expiresAt,
    },
  });
}

function parseCurrentTime(value: string): number {
  const result = z.string().datetime({ offset: true }).safeParse(value);
  if (!result.success) {
    throw boundaryError(
      'EXECUTION_INTERNAL_ERROR',
      'Execution clock returned an invalid timestamp',
      result.error
    );
  }
  return Date.parse(result.data);
}

function assertNotAborted(abortSignal: AbortSignal): void {
  if (abortSignal.aborted) {
    throw new FrameworkError({
      code: 'EXECUTION_CANCELLED',
      message: 'Execution dispatch was cancelled',
    });
  }
}

function boundaryError(code: string, message: string, cause: unknown): FrameworkError {
  return new FrameworkError({ code, message, cause });
}
