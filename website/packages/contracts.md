# Contracts: Core & Storage

These packages define shared language. Import their specs at composition boundaries; keep provider SDK objects outside the contracts.

## [`hypha-core`](./core)

Use Core for versioned system specs, framework Events, in-memory Event storage and policy primitives.

```ts
import {
  createFrameworkEvent,
  harnessedAgentSystemSpecDefinition,
} from '@codesoul-co/hypha-core';

const system = harnessedAgentSystemSpecDefinition.parse(
  harnessedAgentSystemSpecDefinition.example,
);

const created = createFrameworkEvent({
  id: 'event-1',
  type: 'run.created',
  userId: 'owner',
  sessionId: 'session-1',
  runId: 'run-1',
  payload: { agentSystemId: system.id },
});
```

An Event carries the user, Session and Run scopes required for audit and replay. Do not store the authoritative runtime state only on a Session record.

**Use when:** you publish a framework-facing contract, create evidence, evaluate policy or need an in-memory EventStore for tests.

## [`hypha-storage`](./storage)

Storage profiles describe topology without handing credentials to framework code. Resolution happens in trusted composition; redaction happens before logging.

```ts
import {
  createSQLiteStorageProfile,
  redactStorageConnection,
  resolveStorageConnection,
  storageTopologySpecDefinition,
} from '@codesoul-co/hypha-storage';

const sqlite = createSQLiteStorageProfile({
  id: 'storage.events',
  role: 'source_of_truth',
  uri: 'file:./var/events.sqlite',
  database: './var/events.sqlite',
});

const topology = storageTopologySpecDefinition.parse({
  ...storageTopologySpecDefinition.example,
  providers: [sqlite],
});

const safe = redactStorageConnection(
  resolveStorageConnection(topology.providers[0], process.env),
);
```

Use separate roles for authoritative Events, structured projections, vectors and artifacts. A resolved connection is runtime configuration—not a value to serialize into an Event or trace.

## Composition rule

```text
Spec in Core/Storage
  → validate at application boundary
  → resolve provider in trusted composition
  → emit scoped Event
  → derive Session/read models
```
