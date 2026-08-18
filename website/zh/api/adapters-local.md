# `@codesoul-co/hypha-adapters-local` API

Local-first SQLite、Vector、Artifact 与 Runtime Adapter。

- 模块指南: [`@codesoul-co/hypha-adapters-local`](/zh/packages/adapters-local)
- 安装: `npm install @codesoul-co/hypha-adapters-local@1.0.1`
- 公共导出: **229**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 70 |
| 函数 | 44 |
| 接口 | 95 |
| 类型 | 14 |
| 常量 | 6 |

## 源码模块

| 模块 | 导出数 | 源码 |
| --- | ---: | --- |
| [`artifact-content-io`](/zh/api/adapters-local/artifact-content-io) | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-content-io.ts) |
| [`artifact-manager-execution-cache-verifier`](/zh/api/adapters-local/artifact-manager-execution-cache-verifier) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-execution-cache-verifier.ts) |
| [`artifact-manager-tool-port`](/zh/api/adapters-local/artifact-manager-tool-port) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-tool-port.ts) |
| [`artifact-store-adapter-error`](/zh/api/adapters-local/artifact-store-adapter-error) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-store-adapter-error.ts) |
| [`common-tool-port-bindings`](/zh/api/adapters-local/common-tool-port-bindings) | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts) |
| [`docker-sandbox-provider-factory`](/zh/api/adapters-local/docker-sandbox-provider-factory) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/docker-sandbox-provider-factory.ts) |
| [`execution-provider-error`](/zh/api/adapters-local/execution-provider-error) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/execution-provider-error.ts) |
| [`execution-provider-values`](/zh/api/adapters-local/execution-provider-values) | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/execution-provider-values.ts) |
| [`in-memory-active-execution-registry`](/zh/api/adapters-local/in-memory-active-execution-registry) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-active-execution-registry.ts) |
| [`in-memory-artifact-record-repository`](/zh/api/adapters-local/in-memory-artifact-record-repository) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-artifact-record-repository.ts) |
| [`in-memory-execution-artifact-store`](/zh/api/adapters-local/in-memory-execution-artifact-store) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-artifact-store.ts) |
| [`in-memory-execution-cache-store`](/zh/api/adapters-local/in-memory-execution-cache-store) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-cache-store.ts) |
| [`index`](/zh/api/adapters-local/entrypoint) | 26 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts) |
| [`legacy-tool-artifact-importer`](/zh/api/adapters-local/legacy-tool-artifact-importer) | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts) |
| [`legacy-tool-artifact-inventory`](/zh/api/adapters-local/legacy-tool-artifact-inventory) | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts) |
| [`legacy-tool-artifact-migration-executor`](/zh/api/adapters-local/legacy-tool-artifact-migration-executor) | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-executor.ts) |
| [`legacy-tool-artifact-migration-planner`](/zh/api/adapters-local/legacy-tool-artifact-migration-planner) | 11 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts) |
| [`legacy-tool-artifact-migration-report`](/zh/api/adapters-local/legacy-tool-artifact-migration-report) | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts) |
| [`legacy-tool-artifact-migration-rollback`](/zh/api/adapters-local/legacy-tool-artifact-migration-rollback) | 8 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-rollback.ts) |
| [`local-artifact-files`](/zh/api/adapters-local/local-artifact-files) | 17 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts) |
| [`local-artifact-manifest`](/zh/api/adapters-local/local-artifact-manifest) | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-manifest.ts) |
| [`local-artifact-store-values`](/zh/api/adapters-local/local-artifact-store-values) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-store-values.ts) |
| [`local-artifact-workspace-content-reader`](/zh/api/adapters-local/local-artifact-workspace-content-reader) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-workspace-content-reader.ts) |
| [`local-filesystem-execution-artifact-store`](/zh/api/adapters-local/local-filesystem-execution-artifact-store) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-filesystem-execution-artifact-store.ts) |
| [`local-process-execution-provider`](/zh/api/adapters-local/local-process-execution-provider) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-execution-provider.ts) |
| [`local-process-output-artifacts`](/zh/api/adapters-local/local-process-output-artifacts) | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts) |
| [`local-process-output-collector`](/zh/api/adapters-local/local-process-output-collector) | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-collector.ts) |
| [`local-process-output-stream-registry`](/zh/api/adapters-local/local-process-output-stream-registry) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-stream-registry.ts) |
| [`local-process-policy`](/zh/api/adapters-local/local-process-policy) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-policy.ts) |
| [`local-process-resource-accounting`](/zh/api/adapters-local/local-process-resource-accounting) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-resource-accounting.ts) |
| [`local-process-result`](/zh/api/adapters-local/local-process-result) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-result.ts) |
| [`local-process-sandbox-provider-factory`](/zh/api/adapters-local/local-process-sandbox-provider-factory) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-sandbox-provider-factory.ts) |
| [`local-sandbox-lifecycle`](/zh/api/adapters-local/local-sandbox-lifecycle) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-sandbox-lifecycle.ts) |
| [`local-workspace-adapter`](/zh/api/adapters-local/local-workspace-adapter) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-adapter.ts) |
| [`local-workspace-snapshot-artifacts`](/zh/api/adapters-local/local-workspace-snapshot-artifacts) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-snapshot-artifacts.ts) |
| [`postgres-execution-store-factory`](/zh/api/adapters-local/postgres-execution-store-factory) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/postgres-execution-store-factory.ts) |
| [`projection-store`](/zh/api/adapters-local/projection-store) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/projection-store.ts) |
| [`react-continuation-checkpoint-store`](/zh/api/adapters-local/react-continuation-checkpoint-store) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/react-continuation-checkpoint-store.ts) |
| [`redis-execution-cache-store`](/zh/api/adapters-local/redis-execution-cache-store) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/redis-execution-cache-store.ts) |
| [`remote-sandbox-provider-factory`](/zh/api/adapters-local/remote-sandbox-provider-factory) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/remote-sandbox-provider-factory.ts) |
| [`run-lease-store`](/zh/api/adapters-local/run-lease-store) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/run-lease-store.ts) |
| [`runtime-capacity-semaphore`](/zh/api/adapters-local/runtime-capacity-semaphore) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-capacity-semaphore.ts) |
| [`runtime-checkpoint-store`](/zh/api/adapters-local/runtime-checkpoint-store) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-checkpoint-store.ts) |
| [`runtime-event-store`](/zh/api/adapters-local/runtime-event-store) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-event-store.ts) |
| [`runtime-integrity-store`](/zh/api/adapters-local/runtime-integrity-store) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-integrity-store.ts) |
| [`s3-execution-artifact-store-factory`](/zh/api/adapters-local/s3-execution-artifact-store-factory) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/s3-execution-artifact-store-factory.ts) |
| [`session-queue`](/zh/api/adapters-local/session-queue) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/session-queue.ts) |
| [`sqlite-artifact-record-repository`](/zh/api/adapters-local/sqlite-artifact-record-repository) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-artifact-record-repository.ts) |
| [`sqlite-driver`](/zh/api/adapters-local/sqlite-driver) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-driver.ts) |
| [`sqlite-execution-store`](/zh/api/adapters-local/sqlite-execution-store) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store.ts) |
| [`sqlite-execution-store-factory`](/zh/api/adapters-local/sqlite-execution-store-factory) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store-factory.ts) |
| [`sqlite-execution-store-foundation`](/zh/api/adapters-local/sqlite-execution-store-foundation) | 1 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store-foundation.ts) |
| [`state-execution-claim-store`](/zh/api/adapters-local/state-execution-claim-store) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/state-execution-claim-store.ts) |
| [`workspace-runtime`](/zh/api/adapters-local/workspace-runtime) | 1 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/workspace-runtime.ts) |

## 阅读顺序

先在上表选择源码模块，再查看该模块导出的 Symbol、签名、说明以及类/接口的公开成员。每个模块页都链接回实际源码。

## 使用约定

- 从包入口导入，不依赖未导出的内部文件。
- 对配置、网络请求和持久化数据使用 Runtime Schema 解析。
- 类实例负责运行时行为；Spec/Interface 负责跨模块契约；不要把 Provider SDK 类型泄漏到 Core。
- 结合[可运行示例](/zh/guide/examples)验证实际调用顺序。
