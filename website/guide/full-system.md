# Compose a full system

This is the recommended dependency order for a production composition. Each step creates a boundary consumed by the next one.

## 1. Product layer

Define a Domain Pack containing Task/output schemas, Workflow, Agent patch, capability allow-lists, Memory/reasoning profiles, policies, evaluations and deployment defaults. Validate it with `hypha-domain`.

## 2. Execution layer

Compile the Domain Pack to a Harnessed system. Apply its Agent patch, keep the protected ReAct FSM for Agent execution, and optionally map the Workflow to a separate application FSM.

```text
DomainPack
 ├─ Agent patch ─→ Kernel ReAct Agent
 ├─ Bindings ────→ Skills / Tools / Memory / Profiles
 ├─ Harness FSM ─→ Harnessed ReAct execution
 └─ Workflow ────→ optional custom FSMProcessSpec
```

## 3. Intelligence layer

Register a model provider and inference backend, then connect model aliases from the reasoning profile. Keep provider credentials in environment/secret resolution.

## 4. Capability layer

Register:

- Skills as versioned, trust-scored instruction assets.
- Tools as typed contracts plus handlers.
- MCP gateways as discovered capabilities normalized into the ToolRegistry.
- Memory providers with user/Session/Run scopes.

The Domain Pack allow-list narrows what an Agent may request. Policy still decides whether a specific invocation may execute.

## 5. Persistence and cache

For local operation, create Event SQLite, structured SQLite, vector and artifact profiles using `hypha-adapters-local`. In production, replace providers via `hypha-storage` and Memory interfaces.

Serving cache is optional and scoped. It never becomes the source of truth.

## 6. Harness wiring

Connect policy, traces, EventStore, model inference, governed Tool/MCP runners and governed Memory to the runner/runtime. Verify that every effect produces a receipt or failure Event.

## 7. API surface

The repository Server exposes durable command APIs. An application registers Prompt/Skill revisions during deployment, waits for `/ready`, creates/uses a Session, submits a Run command and follows Run Events/replay.

```text
web / CLI / service
  → Session command
  → per-user queue
  → Run + Events
  → projected Session / stream / replay
```

## 8. Release gates

Before deployment, prove:

- Domain Pack loading and deterministic compilation;
- cache enabled and disabled behavior;
- Replay and regression fixtures;
- invalid/stale FSM transition rejection;
- Tool/MCP/Memory policy denial and timeout paths;
- user/Session/Run isolation;
- runtime smoke against real persistence dependencies.

The [release-agent example](/guide/examples) implements the product definition, package tour, compilation contract and HTTP/FSM entry points.
