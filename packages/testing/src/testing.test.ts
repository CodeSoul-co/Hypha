import { describe, expect, it } from 'vitest';
import {
  createFrameworkEvent,
  InMemoryEventStore,
  type FrameworkEvent,
  type OutputContractSpec,
} from '@hypha/core';
import { domainPackSpecDefinition, validateDomainPackSpec } from '@hypha/domain';
import {
  assertEventTypes,
  assertStatePath,
  DeterministicEvaluator,
  InMemoryReplayFixtureStore,
  OutputContractValidator,
  RegressionRunner,
  ReplayEngine,
  TraceCompletenessEvaluator,
} from './index';

describe('@hypha/testing golden helpers', () => {
  it('checks golden event types and state paths', () => {
    const fixture = {
      id: 'fixture',
      version: '0.0.0',
      statePath: ['Idle', 'Completed'],
      events: [
        createFrameworkEvent({
          id: 'event_1',
          type: 'run.started',
          runId: 'run_1',
          payload: {},
        }),
      ],
    };

    expect(assertEventTypes(fixture, ['run.started'])).toBe(true);
    expect(assertStatePath(fixture, ['Idle', 'Completed'])).toBe(true);
  });

  it('validates deterministic output contracts without model calls', () => {
    const contract = createAnswerContract();
    const validator = new OutputContractValidator({ now: fixedNow });

    expect(
      validator.validate({
        contract,
        output: { answer: 'ok', citations: ['fixture'] },
        runId: 'run_eval',
      })
    ).toMatchObject({
      status: 'passed',
      score: 1,
    });

    expect(
      validator.validate({
        contract,
        output: { answer: 42, extra: true },
        runId: 'run_eval',
      })
    ).toMatchObject({
      status: 'failed',
      checks: expect.arrayContaining([
        expect.objectContaining({ path: '$.answer' }),
        expect.objectContaining({ path: '$.extra' }),
      ]),
    });
  });

  it('evaluates trace completeness and lifecycle closure', () => {
    const incomplete = [
      event('run.started', 'run_trace', 'e1', {}, 1),
      event('model.call.started', 'run_trace', 'e2', { modelAlias: 'mock' }, 2, 'reason'),
    ];

    const result = new TraceCompletenessEvaluator({ now: fixedNow }).evaluate({
      runId: 'run_trace',
      events: incomplete,
      requiredEventTypes: ['run.started', 'run.completed'],
    });

    expect(result.status).toBe('failed');
    expect(result.checks.map((check) => check.id)).toEqual(
      expect.arrayContaining([
        'trace.required.run.completed',
        'trace.run.terminal',
        'trace.lifecycle.e2',
      ])
    );
  });

  it('captures a run, replays it, and reports trace diffs', async () => {
    const store = new InMemoryEventStore();
    const fixtureStore = new InMemoryReplayFixtureStore();
    const replay = new ReplayEngine({ eventStore: store, fixtureStore, now: fixedNow });
    const events = createCompletedRunEvents();
    for (const frameworkEvent of events) {
      await store.append(frameworkEvent);
    }

    const fixture = await replay.capture({
      id: 'fixture.default',
      version: '0.0.0',
      runId: 'run_replay',
      outputContract: createAnswerContract(),
    });

    expect(fixture.statePath).toEqual(['Intake', 'Completed']);
    expect(replay.replay(fixture).projection).toMatchObject({
      finalOutput: { answer: 'ok' },
      policyDecisions: [expect.stringContaining('tool.search')],
    });
    await expect(fixtureStore.get('fixture.default')).resolves.toMatchObject({
      runId: 'run_replay',
    });

    const changed = events.map((frameworkEvent) =>
      frameworkEvent.type === 'run.completed'
        ? { ...frameworkEvent, payload: { output: { answer: 'changed' } } }
        : frameworkEvent
    );
    const diff = replay.compare(fixture, changed);
    expect(diff.eventTypes.passed).toBe(true);
    expect(diff.statePath.passed).toBe(true);
    expect(diff.output.passed).toBe(false);
  });

  it('runs a minimal DomainPack regression case from a replay fixture', async () => {
    const contract = createAnswerContract();
    const domainPack = validateDomainPackSpec({
      ...domainPackSpecDefinition.example,
      outputContracts: [contract],
      regressionCases: [
        {
          id: 'regression.event-contract',
          version: '0.0.0',
          fixtureRefs: [{ id: 'fixture.default', version: '0.0.0' }],
          requiredChecks: ['event_types', 'state_path', 'policy_decisions', 'output_contract'],
        },
      ],
    });
    const replay = new ReplayEngine({ now: fixedNow });
    const fixture = await replay.capture({
      id: 'fixture.default',
      version: '0.0.0',
      runId: 'run_replay',
      events: createCompletedRunEvents(),
      outputContract: contract,
    });

    const result = new RegressionRunner({ replayEngine: replay, now: fixedNow }).runSpec({
      spec: domainPack.regressionCases![0],
      fixtures: [fixture],
    });

    expect(result).toMatchObject({
      status: 'passed',
      summary: { total: 1, passed: 1, failed: 0 },
    });

    const deterministic = new DeterministicEvaluator({ now: fixedNow }).evaluate({
      runId: 'run_replay',
      events: fixture.events,
      outputContracts: [contract],
      traceSpecs: [
        {
          id: 'trace.replay',
          version: '0.0.0',
          eventTypes: ['run.started', 'fsm.state.entered', 'tool.policy.checked', 'run.completed'],
        },
      ],
    });
    expect(deterministic.status).toBe('passed');
  });
});

function createAnswerContract(): OutputContractSpec {
  return {
    id: 'output.default',
    version: '0.0.0',
    schema: {
      type: 'object',
      required: ['answer'],
      properties: {
        answer: { type: 'string' },
        citations: { type: 'array', items: { type: 'string' } },
      },
      additionalProperties: false,
    },
  };
}

function createCompletedRunEvents(): FrameworkEvent[] {
  return [
    event('run.started', 'run_replay', 'e1', { input: 'hello' }, 1),
    event('fsm.state.entered', 'run_replay', 'e2', { stateId: 'Intake' }, 2),
    event(
      'tool.policy.checked',
      'run_replay',
      'e3',
      { toolId: 'tool.search', decision: { allowed: true } },
      3,
      'search'
    ),
    event(
      'tool.call.completed',
      'run_replay',
      'e4',
      { toolId: 'tool.search', output: { results: ['hypha'] } },
      4,
      'search'
    ),
    event('memory.read.completed', 'run_replay', 'e5', { target: 'working' }, 5, 'memory'),
    event('fsm.state.entered', 'run_replay', 'e6', { stateId: 'Completed' }, 6),
    event('run.completed', 'run_replay', 'e7', { output: { answer: 'ok' } }, 7),
  ];
}

function event(
  type: FrameworkEvent['type'],
  runId: string,
  id: string,
  payload: unknown,
  second: number,
  stepId?: string
): FrameworkEvent {
  return createFrameworkEvent({
    id,
    type,
    runId,
    stepId,
    sessionId: 'session_testing',
    timestamp: `2026-07-04T00:00:${String(second).padStart(2, '0')}.000Z`,
    payload,
  });
}

function fixedNow(): string {
  return '2026-07-04T00:00:00.000Z';
}
