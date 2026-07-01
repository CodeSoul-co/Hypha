/**
 * User management module types
 */

import { IUserProfile } from '../models/UserProfile';
import { IConversationTask } from '../models/ConversationTask';

// ─── Request / Response DTOs ──────────────────────────────────────────

export interface UpdateProfileDTO {
  bio?: string;
  phone?: string;
  gender?: string;
  birthday?: string;
  location?: string;
  website?: string;
  avatar?: string;
  isPublic?: boolean;
  tags?: string[];
}

export interface CreateConversationTaskDTO {
  sessionId: string;
  ritualQuestion: string;
  ritualSymbols: {
    triggers: string[];
    stages: string[];
  };
  symbols: string[];
  modelId: string;
  modelProvider: string;
  responseContent: string;
  keyInsight?: string;
  exploreQuestions?: string[];
  rounds?: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp?: Date;
    tokens?: number;
  }>;
  tokenUsage?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    cost?: number;
  };
}

export interface TaskListQuery {
  page?: number;
  limit?: number;
  archived?: boolean;
  sortBy?: 'createdAt' | 'likedCount' | 'sharedCount';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Aggregation types ─────────────────────────────────────────────────

export interface UserStatsSummary {
  totalRituals: number;
  totalLikes: number;
  totalFollowers: number;
  totalFollowing: number;
  checkInStreak: number;
  badges: string[];
  totalTokens: number;
  totalCost: number;
  requestCount: number;
}

// ─── Module exports ──────────────────────────────────────────────────

export type { IUserProfile, IConversationTask };
