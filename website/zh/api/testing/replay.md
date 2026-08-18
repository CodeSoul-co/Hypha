# `@codesoul-co/hypha-testing` / `replay`

- 包索引: [`@codesoul-co/hypha-testing`](/zh/api/testing)
- 模块指南: [学习与组合说明](/zh/packages/testing)
- 源码: [`packages/testing/src/replay.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts)
- 导出数: **16**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `FileReplayFixtureStore` | 类 | <code>new FileReplayFixtureStore(options: FileReplayFixtureStoreOptions): FileReplayFixtureStore</code> | File Replay Fixture Store 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryReplayFixtureStore` | 类 | <code>new InMemoryReplayFixtureStore(): InMemoryReplayFixtureStore</code> | In Memory Replay Fixture Store 的运行时实现；公开构造函数与成员见下表。 |
| `ReplayEngine` | 类 | <code>new ReplayEngine(options?: ReplayEngineOptions): ReplayEngine</code> | Replay Engine 的运行时实现；公开构造函数与成员见下表。 |
| `diffStringSequences` | 函数 | <code>diffStringSequences(expected: string[], actual: string[]): TraceSequenceDiff</code> | diff String Sequences 的公开运行时操作。 |
| `normalizeEvents` | 函数 | <code>normalizeEvents(events: FrameworkEvent[]): FrameworkEvent[]</code> | 规范化 Events。 |
| `projectReplay` | 函数 | <code>projectReplay(events: FrameworkEvent[]): ReplayProjection</code> | 投影 Replay。 |
| `FileReplayFixtureStoreOptions` | 接口 | <code>interface FileReplayFixtureStoreOptions</code> | File Replay Fixture Store Options 的字段契约；完整字段见下表。 |
| `ReplayCaptureInput` | 接口 | <code>interface ReplayCaptureInput</code> | Replay Capture Input 的字段契约；完整字段见下表。 |
| `ReplayEngineOptions` | 接口 | <code>interface ReplayEngineOptions</code> | Replay Engine Options 的字段契约；完整字段见下表。 |
| `ReplayFixture` | 接口 | <code>interface ReplayFixture</code> | Replay Fixture 的字段契约；完整字段见下表。 |
| `ReplayFixtureStore` | 接口 | <code>interface ReplayFixtureStore</code> | Replay Fixture Store 的字段契约；完整字段见下表。 |
| `ReplayProjection` | 接口 | <code>interface ReplayProjection</code> | Replay Projection 的字段契约；完整字段见下表。 |
| `ReplayResult` | 接口 | <code>interface ReplayResult</code> | Replay Result 的字段契约；完整字段见下表。 |
| `TraceDiff` | 接口 | <code>interface TraceDiff</code> | Trace Diff 的字段契约；完整字段见下表。 |
| `TraceSequenceDiff` | 接口 | <code>interface TraceSequenceDiff</code> | Trace Sequence Diff 的字段契约；完整字段见下表。 |
| `TraceValueDiff` | 接口 | <code>interface TraceValueDiff</code> | Trace Value Diff 的字段契约；完整字段见下表。 |

## `FileReplayFixtureStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: FileReplayFixtureStoreOptions): FileReplayFixtureStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(id: string): Promise&lt;ReplayFixture &#124; null&gt;</code> | 读取 get。 |
| `list` | 方法 | <code>list(): Promise&lt;ReplayFixture[]&gt;</code> | 列出 list。 |
| `save` | 方法 | <code>save(fixture: ReplayFixture): Promise&lt;void&gt;</code> | 保存 save。 |

## `InMemoryReplayFixtureStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryReplayFixtureStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(id: string): Promise&lt;ReplayFixture &#124; null&gt;</code> | 读取 get。 |
| `list` | 方法 | <code>list(): Promise&lt;ReplayFixture[]&gt;</code> | 列出 list。 |
| `save` | 方法 | <code>save(fixture: ReplayFixture): Promise&lt;void&gt;</code> | 保存 save。 |

## `ReplayEngine` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capture` | 方法 | <code>capture(input: ReplayCaptureInput): Promise&lt;ReplayFixture&gt;</code> | capture 的公开运行时操作。 |
| `compare` | 方法 | <code>compare(expected: ReplayFixture, actual: ReplayFixture &#124; FrameworkEvent[]): TraceDiff</code> | compare 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options?: ReplayEngineOptions): ReplayEngine</code> | 创建该类的实例。 |
| `getFixture` | 方法 | <code>getFixture(id: string): Promise&lt;ReplayFixture &#124; null&gt;</code> | 读取 Fixture。 |
| `listFixtures` | 方法 | <code>listFixtures(): Promise&lt;ReplayFixture[]&gt;</code> | 列出 Fixtures。 |
| `replay` | 方法 | <code>replay(fixture: ReplayFixture): ReplayResult</code> | replay 的公开运行时操作。 |

## `FileReplayFixtureStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `directory` | 属性 | <code>directory: string</code> | directory 字段。 |
| `extension` | 属性 | <code>extension: string</code> | extension 字段。 |

## `ReplayCaptureInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | events 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `outputContract` | 属性 | <code>outputContract: OutputContractSpec</code> | output Contract 字段。 |
| `replaySpec` | 属性 | <code>replaySpec: ReplaySpec</code> | replay Spec 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `ReplayEngineOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `eventStore` | 属性 | <code>eventStore: EventStore</code> | event Store 字段。 |
| `fixtureStore` | 属性 | <code>fixtureStore: ReplayFixtureStore</code> | fixture Store 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `trace` | 属性 | <code>trace: TraceRecorder</code> | trace 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ReplayFixture` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `events` | 属性 | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | events 字段。 |
| `eventTypes` | 属性 | <code>eventTypes: string[]</code> | event Types 字段。 |
| `finalOutput` | 属性 | <code>finalOutput: unknown</code> | final Output 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `memoryReadSet` | 属性 | <code>memoryReadSet: string[]</code> | memory Read Set 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelCalls` | 属性 | <code>modelCalls: string[]</code> | model Calls 字段。 |
| `outputContract` | 属性 | <code>outputContract: OutputContractSpec</code> | output Contract 字段。 |
| `policyDecisions` | 属性 | <code>policyDecisions: string[]</code> | policy Decisions 字段。 |
| `replaySpecRef` | 属性 | <code>replaySpecRef: SpecRef</code> | replay Spec Ref 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | state Path 字段。 |
| `toolCalls` | 属性 | <code>toolCalls: string[]</code> | tool Calls 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `ReplayFixtureStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(id: string): Promise&lt;ReplayFixture &#124; null&gt;</code> | 读取 get。 |
| `list` | 方法 | <code>list(): Promise&lt;ReplayFixture[]&gt;</code> | 列出 list。 |
| `save` | 方法 | <code>save(fixture: ReplayFixture): Promise&lt;void&gt;</code> | 保存 save。 |

## `ReplayProjection` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | events 字段。 |
| `eventTypes` | 属性 | <code>eventTypes: string[]</code> | event Types 字段。 |
| `finalOutput` | 属性 | <code>finalOutput: unknown</code> | final Output 字段。 |
| `memoryReadSet` | 属性 | <code>memoryReadSet: string[]</code> | memory Read Set 字段。 |
| `modelCalls` | 属性 | <code>modelCalls: string[]</code> | model Calls 字段。 |
| `policyDecisions` | 属性 | <code>policyDecisions: string[]</code> | policy Decisions 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | state Path 字段。 |
| `toolCalls` | 属性 | <code>toolCalls: string[]</code> | tool Calls 字段。 |

## `ReplayResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fixtureId` | 属性 | <code>fixtureId: string</code> | fixture Id 字段。 |
| `projection` | 属性 | <code>projection: ReplayProjection</code> | projection 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |

## `TraceDiff` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventTypes` | 属性 | <code>eventTypes: TraceSequenceDiff</code> | event Types 字段。 |
| `memoryReadSet` | 属性 | <code>memoryReadSet: TraceSequenceDiff</code> | memory Read Set 字段。 |
| `modelCalls` | 属性 | <code>modelCalls: TraceSequenceDiff</code> | model Calls 字段。 |
| `output` | 属性 | <code>output: TraceValueDiff</code> | output 字段。 |
| `passed` | 属性 | <code>passed: boolean</code> | passed 字段。 |
| `policyDecisions` | 属性 | <code>policyDecisions: TraceSequenceDiff</code> | policy Decisions 字段。 |
| `statePath` | 属性 | <code>statePath: TraceSequenceDiff</code> | state Path 字段。 |
| `toolCalls` | 属性 | <code>toolCalls: TraceSequenceDiff</code> | tool Calls 字段。 |

## `TraceSequenceDiff` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actual` | 属性 | <code>actual: string[]</code> | actual 字段。 |
| `expected` | 属性 | <code>expected: string[]</code> | expected 字段。 |
| `extra` | 属性 | <code>extra: string[]</code> | extra 字段。 |
| `mismatches` | 属性 | <code>mismatches: { index: number; expected?: string; actual?: string; }[]</code> | mismatches 字段。 |
| `missing` | 属性 | <code>missing: string[]</code> | missing 字段。 |
| `passed` | 属性 | <code>passed: boolean</code> | passed 字段。 |

## `TraceValueDiff` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actual` | 属性 | <code>actual: unknown</code> | actual 字段。 |
| `expected` | 属性 | <code>expected: unknown</code> | expected 字段。 |
| `passed` | 属性 | <code>passed: boolean</code> | passed 字段。 |
