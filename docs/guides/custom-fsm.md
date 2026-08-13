# Custom FSM Topologies and Governed Manual Transitions

Hypha supports two deliberately separate FSM modes:

- ReAct Runs use the framework-owned Harness FSM so reasoning, policy, activities, observation,
  verification, memory, recovery, and terminal handling cannot be bypassed by product topology.
- Custom workflow Runs use an application-owned `FSMProcessSpec`, commonly compiled from a
  DomainPack `WorkflowSpec`. They may be advanced through the canonical bounded driver or the
  governed manual transition API.

## Define and inspect a topology

```ts
import { analyzeFSMTopology, parseFSMProcessSpec } from '@hypha/fsm';

const process = parseFSMProcessSpec({
  id: 'release.approval',
  version: '1.0.0',
  initialState: 'Draft',
  states: [
    { id: 'Draft', kind: 'domain' },
    { id: 'Review', kind: 'domain' },
    { id: 'Released', kind: 'completed' },
  ],
  transitions: [
    { from: 'Draft', to: 'Review' },
    { from: 'Review', to: 'Released', guard: 'variables.approved == true' },
  ],
  terminalStates: ['Released'],
});

const analysis = analyzeFSMTopology(process);
```

`analyzeFSMTopology()` reports reachable, unreachable, non-terminal dead-end, and cyclic states.
Analysis does not reject cycles or disconnected states because those choices belong to the product;
applications should turn the findings they prohibit into deployment or contract-test failures.

DomainPack users can define the same topology under `workflows` and call
`compileWorkflowToFSM()` or `compileDomainPackToHarnessedSystem()`.

## Start a custom FSM Run

Submit `fsm` without `react` through the durable Session Command endpoint. If `domainPack` contains
a workflow and `fsm` is omitted, the selected workflow is compiled automatically.

```http
POST /api/v1/runtime/sessions/release/commands/start-run
Idempotency-Key: start-release-42
Authorization: Bearer ...
Content-Type: application/json

{
  "workflowRef": { "id": "release.approval", "version": "1.0.0" },
  "fsm": {
    "id": "release.approval",
    "version": "1.0.0",
    "initialState": "Draft",
    "states": [
      { "id": "Draft", "kind": "domain" },
      { "id": "Review", "kind": "domain" },
      { "id": "Released", "kind": "completed" }
    ],
    "transitions": [
      { "from": "Draft", "to": "Review" },
      { "from": "Review", "to": "Released", "guard": "variables.approved == true" }
    ],
    "terminalStates": ["Released"]
  },
  "input": { "releaseCandidate": "1.0.0" }
}
```

Custom FSMs start at their declared `initialState`. They are not automatically moved to Harness
`RunInitialized`.

## Inspect and transition

First read the authoritative projection and optimistic revision:

```http
GET /api/v1/runtime/runs/{runId}/fsm
```

The response includes `processId`, `processVersion`, `runRevision`, `currentState`, `statePath`,
`stateAttempt`, terminal states, and currently allowed outgoing transitions.

Apply exactly one declared edge:

```http
POST /api/v1/runtime/runs/{runId}/fsm/transitions
Idempotency-Key: release-42-review
Authorization: Bearer ...
Content-Type: application/json

{
  "processId": "release.approval",
  "processVersion": "1.0.0",
  "expectedState": "Review",
  "expectedRunRevision": 4,
  "targetState": "Released",
  "reason": "Release owner approved the candidate.",
  "guardContext": { "variables": { "approved": true } }
}
```

The service verifies Run ownership, `runtime.fsm.transition` permission, process identity, expected
state and revision, declared edge, guard, Policy, terminal semantics, Run Lease, and fencing. It
atomically appends `fsm.transition.requested`, `fsm.state.exited`,
`fsm.transition.accepted`, `fsm.state.entered`, and an optional terminal `run.*` Event. Rejected
guards and policies append requested/rejected evidence without changing State.

Never edit an FSM snapshot, projection row, or Event stream directly. Replay and recovery derive
state from accepted transition and state-entry Events.

## Human review

HumanTask approval remains a separate workflow. It binds a decision to an exact task revision and
subject hash. Manual transition permission does not approve a pending HumanTask, and HumanTask
approval does not authorize an arbitrary target State.
