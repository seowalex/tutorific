import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import userService from '../services/user';
import bcrypt from 'bcrypt';
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
  const salt_rounds = 10;
  const hashed_password = await bcrypt.hash(password, salt_rounds);
  const new_profile = new Profile();
  const new_user = new User();
  new_user.email = email;
  new_user.hashed_password = hashed_password;
  new_user.profile = new_profile;
  const created_user = await userService.createUser(new_user);
  if (!created_user) {
    // not sure about this
    ctx.throw(HttpStatus.BAD_REQUEST);
  } else {
    ctx.body = { data: created_user.profile };
  }
}

export default {
  getUser,
  createUser,
};
