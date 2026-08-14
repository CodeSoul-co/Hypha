# `@codesoul-co/hypha-models`

`hypha-models` 归一化模型 Provider，并把稳定 Alias 解析为具体 Provider/Model。它包含 OpenAI-compatible Adapter、确定性 Mock、Routing Spec 与统一错误。

```bash
npm install @codesoul-co/hypha-models@1.0.1
```

## 主要导出

| 导出 | 用途 |
| --- | --- |
| `ModelProvider` | 中立请求/响应接口 |
| `ModelRegistry` | 注册 Provider 实现 |
| `ModelAliasRegistry` | 解析版本化 Alias |
| `ModelRouter` | 通过 Alias 路由请求 |
| `MockModelProvider` | 无网络的确定性测试 |
| `OpenAICompatibleModelProvider` | 绑定 OpenAI-compatible HTTP Endpoint |
| `modelRoutingSpecDefinition` | 校验部署期路由 |

## 注册测试 Provider

```ts
import {
  MockModelProvider,
  ModelRegistry,
  modelRoutingSpecDefinition,
} from '@codesoul-co/hypha-models';

const providers = new ModelRegistry();
providers.register(new MockModelProvider('mock-test'));

const routing = modelRoutingSpecDefinition.parse({
  ...modelRoutingSpecDefinition.example,
  id: 'models.release',
  version: '1.0.0',
});
```

## 绑定 OpenAI-compatible Endpoint

```ts
import { OpenAICompatibleModelProvider } from '@codesoul-co/hypha-models';

const provider = new OpenAICompatibleModelProvider({
  id: 'provider.primary',
  type: 'openai-compatible',
  baseUrl: process.env.MODEL_BASE_URL!,
  apiKey: process.env.MODEL_API_KEY!,
  providerModelByAlias: {
    'reasoning.primary': 'configured-at-deployment',
  },
});
```

具体 Provider 只在可信服务启动代码中构造，密钥来自环境或 Secret Store。Agent 引用 `reasoning.primary` 之类 Alias；部署配置映射 Provider/Model，并在接流量前校验能力和 Fallback。

需要 Prompt、Backend 和 Prefix/KV Cache 协调时使用 [`hypha-inference`](./inference)。
