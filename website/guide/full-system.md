# Compose a full system

A complete Hypha application has four explicit layers: product definitions, trusted composition, governed execution and Event-derived product views. Build them in that order so provider choices cannot leak into framework contracts.

## 1. Pin the package set

Use one release line throughout an application. The runnable example pins all packages to `1.0.1`; install only the modules you need, but do not mix incompatible versions.

```bash
npm install \
  @codesoul-co/hypha-core@1.0.1 \
  @codesoul-co/hypha-storage@1.0.1 \
  @codesoul-co/hypha-fsm@1.0.1 \
  @codesoul-co/hypha-domain@1.0.1 \
  @codesoul-co/hypha-kernel@1.0.1 \
  @codesoul-co/hypha-harness@1.0.1
```

Add Models/Inference, capability and adapter packages when the corresponding boundary is used.

## 2. Create the product definition

Keep product-owned files separate from server/provider configuration.

```text
agent/
├── domain-pack.yaml   # task/output/workflow/profile/policy definitions
├── prompt.json        # immutable prompt revision
├── skill.md           # progressively loaded skill
└── hypha.user.yaml    # deployment overlay; no secrets
src/
├── composition.ts     # trusted provider/registry wiring
├── agent.ts           # Domain compilation and Agent patch
└── api.ts             # HTTP/CLI/product surface
```

The Domain Pack contains Task/output schemas, the application Workflow, capability allow-lists, Memory/reasoning profiles, policies and regression/evaluation references. Validate it with [`hypha-domain`](/packages/domain).

## 3. Compile the Domain Pack and Agent

```ts
import {
  applyDomainAgentPatch,
  compileDomainPackToHarnessedSystem,
  loadDomainPackFile,
} from '@codesoul-co/hypha-domain';
import type { ReActAgentSpec } from '@codesoul-co/hypha-kernel';

const domainPack = await loadDomainPackFile('./agent/domain-pack.yaml');
const compiled = compileDomainPackToHarnessedSystem(domainPack, {
  agentRef: { id: 'agent.release-research', version: '1.0.0' },
  taskSchemaId: 'task.research',
  workflowId: 'workflow.research',
  memoryProfileId: 'memory.release',
  reasoningProfileId: 'reasoning.release',
  agentSkillRefs: [{ id: 'skill.release-research', version: '1.0.0' }],
  agentToolRefs: ['search'],
});

const baseAgent: ReActAgentSpec & Record<string, unknown> = {
  id: 'agent.release-research',
  version: '1.0.0',
  name: 'Release research agent',
  modelAlias: 'reasoning.primary',
};

const agent = applyDomainAgentPatch(baseAgent, compiled.agentPatch);
```

Keep the outputs distinct:

```text
DomainPack
 ├─ Agent patch ─→ Kernel ReAct Agent
 ├─ Bindings ────→ Skills / Tools / MCP / Memory / profiles
 ├─ Harness FSM ─→ protected ReAct execution lifecycle
 └─ Workflow FSM → application-owned product topology
```

## 4. Bind persistence

Local-first composition can create actual SQLite, vector and artifact stores with one call.

```ts
import { createLocalStorageBackbone } from '@codesoul-co/hypha-adapters-local';
import { EventFirstRuntime } from '@codesoul-co/hypha-harness';

const local = createLocalStorageBackbone({
  rootPath: './var/hypha',
  sqliteMode: 'sqlite',
});

const runtime = new EventFirstRuntime(local.eventStore);
await runtime.createSession({
  id: 'session-1',
  userId: 'owner',
  domainPackRef: compiled.bindings.domainPackRef,
});

await runtime.createRun({
  id: 'run-1',
  sessionId: 'session-1',
  userId: 'owner',
  domainPackRef: compiled.bindings.domainPackRef,
  workflowRef: compiled.workflowRef,
  agentRef: { id: agent.id, version: agent.version },
  input: { question: 'What changed in this release?' },
});
```

For multiple processes, replace in-memory/local coordination with durable Event, queue, lease, checkpoint and claim stores. Keep the same Core/Storage ports and scopes.

## 5. Register intelligence and capabilities

At startup, trusted code should:

1. Register Model providers and resolve `reasoning.primary` through [`hypha-models`](/packages/models) or [`hypha-inference`](/packages/inference).
2. Register Skill metadata, apply trust policy, then progressively load selected content with [`hypha-skills`](/packages/skills).
3. Register Tool specs/handlers and execute through a governed runner from [`hypha-tools`](/packages/tools).
4. Discover approved MCP capabilities and bridge them into the Tool registry with [`hypha-mcp`](/packages/mcp).
5. Bind a scoped, governed Memory manager from [`hypha-memory`](/packages/memory).
6. Optionally add [`hypha-serving-cache`](/packages/serving-cache) as a scoped projection cache.

Domain Pack allow-lists narrow what may be requested. Registries, Policy and governed runners still decide what may execute.

## 6. Wire governed execution

```text
HTTP / CLI / service command
  → per-user Session queue
  → Run manager + lease/revision
  → Harness FSM phase
  → Kernel ReAct step
  → inference or governed effect port
  → receipt + Framework Event
  → Session/Run/replay projection
```

Every Tool, MCP, Memory write, file operation and external write must produce a receipt or normalized failure Event. Cancellation and deadlines propagate through the same chain.

## 7. Expose the product surface

The repository Server implements durable command APIs. A client authenticates, waits for `/ready`, registers immutable Prompt/Skill revisions during deployment, creates or reuses a Session and submits `start-run` with an idempotency key. The initial response is command acceptance—not the final result.

For a human FSM adjustment, first read the current FSM view and submit the expected process version, state and Run revision. See [Control an FSM](/guide/fsm-control).

## 8. Observe and operate

Store/inspect the command ID, Run ID and Event IDs. Build UI and automation from projected Session/Run state, but diagnose and replay from the Event stream. Redact secrets and bound model/Tool output before telemetry.

## Release gates

Before deployment, prove:

- Domain Pack load and deterministic compilation;
- all selected package versions and dependency hashes;
- cache enabled and disabled behavior;
- replay and regression fixtures;
- invalid/stale FSM transition rejection;
- Tool/MCP/Memory denial, timeout and cancellation paths;
- user/Session/Run isolation and concurrent queue behavior;
- restart/recovery and terminal convergence;
- runtime smoke with real persistence/transports and zero skipped acceptance cases.

The [release-agent example](/guide/examples) provides the concrete files, all-package tour, deterministic contract test and HTTP/FSM clients.
