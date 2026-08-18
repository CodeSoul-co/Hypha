# `@codesoul-co/hypha-testing` / `index`

- Package index: [`@codesoul-co/hypha-testing`](/api/testing)
- Package guide: [learning and composition guide](/packages/testing)
- Source: [`packages/testing/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/index.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assertEventTypes` | function | <code>assertEventTypes(fixture: GoldenTraceFixture, expectedTypes: FrameworkEventType[]): boolean</code> | Asserts Event Types at this module boundary. |
| `assertStatePath` | function | <code>assertStatePath(fixture: GoldenTraceFixture, expectedPath: string[]): boolean</code> | Asserts State Path at this module boundary. |
| `collectEventTypes` | function | <code>collectEventTypes(events: FrameworkEvent[]): FrameworkEventType[]</code> | Public runtime operation for collect Event Types. |
| `GoldenTraceFixture` | interface | <code>interface GoldenTraceFixture</code> | Field contract for Golden Trace Fixture; see all contract members below. |

## `GoldenTraceFixture` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | Public events property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `statePath` | property | <code>statePath: string[]</code> | Public state Path property. |
| `version` | property | <code>version: string</code> | Public version property. |
