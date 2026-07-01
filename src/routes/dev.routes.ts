import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { UserModel } from '../models/User';
import { logger } from '../utils/logger';

const router = Router();

// ============================================================
// Dev Mode: Get Test Token
// Returns a valid JWT token for testing without login
// Only available in development mode
// ============================================================
router.post('/token', asyncHandler(async (_req: Request, res: Response) => {
  const isDev = process.env.NODE_ENV !== 'production';

  if (!isDev) {
    return res.status(403).json({
      success: false,
      error: { code: 'FORBIDDEN', message: 'Dev endpoints only available in development mode' },
    });
  }

  const email = process.env.DEV_TEST_EMAIL || 'dev@test.local';
  const password = process.env.DEV_TEST_PASSWORD || 'devpassword123';

  // Find user
  const user = await UserModel.findOne({ email }).select('+password');
  if (!user) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Dev test user not found. Restart server to auto-create.' },
    });
  }

  // Verify password
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return res.status(401).json({
      success: false,
      error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' },
    });
  }

  // Generate token
  const jwt = require('jsonwebtoken');
  const config = require('../config').getConfig();

  // Mirror the production auth flow's payload shape so the dev token can
  // pass through `adminOnly` middleware (e.g. for skill uninstall).
  const token = jwt.sign(
    { userId: user._id, email: user.email, isAdmin: !!user.isAdmin },
    config.auth.jwt.secret,
    { expiresIn: '30d' }
  );

  logger.debug(`[Dev] Test token generated for: ${email}`);

  res.json({
    success: true,
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
      },
      expiresIn: '30d',
    },
  });
}));

// ============================================================
// Dev Mode: Reset Test User
// Recreates the dev test user with fresh password
// ============================================================
router.post('/reset', asyncHandler(async (_req: Request, res: Response) => {
  const isDev = process.env.NODE_ENV !== 'production';

  if (!isDev) {
    return res.status(403).json({
      success: false,
      error: { code: 'FORBIDDEN', message: 'Dev endpoints only available in development mode' },
    });
  }

  const email = process.env.DEV_TEST_EMAIL || 'dev@test.local';
  const password = process.env.DEV_TEST_PASSWORD || 'devpassword123';

  // Delete existing
  await UserModel.deleteOne({ email });

  // Create fresh
  const user = new UserModel({
    email,
    username: 'devuser',
    password,
    displayName: 'Dev User',
    isActive: true,
    isAdmin: true,
  });

  await user.save();

  // Generate token
  const jwt = require('jsonwebtoken');
  const config = require('../config').getConfig();

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    config.auth.jwt.secret,
    { expiresIn: '30d' }
  );

  logger.info(`[Dev] Test user reset: ${email}`);

  res.json({
    success: true,
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
      },
      expiresIn: '30d',
    },
  });
}));

export default router;
