# `@codesoul-co/hypha-testing` / `replay`

- Package index: [`@codesoul-co/hypha-testing`](/api/testing)
- Source: [`packages/testing/src/replay.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)
- Exports: **16**

## Using this module

Use the Replay module for using the public contracts and operations for this capability boundary. It exports 3 classes, 3 functions, 10 interfaces.

### Import from the package entrypoint

```ts
import {
  FileReplayFixtureStore,
  InMemoryReplayFixtureStore,
  ReplayEngine,
  diffStringSequences,
  normalizeEvents,
  projectReplay,
} from '@codesoul-co/hypha-testing';

import type {
  FileReplayFixtureStoreOptions,
  ReplayCaptureInput,
  ReplayEngineOptions,
  ReplayFixture,
  ReplayFixtureStore,
  ReplayProjection,
  ReplayResult,
  TraceDiff,
} from '@codesoul-co/hypha-testing';

// The complete export list is documented below.
```

### Usage patterns

- Use the 10 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `FileReplayFixtureStore` | class | <code>new FileReplayFixtureStore(options: FileReplayFixtureStoreOptions): FileReplayFixtureStore</code> | File Replay Fixture Store class with 4 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryReplayFixtureStore` | class | <code>new InMemoryReplayFixtureStore(): InMemoryReplayFixtureStore</code> | In Memory Replay Fixture Store class with 4 public constructor or member entries; its exact declarations are listed below. |
| `ReplayEngine` | class | <code>new ReplayEngine(options?: ReplayEngineOptions): ReplayEngine</code> | Replay Engine class with 6 public constructor or member entries; its exact declarations are listed below. |
| `diffStringSequences` | function | <code>diffStringSequences(expected: string[], actual: string[]): TraceSequenceDiff</code> | Diff String Sequences function with 1 public call signature; parameters and return types are listed below. |
| `normalizeEvents` | function | <code>normalizeEvents(events: FrameworkEvent[]): FrameworkEvent[]</code> | Normalize Events function with 1 public call signature; parameters and return types are listed below. |
| `projectReplay` | function | <code>projectReplay(events: FrameworkEvent[]): ReplayProjection</code> | Project Replay function with 1 public call signature; parameters and return types are listed below. |
| `FileReplayFixtureStoreOptions` | interface | <code>interface FileReplayFixtureStoreOptions</code> | File Replay Fixture Store Options interface with 2 public fields or methods. |
| `ReplayCaptureInput` | interface | <code>interface ReplayCaptureInput</code> | Replay Capture Input interface with 7 public fields or methods. |
| `ReplayEngineOptions` | interface | <code>interface ReplayEngineOptions</code> | Replay Engine Options interface with 8 public fields or methods. |
| `ReplayFixture` | interface | <code>interface ReplayFixture</code> | Replay Fixture interface with 15 public fields or methods. |
| `ReplayFixtureStore` | interface | <code>interface ReplayFixtureStore</code> | Replay Fixture Store interface with 3 public fields or methods. |
| `ReplayProjection` | interface | <code>interface ReplayProjection</code> | Replay Projection interface with 9 public fields or methods. |
| `ReplayResult` | interface | <code>interface ReplayResult</code> | Replay Result interface with 3 public fields or methods. |
| `TraceDiff` | interface | <code>interface TraceDiff</code> | Trace Diff interface with 8 public fields or methods. |
| `TraceSequenceDiff` | interface | <code>interface TraceSequenceDiff</code> | Trace Sequence Diff interface with 6 public fields or methods. |
| `TraceValueDiff` | interface | <code>interface TraceValueDiff</code> | Trace Value Diff interface with 3 public fields or methods. |

## `FileReplayFixtureStore`

File Replay Fixture Store class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { FileReplayFixtureStore } from '@codesoul-co/hypha-testing';`
- Source module: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### Declaration

```text
export declare class FileReplayFixtureStore implements ReplayFixtureStore {
    constructor(options: FileReplayFixtureStoreOptions);
    save(fixture: ReplayFixture): Promise<void>;
    get(id: string): Promise<ReplayFixture | null>;
    list(): Promise<ReplayFixture[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: FileReplayFixtureStoreOptions): FileReplayFixtureStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(id: string): Promise&lt;ReplayFixture &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): Promise&lt;ReplayFixture[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `save` | method | <code>save(fixture: ReplayFixture): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryReplayFixtureStore`

In Memory Replay Fixture Store class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryReplayFixtureStore } from '@codesoul-co/hypha-testing';`
- Source module: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### Declaration

```text
export declare class InMemoryReplayFixtureStore implements ReplayFixtureStore {
    save(fixture: ReplayFixture): Promise<void>;
    get(id: string): Promise<ReplayFixture | null>;
    list(): Promise<ReplayFixture[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryReplayFixtureStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(id: string): Promise&lt;ReplayFixture &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): Promise&lt;ReplayFixture[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `save` | method | <code>save(fixture: ReplayFixture): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ReplayEngine`

Replay Engine class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ReplayEngine } from '@codesoul-co/hypha-testing';`
- Source module: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### Declaration

```text
export declare class ReplayEngine {
    constructor(options?: ReplayEngineOptions);
    capture(input: ReplayCaptureInput): Promise<ReplayFixture>;
    replay(fixture: ReplayFixture): ReplayResult;
    compare(expected: ReplayFixture, actual: ReplayFixture | FrameworkEvent[]): TraceDiff;
    getFixture(id: string): Promise<ReplayFixture | null>;
    listFixtures(): Promise<ReplayFixture[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capture` | method | <code>capture(input: ReplayCaptureInput): Promise&lt;ReplayFixture&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `compare` | method | <code>compare(expected: ReplayFixture, actual: ReplayFixture &#124; FrameworkEvent[]): TraceDiff</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options?: ReplayEngineOptions): ReplayEngine</code> | Creates an instance of this class. |
| `getFixture` | method | <code>getFixture(id: string): Promise&lt;ReplayFixture &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listFixtures` | method | <code>listFixtures(): Promise&lt;ReplayFixture[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `replay` | method | <code>replay(fixture: ReplayFixture): ReplayResult</code> | Public method; parameters and return type are shown in the signature. |

## `diffStringSequences`

Diff String Sequences function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { diffStringSequences } from '@codesoul-co/hypha-testing';`
- Source module: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### Declaration

```text
export declare function diffStringSequences(expected: string[], actual: string[]): TraceSequenceDiff;
```

### Call signature

```text
diffStringSequences(expected: string[], actual: string[]): TraceSequenceDiff
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `expected` | <code>string[]</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `actual` | <code>string[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `TraceSequenceDiff`
- Description: The return contract is defined by the type shown above.

## `normalizeEvents`

Normalize Events function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizeEvents } from '@codesoul-co/hypha-testing';`
- Source module: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### Declaration

```text
export declare function normalizeEvents(events: FrameworkEvent[]): FrameworkEvent[];
```

### Call signature

```text
normalizeEvents(events: FrameworkEvent[]): FrameworkEvent[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `events` | <code>FrameworkEvent&lt;unknown&gt;[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FrameworkEvent<unknown>[]`
- Description: The return contract is defined by the type shown above.

## `projectReplay`

Project Replay function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { projectReplay } from '@codesoul-co/hypha-testing';`
- Source module: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### Declaration

```text
export declare function projectReplay(events: FrameworkEvent[]): ReplayProjection;
```

### Call signature

```text
projectReplay(events: FrameworkEvent[]): ReplayProjection
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `events` | <code>FrameworkEvent&lt;unknown&gt;[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ReplayProjection`
- Description: The return contract is defined by the type shown above.

## `FileReplayFixtureStoreOptions`

File Replay Fixture Store Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { FileReplayFixtureStoreOptions } from '@codesoul-co/hypha-testing';`
- Source module: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### Declaration

```text
export interface FileReplayFixtureStoreOptions {
    directory: string;
    extension?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `directory` | property | <code>directory: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `extension` | property | <code>extension?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReplayCaptureInput`

Replay Capture Input interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ReplayCaptureInput } from '@codesoul-co/hypha-testing';`
- Source module: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### Declaration

```text
export interface ReplayCaptureInput {
    id: string;
    version: string;
    runId: string;
    events?: FrameworkEvent[];
    replaySpec?: ReplaySpec;
    outputContract?: OutputContractSpec;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events?: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputContract` | property | <code>outputContract?: OutputContractSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `replaySpec` | property | <code>replaySpec?: ReplaySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReplayEngineOptions`

Replay Engine Options interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ReplayEngineOptions } from '@codesoul-co/hypha-testing';`
- Source module: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### Declaration

```text
export interface ReplayEngineOptions {
    eventStore?: EventStore;
    fixtureStore?: ReplayFixtureStore;
    now?: () => string;
    trace?: TraceRecorder;
    sessionId?: string;
    workspaceId?: string;
    agentId?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventStore` | property | <code>eventStore?: EventStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fixtureStore` | property | <code>fixtureStore?: ReplayFixtureStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trace` | property | <code>trace?: TraceRecorder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReplayFixture`

Replay Fixture interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { ReplayFixture } from '@codesoul-co/hypha-testing';`
- Source module: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### Declaration

```text
export interface ReplayFixture {
    id: string;
    version: string;
    runId: string;
    createdAt: string;
    replaySpecRef?: SpecRef;
    events: FrameworkEvent[];
    eventTypes: string[];
    statePath: string[];
    finalOutput?: unknown;
    toolCalls: string[];
    modelCalls: string[];
    policyDecisions: string[];
    memoryReadSet: string[];
    outputContract?: OutputContractSpec;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `events` | property | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventTypes` | property | <code>eventTypes: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finalOutput` | property | <code>finalOutput?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryReadSet` | property | <code>memoryReadSet: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelCalls` | property | <code>modelCalls: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputContract` | property | <code>outputContract?: OutputContractSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyDecisions` | property | <code>policyDecisions: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `replaySpecRef` | property | <code>replaySpecRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statePath` | property | <code>statePath: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCalls` | property | <code>toolCalls: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReplayFixtureStore`

Replay Fixture Store interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ReplayFixtureStore } from '@codesoul-co/hypha-testing';`
- Source module: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### Declaration

```text
export interface ReplayFixtureStore {
    save(fixture: ReplayFixture): Promise<void>;
    get(id: string): Promise<ReplayFixture | null>;
    list(): Promise<ReplayFixture[]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(id: string): Promise&lt;ReplayFixture &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): Promise&lt;ReplayFixture[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `save` | method | <code>save(fixture: ReplayFixture): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ReplayProjection`

Replay Projection interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { ReplayProjection } from '@codesoul-co/hypha-testing';`
- Source module: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### Declaration

```text
export interface ReplayProjection {
    runId: string;
    events: FrameworkEvent[];
    eventTypes: string[];
    statePath: string[];
    finalOutput?: unknown;
    toolCalls: string[];
    policyDecisions: string[];
    memoryReadSet: string[];
    modelCalls: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventTypes` | property | <code>eventTypes: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finalOutput` | property | <code>finalOutput?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryReadSet` | property | <code>memoryReadSet: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelCalls` | property | <code>modelCalls: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyDecisions` | property | <code>policyDecisions: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statePath` | property | <code>statePath: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCalls` | property | <code>toolCalls: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReplayResult`

Replay Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ReplayResult } from '@codesoul-co/hypha-testing';`
- Source module: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### Declaration

```text
export interface ReplayResult {
    fixtureId: string;
    runId: string;
    projection: ReplayProjection;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fixtureId` | property | <code>fixtureId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projection` | property | <code>projection: ReplayProjection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `TraceDiff`

Trace Diff interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { TraceDiff } from '@codesoul-co/hypha-testing';`
- Source module: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### Declaration

```text
export interface TraceDiff {
    passed: boolean;
    eventTypes: TraceSequenceDiff;
    statePath: TraceSequenceDiff;
    toolCalls: TraceSequenceDiff;
    modelCalls: TraceSequenceDiff;
    policyDecisions: TraceSequenceDiff;
    memoryReadSet: TraceSequenceDiff;
    output: TraceValueDiff;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventTypes` | property | <code>eventTypes: TraceSequenceDiff</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryReadSet` | property | <code>memoryReadSet: TraceSequenceDiff</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelCalls` | property | <code>modelCalls: TraceSequenceDiff</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output: TraceValueDiff</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `passed` | property | <code>passed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyDecisions` | property | <code>policyDecisions: TraceSequenceDiff</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statePath` | property | <code>statePath: TraceSequenceDiff</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCalls` | property | <code>toolCalls: TraceSequenceDiff</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `TraceSequenceDiff`

Trace Sequence Diff interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { TraceSequenceDiff } from '@codesoul-co/hypha-testing';`
- Source module: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### Declaration

```text
export interface TraceSequenceDiff {
    passed: boolean;
    expected: string[];
    actual: string[];
    missing: string[];
    extra: string[];
    mismatches: Array<{
        index: number;
        expected?: string;
        actual?: string;
    }>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actual` | property | <code>actual: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expected` | property | <code>expected: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `extra` | property | <code>extra: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mismatches` | property | <code>mismatches: { index: number; expected?: string; actual?: string; }[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `missing` | property | <code>missing: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `passed` | property | <code>passed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `TraceValueDiff`

Trace Value Diff interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { TraceValueDiff } from '@codesoul-co/hypha-testing';`
- Source module: [`replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)

### Declaration

```text
export interface TraceValueDiff {
    passed: boolean;
    expected?: unknown;
    actual?: unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actual` | property | <code>actual?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expected` | property | <code>expected?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `passed` | property | <code>passed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
