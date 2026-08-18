# `@codesoul-co/hypha-adapters-local` / `local-process-output-collector`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/local-process-output-collector.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-collector.ts)
- Exports: **5**

## Using this module

Use the Local process output collector module for using the public contracts and operations for this capability boundary. It exports 1 class, 3 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  LocalProcessOutputCollector,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalProcessOutputAppendResult,
  LocalProcessOutputLimits,
  LocalProcessOutputSnapshot,
  LocalProcessOutputStream,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalProcessOutputCollector` | class | <code>new LocalProcessOutputCollector(limits: LocalProcessOutputLimits): LocalProcessOutputCollector</code> | Collects bounded process output while accounting against raw bytes, not string length. |
| `LocalProcessOutputAppendResult` | interface | <code>interface LocalProcessOutputAppendResult</code> | Local Process Output Append Result interface with 1 public fields or methods. |
| `LocalProcessOutputLimits` | interface | <code>interface LocalProcessOutputLimits</code> | Local Process Output Limits interface with 3 public fields or methods. |
| `LocalProcessOutputSnapshot` | interface | <code>interface LocalProcessOutputSnapshot</code> | Local Process Output Snapshot interface with 6 public fields or methods. |
| `LocalProcessOutputStream` | type | <code>type LocalProcessOutputStream = 'stdout' &#124; 'stderr'</code> | Public type alias for Local Process Output Stream; the declaration contains its complete type expression. |

## `LocalProcessOutputCollector`

Collects bounded process output while accounting against raw bytes, not string length.

- Kind: class
- Import: `import { LocalProcessOutputCollector } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-output-collector`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-collector.ts)

### Declaration

```text
export declare class LocalProcessOutputCollector {
    constructor(limits: LocalProcessOutputLimits);
    append(stream: LocalProcessOutputStream, chunk: Buffer): LocalProcessOutputAppendResult;
    snapshot(): LocalProcessOutputSnapshot;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(stream: LocalProcessOutputStream, chunk: Buffer): LocalProcessOutputAppendResult</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(limits: LocalProcessOutputLimits): LocalProcessOutputCollector</code> | Creates an instance of this class. |
| `snapshot` | method | <code>snapshot(): LocalProcessOutputSnapshot</code> | Public method; parameters and return type are shown in the signature. |

## `LocalProcessOutputAppendResult`

Local Process Output Append Result interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { LocalProcessOutputAppendResult } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-output-collector`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-collector.ts)

### Declaration

```text
export interface LocalProcessOutputAppendResult {
    limitExceeded?: LocalProcessOutputStream | 'combined';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `limitExceeded` | property | <code>limitExceeded?: LocalProcessOutputStream &#124; "combined"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalProcessOutputLimits`

Local Process Output Limits interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { LocalProcessOutputLimits } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-output-collector`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-collector.ts)

### Declaration

```text
export interface LocalProcessOutputLimits {
    maxStdoutBytes: number;
    maxStderrBytes: number;
    maxCombinedOutputBytes: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxCombinedOutputBytes` | property | <code>maxCombinedOutputBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxStderrBytes` | property | <code>maxStderrBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxStdoutBytes` | property | <code>maxStdoutBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalProcessOutputSnapshot`

Local Process Output Snapshot interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { LocalProcessOutputSnapshot } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-output-collector`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-collector.ts)

### Declaration

```text
export interface LocalProcessOutputSnapshot {
    stdout: string;
    stderr: string;
    capturedStdoutBytes: number;
    capturedStderrBytes: number;
    observedStdoutBytes: number;
    observedStderrBytes: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capturedStderrBytes` | property | <code>capturedStderrBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capturedStdoutBytes` | property | <code>capturedStdoutBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observedStderrBytes` | property | <code>observedStderrBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observedStdoutBytes` | property | <code>observedStdoutBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stderr` | property | <code>stderr: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stdout` | property | <code>stdout: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalProcessOutputStream`

Public type alias for Local Process Output Stream; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { LocalProcessOutputStream } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-output-collector`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-collector.ts)

### Declaration

```text
export type LocalProcessOutputStream = 'stdout' | 'stderr';
```
