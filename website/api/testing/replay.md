# `@codesoul-co/hypha-testing` / `replay`

- Package index: [`@codesoul-co/hypha-testing`](/api/testing)
- Package guide: [learning and composition guide](/packages/testing)
- Source: [`packages/testing/src/replay.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)
- Exports: **16**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `FileReplayFixtureStore` | class | <code>new FileReplayFixtureStore(options: FileReplayFixtureStoreOptions): FileReplayFixtureStore</code> | Runtime implementation for File Replay Fixture Store; see its public constructor and members below. |
| `InMemoryReplayFixtureStore` | class | <code>new InMemoryReplayFixtureStore(): InMemoryReplayFixtureStore</code> | Runtime implementation for In Memory Replay Fixture Store; see its public constructor and members below. |
| `ReplayEngine` | class | <code>new ReplayEngine(options?: ReplayEngineOptions): ReplayEngine</code> | Runtime implementation for Replay Engine; see its public constructor and members below. |
| `diffStringSequences` | function | <code>diffStringSequences(expected: string[], actual: string[]): TraceSequenceDiff</code> | Public runtime operation for diff String Sequences. |
| `normalizeEvents` | function | <code>normalizeEvents(events: FrameworkEvent[]): FrameworkEvent[]</code> | Normalizes Events at this module boundary. |
| `projectReplay` | function | <code>projectReplay(events: FrameworkEvent[]): ReplayProjection</code> | Projects Replay at this module boundary. |
| `FileReplayFixtureStoreOptions` | interface | <code>interface FileReplayFixtureStoreOptions</code> | Field contract for File Replay Fixture Store Options; see all contract members below. |
| `ReplayCaptureInput` | interface | <code>interface ReplayCaptureInput</code> | Field contract for Replay Capture Input; see all contract members below. |
| `ReplayEngineOptions` | interface | <code>interface ReplayEngineOptions</code> | Field contract for Replay Engine Options; see all contract members below. |
| `ReplayFixture` | interface | <code>interface ReplayFixture</code> | Field contract for Replay Fixture; see all contract members below. |
| `ReplayFixtureStore` | interface | <code>interface ReplayFixtureStore</code> | Field contract for Replay Fixture Store; see all contract members below. |
| `ReplayProjection` | interface | <code>interface ReplayProjection</code> | Field contract for Replay Projection; see all contract members below. |
| `ReplayResult` | interface | <code>interface ReplayResult</code> | Field contract for Replay Result; see all contract members below. |
| `TraceDiff` | interface | <code>interface TraceDiff</code> | Field contract for Trace Diff; see all contract members below. |
| `TraceSequenceDiff` | interface | <code>interface TraceSequenceDiff</code> | Field contract for Trace Sequence Diff; see all contract members below. |
| `TraceValueDiff` | interface | <code>interface TraceValueDiff</code> | Field contract for Trace Value Diff; see all contract members below. |

## `FileReplayFixtureStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: FileReplayFixtureStoreOptions): FileReplayFixtureStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(id: string): Promise&lt;ReplayFixture &#124; null&gt;</code> | Gets get at this module boundary. |
| `list` | method | <code>list(): Promise&lt;ReplayFixture[]&gt;</code> | Lists list at this module boundary. |
| `save` | method | <code>save(fixture: ReplayFixture): Promise&lt;void&gt;</code> | Saves save at this module boundary. |

## `InMemoryReplayFixtureStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryReplayFixtureStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(id: string): Promise&lt;ReplayFixture &#124; null&gt;</code> | Gets get at this module boundary. |
| `list` | method | <code>list(): Promise&lt;ReplayFixture[]&gt;</code> | Lists list at this module boundary. |
| `save` | method | <code>save(fixture: ReplayFixture): Promise&lt;void&gt;</code> | Saves save at this module boundary. |

## `ReplayEngine` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capture` | method | <code>capture(input: ReplayCaptureInput): Promise&lt;ReplayFixture&gt;</code> | Public runtime operation for capture. |
| `compare` | method | <code>compare(expected: ReplayFixture, actual: ReplayFixture &#124; FrameworkEvent[]): TraceDiff</code> | Public runtime operation for compare. |
| `constructor` | constructor | <code>(options?: ReplayEngineOptions): ReplayEngine</code> | Creates an instance of this class. |
| `getFixture` | method | <code>getFixture(id: string): Promise&lt;ReplayFixture &#124; null&gt;</code> | Gets Fixture at this module boundary. |
| `listFixtures` | method | <code>listFixtures(): Promise&lt;ReplayFixture[]&gt;</code> | Lists Fixtures at this module boundary. |
| `replay` | method | <code>replay(fixture: ReplayFixture): ReplayResult</code> | Public runtime operation for replay. |

## `FileReplayFixtureStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `directory` | property | <code>directory: string</code> | Public directory property. |
| `extension` | property | <code>extension: string</code> | Public extension property. |

## `ReplayCaptureInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | Public events property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `outputContract` | property | <code>outputContract: OutputContractSpec</code> | Public output Contract property. |
| `replaySpec` | property | <code>replaySpec: ReplaySpec</code> | Public replay Spec property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `ReplayEngineOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `eventStore` | property | <code>eventStore: EventStore</code> | Public event Store property. |
| `fixtureStore` | property | <code>fixtureStore: ReplayFixtureStore</code> | Public fixture Store property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `trace` | property | <code>trace: TraceRecorder</code> | Public trace property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ReplayFixture` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `events` | property | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | Public events property. |
| `eventTypes` | property | <code>eventTypes: string[]</code> | Public event Types property. |
| `finalOutput` | property | <code>finalOutput: unknown</code> | Public final Output property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `memoryReadSet` | property | <code>memoryReadSet: string[]</code> | Public memory Read Set property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelCalls` | property | <code>modelCalls: string[]</code> | Public model Calls property. |
| `outputContract` | property | <code>outputContract: OutputContractSpec</code> | Public output Contract property. |
| `policyDecisions` | property | <code>policyDecisions: string[]</code> | Public policy Decisions property. |
| `replaySpecRef` | property | <code>replaySpecRef: SpecRef</code> | Public replay Spec Ref property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `statePath` | property | <code>statePath: string[]</code> | Public state Path property. |
| `toolCalls` | property | <code>toolCalls: string[]</code> | Public tool Calls property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `ReplayFixtureStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(id: string): Promise&lt;ReplayFixture &#124; null&gt;</code> | Gets get at this module boundary. |
| `list` | method | <code>list(): Promise&lt;ReplayFixture[]&gt;</code> | Lists list at this module boundary. |
| `save` | method | <code>save(fixture: ReplayFixture): Promise&lt;void&gt;</code> | Saves save at this module boundary. |

## `ReplayProjection` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | Public events property. |
| `eventTypes` | property | <code>eventTypes: string[]</code> | Public event Types property. |
| `finalOutput` | property | <code>finalOutput: unknown</code> | Public final Output property. |
| `memoryReadSet` | property | <code>memoryReadSet: string[]</code> | Public memory Read Set property. |
| `modelCalls` | property | <code>modelCalls: string[]</code> | Public model Calls property. |
| `policyDecisions` | property | <code>policyDecisions: string[]</code> | Public policy Decisions property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `statePath` | property | <code>statePath: string[]</code> | Public state Path property. |
| `toolCalls` | property | <code>toolCalls: string[]</code> | Public tool Calls property. |

## `ReplayResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fixtureId` | property | <code>fixtureId: string</code> | Public fixture Id property. |
| `projection` | property | <code>projection: ReplayProjection</code> | Public projection property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |

## `TraceDiff` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventTypes` | property | <code>eventTypes: TraceSequenceDiff</code> | Public event Types property. |
| `memoryReadSet` | property | <code>memoryReadSet: TraceSequenceDiff</code> | Public memory Read Set property. |
| `modelCalls` | property | <code>modelCalls: TraceSequenceDiff</code> | Public model Calls property. |
| `output` | property | <code>output: TraceValueDiff</code> | Public output property. |
| `passed` | property | <code>passed: boolean</code> | Public passed property. |
| `policyDecisions` | property | <code>policyDecisions: TraceSequenceDiff</code> | Public policy Decisions property. |
| `statePath` | property | <code>statePath: TraceSequenceDiff</code> | Public state Path property. |
| `toolCalls` | property | <code>toolCalls: TraceSequenceDiff</code> | Public tool Calls property. |

## `TraceSequenceDiff` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actual` | property | <code>actual: string[]</code> | Public actual property. |
| `expected` | property | <code>expected: string[]</code> | Public expected property. |
| `extra` | property | <code>extra: string[]</code> | Public extra property. |
| `mismatches` | property | <code>mismatches: { index: number; expected?: string; actual?: string; }[]</code> | Public mismatches property. |
| `missing` | property | <code>missing: string[]</code> | Public missing property. |
| `passed` | property | <code>passed: boolean</code> | Public passed property. |

## `TraceValueDiff` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actual` | property | <code>actual: unknown</code> | Public actual property. |
| `expected` | property | <code>expected: unknown</code> | Public expected property. |
| `passed` | property | <code>passed: boolean</code> | Public passed property. |
