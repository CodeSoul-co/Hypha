# `@codesoul-co/hypha-adapters-local`

`hypha-adapters-local` provides concrete local-first implementations for Events, structured/vector memory, artifacts, execution, workspaces and runtime coordination. It is useful for development, single-node deployment and deterministic integration tests.

```bash
npm install @codesoul-co/hypha-adapters-local@1.0.1
```

## Main adapter families

| Family | Representative exports |
| --- | --- |
| Storage backbone | `createLocalStorageBackbone`, `createLocalStorageProfiles` |
| Events/structured/vector | `SQLiteEventStore`, `SQLiteStructuredStore`, `LocalVectorIndexProvider` |
| Artifacts | `FileArtifactStore`, filesystem/in-memory artifact repositories |
| Execution | `LocalProcessExecutionProvider`, Docker and remote sandbox factories |
| Workspace | `LocalWorkspaceRuntime`, `LocalWorkspaceAdapter` |
| Coordination | SQLite queue, lease, checkpoint, capacity and claim stores |
| Production adapters | PostgreSQL execution store, Redis cache, S3 artifact factory |

## Create profiles only

Profiles are portable topology declarations and do not open stores.

```ts
import { createLocalStorageProfiles } from '@codesoul-co/hypha-adapters-local';

const profiles = createLocalStorageProfiles({
  eventDbFilename: './var/events.sqlite',
  structuredDbFilename: './var/structured.sqlite',
  vectorFilename: './var/vectors.json',
  artifactRootPath: './var/artifacts',
});
```

## Create a working local backbone

```ts
import { createLocalStorageBackbone } from '@codesoul-co/hypha-adapters-local';

const local = createLocalStorageBackbone({
  rootPath: './var/hypha',
  sqliteMode: 'sqlite',
});

await local.eventStore.append(/* scoped FrameworkEvent */);
```

The returned object includes validated profiles plus concrete Event, structured, vector, artifact, embedding and hybrid-memory implementations.

## Execution safety

Local process and Docker adapters are not permission boundaries by themselves. Compose them behind Core execution contracts and Tool/Harness governance. Restrict commands, environment, workspace paths, network access, resources, deadlines and output size. Always clean up containers/processes after cancellation or crash recovery.

## Persistence modes

SQLite adapters can use native SQLite or a JSON fallback depending on configuration/runtime support. Choose explicitly in release acceptance tests so an accidental fallback cannot masquerade as the production backend.

## Multi-process deployment

In-memory adapters are process-local. For multiple server instances, use durable Event/execution stores and shared queue/lease/capacity implementations. Preserve the same `userId`, Session, Run and revision rules across providers.

## Testing

Use temporary directories, close/reopen stores to prove durability, inject failures, and verify path traversal, cleanup and crash recovery. Real Docker/PostgreSQL/Redis/S3 acceptance tests must run with zero skipped cases before claiming those providers are release-ready.
