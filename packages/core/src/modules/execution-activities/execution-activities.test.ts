import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  executionActivityJsonSchemas,
  executionActivityRequestJsonSchema,
  executionActivityRequestExample,
  executionActivityResultJsonSchema,
  executionActivityResultExample,
  validateExecutionActivityRequest,
  validateExecutionActivityResult,
  validateWorkspaceOperationRequest,
  workspaceExecutionActivityRequestExample,
} from './index';

describe('Execution Activity boundary contracts', () => {
  it('validates command and Workspace activity fixtures', () => {
    expect(validateExecutionActivityRequest(executionActivityRequestExample)).toEqual(
      executionActivityRequestExample
    );
    expect(validateExecutionActivityRequest(workspaceExecutionActivityRequestExample)).toEqual(
      workspaceExecutionActivityRequestExample
    );
    expect(
      validateWorkspaceOperationRequest(workspaceExecutionActivityRequestExample.request)
    ).toEqual(workspaceExecutionActivityRequestExample.request);
    expect(validateExecutionActivityResult(executionActivityResultExample)).toEqual(
      executionActivityResultExample
    );
  });

  it('exports JSON Schemas for the Runtime-to-Execution boundary', () => {
    expect(Object.keys(executionActivityJsonSchemas)).toEqual([
      'WorkspaceOperationRequest',
      'ExecutionActivityRequest',
      'ExecutionActivityResult',
    ]);
    expect(executionActivityJsonSchemas.ExecutionActivityRequest.required).toEqual(
      expect.arrayContaining(['activityId', 'request', 'fencingToken'])
    );
    expect(executionActivityJsonSchemas.ExecutionActivityResult.required).toContain('eventIds');
  });

  it('keeps fixtures aligned across Zod and JSON Schema', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);

    expect(
      ajv.validate(executionActivityRequestJsonSchema, executionActivityRequestExample),
      ajv.errorsText()
    ).toBe(true);
    expect(
      ajv.validate(executionActivityRequestJsonSchema, workspaceExecutionActivityRequestExample),
      ajv.errorsText()
    ).toBe(true);
    expect(
      ajv.validate(executionActivityResultJsonSchema, executionActivityResultExample),
      ajv.errorsText()
    ).toBe(true);
  });

  it.each([
    ['workspaceId', { workspaceId: 'workspace.other' }],
    ['operationId', { operationId: 'operation.other' }],
    ['runId', { runId: 'run.other' }],
    ['idempotencyKey', { idempotencyKey: 'activity.other' }],
  ])('rejects a mismatched inner %s', (_field, requestPatch) => {
    expect(() =>
      validateExecutionActivityRequest({
        ...executionActivityRequestExample,
        request: { ...executionActivityRequestExample.request, ...requestPatch },
      })
    ).toThrow(/must match the activity/u);
  });

  it('rejects invalid fencing and malformed deadlines before dispatch', () => {
    for (const fencingToken of [-1, 0, 1.5]) {
      expect(() =>
        validateExecutionActivityRequest({
          ...executionActivityRequestExample,
          fencingToken,
        })
      ).toThrow();
    }
    expect(() =>
      validateExecutionActivityRequest({
        ...executionActivityRequestExample,
        deadlineAt: 'tomorrow',
      })
    ).toThrow();
  });

  it('rejects requests outside the governed command and Workspace operations', () => {
    expect(() =>
      validateExecutionActivityRequest({
        ...executionActivityRequestExample,
        request: {
          workspaceId: executionActivityRequestExample.workspaceId,
          directHostPath: 'C:\\secret',
        },
      })
    ).toThrow();
  });

  it('requires durable event evidence and unique references in results', () => {
    expect(() =>
      validateExecutionActivityResult({
        ...executionActivityResultExample,
        eventIds: [],
      })
    ).toThrow();
    expect(() =>
      validateExecutionActivityResult({
        ...executionActivityResultExample,
        eventIds: ['event.duplicate', 'event.duplicate'],
      })
    ).toThrow(/duplicate Event/u);
    expect(() =>
      validateExecutionActivityResult({
        ...executionActivityResultExample,
        artifactRefs: ['artifact:duplicate', 'artifact:duplicate'],
      })
    ).toThrow(/duplicate Artifact/u);
  });

  it('does not allow a completed activity to carry an error', () => {
    expect(() =>
      validateExecutionActivityResult({
        ...executionActivityResultExample,
        error: {
          code: 'EXECUTION_INTERNAL_ERROR',
          message: 'impossible completed error',
          retryable: false,
        },
      })
    ).toThrow(/completed activity/u);
  });

  it.each(['failed', 'timeout', 'cancelled', 'unknown'] as const)(
    'requires normalized error evidence for the %s terminal status',
    (status) => {
      const result = {
        ...executionActivityResultExample,
        status,
      };

      expect(() => validateExecutionActivityResult(result)).toThrow(/unsuccessful activity/u);

      const ajv = new Ajv({ strict: true, allErrors: true });
      addFormats(ajv);
      expect(ajv.validate(executionActivityResultJsonSchema, result)).toBe(false);
    }
  );
});
