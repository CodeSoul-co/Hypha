# `@codesoul-co/hypha-core` / `modules/execution-human-task/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/execution-human-task/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)
- 导出数: **11**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionHumanTaskSubjectDefinition` | 常量 | <code>const executionHumanTaskSubjectDefinition: SpecSchemaDefinition&lt;ExecutionHumanTaskSubject&gt;</code> | 由 `modules/execution-human-task/index` 模块导出的 execution Human Task Subject Definition 常量。 |
| `executionHumanTaskSubjectDefinitions` | 常量 | <code>const executionHumanTaskSubjectDefinitions: readonly [SpecSchemaDefinition&lt;ExecutionHumanTaskSubject&gt;]</code> | 由 `modules/execution-human-task/index` 模块导出的 execution Human Task Subject Definitions 常量。 |
| `executionHumanTaskSubjectEnvelopeSchema` | 常量 | <code>const executionHumanTaskSubjectEnvelopeSchema: z.ZodEffects&lt;z.ZodObject&lt;{ subjectRef: z.ZodString; subjectHash: z.ZodString; subject: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodLiteral&lt;"1.0.0"&gt;; kind: z.ZodLiteral&lt;"execution"&gt;; capturedAt: z.ZodString; principalId: z.ZodString; inputHash: z.ZodString; activity: z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; runId: z.ZodString; stateAttemptId: z...</code> | execution Human Task Subject Envelope 的运行时 Schema。 |
| `executionHumanTaskSubjectExample` | 常量 | <code>const executionHumanTaskSubjectExample: ExecutionHumanTaskSubject</code> | execution Human Task Subject 的有效示例值。 |
| `executionHumanTaskSubjectJsonSchema` | 常量 | <code>const executionHumanTaskSubjectJsonSchema: JsonSchema</code> | execution Human Task Subject 的 JSON Schema。 |
| `executionHumanTaskSubjectJsonSchemas` | 常量 | <code>const executionHumanTaskSubjectJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/execution-human-task/index` 模块导出的 execution Human Task Subject Json Schemas 常量。 |
| `executionHumanTaskSubjectSchema` | 常量 | <code>const executionHumanTaskSubjectSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodLiteral&lt;"1.0.0"&gt;; kind: z.ZodLiteral&lt;"execution"&gt;; capturedAt: z.ZodString; principalId: z.ZodString; inputHash: z.ZodString; activity: z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; runId: z.ZodString; stateAttemptId: z.ZodString; workspaceId: z.ZodString; fencingToken: z.ZodNumber; deadlineAt: z.ZodOptional&lt;z.Zo...</code> | execution Human Task Subject 的运行时 Schema。 |
| `createExecutionHumanTaskSubject` | 函数 | <code>createExecutionHumanTaskSubject(input: CreateExecutionHumanTaskSubjectInput): ExecutionHumanTaskSubjectEnvelope</code> | 创建 Execution Human Task Subject。 |
| `validateExecutionHumanTaskSubject` | 函数 | <code>validateExecutionHumanTaskSubject(input: unknown): ExecutionHumanTaskSubject</code> | 校验 Execution Human Task Subject。 |
| `validateExecutionHumanTaskSubjectEnvelope` | 函数 | <code>validateExecutionHumanTaskSubjectEnvelope(input: unknown): ExecutionHumanTaskSubjectEnvelope</code> | 校验 Execution Human Task Subject Envelope。 |
| `CreateExecutionHumanTaskSubjectInput` | 接口 | <code>interface CreateExecutionHumanTaskSubjectInput</code> | Create Execution Human Task Subject Input 的字段契约；完整字段见下表。 |

## `CreateExecutionHumanTaskSubjectInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activity` | 属性 | <code>activity: ExecutionActivityRequest</code> | activity 字段。 |
| `binding` | 属性 | <code>binding: ExecutionToolBinding</code> | binding 字段。 |
| `capturedAt` | 属性 | <code>capturedAt: string</code> | captured At 字段。 |
| `environment` | 属性 | <code>environment: ExecutionEnvironmentSpec</code> | environment 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `policyDecisionRef` | 属性 | <code>policyDecisionRef: string</code> | policy Decision Ref 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `riskAssessment` | 属性 | <code>riskAssessment: ExecutionRiskAssessment</code> | risk Assessment 字段。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | tool Revision 字段。 |
