import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { authMiddleware } from '../middleware/auth';
import { getUserService } from './UserService';
import { getTokenService } from '../services/TokenService';
import { HTTP_STATUS } from '../constants';
import { logger } from '../utils/logger';

const router = Router();

// Aggregation result types (eliminate `any`)
interface ByModelResult {
  _id: { modelId: string; modelProvider: string };
  totalPromptTokens: number;
  totalCompletionTokens: number;
  totalTokens: number;
  totalCost: number;
  requestCount: number;
}

interface DailyResult {
  _id: { year: number; month: number; day: number };
  totalPromptTokens: number;
  totalCompletionTokens: number;
  totalTokens: number;
  totalCost: number;
  requestCount: number;
}

interface TokenUsageRecord {
  _id: unknown;
  modelId: string;
  modelProvider: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  totalCost: number;
  requestType: string;
  createdAt: Date;
}

// Service singletons (referenced by both public and authenticated routes).
const userService = getUserService();
const tokenService = getTokenService();

// ─── Public routes (must come BEFORE the auth gate below) ────────────

/**
 * GET /users/tasks/feed
 * Global feed of shared ritual tasks (for "回响之谷"). No auth required —
 * this powers the unauthenticated landing experience.
 */
router.get('/tasks/feed', asyncHandler(async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
  const result = await userService.getSharedTasksFeed(page, limit);
  res.json({ success: true, data: result });
}));

// All routes below require authentication
router.use(authMiddleware(true));

// ─── Profile ─────────────────────────────────────────────────────────

/**
 * GET /users/profile
 * Get current user's profile
 */
router.get('/profile', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const profile = await userService.getOrCreateProfile(userId);

  res.json({
    success: true,
    data: profile,
  });
}));

/**
 * PUT /users/profile
 * Update current user's profile
 */
router.put('/profile', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const profile = await userService.updateProfile(userId, req.body);

  res.json({
    success: true,
    data: profile,
  });
}));

/**
 * POST /users/profile/check-in
 * Daily check-in to maintain streak
 */
router.post('/profile/check-in', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const profile = await userService.checkIn(userId);

  res.json({
    success: true,
    data: {
      checkInStreak: profile?.checkInStreak,
      badges: profile?.badges,
      message: `连续签到 ${profile?.checkInStreak} 天`,
    },
  });
}));

/**
 * GET /users/profile/stats
 * Get user stats summary (rituals, likes, streak)
 */
router.get('/profile/stats', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const stats = await userService.getUserStats(userId);

  res.json({
    success: true,
    data: stats,
  });
}));

/**
 * GET /users/profile/token-stats
 * Get user's token usage summary from TokenService
 */
router.get('/profile/token-stats', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { startDate, endDate } = req.query;

  const start = startDate ? new Date(startDate as string) : undefined;
  const end = endDate ? new Date(endDate as string) : undefined;

  const [total, byModel, daily] = await Promise.all([
    tokenService.getUserTotalStats(userId, start, end),
    tokenService.getUserStatsByModel(userId, start, end),
    tokenService.getDailyStats(userId, 30),
  ]);

  res.json({
    success: true,
    data: {
      summary: {
        totalPromptTokens: total.totalPromptTokens || 0,
        totalCompletionTokens: total.totalCompletionTokens || 0,
        totalTokens: total.totalTokens || 0,
        totalCost: total.totalCost || 0,
        requestCount: total.requestCount || 0,
      },
      byModel: byModel.map((m: ByModelResult) => ({
        modelId: m._id.modelId,
        modelProvider: m._id.modelProvider,
        totalPromptTokens: m.totalPromptTokens,
        totalCompletionTokens: m.totalCompletionTokens,
        totalTokens: m.totalTokens,
        totalCost: m.totalCost,
        requestCount: m.requestCount,
      })),
      daily: daily.map((d: DailyResult) => ({
        date: `${d._id.year}-${String(d._id.month).padStart(2, '0')}-${String(d._id.day).padStart(2, '0')}`,
        totalTokens: d.totalTokens,
        totalCost: d.totalCost,
        requestCount: d.requestCount,
      })),
    },
  });
}));

/**
 * GET /users/profile/token-usage/recent
 * Get recent token usage records
 */
router.get('/profile/token-usage/recent', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
  const skip = parseInt(req.query.skip as string) || 0;

  const records = await tokenService.getRecentUsage(userId, limit, skip);

  res.json({
    success: true,
    data: records.map((r: TokenUsageRecord) => ({
      id: r._id,
      modelId: r.modelId,
      modelProvider: r.modelProvider,
      promptTokens: r.promptTokens,
      completionTokens: r.completionTokens,
      totalTokens: r.totalTokens,
      totalCost: r.totalCost,
      requestType: r.requestType,
      createdAt: r.createdAt,
    })),
    pagination: { limit, skip },
  });
}));

// ─── Conversation Tasks ─────────────────────────────────────────────

/**
 * POST /users/tasks
 * Create a new ritual conversation task
 */
router.post('/tasks', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const task = await userService.createTask(userId, req.body);

  logger.debug(`[Users] Task created by user: ${userId}`);

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    data: task,
  });
}));

/**
 * GET /users/tasks
 * List current user's conversation tasks
 */
router.get('/tasks', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const {
    page,
    limit,
    archived,
    sortBy,
    sortOrder,
  } = req.query;

  const result = await userService.listTasks(userId, {
    page: page ? parseInt(page as string) : 1,
    limit: limit ? parseInt(limit as string) : 20,
    archived: archived !== undefined ? archived === 'true' : undefined,
    sortBy: sortBy as 'createdAt' | 'likedCount' | 'sharedCount',
    sortOrder: sortOrder as 'asc' | 'desc',
  });

  res.json({
    success: true,
    data: result,
  });
}));

/**
 * GET /users/tasks/:taskId
 * Get a single task by ID
 */
router.get('/tasks/:taskId', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { taskId } = req.params;

  const task = await userService.getTask(taskId, userId);

  if (!task) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'TASK_NOT_FOUND', message: 'Task not found' },
    });
  }

  res.json({
    success: true,
    data: task,
  });
}));

/**
 * PUT /users/tasks/:taskId
 * Update a task (response, rounds, archive, share)
 */
router.put('/tasks/:taskId', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { taskId } = req.params;

  const task = await userService.updateTask(taskId, userId, req.body);

  if (!task) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'TASK_NOT_FOUND', message: 'Task not found' },
    });
  }

  res.json({
    success: true,
    data: task,
  });
}));

/**
 * POST /users/tasks/:taskId/like
 * Like a task
 */
router.post('/tasks/:taskId/like', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { taskId } = req.params;

  const task = await userService.likeTask(taskId, userId);

  if (!task) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'TASK_NOT_FOUND', message: 'Task not found' },
    });
  }

  res.json({
    success: true,
    data: { likedCount: task.likedCount },
  });
}));

/**
 * POST /users/tasks/:taskId/archive
 * Archive a task
 */
router.post('/tasks/:taskId/archive', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { taskId } = req.params;

  const task = await userService.archiveTask(taskId, userId);

  if (!task) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'TASK_NOT_FOUND', message: 'Task not found' },
    });
  }

  res.json({
    success: true,
    data: task,
  });
}));

/**
 * DELETE /users/tasks/:taskId
 * Delete a task permanently
 */
router.delete('/tasks/:taskId', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { taskId } = req.params;

  const deleted = await userService.deleteTask(taskId, userId);

  if (!deleted) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'TASK_NOT_FOUND', message: 'Task not found' },
    });
  }

  res.json({
    success: true,
    message: 'Task deleted',
  });
}));

export default router;
