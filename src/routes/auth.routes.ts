import { Router, Request, Response } from 'express';
import Joi from 'joi';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { authMiddleware, generateToken, generateRefreshToken, verifyRefreshToken } from '../middleware/auth';
import { UserModel } from '../models/User';
import { ApiKeyModel } from '../models/ApiKey';
import { HTTP_STATUS } from '../constants';
import { logger } from '../utils/logger';

const router = Router();

// Validation schemas
// Note: tlds:{allow:false} permits non-public TLDs like ".local" — needed
// because seeded dev/admin accounts use admin@orbit.local / dev@test.local.
const registerSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).optional(),
  phone: Joi.string().pattern(/^\+?[0-9]{7,15}$/).optional(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  displayName: Joi.string().max(50).optional(),
}).or('email', 'phone'); // at least one identifier required

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).optional(),
  phone: Joi.string().pattern(/^\+?[0-9]{7,15}$/).optional(),
  password: Joi.string().required(),
}).or('email', 'phone'); // at least one identifier required

// Register
router.post('/register', asyncHandler(async (req: Request, res: Response) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    throw new AppError('VALIDATION_ERROR', error.message, HTTP_STATUS.BAD_REQUEST);
  }

  const { email, phone, username, password, displayName } = value;

  // Check if user exists
  const existingUser = await UserModel.findOne({
    $or: [
      ...(email ? [{ email }] : []),
      ...(phone ? [{ phone }] : []),
      { username },
    ],
  });

  if (existingUser) {
    throw new AppError(
      'USER_EXISTS',
      'User with this email, phone, or username already exists',
      HTTP_STATUS.CONFLICT
    );
  }

  // Build user object — email is required in JWT, use phone as fallback
  interface UserCreatePayload {
    username: string;
    password: string;
    displayName: string;
    email?: string;
    phone?: string;
  }
  const userPayload: UserCreatePayload = {
    username,
    password,
    displayName: displayName || username,
    ...(email ? { email } : {}),
    ...(phone ? { phone } : {}),
  };

  // If neither email nor phone, generate a placeholder email
  if (!email && !phone) {
    userPayload.email = `${username}@orbit.local`;
  }

  const user = await UserModel.create(userPayload);

  // Generate tokens
  const accessToken = generateToken(user);
  const refreshToken = generateRefreshToken(user);

  logger.info(`User registered: ${user.email}`);

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    data: {
      user: user.toSafeObject(),
      accessToken,
      refreshToken,
    },
  });
}));

// Login
router.post('/login', asyncHandler(async (req: Request, res: Response) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    throw new AppError('VALIDATION_ERROR', error.message, HTTP_STATUS.BAD_REQUEST);
  }

  const { email, phone, password } = value;

  // Find user by email or phone
  const query: { email?: string; phone?: string } = {};
  if (email) query.email = email;
  if (phone) query.phone = phone;

  const user = await UserModel.findOne(query).select('+password');

  if (!user) {
    throw new AppError('INVALID_CREDENTIALS', 'Invalid email or password', HTTP_STATUS.UNAUTHORIZED);
  }

  if (!user.isActive) {
    throw new AppError('ACCOUNT_DISABLED', 'Account is disabled', HTTP_STATUS.FORBIDDEN);
  }

  // Verify password
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    throw new AppError('INVALID_CREDENTIALS', 'Invalid email or password', HTTP_STATUS.UNAUTHORIZED);
  }

  // Update last login
  user.lastLoginAt = new Date();
  await user.save();

  // Generate tokens
  const accessToken = generateToken(user);
  const refreshToken = generateRefreshToken(user);

  logger.info(`User logged in: ${user.email}`);

  res.json({
    success: true,
    data: {
      user: user.toSafeObject(),
      accessToken,
      refreshToken,
    },
  });
}));

// Refresh token
router.post('/refresh', asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError('MISSING_TOKEN', 'Refresh token is required', HTTP_STATUS.BAD_REQUEST);
  }

  const payload = verifyRefreshToken(refreshToken);
  if (!payload) {
    throw new AppError('INVALID_TOKEN', 'Invalid refresh token', HTTP_STATUS.UNAUTHORIZED);
  }

  // Find user
  const user = await UserModel.findById(payload.userId);
  if (!user || !user.isActive) {
    throw new AppError('USER_NOT_FOUND', 'User not found or disabled', HTTP_STATUS.UNAUTHORIZED);
  }

  // Generate new tokens
  const newAccessToken = generateToken(user);
  const newRefreshToken = generateRefreshToken(user);

  res.json({
    success: true,
    data: {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    },
  });
}));

// Get current user
router.get('/me', authMiddleware(), asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.user!.userId);

  if (!user) {
    throw new AppError('USER_NOT_FOUND', 'User not found', HTTP_STATUS.NOT_FOUND);
  }

  res.json({
    success: true,
    data: user.toSafeObject(),
  });
}));

// Update profile
router.put('/me', authMiddleware(), asyncHandler(async (req: Request, res: Response) => {
  const { displayName, preferences } = req.body;

  // First get the current user to merge preferences
  const currentUser = await UserModel.findById(req.user!.userId);
  if (!currentUser) {
    throw new AppError('USER_NOT_FOUND', 'User not found', HTTP_STATUS.NOT_FOUND);
  }

  interface UserUpdatePayload {
    displayName?: string;
    preferences?: Record<string, unknown>;
  }
  const updateData: UserUpdatePayload = {};
  if (displayName) updateData.displayName = displayName;
  if (preferences) updateData.preferences = { ...currentUser.preferences, ...preferences };

  const user = await UserModel.findByIdAndUpdate(
    req.user!.userId,
    updateData,
    { new: true }
  );

  if (!user) {
    throw new AppError('USER_NOT_FOUND', 'User not found', HTTP_STATUS.NOT_FOUND);
  }

  res.json({
    success: true,
    data: user.toSafeObject(),
  });
}));

// Generate API Key
router.post('/api-key', authMiddleware(), asyncHandler(async (req: Request, res: Response) => {
  const { name, permissions, expiresAt } = req.body;

  // Generate API key using the static method
  const generated = ApiKeyModel.generateKey();
  const { keyId, plainKey, keyHash } = generated;

  const apiKey = await ApiKeyModel.create({
    userId: req.user!.userId,
    keyId,
    keyHash,
    name: name || 'Default API Key',
    permissions: permissions || ['chat:read', 'chat:write'],
    expiresAt: expiresAt ? new Date(expiresAt) : undefined,
  });

  logger.info(`API key generated for user: ${req.user!.userId}`);

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    data: {
      id: apiKey._id,
      keyId: apiKey.keyId,
      name: apiKey.name,
      permissions: apiKey.permissions,
      expiresAt: apiKey.expiresAt,
      // Return the plain key only once
      apiKey: plainKey,
    },
  });
}));

// List API Keys
router.get('/api-keys', authMiddleware(), asyncHandler(async (req: Request, res: Response) => {
  const keys = await ApiKeyModel.find({ userId: req.user!.userId });

  res.json({
    success: true,
    data: keys.map(key => ({
      id: key._id,
      keyId: key.keyId,
      name: key.name,
      permissions: key.permissions,
      expiresAt: key.expiresAt,
      lastUsedAt: key.lastUsedAt,
      isActive: key.isActive,
      createdAt: key.createdAt,
    })),
  });
}));

// Revoke API Key
router.delete('/api-key/:keyId', authMiddleware(), asyncHandler(async (req: Request, res: Response) => {
  const { keyId } = req.params;

  const result = await ApiKeyModel.findOneAndUpdate(
    { keyId, userId: req.user!.userId },
    { isActive: false },
    { new: true }
  );

  if (!result) {
    throw new AppError('KEY_NOT_FOUND', 'API key not found', HTTP_STATUS.NOT_FOUND);
  }

  logger.info(`API key revoked: ${keyId}`);

  res.json({
    success: true,
    message: 'API key revoked',
  });
}));

// Logout
router.post('/logout', authMiddleware(), asyncHandler(async (req: Request, res: Response) => {
  // In a stateless JWT setup, logout is handled client-side
  // Here we could add the token to a blacklist if needed
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
}));

export default router;
