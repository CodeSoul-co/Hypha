# `@codesoul-co/hypha-memory` / `memory-server-permanent-migration-acceptance`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-server-permanent-migration-acceptance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-acceptance.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runPermanentMemoryBehaviorAcceptance` | 函数 | <code>runPermanentMemoryBehaviorAcceptance(factory: PermanentMemoryMigrationHarnessFactory, fixtures?: readonly PermanentMemoryFailureFixture[]): Promise&lt;PermanentMemoryBehaviorReport&gt;</code> | run Permanent Memory Behavior Acceptance 的公开运行时操作。 |
| `PermanentMemoryBehaviorFinding` | 接口 | <code>interface PermanentMemoryBehaviorFinding</code> | Permanent Memory Behavior Finding 的字段契约；完整字段见下表。 |
| `PermanentMemoryBehaviorReport` | 接口 | <code>interface PermanentMemoryBehaviorReport</code> | Permanent Memory Behavior Report 的字段契约；完整字段见下表。 |

## `PermanentMemoryBehaviorFinding` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `code` | 属性 | <code>code: string</code> | code 字段。 |
| `fixtureId` | 属性 | <code>fixtureId: string</code> | fixture Id 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |

## `PermanentMemoryBehaviorReport` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cases` | 属性 | <code>cases: number</code> | cases 字段。 |
| `findings` | 属性 | <code>findings: PermanentMemoryBehaviorFinding[]</code> | findings 字段。 |
| `passed` | 属性 | <code>passed: boolean</code> | passed 字段。 |
