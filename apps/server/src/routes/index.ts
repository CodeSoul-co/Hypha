import { Router } from 'express';
import chatRoutes from './chat.routes';
import authRoutes from './auth.routes';
import memoryRoutes from './memory.routes';
import memoryAdminRoutes from './memory-admin.routes';
import skillRoutes from './skill.routes';
import toolRoutes from './tool.routes';
import workflowRoutes from './workflow.routes';
import modelRoutes from './model.routes';
import statusRoutes from './status.routes';
import usageRoutes from './usage.routes';
import apiDocsRoutes from './api-docs.routes';
import devRoutes from './dev.routes';
import runtimeRoutes from './runtime.routes';
import { approvalRouter, invocationRouter } from './tool-runtime.routes';
import mcpRoutes from './mcp.routes';
import { asyncHandler } from '../middleware/errorHandler';
import { getServerProductReadiness } from '../services/ServerProductReadiness';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
});

// Readiness check: fail closed until the canonical execution graph and every
// durable Runtime worker are actually running. This is intentionally distinct
// from the process liveness endpoint above.
router.get(
  '/ready',
  asyncHandler(async (_req, res) => {
    const readiness = await getServerProductReadiness();
    res.status(readiness.ready ? 200 : 503).json({
      success: readiness.ready,
      data: {
        ...readiness,
        status: readiness.status,
        runtime: readiness.components.runtime,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
    });
  })
);

// Mount routes
router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/memory/admin', memoryAdminRoutes);
router.use('/memory', memoryRoutes);
router.use('/skills', skillRoutes);
router.use('/tools', toolRoutes);
router.use('/tool-invocations', invocationRouter);
router.use('/tool-approvals', approvalRouter);
router.use('/mcp', mcpRoutes);
router.use('/workflows', workflowRoutes);
router.use('/models', modelRoutes);
router.use('/status', statusRoutes);
router.use('/usage', usageRoutes);
router.use('/docs', apiDocsRoutes);
router.use('/runtime', runtimeRoutes);
router.use('/dev', devRoutes);

export default router;
