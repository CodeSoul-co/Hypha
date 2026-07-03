# Runtime Model

hypha uses an event-first runtime model. Sessions and runs are useful views, but events are the source of truth for trace, replay, audit, regression, and state projection.

## Core Runtime Objects

| Object | Role | Source of Truth |
| --- | --- | --- |
| `DomainPack` | Declares task schemas, workflows, tools, MCP profiles, memory profiles, skill policy, policy, evaluation, regression, output contracts, and deployment metadata. | Versioned spec. |
| `Session` | Runtime user or product context container. It can reference a DomainPack and SessionProfile. | Projected from events plus runtime metadata. |
| `Run` | One concrete execution under a Session. | Projected from run events. |
| `Event` | Smallest factual runtime record. | Append-only event log. |

Session is not part of DomainPack. DomainPack may declare `sessionProfiles`, but a Session is created at runtime and only references those definitions.

## Event Flow

A normal run records:

```text
session.created
run.created
run.started
fsm.state.entered
context.build.completed
agent.reasoning.started
model.call.started
model.call.completed
inference.completed
agent.action.selected
tool.call.requested
tool.policy.checked
tool.call.completed
memory.write.committed
fsm.state.entered
run.completed
```

The exact event sequence depends on the route, workflow, tools, memory writes, policy decisions, and terminal status. Runtime projections must derive from event content instead of mutable session state.

## FSM and Guards

`WorkflowSpec` compiles to `FSMProcessSpec`. FSM states define process meaning; transitions define allowed movement. Guards are deterministic expressions evaluated against `input`, `variables`, and `metadata`.

Supported guard forms include:

```text
true
false
default
else:<guard>
variables.score >= 3
metadata.mode == "local"
exists(input.message)
matches(variables.topic, "^agent")
!variables.blocked
variables.ready == true && input.override == false
```

Transitions may be rejected by missing transitions, guard failure, policy denial, or human-review requirements.

## ReAct Execution

`ReActRunner` executes explicit phases:

```text
observe -> reason -> select_action -> policy_check -> act
  -> observe_result -> verify -> memory_sync -> complete
```

Tool actions must use a `ToolRunner`. Model calls must use an `InferenceProvider`. Memory synchronization must keep scope, provenance, policy, and trace behavior explicit.

## Side Effects

Side effects are governed capabilities. Tool calls, MCP calls, memory writes, file writes, and external writes must pass through policy and event recording.

Tool side-effect levels are:

```text
none
read
write
external_effect
irreversible
```

`external_effect` and `irreversible` should require explicit policy or human review.

## Concurrency

The default deployment mode is single-user, but runtime data remains user-scoped. Chat requests are serialized by `userId + sessionId`, so one user's session cannot race itself while different users or different sessions can run independently.

Temporary memory keys and runtime session IDs include `userId` boundaries. This keeps local use simple without removing the multi-user safety model.
