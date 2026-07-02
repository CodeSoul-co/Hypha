import fs from 'fs/promises';
import path from 'path';
import { BaseTool } from '../types';
import type { ToolDefinition, ToolParams } from '../types';

/**
 * Read / write / list files on the server's filesystem.
 *
 * Sandboxing: every path is resolved against the process CWD (or the
 * FILESYSTEM_TOOL_ROOT env var if set) and must stay inside it. Absolute paths
 * outside the sandbox are rejected to keep an LLM from reading /etc/passwd.
 */
export default class FilesystemTool extends BaseTool {
  readonly id = 'filesystem';
  readonly name = 'filesystem';
  readonly description = 'Read, write, or list files on the local filesystem (sandboxed to project root)';
  readonly schema: ToolDefinition = {
    name: 'filesystem',
    description: this.description,
    inputSchema: {
      type: 'object',
      properties: {
        operation: { type: 'string', enum: ['read', 'write', 'list'] },
        path:      { type: 'string', description: 'Path relative to sandbox root' },
        content:   { type: 'string', description: 'Required for operation=write' },
      },
      required: ['operation', 'path'],
    },
  };

  private root: string;

  constructor() {
    super();
    this.root = path.resolve(process.env.FILESYSTEM_TOOL_ROOT || process.cwd());
  }

  private resolveSafe(p: string): string {
    const abs = path.resolve(this.root, p);
    if (!abs.startsWith(this.root + path.sep) && abs !== this.root) {
      throw new Error(`Path escapes sandbox root: ${p}`);
    }
    return abs;
  }

  protected async run(params: ToolParams): Promise<any> {
    const { operation, path: relPath, content } = params as {
      operation: 'read' | 'write' | 'list';
      path: string;
      content?: string;
    };
    if (!operation || !relPath) throw new Error('operation and path are required');
    const abs = this.resolveSafe(relPath);

    switch (operation) {
      case 'read': {
        const text = await fs.readFile(abs, 'utf-8');
        return { path: relPath, content: text };
      }
      case 'write': {
        if (typeof content !== 'string') throw new Error('content is required for write');
        await fs.writeFile(abs, content, 'utf-8');
        return { path: relPath, bytesWritten: Buffer.byteLength(content, 'utf-8') };
      }
      case 'list': {
        const entries = await fs.readdir(abs, { withFileTypes: true });
        return {
          path: relPath,
          entries: entries.map(e => ({
            name: e.name,
            type: e.isDirectory() ? 'dir' : e.isFile() ? 'file' : 'other',
          })),
        };
      }
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }
}
