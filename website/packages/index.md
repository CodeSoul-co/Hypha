# Package reference

Hypha v1.0.1 is published as 15 packages under `@codesoul-co`. Pin every package in one application to the same release line.

```bash
npm install @codesoul-co/hypha-core@1.0.1 \
  @codesoul-co/hypha-fsm@1.0.1 \
  @codesoul-co/hypha-domain@1.0.1 \
  @codesoul-co/hypha-kernel@1.0.1 \
  @codesoul-co/hypha-harness@1.0.1
```

## Select by layer

| Layer               | Packages                                                   | Use it for                                                           |
| ------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------- |
| Contracts           | `hypha-core`, `hypha-storage`                              | Shared specs, Events, policy and storage topology                    |
| Execution           | `hypha-fsm`, `hypha-kernel`, `hypha-harness`               | State transitions, ReAct loops and durable runtime boundaries        |
| Intelligence        | `hypha-models`, `hypha-inference`                          | Model adapters, aliases, normalized inference and cache coordination |
| Capabilities        | `hypha-memory`, `hypha-skills`, `hypha-tools`, `hypha-mcp` | Context and governed effects                                         |
| Product composition | `hypha-domain`                                             | Application-owned Domain Packs and Workflow specs                    |
| Providers           | `hypha-adapters-local`, `hypha-serving-cache`              | Local storage composition and bounded serving cache                  |
| Verification        | `hypha-testing`                                            | Replay fixtures and deterministic FSM assertions                     |

<div class="architecture-flow">
APPLICATION / DOMAIN PACK<br>
↓ domain · skills · tools · mcp · memory<br>
↓ kernel · harness · fsm<br>
↓ models · inference · storage · local adapters · cache<br>
EVENTS → REPLAY → TESTING
</div>

## Public package matrix

The guide link explains concepts and composition. The API link enumerates every exported module, class, function, interface, type, constant and public member generated from TypeScript declarations.

| Package guide                              | Primary boundary                     | Typical entry point                  | Complete API                           |
| ------------------------------------------ | ------------------------------------ | ------------------------------------ | -------------------------------------- |
| [`hypha-core`](./core)                     | Versioned framework contracts        | `createFrameworkEvent`               | [modules/symbols](/api/core)           |
| [`hypha-storage`](./storage)               | Provider-neutral storage profiles    | `createSQLiteStorageProfile`         | [modules/symbols](/api/storage)        |
| [`hypha-fsm`](./fsm)                       | Validated FSM topology/runtime       | `parseFSMProcessSpec`                | [modules/symbols](/api/fsm)            |
| [`hypha-kernel`](./kernel)                 | ReAct reasoning contracts            | `reactAgentSpecDefinition`           | [modules/symbols](/api/kernel)         |
| [`hypha-harness`](./harness)               | Event-first execution and projection | `SessionProjector`                   | [modules/symbols](/api/harness)        |
| [`hypha-models`](./models)                 | Model providers and routing          | `ModelRegistry`                      | [modules/symbols](/api/models)         |
| [`hypha-inference`](./inference)           | Normalized inference backend         | `InferenceManager`                   | [modules/symbols](/api/inference)      |
| [`hypha-memory`](./memory)                 | Governed scoped memory               | `memorySpecDefinition`               | [modules/symbols](/api/memory)         |
| [`hypha-skills`](./skills)                 | Progressive instruction loading      | `SkillRegistry`                      | [modules/symbols](/api/skills)         |
| [`hypha-tools`](./tools)                   | Typed governed tool execution        | `ToolRegistry`                       | [modules/symbols](/api/tools)          |
| [`hypha-mcp`](./mcp)                       | Governed MCP integration             | `mcpIntegrationSpecDefinition`       | [modules/symbols](/api/mcp)            |
| [`hypha-domain`](./domain)                 | Domain Pack compilation              | `compileDomainPackToHarnessedSystem` | [modules/symbols](/api/domain)         |
| [`hypha-adapters-local`](./adapters-local) | Local provider composition           | `createLocalStorageBackbone`         | [modules/symbols](/api/adapters-local) |
| [`hypha-serving-cache`](./serving-cache)   | Scoped response cache                | `ServingCacheManager`                | [modules/symbols](/api/serving-cache)  |
| [`hypha-testing`](./testing)               | Replay/regression helpers            | `assertStatePath`                    | [modules/symbols](/api/testing)        |

::: warning Package boundary
The Express API under `apps/server` and the example CLI are application surfaces, not npm framework packages. Install the libraries in your own application, or run the Server from the Hypha repository.
:::
