# Complete API reference

This reference documents every public export from the current Hypha npm package entrypoints, grouped by package and source module. Each module explains its purpose and entrypoint imports; each symbol entry includes its TypeScript declaration, source location, function parameters and return type, or the public members of its class, interface, or enum.

> Source of record: These pages are generated from built TypeScript declarations by `npm run docs:api`. Functions, classes, interfaces, types and enums retain complete declarations. Compiler-expanded constant types longer than 4,000 characters are compacted for readability and retain a source link.

## Package index

| Package | API scope |
| --- | --- |
| [`@codesoul-co/hypha-core`](/api/core) | Shared contracts, schemas, Events, policy and runtime ports. |
| [`@codesoul-co/hypha-storage`](/api/storage) | Provider-neutral storage topology contracts and profile builders. |
| [`@codesoul-co/hypha-fsm`](/api/fsm) | FSM specifications, topology analysis, snapshots, transitions and recovery. |
| [`@codesoul-co/hypha-kernel`](/api/kernel) | ReAct Agent specification and kernel composition contracts. |
| [`@codesoul-co/hypha-harness`](/api/harness) | Event-first execution, tracing, projection, replay and orchestration. |
| [`@codesoul-co/hypha-models`](/api/models) | Model provider registry, routing and deterministic mock providers. |
| [`@codesoul-co/hypha-inference`](/api/inference) | Provider-neutral inference requests, routing, control and streaming. |
| [`@codesoul-co/hypha-memory`](/api/memory) | Memory contracts, pipelines, policy, stores, retrieval and evaluation. |
| [`@codesoul-co/hypha-skills`](/api/skills) | Versioned Skill definitions and progressive-loading registry. |
| [`@codesoul-co/hypha-tools`](/api/tools) | Tool contracts, registries, governed execution and workspace boundaries. |
| [`@codesoul-co/hypha-mcp`](/api/mcp) | MCP integration specs, clients, policy and lifecycle management. |
| [`@codesoul-co/hypha-domain`](/api/domain) | Domain Pack validation and compilation into runtime-owned contracts. |
| [`@codesoul-co/hypha-adapters-local`](/api/adapters-local) | Local-first SQLite, vector, artifact and runtime adapters. |
| [`@codesoul-co/hypha-serving-cache`](/api/serving-cache) | Serving cache keys, stores, policies and cache coordination. |
| [`@codesoul-co/hypha-testing`](/api/testing) | Trace, replay, fixture and deterministic assertion helpers. |

## Public API boundary

- Only symbols exported by a package entrypoint are listed; non-exported source implementation is not public API.
- TypeScript types disappear at runtime; parse untrusted input with the corresponding Zod/spec definition.
- Tool, MCP, memory, file and external writes must pass through policy, trace and harness hooks.
- Events are the source of truth; Session and Run are rebuildable product/context views.
