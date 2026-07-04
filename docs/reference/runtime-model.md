# Runtime Model

hypha uses an event-first runtime model. Sessions and runs are useful views, but events are the source of truth for trace, replay, audit, regression, and state projection.

## Core Runtime Objects

| Object       | Role                                                                                                                                                             | Source of Truth                              |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `DomainPack` | Declares task schemas, workflows, tools, MCP profiles, memory profiles, skill policy, policy, evaluation, regression, output contracts, and deployment metadata. | Versioned spec.                              |
| `Session`    | Runtime user or product context container. It can reference a DomainPack and SessionProfile.                                                                     | Projected from events plus runtime metadata. |
| `Run`        | One concrete execution under a Session.                                                                                                                          | Projected from run events.                   |
| `Event`      | Smallest factual runtime record.                                                                                                                                 | Append-only event log.                       |

Session is not part of DomainPack. DomainPack may declare `sessionProfiles`, but a Session is created at runtime and only references those definitions.

## Event Flow

A normal run records:

```text
session.created
run.created
run.started
fsm.state.entered
fsm.transition.accepted
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

`RunManager` is the canonical package-level writer for run lifecycle events. It records run start/completion/failure, human-review waits, FSM transition acceptance, FSM state entry, context build events, and ReAct step completion. Application surfaces should call runtime APIs instead of constructing ad hoc run state.

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

`FSMRuntime` keeps the current `FSMSnapshot` for one run and exposes callbacks for accepted transitions and entered states. The default ReAct process path is:

```text
Idle -> RunInitialized -> ContextBuilt -> Reasoning -> ActionSelected
  -> PolicyChecked -> Acting -> ObservationRecorded -> Verifying -> Completed
```

## ReAct Execution

`ReActRunner` executes explicit phases:

```text
observe -> reason -> select_action -> policy_check -> act
  -> observe_result -> verify -> memory_sync -> complete
```

Tool actions must use a `ToolRunner`. Model calls must use an `InferenceProvider`. Memory synchronization must keep scope, provenance, policy, and trace behavior explicit.

`ReActAgentRunner` provides the default package-level wiring for `ContextBuilder`, `ReActAgentRuntime`, `Verifier`, inference, and tools. `HarnessedReActFSMRunner` composes that ReAct execution with `FSMRuntime` and `RunManager` so every FSM state is traceable and replayable from events.

## Context and Memory

Memory is persisted state; context is the bounded model-call view built for one run. `MemoryContextBuilder` resolves the active `MemoryScope`, searches the configured semantic, episodic, procedural, or other memory types, applies `ContextBudget`, and injects selected records into the model request as tagged system context. Each included memory item carries `ContextProvenance` with record id, type, score, original provenance, and inclusion time.

Memory writes should use `MemoryManager.write()` with explicit `MemoryWritePolicy`. Long-term records require provenance and an explicit long-term allowance. `createEpisodicMemorySync()` can be attached to `ReActRunner` so verified observations become episodic memory through the same policy and trace path.

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

Tool governance is enforced by `GovernedToolRunner`. The runner validates `inputSchema` before handler execution, validates `outputSchema` before recording completion, evaluates policy with side-effect and source metadata, and emits terminal results as `completed`, `failed`, `denied`, or `human_review_required`.

Every tool trace event includes `source` (`local`, `mcp`, `http`, or `plugin`) and the declared `sideEffectLevel`. MCP tools are discovered through an `MCPGateway`, normalized into `ToolSpec`, registered in `ToolRegistry`, and executed through the same runner as local tools. Discovery emits `mcp.capability.discovered`; tool normalization emits `mcp.tool.normalized`; actual MCP calls emit `mcp.call.started`, `mcp.call.completed`, or `mcp.call.failed`.

## Concurrency

The default deployment mode is single-user, but runtime data remains user-scoped. Chat requests are serialized by `userId + sessionId`, so one user's session cannot race itself while different users or different sessions can run independently.

Temporary memory keys and runtime session IDs include `userId` boundaries. This keeps local use simple without removing the multi-user safety model.
