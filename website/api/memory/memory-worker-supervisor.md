# `@codesoul-co/hypha-memory` / `memory-worker-supervisor`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-worker-supervisor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-worker-supervisor.ts)
- Exports: **3**

## Using this module

Use the Memory worker supervisor module for using the public contracts and operations for this capability boundary. It exports 1 class, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  MemoryWorkerSupervisor,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryWorkerSupervisorOptions,
  SupervisedMemoryWorker,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryWorkerSupervisor` | class | <code>new MemoryWorkerSupervisor(options: MemoryWorkerSupervisorOptions): MemoryWorkerSupervisor</code> | Owns startup recovery and graceful shutdown for restart-safe Memory workers. |
| `MemoryWorkerSupervisorOptions` | interface | <code>interface MemoryWorkerSupervisorOptions</code> | Memory Worker Supervisor Options interface with 1 public fields or methods. |
| `SupervisedMemoryWorker` | interface | <code>interface SupervisedMemoryWorker</code> | Supervised Memory Worker interface with 3 public fields or methods. |

## `MemoryWorkerSupervisor`

Owns startup recovery and graceful shutdown for restart-safe Memory workers.

- Kind: class
- Import: `import { MemoryWorkerSupervisor } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-worker-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-worker-supervisor.ts)

### Declaration

```text
export declare class MemoryWorkerSupervisor {
    constructor(options: MemoryWorkerSupervisorOptions);
    start(): Promise<void>;
    stop(): Promise<void>;
    status(): 'idle' | 'starting' | 'running' | 'stopping' | 'stopped';
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: MemoryWorkerSupervisorOptions): MemoryWorkerSupervisor</code> | Creates an instance of this class. |
| `start` | method | <code>start(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `status` | method | <code>status(): "idle" &#124; "starting" &#124; "running" &#124; "stopping" &#124; "stopped"</code> | Public method; parameters and return type are shown in the signature. |
| `stop` | method | <code>stop(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryWorkerSupervisorOptions`

Memory Worker Supervisor Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MemoryWorkerSupervisorOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-worker-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-worker-supervisor.ts)

### Declaration

```text
export interface MemoryWorkerSupervisorOptions {
    workers: readonly SupervisedMemoryWorker[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `workers` | property | <code>workers: readonly SupervisedMemoryWorker[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SupervisedMemoryWorker`

Supervised Memory Worker interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SupervisedMemoryWorker } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-worker-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-worker-supervisor.ts)

### Declaration

```text
export interface SupervisedMemoryWorker {
    start(): void;
    stopAndDrain(): Promise<void>;
    runOnce(): Promise<unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runOnce` | method | <code>runOnce(): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `start` | method | <code>start(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
