# Local Development

hypha is a TypeScript workspace. Use Node.js 18 or newer.

## Setup

```bash
npm install
cp .env.example .env
```

The API server reads dotenv configuration. MongoDB and Redis are required for the current integration API surface. Local runtime events and structured records can use SQLite when available, with JSON fallback in local adapters.

## Configuration Model

`config.yaml` is the tracked typed configuration template. It defines app structure, model catalogs, storage profiles, auth mode, tools, skills, logging, and defaults. Values that vary by deployment are expressed as `${VAR:default}`.

`.env` is ignored and should only contain deployment overrides, credentials, provider URLs, local storage paths, and CLI preferences. Keep secrets such as `JWT_SECRET`, `OPENAI_API_KEY`, `MONGODB_URI`, and `REDIS_URL` out of `config.yaml`.

Use the namespaced storage env vars for new deployments:

```bash
HYPHA_STORAGE_EVENT_DB=./data/hypha-runtime-events.sqlite
HYPHA_STORAGE_STRUCTURED_DB=./data/hypha-structured.sqlite
HYPHA_STORAGE_VECTOR_INDEX=./data/hypha-vectors.json
HYPHA_STORAGE_ARTIFACT_ROOT=./data/artifacts
```

The config resolver accepts `${PRIMARY|LEGACY:default}` aliases for migration, but new templates should use the `HYPHA_STORAGE_*` names.

## Common Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Build packages and start the Express API server with dotenv. |
| `npm run build` | Compile framework packages, API server, and CLI. |
| `npm run typecheck` | Type-check packages, server, CLI, and tests. |
| `npm test` | Run unit, package, and integration tests. |
| `npm run test:unit` | Run Jest unit tests. |
| `npm run test:packages` | Run Vitest package contract tests. |
| `npm run test:integration` | Run Jest integration tests serially. |
| `npm run lint` | Lint apps, packages, and tests. |
| `npm run cli -- --help` | Run the example CLI client. |

## Runtime Storage

| Area | Default Implementation |
| --- | --- |
| Temporary chat memory | Redis, keyed by user and session. |
| Permanent conversation memory | MongoDB. |
| Runtime events | `SQLiteEventStore` from `@hypha/adapters-local`, with JSON fallback. |
| Structured local records | `SQLiteStructuredStore`, with JSON fallback. |
| Local vector index | JSON-backed `LocalVectorIndexProvider`. |
| Artifacts | Filesystem-backed `FileArtifactStore`. |

`createLocalStorageBackbone()` from `@hypha/adapters-local` creates the local storage stack in one call:

```ts
import { createLocalStorageBackbone } from '@hypha/adapters-local';

const storage = createLocalStorageBackbone({
  rootPath: './data/storage',
  sqliteMode: 'auto',
});

await storage.memory.write(scope, record, { requireProvenance: true });
```

The returned object includes `eventStore`, `structured`, `vector`, `artifacts`, `embeddings`, `memory`, and storage `profiles`.

## MongoDB and Redis

MongoDB supports local host/port settings or a cloud URI:

```bash
MONGODB_URI=mongodb+srv://...
MONGODB_DEPLOYMENT=cloud
```

Redis supports local host/port settings or provider URLs:

```bash
REDIS_URL=rediss://...
REDIS_DEPLOYMENT=cloud
REDIS_TLS=true
```

Do not commit `.env`, local data, logs, build output, `AGENTS.md`, or `docs/dev_tmp_docs/`.

## Verification Before Merge

For code changes, run:

```bash
npm run typecheck
npm test
npm run build
npm run lint
```

For package contract changes, make sure `npm run test:packages` covers the relevant spec examples, JSON schema exports, validation behavior, and runtime boundaries.
