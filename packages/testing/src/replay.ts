import type {
  EventStore,
  FrameworkEvent,
  OutputContractSpec,
  ReplaySpec,
  SpecRef,
} from '@hypha/core';

export interface ReplayFixture {
  id: string;
  version: string;
  runId: string;
  createdAt: string;
  replaySpecRef?: SpecRef;
  events: FrameworkEvent[];
  eventTypes: string[];
  statePath: string[];
  finalOutput?: unknown;
  toolCalls: string[];
  policyDecisions: string[];
  memoryReadSet: string[];
  outputContract?: OutputContractSpec;
  metadata?: Record<string, unknown>;
}

export interface ReplayProjection {
  runId: string;
  events: FrameworkEvent[];
  eventTypes: string[];
  statePath: string[];
  finalOutput?: unknown;
  toolCalls: string[];
  policyDecisions: string[];
  memoryReadSet: string[];
  modelCalls: string[];
}

export interface ReplayCaptureInput {
  id: string;
  version: string;
  runId: string;
  events?: FrameworkEvent[];
  replaySpec?: ReplaySpec;
  outputContract?: OutputContractSpec;
  metadata?: Record<string, unknown>;
}

export interface ReplayResult {
  fixtureId: string;
  runId: string;
  projection: ReplayProjection;
}

export interface TraceSequenceDiff {
  passed: boolean;
  expected: string[];
  actual: string[];
  missing: string[];
  extra: string[];
  mismatches: Array<{ index: number; expected?: string; actual?: string }>;
}

export interface TraceValueDiff {
  passed: boolean;
  expected?: unknown;
  actual?: unknown;
}

export interface TraceDiff {
  passed: boolean;
  eventTypes: TraceSequenceDiff;
  statePath: TraceSequenceDiff;
  toolCalls: TraceSequenceDiff;
  modelCalls: TraceSequenceDiff;
  policyDecisions: TraceSequenceDiff;
  memoryReadSet: TraceSequenceDiff;
  output: TraceValueDiff;
}

export interface ReplayEngineOptions {
  eventStore?: EventStore;
  fixtureStore?: ReplayFixtureStore;
  now?: () => string;
}

export interface ReplayFixtureStore {
  save(fixture: ReplayFixture): Promise<void>;
  get(id: string): Promise<ReplayFixture | null>;
  list(): Promise<ReplayFixture[]>;
}

const DEFAULT_NOW = (): string => new Date().toISOString();

export class InMemoryReplayFixtureStore implements ReplayFixtureStore {
  private readonly fixtures = new Map<string, ReplayFixture>();

  async save(fixture: ReplayFixture): Promise<void> {
    this.fixtures.set(fixture.id, fixture);
  }

  async get(id: string): Promise<ReplayFixture | null> {
    return this.fixtures.get(id) ?? null;
  }

  async list(): Promise<ReplayFixture[]> {
    return Array.from(this.fixtures.values()).sort((left, right) =>
      left.id.localeCompare(right.id)
    );
  }
}

export class ReplayEngine {
  private readonly eventStore?: EventStore;
  private readonly fixtureStore?: ReplayFixtureStore;
  private readonly now: () => string;

  constructor(options: ReplayEngineOptions = {}) {
    this.eventStore = options.eventStore;
    this.fixtureStore = options.fixtureStore;
    this.now = options.now ?? DEFAULT_NOW;
  }

  async capture(input: ReplayCaptureInput): Promise<ReplayFixture> {
    const capturedEvents = applyReplayCapturePolicy(
      normalizeEvents(
        input.events ?? (await this.requireEventStore().list({ runId: input.runId }))
      ),
      input.replaySpec
    );
    const projection = projectReplay(capturedEvents);
    const fixture: ReplayFixture = {
      id: input.id,
      version: input.version,
      runId: input.runId,
      createdAt: this.now(),
      replaySpecRef: input.replaySpec
        ? { id: input.replaySpec.id, version: input.replaySpec.version }
        : undefined,
      events: capturedEvents,
      eventTypes: projection.eventTypes,
      statePath: projection.statePath,
      finalOutput: projection.finalOutput,
      toolCalls: projection.toolCalls,
      policyDecisions: projection.policyDecisions,
      memoryReadSet: projection.memoryReadSet,
      outputContract: input.outputContract,
      metadata: input.metadata,
    };
    await this.fixtureStore?.save(fixture);
    return fixture;
  }

  replay(fixture: ReplayFixture): ReplayResult {
    return {
      fixtureId: fixture.id,
      runId: fixture.runId,
      projection: projectReplay(fixture.events),
    };
  }

  compare(expected: ReplayFixture, actual: ReplayFixture | FrameworkEvent[]): TraceDiff {
    const expectedProjection = projectReplay(expected.events);
    const actualProjection = Array.isArray(actual)
      ? projectReplay(actual)
      : projectReplay(actual.events);
    const output = {
      passed:
        stableStringify(expectedProjection.finalOutput) ===
        stableStringify(actualProjection.finalOutput),
      expected: expectedProjection.finalOutput,
      actual: actualProjection.finalOutput,
    };
    const eventTypes = diffStringSequences(
      expectedProjection.eventTypes,
      actualProjection.eventTypes
    );
    const statePath = diffStringSequences(expectedProjection.statePath, actualProjection.statePath);
    const toolCalls = diffStringSequences(expectedProjection.toolCalls, actualProjection.toolCalls);
    const modelCalls = diffStringSequences(
      expectedProjection.modelCalls,
      actualProjection.modelCalls
    );
    const policyDecisions = diffStringSequences(
      expectedProjection.policyDecisions,
      actualProjection.policyDecisions
    );
    const memoryReadSet = diffStringSequences(
      expectedProjection.memoryReadSet,
      actualProjection.memoryReadSet
    );
    return {
      passed:
        eventTypes.passed &&
        statePath.passed &&
        toolCalls.passed &&
        modelCalls.passed &&
        policyDecisions.passed &&
        memoryReadSet.passed &&
        output.passed,
      eventTypes,
      statePath,
      toolCalls,
      modelCalls,
      policyDecisions,
      memoryReadSet,
      output,
    };
  }

  private requireEventStore(): EventStore {
    if (!this.eventStore) {
      throw new Error('ReplayEngine.capture requires events or an EventStore.');
    }
    return this.eventStore;
  }
}

export function projectReplay(events: FrameworkEvent[]): ReplayProjection {
  const normalized = normalizeEvents(events);
  const terminal = [...normalized]
    .reverse()
    .find((event) => ['run.completed', 'run.failed', 'run.cancelled'].includes(event.type));
  return {
    runId: normalized.find((event) => event.runId)?.runId ?? '',
    events: normalized,
    eventTypes: normalized.map((event) => event.type),
    statePath: normalized
      .filter((event) => event.type === 'fsm.state.entered')
      .map((event) => stringPayloadField(event, 'stateId') ?? String(event.fsmState ?? '')),
    finalOutput: terminal ? asRecord(terminal.payload)?.output : undefined,
    toolCalls: normalized
      .filter((event) =>
        ['tool.call.completed', 'tool.call.failed', 'tool.call.rejected'].includes(event.type)
      )
      .map(toolCallSignature),
    policyDecisions: normalized
      .filter((event) => event.type === 'tool.policy.checked')
      .map(policyDecisionSignature),
    memoryReadSet: normalized
      .filter((event) => event.type === 'memory.read.completed')
      .map(memoryReadSignature),
    modelCalls: normalized
      .filter((event) => event.type.startsWith('model.call.'))
      .map(modelCallSignature),
  };
}

export function diffStringSequences(expected: string[], actual: string[]): TraceSequenceDiff {
  const max = Math.max(expected.length, actual.length);
  const mismatches: TraceSequenceDiff['mismatches'] = [];
  for (let index = 0; index < max; index += 1) {
    if (expected[index] !== actual[index]) {
      mismatches.push({ index, expected: expected[index], actual: actual[index] });
    }
  }
  const actualCounts = countValues(actual);
  const expectedCounts = countValues(expected);
  return {
    passed: mismatches.length === 0,
    expected,
    actual,
    missing: subtractCounts(expectedCounts, actualCounts),
    extra: subtractCounts(actualCounts, expectedCounts),
    mismatches,
  };
}

export function normalizeEvents(events: FrameworkEvent[]): FrameworkEvent[] {
  return events
    .map((event, index) => ({ event, index }))
    .sort((left, right) => {
      const byTime = left.event.timestamp.localeCompare(right.event.timestamp);
      return byTime === 0 ? left.index - right.index : byTime;
    })
    .map(({ event }) => event);
}

function applyReplayCapturePolicy(
  events: FrameworkEvent[],
  replaySpec?: ReplaySpec
): FrameworkEvent[] {
  if (!replaySpec) return events;
  return events.filter((event) => {
    if (!replaySpec.captureModelIO && event.type.startsWith('model.call.')) return false;
    if (!replaySpec.captureToolIO && event.type.startsWith('tool.call.')) return false;
    if (!replaySpec.captureMemoryReadSet && event.type.startsWith('memory.read.')) return false;
    if (!replaySpec.capturePolicyDecisions && event.type.includes('policy')) return false;
    return true;
  });
}

function toolCallSignature(event: FrameworkEvent): string {
  const payload = asRecord(event.payload);
  return [
    event.type,
    event.stepId ?? '',
    stringPayloadField(event, 'toolId') ?? '',
    stringPayloadField(event, 'source') ?? '',
    stableStringify(payload?.output ?? payload?.error ?? payload?.decision ?? null),
  ].join('|');
}

function policyDecisionSignature(event: FrameworkEvent): string {
  const payload = asRecord(event.payload);
  return [
    event.stepId ?? '',
    stringPayloadField(event, 'toolId') ?? '',
    stableStringify(payload?.decision ?? null),
  ].join('|');
}

function memoryReadSignature(event: FrameworkEvent): string {
  return [event.stepId ?? '', stringPayloadField(event, 'target') ?? ''].join('|');
}

function modelCallSignature(event: FrameworkEvent): string {
  return [
    event.type,
    event.stepId ?? '',
    stringPayloadField(event, 'modelAlias') ?? stringPayloadField(event, 'model') ?? '',
  ].join('|');
}

function stringPayloadField(event: FrameworkEvent, key: string): string | null {
  const value = asRecord(event.payload)?.[key];
  return typeof value === 'string' ? value : null;
}

function countValues(values: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
}

function subtractCounts(left: Map<string, number>, right: Map<string, number>): string[] {
  const diff: string[] = [];
  for (const [value, count] of left.entries()) {
    const remaining = count - (right.get(value) ?? 0);
    for (let index = 0; index < remaining; index += 1) {
      diff.push(value);
    }
  }
  return diff;
}

function stableStringify(value: unknown): string {
  return JSON.stringify(sortJson(value));
}

function sortJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortJson);
  if (!isRecord(value)) return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, sortJson(value[key])])
  );
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return isRecord(value) ? value : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}
