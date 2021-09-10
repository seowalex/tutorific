import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import hashPassword from '../utils/auth';
import User from '../models/user';
import profileService from '../services/profile';
import userService from '../services/user';

// TODO make a class instead?

const getUser = async (ctx: Koa.Context): Promise<void> => {
  const user = await userService.getUser(ctx.params.id);

  if (!user) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  ctx.body = { data: user };
};

const createUser = async (ctx: Koa.Context): Promise<void> => {
  const newProfile = await profileService.createProfile({});
  const user: User = ctx.request.body;
  const newUser = await userService.createUser({
    ...user,
    password: await hashPassword(user.password),
    profile: newProfile,
  });
  await userService.createUser(newUser);
  ctx.body = {
    data: {
      profileId: newProfile.id,
    },
  };
};

export default {
  getUser,
  createUser,
};
