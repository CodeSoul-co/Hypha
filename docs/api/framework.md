# Framework API

The framework API is exposed through the TypeScript packages under `packages/*`. Application surfaces such as the HTTP server and CLI call these contracts instead of defining runtime behavior directly.

## Documentation Map

- [Architecture Reference](../reference/architecture.md) explains package responsibilities, harness semantics, and extension boundaries.
- [Runtime Model](../reference/runtime-model.md) explains event-first execution, FSM transitions, ReAct phases, side effects, and concurrency.
- [Domain Packs](../guides/domain-packs.md) provides a field-level guide and minimal declaration example.
- [Local Development](../guides/local-development.md) lists setup, storage, and verification commands.

## Package Boundary Summary

| Package                 | Public Surface                                                                                                             |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `@hypha/core`           | Spec primitives, schema definitions, events, errors, policy interfaces.                                                    |
| `@hypha/storage`        | `StorageProviderProfile`, `StorageTopologySpec`, connection resolution, SQLite/MongoDB/Redis/Kafka/vector profile helpers. |
| `@hypha/domain`         | `DomainPackSpec`, `WorkflowSpec`, `SessionProfileSpec`, loader, overlay, registry, and DomainPack compiler APIs.           |
| `@hypha/fsm`            | `FSMProcessSpec`, `FSMSnapshot`, `FSMRuntime`, guarded transitions, timeout/retry/human-review helpers.                    |
| `@hypha/kernel`         | `ReActAgentSpec`, `ReActRunner`, `ReActAgentRunner`, context builder and verifier interfaces.                              |
| `@hypha/inference`      | Prompt compiler, prefix segmenter, Plasmod hot layer, backend registry, cache providers, reasoning orchestration.          |
| `@hypha/models`         | `ModelProvider`, normalized model requests/responses, OpenAI-compatible adapters.                                          |
| `@hypha/tools`          | `ToolSpec`, `ToolRegistry`, `GovernedToolRunner`, `MockToolRunner`, schema validation, side-effect governance.             |
| `@hypha/mcp`            | `MCPIntegrationSpec`, `MockMCPGateway`, capability discovery, and MCP tool registration into governed tool runners.        |
| `@hypha/memory`         | `MemoryProvider`, `MemoryManager`, scopes, records, hybrid memory.                                                         |
| `@hypha/skills`         | `SkillSpec`, local skill loading, selection, context loading, activation policy, and skill policy.                         |
| `@hypha/harness`        | Event-first runtime views, `RunManager`, ReAct/FSM runner, queues, replay/audit/regression projections.                    |
| `@hypha/adapters-local` | SQLite/JSON/file/vector local adapters.                                                                                    |
| `@hypha/testing`        | Deterministic evaluators, output contract validation, replay fixtures, trace diffs, and regression runners.                |

Harness is a system-level architecture concept, not a reason to collapse every runtime primitive into one package. Keep FSM semantics independent, keep app surfaces outside packages, and use harness APIs for event-derived runtime views and governance evidence.

## Spec Schemas

Framework specs expose a common validation surface: `*SpecSchema` for Zod validation, `*SpecJsonSchema` for external tooling, `*SpecDefinition` for bundled schema/example metadata, `*SpecExample` for fixtures, and `validate*Spec(input)` for typed parsing.

Schema exports are available for `HarnessedAgentSystemSpec`, `PolicySpec`, `OutputContractSpec`, `ContextSpec`, `TraceSpec`, `EvaluationSpec`, `ReplaySpec`, `RegressionSpec`, `DeploymentSpec`, `StorageProviderProfile`, `StorageTopologySpec`, `ReActAgentSpec`, `ModelProviderSpec`, `ModelAliasSpec`, `ModelRoutingSpec`, `ToolSpec`, `MemorySpec`, `FSMProcessSpec`, `SkillSpec`, `MCPIntegrationSpec`, `WorkflowSpec`, and `DomainPackSpec`.

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

Common event types include `session.created`, `run.created`, `run.started`, `run.waiting_human`, `fsm.state.entered`, `react.step.completed`, `agent.reasoning.completed`, `inference.completed`, `model.call.completed`, `tool.call.completed`, `memory.write.committed`, `eval.completed`, `replay.completed`, and `regression.completed`.

Side-effecting runtime operations also emit phase events. Tool execution records request, policy, approval, start, timeout, retry, completion, failure, or rejection. MCP-backed tools additionally record MCP call start, completion, and failure. Memory reads and writes record requested/completed or requested/validated/committed/rejected phases.

`RunManager` is the package-level writer for event-first run execution. It creates sessions and runs, records `run.started`, writes `fsm.transition.accepted` and `fsm.state.entered`, records `react.step.completed`, marks human-review waits with `run.waiting_human`, and finalizes runs with `run.completed` or `run.failed`.

## Evaluation, Replay, and Regression

`@hypha/testing` provides deterministic runtime verification APIs. These APIs derive results from events and supplied contracts; they do not call models, tools, or MCP servers during evaluation.

| API                          | Description                                                                                                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `OutputContractValidator`    | Validates a terminal output against an `OutputContractSpec.schema` using deterministic JSON Schema subset checks.                 |
| `TraceCompletenessEvaluator` | Checks event envelopes, required `TraceSpec.eventTypes`, terminal run events, and lifecycle start/end pairs.                      |
| `DeterministicEvaluator`     | Runs output contract, trace, schema, process, tool trace, policy, and regression checks as one summary.                           |
| `ReplayEngine.capture()`     | Captures a run into a `ReplayFixture` from supplied events or an `EventStore`, applying `ReplaySpec` capture flags.               |
| `ReplayEngine.replay()`      | Reconstructs replay projection from fixture events only.                                                                          |
| `ReplayEngine.compare()`     | Produces trace diffs for event type sequence, state path, model calls, tool calls, policy decisions, memory read set, and output. |
| `RegressionRunner.runSpec()` | Resolves `RegressionSpec.fixtureRefs` and runs required checks against replay fixtures and optional actual events.                |

`ReplayFixture` fields include `id`, `version`, `runId`, `createdAt`,
`events`, `eventTypes`, `statePath`, optional `finalOutput`, `toolCalls`,
`policyDecisions`, `memoryReadSet`, optional `outputContract`, and optional
metadata. Use fixture ids that match `RegressionSpec.fixtureRefs`.

`RegressionSpec.requiredChecks` supports `event_types`, `state_path`,
`tool_calls`, `policy_decisions`, and `output_contract`. If a fixture carries an
`outputContract`, `output_contract` validates the actual replay output against
that contract; otherwise it compares expected and actual final outputs.

## Workflow and FSM

`WorkflowSpec` fields:

| Field            | Type                       | Description                                                    |
| ---------------- | -------------------------- | -------------------------------------------------------------- |
| `initialState`   | string                     | First workflow state.                                          |
| `terminalStates` | string[]                   | States that end the workflow.                                  |
| `states`         | `WorkflowStateSpec[]`      | State goals, contracts, policies, tools, skills, and timeouts. |
| `transitions`    | `WorkflowTransitionSpec[]` | Allowed state transitions and guards.                          |

`compileWorkflowToFSM(domainPack, options)` converts a DomainPack workflow into `FSMProcessSpec`. `FSMProcessSpec` uses `initialState`, `states`, `transitions`, and `terminalStates`; `FSMSnapshot` records `processId`, `runId`, `currentState`, `statePath`, `status`, and `updatedAt`.

`WorkflowStateSpec.allowedSkills` narrows which agent-bound skills may activate
in that state. `requiredSkills` declares skills that must be attached to the
compiled agent patch and treated as mandatory state activations; when a state
also declares `allowedSkills`, every required skill must be included there. If
a required skill is missing, unavailable, or denied by skill policy, context
building fails before model inference.

FSM runtime helpers include `applyTransitionWithRuntimePolicy`, `evaluateGuardExpression`, `evaluateStateTimeout`, and `canRetryState`. Guards support deterministic boolean literals, `default`, `else:<guard>`, variable paths, `!`, `&&`, `||`, equality, numeric comparison, `exists(path)`, and `matches(path, pattern)`. Transitions can be rejected by guards, policy, or human-review requirements.

`FSMRuntime` owns one `FSMSnapshot` for a run and exposes `start()`, `transition(to, options)`, `transitionPath(states, options)`, and `getSnapshot()`. Runtime callbacks `onTransition` and `onStateEntered` allow harness code to record trace events without putting storage or event-log dependencies inside the FSM package.

`defaultReActFSMProcessSpec` declares the minimal agent closure:

```text
Idle -> RunInitialized -> ContextBuilt -> Reasoning -> ActionSelected
  -> PolicyChecked -> Acting -> ObservationRecorded -> Verifying -> Completed
```

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

`MemoryRecord` fields include `id`, `type`, `value`, `source`, `confidence`, `provenance`, `visibility`, `expiresAt`, `createdAt`, and `updatedAt`.

Supported memory types are `working`, `episodic`, `semantic`, `procedural`, `artifact`, and `governance`.

`MemoryProvider` implements `read`, `search`, `write`, `update`, `invalidate`, `summarize`, and `audit`. `MemoryScope` can include `workspaceId`, `sessionId`, `runId`, and `userId`.

## Tools, MCP, and Skills

`ToolSpec` defines `id`, `version`, `description`, `inputSchema`, optional `outputSchema`, `sideEffectLevel`, permission scope, preconditions, postconditions, timeout, retry, audit, human approval, and `source`.

`ToolRegistry.register(spec, handler)` validates `ToolSpec` before making a tool executable. `validateToolInput(schema, input)` validates recursive JSON Schema features used by tool contracts, including nested objects, arrays, required fields, enum, type checks, `additionalProperties`, string length/pattern, and numeric bounds.

`GovernedToolRunner` records tool request, policy check, approval, start, timeout, retry, completion, failure, and rejection events. It enforces input validation, output validation, default side-effect policy, optional timeout policy, retry policy, human review policy, and MCP source tracing. Tool calls return `completed`, `failed`, `denied`, or `human_review_required`. Tool trace payloads include `source`, `sourceRef`, `sideEffectLevel`, and `permissionScope` so local and MCP execution are auditable even when policy blocks the call.

Application-level local tools can expose `ITool.governance` metadata. `ToolManager.describeTool()` carries that metadata into server ReAct, workflow, and direct HTTP tool execution, so local tools and MCP tools use the same `ToolSpec` governance path.

The built-in server `search` tool is a governed local tool with `permissionScope: ["web.search"]`. It defaults to deterministic offline results. Set `WEB_SEARCH_PROVIDER=auto` to try `WEB_SEARCH_PROVIDER_ORDER` with fallback, `WEB_SEARCH_PROVIDER=china` to prefer `WEB_SEARCH_CHINA_PROVIDER_ORDER` (`baidu,so360,stub` by default), `WEB_SEARCH_PROVIDER=baidu` or `so360` for mainland China no-key suggest providers, `WEB_SEARCH_PROVIDER=wikipedia` for Wikipedia OpenSearch, or `WEB_SEARCH_PROVIDER=duckduckgo` for a DuckDuckGo Instant Answer-compatible endpoint. `WEB_SEARCH_FALLBACK_PROVIDERS`, provider-specific endpoints, `WEB_SEARCH_TIMEOUT_MS`, and `WEB_SEARCH_USER_AGENT` control deployment-specific transport details.

`MCPIntegrationSpec` declares MCP servers, allowed and denied capabilities, trust policy, import policy, resource/tool/prompt policies, version pinning, and capability hashing. `MockMCPGateway` supports capability discovery and mock tool handlers. `registerMCPGatewayTools({ integration, gateway, registry, trace, traceContext })` discovers MCP capabilities, records `mcp.capability.discovered`, normalizes tool capabilities to `ToolSpec`, records `mcp.tool.normalized`, and registers handlers into the same `ToolRegistry` used by local tools. MCP-backed calls keep `sourceRef.serverId` and `sourceRef.capabilityId` for trace and replay.

`@hypha/mcp` exports `classicMCPIntegrationSpec`, `classicMCPCapabilityDescriptors`, and `createClassicMCPMockGateway()` for deterministic MCP fixtures. The preset covers `filesystem.read_file`, `fetch.fetch`, `time.now`, `search.web_search`, `baidu.web_search`, and `so360.web_search`; each capability normalizes to `ToolSpec` and runs through `GovernedToolRunner` with normal policy, schema validation, and trace events.

The API server registers runtime MCP clients from `tools.mcpServers` in
`config.yaml`. Supported modes are `fixture` for the in-process classic gateway,
`local` for stdio MCP servers with `command` and `args`, and `remote` for HTTP
gateways with `endpoint` and optional bearer `authToken`. Server MCP tools are
published through `/tools`, `/tools/mcp/tools`, ReAct chat, workflow stages, and
`POST /tools/execute` using normalized names such as `search.web_search`.

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

## Memory and Context

`@hypha/memory` exposes `MemoryManager` over any `MemoryProvider`. The manager enforces write policy before provider side effects and can record standard trace events when constructed with a `TraceRecorder`:

```ts
const manager = new MemoryManager(storage.memory, { trace: storage.eventStore });

await manager.write(scope, record, {
  requireProvenance: true,
  allowLongTerm: true,
});
```

`MemoryRecord` requires `id`, `type`, `value`, `provenance`, and `createdAt`. Long-term records such as `episodic`, `semantic`, and `procedural` require `allowLongTerm: true`; `requireProvenance: true` rejects records without provenance. Reads and searches emit `memory.read.requested` and `memory.read.completed`; writes emit `memory.write.requested`, `memory.write.validated`, and `memory.write.committed` or `memory.write.rejected`.

`@hypha/kernel` provides `MemoryContextBuilder` for model context construction. It retrieves memory through `MemoryManager.search()`, enforces configured `memoryTypes`, applies `ContextBudget` (`maxMessages`, `maxMemoryItems`, `maxMemoryChars`, `maxTotalChars`), tags each included record with `ContextProvenance`, and prepends a system context message with clear data/instruction boundaries. Use `createEpisodicMemorySync()` with `ReActRunner` when verified observations should become episodic memory.

## Local Adapters

`@hypha/adapters-local` provides development and self-hosted adapters:

| Adapter                    | Storage                 | Purpose                                                                                                                                                                                      |
| -------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SQLiteEventStore`         | SQLite or JSON fallback | Event store and trace recorder for replay, audit, regression, and projection. Uses `node:sqlite` when available, otherwise `better-sqlite3`, with JSON sidecar fallback only in `auto` mode. |
| `SQLiteStructuredStore`    | SQLite or JSON fallback | Structured source-of-truth records with indexed tables. Uses the same SQLite/JSON fallback behavior.                                                                                         |
| `LocalVectorIndexProvider` | JSON file               | Persistent local vector search with metadata filters.                                                                                                                                        |
| `FileArtifactStore`        | filesystem              | Artifact bytes and hash metadata under a configured root.                                                                                                                                    |
| `MockEmbeddingProvider`    | deterministic vectors   | Repeatable local embeddings for tests and offline development.                                                                                                                               |

`createLocalStorageBackbone(options)` returns a complete local stack: `eventStore`, `structured`, `vector`, `artifacts`, `embeddings`, `memory`, and storage `profiles`. Use it when a local runtime needs event persistence, structured memory, semantic recall, and artifact storage without wiring each adapter manually.
