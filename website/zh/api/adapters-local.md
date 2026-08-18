# `@codesoul-co/hypha-adapters-local` API

Local-first SQLite、Vector、Artifact 与 Runtime Adapter。

- 安装: `npm install @codesoul-co/hypha-adapters-local@1.0.1`
- 入口导入: `import { ... } from '@codesoul-co/hypha-adapters-local';`
- 公共导出: **229**
- 源码模块: **54**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 70 |
| 函数 | 44 |
| 接口 | 95 |
| 类型 | 14 |
| 常量 | 6 |

## 源码模块

| 模块 | 用途 | 导出数 | 源码 |
| --- | --- | ---: | --- |
| [`artifact-content-io`](/zh/api/adapters-local/artifact-content-io) | 用于使用该功能边界的公共契约与操作。Artifact content io 模块公开 1 类、4 函数、1 接口。 | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-content-io.ts) |
| [`artifact-manager-execution-cache-verifier`](/zh/api/adapters-local/artifact-manager-execution-cache-verifier) | 用于执行该边界的运行时行为。Artifact manager execution cache verifier 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-execution-cache-verifier.ts) |
| [`artifact-manager-tool-port`](/zh/api/adapters-local/artifact-manager-tool-port) | 用于定义或实现 Provider-neutral Port。Artifact manager tool port 模块公开 1 类、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-tool-port.ts) |
| [`artifact-store-adapter-error`](/zh/api/adapters-local/artifact-store-adapter-error) | 用于把外部或本地 Provider 绑定到 Hypha Port。Artifact store adapter error 模块公开 1 类、2 函数。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-store-adapter-error.ts) |
| [`common-tool-port-bindings`](/zh/api/adapters-local/common-tool-port-bindings) | 用于定义或实现 Provider-neutral Port。Common tool port bindings 模块公开 3 类、3 接口、1 类型。 | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts) |
| [`docker-sandbox-provider-factory`](/zh/api/adapters-local/docker-sandbox-provider-factory) | 用于把外部或本地 Provider 绑定到 Hypha Port。Docker sandbox provider factory 模块公开 1 类、1 常量、1 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/docker-sandbox-provider-factory.ts) |
| [`execution-provider-error`](/zh/api/adapters-local/execution-provider-error) | 用于把外部或本地 Provider 绑定到 Hypha Port。Execution provider error 模块公开 1 类、1 函数。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/execution-provider-error.ts) |
| [`execution-provider-values`](/zh/api/adapters-local/execution-provider-values) | 用于把外部或本地 Provider 绑定到 Hypha Port。Execution provider values 模块公开 5 函数。 | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/execution-provider-values.ts) |
| [`in-memory-active-execution-registry`](/zh/api/adapters-local/in-memory-active-execution-registry) | 用于注册并解析版本化能力或实现。In memory active execution registry 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-active-execution-registry.ts) |
| [`in-memory-artifact-record-repository`](/zh/api/adapters-local/in-memory-artifact-record-repository) | 用于持久化并读取该边界的数据。In memory artifact record repository 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-artifact-record-repository.ts) |
| [`in-memory-execution-artifact-store`](/zh/api/adapters-local/in-memory-execution-artifact-store) | 用于持久化并读取该边界的数据。In memory execution artifact store 模块公开 1 类、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-artifact-store.ts) |
| [`in-memory-execution-cache-store`](/zh/api/adapters-local/in-memory-execution-cache-store) | 用于持久化并读取该边界的数据。In memory execution cache store 模块公开 2 类、2 接口。 | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-cache-store.ts) |
| [`index`](/zh/api/adapters-local/entrypoint) | 聚合 `@codesoul-co/hypha-adapters-local` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。 | 26 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts) |
| [`legacy-tool-artifact-importer`](/zh/api/adapters-local/legacy-tool-artifact-importer) | 用于定义或实现 Provider-neutral Port。Legacy tool artifact importer 模块公开 2 类、1 函数、3 接口、1 类型。 | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts) |
| [`legacy-tool-artifact-inventory`](/zh/api/adapters-local/legacy-tool-artifact-inventory) | 用于使用该功能边界的公共契约与操作。Legacy tool artifact inventory 模块公开 2 类、3 接口、1 类型。 | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts) |
| [`legacy-tool-artifact-migration-executor`](/zh/api/adapters-local/legacy-tool-artifact-migration-executor) | 用于执行该边界的运行时行为。Legacy tool artifact migration executor 模块公开 2 类、7 接口、1 类型。 | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts) |
| [`legacy-tool-artifact-migration-planner`](/zh/api/adapters-local/legacy-tool-artifact-migration-planner) | 用于使用该功能边界的公共契约与操作。Legacy tool artifact migration planner 模块公开 2 类、7 接口、2 类型。 | 11 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts) |
| [`legacy-tool-artifact-migration-report`](/zh/api/adapters-local/legacy-tool-artifact-migration-report) | 用于定义或实现 Provider-neutral Port。Legacy tool artifact migration report 模块公开 6 函数、3 接口。 | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts) |
| [`legacy-tool-artifact-migration-rollback`](/zh/api/adapters-local/legacy-tool-artifact-migration-rollback) | 用于使用该功能边界的公共契约与操作。Legacy tool artifact migration rollback 模块公开 2 类、5 接口、1 类型。 | 8 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts) |
| [`local-artifact-files`](/zh/api/adapters-local/local-artifact-files) | 用于使用该功能边界的公共契约与操作。Local artifact files 模块公开 2 类、13 函数、2 接口。 | 17 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts) |
| [`local-artifact-manifest`](/zh/api/adapters-local/local-artifact-manifest) | 用于使用该功能边界的公共契约与操作。Local artifact manifest 模块公开 4 函数、1 接口。 | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-manifest.ts) |
| [`local-artifact-store-values`](/zh/api/adapters-local/local-artifact-store-values) | 用于持久化并读取该边界的数据。Local artifact store values 模块公开 4 函数。 | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-store-values.ts) |
| [`local-artifact-workspace-content-reader`](/zh/api/adapters-local/local-artifact-workspace-content-reader) | 用于声明并实施 Workspace 作用域边界。Local artifact workspace content reader 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-workspace-content-reader.ts) |
| [`local-filesystem-execution-artifact-store`](/zh/api/adapters-local/local-filesystem-execution-artifact-store) | 用于持久化并读取该边界的数据。Local filesystem execution artifact store 模块公开 1 类、3 接口。 | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-filesystem-execution-artifact-store.ts) |
| [`local-process-execution-provider`](/zh/api/adapters-local/local-process-execution-provider) | 用于把外部或本地 Provider 绑定到 Hypha Port。Local process execution provider 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-execution-provider.ts) |
| [`local-process-output-artifacts`](/zh/api/adapters-local/local-process-output-artifacts) | 用于使用该功能边界的公共契约与操作。Local process output artifacts 模块公开 1 类、5 接口、1 类型。 | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts) |
| [`local-process-output-collector`](/zh/api/adapters-local/local-process-output-collector) | 用于使用该功能边界的公共契约与操作。Local process output collector 模块公开 1 类、3 接口、1 类型。 | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-collector.ts) |
| [`local-process-output-stream-registry`](/zh/api/adapters-local/local-process-output-stream-registry) | 用于注册并解析版本化能力或实现。Local process output stream registry 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-stream-registry.ts) |
| [`local-process-policy`](/zh/api/adapters-local/local-process-policy) | 用于实施 Policy 与治理检查。Local process policy 模块公开 1 类、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-policy.ts) |
| [`local-process-resource-accounting`](/zh/api/adapters-local/local-process-resource-accounting) | 用于使用该功能边界的公共契约与操作。Local process resource accounting 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-resource-accounting.ts) |
| [`local-process-result`](/zh/api/adapters-local/local-process-result) | 用于使用该功能边界的公共契约与操作。Local process result 模块公开 1 函数、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-result.ts) |
| [`local-process-sandbox-provider-factory`](/zh/api/adapters-local/local-process-sandbox-provider-factory) | 用于把外部或本地 Provider 绑定到 Hypha Port。Local process sandbox provider factory 模块公开 1 类、1 常量、1 类型。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-sandbox-provider-factory.ts) |
| [`local-sandbox-lifecycle`](/zh/api/adapters-local/local-sandbox-lifecycle) | 用于使用该功能边界的公共契约与操作。Local sandbox lifecycle 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-sandbox-lifecycle.ts) |
| [`local-workspace-adapter`](/zh/api/adapters-local/local-workspace-adapter) | 用于声明并实施 Workspace 作用域边界。Local workspace adapter 模块公开 1 类、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-adapter.ts) |
| [`local-workspace-snapshot-artifacts`](/zh/api/adapters-local/local-workspace-snapshot-artifacts) | 用于声明并实施 Workspace 作用域边界。Local workspace snapshot artifacts 模块公开 1 类、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-snapshot-artifacts.ts) |
| [`postgres-execution-store-factory`](/zh/api/adapters-local/postgres-execution-store-factory) | 用于持久化并读取该边界的数据。Postgres execution store factory 模块公开 1 类、1 常量、1 类型。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/postgres-execution-store-factory.ts) |
| [`projection-store`](/zh/api/adapters-local/projection-store) | 用于持久化并读取该边界的数据。Projection store 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/projection-store.ts) |
| [`react-continuation-checkpoint-store`](/zh/api/adapters-local/react-continuation-checkpoint-store) | 用于持久化并读取该边界的数据。React continuation checkpoint store 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/react-continuation-checkpoint-store.ts) |
| [`redis-execution-cache-store`](/zh/api/adapters-local/redis-execution-cache-store) | 用于持久化并读取该边界的数据。Redis execution cache store 模块公开 1 类、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/redis-execution-cache-store.ts) |
| [`remote-sandbox-provider-factory`](/zh/api/adapters-local/remote-sandbox-provider-factory) | 用于把外部或本地 Provider 绑定到 Hypha Port。Remote sandbox provider factory 模块公开 1 类、1 常量、1 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/remote-sandbox-provider-factory.ts) |
| [`run-lease-store`](/zh/api/adapters-local/run-lease-store) | 用于持久化并读取该边界的数据。Run lease store 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/run-lease-store.ts) |
| [`runtime-capacity-semaphore`](/zh/api/adapters-local/runtime-capacity-semaphore) | 用于执行该边界的运行时行为。Runtime capacity semaphore 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-capacity-semaphore.ts) |
| [`runtime-checkpoint-store`](/zh/api/adapters-local/runtime-checkpoint-store) | 用于持久化并读取该边界的数据。Runtime checkpoint store 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-checkpoint-store.ts) |
| [`runtime-event-store`](/zh/api/adapters-local/runtime-event-store) | 用于创建、记录或读取 Event 契约。Runtime event store 模块公开 1 类、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-event-store.ts) |
| [`runtime-integrity-store`](/zh/api/adapters-local/runtime-integrity-store) | 用于持久化并读取该边界的数据。Runtime integrity store 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-integrity-store.ts) |
| [`s3-execution-artifact-store-factory`](/zh/api/adapters-local/s3-execution-artifact-store-factory) | 用于持久化并读取该边界的数据。S3 execution artifact store factory 模块公开 1 类、1 类型。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/s3-execution-artifact-store-factory.ts) |
| [`session-queue`](/zh/api/adapters-local/session-queue) | 用于使用该功能边界的公共契约与操作。Session queue 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/session-queue.ts) |
| [`sqlite-artifact-record-repository`](/zh/api/adapters-local/sqlite-artifact-record-repository) | 用于持久化并读取该边界的数据。Sqlite artifact record repository 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-artifact-record-repository.ts) |
| [`sqlite-driver`](/zh/api/adapters-local/sqlite-driver) | 用于使用该功能边界的公共契约与操作。Sqlite driver 模块公开 1 函数、3 接口。 | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-driver.ts) |
| [`sqlite-execution-store`](/zh/api/adapters-local/sqlite-execution-store) | 用于持久化并读取该边界的数据。Sqlite execution store 模块公开 1 类、2 类型。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store.ts) |
| [`sqlite-execution-store-factory`](/zh/api/adapters-local/sqlite-execution-store-factory) | 用于持久化并读取该边界的数据。Sqlite execution store factory 模块公开 1 类、1 常量。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store-factory.ts) |
| [`sqlite-execution-store-foundation`](/zh/api/adapters-local/sqlite-execution-store-foundation) | 用于持久化并读取该边界的数据。Sqlite execution store foundation 模块公开 1 类。 | 1 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store-foundation.ts) |
| [`state-execution-claim-store`](/zh/api/adapters-local/state-execution-claim-store) | 用于持久化并读取该边界的数据。State execution claim store 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/state-execution-claim-store.ts) |
| [`workspace-runtime`](/zh/api/adapters-local/workspace-runtime) | 用于声明并实施 Workspace 作用域边界。Workspace runtime 模块公开 1 类。 | 1 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/workspace-runtime.ts) |

## 导入边界

本页只记录 `@codesoul-co/hypha-adapters-local` 包入口导出的公共 API。`packages/adapters-local/src` 中未由入口导出的实现不属于该 npm 包的公共契约。
