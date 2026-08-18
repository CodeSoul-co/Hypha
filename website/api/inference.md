# `@codesoul-co/hypha-inference` API

Provider-neutral inference requests, routing, control and streaming.

- Install: `npm install @codesoul-co/hypha-inference@1.0.1`
- Entrypoint import: `import { ... } from '@codesoul-co/hypha-inference';`
- Public exports: **151**
- Source modules: **15**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 24 |
| constant | 8 |
| function | 15 |
| interface | 81 |
| type | 23 |

## Source modules

| Module | Use when | Exports | Source |
| --- | --- | ---: | --- |
| [`agent-prompts`](/api/inference/agent-prompts) | Use the Agent prompts module for using the public contracts and operations for this capability boundary. It exports 1 class, 3 constants, 2 functions, 8 interfaces, 2 types. | 16 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts) |
| [`backends`](/api/inference/backends) | Use the Backends module for using the public contracts and operations for this capability boundary. It exports 7 classes, 1 function, 3 interfaces. | 11 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts) |
| [`cache`](/api/inference/cache) | Use the Cache module for reading, writing, or coordinating cache state. It exports 2 classes, 4 functions, 3 interfaces, 1 type. | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts) |
| [`drivers`](/api/inference/drivers) | Use the Drivers module for using the public contracts and operations for this capability boundary. It exports 3 classes, 7 interfaces, 4 types. | 14 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts) |
| [`manager`](/api/inference/manager) | Use the Manager module for using the public contracts and operations for this capability boundary. It exports 4 classes, 2 interfaces. | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/manager.ts) |
| [`pipeline`](/api/inference/pipeline) | Use the Pipeline module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 interface. | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/pipeline.ts) |
| [`plasmod`](/api/inference/plasmod) | Use the Plasmod module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 interface. | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/plasmod.ts) |
| [`prefix`](/api/inference/prefix) | Use the Prefix module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 function. | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prefix.ts) |
| [`prompt`](/api/inference/prompt) | Use the Prompt module for using the public contracts and operations for this capability boundary. It exports 1 class, 3 functions. | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt.ts) |
| [`prompt-profile`](/api/inference/prompt-profile) | Use the Prompt profile module for using the public contracts and operations for this capability boundary. It exports 1 class, 3 constants, 9 interfaces, 2 types. | 15 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts) |
| [`reasoning`](/api/inference/reasoning) | Use the Reasoning module for using the public contracts and operations for this capability boundary. It exports 1 class, 6 interfaces, 6 types. | 13 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts) |
| [`reasoning-registry`](/api/inference/reasoning-registry) | Use the Reasoning registry module for registering and resolving versioned capabilities or implementations. It exports 1 class, 5 interfaces. | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts) |
| [`reasoning-sources`](/api/inference/reasoning-sources) | Use the Reasoning sources module for using the public contracts and operations for this capability boundary. It exports 2 constants, 1 function. | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-sources.ts) |
| [`recovery`](/api/inference/recovery) | Use the Recovery module for handling bounded recovery, retry, or degradation. It exports 3 functions, 2 interfaces, 1 type. | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts) |
| [`types`](/api/inference/types) | Use the Types module for declaring and runtime-validating contracts. It exports 34 interfaces, 7 types. | 41 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts) |

## Import boundary

This page documents only the public API exported by the `@codesoul-co/hypha-inference` package entrypoint. Implementations under `packages/inference/src` that are not exported from that entrypoint are not part of the npm package contract.
