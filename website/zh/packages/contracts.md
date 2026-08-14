# 契约：Core 与 Storage

这两个包定义整个系统的公共语言。请在组合边界导入 Spec，并让 Provider SDK 对象始终留在契约之外。

## [`hypha-core`](./core)

Core 提供版本化系统 Spec、Framework Event、内存 EventStore 与 Policy 原语。

```ts
import {
  createFrameworkEvent,
  harnessedAgentSystemSpecDefinition,
} from '@codesoul-co/hypha-core';

const system = harnessedAgentSystemSpecDefinition.parse(
  harnessedAgentSystemSpecDefinition.example,
);
const event = createFrameworkEvent({
  id: 'event-1', type: 'run.created', userId: 'owner',
  sessionId: 'session-1', runId: 'run-1',
  payload: { agentSystemId: system.id },
});
```

Event 带有审计与 Replay 所需的 user、Session 和 Run 作用域。不要只在可变的 Session 记录中保存权威运行状态。

## [`hypha-storage`](./storage)

Storage Profile 在不把凭据交给 Framework 的前提下描述拓扑。连接解析只发生在可信组合层；日志输出前必须脱敏。

```ts
import {
  createSQLiteStorageProfile,
  redactStorageConnection,
  resolveStorageConnection,
  storageTopologySpecDefinition,
} from '@codesoul-co/hypha-storage';

const sqlite = createSQLiteStorageProfile({
  id: 'storage.events', role: 'source_of_truth',
  uri: 'file:./var/events.sqlite', database: './var/events.sqlite',
});
const topology = storageTopologySpecDefinition.parse({
  ...storageTopologySpecDefinition.example,
  providers: [sqlite],
});
const safe = redactStorageConnection(
  resolveStorageConnection(topology.providers[0], process.env),
);
```

权威 Event、结构化投影、Vector 与 Artifact 应使用明确的角色。解析后的 Connection 属于运行时配置，不能序列化到 Event 或 Trace。

## 组合规则

```text
Core/Storage Spec
  → 在应用边界校验
  → 在可信组合层解析 Provider
  → 产生带作用域的 Event
  → 派生 Session/Read Model
```
