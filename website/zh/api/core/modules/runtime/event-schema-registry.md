# `@codesoul-co/hypha-core` / `modules/runtime/event-schema-registry`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/event-schema-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-schema-registry.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryEventSchemaRegistry` | 类 | <code>new InMemoryEventSchemaRegistry(): InMemoryEventSchemaRegistry</code> | In Memory Event Schema Registry 的运行时实现；公开构造函数与成员见下表。 |
| `EventSchemaDefinition` | 接口 | <code>interface EventSchemaDefinition</code> | Event Schema Definition 的字段契约；完整字段见下表。 |
| `EventSchemaRegistry` | 接口 | <code>interface EventSchemaRegistry</code> | Event Schema Registry 的字段契约；完整字段见下表。 |
| `EventUpcaster` | 接口 | <code>interface EventUpcaster</code> | Event Upcaster 的字段契约；完整字段见下表。 |
| `EventValidationIssue` | 接口 | <code>interface EventValidationIssue</code> | Event Validation Issue 的字段契约；完整字段见下表。 |
| `EventValidationResult` | 接口 | <code>interface EventValidationResult</code> | Event Validation Result 的字段契约；完整字段见下表。 |

## `InMemoryEventSchemaRegistry` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryEventSchemaRegistry</code> | 创建该类的实例。 |
| `register` | 方法 | <code>register(definition: EventSchemaDefinition): Promise&lt;void&gt;</code> | 注册 register。 |
| `registerUpcaster` | 方法 | <code>registerUpcaster(upcaster: EventUpcaster): Promise&lt;void&gt;</code> | 注册 Upcaster。 |
| `upcast` | 方法 | <code>upcast(event: PersistedFrameworkEvent, targetVersion?: string): Promise&lt;PersistedFrameworkEvent&gt;</code> | upcast 的公开运行时操作。 |
| `validate` | 方法 | <code>validate(event: EventCreateInput): Promise&lt;EventValidationResult&gt;</code> | 校验 validate。 |

## `EventSchemaDefinition` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventType` | 属性 | <code>eventType: string</code> | event Type 字段。 |
| `schema` | 属性 | <code>schema: JsonSchema</code> | schema 字段。 |
| `schemaHash` | 属性 | <code>schemaHash: string</code> | schema Hash 字段。 |
| `sensitivePaths` | 属性 | <code>sensitivePaths: string[]</code> | sensitive Paths 字段。 |
| `upcasterRefs` | 属性 | <code>upcasterRefs: string[]</code> | upcaster Refs 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `EventSchemaRegistry` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `register` | 方法 | <code>register(definition: EventSchemaDefinition): Promise&lt;void&gt;</code> | 注册 register。 |
| `registerUpcaster` | 方法 | <code>registerUpcaster(upcaster: EventUpcaster): Promise&lt;void&gt;</code> | 注册 Upcaster。 |
| `upcast` | 方法 | <code>upcast(event: PersistedFrameworkEvent, targetVersion?: string): Promise&lt;PersistedFrameworkEvent&gt;</code> | upcast 的公开运行时操作。 |
| `validate` | 方法 | <code>validate(event: EventCreateInput): Promise&lt;EventValidationResult&gt;</code> | 校验 validate。 |

## `EventUpcaster` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventType` | 属性 | <code>eventType: string</code> | event Type 字段。 |
| `fromVersion` | 属性 | <code>fromVersion: string</code> | from Version 字段。 |
| `ref` | 属性 | <code>ref: string</code> | ref 字段。 |
| `toVersion` | 属性 | <code>toVersion: string</code> | to Version 字段。 |
| `upcast` | 方法 | <code>upcast(payload: unknown): unknown</code> | upcast 的公开运行时操作。 |

## `EventValidationIssue` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `code` | 属性 | <code>code: string</code> | code 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `path` | 属性 | <code>path: string</code> | path 字段。 |

## `EventValidationResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventType` | 属性 | <code>eventType: string</code> | event Type 字段。 |
| `issues` | 属性 | <code>issues: EventValidationIssue[]</code> | issues 字段。 |
| `schemaHash` | 属性 | <code>schemaHash: string</code> | schema Hash 字段。 |
| `valid` | 属性 | <code>valid: boolean</code> | valid 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
