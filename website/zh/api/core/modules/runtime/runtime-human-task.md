# `@codesoul-co/hypha-core` / `modules/runtime/runtime-human-task`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/runtime-human-task.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-task.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assertRuntimeHumanTaskDecision` | 函数 | <code>assertRuntimeHumanTaskDecision&lt;TTask extends RuntimeHumanTask&gt;(task: TTask &#124; undefined, command: Pick&lt;RuntimeHumanTaskDecisionCommand, "expectedRevision" &#124; "expectedSubjectHash" &#124; "principal" &#124; "decidedAt" &#124; "decision"&gt;): TTask</code> | 断言 Runtime Human Task Decision。 |
| `assertRuntimeHumanTaskResume` | 函数 | <code>assertRuntimeHumanTaskResume&lt;TTask extends RuntimeHumanTask&gt;(task: TTask &#124; undefined, expected: { taskId: string; kind: RuntimeHumanTaskKind; subjectRef: string; subjectHash: string; revision: number; requestedBy: string; resumedAt: string; checkpointRef?: string; policyRef?: string; providerRevision?: string; activityDescriptorRef?: string; activityDescriptorHash?: string; }): TTask</code> | 断言 Runtime Human Task Resume。 |
| `projectRuntimeHumanTasks` | 函数 | <code>projectRuntimeHumanTasks(events: readonly FrameworkEvent[]): RuntimeHumanTask[]</code> | 投影 Runtime Human Tasks。 |
| `runtimeHumanTaskKind` | 函数 | <code>runtimeHumanTaskKind(value: string): RuntimeHumanTaskKind &#124; undefined</code> | runtime Human Task Kind 的公开运行时操作。 |
| `runtimeHumanTaskResolutionEventId` | 函数 | <code>runtimeHumanTaskResolutionEventId(input: { runId: string; taskId: string; expectedRevision: number; }): string</code> | runtime Human Task Resolution Event Id 的公开运行时操作。 |
