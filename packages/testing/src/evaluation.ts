import type {
  EvaluationSpec,
  FrameworkEvent,
  FrameworkEventType,
  JsonSchema,
  OutputContractSpec,
  TraceSpec,
} from '@hypha/core';

export type EvaluationStatus = 'passed' | 'failed';

export interface EvaluationCheckResult {
  id: string;
  status: EvaluationStatus;
  message: string;
  path?: string;
  expected?: unknown;
  actual?: unknown;
  metadata?: Record<string, unknown>;
}

export interface EvaluationResult {
  id: string;
  evaluatorId: string;
  type: string;
  status: EvaluationStatus;
  score: number;
  checks: EvaluationCheckResult[];
  runId?: string;
  startedAt: string;
  completedAt: string;
  metadata?: Record<string, unknown>;
}

export interface EvaluationSummary {
  id: string;
  status: EvaluationStatus;
  score: number;
  results: EvaluationResult[];
  runId?: string;
  startedAt: string;
  completedAt: string;
}

export interface OutputContractValidationInput {
  contract: OutputContractSpec;
  output: unknown;
  runId?: string;
  evaluationId?: string;
  metadata?: Record<string, unknown>;
}

export interface TraceCompletenessInput {
  events: FrameworkEvent[];
  traceSpec?: TraceSpec;
  runId?: string;
  requiredEventTypes?: string[];
  evaluationId?: string;
  metadata?: Record<string, unknown>;
}

export interface TraceCompletenessEvaluatorOptions {
  now?: () => string;
  enforceLifecyclePairs?: boolean;
  requireTerminalRun?: boolean;
}

export interface DeterministicEvaluatorOptions {
  now?: () => string;
  outputValidator?: OutputContractValidator;
  traceEvaluator?: TraceCompletenessEvaluator;
}

export interface DeterministicEvaluationInput {
  runId?: string;
  events?: FrameworkEvent[];
  output?: unknown;
  outputContracts?: OutputContractSpec[];
  traceSpecs?: TraceSpec[];
  evaluationSpecs?: EvaluationSpec[];
  metadata?: Record<string, unknown>;
}

interface SchemaValidationIssue {
  path: string;
  message: string;
  expected?: unknown;
  actual?: unknown;
}

const DEFAULT_NOW = (): string => new Date().toISOString();

export class OutputContractValidator {
  private readonly now: () => string;

  constructor(options: { now?: () => string } = {}) {
    this.now = options.now ?? DEFAULT_NOW;
  }

  validate(input: OutputContractValidationInput): EvaluationResult {
    const startedAt = this.now();
    const issues = validateJsonSchemaValue(input.output, input.contract.schema);
    const checks =
      issues.length === 0
        ? [
            {
              id: `${input.contract.id}:schema`,
              status: 'passed' as const,
              message: `Output satisfies contract ${input.contract.id}.`,
            },
          ]
        : issues.map((issue, index) => ({
            id: `${input.contract.id}:schema:${index + 1}`,
            status: 'failed' as const,
            message: issue.message,
            path: issue.path,
            expected: issue.expected,
            actual: issue.actual,
          }));
    return createEvaluationResult({
      id: input.evaluationId ?? `${input.contract.id}:output-contract`,
      evaluatorId: 'output-contract-validator',
      type: 'output_contract',
      runId: input.runId,
      startedAt,
      completedAt: this.now(),
      checks,
      metadata: {
        contractRef: { id: input.contract.id, version: input.contract.version },
        ...input.metadata,
      },
    });
  }
}

export class TraceCompletenessEvaluator {
  private readonly now: () => string;
  private readonly enforceLifecyclePairs: boolean;
  private readonly requireTerminalRun: boolean;

  constructor(options: TraceCompletenessEvaluatorOptions = {}) {
    this.now = options.now ?? DEFAULT_NOW;
    this.enforceLifecyclePairs = options.enforceLifecyclePairs ?? true;
    this.requireTerminalRun = options.requireTerminalRun ?? true;
  }

  evaluate(input: TraceCompletenessInput): EvaluationResult {
    const startedAt = this.now();
    const checks: EvaluationCheckResult[] = [];
    const requiredEventTypes = Array.from(
      new Set([...(input.traceSpec?.eventTypes ?? []), ...(input.requiredEventTypes ?? [])])
    );

    checks.push(...validateEventEnvelope(input.events, input.runId));
    checks.push(...checkRequiredEventTypes(input.events, requiredEventTypes));
    if (this.requireTerminalRun) {
      checks.push(...checkTerminalRun(input.events));
    }
    if (this.enforceLifecyclePairs) {
      checks.push(...checkLifecyclePairs(input.events));
    }

    if (checks.length === 0) {
      checks.push({
        id: 'trace.envelope',
        status: 'passed',
        message: 'Trace contains valid event envelopes and no required gaps.',
      });
    }

    return createEvaluationResult({
      id: input.evaluationId ?? input.traceSpec?.id ?? 'trace.completeness',
      evaluatorId: 'trace-completeness-evaluator',
      type: 'trace_completeness',
      runId: input.runId,
      startedAt,
      completedAt: this.now(),
      checks,
      metadata: {
        traceRef: input.traceSpec
          ? { id: input.traceSpec.id, version: input.traceSpec.version }
          : undefined,
        ...input.metadata,
      },
    });
  }
}

export class DeterministicEvaluator {
  private readonly now: () => string;
  private readonly outputValidator: OutputContractValidator;
  private readonly traceEvaluator: TraceCompletenessEvaluator;

  constructor(options: DeterministicEvaluatorOptions = {}) {
    this.now = options.now ?? DEFAULT_NOW;
    this.outputValidator =
      options.outputValidator ?? new OutputContractValidator({ now: this.now });
    this.traceEvaluator =
      options.traceEvaluator ?? new TraceCompletenessEvaluator({ now: this.now });
  }

  evaluate(input: DeterministicEvaluationInput): EvaluationSummary {
    const startedAt = this.now();
    const output = input.output ?? inferFinalOutput(input.events ?? []);
    const results: EvaluationResult[] = [];

    for (const contract of input.outputContracts ?? []) {
      results.push(
        this.outputValidator.validate({
          contract,
          output,
          runId: input.runId,
          metadata: input.metadata,
        })
      );
    }

    for (const traceSpec of input.traceSpecs ?? []) {
      results.push(
        this.traceEvaluator.evaluate({
          events: input.events ?? [],
          traceSpec,
          runId: input.runId,
          metadata: input.metadata,
        })
      );
    }

    for (const spec of input.evaluationSpecs ?? []) {
      results.push(...this.evaluateSpec(spec, input, output));
    }

    const completedAt = this.now();
    const score = results.length
      ? results.reduce((sum, result) => sum + result.score, 0) / results.length
      : 1;
    return {
      id: input.runId ? `${input.runId}:deterministic-evaluation` : 'deterministic-evaluation',
      runId: input.runId,
      status: results.every((result) => result.status === 'passed') ? 'passed' : 'failed',
      score,
      results,
      startedAt,
      completedAt,
    };
  }

  private evaluateSpec(
    spec: EvaluationSpec,
    input: DeterministicEvaluationInput,
    output: unknown
  ): EvaluationResult[] {
    if (spec.type === 'schema' && spec.rubric) {
      return [
        this.outputValidator.validate({
          contract: {
            id: spec.id,
            version: spec.version,
            name: spec.name,
            description: spec.description,
            schema: spec.rubric,
          },
          output,
          runId: input.runId,
          evaluationId: spec.id,
          metadata: input.metadata,
        }),
      ];
    }
    if (
      spec.type === 'tool_trace' ||
      spec.type === 'policy' ||
      spec.type === 'process' ||
      spec.type === 'regression'
    ) {
      return [
        this.traceEvaluator.evaluate({
          events: input.events ?? [],
          runId: input.runId,
          evaluationId: spec.id,
          metadata: { evaluationType: spec.type, ...input.metadata },
        }),
      ];
    }
    if (spec.type === 'output_contract' && !(input.outputContracts?.length ?? 0)) {
      return [
        createEvaluationResult({
          id: spec.id,
          evaluatorId: 'deterministic-evaluator',
          type: spec.type,
          runId: input.runId,
          startedAt: this.now(),
          completedAt: this.now(),
          checks: [
            {
              id: `${spec.id}:contract-ref`,
              status: 'failed',
              message: 'EvaluationSpec requires an OutputContractSpec, but none was supplied.',
            },
          ],
          metadata: input.metadata,
        }),
      ];
    }
    return [];
  }
}

export function validateJsonSchemaValue(
  value: unknown,
  schema: JsonSchema,
  path = '$'
): SchemaValidationIssue[] {
  const issues: SchemaValidationIssue[] = [];
  if (
    schema.enum &&
    !schema.enum.some((candidate) => stableStringify(candidate) === stableStringify(value))
  ) {
    issues.push({
      path,
      message: `${path} must be one of the declared enum values.`,
      expected: schema.enum,
      actual: value,
    });
    return issues;
  }

  if (schema.type && !jsonTypeMatches(value, schema.type)) {
    issues.push({
      path,
      message: `${path} must be ${schema.type}.`,
      expected: schema.type,
      actual: jsonValueType(value),
    });
    return issues;
  }

  if (schema.properties || schema.required || schema.additionalProperties !== undefined) {
    if (!isJsonObject(value)) {
      issues.push({
        path,
        message: `${path} must be object.`,
        expected: 'object',
        actual: jsonValueType(value),
      });
      return issues;
    }
    for (const required of schema.required ?? []) {
      if (!Object.prototype.hasOwnProperty.call(value, required)) {
        issues.push({
          path: `${path}.${required}`,
          message: `${path}.${required} is required.`,
          expected: 'present',
          actual: 'missing',
        });
      }
    }
    for (const [key, propertySchema] of Object.entries(schema.properties ?? {})) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        issues.push(...validateJsonSchemaValue(value[key], propertySchema, `${path}.${key}`));
      }
    }
    const knownProperties = new Set(Object.keys(schema.properties ?? {}));
    const additionalKeys = Object.keys(value).filter((key) => !knownProperties.has(key));
    if (schema.additionalProperties === false && additionalKeys.length > 0) {
      for (const key of additionalKeys) {
        issues.push({
          path: `${path}.${key}`,
          message: `${path}.${key} is not allowed by additionalProperties=false.`,
          expected: 'not present',
          actual: value[key],
        });
      }
    } else if (isJsonObject(schema.additionalProperties)) {
      for (const key of additionalKeys) {
        issues.push(
          ...validateJsonSchemaValue(value[key], schema.additionalProperties, `${path}.${key}`)
        );
      }
    }
  }

  if (schema.items) {
    if (!Array.isArray(value)) {
      issues.push({
        path,
        message: `${path} must be array.`,
        expected: 'array',
        actual: jsonValueType(value),
      });
      return issues;
    }
    value.forEach((item, index) => {
      issues.push(
        ...validateJsonSchemaValue(item, schema.items as JsonSchema, `${path}[${index}]`)
      );
    });
  }

  issues.push(...validateScalarBounds(value, schema, path));
  return issues;
}

function createEvaluationResult(input: {
  id: string;
  evaluatorId: string;
  type: string;
  checks: EvaluationCheckResult[];
  startedAt: string;
  completedAt: string;
  runId?: string;
  metadata?: Record<string, unknown>;
}): EvaluationResult {
  const failed = input.checks.filter((check) => check.status === 'failed').length;
  const total = Math.max(1, input.checks.length);
  return {
    id: input.id,
    evaluatorId: input.evaluatorId,
    type: input.type,
    runId: input.runId,
    status: failed === 0 ? 'passed' : 'failed',
    score: (total - failed) / total,
    checks: input.checks,
    startedAt: input.startedAt,
    completedAt: input.completedAt,
    metadata: input.metadata,
  };
}

function validateEventEnvelope(
  events: FrameworkEvent[],
  expectedRunId?: string
): EvaluationCheckResult[] {
  const checks: EvaluationCheckResult[] = [];
  if (events.length === 0) {
    checks.push(failedCheck('trace.events.present', 'Trace must include at least one event.'));
  }
  events.forEach((event, index) => {
    const prefix = `event[${index}]`;
    if (!event.id) {
      checks.push(failedCheck(`${prefix}.id`, `${prefix} is missing id.`));
    }
    if (!event.type) {
      checks.push(failedCheck(`${prefix}.type`, `${prefix} is missing type.`));
    }
    if (!event.runId) {
      checks.push(failedCheck(`${prefix}.runId`, `${prefix} is missing runId.`));
    }
    if (expectedRunId && event.runId !== expectedRunId) {
      checks.push(
        failedCheck(
          `${prefix}.runId.matches`,
          `${prefix} runId does not match the evaluated run.`,
          expectedRunId,
          event.runId
        )
      );
    }
    if (!event.timestamp || Number.isNaN(Date.parse(event.timestamp))) {
      checks.push(failedCheck(`${prefix}.timestamp`, `${prefix} timestamp must be ISO-like.`));
    }
  });
  return checks;
}

function checkRequiredEventTypes(
  events: FrameworkEvent[],
  requiredEventTypes: string[]
): EvaluationCheckResult[] {
  const actual = new Set(events.map((event) => event.type));
  return requiredEventTypes
    .filter((type) => !actual.has(type as FrameworkEventType))
    .map((type) =>
      failedCheck(`trace.required.${type}`, `Trace is missing required event type ${type}.`, type)
    );
}

function checkTerminalRun(events: FrameworkEvent[]): EvaluationCheckResult[] {
  if (!events.some((event) => event.type === 'run.started')) return [];
  const terminal = events.some((event) =>
    ['run.completed', 'run.failed', 'run.cancelled', 'run.waiting_human'].includes(event.type)
  );
  return terminal
    ? []
    : [failedCheck('trace.run.terminal', 'Trace has run.started without a terminal run event.')];
}

function checkLifecyclePairs(events: FrameworkEvent[]): EvaluationCheckResult[] {
  return [
    ...checkPhasePair(events, 'inference.requested', ['inference.completed', 'inference.failed']),
    ...checkPhasePair(events, 'model.call.started', ['model.call.completed', 'model.call.failed']),
    ...checkPhasePair(events, 'tool.call.started', [
      'tool.call.completed',
      'tool.call.failed',
      'tool.call.timeout',
      'tool.call.rejected',
    ]),
    ...checkPhasePair(events, 'mcp.call.started', ['mcp.call.completed', 'mcp.call.failed']),
    ...checkPhasePair(events, 'memory.read.requested', [
      'memory.read.completed',
      'memory.read.failed',
    ]),
    ...checkPhasePair(events, 'memory.write.requested', [
      'memory.write.committed',
      'memory.write.rejected',
    ]),
  ];
}

function checkPhasePair(
  events: FrameworkEvent[],
  startedType: FrameworkEventType,
  terminalTypes: FrameworkEventType[]
): EvaluationCheckResult[] {
  const checks: EvaluationCheckResult[] = [];
  events.forEach((event, index) => {
    if (event.type !== startedType) return;
    const hasTerminal = events
      .slice(index + 1)
      .some(
        (candidate) =>
          terminalTypes.includes(candidate.type) &&
          eventCorrelationKey(candidate) === eventCorrelationKey(event)
      );
    if (!hasTerminal) {
      checks.push(
        failedCheck(
          `trace.lifecycle.${event.id}`,
          `${startedType} event ${event.id} has no matching terminal event.`,
          terminalTypes,
          undefined
        )
      );
    }
  });
  return checks;
}

function eventCorrelationKey(event: FrameworkEvent): string {
  return [event.runId, event.stepId ?? ''].join(':');
}

function failedCheck(
  id: string,
  message: string,
  expected?: unknown,
  actual?: unknown
): EvaluationCheckResult {
  return { id, status: 'failed', message, expected, actual };
}

function inferFinalOutput(events: FrameworkEvent[]): unknown {
  const terminal = [...events]
    .reverse()
    .find((event) => ['run.completed', 'run.failed', 'run.cancelled'].includes(event.type));
  return terminal ? asRecord(terminal.payload)?.output : undefined;
}

function validateScalarBounds(
  value: unknown,
  schema: JsonSchema,
  path: string
): SchemaValidationIssue[] {
  const issues: SchemaValidationIssue[] = [];
  const minLength = numberKeyword(schema, 'minLength');
  const maxLength = numberKeyword(schema, 'maxLength');
  const minimum = numberKeyword(schema, 'minimum');
  const maximum = numberKeyword(schema, 'maximum');
  const pattern = stringKeyword(schema, 'pattern');

  if (typeof value === 'string') {
    if (minLength !== undefined && value.length < minLength) {
      issues.push({
        path,
        message: `${path} length must be >= ${minLength}.`,
        expected: minLength,
        actual: value.length,
      });
    }
    if (maxLength !== undefined && value.length > maxLength) {
      issues.push({
        path,
        message: `${path} length must be <= ${maxLength}.`,
        expected: maxLength,
        actual: value.length,
      });
    }
    if (pattern && !new RegExp(pattern).test(value)) {
      issues.push({
        path,
        message: `${path} must match pattern ${pattern}.`,
        expected: pattern,
        actual: value,
      });
    }
  }
  if (typeof value === 'number') {
    if (minimum !== undefined && value < minimum) {
      issues.push({
        path,
        message: `${path} must be >= ${minimum}.`,
        expected: minimum,
        actual: value,
      });
    }
    if (maximum !== undefined && value > maximum) {
      issues.push({
        path,
        message: `${path} must be <= ${maximum}.`,
        expected: maximum,
        actual: value,
      });
    }
  }
  return issues;
}

function jsonTypeMatches(value: unknown, expected: string): boolean {
  if (expected === 'integer') return Number.isInteger(value);
  if (expected === 'number') return typeof value === 'number' && Number.isFinite(value);
  if (expected === 'object') return isJsonObject(value);
  if (expected === 'array') return Array.isArray(value);
  if (expected === 'null') return value === null;
  return typeof value === expected;
}

function jsonValueType(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (Number.isInteger(value)) return 'integer';
  return typeof value;
}

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return isJsonObject(value) ? value : null;
}

function numberKeyword(schema: JsonSchema, key: string): number | undefined {
  const value = schema[key];
  return typeof value === 'number' ? value : undefined;
}

function stringKeyword(schema: JsonSchema, key: string): string | undefined {
  const value = schema[key];
  return typeof value === 'string' ? value : undefined;
}

function stableStringify(value: unknown): string {
  return JSON.stringify(sortJson(value));
}

function sortJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortJson);
  if (!isJsonObject(value)) return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, sortJson(value[key])])
  );
}
