import jwt from 'jsonwebtoken';
import { IUser } from '../../../app/modules/auth/auth.interface';


export const generateJWT_Token = (
  dbUser: Partial<IUser>,
  secret_key: string,
  expire_time: string
) => {
  const expires = Math.floor(Date.now() / 1000) + parseInt(expire_time);
  const token = jwt.sign(
    {
      email: dbUser?.email,
      password: dbUser?.password,
    },
    secret_key,
    {
      expiresIn: expire_time,
    }
  );
  return { token, expires };
};
