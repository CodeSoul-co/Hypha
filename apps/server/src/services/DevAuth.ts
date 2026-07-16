import { UserModel } from '../models/User';
import { authConfig, getConfig } from '../config';
import { logger } from '../utils/logger';

export async function initSingleUserOwner(): Promise<{
  email: string;
  password: string;
} | null> {
  const config = authConfig();
  if (config.mode !== 'single-user') return null;

  const { email, username, password, displayName } = config.singleUser;

  try {
    const existing = await UserModel.findOne({ email }).select('+password');
    if (existing) {
      if (!existing.isAdmin || !existing.isActive) {
        existing.isAdmin = true;
        existing.isActive = true;
        await existing.save();
      }
      logger.info(`[Auth] Using single-user owner: ${email}`);
      return { email, password };
    }

    const owner = new UserModel({
      email,
      username,
      password,
      displayName,
      isActive: true,
      isAdmin: true,
    });

    await owner.save();

    logger.info(`[Auth] Created single-user owner: ${email}`);
    logger.info('[Auth] Owner login: POST /auth/login with the configured credentials');

    return { email, password };
  } catch (error) {
    logger.error('[Auth] Failed to init single-user owner:', error);
    return null;
  }
}

/**
 * Seed a pre-registered admin account for development
 * The password is read from configuration and is never printed to logs.
 */
export async function initDevAdminUser(): Promise<{
  email: string;
  password: string;
} | null> {
  const isDev = process.env.NODE_ENV !== 'production';
  if (!isDev || authConfig().mode !== 'multi-user') return null;

  const adminEmail = process.env.DEV_ADMIN_EMAIL || 'admin@hypha.local';
  const adminPassword = process.env.DEV_ADMIN_PASSWORD || 'hypha_admin_2026';

  try {
    const existing = await UserModel.findOne({ email: adminEmail }).select('+password');
    if (existing) {
      logger.info(`[DevAuth] Using existing admin user: ${adminEmail}`);
      return { email: adminEmail, password: adminPassword };
    }

    const admin = new UserModel({
      email: adminEmail,
      username: 'admin',
      password: adminPassword,
      displayName: 'Administrator',
      isActive: true,
      isAdmin: true,
    });

    await admin.save();

    logger.info(`[DevAuth] Created admin user: ${adminEmail}`);
    logger.info(`[DevAuth] Admin login: POST /auth/login with configured credentials`);

    return { email: adminEmail, password: adminPassword };
  } catch (error) {
    logger.error('[DevAuth] Failed to init admin user:', error);
    return null;
  }
}

/**
 * Dev 模式下自动准备测试用户
 * 检查是否存在，不存在则创建
 */
export async function initDevTestUser(): Promise<{
  email: string;
  password: string;
} | null> {
  const isDev = process.env.NODE_ENV !== 'production';
  if (!isDev || authConfig().mode !== 'multi-user') return null;

  const devEmail = process.env.DEV_TEST_EMAIL || 'dev@test.local';
  const devPassword = process.env.DEV_TEST_PASSWORD || 'devpassword123';

  try {
    const existing = await UserModel.findOne({ email: devEmail }).select('+password');
    if (existing) {
      logger.info(`[DevAuth] Using existing test user: ${devEmail}`);
      return { email: devEmail, password: devPassword };
    }

    const user = new UserModel({
      email: devEmail,
      username: 'devuser',
      password: devPassword,
      displayName: 'Dev User',
      isActive: true,
      isAdmin: true,
    });

    await user.save();
    logger.info(`[DevAuth] Created test user: ${devEmail}`);
    logger.info(`[DevAuth] Test user login: POST /auth/login with configured credentials`);

    return { email: devEmail, password: devPassword };
  } catch (error) {
    logger.error('[DevAuth] Failed to init dev user:', error);
    return null;
  }
}

/**
 * 获取 dev 测试用户的 JWT token（方便前端直接使用）
 */
export async function getDevTestToken(): Promise<string | null> {
  const isDev = process.env.NODE_ENV !== 'production';
  if (!isDev || authConfig().mode !== 'multi-user') return null;

  const devEmail = process.env.DEV_TEST_EMAIL || 'dev@test.local';
  const devPassword = process.env.DEV_TEST_PASSWORD || 'devpassword123';

  try {
    const jwt = await import('jsonwebtoken');
    const config = await import('../config').then((m) => m.getConfig());

    // Quick token generation without full auth flow
    const user = await UserModel.findOne({ email: devEmail });
    if (!user) return null;

    const token = jwt.default.sign(
      { userId: user._id, email: user.email },
      config.auth.jwt.secret,
      { expiresIn: '30d' }
    );

    logger.info(`[DevAuth] Test token ready for: ${devEmail}`);
    return token;
  } catch (error) {
    logger.error('[DevAuth] Failed to get dev token:', error);
    return null;
  }
}

export async function getSingleUserToken(): Promise<string | null> {
  const config = getConfig();
  if (config.auth.mode !== 'single-user') return null;

  try {
    const jwt = await import('jsonwebtoken');
    const user = await UserModel.findOne({
      email: config.auth.singleUser.email,
    });
    if (!user) return null;

    const token = jwt.default.sign(
      { userId: user._id, email: user.email, isAdmin: !!user.isAdmin },
      config.auth.jwt.secret,
      { expiresIn: '30d' }
    );

    logger.info(`[Auth] Owner token ready for: ${user.email}`);
    return token;
  } catch (error) {
    logger.error('[Auth] Failed to get owner token:', error);
    return null;
  }
}
