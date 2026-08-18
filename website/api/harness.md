# `@codesoul-co/hypha-harness` API

Event-first execution, tracing, projection, replay and orchestration.

- Install: `npm install @codesoul-co/hypha-harness@1.0.1`
- Entrypoint import: `import { ... } from '@codesoul-co/hypha-harness';`
- Public exports: **107**
- Source modules: **11**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 15 |
| interface | 74 |
| type | 6 |
| function | 10 |
| constant | 2 |

## Source modules

| Module | Use when | Exports | Source |
| --- | --- | ---: | --- |
| [`bounded-fsm-driver`](/api/harness/bounded-fsm-driver) | Use the Bounded FSM driver module for using the public contracts and operations for this capability boundary. It exports 1 class, 5 interfaces, 1 type. | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts) |
| [`durable-event-store-bridge`](/api/harness/durable-event-store-bridge) | Use the Durable event store bridge module for creating, recording, or reading Event contracts. It exports 1 class, 2 interfaces. | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/durable-event-store-bridge.ts) |
| [`execution-context`](/api/harness/execution-context) | Use the Execution context module for executing runtime behavior at this boundary. It exports 1 function, 2 interfaces. | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/execution-context.ts) |
| [`index`](/api/harness/entrypoint) | Aggregates the public entrypoint exports for `@codesoul-co/hypha-harness`; applications import these symbols from the package entrypoint instead of internal file paths. | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts) |
| [`long-horizon-react-supervisor`](/api/harness/long-horizon-react-supervisor) | Use the Long horizon react supervisor module for using the public contracts and operations for this capability boundary. It exports 2 classes, 1 function, 11 interfaces, 1 type. | 15 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts) |
| [`manual-fsm-transition`](/api/harness/manual-fsm-transition) | Use the Manual FSM transition module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 constant, 4 interfaces. | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts) |
| [`message-bus`](/api/harness/message-bus) | Use the Message bus module for using the public contracts and operations for this capability boundary. It exports 1 class, 9 interfaces, 2 types. | 12 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts) |
| [`react-quantum-executor`](/api/harness/react-quantum-executor) | Use the React quantum executor module for executing runtime behavior at this boundary. It exports 3 classes, 1 constant, 1 function, 13 interfaces, 1 type. | 19 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts) |
| [`recovery-loop`](/api/harness/recovery-loop) | Use the Recovery loop module for handling bounded recovery, retry, or degradation. It exports 1 function, 4 interfaces. | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts) |
| [`recovery-supervisor`](/api/harness/recovery-supervisor) | Use the Recovery supervisor module for handling bounded recovery, retry, or degradation. It exports 1 function, 6 interfaces, 1 type. | 8 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts) |
| [`runtime`](/api/harness/runtime) | Use the Runtime module for executing runtime behavior at this boundary. It exports 3 classes, 4 functions, 13 interfaces. | 20 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts) |

## Import boundary

This page documents only the public API exported by the `@codesoul-co/hypha-harness` package entrypoint. Implementations under `packages/harness/src` that are not exported from that entrypoint are not part of the npm package contract.
