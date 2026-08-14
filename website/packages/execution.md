# Execution: FSM, Kernel & Harness

The execution layer separates **what states are allowed**, **how an Agent reasons**, and **how effects become durable evidence**.

## `hypha-fsm`

Define a topology as data, parse it, inspect it, then apply only declared transitions.

```ts
import {
  analyzeFSMTopology,
  applyTransition,
  createInitialSnapshot,
  parseFSMProcessSpec,
} from '@codesoul-co/hypha-fsm';

const review = parseFSMProcessSpec({
  id: 'workflow.review',
  version: '1.0.0',
  name: 'Review',
  initialState: 'Draft',
  terminalStates: ['Approved'],
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

`analyzeFSMTopology` surfaces unreachable and dead-end nodes before execution. For concurrent runtimes, submit the current revision/owner evidence through the runtime API rather than mutating snapshots from multiple clients.

## `hypha-kernel`

Kernel contains provider-neutral ReAct Agent and reasoning contracts. It owns the reasoning loop boundary; it does not own your business workflow.

```ts
import { reactAgentSpecDefinition } from '@codesoul-co/hypha-kernel';

const agent = reactAgentSpecDefinition.parse({
  ...reactAgentSpecDefinition.example,
  id: 'agent.research',
  modelAlias: 'reasoning.primary',
});
```

In a production composition, bind model inference, Tool execution, Memory and traces to the ReAct runner. Do not call providers or tools directly from domain logic.

## `hypha-harness`

Harness records execution evidence and projects product views.

```ts
import {
  InMemoryTraceRecorder,
  SessionProjector,
} from '@codesoul-co/hypha-harness';
import { createFrameworkEvent } from '@codesoul-co/hypha-core';

const traces = new InMemoryTraceRecorder();
await traces.record(createFrameworkEvent({
  id: 'event-1', type: 'run.created', userId: 'owner',
  sessionId: 'session-1', runId: 'run-1', payload: {},
}));

const sessions = new SessionProjector().project(await traces.list());
```

Use the richer `EventFirstRuntime` and Harnessed runner when composing a real runtime. Policy checks, Tool/MCP/Memory effects, retries, review and terminal movement should all create traceable evidence.

::: tip Two FSMs, two responsibilities
`compileDomainPackToHarnessedSystem()` produces a framework-owned ReAct Harness FSM. If your product needs its own nodes and edges, compile the Domain Pack workflow into a **separate** `FSMProcessSpec`. See [Control an FSM](/guide/fsm-control).
:::
