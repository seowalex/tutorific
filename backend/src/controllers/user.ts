import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import authService from '../services/auth';
import userService from '../services/user';
import Profile from '../models/profile';
import User from '../models/user';

// TODO make a class instead?

const getUser = async (ctx: Koa.Context): Promise<void> => {
  const user = await userService.getUser(ctx.params.id);

  if (!user) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  ctx.body = { data: user };
};

const createUser = async (ctx: Koa.Context): Promise<void> => {
  const { email, password } = ctx.request.body;
  const hashedPassword = await authService.hashPassword(password);
  const newProfile = new Profile();
  const newUser = new User(email, hashedPassword, newProfile);
  const createdUser = await userService.createUser(newUser);
  ctx.body = {
    data: {
      profileId: createdUser.profile.id,
    },
  };
};

export default {
  getUser,
  createUser,
};
