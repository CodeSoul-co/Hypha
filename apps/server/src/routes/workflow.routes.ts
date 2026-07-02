import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { authMiddleware, adminOnly } from '../middleware/auth';
import { getWorkflowEngine } from '../core/workflow/WorkflowEngine';
import { HTTP_STATUS } from '../constants';

const router = Router();

router.use(authMiddleware(true));

// List workflows
router.get('/', asyncHandler(async (_req: Request, res: Response) => {
  const engine = getWorkflowEngine();
  const workflows = engine.listWorkflows();

  res.json({
    success: true,
    data: workflows,
  });
}));

// Get workflow
router.get('/:name', asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.params;
  const { version } = req.query;

  const engine = getWorkflowEngine();
  const workflow = engine.getWorkflow(name, version as string);

  if (!workflow) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'WORKFLOW_NOT_FOUND', message: 'Workflow not found' },
    });
  }

  res.json({
    success: true,
    data: workflow,
  });
}));

// Execute workflow
router.post('/:name/execute', asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.params;
  const { version, context } = req.body;

  if (!context) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: { code: 'MISSING_CONTEXT', message: 'Execution context is required' },
    });
  }

  const engine = getWorkflowEngine();

  try {
    const execution = await engine.execute(name, context, version);

    res.json({
      success: true,
      data: {
        executionId: execution.id,
        status: execution.status,
        workflowName: execution.workflowName,
        workflowVersion: execution.workflowVersion,
        startedAt: execution.startedAt,
        completedAt: execution.completedAt,
        error: execution.error,
        currentStage: execution.currentStage,
        stageResults: Array.from(execution.stageResults.entries()).map(([id, result]) => ({
          ...result,
          stageId: id,
        })),
      },
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: {
        code: 'WORKFLOW_EXECUTION_ERROR',
        message: error.message,
      },
    });
  }
}));

// Get execution status
router.get('/executions/:executionId', asyncHandler(async (req: Request, res: Response) => {
  const { executionId } = req.params;

  const engine = getWorkflowEngine();
  const execution = engine.getExecution(executionId);

  if (!execution) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'EXECUTION_NOT_FOUND', message: 'Execution not found' },
    });
  }

  res.json({
    success: true,
    data: {
      executionId: execution.id,
      status: execution.status,
      workflowName: execution.workflowName,
      workflowVersion: execution.workflowVersion,
      startedAt: execution.startedAt,
      completedAt: execution.completedAt,
      error: execution.error,
      currentStage: execution.currentStage,
      stageResults: Array.from(execution.stageResults.entries()).map(([id, result]) => ({
        ...result,
        stageId: id,
      })),
    },
  });
}));

// Cancel execution
router.post('/executions/:executionId/cancel', asyncHandler(async (req: Request, res: Response) => {
  const { executionId } = req.params;

  const engine = getWorkflowEngine();
  await engine.cancel(executionId);

  res.json({
    success: true,
    message: 'Execution cancelled',
  });
}));

// Create/update workflow (admin only)
router.post('/', adminOnly, asyncHandler(async (req: Request, res: Response) => {
  const { name, version, description, stages, variables } = req.body;

  if (!name || !stages || !Array.isArray(stages)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: { code: 'INVALID_WORKFLOW', message: 'Name and stages are required' },
    });
  }

  const engine = getWorkflowEngine();

  engine.loadWorkflow({
    name,
    version: version || '1.0.0',
    description,
    stages,
    variables,
  });

  res.json({
    success: true,
    message: 'Workflow loaded',
  });
}));

// Delete workflow (admin only)
router.delete('/:name', adminOnly, asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.params;
  const { version } = req.query;

  const engine = getWorkflowEngine();
  engine.unloadWorkflow(name, version as string);

  res.json({
    success: true,
    message: 'Workflow unloaded',
  });
}));

export default router;
