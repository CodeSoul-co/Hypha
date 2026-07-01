import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { authMiddleware, adminOnly } from '../middleware/auth';
import { getToolManager } from '../core/tools/ToolManager';
import { HTTP_STATUS } from '../constants';

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
  const { name, params } = req.body;

  if (!name) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: { code: 'MISSING_TOOL_NAME', message: 'Tool name is required' },
    });
  }

  const toolManager = getToolManager();
  const result = await toolManager.executeTool(name, params || {});

  res.json({
    success: result.success,
    data: result.output,
    error: result.error,
  });
}));

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
