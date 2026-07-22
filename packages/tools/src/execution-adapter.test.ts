import { describe, expect, it, vi } from 'vitest';
import {
  executionActivityResultExample,
  executionDispatchRequestExample,
  type ExecutionPort,
} from '@hypha/core';
import { ExecutionToolAdapter } from './index';

describe('ExecutionToolAdapter', () => {
  it('dispatches only evidence bound to the governed Tool invocation', async () => {
    const execute = vi
      .fn<ExecutionPort['execute']>()
      .mockResolvedValue(executionActivityResultExample);
    const adapter = new ExecutionToolAdapter(
      executionDispatchRequestExample.binding.toolId,
      { execute },
      () => executionDispatchRequestExample
    );
    const result = await adapter.execute({
      toolId: executionDispatchRequestExample.binding.toolId,
      input: executionDispatchRequestExample.activity.request,
      context: {
        runId: executionDispatchRequestExample.activity.runId,
        stepId: 'step.execution',
        invocationId: executionDispatchRequestExample.authorization.invocationId,
      },
    });
    expect(execute).toHaveBeenCalledOnce();
    expect(result).toMatchObject({
      kind: 'tool_execution_envelope',
      output: executionActivityResultExample,
      artifactRefs: executionActivityResultExample.artifactRefs,
    });
  });

  it('fails closed when authorization evidence belongs to another invocation', async () => {
    const execute = vi.fn<ExecutionPort['execute']>();
    const adapter = new ExecutionToolAdapter(
      executionDispatchRequestExample.binding.toolId,
      { execute },
      () => ({
        ...executionDispatchRequestExample,
        authorization: {
          ...executionDispatchRequestExample.authorization,
          invocationId: 'invocation.other',
        },
      })
    );
    await expect(
      adapter.execute({
        toolId: executionDispatchRequestExample.binding.toolId,
        input: {},
        context: {
          runId: executionDispatchRequestExample.activity.runId,
          stepId: 'step.execution',
          invocationId: executionDispatchRequestExample.authorization.invocationId,
        },
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_POLICY_DENIED' });
    expect(execute).not.toHaveBeenCalled();
  });

  it('propagates cancellation to the ExecutionPort abort signal', async () => {
    let observedSignal: AbortSignal | undefined;
    const execute = vi.fn<ExecutionPort['execute']>().mockImplementation(
      async (_dispatch, signal) =>
        new Promise((resolve) => {
          observedSignal = signal;
          signal.addEventListener('abort', () =>
            resolve({
              ...executionActivityResultExample,
              status: 'cancelled',
            })
          );
        })
    );
    const adapter = new ExecutionToolAdapter(
      executionDispatchRequestExample.binding.toolId,
      { execute },
      () => executionDispatchRequestExample
    );
    const pending = adapter.execute({
      toolId: executionDispatchRequestExample.binding.toolId,
      input: {},
      context: {
        runId: executionDispatchRequestExample.activity.runId,
        stepId: 'step.execution',
        invocationId: executionDispatchRequestExample.authorization.invocationId,
      },
    });
    await vi.waitFor(() => expect(observedSignal).toBeDefined());
    await adapter.cancel({
      toolId: executionDispatchRequestExample.binding.toolId,
      invocationId: executionDispatchRequestExample.authorization.invocationId,
      reason: 'test cancellation',
    });
    await expect(pending).resolves.toMatchObject({ output: { status: 'cancelled' } });
    expect(observedSignal?.aborted).toBe(true);
  });
});
