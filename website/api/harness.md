# `@codesoul-co/hypha-harness` API

Event-first execution, tracing, projection, replay and orchestration.

- Package guide: [`@codesoul-co/hypha-harness`](/packages/harness)
- Install: `npm install @codesoul-co/hypha-harness@1.0.1`
- Public exports: **107**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 15 |
| interface | 74 |
| type | 6 |
| function | 10 |
| constant | 2 |

## Source modules

| Module | Exports | Source |
| --- | ---: | --- |
| [`bounded-fsm-driver`](/api/harness/bounded-fsm-driver) | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts) |
| [`durable-event-store-bridge`](/api/harness/durable-event-store-bridge) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/durable-event-store-bridge.ts) |
| [`execution-context`](/api/harness/execution-context) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/execution-context.ts) |
| [`index`](/api/harness/entrypoint) | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts) |
| [`long-horizon-react-supervisor`](/api/harness/long-horizon-react-supervisor) | 15 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts) |
| [`manual-fsm-transition`](/api/harness/manual-fsm-transition) | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts) |
| [`message-bus`](/api/harness/message-bus) | 12 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts) |
| [`react-quantum-executor`](/api/harness/react-quantum-executor) | 19 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts) |
| [`recovery-loop`](/api/harness/recovery-loop) | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts) |
| [`recovery-supervisor`](/api/harness/recovery-supervisor) | 8 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts) |
| [`runtime`](/api/harness/runtime) | 20 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts) |

## Reading order

Choose a source module above, then inspect its exported symbols, signatures, descriptions and public class/interface members. Every module page links back to the implementation source.

## Usage conventions

- Import from the package entrypoint instead of relying on unexported internal files.
- Parse configuration, network requests and persisted data with runtime schemas.
- Classes provide runtime behavior while specs/interfaces define cross-module contracts; do not leak provider SDK types into Core.
- Use the [runnable examples](/guide/examples) to verify real call order.
