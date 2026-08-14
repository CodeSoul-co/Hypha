# `@codesoul-co/hypha-memory`

`hypha-memory` 定义受治理的 Working、Episodic、Semantic、Vector 与 Artifact-backed Memory，并把可移植 Spec/`MemoryManager` Port 与本地、自托管、托管 Provider 实现分离。

```bash
npm install @codesoul-co/hypha-memory@1.0.1
```

## 主要能力

| 领域 | 代表导出 |
| --- | --- |
| 配置 | `memorySpecDefinition`、Profile 与校验器 |
| Runtime | `MemoryManager`、`GovernedMemoryManager`、`NativeMemoryRuntime` |
| Context | `ContextBuilder`、`ContextGateway`、压缩与 Artifact 校验 |
| Provider | Native、Mem0、Hindsight、MemoryBank Factory/Client |
| 可靠性 | Outbox、Lease、Lifecycle Worker、Dead Letter、Reconciliation |
| 评估 | Evaluation Case、Operational Metric、Provider Evidence |

## 校验可移植 Spec

```ts
import {
  memorySpecDefinition,
  validateMemorySpec,
} from '@codesoul-co/hypha-memory';

const memory = validateMemorySpec({
  ...memorySpecDefinition.example,
  id: 'memory.release',
  version: '1.0.0',
});
```

Spec 声明行为和所需能力；具体 Provider、Store 与凭据在可信应用组合层绑定。

## 每次操作都要限定 Scope

| Scope | 典型用途 |
| --- | --- |
| User | 长期偏好或持久知识 |
| Session | 多个 Run 共享的产品上下文 |
| Run | 一次执行的证据与 Working Context |
| Workspace | 受一个 Workspace 边界控制的文件/Artifact |

Provider Key、Cache Key、Delete 与 Reconciliation 必须执行同一 Scope，不能合并成全局命名空间。

## 受治理读写

```text
请求 → 校验 Principal/Scope → Policy/Privacy/Retention
→ Provider 操作 → 统一结果/错误 → Event + Provider Evidence
→ Projection/Cache Invalidation
```

Memory 写入是副作用，与 Tool/外部写入一样需要 Policy、Trace 与 Idempotency。检索结果应保留 Provenance，让 Agent 区分已验证证据和回忆上下文。

测试 Add/Search/Update/Delete、Retention、用户隔离、Pagination、Cancellation、Timeout、Outbox 重投与 Dead Letter。Replay 应从 Event 重建 Memory 相关产品状态，而不是把外部索引当事实来源。

