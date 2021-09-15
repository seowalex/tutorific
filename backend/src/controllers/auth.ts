import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import authUtil from '../utils/auth';
import User from '../models/user';
import userService from '../services/user';

// helpers

const onAuthSuccess = async (ctx: Koa.Context, user: User): Promise<void> => {
  const jwtToken = await authUtil.generateJwtToken(
    user.id,
    user.email,
    user.profile ? user.profile.id : null
  );
  const refreshToken = authUtil.generateRefreshToken();
  user.refreshToken.push(refreshToken);
  await userService.updateUser(user.id, { refreshToken: user.refreshToken });

  ctx.body = {
    profileId: user.profile ? user.profile.id : null,
    userId: user.id,
    jwtToken,
    refreshToken,
  };
};

// returns user only if user exists and refreshToken matches

const getUserByIdAndCheckRefreshToken = async (
  userId: number,
  refreshToken: string
): Promise<User | undefined> => {
  const user = await userService.getUser(userId);

  if (!user || !user.refreshToken.includes(refreshToken)) {
    return undefined;
  }

  return user;
};

const revokeRefreshToken = async (
  userId: number,
  refreshToken: string
): Promise<Boolean> => {
  const fetchedUser = await getUserByIdAndCheckRefreshToken(
    userId,
    refreshToken
  );
  if (!fetchedUser) {
    return false;
  }
  const newRefreshTokenArr = fetchedUser.refreshToken.filter(
    (token) => token !== refreshToken
  );
  await userService.updateUser(userId, { refreshToken: newRefreshTokenArr });
  return true;
};

// controller methods

const login = async (ctx: Koa.Context): Promise<void> => {
  const { email, password } = ctx.request.body;
  const user = await userService.getUserByEmail(email);
  if (!user || !(await authUtil.comparePassword(password, user.password))) {
    ctx.throw(HttpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  await onAuthSuccess(ctx, user);
};

const register = async (ctx: Koa.Context): Promise<void> => {
  // TODO make atomic
  const user: User = ctx.request.body;
  const newUser = await userService.createUser({
    ...user,
    refreshToken: [],
  });

  await onAuthSuccess(ctx, newUser);
};

const logout = async (ctx: Koa.Context): Promise<void> => {
  const { userId, refreshToken } = ctx.request.body;
  const isSuccess = await revokeRefreshToken(userId, refreshToken);
  if (isSuccess) {
    ctx.status = HttpStatus.OK;
    ctx.body = {};
  } else {
    ctx.throw(HttpStatus.UNAUTHORIZED);
  }
};

const refreshJwt = async (ctx: Koa.Context): Promise<void> => {
  const { userId, refreshToken } = ctx.request.body;
  const fetchedUser = await getUserByIdAndCheckRefreshToken(
    userId,
    refreshToken
  );
  if (!fetchedUser) {
    ctx.throw(HttpStatus.UNAUTHORIZED);
  }

  const jwtToken = await authUtil.generateJwtToken(
    fetchedUser.id,
    fetchedUser.email,
    fetchedUser.profile ? fetchedUser.profile.id : null
  );

  ctx.body = {
    jwtToken,
  };
};

export default {
  register,
  login,
  logout,
  refreshJwt,
};
