import httpStatus from 'http-status';
import { RequestHandler } from 'express';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/utils/sendResponse';
import { ILogin, ILoginResponse } from './auth.interface';

const loginUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const payload: ILogin = req.body;

    const result = await AuthService.loginUser(payload);

    sendResponse<ILoginResponse>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Login successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const createUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const userData = req.body;
    const result = await AuthService.createUser(userData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'User created successfully !',
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  loginUser,
  createUser,
};
