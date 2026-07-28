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

## Durable Orchestration Building Blocks

`@hypha/core` exposes provider-neutral runtime contracts together with in-memory reference
implementations. Durable adapters can implement the same interfaces without changing FSM or
DomainPack semantics.

| Boundary     | Public contract and reference behavior                                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Event log    | `DurableEventStore`, `DurableEventRuntime`, `EventSchemaRegistry`, optimistic expected revision, idempotency key, canonical hash, import/export checksum, and schema upcasting. |
| Projection   | `ProjectionEngine` and `RuntimeOrchestrationProjection` rebuild run, wait, transition, cancellation, and resume state from events.                                              |
| Session work | `SessionQueue` serializes scoped commands and uses claim token, attempt budget, lease expiry, retry, completion, and failure records.                                           |
| Messaging    | `MessageBus`, inbox, outbox, and dispatcher isolate delivery from handling and deduplicate by scope and idempotency evidence.                                                   |
| Coordination | `RunLeaseStore`, `StateExecutionClaimStore`, and `RuntimeResourceCoordinator` use fencing and guarded revisions to reject stale workers and conflicting resource claims.        |
| Determinism  | Runtime helper APIs provide recorded transition, wait, clock, id, event, resource, and activity observations instead of reading untracked process state.                        |
| Lifecycle    | Control, timer, cancellation, checkpoint, recovery, replay, and query services persist commands and observations before deriving the next action.                               |

`BoundedFSMDriver` in `@hypha/harness` advances an FSM only while a transition is supported by
current event-derived state and the configured step/time budgets. It returns an explicit completed,
waiting, yielded, cancelled, failed, or exhausted result; exhaustion is never converted into another
unbounded loop. `RuntimeExecutionContext` carries the scoped runtime ports used by the driver and
does not give core code direct access to a provider SDK or application store.

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

The same process contains explicit recovery routes. `FSMRecoveryPolicySpec` limits attempts per
state, total attempts, elapsed time, backoff, and circuit-breaker probes. `FSMAnomaly` records the
source, category, code, retry evidence, and side-effect commit state. `FSMSnapshot.recovery`
persists the attempt and circuit state, while `onRecoveryDecision` exposes the event-recording
boundary.

```text
normal state -> Recovering -> original state
normal state -> Compensating -> HumanReview | Quarantined | Failed
normal state -> Quarantined -> HumanReview | Failed | Cancelled
```

`runFSMRecoveryLoop()` performs bounded attempts for one operation. `runRecoverySupervisor()` adds
dependency-ordered cross-module coordination. It preserves completed participant outputs, compares
stable evidence hashes across attempts, and limits total cycles, unchanged-evidence cycles,
same-strategy repeats, and elapsed time. Unknown external commit state is reconciled before replay
when a receipt resolver exists; otherwise it is quarantined. Committed effects require an explicit
idempotent compensation handler.

Recovery is event-first. Cases emit `recovery.case.opened`, strategy and attempt events, explicit
progress evidence, and a resolved or escalated terminal event. Inference and Memory operations in
the server runtime use this supervisor, while Tool/MCP and Execution retain their own governed
records and contribute normalized failure evidence. See
[FSM Anomaly Recovery](../architecture/fsm-recovery.md).

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
message.retrying
message.acknowledged
message.failed
message.dead_lettered
```

Failed delivery may requeue with bounded exponential delay. When the delivery budget is exhausted,
or a message is explicitly poison/expired, it becomes a dead letter and no longer blocks the
recipient queue. The message bus does not replace FSM. FSM remains the process authority; message
delivery is an event-first input to a consumer that may then evaluate guards and perform
transitions.

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

Memory is persisted state; context is the bounded model-call view built for one run. Managed memory
operations carry a principal, explicit user scope, operation id, and profile ref. Structured records
are revisioned and remain the source of truth; vector indexes are rebuildable projections updated
through an atomic outbox. Idempotency, history, deletion, provider mappings, retrieval snapshots,
and cache validity all remain scope-qualified.

`DefaultMemoryContextBuilder` resolves registered sources, searches authorized records, applies hard
scope/policy filters, sensitivity rules, stable ordering, deduplication, per-source and total token
budgets, and deterministic compaction. Every included item carries `ContextProvenance`; injection
keeps memory data separated from model instructions. The compatibility kernel
`MemoryContextBuilder` and `createEpisodicMemorySync()` remain available for existing ReAct assembly.
See [Governed Memory](../architecture/memory.md).

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
