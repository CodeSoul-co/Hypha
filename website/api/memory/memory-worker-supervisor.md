# `@codesoul-co/hypha-memory` / `memory-worker-supervisor`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-worker-supervisor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-worker-supervisor.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryWorkerSupervisor` | class | <code>new MemoryWorkerSupervisor(options: MemoryWorkerSupervisorOptions): MemoryWorkerSupervisor</code> | Owns startup recovery and graceful shutdown for restart-safe Memory workers. |
| `MemoryWorkerSupervisorOptions` | interface | <code>interface MemoryWorkerSupervisorOptions</code> | Field contract for Memory Worker Supervisor Options; see all contract members below. |
| `SupervisedMemoryWorker` | interface | <code>interface SupervisedMemoryWorker</code> | Field contract for Supervised Memory Worker; see all contract members below. |

## `MemoryWorkerSupervisor` public members

Owns startup recovery and graceful shutdown for restart-safe Memory workers.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: MemoryWorkerSupervisorOptions): MemoryWorkerSupervisor</code> | Creates an instance of this class. |
| `start` | method | <code>start(): Promise&lt;void&gt;</code> | Starts start at this module boundary. |
| `status` | method | <code>status(): "idle" &#124; "starting" &#124; "running" &#124; "stopping" &#124; "stopped"</code> | Public runtime operation for status. |
| `stop` | method | <code>stop(): Promise&lt;void&gt;</code> | Public runtime operation for stop. |

## `MemoryWorkerSupervisorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `workers` | property | <code>workers: readonly SupervisedMemoryWorker[]</code> | Public workers property. |

## `SupervisedMemoryWorker` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runOnce` | method | <code>runOnce(): Promise&lt;unknown&gt;</code> | Public runtime operation for run Once. |
| `start` | method | <code>start(): void</code> | Starts start at this module boundary. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public runtime operation for stop And Drain. |
