# 完整 API 参考

这里列出当前 Hypha 公共入口的全部导出，并按 npm 包与源码模块拆分。模块指南负责解释设计意图和组合方式；本区负责回答“具体有哪些类、函数、类型和常量，它们从哪里导出”。

> 生成方式: `npm run docs:api`. 签名由构建后的 TypeScript 声明生成，超长推导类型会压缩显示并链接源码；修改公共导出后应重新生成并提交这些页面。

## 如何阅读

1. 先从[逐功能指南](/zh/guide/capability-map)确定功能边界和执行顺序。
2. 打开对应[模块指南](/zh/packages/)查看完整示例和运行时不变量。
3. 在下表进入包级 API，按源码模块定位具体 Symbol、签名与类成员。

## 包索引

| 包 | 职责 | 学习指南 |
| --- | --- | --- |
| [`@codesoul-co/hypha-core`](/zh/api/core) | 共享契约、Schema、Event、Policy 与运行时 Port。 | [模块指南](/zh/packages/core) |
| [`@codesoul-co/hypha-storage`](/zh/api/storage) | Provider-neutral 存储拓扑契约与 Profile Builder。 | [模块指南](/zh/packages/storage) |
| [`@codesoul-co/hypha-fsm`](/zh/api/fsm) | FSM Spec、拓扑分析、Snapshot、迁移与恢复。 | [模块指南](/zh/packages/fsm) |
| [`@codesoul-co/hypha-kernel`](/zh/api/kernel) | ReAct Agent Spec 与 Kernel 组合契约。 | [模块指南](/zh/packages/kernel) |
| [`@codesoul-co/hypha-harness`](/zh/api/harness) | Event-first 执行、追踪、投影、重放与编排。 | [模块指南](/zh/packages/harness) |
| [`@codesoul-co/hypha-models`](/zh/api/models) | 模型 Provider Registry、路由与确定性 Mock Provider。 | [模块指南](/zh/packages/models) |
| [`@codesoul-co/hypha-inference`](/zh/api/inference) | Provider-neutral 推理请求、路由、控制与流式处理。 | [模块指南](/zh/packages/inference) |
| [`@codesoul-co/hypha-memory`](/zh/api/memory) | Memory 契约、Pipeline、Policy、Store、检索与评估。 | [模块指南](/zh/packages/memory) |
| [`@codesoul-co/hypha-skills`](/zh/api/skills) | 版本化 Skill 定义与渐进加载 Registry。 | [模块指南](/zh/packages/skills) |
| [`@codesoul-co/hypha-tools`](/zh/api/tools) | Tool 契约、Registry、受控执行与 Workspace 边界。 | [模块指南](/zh/packages/tools) |
| [`@codesoul-co/hypha-mcp`](/zh/api/mcp) | MCP 集成 Spec、Client、Policy 与生命周期管理。 | [模块指南](/zh/packages/mcp) |
| [`@codesoul-co/hypha-domain`](/zh/api/domain) | Domain Pack 校验及向运行时契约的编译。 | [模块指南](/zh/packages/domain) |
| [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local) | Local-first SQLite、Vector、Artifact 与 Runtime Adapter。 | [模块指南](/zh/packages/adapters-local) |
| [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache) | Serving Cache Key、Store、Policy 与缓存协调。 | [模块指南](/zh/packages/serving-cache) |
| [`@codesoul-co/hypha-testing`](/zh/api/testing) | Trace、Replay、Fixture 与确定性断言辅助工具。 | [模块指南](/zh/packages/testing) |

## 稳定性说明

- 公共入口导出的 Symbol 才属于本索引；源码中的非导出实现不是公共 API。
- TypeScript 类型会在运行时擦除；不可信输入仍应使用对应的 Zod/Spec Definition 解析。
- Tool、MCP、Memory Write、File Write 与 External Write 必须经过 Policy、Trace 与 Harness Hook。
- Event 是事实来源；Session 与 Run 是可重建的产品/上下文视图。
