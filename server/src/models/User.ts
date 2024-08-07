import mongoose, { Document, Schema } from 'mongoose';

const userTypes = ['blogger', 'admin', 'user', 'webinar', 'podcast', 'crowedfunding', 'advocacy'];

interface IUser {
    firstName: string,
    lastName: string,
    age: string,
    gender: string,
    address: string,
    email: string,
    healthInterests: string[],
    phone: string,
    password: string,
    passwordReset: {
      exp: Date | null,
      code: string
    },
    isAdmin: boolean,
    level: number,
    active: boolean,
    image: string,
    userType: string[],
    isPasswordDefault: boolean,
    state: string,
    lga: string,
    createdAt?: any,
    googleId?: string
}

const userSchema = new Schema<IUser>({
  email: { type: String },
  googleId: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  age: { type: String },
  gender: { type: String },
  address: { type: String },
  healthInterests: [{ type: String }],
  phone: { type: String },
  password: { type: String },
  image: { type: String },
  passwordReset: {
    exp: { type: Date, allowNull: true },
    code: { type: String },
  },
  isAdmin: { type: Boolean, default: false },
  level: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  userType: [{ type: String, enum: userTypes }],
  isPasswordDefault: { type: Boolean, default: false },
  state: { type: String },
  lga: { type: String },
}, { timestamps: true });

userSchema.index({ location: '2dsphere' });

export interface IUserModel extends Document, IUser {}

const User = mongoose.model<IUserModel>('User', userSchema as any);

export default User;