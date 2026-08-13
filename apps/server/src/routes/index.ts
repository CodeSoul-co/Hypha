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
import {
  createOpenApiDocument,
  getOpenApiDocument,
  setOpenApiDocument,
  type OpenApiMount,
} from './openapi';
import { getConfig } from '../config';

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

// This mount table is shared with OpenAPI generation so adding a mounted route
// automatically updates the machine-readable route inventory.
const mounts: OpenApiMount[] = [
  { prefix: '/auth', tag: 'Authentication', router: authRoutes },
  { prefix: '/chat', tag: 'Chat', router: chatRoutes },
  { prefix: '/memory/admin', tag: 'Memory Administration', router: memoryAdminRoutes },
  { prefix: '/memory', tag: 'Memory', router: memoryRoutes },
  { prefix: '/skills', tag: 'Skills', router: skillRoutes },
  { prefix: '/tools', tag: 'Tools', router: toolRoutes },
  { prefix: '/tool-invocations', tag: 'Tool Runtime', router: invocationRouter },
  { prefix: '/tool-approvals', tag: 'Tool Runtime', router: approvalRouter },
  { prefix: '/mcp', tag: 'MCP', router: mcpRoutes },
  { prefix: '/workflows', tag: 'Workflows', router: workflowRoutes },
  { prefix: '/models', tag: 'Models', router: modelRoutes },
  { prefix: '/status', tag: 'Status', router: statusRoutes },
  { prefix: '/usage', tag: 'Usage', router: usageRoutes },
  { prefix: '/docs', tag: 'Documentation', router: apiDocsRoutes },
  { prefix: '/runtime', tag: 'Runtime', router: runtimeRoutes },
  { prefix: '/dev', tag: 'Development', router: devRoutes },
];

for (const mount of mounts) router.use(mount.prefix, mount.router);

setOpenApiDocument(
  createOpenApiDocument({
    version: getConfig().app.version,
    basePath: getConfig().app.apiPrefix,
    mounts,
    rootRoutes: [
      { method: 'GET', path: '/health', tag: 'Status' },
      { method: 'GET', path: '/ready', tag: 'Status' },
      { method: 'GET', path: '/openapi.json', tag: 'Documentation' },
    ],
  })
);

router.get('/openapi.json', (_req, res) => res.json(getOpenApiDocument()));

export default router;
