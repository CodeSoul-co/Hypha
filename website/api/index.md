# Complete API reference

This section enumerates every export from the current Hypha public entrypoints, grouped by npm package and source module. Package guides explain design intent and composition; these pages answer which classes, functions, interfaces, types and constants exist and where they come from.

> Generated reference: `npm run docs:api`. Signatures are derived from built TypeScript declarations; very long inferred types are compacted and linked to source. Regenerate and commit these pages after changing public exports.

## How to use this reference

1. Start with the [feature map](/guide/capability-map) to understand boundaries and execution order.
2. Open the relevant [package guide](/packages/) for composition examples and runtime invariants.
3. Use the package API pages below to locate exact symbols, signatures and class members by source module.

## Package index

| Package | Responsibility | Guide |
| --- | --- | --- |
| [`@codesoul-co/hypha-core`](/api/core) | Shared contracts, schemas, Events, policy and runtime ports. | [Package guide](/packages/core) |
| [`@codesoul-co/hypha-storage`](/api/storage) | Provider-neutral storage topology contracts and profile builders. | [Package guide](/packages/storage) |
| [`@codesoul-co/hypha-fsm`](/api/fsm) | FSM specifications, topology analysis, snapshots, transitions and recovery. | [Package guide](/packages/fsm) |
| [`@codesoul-co/hypha-kernel`](/api/kernel) | ReAct Agent specification and kernel composition contracts. | [Package guide](/packages/kernel) |
| [`@codesoul-co/hypha-harness`](/api/harness) | Event-first execution, tracing, projection, replay and orchestration. | [Package guide](/packages/harness) |
| [`@codesoul-co/hypha-models`](/api/models) | Model provider registry, routing and deterministic mock providers. | [Package guide](/packages/models) |
| [`@codesoul-co/hypha-inference`](/api/inference) | Provider-neutral inference requests, routing, control and streaming. | [Package guide](/packages/inference) |
| [`@codesoul-co/hypha-memory`](/api/memory) | Memory contracts, pipelines, policy, stores, retrieval and evaluation. | [Package guide](/packages/memory) |
| [`@codesoul-co/hypha-skills`](/api/skills) | Versioned Skill definitions and progressive-loading registry. | [Package guide](/packages/skills) |
| [`@codesoul-co/hypha-tools`](/api/tools) | Tool contracts, registries, governed execution and workspace boundaries. | [Package guide](/packages/tools) |
| [`@codesoul-co/hypha-mcp`](/api/mcp) | MCP integration specs, clients, policy and lifecycle management. | [Package guide](/packages/mcp) |
| [`@codesoul-co/hypha-domain`](/api/domain) | Domain Pack validation and compilation into runtime-owned contracts. | [Package guide](/packages/domain) |
| [`@codesoul-co/hypha-adapters-local`](/api/adapters-local) | Local-first SQLite, vector, artifact and runtime adapters. | [Package guide](/packages/adapters-local) |
| [`@codesoul-co/hypha-serving-cache`](/api/serving-cache) | Serving cache keys, stores, policies and cache coordination. | [Package guide](/packages/serving-cache) |
| [`@codesoul-co/hypha-testing`](/api/testing) | Trace, replay, fixture and deterministic assertion helpers. | [Package guide](/packages/testing) |

## Stability notes

- Only symbols exported by a package entrypoint are listed; non-exported source implementation is not public API.
- TypeScript types disappear at runtime; parse untrusted input with the corresponding Zod/spec definition.
- Tool, MCP, memory, file and external writes must pass through policy, trace and harness hooks.
- Events are the source of truth; Session and Run are rebuildable product/context views.
