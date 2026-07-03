# Local Development

hypha is a TypeScript workspace. Use Node.js 18 or newer.

## Setup

```bash
npm install
cp .env.example .env
```

The API server reads dotenv configuration. MongoDB and Redis are required for the current integration API surface. Local runtime events and structured records can use SQLite when available, with JSON fallback in local adapters.

`config.yaml` is the tracked typed configuration template. `.env` is ignored and should contain deployment-specific URLs, secrets, local paths, and CLI overrides.

Local runtime records, indexes, artifacts, and detailed system logs are written under `data/`. See [Local Data Layout](../reference/local-data-layout.md) for the default tree.

## Common Commands

| Command                       | Purpose                                                              |
| ----------------------------- | -------------------------------------------------------------------- |
| `npm run dev`                 | Build packages and start the Express API server with dotenv.         |
| `npm run build`               | Compile framework packages, API server, and CLI.                     |
| `npm run typecheck`           | Type-check packages, server, CLI, and tests.                         |
| `npm test`                    | Run unit, package, and integration tests.                            |
| `npm run test:unit`           | Run Jest unit tests.                                                 |
| `npm run test:packages`       | Run Vitest package contract tests.                                   |
| `npm run test:integration`    | Run Jest integration tests serially.                                 |
| `npm run lint`                | Lint apps, packages, and tests.                                      |
| `npm run cli -- --help`       | Run the example CLI client.                                          |
| `npm run example:local-basic` | Run the package-only local storage example without MongoDB or Redis. |

## Runtime Storage

| Area                        | Default Implementation                                                           |
| --------------------------- | -------------------------------------------------------------------------------- |
| `storage.document.mongodb`  | MongoDB permanent conversation memory and user-owned records.                    |
| `storage.messaging.redis`   | Redis temporary memory, streams, cache, and queue-ready messaging.               |
| `storage.messaging.kafka`   | Optional Kafka queue/pub-sub integration point.                                  |
| `storage.relational.sqlite` | `data/runtime/events/` and `data/runtime/structured/` with SQLite/JSON fallback. |
| `storage.vector.local`      | `data/storage/vector/` JSON-backed semantic index.                               |
| `storage.artifacts.local`   | `data/storage/artifacts/` filesystem-backed artifact store.                      |
| `logging.outputs`           | `data/logs/system.log` detailed system runtime log.                              |

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

Run the package-only local example without MongoDB or Redis:

```bash
npm run example:local-basic
```

The example builds packages, creates a temporary local SQLite/vector/artifact stack, writes a run event and semantic memory record, and prints the generated profile ids.

## Model Providers

Model provider credentials belong in `.env`; stable aliases belong in `config.yaml`.

```bash
HYPHA_LLM_DEFAULT_PROVIDER=openai
HYPHA_LLM_DEFAULT_MODEL=gpt-4o-mini
HYPHA_LLM_DEFAULT_CHAT_TARGET=openai:gpt-4o-mini
OPENAI_API_KEY=...
OPENAI_BASE_URL=https://api.openai.com/v1
```

The server exposes configured aliases such as `default-chat`, `default-fast`, and `default-reasoning` to agent runtime code. These aliases resolve to `provider:model` targets in `llm.aliases`, so package and kernel code do not need provider-specific model ids.

## Tools and MCP Fixtures

The built-in `search` tool is available without network access by default:

```bash
WEB_SEARCH_PROVIDER=stub
```

Use Wikipedia OpenSearch for a no-key HTTP search provider:

```bash
WEB_SEARCH_PROVIDER=wikipedia
WEB_SEARCH_WIKIPEDIA_ENDPOINT=https://en.wikipedia.org/w/api.php
WEB_SEARCH_TIMEOUT_MS=10000
```

Use a DuckDuckGo Instant Answer-compatible endpoint when a deployment should make real HTTP search calls through DuckDuckGo:

```bash
WEB_SEARCH_PROVIDER=duckduckgo
WEB_SEARCH_DUCKDUCKGO_ENDPOINT=https://api.duckduckgo.com/
WEB_SEARCH_TIMEOUT_MS=10000
```

Framework-level MCP examples live in `@hypha/mcp`. `createClassicMCPMockGateway()` provides executable filesystem, fetch, time, and web-search fixtures for tests. Runtime MCP servers are still configured explicitly under `tools.mcpServers` in `config.yaml`.

## Inference Backends

Agent inference backend settings live under `inference` in `config.yaml`. SGLang is the default physical backend; vLLM, llama.cpp, and OpenAI API use the same package-level interface.

```bash
HYPHA_INFERENCE_DEFAULT_BACKEND=sglang
SGLANG_BASE_URL=http://localhost:30000
VLLM_BASE_URL=http://localhost:8000
LLAMA_CPP_BASE_URL=http://localhost:8080
OPENAI_INFERENCE_BASE_URL=https://api.openai.com/v1
```

`HYPHA_INFERENCE_ALLOW_CROSS_SESSION_CACHE=false` and `HYPHA_INFERENCE_ALLOW_CROSS_AGENT_CACHE=false` keep prefix and KV cache reuse inside the current runtime boundary by default. Enable cross-boundary reuse only when the deployment has explicit tenant isolation and cache invalidation policy.

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

Do not commit `.env`, `data/`, root `logs/`, build output, `AGENTS.md`, or `docs/dev_tmp_docs/`.

## Verification Before Merge

For code changes, run:

```bash
npm run typecheck
npm test
npm run build
npm run lint
```

For package contract changes, make sure `npm run test:packages` covers the relevant spec examples, JSON schema exports, validation behavior, and runtime boundaries.
