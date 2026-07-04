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

A run can record events such as:

```text
session.created
run.created
run.started
fsm.state.entered
fsm.transition.accepted
context.build.completed
context.compacted
skill.selected
skill.loaded
skill.completed
agent.reasoning.started
model.call.started
model.call.completed
inference.completed
agent.action.selected
tool.call.requested
tool.policy.checked
tool.call.completed
memory.write.committed
human.review.requested
human.review.approved
human.review.rejected
message.enqueued
message.delivered
fsm.state.entered
run.completed
```

The exact event sequence depends on the route, workflow, tools, memory writes, policy decisions, and terminal status. Runtime projections must derive from event content instead of mutable session state.

`RunManager` is the canonical package-level writer for run lifecycle events. It records run start/completion/failure, human-review waits, FSM transition acceptance, FSM state entry, context build events, and ReAct step completion. Application surfaces should call runtime APIs instead of constructing ad hoc run state.

## Evaluation, Replay, and Regression

Replay and evaluation are deterministic views over events. They must not call
models, tools, memory writers, or MCP servers while validating a completed run.

`ReplayEngine.capture()` stores a `ReplayFixture` from an event list or
`EventStore`. The fixture records the source events, event type sequence, FSM
state path, final output, model call signatures, tool call signatures, policy
decision signatures, and memory read set. `ReplaySpec` controls whether model
I/O, tool I/O, memory read sets, and policy decisions are captured. Capture
rejects empty event sets or events from a different `runId`; evaluation,
replay, and regression lifecycle events are excluded from source replay
fixtures.

`ReplayEngine.replay()` reconstructs a replay projection from fixture events.
`ReplayEngine.compare()` compares a fixture against new events and returns a
trace diff for event types, state path, model calls, tool calls, policy
decisions, memory reads, and final output.

`OutputContractValidator` checks a terminal output against
`OutputContractSpec.schema`. `TraceCompletenessEvaluator` checks event envelopes,
required trace event types, terminal run status, and lifecycle pairs such as
`model.call.started -> model.call.completed|model.call.failed` and
`memory.write.requested -> memory.write.committed|memory.write.rejected`.
`DeterministicEvaluator.evaluateAndRecord()` emits `eval.started`,
`eval.completed`, or `eval.failed` through a `TraceRecorder`.

`RegressionRunner` executes `RegressionSpec.requiredChecks` against replay
fixtures. Domain Packs can reference fixtures with `RegressionSpec.fixtureRefs`;
runtime code still derives all check inputs from events and contracts.
`RegressionRunner.runSpecAndRecord()` emits `regression.started`,
`regression.completed`, or `regression.failed`.

Local event stores can export and import trace streams as newline-delimited JSON
through `SQLiteEventStore.exportJsonl(filePath, filter?)` and
`SQLiteEventStore.importJsonl(filePath)`. JSONL exports are intended for replay
fixtures, audits, regression snapshots, and moving local traces between
environments without exposing app-specific session state.

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
  -> PolicyChecked -> Acting -> ObservationRecorded -> Verifying
  -> MemorySync -> Completed
```

## Message Bus

`@hypha/harness` exposes `MessageBus` and `InMemoryMessageBus` as the transport
contract for future multi-workflow and multi-agent execution. The current
single-agent runtime can ignore it, but clients that need asynchronous handoff
can publish `RuntimeMessage` records scoped by `userId`, `sessionId`, and
`runId`.

Messages can carry `fsmState`, `stepId`, `agentId`, `correlationId`, and
`causationId`. Consumers may pull by recipient and FSM state, then acknowledge
or fail the message. The bus records delivery facts as events:

```text
message.enqueued
message.delivered
message.acknowledged
message.failed
message.dead_lettered
```

The message bus does not replace FSM. FSM remains the process authority;
message delivery is an event-first input to a consumer that may then evaluate
guards and perform transitions.

## ReAct Execution

`ReActRunner` executes explicit phases:

```text
observe -> reason -> select_action -> policy_check -> act
  -> observe_result -> verify -> memory_sync -> complete
```

Tool actions must use a `ToolRunner`. Model calls must use an `InferenceProvider`. Memory synchronization must keep scope, provenance, policy, and trace behavior explicit.

`ReActAgentRunner` provides the default package-level wiring for `ContextBuilder`, `ReActAgentRuntime`, `Verifier`, inference, and tools. `HarnessedReActFSMRunner` composes that ReAct execution with `FSMRuntime` and `RunManager` so every FSM state is traceable and replayable from events.

## Skill Activation

Skills are reusable procedural capability packages bound to an agent with `agent.skillRefs`. They are not workflows and they do not bypass tool governance.

The package-level activation path is:

```text
ContextBuilder
  -> SkillSelector
  -> SkillPolicy
  -> SkillContextLoader
  -> BuiltAgentContext.activeSkills
  -> model request context
```

`SkillContextBuilder` only injects skills that are bound to the agent and allowed by the current scope. Workflow state restrictions can be supplied as `metadata.workflowState.allowedSkills` or as runner options. Mandatory state skills can be supplied as `metadata.workflowState.requiredSkills`; they still pass policy checks but bypass keyword/manual activation checks. If a mandatory skill cannot load, context building fails before inference. Skill instructions and `on_activation` references are loaded after activation, while scripts and assets remain metadata unless a governed tool later uses them.

Harnessed runs emit:

```text
skill.selected
skill.loaded
skill.completed
```

Replay projections expose `skillEventIds` and `skillEvents`; audit and regression projections expose `skillActivationCount`.

## Thinking and Agentic Reasoning

Reasoning is explicit and structured. `ReasoningContextBuilder` runs after normal context construction and before ReAct execution. It attaches `ThinkingPlan` and `AgenticReasoningDecision` to `BuiltAgentContext`, and `BasicReActAgentRuntime` forwards those summaries inside the model request context.

Harnessed runs emit:

```text
thinking.started
thinking.completed
agent.deliberation.started
agent.deliberation.completed
reasoning.decision.recorded
```

These events contain summaries and decisions, not raw hidden chain-of-thought. Replay and audit projections expose reasoning event ids and reasoning decision counts. Domain Packs may declare `ReasoningSpec` profiles and reference them from session profiles or workflow states.

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
