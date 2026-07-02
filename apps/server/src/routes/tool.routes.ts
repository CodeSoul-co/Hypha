import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { authMiddleware, adminOnly } from '../middleware/auth';
import { getToolManager } from '../core/tools/ToolManager';
import { HTTP_STATUS } from '../constants';
import { getEventRuntime } from '../services/EventRuntime';

const router = Router();

router.use(authMiddleware(true));

// List all tools
router.get('/', asyncHandler(async (_req: Request, res: Response) => {
  const toolManager = getToolManager();
  const tools = toolManager.listTools();

  res.json({
    success: true,
    data: tools,
  });
}));

// List MCP servers
router.get('/mcp/servers', asyncHandler(async (_req: Request, res: Response) => {
  const toolManager = getToolManager();
  const servers = toolManager.listMCPClients();

  res.json({
    success: true,
    data: servers,
  });
}));

// Get MCP server health
router.get('/mcp/servers/:id/health', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const toolManager = getToolManager();
  const client = toolManager.getMCPClient(id);

  if (!client) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'SERVER_NOT_FOUND', message: 'MCP server not found' },
    });
  }

  const health = await client.healthCheck();

  res.json({
    success: true,
    data: {
      id,
      name: client.name,
      status: client.status,
      healthy: health,
    },
  });
}));

// Connect to MCP server
router.post('/mcp/servers/:id/connect', adminOnly, asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const toolManager = getToolManager();
  const client = toolManager.getMCPClient(id);

  if (!client) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'SERVER_NOT_FOUND', message: 'MCP server not found' },
    });
  }

  await client.connect();

  res.json({
    success: true,
    message: 'MCP server connected',
  });
}));

// Disconnect MCP server
router.post('/mcp/servers/:id/disconnect', adminOnly, asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const toolManager = getToolManager();
  await toolManager.disconnectMCPServer(id);

  res.json({
    success: true,
    message: 'MCP server disconnected',
  });
}));

// Execute tool
router.post('/execute', asyncHandler(async (req: Request, res: Response) => {
  const { name, params, sessionId } = req.body;
  const userId = req.user?.userId || req.apiKey?.userId;

  if (!name) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: { code: 'MISSING_TOOL_NAME', message: 'Tool name is required' },
    });
  }
  if (!userId) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'User ID required' },
    });
  }

  const toolManager = getToolManager();
  const runtime = getEventRuntime();
  const toolParams = params && typeof params === 'object' ? params as Record<string, unknown> : {};
  const runtimeRun = await runtime.startRun({
    userId,
    sessionId: sessionId || `tool:${name}`,
    input: { tool: name, params: toolParams },
    workflowRef: { id: 'tool-execution', version: '1.0.0' },
    metadata: { surface: 'http.tools.execute' },
  });
  const runId = runtimeRun.runId;

  try {
    await runtime.transition(runId, 'ContextBuilt', { tool: name });
    await runtime.transition(runId, 'Reasoning', { tool: name });
    await runtime.transition(runId, 'ActionSelected', { tool: name });
    await runtime.transition(runId, 'PolicyChecked', { tool: name });
    await runtime.transition(runId, 'Acting', { tool: name });
    const output = await runtime.runGovernedTool({
      runId,
      stepId: `tool:${name}`,
      userId,
      sessionId: runtimeRun.sessionId,
      toolId: name,
      params: toolParams,
      toolSpec: {
        name,
        description: `Server tool ${name}`,
        inputSchema: { type: 'object' },
        sideEffectLevel: inferToolSideEffect(name, toolParams),
      },
      handler: async () => {
        const result = await toolManager.executeTool(name, toolParams);
        if (!result.success) {
          throw new Error(result.error || `Tool failed: ${name}`);
        }
        return result.output;
      },
    });
    await runtime.transition(runId, 'ObservationRecorded', { tool: name });
    await runtime.transition(runId, 'Verifying');
    await runtime.transition(runId, 'MemorySync');
    await runtime.completeRun(runId, { tool: name, output });

    res.json({
      success: true,
      runId,
      data: output,
    });
  } catch (error) {
    await runtime.failRun(runId, error);
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      runId,
      error: {
        code: 'TOOL_EXECUTION_ERROR',
        message: error instanceof Error ? error.message : String(error),
      },
    });
  }
}));

function inferToolSideEffect(
  name: string,
  params: Record<string, unknown>
): 'none' | 'read' | 'write' | 'external_effect' | 'irreversible' {
  if (name === 'filesystem') {
    if (params.operation === 'write') return 'write';
    if (params.operation === 'delete') return 'irreversible';
    return 'read';
  }
  return 'read';
}

// List MCP tools
router.get('/mcp/tools', asyncHandler(async (_req: Request, res: Response) => {
  const toolManager = getToolManager();
  const servers = toolManager.listMCPClients();

  const allTools: Array<{ serverId: string; serverName: string; tools: any[] }> = [];

  for (const server of servers) {
    if (server.status === 'connected') {
      const client = toolManager.getMCPClient(server.id);
      if (client) {
        allTools.push({
          serverId: server.id,
          serverName: server.name,
          tools: client.tools,
        });
      }
    }
  }

  res.json({
    success: true,
    data: allTools,
  });
}));

export default router;
