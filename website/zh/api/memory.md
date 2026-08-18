# `@codesoul-co/hypha-memory` API

Memory 契约、Pipeline、Policy、Store、检索与评估。

- 安装: `npm install @codesoul-co/hypha-memory@1.0.1`
- 入口导入: `import { ... } from '@codesoul-co/hypha-memory';`
- 公共导出: **817**
- 源码模块: **87**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 函数 | 121 |
| 接口 | 393 |
| 类型 | 51 |
| 类 | 95 |
| 常量 | 157 |

## 源码模块

| 模块 | 用途 | 导出数 | 源码 |
| --- | --- | ---: | --- |
| [`bounded-recovery`](/zh/api/memory/bounded-recovery) | 用于处理有界恢复、重试或降级。Bounded recovery 模块公开 2 函数、2 接口、1 类型。 | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/bounded-recovery.ts) |
| [`canonical-runtime-config`](/zh/api/memory/canonical-runtime-config) | 用于执行该边界的运行时行为。Canonical runtime config 模块公开 1 类、3 常量、3 接口。 | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts) |
| [`context-artifacts`](/zh/api/memory/context-artifacts) | 用于使用该功能边界的公共契约与操作。Context artifacts 模块公开 2 类、2 函数、6 接口、1 类型。 | 11 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts) |
| [`context-builder`](/zh/api/memory/context-builder) | 用于使用该功能边界的公共契约与操作。Context builder 模块公开 4 类。 | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-builder.ts) |
| [`context-cache-validity`](/zh/api/memory/context-cache-validity) | 用于读写或协调缓存状态。Context cache validity 模块公开 2 类、1 函数、4 接口。 | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts) |
| [`context-compaction`](/zh/api/memory/context-compaction) | 用于使用该功能边界的公共契约与操作。Context compaction 模块公开 1 类、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-compaction.ts) |
| [`context-contracts`](/zh/api/memory/context-contracts) | 用于声明并运行时校验契约。Context contracts 模块公开 28 接口、1 类型。 | 29 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts) |
| [`context-gateway`](/zh/api/memory/context-gateway) | 用于使用该功能边界的公共契约与操作。Context gateway 模块公开 1 类、4 接口、1 类型。 | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts) |
| [`context-schema`](/zh/api/memory/context-schema) | 用于声明并运行时校验契约。Context schema 模块公开 15 常量、3 函数。 | 18 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts) |
| [`context-source-resolver`](/zh/api/memory/context-source-resolver) | 用于使用该功能边界的公共契约与操作。Context source resolver 模块公开 3 类、1 接口、1 类型。 | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-source-resolver.ts) |
| [`contracts`](/zh/api/memory/contracts) | 用于声明并运行时校验契约。Contracts 模块公开 28 接口、2 类型。 | 30 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts) |
| [`dead-letter-management`](/zh/api/memory/dead-letter-management) | 用于使用该功能边界的公共契约与操作。Dead letter management 模块公开 2 类、2 函数、5 接口、1 类型。 | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts) |
| [`external-adapters`](/zh/api/memory/external-adapters) | 用于把外部或本地 Provider 绑定到 Hypha Port。External adapters 模块公开 4 类、2 常量、2 函数、9 接口、2 类型。 | 19 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts) |
| [`external-memory-identity`](/zh/api/memory/external-memory-identity) | 用于使用该功能边界的公共契约与操作。External memory identity 模块公开 1 函数。 | 1 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-memory-identity.ts) |
| [`external-provider-acceptance`](/zh/api/memory/external-provider-acceptance) | 用于把外部或本地 Provider 绑定到 Hypha Port。External provider acceptance 模块公开 2 函数、6 接口。 | 8 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts) |
| [`external-provider-operations`](/zh/api/memory/external-provider-operations) | 用于把外部或本地 Provider 绑定到 Hypha Port。External provider operations 模块公开 2 类、1 常量、4 函数、2 接口、1 类型。 | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts) |
| [`external-provider-url`](/zh/api/memory/external-provider-url) | 用于把外部或本地 Provider 绑定到 Hypha Port。External provider url 模块公开 2 函数、1 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-url.ts) |
| [`extraction`](/zh/api/memory/extraction) | 用于使用该功能边界的公共契约与操作。Extraction 模块公开 4 类、4 函数、2 接口、1 类型。 | 11 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts) |
| [`governed-memory-manager`](/zh/api/memory/governed-memory-manager) | 用于使用该功能边界的公共契约与操作。Governed memory manager 模块公开 1 类、3 函数、2 接口。 | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts) |
| [`hindsight-local-client`](/zh/api/memory/hindsight-local-client) | 用于把外部或本地 Provider 绑定到 Hypha Port。Hindsight local client 模块公开 1 类、2 常量、2 函数、1 接口。 | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts) |
| [`hindsight-local-factory`](/zh/api/memory/hindsight-local-factory) | 用于使用该功能边界的公共契约与操作。Hindsight local factory 模块公开 1 常量、2 函数、2 接口。 | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-factory.ts) |
| [`hybrid`](/zh/api/memory/hybrid) | 用于使用该功能边界的公共契约与操作。Hybrid 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hybrid.ts) |
| [`index`](/zh/api/memory/entrypoint) | 聚合 `@codesoul-co/hypha-memory` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。 | 40 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts) |
| [`index-outbox`](/zh/api/memory/index-outbox) | 用于使用该功能边界的公共契约与操作。Index outbox 模块公开 3 类、8 接口。 | 11 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts) |
| [`integration-contracts`](/zh/api/memory/integration-contracts) | 用于声明并运行时校验契约。Integration contracts 模块公开 2 类、8 函数、20 接口、2 类型。 | 32 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts) |
| [`integration-json-schema`](/zh/api/memory/integration-json-schema) | 用于声明并运行时校验契约。Integration JSON schema 模块公开 21 常量。 | 21 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts) |
| [`integration-schema`](/zh/api/memory/integration-schema) | 用于声明并运行时校验契约。Integration schema 模块公开 13 常量、8 函数。 | 21 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-schema.ts) |
| [`lifecycle-contracts`](/zh/api/memory/lifecycle-contracts) | 用于声明并运行时校验契约。Lifecycle contracts 模块公开 20 接口、2 类型。 | 22 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts) |
| [`lifecycle-schema`](/zh/api/memory/lifecycle-schema) | 用于声明并运行时校验契约。Lifecycle schema 模块公开 12 常量、2 函数。 | 14 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts) |
| [`lifecycle-workers`](/zh/api/memory/lifecycle-workers) | 用于使用该功能边界的公共契约与操作。Lifecycle workers 模块公开 8 类、5 接口、2 类型。 | 15 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts) |
| [`managed-credentials`](/zh/api/memory/managed-credentials) | 用于使用该功能边界的公共契约与操作。Managed credentials 模块公开 1 类、1 函数、3 接口。 | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-credentials.ts) |
| [`managed-provider-factories`](/zh/api/memory/managed-provider-factories) | 用于把外部或本地 Provider 绑定到 Hypha Port。Managed provider factories 模块公开 2 常量、2 函数、1 接口。 | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-provider-factories.ts) |
| [`managed-search-cache`](/zh/api/memory/managed-search-cache) | 用于读写或协调缓存状态。Managed search cache 模块公开 3 类、2 常量、3 函数、8 接口、4 类型。 | 20 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts) |
| [`managed-store`](/zh/api/memory/managed-store) | 用于持久化并读取该边界的数据。Managed store 模块公开 4 类、1 函数、8 接口。 | 13 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-store.ts) |
| [`mem0-platform-client`](/zh/api/memory/mem0-platform-client) | 用于把外部或本地 Provider 绑定到 Hypha Port。Mem0 platform client 模块公开 1 类、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-platform-client.ts) |
| [`mem0-rest-client`](/zh/api/memory/mem0-rest-client) | 用于把外部或本地 Provider 绑定到 Hypha Port。Mem0 rest client 模块公开 2 类、2 接口、2 类型。 | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts) |
| [`memory-application-service`](/zh/api/memory/memory-application-service) | 用于使用该功能边界的公共契约与操作。Memory application service 模块公开 1 类、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-application-service.ts) |
| [`memory-data-migration`](/zh/api/memory/memory-data-migration) | 用于使用该功能边界的公共契约与操作。Memory data migration 模块公开 2 类、1 函数、5 接口。 | 8 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts) |
| [`memory-events`](/zh/api/memory/memory-events) | 用于创建、记录或读取 Event 契约。Memory events 模块公开 2 函数、3 接口、1 类型。 | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts) |
| [`memory-operational-metrics`](/zh/api/memory/memory-operational-metrics) | 用于使用该功能边界的公共契约与操作。Memory operational metrics 模块公开 1 类、1 函数、4 接口、1 类型。 | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts) |
| [`memory-projection-invalidation`](/zh/api/memory/memory-projection-invalidation) | 用于使用该功能边界的公共契约与操作。Memory projection invalidation 模块公开 3 类、5 接口、1 类型。 | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts) |
| [`memory-runtime-coordinator`](/zh/api/memory/memory-runtime-coordinator) | 用于执行该边界的运行时行为。Memory runtime coordinator 模块公开 3 类、8 接口、1 类型。 | 12 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts) |
| [`memory-runtime-factory`](/zh/api/memory/memory-runtime-factory) | 用于执行该边界的运行时行为。Memory runtime factory 模块公开 2 类、2 常量、1 函数、8 接口、1 类型。 | 14 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts) |
| [`memory-server-consumer-migration`](/zh/api/memory/memory-server-consumer-migration) | 用于使用该功能边界的公共契约与操作。Memory server consumer migration 模块公开 1 常量、3 函数、7 接口、2 类型。 | 13 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts) |
| [`memory-server-migration-acceptance`](/zh/api/memory/memory-server-migration-acceptance) | 用于使用该功能边界的公共契约与操作。Memory server migration acceptance 模块公开 4 函数、8 接口。 | 12 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts) |
| [`memory-server-migration-contract`](/zh/api/memory/memory-server-migration-contract) | 用于声明并运行时校验契约。Memory server migration contract 模块公开 1 常量、1 函数、3 接口、2 类型。 | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts) |
| [`memory-server-migration-fixtures`](/zh/api/memory/memory-server-migration-fixtures) | 用于编写确定性测试与契约断言。Memory server migration fixtures 模块公开 2 常量。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-fixtures.ts) |
| [`memory-server-migration-package`](/zh/api/memory/memory-server-migration-package) | 用于使用该功能边界的公共契约与操作。Memory server migration package 模块公开 1 常量、4 函数、9 接口、2 类型。 | 16 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts) |
| [`memory-server-migration-package-fixtures`](/zh/api/memory/memory-server-migration-package-fixtures) | 用于编写确定性测试与契约断言。Memory server migration package fixtures 模块公开 3 常量。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-fixtures.ts) |
| [`memory-server-migration-package-schema`](/zh/api/memory/memory-server-migration-package-schema) | 用于声明并运行时校验契约。Memory server migration package schema 模块公开 2 常量、1 函数。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-schema.ts) |
| [`memory-server-migration-rehearsal`](/zh/api/memory/memory-server-migration-rehearsal) | 用于使用该功能边界的公共契约与操作。Memory server migration rehearsal 模块公开 1 类、1 函数、7 接口。 | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts) |
| [`memory-server-migration-schema`](/zh/api/memory/memory-server-migration-schema) | 用于声明并运行时校验契约。Memory server migration schema 模块公开 2 常量、1 函数。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-schema.ts) |
| [`memory-server-permanent-migration`](/zh/api/memory/memory-server-permanent-migration) | 用于使用该功能边界的公共契约与操作。Memory server permanent migration 模块公开 1 类、3 函数、7 接口、3 类型。 | 14 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts) |
| [`memory-server-permanent-migration-acceptance`](/zh/api/memory/memory-server-permanent-migration-acceptance) | 用于使用该功能边界的公共契约与操作。Memory server permanent migration acceptance 模块公开 1 函数、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-acceptance.ts) |
| [`memory-server-permanent-migration-fixtures`](/zh/api/memory/memory-server-permanent-migration-fixtures) | 用于编写确定性测试与契约断言。Memory server permanent migration fixtures 模块公开 1 常量、2 函数、2 接口、1 类型。 | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts) |
| [`memory-server-redis-migration`](/zh/api/memory/memory-server-redis-migration) | 用于使用该功能边界的公共契约与操作。Memory server redis migration 模块公开 1 类、1 函数、7 接口。 | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts) |
| [`memory-server-redis-migration-acceptance`](/zh/api/memory/memory-server-redis-migration-acceptance) | 用于使用该功能边界的公共契约与操作。Memory server redis migration acceptance 模块公开 1 函数、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-acceptance.ts) |
| [`memory-server-redis-migration-fixtures`](/zh/api/memory/memory-server-redis-migration-fixtures) | 用于编写确定性测试与契约断言。Memory server redis migration fixtures 模块公开 2 类、1 常量、2 函数、2 接口、2 类型。 | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts) |
| [`memory-utils`](/zh/api/memory/memory-utils) | 用于使用该功能边界的公共契约与操作。Memory utils 模块公开 7 函数。 | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts) |
| [`memory-worker-supervisor`](/zh/api/memory/memory-worker-supervisor) | 用于使用该功能边界的公共契约与操作。Memory worker supervisor 模块公开 1 类、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-worker-supervisor.ts) |
| [`memorybank-local-client`](/zh/api/memory/memorybank-local-client) | 用于把外部或本地 Provider 绑定到 Hypha Port。Memorybank local client 模块公开 1 类、1 常量、2 接口。 | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-local-client.ts) |
| [`memorybank-managed-client`](/zh/api/memory/memorybank-managed-client) | 用于把外部或本地 Provider 绑定到 Hypha Port。Memorybank managed client 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-managed-client.ts) |
| [`mongo-structured-store`](/zh/api/memory/mongo-structured-store) | 用于持久化并读取该边界的数据。Mongo structured store 模块公开 1 类、1 函数、7 接口、1 类型。 | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts) |
| [`native-maintenance`](/zh/api/memory/native-maintenance) | 用于使用该功能边界的公共契约与操作。Native maintenance 模块公开 1 类、1 类型。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-maintenance.ts) |
| [`native-memory`](/zh/api/memory/native-memory) | 用于使用该功能边界的公共契约与操作。Native memory 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory.ts) |
| [`native-memory-runtime`](/zh/api/memory/native-memory-runtime) | 用于执行该边界的运行时行为。Native memory runtime 模块公开 1 函数、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory-runtime.ts) |
| [`operation-contract`](/zh/api/memory/operation-contract) | 用于声明并运行时校验契约。Operation contract 模块公开 8 常量、4 函数。 | 12 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts) |
| [`operations`](/zh/api/memory/operations) | 用于使用该功能边界的公共契约与操作。Operations 模块公开 20 接口。 | 20 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts) |
| [`profile-contract`](/zh/api/memory/profile-contract) | 用于声明并运行时校验契约。Profile contract 模块公开 34 常量、5 函数。 | 39 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts) |
| [`provider-governance`](/zh/api/memory/provider-governance) | 用于把外部或本地 Provider 绑定到 Hypha Port。Provider governance 模块公开 1 类、2 函数、5 接口。 | 8 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts) |
| [`provider-observability`](/zh/api/memory/provider-observability) | 用于把外部或本地 Provider 绑定到 Hypha Port。Provider observability 模块公开 2 类、6 接口、3 类型。 | 11 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts) |
| [`provider-operational-health`](/zh/api/memory/provider-operational-health) | 用于把外部或本地 Provider 绑定到 Hypha Port。Provider operational health 模块公开 1 类、4 接口、2 类型。 | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts) |
| [`provider-pagination`](/zh/api/memory/provider-pagination) | 用于把外部或本地 Provider 绑定到 Hypha Port。Provider pagination 模块公开 3 函数、2 接口。 | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-pagination.ts) |
| [`provider-reconciliation`](/zh/api/memory/provider-reconciliation) | 用于把外部或本地 Provider 绑定到 Hypha Port。Provider reconciliation 模块公开 2 函数、2 接口。 | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-reconciliation.ts) |
| [`provider-return-evidence`](/zh/api/memory/provider-return-evidence) | 用于把外部或本地 Provider 绑定到 Hypha Port。Provider return evidence 模块公开 1 常量、2 函数、3 接口。 | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts) |
| [`record-contract`](/zh/api/memory/record-contract) | 用于声明并运行时校验契约。Record contract 模块公开 13 常量、1 函数。 | 14 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts) |
| [`recovery`](/zh/api/memory/recovery) | 用于处理有界恢复、重试或降级。Recovery 模块公开 2 函数、3 接口、1 类型。 | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts) |
| [`retrieval`](/zh/api/memory/retrieval) | 用于使用该功能边界的公共契约与操作。Retrieval 模块公开 4 类、1 函数、14 接口、1 类型。 | 20 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts) |
| [`self-hosted-provider-factories`](/zh/api/memory/self-hosted-provider-factories) | 用于把外部或本地 Provider 绑定到 Hypha Port。Self hosted provider factories 模块公开 1 常量、2 函数、2 接口。 | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/self-hosted-provider-factories.ts) |
| [`structured-external-mapping-store`](/zh/api/memory/structured-external-mapping-store) | 用于持久化并读取该边界的数据。Structured external mapping store 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-external-mapping-store.ts) |
| [`structured-extraction-state-store`](/zh/api/memory/structured-extraction-state-store) | 用于持久化并读取该边界的数据。Structured extraction state store 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-extraction-state-store.ts) |
| [`structured-idempotency-store`](/zh/api/memory/structured-idempotency-store) | 用于持久化并读取该边界的数据。Structured idempotency store 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-idempotency-store.ts) |
| [`structured-lifecycle-task-store`](/zh/api/memory/structured-lifecycle-task-store) | 用于持久化并读取该边界的数据。Structured lifecycle task store 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-lifecycle-task-store.ts) |
| [`structured-managed-store`](/zh/api/memory/structured-managed-store) | 用于持久化并读取该边界的数据。Structured managed store 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-managed-store.ts) |
| [`structured-memory-persistence`](/zh/api/memory/structured-memory-persistence) | 用于持久化并读取该边界的数据。Structured memory persistence 模块公开 2 类、2 接口。 | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-memory-persistence.ts) |
| [`structured-vector-store`](/zh/api/memory/structured-vector-store) | 用于持久化并读取该边界的数据。Structured vector store 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-vector-store.ts) |
| [`working-store`](/zh/api/memory/working-store) | 用于持久化并读取该边界的数据。Working store 模块公开 2 类、4 接口。 | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts) |

## 导入边界

本页只记录 `@codesoul-co/hypha-memory` 包入口导出的公共 API。`packages/memory/src` 中未由入口导出的实现不属于该 npm 包的公共契约。
