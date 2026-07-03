# Framework API

The framework API is exposed through the TypeScript packages under `packages/*`. Application surfaces such as the HTTP server and CLI call these contracts instead of defining runtime behavior directly.

## Documentation Map

- [Architecture Reference](../reference/architecture.md) explains package responsibilities, harness semantics, and extension boundaries.
- [Runtime Model](../reference/runtime-model.md) explains event-first execution, FSM transitions, ReAct phases, side effects, and concurrency.
- [Domain Packs](../guides/domain-packs.md) provides a field-level guide and minimal declaration example.
- [Local Development](../guides/local-development.md) lists setup, storage, and verification commands.

## Package Boundary Summary

| Package | Public Surface |
| --- | --- |
| `@hypha/core` | Spec primitives, schema definitions, events, errors, policy interfaces. |
| `@hypha/domain` | `DomainPackSpec`, `WorkflowSpec`, `SessionProfileSpec`, `compileWorkflowToFSM`. |
| `@hypha/fsm` | `FSMProcessSpec`, `FSMSnapshot`, guarded transitions, timeout/retry/human-review helpers. |
| `@hypha/kernel` | `ReActAgentSpec`, `ReActRunner`, ReAct phases and runtime interfaces. |
| `@hypha/inference` | `InferenceManager`, prefix/KV cache providers, reasoning orchestration. |
| `@hypha/models` | `ModelProvider`, normalized model requests/responses, OpenAI-compatible adapters. |
| `@hypha/tools` | `ToolSpec`, `ToolRegistry`, `GovernedToolRunner`, side-effect governance. |
| `@hypha/mcp` | `MCPIntegrationSpec`, capability normalization into tool/resource/prompt specs. |
| `@hypha/memory` | `MemoryProvider`, `MemoryManager`, scopes, records, hybrid memory. |
| `@hypha/skills` | `SkillSpec`, skill refs, activation and side-effect policy fields. |
| `@hypha/harness` | Event-first runtime views, queues, replay/audit/regression projections. |
| `@hypha/adapters-local` | SQLite/JSON/file/vector local adapters. |
| `@hypha/testing` | Event and spec test helpers. |

Harness is a system-level architecture concept, not a reason to collapse every runtime primitive into one package. Keep FSM semantics independent, keep app surfaces outside packages, and use harness APIs for event-derived runtime views and governance evidence.

## Spec Schemas

Framework specs expose a common validation surface: `*SpecSchema` for Zod validation, `*SpecJsonSchema` for external tooling, `*SpecDefinition` for bundled schema/example metadata, `*SpecExample` for fixtures, and `validate*Spec(input)` for typed parsing.

Schema exports are available for `HarnessedAgentSystemSpec`, `TraceSpec`, `ReActAgentSpec`, `ModelProviderSpec`, `ToolSpec`, `MemorySpec`, `FSMProcessSpec`, `SkillSpec`, `MCPIntegrationSpec`, `WorkflowSpec`, and `DomainPackSpec`.

## DomainPack

`DomainPackSpec` declares domain-level capabilities and contracts.

| Field | Type | Description |
| --- | --- | --- |
| `id`, `version`, `name` | string | Stable identity and display name. |
| `taskSchemas` | `TaskSchemaSpec[]` | Supported task types and input contracts. |
| `workflows` | `WorkflowSpec[]` | Domain workflows that can compile to FSM specs. |
| `defaultWorkflow` | string | Workflow id used when none is specified. |
| `sessionProfiles` | `SessionProfileSpec[]` | Defaults for initializing runtime sessions. |
| `tools` | `ToolSpec[]` | Local or normalized tool contracts. |
| `mcpProfiles` | `MCPIntegrationSpec[]` | MCP server and capability profiles. |
| `memoryProfiles` | `MemorySpec[]` | Memory provider and policy profiles. |
| `allowedSkills`, `defaultSkills` | `SkillRef[]` | Skill allow-list and defaults. |
| `policies` | `PolicySpec[]` | Permission, audit, review, and retry policies. |
| `evaluationProfiles` | `EvaluationSpec[]` | Evaluation contracts. |
| `regressionCases` | `RegressionSpec[]` | Regression cases. |
| `outputContracts` | `OutputContractSpec[]` | Structured output contracts. |
| `metadata` | object | Domain-specific metadata. |

`SessionProfileSpec` may define `metadataSchema`, `defaultMetadata`, and default references for memory, tool, MCP, skill, and policy profiles.

`initializeDomainSession(domainPack, options)` returns a `DomainSessionInitialization` with merged metadata and selected profile references.

## Session, Run, and Event

`Session` is runtime context. `Run` is one execution under a session. `Event` is the source-of-truth record for trace, replay, audit, regression, and state projection.

`RuntimeSession` fields:

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Session id. |
| `userId` | string | Owner account boundary. |
| `domainPackRef` | `SpecRef` | Optional referenced DomainPack. |
| `sessionProfileRef` | `SpecRef` | Optional referenced SessionProfile. |
| `metadata` | object | Runtime user or business context. |
| `status` | `active` or `closed` | Session lifecycle state. |
| `createdAt`, `updatedAt` | string | ISO timestamps. |

`RuntimeRun` fields:

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Run id. |
| `sessionId` | string | Parent session id. |
| `userId` | string | Owner account boundary. |
| `domainPackRef`, `workflowRef`, `agentRef` | `SpecRef` | Optional runtime references. |
| `status` | string | `queued`, `running`, `waiting_human`, `completed`, `failed`, or `cancelled`. |
| `input`, `output` | unknown | Execution input and terminal output. |
| `createdAt`, `updatedAt`, `completedAt` | string | ISO timestamps. |

`FrameworkEvent` fields include `id`, `type`, `runId`, optional `workspaceId`, `sessionId`, `stepId`, `agentId`, `fsmState`, `timestamp`, `payload`, and `metadata`.

Common event types include `session.created`, `run.created`, `run.started`, `fsm.state.entered`, `react.step.completed`, `agent.reasoning.completed`, `inference.completed`, `model.call.completed`, `tool.call.completed`, `memory.write.committed`, `eval.completed`, `replay.completed`, and `regression.completed`.

Side-effecting runtime operations also emit phase events. Tool execution records request, policy, approval, start, timeout, retry, completion, failure, or rejection. MCP-backed tools additionally record MCP call start, completion, and failure. Memory reads and writes record requested/completed or requested/validated/committed/rejected phases.

## Workflow and FSM

`WorkflowSpec` fields:

| Field | Type | Description |
| --- | --- | --- |
| `initialState` | string | First workflow state. |
| `terminalStates` | string[] | States that end the workflow. |
| `states` | `WorkflowStateSpec[]` | State goals, contracts, policies, tools, skills, and timeouts. |
| `transitions` | `WorkflowTransitionSpec[]` | Allowed state transitions and guards. |

`compileWorkflowToFSM(domainPack, options)` converts a DomainPack workflow into `FSMProcessSpec`. `FSMProcessSpec` uses `initialState`, `states`, `transitions`, and `terminalStates`; `FSMSnapshot` records `processId`, `runId`, `currentState`, `statePath`, `status`, and `updatedAt`.

FSM runtime helpers include `applyTransitionWithRuntimePolicy`, `evaluateGuardExpression`, `evaluateStateTimeout`, and `canRetryState`. Guards support deterministic boolean literals, `default`, `else:<guard>`, variable paths, `!`, `&&`, `||`, equality, numeric comparison, `exists(path)`, and `matches(path, pattern)`. Transitions can be rejected by guards, policy, or human-review requirements.

## ReAct Kernel

`ReActAgentSpec` defines an agent's model alias, instructions, skill refs, tool refs, memory profile, policy refs, and optional context spec.

`ReActRunner` executes an explicit loop through observe, reason, model inference, action selection, policy check, tool action, observation, verification, memory sync, and terminal completion or human review. The runner requires an `InferenceProvider`, can use a `ToolRunner`, and uses an explicit `maxIterations` limit.

## Model Providers

`ModelProvider` implementations expose:

| Method | Description |
| --- | --- |
| `capabilities()` | Returns chat, streaming, tool calling, JSON mode, embedding, reasoning, prefix caching, and KV caching support. |
| `generate(request)` | Produces a normalized model response. |
| `stream(request)` | Optional streaming event source. |
| `countTokens(input)` | Optional token accounting. |

`ModelRequest` contains `runId`, `stepId`, `modelAlias`, optional `instructions`, `input`, `tools`, `responseFormat`, `reasoning`, `temperature`, `maxTokens`, `cache`, and `metadata`.

`ModelCacheControl` carries optional `prefixContent`, `kvCacheValue`, `kvCacheRef`, and metadata. Providers that support native cache handles can consume `kvCacheValue` and return a new handle through `InferenceResponse.nextKvCacheValue`.

OpenAI-compatible providers use `OpenAICompatibleProviderConfig` with `id`, `type`, `baseUrl`, `apiKey` or `apiKeyEnv`, `providerModelByAlias`, `capabilities`, and `timeoutMs`.

## Inference

`InferenceRequest` contains `runId`, `stepId`, optional `agentId`, `modelAlias`, optional `providerId`, `input`, optional `cachePolicy`, optional `prefix`, optional `kvCache`, `trace`, `metadata`, and resolved cache fields supplied by the inference manager.

`InferenceResponse` contains `id`, `output`, optional `usage`, optional cache usage, optional `nextKvCacheValue`, and optional raw provider payload. `InferenceManager.stream(providerId, request)` yields the same response envelope for streaming providers.

Cache references:

| Type | Key fields |
| --- | --- |
| `PrefixCacheRef` | `id`, `version`, `contentHash`, optional `tokenCount`, `metadata`. |
| `KvCacheRef` | `id`, `provider`, `modelAlias`, `scope`, optional `expiresAt`, `metadata`. |

`InferenceCachePolicy` supports `prefix`, `kvCache`, and `writeKvCache`. `writeKvCache` accepts a target ref, optional explicit value, and mode `write_through`, `write_if_missing`, or `refresh`.

`InferenceCacheManager` creates and reads prefix and KV cache refs. KV cache scope is `run`, `session`, or `workspace`. `InferenceManager` enforces `expiresAt` before provider calls, invalidates expired refs, annotates hit or miss metadata, and applies cache usage to non-streaming and streaming inference. On cache hits, providers receive `resolvedPrefixContent` and `resolvedKvCacheValue`; when a provider returns `nextKvCacheValue`, the manager can write it back according to `cachePolicy.writeKvCache`.

`ReasoningOrchestrator` supports `direct`, `cot`, `tot`, and `self_consistency`. `ReasoningOptions` include `branches`, `maxDepth`, `revealReasoning`, and an optional evaluator.

## Memory

`MemoryRecord` fields include `id`, `type`, `value`, `source`, `confidence`, `provenance`, `visibility`, `expiresAt`, `createdAt`, and `updatedAt`.

Supported memory types are `working`, `episodic`, `semantic`, `procedural`, `artifact`, and `governance`.

`MemoryProvider` implements `read`, `search`, `write`, `update`, `invalidate`, `summarize`, and `audit`. `MemoryScope` can include `workspaceId`, `sessionId`, `runId`, and `userId`.

## Tools, MCP, and Skills

`ToolSpec` defines `id`, `version`, `description`, `inputSchema`, optional `outputSchema`, `sideEffectLevel`, permission scope, preconditions, postconditions, timeout, retry, audit, human approval, and `source`.

`GovernedToolRunner` records tool request, policy check, approval, start, timeout, retry, completion, failure, and rejection events. It enforces input validation, default side-effect policy, optional timeout policy, retry policy, human review policy, and MCP source tracing. Tool calls return `completed`, `failed`, `denied`, or `human_review_required`.

`MCPIntegrationSpec` declares MCP servers, allowed and denied capabilities, trust policy, import policy, resource/tool/prompt policies, version pinning, and capability hashing. MCP tools are normalized to `ToolSpec` before being exposed to model/tool callers, and MCP-backed calls keep `sourceRef.serverId` and `sourceRef.capabilityId` for trace and replay.

`SkillSpec` declares activation policy, instructions, references, scripts, assets, allowed and required tools, required MCP servers, memory access policy, side-effect policy, context budget, input schema, output contract, evaluation cases, provenance, and trust level.

## Local Adapters

`@hypha/adapters-local` provides development and self-hosted adapters:

| Adapter | Storage | Purpose |
| --- | --- | --- |
| `SQLiteEventStore` | SQLite or JSON fallback | Event store and trace recorder for replay, audit, regression, and projection. Uses `node:sqlite` when available and a JSON sidecar otherwise. |
| `SQLiteStructuredStore` | SQLite or JSON fallback | JSON source-of-truth structured records with indexed tables. Uses the same `node:sqlite`/JSON fallback behavior. |
| `LocalVectorIndexProvider` | JSON file | Persistent local vector search with metadata filters. |
| `FileArtifactStore` | filesystem | Artifact bytes and hash metadata under a configured root. |
| `MockEmbeddingProvider` | deterministic vectors | Repeatable local embeddings for tests and offline development. |
