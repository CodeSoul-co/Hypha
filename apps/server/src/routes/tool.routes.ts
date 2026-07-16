import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { authMiddleware, adminOnly } from '../middleware/auth';
import { getToolManager } from '../core/tools/ToolManager';
import { HTTP_STATUS } from '../constants';
import { getEventRuntime } from '../services/EventRuntime';

const router = Router();

router.use(authMiddleware(true));

// List all tools
router.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const toolManager = getToolManager();
    const tools = toolManager.listTools();

    res.json({
      success: true,
      data: tools,
    });
  })
);

// List MCP servers
router.get(
  '/mcp/servers',
  asyncHandler(async (_req: Request, res: Response) => {
    const toolManager = getToolManager();
    const servers = toolManager.listMCPClients();

    res.json({
      success: true,
      data: servers,
    });
  })
);

// Get MCP server health
router.get(
  '/mcp/servers/:id/health',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const toolManager = getToolManager();
    const status = await toolManager.getMCPServerStatus(id);
    if (!status) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: { code: 'SERVER_NOT_FOUND', message: 'MCP server not found' },
      });
    }

    res.json({
      success: true,
      data: status,
    });
  })
);

// Connect to MCP server
router.post(
  '/mcp/servers/:id/connect',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const toolManager = getToolManager();
    if (!toolManager.hasMCPServer(id)) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: { code: 'SERVER_NOT_FOUND', message: 'MCP server not found' },
      });
    }

    await toolManager.connectMCPServer(id);

    res.json({
      success: true,
      message: 'MCP server connected',
    });
  })
);

// Disconnect MCP server
router.post(
  '/mcp/servers/:id/disconnect',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const toolManager = getToolManager();
    await toolManager.disconnectMCPServer(id);

    res.json({
      success: true,
      message: 'MCP server disconnected',
    });
  })
);

// Execute tool
router.post(
  '/execute',
  asyncHandler(async (req: Request, res: Response) => {
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
    const toolParams =
      params && typeof params === 'object' ? (params as Record<string, unknown>) : {};
    const runtimeRun = await runtime.startRun({
      userId,
      sessionId: sessionId || `tool:${name}`,
      input: { tool: name, params: toolParams },
      workflowRef: { id: 'tool-execution', version: '1.0.0' },
      metadata: { surface: 'http.tools.execute' },
    });
    const runId = runtimeRun.runId;

    try {
      const descriptor = toolManager.describeTool(name);
      await runtime.transition(runId, 'ContextBuilt', { tool: name });
      await runtime.transition(runId, 'Reasoning', { tool: name });
      await runtime.transition(runId, 'ActionSelected', { tool: name });
      await runtime.transition(runId, 'PolicyChecked', { tool: name });
      await runtime.transition(runId, 'Acting', { tool: name });
      const result = await runtime.runGovernedToolResult({
        runId,
        stepId: `tool:${name}`,
        userId,
        sessionId: runtimeRun.sessionId,
        toolId: descriptor?.id ?? name,
        params: toolParams,
        toolSpec: {
          name: descriptor?.name ?? name,
          description: descriptor?.description ?? `Server tool ${name}`,
          inputSchema: descriptor?.inputSchema ?? { type: 'object' },
          outputSchema: descriptor?.outputSchema,
          sideEffectLevel:
            descriptor?.source === 'mcp' ||
            (descriptor?.sideEffectLevel && descriptor.sideEffectLevel !== 'read')
              ? descriptor.sideEffectLevel
              : inferToolSideEffect(name, toolParams),
          permissionScope: descriptor?.permissionScope,
          preconditions: descriptor?.preconditions,
          postconditions: descriptor?.postconditions,
          timeoutPolicy: descriptor?.timeoutPolicy,
          retryPolicy: descriptor?.retryPolicy,
          auditPolicy: descriptor?.auditPolicy,
          humanApprovalPolicy: descriptor?.humanApprovalPolicy,
          source: descriptor?.source ?? 'local',
          sourceRef:
            descriptor?.source === 'mcp'
              ? { serverId: descriptor.serverId, capabilityId: descriptor.capabilityId }
              : undefined,
        },
      });
      if (result.status === 'human_review_required') {
        const reason = toolErrorMessage(result.error, `Approval required for Tool: ${name}`);
        await runtime.transition(runId, 'HumanReview', {
          tool: name,
          reason,
        });
        await runtime.waitForHumanReview(runId, {
          tool: name,
          reason,
          status: result.status,
        });
        return res.status(HTTP_STATUS.ACCEPTED).json({
          success: true,
          runId,
          data: {
            tool: name,
            status: result.status,
            reason,
          },
        });
      }
      if (result.status !== 'completed') {
        throw new Error(toolErrorMessage(result.error, `Tool failed: ${name}`));
      }
      const output = result.output;
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
  })
);

function toolErrorMessage(
  error: string | { message?: string } | undefined,
  fallback: string
): string {
  if (typeof error === 'string') return error;
  return error?.message || fallback;
}

function inferToolSideEffect(
  name: string,
  params: Record<string, unknown>
): 'none' | 'read' | 'write' | 'external_effect' | 'irreversible' {
  if (name === 'filesystem') {
    if (params.operation === 'write' || params.operation === 'execute') return 'write';
    if (params.operation === 'delete') return 'irreversible';
    return 'read';
  }
  return 'read';
}

// List MCP tools
router.get(
  '/mcp/tools',
  asyncHandler(async (_req: Request, res: Response) => {
    const toolManager = getToolManager();
    const allTools = toolManager.listNormalizedMCPTools();

    res.json({
      success: true,
      data: allTools,
    });
  })
);

router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const descriptor = getToolManager().describeTool(req.params.id);
    if (!descriptor) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: { code: 'TOOL_NOT_FOUND', message: 'Tool not found' },
      });
    }
    res.json({ success: true, data: descriptor });
  })
);

export default router;
