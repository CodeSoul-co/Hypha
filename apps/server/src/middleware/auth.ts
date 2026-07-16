import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';
import { ApiKeyModel } from '../models/ApiKey';
import { authConfig } from '../config';
import { logger } from '../utils/logger';
import { HTTP_STATUS } from '../constants';

export interface AuthPayload {
  userId: string;
  email: string;
  isAdmin: boolean;
}

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
      apiKey?: {
        keyId: string;
        userId: string;
        permissions: string[];
      };
    }
  }
}

// JWT Authentication
export function authMiddleware(required: boolean = true) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      if (required) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          error: {
            code: 'AUTH_TOKEN_MISSING',
            message: 'Authorization header is required',
          },
        });
      }
      return next();
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        error: {
          code: 'AUTH_TOKEN_INVALID',
          message: 'Invalid authorization header format',
        },
      });
    }

    const token = parts[1];
    const config = authConfig();

    try {
      const decoded = jwt.verify(token, config.jwt.secret) as AuthPayload;
      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          error: {
            code: 'AUTH_TOKEN_EXPIRED',
            message: 'Token has expired',
          },
        });
      }

      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        error: {
          code: 'AUTH_TOKEN_INVALID',
          message: 'Invalid token',
        },
      });
    }
  };
}

// API Key Authentication
export async function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  const config = authConfig();
  const headerName = config.apiKey.headerName;
  const apiKey = req.headers[headerName.toLowerCase()] as string;

  if (!apiKey) {
    return next(); // Skip if no API key provided
  }

  try {
    // Extract keyId from the full key
    const keyId = apiKey.split('_')[0] + '_' + apiKey.split('_')[1];

    // Find the API key
    const keyDoc = await ApiKeyModel.findOne({ keyId, isActive: true }).select('+keyHash');

    if (!keyDoc) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        error: {
          code: 'AUTH_API_KEY_INVALID',
          message: 'Invalid API key',
        },
      });
    }

    // Check expiration
    if (keyDoc.expiresAt && keyDoc.expiresAt < new Date()) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        error: {
          code: 'AUTH_API_KEY_EXPIRED',
          message: 'API key has expired',
        },
      });
    }

    // Verify the key
    const isValid = await keyDoc.verifyKey(apiKey);
    if (!isValid) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        error: {
          code: 'AUTH_API_KEY_INVALID',
          message: 'Invalid API key',
        },
      });
    }

    // Set API key info on request
    req.apiKey = {
      keyId: keyDoc.keyId,
      userId: keyDoc.userId.toString(),
      permissions: keyDoc.permissions,
    };

    // Mark as used
    await keyDoc.markUsed();

    next();
  } catch (error) {
    logger.error('API key authentication error:', error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: 'AUTH_API_KEY_ERROR',
        message: 'API key authentication failed',
      },
    });
  }
}

// Admin-only middleware
export function adminOnly(req: Request, res: Response, next: NextFunction): void {
  if (!req.user?.isAdmin) {
    res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      error: {
        code: 'AUTH_PERMISSION_DENIED',
        message: 'Admin access required',
      },
    });
    return;
  }
  next();
}

// Permission check middleware
export function requirePermission(...permissions: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.user?.isAdmin) {
      next(); // Admins have all permissions
      return;
    }

    if (req.apiKey) {
      const hasPermission = permissions.some(p => req.apiKey!.permissions.includes(p));
      if (!hasPermission) {
        res.status(HTTP_STATUS.FORBIDDEN).json({
          success: false,
          error: {
            code: 'AUTH_PERMISSION_DENIED',
            message: 'Insufficient permissions',
          },
        });
      }
    }

    next();
  };
}

// Generate JWT token
export function generateToken(user: { id?: string; _id?: unknown; email: string; isAdmin: boolean }): string {
  const userId = user.id ?? String(user._id);
  const config = authConfig();
  return jwt.sign(
    { userId, email: user.email, isAdmin: user.isAdmin },
    config.jwt.secret,
    { expiresIn: config.jwt.expiry }
  );
}

// Generate refresh token
export function generateRefreshToken(user: { id?: string; _id?: unknown }): string {
  const userId = user.id ?? String(user._id);
  const config = authConfig();
  return jwt.sign(
    { userId, type: 'refresh' },
    config.jwt.secret,
    { expiresIn: config.jwt.refreshExpiry }
  );
}

// Verify refresh token
interface RefreshTokenPayload {
  userId: string;
  type: string;
}
export function verifyRefreshToken(token: string): { userId: string } | null {
  try {
    const config = authConfig();
    const decoded = jwt.verify(token, config.jwt.secret) as RefreshTokenPayload;
    if (decoded.type !== 'refresh') {
      return null;
    }
    return { userId: decoded.userId };
  } catch {
    return null;
  }
}
