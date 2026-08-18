# 完整 API 参考

这里记录当前 Hypha npm 包入口的全部公共导出，并按包与源码模块拆分。每个模块说明自身用途与入口导入方式；每个 Symbol 条目包含 TypeScript 声明、源码位置、函数参数与返回类型，或类、接口和枚举的公开成员。

> 生成依据: 页面由构建后的 TypeScript 声明通过 `npm run docs:api`生成。函数、类、接口、类型与枚举保留完整声明；编译器展开后超过 4,000 字符的常量推导类型会压缩显示，并保留源码链接。

## 包索引

| 包 | API 范围 |
| --- | --- |
| [`@codesoul-co/hypha-core`](/zh/api/core) | 共享契约、Schema、Event、Policy 与运行时 Port。 |
| [`@codesoul-co/hypha-storage`](/zh/api/storage) | Provider-neutral 存储拓扑契约与 Profile Builder。 |
| [`@codesoul-co/hypha-fsm`](/zh/api/fsm) | FSM Spec、拓扑分析、Snapshot、迁移与恢复。 |
| [`@codesoul-co/hypha-kernel`](/zh/api/kernel) | ReAct Agent Spec 与 Kernel 组合契约。 |
| [`@codesoul-co/hypha-harness`](/zh/api/harness) | Event-first 执行、追踪、投影、重放与编排。 |
| [`@codesoul-co/hypha-models`](/zh/api/models) | 模型 Provider Registry、路由与确定性 Mock Provider。 |
| [`@codesoul-co/hypha-inference`](/zh/api/inference) | Provider-neutral 推理请求、路由、控制与流式处理。 |
| [`@codesoul-co/hypha-memory`](/zh/api/memory) | Memory 契约、Pipeline、Policy、Store、检索与评估。 |
| [`@codesoul-co/hypha-skills`](/zh/api/skills) | 版本化 Skill 定义与渐进加载 Registry。 |
| [`@codesoul-co/hypha-tools`](/zh/api/tools) | Tool 契约、Registry、受控执行与 Workspace 边界。 |
| [`@codesoul-co/hypha-mcp`](/zh/api/mcp) | MCP 集成 Spec、Client、Policy 与生命周期管理。 |
| [`@codesoul-co/hypha-domain`](/zh/api/domain) | Domain Pack 校验及向运行时契约的编译。 |
| [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local) | Local-first SQLite、Vector、Artifact 与 Runtime Adapter。 |
| [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache) | Serving Cache Key、Store、Policy 与缓存协调。 |
| [`@codesoul-co/hypha-testing`](/zh/api/testing) | Trace、Replay、Fixture 与确定性断言辅助工具。 |

## 公共 API 边界

- 公共入口导出的 Symbol 才属于本索引；源码中的非导出实现不是公共 API。
- TypeScript 类型会在运行时擦除；不可信输入仍应使用对应的 Zod/Spec Definition 解析。
- Tool、MCP、Memory Write、File Write 与 External Write 必须经过 Policy、Trace 与 Harness Hook。
- Event 是事实来源；Session 与 Run 是可重建的产品/上下文视图。
