import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ILogin, ILoginResponse, IUser } from './auth.interface';
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from '../../../config';
import { generateJWT_Token } from '../../../shared/utils/jwt/generateJWT_Token';
import { User } from './auth.model';

const loginUser = async (loginInfo: ILogin): Promise<ILoginResponse> => {
  const { email, password } = loginInfo;

  const dbUser = await User.findOne({ email }).exec();

  if (!dbUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found!');
  }

  const isPasswordMatch: boolean = await User.isPasswordMatched(
    password,
    dbUser.password
  );

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match!');
  }

  const tokenData = {
    email: dbUser?.email,
    password: dbUser?.password,
  };

  const accessToken = generateJWT_Token(
    tokenData,
    JWT_SECRET_KEY as string,
    JWT_EXPIRES_IN as string
  );

  await dbUser.save();

  const result = {
    name: dbUser.name as string,
    email: dbUser.email,
    accessToken,
  };

  return result;
};

const createUser = async (userData: IUser): Promise<Partial<IUser>> => {
  try {
    const createdUser = await User.create(userData);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

export const AuthService = {
  loginUser,
  createUser,
};
