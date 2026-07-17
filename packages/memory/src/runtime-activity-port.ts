import {
  FrameworkError,
  type RuntimeActivityPort,
  type RuntimeActivityRequest,
  type RuntimeActivityResult,
} from '@hypha/core';
import type {
  MemoryAuditOptions,
  MemoryAuditReport,
  MemoryManager,
  MemoryReadQuery,
  MemoryRecord,
  MemoryScope,
  MemorySearchQuery,
  MemorySearchResult,
  MemorySummary,
  MemorySummaryOptions,
  MemoryWritePolicy,
  MemoryWriteResult,
} from './index';

type RuntimeMemoryScope = Omit<MemoryScope, 'runId' | 'sessionId'>;

export type MemoryRuntimeActivityInput =
  | { operation: 'read'; scope?: RuntimeMemoryScope; query: MemoryReadQuery }
  | { operation: 'search'; scope?: RuntimeMemoryScope; query: MemorySearchQuery }
  | {
      operation: 'write';
      scope?: RuntimeMemoryScope;
      record: MemoryRecord;
      policy: MemoryWritePolicy;
    }
  | {
      operation: 'update';
      scope?: RuntimeMemoryScope;
      recordId: string;
      patch: Partial<MemoryRecord>;
    }
  | { operation: 'invalidate'; scope?: RuntimeMemoryScope; recordId: string; reason: string }
  | { operation: 'summarize'; scope?: RuntimeMemoryScope; options?: MemorySummaryOptions }
  | { operation: 'audit'; scope?: RuntimeMemoryScope; options?: MemoryAuditOptions };

export type MemoryRuntimeActivityOutput =
  | { operation: 'read'; records: MemoryRecord[] }
  | { operation: 'search'; results: MemorySearchResult[] }
  | { operation: 'write'; result: MemoryWriteResult }
  | { operation: 'update'; recordId: string }
  | { operation: 'invalidate'; recordId: string }
  | { operation: 'summarize'; summary: MemorySummary }
  | { operation: 'audit'; report: MemoryAuditReport };

export interface MemoryRuntimeActivityReconciler {
  reconcile(activityId: string): Promise<RuntimeActivityResult<MemoryRuntimeActivityOutput>>;
}

export interface MemoryRuntimeActivityPortOptions {
  manager: MemoryManager;
  cancel?: (activityId: string, reason?: string) => Promise<void>;
  reconciler?: MemoryRuntimeActivityReconciler;
  eventIds?: (activityId: string) => readonly string[] | Promise<readonly string[]>;
}

export class MemoryRuntimeActivityPort implements RuntimeActivityPort<
  MemoryRuntimeActivityInput,
  MemoryRuntimeActivityOutput
> {
  constructor(private readonly options: MemoryRuntimeActivityPortOptions) {}

  async execute(
    request: RuntimeActivityRequest<MemoryRuntimeActivityInput>
  ): Promise<RuntimeActivityResult<MemoryRuntimeActivityOutput>> {
    validateRequest(request);
    const scope = toMemoryScope(request);
    const output = await this.executeOperation(request, scope);
    const artifactRefs =
      output.operation === 'write' && output.result.artifactRef
        ? [output.result.artifactRef.id]
        : undefined;
    return {
      activityId: request.activityId,
      status: 'completed',
      output,
      eventIds: await this.eventIds(request.activityId),
      ...(artifactRefs === undefined ? {} : { artifactRefs }),
    };
  }

  async cancel(activityId: string, reason?: string): Promise<void> {
    required(activityId, 'activityId');
    if (!this.options.cancel) {
      throw new FrameworkError({
        code: 'RUNTIME_INTERNAL_ERROR',
        message: 'The configured MemoryManager does not expose Activity cancellation.',
        context: { activityId },
      });
    }
    await this.options.cancel(activityId, reason);
  }

  async reconcile(activityId: string): Promise<RuntimeActivityResult<MemoryRuntimeActivityOutput>> {
    required(activityId, 'activityId');
    if (!this.options.reconciler) {
      return { activityId, status: 'unknown', eventIds: await this.eventIds(activityId) };
    }
    const result = await this.options.reconciler.reconcile(activityId);
    if (result.activityId !== activityId) {
      invalid('Memory reconciler returned a different Activity id.');
    }
    return result;
  }

  private async executeOperation(
    request: RuntimeActivityRequest<MemoryRuntimeActivityInput>,
    scope: MemoryScope
  ): Promise<MemoryRuntimeActivityOutput> {
    const input = request.input;
    switch (input.operation) {
      case 'read':
        return { operation: 'read', records: await this.options.manager.read(scope, input.query) };
      case 'search':
        return {
          operation: 'search',
          results: await this.options.manager.search(scope, input.query),
        };
      case 'write':
        return {
          operation: 'write',
          result: await this.options.manager.write(scope, input.record, {
            ...input.policy,
            idempotencyKey: request.idempotencyKey ?? input.policy.idempotencyKey,
          }),
        };
      case 'update':
        required(input.recordId, 'input.recordId');
        await this.options.manager.update(scope, input.recordId, input.patch);
        return { operation: 'update', recordId: input.recordId };
      case 'invalidate':
        required(input.recordId, 'input.recordId');
        required(input.reason, 'input.reason');
        await this.options.manager.invalidate(scope, input.recordId, input.reason);
        return { operation: 'invalidate', recordId: input.recordId };
      case 'summarize':
        return {
          operation: 'summarize',
          summary: await this.options.manager.summarize(scope, input.options),
        };
      case 'audit':
        return {
          operation: 'audit',
          report: await this.options.manager.audit(scope, input.options),
        };
    }
  }

  private async eventIds(activityId: string): Promise<string[]> {
    return this.options.eventIds ? [...(await this.options.eventIds(activityId))] : [];
  }
}

function toMemoryScope(request: RuntimeActivityRequest<MemoryRuntimeActivityInput>): MemoryScope {
  return {
    ...request.input.scope,
    runId: request.runId,
    sessionId: request.sessionId,
  };
}

function validateRequest(request: RuntimeActivityRequest<MemoryRuntimeActivityInput>): void {
  if (request.activityType !== 'memory') {
    invalid('MemoryRuntimeActivityPort only accepts memory activities.');
  }
  required(request.activityId, 'activityId');
  if (!request.input || typeof request.input !== 'object')
    invalid('Memory Activity input is required.');
}

function required(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) invalid(`${label} must be non-empty.`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
