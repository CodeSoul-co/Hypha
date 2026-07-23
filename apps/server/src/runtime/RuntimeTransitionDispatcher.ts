import { FrameworkError, type NormalizedRuntimeError, type RuntimeJsonValue } from '@hypha/core';
import {
  applyTransitionWithRuntimePolicy,
  type FSMGuardContext,
  type FSMSnapshot,
} from '@hypha/fsm';
import type { BoundedStateExecutionDecision, BoundedStateExecutorInput } from '@hypha/harness';

export interface RuntimeTransitionCommand {
  id: string;
  runId: string;
  userId: string;
  from: string;
  to: string;
  snapshot: FSMSnapshot;
  stepId: string;
  guardContext: FSMGuardContext;
  reason?: string;
  output?: RuntimeJsonValue;
  failure?: NormalizedRuntimeError;
}

/** Holds only the command currently executing for a Run; the Session Queue owns durable scheduling. */
export class RuntimeTransitionDispatcher {
  private readonly pending = new Map<string, Readonly<RuntimeTransitionCommand>>();

  async dispatch<T>(command: RuntimeTransitionCommand, execute: () => Promise<T>): Promise<T> {
    validateCommand(command);
    if (this.pending.has(command.runId)) {
      throw new FrameworkError({
        code: 'RUNTIME_STATE_COMMAND_BUSY',
        message: `A Runtime transition command is already executing: ${command.runId}`,
        context: { runId: command.runId, commandId: command.id },
      });
    }

    const accepted = immutableCommand(command);
    this.pending.set(command.runId, accepted);
    try {
      return await execute();
    } finally {
      if (this.pending.get(command.runId)?.id === accepted.id) {
        this.pending.delete(command.runId);
      }
    }
  }

  async executeState(input: BoundedStateExecutorInput): Promise<BoundedStateExecutionDecision> {
    const command = this.pending.get(input.scope.runId);
    if (!command) {
      throw new FrameworkError({
        code: 'RUNTIME_STATE_COMMAND_REQUIRED',
        message: `Canonical FSM state execution requires a dispatched RuntimeCommand: ${input.scope.runId}`,
      });
    }
    assertExecutionMatches(command, input);

    await applyTransitionWithRuntimePolicy(input.process, command.snapshot, command.to, {
      userId: command.userId,
      stepId: command.stepId,
      guardContext: command.guardContext,
    });

    if (command.failure) {
      return { result: { kind: 'failed', error: command.failure } };
    }
    return {
      result: {
        kind: 'completed',
        ...(command.output === undefined ? {} : { output: command.output }),
      },
      transition: {
        to: command.to,
        ...(command.reason === undefined ? {} : { reason: command.reason }),
      },
      guardContext: command.guardContext,
    };
  }
}

function assertExecutionMatches(
  command: Readonly<RuntimeTransitionCommand>,
  input: BoundedStateExecutorInput
): void {
  if (
    command.runId !== input.scope.runId ||
    command.userId !== input.scope.userId ||
    command.from !== input.state.id ||
    command.snapshot.processId !== input.process.id
  ) {
    throw new FrameworkError({
      code: 'RUNTIME_STATE_COMMAND_MISMATCH',
      message: `Runtime transition command does not match the claimed State: ${input.scope.runId}`,
      context: {
        commandId: command.id,
        commandRunId: command.runId,
        commandUserId: command.userId,
        commandState: command.from,
        claimedRunId: input.scope.runId,
        claimedUserId: input.scope.userId,
        claimedState: input.state.id,
      },
    });
  }
}

function validateCommand(command: RuntimeTransitionCommand): void {
  for (const [label, value] of [
    ['Command id', command.id],
    ['Run id', command.runId],
    ['User id', command.userId],
    ['Source State', command.from],
    ['Target State', command.to],
    ['Step id', command.stepId],
  ] as const) {
    if (!value.trim()) {
      throw new FrameworkError({
        code: 'RUNTIME_INVALID_INPUT',
        message: `${label} is required`,
      });
    }
  }
  if (command.snapshot.runId !== command.runId || command.snapshot.currentState !== command.from) {
    throw new FrameworkError({
      code: 'RUNTIME_STATE_COMMAND_MISMATCH',
      message: `Runtime transition command snapshot does not match its Run and State: ${command.id}`,
    });
  }
}

function immutableCommand(command: RuntimeTransitionCommand): Readonly<RuntimeTransitionCommand> {
  return Object.freeze({
    ...command,
    snapshot: structuredClone(command.snapshot),
    guardContext: structuredClone(command.guardContext),
    ...(command.failure === undefined ? {} : { failure: structuredClone(command.failure) }),
  });
}
