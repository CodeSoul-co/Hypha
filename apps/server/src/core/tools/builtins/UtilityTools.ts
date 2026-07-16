import {
  executeHashUtility,
  executeJsonUtility,
  executeTextUtility,
  hashUtilityToolSpec,
  jsonUtilityToolSpec,
  textUtilityToolSpec,
  type HashUtilityInput,
  type JsonUtilityInput,
  type TextUtilityInput,
  type ToolSpec,
} from '@hypha/tools';
import { BaseTool, type ITool, type ToolDefinition, type ToolGovernanceSpec } from '../types';

abstract class UtilityToolBase extends BaseTool {
  abstract readonly spec: ToolSpec;

  get id(): string {
    return this.spec.id;
  }

  get name(): string {
    return this.spec.name ?? this.spec.id;
  }

  get description(): string {
    return this.spec.description;
  }

  get schema(): ToolDefinition {
    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        ...(this.spec.inputSchema as ToolDefinition['inputSchema']),
        type: 'object',
      },
      outputSchema: this.spec.outputSchema as Record<string, any> | undefined,
    };
  }

  get governance(): ToolGovernanceSpec {
    return {
      outputSchema: this.spec.outputSchema,
      sideEffectLevel: this.spec.sideEffectLevel,
      permissionScope: this.spec.permissionScope,
      preconditions: this.spec.preconditions,
      postconditions: this.spec.postconditions,
      timeoutPolicy: this.spec.timeoutPolicy,
      retryPolicy: this.spec.retryPolicy,
      auditPolicy: this.spec.auditPolicy,
      humanApprovalPolicy: this.spec.humanApprovalPolicy,
    };
  }
}

export class JsonUtilityTool extends UtilityToolBase {
  readonly spec = jsonUtilityToolSpec;

  protected async run(params: Record<string, unknown>): Promise<Record<string, unknown>> {
    return executeJsonUtility(params as JsonUtilityInput);
  }
}

export class TextUtilityTool extends UtilityToolBase {
  readonly spec = textUtilityToolSpec;

  protected async run(params: Record<string, unknown>): Promise<Record<string, unknown>> {
    return executeTextUtility(params as unknown as TextUtilityInput);
  }
}

export class HashUtilityTool extends UtilityToolBase {
  readonly spec = hashUtilityToolSpec;

  protected async run(params: Record<string, unknown>): Promise<Record<string, unknown>> {
    return executeHashUtility(params as HashUtilityInput);
  }
}

export function createUtilityTools(): ITool[] {
  return [new JsonUtilityTool(), new TextUtilityTool(), new HashUtilityTool()];
}
