# Hypha 逐功能地图

理解 Hypha 最有效的方式不是把它看成一个高层 Agent 封装，而是沿着一组明确的运行时边界逐段展开。本页把每项功能映射到所属包、源码模块、主要类/函数以及可运行示例。

需要查询每个 Symbol 和精确签名时，使用[完整 API 参考](/zh/api/)；需要应用形态代码时，使用 [release-agent 示例](/zh/guide/examples)。

## 端到端执行路径

| 阶段                    | 输入                           | 主要 API                       | 输出                                |
| ----------------------- | ------------------------------ | ------------------------------ | ----------------------------------- |
| 1. 校验契约             | JSON/YAML/配置                 | `*SpecDefinition.parse()`      | 版本化且经过运行时校验的 Spec       |
| 2. 编译 Domain Pack     | Task、Workflow 与 Profile      | `DomainPackCompiler.compile()` | FSM Process、Agent Patch 与 Binding |
| 3. 构造 Session Command | 用户意图与 Idempotency Key     | Session Command Schema/Service | 只接受一次的作用域命令              |
| 4. 启动 Run             | Session、Agent System 与输入   | Harness/Runtime Service        | Run 标识与生命周期 Event            |
| 5. 驱动 ReAct + FSM     | 当前 Snapshot 与 Observation   | `FSMRuntime`、Kernel/Harness   | 合法迁移与 Checkpoint               |
| 6. 执行能力             | Tool/MCP/Memory/Execution 请求 | Registry + Policy + Trace Hook | 受控结果与 Event 证据               |
| 7. 投影视图             | 有序 Event                     | Projector/Query Service        | Session、Run 与运维视图             |
| 8. 重放与评估           | Event、Fixture 与预期          | Replay/Testing API             | 确定性与回归证据                    |

这里最重要的分离是：Domain Pack 声明产品行为，Framework 负责编译和执行，Event 始终是事实来源。

## 1. Spec 与运行时校验

**所属包：** [`hypha-core`](/zh/packages/core) 以及各 Spec 所属包。

| API                                  | 种类 | 职责                                                     |
| ------------------------------------ | ---- | -------------------------------------------------------- |
| `defineSpecSchema()`                 | 函数 | 创建同时包含 Parser、Example 与 JSON Schema 的版本化定义 |
| `SpecSchemaDefinition<T>`            | 接口 | 所有 `*SpecDefinition` 共享的结构                        |
| `harnessedAgentSystemSpecDefinition` | 常量 | 校验组合后的 Agent System 边界                           |
| `domainPackSpecDefinition`           | 常量 | 编译前校验 Domain Pack                                   |
| `fsmProcessSpecDefinition`           | 常量 | 校验 State、Transition 与 Terminal State                 |

所有不可信边界都应调用 `definition.parse(value)`。TypeScript 类型本身不能校验 YAML、HTTP Payload 或持久化数据。

```ts
const system = harnessedAgentSystemSpecDefinition.parse({
  ...harnessedAgentSystemSpecDefinition.example,
  id: 'system.research',
  version: '1.0.0',
});
```

完整 Schema 模块见 [Core schemas API](/zh/api/core/schemas)，可运行代码见 [`core-storage`](/zh/guide/examples#一次运行一个功能)。

## 2. Event-first 状态与作用域

**所属包：** [`hypha-core`](/zh/packages/core)、[`hypha-harness`](/zh/packages/harness)。

| API                      | 种类 | 职责                                       |
| ------------------------ | ---- | ------------------------------------------ |
| `createFrameworkEvent()` | 函数 | 创建具有稳定标识与作用域的 Framework Event |
| `EventStore`             | 接口 | 追加并查询持久事实                         |
| `InMemoryEventStore`     | 类   | 测试与本地组合使用的确定性 Store           |
| `InMemoryTraceRecorder`  | 类   | 捕获有序 Trace/Event 证据                  |
| `SessionProjector`       | 类   | 从 Event 重建 Session View                 |

作用域沿 `userId → sessionId → runId → step/invocation` 传播。不能从模型输出或 UI 状态重新推断授权作用域。

```ts
const event = createFrameworkEvent({
  id: 'event-1',
  type: 'run.created',
  userId: 'owner',
  sessionId: 'session-1',
  runId: 'run-1',
  payload: {},
});
await recorder.record(event);
const sessions = new SessionProjector().project(await recorder.list());
```

`Session` 是产品/上下文视图，`Run` 是一次执行，`Event` 是持久事实。详见 [Core Event](/zh/api/core/events) 与 [Harness API](/zh/api/harness)。

## 3. FSM 控制与恢复

**所属包：** [`hypha-fsm`](/zh/packages/fsm)。

| API                           | 种类 | 职责                                        |
| ----------------------------- | ---- | ------------------------------------------- |
| `validateFSMProcessSpec()`    | 函数 | 拒绝非法 Process 定义                       |
| `analyzeFSMTopology()`        | 函数 | 报告可达、不可达、死端与循环 State          |
| `createInitialSnapshot()`     | 函数 | 创建第一个 Run-scoped FSM Snapshot          |
| `FSMRuntime`                  | 类   | 应用 Guarded Transition 并生成新 Snapshot   |
| `planHarnessCapabilityPath()` | 函数 | 规划 Framework-owned ReAct Phase 路径       |
| Recovery API                  | 模块 | 分类失败并选择 Retry/Review/Quarantine/Fail |

产品 Workflow State 属于 Domain Pack；Domain Pack 不能重命名或重连 Framework-owned ReAct State。详见 [FSM 指南](/zh/guide/fsm-control)、[FSM API](/zh/api/fsm)，运行 `npm run feature -- fsm` 可查看结果。

## 4. ReAct Agent 与 Kernel

**所属包：** [`hypha-kernel`](/zh/packages/kernel)。

Kernel 声明可复用的 ReAct Agent 契约，包括 Model Routing、Reasoning Profile、Capability 引用、Memory Profile 与限制；它不嵌入 Provider SDK 调用，也不隐藏 Agent Loop。

| API                        | 种类      | 职责                                      |
| -------------------------- | --------- | ----------------------------------------- |
| `reactAgentSpecDefinition` | 常量      | ReAct Agent Spec 的 Parser 与 JSON Schema |
| `ReActAgentSpec`           | 接口      | 版本化 Agent 配置契约                     |
| Kernel 导出                | 函数/类型 | 组合 Reasoning 与 Action Selection 边界   |

先独立校验 Agent，再由 Domain 编译显式应用 Patch/Binding。精确签名见 [Kernel API](/zh/api/kernel)。

## 5. Domain Pack 编译

**所属包：** [`hypha-domain`](/zh/packages/domain)。

Domain Pack 拥有产品 Task Schema、Workflow、Session 默认值、Memory/Tool/Workspace Profile、Policy Binding、Evaluation Fixture 与 Regression Case。它编译为 Framework 契约，但不能替换 Framework FSM。

| API                        | 种类 | 职责                                                  |
| -------------------------- | ---- | ----------------------------------------------------- |
| `domainPackSpecDefinition` | 常量 | 校验完整版本化 Pack                                   |
| `DomainCompiler`           | 类   | 把 Workflow/Binding 编译为运行时 Spec                 |
| Compiler Result            | 接口 | 暴露 FSM Process、Agent Patch、Contract 与 Evaluation |

release-agent 会把同一 Pack 编译两次并断言输出完全相同。详见 [Domain API](/zh/api/domain) 与 [`domain-pack.yaml`](https://github.com/CodeSoul-co/Hypha/blob/main/examples/release-agent/agent/domain-pack.yaml)。

## 6. Model 与 Inference

**所属包：** [`hypha-models`](/zh/packages/models)、[`hypha-inference`](/zh/packages/inference)。

Models 负责 Provider 注册/路由；Inference 负责 Provider-neutral Request/Response 执行边界。

| API                          | 种类 | 职责                                   |
| ---------------------------- | ---- | -------------------------------------- |
| `ModelRegistry`              | 类   | 注册并解析 Model Provider              |
| `MockModelProvider`          | 类   | 提供确定性 Consumer Test               |
| `modelRoutingSpecDefinition` | 常量 | 校验 Alias 与路由策略                  |
| `InferenceManager`           | 类   | 注册 Inference Provider 并分发统一请求 |
| Inference Request/Response   | 接口 | 跨 Provider 保持 Run/Step/Model 作用域 |

运行 `npm run feature -- inference-models`，并参见 [Models API](/zh/api/models) 与 [Inference API](/zh/api/inference)。

## 7. Tool、Skill 与 MCP

**所属包：** [`hypha-tools`](/zh/packages/tools)、[`hypha-skills`](/zh/packages/skills)、[`hypha-mcp`](/zh/packages/mcp)。

- **Tool**：带类型的可调用契约和可信 Handler。
- **Skill**：供 Agent 渐进加载的版本化知识/指令。
- **MCP**：通过 Integration Policy 连接允许的外部 Server/Tool。

| API                            | 种类 | 职责                                      |
| ------------------------------ | ---- | ----------------------------------------- |
| `ToolRegistry`                 | 类   | 在可信组合层同时保存 Tool Spec 与 Handler |
| `toolSpecDefinition`           | 常量 | 校验输入/输出、Effect 与 Policy Metadata  |
| `SkillRegistry`                | 类   | 注册并解析版本化 Skill                    |
| `skillSpecDefinition`          | 常量 | 校验 Skill Metadata 与加载契约            |
| `mcpIntegrationSpecDefinition` | 常量 | 校验 MCP Server 与 Allow-list             |

所有有副作用的调用都必须经过 Policy、Trace 与 Harness Hook；完成注册不等于完成授权。详见 [Tools API](/zh/api/tools)、[Skills API](/zh/api/skills)、[MCP API](/zh/api/mcp)，运行 `npm run feature -- capabilities`。

## 8. Memory

**所属包：** [`hypha-memory`](/zh/packages/memory)。

Memory 保持 Provider-neutral，并拆为 Contract、Ingestion、Retrieval、Consolidation、Write Governance、Store、Evaluation 与 Runtime Integration。

| 领域             | 模块职责                                              |
| ---------------- | ----------------------------------------------------- |
| contracts/specs  | 版本化 Memory、Record、Query、Policy 与 Provider 结构 |
| ingestion        | 规范化、切分、Embedding 并持久化有界 Record           |
| retrieval        | 按作用域过滤、排序并返回证据                          |
| write governance | 授权并追踪 Memory Mutation                            |
| stores/providers | 可替换的 Structured/Vector 实现                       |
| evaluation       | 使用 Fixture 衡量 Retrieval/Memory 行为               |

生命周期示例见 [Memory 模块指南](/zh/packages/memory)，每个类/函数见[完整 Memory API](/zh/api/memory)。

## 9. Storage 与本地 Adapter

**所属包：** [`hypha-storage`](/zh/packages/storage)、[`hypha-adapters-local`](/zh/packages/adapters-local)。

Storage 声明拓扑和角色；adapters-local 提供具体 Local-first 实现，从而避免 Core/应用 Spec 依赖 Provider。

| API                             | 种类 | 职责                                               |
| ------------------------------- | ---- | -------------------------------------------------- |
| `storageTopologySpecDefinition` | 常量 | 校验 Provider 与 Storage Role                      |
| `createSQLiteStorageProfile()`  | 函数 | 构造 SQLite Source-of-truth Profile                |
| `createLocalStorageProfiles()`  | 函数 | 组合 Event、Structured、Vector 与 Artifact Profile |

详见 [Storage API](/zh/api/storage)、[本地 Adapter API](/zh/api/adapters-local)，运行 `npm run feature -- core-storage`。

## 10. Serving Cache

**所属包：** [`hypha-serving-cache`](/zh/packages/serving-cache)。

Serving Cache 是 Inference/Serving 结果的优化层，不是事实来源。Key 必须包含当前 Policy 要求的 Provider、Model 与 Request 维度。

| API                   | 种类      | 职责                                    |
| --------------------- | --------- | --------------------------------------- |
| `ServingCacheManager` | 类        | 生成 Key 并协调 Get/Set                 |
| `MemoryCacheStore`    | 类        | 确定性内存缓存实现                      |
| Cache Policy/Type     | 接口/类型 | 描述 Exact/Semantic Metadata 与失效规则 |

关闭 Cache 后，Run 语义仍必须正确。详见 [Serving Cache API](/zh/api/serving-cache)，运行 `npm run feature -- cache-testing`。

## 11. Harness、Replay 与 Testing

**所属包：** [`hypha-harness`](/zh/packages/harness)、[`hypha-testing`](/zh/packages/testing)。

Harness 使用 Policy、Trace、Lifecycle 与 Projection 包围运行时工作；Testing 把相同 Event 证据转换为确定性 Fixture 与断言。

| API                     | 种类      | 职责                              |
| ----------------------- | --------- | --------------------------------- |
| `InMemoryTraceRecorder` | 类        | 捕获有序证据                      |
| `SessionProjector`      | 类        | 重建 Session View                 |
| `assertStatePath()`     | 函数      | 实际状态路径与 Fixture 不同时失败 |
| Replay/Fixture Helper   | 函数/类型 | 重放证据并比较 Output/State       |

有效测试必须在顺序、作用域、状态或输出退化时失败。详见 [Harness API](/zh/api/harness)、[Testing API](/zh/api/testing) 与示例 Contract Test。

## 12. 下一步读什么

| 目标                 | 页面                                  |
| -------------------- | ------------------------------------- |
| 构建第一个有效系统   | [快速开始](/zh/guide/getting-started) |
| 理解所有权与数据流   | [系统架构](/zh/guide/architecture)    |
| 定义或驱动 Process   | [FSM 控制](/zh/guide/fsm-control)     |
| 组合全部模块         | [完整系统](/zh/guide/full-system)     |
| 运行隔离功能示例     | [可运行示例](/zh/guide/examples)      |
| 查询具体 Symbol/成员 | [完整 API](/zh/api/)                  |
