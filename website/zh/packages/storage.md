# `@codesoul-co/hypha-storage`

`hypha-storage` 描述存储 Provider 与拓扑，不让 Framework 代码耦合连接客户端。它负责校验关系型、文档、Event、Vector、Cache、Queue 和 Artifact 等角色，并在可信组合层解析连接配置。

```bash
npm install @codesoul-co/hypha-storage@1.0.1
```

## 主要契约

| 导出 | 用途 |
| --- | --- |
| `StorageProviderProfile` | 一个版本化 Provider、角色和能力 |
| `StorageTopologySpec` | Provider 集合及默认角色引用 |
| `storageTopologySpecDefinition` | Runtime Parser、示例和 JSON Schema |
| `resolveStorageConnection` | 解析环境变量连接值 |
| `redactStorageConnection` | 生成可安全记录的连接视图 |
| `assertStorageCapability` | 启动时检查必需能力 |
| 各类 `create*StorageProfile` | 一致地构造 Provider Profile |

## 定义本地拓扑

```ts
import {
  createFileArtifactStorageProfile,
  createLocalVectorStorageProfile,
  createSQLiteStorageProfile,
  storageTopologySpecDefinition,
} from '@codesoul-co/hypha-storage';

const eventStore = createSQLiteStorageProfile({
  id: 'storage.events',
  role: 'event_log',
  uri: 'file:./var/events.sqlite',
  database: './var/events.sqlite',
});

const topology = storageTopologySpecDefinition.parse({
  id: 'storage.local',
  version: '1.0.0',
  providers: [
    eventStore,
    createLocalVectorStorageProfile({
      id: 'storage.semantic',
      uri: 'file:./var/vectors.json',
      database: './var/vectors.json',
    }),
    createFileArtifactStorageProfile({
      id: 'storage.artifacts',
      uri: 'file:./var/artifacts',
      rootPath: './var/artifacts',
    }),
  ],
  defaults: {},
});
```

## 安全解析连接

部署时优先使用 `uriEnv`、`usernameEnv`、`passwordEnv` 或 Secret Ref。解析只发生在服务启动组合层。

```ts
import {
  redactStorageConnection,
  resolveStorageConnection,
} from '@codesoul-co/hypha-storage';

const resolved = resolveStorageConnection(topology.providers[0], process.env);
console.info(redactStorageConnection(resolved));
```

拓扑是可移植配置；解析后的连接是特权运行时状态，不能写入 Domain Pack、Event 或 Trace。

## 选择与故障处理

按显式引用或默认角色选择 Provider，启动时确认能力，再构造具体 Adapter，仅向 Runtime 暴露中立 Port。`classifyStorageFailure` 和 `adviseStorageRecovery` 可归一化故障；只有安全且幂等的操作才能重试。

本地具体实现见 [`hypha-adapters-local`](./adapters-local)。
