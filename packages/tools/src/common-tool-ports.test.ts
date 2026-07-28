import { describe, expect, it, vi } from 'vitest';
import {
  commonPortToolSpecs,
  createPortBackedCommonToolBindings,
  validateToolSpec,
  type CommonToolPort,
  type CommonToolPorts,
  type ToolCallContext,
} from './index';

describe('@hypha/tools port-backed common tools', () => {
  it('publishes strict governed contracts for external and stateful families', () => {
    expect(commonPortToolSpecs.map((spec) => validateToolSpec(spec).id)).toEqual([
      'common.files',
      'common.artifact',
      'common.http_fetch',
      'common.search',
      'common.memory',
      'common.command',
      'common.mcp_resource',
      'common.hash_reference',
    ]);
    expect(
      commonPortToolSpecs.every((spec) => spec.inputSchema.additionalProperties === false)
    ).toBe(true);
    expect(commonPortToolSpecs.find((spec) => spec.id === 'common.command')).toMatchObject({
      sideEffectLevel: 'irreversible',
      humanApprovalPolicy: { required: true },
      idempotencyPolicy: { mode: 'required' },
    });
  });

  it('delegates each family to its governed port with the invocation context intact', async () => {
    const execute = vi.fn(async (request) => ({ delegated: request.operation }));
    const port: CommonToolPort = { execute };
    const ports: CommonToolPorts = {
      files: port,
      artifacts: port,
      httpFetch: port,
      search: port,
      memory: port,
      command: port,
      mcpResource: port,
      hashReference: port,
    };
    const context: ToolCallContext = {
      runId: 'run-common',
      stepId: 'step-common',
      invocationId: 'invocation-common',
    };
    const command = createPortBackedCommonToolBindings(ports).find(
      (binding) => binding.spec.id === 'common.command'
    )!;

    await expect(
      command.adapter.execute({
        toolId: command.spec.id,
        input: { operation: 'execute', commandRef: 'command.safe' },
        context,
      })
    ).resolves.toMatchObject({ output: { delegated: 'execute' } });
    expect(execute).toHaveBeenCalledWith({
      operation: 'execute',
      input: { operation: 'execute', commandRef: 'command.safe' },
      context,
    });
  });
});
