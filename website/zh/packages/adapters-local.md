# `@codesoul-co/hypha-adapters-local`

`hypha-adapters-local` 提供 Event、结构化/Vector Memory、Artifact、Execution、Workspace 与 Runtime Coordination 的具体本地实现，适用于开发、单节点部署与确定性集成测试。

```bash
npm install @codesoul-co/hypha-adapters-local@1.0.1
```

## Adapter 家族

| 家族 | 代表导出 |
| --- | --- |
| Storage Backbone | `createLocalStorageBackbone`、`createLocalStorageProfiles` |
| Event/Structured/Vector | `SQLiteEventStore`、`SQLiteStructuredStore`、`LocalVectorIndexProvider` |
| Artifact | `FileArtifactStore` 与 Artifact Repository |
| Execution | Local Process、Docker、Remote Sandbox Factory |
| Workspace | `LocalWorkspaceRuntime`、`LocalWorkspaceAdapter` |
| Coordination | SQLite Queue、Lease、Checkpoint、Capacity、Claim Store |
| 生产 Adapter | PostgreSQL Execution、Redis Cache、S3 Artifact Factory |

## 只创建 Profile

```ts
import { createLocalStorageProfiles } from '@codesoul-co/hypha-adapters-local';

const profiles = createLocalStorageProfiles({
  eventDbFilename: './var/events.sqlite',
  structuredDbFilename: './var/structured.sqlite',
  vectorFilename: './var/vectors.json',
  artifactRootPath: './var/artifacts',
});
```

## 创建可用 Backbone

```ts
import { createLocalStorageBackbone } from '@codesoul-co/hypha-adapters-local';

const local = createLocalStorageBackbone({
  rootPath: './var/hypha',
  sqliteMode: 'sqlite',
});
```

返回值包含 Profile 及 Event、Structured、Vector、Artifact、Embedding 和 Hybrid Memory 实现。

Local Process/Docker Adapter 本身不是权限边界，必须置于 Core Execution Contract 与 Tool/Harness Governance 后方，并限制命令、环境、Workspace Path、网络、资源、Deadline 和输出。Cancellation/Crash 后要清理进程与容器。

多实例不能使用进程内 Adapter 共享状态，应换成持久 Event/Execution Store 与共享 Queue/Lease/Capacity。测试要关闭重开以验证持久性，并覆盖 Path Traversal、失败注入、Cleanup 和 Crash Recovery。
