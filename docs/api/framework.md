# Framework API

The framework API is exposed through the TypeScript packages under `packages/*`. Application surfaces such as the HTTP server and CLI call these contracts instead of defining runtime behavior directly.

## Documentation Map

- [Architecture Reference](../reference/architecture.md) explains package responsibilities, harness semantics, and extension boundaries.
- [Runtime Model](../reference/runtime-model.md) explains event-first execution, FSM transitions, ReAct phases, side effects, and concurrency.
- [Execution Contracts](../architecture/execution.md) explains provider-neutral Workspace, Sandbox, Command, Store, Event, and cache boundaries.
- [Domain Packs](../guides/domain-packs.md) provides a field-level guide and minimal declaration example.
- [Local Development](../guides/local-development.md) lists setup, storage, and verification commands.

## Package Boundary Summary

| Package                 | Public Surface                                                                                                                                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@hypha/core`           | Spec primitives, schemas, events, errors, policy interfaces, and governed execution contracts.                                                                                                        |
| `@hypha/storage`        | Storage profiles/topology, connection resolution, provider-neutral `classifyStorageFailure()` and `adviseStorageRecovery()`.                                                                          |
| `@hypha/domain`         | `DomainPackSpec`, `WorkflowSpec`, `SessionProfileSpec`, loader, overlay, registry, and DomainPack compiler APIs.                                                                                      |
| `@hypha/fsm`            | `FSMProcessSpec`, `FSMSnapshot`, `FSMRuntime`, guarded transitions, validated resume, anomaly classification, recovery policy and circuit helpers.                                                    |
| `@hypha/kernel`         | `ReActAgentSpec`, `ReActRunner`, `ReActAgentRunner`, context builder and verifier interfaces.                                                                                                         |
| `@hypha/inference`      | Prompt compiler, prefix segmenter, Plasmod hot layer, backend registry, cache providers, reasoning orchestration.                                                                                     |
| `@hypha/models`         | `ModelProvider`, normalized model requests/responses, OpenAI-compatible adapters.                                                                                                                     |
| `@hypha/serving-cache`  | Exact LLM response cache middleware, cache keys, policies, stores, prompt prefix metadata, and trace events.                                                                                          |
| `@hypha/workcache`      | Runtime type registry, event-derived cache blocks, typed cache forest, WorkCache manager, memory/SQLite stores.                                                                                       |
| `@hypha/tools`          | `ToolSpec`, `ToolRegistry`, `GovernedToolRunner`, `MockToolRunner`, safe schema validation, common JSON/text/hash tools, side-effect governance.                                                      |
| `@hypha/mcp`            | `MCPIntegrationSpec`, `MockMCPGateway`, capability discovery, and MCP tool registration into governed tool runners.                                                                                   |
| `@hypha/memory`         | Versioned Memory profiles, managed operations, scoped records/history, atomic persistence and index outbox, deterministic retrieval/context, external adapters, recovery, replay, and cache bindings. |
| `@hypha/skills`         | `SkillSpec`, local skill loading, selection, context loading, activation policy, and skill policy.                                                                                                    |
| `@hypha/harness`        | Event-first runtime views, ReAct/FSM runner, cross-module recovery supervisor, bounded message bus, replay/audit/regression projections.                                                              |
| `@hypha/adapters-local` | SQLite/JSON/file/vector local adapters.                                                                                                                                                               |
| `@hypha/testing`        | Deterministic evaluators, output contract validation, replay fixtures, trace diffs, and regression runners.                                                                                           |

Harness is a system-level architecture concept, not a reason to collapse every runtime primitive into one package. Keep FSM semantics independent, keep app surfaces outside packages, and use harness APIs for event-derived runtime views and governance evidence.

## Spec Schemas

Framework specs expose a common validation surface: `*SpecSchema` for Zod validation, `*SpecJsonSchema` for external tooling, `*SpecDefinition` for bundled schema/example metadata, `*SpecExample` for fixtures, and `validate*Spec(input)` for typed parsing.

Schema exports are available for `HarnessedAgentSystemSpec`, `PolicySpec`, `OutputContractSpec`, `ContextSpec`, `TraceSpec`, `EvaluationSpec`, `ReplaySpec`, `RegressionSpec`, `DeploymentSpec`, `StorageProviderProfile`, `StorageTopologySpec`, `ReActAgentSpec`, `ModelProviderSpec`, `ModelAliasSpec`, `ModelRoutingSpec`, `ToolSpec`, `MemorySpec`, `FSMProcessSpec`, `SkillSpec`, `MCPIntegrationSpec`, `WorkflowSpec`, `DomainPackSpec`, `WorkspaceSpec`, and `ExecutionEnvironmentSpec`. Core also exports validators and JSON Schemas for Workspace operations and snapshots, Sandbox lifecycle/provider capabilities, Command execution, Execution Activity, Tool binding and risk evidence, authorization dispatch, output collection, Execution Store/lease/recovery, lifecycle Events, and cache fingerprints.

`createPolicySpecEngine(policy)` creates a basic `PolicyEngine` from `PolicySpec`. Rules are evaluated in order and can match `sideEffectLevels`, `scopes`, and simple expressions `true` or `default`. Effects map to allow, deny, or human-review-required decisions; unmatched rules use `defaultEffect`.

## Storage Profiles

`StorageProviderProfile` describes a concrete store without leaking client SDK details into core specs.

| Field          | Type     | Description                                                                                                                                                       |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`         | string   | `relational`, `document`, `messaging`, `cache`, `vector`, `object`, `event`, or `hybrid`.                                                                         |
| `engine`       | string   | Store engine such as `sqlite`, `mongodb`, `redis`, `kafka`, `local-vector`, `pgvector`, `qdrant`, `milvus`, `chroma`, `file-artifact`, or `s3`.                   |
| `deployment`   | string   | `local`, `self_hosted`, `managed`, or `cloud`.                                                                                                                    |
| `role`         | string   | Runtime role such as `source_of_truth`, `event_log`, `semantic_index`, `cache`, `message_queue`, or `artifact_store`.                                             |
| `connection`   | object   | URI/env/host/port/database/TLS metadata.                                                                                                                          |
| `capabilities` | string[] | Declared features such as `structured`, `transactions`, `events`, `cache`, `queue`, `pubsub`, `streams`, `vector_search`, `metadata_filter`, or `artifact_bytes`. |

`StorageTopologySpec` groups profiles and declares default refs for relational, document, messaging, cache, vector, artifact, event, and memory storage. `messagingRef` is the default queue/stream/pub-sub path; `cacheRef` may point to the same Redis profile when cache behavior is colocated. `createSQLiteStorageProfile`, `createMongoStorageProfile`, `createRedisStorageProfile`, `createKafkaStorageProfile`, `createQdrantStorageProfile`, `createChromaStorageProfile`, `createPineconeStorageProfile`, and related helpers create common profiles. `resolveStorageConnection(profile, env)` resolves URI/env/local host configuration and `redactStorageConnection(connection)` removes credentials before logging or exposing diagnostics.

`StorageFailureContext` identifies a read, query, write, transaction, event append, artifact,
lease, snapshot, or restore operation plus provider/role/revision/idempotency evidence.
`classifyStorageFailure(error, context)` returns the shared `RecoveryFailure` contract;
`adviseStorageRecovery(failure)` returns a strategy plus reconciliation, revision refresh, replica,
and derived-cache invalidation requirements. Ambiguous mutations are never marked retryable.

## DomainPack

`DomainPackSpec` declares domain-level capabilities and contracts.

| Field                            | Type                   | Description                                                   |
| -------------------------------- | ---------------------- | ------------------------------------------------------------- |
| `id`, `version`, `name`          | string                 | Stable identity and display name.                             |
| `taskSchemas`                    | `TaskSchemaSpec[]`     | Supported task types and input contracts.                     |
| `workflows`                      | `WorkflowSpec[]`       | Domain workflows that can compile to FSM specs.               |
| `defaultWorkflow`                | string                 | Workflow id used when none is specified.                      |
| `sessionProfiles`                | `SessionProfileSpec[]` | Defaults for initializing runtime sessions.                   |
| `outputContracts`                | `OutputContractSpec[]` | Structured output contracts.                                  |
| `allowedSkills`, `defaultSkills` | `SkillRef[]`           | Skill allow-list and defaults.                                |
| `skillPolicies`                  | `SkillPolicyBinding[]` | Skill-to-policy/tool/trust bindings.                          |
| `tools`                          | `ToolSpec[]`           | Local or normalized tool contracts.                           |
| `mcpProfiles`                    | `MCPIntegrationSpec[]` | MCP server and capability profiles.                           |
| `memoryProfiles`                 | `MemorySpec[]`         | Memory provider and policy profiles.                          |
| `contextProfiles`                | `ContextSpec[]`        | Context source and provenance profiles.                       |
| `businessRules`                  | `BusinessRuleSpec[]`   | Abstract domain rules bound to output/policy/evaluation refs. |
| `policies`                       | `PolicySpec[]`         | Permission, audit, review, and retry policies.                |
| `evaluationProfiles`             | `EvaluationSpec[]`     | Evaluation contracts.                                         |
| `regressionCases`                | `RegressionSpec[]`     | Regression cases.                                             |
| `metadata`                       | object                 | Domain-specific metadata.                                     |

`SessionProfileSpec` may define `metadataSchema`, `defaultMetadata`, and default references for memory, context, tool, MCP, skill, and policy profiles.

`initializeDomainSession(domainPack, options)` returns a `DomainSessionInitialization` with merged metadata and selected profile references.

Domain pack loading and compilation APIs:

| API                                      | Description                                                                                     |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `LocalDomainPackLoader`                  | Loads `.domain.json`, `.domain.yaml`, and `.domain.yml` files from configured directories.      |
| `DomainPackRegistry`                     | Registers validated packs by `id` and `version`, with latest-by-id lookup.                      |
| `extendDomainPack(base, overlay)`        | Upserts or removes predefined customizations by `id` while preserving the base pack.            |
| `compileWorkflowToFSM(domainPack, opts)` | Compiles one `WorkflowSpec` to `FSMProcessSpec`.                                                |
| `WorkflowCompiler`                       | Class wrapper for workflow-to-FSM compilation when an injectable compiler object is preferred.  |
| `compileDomainPackToHarnessedSystem()`   | Resolves task/profile/tool/skill/policy bindings and returns FSM, system spec, and agent patch. |
| `applyDomainAgentPatch(agent, patch)`    | Applies DomainPack-derived skill/tool/memory/context/policy refs to an AgentSpec-shaped object. |

`compileDomainPackToHarnessedSystem(domainPack, options)` returns `bindings`,
`fsmProcess`, `harnessedSystem`, `agentPatch`, and `sessionInitialization`.
Use `agentPatch` or `applyDomainAgentPatch()` to apply selected `skillRefs`,
`toolRefs`, `memoryProfileRef`, `contextSpecRef`, and `policyRefs` to an agent
without coupling DomainPack declarations to a concrete app surface. MCP and
reasoning profile refs remain in the patch metadata for runtime adapters that
need the selected default profile. `HarnessedAgentSystemSpec.mcpRefs` and
`reasoningRefs` include both the selected default profile and any workflow
state-scoped profile refs.

`HarnessedAgentSystemSpec` can carry the compiled system refs for `policyRefs`,
`memoryRefs`, `toolRefs`, `skillRefs`, `mcpRefs`, `contextRefs`,
`reasoningRefs`, `outputContractRefs`, `businessRuleRefs`, evaluation, replay,
regression, and deployment.

## Session, Run, and Event

`Session` is runtime context. `Run` is one execution under a session. `Event` is the source-of-truth record for trace, replay, audit, regression, and state projection.

`RuntimeSession` fields:

| Field                    | Type                 | Description                         |
| ------------------------ | -------------------- | ----------------------------------- |
| `id`                     | string               | Session id.                         |
| `userId`                 | string               | Owner account boundary.             |
| `domainPackRef`          | `SpecRef`            | Optional referenced DomainPack.     |
| `sessionProfileRef`      | `SpecRef`            | Optional referenced SessionProfile. |
| `metadata`               | object               | Runtime user or business context.   |
| `status`                 | `active` or `closed` | Session lifecycle state.            |
| `createdAt`, `updatedAt` | string               | ISO timestamps.                     |

`RuntimeRun` fields:

| Field                                      | Type      | Description                                                                  |
| ------------------------------------------ | --------- | ---------------------------------------------------------------------------- |
| `id`                                       | string    | Run id.                                                                      |
| `sessionId`                                | string    | Parent session id.                                                           |
| `userId`                                   | string    | Owner account boundary.                                                      |
| `domainPackRef`, `workflowRef`, `agentRef` | `SpecRef` | Optional runtime references.                                                 |
| `status`                                   | string    | `queued`, `running`, `waiting_human`, `completed`, `failed`, or `cancelled`. |
| `input`, `output`                          | unknown   | Execution input and terminal output.                                         |
| `createdAt`, `updatedAt`, `completedAt`    | string    | ISO timestamps.                                                              |

`FrameworkEvent` fields include `id`, `type`, `runId`, optional `workspaceId`, `sessionId`, `stepId`, `agentId`, `fsmState`, `timestamp`, `payload`, and `metadata`.

Common event types include `session.created`, `run.created`, `run.started`, `run.waiting_human`, `run.cancelled`, `fsm.state.entered`, `react.step.completed`, `agent.reasoning.completed`, `inference.completed`, `model.call.completed`, `tool.call.completed`, `memory.write.committed`, `recovery.case.opened`, `recovery.strategy.selected`, `recovery.attempt.started`, `recovery.attempt.completed`, `recovery.progress.detected`, `recovery.case.resolved`, `recovery.case.escalated`, `context.compacted`, `human.review.requested`, `eval.completed`, `replay.completed`, and `regression.completed`.

Side-effecting runtime operations also emit phase events. Tool execution records request, policy, approval, start, timeout, retry, completion, failure, or rejection. MCP-backed tools additionally record MCP call start, completion, and failure. Memory reads and writes record requested/completed or requested/validated/committed/rejected phases.

`RunManager` is the package-level writer for event-first run execution. It creates sessions and runs, records `run.started`, writes `fsm.transition.accepted` and `fsm.state.entered`, records `react.step.completed`, marks human-review waits with `human.review.requested` and `run.waiting_human`, records human-review decisions and context compaction, and finalizes runs with `run.completed`, `run.failed`, or `run.cancelled`.

`MessageBus` is the harness transport contract for future asynchronous
handoff. `RuntimeMessage` fields include `id`, `type`, `userId`, `sessionId`,
`runId`, `from`, `to`, `payload`, `status`, timestamps, optional `stepId`,
`agentId`, `fsmState`, `correlationId`, `causationId`, `availableAt`,
`expiresAt`, and metadata. `InMemoryMessageBus.publish()`, `pull()`,
`acknowledge()`, `fail()`, and `list()` keep messages scoped by
`userId + sessionId + recipient`; traced buses emit `message.enqueued`,
`message.delivered`, `message.retrying`, `message.acknowledged`, `message.failed`, and
`message.dead_lettered`. Constructor options bound delivery attempts and retry delay/multiplier;
`fail({ retry: true })` requeues only inside that budget.

Durable runtime orchestration contracts are exported from `@hypha/core`:

| API                                                     | Contract                                                                                                                            |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `DurableEventStore`, `DurableEventRuntime`              | Expected-revision event append, idempotent batches, schema validation/upcasting, scoped reads, and checksum-verified import/export. |
| `ProjectionEngine`                                      | Deterministic state reduction from ordered event streams with projection revisions.                                                 |
| `SessionQueue`                                          | User/session-scoped command enqueue, claim/release, complete, fail, retry, and dead-letter behavior.                                |
| `RuntimeMessageInboxStore`, `RuntimeMessageOutboxStore` | Idempotent inbound handling and durable outbound delivery boundaries.                                                               |
| `RunLeaseStore`, `StateExecutionClaimStore`             | Lease epoch, fencing token, revision guard, heartbeat/renewal, completion, and stale-worker rejection.                              |
| `RuntimeResourceCoordinator`                            | Shared or exclusive resource claims scoped to a run and protected by lease guards.                                                  |
| `RuntimeRunControlService`, `DurableRuntimeTimerWorker` | Persisted pause/resume/signal commands and due-timer delivery.                                                                      |
| `RuntimeCancellationService`                            | Scoped cancellation fan-out with per-target results and idempotent command reuse.                                                   |
| `RuntimeCheckpointService`, `RuntimeRecoveryService`    | Lease-guarded checkpoint creation/load and event-derived recovery decisions.                                                        |
| `RuntimeReplayService`, `RuntimeQueryService`           | Read-only replay verification and query views derived from persisted runtime evidence.                                              |

`createRuntimeHelperSdk()` and `createRuntimeIoHelperSdk()` provide deterministic transition, wait,
clock, id, event, and resource helpers. `DefaultRuntimeActivityHelper` dispatches tool, memory,
model, execution, or custom work through a port and commits the corresponding lifecycle observation;
it does not execute provider-specific side effects in core. `BoundedFSMDriver` and
`RuntimeExecutionContext` are exported by `@hypha/harness` for budgeted FSM advancement using those
ports.

## Execution Activity, Governance, and Output

The Runtime-to-Execution boundary is exported from `@hypha/core` as provider-neutral contracts and
strict Zod/JSON Schema validators:

| API                               | Contract                                                                                                                                                                         |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ExecutionActivityRequest`        | Binds activity, operation, Run, FSM state attempt, Workspace, fencing token, optional deadline, and idempotency identity to one Command or Workspace operation.                  |
| `ExecutionActivityResult`         | Returns one terminal status with unique durable Event references, optional Artifact/snapshot references, and required normalized error evidence for every unsuccessful terminal. |
| `ExecutionToolBinding`            | Declares the governed Tool operation, Execution profile, required permission scopes, side-effect level, and optional Human Review policy.                                        |
| `DefaultExecutionRiskEvaluator`   | Derives deterministic risk rules and isolation recommendations from validated Tool, request, environment, and Workspace specs; it does not authorize the operation.              |
| `ExecutionAuthorizationEvidence`  | Binds Invocation, Activity, Run, Tool revision, principal, input hash, Policy decision, risk assessment, optional approval, and validity window.                                 |
| `GovernedExecutionPort`           | Fails closed on invalid scope, operation, approval, cancellation, deadline, authorization, or verifier evidence before calling an injected `ExecutionOperationDispatcher`.       |
| `DefaultExecutionOutputPlanner`   | Selects final file mutations using safe relative patterns, integrity evidence, Artifact/byte budgets, and deterministic ordering.                                                |
| `DefaultExecutionOutputCollector` | Creates/finalizes output Artifacts through an injected manager and verifies returned schema, scope, provenance, integrity, status, and version identity.                         |
| `ExecutionResultCache`            | Reuses only completed, deterministic read-only result projections under an exact user/Workspace scope, bounded Store timeout, validity hashes, and Artifact integrity checks.    |

Concrete process, container, remote sandbox, or object-store implementations remain adapter-owned.
An implementation is not implied merely because the framework contract or registry entry exists.
An Execution Cache hit is a reusable projection, not a new execution receipt: Workspace writes,
external effects, irreversible operations, unstable environments, failed results, and unverifiable
Artifact references always bypass or invalidate the Cache.

## Evaluation, Replay, and Regression

`@hypha/testing` provides deterministic runtime verification APIs. These APIs derive results from events and supplied contracts; they do not call models, tools, or MCP servers during evaluation.

| API                          | Description                                                                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OutputContractValidator`    | Validates a terminal output against an `OutputContractSpec.schema` using deterministic JSON Schema subset checks.                                                    |
| `TraceCompletenessEvaluator` | Checks event envelopes, required `TraceSpec.eventTypes`, terminal run events, and lifecycle start/end pairs.                                                         |
| `DeterministicEvaluator`     | Runs output contract, trace, schema, process, tool trace, policy, and regression checks as one summary. `evaluateAndRecord()` emits `eval.*` events.                 |
| `ReplayEngine.capture()`     | Captures a run into a `ReplayFixture` from supplied events or an `EventStore`, applying `ReplaySpec` capture flags and optional `replay.*` events.                   |
| `ReplayEngine.replay()`      | Reconstructs replay projection from fixture events only.                                                                                                             |
| `ReplayEngine.compare()`     | Produces trace diffs for event type sequence, state path, model calls, tool calls, policy decisions, memory read set, and output.                                    |
| `InMemoryReplayFixtureStore` | Stores fixtures in process for tests and local harness checks.                                                                                                       |
| `FileReplayFixtureStore`     | Persists fixtures as JSON files under a configured directory.                                                                                                        |
| `RegressionRunner.runSpec()` | Resolves `RegressionSpec.fixtureRefs` and runs required checks against replay fixtures and optional actual events. `runSpecAndRecord()` emits `regression.*` events. |

`ReplayFixture` fields include `id`, `version`, `runId`, `createdAt`,
`events`, `eventTypes`, `statePath`, optional `finalOutput`, `toolCalls`,
`modelCalls`, `policyDecisions`, `memoryReadSet`, optional `outputContract`,
and optional metadata. Use fixture ids that match `RegressionSpec.fixtureRefs`.
Replay capture rejects empty event sets or events whose `runId` differs from the
captured run.

`RegressionSpec.requiredChecks` supports `event_types`, `state_path`,
`tool_calls`, `policy_decisions`, and `output_contract`. If a fixture carries an
`outputContract`, `output_contract` validates the actual replay output against
that contract; otherwise it compares expected and actual final outputs.
Unsupported deterministic `EvaluationSpec` types fail explicitly instead of
being skipped. `EvaluationSpec` with `type: "schema"` must include `rubric`.
`RegressionSpec.fixtureRefs` and `RegressionSpec.requiredChecks` must each
contain at least one item.

## Workflow and FSM

`WorkflowSpec` fields:

| Field            | Type                       | Description                                                    |
| ---------------- | -------------------------- | -------------------------------------------------------------- |
| `initialState`   | string                     | First workflow state.                                          |
| `terminalStates` | string[]                   | States that end the workflow.                                  |
| `states`         | `WorkflowStateSpec[]`      | State goals, contracts, policies, tools, skills, and timeouts. |
| `transitions`    | `WorkflowTransitionSpec[]` | Allowed state transitions and guards.                          |

`compileWorkflowToFSM(domainPack, options)` converts a DomainPack workflow into `FSMProcessSpec`. `FSMProcessSpec` uses `initialState`, `states`, `transitions`, `terminalStates`, and an optional `recoveryPolicy`; `FSMSnapshot` records `processId`, `runId`, `currentState`, `statePath`, `status`, `updatedAt`, and optional persisted `recovery` counters/circuits.

`WorkflowStateSpec.allowedSkills` narrows which agent-bound skills may activate
in that state. `requiredSkills` declares skills that must be attached to the
compiled agent patch and treated as mandatory state activations; when a state
also declares `allowedSkills`, every required skill must be included there. If
a required skill is missing, unavailable, or denied by skill policy, context
building fails before model inference.

FSM runtime helpers include `applyTransitionWithRuntimePolicy`, `evaluateGuardExpression`, `evaluateStateTimeout`, `canRetryState`, and `validateFSMSnapshot`. Guards support deterministic boolean literals, `default`, `else:<guard>`, own-property variable paths, `!`, `&&`, `||`, equality, numeric comparison, `exists(path)`, and bounded `matches(path, pattern)`. Unsafe prototype paths, oversized expressions/input, invalid regex, backreferences, lookarounds, and high-risk nested quantifiers are rejected. Transitions can be rejected by guards, policy, or human-review requirements.

`FSMRuntime` owns one `FSMSnapshot` for a run and exposes `start()`, `transition(to, options)`, `transitionPath(states, options)`, `cancel(options)`, `decideRecovery(anomaly, options)`, `registerRecoverySuccess(circuitKey)`, and `getSnapshot()`. Runtime callbacks `onTransition`, `onStateEntered`, and `onRecoveryDecision` allow harness code to record trace events without putting storage or event-log dependencies inside the FSM package.

`RecoveryFailure` is the shared module-neutral failure record. It contains module/category/code,
retryability, side-effect state, root/circuit keys, and `RecoveryEvidence` such as operation and
dependency keys, revision, receipt status, idempotency/input/output hashes, source hashes, and
policy/spec/provider revisions. `RecoveryCaseSnapshot` persists cycles, no-progress count,
attempts, outputs, degraded participants, and the last failure/evidence hash.

`classifyFSMAnomaly()` normalizes generic provider and framework errors. Module classifiers add
stronger evidence: `classifyInferenceFailure()`, `classifyInferenceCacheFailure()`,
`classifyMemoryFailure()`, `classifyExecutionFailure()`, and `classifyStorageFailure()`.
`planFSMRecovery()` returns a deterministic action without performing a hidden side effect.
`runFSMRecoveryLoop()` executes one bounded operation; `runRecoverySupervisor()` executes
dependency-ordered `RecoveryParticipant` records and never repeats a completed participant.
Strategies are `retry`, `reconcile`, `fallback`, `degrade`, `compensate`, `wait`, `human_review`,
`quarantine`, `fail`, or `cancel`.

`RecoveryKnowledgePort` optionally supplies a verified strategy hint keyed by failure fingerprint,
participant, and policy/spec/provider revision. Hits are revalidated and mismatches are invalidated;
the port cannot complete a case or replace event/receipt evidence. The full safety order and module
matrix are documented in [FSM Anomaly Recovery](../architecture/fsm-recovery.md).

`defaultReActFSMProcessSpec` declares the minimal agent closure:

```text
Idle -> RunInitialized -> ContextBuilt -> Reasoning -> ActionSelected
  -> PolicyChecked -> Acting -> ObservationRecorded -> Verifying
  -> MemorySync -> Completed
```

Recovery routes use `Recovering`, `Compensating`, `Quarantined`, and `HumanReview`; these are
non-terminal states with explicit transitions back to an allowed work state, review, failure, or
cancellation. Domain workflow compilation adds the recovery envelope and `Failed`/`Cancelled`
terminals even when the source workflow declares only domain states.

## ReAct Kernel

`ReActAgentSpec` defines an agent's model alias, instructions, skill refs, tool refs, memory profile, policy refs, optional context spec, and optional reasoning config.

`ReActRunner` executes an explicit loop through observe, reason, model inference, action selection, policy check, tool action, observation, verification, memory sync, and terminal completion or human review. The runner requires an `InferenceProvider`, can use a `ToolRunner`, and uses an explicit `maxIterations` limit.

`ContextBuilder` builds `ReActRunContext` from runtime input, messages, agent spec, memory scope, and metadata. `DefaultContextBuilder` is the local skeleton implementation. `Verifier` checks observations and returns the next `ReActAction`; `DefaultVerifier` completes with the observation value unless the observation requires human review.

`ReActAgentRunner` wires `DefaultContextBuilder`, `BasicReActAgentRuntime`, `DefaultVerifier`, `InferenceProvider`, and `ToolRunner` into a runnable agent. Use `MockToolRunner` for package tests and local examples; production tools should use `GovernedToolRunner`.

`SkillContextBuilder` can wrap any `ContextBuilder` to resolve agent-bound skills before ReAct execution. It uses `SkillSelector` to select active skills from `agent.skillRefs`, applies `allowedSkills` from explicit options or `metadata.workflowState.allowedSkills`, applies mandatory `requiredSkills` from explicit options or `metadata.workflowState.requiredSkills`, checks activation through `SkillPolicy`, and loads only activated skill instructions through `SkillContextLoader`. Required skills bypass keyword/manual activation checks but still must be attached, registered, allowed, and policy-approved. Loaded skills are attached to `BuiltAgentContext.activeSkills`, emitted as tagged system context, and forwarded inside the model request context.

`ReasoningContextBuilder` can wrap any `ContextBuilder` to add structured thinking and agentic deliberation before ReAct execution. `ThinkingPlanner` produces a `ThinkingPlan` with intent, constraints, success criteria, plan steps, risks, and a summary. `AgenticReasoner` produces an `AgenticReasoningDecision` with mode, recommended phase, action type, tool candidates, verification strategy, and rationale. These are structured summaries only; raw hidden chain-of-thought is not exposed or persisted.

`ReasoningConfig` fields:

| Field          | Values                                  | Description                                      |
| -------------- | --------------------------------------- | ------------------------------------------------ |
| `thinkingMode` | `none`, `summary`, `structured`         | Controls whether and how planning is summarized. |
| `agenticMode`  | `react`, `fsm_react`, `tot`, `critique` | Declares the deliberation strategy.              |
| `maxSteps`     | positive integer                        | Bounds generated plan steps.                     |
| `persist`      | `summary_only`, `events_only`           | Controls persisted reasoning material.           |
| `plannerRef`   | string                                  | Optional planner implementation reference.       |
| `reasonerRef`  | string                                  | Optional reasoner implementation reference.      |

`HarnessedReActFSMRunner` from `@hypha/harness` composes `RunManager`, `FSMRuntime`, and `ReActRunner`. It records a trace event for every FSM state and projects run/replay state from events.

## Model Providers

`ModelProvider` implementations expose:

| Method               | Description                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------- |
| `capabilities()`     | Returns chat, streaming, tool calling, JSON mode, embedding, reasoning, prefix caching, and KV caching support. |
| `generate(request)`  | Produces a normalized model response.                                                                           |
| `stream(request)`    | Optional streaming event source.                                                                                |
| `countTokens(input)` | Optional token accounting.                                                                                      |

`ModelRequest` contains `runId`, `stepId`, `modelAlias`, optional `instructions`, `input`, `tools`, `responseFormat`, `reasoning`, `temperature`, `maxTokens`, `cache`, and `metadata`.

`ModelResponse` contains `id`, optional `providerId`, optional resolved `model`, normalized `content`, optional `toolCalls`, optional `usage`, optional `metadata`, and optional `raw` provider payload. Kernel and runtime code should depend on normalized fields only; `raw` is for trace/debug adapters.

`ModelAliasSpec` binds a stable alias to a provider target:

| Field           | Type   | Description                                                                         |
| --------------- | ------ | ----------------------------------------------------------------------------------- |
| `alias`         | string | Stable runtime name such as `default-chat`, `default-fast`, or `default-reasoning`. |
| `providerId`    | string | Registered `ModelProvider` id.                                                      |
| `providerModel` | string | Concrete provider model id used only by the provider adapter.                       |

`ModelRoutingSpec` groups aliases and optional fallback aliases. `ModelRouter` resolves aliases, calls the selected provider, annotates responses with provider/model metadata, and falls back only when the normalized provider error is retryable.

Provider errors are normalized as `ModelProviderError` with `code`, `providerId`, `modelAlias`, optional HTTP `status`, `retryable`, and raw provider error data. Common codes include `MODEL_PROVIDER_HTTP_ERROR`, `MODEL_PROVIDER_RATE_LIMITED`, `MODEL_PROVIDER_AUTH_FAILED`, `MODEL_PROVIDER_BAD_REQUEST`, `MODEL_PROVIDER_STREAM_ERROR`, `MODEL_PROVIDER_NOT_FOUND`, and `MODEL_ALIAS_NOT_FOUND`.

`ModelCacheControl` carries optional `prefixContent`, `kvCacheValue`, `kvCacheRef`, and metadata. Providers that support native cache handles can consume `kvCacheValue` and return a new handle through `InferenceResponse.nextKvCacheValue`.

OpenAI-compatible providers use `OpenAICompatibleProviderConfig` with `id`, `type`, `baseUrl`, `apiKey` or `apiKeyEnv`, `providerModelByAlias`, `capabilities`, and `timeoutMs`. `OpenAIModelProvider` is the OpenAI reference implementation. `createDeepSeekProvider()` configures DeepSeek through the same OpenAI-compatible adapter path.

`ModelStreamEvent` normalizes streaming provider output as `delta`, `tool_call`, `usage`, `done`, or `error` events. OpenAI-compatible SSE chunks are parsed into this envelope before they reach the agent kernel or HTTP surface.

## Serving Cache

`@hypha/serving-cache` provides exact request-level caching for
`ModelProvider.generate()` calls. It does not change the agent runtime,
DomainPack schema, or tool/MCP execution contracts.

Core exports:

| Export                    | Purpose                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------- |
| `CacheStore`              | Minimal async store interface: `get`, `set`, `delete`, `clear`.                    |
| `CacheEntry`              | Persisted `key`, `value`, timestamps, optional metadata.                           |
| `CacheMetadata`           | Provider/model/cache type, request hash, tool hash, prefix data.                   |
| `CachePolicy`             | `enabled`, `mode`, TTL, error/stream/no-cache behavior.                            |
| `ServingCacheManager`     | Key generation, lookup, expiry enforcement, and writes.                            |
| `CachedLLMProvider`       | Provider wrapper that applies exact cache policy.                                  |
| `PrefixCacheShapeTracker` | Compares stable prefix shape per provider/model/scope and reports changed reasons. |
| `MemoryCacheStore`        | In-memory store for tests and local experiments.                                   |
| `SQLiteCacheStore`        | Persistent local store backed by `cache_entries`.                                  |

`LLMCacheKeyInput` fields are `provider`, `model`, `messages`, optional
`system`, optional `tools`, optional `params`, optional `cacheScope`, and
optional `promptBlocks`. `promptBlocks` describes already-rendered stable
prompt components such as prompt templates, system blocks, tool schemas,
project context, DomainPack context, or memory. It is prefix metadata for
WorkCache and does not change the exact response cache key unless the rendered
content also changes in `system`, `messages`, `tools`, or params.
`CacheScope` may include `tenantId`, `userId`, `projectId`, `sessionId`, and
`domainPackId`.

Trace payloads may include `prefixCache`, with `prefixHash`,
`toolSchemaHash`, `domainPackHash`, `dynamicSuffixHash`,
`stablePrefixChanged`, `dynamicSuffixChanged`, and `changedReasons`. Provider
usage may include `cacheHitTokens` and `cacheMissTokens`; DeepSeek
`prompt_cache_hit_tokens` / `prompt_cache_miss_tokens` and OpenAI-compatible
`prompt_tokens_details.cached_tokens` are normalized into these fields. This is
provider-side prefix cache observability, not a local KV cache.

Trace events are `llm.cache.lookup`, `llm.cache.hit`, `llm.cache.miss`,
`llm.cache.write`, and `llm.cache.bypass`. Streaming requests always bypass
cache in the first version.

## WorkCache

`@hypha/workcache` exposes an event-derived typed runtime cache. It consumes
existing `FrameworkEvent` records and writes `CacheBlock<T>` entries into
primary trees without changing Session, Run, Event, DomainPack, or Serving
Cache contracts.

Core exports:

| Export                            | Purpose                                                                                         |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| `RuntimeTypeDefinition`           | Declares source event types, work node type, primary tree, and materializer.                    |
| `NormalizedWorkEvent`             | Source event plus normalized tree/node metadata.                                                |
| `WorkGraphNode`, `WorkGraphEdge`  | Graph-compatible node and dependency records.                                                   |
| `CacheBlock<T>`                   | Persisted typed artifact with source event, validity, provenance, utility, TTL, and cache key.  |
| `CacheTree<T>`                    | Tree interface for lookup, write, invalidate, and list.                                         |
| `TypedCacheForest`                | Store-backed collection of typed cache trees.                                                   |
| `WorkCacheManager`                | Ingests events, enforces TTL/validity rules, and returns derived audit events.                  |
| `WorkCachePolicy`                 | Store, prompt budget, unknown-event policy, extension-event flag, and per-tree TTL/max entries. |
| `WorkCacheRecoveryKnowledgeStore` | Revision-safe `RecoveryKnowledgePort` backed by `RecoveryTree` blocks.                          |
| `MemoryWorkCacheStore`            | In-memory store.                                                                                |
| `SQLiteWorkCacheStore`            | Persistent store backed by `workcache_blocks`.                                                  |

Default source event alignment:

| Source event group                                                                                               | Primary tree       |
| ---------------------------------------------------------------------------------------------------------------- | ------------------ |
| `agent.reasoning.completed`, `thinking.completed`, `agent.deliberation.completed`, `reasoning.decision.recorded` | `PlanTree`         |
| `inference.completed`, `model.call.completed`                                                                    | `ComputationTree`  |
| `tool.call.completed`, `mcp.call.completed`                                                                      | `ToolTree`         |
| `context.build.completed`, `context.compacted`                                                                   | `ObservationTree`  |
| `eval.completed`, `regression.completed`                                                                         | `VerificationTree` |
| `memory.read.completed`, `memory.write.committed`                                                                | `MemoryTree`       |
| `recovery.attempt.completed`, `recovery.case.resolved`, `recovery.case.escalated`                                | `RecoveryTree`     |
| `llm.cache.write` with prefix metadata                                                                           | `PromptPrefixTree` |

Runtime configuration uses `HYPHA_WORKCACHE=off|memory|sqlite`,
`HYPHA_WORKCACHE_SQLITE_PATH`, `HYPHA_WORKCACHE_PROMPT_BUDGET_TOKENS`, and
per-tree TTL fields under `workCache.trees` in `config.yaml`.

`PromptPrefixTree` stores one `CacheBlock<PromptPrefixBlockValue>` per stable
prompt block. A block value contains `id`, `type`, `hash`, `content`,
`tokenEstimate`, `order`, `prefixHash`, optional template fields, and metadata.
It does not store the complete `llm.cache.write` event or a full prompt event
payload. `WorkCacheManager.materializePromptPrefix()` selects the requested or
latest `prefixHash`, orders its blocks, applies the prompt token budget, and
assembles the runtime prefix string.

Derived audit events are `workcache.lookup`, `workcache.hit`,
`workcache.miss`, `workcache.write`, `workcache.invalidate`,
`workcache.bypass`, and `workcache.prefix.materialized`. Each payload includes
`sourceEventId`, `sourceEventType`, `treeType`, `blockId`, and `cacheKey`.

`WorkCacheManager.getRecoveryKnowledgePort()` exposes recovery strategy hints keyed by failure
fingerprint, participant, and policy/spec/provider revision. Values include strategy, outcome,
evidence hash, expiry, and verified/negative validation. Expired or mismatched blocks are removed;
the runtime supervisor revalidates hits and remains the only component that advances the FSM case.

## Inference

`HyphaInferencePipeline` is the default agent inference provider. It executes:

```text
InferenceRequest -> PromptCompiler -> PrefixSegmenter -> PlasmodHotLayer -> InferenceBackend -> InferenceResponse
```

`InferenceRequest` fields include `runId`, `stepId`, optional `sessionId`, optional `agentId`, `modelAlias`, optional `providerId`, optional `backendId`, `input`, optional generation `options`, optional `cachePolicy`, optional `prefix`, optional `kvCache`, `trace`, `metadata`, and resolved cache fields supplied by `InferenceManager`. `providerId` remains for manager routing; `backendId` selects the physical inference backend when using `HyphaInferencePipeline`.

`InferenceResponse` contains `id`, normalized `output`, optional `usage`, optional cache usage, optional `nextKvCacheValue`, optional `metadata`, and optional raw provider payload.

`DefaultPromptCompiler` accepts string prompts, `PromptMessage[]`, or structured input with `instructions`, `messages`, `context`, `prompt`, or `input`. It returns `CompiledPrompt` with normalized messages and rendered text. `DefaultPrefixSegmenter` splits compiled prompts into cacheable stable segments and dynamic prompt content.

`PrefixSegment` fields include `id`, `kind`, `scope`, `content`, `contentHash`, optional `tokenCount`, `cacheable`, optional `dependencies`, and optional `metadata`. Cacheable roles are `system`, `developer`, `context`, `memory`, and `tool`; `user` and `assistant` content stays dynamic by default.

`PlasmodHotLayer` manages prefix registry, cache metadata, session state, invalidation graph, and reuse policy. `PlasmodReusePolicy` supports `allowCrossSession`, `allowCrossAgent`, `minTokenCount`, `requireExactHash`, and `maxPrefixRefs`. The in-memory implementation is suitable for local runtimes and tests; production deployments can replace it without changing kernel contracts.

Backend ids:

| Backend id   | Adapter                     | Default URL                                  |
| ------------ | --------------------------- | -------------------------------------------- |
| `sglang`     | `SGLangInferenceBackend`    | `http://localhost:30000/generate`            |
| `vllm`       | `VLLMInferenceBackend`      | `http://localhost:8000/v1/chat/completions`  |
| `llama.cpp`  | `LlamaCppInferenceBackend`  | `http://localhost:8080/completion`           |
| `openai-api` | `OpenAIAPIInferenceBackend` | `https://api.openai.com/v1/chat/completions` |

`createDefaultInferenceBackendRegistry()` registers all four backends and defaults to `sglang`. Each backend consumes `InferenceBackendRequest` and returns `InferenceBackendResponse` with normalized `output`, `usage`, optional `physicalKvCache`, optional `metadata`, and optional `raw`.

Cache references:

| Type             | Key fields                                                                 |
| ---------------- | -------------------------------------------------------------------------- |
| `PrefixCacheRef` | `id`, `version`, `contentHash`, optional `tokenCount`, `metadata`.         |
| `KvCacheRef`     | `id`, `provider`, `modelAlias`, `scope`, optional `expiresAt`, `metadata`. |

`InferenceCachePolicy` supports `prefix`, `kvCache`, and `writeKvCache`. `writeKvCache` accepts a target ref, optional explicit value, and mode `write_through`, `write_if_missing`, or `refresh`. `InferenceManager` enforces `expiresAt`, annotates hit or miss metadata, and can persist `nextKvCacheValue` returned from an inference provider.

`ReasoningOrchestrator` supports `direct`, `cot`, `tot`, and `self_consistency`. `ReasoningOptions` include `branches`, `maxDepth`, `revealReasoning`, and an optional evaluator.

## Memory

`MemoryProfileSpec` binds a management provider, record store, optional working/vector/artifact
stores, embedding/reranker providers, and explicit scope, retrieval, write, retention,
consolidation, conflict, privacy, fallback, indexing, and context policies. Top-level profile and
provider contracts reject undeclared fields consistently in TypeScript validation and exported JSON
Schema.

`MemoryManagementProvider` implements `add`, `search`, `get`, `list`, optimistic `update`, `delete`,
optional `history`, capabilities, health, and close. Requests carry `operationId`,
`MemoryPrincipal`, `ManagedMemoryScope`, and the applicable profile ref. Managed record types include
`working`, `episodic`, `semantic`, `procedural`, `preference`, `artifact`, `governance`,
`reflection`, and `custom`.

`CachedMemoryManagementProvider` optionally wraps any managed provider with a versioned,
scope-qualified search cache. Its identity includes principal roles/permission scopes and retrieval
semantics; `operationId` and trace metadata are excluded. It caches only searches that explicitly
set `updateAccessStats: false`, validates returned records at runtime, bounds entry size and Store
latency, coalesces only identical scoped reads, and invalidates the scope after every successful
mutation. Monotonic scope revisions fence searches that overlap mutations; retries are bounded and
failed invalidation quarantines that scope before another lookup. `InMemoryMemorySearchCacheStore`
is the bounded local implementation and `RedisMemorySearchCacheStore` provides the same key-bound,
TTL-limited contract for shared local, self-hosted, or managed Redis.

`ManagedMemoryRecord` contains record/version ids, revision, content, canonical text, explicit scope
and scope hash, visibility, source, provenance, confidence, status, relations, index status, content
hash, and timestamps. `ManagedMemoryRecordStore` uses compare-and-set revisions and scope-qualified
lookups. `MemoryPersistenceUnitOfWork` declares durability and atomic record/outbox support;
`StructuredMemoryPersistenceUnitOfWork` supplies that boundary over a transactional structured
store.

`DefaultMemoryRetrievalPipeline` applies principal/scope and hard record filters before deterministic
score fusion, then returns a retrieval snapshot and explanation. `IndexOutboxWorker` leases exact
record versions for vector upsert/delete, retries with a bounded attempt budget, and dead-letters an
exhausted index job without discarding the structured source record.

## Tools, MCP, and Skills

`ToolSpec` remains the compatibility registration shape for `id`, `version`, schemas, side effects,
permissions, policy, timeout, retry, audit, approval, and source metadata.
`GovernedToolContractSpec` is the structured canonical contract: `input`, `output`, `semantics`,
`execution`, `governance`, `observability`, `cache`, optional `streaming`, and immutable `revision`.
Registration normalizes both shapes before execution. TypeScript types, Zod validators, JSON Schema,
and example definitions are exported from `@hypha/tools`.

`ToolRegistry` binds an immutable normalized contract to a `ToolAdapter`. Built-in adapters cover
local functions, plugins, mocks, HTTP providers, and MCP capabilities. `validateToolInput()` handles
the recursive JSON Schema subset used by Tool contracts, including nested objects and arrays,
required fields, enum, type checks, `additionalProperties`, string constraints, numeric bounds, and
bounded pattern evaluation. Invalid and high-risk backtracking patterns return validation issues.

`GovernedToolRunner` owns the complete Invocation lifecycle. It persists Invocation state, resolves
scope-aware idempotency, validates input and output, evaluates policy and permission scopes, waits
for revision-checked approval, handles timeout/retry/cancellation, reconciles external receipts,
artifactizes large output, records observations, applies validity-aware result reuse, emits Tool and
MCP events, and supports recovery. Calls return structured results such as `completed`, `failed`,
`denied`, `conflict`, `cancelled`, or `human_review_required`. Audit inclusion and redaction apply to
both request and completion events.

`ToolResultCache` is an optional acceleration boundary. The package exports bounded
`InMemoryToolResultCache`, shared `RedisToolResultCache`, strict runtime/JSON schemas, and an
Artifact verification port. Cache entries are versioned, key-bound safe projections. `read` Tools
must provide `context.metadata.externalStateVersion`; Tools with sensitive output declarations or
side effects bypass result reuse.

Application-level local tools can expose `ITool.governance` metadata. `ToolManager.describeTool()` carries that metadata into server ReAct, workflow, and direct HTTP tool execution, so local tools and MCP tools use the same `ToolSpec` governance path.

The server also registers `utility.json`, `utility.text`, and `utility.hash`. Their pure executors and
contracts are exported from `@hypha/tools`. They provide bounded JSON parse/stable stringify/Pointer
lookup, literal text inspection/transformation, and SHA-256 over text or canonical JSON. They reject
prototype-pollution keys, excessive JSON depth/nodes, oversized text/results, and arbitrary search
regex. See [Common Utility Tools](../guides/common-utility-tools.md).

The built-in server `search` tool is a governed local tool with `permissionScope: ["web.search"]`. It defaults to deterministic offline results. Set `WEB_SEARCH_PROVIDER=auto` to try `WEB_SEARCH_PROVIDER_ORDER` with fallback, `WEB_SEARCH_PROVIDER=china` to prefer `WEB_SEARCH_CHINA_PROVIDER_ORDER` (`baidu,so360,stub` by default), `WEB_SEARCH_PROVIDER=baidu` or `so360` for mainland China no-key suggest providers, `WEB_SEARCH_PROVIDER=wikipedia` for Wikipedia OpenSearch, or `WEB_SEARCH_PROVIDER=duckduckgo` for a DuckDuckGo Instant Answer-compatible endpoint. `WEB_SEARCH_FALLBACK_PROVIDERS`, provider-specific endpoints, `WEB_SEARCH_TIMEOUT_MS`, and `WEB_SEARCH_USER_AGENT` control deployment-specific transport details.

`MCPIntegrationSpec` declares servers, capability allow/deny rules, trust, import policy,
resource/tool/prompt policies, version pins, and hashing. `MCPConnectionManager` owns stdio and
Streamable HTTP sessions, initialization, pagination, cancellation, health, reconnect, and cleanup.
`MCPCapabilityCatalog` owns normalized capability revisions, schema cache, trust, drift,
quarantine, approval, stable Tool IDs, and immutable Run snapshots. Provider SDK objects do not
cross this boundary.

`ToolProfileSpec` groups versioned Tool, MCP profile, and policy refs with default permission scopes
and eager/lazy loading. A Session profile selects the default Tool profile; a workflow state may
override it. The Domain compiler projects only profiles and Tools selected by effective workflow
states, validates referenced versions, and applies `deniedToolRefs` after legacy, direct, and
profile-based allow sources so deny always wins.

The API server registers MCP clients from `tools.mcpServers` in `config.yaml`: `fixture` for the
in-process gateway, `local` for stdio servers, and `remote` for Streamable HTTP. Governed Tools are
available through `/tools`, `/tools/:id`, `/tools/execute`, `/tool-invocations`, and
`/tool-approvals`; MCP connection and catalog views are available through `/mcp/servers`,
`/mcp/capabilities`, and `/mcp/drifts`. ReAct, workflow, and HTTP surfaces all delegate execution to
the same runner.

`SkillSpec` declares activation policy, instructions, references, scripts, assets, allowed and required tools, required MCP servers, memory access policy, side-effect policy, context budget, input schema, output contract, evaluation cases, provenance, and trust level.

Skill system APIs:

| API                   | Purpose                                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `SkillRegistry`       | Stores validated `SkillSpec` objects by id.                                                                                |
| `LocalSkillLoader`    | Loads local markdown skills from `*.md` and nested `SKILL.md` files with YAML frontmatter.                                 |
| `SkillSelector`       | Selects registered skills bound to `agent.skillRefs` using `always`, `keyword`, `regex`, `intent`, or `manual` activation. |
| `DefaultSkillPolicy`  | Denies untrusted skills and skills whose required tools are outside the active tool scope.                                 |
| `SkillContextLoader`  | Loads activated instructions and `on_activation` references within `contextBudget`; scripts and assets are metadata only.  |
| `SkillContextBuilder` | Injects selected skill context into `BuiltAgentContext` and model request context.                                         |

Markdown local skills use this shape:

```markdown
---
id: context-enrichment
name: Context Enrichment
description: Adds derived context signals before reasoning
version: 1.0.0
priority: 10
enabled: true
triggers:
  - type: always
allowedTools:
  - tool.search
trustLevel: reviewed
---

Skill instructions loaded only after activation.
```

Harnessed runs record `skill.selected`, `skill.loaded`, and `skill.completed` for activated skills. Skill-provided tools are not executed directly; tool actions still go through `ToolRunner` and the same policy/trace path as non-skill tool calls.

## Memory Runtime and Context Assembly

`MemoryManager` accepts either the managed provider contract above or the compatibility
`MemoryProvider` contract. The compatibility surface retains `read`, `search`, `write`, `update`,
`invalidate`, `summarize`, and `audit` for existing storage backbones; managed callers use
`add/search/get/list/update/delete/history` request objects with explicit principal and scope.

Compatibility writes still enforce `MemoryWritePolicy` before provider side effects and can record
standard trace events when constructed with a `TraceRecorder`:

```ts
const manager = new MemoryManager(storage.memory, { trace: storage.eventStore });

await manager.write(scope, record, {
  requireProvenance: true,
  allowLongTerm: true,
});
```

Compatibility `MemoryRecord` requires `id`, `type`, `value`, `provenance`, and `createdAt`.
Long-term records such as `episodic`, `semantic`, and `procedural` require `allowLongTerm: true`;
`requireProvenance: true` rejects records without provenance. Managed and compatibility operations
emit reference-only memory lifecycle events and normalize failures for FSM recovery.

The managed `DefaultMemoryContextBuilder` resolves registered sources, applies policy, sensitivity,
deduplication, stable ordering, per-source and total token budgets, deterministic extractive
compaction, and `ContextProvenance`. `DefaultContextInjectionGateway` preserves the boundary between
memory data and instructions. The kernel compatibility `MemoryContextBuilder` remains available for
existing ReAct assembly, and `createEpisodicMemorySync()` routes verified observations through the
same policy and trace path. See [Governed Memory](../architecture/memory.md).

## Local Adapters

`@hypha/adapters-local` provides development and self-hosted adapters:

| Adapter                          | Storage                 | Purpose                                                                                                                                                                                      |
| -------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SQLiteEventStore`               | SQLite or JSON fallback | Event store and trace recorder for replay, audit, regression, and projection. Uses `node:sqlite` when available, otherwise `better-sqlite3`, with JSON sidecar fallback only in `auto` mode. |
| `SQLiteStructuredStore`          | SQLite or JSON fallback | Structured source-of-truth records with indexed tables. Uses the same SQLite/JSON fallback behavior.                                                                                         |
| `LocalVectorIndexProvider`       | JSON file               | Persistent local vector search with metadata filters.                                                                                                                                        |
| `FileArtifactStore`              | filesystem              | Artifact bytes and hash metadata under a configured root.                                                                                                                                    |
| `MockEmbeddingProvider`          | deterministic vectors   | Repeatable local embeddings for tests and offline development.                                                                                                                               |
| `InMemoryExecutionCacheStore`    | bounded memory          | Local `ExecutionCacheStore` with LRU-style eviction, byte limits, defensive copies, and strict physical/logical key binding.                                                                 |
| `RedisExecutionCacheStore`       | Redis-compatible KV     | Shared local/self-hosted/managed Store with TTL, serialized-size limits, runtime validation, and physical/logical key binding.                                                               |
| `NodeExecutionFingerprintHasher` | Node crypto             | SHA-256 implementation for canonical Execution command, validity, scope, and Result Cache keys.                                                                                              |

`createLocalStorageBackbone(options)` returns a complete local stack: `eventStore`, `structured`, `vector`, `artifacts`, `embeddings`, `memory`, and storage `profiles`. Use it when a local runtime needs event persistence, structured memory, semantic recall, and artifact storage without wiring each adapter manually.

`SQLiteEventStore.exportJsonl(filePath, filter?)` writes filtered events as newline-delimited JSON and returns the exported count. `SQLiteEventStore.importJsonl(filePath)` appends those events into the configured event store and returns the imported count. Use these APIs for replay fixtures, audit snapshots, and regression traces.
