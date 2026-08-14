# 执行：FSM、Kernel 与 Harness

执行层分别回答三个问题：**允许哪些状态**、**Agent 如何推理**、**副作用如何成为持久证据**。

## [`hypha-fsm`](./fsm)

将拓扑定义为数据，先解析与分析，再应用已声明的迁移。

```ts
import {
  analyzeFSMTopology, applyTransition,
  createInitialSnapshot, parseFSMProcessSpec,
} from '@codesoul-co/hypha-fsm';

const review = parseFSMProcessSpec({
  id: 'workflow.review', version: '1.0.0', name: 'Review',
  initialState: 'Draft', terminalStates: ['Approved'],
  states: [
    { id: 'Draft', kind: 'domain' },
    { id: 'Review', kind: 'domain' },
    { id: 'Approved', kind: 'completed' },
  ],
  transitions: [
    { from: 'Draft', to: 'Review' },
    { from: 'Review', to: 'Approved', guard: 'review.accepted' },
  ],
});
const report = analyzeFSMTopology(review);
let state = createInitialSnapshot(review, 'run-1');
state = applyTransition(review, state, 'Review');
```

`analyzeFSMTopology` 能在执行前发现不可达节点与死路。并发运行时应通过 Runtime API 提交当前 revision/owner 证据，而不是让多个客户端直接改 Snapshot。

## [`hypha-kernel`](./kernel)

Kernel 提供 Provider-neutral 的 ReAct Agent 与推理契约。它拥有推理循环边界，但不拥有业务工作流。

```ts
import { reactAgentSpecDefinition } from '@codesoul-co/hypha-kernel';
const agent = reactAgentSpecDefinition.parse({
  ...reactAgentSpecDefinition.example,
  id: 'agent.research', modelAlias: 'reasoning.primary',
});
```

生产组合应把模型推理、Tool、Memory 与 Trace 绑定到 ReAct Runner，业务逻辑不能直接调用 Provider 或 Tool。

## [`hypha-harness`](./harness)

Harness 记录执行证据并投影产品视图。

```ts
import { InMemoryTraceRecorder, SessionProjector } from '@codesoul-co/hypha-harness';
import { createFrameworkEvent } from '@codesoul-co/hypha-core';

const traces = new InMemoryTraceRecorder();
await traces.record(createFrameworkEvent({
  id: 'event-1', type: 'run.created', userId: 'owner',
  sessionId: 'session-1', runId: 'run-1', payload: {},
}));
const sessions = new SessionProjector().project(await traces.list());
```

真实 Runtime 可使用 `EventFirstRuntime` 与 Harnessed Runner。Policy、Tool/MCP/Memory、副作用重试、Review 与终态迁移都应留下可追踪证据。

::: tip 两个 FSM，两类职责
`compileDomainPackToHarnessedSystem()` 产生 Framework 拥有的 ReAct Harness FSM。如果产品需要自定义节点和边，请把 Domain Pack Workflow 编译成**独立的** `FSMProcessSpec`。参见[控制 FSM](/zh/guide/fsm-control)。
:::
