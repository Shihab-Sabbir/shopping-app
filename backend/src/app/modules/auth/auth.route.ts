import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createUserZodSchema, loginZodSchema } from './auth.validation';

const authRoutes = express.Router();

authRoutes.post(
  '/login',
  validateRequest(loginZodSchema),
  AuthController.loginUser
);

authRoutes.post(
  '/register',
  validateRequest(createUserZodSchema),
  AuthController.createUser
);

export default authRoutes;
