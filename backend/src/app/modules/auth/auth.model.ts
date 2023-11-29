import { Schema, model } from 'mongoose';
import { IUser, IUserModel } from './auth.interface';
import bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS, DEFAULT_PASS } from '../../../config';

const UserSchema = new Schema<IUser, {}, IUserModel>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.static(
  'isPasswordMatched',
  function isPasswordMatched(
    password: string | Buffer,
    savedPassword: string | Buffer
  ) {
    return bcrypt.compare(password, savedPassword as string);
  }
);

UserSchema.methods.getResponseFields = function () {
  const { name, email } = this.toObject();
  const selectedData = {
    name,
    email,
  };
  return selectedData;
};

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isNew) {
    const password = user.password ;
    user.password = await bcrypt.hash(password, Number(BCRYPT_SALT_ROUNDS));
  }
  next();
});

export const User = model<IUser, IUserModel>('User', UserSchema);
