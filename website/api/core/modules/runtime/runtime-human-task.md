# `@codesoul-co/hypha-core` / `modules/runtime/runtime-human-task`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/runtime-human-task.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-task.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assertRuntimeHumanTaskDecision` | function | <code>assertRuntimeHumanTaskDecision&lt;TTask extends RuntimeHumanTask&gt;(task: TTask &#124; undefined, command: Pick&lt;RuntimeHumanTaskDecisionCommand, "expectedRevision" &#124; "expectedSubjectHash" &#124; "principal" &#124; "decidedAt" &#124; "decision"&gt;): TTask</code> | Asserts Runtime Human Task Decision at this module boundary. |
| `assertRuntimeHumanTaskResume` | function | <code>assertRuntimeHumanTaskResume&lt;TTask extends RuntimeHumanTask&gt;(task: TTask &#124; undefined, expected: { taskId: string; kind: RuntimeHumanTaskKind; subjectRef: string; subjectHash: string; revision: number; requestedBy: string; resumedAt: string; checkpointRef?: string; policyRef?: string; providerRevision?: string; activityDescriptorRef?: string; activityDescriptorHash?: string; }): TTask</code> | Asserts Runtime Human Task Resume at this module boundary. |
| `projectRuntimeHumanTasks` | function | <code>projectRuntimeHumanTasks(events: readonly FrameworkEvent[]): RuntimeHumanTask[]</code> | Projects Runtime Human Tasks at this module boundary. |
| `runtimeHumanTaskKind` | function | <code>runtimeHumanTaskKind(value: string): RuntimeHumanTaskKind &#124; undefined</code> | Public runtime operation for runtime Human Task Kind. |
| `runtimeHumanTaskResolutionEventId` | function | <code>runtimeHumanTaskResolutionEventId(input: { runId: string; taskId: string; expectedRevision: number; }): string</code> | Public runtime operation for runtime Human Task Resolution Event Id. |
