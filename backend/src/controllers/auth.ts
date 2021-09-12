import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import authUtil from '../utils/auth';
import User from '../models/user';
import profileService from '../services/profile';
import userService from '../services/user';

// helpers

const onAuthSuccess = async (ctx: Koa.Context, user: User): Promise<void> => {
  const jwtToken = await authUtil.generateJwtToken(
    user.id,
    user.email,
    user.profile.id
  );
  const refreshToken = authUtil.generateRefreshToken();
  await userService.updateUser(user.id, { refreshToken });

  ctx.body = {
    userId: user.id,
    jwtToken,
    refreshToken,
  };
};

// returns user only if user exists and refreshToken matches
const getUserByIdAndRefreshToken = async (
  userId: number,
  refreshToken: string
): Promise<User | undefined> => {
  const user = await userService.getUser(userId);

  if (!user || user.refreshToken !== refreshToken) {
    return undefined;
  }

  return user;
};

const revokeRefreshToken = async (
  userId: number,
  refreshToken: string
): Promise<Boolean> => {
  const fetchedUser = await getUserByIdAndRefreshToken(userId, refreshToken);
  if (!fetchedUser) {
    return false;
  }

  await userService.updateUser(userId, { refreshToken: null });
  return true;
};

// controller methods

const login = async (ctx: Koa.Context): Promise<void> => {
  const { email, password } = ctx.request.body;
  const user = await userService.getUserByEmail(email);
  if (!user || !(await authUtil.comparePassword(password, user.password))) {
    ctx.throw(HttpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  onAuthSuccess(ctx, user);
};

const register = async (ctx: Koa.Context): Promise<void> => {
  const { email } = ctx.request.body;

  // TODO use class-validator instead
  const duplicateUser = await userService.getUserByEmail(email);
  if (duplicateUser) {
    ctx.status = HttpStatus.CONFLICT;
    ctx.body = {
      errors: [
        {
          status: HttpStatus.CONFLICT,
          detail: 'Email already in use',
        },
      ],
    };
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
  const isSuccess = await revokeRefreshToken(userId, refreshToken);
  if (isSuccess) {
    ctx.status = HttpStatus.OK;
  } else {
    ctx.throw(HttpStatus.UNAUTHORIZED);
  }
};

const refreshJwt = async (ctx: Koa.Context): Promise<void> => {
  const { userId, refreshToken } = ctx.request.body;
  const fetchedUser = await getUserByIdAndRefreshToken(userId, refreshToken);
  if (!fetchedUser) {
    ctx.throw(HttpStatus.UNAUTHORIZED);
  }

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
};

export default {
  register,
  login,
  logout,
  refreshJwt,
};
