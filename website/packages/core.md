# `@codesoul-co/hypha-core`

`hypha-core` is the contract layer shared by every Hypha runtime. It contains versioned specs, runtime schemas, framework Events, IDs, policy contracts, execution/storage ports, artifact contracts and provider-neutral runtime primitives.

```bash
npm install @codesoul-co/hypha-core@1.0.1
```

## What belongs here

Use Core when code must agree on a stable shape without importing a provider SDK.

| Area | Representative exports | Purpose |
| --- | --- | --- |
| Specs | `defineSpecSchema`, `harnessedAgentSystemSpecDefinition` | Keep TypeScript, Zod and JSON Schema aligned |
| Events | `createFrameworkEvent`, `FrameworkEvent`, `EventStore` | Record scoped facts for audit and replay |
| Runtime | `DurableEventRuntime`, runtime message/checkpoint schemas | Coordinate event-first execution |
| Policy | `PolicyEngine`, `PolicyDecision`, `RiskLevel` | Describe authorization decisions |
| Execution | `ExecutionPort`, `ExecutionStore`, sandbox contracts | Keep execution implementations replaceable |
| Artifacts | `ArtifactStoreProvider`, `ArtifactManager` | Govern durable output and lineage |

Business workflows, provider credentials and UI state do **not** belong in Core.

## Create and query Events

Every Event is scoped by `userId`; Run Events should also carry `sessionId` and `runId`. The Event log is the source of truth, while Session and Run objects are projections.

```ts
import {
  InMemoryEventStore,
  createFrameworkEvent,
} from '@codesoul-co/hypha-core';

const events = new InMemoryEventStore();

await events.append(createFrameworkEvent({
  id: 'event-run-created-1',
  type: 'run.created',
  userId: 'owner',
  sessionId: 'session-1',
  runId: 'run-1',
  payload: { agentSystemId: 'system.research' },
}));

const runEvents = await events.list({
  userId: 'owner',
  sessionId: 'session-1',
  runId: 'run-1',
});
```

Do not put secrets, unbounded model output or host paths in Event payloads. Redact and bound them before persistence.

## Validate a versioned system spec

Spec definitions expose the runtime parser, example and JSON Schema from one definition.

```ts
import { harnessedAgentSystemSpecDefinition } from '@codesoul-co/hypha-core';

const system = harnessedAgentSystemSpecDefinition.parse({
  ...harnessedAgentSystemSpecDefinition.example,
  id: 'system.publication',
  version: '1.0.0',
});

const jsonSchema = harnessedAgentSystemSpecDefinition.jsonSchema;
```

Parse untrusted JSON/YAML at the application boundary. Internal code can then depend on the inferred TypeScript type.

## Runtime invariants

- Preserve `userId`, Session, Run, invocation and workspace scope through every port.
- Append facts before projecting user-facing state.
- Use revisions, leases or compare-and-set contracts where multiple workers may act.
- Route Tool, MCP, Memory, file and external writes through policy and trace hooks.
- Treat schema/version changes as compatibility work; add an upcaster or migration instead of silently reinterpreting old Events.

## Testing

Use `InMemoryEventStore`, in-memory runtime stores and deterministic helpers for contract tests. A useful test asserts the Event payload and the resulting projection; it should fail if either scope or ordering changes.

## Related packages

- [`hypha-storage`](./storage) describes storage topology.
- [`hypha-harness`](./harness) runs and projects Event-first execution.
- [`hypha-testing`](./testing) captures and replays traces.

