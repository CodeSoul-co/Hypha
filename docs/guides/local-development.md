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

Package-level local adapter behavior is covered by `npm run test:packages`. Treat those tests as the maintained contract for local storage instead of relying on standalone demo scripts.

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

The built-in `filesystem` tool uses independent allowlists for reading,
writing, and executing files. Multiple paths are comma-separated. Request
paths are resolved from `HYPHA_FILESYSTEM_WORKING_DIRECTORY`; absolute paths
are accepted only when they remain inside the corresponding allowlist.

```bash
HYPHA_FILESYSTEM_WORKING_DIRECTORY=.
HYPHA_FILESYSTEM_READ_PATHS=.,./shared
HYPHA_FILESYSTEM_WRITE_PATHS=./data/workspace
HYPHA_FILESYSTEM_EXECUTE_PATHS=./data/workspace/bin
HYPHA_FILESYSTEM_EXECUTION_ENABLED=false
HYPHA_FILESYSTEM_EXECUTION_TIMEOUT_MS=30000
HYPHA_FILESYSTEM_MAX_OUTPUT_BYTES=1048576
```

Execution calls an allowlisted executable directly without a shell. To write
and then run a script, write it under both the write and execute paths with
`"executable": true`, then explicitly enable execution. Arguments must be
supplied through `args`. Filesystem calls still pass through normal tool policy
and event tracing. The path allowlist is not an OS process sandbox; use a
container or dedicated worker when executing untrusted code.

The built-in `search` tool is available without network access by default:

```bash
WEB_SEARCH_PROVIDER=stub
```

Use mainland China no-key HTTP providers when DuckDuckGo or Wikipedia are slow
or blocked by the local network:

```bash
WEB_SEARCH_PROVIDER=china
WEB_SEARCH_CHINA_PROVIDER_ORDER=baidu,so360,stub
WEB_SEARCH_BAIDU_SUGGEST_ENDPOINT=https://www.baidu.com/sugrec
WEB_SEARCH_SO360_SUGGEST_ENDPOINT=https://sug.so.360.cn/suggest
WEB_SEARCH_TIMEOUT_MS=10000
```

Use Wikipedia OpenSearch for a no-key HTTP search provider:

```bash
WEB_SEARCH_PROVIDER=wikipedia
WEB_SEARCH_WIKIPEDIA_ENDPOINT=https://en.wikipedia.org/w/api.php
WEB_SEARCH_TIMEOUT_MS=10000
```

Use automatic fallback for local real-network testing. This tries DuckDuckGo
first and falls back to Wikipedia or the offline stub if the local network
blocks a provider:

```bash
WEB_SEARCH_PROVIDER=auto
WEB_SEARCH_PROVIDER_ORDER=duckduckgo,wikipedia,stub
WEB_SEARCH_FALLBACK_PROVIDERS=wikipedia,stub
```

Use a DuckDuckGo Instant Answer-compatible endpoint when a deployment should make real HTTP search calls through DuckDuckGo:

```bash
WEB_SEARCH_PROVIDER=duckduckgo
WEB_SEARCH_DUCKDUCKGO_ENDPOINT=https://api.duckduckgo.com/
WEB_SEARCH_FALLBACK_PROVIDERS=wikipedia,stub
WEB_SEARCH_TIMEOUT_MS=10000
```

`config.yaml` enables the in-process classic MCP fixture by default:

```yaml
tools:
  mcpServers:
    - id: 'classic'
      name: 'Classic MCP Fixture'
      mode: 'fixture'
      autoConnect: true
```

The fixture exposes `filesystem.read_file`, `fetch.fetch`, `time.now`,
`search.web_search`, `baidu.web_search`, and `so360.web_search` through the
same governed `/tools/execute` path as remote or stdio MCP servers. Replace
`mode: "fixture"` with `mode: "local"` plus `command`/`args`, or
`mode: "remote"` plus `endpoint` and optional `authToken` for deployment MCP
servers.

Tool result caching is disabled by default. Use the bounded in-process Store for one process, or
the configured Redis connection for multi-process/local/cloud deployments:

```bash
HYPHA_TOOL_RESULT_CACHE=memory
# or
HYPHA_TOOL_RESULT_CACHE=redis
HYPHA_TOOL_RESULT_CACHE_FAILURE_MODE=bypass
HYPHA_TOOL_RESULT_CACHE_TIMEOUT_MS=250
```

Only Tool contracts with an explicit result-cache policy participate. A `read` Tool call must also
supply a stable `externalStateVersion`; this prevents TTL alone from being treated as proof that an
external resource is unchanged.

```bash
npm run dev
npm run cli -- tools
npm run cli -- exec filesystem.read_file -p '{"path":"/README.md"}'
npm run cli -- exec baidu.web_search -p '{"query":"hypha","limit":1}'
npm run cli -- exec search.web_search -p '{"query":"hypha","limit":1}'
```

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
