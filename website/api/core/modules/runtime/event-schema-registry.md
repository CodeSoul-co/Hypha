# `@codesoul-co/hypha-core` / `modules/runtime/event-schema-registry`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/event-schema-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-schema-registry.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryEventSchemaRegistry` | class | <code>new InMemoryEventSchemaRegistry(): InMemoryEventSchemaRegistry</code> | Runtime implementation for In Memory Event Schema Registry; see its public constructor and members below. |
| `EventSchemaDefinition` | interface | <code>interface EventSchemaDefinition</code> | Field contract for Event Schema Definition; see all contract members below. |
| `EventSchemaRegistry` | interface | <code>interface EventSchemaRegistry</code> | Field contract for Event Schema Registry; see all contract members below. |
| `EventUpcaster` | interface | <code>interface EventUpcaster</code> | Field contract for Event Upcaster; see all contract members below. |
| `EventValidationIssue` | interface | <code>interface EventValidationIssue</code> | Field contract for Event Validation Issue; see all contract members below. |
| `EventValidationResult` | interface | <code>interface EventValidationResult</code> | Field contract for Event Validation Result; see all contract members below. |

## `InMemoryEventSchemaRegistry` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryEventSchemaRegistry</code> | Creates an instance of this class. |
| `register` | method | <code>register(definition: EventSchemaDefinition): Promise&lt;void&gt;</code> | Registers register at this module boundary. |
| `registerUpcaster` | method | <code>registerUpcaster(upcaster: EventUpcaster): Promise&lt;void&gt;</code> | Registers Upcaster at this module boundary. |
| `upcast` | method | <code>upcast(event: PersistedFrameworkEvent, targetVersion?: string): Promise&lt;PersistedFrameworkEvent&gt;</code> | Public runtime operation for upcast. |
| `validate` | method | <code>validate(event: EventCreateInput): Promise&lt;EventValidationResult&gt;</code> | Validates validate at this module boundary. |

## `EventSchemaDefinition` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventType` | property | <code>eventType: string</code> | Public event Type property. |
| `schema` | property | <code>schema: JsonSchema</code> | Public schema property. |
| `schemaHash` | property | <code>schemaHash: string</code> | Public schema Hash property. |
| `sensitivePaths` | property | <code>sensitivePaths: string[]</code> | Public sensitive Paths property. |
| `upcasterRefs` | property | <code>upcasterRefs: string[]</code> | Public upcaster Refs property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `EventSchemaRegistry` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `register` | method | <code>register(definition: EventSchemaDefinition): Promise&lt;void&gt;</code> | Registers register at this module boundary. |
| `registerUpcaster` | method | <code>registerUpcaster(upcaster: EventUpcaster): Promise&lt;void&gt;</code> | Registers Upcaster at this module boundary. |
| `upcast` | method | <code>upcast(event: PersistedFrameworkEvent, targetVersion?: string): Promise&lt;PersistedFrameworkEvent&gt;</code> | Public runtime operation for upcast. |
| `validate` | method | <code>validate(event: EventCreateInput): Promise&lt;EventValidationResult&gt;</code> | Validates validate at this module boundary. |

## `EventUpcaster` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventType` | property | <code>eventType: string</code> | Public event Type property. |
| `fromVersion` | property | <code>fromVersion: string</code> | Public from Version property. |
| `ref` | property | <code>ref: string</code> | Public ref property. |
| `toVersion` | property | <code>toVersion: string</code> | Public to Version property. |
| `upcast` | method | <code>upcast(payload: unknown): unknown</code> | Public runtime operation for upcast. |

## `EventValidationIssue` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `code` | property | <code>code: string</code> | Public code property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `path` | property | <code>path: string</code> | Public path property. |

## `EventValidationResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventType` | property | <code>eventType: string</code> | Public event Type property. |
| `issues` | property | <code>issues: EventValidationIssue[]</code> | Public issues property. |
| `schemaHash` | property | <code>schemaHash: string</code> | Public schema Hash property. |
| `valid` | property | <code>valid: boolean</code> | Public valid property. |
| `version` | property | <code>version: string</code> | Public version property. |
