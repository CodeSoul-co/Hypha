# 模块参考

Hypha v1.0.1 以 `@codesoul-co` 作用域下的 15 个包发布。一个应用中使用的所有 Hypha 包应固定在同一版本线上。

```bash
npm install @codesoul-co/hypha-core@1.0.1 \
  @codesoul-co/hypha-fsm@1.0.1 \
  @codesoul-co/hypha-domain@1.0.1 \
  @codesoul-co/hypha-kernel@1.0.1 \
  @codesoul-co/hypha-harness@1.0.1
```

## 按层选择

| 层 | 模块 | 用途 |
| --- | --- | --- |
| 契约 | `hypha-core`、`hypha-storage` | 公共 Spec、Event、Policy 与存储拓扑 |
| 执行 | `hypha-fsm`、`hypha-kernel`、`hypha-harness` | 状态迁移、ReAct Loop 与持久化运行边界 |
| 智能 | `hypha-models`、`hypha-inference` | 模型适配器、别名、标准化推理与缓存协调 |
| 能力 | `hypha-memory`、`hypha-skills`、`hypha-tools`、`hypha-mcp` | 上下文与受治理的副作用 |
| 产品组合 | `hypha-domain` | 应用拥有的 Domain Pack 与 Workflow Spec |
| Provider | `hypha-adapters-local`、`hypha-serving-cache` | 本地存储组合与有界 Serving Cache |
| 验证 | `hypha-testing` | Replay Fixture 与确定性 FSM 断言 |

<div class="architecture-flow">
APPLICATION / DOMAIN PACK<br>
↓ domain · skills · tools · mcp · memory<br>
↓ kernel · harness · fsm<br>
↓ models · inference · storage · local adapters · cache<br>
EVENTS → REPLAY → TESTING
</div>

## 15 个公开包

| 包 | 主要边界 | 常用入口 |
| --- | --- | --- |
| [`hypha-core`](./contracts) | 版本化 Framework 契约 | `createFrameworkEvent` |
| [`hypha-storage`](./contracts#hypha-storage) | Provider-neutral 存储 Profile | `createSQLiteStorageProfile` |
| [`hypha-fsm`](./execution) | 校验后的 FSM 拓扑/运行时 | `parseFSMProcessSpec` |
| [`hypha-kernel`](./execution#hypha-kernel) | ReAct 推理契约 | `reactAgentSpecDefinition` |
| [`hypha-harness`](./execution#hypha-harness) | Event-first 执行与投影 | `SessionProjector` |
| [`hypha-models`](./intelligence) | Model Provider 与路由 | `ModelRegistry` |
| [`hypha-inference`](./intelligence#hypha-inference) | 标准化推理后端 | `InferenceManager` |
| [`hypha-memory`](./capabilities) | 受治理的作用域 Memory | `memorySpecDefinition` |
| [`hypha-skills`](./capabilities#hypha-skills) | 渐进式指令加载 | `SkillRegistry` |
| [`hypha-tools`](./capabilities#hypha-tools) | 类型化 Tool 执行 | `ToolRegistry` |
| [`hypha-mcp`](./capabilities#hypha-mcp) | 受治理 MCP 集成 | `mcpIntegrationSpecDefinition` |
| [`hypha-domain`](./product-runtime) | Domain Pack 编译 | `compileDomainPackToHarnessedSystem` |
| [`hypha-adapters-local`](./product-runtime#hypha-adapters-local) | 本地 Provider 组合 | `createLocalStorageProfiles` |
| [`hypha-serving-cache`](./product-runtime#hypha-serving-cache) | 作用域响应缓存 | `ServingCacheManager` |
| [`hypha-testing`](./product-runtime#hypha-testing) | Replay/回归辅助 | `assertStatePath` |

::: warning 包边界
`apps/server` 下的 Express API 和示例 CLI 是应用 Surface，不是 npm Framework 包。你可以在自己的应用中安装这些库，也可以从 Hypha 仓库运行 Server。
:::
