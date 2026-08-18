# `@codesoul-co/hypha-testing` / `index`

- 包索引: [`@codesoul-co/hypha-testing`](/zh/api/testing)
- 模块指南: [学习与组合说明](/zh/packages/testing)
- 源码: [`packages/testing/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/index.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assertEventTypes` | 函数 | <code>assertEventTypes(fixture: GoldenTraceFixture, expectedTypes: FrameworkEventType[]): boolean</code> | 断言 Event Types。 |
| `assertStatePath` | 函数 | <code>assertStatePath(fixture: GoldenTraceFixture, expectedPath: string[]): boolean</code> | 断言 State Path。 |
| `collectEventTypes` | 函数 | <code>collectEventTypes(events: FrameworkEvent[]): FrameworkEventType[]</code> | collect Event Types 的公开运行时操作。 |
| `GoldenTraceFixture` | 接口 | <code>interface GoldenTraceFixture</code> | Golden Trace Fixture 的字段契约；完整字段见下表。 |

## `GoldenTraceFixture` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | events 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | state Path 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
