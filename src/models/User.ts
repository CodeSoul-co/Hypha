import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  phone?: string;
  displayName?: string;
  avatar?: string;
  isActive: boolean;
  isAdmin: boolean;
  lastLoginAt?: Date;
  preferences: {
    defaultModel?: string;
    defaultProvider?: string;
    temperature?: number;
    theme?: string;
    language?: string;
    [key: string]: any;
  };
  createdAt: Date;
  updatedAt: Date;

  // Methods
  comparePassword(password: string): Promise<boolean>;
  toSafeObject(): Record<string, any>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Don't include password by default
    },
    phone: {
      type: String,
      default: '',
      index: true,
    },
    displayName: String,
    avatar: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: Date,
    preferences: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

// Pre-save hook to hash password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Instance method to compare password
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Instance method to get safe user object (without password)
UserSchema.methods.toSafeObject = function (): Record<string, any> {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Index for search
UserSchema.index({ email: 1, isActive: 1 });

export const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
