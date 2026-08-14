# `@codesoul-co/hypha-fsm`

`hypha-fsm` validates finite-state-machine topology, creates immutable snapshots, applies declared transitions and reports structural problems before execution. It supports both the framework-owned ReAct Harness FSM and a separate application-owned workflow FSM.

```bash
npm install @codesoul-co/hypha-fsm@1.0.1
```

## Core model

| Type | Important fields |
| --- | --- |
| `FSMProcessSpec` | `initialState`, `states`, `transitions`, `terminalStates`, `recoveryPolicy` |
| `FSMStateSpec` | `id`, `kind`, entry/exit actions, timeout/retry/review policy |
| `FSMTransitionSpec` | `from`, `to`, optional `guard` and trace metadata |
| `FSMSnapshot` | current state, state path, terminal status and recovery metadata |
| `FSMTopologyAnalysis` | reachable, unreachable, dead-end and cyclic states |

## Define and inspect a topology

```ts
import {
  analyzeFSMTopology,
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
    { id: 'Review', kind: 'domain', retryPolicy: { maxAttempts: 2 } },
    { id: 'Published', kind: 'completed' },
    { id: 'Rejected', kind: 'failed' },
  ],
  transitions: [
    { from: 'Draft', to: 'Review' },
    { from: 'Review', to: 'Published', guard: 'review.approved' },
    { from: 'Review', to: 'Rejected', guard: 'review.rejected' },
  ],
});

const analysis = analyzeFSMTopology(process);
if (analysis.unreachableStates.length > 0) {
  throw new Error(`Unreachable states: ${analysis.unreachableStates.join(', ')}`);
}
```

## Move through states

```ts
import {
  applyTransition,
  createInitialSnapshot,
} from '@codesoul-co/hypha-fsm';

let snapshot = createInitialSnapshot(process, 'run-1');
snapshot = applyTransition(process, snapshot, 'Review');
snapshot = applyTransition(process, snapshot, 'Published', {
  guardEvaluator: (guard) => guard === 'review.approved',
});
```

`applyTransition` checks that the edge exists, the guard matches and the target is legal. It returns the next snapshot; do not let clients mutate `currentState` directly.

## Manual control in a concurrent runtime

For a running service, use `GovernedFSMTransitionService` from [`hypha-harness`](./harness). Submit the expected revision and owner/permission evidence so stale clients cannot overwrite newer state. The service should emit transition evidence before the new state is exposed.

## Harness FSM versus domain FSM

`HARNESS_FSM_STATE_IDS` and `createHarnessFSMProcessSpec()` describe the protected ReAct lifecycle. Domain Packs can bind policies and capabilities to those phases, but cannot add or reconnect Harness states. Compile product workflow states into a separate `FSMProcessSpec`; see [Control an FSM](/guide/fsm-control).

## Tests to keep

- Initial and terminal states exist.
- No unexpected unreachable or dead-end state exists.
- Every guarded edge accepts the intended guard and rejects others.
- Retry, timeout and human-review paths reach deterministic outcomes.
- Replaying transition Events rebuilds the same `statePath`.
