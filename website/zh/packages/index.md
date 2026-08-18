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

| 层       | 模块                                                       | 用途                                    |
| -------- | ---------------------------------------------------------- | --------------------------------------- |
| 契约     | `hypha-core`、`hypha-storage`                              | 公共 Spec、Event、Policy 与存储拓扑     |
| 执行     | `hypha-fsm`、`hypha-kernel`、`hypha-harness`               | 状态迁移、ReAct Loop 与持久化运行边界   |
| 智能     | `hypha-models`、`hypha-inference`                          | 模型适配器、别名、标准化推理与缓存协调  |
| 能力     | `hypha-memory`、`hypha-skills`、`hypha-tools`、`hypha-mcp` | 上下文与受治理的副作用                  |
| 产品组合 | `hypha-domain`                                             | 应用拥有的 Domain Pack 与 Workflow Spec |
| Provider | `hypha-adapters-local`、`hypha-serving-cache`              | 本地存储组合与有界 Serving Cache        |
| 验证     | `hypha-testing`                                            | Replay Fixture 与确定性 FSM 断言        |

<div class="architecture-flow">
APPLICATION / DOMAIN PACK<br>
↓ domain · skills · tools · mcp · memory<br>
↓ kernel · harness · fsm<br>
↓ models · inference · storage · local adapters · cache<br>
EVENTS → REPLAY → TESTING
</div>

## 15 个公开包

“模块指南”解释概念与组合方式；“完整 API”从 TypeScript 声明生成，逐模块列出所有导出类、函数、接口、类型、常量及公开成员。

| 模块指南                                   | 主要边界                      | 常用入口                             | 完整 API                              |
| ------------------------------------------ | ----------------------------- | ------------------------------------ | ------------------------------------- |
| [`hypha-core`](./core)                     | 版本化 Framework 契约         | `createFrameworkEvent`               | [模块/Symbol](/zh/api/core)           |
| [`hypha-storage`](./storage)               | Provider-neutral 存储 Profile | `createSQLiteStorageProfile`         | [模块/Symbol](/zh/api/storage)        |
| [`hypha-fsm`](./fsm)                       | 校验后的 FSM 拓扑/运行时      | `parseFSMProcessSpec`                | [模块/Symbol](/zh/api/fsm)            |
| [`hypha-kernel`](./kernel)                 | ReAct 推理契约                | `reactAgentSpecDefinition`           | [模块/Symbol](/zh/api/kernel)         |
| [`hypha-harness`](./harness)               | Event-first 执行与投影        | `SessionProjector`                   | [模块/Symbol](/zh/api/harness)        |
| [`hypha-models`](./models)                 | Model Provider 与路由         | `ModelRegistry`                      | [模块/Symbol](/zh/api/models)         |
| [`hypha-inference`](./inference)           | 标准化推理后端                | `InferenceManager`                   | [模块/Symbol](/zh/api/inference)      |
| [`hypha-memory`](./memory)                 | 受治理的作用域 Memory         | `memorySpecDefinition`               | [模块/Symbol](/zh/api/memory)         |
| [`hypha-skills`](./skills)                 | 渐进式指令加载                | `SkillRegistry`                      | [模块/Symbol](/zh/api/skills)         |
| [`hypha-tools`](./tools)                   | 类型化 Tool 执行              | `ToolRegistry`                       | [模块/Symbol](/zh/api/tools)          |
| [`hypha-mcp`](./mcp)                       | 受治理 MCP 集成               | `mcpIntegrationSpecDefinition`       | [模块/Symbol](/zh/api/mcp)            |
| [`hypha-domain`](./domain)                 | Domain Pack 编译              | `compileDomainPackToHarnessedSystem` | [模块/Symbol](/zh/api/domain)         |
| [`hypha-adapters-local`](./adapters-local) | 本地 Provider 组合            | `createLocalStorageBackbone`         | [模块/Symbol](/zh/api/adapters-local) |
| [`hypha-serving-cache`](./serving-cache)   | 作用域响应缓存                | `ServingCacheManager`                | [模块/Symbol](/zh/api/serving-cache)  |
| [`hypha-testing`](./testing)               | Replay/回归辅助               | `assertStatePath`                    | [模块/Symbol](/zh/api/testing)        |

::: warning 包边界
`apps/server` 下的 Express API 和示例 CLI 是应用 Surface，不是 npm Framework 包。你可以在自己的应用中安装这些库，也可以从 Hypha 仓库运行 Server。
:::
