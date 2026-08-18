# `@codesoul-co/hypha-testing` / `regression`

- 包索引: [`@codesoul-co/hypha-testing`](/zh/api/testing)
- 模块指南: [学习与组合说明](/zh/packages/testing)
- 源码: [`packages/testing/src/regression.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RegressionRunner` | 类 | <code>new RegressionRunner(options?: RegressionRunnerOptions): RegressionRunner</code> | Regression Runner 的运行时实现；公开构造函数与成员见下表。 |
| `RegressionCase` | 接口 | <code>interface RegressionCase</code> | Regression Case 的字段契约；完整字段见下表。 |
| `RegressionCaseResult` | 接口 | <code>interface RegressionCaseResult</code> | Regression Case Result 的字段契约；完整字段见下表。 |
| `RegressionRunnerOptions` | 接口 | <code>interface RegressionRunnerOptions</code> | Regression Runner Options 的字段契约；完整字段见下表。 |
| `RegressionRunResult` | 接口 | <code>interface RegressionRunResult</code> | Regression Run Result 的字段契约；完整字段见下表。 |
| `RegressionSpecRunInput` | 接口 | <code>interface RegressionSpecRunInput</code> | Regression Spec Run Input 的字段契约；完整字段见下表。 |
| `RegressionCheck` | 类型 | <code>type RegressionCheck = 'event_types' &#124; 'state_path' &#124; 'tool_calls' &#124; 'policy_decisions' &#124; 'output_contract'</code> | Regression Check 的公共类型别名。 |

## `RegressionRunner` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: RegressionRunnerOptions): RegressionRunner</code> | 创建该类的实例。 |
| `runCase` | 方法 | <code>runCase(regressionCase: RegressionCase): RegressionCaseResult</code> | run Case 的公开运行时操作。 |
| `runSpec` | 方法 | <code>runSpec(input: RegressionSpecRunInput): RegressionRunResult</code> | run Spec 的公开运行时操作。 |
| `runSpecAndRecord` | 方法 | <code>runSpecAndRecord(input: RegressionSpecRunInput): Promise&lt;RegressionRunResult&gt;</code> | run Spec And Record 的公开运行时操作。 |

## `RegressionCase` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actualEvents` | 属性 | <code>actualEvents: FrameworkEvent&lt;unknown&gt;[]</code> | actual Events 字段。 |
| `fixture` | 属性 | <code>fixture: ReplayFixture</code> | fixture 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `outputContract` | 属性 | <code>outputContract: OutputContractSpec</code> | output Contract 字段。 |
| `requiredChecks` | 属性 | <code>requiredChecks: RegressionCheck[]</code> | required Checks 字段。 |

## `RegressionCaseResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checks` | 属性 | <code>checks: EvaluationCheckResult[]</code> | checks 字段。 |
| `fixtureId` | 属性 | <code>fixtureId: string</code> | fixture Id 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `outputContractResult` | 属性 | <code>outputContractResult: EvaluationResult</code> | output Contract Result 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `status` | 属性 | <code>status: EvaluationStatus</code> | status 字段。 |
| `traceDiff` | 属性 | <code>traceDiff: TraceDiff</code> | trace Diff 字段。 |

## `RegressionRunnerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `eventRunId` | 属性 | <code>eventRunId: string</code> | event Run Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `outputValidator` | 属性 | <code>outputValidator: OutputContractValidator</code> | output Validator 字段。 |
| `replayEngine` | 属性 | <code>replayEngine: ReplayEngine</code> | replay Engine 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `trace` | 属性 | <code>trace: TraceRecorder</code> | trace 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `RegressionRunResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cases` | 属性 | <code>cases: RegressionCaseResult[]</code> | cases 字段。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `specId` | 属性 | <code>specId: string</code> | spec Id 字段。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | started At 字段。 |
| `status` | 属性 | <code>status: EvaluationStatus</code> | status 字段。 |
| `summary` | 属性 | <code>summary: { total: number; passed: number; failed: number; }</code> | summary 字段。 |

## `RegressionSpecRunInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actualEventsByFixtureId` | 属性 | <code>actualEventsByFixtureId: Map&lt;string, FrameworkEvent&lt;unknown&gt;[]&gt;</code> | actual Events By Fixture Id 字段。 |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `fixtures` | 属性 | <code>fixtures: ReplayFixture[] &#124; Map&lt;string, ReplayFixture&gt;</code> | fixtures 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `outputContractsByFixtureId` | 属性 | <code>outputContractsByFixtureId: Map&lt;string, OutputContractSpec&gt;</code> | output Contracts By Fixture Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `spec` | 属性 | <code>spec: RegressionSpec</code> | spec 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |
