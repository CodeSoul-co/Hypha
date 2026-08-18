# Hypha feature map

Hypha is easier to understand as a sequence of explicit runtime boundaries than as one high-level Agent wrapper. This guide maps each feature to its package, source modules, principal classes/functions and a runnable example.

For every symbol and exact signature, use the [complete API reference](/api/). For application-shaped code, use the [release-agent example](/guide/examples).

## End-to-end execution path

| Stage                      | Input                                  | Main API                         | Output                                |
| -------------------------- | -------------------------------------- | -------------------------------- | ------------------------------------- |
| 1. Validate contracts      | JSON/YAML/config                       | `*SpecDefinition.parse()`        | Versioned, runtime-validated specs    |
| 2. Compile a Domain Pack   | Task, Workflow and profile definitions | `DomainPackCompiler.compile()`   | FSM process, Agent patch and bindings |
| 3. Build a Session command | User intent and idempotency key        | Session command schemas/services | Scoped command accepted once          |
| 4. Start a Run             | Session, Agent system and input        | Harness/runtime services         | `Run` identity and lifecycle Events   |
| 5. Drive ReAct + FSM       | Current snapshot and observations      | `FSMRuntime`, kernel/harness     | Allowed transitions and checkpoints   |
| 6. Execute capabilities    | Tool/MCP/Memory/Execution request      | Registry + policy + trace hooks  | Governed result and Event evidence    |
| 7. Project views           | Ordered Events                         | projectors/query services        | Session, Run and operational views    |
| 8. Replay and evaluate     | Events, fixtures and expectations      | replay/testing APIs              | Determinism and regression evidence   |

The key separation is deliberate: a Domain Pack declares product behavior; the framework compiles and runs it; Events remain the source of truth.

## 1. Specs and runtime validation

**Packages:** [`hypha-core`](/packages/core), then the spec-owning package.

**Important APIs:**

| API                                  | Kind      | Responsibility                                                                |
| ------------------------------------ | --------- | ----------------------------------------------------------------------------- |
| `defineSpecSchema()`                 | function  | Creates one versioned definition containing a parser, example and JSON Schema |
| `SpecSchemaDefinition<T>`            | interface | Shared shape exposed by `*SpecDefinition` exports                             |
| `harnessedAgentSystemSpecDefinition` | constant  | Validates the composed Agent-system boundary                                  |
| `domainPackSpecDefinition`           | constant  | Validates a Domain Pack before compilation                                    |
| `fsmProcessSpecDefinition`           | constant  | Validates states, transitions and terminal states                             |

Use `definition.parse(value)` at every untrusted boundary. TypeScript types alone do not validate YAML, HTTP payloads or stored data.

```ts
import { harnessedAgentSystemSpecDefinition } from '@codesoul-co/hypha-core';

const system = harnessedAgentSystemSpecDefinition.parse({
  ...harnessedAgentSystemSpecDefinition.example,
  id: 'system.research',
  version: '1.0.0',
});
```

See all schema exports in the [Core schemas API](/api/core/schemas) and the runnable [`core-storage` feature](/guide/examples#run-one-feature-at-a-time).

## 2. Event-first state and scope

**Packages:** [`hypha-core`](/packages/core), [`hypha-harness`](/packages/harness).

**Important APIs:**

| API                      | Kind      | Responsibility                                           |
| ------------------------ | --------- | -------------------------------------------------------- |
| `createFrameworkEvent()` | function  | Creates a framework Event with stable identity and scope |
| `EventStore`             | interface | Appends and queries durable facts                        |
| `InMemoryEventStore`     | class     | Deterministic store for tests and local composition      |
| `InMemoryTraceRecorder`  | class     | Captures ordered trace/Event evidence                    |
| `SessionProjector`       | class     | Rebuilds Session views from Events                       |

Scope flows as `userId → sessionId → runId → step/invocation`. Never reconstruct authorization scope from model output or UI state.

```ts
const event = createFrameworkEvent({
  id: 'event-1',
  type: 'run.created',
  userId: 'owner',
  sessionId: 'session-1',
  runId: 'run-1',
  payload: { agentSystemId: 'system.research' },
});
await recorder.record(event);
const sessions = new SessionProjector().project(await recorder.list());
```

`Session` is a product/context view, `Run` is one execution, and `Event` is the durable fact. See [Core events](/api/core/events) and [Harness API](/api/harness).

## 3. FSM control and recovery

**Package:** [`hypha-fsm`](/packages/fsm).

**Important APIs:**

| API                           | Kind     | Responsibility                                                      |
| ----------------------------- | -------- | ------------------------------------------------------------------- |
| `validateFSMProcessSpec()`    | function | Rejects invalid process definitions                                 |
| `analyzeFSMTopology()`        | function | Reports reachable, unreachable, dead-end and cyclic states          |
| `createInitialSnapshot()`     | function | Creates the first run-scoped FSM snapshot                           |
| `FSMRuntime`                  | class    | Applies guarded transitions and produces new snapshots              |
| `planHarnessCapabilityPath()` | function | Plans movement through framework-owned ReAct phases                 |
| recovery APIs                 | module   | Classify failures and select retry/review/quarantine/fail decisions |

```ts
const process = fsmProcessSpecDefinition.parse(fsmProcessSpecDefinition.example);
const analysis = analyzeFSMTopology(process);
const runtime = new FSMRuntime(process, 'run-1');
const next = await runtime.transition('Reasoning');
```

Product workflow states belong to a Domain Pack. Framework-owned ReAct states cannot be renamed or rewired by a Domain Pack. See [FSM control](/guide/fsm-control), [FSM API](/api/fsm) and `npm run feature -- fsm`.

## 4. ReAct Agent and kernel composition

**Package:** [`hypha-kernel`](/packages/kernel).

The kernel declares the reusable ReAct Agent contract: model routing, reasoning profile, capability references, memory profile and limits. It does not embed provider SDK calls or a hidden loop.

| API                        | Kind            | Responsibility                                    |
| -------------------------- | --------------- | ------------------------------------------------- |
| `reactAgentSpecDefinition` | constant        | Runtime parser and JSON Schema for an Agent spec  |
| `ReActAgentSpec`           | interface       | Versioned Agent configuration contract            |
| kernel exports             | functions/types | Compose reasoning and action-selection boundaries |

Validate the Agent independently, then let Domain compilation apply explicit patches/bindings. Full signatures are in the [Kernel API](/api/kernel).

## 5. Domain Pack compilation

**Package:** [`hypha-domain`](/packages/domain).

A Domain Pack owns product Task schemas, Workflow, Session defaults, Memory/Tool/Workspace profiles, policy bindings, evaluation fixtures and regression cases. It compiles into framework contracts; it does not replace the framework FSM.

| API                        | Kind       | Responsibility                                             |
| -------------------------- | ---------- | ---------------------------------------------------------- |
| `domainPackSpecDefinition` | constant   | Validates the whole versioned pack                         |
| `DomainCompiler`           | class      | Compiles workflows and bindings into runtime-owned specs   |
| compiler result types      | interfaces | Expose FSM process, Agent patch, contracts and evaluations |

The release-agent example compiles the same pack twice and asserts identical output. See [Domain API](/api/domain) and [`agent/domain-pack.yaml`](https://github.com/CodeSoul-co/Hypha/blob/main/examples/release-agent/agent/domain-pack.yaml).

## 6. Models and inference

**Packages:** [`hypha-models`](/packages/models), [`hypha-inference`](/packages/inference).

Models describes provider registration/routing. Inference describes the provider-neutral request/response execution boundary.

| API                              | Kind       | Responsibility                                                   |
| -------------------------------- | ---------- | ---------------------------------------------------------------- |
| `ModelRegistry`                  | class      | Registers and resolves model providers                           |
| `MockModelProvider`              | class      | Provides deterministic consumer tests                            |
| `modelRoutingSpecDefinition`     | constant   | Validates aliases and routing policy                             |
| `InferenceManager`               | class      | Registers inference providers and dispatches normalized requests |
| inference request/response types | interfaces | Preserve Run/Step/model scope across providers                   |

```ts
const inference = new InferenceManager();
inference.register({
  id: 'echo',
  infer: async (request) => ({ id: 'response-1', output: request.input }),
});
const response = await inference.infer('echo', {
  runId: 'run-1',
  stepId: 'step-1',
  modelAlias: 'echo',
  input: 'hello',
});
```

See [Models API](/api/models), [Inference API](/api/inference) and `npm run feature -- inference-models`.

## 7. Tools, Skills and MCP

**Packages:** [`hypha-tools`](/packages/tools), [`hypha-skills`](/packages/skills), [`hypha-mcp`](/packages/mcp).

These are three different boundaries:

- A **Tool** is a typed callable contract plus a trusted handler.
- A **Skill** is versioned, progressively loaded Agent knowledge/instructions.
- **MCP** connects allowed external servers/tools through an integration policy.

| API                            | Kind     | Responsibility                                                |
| ------------------------------ | -------- | ------------------------------------------------------------- |
| `ToolRegistry`                 | class    | Keeps Tool specs and handlers together at trusted composition |
| `toolSpecDefinition`           | constant | Validates Tool input/output, effect and policy metadata       |
| `SkillRegistry`                | class    | Registers and resolves versioned Skills                       |
| `skillSpecDefinition`          | constant | Validates Skill metadata and loading contract                 |
| `mcpIntegrationSpecDefinition` | constant | Validates MCP servers and allow-lists                         |

All side-effecting calls must pass policy, trace and harness hooks; registration alone is not authorization. See the [Tools API](/api/tools), [Skills API](/api/skills), [MCP API](/api/mcp) and `npm run feature -- capabilities`.

## 8. Memory

**Package:** [`hypha-memory`](/packages/memory).

Memory is provider-neutral and split across contracts, ingestion, retrieval, consolidation, write governance, stores, evaluation and runtime integration. Start from a `MemorySpec`/profile, then choose adapters in application composition.

| Area             | Typical module responsibility                               |
| ---------------- | ----------------------------------------------------------- |
| contracts/specs  | Versioned memory, record, query, policy and provider shapes |
| ingestion        | Normalize, segment, embed and persist bounded records       |
| retrieval        | Filter, rank and return scoped evidence                     |
| write governance | Authorize and trace memory mutations                        |
| stores/providers | Replaceable structured/vector implementations               |
| evaluation       | Measure retrieval and memory behavior against fixtures      |

Use the [Memory package guide](/packages/memory) for lifecycle examples and the [complete Memory API](/api/memory) for every class/function grouped by source module.

## 9. Storage and local adapters

**Packages:** [`hypha-storage`](/packages/storage), [`hypha-adapters-local`](/packages/adapters-local).

Storage declares topology and roles; adapters-local supplies concrete local-first implementations. The distinction keeps Core and application specs provider-neutral.

| API                             | Kind     | Responsibility                                           |
| ------------------------------- | -------- | -------------------------------------------------------- |
| `storageTopologySpecDefinition` | constant | Validates providers and storage roles                    |
| `createSQLiteStorageProfile()`  | function | Builds a SQLite source-of-truth profile                  |
| `createLocalStorageProfiles()`  | function | Composes event, structured, vector and artifact profiles |

See [Storage API](/api/storage), [local adapter API](/api/adapters-local) and `npm run feature -- core-storage`.

## 10. Serving cache

**Package:** [`hypha-serving-cache`](/packages/serving-cache).

Serving cache is an optimization around inference/serving results, not the source of truth. Cache keys include the provider/model/request dimensions required by the selected policy.

| API                   | Kind             | Responsibility                                          |
| --------------------- | ---------------- | ------------------------------------------------------- |
| `ServingCacheManager` | class            | Generates keys and coordinates get/set behavior         |
| `MemoryCacheStore`    | class            | Deterministic in-memory cache implementation            |
| cache policy/types    | interfaces/types | Describe exact/semantic cache metadata and invalidation |

Disable the cache and the Run must remain semantically correct. See [Serving Cache API](/api/serving-cache) and `npm run feature -- cache-testing`.

## 11. Harness, replay and testing

**Packages:** [`hypha-harness`](/packages/harness), [`hypha-testing`](/packages/testing).

Harness wraps runtime work with policy, trace, lifecycle and projection boundaries. Testing turns the same Event evidence into deterministic fixtures and assertions.

| API                     | Kind            | Responsibility                                           |
| ----------------------- | --------------- | -------------------------------------------------------- |
| `InMemoryTraceRecorder` | class           | Captures ordered evidence                                |
| `SessionProjector`      | class           | Rebuilds Session views                                   |
| `assertStatePath()`     | function        | Fails when an observed state path differs from a fixture |
| replay/fixture helpers  | functions/types | Re-run evidence and compare outputs/state                |

A useful test must fail when ordering, scope, state or output changes; `expect(true)` and mock-self assertions do not prove runtime behavior. See [Harness API](/api/harness), [Testing API](/api/testing) and the example contract test.

## 12. Choosing the next page

| If you need to…                    | Continue with…                            |
| ---------------------------------- | ----------------------------------------- |
| Build the first valid system       | [Getting started](/guide/getting-started) |
| Understand ownership and data flow | [Architecture](/guide/architecture)       |
| Define or drive a process          | [FSM control](/guide/fsm-control)         |
| Compose all packages               | [Full system](/guide/full-system)         |
| Run isolated feature code          | [Runnable examples](/guide/examples)      |
| Look up an exact symbol or member  | [Complete API](/api/)                     |
