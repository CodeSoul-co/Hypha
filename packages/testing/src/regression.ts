import type { FrameworkEvent, OutputContractSpec, RegressionSpec } from '@hypha/core';
import {
  OutputContractValidator,
  type EvaluationCheckResult,
  type EvaluationResult,
  type EvaluationStatus,
} from './evaluation';
import { ReplayEngine, type ReplayFixture, type TraceDiff } from './replay';

export type RegressionCheck =
  | 'event_types'
  | 'state_path'
  | 'tool_calls'
  | 'policy_decisions'
  | 'output_contract';

export interface RegressionCase {
  id: string;
  fixture: ReplayFixture;
  actualEvents?: FrameworkEvent[];
  requiredChecks?: RegressionCheck[];
  outputContract?: OutputContractSpec;
  metadata?: Record<string, unknown>;
}

export interface RegressionCaseResult {
  id: string;
  fixtureId: string;
  runId: string;
  status: EvaluationStatus;
  checks: EvaluationCheckResult[];
  traceDiff: TraceDiff;
  outputContractResult?: EvaluationResult;
  metadata?: Record<string, unknown>;
}

export interface RegressionRunResult {
  id: string;
  status: EvaluationStatus;
  specId?: string;
  startedAt: string;
  completedAt: string;
  cases: RegressionCaseResult[];
  summary: {
    total: number;
    passed: number;
    failed: number;
  };
}

export interface RegressionRunnerOptions {
  replayEngine?: ReplayEngine;
  outputValidator?: OutputContractValidator;
  now?: () => string;
}

export interface RegressionSpecRunInput {
  spec: RegressionSpec;
  fixtures: ReplayFixture[] | Map<string, ReplayFixture>;
  actualEventsByFixtureId?: Map<string, FrameworkEvent[]>;
  outputContractsByFixtureId?: Map<string, OutputContractSpec>;
}

const DEFAULT_NOW = (): string => new Date().toISOString();

export class RegressionRunner {
  private readonly replayEngine: ReplayEngine;
  private readonly outputValidator: OutputContractValidator;
  private readonly now: () => string;

  constructor(options: RegressionRunnerOptions = {}) {
    this.now = options.now ?? DEFAULT_NOW;
    this.replayEngine = options.replayEngine ?? new ReplayEngine({ now: this.now });
    this.outputValidator =
      options.outputValidator ?? new OutputContractValidator({ now: this.now });
  }

  runCase(regressionCase: RegressionCase): RegressionCaseResult {
    const requiredChecks = regressionCase.requiredChecks ?? [
      'event_types',
      'state_path',
      'output_contract',
    ];
    const traceDiff = this.replayEngine.compare(
      regressionCase.fixture,
      regressionCase.actualEvents ?? regressionCase.fixture.events
    );
    const checks: EvaluationCheckResult[] = [];

    if (requiredChecks.includes('event_types')) {
      checks.push(traceCheck('event_types', traceDiff.eventTypes.passed, traceDiff.eventTypes));
    }
    if (requiredChecks.includes('state_path')) {
      checks.push(traceCheck('state_path', traceDiff.statePath.passed, traceDiff.statePath));
    }
    if (requiredChecks.includes('tool_calls')) {
      checks.push(traceCheck('tool_calls', traceDiff.toolCalls.passed, traceDiff.toolCalls));
    }
    if (requiredChecks.includes('policy_decisions')) {
      checks.push(
        traceCheck('policy_decisions', traceDiff.policyDecisions.passed, traceDiff.policyDecisions)
      );
    }

    let outputContractResult: EvaluationResult | undefined;
    if (requiredChecks.includes('output_contract')) {
      const contract = regressionCase.outputContract ?? regressionCase.fixture.outputContract;
      if (contract) {
        const replay = this.replayEngine.replay({
          ...regressionCase.fixture,
          events: regressionCase.actualEvents ?? regressionCase.fixture.events,
        });
        outputContractResult = this.outputValidator.validate({
          contract,
          output: replay.projection.finalOutput,
          runId: replay.runId,
          evaluationId: `${regressionCase.id}:output_contract`,
        });
        checks.push(...outputContractResult.checks);
      } else {
        checks.push(traceCheck('output_contract', traceDiff.output.passed, traceDiff.output));
      }
    }

    const failed = checks.some((check) => check.status === 'failed');
    return {
      id: regressionCase.id,
      fixtureId: regressionCase.fixture.id,
      runId: regressionCase.fixture.runId,
      status: failed ? 'failed' : 'passed',
      checks,
      traceDiff,
      outputContractResult,
      metadata: regressionCase.metadata,
    };
  }

  runSpec(input: RegressionSpecRunInput): RegressionRunResult {
    const startedAt = this.now();
    const fixtures = normalizeFixtureMap(input.fixtures);
    const cases = input.spec.fixtureRefs.map((ref) => {
      const fixture = fixtures.get(ref.id);
      if (!fixture) {
        return missingFixtureResult(ref.id, input.spec.requiredChecks as RegressionCheck[]);
      }
      return this.runCase({
        id: `${input.spec.id}:${fixture.id}`,
        fixture,
        requiredChecks: input.spec.requiredChecks as RegressionCheck[],
        actualEvents: input.actualEventsByFixtureId?.get(fixture.id),
        outputContract: input.outputContractsByFixtureId?.get(fixture.id),
      });
    });
    const failed = cases.filter((result) => result.status === 'failed').length;
    return {
      id: `${input.spec.id}:run`,
      specId: input.spec.id,
      status: failed === 0 ? 'passed' : 'failed',
      startedAt,
      completedAt: this.now(),
      cases,
      summary: {
        total: cases.length,
        passed: cases.length - failed,
        failed,
      },
    };
  }
}

function traceCheck(id: RegressionCheck, passed: boolean, diff: unknown): EvaluationCheckResult {
  return {
    id: `regression.${id}`,
    status: passed ? 'passed' : 'failed',
    message: passed ? `${id} matched fixture.` : `${id} diverged from fixture.`,
    metadata: { diff },
  };
}

function normalizeFixtureMap(
  fixtures: ReplayFixture[] | Map<string, ReplayFixture>
): Map<string, ReplayFixture> {
  if (fixtures instanceof Map) return fixtures;
  return new Map(fixtures.map((fixture) => [fixture.id, fixture]));
}

function missingFixtureResult(
  fixtureId: string,
  requiredChecks: RegressionCheck[]
): RegressionCaseResult {
  const checks = requiredChecks.map((check) => ({
    id: `regression.${check}`,
    status: 'failed' as const,
    message: `Fixture ${fixtureId} is not available for regression check ${check}.`,
  }));
  return {
    id: `missing:${fixtureId}`,
    fixtureId,
    runId: '',
    status: 'failed',
    checks,
    traceDiff: {
      passed: false,
      eventTypes: emptySequenceDiff(),
      statePath: emptySequenceDiff(),
      toolCalls: emptySequenceDiff(),
      modelCalls: emptySequenceDiff(),
      policyDecisions: emptySequenceDiff(),
      memoryReadSet: emptySequenceDiff(),
      output: { passed: false },
    },
  };
}

function emptySequenceDiff() {
  return {
    passed: false,
    expected: [],
    actual: [],
    missing: [],
    extra: [],
    mismatches: [],
  };
}
