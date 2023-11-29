import { Date, Model } from 'mongoose';

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser extends Document {
  id: string;
  name?: string;
  email: string;
  password: string;
  created_by: string;
  Created_at: Date;
}

export type ILoginResponse = {
  accessToken: { token: string; expires: number };
  name: string;
  email: string;
};

export interface IUserModel extends Model<IUser> {
  isPasswordMatched(password: string, savedPassword: string): Promise<boolean>;
}

export type LoginModel = Model<ILogin, Record<string, unknown>>;
