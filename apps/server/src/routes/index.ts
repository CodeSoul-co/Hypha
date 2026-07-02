import { Router } from 'express';
import chatRoutes from './chat.routes';
import authRoutes from './auth.routes';
import memoryRoutes from './memory.routes';
import skillRoutes from './skill.routes';
import toolRoutes from './tool.routes';
import workflowRoutes from './workflow.routes';
import modelRoutes from './model.routes';
import statusRoutes from './status.routes';
import usageRoutes from './usage.routes';
import apiDocsRoutes from './api-docs.routes';
import devRoutes from './dev.routes';
import runtimeRoutes from './runtime.routes';

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

// Mount routes
router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/memory', memoryRoutes);
router.use('/skills', skillRoutes);
router.use('/tools', toolRoutes);
router.use('/workflows', workflowRoutes);
router.use('/models', modelRoutes);
router.use('/status', statusRoutes);
router.use('/usage', usageRoutes);
router.use('/docs', apiDocsRoutes);
router.use('/runtime', runtimeRoutes);
router.use('/dev', devRoutes);

export default router;
