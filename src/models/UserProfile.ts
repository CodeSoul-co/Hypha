import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUserProfile extends Document {
  userId: string;
  bio?: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  birthday?: string;
  location?: string;
  website?: string;
  avatar?: string;
  checkInStreak: number;
  lastCheckIn?: Date;
  totalRituals: number;
  totalLikes: number;
  totalFollowers: number;
  totalFollowing: number;
  badges: string[];
  tags: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new Schema<IUserProfile>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    bio: {
      type: String,
      maxlength: 500,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer_not_to_say'],
      default: 'prefer_not_to_say',
    },
    birthday: String,
    location: String,
    website: String,
    avatar: String,
    checkInStreak: {
      type: Number,
      default: 0,
    },
    lastCheckIn: Date,
    totalRituals: {
      type: Number,
      default: 0,
    },
    totalLikes: {
      type: Number,
      default: 0,
    },
    totalFollowers: {
      type: Number,
      default: 0,
    },
    totalFollowing: {
      type: Number,
      default: 0,
    },
    badges: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'user_profiles',
  }
);

// Compound indexes
// `userId` already has `unique: true, index: true` on the schema above — no
// need to re-declare. Add other compound / sort indexes here as needed.
UserProfileSchema.index({ totalRituals: -1 });
UserProfileSchema.index({ checkInStreak: -1 });

export const UserProfileModel: Model<IUserProfile> = mongoose.model<IUserProfile>(
  'UserProfile',
  UserProfileSchema
);

export default UserProfileModel;
