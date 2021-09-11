import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import authUtil from '../utils/auth';
import User from '../models/user';
import profileService from '../services/profile';
import userService from '../services/user';
import Exception from '../utils/exception';

const login = async (ctx: Koa.Context): Promise<void> => {
  const { email, password } = ctx.request.body;
  const user = await userService.getUserByEmail(email);
  if (!user || !(await authUtil.comparePassword(password, user.password))) {
    throw new Exception(HttpStatus.BAD_REQUEST, 'Invalid email or password');
  }

  const token = await jwt.sign(
    { userId: user.id, email: user.email, profileId: user.profile.id },
    process.env.JWT_SECRET
  );

  ctx.body = {
    data: {
      profileId: user.profile.id,
      token,
    },
  };
};

const createUser = async (ctx: Koa.Context): Promise<void> => {
  const { email } = ctx.request.body;
  const duplicateUser = await userService.getUserByEmail(email);
  if (duplicateUser) {
    // not sure correct code
    throw new Exception(HttpStatus.BAD_REQUEST, 'Email already in use');
  }

  const newProfile = await profileService.createProfile({});
  const user: User = ctx.request.body;
  const newUser = await userService.createUser({
    ...user,
    password: await authUtil.hashPassword(user.password),
    profile: newProfile,
  });

  const token = await jwt.sign(
    { userId: newUser.id, email: newUser.email, profileId: newProfile.id },
    process.env.JWT_SECRET
  );

  ctx.body = {
    data: {
      profileId: newProfile.id,
      token,
    },
  };
};

export default {
  //   getUser,
  createUser,
  login,
};
