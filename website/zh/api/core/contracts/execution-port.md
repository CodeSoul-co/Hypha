# `@codesoul-co/hypha-core` / `contracts/execution-port`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/execution-port.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-port.ts)
- 导出数: **6**

## 模块用法

用于声明并运行时校验契约。Execution port 模块公开 6 接口。

### 从包入口导入

```ts
import type {
  ExecutionAuthorizationEvidence,
  ExecutionAuthorizationVerificationResult,
  ExecutionAuthorizationVerifier,
  ExecutionDispatchRequest,
  ExecutionOperationDispatcher,
  ExecutionPort,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 6 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExecutionAuthorizationEvidence` | 接口 | <code>interface ExecutionAuthorizationEvidence</code> | Execution Authorization Evidence 接口，共包含 14 个公开字段或方法。 |
| `ExecutionAuthorizationVerificationResult` | 接口 | <code>interface ExecutionAuthorizationVerificationResult</code> | Execution Authorization Verification Result 接口，共包含 5 个公开字段或方法。 |
| `ExecutionAuthorizationVerifier` | 接口 | <code>interface ExecutionAuthorizationVerifier</code> | Execution Authorization Verifier 接口，共包含 1 个公开字段或方法。 |
| `ExecutionDispatchRequest` | 接口 | <code>interface ExecutionDispatchRequest</code> | Execution Dispatch Request 接口，共包含 4 个公开字段或方法。 |
| `ExecutionOperationDispatcher` | 接口 | <code>interface ExecutionOperationDispatcher</code> | Execution Operation Dispatcher 接口，共包含 1 个公开字段或方法。 |
| `ExecutionPort` | 接口 | <code>interface ExecutionPort</code> | Execution Port 接口，共包含 1 个公开字段或方法。 |

## `ExecutionAuthorizationEvidence`

Execution Authorization Evidence 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionAuthorizationEvidence } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-port.ts)

### 声明

```text
export interface ExecutionAuthorizationEvidence {
    id: string;
    invocationId: string;
    activityId: string;
    runId: string;
    toolId: string;
    toolRevision?: string;
    contractSnapshotRef?: string;
    principalId: string;
    inputHash: string;
    policyDecisionRef: string;
    riskAssessmentId: string;
    approvalRef?: string;
    authorizedAt: string;
    expiresAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `approvalRef` | 属性 | <code>approvalRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `authorizedAt` | 属性 | <code>authorizedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyDecisionRef` | 属性 | <code>policyDecisionRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `riskAssessmentId` | 属性 | <code>riskAssessmentId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRevision` | 属性 | <code>toolRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionAuthorizationVerificationResult`

Execution Authorization Verification Result 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionAuthorizationVerificationResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-port.ts)

### 声明

```text
export interface ExecutionAuthorizationVerificationResult {
    valid: boolean;
    verificationRef: string;
    verifiedAt: string;
    expiresAt?: string;
    reason?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `valid` | 属性 | <code>valid: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `verificationRef` | 属性 | <code>verificationRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `verifiedAt` | 属性 | <code>verifiedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionAuthorizationVerifier`

Execution Authorization Verifier 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionAuthorizationVerifier } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-port.ts)

### 声明

```text
export interface ExecutionAuthorizationVerifier {
    verify(request: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise<ExecutionAuthorizationVerificationResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `verify` | 方法 | <code>verify(request: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise&lt;ExecutionAuthorizationVerificationResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExecutionDispatchRequest`

Execution Dispatch Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionDispatchRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-port.ts)

### 声明

```text
export interface ExecutionDispatchRequest {
    activity: ExecutionActivityRequest;
    binding: ExecutionToolBinding;
    riskAssessment: ExecutionRiskAssessment;
    authorization: ExecutionAuthorizationEvidence;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activity` | 属性 | <code>activity: ExecutionActivityRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `authorization` | 属性 | <code>authorization: ExecutionAuthorizationEvidence</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `binding` | 属性 | <code>binding: ExecutionToolBinding</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `riskAssessment` | 属性 | <code>riskAssessment: ExecutionRiskAssessment</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionOperationDispatcher`

Execution Operation Dispatcher 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionOperationDispatcher } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-port.ts)

### 声明

```text
export interface ExecutionOperationDispatcher {
    dispatch(request: ExecutionActivityRequest, abortSignal: AbortSignal): Promise<ExecutionActivityResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dispatch` | 方法 | <code>dispatch(request: ExecutionActivityRequest, abortSignal: AbortSignal): Promise&lt;ExecutionActivityResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExecutionPort`

Execution Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionPort } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-port.ts)

### 声明

```text
export interface ExecutionPort {
    execute(request: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise<ExecutionActivityResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `execute` | 方法 | <code>execute(request: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise&lt;ExecutionActivityResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
