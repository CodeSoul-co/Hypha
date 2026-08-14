# `@codesoul-co/hypha-storage`

`hypha-storage` describes storage providers and topology without coupling framework code to connection clients. It validates relational, document, event, vector, cache, queue and artifact roles, then resolves configuration in trusted composition.

```bash
npm install @codesoul-co/hypha-storage@1.0.1
```

## Main contracts

| Export | Use |
| --- | --- |
| `StorageProviderProfile` | One versioned provider and its role/capabilities |
| `StorageTopologySpec` | A set of providers plus default role references |
| `storageTopologySpecDefinition` | Runtime parser, example and JSON Schema |
| `resolveStorageConnection` | Resolve environment-backed connection values |
| `redactStorageConnection` | Produce a log-safe connection view |
| `assertStorageCapability` | Fail startup if a required capability is missing |
| `createSQLiteStorageProfile` and other factories | Create consistent provider profiles |

## Define a local topology

```ts
import {
  createFileArtifactStorageProfile,
  createLocalVectorStorageProfile,
  createSQLiteStorageProfile,
  storageTopologySpecDefinition,
} from '@codesoul-co/hypha-storage';

const eventStore = createSQLiteStorageProfile({
  id: 'storage.events',
  role: 'event_log',
  uri: 'file:./var/events.sqlite',
  database: './var/events.sqlite',
});

const topology = storageTopologySpecDefinition.parse({
  id: 'storage.local',
  version: '1.0.0',
  providers: [
    eventStore,
    createLocalVectorStorageProfile({
      id: 'storage.semantic',
      uri: 'file:./var/vectors.json',
      database: './var/vectors.json',
    }),
    createFileArtifactStorageProfile({
      id: 'storage.artifacts',
      uri: 'file:./var/artifacts',
      rootPath: './var/artifacts',
    }),
  ],
  defaults: {
    eventRef: { id: 'storage.events', version: '1.0.0' },
    vectorRef: { id: 'storage.semantic', version: '1.0.0' },
    artifactRef: { id: 'storage.artifacts', version: '1.0.0' },
  },
});
```

## Resolve secrets safely

Prefer `uriEnv`, `usernameEnv`, `passwordEnv` or secret references for deployed services. Resolution belongs in startup composition.

```ts
import {
  redactStorageConnection,
  resolveStorageConnection,
} from '@codesoul-co/hypha-storage';

const resolved = resolveStorageConnection(topology.providers[0], process.env);
console.info(redactStorageConnection(resolved));
```

Never serialize the resolved object into Domain Packs, Events or traces. A topology is portable configuration; a resolved connection is privileged runtime state.

## Provider selection

1. Select a provider by explicit reference or topology default.
2. Verify its role and required capabilities at startup.
3. Resolve credentials in trusted server code.
4. Construct the concrete adapter.
5. Expose only the provider-neutral port to the runtime.

For local development, [`hypha-adapters-local`](./adapters-local) constructs actual SQLite, vector and artifact implementations from these profiles.

## Failure handling

`classifyStorageFailure` and `adviseStorageRecovery` normalize common storage failure context. Retry only operations that are safe and idempotent; connection loss must not cause the runtime to duplicate an Event append or external write.
