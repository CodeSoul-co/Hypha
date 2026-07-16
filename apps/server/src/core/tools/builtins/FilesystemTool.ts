import type {
  WorkspaceFileOperation,
  WorkspaceRuntimeConfig,
  WorkspaceRuntimePort,
  WorkspaceRuntimeRequest,
} from '@hypha/tools';
import { BaseTool } from '../types';
import type { ToolDefinition, ToolGovernanceSpec, ToolParams } from '../types';

export type FilesystemToolConfig = WorkspaceRuntimeConfig;

const defaultConfig: FilesystemToolConfig = {
  workingDirectory: '.',
  readPaths: ['.'],
  writePaths: ['./data/workspace'],
  executePaths: ['./data/workspace/bin'],
  execution: {
    enabled: false,
    timeoutMs: 30000,
    maxOutputBytes: 1048576,
  },
};

/** Tool surface for governed workspace operations; I/O is owned by WorkspaceRuntimePort. */
export default class FilesystemTool extends BaseTool {
  readonly id = 'filesystem';
  readonly name = 'filesystem';
  readonly description: string;
  readonly governance: ToolGovernanceSpec = {
    permissionScope: ['filesystem:read', 'filesystem:write', 'filesystem:execute'],
    auditPolicy: {
      enabled: true,
      includeInput: true,
      includeOutput: true,
      redactPaths: ['content'],
    },
  };
  readonly schema: ToolDefinition;

  constructor(
    private readonly workspace: WorkspaceRuntimePort,
    config: FilesystemToolConfig = defaultConfig
  ) {
    super();
    this.description = [
      'Read, write, list, or execute files within a governed workspace runtime.',
      `Read: ${config.readPaths.join(', ') || '(none)'}.`,
      `Write: ${config.writePaths.join(', ') || '(none)'}.`,
      `Execute: ${config.executePaths.join(', ') || '(none)'} (${config.execution.enabled ? 'enabled' : 'disabled'}).`,
    ].join(' ');
    this.schema = this.createSchema();
  }

  protected async run(params: ToolParams): Promise<unknown> {
    const operation = params.operation as WorkspaceFileOperation | undefined;
    const requestedPath = params.path;
    if (!operation || typeof requestedPath !== 'string' || !requestedPath.trim()) {
      throw new Error('operation and path are required');
    }
    if (!['read', 'write', 'list', 'execute'].includes(operation)) {
      throw new Error(`Unknown operation: ${String(operation)}`);
    }
    if (params.args !== undefined && !Array.isArray(params.args)) {
      throw new Error('args must be an array of strings');
    }
    const request: WorkspaceRuntimeRequest = {
      operation,
      path: requestedPath,
      content: typeof params.content === 'string' ? params.content : undefined,
      executable: params.executable === true,
      args: params.args as string[] | undefined,
      cwd: typeof params.cwd === 'string' ? params.cwd : undefined,
      timeoutMs: typeof params.timeoutMs === 'number' ? params.timeoutMs : undefined,
    };
    return this.workspace.execute(request);
  }

  private createSchema(): ToolDefinition {
    return {
      name: 'filesystem',
      description: this.description,
      inputSchema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          operation: { type: 'string', enum: ['read', 'write', 'list', 'execute'] },
          path: {
            type: 'string',
            description: 'Absolute path or path relative to the configured workspace',
          },
          content: { type: 'string', description: 'Required for operation=write' },
          executable: {
            type: 'boolean',
            description: 'Mark a written file executable when the runtime allows it',
          },
          args: {
            type: 'array',
            items: { type: 'string' },
            description: 'Arguments passed directly to an executable without a shell',
          },
          cwd: {
            type: 'string',
            description: 'Execution directory constrained by the workspace runtime',
          },
          timeoutMs: {
            type: 'number',
            description: 'Execution timeout capped by the workspace runtime policy',
          },
        },
        required: ['operation', 'path'],
      },
    };
  }
}
