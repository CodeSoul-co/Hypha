# Framework API

The framework API is exposed through the TypeScript packages under `packages/*`. Application surfaces such as the HTTP server and CLI call these contracts instead of defining runtime behavior directly.

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

Common event types include `session.created`, `run.created`, `run.started`, `fsm.state.entered`, `agent.reasoning.completed`, `inference.completed`, `model.call.completed`, `tool.call.completed`, `memory.write.committed`, `eval.completed`, `replay.completed`, and `regression.completed`.

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

## Model Providers

`ModelProvider` implementations expose:

| Method | Description |
| --- | --- |
| `capabilities()` | Returns chat, streaming, tool calling, JSON mode, embedding, and reasoning support. |
| `generate(request)` | Produces a normalized model response. |
| `stream(request)` | Optional streaming event source. |
| `countTokens(input)` | Optional token accounting. |

`ModelRequest` contains `runId`, `stepId`, `modelAlias`, optional `instructions`, `input`, `tools`, `responseFormat`, `reasoning`, `temperature`, `maxTokens`, and `metadata`.

OpenAI-compatible providers use `OpenAICompatibleProviderConfig` with `id`, `type`, `baseUrl`, `apiKey` or `apiKeyEnv`, `providerModelByAlias`, `capabilities`, and `timeoutMs`.

## Inference

`InferenceRequest` contains `runId`, `stepId`, optional `agentId`, `modelAlias`, optional `providerId`, `input`, optional `prefix`, optional `kvCache`, `trace`, `metadata`, and resolved cache fields supplied by the inference manager.

`InferenceResponse` contains `id`, `output`, optional `usage`, optional cache usage, and optional raw provider payload. `InferenceManager.stream(providerId, request)` yields the same response envelope for streaming providers.

Cache references:

| Type | Key fields |
| --- | --- |
| `PrefixCacheRef` | `id`, `version`, `contentHash`, optional `tokenCount`, `metadata`. |
| `KvCacheRef` | `id`, `provider`, `modelAlias`, `scope`, optional `expiresAt`, `metadata`. |

`InferenceCacheManager` creates and reads prefix and KV cache refs. KV cache scope is `run`, `session`, or `workspace`. On cache hits, providers receive `resolvedPrefixContent` and `resolvedKvCacheValue` on the request object so adapters can inject prompt prefixes or provider-native cache handles. Cache hit metadata is applied to both non-streaming and streaming inference.

`ReasoningOrchestrator` supports `direct`, `cot`, `tot`, and `self_consistency`. `ReasoningOptions` include `branches`, `maxDepth`, `revealReasoning`, and an optional evaluator.

## Memory

`MemoryRecord` fields include `id`, `type`, `value`, `source`, `confidence`, `provenance`, `visibility`, `expiresAt`, `createdAt`, and `updatedAt`.

Supported memory types are `working`, `episodic`, `semantic`, `procedural`, `artifact`, and `governance`.

`MemoryProvider` implements `read`, `search`, `write`, `update`, `invalidate`, `summarize`, and `audit`. `MemoryScope` can include `workspaceId`, `sessionId`, `runId`, and `userId`.

## Tools, MCP, and Skills

`ToolSpec` defines `id`, `version`, `description`, `inputSchema`, optional `outputSchema`, `sideEffectLevel`, permission scope, preconditions, postconditions, timeout, retry, audit, human approval, and `source`.

`GovernedToolRunner` records tool request, policy check, approval, start, timeout, retry, completion, failure, and rejection events. It enforces input validation, default side-effect policy, optional timeout policy, retry policy, human review policy, and MCP source tracing. Tool calls return `completed`, `failed`, `denied`, or `human_review_required`.

`MCPIntegrationSpec` declares MCP servers, allowed and denied capabilities, trust policy, import policy, resource/tool/prompt policies, version pinning, and capability hashing.

`SkillSpec` declares activation policy, instructions, references, scripts, assets, allowed and required tools, required MCP servers, memory access policy, side-effect policy, context budget, input schema, output contract, evaluation cases, provenance, and trust level.

## Local Adapters

`@hypha/adapters-local` provides development and self-hosted adapters:

| Adapter | Storage | Purpose |
| --- | --- | --- |
| `SQLiteEventStore` | SQLite | Event store and trace recorder for replay, audit, regression, and projection. |
| `SQLiteStructuredStore` | SQLite | JSON source-of-truth structured records with indexed tables. |
| `LocalVectorIndexProvider` | JSON file | Persistent local vector search with metadata filters. |
| `FileArtifactStore` | filesystem | Artifact bytes and hash metadata under a configured root. |
| `MockEmbeddingProvider` | deterministic vectors | Repeatable local embeddings for tests and offline development. |
