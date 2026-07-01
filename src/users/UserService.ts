import { UserProfileModel, IUserProfile } from '../models/UserProfile';
import { ConversationTaskModel, IConversationTask } from '../models/ConversationTask';
import { getTokenService } from '../services/TokenService';
import {
  UpdateProfileDTO,
  CreateConversationTaskDTO,
  TaskListQuery,
  PaginatedResult,
  UserStatsSummary,
} from './types';
import { logger } from '../utils/logger';

export class UserService {
  // ─── Profile ──────────────────────────────────────────────────────────

  /**
   * Get or create a user profile (upsert on first access)
   */
  async getOrCreateProfile(userId: string): Promise<IUserProfile> {
    let profile = await UserProfileModel.findOne({ userId });
    if (!profile) {
      profile = await UserProfileModel.create({ userId });
      logger.debug(`[UserService] Created profile for user: ${userId}`);
    }
    return profile;
  }

  /**
   * Get user profile (returns null if not found)
   */
  async getProfile(userId: string): Promise<IUserProfile | null> {
    return UserProfileModel.findOne({ userId });
  }

  /**
   * Update user profile fields
   */
  async updateProfile(userId: string, dto: UpdateProfileDTO): Promise<IUserProfile | null> {
    const profile = await UserProfileModel.findOneAndUpdate(
      { userId },
      { $set: dto },
      { new: true, upsert: true }
    );
    logger.debug(`[UserService] Profile updated for user: ${userId}`);
    return profile;
  }

  /**
   * Increment check-in streak (call daily)
   */
  async checkIn(userId: string): Promise<IUserProfile | null> {
    const profile = await this.getOrCreateProfile(userId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastCheckIn = profile.lastCheckIn ? new Date(profile.lastCheckIn) : null;
    const wasYesterday = lastCheckIn
      ? (() => {
          const y = new Date(lastCheckIn);
          y.setHours(0, 0, 0, 0);
          const diff = today.getTime() - y.getTime();
          return diff === 86400000; // exactly 1 day
        })()
      : false;

    const wasSameDay = lastCheckIn
      ? (() => {
          const d = new Date(lastCheckIn);
          d.setHours(0, 0, 0, 0);
          return d.getTime() === today.getTime();
        })()
      : false;

    if (wasSameDay) {
      // Already checked in today
      return profile;
    }

    const newStreak = wasYesterday ? profile.checkInStreak + 1 : 1;

    // Award badges based on streak milestones
    const badges = [...(profile.badges || [])];
    if (newStreak >= 7 && !badges.includes('streak_7d')) badges.push('streak_7d');
    if (newStreak >= 30 && !badges.includes('streak_30d')) badges.push('streak_30d');
    if (newStreak >= 100 && !badges.includes('streak_100d')) badges.push('streak_100d');

    const updated = await UserProfileModel.findOneAndUpdate(
      { userId },
      {
        $set: { lastCheckIn: today, checkInStreak: newStreak },
        $addToSet: { badges: { $each: badges } },
      },
      { new: true }
    );

    logger.debug(`[UserService] User ${userId} checked in, streak: ${newStreak}`);
    return updated;
  }

  /**
   * Get user stats summary (profile + token usage)
   */
  async getUserStats(userId: string): Promise<UserStatsSummary> {
    const [profile, tokenStats] = await Promise.all([
      this.getOrCreateProfile(userId),
      getTokenService().getUserTotalStats(userId),
    ]);

    return {
      totalRituals: profile.totalRituals,
      totalLikes: profile.totalLikes,
      totalFollowers: profile.totalFollowers,
      totalFollowing: profile.totalFollowing,
      checkInStreak: profile.checkInStreak,
      badges: profile.badges || [],
      totalTokens: tokenStats.totalTokens || 0,
      totalCost: tokenStats.totalCost || 0,
      requestCount: tokenStats.requestCount || 0,
    };
  }

  // ─── Conversation Tasks ──────────────────────────────────────────────

  /**
   * Create a new ritual conversation task
   */
  async createTask(userId: string, dto: CreateConversationTaskDTO): Promise<IConversationTask> {
    const task = await ConversationTaskModel.create({
      userId,
      ...dto,
      tokenUsage: dto.tokenUsage
        ? {
            ...dto.tokenUsage,
            modelId: dto.modelId,
            modelProvider: dto.modelProvider,
          }
        : undefined,
    });

    // Increment user's ritual count
    await UserProfileModel.updateOne({ userId }, { $inc: { totalRituals: 1 } });

    logger.debug(`[UserService] Created conversation task: ${task._id} for user: ${userId}`);
    return task;
  }

  /**
   * Get a single task by ID (user must own it)
   */
  async getTask(taskId: string, userId: string): Promise<IConversationTask | null> {
    return ConversationTaskModel.findOne({ _id: taskId, userId });
  }

  /**
   * Get a task by session ID
   */
  async getTaskBySession(sessionId: string, userId: string): Promise<IConversationTask | null> {
    return ConversationTaskModel.findOne({ sessionId, userId });
  }

  /**
   * List tasks for a user with pagination and filters
   */
  async listTasks(userId: string, query: TaskListQuery = {}): Promise<PaginatedResult<IConversationTask> > {
    const page = Math.max(1, query.page || 1);
    const limit = Math.min(50, Math.max(1, query.limit || 20));
    const skip = (page - 1) * limit;
    const sortOrder = query.sortOrder === 'asc' ? 1 : -1;
    const sortField = query.sortBy || 'createdAt';

    const filter: Record<string, string | boolean> = { userId };
    if (query.archived !== undefined) {
      filter.isArchived = query.archived;
    }

    const [items, total] = await Promise.all([
      ConversationTaskModel.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      ConversationTaskModel.countDocuments(filter),
    ]);

    return {
      items: items as unknown as IConversationTask[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Update a conversation task (append rounds, update response, etc.)
   */
  async updateTask(
    taskId: string,
    userId: string,
    updates: Partial<{
      responseContent: string;
      keyInsight: string;
      exploreQuestions: string[];
      rounds: IConversationTask['rounds'];
      isArchived: boolean;
      isShared: boolean;
      likedCount: number;
    }>
  ): Promise<IConversationTask | null> {
    const task = await ConversationTaskModel.findOneAndUpdate(
      { _id: taskId, userId },
      { $set: updates },
      { new: true }
    );
    if (task) {
      logger.debug(`[UserService] Updated task: ${taskId}`);
    }
    return task;
  }

  /**
   * Archive a task
   */
  async archiveTask(taskId: string, userId: string): Promise<IConversationTask | null> {
    return this.updateTask(taskId, userId, { isArchived: true });
  }

  /**
   * Delete a task
   */
  async deleteTask(taskId: string, userId: string): Promise<boolean> {
    const result = await ConversationTaskModel.deleteOne({ _id: taskId, userId });
    return result.deletedCount > 0;
  }

  /**
   * Increment like count on a task (called when someone likes)
   */
  async likeTask(taskId: string, userId: string): Promise<IConversationTask | null> {
    const task = await ConversationTaskModel.findOneAndUpdate(
      { _id: taskId, userId },
      { $inc: { likedCount: 1 } },
      { new: true }
    );
    if (task) {
      await UserProfileModel.updateOne({ userId }, { $inc: { totalLikes: 1 } });
    }
    return task;
  }

  /**
   * Get global feed of shared tasks (paginated)
   */
  async getSharedTasksFeed(
    page = 1,
    limit = 20
  ): Promise<PaginatedResult<IConversationTask> > {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      ConversationTaskModel.find({ isShared: true, isArchived: false })
        .sort({ sharedCount: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ConversationTaskModel.countDocuments({ isShared: true, isArchived: false }),
    ]);

    return {
      items: items as unknown as IConversationTask[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}

// Singleton export
let userServiceInstance: UserService | null = null;

export function getUserService(): UserService {
  if (!userServiceInstance) {
    userServiceInstance = new UserService();
  }
  return userServiceInstance;
}

export default UserService;
