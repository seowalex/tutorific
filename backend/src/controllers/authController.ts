import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import authUtil from '../utils/auth';
import User from '../models/user';
import profileService from '../services/profile';
import userService from '../services/user';
import Exception from '../utils/exception';

const onAuthSuccess = async (ctx: Koa.Context, user: User): Promise<void> => {
  const jwtToken = await authUtil.generateJwtToken(
    user.id,
    user.email,
    user.profile.id
  );
  const refreshToken = authUtil.generateRefreshToken();
  userService.storeRefreshToken(user.id, refreshToken);

  ctx.body = {
    userId: user.id,
    jwtToken,
    refreshToken,
  };
};

const login = async (ctx: Koa.Context): Promise<void> => {
  const { email, password } = ctx.request.body;
  const user = await userService.getUserByEmail(email);
  if (!user || !(await authUtil.comparePassword(password, user.password))) {
    throw new Exception(HttpStatus.BAD_REQUEST, 'Invalid email or password');
  }

  onAuthSuccess(ctx, user);
};

const register = async (ctx: Koa.Context): Promise<void> => {
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

  onAuthSuccess(ctx, newUser);
};

const logout = async (ctx: Koa.Context): Promise<void> => {
  const { userId, refreshToken } = ctx.request.body;
  const isSuccess = await userService.revokeRefreshToken(userId, refreshToken);
  if (isSuccess) {
    ctx.body = {
      message: 'Logout Success!',
    };
  } else {
    throw new Exception(401, 'Not Authorized');
  }
};

const refreshJwt = async (ctx: Koa.Context): Promise<void> => {
  const { userId, refreshToken } = ctx.request.body;
  const fetchedUser = await userService.getUserByRefreshToken(
    userId,
    refreshToken
  );
  if (fetchedUser) {
    const jwtToken = await authUtil.generateJwtToken(
      fetchedUser.id,
      fetchedUser.email,
      fetchedUser.profile.id
    );

    ctx.body = {
      data: {
        jwtToken,
      },
    };
  } else {
    throw new Exception(401, 'Not Authorized');
  }
};

export default {
  register,
  login,
  logout,
  refreshJwt,
};
