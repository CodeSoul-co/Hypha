# Control an FSM

Yes—you can define and adjust the nodes, edges, guards, retry policy and timeouts of an **application-owned** FSM. Hypha intentionally protects the separate ReAct Harness FSM.

## Define the topology

```ts
import {
  analyzeFSMTopology,
  applyTransition,
  createInitialSnapshot,
  parseFSMProcessSpec,
} from '@codesoul-co/hypha-fsm';

const process = parseFSMProcessSpec({
  id: 'workflow.publication',
  version: '1.0.0',
  name: 'Publication workflow',
  initialState: 'Draft',
  terminalStates: ['Published', 'Rejected'],
  states: [
    { id: 'Draft', kind: 'domain' },
    { id: 'TechnicalReview', kind: 'domain', retryPolicy: { maxAttempts: 2 } },
    { id: 'Published', kind: 'completed' },
    { id: 'Rejected', kind: 'failed' },
  ],
  transitions: [
    { from: 'Draft', to: 'TechnicalReview' },
    { from: 'TechnicalReview', to: 'Published', guard: 'review.approved' },
    { from: 'TechnicalReview', to: 'Rejected', guard: 'review.rejected' },
  ],
});

const analysis = analyzeFSMTopology(process);
if (analysis.unreachableStates.length > 0) {
  throw new Error(`Unreachable: ${analysis.unreachableStates.join(', ')}`);
}

let snapshot = createInitialSnapshot(process, 'run-publication-1');
snapshot = applyTransition(process, snapshot, 'TechnicalReview');
```

## Generate it from a Domain Pack

The release example maps the selected `WorkflowSpec` into a separate process:

```ts
function buildApplicationWorkflowFSM(workflow: WorkflowSpec) {
  return parseFSMProcessSpec({
    id: workflow.id,
    version: workflow.version,
    name: workflow.name,
    initialState: workflow.initialState,
    terminalStates: workflow.terminalStates,
    states: workflow.states.map((state) => ({
      id: state.id,
      kind: workflow.terminalStates.includes(state.id) ? 'completed' : 'domain',
      retryPolicy: state.retryPolicy,
      timeoutPolicy: state.timeoutPolicy,
      policyRefs: state.policyRefs,
    })),
    transitions: workflow.transitions.map(({ from, to, guard, description }) => ({
      from, to, guard, description,
    })),
  });
}
```

## What you may adjust

| Area | Application FSM | Harness ReAct FSM |
| --- | --- | --- |
| Node names and product states | Yes | No |
| Allowed edges | Yes | No |
| Guards and policy references | Yes | Bind policy; do not bypass lifecycle |
| Retry/timeout declarations | Yes | Configure through supported Harness specs |
| Terminal outcomes | Yes | Keep framework terminal semantics |
| Direct mutation of current state | No | No |

## Runtime concurrency

For an actual Server Run, do not apply transitions independently in several clients. Read the current revision, then submit the target transition with owner/revision evidence. The runtime uses revision/fencing semantics to reject stale movement and records accepted movement as Events.

## Tests to keep

1. Parsing rejects invalid nodes/edges.
2. Topology has no unintended unreachable or dead-end state.
3. Guard denial does not advance revision/state.
4. Every accepted edge emits the expected evidence.
5. Replay produces the same final snapshot.

See the runnable [`run-fsm.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/examples/release-agent/src/run-fsm.ts) example.
