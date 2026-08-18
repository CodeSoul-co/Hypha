# `@codesoul-co/hypha-testing` / `regression`

- Package index: [`@codesoul-co/hypha-testing`](/api/testing)
- Package guide: [learning and composition guide](/packages/testing)
- Source: [`packages/testing/src/regression.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RegressionRunner` | class | <code>new RegressionRunner(options?: RegressionRunnerOptions): RegressionRunner</code> | Runtime implementation for Regression Runner; see its public constructor and members below. |
| `RegressionCase` | interface | <code>interface RegressionCase</code> | Field contract for Regression Case; see all contract members below. |
| `RegressionCaseResult` | interface | <code>interface RegressionCaseResult</code> | Field contract for Regression Case Result; see all contract members below. |
| `RegressionRunnerOptions` | interface | <code>interface RegressionRunnerOptions</code> | Field contract for Regression Runner Options; see all contract members below. |
| `RegressionRunResult` | interface | <code>interface RegressionRunResult</code> | Field contract for Regression Run Result; see all contract members below. |
| `RegressionSpecRunInput` | interface | <code>interface RegressionSpecRunInput</code> | Field contract for Regression Spec Run Input; see all contract members below. |
| `RegressionCheck` | type | <code>type RegressionCheck = 'event_types' &#124; 'state_path' &#124; 'tool_calls' &#124; 'policy_decisions' &#124; 'output_contract'</code> | Public type alias for Regression Check. |

## `RegressionRunner` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: RegressionRunnerOptions): RegressionRunner</code> | Creates an instance of this class. |
| `runCase` | method | <code>runCase(regressionCase: RegressionCase): RegressionCaseResult</code> | Public runtime operation for run Case. |
| `runSpec` | method | <code>runSpec(input: RegressionSpecRunInput): RegressionRunResult</code> | Public runtime operation for run Spec. |
| `runSpecAndRecord` | method | <code>runSpecAndRecord(input: RegressionSpecRunInput): Promise&lt;RegressionRunResult&gt;</code> | Public runtime operation for run Spec And Record. |

## `RegressionCase` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actualEvents` | property | <code>actualEvents: FrameworkEvent&lt;unknown&gt;[]</code> | Public actual Events property. |
| `fixture` | property | <code>fixture: ReplayFixture</code> | Public fixture property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `outputContract` | property | <code>outputContract: OutputContractSpec</code> | Public output Contract property. |
| `requiredChecks` | property | <code>requiredChecks: RegressionCheck[]</code> | Public required Checks property. |

## `RegressionCaseResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checks` | property | <code>checks: EvaluationCheckResult[]</code> | Public checks property. |
| `fixtureId` | property | <code>fixtureId: string</code> | Public fixture Id property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `outputContractResult` | property | <code>outputContractResult: EvaluationResult</code> | Public output Contract Result property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `status` | property | <code>status: EvaluationStatus</code> | Public status property. |
| `traceDiff` | property | <code>traceDiff: TraceDiff</code> | Public trace Diff property. |

## `RegressionRunnerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `eventRunId` | property | <code>eventRunId: string</code> | Public event Run Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `outputValidator` | property | <code>outputValidator: OutputContractValidator</code> | Public output Validator property. |
| `replayEngine` | property | <code>replayEngine: ReplayEngine</code> | Public replay Engine property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `trace` | property | <code>trace: TraceRecorder</code> | Public trace property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `RegressionRunResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cases` | property | <code>cases: RegressionCaseResult[]</code> | Public cases property. |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `specId` | property | <code>specId: string</code> | Public spec Id property. |
| `startedAt` | property | <code>startedAt: string</code> | Public started At property. |
| `status` | property | <code>status: EvaluationStatus</code> | Public status property. |
| `summary` | property | <code>summary: { total: number; passed: number; failed: number; }</code> | Public summary property. |

## `RegressionSpecRunInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actualEventsByFixtureId` | property | <code>actualEventsByFixtureId: Map&lt;string, FrameworkEvent&lt;unknown&gt;[]&gt;</code> | Public actual Events By Fixture Id property. |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `fixtures` | property | <code>fixtures: ReplayFixture[] &#124; Map&lt;string, ReplayFixture&gt;</code> | Public fixtures property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `outputContractsByFixtureId` | property | <code>outputContractsByFixtureId: Map&lt;string, OutputContractSpec&gt;</code> | Public output Contracts By Fixture Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `spec` | property | <code>spec: RegressionSpec</code> | Public spec property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |
