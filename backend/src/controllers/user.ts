import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import userService from '../services/user';

const getUser = async (ctx: Koa.Context): Promise<void> => {
  const user = await userService.getUser(ctx.params.id);

  if (!user) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  ctx.body = user;
};

export default {
  getUser,
};
