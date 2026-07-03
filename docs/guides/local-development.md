# Local Development

hypha is a TypeScript workspace. Use Node.js 18 or newer.

## Setup

```bash
npm install
cp .env.example .env
```

The API server reads dotenv configuration. MongoDB and Redis are required for the current integration API surface. Local runtime events and structured records can use SQLite when available, with JSON fallback in local adapters.

`config.yaml` is the tracked typed configuration template. `.env` is ignored and should contain deployment-specific URLs, secrets, local paths, and CLI overrides.

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
| `storage.document.mongodb` | MongoDB permanent conversation memory and user-owned records. |
| `storage.messaging.redis` | Redis temporary memory, streams, cache, and queue-ready messaging. |
| `storage.messaging.kafka` | Optional Kafka queue/pub-sub integration point. |
| `storage.relational.sqlite` | Local event and structured record stores with SQLite/JSON fallback. |
| `storage.vector.local` | JSON-backed local semantic vector index. |
| `storage.artifacts.local` | Filesystem-backed artifact store. |

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

## Local and Cloud Overrides

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

Kafka, Postgres, Qdrant, Chroma, Pinecone, and S3-compatible artifact stores are declared in `config.yaml` but disabled by default. Enable them through `.env` only when a concrete adapter is available for the deployment.

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
