# `@codesoul-co/hypha-testing` / `evaluation`

- 包索引: [`@codesoul-co/hypha-testing`](/zh/api/testing)
- 模块指南: [学习与组合说明](/zh/packages/testing)
- 源码: [`packages/testing/src/evaluation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)
- 导出数: **15**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DeterministicEvaluator` | 类 | <code>new DeterministicEvaluator(options?: DeterministicEvaluatorOptions): DeterministicEvaluator</code> | Deterministic Evaluator 的运行时实现；公开构造函数与成员见下表。 |
| `OutputContractValidator` | 类 | <code>new OutputContractValidator(options?: { now?: () =&gt; string; }): OutputContractValidator</code> | Output Contract Validator 的运行时实现；公开构造函数与成员见下表。 |
| `TraceCompletenessEvaluator` | 类 | <code>new TraceCompletenessEvaluator(options?: TraceCompletenessEvaluatorOptions): TraceCompletenessEvaluator</code> | Trace Completeness Evaluator 的运行时实现；公开构造函数与成员见下表。 |
| `validateJsonSchemaValue` | 函数 | <code>validateJsonSchemaValue(value: unknown, schema: JsonSchema, path?: string): JsonSchemaValidationIssue[]</code> | 校验 Json Schema Value。 |
| `DeterministicEvaluationInput` | 接口 | <code>interface DeterministicEvaluationInput</code> | Deterministic Evaluation Input 的字段契约；完整字段见下表。 |
| `DeterministicEvaluatorOptions` | 接口 | <code>interface DeterministicEvaluatorOptions</code> | Deterministic Evaluator Options 的字段契约；完整字段见下表。 |
| `EvaluationCheckResult` | 接口 | <code>interface EvaluationCheckResult</code> | Evaluation Check Result 的字段契约；完整字段见下表。 |
| `EvaluationEventContext` | 接口 | <code>interface EvaluationEventContext</code> | Evaluation Event Context 的字段契约；完整字段见下表。 |
| `EvaluationResult` | 接口 | <code>interface EvaluationResult</code> | Evaluation Result 的字段契约；完整字段见下表。 |
| `EvaluationSummary` | 接口 | <code>interface EvaluationSummary</code> | Evaluation Summary 的字段契约；完整字段见下表。 |
| `JsonSchemaValidationIssue` | 接口 | <code>interface JsonSchemaValidationIssue</code> | Json Schema Validation Issue 的字段契约；完整字段见下表。 |
| `OutputContractValidationInput` | 接口 | <code>interface OutputContractValidationInput</code> | Output Contract Validation Input 的字段契约；完整字段见下表。 |
| `TraceCompletenessEvaluatorOptions` | 接口 | <code>interface TraceCompletenessEvaluatorOptions</code> | Trace Completeness Evaluator Options 的字段契约；完整字段见下表。 |
| `TraceCompletenessInput` | 接口 | <code>interface TraceCompletenessInput</code> | Trace Completeness Input 的字段契约；完整字段见下表。 |
| `EvaluationStatus` | 类型 | <code>type EvaluationStatus = 'passed' &#124; 'failed'</code> | Evaluation Status 的公共类型别名。 |

## `DeterministicEvaluator` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: DeterministicEvaluatorOptions): DeterministicEvaluator</code> | 创建该类的实例。 |
| `evaluate` | 方法 | <code>evaluate(input: DeterministicEvaluationInput): EvaluationSummary</code> | 评估 evaluate。 |
| `evaluateAndRecord` | 方法 | <code>evaluateAndRecord(input: DeterministicEvaluationInput): Promise&lt;EvaluationSummary&gt;</code> | 评估 And Record。 |

## `OutputContractValidator` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: { now?: () =&gt; string; }): OutputContractValidator</code> | 创建该类的实例。 |
| `validate` | 方法 | <code>validate(input: OutputContractValidationInput): EvaluationResult</code> | 校验 validate。 |

## `TraceCompletenessEvaluator` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: TraceCompletenessEvaluatorOptions): TraceCompletenessEvaluator</code> | 创建该类的实例。 |
| `evaluate` | 方法 | <code>evaluate(input: TraceCompletenessInput): EvaluationResult</code> | 评估 evaluate。 |

## `DeterministicEvaluationInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluationSpecs` | 属性 | <code>evaluationSpecs: EvaluationSpec[]</code> | evaluation Specs 字段。 |
| `events` | 属性 | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | events 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `output` | 属性 | <code>output: unknown</code> | output 字段。 |
| `outputContracts` | 属性 | <code>outputContracts: OutputContractSpec[]</code> | output Contracts 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `traceSpecs` | 属性 | <code>traceSpecs: TraceSpec[]</code> | trace Specs 字段。 |

## `DeterministicEvaluatorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `eventRunId` | 属性 | <code>eventRunId: string</code> | event Run Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `outputValidator` | 属性 | <code>outputValidator: OutputContractValidator</code> | output Validator 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `trace` | 属性 | <code>trace: TraceRecorder</code> | trace 字段。 |
| `traceEvaluator` | 属性 | <code>traceEvaluator: TraceCompletenessEvaluator</code> | trace Evaluator 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `EvaluationCheckResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actual` | 属性 | <code>actual: unknown</code> | actual 字段。 |
| `expected` | 属性 | <code>expected: unknown</code> | expected 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `path` | 属性 | <code>path: string</code> | path 字段。 |
| `status` | 属性 | <code>status: EvaluationStatus</code> | status 字段。 |

## `EvaluationEventContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `EvaluationResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checks` | 属性 | <code>checks: EvaluationCheckResult[]</code> | checks 字段。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `evaluatorId` | 属性 | <code>evaluatorId: string</code> | evaluator Id 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `score` | 属性 | <code>score: number</code> | score 字段。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | started At 字段。 |
| `status` | 属性 | <code>status: EvaluationStatus</code> | status 字段。 |
| `type` | 属性 | <code>type: string</code> | type 字段。 |

## `EvaluationSummary` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `results` | 属性 | <code>results: EvaluationResult[]</code> | results 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `score` | 属性 | <code>score: number</code> | score 字段。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | started At 字段。 |
| `status` | 属性 | <code>status: EvaluationStatus</code> | status 字段。 |

## `JsonSchemaValidationIssue` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actual` | 属性 | <code>actual: unknown</code> | actual 字段。 |
| `expected` | 属性 | <code>expected: unknown</code> | expected 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `path` | 属性 | <code>path: string</code> | path 字段。 |

## `OutputContractValidationInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contract` | 属性 | <code>contract: OutputContractSpec</code> | contract 字段。 |
| `evaluationId` | 属性 | <code>evaluationId: string</code> | evaluation Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `output` | 属性 | <code>output: unknown</code> | output 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |

## `TraceCompletenessEvaluatorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `enforceLifecyclePairs` | 属性 | <code>enforceLifecyclePairs: boolean</code> | enforce Lifecycle Pairs 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `requireTerminalRun` | 属性 | <code>requireTerminalRun: boolean</code> | require Terminal Run 字段。 |

## `TraceCompletenessInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluationId` | 属性 | <code>evaluationId: string</code> | evaluation Id 字段。 |
| `events` | 属性 | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | events 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `requiredEventTypes` | 属性 | <code>requiredEventTypes: string[]</code> | required Event Types 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `traceSpec` | 属性 | <code>traceSpec: TraceSpec</code> | trace Spec 字段。 |
