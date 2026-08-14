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

| Layer | Packages | Use it for |
| --- | --- | --- |
| Contracts | `hypha-core`, `hypha-storage` | Shared specs, Events, policy and storage topology |
| Execution | `hypha-fsm`, `hypha-kernel`, `hypha-harness` | State transitions, ReAct loops and durable runtime boundaries |
| Intelligence | `hypha-models`, `hypha-inference` | Model adapters, aliases, normalized inference and cache coordination |
| Capabilities | `hypha-memory`, `hypha-skills`, `hypha-tools`, `hypha-mcp` | Context and governed effects |
| Product composition | `hypha-domain` | Application-owned Domain Packs and Workflow specs |
| Providers | `hypha-adapters-local`, `hypha-serving-cache` | Local storage composition and bounded serving cache |
| Verification | `hypha-testing` | Replay fixtures and deterministic FSM assertions |

<div class="architecture-flow">
APPLICATION / DOMAIN PACK<br>
↓ domain · skills · tools · mcp · memory<br>
↓ kernel · harness · fsm<br>
↓ models · inference · storage · local adapters · cache<br>
EVENTS → REPLAY → TESTING
</div>

## Public package matrix

| Package | Primary boundary | Typical entry point |
| --- | --- | --- |
| [`hypha-core`](./contracts) | Versioned framework contracts | `createFrameworkEvent` |
| [`hypha-storage`](./contracts#hypha-storage) | Provider-neutral storage profiles | `createSQLiteStorageProfile` |
| [`hypha-fsm`](./execution) | Validated FSM topology/runtime | `parseFSMProcessSpec` |
| [`hypha-kernel`](./execution#hypha-kernel) | ReAct reasoning contracts | `reactAgentSpecDefinition` |
| [`hypha-harness`](./execution#hypha-harness) | Event-first execution and projection | `SessionProjector` |
| [`hypha-models`](./intelligence) | Model providers and routing | `ModelRegistry` |
| [`hypha-inference`](./intelligence#hypha-inference) | Normalized inference backend | `InferenceManager` |
| [`hypha-memory`](./capabilities) | Governed scoped memory | `memorySpecDefinition` |
| [`hypha-skills`](./capabilities#hypha-skills) | Progressive instruction loading | `SkillRegistry` |
| [`hypha-tools`](./capabilities#hypha-tools) | Typed governed tool execution | `ToolRegistry` |
| [`hypha-mcp`](./capabilities#hypha-mcp) | Governed MCP integration | `mcpIntegrationSpecDefinition` |
| [`hypha-domain`](./product-runtime) | Domain Pack compilation | `compileDomainPackToHarnessedSystem` |
| [`hypha-adapters-local`](./product-runtime#hypha-adapters-local) | Local provider composition | `createLocalStorageProfiles` |
| [`hypha-serving-cache`](./product-runtime#hypha-serving-cache) | Scoped response cache | `ServingCacheManager` |
| [`hypha-testing`](./product-runtime#hypha-testing) | Replay/regression helpers | `assertStatePath` |

::: warning Package boundary
The Express API under `apps/server` and the example CLI are application surfaces, not npm framework packages. Install the libraries in your own application, or run the Server from the Hypha repository.
:::
