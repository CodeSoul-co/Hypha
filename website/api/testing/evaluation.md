# `@codesoul-co/hypha-testing` / `evaluation`

- Package index: [`@codesoul-co/hypha-testing`](/api/testing)
- Package guide: [learning and composition guide](/packages/testing)
- Source: [`packages/testing/src/evaluation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)
- Exports: **15**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DeterministicEvaluator` | class | <code>new DeterministicEvaluator(options?: DeterministicEvaluatorOptions): DeterministicEvaluator</code> | Runtime implementation for Deterministic Evaluator; see its public constructor and members below. |
| `OutputContractValidator` | class | <code>new OutputContractValidator(options?: { now?: () =&gt; string; }): OutputContractValidator</code> | Runtime implementation for Output Contract Validator; see its public constructor and members below. |
| `TraceCompletenessEvaluator` | class | <code>new TraceCompletenessEvaluator(options?: TraceCompletenessEvaluatorOptions): TraceCompletenessEvaluator</code> | Runtime implementation for Trace Completeness Evaluator; see its public constructor and members below. |
| `validateJsonSchemaValue` | function | <code>validateJsonSchemaValue(value: unknown, schema: JsonSchema, path?: string): JsonSchemaValidationIssue[]</code> | Validates Json Schema Value at this module boundary. |
| `DeterministicEvaluationInput` | interface | <code>interface DeterministicEvaluationInput</code> | Field contract for Deterministic Evaluation Input; see all contract members below. |
| `DeterministicEvaluatorOptions` | interface | <code>interface DeterministicEvaluatorOptions</code> | Field contract for Deterministic Evaluator Options; see all contract members below. |
| `EvaluationCheckResult` | interface | <code>interface EvaluationCheckResult</code> | Field contract for Evaluation Check Result; see all contract members below. |
| `EvaluationEventContext` | interface | <code>interface EvaluationEventContext</code> | Field contract for Evaluation Event Context; see all contract members below. |
| `EvaluationResult` | interface | <code>interface EvaluationResult</code> | Field contract for Evaluation Result; see all contract members below. |
| `EvaluationSummary` | interface | <code>interface EvaluationSummary</code> | Field contract for Evaluation Summary; see all contract members below. |
| `JsonSchemaValidationIssue` | interface | <code>interface JsonSchemaValidationIssue</code> | Field contract for Json Schema Validation Issue; see all contract members below. |
| `OutputContractValidationInput` | interface | <code>interface OutputContractValidationInput</code> | Field contract for Output Contract Validation Input; see all contract members below. |
| `TraceCompletenessEvaluatorOptions` | interface | <code>interface TraceCompletenessEvaluatorOptions</code> | Field contract for Trace Completeness Evaluator Options; see all contract members below. |
| `TraceCompletenessInput` | interface | <code>interface TraceCompletenessInput</code> | Field contract for Trace Completeness Input; see all contract members below. |
| `EvaluationStatus` | type | <code>type EvaluationStatus = 'passed' &#124; 'failed'</code> | Public type alias for Evaluation Status. |

## `DeterministicEvaluator` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: DeterministicEvaluatorOptions): DeterministicEvaluator</code> | Creates an instance of this class. |
| `evaluate` | method | <code>evaluate(input: DeterministicEvaluationInput): EvaluationSummary</code> | Evaluates evaluate at this module boundary. |
| `evaluateAndRecord` | method | <code>evaluateAndRecord(input: DeterministicEvaluationInput): Promise&lt;EvaluationSummary&gt;</code> | Evaluates And Record at this module boundary. |

## `OutputContractValidator` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: { now?: () =&gt; string; }): OutputContractValidator</code> | Creates an instance of this class. |
| `validate` | method | <code>validate(input: OutputContractValidationInput): EvaluationResult</code> | Validates validate at this module boundary. |

## `TraceCompletenessEvaluator` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: TraceCompletenessEvaluatorOptions): TraceCompletenessEvaluator</code> | Creates an instance of this class. |
| `evaluate` | method | <code>evaluate(input: TraceCompletenessInput): EvaluationResult</code> | Evaluates evaluate at this module boundary. |

## `DeterministicEvaluationInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluationSpecs` | property | <code>evaluationSpecs: EvaluationSpec[]</code> | Public evaluation Specs property. |
| `events` | property | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | Public events property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `output` | property | <code>output: unknown</code> | Public output property. |
| `outputContracts` | property | <code>outputContracts: OutputContractSpec[]</code> | Public output Contracts property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `traceSpecs` | property | <code>traceSpecs: TraceSpec[]</code> | Public trace Specs property. |

## `DeterministicEvaluatorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `eventRunId` | property | <code>eventRunId: string</code> | Public event Run Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `outputValidator` | property | <code>outputValidator: OutputContractValidator</code> | Public output Validator property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `trace` | property | <code>trace: TraceRecorder</code> | Public trace property. |
| `traceEvaluator` | property | <code>traceEvaluator: TraceCompletenessEvaluator</code> | Public trace Evaluator property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `EvaluationCheckResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actual` | property | <code>actual: unknown</code> | Public actual property. |
| `expected` | property | <code>expected: unknown</code> | Public expected property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `path` | property | <code>path: string</code> | Public path property. |
| `status` | property | <code>status: EvaluationStatus</code> | Public status property. |

## `EvaluationEventContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `EvaluationResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checks` | property | <code>checks: EvaluationCheckResult[]</code> | Public checks property. |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `evaluatorId` | property | <code>evaluatorId: string</code> | Public evaluator Id property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `score` | property | <code>score: number</code> | Public score property. |
| `startedAt` | property | <code>startedAt: string</code> | Public started At property. |
| `status` | property | <code>status: EvaluationStatus</code> | Public status property. |
| `type` | property | <code>type: string</code> | Public type property. |

## `EvaluationSummary` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `results` | property | <code>results: EvaluationResult[]</code> | Public results property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `score` | property | <code>score: number</code> | Public score property. |
| `startedAt` | property | <code>startedAt: string</code> | Public started At property. |
| `status` | property | <code>status: EvaluationStatus</code> | Public status property. |

## `JsonSchemaValidationIssue` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actual` | property | <code>actual: unknown</code> | Public actual property. |
| `expected` | property | <code>expected: unknown</code> | Public expected property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `path` | property | <code>path: string</code> | Public path property. |

## `OutputContractValidationInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contract` | property | <code>contract: OutputContractSpec</code> | Public contract property. |
| `evaluationId` | property | <code>evaluationId: string</code> | Public evaluation Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `output` | property | <code>output: unknown</code> | Public output property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |

## `TraceCompletenessEvaluatorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `enforceLifecyclePairs` | property | <code>enforceLifecyclePairs: boolean</code> | Public enforce Lifecycle Pairs property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `requireTerminalRun` | property | <code>requireTerminalRun: boolean</code> | Public require Terminal Run property. |

## `TraceCompletenessInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluationId` | property | <code>evaluationId: string</code> | Public evaluation Id property. |
| `events` | property | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | Public events property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `requiredEventTypes` | property | <code>requiredEventTypes: string[]</code> | Public required Event Types property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `traceSpec` | property | <code>traceSpec: TraceSpec</code> | Public trace Spec property. |
