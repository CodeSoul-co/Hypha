# `@codesoul-co/hypha-memory` / `integration-schema`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/integration-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts)
- Exports: **21**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `domainMemoryDependencySnapshotSchema` | constant | <code>const domainMemoryDependencySnapshotSchema: ZodType&lt;DomainMemoryDependencySnapshot, ZodTypeDef, DomainMemoryDependencySnapshot&gt;</code> | Runtime schema for domain Memory Dependency Snapshot. |
| `memoryCacheInvalidationSchema` | constant | <code>const memoryCacheInvalidationSchema: ZodType&lt;MemoryCacheInvalidation, ZodTypeDef, MemoryCacheInvalidation&gt;</code> | Runtime schema for memory Cache Invalidation. |
| `memoryCacheValidityInputExample` | constant | <code>const memoryCacheValidityInputExample: MemoryCacheValidityInput</code> | Valid example value for memory Cache Validity Input. |
| `memoryCacheValidityInputSchema` | constant | <code>const memoryCacheValidityInputSchema: ZodType&lt;MemoryCacheValidityInput, ZodTypeDef, MemoryCacheValidityInput&gt;</code> | Runtime schema for memory Cache Validity Input. |
| `memoryEvaluationCaseExample` | constant | <code>const memoryEvaluationCaseExample: MemoryEvaluationCase</code> | Valid example value for memory Evaluation Case. |
| `memoryEvaluationCaseSchema` | constant | <code>const memoryEvaluationCaseSchema: ZodType&lt;MemoryEvaluationCase, ZodTypeDef, MemoryEvaluationCase&gt;</code> | Runtime schema for memory Evaluation Case. |
| `memoryEvaluationObservationSchema` | constant | <code>const memoryEvaluationObservationSchema: ZodType&lt;MemoryEvaluationObservation, ZodTypeDef, MemoryEvaluationObservation&gt;</code> | Runtime schema for memory Evaluation Observation. |
| `memoryReplayReferenceExample` | constant | <code>const memoryReplayReferenceExample: MemoryReplayReference</code> | Valid example value for memory Replay Reference. |
| `memoryReplayReferenceSchema` | constant | <code>const memoryReplayReferenceSchema: ZodType&lt;MemoryReplayReference, ZodTypeDef, MemoryReplayReference&gt;</code> | Runtime schema for memory Replay Reference. |
| `sessionMemoryBindingExample` | constant | <code>const sessionMemoryBindingExample: SessionMemoryBinding</code> | Valid example value for session Memory Binding. |
| `sessionMemoryBindingSchema` | constant | <code>const sessionMemoryBindingSchema: ZodType&lt;SessionMemoryBinding, ZodTypeDef, SessionMemoryBinding&gt;</code> | Runtime schema for session Memory Binding. |
| `workflowStateMemoryBindingExample` | constant | <code>const workflowStateMemoryBindingExample: WorkflowStateMemoryBinding</code> | Valid example value for workflow State Memory Binding. |
| `workflowStateMemoryBindingSchema` | constant | <code>const workflowStateMemoryBindingSchema: ZodType&lt;WorkflowStateMemoryBinding, ZodTypeDef, WorkflowStateMemoryBinding&gt;</code> | Runtime schema for workflow State Memory Binding. |
| `validateDomainMemoryDependencySnapshot` | function | <code>validateDomainMemoryDependencySnapshot(input: unknown): DomainMemoryDependencySnapshot</code> | Validates Domain Memory Dependency Snapshot at this module boundary. |
| `validateMemoryCacheInvalidation` | function | <code>validateMemoryCacheInvalidation(input: unknown): MemoryCacheInvalidation</code> | Validates Memory Cache Invalidation at this module boundary. |
| `validateMemoryCacheValidityInput` | function | <code>validateMemoryCacheValidityInput(input: unknown): MemoryCacheValidityInput</code> | Validates Memory Cache Validity Input at this module boundary. |
| `validateMemoryEvaluationCase` | function | <code>validateMemoryEvaluationCase(input: unknown): MemoryEvaluationCase</code> | Validates Memory Evaluation Case at this module boundary. |
| `validateMemoryEvaluationObservation` | function | <code>validateMemoryEvaluationObservation(input: unknown): MemoryEvaluationObservation</code> | Validates Memory Evaluation Observation at this module boundary. |
| `validateMemoryReplayReference` | function | <code>validateMemoryReplayReference(input: unknown): MemoryReplayReference</code> | Validates Memory Replay Reference at this module boundary. |
| `validateSessionMemoryBinding` | function | <code>validateSessionMemoryBinding(input: unknown): SessionMemoryBinding</code> | Validates Session Memory Binding at this module boundary. |
| `validateWorkflowStateMemoryBinding` | function | <code>validateWorkflowStateMemoryBinding(input: unknown): WorkflowStateMemoryBinding</code> | Validates Workflow State Memory Binding at this module boundary. |
