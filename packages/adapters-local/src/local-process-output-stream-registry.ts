import type {
  CommandOutputChunk,
  ExecutionPrincipal,
  RemoteOutputStreamRequest,
} from '@hypha/core';
import { validateCommandOutputChunk } from '@hypha/core';
import { executionProviderError } from './execution-provider-error';
import { cloneExecutionValue, hashExecutionBytes } from './execution-provider-values';

export interface LocalProcessOutputStreamRegistryOptions {
  maxRetainedChunks?: number;
  maxTrackedExecutions?: number;
  now?: () => string;
}

interface OutputStreamState {
  executionId: string;
  principal: ExecutionPrincipal;
  chunks: CommandOutputChunk[];
  nextSequence: number;
  completed: boolean;
  version: number;
  waiters: Set<() => void>;
}

/**
 * Bounded replay and live-follow registry for Local Process output.
 * Raw bytes are represented as base64 so chunk boundaries cannot corrupt UTF-8.
 */
export class LocalProcessOutputStreamRegistry {
  private readonly maxRetainedChunks: number;
  private readonly maxTrackedExecutions: number;
  private readonly now: () => string;
  private readonly states = new Map<string, OutputStreamState>();

  constructor(options: LocalProcessOutputStreamRegistryOptions = {}) {
    this.maxRetainedChunks = positiveInteger(
      options.maxRetainedChunks ?? 256,
      'maxRetainedChunks'
    );
    this.maxTrackedExecutions = positiveInteger(
      options.maxTrackedExecutions ?? 128,
      'maxTrackedExecutions'
    );
    this.now = options.now ?? (() => new Date().toISOString());
  }

  begin(executionId: string, principal: ExecutionPrincipal): void {
    if (this.states.has(executionId)) {
      throw executionProviderError(
        'EXECUTION_IDEMPOTENCY_CONFLICT',
        `Output stream for Execution ${executionId} already exists.`,
        false
      );
    }
    this.evictCompletedExecutions();
    if (this.states.size >= this.maxTrackedExecutions) {
      throw executionProviderError(
        'EXECUTION_RESOURCE_EXCEEDED',
        'Local Process output stream registry is at capacity.',
        true,
        { maxTrackedExecutions: this.maxTrackedExecutions }
      );
    }
    this.states.set(executionId, {
      executionId,
      principal: cloneExecutionValue(principal),
      chunks: [],
      nextSequence: 0,
      completed: false,
      version: 0,
      waiters: new Set(),
    });
  }

  publish(
    executionId: string,
    stream: CommandOutputChunk['stream'],
    bytes: Uint8Array,
    truncated = false
  ): CommandOutputChunk {
    const state = this.requireState(executionId);
    if (state.completed) {
      throw executionProviderError(
        'EXECUTION_REVISION_CONFLICT',
        `Output stream for Execution ${executionId} is already complete.`,
        false
      );
    }
    const snapshot = Uint8Array.from(bytes);
    const chunk = validateCommandOutputChunk({
      executionId,
      sequence: state.nextSequence,
      stream,
      encoding: 'base64',
      content: Buffer.from(snapshot).toString('base64'),
      byteLength: snapshot.byteLength,
      contentHash: hashExecutionBytes(snapshot),
      emittedAt: this.now(),
      ...(truncated ? { truncated: true } : {}),
    });
    state.nextSequence += 1;
    state.chunks.push(chunk);
    if (state.chunks.length > this.maxRetainedChunks) state.chunks.shift();
    this.signal(state);
    return cloneExecutionValue(chunk);
  }

  complete(executionId: string): void {
    const state = this.states.get(executionId);
    if (!state || state.completed) return;
    state.completed = true;
    this.signal(state);
  }

  stream(request: RemoteOutputStreamRequest): AsyncIterable<CommandOutputChunk> {
    const state = this.requireState(request.executionId);
    this.assertPrincipal(state, request.principal);
    const maxChunks = request.maxChunks;
    const follow = request.follow ?? false;
    const initialSequence = request.fromSequence ?? state.chunks[0]?.sequence ?? state.nextSequence;
    return this.read(state, initialSequence, maxChunks, follow);
  }

  close(): void {
    for (const state of this.states.values()) {
      if (!state.completed) {
        state.completed = true;
        this.signal(state);
      }
    }
  }

  private async *read(
    state: OutputStreamState,
    initialSequence: number,
    maxChunks: number | undefined,
    follow: boolean
  ): AsyncIterable<CommandOutputChunk> {
    let nextSequence = initialSequence;
    let emitted = 0;
    while (maxChunks === undefined || emitted < maxChunks) {
      const firstRetained = state.chunks[0]?.sequence;
      if (firstRetained !== undefined && nextSequence < firstRetained) {
        throw executionProviderError(
          'EXECUTION_REVISION_CONFLICT',
          'Requested output sequence is no longer retained.',
          false,
          { requestedSequence: nextSequence, firstRetainedSequence: firstRetained }
        );
      }
      const chunk = state.chunks.find((candidate) => candidate.sequence === nextSequence);
      if (chunk) {
        yield cloneExecutionValue(chunk);
        nextSequence += 1;
        emitted += 1;
        continue;
      }
      if (!follow || state.completed) return;
      const observedVersion = state.version;
      await this.waitForUpdate(state, observedVersion);
    }
  }

  private waitForUpdate(state: OutputStreamState, observedVersion: number): Promise<void> {
    if (state.version !== observedVersion) return Promise.resolve();
    return new Promise((resolve) => {
      state.waiters.add(resolve);
    });
  }

  private signal(state: OutputStreamState): void {
    state.version += 1;
    const waiters = [...state.waiters];
    state.waiters.clear();
    for (const resolve of waiters) resolve();
  }

  private assertPrincipal(state: OutputStreamState, principal: ExecutionPrincipal): void {
    if (!samePrincipalIdentity(state.principal, principal)) {
      throw executionProviderError(
        'EXECUTION_PERMISSION_DENIED',
        'Output stream principal does not match the Execution owner.',
        false
      );
    }
  }

  private requireState(executionId: string): OutputStreamState {
    const state = this.states.get(executionId);
    if (!state) {
      throw executionProviderError(
        'EXECUTION_RESULT_UNKNOWN',
        `Output stream for Execution ${executionId} was not found.`,
        false
      );
    }
    return state;
  }

  private evictCompletedExecutions(): void {
    while (this.states.size >= this.maxTrackedExecutions) {
      const completed = [...this.states.entries()].find(([, state]) => state.completed);
      if (!completed) return;
      this.states.delete(completed[0]);
    }
  }
}

function samePrincipalIdentity(
  left: ExecutionPrincipal,
  right: ExecutionPrincipal
): boolean {
  return (
    left.principalId === right.principalId &&
    left.type === right.type &&
    left.userId === right.userId &&
    left.tenantId === right.tenantId &&
    left.agentId === right.agentId
  );
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive safe integer.`);
  }
  return value;
}
