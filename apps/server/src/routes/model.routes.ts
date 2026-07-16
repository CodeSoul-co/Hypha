import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { authMiddleware } from '../middleware/auth';
import { getLLMManager } from '../core/llm/LLMFactory';
import { LLMProvider } from '../core/llm/types';
import { HTTP_STATUS } from '../constants';

const router = Router();

router.use(authMiddleware(false));

// List all available models
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const { provider } = req.query;

  const llmManager = getLLMManager();

  let models;
  if (provider) {
    models = await llmManager.listProviderModels(provider as LLMProvider);
  } else {
    models = await llmManager.listAllModels();
  }

  res.json({
    success: true,
    data: models,
  });
}));

// Health check — MUST be declared before `/:id` or it gets swallowed as a model lookup.
router.get('/health', asyncHandler(async (_req: Request, res: Response) => {
  const llmManager = getLLMManager();
  const status = await llmManager.healthCheck();
  const providers = llmManager.getAvailableProviders();
  const healthyCount = Object.values(status).filter(Boolean).length;
  res.json({
    success: true,
    data: {
      healthy: healthyCount > 0,
      providers: providers.map(p => ({ id: p, healthy: status[p] ?? false })),
      defaultProvider: llmManager.getDefaultProvider(),
      defaultModel: llmManager.getDefaultModel(),
    },
  });
}));

// Get model details
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const llmManager = getLLMManager();
  const allModels = await llmManager.listAllModels();

  const model = allModels.find(m => m.id === id);

  if (!model) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'MODEL_NOT_FOUND', message: 'Model not found' },
    });
  }

  res.json({
    success: true,
    data: model,
  });
}));

// List providers
router.get('/providers/list', asyncHandler(async (_req: Request, res: Response) => {
  const llmManager = getLLMManager();
  const providers = llmManager.getAvailableProviders();

  // Get health status for each provider
  const healthStatus = await llmManager.healthCheck();

  const providerDetails = providers.map(provider => ({
    id: provider,
    available: llmManager.isProviderAvailable(provider),
    healthy: healthStatus[provider] || false,
    default: provider === llmManager.getDefaultProvider(),
  }));

  res.json({
    success: true,
    data: providerDetails,
  });
}));

// Switch default model
router.post('/switch', asyncHandler(async (req: Request, res: Response) => {
  const { provider, model } = req.body;

  const llmManager = getLLMManager();

  if (provider) {
    await llmManager.setDefaultProvider(provider as LLMProvider);
  }

  if (model) {
    await llmManager.setDefaultModel(model);
  }

  res.json({
    success: true,
    data: {
      defaultProvider: llmManager.getDefaultProvider(),
      defaultModel: llmManager.getDefaultModel(),
    },
  });
}));

// Get current default
router.get('/defaults/current', asyncHandler(async (_req: Request, res: Response) => {
  const llmManager = getLLMManager();

  res.json({
    success: true,
    data: {
      defaultProvider: llmManager.getDefaultProvider(),
      defaultModel: llmManager.getDefaultModel(),
    },
  });
}));

// Health check
router.get('/health', asyncHandler(async (_req: Request, res: Response) => {
  const llmManager = getLLMManager();
  const health = await llmManager.healthCheck();

  res.json({
    success: true,
    data: {
      providers: health,
      allHealthy: Object.values(health).every(v => v),
    },
  });
}));

export default router;
