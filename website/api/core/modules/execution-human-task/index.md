# `@codesoul-co/hypha-core` / `modules/execution-human-task/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/execution-human-task/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-human-task/index.ts)
- Exports: **11**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionHumanTaskSubjectDefinition` | constant | <code>const executionHumanTaskSubjectDefinition: SpecSchemaDefinition&lt;ExecutionHumanTaskSubject&gt;</code> | execution Human Task Subject Definition constant exported by the `modules/execution-human-task/index` module. |
| `executionHumanTaskSubjectDefinitions` | constant | <code>const executionHumanTaskSubjectDefinitions: readonly [SpecSchemaDefinition&lt;ExecutionHumanTaskSubject&gt;]</code> | execution Human Task Subject Definitions constant exported by the `modules/execution-human-task/index` module. |
| `executionHumanTaskSubjectEnvelopeSchema` | constant | <code>const executionHumanTaskSubjectEnvelopeSchema: z.ZodEffects&lt;z.ZodObject&lt;{ subjectRef: z.ZodString; subjectHash: z.ZodString; subject: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodLiteral&lt;"1.0.0"&gt;; kind: z.ZodLiteral&lt;"execution"&gt;; capturedAt: z.ZodString; principalId: z.ZodString; inputHash: z.ZodString; activity: z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; runId: z.ZodString; stateAttemptId: z...</code> | Runtime schema for execution Human Task Subject Envelope. |
| `executionHumanTaskSubjectExample` | constant | <code>const executionHumanTaskSubjectExample: ExecutionHumanTaskSubject</code> | Valid example value for execution Human Task Subject. |
| `executionHumanTaskSubjectJsonSchema` | constant | <code>const executionHumanTaskSubjectJsonSchema: JsonSchema</code> | JSON Schema for execution Human Task Subject. |
| `executionHumanTaskSubjectJsonSchemas` | constant | <code>const executionHumanTaskSubjectJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | execution Human Task Subject Json Schemas constant exported by the `modules/execution-human-task/index` module. |
| `executionHumanTaskSubjectSchema` | constant | <code>const executionHumanTaskSubjectSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodLiteral&lt;"1.0.0"&gt;; kind: z.ZodLiteral&lt;"execution"&gt;; capturedAt: z.ZodString; principalId: z.ZodString; inputHash: z.ZodString; activity: z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; runId: z.ZodString; stateAttemptId: z.ZodString; workspaceId: z.ZodString; fencingToken: z.ZodNumber; deadlineAt: z.ZodOptional&lt;z.Zo...</code> | Runtime schema for execution Human Task Subject. |
| `createExecutionHumanTaskSubject` | function | <code>createExecutionHumanTaskSubject(input: CreateExecutionHumanTaskSubjectInput): ExecutionHumanTaskSubjectEnvelope</code> | Creates Execution Human Task Subject at this module boundary. |
| `validateExecutionHumanTaskSubject` | function | <code>validateExecutionHumanTaskSubject(input: unknown): ExecutionHumanTaskSubject</code> | Validates Execution Human Task Subject at this module boundary. |
| `validateExecutionHumanTaskSubjectEnvelope` | function | <code>validateExecutionHumanTaskSubjectEnvelope(input: unknown): ExecutionHumanTaskSubjectEnvelope</code> | Validates Execution Human Task Subject Envelope at this module boundary. |
| `CreateExecutionHumanTaskSubjectInput` | interface | <code>interface CreateExecutionHumanTaskSubjectInput</code> | Field contract for Create Execution Human Task Subject Input; see all contract members below. |

## `CreateExecutionHumanTaskSubjectInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activity` | property | <code>activity: ExecutionActivityRequest</code> | Public activity property. |
| `binding` | property | <code>binding: ExecutionToolBinding</code> | Public binding property. |
| `capturedAt` | property | <code>capturedAt: string</code> | Public captured At property. |
| `environment` | property | <code>environment: ExecutionEnvironmentSpec</code> | Public environment property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `policyDecisionRef` | property | <code>policyDecisionRef: string</code> | Public policy Decision Ref property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `riskAssessment` | property | <code>riskAssessment: ExecutionRiskAssessment</code> | Public risk Assessment property. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public tool Revision property. |
